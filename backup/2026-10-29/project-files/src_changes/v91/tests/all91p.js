// "כל התנוחות" with S0Y74_0: every pose has the dress; side face not doubled
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';const HEAD=process.argv[4]||'wig';const PRE=process.argv[5]||'';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v91/';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:900}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async h=>{await openStudio();ST.avbase='p5';ST.view='front';ST.head=h;await setItem('dress','S0Y74_0');},HEAD);await p.waitForTimeout(1500);
if(PRE=='mir'){for(let i=0;i<4;i++){await p.evaluate(()=>document.querySelector('#spin [data-spin="1"]').click());await p.waitForTimeout(1200)}console.log('state',await p.evaluate(()=>ST.view+' mir='+ST.mir))}else if(PRE)for(const v of PRE.split(',')){await p.evaluate(v=>document.querySelector('[data-sview="'+v+'"]').click(),v);await p.waitForTimeout(1000)}
await p.evaluate(()=>{SSEL='dress';paintSel()});await p.waitForTimeout(500);console.log('lpic',await p.evaluate(()=>{const b=document.querySelector('[data-lpic]:not([data-lpic="main"])');if(b)b.click();return b&&b.dataset.lpic}));await p.waitForTimeout(1500);console.log('pic',await p.evaluate(()=>ST.tf.dress.pic));await p.evaluate(()=>p5ShowAll());await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>[...document.querySelectorAll('#p5all .p5f')].map(f=>f.dataset.pose+': '+[...f.querySelectorAll('img')].map(i=>i.className+(i.dataset.slot?'['+i.dataset.slot+']':'')+':'+(i.getAttribute('src')||'').replace(/\?v=\d+/,'').slice(-24)+(i.naturalWidth?'':'(X)')).join(' ')).join('\n')));
await p.screenshot({path:O+'allp_'+M+(PRE?'_pre':'')+'.png'});
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
