const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];
const ITEMS={};for(const f of fs.readdirSync(S+'/dbq3/items')){const d=JSON.parse(fs.readFileSync(S+'/dbq3/items/'+f,'utf8'));delete d.version;ITEMS[f.replace('.json','')]=d.data||d}
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['Pixel 7'],hasTouch:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(I=>{Object.assign(IT,I);paintAll()},ITEMS);await p.waitForTimeout(800);
const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
await p.evaluate(async()=>{await openStudio(null,{top:'T147'})});await p.waitForTimeout(2500);
for(const v of ['side','back','hip','front']){
 await p.evaluate(v=>{const n={side:'צד',back:'גב',hip:'מותן',front:'חזית',half:'חצי'}[v];const b=[...document.querySelectorAll('#studio [data-sview]')].find(x=>x.dataset.sview==v)||[...document.querySelectorAll('#studio button')].find(x=>x.textContent.trim().startsWith(n));b&&b.click()},v);await p.waitForTimeout(1500);
 await p.evaluate(()=>{SSEL='top';paintSel()});await p.waitForTimeout(300);
 log(v,'before',await p.evaluate(()=>[ST.view,SSEL,!!ST.items.top,!!(ST.tf.top||{}).lock,!!document.querySelector('#sstage img.sl[data-slot="top"]'),!!document.querySelector('[data-sz84]'),[...document.querySelectorAll('#studio [data-sview]')].map(b=>b.dataset.sview+':'+b.textContent.trim()).join(',')]));
 const r=await p.evaluate(()=>{const e=document.querySelector('#sstage img.sl[data-slot="top"]');const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,w:ST.tf.top.w,z:stageZ(),view:ST.view,bw:Math.round(r.width)}});
 log('hit',await p.evaluate(r=>[-60,60].map(d=>{const h=document.elementFromPoint(r.x+d,r.y);return h&&(h.tagName+'#'+h.id+'.'+h.className+' in stage:'+!!h.closest('#sstage'))}),r));
 await p.evaluate(()=>{window.__pe=[];['pointerdown','pointermove'].forEach(t=>window.addEventListener(t,e=>{if(window.__pe.length<12)window.__pe.push(t+':'+e.pointerId+':'+e.pointerType+':'+(e.target.id||e.target.className))},true))});
 const cdp=await c.newCDPSession(p);const T=(type,pts)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:pts});
 // fingers 60px each side of the garment centre horizontally – in side view that is outside the narrow garment
 let a={x:r.x-60,y:r.y,id:1},b2={x:r.x+60,y:r.y,id:2};await T('touchStart',[a]);await T('touchStart',[a,b2]);
 for(let k=1;k<=6;k++){a={...a,x:r.x-60-k*8};b2={...b2,x:r.x+60+k*8};await T('touchMove',[a,b2]);await p.waitForTimeout(30)}
 await T('touchEnd',[]);await p.waitForTimeout(600);
 log('pe',await p.evaluate(()=>window.__pe));
 log(v,'garment width',r.bw,'w',r.w,'→',await p.evaluate(()=>[ST.tf.top.w,stageZ(),ST.view]));
 await p.evaluate(()=>document.querySelector('[data-sz84="1"]')?.click());await p.waitForTimeout(300);log(v,'➕',await p.evaluate(()=>ST.tf.top.w));}
await p.screenshot({path:S+'/tests/v77/pinch84.png'});
log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
