const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:720}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null};window.__open=[];window.open=(u)=>{window.__open.push(u);return {}}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(async()=>{await openStudio();ST.avbase='p5';await drawStudio();openBg93()});await p.waitForTimeout(500);
await p.evaluate(()=>document.querySelector('#bg93 [data-b93gpt]').click());await p.waitForTimeout(200);console.log('empty msg',await p.evaluate(()=>document.getElementById('b93msg').textContent));
await p.fill('#b93t','מגדל האייפל בשקיעה');await p.evaluate(()=>document.querySelector('#bg93 [data-b93gpt]').click());await p.waitForTimeout(400);
console.log('opened',await p.evaluate(()=>window.__open.map(u=>decodeURIComponent(u).slice(0,90))),await p.evaluate(()=>document.getElementById('b93msg').textContent));
await p.screenshot({path:S+'/tests/v92/gpt94_'+M+'.png'});
await p.evaluate(()=>{document.getElementById('bg93').close();openPrompts80&&openPrompts80()});await p.waitForTimeout(1200);
console.log('pr80 btn',await p.evaluate(()=>!!document.querySelector('#pr80 [data-p93g]')));await p.evaluate(()=>document.querySelector('#pr80 [data-p93g]')?.click());await p.waitForTimeout(300);
console.log('opened2',await p.evaluate(()=>window.__open.slice(1)));
// SET mutability after a frozen snapshot-like object
console.log('ver',await p.evaluate(()=>window.VER),'ERR',errs);await b.close()})();
