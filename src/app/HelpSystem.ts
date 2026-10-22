export type HelpTopic={id:string;title:string;body:string;related?:string[]};
export const HELP_TOPICS:HelpTopic[]=[
{id:"start",title:"Getting started",body:"Choose Line, Circle or Rectangle and click two viewport points. Save TypeCAD JSON or export the limited DXF subset."},
{id:"menus",title:"Menus/tools",body:"Menu definitions are in src/commands/menus.ts and the tool catalog is in src/commands/tools.ts. Advanced items are marked planned."},
{id:"planes",title:"Planes/subplanes",body:"A plane stores origin, normal, up vector, grid spacing, visibility, lock status and parent plane ID. PlaneManager implements basis and coordinate helpers, while the renderer still uses one XY drawing view."},
{id:"tcs",title:"TCS",body:"Supported statements: line x1 y1 x2 y2; circle x y radius; rect x1 y1 x2 y2; layer name #RRGGBB; log \"message\"."},
{id:"lua",title:"Lua",body:"Lua OOP examples are supplied. Actual Lua file execution requires integrating a maintained sandboxed VM."},
{id:"database",title:"MySQL",body:"The browser calls a separately hosted API. Do not connect directly from the browser to MySQL."},
{id:"formats",title:"Formats",body:"JSON is the prototype drawing format. DXF export is a limited subset; native DWG requires a licensed SDK."}
];