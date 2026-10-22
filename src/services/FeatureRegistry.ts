import {CAD_TOOLS,ToolDefinition} from "../commands/tools";
export type FeatureStatus="implemented"|"prototype"|"planned"|"external-integration";
export type Feature={id:string;label:string;status:FeatureStatus;description:string};
export const FEATURES:Feature[]=[
{id:"model",label:"Document model and history",status:"implemented",description:"Entities, layers, units, plane metadata, undo/redo"},
{id:"primitive-tools",label:"2D tools",status:"prototype",description:"Line, circle and rectangle"},
{id:"menu-system",label:"Menus/submenus",status:"prototype",description:"File/Edit/Draw/Modify/View/Insert/Format/Tools/Window/Help"},
{id:"workplanes",label:"Nested workplanes",status:"prototype",description:"Metadata and local/world helper; render integration incomplete"},
{id:"tcs",label:"TCS scripting",status:"prototype",description:"Restricted command grammar"},
{id:"lua-vm",label:"Lua VM",status:"planned",description:"OOP examples only; VM not integrated"},
{id:"mysql-api",label:"MySQL API",status:"prototype",description:"Schema and starter endpoints"},
{id:"dxf",label:"DXF export",status:"prototype",description:"Limited entity subset"},
{id:"dwg",label:"Native DWG",status:"external-integration",description:"Requires licensed SDK/service"},
{id:"constraints",label:"Parametric constraint solver",status:"planned",description:"Constraint equation system"},
{id:"3d-kernel",label:"3D solids",status:"planned",description:"Topology and Boolean operations"}];
export function getToolCatalog():Array<ToolDefinition&{status:FeatureStatus}>{return CAD_TOOLS.map(t=>({...t,status:t.implemented?"prototype":"planned"}));}