const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(id=>openItem(id),'S17QJ_6');await p.waitForTimeout(200);
 const st=async()=>p.evaluate(()=>({open:ZD.open,src:(ZI.getAttribute('src')||'').slice(0,40),nat:ZI.naturalWidth}));
 const rect=async q=>p.evaluate(q=>{const e=document.querySelector(q);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]},q);
 // 1) zoom button right after open (thumbnail may not be loaded yet)
 await p.locator('#dlbody .zbtn').click();await p.waitForTimeout(300);console.log('zbtn early',JSON.stringify(await st()));
 console.log('zb',await rect('#zoomd .zb'),'zx2',await rect('#zoomd .zx2'),'zzx',await rect('#zoomd [data-zz=x]'));
 await p.locator('#zoomd .zx2').click();await p.waitForTimeout(300);console.log('after zx2 click',JSON.stringify(await st()));
 if(await p.evaluate(()=>ZD.open)){await p.locator('#zoomd [data-zz=x]').click({force:true});await p.waitForTimeout(300);console.log('after data-zz x',JSON.stringify(await st()))}
 if(await p.evaluate(()=>ZD.open)){await p.keyboard.press('Escape');await p.waitForTimeout(300);console.log('after Esc',JSON.stringify(await st()))}
 // 2) after thumbnails loaded, zoom via the main image
 await p.waitForTimeout(1500);await p.locator('#dlbody img.main').click();await p.waitForTimeout(600);console.log('main late',JSON.stringify(await st()));
 await p.locator('#zoomd .zx2').click();await p.waitForTimeout(300);console.log('after zx2 click',JSON.stringify(await st()));
 if(await p.evaluate(()=>ZD.open)){await p.evaluate(()=>ZD.close())}
 // 3) zbtn late
 await p.locator('#dlbody .zbtn').click();await p.waitForTimeout(400);console.log('zbtn late',JSON.stringify(await st()));
 await p.screenshot({path:S+'/tests/audit/t37_zoom'+(PHONE?'_m':'')+'.png'});
 await p.locator('#zoomd [data-zz=x]').click({force:true});await p.waitForTimeout(300);console.log('after zz x',JSON.stringify(await st()));
 // 4) info details
 console.log('dinfo',await p.evaluate(()=>{const d=document.querySelector('#dlbody .dinfo');if(!d)return null;const det=d.querySelector('details.dinfo-more');return {det:!!det,open:det&&det.open,sum:det&&det.querySelector('summary').textContent,tableVisible:(()=>{const t=d.querySelector('table');return t&&t.getBoundingClientRect().height>0})(),h:Math.round(d.getBoundingClientRect().height)}}));
 await p.screenshot({path:S+'/tests/audit/t37_dlg'+(PHONE?'_m':'')+'.png'});
 const det=p.locator('#dlbody .dinfo details.dinfo-more summary');if(await det.count()){await det.click();await p.waitForTimeout(300);console.log('after open',await p.evaluate(()=>{const t=document.querySelector('#dlbody .dinfo table');return t&&Math.round(t.getBoundingClientRect().height)}));await p.screenshot({path:S+'/tests/audit/t37_dlg_open'+(PHONE?'_m':'')+'.png'})}
 console.log('ERR',JSON.stringify(errs),'ERRS',await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
