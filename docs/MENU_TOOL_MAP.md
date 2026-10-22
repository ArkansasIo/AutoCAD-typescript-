# Menu/submenu and tool map

- **File:** New Drawing, Open JSON, Save JSON, Save As (planned), Export DXF, Options.
- **Edit:** Undo, Redo, Select, Select All (planned).
- **Draw:** Line, Circle, Rectangle, Polyline, Arc, Ellipse, Spline, TCS Script.
- **Modify:** Move, Copy, Rotate, Scale, Mirror, Trim, Extend, Offset, Fillet, Chamfer.
- **View:** Zoom Extents, Grid Settings, Workplane Manager, Coordinate System.
- **Insert:** Block, External Reference, Image/PDF Underlay.
- **Format:** Layers, Workplanes, Units, Dimension Styles.
- **Tools:** TCS, Lua, Command Catalog, WolfMain Alpha math.
- **Window:** Workspace Profiles, View Manager.
- **Help:** About, Feature Matrix, Documentation.

Menu definitions are in `src/commands/menus.ts`; the tool catalog is in `src/commands/tools.ts`. The visible editor implements basic actions and reports roadmap items as not implemented.