# TypeCAD terminal subsystem

The user-facing CAD prompt is part of the browser workspace. Future desktop/CLI terminal can reuse CommandManager.

Planned: history, autocomplete, aliases, argument validation, cancellation, progress, TCS/Lua commands, logging, diagnostics, configuration profiles and a task queue for long-running imports and exports.

Do not execute arbitrary OS shell strings from the in-app drawing prompt. Developer shell integration must be a separate opt-in tool with OS-level permissions.