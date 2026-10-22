# TypeCAD feature matrix

| Area | Features | Status |
|---|---|---|
| Core | Document model, layers, units, plane metadata, undo/redo | Starter foundation |
| 2D | Line, circle, rectangle | Basic interactive tools |
| UI | Menus/submenus, ribbon, command prompt, layer/plane panels | Prototype |
| Workplanes | Nested metadata and coordinate helpers | Prototype; renderer still XY-only |
| Files | TypeCAD JSON, limited ASCII DXF export | Prototype |
| Scripting | Restricted TCS | Prototype |
| Lua | OOP API example | VM not integrated |
| Backend | MySQL schema and Express health/list endpoints | Starter, not production-secured |
| Selection/grips | Entity selection and grips | Planned |
| Modify | Move, copy, rotate, scale, mirror, trim, extend, offset, fillet, chamfer | Planned |
| Geometry | Polylines, arcs, ellipses, splines, regions | Planned |
| Drafting aids | Snaps, polar/ortho, tracking, dynamic input | Planned |
| Annotation/fill | Text, dimensions, leaders, tables, hatch | Planned |
| Blocks/references | Blocks, attributes, Xrefs, underlays | Planned |
| Layout/plot | Paper space, viewports, sheet sets, PDF publishing | Planned |
| Parametric/3D | Constraint solver, robust solids/surfaces/booleans | Planned |
| DWG | Native read/write | Licensed SDK integration |
| Math | WolfMain Alpha adapter | Fallback only; upstream API not supplied |

Implemented behavior is deliberately distinguished from the roadmap.