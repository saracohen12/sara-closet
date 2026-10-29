// v68 round 2: gen looks → studio button, draft restore, ap-layer drag in side view, item name in strip, rawnote button, jewelry ghost, no toast on open
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';const fs=require('fs');
const DBI={};for(const f of fs.readdirSync(S+'/dbq/items')){if(!f.endsWith('.json')||f.includes('_new'))continue;const d=JSON.parse(fs.readFileSync(S+'/dbq/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGE:'+e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(d=>{Object.assign(IT,d);try{paintAll()}catch(e){}},DBI);await p.waitForTimeout(300);
 const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
 // open an item with p5g → no "נשמר" toast
 await p.evaluate(()=>openItem('T1'));await p.waitForTimeout(1500);log('open toast',await p.evaluate(()=>({hidden:document.querySelector('#toast').classList.contains('hide'),txt:document.querySelector('#toast').textContent.slice(0,30)})));await p.evaluate(()=>document.querySelector('#dlg').close());
 // generated looks → studio
 await p.evaluate(()=>openHub('looks'));await p.waitForTimeout(800);await p.evaluate(()=>{document.querySelector('#hgen').click()});await p.waitForTimeout(1200);log('gen btn',await p.evaluate(()=>document.querySelectorAll('#hlooks [data-studio]').length));
 await p.evaluate(()=>{document.querySelector('#hlooks [data-studio]').click()});await p.waitForTimeout(1500);log('gen→studio',await p.evaluate(()=>({open:document.querySelector('#studio').open,n:lookIds(ST).length})));
 // item name in the strip
 await p.evaluate(()=>{SSEL=Object.keys(ST.items)[0];paintSel()});log('strip',await p.evaluate(()=>document.querySelector('#ssel > b').textContent.slice(0,40)));
 // side view: drag the ap layer and keep a per-view placement
 await p.evaluate(async()=>{ST.avbase='p5';ST.view='side';SSEL=null;paintTop();await drawStudio()});await p.waitForTimeout(900);
 const ap=await p.$('#sstage img.sl.ap');if(ap){const slot=await ap.getAttribute('data-slot');const bb=await ap.boundingBox();const before=await p.evaluate(s=>({x:ST.tf[s].x,y:ST.tf[s].y,pv:ST.tf[s].pv||null}),slot);
  await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.mouse.move(bb.x+bb.width/2+30,bb.y+bb.height/2+40,{steps:6});await p.mouse.up();await p.waitForTimeout(600);
  const after=await p.evaluate(s=>({x:ST.tf[s].x,y:ST.tf[s].y,pv:ST.tf[s].pv||null,left:document.querySelector(`#sstage img.sl.ap[data-slot="${s}"]`)?.style.left,view:ST.view}),slot);log('ap drag',slot,before,after);
  await p.evaluate(async()=>{ST.view='front';paintTop();await drawStudio()});await p.waitForTimeout(500);log('front unchanged',await p.evaluate(s=>({x:ST.tf[s].x,y:ST.tf[s].y}),slot))}else log('ap drag','no ap layer');
 // draft restore
 await p.evaluate(()=>{ST.view='front'});await p.evaluate(()=>setItem('bag',Object.keys(D).find(id=>D[id].cat=='bags'&&(D[id].hi||TH[id]))));await p.waitForTimeout(1200);const items0=await p.evaluate(()=>Object.keys(ST.items));
 log('draft saved',await p.evaluate(()=>!!localStorage.getItem('studio_draft')));
 await p.evaluate(()=>{SNEW_ARM=Date.now();document.querySelector('#sclose').click()});await p.waitForTimeout(300);await p.evaluate(()=>openStudio());await p.waitForTimeout(1200);log('restored',items0,await p.evaluate(()=>Object.keys(ST.items)),await p.evaluate(()=>document.querySelector('#toast').textContent.slice(0,30)));
 await p.evaluate(()=>{document.querySelector('#snew').click()});await p.waitForTimeout(300);await p.evaluate(()=>{document.querySelector('#snew').click()});await p.waitForTimeout(900);log('new is clean',await p.evaluate(()=>({n:lookIds(ST).length,draft:!!localStorage.getItem('studio_draft')})));
 // jewelry hidden → ghost parts
 await p.evaluate(async()=>{await setItem('jewelry','T208');ST.tf.jewelry.hidden=true;await drawStudio()});await p.waitForTimeout(600);log('jw ghost',await p.evaluate(()=>[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.classList.contains('ghost'))));
 log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
