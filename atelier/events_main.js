// ---------- sound events ----------
(function(){
  ev(0.05,'whoosh_up');
  SCN.forEach((s,i)=>{const sc=SPEC.scenes[i];if(i>0)ev(SS[s]-0.05,'whoosh');
    if(sc.type=='hook'){ev(frac(i,.02),'pop');ev(frac(i,.15),'impact',.6);if(sc.badge)ev(frac(i,.45),'impact',.8);}
    if(sc.type=='point'){ev(sStart(i),'pop');if(sc.big)ev(frac(i,.18),'impact',.5);(sc.chips||[]).forEach((c,k)=>ev(frac(i,.35+k*.13),'pop'));if(sc.note)ev(frac(i,.8),'ding');}
    if(sc.type=='table'){ev(sStart(i),'pop');(sc.rows||[]).forEach(r=>{const cu=SCUES[i][Math.min(r.cue||0,SCUES[i].length-1)];ev(cu.start+cu.dur*(r.at||0),r.hl?'impact':'pop',.5);});}
    if(sc.type=='conseil'){ev(sStart(i),'pop');(sc.lines||[]).forEach((l,k)=>ev(frac(i,.1+k*.3)+.1,'ding'));}
    if(sc.type=='cta'){ev(sStart(i),'pop');if(sc.next){ev(frac(i,.45),'impact',.5);ev(frac(i,.45)+.05,'bell');}}
  });
})();
const SHAKES=EV.filter(e=>e.type=='impact');
function shake(t){let x=0,y=0;SHAKES.forEach((e,i)=>{const d=t-e.t;if(d<0||d>.6)return;const a=28*e.amp*Math.exp(-d*9);x+=a*Math.sin(d*75+i);y+=a*Math.cos(d*63+i*2);});return[x,y];}
// ---------- main ----------
window.draw=function(t){
  const scene=SCN.find(s=>t>=SS[s]&&t<SE[s])||SCN[SCN.length-1];
  ctx.setTransform(1,0,0,1,0,0);bg(t,scene);
  const lt=t-SS[scene],rem=SE[scene]-t;const last=SCN[SCN.length-1];
  const [sx,sy]=shake(t);ctx.save();ctx.translate(sx,sy);
  let off=0,al=1;
  if(scene!='s0'&&lt<.35){off=(1-eo(lt/.35))*W*.6;al=eo(lt/.35);}
  if(scene!=last&&rem<.25){const q=1-rem/.25;off=-eio(q)*W*.7;al=1-q;}
  ctx.translate(off,0);ctx.globalAlpha=al;S[scene](t);ctx.restore();
  ctx.globalAlpha=1;drawAvatarLayer(t);
  const near=SCN.slice(1).map(s=>SS[s]).find(b=>Math.abs(t-b)<.25);
  if(near!==undefined){const k=1-Math.abs(t-near)/.25;ctx.fillStyle=`rgba(255,255,255,${.35*k})`;for(let i=0;i<9;i++){const y=(i*233+near*1000)%H;ctx.fillRect(0,y,W,3+i%3*3);}}
  captions(t);
  ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fillRect(0,0,W,12);ctx.fillStyle=COL.y;ctx.fillRect(0,0,W*t/TL.total,12);
};
window.EVENTS=EV;window.SS=SS;window.SE=SE;window.TOTAL=TL.total;
