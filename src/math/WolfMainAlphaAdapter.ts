/**
 * WolfMain Alpha adapter boundary for TypeCAD geometry.
 * This is a shim contract, not a vendored copy of an external WolfMain Alpha library.
 * Wire the actual official package here when its source and API are supplied.
 */
import type { Vec2 } from "../core/types";
export type NumericTolerance = { absolute:number; relative:number };
export const DEFAULT_TOLERANCE:NumericTolerance={absolute:1e-9,relative:1e-9};
export interface WolfMainAlphaBackend {
 add(a:number,b:number):number; subtract(a:number,b:number):number; multiply(a:number,b:number):number;
 divide(a:number,b:number):number; sqrt(value:number):number; sin(radians:number):number;
 cos(radians:number):number; atan2(y:number,x:number):number;
}
export const nativeBackend:WolfMainAlphaBackend={
 add:(a,b)=>a+b,subtract:(a,b)=>a-b,multiply:(a,b)=>a*b,
 divide:(a,b)=>{if(b===0)throw new RangeError("Division by zero");return a/b;},
 sqrt:(n)=>{if(n<0)throw new RangeError("Square root of a negative number");return Math.sqrt(n);},
 sin:Math.sin,cos:Math.cos,atan2:Math.atan2
};
export class WolfMainAlphaAdapter {
 constructor(private readonly backend:WolfMainAlphaBackend=nativeBackend){}
 distance(a:Vec2,b:Vec2):number{const dx=this.backend.subtract(b.x,a.x),dy=this.backend.subtract(b.y,a.y);return this.backend.sqrt(this.backend.add(this.backend.multiply(dx,dx),this.backend.multiply(dy,dy)));}
 dot(a:Vec2,b:Vec2):number{return this.backend.add(this.backend.multiply(a.x,b.x),this.backend.multiply(a.y,b.y));}
 cross(a:Vec2,b:Vec2):number{return this.backend.subtract(this.backend.multiply(a.x,b.y),this.backend.multiply(a.y,b.x));}
 normalize(v:Vec2):Vec2{const length=this.distance(v,{x:0,y:0});if(length===0)throw new RangeError("Cannot normalize a zero vector");return{x:v.x/length,y:v.y/length};}
 almostEqual(a:number,b:number,t:NumericTolerance=DEFAULT_TOLERANCE):boolean{return Math.abs(a-b)<=Math.max(t.absolute,t.relative*Math.max(Math.abs(a),Math.abs(b)));}
 clamp(value:number,min:number,max:number):number{if(min>max)throw new RangeError("min must be <= max");return Math.min(max,Math.max(min,value));}
 lineLength(a:Vec2,b:Vec2):number{return this.distance(a,b);}
 circleArea(radius:number):number{if(radius<0||!Number.isFinite(radius))throw new RangeError("Invalid radius");return Math.PI*radius*radius;}
}
export const wolfMainAlpha=new WolfMainAlphaAdapter();