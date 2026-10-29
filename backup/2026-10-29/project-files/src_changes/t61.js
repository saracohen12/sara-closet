const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const id=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(800);
 await (await p.$('.jwrow[data-jwrow="neck"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/neck5c.png']);await p.waitForTimeout(7000);
 await p.locator('.jwbox [data-jwpk="ear"]').click();await p.waitForTimeout(400);await (await p.$('.jwrow[data-jwrow="ear"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/jw3.jpg']);await p.waitForTimeout(5000);
 await p.locator('[data-jwtry]').click();await p.waitForTimeout(1200);
 const parts=()=>p.evaluate(()=>({base:ST.avbase,view:ST.view,jo:JSON.stringify((ST.tf.jewelry||{}).jo||null),parts:[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+'@'+i.style.left+','+i.style.top+' w'+i.style.width)}));
 for(const base of ['p5','short']){await p.evaluate(async base=>{ST.avbase=base;ST.view='front';paintTop();await drawStudio()},base);await p.waitForTimeout(700);console.log(base,'before',JSON.stringify(await parts()));
  const n=p.locator('#sstage img.jwp[data-part="neck"]');const bb=await n.boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.mouse.move(bb.x+bb.width/2+20,bb.y+bb.height/2+30,{steps:5});await p.mouse.move(bb.x+bb.width/2+40,bb.y+bb.height/2+60,{steps:5});await p.mouse.up();await p.waitForTimeout(700);
  console.log(base,'after drag',JSON.stringify(await parts()),'sel',await p.evaluate(()=>SSEL),'strip',await p.evaluate(()=>!!document.querySelector('#ssel .jwt')));
  const e1=p.locator('#sstage img.jwp[data-part="ear1"]');const eb=await e1.boundingBox();await p.mouse.move(eb.x+eb.width/2,eb.y+eb.height/2);await p.mouse.down();await p.mouse.move(eb.x+eb.width/2-30,eb.y+eb.height/2+10,{steps:6});await p.mouse.up();await p.waitForTimeout(700);
  console.log(base,'after ear drag',JSON.stringify(await parts()));
  await p.evaluate(async()=>{ST.view='back';paintTop();await drawStudio();ST.view='front';paintTop();await drawStudio()});await p.waitForTimeout(600);console.log(base,'persist',JSON.stringify((await parts()).parts));
  await p.evaluate(()=>{SSEL='jewelry';paintSel()});await p.locator('#ssel [data-sa="reset"]').click();await p.waitForTimeout(700);console.log(base,'reset',JSON.stringify(await parts()));}
 await p.screenshot({path:S+'/tests/audit/t61'+(PHONE?'_m':'')+'.png'});
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
