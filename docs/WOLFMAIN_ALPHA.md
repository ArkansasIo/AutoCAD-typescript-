# WolfMain Alpha integration

The original WolfMain Alpha library source/package/API was not supplied. TypeCAD includes `src/math/WolfMainAlphaAdapter.ts` as an integration boundary and a native math fallback, not the upstream library itself.

When the official source is available, verify provenance, version and license, map documented exports to the adapter, and add reference tests for numeric tolerance, degeneracy and geometry intersections. Planned math topics include vector/matrix algebra, transformations, robust predicates, curve math, units, spatial bounds and parametric equations.