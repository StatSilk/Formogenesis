# Differential growth metrics and bilayer bending

Live comparison: https://statsilk.github.io/Formogenesis/petal-lab.html

Version 0.2.9 introduces a **reduced-order growth-metric fit** (green) alongside a smooth procedural reference (orange). The central claim is limited: prescribed local growth can select cupping and edge-wave candidates through a numerical metric-mismatch objective. This is **not** a validated model of flower morphogenesis, a finite-element shell solver, or a reproduction of the cited papers.

## Target in-plane metric

Let `t ∈ [0,1]` measure base-to-tip distance and `u ∈ [-1,1]` measure petal width. The reference sheet has normalized coordinates `s=t` and `x=u w(t)`. The requested material line element is

`ds*² = λ_t(t,u)² ds² + λ_u(t,u)² dx²`

with `f(t)=0.15+0.85t`, `C(u)=(1-u²)²` and `E(u)=|u|³`:

- `λ_t = 1 + f(t) [ε_center C(u) + ε_edge E(u)]`
- `λ_u = 1 + f(t) [0.45 ε_center C(u) + 0.12 ε_edge E(u)]`

The different transverse coefficients are explicitly **heuristic**: they create a tractable anisotropic demonstration, not an experimentally measured growth tensor. Greater central growth tends to favour a cup; greater longitudinal edge growth tends to favour buckled edge waves. The model does not calculate Gaussian curvature directly or guarantee its predicted sign everywhere.

## Numerical approximation and selected wavelengths

Rather than applying a hard-coded `sin(5u)` ruffle, the code evaluates a small family of candidate height fields:

`z(t,u) = C (1-u²) sin(πt) + A |u|^2.6 sin(πt)^0.7 sin(mπt)`

The integer `m` is a count of **half-waves along the petal length**, not a user-selected frequency. A candidate is scored using

`E = mean_edges [(ℓ_candidate - ℓ_target) / ℓ_reference]² + E_bend + E_core + E_mode`.

Each target edge length is calculated from the growth metric; the two amplitudes `C` and `A` are selected from positive candidate ranges by minimization. These constrained ranges are a simplifying model choice, not spontaneous mode emergence in a full elastic solver. `E_bend` regularizes curvature, `E_core` penalizes departures from the central sheet and `E_mode` is a heuristic strip-instability preference.

The mode preference scales approximately with `L sqrt(ε_edge) / sqrt(h w_edge)`, where `L` is assumed petal length, `h` is tissue thickness and `w_edge=0.12L` is an assumed boundary-strip coupling width. The reported approximate wavelength is `λ≈2L/m`. Because the mode is limited by mesh resolution and a reduced candidate set, convergence with resolution remains unverified.

The displayed RMS mismatch is **the best-fit reduced-family metric residual** on the reference grid. It is not a prediction error against measured flower geometry.

## Bilayer curl

The through-thickness component is separate from the in-plane growth metric. For a long, thin bilayer strip with **equal layer thicknesses and equal elastic moduli**, the simplified Timoshenko relation is

`κ ≈ 3 (ε_upper − ε_lower) / (2h)`.

Here `κ` has units mm⁻¹ when `h` is in millimetres and each `ε` is a dimensionless strain. For a petal length `L`, the rendered centerline uses a circular-arc approximation: normalized outward displacement `[1−cos(κLt)]/(κL)` and axial displacement `sin(κLt)/(κL)−t`. Total rotation is capped at ±1.6 radians for interactive stability.

This is a **bimetal-strip analogy**, not a claim that all petals curl through upper/lower epidermal differential expansion. The 2011 lily research particularly emphasized edge-driven growth. Real petals have heterogeneous layers, varying stiffness, hydration and 3D constraints.

## What is and is not implemented

- Implemented in `growth-metric.js`: target metric, reduced candidate-mode search, RMS metric mismatch and bounded equal-layer bilayer curvature.
- Implemented in `petal-lab.html`: controls for central/edge growth, signed upper-minus-lower strain in 0.1% units, assumed thickness in 0.1 mm units, mesh resolution and growth stage. Green uses this fit; orange is the procedural reference. Heatmap mode retains identical reference geometry and separate curvature estimators.
- Implemented conservatively in `app.js`: growth-informed ruffle heights for generic petals, rose rims and composite rays, plus simplified bilayer bending for generic petals. Several rose, tulip and composite flower design parameters remain procedural to preserve their distinct appearance.

The code uses Three.js for rendering and an in-project numerical search; no specialist mechanics library is integrated.

## Scientific references

1. Sharon, E., Roman, B., Marder, M., Shin, G.-S., & Swinney, H. L. (2002). Buckling cascades in free sheets. *Nature*, **419**, 579. https://doi.org/10.1038/419579a
2. Liang, H., & Mahadevan, L. (2009). The shape of a long leaf. *Proceedings of the National Academy of Sciences*, **106**(52), 22049–22054. https://doi.org/10.1073/pnas.0911954106
3. Liang, H., & Mahadevan, L. (2011). Growth, geometry, and mechanics of a blooming lily. *Proceedings of the National Academy of Sciences*, **108**(14), 5516–5521. https://doi.org/10.1073/pnas.1007808108
4. Timoshenko, S. (1925). Analysis of bi-metal thermostats. *Journal of the Optical Society of America*, **11**(3), 233–255. https://doi.org/10.1364/JOSA.11.000233
5. Dervaux, J., & Ben Amar, M. (2008). Morphogenesis of growing soft tissues. *Physical Review Letters*, **101**, 068101. https://doi.org/10.1103/PhysRevLett.101.068101

These papers motivate the geometry and mechanics; **the current numerical method and its constants are authored for this project**, not calibrated reproductions.

## Validation priorities

1. Check mesh-resolution convergence of selected half-wave counts and RMS error.
2. Compare predicted cup and edge wave shapes against photographs or 3D scans at matched growth stages.
3. Benchmark mobile rebuild performance and investigate self-intersections at extreme settings.
4. Consider a real non-Euclidean shell-energy solver or finite-element formulation if quantitative accuracy becomes the priority.
