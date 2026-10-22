import { CadDocument, CadEntity, CircleEntity, LineEntity, RectangleEntity, Vec2 } from "../core/types";
export function distance(a: Vec2, b: Vec2): number { return Math.hypot(b.x-a.x, b.y-a.y); }
export function createLine(start: Vec2, end: Vec2, layerId: string): LineEntity {
  return { id: crypto.randomUUID(), type: "LINE", start, end, layerId, visible: true };
}
export function createCircle(center: Vec2, radius: number, layerId: string): CircleEntity {
  if (!Number.isFinite(radius) || radius <= 0) throw new Error("Circle radius must be positive");
  return { id: crypto.randomUUID(), type: "CIRCLE", center, radius, layerId, visible: true };
}
export function createRectangle(a: Vec2, b: Vec2, layerId: string): RectangleEntity {
  return { id: crypto.randomUUID(), type: "RECTANGLE",
    min: { x: Math.min(a.x,b.x), y: Math.min(a.y,b.y) },
    max: { x: Math.max(a.x,b.x), y: Math.max(a.y,b.y) }, layerId, visible: true };
}
export function entityBounds(entity: CadEntity): { min: Vec2; max: Vec2 } {
  switch (entity.type) {
    case "LINE": return {
      min: { x: Math.min(entity.start.x,entity.end.x), y: Math.min(entity.start.y,entity.end.y) },
      max: { x: Math.max(entity.start.x,entity.end.x), y: Math.max(entity.start.y,entity.end.y) }
    };
    case "CIRCLE": return {
      min: { x: entity.center.x-entity.radius, y: entity.center.y-entity.radius },
      max: { x: entity.center.x+entity.radius, y: entity.center.y+entity.radius }
    };
    case "RECTANGLE": return { min: entity.min, max: entity.max };
  }
}
export function boundsOfDocument(doc: CadDocument): { min: Vec2; max: Vec2 } | null {
  if (!doc.entities.length) return null;
  const bounds = doc.entities.map(entityBounds);
  return {
    min: { x: Math.min(...bounds.map((b)=>b.min.x)), y: Math.min(...bounds.map((b)=>b.min.y)) },
    max: { x: Math.max(...bounds.map((b)=>b.max.x)), y: Math.max(...bounds.map((b)=>b.max.y)) }
  };
}