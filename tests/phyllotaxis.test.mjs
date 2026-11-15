// Run: node tests/phyllotaxis.test.mjs
// Import the browser ES module as a data URL without requiring package.json type=module.
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../phyllotaxis.js',import.meta.url),'utf8');
const {generateInhibitedPrimordia:generate}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const expected=[
  [.82,1,'Fibonacci-like spiral'],
  [.50,1,'Lucas-like spiral'],
  [.34,2,'Paired / doubled spiral'],
  [.22,3,'Threefold whorls (3 + 3)']
];
for(const [inhibitionRadius,cohortSize,label] of expected){
 const run=generate({count:144,inhibitionRadius});
 assert.equal(run.primordia.length,144);
 assert.equal(run.cohortSize,cohortSize);
 assert.equal(run.label,label);
 assert.ok(run.primordia.every(p=>Number.isFinite(p.angle)&&p.angle>=0&&p.angle<2*Math.PI));
 assert.ok(run.primordia.every((p,i)=>i===0||p.step>=run.primordia[i-1].step));
 const second=generate({count:144,inhibitionRadius});
 assert.strictEqual(second,run,'identical settings should use the cached deterministic run');
 console.log(inhibitionRadius.toFixed(2),label,cohortSize===1?Math.min(run.meanDivergence,360-run.meanDivergence).toFixed(1)+'°':cohortSize+' per cohort');
}
const fib=generate({count:144,inhibitionRadius:.82});
const lucas=generate({count:144,inhibitionRadius:.50});
assert.ok(Math.abs(Math.min(fib.meanDivergence,360-fib.meanDivergence)-137.508)<5);
assert.ok(Math.abs(Math.min(lucas.meanDivergence,360-lucas.meanDivergence)-99.501)<5);
console.log('Phyllotaxis regression tests passed.');
