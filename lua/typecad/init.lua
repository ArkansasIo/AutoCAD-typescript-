-- TypeCAD Lua API prototype. The host injects the restricted 'cad' table.
-- Production execution must use a sandbox with no io, os, package, debug,
-- arbitrary require(), shell access, or unrestricted network/filesystem access.

local Entity = {}
Entity.__index = Entity

function Entity:new(kind, props)
  return setmetatable({ kind = kind, props = props or {} }, self)
end

local Drawing = {}
Drawing.__index = Drawing

function Drawing:new(name)
  return setmetatable({
    name = name or "Untitled",
    units = "mm",
    layers = { { name = "0", color = "#dbe7f3", visible = true } },
    entities = {}
  }, self)
end

function Drawing:add_layer(name, color)
  assert(type(name) == "string" and #name > 0, "layer name required")
  for _, layer in ipairs(self.layers) do
    assert(layer.name ~= name, "layer already exists: " .. name)
  end
  local layer = { name = name, color = color or "#dbe7f3", visible = true }
  table.insert(self.layers, layer)
  return layer
end

function Drawing:line(x1, y1, x2, y2, layer)
  assert(type(x1) == "number" and type(y1) == "number", "invalid start point")
  assert(type(x2) == "number" and type(y2) == "number", "invalid end point")
  local entity = Entity:new("LINE", { x1=x1, y1=y1, x2=x2, y2=y2, layer=layer or "0" })
  table.insert(self.entities, entity)
  return entity
end

function Drawing:circle(cx, cy, radius, layer)
  assert(type(radius) == "number" and radius > 0, "radius must be positive")
  local entity = Entity:new("CIRCLE", { cx=cx, cy=cy, radius=radius, layer=layer or "0" })
  table.insert(self.entities, entity)
  return entity
end

function Drawing:rectangle(x1, y1, x2, y2, layer)
  local entity = Entity:new("RECTANGLE", {
    x1=math.min(x1,x2), y1=math.min(y1,y2),
    x2=math.max(x1,x2), y2=math.max(y1,y2), layer=layer or "0"
  })
  table.insert(self.entities, entity)
  return entity
end

function Drawing:summary()
  return { name=self.name, units=self.units, layers=#self.layers, entities=#self.entities }
end

-- Sample script model; a host adapter must translate these objects into CAD document entities.
local drawing = Drawing:new("Lua Example")
drawing:add_layer("OBJECTS", "#7dd3fc")
drawing:line(0, 0, 100, 60, "OBJECTS")
drawing:circle(50, 50, 20, "OBJECTS")
drawing:rectangle(-20, -10, 20, 10, "0")

if cad and cad.log then
  local info = drawing:summary()
  cad.log(string.format("Lua drawing '%s': %d entities, %d layers", info.name, info.entities, info.layers))
end

return drawing