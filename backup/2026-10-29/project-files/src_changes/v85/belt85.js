// v85: belts get the 5-pose upload box; a synthetic GPT sheet is uploaded (mock assets) and the belt sits on the waist in all poses
const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};let n=0;window.__blobs={};window.claude={use:async k=>k=='assets'?{upload:async bl=>{const id='mock'+(n++);const u=URL.createObjectURL(bl);window.__blobs[id]=u;return {id,url:u}}}:null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
const SL=process.argv[4]||'belt';const id=await p.evaluate(SL=>Object.keys(D).find(k=>slotOf(k)==SL&&/אלסטית/.test(D[k].short||'')) || Object.keys(D).find(k=>slotOf(k)==SL),SL);console.log('belt',id,await p.evaluate(i=>D[i].short,id));
await p.evaluate(i=>openItem(i),id);await p.waitForTimeout(1500);
console.log('box', await p.evaluate(()=>{const b=document.querySelector('#dlg .p5gbox');return b?b.querySelector('summary').textContent.trim()+' | '+[...b.querySelectorAll('button')].map(x=>x.textContent.trim()).join(' / '):'none'}));
await p.evaluate(()=>{const b=document.querySelector('#dlg .p5gbox');if(b)b.scrollIntoView()});await p.screenshot({path:S+'/tests/v77/belt85_'+M+'_box.png'});
// synthetic sheet: 5 grey panels with white dividers, a dark belt band in each
const r=await p.evaluate(async i=>{const W=1672,H=941,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.fillStyle='#d9d9d9';x.fillRect(0,0,W,H);const pw=(W-4*6)/5;
 for(let k=0;k<5;k++){const ox=k*(pw+6);if(k)x.fillStyle='#fff',x.fillRect(ox-6,0,6,H);x.fillStyle='#222';const bw=k==1?pw*.35:pw*.55;x.beginPath();x.roundRect(ox+pw/2-bw/2,H*.42,bw,40,10);x.fill();x.fillStyle='#b08a4a';x.fillRect(ox+pw/2-18,H*.42-6,36,52)}
 const blob=await new Promise(r=>cv.toBlob(r,'image/png'));const f=new File([blob],'belt.png',{type:'image/png'});await upP5g(i,f,'');const g=(IT[i]||{}).p5g;return g?JSON.stringify(g.fit):'no p5g'},id);console.log('fit',r);
await p.evaluate(async i=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());await openStudio(null,{[slotOf(i)]:i})},id);await p.waitForTimeout(1200);
const shots=[];for(const v of ['front','side','back','half','hip']){await p.evaluate(async v=>{ST.view=v;await drawStudio()},v);await p.waitForTimeout(700);
 const info=await p.evaluate(SL=>{const im=document.querySelector('#sstage img.sl[data-slot="'+SL+'"]');if(!im)return 'no belt layer';const r=im.getBoundingClientRect(),st=document.querySelector('#sstage').getBoundingClientRect();return [Math.round(r.left-st.left),Math.round(r.top-st.top),Math.round(r.width),Math.round(r.height),Math.round(st.width),Math.round(st.height),im.naturalWidth].join(',')},SL);console.log(v,info);
 const st=await p.$('#sstage');await st.screenshot({path:S+'/tests/v77/'+SL+'85_'+v+'.png'})}
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
