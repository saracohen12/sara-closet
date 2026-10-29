const {chromium,devices}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['Pixel 7']});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(400);
 await (await p.$('.jwrow[data-jwrow="neck"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/neck5d.png']);await p.waitForTimeout(8000);
 await (await p.$('.jwrow[data-jwrow="ear"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/ear5.png']);await p.waitForTimeout(8000);
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);
 const st=()=>p.evaluate(()=>({jsel:ST.tf.jewelry.jsel,jps:ST.tf.jewelry.jps,w:ST.tf.jewelry.w,parts:[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+' w'+i.style.width+(i.classList.contains('sel')?'*':'')),sw:(document.getElementById('sw')||{}).value,lab:(document.querySelector('#ssel label')||{}).textContent,hidden:['#sr','#ssx','#ssy','#ssk'].map(q=>{const i=document.querySelector(q);return i?getComputedStyle(i.closest('label')).display:'-'}).join(',')}));
 // tap the right earring
 const e1=p.locator('#sstage img.jwp[data-part="ear1"]');const bb=await e1.boundingBox();await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(600);console.log('tap ear',JSON.stringify(await st()));
 await p.evaluate(()=>{const i=document.getElementById('sw');i.value=200;i.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(100);console.log('live',JSON.stringify((await st()).parts));await p.waitForTimeout(600);console.log('after',JSON.stringify(await st()));
 const n=p.locator('#sstage img.jwp[data-part="neck"]');const nb=await n.boundingBox();await p.touchscreen.tap(nb.x+nb.width/2,nb.y+nb.height*.8);await p.waitForTimeout(600);console.log('tap neck',JSON.stringify(await st()));
 await p.evaluate(()=>{const i=document.getElementById('sw');i.value=70;i.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(700);console.log('neck 70',JSON.stringify(await st()));
 await p.screenshot({path:S+'/tests/audit/t67_m.png'});
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
