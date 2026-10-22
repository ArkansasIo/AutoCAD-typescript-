# TypeCAD scripting

TCS is a restricted TypeCAD-owned command language. The current parser supports line, circle, rectangle, layer and log statements with numeric/source/instruction limits. It never evaluates arbitrary JavaScript.

Lua is intended as the general OOP extension language. `lua/typecad/init.lua` is an example API, not an embedded runtime. Integrate a maintained Lua VM and reviewed sandbox before executing scripts. Disable shell, process, filesystem, network, package/native-module and debug access by default; cap runtime resources and make drawing changes transactional/undoable.