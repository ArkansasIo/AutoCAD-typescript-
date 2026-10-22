import {CadDocument,CadEntity,CadLayer,CadPlane,createDocument} from "./types";
export class DocumentModel{
 private value:CadDocument;private listeners=new Set<(doc:CadDocument)=>void>();private undoStack:CadDocument[]=[];private redoStack:CadDocument[]=[];
 constructor(doc:CadDocument=createDocument()){this.value=structuredClone(doc);}
 get snapshot():CadDocument{return structuredClone(this.value);}
 subscribe(fn:(doc:CadDocument)=>void):()=>void{this.listeners.add(fn);fn(this.snapshot);return()=>this.listeners.delete(fn);}
 addEntity(e:CadEntity):void{this.commit(d=>{if(!d.layers.some(l=>l.id===e.layerId))throw new Error("Unknown entity layer");if(!d.planes.some(p=>p.id===e.planeId))throw new Error("Unknown entity plane");d.entities.push(e);});}
 removeEntity(id:string):void{this.commit(d=>{d.entities=d.entities.filter(e=>e.id!==id);});}
 addLayer(l:CadLayer):void{if(this.value.layers.some(x=>x.name.toLowerCase()===l.name.toLowerCase()))throw new Error("Layer already exists: "+l.name);this.commit(d=>{d.layers.push(l);});}
 setActiveLayer(id:string):void{if(!this.value.layers.some(l=>l.id===id))throw new Error("Unknown layer");this.commit(d=>{d.activeLayerId=id;});}
 setLayerVisibility(id:string,visible:boolean):void{this.commit(d=>{const l=d.layers.find(x=>x.id===id);if(l)l.visible=visible;});}
 addPlane(p:CadPlane):void{if(this.value.planes.some(x=>x.name.toLowerCase()===p.name.toLowerCase()))throw new Error("Plane already exists: "+p.name);if(p.parentId&&!this.value.planes.some(x=>x.id===p.parentId))throw new Error("Unknown parent plane");this.commit(d=>{d.planes.push(p);});}
 setActivePlane(id:string):void{if(!this.value.planes.some(p=>p.id===id))throw new Error("Unknown plane");this.commit(d=>{d.activePlaneId=id;});}
 rename(name:string):void{this.commit(d=>{d.name=name.trim()||"Untitled";});}
 setUnits(units:CadDocument["units"]):void{this.commit(d=>{d.units=units;});}
 undo():void{const p=this.undoStack.pop();if(!p)return;this.redoStack.push(this.value);this.value=p;this.emit();}
 redo():void{const n=this.redoStack.pop();if(!n)return;this.undoStack.push(this.value);this.value=n;this.emit();}
 replace(doc:CadDocument):void{this.undoStack.push(this.value);this.redoStack=[];this.value=structuredClone(doc);this.emit();}
 private commit(fn:(d:CadDocument)=>void):void{const before=structuredClone(this.value);fn(this.value);this.undoStack.push(before);if(this.undoStack.length>100)this.undoStack.shift();this.redoStack=[];this.value.updatedAt=new Date().toISOString();this.emit();}
 private emit():void{const d=this.snapshot;this.listeners.forEach(fn=>fn(d));}
}