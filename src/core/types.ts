export type Vec2={x:number;y:number};export type Vec3={x:number;y:number;z:number};
export type CadPlane={id:string;name:string;parentId:string|null;origin:Vec3;normal:Vec3;up:Vec3;visible:boolean;locked:boolean;gridSpacing:number};
export type CadEntityBase={id:string;type:string;layerId:string;planeId:string;visible:boolean;locked?:boolean};
export type LineEntity=CadEntityBase&{type:"LINE";start:Vec2;end:Vec2};
export type CircleEntity=CadEntityBase&{type:"CIRCLE";center:Vec2;radius:number};
export type RectangleEntity=CadEntityBase&{type:"RECTANGLE";min:Vec2;max:Vec2};
export type CadEntity=LineEntity|CircleEntity|RectangleEntity;
export type CadLayer={id:string;name:string;color:string;visible:boolean;locked:boolean;lineType:"CONTINUOUS"|"DASHED"|"DOTTED";lineWeight?:number};
export type CadDocument={id:string;name:string;units:"mm"|"cm"|"m"|"in"|"ft";activeLayerId:string;activePlaneId:string;planes:CadPlane[];layers:CadLayer[];entities:CadEntity[];updatedAt:string};
export const WORLD_PLANE:CadPlane={id:"plane-world-xy",name:"World XY",parentId:null,origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1},up:{x:0,y:1,z:0},visible:true,locked:false,gridSpacing:10};
export const DEFAULT_LAYER:CadLayer={id:"layer-0",name:"0",color:"#dbe7f3",visible:true,locked:false,lineType:"CONTINUOUS",lineWeight:.25};
export function createDocument(name="Untitled"):CadDocument{return{id:crypto.randomUUID(),name,units:"mm",activeLayerId:DEFAULT_LAYER.id,activePlaneId:WORLD_PLANE.id,planes:[{...WORLD_PLANE}],layers:[{...DEFAULT_LAYER}],entities:[],updatedAt:new Date().toISOString()};}