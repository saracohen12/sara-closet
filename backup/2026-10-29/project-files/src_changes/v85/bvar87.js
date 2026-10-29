// v87: a 3-belt pack uploaded as 3 versions -> 3 separate tiles in the studio drawer, each one dresses its own belt
const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};let n=0;window.claude={use:async k=>k=='assets'?{upload:async bl=>{const id='mock'+(n++);return {id,url:URL.createObjectURL(bl)}}}:null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
const id='SMW6D_21';
const r=await p.evaluate(async i=>{const cols=['#222','#8a4b22','#c9a46b'];for(let j=0;j<3;j++){const W=1672,H=941,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.fillStyle='#d9d9d9';x.fillRect(0,0,W,H);const pw=(W-24)/5;
 for(let k=0;k<5;k++){const ox=k*(pw+6);if(k){x.fillStyle='#fff';x.fillRect(ox-6,0,6,H)}x.fillStyle=cols[j];const bw=k==1?pw*.35:pw*.55;x.beginPath();x.roundRect(ox+pw/2-bw/2,H*.42,bw,40,10);x.fill()}
 const blob=await new Promise(r=>cv.toBlob(r,'image/png'));await upP5g(i,new File([blob],'b'+j+'.png',{type:'image/png'}),j?'add':'');await new Promise(r=>setTimeout(r,300))}
 paintAll();return {vars:p5gVars(i).length,slot:slotOf(i),st:avStat(i),dot:(document.querySelector('.card[data-id="'+i+'"] .avd')||{}).className}},id);console.log('upload',JSON.stringify(r));
await p.evaluate(async i=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());await openStudio(null,{belt:i})},id);await p.waitForTimeout(1500);
await p.evaluate(async()=>{SSEL='belt';paintSel();openDrawer('belt')});await p.waitForTimeout(800);
console.log('strip',await p.evaluate(()=>document.querySelectorAll('#ssel .gvs [data-gv]').length));
console.log('tiles',await p.evaluate(()=>[...document.querySelectorAll('#dgrid [data-gvp]')].map(t=>t.dataset.dpick+':'+t.dataset.gvp+':'+(t.querySelector('.vn')||{}).textContent).join(' | ')));
const srcs=[];for(let j=0;j<3;j++){await p.evaluate(async j=>{const t=document.querySelectorAll('#dgrid [data-gvp]')[j];if(!t)return;t.click()},j);await p.waitForTimeout(1200);
 srcs.push(await p.evaluate(()=>{const im=document.querySelector('#sstage img.sl[data-slot="belt"]');return im?im.src.slice(-12):'none'}));
 await p.evaluate(()=>{if(!document.querySelector('#dgrid [data-gvp]'))openDrawer('belt')});await p.waitForTimeout(500)}
console.log('layers',srcs.join(' , '));
await p.screenshot({path:S+'/tests/v77/bvar87_'+M+'.png'});
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
