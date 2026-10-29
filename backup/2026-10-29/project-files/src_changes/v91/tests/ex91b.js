// mirrored spin views with wig: which head/base, and drag direction in mirrored view
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v91/';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:900}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async()=>{await openStudio();ST.avbase='p5';ST.view='front';await setItem('dress','S0Y74_0');await setItem('scarf','T162')});await p.waitForTimeout(1200);
// switch to wig like Sara: click the head button
await p.evaluate(()=>document.querySelector('#shead').click());await p.waitForTimeout(1200);
console.log('head',await p.evaluate(()=>ST.head+' '+document.querySelector('#shead').textContent));
for(let i=1;i<6;i++){await p.evaluate(()=>document.querySelector('#spin [data-spin="1"]').click());await p.waitForTimeout(1300);
 console.log(i,await p.evaluate(()=>ST.view+' mir='+ST.mir+' head='+ST.head+' :: '+[...document.querySelectorAll('#sstage img')].map(i=>i.className+':'+(i.getAttribute('src')||'').replace(/\?v=\d+/,'').slice(-26)).join(' ')));
 await p.screenshot({path:O+'spin'+i+'_'+M+'.png'})}
console.log('ERR',errs);await b.close()})();
