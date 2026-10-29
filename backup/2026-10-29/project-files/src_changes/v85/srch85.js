const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
if(M=='phone'){await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()=='חיפוש'&&x.offsetParent);b.click()})}else{await p.click('#q')}
await p.waitForTimeout(900);await p.keyboard.type(process.argv[4]||'פרומט');await p.waitForTimeout(900);
console.log(await p.evaluate(()=>{const s=document.querySelector('.sx85'),q=document.querySelector('#q');const r=s.getBoundingClientRect(),rq=q.getBoundingClientRect();return JSON.stringify({sx:[Math.round(r.top),Math.round(r.bottom),s.hidden],q:[Math.round(rq.top),Math.round(rq.bottom)],vh:innerHeight,cards:document.querySelectorAll('.card:not([hidden])').length})}));
await p.screenshot({path:S+'/tests/v77/srch85_'+M+'.png'});console.log('ERR',errs);await b.close()})();
