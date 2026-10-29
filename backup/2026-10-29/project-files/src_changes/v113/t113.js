const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v92/t113_';const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};const A={upload:async bl=>{const id=[...crypto.getRandomValues(new Uint8Array(16))].map(x=>x.toString(16).padStart(2,'0')).join('');return {id,url:URL.createObjectURL(bl)}}};window.claude={use:async k=>k=='assets'?A:null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
const id=await p.evaluate(()=>Object.keys(D).find(i=>curCat(i)=='skirts'&&!(IT[i]||{}).p5g));log('item',id);
await p.evaluate(id=>{openItem?openItem(id):null},id).catch(()=>{});
await p.evaluate(id=>window.open99(id),id);await p.waitForTimeout(400);
await p.setInputFiles('#two99f',[S+'/tests/v92/s110_1.png',S+'/tests/v92/s110_2.png']);await p.waitForTimeout(6000);
log('cuts',await p.evaluate(()=>[...document.querySelectorAll('#two99 .t99c figure')].map(f=>!!f.querySelector('img'))));
await p.screenshot({path:O+M+'_dlg.png'});
log('fits',await p.evaluate(()=>{const c=TW99.cuts;const o={};for(const v in c){const q=c[v];o[v]=q&&{px:q.px,py:q.py,w:q.w,h:q.h,sc:q.sc,ox:q.ox,oy:q.oy,pw:q.pw,ph:q.ph}}return o}).catch(e=>'n/a '+e));
await p.evaluate(()=>document.querySelector('[data-t99save]').click());await p.waitForTimeout(3000);
log('g',await p.evaluate(id=>{const g=(IT[id]||{}).p5g;return g&&{av:g.av,two:g.two,fit:g.fit}},id));
await p.evaluate(async id=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());await openStudio();ST.avbase='p5';ST.head='cap';await setItem('skirt',id);await drawStudio()},id);await p.waitForTimeout(1500);
log('studio',await p.evaluate(async()=>{const o={};for(const v of ['side','half','hip','back','front']){ST.view=v;paintTop();await drawStudio();await new Promise(r=>setTimeout(r,400));const i=document.querySelector('#sstage img.sl[data-slot="skirt"]');o[v]=i&&i.getAttribute('style').slice(0,40)}return o}));await p.evaluate(()=>window.p5ShowAll());await p.waitForTimeout(3500);await p.screenshot({path:S+'/tests/v92/t113_'+M+'_all.png'});
log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[]).slice(0,600)));await b.close()})();
