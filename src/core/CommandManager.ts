export type CommandContext={prompt:(message:string)=>string|null;notify:(message:string)=>void};
export type CadCommand={name:string;aliases:string[];description:string;execute:(ctx:CommandContext)=>void|Promise<void>};
export class CommandManager{
 private commands=new Map<string,CadCommand>();
 register(c:CadCommand):void{for(const name of[c.name,...c.aliases]){const k=name.trim().toUpperCase();if(this.commands.has(k))throw new Error("Command alias already registered: "+k);this.commands.set(k,c);}}
 get(name:string):CadCommand|undefined{return this.commands.get(name.trim().toUpperCase());}
 list():CadCommand[]{return[...new Set(this.commands.values())].sort((a,b)=>a.name.localeCompare(b.name));}
 async run(name:string,ctx:CommandContext):Promise<boolean>{const c=this.get(name);if(!c){ctx.notify("Unknown command: "+name);return false;}await c.execute(ctx);return true;}
}