-- Example for the future TypeCAD Lua host; module must be allowlisted.
local TypeCAD=require("typecad")
local d=TypeCAD:new("Simple House")
d:add_layer("WALLS","#dbe7f3");d:add_layer("ROOF","#f4b860")
d:rectangle(0,0,120,80,"WALLS")
d:line(0,80,60,125,"ROOF");d:line(60,125,120,80,"ROOF")
d:rectangle(48,0,72,40,"WALLS")
return d