# Inhibition-driven phyllotaxis — experimental model (v0.3.0)

The **Flowers** generator now includes two methods for arranging disc florets:

1. **Local inhibition** (new default on sunflower and other composite heads): a new primordium forms in a low-inhibition gap while older primordia move outward. Its divergence angle is an output.
2. **Vogel reference**: a radial point arrangement with a user-selected constant angle (golden angle by default). This remains available for comparison.

The **▶ Grow spiral** control animates the self-assembly over 10 seconds. Points move outward as later points form at the centre. The top view and pattern inset show the same order, and the UI reports a *measured* or inferred pattern type.

## Mathematical rules

Let the initiation circle have radius \(R=1\). Older primordia \(j\) have polar coordinates \((r_j,\theta_j)\) and move outward after each initiation step:

\[
r_j(t+1)=r_j(t)\,e^{G(t)}.
\]

Their angles remain fixed after initiation (a defining assumption of the geometric model). A candidate at angle \(\theta\) on the initiation circle experiences the phenomenological inhibitory potential

\[
E(\theta)=\sum_j \exp\!\left[-\frac{\sqrt{1+r_j^2-2r_j\cos(\theta-\theta_j)}}{\lambda}\right],
\]

where \(\lambda\) is the dimensionless **inhibition radius**. For the single-primordium regime, the next angle minimizes \(E(\theta)\) over a discrete angular search. No golden or Lucas divergence angle is inserted into this rule.

The visualization uses a short early-growth transient \(G(t)\to 0.012\), with the initial growth value coupled to \(\lambda\). This coupling is a **deliberately simplified developmental-history assumption**, calibrated to produce visible contrasting regimes. The radius slider is thus an *effective experiment control*, not an independently measured biological length.

For a sufficiently short range, the demonstration permits two or three primordia to appear in a cohort. Their group rotates to minimize the summed inhibitory potential, with evenly distributed sites within each cohort. **This constrained symmetric-cohort ansatz is added to make multijugate and whorled patterns visible**; it is not a derivation of simultaneous initiation from a full Snow–Snow threshold model. The interface displays primordia sequentially for clarity, even when they share an initiation step.

### What the control demonstrates

| Approx. inhibition radius | Observed representative result | Meaning |
| --- | --- | --- |
| 0.82 | Fibonacci-like spiral, mean ≈ 137.5° (opposite winding may be reported as 222.5°) | Single-primordium branch |
| 0.50 | Lucas-like spiral, mean ≈ 99.5° (or opposite winding ≈ 260.5°) | Alternative branch reached under different developmental history |
| 0.34 | Paired / doubled spiral | Two nearly simultaneous initiations per cohort |
| 0.22 | Threefold whorls (3 + 3) | Staggered triplets, analogous to the two sets of three tepals in a tulip |

Examples are reproducible for the current discretization; the transitions are **model- and initialization-dependent**. They must not be interpreted as universal critical inhibition radii for living plants. Reported Fibonacci/Lucas labels are based on the resulting angles; paired/whorled labels reflect the cohort size.

## Rendering versus solver

- The placement solver operates on a simplified *meristem initiation circle* with exponentially expanding older primordia.
- To draw a mature disc at useful scale, the renderer maps visible primordium age \(a\) to a display radius \(r_{\mathrm{display}}\propto\sqrt{a/N}\). This is **not** the solver's radial growth law.
- The 3D sunflower head and the 2D inset share the same angular solution. The outer ray florets remain separate procedural petal geometry.
- The animation repositions an instanced floret mesh; it does not rebuild the whole flower surface every frame.

## Limitations / falsifiable checks

- This is a geometric, phenomenological inhibition-field model, **not a cell-based auxin transport model**, reaction–diffusion solver, or calibrated meristem growth simulation.
- Inhibition has a prescribed exponential distance profile. There is no measured auxin concentration, tissue biomechanics, or cellular differentiation.
- The coupling of inhibition radius to the early growth transient, and the rule that chooses the number of near-simultaneous initiations, are experimental approximations. A true Snow–Snow whorling model would solve for both **when** and **where** each primordium appears from a biological threshold.
- Numerical candidate discretization, initial conditions, growth transients and duration can alter the final branch. A narrower radius by itself does not guarantee Fibonacci → Lucas → paired → whorled transitions in real botany.
- The renderer's size, colours and height profiles are aesthetic approximations. The whorl model is a pattern demonstration; it does **not** replace the tulip's six-tepal geometry.
- The geometry and mobile animation need qualitative and performance validation against reference images and devices.

## Primary sources

1. Douady, S., & Couder, Y. (1992). Phyllotaxis as a physical self-organized growth process. *Physical Review Letters*, 68(13), 2098–2101. https://doi.org/10.1103/PhysRevLett.68.2098
2. Douady, S., & Couder, Y. (1996). Phyllotaxis as a dynamical self organizing process. Part I: The spiral modes resulting from time-periodic iterations. *Journal of Theoretical Biology*, 178(3), 255–274. https://doi.org/10.1006/jtbi.1996.0024
3. Douady, S., & Couder, Y. (1996). Part II: The spontaneous formation of a periodicity and the coexistence of spiral and whorled patterns. *Journal of Theoretical Biology*, 178(3), 275–294. https://doi.org/10.1006/jtbi.1996.0025

The model takes the geometric inhibition/placement idea from these papers and adds UI-oriented approximations expressly labelled above. It is independent custom code, not a port of the original simulator.
