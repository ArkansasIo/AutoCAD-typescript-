# TypeCAD terminal subsystem

The editor command prompt shares a registry with UI command handlers. Implemented paths include basic primitive activation, undo/redo, JSON open/save, limited DXF export, layer/workplane entry, help and restricted TCS execution.

Planned: command history, autocomplete, argument validation, cancellation, progress events, Lua runtime, macro manager, diagnostic logs and background file jobs. OS shell execution must remain separate from CAD commands.