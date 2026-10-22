# WolfMain Alpha integration

## Provenance

The actual WolfMain Alpha source/package/API was not provided. TypeCAD currently has an adapter interface and numeric fallback; it does not bundle or reproduce an upstream library.

## Integration procedure

1. Provide the official repository/package and license.
2. Verify package/API version and exported functions.
3. Implement `WolfMainAlphaBackend` against documented exports.
4. Add unit tests for float tolerance, degenerate inputs and intersections.
5. Record source provenance, version and license in the dependency notices.

Planned math domains: vector/matrix algebra, affine and homogeneous transforms, line/segment/circle intersections, bounding boxes, curve tessellation, unit conversion, robust predicates, parametric equation solvers and 3D coordinate systems. A production CAD kernel also requires topology management and extensive robustness testing.