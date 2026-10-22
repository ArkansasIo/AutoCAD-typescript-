# TypeCAD terminal subsystem

The editor command prompt shares a registry with UI command handlers. Basic routes include primitive-tool activation, undo/redo, JSON open/save, limited DXF export, layer/workplane entry, help and restricted TCS execution.

Planned: command history, autocomplete, argument schemas, cancellation, progress, Lua VM, macro manager, diagnostics and background file jobs. OS shell execution must remain separate from CAD commands.