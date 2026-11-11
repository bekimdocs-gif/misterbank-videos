// Mister Bank avatar v2 — modern, younger stylized character.
// drawAvatar(ctx, x, y, s, st) : (x,y) = centre of face; st = {mouth:0..1, blink:0..1, tilt, brow:-1..1}
(function(){
const C={skin:'#F1C3A0',skinHi:'#FBDDC6',skinSh:'#DFA582',hair:'#1C1412',hairMid:'#2E211C',hairHi:'#5A443A',
 beard:'#3B2B24',suit:'#BFC4CC',suitSh:'#A2A8B2',suitHi:'#D9DDE3',shirt:'#C7DDF6',shirtHi:'#E3EEFB',eye:'#4A3326',btn:'#9C8C95',rimB:'rgba(77,139,255,0.55)',rimY:'rgba(255,200,61,0.35)'};
function ell(c,x,y,rx,ry,r=0){c.beginPath();c.ellipse(x,y,rx,ry,r,0,Math.PI*2);}
function facePath(c){c.beginPath();c.moveTo(-138,-80);c.bezierCurveTo(-146,-235,146,-235,138,-80);
  c.bezierCurveTo(144,10,136,78,102,124);c.bezierCurveTo(66,170,-66,170,-102,124);c.bezierCurveTo(-136,78,-144,10,-138,-80);c.closePath();}
window.drawAvatar=function(c,x,y,s,st={}){
 const mouth=st.mouth||0,blink=st.blink||0,tilt=st.tilt||0,brow=st.brow||0;
 c.save();c.translate(x,y);c.scale(s,s);
 // ---------- body ----------
 c.save();c.translate(0,-38);
 const jg=c.createLinearGradient(0,200,0,560);jg.addColorStop(0,C.suitHi);jg.addColorStop(1,C.suit);
 c.fillStyle=jg;c.beginPath();c.moveTo(-300,560);c.bezierCurveTo(-300,320,-230,245,-80,212);c.lineTo(80,212);c.bezierCurveTo(230,245,300,320,300,560);c.closePath();c.fill();
 // rim light on shoulders
 c.save();c.clip();c.strokeStyle=C.rimB;c.lineWidth=18;c.beginPath();c.moveTo(-300,560);c.bezierCurveTo(-300,320,-230,245,-80,212);c.stroke();c.strokeStyle=C.rimY;c.beginPath();c.moveTo(300,560);c.bezierCurveTo(300,320,230,245,80,212);c.stroke();c.restore();
 // shirt
 c.fillStyle=C.shirt;c.beginPath();c.moveTo(-80,212);c.lineTo(80,212);c.lineTo(34,420);c.lineTo(-8,420);c.closePath();c.fill();
 c.fillStyle=C.shirtHi;c.beginPath();c.moveTo(-78,200);c.lineTo(-24,290);c.lineTo(-52,318);c.lineTo(-102,228);c.closePath();c.fill();
 c.beginPath();c.moveTo(78,200);c.lineTo(24,290);c.lineTo(52,318);c.lineTo(102,228);c.closePath();c.fill();
 c.fillStyle=C.skinSh;c.beginPath();c.moveTo(-26,232);c.lineTo(26,232);c.lineTo(0,310);c.closePath();c.fill();
 // lapels
 c.fillStyle=C.suitSh;
 c.beginPath();c.moveTo(-104,222);c.lineTo(-150,322);c.lineTo(-108,348);c.lineTo(-134,376);c.lineTo(-8,505);c.lineTo(-52,318);c.closePath();c.fill();
 c.beginPath();c.moveTo(104,222);c.lineTo(150,322);c.lineTo(108,348);c.lineTo(134,376);c.lineTo(36,505);c.lineTo(52,318);c.closePath();c.fill();
 c.fillStyle=C.btn;[[-36,490],[80,490]].forEach(([bx,by])=>{ell(c,bx,by,10,10);c.fill();});
 c.restore();
 // ---------- head ----------
 c.save();c.rotate(tilt);
 // neck
 const ng=c.createLinearGradient(0,110,0,240);ng.addColorStop(0,'#D99B78');ng.addColorStop(1,C.skinSh);
 c.fillStyle=ng;c.beginPath();c.moveTo(-50,110);c.lineTo(50,110);c.lineTo(56,215);c.lineTo(-56,215);c.closePath();c.fill();
 // ears
 c.fillStyle=C.skin;ell(c,-146,8,26,42,-.12);c.fill();ell(c,146,8,26,42,.12);c.fill();
 c.fillStyle=C.skinSh;ell(c,-148,10,12,24,-.12);c.fill();ell(c,148,10,12,24,.12);c.fill();
 // face with soft gradient
 const fg=c.createRadialGradient(-30,-60,20,0,0,220);fg.addColorStop(0,C.skinHi);fg.addColorStop(.6,C.skin);fg.addColorStop(1,C.skinSh);
 c.fillStyle=fg;facePath(c);c.fill();
 // rim lights on face
 c.save();facePath(c);c.clip();
 // short beard (light, neat)
 c.fillStyle='#2A1D18';c.globalAlpha=.78;c.beginPath();
 c.moveTo(-142,0);c.bezierCurveTo(-140,70,-130,100,-102,124);c.bezierCurveTo(-66,170,66,170,102,124);c.bezierCurveTo(130,100,140,70,142,0);
 c.lineTo(126,4);c.bezierCurveTo(124,50,110,70,80,80);c.bezierCurveTo(40,70,-40,70,-80,80);c.bezierCurveTo(-110,70,-124,50,-126,4);c.closePath();c.fill();
 c.globalAlpha=1;c.restore();
 // cheek glow
 c.fillStyle='rgba(255,140,120,.16)';ell(c,-80,30,30,18);c.fill();ell(c,80,30,30,18);c.fill();
 // mouth
 c.save();c.translate(0,94);const mw=56,mh=8+mouth*28;
 c.fillStyle='#5A2620';c.beginPath();c.moveTo(-mw,-6);c.quadraticCurveTo(0,6,mw,-6);c.quadraticCurveTo(mw*.7,mh+12,0,mh+16);c.quadraticCurveTo(-mw*.7,mh+12,-mw,-6);c.closePath();c.fill();
 c.save();c.clip();c.fillStyle='#fff';c.beginPath();c.moveTo(-mw,-10);c.quadraticCurveTo(0,4,mw,-10);c.lineTo(mw,10+mouth*3);c.quadraticCurveTo(0,20+mouth*3,-mw,10+mouth*3);c.closePath();c.fill();
 if(mouth>.3){c.fillStyle='#D45A55';ell(c,0,mh+12,24,7*mouth);c.fill();}c.restore();
 c.strokeStyle='#C7756A';c.lineWidth=3.5;c.lineCap='round';c.beginPath();c.moveTo(-mw*.55,mh+14);c.quadraticCurveTo(0,mh+21,mw*.55,mh+14);c.stroke();
 c.restore();
 // mustache (slimmer, neat, slightly upturned)
 c.fillStyle=C.beard;c.beginPath();c.moveTo(0,70);
 c.bezierCurveTo(-26,60,-60,62,-74,76);c.bezierCurveTo(-82,84,-82,92,-76,94);c.bezierCurveTo(-64,84,-42,86,-26,85);c.bezierCurveTo(-12,84,-4,82,0,84);
 c.bezierCurveTo(4,82,12,84,26,85);c.bezierCurveTo(42,86,64,84,76,94);c.bezierCurveTo(82,92,82,84,74,76);c.bezierCurveTo(60,62,26,60,0,70);c.closePath();c.fill();
 // nose (minimal)
 c.strokeStyle='rgba(200,130,100,.9)';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(4,-20);c.quadraticCurveTo(12,22,16,36);c.quadraticCurveTo(4,46,-12,40);c.stroke();
 // eyes (bigger, youthful)
 const op=Math.max(.06,1-blink);
 [-1,1].forEach(side=>{const ex=side*58;c.save();c.translate(ex,-34);
   c.fillStyle='#fff';c.beginPath();c.moveTo(-32,4);c.quadraticCurveTo(0,-28*op,32,4);c.quadraticCurveTo(0,20*op,-32,4);c.closePath();c.fill();
   c.save();c.clip();const ig=c.createRadialGradient(side*-2,2,2,side*-2,2,18);ig.addColorStop(0,'#7A5440');ig.addColorStop(1,C.eye);c.fillStyle=ig;ell(c,side*-2,2,18,18);c.fill();
   c.fillStyle='#120B08';ell(c,side*-2,2,8,8);c.fill();c.fillStyle='#fff';ell(c,side*-2+6,-5,5,5);c.fill();ell(c,side*-2-5,8,2.5,2.5);c.fill();c.restore();
   c.strokeStyle='#22160F';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(-34,5);c.quadraticCurveTo(0,-29*op,34,3);c.stroke();
   c.restore();});
 // eyebrows (clean, modern)
 c.fillStyle=C.hair;[-1,1].forEach(side=>{c.save();c.translate(side*60,-82-brow*8);c.scale(side,1);c.beginPath();c.moveTo(-40,8);c.quadraticCurveTo(-4,-12,38,-2);c.quadraticCurveTo(42,2,38,6);c.quadraticCurveTo(-4,-1,-38,16);c.closePath();c.fill();c.restore();});
 // skin fade on sides of head (modern skin fade)
 const sf=c.createLinearGradient(0,-150,0,-10);sf.addColorStop(0,'rgba(28,20,18,.95)');sf.addColorStop(1,'rgba(28,20,18,0)');
 c.fillStyle=sf;[-1,1].forEach(side=>{c.beginPath();c.moveTo(side*140,-120);c.quadraticCurveTo(side*150,-60,side*142,-5);c.lineTo(side*128,-5);c.quadraticCurveTo(side*132,-60,side*122,-125);c.closePath();c.fill();});
 // hair: textured modern quiff
 const hg=c.createLinearGradient(0,-320,0,-140);hg.addColorStop(0,C.hairMid);hg.addColorStop(1,C.hair);
 c.fillStyle=hg;c.beginPath();
 c.moveTo(-140,-110);c.bezierCurveTo(-150,-190,-120,-250,-60,-275);
 c.bezierCurveTo(-30,-300,10,-322,60,-312);c.bezierCurveTo(110,-302,150,-262,152,-205);c.bezierCurveTo(154,-160,150,-130,140,-110);
 c.bezierCurveTo(130,-130,118,-148,100,-156);c.bezierCurveTo(60,-162,20,-160,-10,-162);c.bezierCurveTo(-50,-162,-90,-156,-110,-148);c.bezierCurveTo(-125,-138,-134,-125,-140,-110);c.closePath();c.fill();
 // texture strands
 c.strokeStyle=C.hairHi;c.lineCap='round';
 [[4,-70,-168,-10,-258,60,-296],[3,10,-162,70,-226,135,-250],[3,-118,-150,-108,-215,-62,-258]].forEach(([w,a,b,cc,d,e,f])=>{c.lineWidth=w;c.beginPath();c.moveTo(a,b);c.quadraticCurveTo(cc,d,e,f);c.stroke();});
 // shine
 c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=10;c.beginPath();c.moveTo(-40,-270);c.quadraticCurveTo(30,-300,90,-282);c.stroke();
 c.restore();
 c.restore();
};
})();
