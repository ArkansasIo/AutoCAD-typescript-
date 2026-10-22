export type DomainEvent<T=unknown>={type:string;occurredAt:string;payload:T};
export class EventBus{
 private handlers=new Map<string,Set<(event:DomainEvent)=>void>>();
 on(type:string,handler:(event:DomainEvent)=>void):()=>void{let set=this.handlers.get(type);if(!set){set=new Set();this.handlers.set(type,set);}set.add(handler);return()=>set!.delete(handler);}
 emit<T>(type:string,payload:T):void{const event:DomainEvent<T>={type,occurredAt:new Date().toISOString(),payload};this.handlers.get(type)?.forEach(fn=>fn(event));}
 clear():void{this.handlers.clear();}
}