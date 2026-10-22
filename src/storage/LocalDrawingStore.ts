import { CadDocument } from "../core/types";
const PREFIX = "typecad:drawing:";
export class LocalDrawingStore {
  save(doc: CadDocument): void {
    localStorage.setItem(PREFIX+doc.id,JSON.stringify(doc));
    localStorage.setItem(PREFIX+"last",doc.id);
  }
  load(id: string): CadDocument | null {
    const raw=localStorage.getItem(PREFIX+id); if(!raw) return null;
    try { return JSON.parse(raw) as CadDocument; } catch { return null; }
  }
  loadLast(): CadDocument | null { const id=localStorage.getItem(PREFIX+"last"); return id?this.load(id):null; }
  list(): Array<{id:string;name:string;updatedAt:string}> {
    const rows:Array<{id:string;name:string;updatedAt:string}>=[];
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i); if(!key?.startsWith(PREFIX)||key.endsWith(":last")) continue;
      const doc=this.load(key.slice(PREFIX.length)); if(doc) rows.push({id:doc.id,name:doc.name,updatedAt:doc.updatedAt});
    }
    return rows.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
  }
  exportJson(doc: CadDocument): void { downloadText(`${safeName(doc.name)}.typecad.json`,JSON.stringify(doc,null,2),"application/json"); }
}
export function downloadText(filename:string,text:string,mime="text/plain"):void{
  const url=URL.createObjectURL(new Blob([text],{type:mime}));
  const anchor=document.createElement("a");anchor.href=url;anchor.download=filename;anchor.click();URL.revokeObjectURL(url);
}
export function safeName(value:string):string{return value.replace(/[^a-z0-9_-]+/gi,"_").replace(/^_+|_+$/g,"")||"drawing";}