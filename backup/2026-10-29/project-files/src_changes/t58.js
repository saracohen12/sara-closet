const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 await (await p.$('button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/neck5b.png']);await p.waitForTimeout(7000);
 console.log('jw',JSON.stringify(await p.evaluate(id=>{const j=IT[id].jw||{};return {neck:!!j.neck,v:j.v&&Object.keys(j.v.neck),av:j.av&&j.av.neck,a:j.a,st:(document.querySelector('.jwbox .gst')||{}).textContent,cap:(document.querySelector('.jwbox figcaption')||{}).textContent}},id)));
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);
 const parts=()=>p.evaluate(()=>({view:ST.view,parts:[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+'@'+i.style.left+','+i.style.top+' w'+i.style.width+' '+(i.src.slice(-8)))}));
 for(const v of ['front','side','back','half','hip']){await p.evaluate(async v=>{ST.view=v;paintTop();await drawStudio()},v);await p.waitForTimeout(600);console.log(v,JSON.stringify(await parts()));
  const r=await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height*.42}});await p.screenshot({path:S+'/tests/audit/t58_'+v+'.png',clip:r})}
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
