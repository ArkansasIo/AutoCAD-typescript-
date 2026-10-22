# Architecture

- Client: Vite + TypeScript.
- Document model: typed entities, layers, units, workplanes, change notifications and snapshot history.
- Renderer: Three.js XY viewport; model coordinates are authoritative.
- Commands/tools: shared registry, aliases and tool catalogue.
- Workplanes: nested plane metadata and local/world coordinate basis helper.
- Scripts: restricted TypeCAD Script (TCS); Lua is an example API until a VM/sandbox is integrated.
- Persistence: localStorage prototype, JSON import/export and Express/MySQL scaffold.
- DWG: vendor-approved licensed adapter only.

Before production, add authentication, project-level authorization, request validation, rate limits, import safety, script quotas, robust geometry topology, backup/recovery, revision concurrency and integration tests.