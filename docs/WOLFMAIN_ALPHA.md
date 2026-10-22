# WolfMain Alpha math integration

The original WolfMain Alpha package/source and API were not supplied with this task. TypeCAD therefore includes an **adapter boundary and native fallback**, not a claim to include the external library.

The adapter in `src/math/WolfMainAlphaAdapter.ts` covers vector distance, dot/cross products, normalization, floating-point tolerance, clamping, line length and circle area. Replace the fallback with official exports only after checking the upstream source, version and license.

Planned integration areas: vectors/matrices, affine transforms, line and circle intersections, bounding boxes, curve tessellation, units, robust predicates, parametric equation solving and 3D transforms. Production CAD needs topology support and extensive numerical robustness tests.