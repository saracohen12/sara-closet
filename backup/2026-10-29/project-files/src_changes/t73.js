const {chromium}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1220,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const top=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='sweaters'&&D[i].hi)||Object.keys(D).find(i=>D[i].cat=='sweaters'));
 for(const base of ['short','p5']){const r=await p.evaluate(async([base,top])=>{await openStudio(null,{});ST.avbase=base;ST.view='front';await drawStudio();await setItem('top',top);SSEL='top';paintSel();const nkb=document.querySelector('#ssel [data-nk]');return {base,nkBtn:!!nkb,nkov:document.querySelectorAll('#sstage img.nkov').length,head:[...document.querySelectorAll('#sstage img.sh')].map(i=>i.getAttribute('src'))}},[base,top]);console.log(JSON.stringify(r));
  if(base=='p5'){await p.locator('#ssel [data-nk]').click();await p.waitForTimeout(700);console.log('toggled',JSON.stringify(await p.evaluate(()=>({nk:ST.tf.top.nk,nkov:[...document.querySelectorAll('#sstage img.nkov')].map(i=>i.getAttribute('src')+' z'+i.style.zIndex),pressed:document.querySelector('#ssel [data-nk]').getAttribute('aria-pressed')}))))}
  const rr=await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height*.45}});await p.screenshot({path:S+'/tests/audit/t73_'+base+'.png',clip:rr})}
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
