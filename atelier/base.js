const W=1080,H=1920,CX=540;
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const COL={bg1:'#060A1E',bg2:'#0E1A4A',y:'#FFC83D',r:'#FF4757',g:'#2EE59D',b:'#4D8BFF',w:'#FFFFFF',mut:'rgba(255,255,255,0.62)',card:'rgba(255,255,255,0.08)'};
const F="Inter";
// ---------- timeline helpers ----------
const CUES={};TL.cues.forEach(c=>CUES[c.id]=c);
const T=id=>CUES[id].start;
function K(id,kw){const c=CUES[id];const i=c.text.indexOf(kw);if(i<0)throw 'kw '+kw;return c.start+c.dur*(i/c.text.length);}
const SCN=SPEC.scenes.map((s,i)=>'s'+i);
const SS={};SCN.forEach(s=>{const f=TL.cues.find(c=>c.scene==s);SS[s]=s=='s0'?0:f.start-0.3;});
const SE={};SCN.forEach((s,i)=>SE[s]=i<SCN.length-1?SS[SCN[i+1]]:TL.total);
// ---------- easing ----------
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const P=(t,a,d)=>cl((t-a)/d);
const eo=x=>1-Math.pow(1-x,3);
const eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const eb=x=>{const c1=1.9,c3=c1+1;return x<=0?0:1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
const el=x=>x<=0?0:x>=1?1:Math.pow(2,-10*x)*Math.sin((x*10-.75)*(2*Math.PI)/3)+1;
const lerp=(a,b,x)=>a+(b-a)*x;
// ---------- seeded random ----------
function rng(s){return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};}
const R=rng(42);const PARTS=[...Array(46)].map(()=>({x:R()*W,y:R()*H,s:2+R()*5,v:20+R()*60,a:.15+R()*.35}));
// ---------- events (sound + shake) ----------
const EV=[];const ev=(t,type,amp=0)=>{EV.push({t,type,amp});return t;};
// ---------- drawing helpers ----------
function rr(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function txt(s,x,y,size,color,{w=900,align='center',alpha=1,sc=1,maxW=980,stroke=0,glow=0,base='middle'}={}){
  if(alpha<=0||sc<=0)return;ctx.save();ctx.globalAlpha*=alpha;ctx.translate(x,y);ctx.scale(sc,sc);
  ctx.font=`${w} ${size}px ${F}`;let m=ctx.measureText(s).width;if(m>maxW){const k=maxW/m;ctx.scale(k,k);}
  ctx.textAlign=align;ctx.textBaseline=base;
  if(glow){ctx.shadowColor=color;ctx.shadowBlur=glow;}
  if(stroke){ctx.lineJoin='round';ctx.lineWidth=stroke;ctx.strokeStyle='rgba(0,0,0,0.85)';ctx.strokeText(s,0,0);}
  ctx.fillStyle=color;ctx.fillText(s,0,0);ctx.restore();}
function fmt(n,dec=0){const s=n.toFixed(dec).replace('.',',');const[i,d]=s.split(',');return i.replace(/\B(?=(\d{3})+(?!\d))/g,' ')+(d?','+d:'');}
function pill(s,t0,t,color=COL.y,y=300){const p=P(t,t0,.45);if(p<=0)return;const sc=eb(p);ctx.save();ctx.translate(CX,y);ctx.scale(sc,sc);
  ctx.font=`900 40px ${F}`;const w=ctx.measureText(s).width+70;rr(-w/2,-38,w,76,38);ctx.fillStyle=color;ctx.fill();
  ctx.fillStyle='#0B1026';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(s,0,2);ctx.restore();}
function house(x,y,s,a=1){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.scale(s,s);
  ctx.fillStyle='#FFFFFF';rr(-80,-10,160,120,10);ctx.fill();
  ctx.fillStyle=COL.y;ctx.beginPath();ctx.moveTo(-115,0);ctx.lineTo(0,-105);ctx.lineTo(115,0);ctx.closePath();ctx.fill();
  ctx.fillRect(45,-95,26,60);ctx.fillStyle=COL.b;rr(-22,40,44,70,6);ctx.fill();ctx.restore();}
function checkIcon(x,y,p){ctx.save();ctx.translate(x,y);const s=eb(cl(p*1.6));ctx.scale(s,s);ctx.beginPath();ctx.arc(0,0,38,0,7);ctx.fillStyle=COL.g;ctx.fill();
  const q=cl((p-.35)/.5);if(q>0){ctx.strokeStyle='#06301F';ctx.lineWidth=10;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();
  const pts=[[-16,0],[-4,13],[18,-14]];ctx.moveTo(...pts[0]);if(q<.4){ctx.lineTo(lerp(-16,-4,q/.4),lerp(0,13,q/.4));}else{ctx.lineTo(...pts[1]);ctx.lineTo(lerp(-4,18,(q-.4)/.6),lerp(13,-14,(q-.4)/.6));}ctx.stroke();}
  ctx.restore();}
function arrowUp(x,y,s,color){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,-60);ctx.lineTo(50,0);ctx.lineTo(18,0);ctx.lineTo(18,60);ctx.lineTo(-18,60);ctx.lineTo(-18,0);ctx.lineTo(-50,0);ctx.closePath();ctx.fill();ctx.restore();}
function burst(x,y,t0,t,color,n=18,r=260){const p=P(t,t0,.7);if(p<=0||p>=1)return;ctx.save();
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2+i;const d=eo(p)*r*(0.6+((i*37)%10)/25);ctx.globalAlpha=(1-p);ctx.fillStyle=i%3==0?COL.w:color;
  ctx.beginPath();ctx.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,9*(1-p)+3,0,7);ctx.fill();}
  ctx.globalAlpha=(1-p)*.7;ctx.strokeStyle=color;ctx.lineWidth=8*(1-p);ctx.beginPath();ctx.arc(x,y,eo(p)*r*1.1,0,7);ctx.stroke();ctx.restore();}
function card(x,y,w,h,border,p){ctx.save();rr(x,y,w,h,28);ctx.fillStyle=COL.card;ctx.fill();if(border){ctx.lineWidth=4;ctx.strokeStyle=border;ctx.stroke();}ctx.restore();}
// ---------- background ----------
let tint='#1B2B7A';
function bg(t,scene){
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,COL.bg1);g.addColorStop(1,COL.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const blobs=[[.2,.25,scene=='hook'?'rgba(255,60,80,0.40)':'rgba(77,139,255,0.30)'],[.85,.7,scene=='hook'?'rgba(255,120,40,0.25)':'rgba(255,200,61,0.16)'],[.4,.95,'rgba(46,229,157,0.12)']];
  blobs.forEach(([bx,by,c],i)=>{const x=W*bx+Math.sin(t*.6+i*2)*140,y=H*by+Math.cos(t*.5+i)*160;const rg=ctx.createRadialGradient(x,y,0,x,y,620);rg.addColorStop(0,c);rg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);});
  // grid
  ctx.save();ctx.strokeStyle='rgba(255,255,255,0.045)';ctx.lineWidth=2;const off=(t*40)%120;
  for(let x=0;x<=W;x+=120){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=-off;y<=H;y+=120){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}ctx.restore();
  PARTS.forEach(p=>{const y=((p.y-t*p.v)%H+H)%H;ctx.globalAlpha=p.a;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(p.x+Math.sin(t+p.y)*20,y,p.s,0,7);ctx.fill();});ctx.globalAlpha=1;
}
// ---------- extra icons ----------
function bankIcon(x,y,s,a=1,shine=-1){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.scale(s,s);
  const g=ctx.createLinearGradient(-150,-150,150,150);g.addColorStop(0,'#FFE08A');g.addColorStop(.5,'#FFC83D');g.addColorStop(1,'#E39B12');
  ctx.fillStyle=g;ctx.shadowColor='rgba(255,200,61,.6)';ctx.shadowBlur=50;
  ctx.beginPath();ctx.moveTo(-160,-40);ctx.lineTo(0,-150);ctx.lineTo(160,-40);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
  rr(-150,-30,300,22,6);ctx.fill();
  for(let i=0;i<4;i++){rr(-128+i*72,0,40,120,8);ctx.fill();}
  rr(-165,130,330,26,6);ctx.fill();rr(-185,162,370,26,6);ctx.fill();
  ctx.fillStyle='#0B1026';ctx.font=`900 62px ${F}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('MB',0,-72);
  if(shine>=0&&shine<=1){ctx.globalCompositeOperation='source-atop';const sx=lerp(-300,300,shine);const sg=ctx.createLinearGradient(sx-60,0,sx+60,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.85)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(-200,-160,400,360);}
  ctx.restore();}
function docIcon(x,y,s,rot=0,a=1){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);
  ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=40;ctx.fillStyle='#F4F6FB';rr(-210,-270,420,540,24);ctx.fill();ctx.shadowBlur=0;
  ctx.fillStyle='#0B1026';ctx.font=`900 34px ${F}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('DOSSIER DE PRÊT',0,-210);
  ctx.fillStyle='#C9D3EA';rr(-170,-160,110,120,12);ctx.fill();
  for(let i=0;i<3;i++){ctx.fillStyle='#D5DCEC';rr(-40,-150+i*40,210,18,9);ctx.fill();}
  for(let i=0;i<6;i++){ctx.fillStyle='#E1E6F2';rr(-170,10+i*42,i%2?280:340,18,9);ctx.fill();}
  ctx.restore();}
function stamp(x,y,s,label,color,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.lineWidth=12;ctx.strokeStyle=color;rr(-230,-75,460,150,20);ctx.stroke();
  ctx.fillStyle=color;ctx.font=`900 96px ${F}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,0,6);ctx.restore();}
function coinsIcon(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(let i=3;i>=0;i--){ctx.fillStyle=i%2?'#E39B12':COL.y;ctx.beginPath();ctx.ellipse(0,20-i*22,46,18,0,0,7);ctx.fill();}
  ctx.fillStyle='#0B1026';ctx.font=`900 30px ${F}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('€',0,-46);ctx.restore();}
function creditIcon(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#fff';rr(-40,-52,80,104,10);ctx.fill();ctx.fillStyle=COL.b;ctx.font=`900 52px ${F}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('€',0,2);ctx.restore();}
function coin(x,y,r,rot){ctx.save();ctx.translate(x,y);ctx.scale(Math.abs(Math.cos(rot))*0.8+0.2,1);ctx.fillStyle=COL.y;ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();ctx.fillStyle='#E39B12';ctx.beginPath();ctx.arc(0,0,r*.72,0,7);ctx.fill();
  ctx.fillStyle='#0B1026';ctx.font=`900 ${r}px ${F}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('€',0,2);ctx.restore();}
function flag(x,y,w,h){const c=['#2F5BEA','#FFFFFF','#FF4757'];for(let i=0;i<3;i++){ctx.fillStyle=c[i];ctx.fillRect(x+i*w/3,y,w/3,h);}}
function logoWord(x,y,sc,a=1){if(a<=0)return;txt('MISTER',x,y-95*sc,110*sc,COL.w,{alpha:a,maxW:2000});txt('BANK',x,y+40*sc,190*sc,COL.y,{alpha:a,glow:40,maxW:2000});}
