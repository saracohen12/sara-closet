const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const PHONE=process.argv[3]=='phone';const ID='S11QS_6';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1600,height:870}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{let n=0;window.claude={use:async k=>k=='assets'?{upload:async blob=>({id:'fake'+(++n),url:URL.createObjectURL(blob),sizeBytes:blob.size})}:null};window.REJ=[];window.addEventListener('unhandledrejection',e=>REJ.push(String(e.reason&&e.reason.stack||e.reason).slice(0,200)))});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(id=>openItem(id),ID);await p.waitForTimeout(900);
 console.log('tiesbox',await p.evaluate(()=>!!document.querySelector('.tiesbox')),'multi',await p.evaluate(()=>[...document.querySelectorAll('button[data-upm^="tie"] input.ovf')].map(i=>i.dataset+''+i.multiple)));
 await p.evaluate(()=>{document.querySelector('.tiename').value='סגנון'});
 // 1) five styles in one wide picture + one single picture, in one go
 const inp=await p.$('button[data-upm="tie"] input.ovf');await inp.setInputFiles([S+'/tests/fx/styles5.jpg',S+'/tests/fx/single_front.jpg']);
 let ties=null;for(let i=0;i<80;i++){await p.waitForTimeout(500);ties=await p.evaluate(id=>(IT[id]||{}).ties||null,ID);if(ties&&ties.length>=6)break}
 console.log('ties',ties&&ties.length,JSON.stringify(ties&&ties.map(t=>({n:t.n,one:t.one,fit:t.fit.front}))));console.log('status',await p.evaluate(()=>(document.querySelector('.tiesbox .tst')||{}).textContent));
 console.log('figures',await p.evaluate(()=>document.querySelectorAll('.tiel figure').length),'try btns',await p.evaluate(()=>document.querySelectorAll('.tiel [data-tietry]').length),'name cleared',await p.evaluate(()=>document.querySelector('.tiename').value===''));
 // save cut of style 1 and 6 for a look
 for(const i of [0,5]){if(!ties||!ties[i])continue;const b64=await p.evaluate(async u=>{const r=await fetch(u);const bl=await r.blob();return await new Promise(ok=>{const fr=new FileReader();fr.onload=()=>ok(fr.result.split(',')[1]);fr.readAsDataURL(bl)})},ties[i].u.front);fs.writeFileSync(S+'/tests/fx/out_style'+(i+1)+'.png',Buffer.from(b64,'base64'))}
 // 2) dark fabric: flood must not eat it; 3) white background
 await p.evaluate(()=>{document.querySelector('.tiename').value='כהה'});await (await p.$('button[data-upm="tie"] input.ovf')).setInputFiles([S+'/tests/fx/single_dark.jpg']);
 for(let i=0;i<60;i++){await p.waitForTimeout(500);ties=await p.evaluate(id=>(IT[id]||{}).ties||null,ID);if(ties&&ties.length>=7)break}
 console.log('dark',ties&&ties.length,JSON.stringify(ties&&ties[6]&&{n:ties[6].n,fit:ties[6].fit.front}),await p.evaluate(()=>(document.querySelector('.tiesbox .tst')||{}).textContent));
 if(ties&&ties[6]){const b64=await p.evaluate(async u=>{const r=await fetch(u);const bl=await r.blob();return await new Promise(ok=>{const fr=new FileReader();fr.onload=()=>ok(fr.result.split(',')[1]);fr.readAsDataURL(bl)})},ties[6].u.front);fs.writeFileSync(S+'/tests/fx/out_dark.png',Buffer.from(b64,'base64'))}
 await p.evaluate(()=>{document.querySelector('.tiename').value='לבן'});await (await p.$('button[data-upm="tie"] input.ovf')).setInputFiles([S+'/tests/fx/single_white.jpg']);await p.waitForTimeout(4000);
 ties=await p.evaluate(id=>(IT[id]||{}).ties||null,ID);console.log('white',ties&&ties.length,await p.evaluate(()=>(document.querySelector('.tiesbox .tst')||{}).textContent));
 if(ties&&ties[7]){const b64=await p.evaluate(async u=>{const r=await fetch(u);const bl=await r.blob();return await new Promise(ok=>{const fr=new FileReader();fr.onload=()=>ok(fr.result.split(',')[1]);fr.readAsDataURL(bl)})},ties[7].u.front);fs.writeFileSync(S+'/tests/fx/out_white.png',Buffer.from(b64,'base64'))}
 // 4) 4-view sheet via the extra button
 await p.evaluate(()=>{document.querySelector('.tieadv').open=true;document.querySelector('.tiename').value='קשר מאחור'});await (await p.$('button[data-upm="tie4"] input.ovf')).setInputFiles([S+'/tichel/in/sheet.jpg']);
 const n0=ties?ties.length:0;for(let i=0;i<80;i++){await p.waitForTimeout(500);ties=await p.evaluate(id=>(IT[id]||{}).ties||null,ID);if(ties&&ties.length>n0)break}
 console.log('tie4',ties&&ties.length,JSON.stringify(ties&&ties[ties.length-1]&&{n:ties[ties.length-1].n,keys:Object.keys(ties[ties.length-1].u)}),await p.evaluate(()=>(document.querySelector('.tiesbox .tst')||{}).textContent));
 await p.screenshot({path:S+'/tests/audit/t34_dialog'+(PHONE?'_m':'')+'.png',fullPage:false});
 await p.evaluate(()=>{const d=document.querySelector('.tiesbox');d.scrollIntoView()});await p.waitForTimeout(300);await p.screenshot({path:S+'/tests/audit/t34_tiesbox'+(PHONE?'_m':'')+'.png'});
 // 5) try-on button of style 3 opens the studio with that tie
 await p.evaluate(()=>document.querySelectorAll('.tiel [data-tietry]')[2].click());await p.waitForTimeout(2500);
 console.log('studio open',await p.evaluate(()=>document.getElementById('studio').open),'items',await p.evaluate(()=>JSON.stringify(ST&&ST.items)),'tie',await p.evaluate(()=>ST&&ST.tf.scarf&&ST.tf.scarf.tie),'expected',ties[2].id);
 console.log('scarf src',await p.evaluate(()=>(document.querySelector('#sstage img.sl[data-slot="scarf"]')||{}).src?.slice(0,30)),'base',await p.evaluate(()=>(document.querySelector('#sstage img.base,#sstage img[src*="av/p5"]')||{}).src?.split('/').pop()));
 const r=await p.evaluate(()=>{const r=document.querySelector('#sstage').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}});await p.screenshot({path:S+'/tests/audit/t34_studio'+(PHONE?'_m':'')+'.png',clip:r});
 // strip of ties under the figure
 await p.evaluate(()=>{SSEL='scarf';paintSel()});await p.waitForTimeout(400);
 console.log('strip',await p.evaluate(()=>[...document.querySelectorAll('#ssel .lpics.ties [data-tie]')].map(b=>(b.querySelector('small')||{}).textContent+'/'+b.getAttribute('aria-pressed'))));
 await p.screenshot({path:S+'/tests/audit/t34_studio_full'+(PHONE?'_m':'')+'.png'});
 // other views with a front-only tie: no errors, scarf layer present
 for(const v of ['side','back','half']){await p.evaluate(async v=>{ST.view=v;SSEL=null;paintTop();await drawStudio()},v);await p.waitForTimeout(700);console.log(v,await p.evaluate(()=>[...document.querySelectorAll('#sstage img.sl[data-slot="scarf"]')].map(i=>i.className+':'+i.getAttribute('style').slice(0,50))))}
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(REJ)),await p.evaluate(()=>JSON.stringify(window.ERRS)));
 await b.close()})();
