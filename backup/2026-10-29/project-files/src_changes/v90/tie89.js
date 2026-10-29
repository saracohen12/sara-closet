// v89: a white covering on the light grey background keeps its white (4-view sheet, synthetic)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
for(const col of ['#f6f5f3','#2a2a40']){
console.log(col,await p.evaluate(async col=>{const W=1600,H=600,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.fillStyle='#e4e3e3';x.fillRect(0,0,W,H);const pw=W/4;
 for(let k=0;k<4;k++){const ox=k*pw;if(k){x.fillStyle='#fff';x.fillRect(ox-3,0,6,H)}const g=x.createRadialGradient(ox+pw/2,220,20,ox+pw/2,260,200);g.addColorStop(0,col);g.addColorStop(1,col=='#f6f5f3'?'#dcdad6':'#1a1a2a');x.fillStyle=g;x.beginPath();x.ellipse(ox+pw/2,260,130,190,0,0,Math.PI*2);x.fill();
  x.fillStyle='#e4e3e3';if(k==0){x.beginPath();x.ellipse(ox+pw/2,300,55,80,0,0,Math.PI*2);x.fill()}}
 const im=new Image();im.src=cv.toDataURL();await im.decode();const rd=tieRead(im);const grp=tieGroups(rd.d,rd.W,rd.H);const cuts=tieSlice(im,rd,grp);
 window.__c=cuts[0].canvas.toDataURL();return cuts.map((c,i)=>{if(!c)return 'null';const d=c.canvas.getContext('2d').getImageData(0,0,c.w,c.h).data;let op=0;for(let k=3;k<d.length;k+=4)if(d[k]>128)op++;return i+': '+c.w+'x'+c.h+' opaque '+(op/(d.length/4)*100).toFixed(0)+'% hole='+JSON.stringify(c.hole)}).join(' | ')},col));require('fs').writeFileSync(process.argv[2]+'/tests/v77/tie89_'+col.slice(1)+'.png',Buffer.from((await p.evaluate(()=>window.__c)).split(',')[1],'base64'))}
console.log('ERR',errs);await b.close()})();
