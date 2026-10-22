# TypeCAD scripting

TCS is a restricted TypeCAD-owned command grammar. The parser supports line, circle, rectangle, layer and log statements with numeric/source/instruction limits; it does not evaluate arbitrary JavaScript.

Lua is intended as a general object-oriented extension language. `lua/typecad/init.lua` is an API sample, not an embedded runtime. Integrate a maintained Lua VM and reviewed sandbox before executing scripts. Disable shell/process/filesystem/network/package/native-module/debug access by default, enforce quotas, and make drawing changes transactional/undoable.