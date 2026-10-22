import { CadDocument, CadEntity, CadLayer, createDocument } from "./types";

export class DocumentModel {
  private value: CadDocument;
  private listeners = new Set<(doc: CadDocument) => void>();
  private undoStack: CadDocument[] = [];
  private redoStack: CadDocument[] = [];

  constructor(doc: CadDocument = createDocument()) { this.value = structuredClone(doc); }
  get snapshot(): CadDocument { return structuredClone(this.value); }

  subscribe(listener: (doc: CadDocument) => void): () => void {
    this.listeners.add(listener); listener(this.snapshot);
    return () => this.listeners.delete(listener);
  }

  addEntity(entity: CadEntity): void { this.commit((d) => { d.entities.push(entity); }); }
  removeEntity(id: string): void { this.commit((d) => { d.entities = d.entities.filter((e) => e.id !== id); }); }

  addLayer(layer: CadLayer): void {
    if (this.value.layers.some((l) => l.name.toLowerCase() === layer.name.toLowerCase())) {
      throw new Error(`Layer "${layer.name}" already exists`);
    }
    this.commit((d) => { d.layers.push(layer); });
  }

  setActiveLayer(layerId: string): void {
    if (!this.value.layers.some((l) => l.id === layerId)) throw new Error("Unknown layer");
    this.commit((d) => { d.activeLayerId = layerId; });
  }

  rename(name: string): void { this.commit((d) => { d.name = name.trim() || "Untitled"; }); }
  setUnits(units: CadDocument["units"]): void { this.commit((d) => { d.units = units; }); }

  setLayerVisibility(layerId: string, visible: boolean): void {
    this.commit((d) => { const layer = d.layers.find((l) => l.id === layerId); if (layer) layer.visible = visible; });
  }

  undo(): void {
    const previous = this.undoStack.pop(); if (!previous) return;
    this.redoStack.push(this.value); this.value = previous; this.emit();
  }
  redo(): void {
    const next = this.redoStack.pop(); if (!next) return;
    this.undoStack.push(this.value); this.value = next; this.emit();
  }
  replace(doc: CadDocument): void { this.undoStack.push(this.value); this.redoStack = []; this.value = structuredClone(doc); this.emit(); }

  private commit(change: (doc: CadDocument) => void): void {
    this.undoStack.push(structuredClone(this.value));
    if (this.undoStack.length > 100) this.undoStack.shift();
    this.redoStack = []; change(this.value);
    this.value.updatedAt = new Date().toISOString(); this.emit();
  }
  private emit(): void { const copy = this.snapshot; this.listeners.forEach((l) => l(copy)); }
}