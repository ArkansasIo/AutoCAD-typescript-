# Menu/submenu and tool map

- **File:** New, Open JSON, Save JSON, Save As (planned), Export DXF, Options.
- **Edit:** Undo, Redo, Select, Select All (planned).
- **Draw:** Line, Circle, Rectangle, Polyline, Arc, Ellipse, Spline, TCS script.
- **Modify:** Move, Copy, Rotate, Scale, Mirror, Trim, Extend, Offset, Fillet, Chamfer.
- **View:** Zoom Extents, Grid Settings, Workplane Manager, Coordinate System.
- **Insert:** Block, External Reference, Image/PDF Underlay.
- **Format:** Layers, Workplanes, Units, Dimension Styles.
- **Tools:** TCS, Lua, Command Catalog, WolfMain Alpha math.
- **Window:** Workspace Profiles, View Manager.
- **Help:** About, Feature Matrix, Documentation.

Menu data lives in `src/commands/menus.ts`; tool data in `src/commands/tools.ts`. The visible template has basic handlers and reports planned items honestly.