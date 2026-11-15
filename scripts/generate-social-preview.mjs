// Deterministic golden-angle illustration for README and Open Graph previews.
// This is procedural artwork, not a screenshot or a biological growth simulation.
// Run: node scripts/generate-social-preview.mjs
// To rasterize: inkscape assets/social-preview.svg --export-filename=assets/social-preview.png
import { mkdir, writeFile } from 'node:fs/promises';

const svg = [];
const golden = Math.PI * (3 - Math.sqrt(5));
const cx = 318, cy = 317;
svg.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">`);
svg.push(`<title id="title">Formogenesis: Flowers</title><desc id="desc">A geometric sunflower with golden-angle floret packing.</desc>`);
svg.push(`<defs><radialGradient id="bg"><stop stop-color="#254b3a"/><stop offset="1" stop-color="#0c1c19"/></radialGradient><radialGradient id="petal"><stop stop-color="#ffe49d"/><stop offset=".55" stop-color="#f5b638"/><stop offset="1" stop-color="#b86b20"/></radialGradient><radialGradient id="disk"><stop stop-color="#77512d"/><stop offset="1" stop-color="#332719"/></radialGradient></defs>`);
svg.push(`<rect width="1200" height="630" fill="url(#bg)"/>`);
for (let i=0;i<120;i++) {
  const x=35+((i*173.37)%1110),y=30+((i*89.13)%570);
  svg.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".8" fill="#d1e4c4" opacity=".12"/>`);
}
svg.push(`<circle cx="${cx}" cy="${cy}" r="235" fill="none" stroke="#b2d4a3" opacity=".15" stroke-width="1"/>`);
svg.push(`<circle cx="${cx}" cy="${cy}" r="195" fill="none" stroke="#b2d4a3" opacity=".12" stroke-width="1" stroke-dasharray="4 12"/>`);
for (let i=0;i<28;i++) {
  const angle=(i*360/28).toFixed(3);
  const len=146+9*Math.sin(i*1.91);
  const y=cy-119;
  svg.push(`<ellipse cx="${cx}" cy="${y.toFixed(1)}" rx="${(22+2*Math.sin(i*.7)).toFixed(2)}" ry="${(len*.64).toFixed(2)}" fill="url(#petal)" stroke="#f4d376" stroke-width="1.3" opacity=".97" transform="rotate(${angle} ${cx} ${cy})"/>`);
}
svg.push(`<circle cx="${cx}" cy="${cy}" r="125" fill="url(#disk)" stroke="#d39c47" stroke-width="4"/>`);
for (let i=0;i<560;i++) {
  const r=Math.sqrt((i+.5)/560)*121,angle=i*golden;
  const x=cx+r*Math.cos(angle),y=cy+r*Math.sin(angle);
  const size=1.5+1.2*Math.sqrt((i+.5)/560);
  const light=48+Math.floor(17*Math.sqrt(i/560));
  svg.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${size.toFixed(2)}" fill="hsl(${29+Math.floor((i%7)*1.5)} 57% ${light}%)" opacity=".90"/>`);
}
svg.push(`<path d="M628 120v390" stroke="#7d9f83" stroke-width="1" opacity=".55"/>`);
svg.push(`<text x="688" y="214" fill="#e5c88e" font-family="Arial,Helvetica,sans-serif" font-size="18" letter-spacing="6">MATHEMATICS OF NATURE</text>`);
svg.push(`<text x="681" y="310" fill="#f8f1db" font-family="Georgia,serif" font-size="67">Formogenesis</text>`);
svg.push(`<text x="686" y="370" fill="#d5e5d2" font-family="Arial,Helvetica,sans-serif" font-size="24">The mathematics of nature's forms</text>`);
svg.push(`<text x="686" y="429" fill="#b0c9b7" font-family="Arial,Helvetica,sans-serif" font-size="17">FLOWERS  ·  PATTERNS  ·  GROWTH</text>`);
svg.push(`<text x="40" y="598" fill="#a2bea7" font-family="Arial,Helvetica,sans-serif" font-size="14" letter-spacing="2">IDEALIZED GOLDEN-ANGLE CONSTRUCTION · PROCEDURAL ILLUSTRATION</text>`);
svg.push(`</svg>`);
await mkdir('assets',{recursive:true});
await writeFile('assets/social-preview.svg',svg.join('\n')+'\n');
console.log('Wrote assets/social-preview.svg');
