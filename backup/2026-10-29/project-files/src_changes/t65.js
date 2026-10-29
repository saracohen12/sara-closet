const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(400);
 await (await p.$('.jwrow[data-jwrow="neck"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/neck5d.png']);await p.waitForTimeout(8000);
 await (await p.$('.jwrow[data-jwrow="ear"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/ear5.png']);await p.waitForTimeout(8000);
 console.log('jw',JSON.stringify(await p.evaluate(id=>{const j=IT[id].jw||{};return {a:j.a,av:j.av,rows:[...document.querySelectorAll('.jwbox .jwrow')].map(r=>r.dataset.jwrow+':'+r.querySelector('small').textContent+' figs='+r.querySelectorAll('.jwv figure img').length).join(' | ')}},id)));
 await p.evaluate(()=>document.querySelector('.jwbox').scrollIntoView({block:'center'}));await p.waitForTimeout(300);const r=await p.evaluate(()=>{const r=document.querySelector('.jwbox').getBoundingClientRect();return {x:Math.max(0,r.x-6),y:Math.max(0,r.y-6),width:r.width+12,height:r.height+12}});await p.screenshot({path:S+'/tests/audit/t65_box'+(PHONE?'_m':'')+'.png',clip:r});
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);
 for(const v of ['front','side','back','half','hip']){await p.evaluate(async v=>{ST.view=v;paintTop();await drawStudio()},v);await p.waitForTimeout(600);console.log(v,JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+'@'+i.style.left+','+i.style.top+' w'+i.style.width))));
  const rr=await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height*.4}});await p.screenshot({path:S+'/tests/audit/t65_'+v+'.png',clip:rr})}
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
