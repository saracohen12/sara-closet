const {chromium}=require('playwright');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 // skirt on the old base: default 1.25 wider, sliders, export
 const sk=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='skirts'&&D[i].hi));
 const r=await p.evaluate(async id=>{await openStudio(null,{});ST.avbase='short';await drawStudio();await setItem('skirt',id);SSEL='skirt';paintSel();const el=document.querySelector('#sstage img.sl[data-slot="skirt"]');return {sx:ST.tf.skirt.sx,tr:el&&el.style.transform,sl:['ssx','ssy','ssk'].map(i=>!!document.getElementById(i)).join(',')}},sk);console.log('skirt',JSON.stringify(r));
 await p.evaluate(()=>{const i=document.getElementById('ssy');i.value=150;i.dispatchEvent(new Event('input',{bubbles:true}));const k=document.getElementById('ssk');k.value=15;k.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(300);
 console.log('after',JSON.stringify(await p.evaluate(()=>({sy:ST.tf.skirt.sy,k:ST.tf.skirt.k,tr:document.querySelector('#sstage img.sl[data-slot="skirt"]').style.transform}))));
 await p.evaluate(async()=>{await drawStudio()});await p.waitForTimeout(400);console.log('redraw',await p.evaluate(()=>document.querySelector('#sstage img.sl[data-slot="skirt"]').style.transform));
 const r2=await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}});await p.screenshot({path:S+'/tests/audit/t64_skirt.png',clip:r2});
 await p.locator('#ssel [data-sa="reset"]').click();await p.waitForTimeout(500);console.log('reset',JSON.stringify(await p.evaluate(()=>({sx:ST.tf.skirt.sx,sy:ST.tf.skirt.sy,k:ST.tf.skirt.k}))));
 // p5 base: no default widening
 const r3=await p.evaluate(async id=>{ST.avbase='p5';await drawStudio();await setItem('skirt',null);await setItem('skirt',id);return ST.tf.skirt.sx},sk);console.log('p5 sx',r3);
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
