# Terminal and scripting design

The command terminal routes CAD operations through one registry so ribbon buttons, terminal commands and scripts can share validation and undo history.

## Requirements
- Preserve command history and support safe cancellation.
- Validate arguments and report errors with line/column where possible.
- Run scripts as undoable transactions.
- Bound execution time, memory, instructions and created entities.
- Never expose database credentials to scripts.
- Require explicit permission for project writes and import/export.
- Keep OS shell execution separate from the drawing command language.