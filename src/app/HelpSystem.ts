export type HelpTopic={id:string;title:string;body:string;related?:string[]};
export const HELP_TOPICS:HelpTopic[]=[
{id:"start",title:"Getting started",body:"Choose Line, Circle or Rectangle and click two viewport points. Save to TypeCAD JSON or export the limited DXF subset."},
{id:"menus",title:"Menus and tools",body:"Menu definitions are in src/commands/menus.ts and the tool catalog is src/commands/tools.ts. Advanced operations remain roadmap features."},
{id:"planes",title:"Planes and subplanes",body:"A workplane stores origin, normal, up vector, visibility, lock state and parent ID. PlaneManager calculates local/world coordinates, but the viewport currently renders on one XY display plane."},
{id:"tcs",title:"TypeCAD Script",body:"TCS supports line x1 y1 x2 y2, circle x y radius, rect x1 y1 x2 y2, layer name #RRGGBB and log \"message\"."},
{id:"lua",title:"Lua scripting",body:"Lua OOP examples are supplied, but script execution needs an integrated, sandboxed Lua VM."},
{id:"database",title:"Database",body:"The browser uses the separately hosted TypeCAD API. Do not connect the browser directly to MySQL."},
{id:"formats",title:"File formats",body:"TypeCAD JSON is the prototype format. DXF export is limited; native DWG requires a licensed SDK."}
];