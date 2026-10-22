import {CAD_TOOLS,ToolDefinition} from "../commands/tools";
export type FeatureStatus="implemented"|"prototype"|"planned"|"external-integration";
export type Feature={id:string;label:string;status:FeatureStatus;description:string};
export const FEATURES:Feature[]=[
{id:"model",label:"Document model and history",status:"implemented",description:"Entities, layers, units and workplane metadata"},
{id:"drawing-tools",label:"2D primitive tools",status:"prototype",description:"Line, circle and rectangle"},
{id:"menus",label:"CAD menus and submenus",status:"prototype",description:"File/Edit/Draw/Modify/View/Insert/Format/Tools/Window/Help"},
{id:"planes",label:"Nested workplanes",status:"prototype",description:"Hierarchy and coordinate helpers; renderer still XY-only"},
{id:"tcs",label:"TCS scripting",status:"prototype",description:"Restricted drawing commands"},
{id:"lua-vm",label:"Lua virtual machine",status:"planned",description:"OOP sample exists; execution host not integrated"},
{id:"mysql-api",label:"MySQL/API foundation",status:"prototype",description:"Schema and basic endpoints"},
{id:"dxf",label:"DXF export",status:"prototype",description:"Limited supported entity subset"},
{id:"dwg",label:"Native DWG",status:"external-integration",description:"Requires a licensed SDK/service"},
{id:"constraint-solver",label:"Parametric solver",status:"planned",description:"Geometric and dimensional constraints"},
{id:"solid-kernel",label:"3D solid kernel",status:"planned",description:"Topology and Boolean operations"}
];
export function getToolCatalog():Array<ToolDefinition&{status:FeatureStatus}>{return CAD_TOOLS.map(t=>({...t,status:t.implemented?"prototype":"planned"}));}