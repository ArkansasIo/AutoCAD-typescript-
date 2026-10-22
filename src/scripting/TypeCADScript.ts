/** TCS: a constrained CAD scripting grammar. It never evaluates arbitrary JS. */
export type TcsHost={line:(a:number,b:number,c:number,d:number)=>void;circle:(a:number,b:number,r:number)=>void;rect:(a:number,b:number,c:number,d:number)=>void;layer:(name:string,color:string)=>void;log:(message:string)=>void};
export type TcsResult={executed:number;logs:string[]};
type Statement={kind:"line"|"rect"|"circle";values:number[];line:number}|{kind:"layer";name:string;color:string;line:number}|{kind:"log";message:string;line:number};
export class TypeCADScriptError extends Error{constructor(message:string,public readonly lineNumber:number){super("TCS line "+lineNumber+": "+message);this.name="TypeCADScriptError";}}
export class TypeCADScript{
 run(source:string,host:TcsHost):TcsResult{
  if(source.length>100000)throw new TypeCADScriptError("Source size limit exceeded",1);
  const lines=source.split(/\r?\n/);if(lines.length>5000)throw new TypeCADScriptError("Too many lines",5000);
  const parsed:Statement[]=[];
  for(let i=0;i<lines.length;i++){const raw=lines[i].trim(),ln=i+1;if(!raw||raw.startsWith("#")||raw.startsWith("//"))continue;
   const args=(s:string,n:number):number[]=>{const p=s.trim().split(/[\s,]+/).filter(Boolean);const v=p.map(Number);if(v.length!==n||v.some(x=>!Number.isFinite(x)||Math.abs(x)>1e12))throw new TypeCADScriptError("Invalid numeric arguments",ln);return v;};
   let m:RegExpMatchArray|null;
   if((m=raw.match(/^line\s+(.+)$/i)))parsed.push({kind:"line",values:args(m[1],4),line:ln});
   else if((m=raw.match(/^circle\s+(.+)$/i)))parsed.push({kind:"circle",values:args(m[1],3),line:ln});
   else if((m=raw.match(/^rect(?:angle)?\s+(.+)$/i)))parsed.push({kind:"rect",values:args(m[1],4),line:ln});
   else if((m=raw.match(/^layer\s+([\w.-]{1,100})\s+(#[0-9a-fA-F]{6})$/i)))parsed.push({kind:"layer",name:m[1],color:m[2],line:ln});
   else if((m=raw.match(/^log\s+"([^"\n]{0,1000})"$/i)))parsed.push({kind:"log",message:m[1],line:ln});
   else throw new TypeCADScriptError("Unknown statement or unsupported syntax",ln);
   if(parsed.length>10000)throw new TypeCADScriptError("Instruction budget exceeded",ln);
  }
  const logs:string[]=[];for(const s of parsed){switch(s.kind){case"line":host.line(s.values[0],s.values[1],s.values[2],s.values[3]);break;case"circle":host.circle(s.values[0],s.values[1],s.values[2]);break;case"rect":host.rect(s.values[0],s.values[1],s.values[2],s.values[3]);break;case"layer":host.layer(s.name,s.color);break;case"log":logs.push(s.message);host.log(s.message);break;}}
  return{executed:parsed.length,logs};
 }
}