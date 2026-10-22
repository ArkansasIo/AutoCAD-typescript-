export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };

export type EntityBase = {
  id: string;
  type: string;
  layerId: string;
  visible: boolean;
  locked?: boolean;
};

export type LineEntity = EntityBase & { type: "LINE"; start: Vec2; end: Vec2 };
export type CircleEntity = EntityBase & { type: "CIRCLE"; center: Vec2; radius: number };
export type RectangleEntity = EntityBase & { type: "RECTANGLE"; min: Vec2; max: Vec2 };
export type CadEntity = LineEntity | CircleEntity | RectangleEntity;

export type CadLayer = {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  locked: boolean;
  lineType: "CONTINUOUS" | "DASHED" | "DOTTED";
};

export type CadDocument = {
  id: string;
  name: string;
  units: "mm" | "cm" | "m" | "in" | "ft";
  activeLayerId: string;
  layers: CadLayer[];
  entities: CadEntity[];
  updatedAt: string;
};

export const DEFAULT_LAYER: CadLayer = {
  id: "layer-0", name: "0", color: "#dbe7f3",
  visible: true, locked: false, lineType: "CONTINUOUS"
};

export function createDocument(name = "Untitled"): CadDocument {
  return {
    id: crypto.randomUUID(), name, units: "mm",
    activeLayerId: DEFAULT_LAYER.id, layers: [{ ...DEFAULT_LAYER }],
    entities: [], updatedAt: new Date().toISOString()
  };
}