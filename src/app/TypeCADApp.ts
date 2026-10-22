import {DocumentModel} from "../core/Document";
import {CadDocument,CadPlane,createDocument} from "../core/types";
import {createCircle,createLine,createRectangle} from "../geometry/primitives";
import {exportDxf} from "../geometry/dxf";
import {SceneRenderer} from "../rendering/SceneRenderer";
import {LocalDrawingStore,downloadText,safeName} from "../storage/LocalDrawingStore";
import {createCommandManager} from "../commands/commands";
import {TypeCADScript} from "../scripting/TypeCADScript";

export class TypeCADApp {
 private model=new DocumentModel(this.restore());
 private store=new LocalDrawingStore();
 private renderer?:SceneRenderer;
 private doc=this.model.snapshot;
 private tool:"LINE"|"CIRCLE"|"RECTANGLE"|null=null;
 private p1:{x:number;y:number}|null=null;
 private unsub?:()=>void;
 private commands=createCommandManager();

 constructor(private root:HTMLDivElement){}
 mount():void{
  this.root.innerHTML=this.template();
  const canvas=this.root.querySelector<HTMLCanvasElement>("#viewport");
  if(!canvas)throw new Error("Viewport missing");
  this.renderer=new SceneRenderer(canvas);
  this.unsub=this.model.subscribe(d=>{this.doc=d;this.renderer?.renderDocument(d);try{this.store.save(d);}catch{}this.renderLayers();this.renderPlanes();this.updateTitle();});
  this.bind();this.renderLayers();this.renderPlanes();
 }
 private restore():CadDocument {
  try {const id=localStorage.getItem("typecad:drawing:last");const raw=id?localStorage.getItem("typecad:drawing:"+id):null;
   if(raw){const d=JSON.parse(raw) as CadDocument;if(!Array.isArray(d.planes)){d.planes=[{id:"plane-world-xy",name:"World XY",parentId:null,origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1},up:{x:0,y:1,z:0},visible:true,locked:false,gridSpacing:10}];d.activePlaneId=d.planes[0].id;for(const e of d.entities)e.planeId=d.activePlaneId;}return d;}
  }catch{}return createDocument();
 }
 private template():string{return `
 <div class="app-shell"><header class="topbar"><div class="brand-mark">T</div><div class="brand"><strong>TypeCAD</strong><span>CAD Drafting Workspace</span></div><div class="top-actions"><button data-action="new">New</button><button data-action="open">Open JSON</button><button data-action="save">Save JSON</button><button data-action="dxf">Export DXF</button><button data-action="settings">Options</button></div></header>
 <nav class="menubar">
 <div class="menu"><button>File ▾</button><div class="submenu"><button data-action="new">New Drawing</button><button data-action="open">Open JSON</button><button data-action="save">Save JSON</button><button data-action="dxf">Export DXF</button><button data-action="settings">Options</button></div></div>
 <div class="menu"><button>Edit ▾</button><div class="submenu"><button data-action="undo">Undo</button><button data-action="redo">Redo</button><button data-action="select">Select Tool</button></div></div>
 <div class="menu"><button>Draw ▾</button><div class="submenu"><button data-tool="LINE">Line</button><button data-tool="CIRCLE">Circle</button><button data-tool="RECTANGLE">Rectangle</button><button data-action="script">Run TCS Script</button></div></div>
 <div class="menu"><button>Modify ▾</button><div class="submenu"><button data-action="roadmap">Move / Copy / Rotate</button><button data-action="roadmap">Trim / Extend / Offset</button><button data-action="roadmap">Fillet / Chamfer</button></div></div>
 <div class="menu"><button>View ▾</button><div class="submenu"><button data-action="zoom-fit">Zoom Extents</button><button data-action="grid">Grid Settings</button><button data-action="planes">Workplane Manager</button></div></div>
 <div class="menu"><button>Insert ▾</button><div class="submenu"><button data-action="roadmap">Block</button><button data-action="roadmap">External Reference</button><button data-action="roadmap">Image / PDF Underlay</button></div></div>
 <div class="menu"><button>Format ▾</button><div class="submenu"><button data-action="add-layer">New Layer</button><button data-action="add-plane">New Workplane</button><button data-action="rename">Rename Drawing</button></div></div>
 <div class="menu"><button>Tools ▾</button><div class="submenu"><button data-action="commands">Command Catalog</button><button data-action="script">TCS Scripting</button><button data-action="settings">Preferences</button></div></div>
 <div class="menu"><button>Window ▾</button><div class="submenu"><button data-action="roadmap">Workspace Profiles</button><button data-action="roadmap">View Manager</button></div></div>
 <div class="menu"><button>Help ▾</button><div class="submenu"><button data-action="about">About TypeCAD</button><button data-action="features">Feature Matrix</button></div></div>
 </nav>
 <nav class="ribbon"><div class="ribbon-group"><span>DRAW</span><button data-tool="LINE">Line</button><button data-tool="CIRCLE">Circle</button><button data-tool="RECTANGLE">Rectangle</button></div><div class="ribbon-group"><span>EDIT</span><button data-action="undo">Undo</button><button data-action="redo">Redo</button><button data-action="zoom-fit">Zoom Extents</button></div><div class="ribbon-group"><span>PLANES</span><button data-action="add-plane">New Plane</button><button data-action="planes">Manage Planes</button></div><div class="ribbon-group"><span>SCRIPTS</span><button data-action="script">TCS</button><button data-action="commands">Commands</button></div></nav>
 <main class="workspace"><aside class="tool-rail"><button title="Select" data-action="select">↖</button><button title="Line" data-tool="LINE">／</button><button title="Circle" data-tool="CIRCLE">○</button><button title="Rectangle" data-tool="RECTANGLE">▱</button><div class="rail-spacer"></div><button title="Layers" data-action="layers">▤</button><button title="Planes" data-action="planes">▱</button></aside>
 <section class="drawing-area"><div class="viewport-header"><span id="drawing-title">Untitled</span><span id="tool-hint">Select a tool or command</span><span id="active-plane-label">WORLD XY</span></div><canvas id="viewport" aria-label="CAD viewport"></canvas><div class="command-line"><span>TYPECAD ›</span><input id="command-input" placeholder="LINE, CIRCLE, PLANE, SCRIPT, HELP" autocomplete="off"/><button data-action="run-command">Run</button></div><div class="statusbar"><span id="status">Ready</span><span id="coords">X 0.00 Y 0.00</span><span>ORTHO OFF</span><span>SNAP OFF</span><span>MODEL</span></div></section>
 <aside class="properties"><div class="panel-title">DRAWING</div><label>Drawing name<input id="name-input" value="Untitled"/></label><label>Units<select id="units-input"><option value="mm">Millimeters</option><option value="cm">Centimeters</option><option value="m">Meters</option><option value="in">Inches</option><option value="ft">Feet</option></select></label><div class="panel-title">LAYERS <button data-action="add-layer">+</button></div><div id="layer-list"></div><div class="panel-title">WORKPLANES <button data-action="add-plane">+</button></div><div id="plane-list"></div><p class="muted">Workplanes are hierarchical. The current renderer uses shared XY display coordinates; arbitrary plane projections remain in the roadmap.</p></aside></main>
 <input id="file-input" type="file" accept=".json,.typecad.json" hidden/></div>`;}
 private bind():void{
  this.root.querySelectorAll<HTMLElement>("[data-tool]").forEach(e=>e.addEventListener("click",()=>this.activate(e.dataset.tool as "LINE"|"CIRCLE"|"RECTANGLE")));
  this.root.querySelectorAll<HTMLElement>("[data-action]").forEach(e=>e.addEventListener("click",()=>this.action(e.dataset.action??"")));
  const c=this.root.querySelector<HTMLCanvasElement>("#viewport")!;
  c.addEventListener("click",e=>this.onCanvas(e));
  c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect();this.text("#coords","X "+(e.clientX-r.left).toFixed(2)+" Y "+(r.bottom-e.clientY).toFixed(2));});
  this.root.querySelector<HTMLInputElement>("#command-input")?.addEventListener("keydown",e=>{if(e.key==="Enter")void this.runCommand();});
  this.root.querySelector<HTMLInputElement>("#name-input")?.addEventListener("change",e=>this.model.rename((e.currentTarget as HTMLInputElement).value));
  this.root.querySelector<HTMLSelectElement>("#units-input")?.addEventListener("change",e=>this.model.setUnits((e.currentTarget as HTMLSelectElement).value as CadDocument["units"]));
  this.root.querySelector<HTMLInputElement>("#file-input")?.addEventListener("change",e=>void this.openFile((e.currentTarget as HTMLInputElement).files?.[0]));
 }
 private action(a:string):void{switch(a){
 case"new":if(confirm("Create new drawing? Save the current drawing first if required."))this.model.replace(createDocument());break;
 case"open":this.root.querySelector<HTMLInputElement>("#file-input")?.click();break;
 case"save":this.store.exportJson(this.doc);this.status("JSON download started");break;
 case"dxf":downloadText(safeName(this.doc.name)+".dxf",exportDxf(this.doc),"application/dxf");this.status("Limited DXF exported");break;
 case"undo":this.model.undo();this.status("Undo");break;case"redo":this.model.redo();this.status("Redo");break;
 case"zoom-fit":this.renderer?.focusAll(this.doc);this.status("Zoom extents");break;
 case"add-layer":this.addLayer();break;case"add-plane":this.addPlane();break;
 case"planes":alert(this.doc.planes.map(p=>(p.id===this.doc.activePlaneId?"* ":"")+p.name+" parent="+(p.parentId??"root")).join("\n"));break;
 case"rename":{const n=prompt("Drawing name",this.doc.name);if(n!==null)this.model.rename(n);break;}
 case"commands":alert(this.commands.list().map(c=>c.name+" ["+c.aliases.join(",")+"] — "+c.description).join("\n"));break;
 case"run-command":void this.runCommand();break;case"script":this.scriptPrompt();break;
 case"settings":alert("Settings model is in src/app/Settings.ts. Full preferences dialog remains roadmap.");break;
 case"grid":this.status("Grid settings are in config/default.json; live toggle remains roadmap.");break;
 case"layers":this.root.querySelector("#layer-list")?.scrollIntoView({behavior:"smooth"});break;
 case"select":this.tool=null;this.p1=null;this.hint("Select a tool or command");this.status("Selection editing is roadmap");break;
 case"about":alert("TypeCAD CAD prototype — not full AutoCAD feature parity.");break;case"features":alert("See docs/FEATURE_MATRIX.md.");break;
 case"roadmap":this.status("This menu item is a planned feature, not implemented.");break;
 }}
 private activate(t:"LINE"|"CIRCLE"|"RECTANGLE"):void{this.tool=t;this.p1=null;this.hint(t+": click first point");this.status(t+" active");}
 private canvasPoint(e:MouseEvent):{x:number;y:number}{const c=this.root.querySelector<HTMLCanvasElement>("#viewport")!,r=c.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width*2-1,ny=-((e.clientY-r.top)/r.height*2-1),cam=this.renderer!.camera;return{x:cam.left+(nx+1)/2*(cam.right-cam.left)+cam.position.x,y:cam.bottom+(ny+1)/2*(cam.top-cam.bottom)+cam.position.y};}
 private onCanvas(e:MouseEvent):void{if(!this.tool)return;const p=this.canvasPoint(e);if(!this.p1){this.p1=p;this.hint(this.tool+": click second point");return;}const a=this.p1,t=this.tool,l=this.doc.activeLayerId,pl=this.doc.activePlaneId;try{if(t==="LINE")this.model.addEntity(createLine(a,p,l,pl));else if(t==="CIRCLE")this.model.addEntity(createCircle(a,Math.hypot(p.x-a.x,p.y-a.y),l,pl));else this.model.addEntity(createRectangle(a,p,l,pl));this.status(t+" created");}catch(err){this.status(err instanceof Error?err.message:"Geometry error");}this.tool=null;this.p1=null;this.hint("Select a tool or command");}
 private async runCommand():Promise<void>{const i=this.root.querySelector<HTMLInputElement>("#command-input");if(!i)return;const raw=i.value.trim();if(!raw)return;const cmd=raw.split(/\s+/)[0].toUpperCase();i.value="";if(["LINE","L","CIRCLE","C","RECTANGLE","REC"].includes(cmd)){this.activate(cmd==="LINE"||cmd==="L"?"LINE":cmd==="CIRCLE"||cmd==="C"?"CIRCLE":"RECTANGLE");return;}if(cmd==="PLANE"||cmd==="WORKPLANE"){this.addPlane();return;}if(cmd==="UNDO"||cmd==="U"){this.action("undo");return;}if(cmd==="REDO"){this.action("redo");return;}if(cmd==="EXPORT"||cmd==="EXPORTDXF"){this.action("dxf");return;}if(cmd==="SAVEJSON"){this.action("save");return;}if(cmd==="OPENJSON"){this.action("open");return;}if(cmd==="SCRIPT"||cmd==="TCS"){this.scriptPrompt();return;}if(cmd==="LAYER"||cmd==="LA"){this.addLayer();return;}if(cmd==="HELP"||cmd==="?"){this.action("commands");return;}if(!await this.commands.run(cmd,{prompt:m=>prompt(m),notify:m=>this.status(m)}))this.status("Unknown command: "+cmd);}
 private scriptPrompt():void{const src=prompt('Paste TCS: line x1 y1 x2 y2; circle x y r; rect x1 y1 x2 y2; layer name #RRGGBB; log "text".');if(src===null)return;try{const r=new TypeCADScript().run(src,{line:(x1,y1,x2,y2)=>this.model.addEntity(createLine({x:x1,y:y1},{x:x2,y:y2},this.doc.activeLayerId,this.doc.activePlaneId)),circle:(x,y,r)=>this.model.addEntity(createCircle({x,y},r,this.doc.activeLayerId,this.doc.activePlaneId)),rect:(x1,y1,x2,y2)=>this.model.addEntity(createRectangle({x:x1,y:y1},{x:x2,y:y2},this.doc.activeLayerId,this.doc.activePlaneId)),layer:(name,color)=>{let l=this.doc.layers.find(v=>v.name===name);if(!l){l={id:crypto.randomUUID(),name,color,visible:true,locked:false,lineType:"CONTINUOUS"};this.model.addLayer(l);}this.model.setActiveLayer(l.id);},log:m=>this.status(m)});this.status("Executed "+r.executed+" TCS statements");}catch(e){this.status(e instanceof Error?e.message:"TCS failure");}}
 private addLayer():void{const name=prompt("Layer name");if(!name?.trim())return;try{const l={id:crypto.randomUUID(),name:name.trim(),color:"#7dd3fc",visible:true,locked:false,lineType:"CONTINUOUS" as const};this.model.addLayer(l);this.model.setActiveLayer(l.id);}catch(e){this.status(e instanceof Error?e.message:"Layer failure");}}
 private addPlane():void{const name=prompt("Workplane name");if(!name?.trim())return;const parentName=prompt("Parent plane name (blank for root)","World XY");if(parentName===null)return;const parent=this.doc.planes.find(p=>p.name===parentName.trim());if(parentName.trim()&&!parent){this.status("Parent plane not found");return;}const origin=prompt("Origin X,Y,Z","0,0,0");if(origin===null)return;const n=origin.split(/[\s,]+/).map(Number);if(n.length!==3||n.some(v=>!Number.isFinite(v))){this.status("Origin must have three numbers");return;}const p:CadPlane={id:crypto.randomUUID(),name:name.trim(),parentId:parent?.id??null,origin:{x:n[0],y:n[1],z:n[2]},normal:{x:0,y:0,z:1},up:{x:0,y:1,z:0},visible:true,locked:false,gridSpacing:10};try{this.model.addPlane(p);this.model.setActivePlane(p.id);this.status("Created XY-oriented workplane "+p.name);}catch(e){this.status(e instanceof Error?e.message:"Plane creation failed");}}
 private renderLayers():void{const list=this.root.querySelector<HTMLDivElement>("#layer-list");if(!list)return;list.innerHTML="";for(const l of this.doc.layers){const row=document.createElement("div");row.className="layer-row"+(l.id===this.doc.activeLayerId?" active":"");const ch=document.createElement("input");ch.type="checkbox";ch.checked=l.visible;ch.title="Layer visibility";ch.addEventListener("change",()=>this.model.setLayerVisibility(l.id,ch.checked));const dot=document.createElement("span");dot.className="layer-color";dot.style.background=l.color;const b=document.createElement("button");b.textContent=l.name;b.style.flex="1";b.addEventListener("click",()=>this.model.setActiveLayer(l.id));row.append(ch,dot,b);list.append(row);}const u=this.root.querySelector<HTMLSelectElement>("#units-input");if(u)u.value=this.doc.units;}
 private renderPlanes():void{const list=this.root.querySelector<HTMLDivElement>("#plane-list");if(!list)return;list.innerHTML="";for(const p of this.doc.planes){const row=document.createElement("div");row.className="layer-row"+(p.id===this.doc.activePlaneId?" active":"");const b=document.createElement("button");b.textContent=(p.parentId?"↳ ":"")+p.name;b.style.flex="1";b.addEventListener("click",()=>this.model.setActivePlane(p.id));row.append(b);list.append(row);}this.text("#active-plane-label",(this.doc.planes.find(p=>p.id===this.doc.activePlaneId)?.name??"World XY").toUpperCase());}
 private async openFile(file?:File):Promise<void>{if(!file)return;try{const d=JSON.parse(await file.text()) as CadDocument;if(!d||typeof d.id!=="string"||!Array.isArray(d.layers)||!Array.isArray(d.entities))throw new Error("Invalid drawing JSON");if(!Array.isArray(d.planes)){d.planes=[{id:"plane-world-xy",name:"World XY",parentId:null,origin:{x:0,y:0,z:0},normal:{x:0,y:0,z:1},up:{x:0,y:1,z:0},visible:true,locked:false,gridSpacing:10}];d.activePlaneId=d.planes[0].id;for(const e of d.entities)e.planeId=d.activePlaneId;}this.model.replace(d);this.status("Opened "+file.name);}catch(e){this.status(e instanceof Error?e.message:"Unable to open drawing");}}
 private updateTitle():void{this.text("#drawing-title",this.doc.name);const i=this.root.querySelector<HTMLInputElement>("#name-input");if(i&&i.value!==this.doc.name)i.value=this.doc.name;}
 private text(s:string,v:string):void{const e=this.root.querySelector<HTMLElement>(s);if(e)e.textContent=v;}private status(s:string):void{this.text("#status",s);}private hint(s:string):void{this.text("#tool-hint",s);}dispose():void{this.unsub?.();this.renderer?.dispose();}
}