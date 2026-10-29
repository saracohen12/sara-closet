// phone: buttons whose text spills out of the button (squeezed), on every screen
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];
const ITEMS={};for(const f of fs.readdirSync(S+'/dbq3/items')){const d=JSON.parse(fs.readFileSync(S+'/dbq3/items/'+f,'utf8'));delete d.version;ITEMS[f.replace('.json','')]=d.data||d}
const SCREENS=[['home','0'],['filter',`document.querySelector('#fb').click()`],['more',`document.querySelector('[data-h9=more]').click()`],['item',`openItem('T147')`],['item2',`openItem('S15Y6_3')`],['alerts',`openAlerts()`],
 ...['looks','album','week','insights','money','check','home','tips','kids'].map(t=>['hub:'+t,`openHub('${t}')`]),['studio',`openStudio(null,{top:'T147'})`],
 ['smenu',`(async()=>{await openStudio(null,{top:'T147'});const b=[...document.querySelectorAll('#studio button')].find(x=>/עוד/.test(x.textContent)&&x.offsetParent);b&&b.click()})()`],
 ['drawer',`(async()=>{await openStudio(null,{top:'T147'});openDrawer('skirt')})()`],['avbase',`(async()=>{await openStudio(null,{top:'T147'});const b=document.querySelector('[data-avb]');b&&b.click()})()`],
 ['miss',`openMiss77()`],['prompts',`openPrompts80()`],['qa',`openQA83()`],['bu',`openBU83()`],['p5all',`(async()=>{await openStudio(null,{top:'T147'});document.querySelector('#sall')?.click()})()`],['preview',`p5gPreview('T147')`]];
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['Pixel 7'],hasTouch:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(I=>{Object.assign(IT,I);paintAll()},ITEMS);await p.waitForTimeout(1200);
for(const [n,js] of SCREENS){await p.evaluate(()=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());const pn=document.querySelector('#panel');if(pn&&!pn.classList.contains('hide'))document.querySelector('#fb').click();scrollTo(0,0)});await p.waitForTimeout(250);
 const e0=await p.evaluate(js).then(()=>'').catch(e=>e.message.slice(0,80));await p.waitForTimeout(1800);
 const r=await p.evaluate(()=>{const ds=[...document.querySelectorAll('dialog[open]')];const top=ds.length?ds[ds.length-1]:document.querySelector('#panel:not(.hide)')||document.body;const out=[];
  top.querySelectorAll('button,a,label,summary').forEach(e=>{if(!e.getClientRects().length)return;if(!ds.length&&e.closest('dialog'))return;const r=e.getBoundingClientRect();if(r.height<4)return;
   // content taller/wider than the box and not clipped = spills over neighbours
   const cs=getComputedStyle(e);if(cs.overflow!='visible')return;let maxB=r.bottom,maxR=r.right,minL=r.left;e.querySelectorAll('*').forEach(k=>{const q=k.getBoundingClientRect();if(q.height&&q.width){maxB=Math.max(maxB,q.bottom);maxR=Math.max(maxR,q.right);minL=Math.min(minL,q.left)}});
   if(maxB>r.bottom+4||maxR>r.right+6||minL<r.left-6)out.push((e.textContent||'').trim().replace(/\s+/g,' ').slice(0,30)+` [${Math.round(r.height)}→+${Math.round(maxB-r.bottom)}]`)});
  const dlg=ds[ds.length-1];const box=dlg?dlg.getBoundingClientRect():null;return {n:out.length,list:out.slice(0,14),open:ds.map(d=>d.id),box:box&&[Math.round(box.top),Math.round(box.bottom),Math.round(box.left),Math.round(box.right)]}});
 console.log('==',n,e0,JSON.stringify(r))}
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
