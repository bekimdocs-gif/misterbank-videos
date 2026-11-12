// ---------- Saynètes : personnages 2D en pied + décors (types de scène sk_*) ----------
function poseFor(type){return type=='hook'?[540,560,.9]:type=='cta'?[540,450,.62]:(type.startsWith('sk_')||type=='saynete')?[540,340,.4]:[540,400,.5];}
const kt=(i,j,kw)=>K(SCUES[i][j].id,kw);
const PAL={client:{skin:'#F2C4A2',skinSh:'#DDA07E',hair:'#6B3A1E',top:'#2EC4A0',topSh:'#1E9C80',pants:'#2B3A78',shoes:'#FFFFFF'},
 cliente:{skin:'#F6CDB0',skinSh:'#E0A98A',hair:'#3A2218',long:1,top:'#FF7A6B',topSh:'#E05A4C',pants:'#39407A',shoes:'#FFC83D'},
 client2:{skin:'#C98F68',skinSh:'#AE7650',hair:'#1C1412',top:'#4D8BFF',topSh:'#3568D4',pants:'#2A2F45',shoes:'#FFFFFF'},
 cliente2:{skin:'#D9A47E',skinSh:'#BF8762',hair:'#1C1412',long:1,top:'#B58CFF',topSh:'#8E62E0',pants:'#2A2F45',shoes:'#FFFFFF'},
 conseiller:{skin:'#F1C3A0',skinSh:'#DFA582',hair:'#1C1412',beard:1,suit:1,top:'#D3D8E0',topSh:'#A9B0BC',pants:'#8E96A6',shoes:'#2A2F45'}};
function ik(dx,dy,l1,l2,dir){const d=Math.min(Math.hypot(dx,dy),l1+l2-1);const base=Math.atan2(dx,dy);const ca=cl((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1);const a1=base-Math.acos(ca)*dir;
  const ex=Math.sin(a1)*l1,ey=Math.cos(a1)*l1;const k=d/Math.hypot(dx,dy);return[a1,Math.atan2(dx*k-ex,dy*k-ey)];}
function limb(x1,y1,a1,l1,a2,l2,w,col){const ex=x1+Math.sin(a1)*l1,ey=y1+Math.cos(a1)*l1,hx=ex+Math.sin(a2)*l2,hy=ey+Math.cos(a2)*l2;
  ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(ex,ey);ctx.lineTo(hx,hy);ctx.stroke();return[hx,hy];}
// o: {pal, armL, armR ([a1,a2] ou {to:[x,y]} en unités locales), walk, mood, tilt, bob, blink, holdR, holdL, look}
function person(x,y,s,o={}){const c=o.pal||PAL.client;const res={};
  ctx.save();ctx.translate(x,y);ctx.scale(s*(o.flip?-1:1),s);
  ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(0,8,125,22,0,0,7);ctx.fill();
  const w=o.walk;const la=w!==undefined?Math.sin(w)*.5:0;const lift=w!==undefined?Math.abs(Math.cos(w))*10:0;const bob=(o.bob||0)+lift;
  // jambes
  [[-28,la],[28,-la]].forEach(([hx,a])=>{const f=limb(hx,-250-bob,a,128,a*.35-(a<0?.35*-a:0),122-bob*.2,50,c.pants);
    ctx.fillStyle=c.shoes;ctx.beginPath();ctx.ellipse(f[0]+14,Math.min(f[1]+4,-4),42,22,0,0,7);ctx.fill();ctx.fillStyle='rgba(0,0,0,.12)';ctx.beginPath();ctx.ellipse(f[0]+14,Math.min(f[1]+12,4),40,9,0,0,7);ctx.fill();});
  ctx.translate(0,-bob);
  // bras arrière-plan (gauche) puis buste
  const arm=(side,spec,hold)=>{const sx=side*72,sy=-418;let a1,a2;if(spec&&spec.to){[a1,a2]=ik(spec.to[0]-sx,spec.to[1]-sy,96,92,side);}else{[a1,a2]=spec||[side*.12,side*.05];}
    const h=limb(sx,sy,a1,96,a2,92,40,side<0?c.topSh:c.top);ctx.fillStyle=c.skin;ctx.beginPath();ctx.arc(h[0],h[1],25,0,7);ctx.fill();
    if(hold=='card'){ctx.save();ctx.translate(h[0]+side*22,h[1]-6);ctx.rotate(-.25*side);rr(-34,-22,68,44,7);ctx.fillStyle=COL.y;ctx.fill();ctx.fillStyle='#0B1026';ctx.fillRect(-34,-10,68,9);ctx.restore();}
    if(hold=='phone'){ctx.save();ctx.translate(h[0]+side*6,h[1]-34);ctx.rotate(.12*side);rr(-26,-46,52,92,10);ctx.fillStyle='#10152E';ctx.fill();rr(-21,-40,42,76,6);ctx.fillStyle=o.phoneCol||'#4D8BFF';ctx.fill();ctx.restore();}
    if(hold=='dossier'){ctx.save();ctx.translate(h[0]+side*26,h[1]-30);ctx.rotate(.1*side);rr(-38,-50,76,100,8);ctx.fillStyle='#F4F6FB';ctx.fill();ctx.fillStyle=COL.b;rr(-26,-36,52,12,6);ctx.fill();ctx.fillStyle='#C9D3EA';for(let q=0;q<3;q++){rr(-26,-14+q*18,q==2?34:52,9,4);ctx.fill();}ctx.restore();}
    return h;};
  if(c.long){ctx.fillStyle=c.hair;rr(-80,-600,160,215,[80,80,40,40]);ctx.fill();}
  res.L=arm(-1,o.armL,o.holdL);
  const tg=ctx.createLinearGradient(-70,-450,70,-230);tg.addColorStop(0,c.top);tg.addColorStop(1,c.topSh);ctx.fillStyle=tg;rr(-76,-450,152,225,[56,56,38,38]);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-34,-290);ctx.quadraticCurveTo(0,-268,34,-290);ctx.stroke();
  if(c.suit){ctx.fillStyle='#C7DDF6';ctx.beginPath();ctx.moveTo(-34,-450);ctx.lineTo(34,-450);ctx.lineTo(0,-330);ctx.closePath();ctx.fill();ctx.fillStyle=c.topSh;ctx.beginPath();ctx.moveTo(-40,-450);ctx.lineTo(-62,-390);ctx.lineTo(0,-318);ctx.lineTo(-8,-350);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(40,-450);ctx.lineTo(62,-390);ctx.lineTo(0,-318);ctx.lineTo(8,-350);ctx.closePath();ctx.fill();}
  ctx.fillStyle=c.skinSh;rr(-17,-478,34,40,10);ctx.fill();
  // tête
  ctx.save();ctx.translate(0,-528);ctx.rotate(o.tilt||0);
  ctx.fillStyle=c.skin;ctx.beginPath();ctx.arc(-66,4,15,0,7);ctx.arc(66,4,15,0,7);ctx.fill();
  const hg=ctx.createRadialGradient(-20,-22,8,0,0,74);hg.addColorStop(0,'#FBDDC6');hg.addColorStop(.7,c.skin);hg.addColorStop(1,c.skinSh);ctx.fillStyle=hg;ctx.beginPath();ctx.arc(0,0,68,0,7);ctx.fill();
  if(c.beard){ctx.save();ctx.beginPath();ctx.arc(0,0,68,0,7);ctx.clip();ctx.fillStyle='rgba(42,29,24,.8)';ctx.beginPath();ctx.moveTo(-70,2);ctx.lineTo(-56,6);ctx.bezierCurveTo(-52,36,-30,22,0,22);ctx.bezierCurveTo(30,22,52,36,56,6);ctx.lineTo(70,2);ctx.lineTo(70,80);ctx.lineTo(-70,80);ctx.closePath();ctx.fill();ctx.restore();}
  ctx.fillStyle=c.hair;ctx.beginPath();ctx.moveTo(-70,-8);ctx.bezierCurveTo(-82,-70,-34,-98,6,-92);ctx.bezierCurveTo(52,-98,84,-58,70,-8);ctx.bezierCurveTo(62,-36,40,-50,14,-46);ctx.bezierCurveTo(-14,-58,-52,-44,-70,-8);ctx.closePath();ctx.fill();
  const m=o.mood||'ok';const lk=(o.look||0)*5;const bl=o.blink||0;
  [-1,1].forEach(sd=>{const ex=sd*25,ey=0;const big=m=='shock'?1.35:1;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(ex,ey,13*big,15*big*Math.max(.1,1-bl),0,0,7);ctx.fill();
    ctx.fillStyle='#2A1A12';ctx.beginPath();ctx.arc(ex+lk,ey+1,(m=='shock'?5:7.5)*Math.max(.2,1-bl),0,7);ctx.fill();
    ctx.strokeStyle=c.hair;ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();const by=m=='shock'?-34:-26;const sl=m=='worry'?-9:m=='shock'?4:0;ctx.moveTo(ex-13,by-(m=='worry'?sd*6:0));ctx.lineTo(ex+13,by+(m=='worry'?sd*6:0));ctx.stroke();
    ctx.fillStyle='rgba(255,120,110,.28)';ctx.beginPath();ctx.ellipse(sd*42,24,13,8,0,0,7);ctx.fill();});
  ctx.strokeStyle='#7A3A2E';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();
  if(m=='shock'){ctx.fillStyle='#5A2620';ctx.beginPath();ctx.ellipse(0,36,13,17,0,0,7);ctx.fill();}
  else if(m=='worry'){ctx.moveTo(-18,40);ctx.quadraticCurveTo(0,28,18,40);ctx.stroke();}
  else if(m=='happy'){ctx.fillStyle='#5A2620';ctx.beginPath();ctx.moveTo(-22,28);ctx.quadraticCurveTo(0,34,22,28);ctx.quadraticCurveTo(0,58,-22,28);ctx.fill();}
  else{ctx.moveTo(-16,34);ctx.quadraticCurveTo(0,44,16,34);ctx.stroke();}
  ctx.restore();
  res.R=arm(1,o.armR,o.holdR);
  ctx.restore();
  return{R:[x+res.R[0]*s,y+(res.R[1]-bob)*s],L:[x+res.L[0]*s,y+(res.L[1]-bob)*s]};}
function blinkAt(t,o=0){const b=(t+o)%2.9;return b<.13?Math.sin(b/.13*Math.PI):0;}
function ground(y){const g=ctx.createLinearGradient(0,y-10,0,y+70);g.addColorStop(0,'rgba(255,255,255,.10)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;rr(60,y-6,960,80,40);ctx.fill();}
function tagBox(x,y,w,h,col,p,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(eb(p),eb(p));rr(-w/2,-h/2,w,h,h*.3);ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=40;ctx.fill();ctx.restore();}
function cup(x,y,t){ctx.save();ctx.translate(x,y);ctx.fillStyle='#fff';rr(-30,-64,60,64,[6,6,18,18]);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=9;ctx.beginPath();ctx.arc(34,-34,15,-1.3,1.3);ctx.stroke();ctx.fillStyle='#6B3A1E';rr(-24,-60,48,10,5);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=5;ctx.lineCap='round';for(let k=0;k<2;k++){ctx.beginPath();const o=Math.sin(t*3+k*2)*6;ctx.moveTo(-10+k*20,-76);ctx.quadraticCurveTo(-10+k*20+o,-96,-10+k*20,-114);ctx.stroke();}ctx.restore();}
// ----- Scène A : le comptoir -----
function skComptoir(t,i,sc){const t0=sStart(i),tTap=kt(i,0,'chaque'),tFee=kt(i,0,sc.feeKw||'jusqu');const G=1400;
  pill(sc.title,t0,t,COL.y,580);
  // jauge du compte
  const pg=P(t,t0+.1,.4);if(pg>0){ctx.save();ctx.globalAlpha=pg;card(80,650,920,185,'rgba(255,255,255,.25)');
    const bx=130,bw=820,by=745,lim=bx+bw*.72,zero=bx+bw*.22;
    rr(bx,by,bw,26,13);ctx.fillStyle='rgba(255,255,255,.14)';ctx.fill();
    rr(bx,by,zero-bx,26,[13,0,0,13]);ctx.fillStyle=COL.g;ctx.fill();ctx.fillStyle=COL.y;ctx.fillRect(zero,by,lim-zero,26);rr(lim,by,bx+bw-lim,26,[0,13,13,0]);ctx.fillStyle=COL.r;ctx.fill();
    ctx.fillStyle='#fff';ctx.fillRect(lim-3,by-16,6,58);
    txt('0 €',zero,by-30,28,COL.mut,{w:700});txt('DÉCOUVERT AUTORISÉ',lim-10,by-34,28,COL.w,{w:900,align:'right'});txt('AU-DELÀ',lim+16,by-34,28,COL.r,{w:900,align:'left'});
    const q=eio(P(t,tTap,.5));const mx=lerp(lim-22,lim+70,q);ctx.beginPath();ctx.arc(mx,by+13,22,0,7);ctx.fillStyle='#fff';ctx.shadowColor=q>.5?COL.r:COL.y;ctx.shadowBlur=30;ctx.fill();ctx.shadowBlur=0;ctx.beginPath();ctx.arc(mx,by+13,12,0,7);ctx.fillStyle=q>.5?COL.r:COL.y;ctx.fill();
    txt('Ton solde',mx,by+60,28,q>.5?COL.r:COL.w,{w:800});ctx.restore();}
  ground(G);
  // comptoir + terminal + café
  const pc=P(t,t0,.4);ctx.save();ctx.translate(lerp(500,0,eo(pc)),0);
  const cg=ctx.createLinearGradient(0,1180,0,1400);cg.addColorStop(0,'#F4F6FB');cg.addColorStop(1,'#C9D3EA');ctx.fillStyle=cg;rr(480,1196,440,204,[10,10,24,24]);ctx.fill();ctx.fillStyle='#FFC83D';rr(460,1170,480,36,14);ctx.fill();
  ctx.fillStyle='rgba(11,16,38,.12)';rr(520,1240,360,120,16);ctx.fill();txt('CAFÉ',700,1300,54,'rgba(11,16,38,.45)',{});
  cup(800,1170,t);
  const ok=P(t,tTap,.2);ctx.save();ctx.translate(560,1170);ctx.rotate(-.08);rr(-44,-128,88,128,14);ctx.fillStyle='#1B2140';ctx.fill();rr(-34,-116,68,60,8);ctx.fillStyle=ok>0?COL.g:'#4D8BFF';ctx.fill();
  txt(ok>0?'1 € ✓':'1 €',0,-85,26,'#0B1026',{});ctx.fillStyle='rgba(255,255,255,.35)';for(let k=0;k<6;k++){rr(-30+k%3*22,-46+Math.floor(k/3)*18,16,11,3);ctx.fill();}ctx.restore();
  if(ok>0&&ok<1){ctx.strokeStyle=`rgba(46,229,157,${1-ok})`;ctx.lineWidth=8;ctx.beginPath();ctx.arc(555,1080,40+ok*90,0,7);ctx.stroke();}
  ctx.restore();
  // client
  const pw=P(t,t0-.2,.9);const cx=lerp(-140,330,eo(pw));const sh=P(t,tFee,.25);const reach=eio(P(t,tTap-.45,.4))*(1-eio(P(t,tFee-.1,.3)));
  const S0=.92;const tgt=[(545-cx)/S0,(1085-G)/S0];const rest=[72+20,-418+180];
  const armR=sh>0?[lerp(.3,2.5,eb(sh)),lerp(.3,2.9,eb(sh))]:{to:[lerp(rest[0],tgt[0],reach),lerp(rest[1],tgt[1],reach)]};
  const armL=sh>0?[-lerp(.12,2.5,eb(sh)),-lerp(.05,2.9,eb(sh))]:[-.12,-.05];
  person(cx,G,S0,{walk:pw<1?t*9:undefined,mood:sh>0?'shock':'happy',armR,armL,holdR:sh>0?null:'card',look:1,blink:blinkAt(t),bob:sh>0?Math.sin(P(t,tFee,.4)*Math.PI)*26:Math.sin(t*2.5)*3,tilt:sh>0?-.06:.03});
  // l'étiquette +8 €
  const pf=P(t,tFee,.4);if(pf>0){tagBox(690,960,470,200,COL.r,pf,-.05);ctx.save();ctx.translate(690,960);ctx.rotate(-.05);txt(sc.fee,0,-22,110,COL.w,{sc:eb(pf)});txt(sc.feeSub,0,58,34,COL.w,{sc:eb(pf),w:800,maxW:420});ctx.restore();burst(690,960,tFee,t,COL.r,16,300);}
}
// ----- Scène B : le compteur -----
function skCompteur(t,i,sc){const t0=sStart(i),c0=SCUES[i][0],tCap=kt(i,0,'plafond');const G=1400;
  pill(sc.title,t0,t,COL.r,580);ground(G);
  let n=0;const at=k=>c0.start+c0.dur*(.02+.05*k);
  for(let k=0;k<10;k++){const p=P(t,at(k),.3);if(p<=0)continue;n=k+1;const x=470+(k%5)*108,y=730+Math.floor(k/5)*150;
    ctx.save();ctx.translate(x,y);ctx.rotate((k%2?-.05:.05));ctx.scale(eb(p),eb(p));ctx.fillStyle='#F4F6FB';ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=16;ctx.beginPath();ctx.moveTo(-44,-58);ctx.lineTo(44,-58);ctx.lineTo(44,50);
    for(let z=0;z<4;z++){ctx.lineTo(44-z*22-11,60);ctx.lineTo(44-(z+1)*22,50);}ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#C9D3EA';rr(-30,-44,60,10,5);ctx.fill();rr(-30,-26,40,10,5);ctx.fill();ctx.restore();
    txt('8 €',x,y+18,34,COL.r,{sc:eb(p)});
    // pièce qui file vers la banque
    const q=P(t,at(k)+.05,.55);if(q>0&&q<1){const sx=300,sy=1150,ex2=800,ey2=1290;coin(lerp(sx,ex2,q),lerp(sy,ey2,q)-Math.sin(q*Math.PI)*160,24,t*12+k);}}
  const pb=P(t,at(0),.3);if(pb>0){txt('= '+(n*8)+' €',690,1050,140,n>=10?COL.r:COL.y,{sc:eb(pb)*(1+.06*Math.sin(P(t,at(Math.max(0,n-1)),.2)*Math.PI)),glow:35});}
  const pcap=P(t,tCap,.4);if(pcap>0){tagBox(690,1175,560,96,COL.y,pcap);txt(sc.cap,690,1178,46,'#0B1026',{sc:eb(pcap),maxW:520});}
  const pk=P(t,t0,.4);bankIcon(800,1312,.4*eb(pk),1);
  const worry=n>=4;person(230,G,.88,{mood:n>=10?'shock':worry?'worry':'ok',look:1,blink:blinkAt(t,1),armR:n>0&&n<10?[.9+Math.sin(t*14)*.08,1.5]:n>=10?[2.4,2.9]:undefined,armL:n>=10?[-2.4,-2.9]:[-.12,-.05],bob:Math.sin(t*2.5)*3,tilt:n>=10?-.05:.04});
}
// ----- Scène C : le calendrier -----
function skCalendrier(t,i,sc){const t0=sStart(i),tHit=kt(i,0,sc.hitKw||'un mois');const G=1400;
  pill(sc.title,t0,t,COL.b,580);ground(G);
  const pc=P(t,t0+.05,.4);if(pc>0){ctx.save();ctx.globalAlpha=pc;card(80,650,920,250,'rgba(255,255,255,.25)');
    const x0=150,x1=900,y=790,mid=x0+(x1-x0)*2/3;const q=eio(P(t,t0+.4,Math.max(.6,tHit-t0-.5)));
    txt('MOIS 1',(x0+mid)/2,700,30,COL.mut,{w:900});txt('MOIS 2',(mid+x1)/2,700,30,COL.mut,{w:900});
    ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=3;ctx.setLineDash([8,10]);ctx.beginPath();ctx.moveTo(mid,680);ctx.lineTo(mid,880);ctx.stroke();ctx.setLineDash([]);
    rr(x0,y-9,x1-x0,18,9);ctx.fillStyle='rgba(255,255,255,.16)';ctx.fill();const xm=lerp(x0,x1,q);rr(x0,y-9,Math.max(18,xm-x0),18,9);ctx.fillStyle=q>=1?COL.r:COL.y;ctx.fill();
    ctx.beginPath();ctx.arc(x0,y,20,0,7);ctx.fillStyle=COL.g;ctx.fill();txt('Opération',x0-20,y+52,30,COL.w,{w:800,align:'left'});
    ctx.beginPath();ctx.arc(x1,y,20+8*P(t,tHit,.2),0,7);ctx.fillStyle=q>=1?COL.r:'rgba(255,255,255,.4)';ctx.fill();txt('Prélèvement',x1+24,y+52,30,q>=1?COL.r:COL.w,{w:800,align:'right'});
    if(q<1){ctx.beginPath();ctx.arc(xm,y,15,0,7);ctx.fillStyle='#fff';ctx.fill();}
    ctx.restore();}
  const pw=P(t,t0-.2,1.3);const cx=lerp(-140,360,pw);const hit=P(t,tHit,.3);
  person(cx,G,.8,{walk:pw<1?t*9:undefined,mood:hit>0?'shock':'happy',look:hit>0?1:0,blink:blinkAt(t,2),holdR:'phone',phoneCol:hit>0?COL.r:COL.b,armR:[1.0,2.4],armL:hit>0?[-2.4,-2.9]:[-.12+Math.sin(t*9)*(pw<1?.3:0),-.05],bob:hit>0?Math.sin(P(t,tHit,.4)*Math.PI)*24:Math.sin(t*2.5)*3,tilt:hit>0?-.06:.04});
  if(hit>0){tagBox(700,1050,430,190,COL.r,hit,.04);ctx.save();ctx.translate(700,1050);ctx.rotate(.04);txt(sc.hit,0,-22,100,COL.w,{sc:eb(hit)});txt(sc.hitSub,0,54,32,COL.w,{sc:eb(hit),w:800,maxW:390});ctx.restore();burst(700,1050,tHit,t,COL.r,16,280);}
  if(sc.note){const pn=P(t,frac(i,.82),.4);if(pn>0){tagBox(540,1492,820,80,COL.g,pn);txt(sc.note,540,1495,38,'#0B1026',{sc:eb(pn),maxW:780});}}
}
// ----- Saynète générique (type "saynete") -----
const HUM={content:'happy',ok:'ok',inquiet:'worry',choc:'shock'};
const BRAS={repos:[[-.12,-.05],[.12,.05]],haut:[[-2.5,-2.9],[2.5,2.9]],pointe:[[-.12,-.05],[1.38,1.42]],tend:[[-.12,-.05],[1.0,1.9]],salut:[[-.12,-.05],[2.4,3.3]],tel:[[-.12,-.05],[1.0,2.4]],hanches:[[-.7,.9],[.7,-.9]]};
const TIENT={carte:'card',telephone:'phone',dossier:'dossier'};
function findKw(i,kw){for(const c of SCUES[i]){if(c.text.indexOf(kw)>=0)return K(c.id,kw);}throw 'mot introuvable dans la scène '+i+' : '+kw;}
function tm(i,o,def){if(o&&o.mot)return findKw(i,o.mot);if(o&&o.at!==undefined)return frac(i,o.at);return def;}
function decor(kind,sc,t,i){const G=1400,t0=sStart(i);const pc=P(t,t0,.4);ctx.save();ctx.translate(lerp(500,0,eo(pc)),0);
  if(kind=='comptoir'){const cg=ctx.createLinearGradient(0,1180,0,1400);cg.addColorStop(0,'#F4F6FB');cg.addColorStop(1,'#C9D3EA');ctx.fillStyle=cg;rr(480,1196,440,204,[10,10,24,24]);ctx.fill();ctx.fillStyle=COL.y;rr(460,1170,480,36,14);ctx.fill();
    ctx.fillStyle='rgba(11,16,38,.12)';rr(520,1240,360,120,16);ctx.fill();txt(sc.decorLabel||'CAFÉ',700,1300,54,'rgba(11,16,38,.45)',{maxW:330});cup(800,1170,t);
    ctx.save();ctx.translate(560,1170);ctx.rotate(-.08);rr(-44,-128,88,128,14);ctx.fillStyle='#1B2140';ctx.fill();rr(-34,-116,68,60,8);ctx.fillStyle=COL.b;ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';for(let k=0;k<6;k++){rr(-30+k%3*22,-46+Math.floor(k/3)*18,16,11,3);ctx.fill();}ctx.restore();}
  if(kind=='bureau'){const cg=ctx.createLinearGradient(0,1220,0,1400);cg.addColorStop(0,'#F4F6FB');cg.addColorStop(1,'#C9D3EA');ctx.fillStyle=cg;rr(500,1236,440,164,[10,10,24,24]);ctx.fill();ctx.fillStyle=COL.y;rr(480,1210,480,36,14);ctx.fill();
    bankIcon(720,1318,.3,1);ctx.fillStyle='#1B2140';rr(560,1140,130,74,8);ctx.fill();ctx.fillStyle=COL.b;rr(568,1148,114,58,5);ctx.fill();ctx.fillStyle='#1B2140';rr(540,1206,170,10,5);ctx.fill();}
  if(kind=='maison'){house(730,1236,1.5,1);if(sc.decorLabel){const pl=P(t,t0+.3,.4);if(pl>0){ctx.save();ctx.translate(730,1010);ctx.scale(eb(pl),eb(pl));ctx.font=`900 50px ${F}`;const w=ctx.measureText(sc.decorLabel).width+60;rr(-w/2,-42,w,84,20);ctx.fillStyle=COL.w;ctx.fill();ctx.fillStyle='#0B1026';ctx.fillRect(-4,42,8,40);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(sc.decorLabel,0,3);ctx.restore();}}}
  ctx.restore();}
function bulle(x,y,s,p){ctx.font=`900 40px ${F}`;const w=Math.min(520,ctx.measureText(s).width+60);const bx=cl(x,90+w/2,990-w/2);ctx.save();ctx.translate(bx,y);ctx.scale(eb(p),eb(p));ctx.fillStyle='#fff';ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=20;rr(-w/2,-44,w,88,30);ctx.fill();ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(x-bx-18,40);ctx.lineTo(x-bx+18,40);ctx.lineTo(x-bx,74);ctx.closePath();ctx.fill();ctx.restore();txt(s,bx,y+3,40,'#0B1026',{sc:eb(p),maxW:w-40});}
function skSaynete(t,i,sc){const t0=sStart(i),G=1400;const col=CC[sc.color||'y'];
  if(sc.title)pill(sc.title,t0,t,col,580);ground(G);
  const rows=(sc.panneau||[]);const hasP=rows.length>0;
  if(hasP){const pp=P(t,t0+.1,.4);if(pp>0){ctx.save();ctx.globalAlpha=pp;const rh=68;card(80,650,920,40+rows.length*rh,'rgba(255,255,255,.25)');
    rows.forEach((r,k)=>{const p=P(t,tm(i,r,t0+.2+k*.4),.35);if(p<=0)return;const y=650+20+k*rh+rh/2;ctx.save();ctx.globalAlpha*=cl(p*2);ctx.translate(lerp(60,0,eo(p)),0);
      if(r.sub){txt(r.l,120,y-13,36,COL.w,{align:'left',w:800,maxW:500});txt(r.sub,120,y+19,24,COL.mut,{align:'left',w:600,maxW:500});}else txt(r.l,120,y+2,38,COL.w,{align:'left',w:800,maxW:500});
      txt(r.v,960,y+2,46,CC[r.color]||COL.y,{align:'right',maxW:380,sc:.6+.4*eb(p)});ctx.restore();});ctx.restore();}}
  const ps=(sc.persos||[]).map((p,k,a)=>{const te=tm(i,p.entre,t0-.2);const tx=p.x!==undefined?p.x:(a.filter(q=>!q.derriere).length>1?[230,440][a.filter((q,j)=>!q.derriere&&j<k).length]||300:300);
    return Object.assign({},p,{te,tx,S:p.taille||(hasP?.8:.9)});});
  const drawP=(p,k)=>{const pw=P(t,p.te,p.derriere?.01:.9);if(pw<=0)return;const fromR=p.regarde=='gauche'&&!p.derriere;const cx=p.derriere?p.tx:lerp(fromR?1220:-140,p.tx,eo(pw));
    let hum=p.humeur||'content',b0=BRAS[p.bras||'repos'],b1=b0,q=1,tr=-1;(p.reactions||[]).map(r=>[tm(i,r,t0),r]).sort((a,b)=>a[0]-b[0]).forEach(([tt,r])=>{if(t>=tt){if(r.humeur)hum=r.humeur;if(r.bras){b0=b1;b1=BRAS[r.bras];q=eb(P(t,tt,.3));}if(r.humeur=='choc')tr=tt;}});
    const L=[lerp(b0[0][0],b1[0][0],q),lerp(b0[0][1],b1[0][1],q)];let R=[lerp(b0[1][0],b1[1][0],q),lerp(b0[1][1],b1[1][1],q)];
    const hold=TIENT[p.tient];if(hold&&b1==BRAS.repos)R=hold=='phone'?[1.0,2.4]:[.55,1.7];if(b1==BRAS.salut)R=[2.4,3.3+Math.sin(t*10)*.35];
    const jump=tr>=0?Math.sin(P(t,tr,.4)*Math.PI)*24:0;
    const pos=person(cx,G,p.S,{pal:PAL[p.qui]||PAL.client,flip:p.regarde=='gauche',walk:pw<1&&!p.derriere?t*9:undefined,mood:HUM[hum]||'happy',armL:L,armR:R,holdR:hold,look:1,blink:blinkAt(t,k*1.3),bob:jump||Math.sin(t*2.5+k)*3,tilt:hum=='choc'?-.06:.03*(k%2?-1:1)});
    p.cx=cx;};
  ctx.save();ctx.beginPath();ctx.rect(0,0,W,1238);ctx.clip();ps.forEach((p,k)=>{if(p.derriere)drawP(p,k);});ctx.restore();
  if(sc.decor)decor(sc.decor,sc,t,i);
  ps.forEach((p,k)=>{if(!p.derriere)drawP(p,k);});
  (sc.bulles||[]).forEach(b=>{const tb=tm(i,b,t0+.3);const p=P(t,tb,.3)*(b.fin?1-P(t,tm(i,b.fin,1e9),.2):1);const pr=ps[b.perso||0];if(p>0&&pr&&pr.cx!==undefined)bulle(pr.cx,G-690*pr.S,b.texte,p);});
  const tags=sc.tags||(sc.tag?[sc.tag]:[]);tags.forEach((g,k)=>{const tg=tm(i,g,frac(i,.5));const p=P(t,tg,.4);if(p<=0)return;const c=CC[g.color||'r'];const dark=(g.color=='y'||g.color=='g');const x=g.x||(hasP?700:540),y=g.y||(hasP?1040:745);const rot=k%2?.04:-.04;
    tagBox(x,y,g.w||500,g.sub?190:150,c,p,rot);ctx.save();ctx.translate(x,y);ctx.rotate(rot);txt(g.big,0,g.sub?-22:4,g.big.length>9?78:100,dark?'#0B1026':COL.w,{sc:eb(p),maxW:(g.w||500)-50});if(g.sub)txt(g.sub,0,54,32,dark?'#0B1026':COL.w,{sc:eb(p),w:800,maxW:(g.w||500)-50});ctx.restore();burst(x,y,tg,t,c,16,290);});
  if(sc.note){const n=typeof sc.note=='string'?{texte:sc.note}:sc.note;const pn=P(t,tm(i,n,frac(i,.82)),.4);if(pn>0){const c=CC[n.color||'g'];tagBox(540,1492,860,80,c,pn);txt(n.texte,540,1495,38,(n.color=='r'||n.color=='b')?COL.w:'#0B1026',{sc:eb(pn),maxW:820});}}
}
const SK={saynete:skSaynete,sk_comptoir:skComptoir,sk_compteur:skCompteur,sk_calendrier:skCalendrier};
SCN.forEach((s,i)=>{const sc=SPEC.scenes[i];if(SK[sc.type]){S[s]=t=>SK[sc.type](t,i,sc);const t0=sStart(i),c0=SCUES[i][0];ev(t0,'pop');
  if(sc.type=='sk_comptoir'){ev(kt(i,0,'chaque'),'ding');ev(kt(i,0,sc.feeKw||'jusqu'),'impact',.9);}
  if(sc.type=='sk_compteur'){for(let k=0;k<10;k++)ev(c0.start+c0.dur*(.02+.05*k),'tick',.6);ev(kt(i,0,'plafond'),'impact',.7);}
  if(sc.type=='saynete'){(sc.panneau||[]).forEach((r,k)=>ev(tm(i,r,t0+.2+k*.4),'pop'));(sc.bulles||[]).forEach(b=>ev(tm(i,b,t0+.3),'pop'));(sc.tags||(sc.tag?[sc.tag]:[])).forEach(g=>ev(tm(i,g,frac(i,.5)),'impact',.8));if(sc.note){const n=typeof sc.note=='string'?{}:sc.note;ev(tm(i,n,frac(i,.82)),'ding');}}
  if(sc.type=='sk_calendrier'){ev(kt(i,0,sc.hitKw||'un mois'),'impact',.9);if(sc.note)ev(frac(i,.82),'ding');}}});
