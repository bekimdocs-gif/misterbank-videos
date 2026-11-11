// Generic scene engine for Mister Bank videos, driven by SPEC (spec.js) and TL (timeline.js).
const CC={y:COL.y,r:COL.r,g:COL.g,b:COL.b};
const SCT=SPEC.scenes.map(s=>s.type);
const SCUES=SCN.map(s=>TL.cues.filter(c=>c.scene==s));
function sStart(i){return SCUES[i][0].start;}
function sEnd(i){const c=SCUES[i][SCUES[i].length-1];return c.start+c.dur;}
function frac(i,f){const a=sStart(i),b=sEnd(i);return a+(b-a)*f;}
// ---------- avatar ----------
function poseFor(type){return type=='hook'?[540,560,.9]:type=='cta'?[540,450,.62]:[540,400,.5];}
function avatarPose(t){const scene=SCN.find(s=>t>=SS[s]&&t<SE[s])||SCN[SCN.length-1];const i=SCN.indexOf(scene);const cur=poseFor(SCT[i]);
  if(i>0){const prev=poseFor(SCT[i-1]);const q=eio(P(t,SS[scene]-.1,.55));return prev.map((v,k)=>lerp(v,cur[k],q));}return cur;}
function drawAvatarLayer(t){
  const ap=P(t,0,.45);if(ap<=0)return;const [x,y,s0]=avatarPose(t);const s=s0*eb(ap);
  const f=Math.min(MOUTH.length-1,Math.max(0,Math.round(t*30)));const m=MOUTH[f];
  const bt=(t+0.7)%3.4;const blink=bt<.14?Math.sin(bt/.14*Math.PI):0;
  const tilt=Math.sin(t*1.7)*0.035+m*0.02;const bob=Math.sin(t*2.3)*6*s;const R=300*s,cy=y+70*s;
  ctx.save();const gl=ctx.createRadialGradient(x,cy,R*.6,x,cy,R*1.45);gl.addColorStop(0,`rgba(255,200,61,${.18+.25*m})`);gl.addColorStop(1,'rgba(255,200,61,0)');ctx.fillStyle=gl;ctx.beginPath();ctx.arc(x,cy,R*1.45,0,7);ctx.fill();ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(x,cy,R,0,7);const bg2=ctx.createLinearGradient(0,cy-R,0,cy+R);bg2.addColorStop(0,'#1B2A6B');bg2.addColorStop(1,'#0B1236');ctx.fillStyle=bg2;ctx.fill();ctx.clip();
  drawAvatar(ctx,x,y+bob,s,{mouth:m,blink,tilt,brow:m*.5});ctx.restore();
  ctx.save();ctx.lineWidth=12*Math.max(s,.6);ctx.strokeStyle=COL.y;ctx.shadowColor=COL.y;ctx.shadowBlur=30+40*m;ctx.beginPath();ctx.arc(x,cy,R,0,7);ctx.stroke();ctx.restore();
  if(m>.15){ctx.save();ctx.strokeStyle=`rgba(255,200,61,${.5*m})`;ctx.lineWidth=6;ctx.lineCap='round';for(let k=0;k<3;k++){const rr2=R+28+k*24;ctx.beginPath();ctx.arc(x,cy,rr2,-0.5,0.5);ctx.stroke();ctx.beginPath();ctx.arc(x,cy,rr2,Math.PI-0.5,Math.PI+0.5);ctx.stroke();}ctx.restore();}
  if(SPEC.series){const pl=P(t,.2,.4);if(pl>0){ctx.save();ctx.globalAlpha=pl;ctx.font=`900 30px ${F}`;const w=ctx.measureText(SPEC.series).width+50;rr(CX-w/2,180,w,58,29);ctx.fillStyle='rgba(255,200,61,.95)';ctx.fill();ctx.fillStyle='#0B1026';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(SPEC.series,CX,210);ctx.restore();}}
}
function numCard(t,st,n,col,title){const pin=P(t,st-.1,.45);if(pin<=0)return 0;ctx.save();ctx.translate(lerp(W,0,eo(pin)),0);
  ctx.save();rr(80,760,920,720,44);ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fill();ctx.lineWidth=6;ctx.strokeStyle=col;ctx.shadowColor=col;ctx.shadowBlur=30;ctx.stroke();ctx.restore();
  if(n){const pn=P(t,st,.45);ctx.save();ctx.translate(190,860);ctx.scale(el(pn),el(pn));ctx.beginPath();ctx.arc(0,0,62,0,7);ctx.fillStyle=col;ctx.fill();ctx.restore();txt(n,190,864,80,'#0B1026',{sc:el(pn)});
    txt(title,280,862,60,COL.w,{align:'left',maxW:690,alpha:P(t,st+.1,.3)});}
  else txt(title,CX,862,60,COL.w,{maxW:860,alpha:P(t,st+.1,.3)});
  ctx.restore();return pin;}
// ---------- generic scenes ----------
const S={};
function sceneHook(t,i,sc){
  const p1=P(t,frac(i,.02),.35);txt(sc.line1||'',CX,1000,90,COL.w,{sc:eb(p1),alpha:cl(p1*3),maxW:980});
  const p2=P(t,frac(i,.15),.35);txt(sc.line2||'',CX,1110,96,COL.y,{sc:eb(p2),alpha:cl(p2*3),glow:40,maxW:980});
  if(sc.badge){const p3=P(t,frac(i,.45),.4);if(p3>0){ctx.save();ctx.translate(CX,1290);ctx.rotate(-.04);ctx.scale(eb(p3),eb(p3));ctx.font=`900 80px ${F}`;const w=Math.min(900,ctx.measureText(sc.badge).width+100);rr(-w/2,-75,w,150,40);ctx.fillStyle=COL.r;ctx.shadowColor=COL.r;ctx.shadowBlur=40;ctx.fill();ctx.restore();
    ctx.save();ctx.translate(CX,1290);ctx.rotate(-.04);txt(sc.badge,0,4,80,COL.w,{sc:eb(p3),maxW:840});ctx.restore();}}
  if(sc.sub)txt(sc.sub,CX,1420,40,COL.mut,{w:700,alpha:P(t,frac(i,.6),.4),maxW:960});
}
function scenePoint(t,i,sc){
  const col=CC[sc.color||'y'];const st=sStart(i);if(!numCard(t,st,sc.n||'',col,sc.title||''))return;
  let y=1030;
  if(sc.big){const pb=P(t,frac(i,.18),.45);txt(sc.big,CX,y,sc.big.length>12?100:140,col,{sc:eb(pb),alpha:cl(pb*3),glow:35,maxW:860});y+=105;}
  if(sc.sub){txt(sc.sub,CX,y,44,COL.mut,{w:700,alpha:P(t,frac(i,.25),.4),maxW:860});y+=90;}else y+=40;
  const chips=sc.chips||[];const n=chips.length;const longc=chips.some(c=>c.length>12);const vert=n==3&&longc;
  chips.forEach((c,k)=>{const p=P(t,frac(i,.35+k*.13),.35);if(p<=0)return;let x,yy;
    if(vert){x=CX;yy=y+5+k*98;}else if(n<=3){x=n==1?CX:n==2?(k?735:345):250+k*290;yy=y+30;}else{x=k%2?735:345;yy=y+30+Math.floor(k/2)*120;}
    const w=vert?620:n<=2?380:n==3?260:380;const hh=vert?84:96;ctx.save();ctx.translate(x,yy);ctx.scale(eb(p),eb(p));rr(-w/2,-hh/2,w,hh,hh/2);ctx.fillStyle='rgba(255,255,255,.08)';ctx.fill();ctx.lineWidth=4;ctx.strokeStyle=col;ctx.stroke();ctx.restore();txt(c,x,yy+3,40,COL.w,{sc:eb(p),maxW:w-30});});
  if(sc.note){const pn=P(t,frac(i,.8),.4);if(pn>0){ctx.save();ctx.translate(CX,1400);ctx.scale(eb(pn),eb(pn));rr(-420,-52,840,104,52);ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=30;ctx.fill();ctx.restore();txt(sc.note,CX,1403,46,'#0B1026',{sc:eb(pn),maxW:800});}}
}
function sceneConseil(t,i,sc){
  pill(sc.label||'CONSEIL DE BANQUIER',sStart(i),t,COL.y,800);
  (sc.lines||[]).forEach((l,k)=>{const p=P(t,frac(i,.1+k*.3),.5);if(p<=0)return;const y=900+k*200;ctx.save();ctx.translate(lerp(-400,0,eo(p)),0);ctx.globalAlpha=cl(p*2);
    card(90,y,900,170,k%2?COL.g:COL.y);ctx.save();ctx.translate(190,y+85);ctx.scale(1.3,1.3);ctx.translate(-190,-(y+85));checkIcon(190,y+85,P(t,frac(i,.1+k*.3)+.1,.6));ctx.restore();
    ctx.font=`900 46px ${F}`;if(ctx.measureText(l).width<=680)txt(l,280,y+88,46,COL.w,{align:'left',maxW:680});else{const ws=l.split(' ');let a1='';let k2=0;for(k2=0;k2<ws.length;k2++){const tt=(a1?a1+' ':'')+ws[k2];if(ctx.measureText(tt).width>680)break;a1=tt;}const a2=ws.slice(k2).join(' ');txt(a1,280,y+60,46,COL.w,{align:'left',maxW:680});txt(a2,280,y+116,46,COL.w,{align:'left',maxW:680});}ctx.restore();});
}
function sceneCta(t,i,sc){
  const p=P(t,sStart(i)-.1,.4);
  if(p>0){ctx.save();ctx.translate(CX,900);ctx.scale(eb(p)*1.1,eb(p)*1.1);ctx.fillStyle=COL.y;ctx.shadowColor=COL.y;ctx.shadowBlur=30;ctx.beginPath();ctx.moveTo(-50,-70);ctx.lineTo(50,-70);ctx.lineTo(50,70);ctx.lineTo(0,35);ctx.lineTo(-50,70);ctx.closePath();ctx.fill();ctx.restore();}
  txt(sc.main||'ABONNE-TOI',CX,1050,96,COL.y,{sc:eb(P(t,sStart(i),.4)),alpha:P(t,sStart(i),.2),glow:30,maxW:960});
  if(sc.sub)txt(sc.sub,CX,1140,48,COL.w,{alpha:P(t,frac(i,.15),.4),maxW:960});
  if(sc.next){const pb=P(t,frac(i,.45),.45);if(pb>0){ctx.save();ctx.translate(CX,1320);ctx.scale(eb(pb),eb(pb));rr(-440,-95,880,190,40);ctx.fillStyle='rgba(255,71,87,.15)';ctx.fill();ctx.lineWidth=6;ctx.strokeStyle=COL.r;ctx.stroke();ctx.restore();
    txt(sc.next[0]||'',CX,1285,54,COL.w,{sc:eb(pb),maxW:820});if(sc.next[1])txt(sc.next[1],CX,1360,46,COL.r,{sc:eb(pb),maxW:820});}}
  txt(SPEC.footer||'Contenu pédagogique, pas un conseil personnalisé',CX,1460,26,'rgba(255,255,255,0.55)',{w:500,alpha:P(t,frac(i,.3),.4),maxW:980});
  if(SPEC.sources)txt(SPEC.sources,CX,1495,24,'rgba(255,255,255,0.45)',{w:500,alpha:P(t,frac(i,.3),.4),maxW:980});
}
SCN.forEach((s,i)=>{const sc=SPEC.scenes[i];S[s]=(t)=>({hook:sceneHook,point:scenePoint,conseil:sceneConseil,cta:sceneCta}[sc.type])(t,i,sc);});
// ---------- captions ----------
const CAP={};TL.cues.forEach(c=>{if(c.cap)CAP[c.id]=c.cap;});
const CHUNKS=[];
