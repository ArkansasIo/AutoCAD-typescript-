import type { Vec2 } from "../core/types";
export type NumericTolerance={absolute:number;relative:number};
export const DEFAULT_TOLERANCE:NumericTolerance={absolute:1e-9,relative:1e-9};
export interface WolfMainAlphaBackend{add(a:number,b:number):number;subtract(a:number,b:number):number;multiply(a:number,b:number):number;divide(a:number,b:number):number;sqrt(value:number):number;sin(radians:number):number;cos(radians:number):number;atan2(y:number,x:number):number;}
export const nativeBackend:WolfMainAlphaBackend={add:(a,b)=>a+b,subtract:(a,b)=>a-b,multiply:(a,b)=>a*b,divide:(a,b)=>{if(!b)throw new RangeError("Division by zero");return a/b;},sqrt:(n)=>{if(n<0)throw new RangeError("Negative square root");return Math.sqrt(n);},sin:Math.sin,cos:Math.cos,atan2:Math.atan2};
export class WolfMainAlphaAdapter{
 constructor(private readonly backend:WolfMainAlphaBackend=nativeBackend){}
 distance(a:Vec2,b:Vec2):number{const x=this.backend.subtract(b.x,a.x),y=this.backend.subtract(b.y,a.y);return this.backend.sqrt(this.backend.add(this.backend.multiply(x,x),this.backend.multiply(y,y)));}
 dot(a:Vec2,b:Vec2):number{return this.backend.add(this.backend.multiply(a.x,b.x),this.backend.multiply(a.y,b.y));}
 cross(a:Vec2,b:Vec2):number{return this.backend.subtract(this.backend.multiply(a.x,b.y),this.backend.multiply(a.y,b.x));}
 normalize(v:Vec2):Vec2{const n=this.distance(v,{x:0,y:0});if(!n)throw new RangeError("Cannot normalize zero vector");return{x:v.x/n,y:v.y/n};}
 almostEqual(a:number,b:number,t=DEFAULT_TOLERANCE):boolean{return Math.abs(a-b)<=Math.max(t.absolute,t.relative*Math.max(Math.abs(a),Math.abs(b)));}
 clamp(v:number,min:number,max:number):number{if(min>max)throw new RangeError("Invalid bounds");return Math.max(min,Math.min(max,v));}
 lineLength(a:Vec2,b:Vec2):number{return this.distance(a,b);}
 circleArea(r:number):number{if(!Number.isFinite(r)||r<0)throw new RangeError("Invalid radius");return Math.PI*r*r;}
}
export const wolfMainAlpha=new WolfMainAlphaAdapter();