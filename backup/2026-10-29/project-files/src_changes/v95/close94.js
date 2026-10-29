const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=Object.freeze(d)}
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1920,height:1300}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').slice(0,300)));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
const id=await p.evaluate(()=>Object.keys(D).find(k=>/קפוצ/.test(D[k].short||D[k].name||''))||'T1');console.log('id',id);
await p.evaluate(id=>{document.querySelector(`.card[data-id="${id}"]`)?.click()},id);await p.waitForTimeout(1200);
console.log('dlg open',await p.evaluate(()=>document.getElementById('dlg')?.open));
const x=await p.evaluate(()=>{const d=document.getElementById('dlg');const bs=[...d.querySelectorAll('button')].filter(b=>/✕|×/.test(b.textContent)||b.getAttribute('aria-label')=='סגירה');return bs.map(b=>{const r=b.getBoundingClientRect();return {cls:b.className,id:b.id,x:r.x+r.width/2,y:r.y+r.height/2,w:r.width}})});console.log('x btns',x);
const vx=x.find(q=>q.w>0);if(vx){await p.mouse.click(vx.x,vx.y);await p.waitForTimeout(800)}
console.log('after X open',await p.evaluate(()=>document.getElementById('dlg')?.open),'ERRS',await p.evaluate(()=>JSON.stringify(window.ERRS)));
console.log('pageerr',errs.slice(0,5));await p.screenshot({path:S+'/tests/v92/close94_'+M+'.png'});await b.close()})();
