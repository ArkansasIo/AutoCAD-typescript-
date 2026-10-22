# Planes and subplanes

Each workplane contains `id`, `name`, `parentId`, `origin`, `normal`, `up`, `visible`, `locked` and `gridSpacing`. Parent plane IDs create a nested hierarchy. `PlaneManager` provides children/ancestry, a local basis, `toWorld` and `fromWorld` conversions.

**Current limitation:** entity coordinates are still two-dimensional and the renderer displays them on a shared XY view. Arbitrary plane transforms are not yet applied to picking, rendering, snapping, dimensions or exports. Full workplane support must connect all of those systems and compose parent transforms.