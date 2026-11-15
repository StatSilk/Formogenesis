# Petal Lab: curvature method comparison

Published preview: https://statsilk.github.io/StatFlowers/petal-lab.html

## Color legend (v0.2.6)
- **Orange, shape mode:** the original procedural petal surface.
- **Green, shape mode:** a kinematic growth-stretch deformation of that surface, with spatially varying longitudinal and transverse stretches.
- **Orange, heatmap mode:** a directional tangent-change proxy.
- **Green, heatmap mode:** cotangent-weighted discrete mean-curvature magnitude.

The blue flat baseline is **not rendered** in v0.2.6. Default shape comparison uses two different geometries. See [DIFFERENTIAL_GROWTH_EXPERIMENT.md](DIFFERENTIAL_GROWTH_EXPERIMENT.md) for the growth-stretch parameterization. It is an illustrative kinematic construction, **not** a solution of tissue growth, stress, strain compatibility, elastic force balance, or petal self-contact. In heatmap mode, orange and green use the **same procedural petal mesh** and independently normalized estimators; their colors must not be treated as equal physical units.

## Method
For a triangle mesh, each triangle contributes cotangents of its interior angles to weights on opposite edges. For vertex `i`, the discrete Laplace-Beltrami estimate is

`Delta x_i ≈ (1 / (2 A_i)) Σ_j (cot α_ij + cot β_ij) (x_j - x_i)`

with barycentric vertex area `A_i`. The mean-curvature magnitude is estimated as `|Delta x_i| / 2`. The implementation computes the equivalent `|Σ_j weights * (x_j-x_i)| / (4 A_i)`. It handles mesh boundaries with the available incident faces; boundaries and degenerate triangles are a source of numerical error.

This is an in-project JavaScript implementation of the standard cotangent discretization, **not an integration of geometry-processing-js or libigl**. Cotangent processing is performed only for the green heatmap, not on every geometry rebuild. The implementation is dependency-light but still needs numerical validation against known surfaces.

## References
- Meyer, M., Desbrun, M., Schröder, P., & Barr, A. H. (2003). Discrete differential-geometry operators for triangulated 2-manifolds. In *Visualization and Mathematics III*. https://doi.org/10.1007/978-3-662-05105-4_2
- Crane, K., Weischedel, C., & Wardetzky, M. (2013). Geodesics in Heat: A New Approach to Computing Distance Based on Heat Flow. *ACM Transactions on Graphics*, 32(5). (Background on discrete mesh operators; not a validation of the petal model.)
- geometry-processing-js: https://github.com/GeometryCollective/geometry-processing-js
- Three.js: https://threejs.org/docs/
- Liang, H., & Mahadevan, L. (2011). Growth, geometry, and mechanics of a blooming lily. *Proceedings of the National Academy of Sciences*, 108(14), 5516–5521. https://doi.org/10.1073/pnas.1007808108 (Biological-mechanics context; this lab does not implement their model.)

## Validation still required
1. Numerically test a plane (near-zero interior mean curvature) and sphere (approximately inverse radius).
2. Inspect boundary artifacts and sensitivity to mesh resolution.
3. Compare with measured petal scans and actual production meshes.
4. Benchmark interactive rendering on mobile.

The growth animation remains illustrative, and no physically based tissue-growth simulation or collision handling is claimed.
