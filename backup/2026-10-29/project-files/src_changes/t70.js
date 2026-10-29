const {chromium}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1220,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const r=await p.evaluate(async()=>{await openStudio(null,{});ST.avbase='short';await drawStudio();openDrawer('jewelry');await new Promise(r=>setTimeout(r,800));DRF.fam='ורוד';openDrawer('jewelry');await new Promise(r=>setTimeout(r,800));const j=document.querySelectorAll('#dgrid [data-dpick]').length;openDrawer('top');await new Promise(r=>setTimeout(r,1200));return {jewelryPink:j,fam:DRF.fam,tops:document.querySelectorAll('#dgrid [data-dpick]').length}});console.log('switch slot resets colour',JSON.stringify(r));
 const r2=await p.evaluate(async()=>{DRF.fam='ורוד';DRF.fav=true;openDrawer('top');await new Promise(r=>setTimeout(r,1200));return {tiles:document.querySelectorAll('#dgrid [data-dpick]').length,msg:(document.querySelector('#dgrid .dclr')||{}).textContent||'none'}});console.log('filtered empty',JSON.stringify(r2));
 await p.screenshot({path:S+'/tests/audit/t70_empty.png'});
 await p.locator('[data-dclear]').click();await p.waitForTimeout(1200);console.log('after clear',JSON.stringify(await p.evaluate(()=>({tiles:document.querySelectorAll('#dgrid [data-dpick]').length,fam:DRF.fam,fav:DRF.fav}))));
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
