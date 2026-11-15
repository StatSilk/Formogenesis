# Changelog

Notable changes to Formogenesis: Flowers are documented here. Versions describe development milestones, not scientific validation.

## [0.2.7] - 2026-11-15

### Formogenesis identity
- Adopted **Formogenesis** as the umbrella name and **Flowers** as this experiment's name, without a "Lab" suffix.
- Updated visible application and card branding, scientific documentation, page titles and social artwork, while retaining working published URLs.
- Kept standalone experiment boundaries so future mushrooms and fingerprint experiments can be added without forcing premature shared dependencies.

### Documentation and usability
- Reconciled petal lab terminology and its single v0.2.6 version label with the growth-stretch and curvature experiments.
- Added verified foundational phyllotaxis and lily growth/mechanics references, and clarified the mathematical limitations.
- Updated README with card and experiment links, a procedural visual preview, source layout, and Three.js attribution.
- Added Open Graph images for the studio and public greeting cards.
- Added an explicit card-embed mode to hide mobile toolbars without dependence on parent-page CSS injection.
- Clarified rose symmetry as layered staggered whorls; removed unused petal lab branches and skipped unnecessary curvature work outside heatmap mode.
- Throttled repeated growth-geometry rebuilds on touch devices; full mobile performance benchmarks remain outstanding.

## [0.2.6] - 2026-11-14

### Petal geometry laboratory
- Compared the original orange procedural petal with a green kinematic growth-stretch model, using a spatially varying stretch field.
- Added curvature heatmap comparison: orange directional tangent-change proxy versus green cotangent-weighted discrete mean-curvature magnitude on identical geometry.
- Added deterministic low-frequency variation, flower-whorl comparison, direct curvature and mesh-resolution controls, and mobile touch rotation/zoom.
- Documented that the geometry is illustrative and neither a validated differential-growth nor elastic-sheet solver; the blue baseline is no longer rendered.

### Earlier v0.2.x geometry refinements
- Replaced the rose's intersecting tangent-plane petal geometry with nested curved radial sectors and constrained inward rim folds.
- Loosened the mature tulip's upper tepals, increasing individual height, lean, bend and rim variation while keeping a closed juvenile bud.
- Tulip now begins as a tightly gathered green bud; the tepals elongate, develop pigment, and slowly open into a bulbous six-part cup with no detached green sphere.
- Rose outer petals now return inward near their upper rims to support the inner layers and avoid an outward-flaring, flat dish silhouette.
- These are visual geometry refinements; browser-level rendering review remains useful before the next release.

### Added
- Staged rose development based on an illustrative green-bud-to-bloom sequence: enclosing sepals, sepal reflexing, compact red bud, progressively opening outer petals, and later-opening inner whorls.
- Rose growth-stage descriptions alongside the bud-to-bloom timeline.

### Changed
- Connected the tulip bud to a growing stem using a narrow collar, avoiding an empty gap and exposed early-stage stamens.
- Deepened the rose's mature bowl-shaped profile and added subtle per-petal variation to roses, tulips, lilies, poppies and composite flowers.
- Changed tulip tepals to gently bulging curved forms; removed the conspicuous green spherical receptacle beneath tulips, and linked tulip bud rise to stem elongation.
- Improved gerbera petal-tip rounding with denser surface sampling; slightly zoomed out its default view.
- Replaced the Flower Size slider with discreet +/− camera zoom buttons and a percentage indicator.
- Moved the Three.js application code into `app.js` so GitHub recognizes JavaScript alongside HTML.
- Reworked the default gerbera toward a single-like, two-tier bloom with fewer, wider ray florets and natural variations in length, curvature and droop, informed by gerbera floral classifications.
- Reduced the initial rose green-bud proportions while enlarging the rounded, open outer petal layers.
- Rebuilt tulip tepals as two nested, curved whorls rather than intersecting tangent planes, retaining the green-to-pigmented bud animation.
- Improved distinction between overlapping rose petal layers.
- Maintained flower-specific controls, 3D and top-down viewing, and phyllotaxis experiments.

### Limitations
- Flower geometries and stage timing are illustrative mathematical models, not botanically validated measurements.
- Interactive 3D rendering and animation have not been comprehensively browser-tested across devices.

## [0.1.0] - 2026-11-13

### Added
- First public-source release of the independent 3D Flowers playground.
- Rose, tulip, lily, sunflower, daisy, gerbera, coneflower, and poppy families.
- Geometric rose-style variants, editable flower parameters, growth animation and overhead views.
- Approximate golden-angle floret arrangements for composite flower heads.
- MIT license and scientific-accuracy notice.

[0.2.7]: https://github.com/StatSilk/StatFlowers/commits/main/
[0.2.6]: https://github.com/StatSilk/StatFlowers/commits/main/
[0.1.0]: https://github.com/StatSilk/StatFlowers/commits/main/
