# TypeCAD feature matrix

| Area | Features | Status |
|---|---|---|
| Core | Document model, layers, units, workplane metadata, undo/redo | Starter foundation |
| 2D | Line, circle, rectangle | Basic interactive tools |
| UI | Ribbon, menus/submenus, command terminal, layer and workplane panels | Prototype |
| Workplanes | Nested metadata, coordinate basis helpers | Prototype; renderer uses XY coordinates |
| File | Native prototype JSON, limited ASCII DXF export | Prototype |
| Scripting | TCS restricted commands | Prototype |
| Lua | OOP API example | Lua VM is not integrated |
| Backend | MySQL schema, Express health/list endpoints | Starter, not production-secured |
| Select/grips | Selection and grips | Planned |
| Modify | Move/copy/rotate/scale/mirror/trim/extend/offset/fillet/chamfer | Planned |
| Curve geometry | Polyline, arc, ellipse, spline, regions, spatial index | Planned |
| Input aids | Snaps, polar/ortho tracking, dynamic input, coordinate filters | Planned |
| Annotation | Text, dimensions, leaders, tables | Planned |
| Hatching/blocks | Hatch, blocks, inserts, attributes | Planned |
| References/layouts | Xrefs, layouts, viewports, underlays, sheet sets | Planned |
| Parametric | Geometric/dimensional constraint solver | Planned |
| 3D | Solid/surface/mesh kernel, booleans | Planned; geometry kernel required |
| Plot/export | PDF/SVG/DGN, batch plotting | Planned |
| DWG | Native DWG read/write | Licensed SDK integration |
| Collaboration | Accounts, authorization, revision conflicts/live editing | Planned |
| Math | WolfMain Alpha adapter | Fallback only; upstream API not supplied |

The table intentionally separates working prototype features from unimplemented roadmap items.