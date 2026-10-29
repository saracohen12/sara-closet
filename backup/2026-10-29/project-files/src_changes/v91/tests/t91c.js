// tools visible, tap avatar -> window, dblclick no face-freeze, zoom buttons stay visible, reset
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';const BASE=process.argv[4]||'p5';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v92/';const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1360,height:840}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
await p.evaluate(async b=>{await openStudio();ST.avbase=b;ST.view='front';await setItem('dress','S0Y74_0');SSEL='dress';paintSel();await drawStudio()},BASE);await p.waitForTimeout(1500);
const vis=sel=>p.evaluate(s=>[...document.querySelectorAll(s)].filter(e=>e.offsetParent!==null).length,sel);
log('1 cls',await p.evaluate(()=>document.getElementById('ssel').className+' | '+[...document.getElementById('ssel').children].map(c=>c.tagName+'.'+c.className+':'+getComputedStyle(c).display).join(', ')));log('1 sliders visible',await vis('#ssel input[type=range]'),'buttons',await vis('#ssel .sbtns button'),'tg',await vis('.tg91'));
await p.screenshot({path:O+'t91c_tools_'+M+'_'+BASE+'.png'});
// tap on the avatar face
const face=await p.evaluate(()=>{const st=document.getElementById('sstage').getBoundingClientRect();for(let y=st.top+10;y<st.top+st.height*.3;y+=6){const x=st.left+st.width/2;const e=document.elementFromPoint(x,y);if(e&&e.closest('#sstage')&&!e.closest('img.sl'))return {x,y}}return null});
log('2 face pt',face);
if(face){if(M=='phone')await p.touchscreen.tap(face.x,face.y);else await p.mouse.click(face.x,face.y);await p.waitForTimeout(700)}
log('2 tap -> window',await p.evaluate(()=>!!document.getElementById('mg91')?.open));
await p.evaluate(()=>document.getElementById('mg91')?.open&&document.getElementById('mg91').close());await p.waitForTimeout(300);
// tap on the garment selects, no window
const g=await p.evaluate(()=>{const r=document.querySelector('#sstage img.sl[data-slot="dress"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height*.7}});
await p.evaluate(()=>{SSEL=null;paintSel()});if(M=='phone')await p.touchscreen.tap(g.x,g.y);else await p.mouse.click(g.x,g.y);await p.waitForTimeout(600);
log('3 garment tap: SSEL',await p.evaluate(()=>SSEL),'window',await p.evaluate(()=>!!document.getElementById('mg91')?.open));
// dblclick
if(M=='desk'&&face){await p.mouse.dblclick(face.x,face.y);await p.waitForTimeout(600);log('4 dbl fz83',await p.evaluate(()=>document.getElementById('sstage').classList.contains('fz83')),'window',await p.evaluate(()=>!!document.getElementById('mg91')?.open));await p.evaluate(()=>document.getElementById('mg91')?.open&&document.getElementById('mg91').close())}
// zoom in a lot, scroll down, buttons visible
for(let i=0;i<12;i++){await p.evaluate(()=>document.getElementById('szin').click());await p.waitForTimeout(60)}
await p.evaluate(()=>{const s=document.querySelector('#studio .smain');s.scrollTop=s.scrollHeight});await p.waitForTimeout(400);
log('5 z',await p.evaluate(()=>stageZ()),'sside in view',await p.evaluate(()=>{const s=document.querySelector('#studio .smain').getBoundingClientRect(),r=document.querySelector('#studio .sside').getBoundingClientRect();return r.top>=s.top-1&&r.bottom<=s.bottom+1}),'reset txt',await p.evaluate(()=>getComputedStyle(document.getElementById('szreset'),'::after').content));
await p.screenshot({path:O+'t91c_zoom_'+M+'_'+BASE+'.png'});
await p.evaluate(()=>document.getElementById('szreset').click());await p.waitForTimeout(500);log('6 after reset z',await p.evaluate(()=>stageZ()),'scroll',await p.evaluate(()=>document.querySelector('#studio .smain').scrollTop));
// wheel no longer zooms
if(M=='desk'){await p.mouse.move(face.x,face.y+100);await p.mouse.wheel(0,-200);await p.waitForTimeout(300);log('7 wheel z',await p.evaluate(()=>stageZ()))}
log('ERR',errs);await b.close()})();
