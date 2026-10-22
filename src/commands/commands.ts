import { CommandManager } from "../core/CommandManager";

export function createCommandManager(): CommandManager {
  const manager = new CommandManager();
  const catalog: Array<[string,string[],string]> = [
    ["LINE",["L"],"Create line"],["CIRCLE",["C"],"Create circle"],["RECTANGLE",["REC"],"Create rectangle"],
    ["PLINE",["PL"],"Create polyline"],["ARC",["A"],"Create arc"],["ELLIPSE",["EL"],"Create ellipse"],
    ["SPLINE",["SPL"],"Create spline"],["MOVE",["M"],"Move entities"],["COPY",["CO"],"Copy entities"],
    ["ROTATE",["RO"],"Rotate entities"],["SCALE",["SC"],"Scale entities"],["MIRROR",["MI"],"Mirror entities"],
    ["TRIM",["TR"],"Trim entities"],["EXTEND",["EX"],"Extend entities"],["OFFSET",["O"],"Offset curve"],
    ["FILLET",["F"],"Round a corner"],["CHAMFER",["CHA"],"Bevel a corner"],["DIM",["DIMENSION"],"Create dimension"],
    ["TEXT",["DTEXT"],"Create text"],["MTEXT",[],"Create multiline text"],["HATCH",["H"],"Hatch a boundary"],
    ["LAYER",["LA"],"Manage layers"],["BLOCK",["B"],"Create block"],["INSERT",["I"],"Insert block"],
    ["XREF",[],"Manage external references"],["PLOT",["PRINT"],"Plot or publish"],["EXPORT",[],"Export drawing"],
    ["UNDO",["U"],"Undo"],["REDO",[],"Redo"],["ZOOM",["Z"],"Zoom"],["PAN",[],"Pan viewport"],["REGEN",[],"Redraw"]
  ];
  for (const [name,aliases,description] of catalog) {
    manager.register({name,aliases,description,execute:({notify})=>notify(`${name} is listed in the command catalog; full interactive implementation is not yet available.`)});
  }
  return manager;
}