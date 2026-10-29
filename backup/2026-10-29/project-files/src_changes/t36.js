const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const PHONE=process.argv[3]=='phone';const ID=process.argv[4]||'T5';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1600,height:870}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{let n=0;window.claude={use:async k=>k=='assets'?{upload:async blob=>({id:'fake'+(++n),url:URL.createObjectURL(blob),sizeBytes:blob.size})}:null};window.REJ=[];window.addEventListener('unhandledrejection',e=>REJ.push(String(e.reason&&e.reason.stack||e.reason).slice(0,200)))});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(id=>openItem(id),ID);await p.waitForTimeout(900);
 console.log('box',await p.evaluate(()=>{const g=document.querySelector('.p5gbox');if(!g)return 'none';return g.parentElement.className+' next:'+(g.nextElementSibling||{}).className}),'btn',await p.evaluate(()=>!!document.querySelector('button[data-upm="p5g"] input.ovf')));
 await (await p.$('button[data-upm="p5g"] input.ovf')).setInputFiles([S+'/tests/fx/skirt5.jpg']);
 let g=null;for(let i=0;i<80;i++){await p.waitForTimeout(500);g=await p.evaluate(id=>(IT[id]||{}).p5g||null,ID);if(g&&g.hip)break}
 console.log('p5g',g&&Object.keys(g.fit),JSON.stringify(g&&g.fit),'status',await p.evaluate(()=>(document.querySelector('.p5gbox .gst')||{}).textContent));
 console.log('figs',await p.evaluate(()=>document.querySelectorAll('.p5gbox .p5r figure').length));
 await p.evaluate(()=>document.querySelector('.p5gbox').scrollIntoView());await p.waitForTimeout(300);await p.screenshot({path:S+'/tests/audit/t36_box'+(PHONE?'_m':'')+'.png'});
 await p.evaluate(()=>document.getElementById('dlg').close());await p.evaluate(()=>document.getElementById('studiobtn').click());await p.waitForTimeout(1000);
 await p.evaluate(async id=>{await setItem('skirt',id)},ID);await p.waitForTimeout(1500);
 const tfv=async()=>p.evaluate(()=>JSON.stringify({x:ST.tf.skirt.x,y:ST.tf.skirt.y,w:ST.tf.skirt.w,pvv:ST.tf.skirt.pvv,pv:ST.tf.skirt.pv}));
 console.log('front tf',await tfv(),'src',await p.evaluate(()=>(document.querySelector('#sstage img.sl[data-slot="skirt"]')||{}).src?.slice(0,20)));
 const shots=[];const shot=async v=>{const r=await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}});const f=S+'/tests/audit/t36_'+v+'.png';await p.screenshot({path:f,clip:r});shots.push(f)};
 await shot('front');
 await p.evaluate(async()=>{ST.view='side';SSEL=null;paintTop();await drawStudio()});await p.waitForTimeout(900);
 console.log('side layers',await p.evaluate(()=>[...document.querySelectorAll('#sstage img[data-slot="skirt"]')].map(i=>i.className+':'+i.getAttribute('style').slice(0,45))),'tf',await tfv());await shot('side');
 // drag the real layer in side view
 const lb=await p.evaluate(()=>{const r=document.querySelector('#sstage img.sl[data-slot="skirt"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}});
 await p.mouse.move(lb.x,lb.y);await p.mouse.down();await p.mouse.move(lb.x+30,lb.y+10,{steps:5});await p.mouse.move(lb.x+60,lb.y+20,{steps:5});await p.mouse.up();await p.waitForTimeout(500);
 const afterDrag=await tfv();console.log('side after drag',afterDrag);
 await p.evaluate(async()=>{ST.view='front';SSEL=null;paintTop();await drawStudio()});await p.waitForTimeout(700);console.log('back to front',await tfv());
 await p.evaluate(async()=>{ST.view='side';SSEL=null;paintTop();await drawStudio()});await p.waitForTimeout(700);console.log('side again',await tfv());
 // reset to place in side view
 await p.evaluate(()=>{SSEL='skirt';paintSel()});await p.waitForTimeout(300);await p.evaluate(()=>{const b=[...document.querySelectorAll('#ssel button')].find(b=>/למקום/.test(b.textContent));b&&b.click()});await p.waitForTimeout(900);console.log('side reset',await tfv());
 for(const v of ['back','half','hip']){await p.evaluate(async v=>{ST.view=v;SSEL=null;paintTop();await drawStudio()},v);await p.waitForTimeout(900);console.log(v,await p.evaluate(()=>[...document.querySelectorAll('#sstage img[data-slot="skirt"]')].map(i=>i.className+':'+i.src.slice(0,20))),(await tfv()).slice(0,60));await shot(v)}
 await p.evaluate(async()=>{ST.view='front';paintTop();await drawStudio()});await p.waitForTimeout(500);
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(REJ)),await p.evaluate(()=>JSON.stringify(window.ERRS)));
 await b.close();
 const {execSync}=require('child_process');execSync(`python3 - <<'PY'\nfrom PIL import Image\nfs=${JSON.stringify(shots)}\nims=[Image.open(f) for f in fs]\nh=420;ims=[i.resize((int(i.size[0]*h/i.size[1]),h)) for i in ims]\nW=sum(i.size[0] for i in ims)+10*len(ims);sheet=Image.new('RGB',(W,h),'white');x=0\nfor i in ims: sheet.paste(i,(x,0));x+=i.size[0]+10\nsheet.save('${S}/tests/audit/t36_views.jpg',quality=85)\nPY`)})();
