import {CadDocument} from "../core/types";const PREFIX="typecad:drawing:";
export class LocalDrawingStore{
 save(d:CadDocument):void{localStorage.setItem(PREFIX+d.id,JSON.stringify(d));localStorage.setItem(PREFIX+"last",d.id);}
 load(id:string):CadDocument|null{const s=localStorage.getItem(PREFIX+id);if(!s)return null;try{return JSON.parse(s) as CadDocument;}catch{return null;}}
 loadLast():CadDocument|null{const id=localStorage.getItem(PREFIX+"last");return id?this.load(id):null;}
 exportJson(d:CadDocument):void{downloadText(safeName(d.name)+".typecad.json",JSON.stringify(d,null,2),"application/json");}
}
export function downloadText(filename:string,text:string,mime="text/plain"):void{const url=URL.createObjectURL(new Blob([text],{type:mime}));const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);}
export function safeName(v:string):string{return v.replace(/[^a-z0-9_-]+/gi,"_").replace(/^_+|_+$/g,"")||"drawing";}