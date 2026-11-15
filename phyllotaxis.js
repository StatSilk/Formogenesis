// Minimal geometric phyllotaxis experiment after Douady & Couder (1996).
// Inhibition is a phenomenological distance-decay field, not an auxin transport solver.
// Older primordia keep their angles while radial growth moves them away from the apex.
// Two/three-at-once cohorts use a symmetric-ring candidate family (an explicit approximation).
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smoothstep = x => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
const cache = new Map();
export function generateInhibitedPrimordia({ count = 680, inhibitionRadius = .82 } = {}) {
  const n = Math.max(6, Math.min(1100, Math.round(count)));
  const radius = clamp(inhibitionRadius, .20, 1.05);
  const cacheKey = n + ':' + radius.toFixed(3);
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  // A short-range inhibition zone can admit more than one primordium per node.
  // This packing-capacity rule and the coupled early-growth history are illustrative.
  const cohortSize = Math.max(1, Math.min(3, Math.floor(.80 / radius)));
  const growthEarly = .15 + .35 * smoothstep((radius - .53) / .17);
  const growthLate = .012;
  const sampleCount = 240;
  const sampleXY = Array.from({length:sampleCount}, (_,index) => {
    const a=TAU*index/sampleCount;
    return Array.from({length:cohortSize}, (_,slot) => [Math.cos(a+TAU*slot/cohortSize),Math.sin(a+TAU*slot/cohortSize)]);
  });
  const steps = [];
  const primordia = [];
  const live = [];
  for (let epoch = 0; primordia.length < n; epoch++) {
    const G = growthLate + (growthEarly - growthLate) *
      (epoch < 16 ? 1 : Math.exp(-(epoch - 16) / 9));
    const expansion = Math.exp(G);
    for (const item of live) item.r *= expansion;
    const active = [];
    for (let i = live.length - 1; i >= 0; i--) {
      if (live[i].r > 9 || active.length >= 90) break;
      const prev=live[i];
      active.push([prev.x * prev.r,prev.y * prev.r]);
    }
    const potentialAt = (positions, cutoff) => {
      let E = 0;
      for (const [x,y] of positions) {
        for (const [oldX,oldY] of active) {
          const dx=x-oldX,dy=y-oldY;
          E += Math.exp(-Math.sqrt(dx*dx+dy*dy)/radius);
          if(E>cutoff)return E;
        }
      }
      return E;
    };
    let bestTheta = 0, bestPotential = Infinity, bestSample=0;
    for (let sample=0;sample<sampleCount;sample++) {
      const potential = potentialAt(sampleXY[sample],bestPotential);
      if (potential < bestPotential - 1e-12) {
        bestPotential = potential;bestSample=sample;
      }
    }
    if(bestTheta===0)bestTheta=TAU*bestSample/sampleCount;
    const from = primordia.length;
    for (let slot = 0; slot < cohortSize && primordia.length < n; slot++) {
      const angle = (bestTheta + TAU * slot / cohortSize) % TAU;
      const item = {angle, step:epoch, cohort:cohortSize, x:Math.cos(angle), y:Math.sin(angle), r:1};
      primordia.push({angle, step:epoch, cohort:cohortSize});
      live.push(item);
    }
    steps.push({from, to:primordia.length, potential:bestPotential});
  }
  const differences = [];
  if (cohortSize === 1) {
    const start = Math.max(1, primordia.length - 55);
    for (let i = start; i < primordia.length; i++) {
      differences.push((primordia[i].angle - primordia[i-1].angle + TAU) % TAU * 180 / Math.PI);
    }
  }
  const mean = differences.reduce((sum, value) => sum + value, 0) / (differences.length || 1);
  const spread = Math.sqrt(differences.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (differences.length || 1));
  let label;
  if (cohortSize === 3) label = 'Threefold whorls (3 + 3)';
  else if (cohortSize === 2) label = 'Paired / doubled spiral';
  else if (spread < 9 && (Math.abs(mean - 137.508) < 12 || Math.abs(mean - 222.492) < 12)) label = 'Fibonacci-like spiral';
  else if (spread < 9 && (Math.abs(mean - 99.501) < 12 || Math.abs(mean - 260.499) < 12)) label = 'Lucas-like spiral';
  else label = 'Transient / alternative spiral';
  const result = {primordia, steps, cohortSize, meanDivergence:mean, spread,
    label, radius, count:n};
  cache.set(cacheKey,result);
  if (cache.size > 24) cache.delete(cache.keys().next().value);
  return result;
}
