-- TypeCAD Lua OOP sample. Production host must provide a sandboxed Lua VM.
local Entity={}; Entity.__index=Entity
function Entity:new(kind,props) return setmetatable({kind=kind,props=props or {}},self) end
local Drawing={}; Drawing.__index=Drawing
function Drawing:new(name) return setmetatable({name=name or 'Untitled',units='mm',layers={{name='0',color='#dbe7f3'}},entities={}},self) end
function Drawing:add_layer(name,color) assert(type(name)=='string' and #name>0,'layer name required'); for _,l in ipairs(self.layers) do assert(l.name~=name,'duplicate layer') end; local l={name=name,color=color or '#dbe7f3'};table.insert(self.layers,l);return l end
function Drawing:line(x1,y1,x2,y2,layer) assert(type(x1)=='number' and type(y1)=='number' and type(x2)=='number' and type(y2)=='number','invalid points');local e=Entity:new('LINE',{x1=x1,y1=y1,x2=x2,y2=y2,layer=layer or '0'});table.insert(self.entities,e);return e end
function Drawing:circle(x,y,r,layer) assert(type(r)=='number' and r>0,'radius must be positive');local e=Entity:new('CIRCLE',{x=x,y=y,radius=r,layer=layer or '0'});table.insert(self.entities,e);return e end
function Drawing:rectangle(x1,y1,x2,y2,layer) local e=Entity:new('RECTANGLE',{x1=math.min(x1,x2),y1=math.min(y1,y2),x2=math.max(x1,x2),y2=math.max(y1,y2),layer=layer or '0'});table.insert(self.entities,e);return e end
function Drawing:summary() return {name=self.name,units=self.units,layer_count=#self.layers,entity_count=#self.entities} end
local d=Drawing:new('Lua Example'); d:add_layer('OBJECTS','#7dd3fc'); d:line(0,0,100,60,'OBJECTS'); d:circle(50,50,20,'OBJECTS'); d:rectangle(-20,-10,20,10,'0'); return d