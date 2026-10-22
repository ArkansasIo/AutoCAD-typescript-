export type ToolCategory = "draw" | "modify" | "annotate" | "measure" | "view" | "plane";
export type ToolDefinition = { id:string; label:string; category:ToolCategory; command:string; implemented:boolean; description:string };
export const CAD_TOOLS:ToolDefinition[] = [
{id:"line",label:"Line",category:"draw",command:"LINE",implemented:true,description:"Draw a line with two viewport points"},
{id:"circle",label:"Circle",category:"draw",command:"CIRCLE",implemented:true,description:"Center and radius point"},
{id:"rectangle",label:"Rectangle",category:"draw",command:"RECTANGLE",implemented:true,description:"Two-corner rectangle"},
{id:"select",label:"Select",category:"modify",command:"SELECT",implemented:false,description:"Select entities and grips"},
{id:"polyline",label:"Polyline",category:"draw",command:"PLINE",implemented:false,description:"Connected segments"},
{id:"arc",label:"Arc",category:"draw",command:"ARC",implemented:false,description:"Circular arc"},
{id:"ellipse",label:"Ellipse",category:"draw",command:"ELLIPSE",implemented:false,description:"Ellipse curve"},
{id:"spline",label:"Spline",category:"draw",command:"SPLINE",implemented:false,description:"Spline curve"},
{id:"move",label:"Move",category:"modify",command:"MOVE",implemented:false,description:"Translate selection"},
{id:"copy",label:"Copy",category:"modify",command:"COPY",implemented:false,description:"Duplicate selection"},
{id:"rotate",label:"Rotate",category:"modify",command:"ROTATE",implemented:false,description:"Rotate selection"},
{id:"scale",label:"Scale",category:"modify",command:"SCALE",implemented:false,description:"Scale selection"},
{id:"mirror",label:"Mirror",category:"modify",command:"MIRROR",implemented:false,description:"Mirror selection"},
{id:"trim",label:"Trim",category:"modify",command:"TRIM",implemented:false,description:"Trim at boundaries"},
{id:"extend",label:"Extend",category:"modify",command:"EXTEND",implemented:false,description:"Extend to boundaries"},
{id:"offset",label:"Offset",category:"modify",command:"OFFSET",implemented:false,description:"Offset curves"},
{id:"dimension",label:"Dimension",category:"annotate",command:"DIM",implemented:false,description:"Place dimension annotation"},
{id:"text",label:"Multiline Text",category:"annotate",command:"MTEXT",implemented:false,description:"Create text annotation"},
{id:"hatch",label:"Hatch",category:"annotate",command:"HATCH",implemented:false,description:"Fill closed boundary"},
{id:"zoom-fit",label:"Zoom Extents",category:"view",command:"ZOOM",implemented:true,description:"Fit drawing in viewport"},
{id:"workplane",label:"Workplane Manager",category:"plane",command:"PLANE",implemented:true,description:"Manage nested workplane metadata"}
];