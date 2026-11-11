for(const id in CAP){const c=CUES[id];const raw=CAP[id].replace(/(\d) (\d{3})/g,'$1 $2').replace(/ (€|%)/g,' $1').replace(/ :/g,' :').replace(/ !/g,' !').replace(/ →/g,' →');
  const words=raw.split(' ');const wt=words.map(w=>(/\d/.test(w)?w.length*2.2:w.length)+2);const tot=wt.reduce((a,b)=>a+b,0);
  let acc=0;const ws=words.map((w,i)=>{const s=c.start+c.dur*acc/tot;acc+=wt[i];return{w,s,e:c.start+c.dur*acc/tot};});
  let cur=[];let len=0;ws.forEach((w,i)=>{if(cur.length&&(len+w.w.length>20||cur.length>=4)){CHUNKS.push(cur);cur=[];len=0;}cur.push(w);len+=w.w.length+1;});if(cur.length)CHUNKS.push(cur);}
CHUNKS.forEach((ch,i)=>{ch.s=ch[0].s;ch.e=ch[ch.length-1].e+0.15;});
function captions(t){const ch=CHUNKS.find(c=>t>=c.s-0.02&&t<c.e);if(!ch)return;
  ctx.font=`900 70px ${F}`;const sp=34;const widths=ch.map(w=>ctx.measureText(w.w.toUpperCase()).width);
  let total=widths.reduce((a,b)=>a+b,0)+sp*(ch.length-1);let k=Math.min(1,960/total);const pin=eb(P(t,ch.s-0.02,.18));k*=pin;let x=CX-total*k/2;const y=1610;
  ch.forEach((w,i)=>{const act=(i==ch.findLastIndex(x=>t>=x.s))&&t<ch.e;const done=t>=w.s;const s=(act?1.08:1)*k;
    txt(w.w.toUpperCase(),x+widths[i]*k/2,y,70,act?COL.y:COL.w,{sc:s,stroke:16,alpha:done?1:0.55,maxW:2000});x+=(widths[i]+sp)*k;});}