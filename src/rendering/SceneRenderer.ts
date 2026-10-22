import * as THREE from "three";
import { CadDocument, CadEntity } from "../core/types";

export class SceneRenderer {
  readonly scene=new THREE.Scene();
  readonly camera=new THREE.OrthographicCamera(-100,100,100,-100,0.1,10000);
  readonly renderer:THREE.WebGLRenderer;
  private entityGroup=new THREE.Group();

  constructor(private readonly canvas:HTMLCanvasElement){
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    this.scene.background=new THREE.Color("#101923");
    this.camera.position.set(0,0,1000);this.camera.lookAt(0,0,0);
    this.scene.add(this.entityGroup);
    const grid=new THREE.GridHelper(2000,100,"#31475c","#203142");
    grid.rotation.x=Math.PI/2;grid.position.z=-0.5;this.scene.add(grid);
    this.resize();window.addEventListener("resize",this.resize);this.render();
  }
  renderDocument(doc:CadDocument):void{
    this.entityGroup.clear();
    for(const entity of doc.entities){
      const layer=doc.layers.find((l)=>l.id===entity.layerId);
      if(!entity.visible||layer?.visible===false)continue;
      this.entityGroup.add(this.renderEntity(entity,layer?.color??"#dbe7f3"));
    }
    this.render();
  }
  private renderEntity(entity:CadEntity,color:string):THREE.Object3D{
    const points:THREE.Vector3[]=[];
    if(entity.type==="LINE"){
      points.push(new THREE.Vector3(entity.start.x,entity.start.y,0),new THREE.Vector3(entity.end.x,entity.end.y,0));
    }else if(entity.type==="CIRCLE"){
      for(let i=0;i<=96;i++){const a=i/96*Math.PI*2;points.push(new THREE.Vector3(entity.center.x+Math.cos(a)*entity.radius,entity.center.y+Math.sin(a)*entity.radius,0));}
    }else{
      const {min,max}=entity;
      points.push(new THREE.Vector3(min.x,min.y,0),new THREE.Vector3(max.x,min.y,0),new THREE.Vector3(max.x,max.y,0),new THREE.Vector3(min.x,max.y,0),new THREE.Vector3(min.x,min.y,0));
    }
    const material=new THREE.LineBasicMaterial({color});
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),material);
  }
  focusAll():void{
    const box=new THREE.Box3().setFromObject(this.entityGroup);if(box.isEmpty())return;
    const center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
    const halfW=Math.max(size.x,100)*0.7,halfH=Math.max(size.y,100)*0.7;
    this.camera.position.set(center.x,center.y,1000);
    this.camera.left=-halfW;this.camera.right=halfW;this.camera.top=halfH;this.camera.bottom=-halfH;
    this.camera.updateProjectionMatrix();this.render();
  }
  private resize=():void=>{
    const width=Math.max(1,this.canvas.clientWidth),height=Math.max(1,this.canvas.clientHeight);
    this.renderer.setSize(width,height,false);this.render();
  };
  render():void{this.renderer.render(this.scene,this.camera);}
  dispose():void{window.removeEventListener("resize",this.resize);this.renderer.dispose();}
}