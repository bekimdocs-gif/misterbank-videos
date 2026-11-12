// ---------- Couverture (image de présentation) : titre accrocheur, incrustée en 1re image de la vidéo ----------
// SPEC.cover = {l1, l2, badge} ; à défaut, reprend line1 / line2 / badge du hook.
function coverSpec(){const h=SPEC.scenes.find(s=>s.type=='hook')||{};const c=SPEC.cover||{};return{l1:c.l1||h.line1||'',l2:c.l2||h.line2||'',badge:c.badge!==undefined?c.badge:(h.badge||'')};}
function drawCoverLayer(){const c=coverSpec();
  // tout le contenu tient dans la zone centrale (y 420 à 1500) : visible aussi dans la grille du profil (recadrage 3:4)
  if(SPEC.series){ctx.save();ctx.font=`900 34px ${F}`;const w=ctx.measureText(SPEC.series).width+56;rr(CX-w/2,440,w,64,32);ctx.fillStyle=COL.y;ctx.fill();ctx.fillStyle='#0B1026';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(SPEC.series,CX,474);ctx.restore();}
  const x=CX,y=700,s=.62,R=300*s,cy=y+70*s;
  ctx.save();const gl=ctx.createRadialGradient(x,cy,R*.6,x,cy,R*1.5);gl.addColorStop(0,'rgba(255,200,61,.4)');gl.addColorStop(1,'rgba(255,200,61,0)');ctx.fillStyle=gl;ctx.beginPath();ctx.arc(x,cy,R*1.5,0,7);ctx.fill();ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(x,cy,R,0,7);const b2=ctx.createLinearGradient(0,cy-R,0,cy+R);b2.addColorStop(0,'#1B2A6B');b2.addColorStop(1,'#0B1236');ctx.fillStyle=b2;ctx.fill();ctx.clip();drawAvatar(ctx,x,y,s,{mouth:.7,blink:0,tilt:-.04,brow:.8});ctx.restore();
  ctx.save();ctx.lineWidth=12;ctx.strokeStyle=COL.y;ctx.shadowColor=COL.y;ctx.shadowBlur=40;ctx.beginPath();ctx.arc(x,cy,R,0,7);ctx.stroke();ctx.restore();
  txt(c.l1,CX,1050,116,COL.w,{maxW:980,stroke:18});
  txt(c.l2,CX,1185,128,COL.y,{maxW:980,stroke:18,glow:30});
  if(c.badge){ctx.save();ctx.translate(CX,1345);ctx.rotate(-.04);ctx.font=`900 64px ${F}`;const w=Math.min(920,ctx.measureText(c.badge).width+90);rr(-w/2,-62,w,124,36);ctx.fillStyle=COL.r;ctx.shadowColor=COL.r;ctx.shadowBlur=40;ctx.fill();ctx.restore();
    ctx.save();ctx.translate(CX,1345);ctx.rotate(-.04);txt(c.badge,0,4,64,COL.w,{maxW:850});ctx.restore();}
  logoWord(CX,1490,.3,1);
}
window.drawCover=function(){ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;bg(0,'hook');drawCoverLayer();};
(function(){const base=window.draw;const HOLD=0.1,FADE=0.3;
  window.draw=function(t){if(t<HOLD){window.drawCover();return;}base(t);
    if(t<HOLD+FADE){const q=(t-HOLD)/FADE;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1-eo(q);bg(0,'hook');ctx.translate(CX,H/2);ctx.scale(1+.25*q,1+.25*q);ctx.translate(-CX,-H/2);drawCoverLayer();ctx.restore();}};})();
