# Command catalog

| Command | Alias | Function | Status |
|---|---|---|---|
| LINE | L | Draw a line with two points | Basic |
| CIRCLE | C | Draw circle with center/radius point | Basic |
| RECTANGLE | REC | Draw rectangle | Basic |
| LAYER | LA | Create/select/toggle layers | Basic |
| PLANE | WORKPLANE | Create/select plane metadata | Basic |
| UNDO / REDO | U / — | Document history | Basic model support |
| SAVEJSON / OPENJSON | — | Save/load JSON drawings | Basic |
| EXPORTDXF | EXPORT | Export supported entities | Limited subset |
| SCRIPT / TCS | — | Run supported TCS statements | Restricted prototype |
| HELP / ? | — | List commands | Basic |
| PLINE/ARC/ELLIPSE/SPLINE | PL/A/EL/SPL | Curves | Planned |
| MOVE/COPY/ROTATE/SCALE/MIRROR | M/CO/RO/SC/MI | Transform selected entities | Planned |
| TRIM/EXTEND/OFFSET/FILLET/CHAMFER | TR/EX/O/F/CHA | Modify curves | Planned |
| DIM/TEXT/MTEXT/HATCH | Config aliases | Drafting annotations/fill | Planned |
| BLOCK/INSERT/XREF/PLOT | B/I/—/PRINT | Reuse/references/output | Planned |
| LUA | — | Execute Lua files | Lua VM not integrated |
| WOLFMATH | — | Inspect math adapter | Planned command behavior |

Placeholder commands must report non-implementation status rather than silently implying a drawing modification.