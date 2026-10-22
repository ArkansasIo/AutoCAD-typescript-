import { DocumentModel } from "../core/Document";
import { CadDocument, createDocument } from "../core/types";
import { createCircle, createLine, createRectangle } from "../geometry/primitives";
import { exportDxf } from "../geometry/dxf";
import { SceneRenderer } from "../rendering/SceneRenderer";
import { LocalDrawingStore, downloadText, safeName } from "../storage/LocalDrawingStore";
import { createCommandManager } from "../commands/commands";

export class TypeCADApp {
  private store=new LocalDrawingStore();
  private model=new DocumentModel(this.restoreDocument());
  private renderer?:SceneRenderer;
  private currentDoc:CadDocument=this.model.snapshot;
  private status="Ready";
  private pendingTool:"LINE"|"CIRCLE"|"RECTANGLE"|null=null;
  private firstPoint:{x:number;y:number}|null=null;
  private unsubscribe?:()=>void;
  private readonly commands=createCommandManager();

  constructor(private readonly root:HTMLDivElement){}
  mount():void{
    this.root.innerHTML=this.template();
    const canvas=this.root.querySelector<HTMLCanvasElement>("#viewport");
    if(!canvas)throw new Error("Viewport canvas missing");
    this.renderer=new SceneRenderer(canvas);
    this.unsubscribe=this.model.subscribe((doc)=>{
      this.currentDoc=doc;this.renderer?.renderDocument(doc);this.store.save(doc);
      this.renderLayers();this.updateTitle();
    });
    this.bindEvents();this.renderLayers();
  }
  private restoreDocument():CadDocument{
    try{const raw=localStorage.getItem("typecad:drawing:last");if(raw){const v=localStorage.getItem(`typecad:drawing:${raw}`);if(v)return JSON.parse(v) as CadDocument;}}catch{}
    return createDocument();
  }
  private template():string{return `
  <div class="app-shell">
    <header class="topbar"><div class="brand-mark">T</div><div class="brand"><strong>TypeCAD</strong><span>TypeScript drafting workspace</span></div>
      <div class="top-actions"><button data-action="new">New</button><button data-action="open">Open JSON</button><button data-action="save">Save JSON</button><button data-action="dxf">Export DXF</button></div>
    </header>
    <nav class="ribbon">
      <div class="ribbon-group"><span>DRAW</span><button data-tool="LINE">Line</button><button data-tool="CIRCLE">Circle</button><button data-tool="RECTANGLE">Rectangle</button></div>
      <div class="ribbon-group"><span>EDIT</span><button data-action="undo">Undo</button><button data-action="redo">Redo</button><button data-action="zoom-fit">Zoom Extents</button></div>
      <div class="ribbon-group"><span>FILE</span><button data-action="rename">Rename</button><button data-action="add-layer">＋ Layer</button><button data-action="commands">Commands</button></div>
    </nav>
    <main class="workspace">
      <aside class="tool-rail"><button title="Select" class="rail-active" data-action="select">↖</button><button title="Line" data-tool="LINE">／</button><button title="Circle" data-tool="CIRCLE">○</button><button title="Rectangle" data-tool="RECTANGLE">▱</button><div class="rail-spacer"></div><button title="Layers" data-action="layers">▤</button></aside>
      <section class="drawing-area">
        <div class="viewport-header"><span id="drawing-title">Untitled</span><span id="tool-hint">Select a tool or enter a command</span><span>MODEL</span></div>
        <canvas id="viewport" aria-label="CAD drawing viewport"></canvas>
        <div class="command-line"><span>TYPECAD ›</span><input id="command-input" placeholder="Enter command (e.g. LINE, CIRCLE, RECTANGLE)" autocomplete="off"/><button data-action="run-command">Run</button></div>
        <div class="statusbar"><span id="status">Ready</span><span id="coords">X 0.00 Y 0.00</span><span>ORTHO OFF</span><span>SNAP OFF</span><span>MODEL</span></div>
      </section>
      <aside class="properties">
        <div class="panel-title">DRAWING</div><label>Drawing name<input id="name-input" value="Untitled"/></label>
        <label>Units<select id="units-input"><option value="mm">Millimeters</option><option value="cm">Centimeters</option><option value="m">Meters</option><option value="in">Inches</option><option value="ft">Feet</option></select></label>
        <div class="panel-title layers-title">LAYERS <button data-action="add-layer">＋</button></div><div id="layer-list"></div>
        <div class="panel-title">PROPERTIES</div><p class="muted">Geometry coordinates are stored in drawing units. Advanced selection, constraints, snaps and transforms are on the roadmap.</p>
        <div class="panel-title">COMMANDS</div><div class="command-chips"><span>LINE</span><span>CIRCLE</span><span>RECTANGLE</span><span>UNDO</span><span>REDO</span><span>ZOOM</span></div>
      </aside>
    </main>
    <input id="file-input" type="file" accept=".json,.typecad.json" hidden/>
  </div>`;}
  private bindEvents():void{
    this.root.querySelectorAll<HTMLElement>("[data-tool]").forEach((el)=>el.addEventListener("click",()=>this.activateTool(el.dataset.tool as "LINE"|"CIRCLE"|"RECTANGLE")));
    this.root.querySelectorAll<HTMLElement>("[data-action]").forEach((el)=>el.addEventListener("click",()=>this.action(el.dataset.action??"")));
    const canvas=this.root.querySelector<HTMLCanvasElement>("#viewport")!;
    canvas.addEventListener("click",(event)=>this.onCanvasClick(event));
    canvas.addEventListener("mousemove",(event)=>{
      const rect=canvas.getBoundingClientRect();
      this.setText("#coords",`X ${(event.clientX-rect.left).toFixed(2)} Y ${(rect.bottom-event.clientY).toFixed(2)}`);
    });
    this.root.querySelector<HTMLInputElement>("#command-input")?.addEventListener("keydown",(e)=>{if(e.key==="Enter")void this.runCommand();});
    this.root.querySelector<HTMLInputElement>("#name-input")?.addEventListener("change",(e)=>this.model.rename((e.currentTarget as HTMLInputElement).value));
    this.root.querySelector<HTMLSelectElement>("#units-input")?.addEventListener("change",(e)=>this.model.setUnits((e.currentTarget as HTMLSelectElement).value as CadDocument["units"]));
    this.root.querySelector<HTMLInputElement>("#file-input")?.addEventListener("change",(e)=>void this.openFile((e.currentTarget as HTMLInputElement).files?.[0]));
  }
  private action(action:string):void{
    switch(action){
      case "new": if(confirm("Start a new drawing? Save the current drawing first if required.")){this.model.replace(createDocument());this.setStatus("New drawing");}break;
      case "open": this.root.querySelector<HTMLInputElement>("#file-input")?.click();break;
      case "save": this.store.exportJson(this.currentDoc);this.setStatus("JSON file downloaded");break;
      case "dxf": downloadText(`${safeName(this.currentDoc.name)}.dxf`,exportDxf(this.currentDoc),"application/dxf");this.setStatus("DXF exported (limited ASCII subset)");break;
      case "undo": this.model.undo();this.setStatus("Undo");break;
      case "redo": this.model.redo();this.setStatus("Redo");break;
      case "zoom-fit": this.renderer?.focusAll();this.setStatus("Zoom extents");break;
      case "add-layer": this.addLayer();break;
      case "rename": {const name=prompt("Drawing name",this.currentDoc.name);if(name!==null)this.model.rename(name);break;}
      case "commands": alert(this.commands.list().map((c)=>`${c.name} (${c.aliases.join(", ")||"no alias"}) — ${c.description}`).join("\n"));break;
      case "run-command": void this.runCommand();break;
      case "select": this.pendingTool=null;this.firstPoint=null;this.setHint("Select a tool or enter a command");this.setStatus("Selection tool is a future feature");break;
      case "layers": this.root.querySelector("#layer-list")?.scrollIntoView({behavior:"smooth"});break;
    }
  }
  private activateTool(tool:"LINE"|"CIRCLE"|"RECTANGLE"):void{
    this.pendingTool=tool;this.firstPoint=null;this.setHint(`${tool}: click first point`);this.setStatus(`${tool} active`);
  }
  private canvasPoint(event:MouseEvent):{x:number;y:number}{
    const canvas=this.root.querySelector<HTMLCanvasElement>("#viewport")!;
    const rect=canvas.getBoundingClientRect();
    const nx=(event.clientX-rect.left)/rect.width*2-1;
    const ny=-((event.clientY-rect.top)/rect.height*2-1);
    const v=new (window as unknown as {THREE?:never}).THREE;
    void v;
    // Map pointer into orthographic camera coordinates.
    const camera=this.renderer!.camera;
    const x=camera.left+(nx+1)/2*(camera.right-camera.left);
    const y=camera.bottom+(ny+1)/2*(camera.top-camera.bottom);
    return {x:x+camera.position.x,y:y+camera.position.y};
  }
  private onCanvasClick(event:MouseEvent):void{
    if(!this.pendingTool)return;
    const point=this.canvasPoint(event);
    if(!this.firstPoint){this.firstPoint=point;this.setHint(`${this.pendingTool}: click second point`);return;}
    const layer=this.currentDoc.activeLayerId,first=this.firstPoint,tool=this.pendingTool;
    try{
      if(tool==="LINE")this.model.addEntity(createLine(first,point,layer));
      if(tool==="CIRCLE")this.model.addEntity(createCircle(first,Math.hypot(point.x-first.x,point.y-first.y),layer));
      if(tool==="RECTANGLE")this.model.addEntity(createRectangle(first,point,layer));
      this.setStatus(`${tool} created`);
    }catch(error){this.setStatus(error instanceof Error?error.message:"Drawing error");}
    this.firstPoint=null;this.pendingTool=null;this.setHint("Select a tool or enter a command");
  }
  private async runCommand():Promise<void>{
    const input=this.root.querySelector<HTMLInputElement>("#command-input");if(!input)return;
    const raw=input.value.trim();if(!raw)return;
    const [name,...rest]=raw.split(/\s+/);input.value="";
    if(["L","LINE","C","CIRCLE","REC","RECTANGLE"].includes(name.toUpperCase())){
      const normalized=name.toUpperCase();
      this.activateTool(normalized==="L"||normalized==="LINE"?"LINE":normalized==="C"||normalized==="CIRCLE"?"CIRCLE":"RECTANGLE");
      this.setStatus(`Command ${name.toUpperCase()} ready; click viewport points`);return;
    }
    const done=await this.commands.run(name,{prompt:(message)=>prompt(message),notify:(message)=>this.setStatus(message)});
    if(!done)this.setStatus(`Unknown command: ${name}`);
    else if(rest.length)this.setStatus(`Command ${name.toUpperCase()} invoked; arguments are not yet interpreted`);
  }
  private addLayer():void{
    const name=prompt("New layer name");if(!name?.trim())return;
    try{const layer={id:crypto.randomUUID(),name:name.trim(),color:"#7dd3fc",visible:true,locked:false,lineType:"CONTINUOUS" as const};this.model.addLayer(layer);this.model.setActiveLayer(layer.id);this.setStatus(`Layer ${name} added`);}
    catch(error){this.setStatus(error instanceof Error?error.message:"Unable to add layer");}
  }
  private renderLayers():void{
    const list=this.root.querySelector<HTMLDivElement>("#layer-list");if(!list)return;
    list.innerHTML="";
    for(const layer of this.currentDoc.layers){
      const row=document.createElement("div");row.className="layer-row"+(layer.id===this.currentDoc.activeLayerId?" active":"");
      const visibility=document.createElement("input");visibility.type="checkbox";visibility.checked=layer.visible;visibility.title="Layer visibility";
      visibility.addEventListener("change",()=>this.model.setLayerVisibility(layer.id,visibility.checked));
      const color=document.createElement("span");color.className="layer-color";color.style.background=layer.color;
      const name=document.createElement("button");name.textContent=layer.name;name.style.flex="1";name.style.textAlign="left";
      name.addEventListener("click",()=>{this.model.setActiveLayer(layer.id);this.setStatus(`Current layer: ${layer.name}`);});
      row.append(visibility,color,name);list.append(row);
    }
    const units=this.root.querySelector<HTMLSelectElement>("#units-input");if(units)units.value=this.currentDoc.units;
  }
  private async openFile(file?:File):Promise<void>{
    if(!file)return;
    try{
      const parsed=JSON.parse(await file.text()) as CadDocument;
      if(!parsed||typeof parsed.id!=="string"||!Array.isArray(parsed.entities)||!Array.isArray(parsed.layers))throw new Error("Invalid TypeCAD JSON document");
      this.model.replace(parsed);this.setStatus(`Opened ${file.name}`);
    }catch(error){this.setStatus(error instanceof Error?error.message:"Unable to open drawing");}
  }
  private updateTitle():void{
    this.setText("#drawing-title",this.currentDoc.name);
    const input=this.root.querySelector<HTMLInputElement>("#name-input");if(input&&input.value!==this.currentDoc.name)input.value=this.currentDoc.name;
  }
  private setText(selector:string,value:string):void{const el=this.root.querySelector<HTMLElement>(selector);if(el)el.textContent=value;}
  private setStatus(value:string):void{this.status=value;this.setText("#status",value);}
  private setHint(value:string):void{this.setText("#tool-hint",value);}
  dispose():void{this.unsubscribe?.();this.renderer?.dispose();}
}