const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));
 // 1) no cut yet: old base → no raw photo, note shown
 await p.evaluate(async id=>{IT[id]=Object.assign({},IT[id]||{},{img:'zzz',jw:null});await openStudio(null,{jewelry:id});ST.avbase='short';ST.view='front';await drawStudio()},id);await p.waitForTimeout(1000);
 console.log('nocut short',JSON.stringify(await p.evaluate(()=>({raw:document.querySelectorAll('#sstage img[data-slot="jewelry"]').length,note:(document.querySelector('#sstage .rawnote')||{}).textContent||'none'}))));
 // 2) upload the 5-view sheet, then old bases front/back + p5
 await p.evaluate(()=>{$('#studio').close&&$('#studio').close()});await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 await (await p.$('.jwrow[data-jwrow="neck"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/neck5c.png']);await p.waitForTimeout(7000);
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(400);await (await p.$('.jwrow[data-jwrow="ear"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/jw3.jpg']);await p.waitForTimeout(5000);
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);
 const parts=()=>p.evaluate(()=>({base:ST.avbase,view:ST.view,parts:[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+'@'+i.style.left+','+i.style.top+' w'+i.style.width),raw:document.querySelectorAll('#sstage img.sl:not(.jwp)[data-slot="jewelry"]').length,note:(document.querySelector('#sstage .rawnote')||{}).textContent||'none'}));
 for(const [base,v] of [['short','front'],['short','back'],['long','front'],['p5','front'],['p5','side']]){await p.evaluate(async([base,v])=>{ST.avbase=base;ST.view=v;paintTop();await drawStudio()},[base,v]);await p.waitForTimeout(700);console.log(base,v,JSON.stringify(await parts()));
  if(v=='front'){const r=await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height*.6}});await p.screenshot({path:S+'/tests/audit/t60_'+base+'.png',clip:r})}}
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
