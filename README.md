# Formogenesis

*Exploring how simple rules create complex forms and behaviours.*

Formogenesis is an open collection of interactive experiments in natural pattern formation, mathematical geometry and growth. The first experiment, **Flowers**, explores 3D botanical shapes, bloom animations and phyllotaxis. Future experiments may explore mushrooms, fingerprints, collective behaviour and other emergent systems. The visual models are experimental, with their scientific limitations documented alongside them.

![Procedural sunflower and golden-angle floret visualization](assets/social-preview.png)

*Illustrative procedural preview of sunflower phyllotaxis. The [Flowers experiment](https://statsilk.github.io/Formogenesis/) contains the interactive 3D models.*

## Run the app

[**Explore Flowers**](https://statsilk.github.io/Formogenesis/) · [**Compare petal methods**](https://statsilk.github.io/Formogenesis/petal-lab.html).

The site runs directly in your browser. `index.html` is the interface, `app.js` contains the flower geometry and controls, and Three.js is loaded from a CDN. An internet connection is required.

## First public preview

See the [v0.1.0 release notes](RELEASE_NOTES_v0.1.0.md). This is an experimental preview; botanical realism is still being refined.

## Source layout — Flowers experiment

The existing flower application stays at the repository root for now to preserve published URLs. Each future experiment can remain independently versioned and published, with a shared Formogenesis index connecting them. Reusable visualization and math code can be extracted into shared packages when it is actually shared by more than one experiment.

- `index.html`: interactive 3D studio interface and responsive layout
- `app.js`: procedural flower meshes, growth stages, 3D renderer and interactions
- `petal-lab.html`: orange reference / green growth-metric and bilayer comparison, plus curvature heatmaps
- `growth-metric.js`: reduced-order growth metric, candidate-mode fitting and equal-layer bilayer bending
- `phyllotaxis.js`: local-inhibition field, radial displacement and sequential primordium placement
- `INHIBITION_PHYLLOTAXIS_EXPERIMENT.md`: inhibition equations, regime explanations, limitations and references
- `tests/phyllotaxis.test.mjs`: deterministic regression checks for the four representative regimes
- `PETAL_CURVATURE_METHODS.md`: discrete curvature mathematics and scientific limitations
- `DIFFERENTIAL_GROWTH_EXPERIMENT.md`: growth metric, numerical model, bilayer derivation, limitations and references
- `assets/social-preview.png`: reproducible procedural preview; source in `scripts/generate-social-preview.mjs`
- `CHANGELOG.md`: development history and model limitations

## Features

- Eight flower families including sunflower, rose, tulip, frangipani, daisy, gerbera, coneflower, poppy
- Several rose styles, inspired by natural and geometric forms
- 3D and top-down views, soft shadows, petal controls and colors
- Tapered, gently bending stems with subtle longitudinal texture and species-dependent thickness
- Flower-specific bases: layered green phyllaries for sunflower-like composite heads; small calyces or hypanthia where appropriate, without generic green spheres
- Bud-to-bloom timeline and growth animation, including five-lobed frangipani with an illustrative twisted-overlap bud
- Vogel golden-angle arrangement is the default sunflower display; inhibition mode builds locally from sequential primordia
- Inhibition-driven primordium assembly: a 10-second top-down growth animation, adjustable inhibition radius and Fibonacci-like, Lucas-like, doubled-spiral and whorl-pattern comparisons
- Vogel fixed-angle reference shown first and selected by default on composite flower heads, with a local-inhibition experiment available for comparison
- Side-by-side petal geometry laboratory comparing procedural and growth-metric-fitted surfaces, idealized bilayer bending, and curvature estimators

## Scientific accuracy

**Experimental model:** Flower forms and bloom animations are illustrative approximations, not mathematically exact reconstructions or predictive plant biology. The new local-inhibition method produces patterns by iteratively selecting low-inhibition initiation sites and letting older primordia move outward, while the original Vogel construction remains as a fixed-angle reference. Both are simplified; real flowers differ substantially in development. The experimental growth-metric model fits a limited family of candidate shapes to prescribed in-plane lengths, and uses an idealized equal-layer bilayer formula for curling; it is not a validated shell or tissue-growth solver. See [method and limitations](DIFFERENTIAL_GROWTH_EXPERIMENT.md).

For composite heads, the fixed-angle Vogel construction is the default/reference; switch to local inhibition to watch the pattern emerge from sequential placement. The inhibition demonstration includes an illustrative initiation-timing coupling and constrained multi-primordium cohorts; the displayed transition points are not biological thresholds. See the [phyllotaxis methods, assumptions and limitations](INHIBITION_PHYLLOTAXIS_EXPERIMENT.md). Foundational sources:

- Vogel, H. (1979). A better way to construct the sunflower head. *Mathematical Biosciences*, 44(3–4), 179–189. https://doi.org/10.1016/0025-5564(79)90080-4
- Douady, S., & Couder, Y. (1992). Phyllotaxis as a physical self-organized growth process. *Physical Review Letters*, 68(13), 2098–2101. https://doi.org/10.1103/PhysRevLett.68.2098
- Douady, S., & Couder, Y. (1996). *Phyllotaxis as a dynamical self organizing process*, Parts I and II. *Journal of Theoretical Biology*, 178(3), 255–294. https://doi.org/10.1006/jtbi.1996.0024 and https://doi.org/10.1006/jtbi.1996.0025
- Liang, H., & Mahadevan, L. (2011). Growth, geometry, and mechanics of a blooming lily. *PNAS*, 108(14), 5516–5521. https://doi.org/10.1073/pnas.1007808108 (Background for growth mechanics, not implemented here.)

### Floral bases and petal overlap

An Asteraceae flower head sits above a flattened to conical receptacle and overlapping green **involucral bracts (phyllaries)**; it does not have a generic spherical calyx. Roses have a small hypanthium, Plumeria a narrow corolla tube and five-lobed calyx, and Papaver sepals normally fall off as the bud opens. The current 3D models make simplified, flower-specific choices. The frangipani's flat, overlapping lobes use a prescribed small one-sided height offset to prevent surface intersections; this is visual geometry, not a contact-mechanics or growth solver.

- [Flora of North America — Asteraceae](https://efloras.org/florataxon.aspx?flora_id=1&taxon_id=10074)
- [Flora of North America — Papaveraceae](https://efloras.org/florataxon.aspx?flora_id=1&taxon_id=10650)
- [Kew Science — Plumeria](https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:30001863-2/general-information)

### Frangipani morphology reference

The frangipani is a simplified five-lobed Plumeria corolla with consistent overlapping (contorted) bud aestivation and a common tubular throat. The lobes are visually coupled through the tube, but their opening trajectories and colours are artistic parameterizations—not an experimentally fitted growth law. Botanical descriptions:

- [Kew Science — Plumeria genus](https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:30001863-2/general-information)
- [Flora of North America — Plumeria](https://www.efloras.org/florataxon.aspx?flora_id=1&taxon_id=126110)

## Origins

Independently implemented for this project. Inspired by botanical geometry approaches such as [Floraison](https://github.com/Wally869/Floraison); this project is **not a fork** and does not include Floraison source code.

The white/yellow Plumeria view uses a golden tubular throat and five overlapping lobes; the mature corolla is ivory with a soft yellow centre, while the immature bud is green. Its geometry remains an illustrative model.

## Changes and development status

See [CHANGELOG.md](CHANGELOG.md) for updates, experimental limitations and release history. The rose-growth model currently follows illustrative development stages, not a validated cellular-growth simulation.

## License

Released under the permissive [MIT License](LICENSE). You may use, modify and redistribute the code, including commercially, provided the copyright and license notices are retained.

### Third-party software

[Three.js](https://threejs.org/) is loaded from a CDN for 3D rendering and is distributed under the [MIT License](https://github.com/mrdoob/three.js/blob/master/LICENSE). The project's custom flower and petal geometry code is implemented separately.
