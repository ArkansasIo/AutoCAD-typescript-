# TypeCAD terminal subsystem

The CAD command prompt is in the browser workspace. A future desktop or CLI terminal can reuse the shared CommandManager API.

Planned: command history, autocomplete, aliases, argument validation, cancellation, progress reporting, TCS/Lua commands, logs, diagnostics, settings profiles and a background job queue for imports/exports.

Do not run arbitrary operating-system shell strings from the in-app CAD prompt. Developer shell integration must be a separate opt-in tool with explicit permissions.