const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:720}});const p=await c.newPage();
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async()=>{await openStudio();ST.avbase='p5';ST.view='front';await setItem('scarf','T162');await setItem('dress','S0Y74_0');SSEL='dress';paintSel()});await p.waitForTimeout(2000);
console.log(await p.evaluate(()=>{const out=[];const walk=(e,d)=>{if(d>6)return;const r=e.getBoundingClientRect();if(r.height<2)return;out.push(' '.repeat(d)+e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className=='string'?'.'+e.className.trim().split(/\s+/).join('.'):'')+' '+[r.x,r.y,r.width,r.height].map(Math.round));for(const k of e.children)walk(k,d+1)};walk(document.getElementById('studio')||document.querySelector('.studio'),0);return out.join('\n')}));
await b.close()})();
