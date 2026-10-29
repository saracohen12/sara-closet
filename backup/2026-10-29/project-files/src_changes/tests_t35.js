const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const PHONE=process.argv[3]=='phone';const ID='S11QS_6';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7']}:{viewport:{width:1600,height:870}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{let n=0;window.claude={use:async k=>k=='assets'?{upload:async blob=>({id:'fake'+(++n),url:URL.createObjectURL(blob),sizeBytes:blob.size})}:null};window.REJ=[];window.addEventListener('unhandledrejection',e=>REJ.push(String(e.reason&&e.reason.stack||e.reason).slice(0,200)))});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(id=>openItem(id),ID);await p.waitForTimeout(900);
 const q=async(sel)=>p.evaluate(s=>!!document.querySelector(s),sel);
 console.log('box',await q('.tiesbox'),'add',await q('button[data-upm="tie"] input.ovf'),'paste',await q('[data-tiepaste]'),'chips',await p.evaluate(()=>[...document.querySelectorAll('[data-tiechip]')].map(b=>b.dataset.tiechip).slice(0,4)),'no tie4 btn',!(await q('button[data-upm="tie4"]')),'stamp hidden',await p.evaluate(()=>{const s=document.querySelector('.dtools .stamp');return !s||!s.offsetParent}));
 // chips fill the name field with commas
 await p.evaluate(()=>{document.querySelectorAll('[data-tiechip]')[1].click();document.querySelectorAll('[data-tiechip]')[2].click()});console.log('name after chips',await p.evaluate(()=>document.querySelector('.tiename').value));
 // 1) a 4-view sheet + a 5-style sheet + a single picture in one go, names: 2 chips + "בודדת" → 1 sheet tie, 5 styles, 1 single = 7 ties
 await p.evaluate(()=>{document.querySelector('.tiename').value+=', א, ב, ג, ד, בודדת'});
 const st=await p.evaluate(()=>(document.querySelector('.tiesbox .tst')||{}).textContent);
 await (await p.$('button[data-upm="tie"] input.ovf')).setInputFiles([S+'/tests/fx/sheet4.jpg',S+'/tests/fx/styles5.jpg',S+'/tests/fx/single_front.jpg']);
 let ties=null;for(let i=0;i<120;i++){await p.waitForTimeout(500);ties=await p.evaluate(id=>(IT[id]||{}).ties||null,ID);if(ties&&ties.length>=7)break}
 console.log('ties',ties&&ties.length,JSON.stringify(ties&&ties.map(t=>t.n+':'+Object.keys(t.u).join('/'))));console.log('status',await p.evaluate(()=>(document.querySelector('.tiesbox .tst')||{}).textContent));
 console.log('cards',await p.evaluate(()=>document.querySelectorAll('.tiel figure').length),'v4 badges',await p.evaluate(()=>document.querySelectorAll('.tiel .v4').length),'name cleared',await p.evaluate(()=>document.querySelector('.tiename').value===''));
 // 2) paste via the paste event on the ties box (clipboard.read is unavailable in the test → zone appears)
 await p.evaluate(()=>document.querySelector('[data-tiepaste]').click());await p.waitForTimeout(400);
 console.log('pz',await q('[data-tiepz]'),'status',await p.evaluate(()=>(document.querySelector('.tiesbox .tst')||{}).textContent));
 const b64=fs.readFileSync(S+'/tests/fx/single_front.jpg').toString('base64');
 await p.evaluate(async ({b64})=>{const r=await fetch('data:image/jpeg;base64,'+b64);const bl=await r.blob();const f=new File([bl],'p.jpg',{type:'image/jpeg'});const dt=new DataTransfer();dt.items.add(f);document.querySelector('.tiename').value='מודבקת';const ev=new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true});document.querySelector('[data-tiepz]').dispatchEvent(ev)},{b64});
 for(let i=0;i<60;i++){await p.waitForTimeout(500);ties=await p.evaluate(id=>(IT[id]||{}).ties||null,ID);if(ties&&ties.length>=8)break}
 console.log('after paste',ties&&ties.length,ties&&ties[ties.length-1].n,'pics unchanged',await p.evaluate(id=>((IT[id]||{}).pics||[]).length,ID));
 await p.evaluate(()=>{document.querySelector('.tiesbox').scrollIntoView({block:'start'})});await p.waitForTimeout(300);await p.screenshot({path:S+'/tests/audit/t35_box'+(PHONE?'_m':'')+'.png'});
 // 3) card tap = try on
 await p.evaluate(()=>document.querySelectorAll('.tiel [data-tietry]')[0].click());await p.waitForTimeout(2500);
 console.log('studio',await p.evaluate(()=>document.getElementById('studio').open),'tie',await p.evaluate(()=>ST&&ST.tf.scarf&&ST.tf.scarf.tie),'expected',ties[0].id,'layers',await p.evaluate(()=>[...document.querySelectorAll('#sstage img.sl[data-slot="scarf"]')].length));
 for(const v of ['side','back','half']){await p.evaluate(async v=>{ST.view=v;SSEL=null;paintTop();await drawStudio()},v);await p.waitForTimeout(600)}
 await p.evaluate(async()=>{ST.view='half';SSEL='scarf';paintTop();await drawStudio();paintSel()});await p.waitForTimeout(600);
 console.log('strip',await p.evaluate(()=>document.querySelectorAll('#ssel .lpics.ties [data-tie]').length));
 await p.screenshot({path:S+'/tests/audit/t35_studio'+(PHONE?'_m':'')+'.png'});
 // 4) main photo row: paste button exists; click → zone appears under the buttons
 await p.evaluate(()=>{document.getElementById('studio').close()});await p.evaluate(id=>openItem(id),'T103');await p.waitForTimeout(800);
 console.log('main paste btn',await q('[data-pasteimg]'));await p.evaluate(()=>document.querySelector('[data-pasteimg]').click());await p.waitForTimeout(400);
 console.log('main pz',await q('.pz.top'),await p.evaluate(()=>(document.querySelector('.imgrow .st2')||{}).textContent));
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(REJ)),await p.evaluate(()=>JSON.stringify(window.ERRS)));
 await b.close()})();
