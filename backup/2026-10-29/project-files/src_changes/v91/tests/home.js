const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:720}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(()=>{try{paintLotd(true)}catch(e){console.log(e)}});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const b=document.getElementById('lotd77');if(!b)return null;b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]});console.log('lotd',r);
await p.waitForTimeout(500);const el=await p.$('#lotd77');if(el)await el.screenshot({path:S+'/tests/v92/lotd_'+M+'.png'});console.log('ERR',errs);await b.close()})();
