# TypeCAD

TypeScript-first browser CAD application foundation with a Three.js viewport, Express API, MySQL persistence, DXF exchange foundation, configurable commands/layers, and UML documentation.

> **Project status:** foundation/prototype. This is not a complete AutoCAD replacement. A production-grade CAD system still requires a robust geometric kernel, constraint solver, full editing commands, plotting engine, and licensed DWG interoperability.

## Technology

- TypeScript, Vite, Three.js
- Node.js, Express, mysql2
- MySQL 8+
- Mermaid UML
- GitHub Pages workflow for the browser client

## Quick start

1. Install Node.js 20+ and MySQL 8+.
2. Copy `.env.example` to `.env` and configure database credentials.
3. Create the database and run `db/schema.sql`.
4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

   In a second terminal: `npm run server`.

5. Open the Vite URL printed by the development server.

## Scripts

- `npm run dev` — web client
- `npm run build` — type-check/build client
- `npm run server` — API server
- `npm run typecheck` — TypeScript checks

## Implemented starter capabilities

- CAD drawing/entity data model
- Basic LINE, CIRCLE, and RECTANGLE creation
- Layer metadata and command registry
- Three.js scene viewport
- Browser-local drawing persistence
- Express health and drawing API foundations
- MySQL schema for users, projects, drawings, entities, layers, revisions
- DXF ASCII export foundation
- Configuration, architecture docs, feature matrix, and Mermaid UML

## Roadmap

See [docs/FEATURE_MATRIX.md](docs/FEATURE_MATRIX.md) for the implementation roadmap covering selection, snaps, transformations, trims, polylines, dimensions, hatches, blocks, constraints, 3D modeling, plotting/PDF, collaboration, access control, scripting, and interoperability.

## Deployment

GitHub Pages hosts the static client only. The Express API and MySQL database require a separate server/managed database; do not place credentials in client-side code or GitHub Pages.

## File format note

DWG is proprietary. Integrate native DWG read/write through a properly licensed SDK or vendor-approved service. DXF support in this foundation is intentionally limited.

## License

Choose and add a license before redistributing this project.