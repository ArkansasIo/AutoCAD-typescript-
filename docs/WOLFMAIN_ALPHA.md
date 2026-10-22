# WolfMain Alpha integration

The upstream WolfMain Alpha package/source/API was not supplied. TypeCAD includes `src/math/WolfMainAlphaAdapter.ts` as an interface and native numeric fallback, not the original library.

When the real API is available, verify provenance/version/license, map official operations to the adapter and add reference tests for tolerances, degenerate vectors and geometry intersections. Planned math areas include vector/matrix algebra, transforms, robust predicates, curve functions, units, spatial bounds and parametric constraints.