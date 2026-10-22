/**
 * TypeCAD Script (TCS) minimal parser/runtime.
 * Deliberately supports a tiny, explicit command grammar instead of eval().
 *
 * Supported:
 *   let name = number
 *   line x1 y1 x2 y2
 *   circle cx cy radius
 *   rect x1 y1 x2 y2
 *   layer name #hexcolor
 *   log "message"
 *   repeat COUNT { ... }  -- count must be a literal integer, nested blocks limited
 *
 * This file implements a safe starter grammar. Functions, imports, arbitrary
 * expressions, and Lua execution are intentionally delegated to a separate sandbox.
 */
export type TcsHost = {
  line: (x1:number,y1:number,x2:number,y2:number)=>void;
  circle: (x:number,y:number,r:number)=>void;
  rect: (x1:number,y1:number,x2:number,y2:number)=>void;
  layer: (name:string,color:string)=>void;
  log: (message:string)=>void;
};
export type TcsResult = { executed:number; logs:string[] };

const MAX_SOURCE=100_000;
const MAX_LINES=5_000;
const MAX_REPEAT=1_000;
const MAX_DEPTH=4;

export class TypeCADScriptError extends Error {
  constructor(message:string, public readonly lineNumber:number) {
    super(`TCS line ${lineNumber}: ${message}`);
    this.name="TypeCADScriptError";
  }
}

type Statement =
  | {kind:"line";v:number[];line:number}
  | {kind:"circle";v:number[];line:number}
  | {kind:"rect";v:number[];line:number}
  | {kind:"layer";name:string;color:string;line:number}
  | {kind:"log";message:string;line:number}
  | {kind:"repeat";count:number;body:Statement[];line:number};

export class TypeCADScript {
  run(source:string,host:TcsHost):TcsResult {
    if(source.length>MAX_SOURCE)throw new TypeCADScriptError("source exceeds size limit",1);
    const lines=source.split(/\r?\n/);
    if(lines.length>MAX_LINES)throw new TypeCADScriptError("too many source lines",MAX_LINES);
    const statements=this.parseBlock(lines,0,lines.length,0).statements;
    const logs:string[]=[];let executed=0;
    const exec=(items:Statement[]):void=>{
      for(const s of items){
        if(++executed>100_000)throw new TypeCADScriptError("instruction budget exceeded",s.line);
        switch(s.kind){
          case "line":host.line(...s.v as [number,number,number,number]);break;
          case "circle":host.circle(...s.v as [number,number,number]);break;
          case "rect":host.rect(...s.v as [number,number,number,number]);break;
          case "layer":host.layer(s.name,s.color);break;
          case "log":logs.push(s.message);host.log(s.message);break;
          case "repeat":for(let i=0;i<s.count;i++)exec(s.body);break;
        }
      }
    };
    exec(statements);
    return {executed,logs};
  }

  private parseBlock(lines:string[],start:number,end:number,depth:number):{statements:Statement[];next:number}{
    if(depth>MAX_DEPTH)throw new TypeCADScriptError("maximum block nesting exceeded",start+1);
    const out:Statement[]=[];
    for(let i=start;i<end;i++){
      const raw=lines[i].trim();const line=i+1;
      if(!raw||raw.startsWith("#")||raw.startsWith("//")||raw==="}")continue;
      const repeat=raw.match(/^repeat\s+(\d+)\s*\{$/i);
      if(repeat){
        const count=Number(repeat[1]);if(!Number.isSafeInteger(count)||count<0||count>MAX_REPEAT)throw new TypeCADScriptError("repeat count out of range",line);
        let close=i+1,nesting=1;
        for(;close<end;close++){const t=lines[close].trim();if(/^repeat\s+\d+\s*\{$/i.test(t))nesting++;if(t==="}")nesting--;if(nesting===0)break;}
        if(close>=end)throw new TypeCADScriptError("repeat block is missing closing brace",line);
        const child=this.parseBlock(lines,i+1,close,depth+1).statements;
        out.push({kind:"repeat",count,body:child,line});i=close;continue;
      }
      const nums=(text:string,expected:number):number[]=>{
        const parts=text.trim().split(/[\s,]+/).filter(Boolean);
        if(parts.length!==expected)throw new TypeCADScriptError(`expected ${expected} numeric arguments`,line);
        const values=parts.map(Number);
        if(values.some((n)=>!Number.isFinite(n)||Math.abs(n)>1e12))throw new TypeCADScriptError("invalid numeric value",line);
        return values;
      };
      let m:string[]|null;
      if((m=raw.match(/^line\s+(.+)$/i)))out.push({kind:"line",v:nums(m[1],4),line});
      else if((m=raw.match(/^circle\s+(.+)$/i)))out.push({kind:"circle",v:nums(m[1],3),line});
      else if((m=raw.match(/^rect(?:angle)?\s+(.+)$/i)))out.push({kind:"rect",v:nums(m[1],4),line});
      else if((m=raw.match(/^layer\s+([\w.-]{1,100})\s+(#[0-9a-fA-F]{6})$/i)))out.push({kind:"layer",name:m[1],color:m[2],line});
      else if((m=raw.match(/^log\s+"([^"\n]{0,1000})"$/i)))out.push({kind:"log",message:m[1],line});
      else throw new TypeCADScriptError("unknown statement or unsupported syntax",line);
    }
    return {statements:out,next:end};
  }
}