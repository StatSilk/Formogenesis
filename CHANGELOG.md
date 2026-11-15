# Changelog

Notable changes to Formogenesis: Flowers are documented here. Versions describe development milestones, not scientific validation.

## [0.3.4] - 2026-11-15

### Anatomical bases and flatter frangipani petals
- Removed the same large green spherical receptacle from almost every flower.
- Added shallow, layered, lanceolate phyllaries beneath the four Asteraceae composite heads (sunflower, daisy, gerbera and coneflower), and thinned the solid backing disc.
- Retained the rose's own hypanthium, the frangipani's small calyx and tube, and direct stem connections for poppy and tulip.
- Rebuilt frangipani lobes in local tangent planes instead of sweeping their cross-sections around a circular arc; removed the edge-downturn that made the margins look folded.
- Introduced a smooth, one-sided interpetal height offset to clarify the shingled overlap while keeping margins flat. This is a geometric overlap approximation, not a tissue-contact solver.

## [0.3.3] - 2026-11-15

### Frangipani visual correction
- Fixed a vertex-colour interpolation aliasing bug that rendered mature corolla lobes dark green.
- Connected each petal sector at the shared corolla throat, closing unrealistic star-shaped gaps between the five lobes.
- Replaced the pale hollow cylindrical centre with a recessed golden throat and a matching tube-to-lobe colour gradient.
- Retained the green juvenile bud, one-sided overlap and smooth open petals; these remain illustrative geometry, not a validated tissue-growth model.

## [0.3.2] - 2026-11-15

### Vogel first, and frangipani
- Made the fixed-angle Vogel construction the default model for all composite flower heads and put its control first.
- Replaced Lily with Frangipani (Plumeria): fivefold corolla symmetry, a common funnel-like corolla tube, consistently directed lobe overlap and unfolding motion.
- Added a yellow-centred-to-cream petal pigment gradient, green early bud and smooth rounded lobes; retained editable dimensions and stages.
- Frangipani overlap and opening are phenomenological visualizations, not a validated tissue-growth simulation.

## [0.3.1] - 2026-11-15

### More natural flower stems
- Replaced uniform, thick cylinder stems with slimmer tapered, gently curving meshes and subtle longitudinal ridges.
- Introduced deterministic per-vertex green variation and matte materials for softer, less plastic-looking stalks.
- Joined leaves to the stem centreline and replaced the tulip's thick cylindrical collar with a tapered organic neck.
- Retained the original stem-length controls and bud-to-bloom growth behaviour; the new surface is illustrative rather than a tissue-mechanics model.

## [0.3.0] - 2026-11-15

### Self-organizing phyllotaxis
- Added local inhibition-driven primordium placement to composite flower heads: a new site minimizes the summed distance-decay field left by prior primordia, which drift radially as the meristem grows.
- Added a single inhibition-radius slider, branching into representative Fibonacci-like and Lucas-like spirals and near-synchronous paired / threefold regimes, plus a fixed-angle Vogel reference toggle.
- Added a ten-second, top-view seed-assembly animation that updates instanced florets and the 2D pattern inset without rebuilding the whole flower at each animation frame.
- Added a separate documented mathematical module and deterministic regression tests.
- Disclosed that early-growth history is coupled to the radius control and paired/threefold cohorts use a constrained symmetric ansatz; no biological auxin transport or predictive transition thresholds are claimed.

## [0.2.9] - 2026-11-15

### Growth-metric and bilayer experiment
- Introduced a small constrained numerical search over cup and edge-wave surfaces that minimizes mismatch against a prescribed anisotropic growth metric.
- Ripple half-wave count now responds to edge-growth strain, assumed thickness, petal length and mesh resolution, with a heuristic strip-instability preference instead of a fixed sine frequency.
- Added an equal-layer bilayer circular-arc bend based on κ ≈ 3Δε/(2h), with strain and thickness controls in stated units in the Petal Lab.
- Replaced hard-coded transverse sine ruffles in generic petals, rose rims and composite rays with growth-informed shape terms.
- Documented the method's constraints, uncalibrated parameters, scientific references, and outstanding validation needs. Other flower geometry remains partly procedural.

## [0.2.8] - 2026-11-15

### Navigation and links
- Updated public links and social-preview metadata for the renamed Formogenesis repository and GitHub Pages path.
- Prioritized Sunflower as the first selectable and initial flower family, and simplified the public navigation.
- Expanded the project description to include emergent behaviours alongside natural forms.

## [0.2.7] - 2026-11-15

### Formogenesis identity
- Adopted **Formogenesis** as the umbrella name and **Flowers** as this experiment's name, without a "Lab" suffix.
- Updated visible application branding, scientific documentation, page titles and social artwork, while retaining working published URLs.
- Kept standalone experiment boundaries so future mushrooms and fingerprint experiments can be added without forcing premature shared dependencies.

### Documentation and usability
- Reconciled petal lab terminology and its single v0.2.6 version label with the growth-stretch and curvature experiments.
- Added verified foundational phyllotaxis and lily growth/mechanics references, and clarified the mathematical limitations.
- Updated README with experiment links, a procedural visual preview, source layout, and Three.js attribution.
- Added Open Graph images for published pages.
- Added an explicit embedded-view mode to hide mobile toolbars without dependence on parent-page CSS injection.
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

[0.2.9]: https://github.com/StatSilk/Formogenesis/commits/main/
[0.2.8]: https://github.com/StatSilk/Formogenesis/commits/main/
[0.2.7]: https://github.com/StatSilk/Formogenesis/commits/main/
[0.2.6]: https://github.com/StatSilk/Formogenesis/commits/main/
[0.1.0]: https://github.com/StatSilk/Formogenesis/commits/main/
