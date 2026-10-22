# TypeCAD

TypeScript browser CAD prototype with a Three.js viewport, simple 2D geometry, command registry, local JSON persistence, limited DXF export, Express REST API/MySQL schema, settings, TCS scripting foundation and Lua OOP examples.

> This is an evolving prototype and is not a full AutoCAD replacement. Constraint solving, blocks, xrefs, full 3D geometry, production plotting and broad DWG interoperability remain roadmap or licensed integrations.

## Run locally
1. Install Node.js 20+ and MySQL 8.
2. Copy `.env.example` to `.env` and set credentials.
3. Apply `db/schema.sql` in MySQL.
4. Run `npm install`, then `npm run dev`.
5. In another terminal run `npm run server`.

## Structure
- `src/core`: document model and command registry
- `src/geometry`: primitives and limited DXF export
- `src/rendering`: Three.js renderer
- `src/scripting`: restricted TCS grammar, scripting docs
- `lua/`, `tcs/`: script examples
- `src/math/`, `wolfmain-alpha/`: WolfMain Alpha adapter boundary
- `server/`, `db/`: API and MySQL schema
- `config/`: application/layer/command settings
- `docs/`, `uml/`: docs and Mermaid diagrams
- `terminal/`: terminal subsystem design

GitHub Pages hosts the static client only. Host the API and MySQL separately. Native DWG should use a properly licensed SDK. WolfMain Alpha source/API was not supplied, so only an adapter seam and math fallback are included.