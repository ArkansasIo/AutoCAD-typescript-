# Terminal command roadmap

| Command | Function | Status |
|---|---|---|
| HELP | List commands | Planned |
| CLEAR | Clear prompt history | Planned |
| HISTORY | Show history | Planned |
| SETVAR | Set approved variables | Planned |
| OPTIONS | Open preferences | Planned |
| SCRIPT | Run TCS source | Parser foundation |
| LUA | Run sandboxed Lua | VM not integrated |
| LOADAPP | Load signed plugin | Planned |
| EXPORTDXF | Export supported drawing subset | Starter |
| SAVEJSON / OPENJSON | Save/load JSON drawing | Starter |
| LAYER | Manage layers | Basic |
| LINE / CIRCLE / RECTANGLE | Create primitives | Basic |
| REGEN | Rebuild viewport | Planned |
| DIAGNOSE | Check app/API/database | Planned |
| WOLFMATH | Inspect math adapter | Planned |

Commands need argument schemas, permissions, side-effect documentation, tests, clear unsupported status and undo policy.