const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 const st=()=>p.evaluate(id=>({parts:(IT[id]||{}).jwp,chips:[...document.querySelectorAll('.jwbox [data-jwpk]')].map(b=>b.textContent+':'+b.getAttribute('aria-pressed')).join(' '),up:(document.querySelector('.jwbox [data-upm="jw"]')||{}).textContent}),id);
 console.log('default',JSON.stringify(await st()));
 // necklace only + her 5-view sheet → first panel
 await (await p.$('button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/neck5.png']);await p.waitForTimeout(5000);
 console.log('neck5',JSON.stringify(await p.evaluate(id=>{const j=IT[id].jw||{};return {neck:!!j.neck,ear:!!j.ear,brac:!!j.brac,a:j.a,st:(document.querySelector('.jwbox .gst')||{}).textContent}},id)));
 const u=await p.evaluate(id=>IT[id].jw.u.neck,id);const dims=await p.evaluate(async u=>{const im=new Image();im.src=u;await im.decode();return [im.naturalWidth,im.naturalHeight]},u);console.log('neck cut dims',dims);
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(500);await p.locator('.jwbox [data-jwpk="brac"]').click();await p.waitForTimeout(500);console.log('3 parts',JSON.stringify(await st()));
 await p.evaluate(()=>{window.CP='';window.copyTxt=t=>{window.CP=t;return Promise.resolve()}});await p.locator('[data-jwcopy]').click();await p.waitForTimeout(200);console.log('prompt3',(await p.evaluate(()=>window.CP)).slice(0,140).replace(/\n/g,' / '));
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(400);await p.locator('.jwbox [data-jwpk="brac"]').click();await p.waitForTimeout(400);await p.locator('[data-jwcopy]').click();await p.waitForTimeout(200);console.log('prompt1',(await p.evaluate(()=>window.CP)).slice(0,160).replace(/\n/g,' / '));
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);console.log('studio',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+' w'+i.style.width))));
 await p.screenshot({path:S+'/tests/audit/t55'+(PHONE?'_m':'')+'.png'});console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
