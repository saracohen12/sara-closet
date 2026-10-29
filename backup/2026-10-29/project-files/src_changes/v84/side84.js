const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const PH=process.argv[3]!='desk';
const ITEMS={};for(const f of fs.readdirSync(S+'/dbq3/items')){const d=JSON.parse(fs.readFileSync(S+'/dbq3/items/'+f,'utf8'));delete d.version;ITEMS[f.replace('.json','')]=d.data||d}
(async()=>{const b=await chromium.launch();const c=await b.newContext(PH?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:850}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(I=>{Object.assign(IT,I);paintAll()},ITEMS);await p.waitForTimeout(1000);
const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
const id=process.argv[4]||'T147';
await p.evaluate(async id=>{await openStudio(null,{[slotOf(id)]:id});},id);await p.waitForTimeout(2500);
const slot=await p.evaluate(id=>slotOf(id),id);
const st=async(lbl)=>log(lbl,await p.evaluate(s=>{const im=document.querySelector(`#sstage img.sl[data-slot="${s}"]`);const r=im&&im.getBoundingClientRect();const tf=ST.tf[s];return {view:ST.view,avb:ST.avbase,r:r&&[Math.round(r.width),Math.round(r.height)],w:tf.w,sx:tf.sx,pvv:tf.pvv,pv:tf.pv&&tf.pv[ST.view],sw:document.querySelector('#sw')?.value,swVis:!!document.querySelector('#sw')?.offsetParent}},slot));
await st('front');
// go to side view
await p.evaluate(()=>{const b=[...document.querySelectorAll('#studio button')].find(x=>x.textContent.trim()=='צד');b&&b.click()});await p.waitForTimeout(1500);
await p.evaluate(s=>{SSEL=s;paintSel()},slot);await p.waitForTimeout(400);
await st('side');await p.screenshot({path:S+'/tests/v77/side84a.png'});
// move the size slider
await p.evaluate(()=>{const i=document.querySelector('#sw');if(!i)return;i.value=+i.value+25;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))});await p.waitForTimeout(1500);
await st('side after sw');
await p.evaluate(()=>{const i=document.querySelector('#ssx');if(!i)return;i.value=150;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))});await p.waitForTimeout(1500);
await st('side after ssx');
// +/- buttons in stage?
log('buttons',await p.evaluate(()=>[...document.querySelectorAll('#ssel button,#ssel label')].filter(b=>b.offsetParent).map(b=>b.textContent.trim().slice(0,14))));
await p.evaluate(()=>drawStudio());await p.waitForTimeout(1500);await st('side after redraw');
await p.screenshot({path:S+'/tests/v77/side84b.png'});
log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
