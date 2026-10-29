// v89: her white floral dress sheet -> the 5 cuts must keep the white fabric (only the grey background goes)
const {chromium,devices}=require('playwright');const S=process.argv[2];const SRC=process.argv[3]||'_wd.png';const ID=process.argv[4]||'T103';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1366,height:850}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};let n=0;window.__u={};window.claude={use:async k=>k=='assets'?{upload:async bl=>{const id='mock'+(n++);const u=URL.createObjectURL(bl);window.__u[id]=u;return {id,url:u}}}:null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
const r=await p.evaluate(async([src,id])=>{const bl=await (await fetch(src)).blob();const t0=performance.now();await upP5g(id,new File([bl],'w.png',{type:'image/png'}),'');const g=IT[id].p5g;
 // sheet of the 5 cuts on green, and the share of see-through pixels inside each cut
 const W=5*300,H=760,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.fillStyle='#3c783c';x.fillRect(0,0,W,H);const info=[];
 const views=['front','side','back','half','hip'];for(let i=0;i<5;i++){const im=new Image();im.src=g.u[views[i]];await im.decode();const s=Math.min(290/im.width,740/im.height);x.drawImage(im,i*300+5,10,im.width*s,im.height*s);
  const c2=document.createElement('canvas');c2.width=im.width;c2.height=im.height;const x2=c2.getContext('2d');x2.drawImage(im,0,0);const dd=x2.getImageData(0,0,im.width,im.height).data;let tr=0;for(let k=3;k<dd.length;k+=4)if(dd[k]<128)tr++;info.push(views[i]+' '+im.width+'x'+im.height+' clear '+(tr/(dd.length/4)*100).toFixed(1)+'%')}
 return {ms:Math.round(performance.now()-t0),info,url:cv.toDataURL('image/png')}},[SRC,ID]);
console.log(r.ms+'ms',r.info.join(' | '));require('fs').writeFileSync(S+'/tests/v77/cut89_out.png',Buffer.from(r.url.split(',')[1],'base64'));
await p.evaluate(async i=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());await openStudio(null,{[slotOf(i)]:i})},ID);await p.waitForTimeout(1500);
const st=await p.$('#sstage');await st.screenshot({path:S+'/tests/v77/cut89_studio.png'});
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
