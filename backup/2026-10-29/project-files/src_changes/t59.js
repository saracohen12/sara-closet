const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null};window.CP='';navigator.clipboard.writeText=async t=>{window.CP=t}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 const st=()=>p.evaluate(id=>{const j=(IT[id]||{}).jw||{};return {parts:JWPARTS.filter(([k])=>j[k]).map(([k])=>k),v:j.v&&Object.keys(j.v.neck||{}),rows:[...document.querySelectorAll('.jwbox .jwrow')].map(r=>r.dataset.jwrow+':'+r.querySelector('small').textContent+':'+[...r.querySelectorAll('button')].map(b=>b.textContent.trim()).join('/')).join(' | '),st:(document.querySelector('.jwbox .gst')||{}).textContent}},id);
 console.log('start',JSON.stringify(await st()));
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(400);console.log('rows',JSON.stringify((await st()).rows));
 await (await p.$('.jwrow[data-jwrow="neck"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/neck5b.png']);await p.waitForTimeout(7000);console.log('neck up',JSON.stringify(await st()));
 await (await p.$('.jwrow[data-jwrow="ear"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/jw3.jpg']);await p.waitForTimeout(5000);console.log('ear up',JSON.stringify(await st()));
 await p.locator('.jwrow[data-jwrow="ear"] [data-jwcopy]').click();await p.waitForTimeout(200);console.log('prompt ear',(await p.evaluate(()=>window.CP)).slice(0,90).replace(/\n/g,' / '));
 await p.locator('.jwrow[data-jwrow="neck"] [data-jwcopy]').click();await p.waitForTimeout(200);console.log('prompt neck',(await p.evaluate(()=>window.CP)).slice(0,120).replace(/\n/g,' / '));
 await p.evaluate(()=>document.querySelector('.jwbox').scrollIntoView({block:'center'}));await p.waitForTimeout(200);const r=await p.evaluate(()=>{const r=document.querySelector('.jwbox').getBoundingClientRect();return {x:Math.max(0,r.x-6),y:Math.max(0,r.y-6),width:r.width+12,height:r.height+12}});await p.screenshot({path:S+'/tests/audit/t59_box'+(PHONE?'_m':'')+'.png',clip:r});
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);
 const parts=()=>p.evaluate(()=>({view:ST.view,parts:[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+'@'+i.style.left+','+i.style.top+' w'+i.style.width)}));
 for(const v of ['front','side','back','half','hip']){await p.evaluate(async v=>{ST.view=v;paintTop();await drawStudio()},v);await p.waitForTimeout(500);console.log(v,JSON.stringify(await parts()))}
 await p.evaluate(()=>{$('#studio').close&&$('#studio').close()});await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 await p.locator('.jwrow[data-jwrow="ear"] [data-jwdel]').click();await p.waitForTimeout(600);console.log('del ear',JSON.stringify(await st()));
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
