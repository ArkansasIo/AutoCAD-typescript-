# TypeCAD scripting

**TCS** is a small TypeCAD-owned line-oriented command syntax for geometry commands. The initial safe interpreter supports line, circle, rectangle, layer, and log statements. It avoids eval and is not a general-purpose language.

**Lua** is the planned general-purpose embedded scripting host. `lua/typecad/init.lua` demonstrates a class/table-based Drawing and Entity API, but actual `.lua` execution requires a maintained Lua VM binding and a security-reviewed sandbox.

Do not execute scripts with arbitrary filesystem, shell, network, OS, native module or debug access by default. Require source-size, instruction, time, memory, output and generated-entity limits. Script changes should be transaction-based and undoable.