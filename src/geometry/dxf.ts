import { CadDocument, CadEntity } from "../core/types";
const pair = (code: number, value: string | number): string => `${code}\n${value}\n`;
export function exportDxf(doc: CadDocument): string {
  let out = pair(0,"SECTION")+pair(2,"HEADER")+pair(9,"$ACADVER")+pair(1,"AC1009")+pair(0,"ENDSEC");
  out += pair(0,"SECTION")+pair(2,"TABLES")+pair(0,"TABLE")+pair(2,"LAYER")+pair(70,doc.layers.length);
  for (const layer of doc.layers) {
    const color = layer.color.toLowerCase()==="#ff0000" ? 1 : layer.color.toLowerCase()==="#00ff00" ? 3 : 7;
    out += pair(0,"LAYER")+pair(2,layer.name)+pair(70,0)+pair(62,color)+pair(6,layer.lineType);
  }
  out += pair(0,"ENDTAB")+pair(0,"ENDSEC")+pair(0,"SECTION")+pair(2,"ENTITIES");
  for (const entity of doc.entities) out += writeEntity(entity,doc.layers.find((l)=>l.id===entity.layerId)?.name ?? "0");
  return out+pair(0,"ENDSEC")+pair(0,"EOF");
}
function writeEntity(entity: CadEntity, layer: string): string {
  const base = (type:string) => pair(0,type)+pair(8,layer);
  switch(entity.type) {
    case "LINE": return base("LINE")+pair(10,entity.start.x)+pair(20,entity.start.y)+pair(30,0)+pair(11,entity.end.x)+pair(21,entity.end.y)+pair(31,0);
    case "CIRCLE": return base("CIRCLE")+pair(10,entity.center.x)+pair(20,entity.center.y)+pair(30,0)+pair(40,entity.radius);
    case "RECTANGLE": {
      const {min,max}=entity; const points=[min,{x:max.x,y:min.y},max,{x:min.x,y:max.y}];
      return points.map((p,i)=>{const q=points[(i+1)%points.length];return base("LINE")+pair(10,p.x)+pair(20,p.y)+pair(30,0)+pair(11,q.x)+pair(21,q.y)+pair(31,0);}).join("");
    }
  }
}