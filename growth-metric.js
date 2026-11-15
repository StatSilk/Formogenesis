// Reduced-order non-Euclidean growth-metric experiment.
// No cell-level growth or nonlinear elastic-sheet force balance is claimed.
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const cache=new Map();
export function fitGrowthMetric(options={}){
 const centerExcess=clamp(options.centerExcess||0,0,.3);
 const edgeExcess=clamp(options.edgeExcess||0,0,.3);
 const thicknessMm=clamp(options.thicknessMm||.3,.08,1.2);
 const lengthMm=clamp(options.lengthMm||40,12,100);
 const widthRatio=clamp(options.widthRatio||.35,.15,.70);
 const maxMode=Math.max(1,Math.min(8,Math.floor((options.meshResolution||30)/6)));
 const key=[centerExcess,edgeExcess,thicknessMm,lengthMm,widthRatio,maxMode].map(x=>Number(x).toFixed(4)).join('|');
 if(cache.has(key))return cache.get(key);
 // Intrinsic reference coordinates (length normalized to 1) and isotropic
 // target growth metric: g*=lambda(t,u)^2 (dx^2+ds^2).
 const nt=14,nu=10,nodes=[];
 for(let i=0;i<=nt;i++)for(let j=0;j<=nu;j++){
  const t=i/nt,u=2*j/nu-1,env=Math.pow(Math.max(.055,Math.sin(Math.PI*t)),.78);
  nodes.push({t,u,x:widthRatio*u*env,y:t,
   centerBasis:(1-u*u)*Math.sin(Math.PI*t),
   edgeBasis:Math.pow(Math.abs(u),2.6)*Math.pow(Math.sin(Math.PI*t),.7),
   lambdaT:1+(.15+.85*t)*(centerExcess*Math.pow(1-u*u,2)+edgeExcess*Math.pow(Math.abs(u),3)),
   lambdaU:1+(.15+.85*t)*(.45*centerExcess*Math.pow(1-u*u,2)+.12*edgeExcess*Math.pow(Math.abs(u),3))});
 }
 const edges=[];const stride=nu+1;
 for(let i=0;i<=nt;i++)for(let j=0;j<=nu;j++){
  const a=i*stride+j;
  for(const b of [j<nu?a+1:-1,i<nt?a+stride:-1]){
   if(b<0)continue;
   const A=nodes[a],B=nodes[b],dxy=Math.hypot(A.x-B.x,A.y-B.y);
   if(dxy<1e-8)continue;
   const longGrowth=(A.lambdaT+B.lambdaT)*.5,wideGrowth=(A.lambdaU+B.lambdaU)*.5;
   edges.push([a,b,dxy,Math.hypot((A.y-B.y)*longGrowth,(A.x-B.x)*wideGrowth)]);
  }
 }
 const edgeBandMm=lengthMm*.12; // core restraint scale; heuristic.
 // Preferred instability scale is stress/bending informed, not a fixed wave count.
 const estimatedMode=clamp(Math.sqrt(edgeExcess)*lengthMm/
   (Math.PI*Math.sqrt(thicknessMm*edgeBandMm)),1,maxMode);
 let best={energy:Infinity,mode:0,centerAmplitude:0,edgeAmplitude:0,metricError:0};
 const z=new Float64Array(nodes.length);
 const candidateModes=edgeExcess>.0001?Array.from({length:maxMode},(_,i)=>i+1):[0];
 for(const mode of candidateModes){
  const c0=Math.sqrt(centerExcess)*.46;
  const a0=mode?Math.sqrt(edgeExcess)*.39/Math.sqrt(mode):0;
  for(const cf of (centerExcess>.002?[.45,.75,1,1.3,1.7]:[0])){
   for(const af of (mode&&edgeExcess>.004?[.45,.75,1,1.3,1.7]:[0])){
    const centerAmplitude=c0*cf,edgeAmplitude=a0*af;
    for(let k=0;k<nodes.length;k++){
     const q=nodes[k];z[k]=centerAmplitude*q.centerBasis+
       edgeAmplitude*q.edgeBasis*(mode?Math.sin(mode*Math.PI*q.t):0);
    }
    let mismatch=0;
    for(const [a,b,rest,target] of edges){
     const actual=Math.hypot(rest,z[a]-z[b]);
     const d=(actual-target)/Math.max(rest,1e-7);
     mismatch+=d*d;
    }
    mismatch/=edges.length;
    // Bending regularization and attachment to the relatively unstretched core.
    const bend=.00004*(thicknessMm/.3)**2*
      (centerAmplitude**2+edgeAmplitude**2*mode**4);
    const core=.0015*(centerAmplitude**2+edgeAmplitude**2);
    const stability=mode?.0008*(mode-estimatedMode)**2:0;
    const energy=mismatch+bend+core+stability;
    if(energy<best.energy)best={energy,metricError:Math.sqrt(mismatch),
      mode,centerAmplitude,edgeAmplitude};
   }
  }
 }
 const result={...best,wavelengthMm:best.mode?2*lengthMm/best.mode:null,
  estimatedMode,centerExcess,edgeExcess,thicknessMm,lengthMm,widthRatio};
 cache.set(key,result);if(cache.size>96)cache.delete(cache.keys().next().value);
 return result;
}
export function metricHeight(t,u,fit){
 const envelope=Math.pow(Math.max(0,Math.sin(Math.PI*t)),.7);
 return fit.centerAmplitude*(1-u*u)*Math.sin(Math.PI*t)+
   (fit.mode?fit.edgeAmplitude*Math.pow(Math.abs(u),2.6)*envelope*
    Math.sin(fit.mode*Math.PI*t):0);
}
export function bilayerArc(t,{deltaEpsilon=0,thicknessMm=.3,lengthMm=40}={}){
 // Equal thicknesses AND equal moduli, constant spontaneous mismatch:
 // kappa=3*deltaEpsilon/(2*h), in inverse millimetres.
 const h=Math.max(.08,thicknessMm),L=Math.max(12,lengthMm);
 const raw=1.5*deltaEpsilon/h,kappa=clamp(raw,-1.6/L,1.6/L);
 if(Math.abs(kappa)<1e-8)return {outward:0,axial:0,curvature:0,angle:0};
 const angle=kappa*L*clamp(t,0,1);
 return {outward:(1-Math.cos(angle))/(kappa*L),
  axial:Math.sin(angle)/(kappa*L)-t,curvature:kappa,angle};
}
