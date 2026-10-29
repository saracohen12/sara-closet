const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 console.log('box',await p.evaluate(()=>!!document.querySelector('.jwbox')),'btns',await p.evaluate(()=>[...document.querySelectorAll('.jwbox .ib button')].map(b=>b.textContent.trim()).join(' | ')));
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(300);await p.locator('.jwbox [data-jwpk="brac"]').click();await p.waitForTimeout(300);
 await (await p.$('button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/jw3.jpg']);await p.waitForTimeout(5000);
 console.log('jw',JSON.stringify(await p.evaluate(id=>{const j=IT[id].jw||{};return {neck:!!j.neck,ear:!!j.ear,brac:!!j.brac,a:j.a,st:(document.querySelector('.jwbox .gst')||{}).textContent,figs:document.querySelectorAll('.jwbox .p5r figure').length}},id)));
 await p.evaluate(()=>document.querySelector('.jwbox').scrollIntoView({block:'center'}));await p.waitForTimeout(200);const r=await p.evaluate(()=>{const r=document.querySelector('.jwbox').getBoundingClientRect();return {x:Math.max(0,r.x-6),y:Math.max(0,r.y-6),width:r.width+12,height:r.height+12}});await p.screenshot({path:S+'/tests/audit/t46_box'+(PHONE?'_m':'')+'.png',clip:r});
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);
 const parts=()=>p.evaluate(()=>({view:ST.view,parts:[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+'@'+i.style.left+','+i.style.top+' w'+i.style.width+(/scaleX/.test(i.style.transform)?' mir':'')),flat:document.querySelectorAll('#sstage img.sl:not(.jwp)[data-slot="jewelry"]').length,base:ST.avbase}));
 console.log('front',JSON.stringify(await parts()));
 await p.evaluate(()=>{SSEL='jewelry';paintSel()});await p.waitForTimeout(200);console.log('sel',await p.evaluate(()=>[...document.querySelectorAll('#ssel .jwt button')].map(b=>b.textContent+':'+b.getAttribute('aria-pressed')).join(' ')));
 await p.locator('#ssel [data-jwt="ear"]').click();await p.waitForTimeout(500);console.log('no ear',JSON.stringify(await parts()));
 await p.locator('#ssel [data-jwt="ear"]').click();await p.waitForTimeout(500);
 await p.screenshot({path:S+'/tests/audit/t46_front'+(PHONE?'_m':'')+'.png'});
 for(const v of ['side','half','hip','back']){await p.evaluate(async v=>{ST.view=v;paintTop();await drawStudio()},v);await p.waitForTimeout(500);console.log(v,JSON.stringify(await parts()));if(v=='hip')await p.screenshot({path:S+'/tests/audit/t46_hip'+(PHONE?'_m':'')+'.png'})}
 // raw-photo warning
 await p.evaluate(async()=>{ST.view='front';const t=Object.keys(D).find(i=>D[i].cat=='sweaters');IT[t]=Object.assign(IT[t]||{},{img:'zzz'});ST.items.top=t;ST.tf.top={x:50,y:40,w:40};await drawStudio()});await p.waitForTimeout(800);console.log('rawnote',await p.evaluate(()=>(document.querySelector('#sstage .rawnote')||{}).textContent||'none'));
 console.log('avStat',await p.evaluate(id=>avStat(id),id));
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
