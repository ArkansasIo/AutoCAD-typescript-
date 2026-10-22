-- TypeCAD Lua example; run only through the future TypeCAD Lua host.
local TypeCAD = require('typecad') -- host must whitelist this virtual module
local drawing=TypeCAD:new('Simple House')
drawing:add_layer('WALLS','#dbe7f3'); drawing:add_layer('ROOF','#f4b860')
drawing:rectangle(0,0,120,80,'WALLS'); drawing:line(0,80,60,125,'ROOF'); drawing:line(60,125,120,80,'ROOF'); drawing:rectangle(48,0,72,40,'WALLS')
return drawing