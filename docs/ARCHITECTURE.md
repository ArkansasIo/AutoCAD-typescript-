# Architecture

- Client: Vite + TypeScript.
- Model: typed entities, layers, units, workplanes and snapshot history.
- Renderer: Three.js XY viewport; model coordinates are authoritative.
- Tools and menus: shared command registry and tool catalog.
- Planes: nested metadata and local/world coordinate helpers.
- Scripting: restricted TCS grammar; Lua VM is planned.
- Persistence: localStorage prototype and Express/MySQL scaffold.
- DWG: licensed adapter only.

Production gates include authentication/authorization, request validation, rate limiting, import safety, script limits, backup/recovery, revision concurrency and extensive tests.