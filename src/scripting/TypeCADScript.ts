export type TcsHost={line:(a:number,b:number,c:number,d:number)=>void;circle:(x:number,y:number,r:number)=>void;rect:(a:number,b:number,c:number,d:number)=>void;layer:(name:string,color:string)=>void;log:(message:string)=>void};
export class TypeCADScript {
 run(source:string,host:TcsHost):{executed:number;logs:string[]}{
  if(source.length>100000)throw new Error("TCS source limit exceeded");
  const lines=source.split(/\r?\n/);if(lines.length>5000)throw new Error("TCS line limit exceeded");
  let executed=0;const logs:string[]=[];
  for(let i=0;i<lines.length;i++){const raw=lines[i].trim(),ln=i+1;if(!raw||raw.startsWith("#")||raw.startsWith("//"))continue;if(++executed>10000)throw new Error("TCS instruction limit at line "+ln);
   const nums=(s:string,n:number):number[]=>{const v=s.trim().split(/[\s,]+/).filter(Boolean).map(Number);if(v.length!==n||v.some(x=>!Number.isFinite(x)||Math.abs(x)>1e12))throw new Error("TCS line "+ln+": invalid numeric arguments");return v;};
   let m:RegExpMatchArray|null;
   if((m=raw.match(/^line\s+(.+)$/i))){const v=nums(m[1],4);host.line(v[0],v[1],v[2],v[3]);}
   else if((m=raw.match(/^circle\s+(.+)$/i))){const v=nums(m[1],3);host.circle(v[0],v[1],v[2]);}
   else if((m=raw.match(/^rect(?:angle)?\s+(.+)$/i))){const v=nums(m[1],4);host.rect(v[0],v[1],v[2],v[3]);}
   else if((m=raw.match(/^layer\s+([\w.-]{1,100})\s+(#[0-9a-fA-F]{6})$/i))){host.layer(m[1],m[2]);}
   else if((m=raw.match(/^log\s+"([^"\n]{0,1000})"$/i))){logs.push(m[1]);host.log(m[1]);}
   else throw new Error("TCS line "+ln+": unsupported syntax");
  }
  return{executed,logs};
 }
}