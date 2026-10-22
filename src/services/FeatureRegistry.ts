import {CAD_TOOLS,ToolDefinition} from "../commands/tools";
export type FeatureStatus="implemented"|"prototype"|"planned"|"external-integration";
export type Feature={id:string;label:string;status:FeatureStatus;description:string};
export const FEATURES:Feature[]=[
{id:"model",label:"Document model and history",status:"implemented",description:"Entities, layers, units, workplane metadata and undo/redo"},
{id:"primitives",label:"2D primitives",status:"prototype",description:"Line, circle and rectangle"},
{id:"menu-system",label:"Menus and submenus",status:"prototype",description:"Core CAD menu taxonomy and menu handlers"},
{id:"planes",label:"Nested workplanes",status:"prototype",description:"Hierarchy and coordinate transform helper; rendering integration incomplete"},
{id:"tcs",label:"TypeCAD Script",status:"prototype",description:"Restricted command syntax"},
{id:"lua",label:"Embedded Lua",status:"planned",description:"OOP sample exists; VM not integrated"},
{id:"mysql",label:"MySQL API",status:"prototype",description:"Schema and Express starter endpoints"},
{id:"dxf",label:"DXF export",status:"prototype",description:"Supported primitives only"},
{id:"dwg",label:"Native DWG",status:"external-integration",description:"Requires licensed SDK/service"},
{id:"constraints",label:"Parametric constraints",status:"planned",description:"Constraint equations/solver"},
{id:"solid-kernel",label:"3D solids",status:"planned",description:"Topology and boolean kernel"}
];
export function getToolCatalog():Array<ToolDefinition&{status:FeatureStatus}>{return CAD_TOOLS.map(t=>({...t,status:t.implemented?"prototype":"planned"}));}