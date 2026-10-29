// v91 layout checks: compact bar, tools toggle, slots more, zoom pan, magnifier, necklace drag mirrored
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v92/';const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:720}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async()=>{await openStudio();ST.avbase='p5';ST.view='front';await setItem('dress','S0Y74_0');SSEL='dress';paintSel()});await p.waitForTimeout(1500);
const vis=sel=>p.evaluate(s=>[...document.querySelectorAll(s)].filter(e=>e.offsetParent!==null).length,sel);
log('1 bar h',await p.evaluate(()=>Math.round(document.getElementById('ssel').getBoundingClientRect().height)),'sliders visible',await vis('#ssel input[type=range]'),'er',await vis('#ssel [data-er="t"]'));
await p.evaluate(()=>document.querySelector('[data-tg91]').click());await p.waitForTimeout(300);
log('1 tools open sliders',await vis('#ssel input[type=range]'),'er',await vis('#ssel [data-er="t"]'),'h',await p.evaluate(()=>Math.round(document.getElementById('ssel').getBoundingClientRect().height)));
await p.evaluate(()=>document.querySelector('#ssel [data-er="t"]').click());await p.waitForTimeout(300);
await p.evaluate(()=>document.querySelector('[data-tg91]').click());await p.waitForTimeout(300);
log('1 close -> eraser off',await p.evaluate(()=>!document.body.classList.contains('er74on')),'sliders',await vis('#ssel input[type=range]'));
// size buttons still work collapsed
const w0=await p.evaluate(()=>ST.tf.dress.w);await p.evaluate(()=>document.querySelector('[data-sz84="1"]').click());await p.waitForTimeout(200);log('1 size',w0,'->',await p.evaluate(()=>ST.tf.dress.w));
// 2 slots
log('2 slots visible',await vis('#srail .slot'),'more',await p.evaluate(()=>document.querySelector('.more91 b').textContent));
await p.evaluate(()=>document.querySelector('[data-more91]').click());await p.waitForTimeout(300);log('2 after more',await vis('#srail .slot'));
await p.evaluate(()=>document.querySelector('#srail [data-sslot="skirt"]').click());await p.waitForTimeout(1200);
log('2 drawer open',await p.evaluate(()=>!!document.querySelector('#sdrawer.open')));
await p.screenshot({path:O+'t91b_drawer_'+M+'.png'});
const pick=await p.evaluate(()=>{const t=document.querySelector('#sdrawer [data-dpick]');t.click();return t.dataset.dpick});await p.waitForTimeout(1500);
log('2 picked',pick,'skirt',await p.evaluate(()=>ST.items.skirt),'slots visible',await vis('#srail .slot'));
await p.evaluate(async()=>{const d=document.querySelector('#sdrawer .dh .x');d&&d.click();await setItem('skirt',null).catch(()=>{})});await p.waitForTimeout(800);
// 3 zoom + pan
const sm=()=>p.evaluate(()=>{const s=document.querySelector('#studio .smain');return [Math.round(s.scrollTop),Math.round(s.scrollLeft)]});
for(let i=0;i<4;i++){await p.evaluate(()=>document.getElementById('szin').click());await p.waitForTimeout(150)}
await p.waitForTimeout(400);log('3 z',await p.evaluate(()=>stageZ()),'scroll',await sm(),'view',await p.evaluate(()=>ST.view));
const R=await p.evaluate(()=>{const r=document.querySelector('#studio .smain').getBoundingClientRect();return {x:r.x+r.width*.75,y:r.y+r.height*.5}});
// drag from the side of the stage (base body area): find a point on #sstage not on the selected dress
const pt=await p.evaluate(()=>{const st=document.getElementById('sstage').getBoundingClientRect();const sm=document.querySelector('#studio .smain').getBoundingClientRect();for(let y=sm.top+40;y<sm.bottom-40;y+=20)for(let x=Math.max(st.left,sm.left)+5;x<Math.min(st.right,sm.right)-5;x+=10){const e=document.elementFromPoint(x,y);if(e&&e.closest('#sstage')&&!e.closest('.sel'))return {x,y}}return null});
log('3 pt',pt);
if(pt){if(M=='phone'){const cd=await p.context().newCDPSession(p);await cd.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:pt.x,y:pt.y}]});for(let i=1;i<=8;i++){await cd.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:pt.x,y:pt.y-i*15}]});await p.waitForTimeout(20)}await cd.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}
 else{await p.mouse.move(pt.x,pt.y);await p.mouse.down();for(let i=1;i<=8;i++){await p.mouse.move(pt.x,pt.y-i*15);await p.waitForTimeout(20)}await p.mouse.up()}}
await p.waitForTimeout(500);log('3 after drag up 120px scroll',await sm(),'view still',await p.evaluate(()=>ST.view),'dress x',await p.evaluate(()=>ST.tf.dress.x));
await p.screenshot({path:O+'t91b_zoom_'+M+'.png'});
await p.evaluate(()=>zoomTo(1));await p.waitForTimeout(300);
// wheel toward the hem (desk)
if(M=='desk'){const st=await p.evaluate(()=>{const r=document.getElementById('sstage').getBoundingClientRect();return {x:r.x+r.width*.5,y:r.y+r.height*.85}});await p.mouse.move(st.x-60,st.y);
 const off=await p.evaluate(()=>{const r=document.getElementById('sstage').getBoundingClientRect();return r.x});
 await p.evaluate(()=>{SSEL=null;paintSel();document.querySelectorAll('#sstage .sel').forEach(x=>x.classList.remove('sel'))});
 for(let i=0;i<3;i++){await p.mouse.wheel(0,-100);await p.waitForTimeout(250)}
 log('3 wheel z',await p.evaluate(()=>stageZ()),'hem point stays',await p.evaluate(y=>{const r=document.getElementById('sstage').getBoundingClientRect();return ((y-r.top)/r.height).toFixed(2)},st.y));await p.evaluate(()=>zoomTo(1));await p.waitForTimeout(300)}
// 4 magnifier
await p.evaluate(()=>document.getElementById('smag91').click());await p.waitForTimeout(600);
log('4 mag open',await p.evaluate(()=>document.getElementById('mg91').open),'size',await p.evaluate(()=>{const r=document.querySelector('#mg91 #sstage').getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]}),'imgs',await p.evaluate(()=>document.querySelectorAll('#mg91 img').length),'orig stage still first',await p.evaluate(()=>!document.getElementById('sstage').dataset.mg91));
await p.screenshot({path:O+'t91b_mag_'+M+'.png'});
await p.evaluate(()=>{document.querySelector('#mg91 [data-mg="in"]').click();document.querySelector('#mg91 [data-mg="in"]').click()});await p.waitForTimeout(300);
await p.screenshot({path:O+'t91b_mag2_'+M+'.png'});
await p.evaluate(()=>document.querySelector('#mg91 [data-mg="x"]').click());await p.waitForTimeout(300);log('4 closed',await p.evaluate(()=>!document.getElementById('mg91').open&&!document.querySelector('#mg91 #sstage')));
// 5 necklace in mirrored half view
await p.evaluate(async()=>{await setItem('jewelry','T208');SSEL='jewelry';paintSel()});await p.waitForTimeout(1200);
for(let i=0;i<5;i++){await p.evaluate(()=>document.querySelector('#spin [data-spin="1"]').click());await p.waitForTimeout(1100)}
log('5 view',await p.evaluate(()=>ST.view+' mir='+ST.mir),'jwp',await p.evaluate(()=>document.querySelectorAll('#sstage img.jwp').length),'in mirw',await p.evaluate(()=>!!document.querySelector('#sstage .mirw img.jwp')));
const j=await p.evaluate(()=>{const i=document.querySelector('#sstage img.jwp');if(!i)return null;const r=i.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height*.5,l:r.left}});
if(j){await p.mouse.move(j.x,j.y);await p.mouse.down();for(let i=1;i<=6;i++){await p.mouse.move(j.x+i*5,j.y);await p.waitForTimeout(20)}await p.mouse.up();await p.waitForTimeout(1500);
 log('5 necklace drag right 30px: left',j.l.toFixed(1),'->',await p.evaluate(()=>document.querySelector('#sstage img.jwp').getBoundingClientRect().left.toFixed(1)))}
await p.screenshot({path:O+'t91b_neck_'+M+'.png'});
log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
