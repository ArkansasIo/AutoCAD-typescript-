# TypeCAD scripting

- **TCS** is a TypeCAD-owned, restricted command grammar. The starter runtime supports line, circle, rectangle, layer and log statements. It is not a general-purpose language.
- **Lua** is the planned general-purpose script VM. `lua/typecad/init.lua` demonstrates an object-oriented Drawing/Entity API; production execution requires a maintained Lua VM binding and a security-reviewed sandbox.
- Scripts must call the restricted CAD API, never private document internals. Enforce time, memory, instruction, source-size, output-size and generated-entity limits.
- Do not use eval or translate arbitrary Lua into JavaScript. Disable OS/file/network/process/native-module/debug access by default and only expose allowlisted virtual modules.