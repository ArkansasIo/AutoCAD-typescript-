# Terminal command roadmap

| Command | Function | Status |
|---|---|---|
| HELP | List commands | Planned |
| CLEAR | Clear prompt history | Planned |
| HISTORY | View history | Planned |
| SETVAR | Change approved variables | Planned |
| OPTIONS | Open preferences | Planned |
| SCRIPT | Run TCS source | Starter grammar |
| LUA | Run sandboxed Lua file | VM not integrated |
| LOADAPP | Load signed plugin | Planned |
| EXPORTDXF | Export drawing subset | Starter |
| SAVEJSON / OPENJSON | Save/load JSON drawing | Starter |
| LAYER | Manage layers | Basic |
| LINE / CIRCLE / RECTANGLE | Draw primitives | Basic |
| REGEN | Rebuild viewport | Planned |
| DIAGNOSE | Check app/API/database | Planned |
| WOLFMATH | Inspect math adapter | Planned |

Each command needs argument schemas, permissions, side-effect documentation, tests, error feedback and undo policy.