# Planes and subplanes

Each plane stores `id`, `name`, `parentId`, `origin`, `normal`, `up`, `visible`, `locked` and `gridSpacing`. Parent IDs form the hierarchy. `PlaneManager` provides children, ancestry, local basis and local/world coordinate conversion.

**Current limitation:** entity data is 2D and the renderer displays it on a shared XY view. Arbitrary plane transforms are not yet integrated into drawing input, rendering, snapping, annotations or file export. Full support must compose parent transforms and wire them consistently through those systems.