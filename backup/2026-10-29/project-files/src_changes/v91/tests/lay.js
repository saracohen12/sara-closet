// layout screenshots of studio + home
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';const TAG=process.argv[4]||'pre';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v92/';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:720}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.screenshot({path:O+'home_'+TAG+'_'+M+'.png'});
await p.evaluate(async()=>{await openStudio();ST.avbase='p5';ST.view='front';await setItem('scarf','T162');await setItem('dress','S0Y74_0');SSEL='dress';paintSel()});await p.waitForTimeout(2000);
await p.screenshot({path:O+'studio_'+TAG+'_'+M+'.png'});
await p.screenshot({path:O+'studiofull_'+TAG+'_'+M+'.png',fullPage:true});
console.log(await p.evaluate(()=>['#sstage','#ssel','#sslots','.stbar','#spin'].map(s=>{const e=document.querySelector(s);if(!e)return s+':none';const r=e.getBoundingClientRect();return s+':'+[r.x,r.y,r.width,r.height].map(Math.round)}).join(' | ')));
console.log('ERR',errs);await b.close()})();
