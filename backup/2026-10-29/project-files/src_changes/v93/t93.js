const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const O=S+'/tests/v92/t93_';const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:720}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
const vests=await p.evaluate(()=>Object.keys(D).filter(id=>/וסט|אפוד/.test((D[id].short||'')+' '+(D[id].name||''))).slice(0,5).map(id=>[id,curCat(id),D[id].short]));log('vests',vests);
await p.evaluate(async v=>{await openStudio();ST.avbase='p5';ST.view='front';await setItem('dress','S0Y74_0');await setItem('jewelry','T207');if(v)await setItem('vest',v);SSEL='jewelry';paintSel();await drawStudio()},vests[0]&&vests[0][0]);await p.waitForTimeout(1800);
log('bg',await p.evaluate(()=>ST.bg),'fr',await p.evaluate(()=>{const f=document.getElementById('fr93');return f&&f.getAttribute('style')}));
log('jwt row inside panel',await p.evaluate(()=>{const s=document.getElementById('ssel').getBoundingClientRect();return [...document.querySelectorAll('#ssel .jwt button')].map(b=>{const r=b.getBoundingClientRect();return b.textContent.trim()+':'+(r.left>=s.left-1&&r.right<=s.right+1&&r.width>0)}).join(' ')}));
log('slots',await p.evaluate(()=>[...document.querySelectorAll('#srail .slot')].filter(e=>e.offsetParent).map(e=>e.dataset.sslot||'more').join(',')),'vest z',await p.evaluate(()=>document.querySelector('#sstage img.sl[data-slot="vest"]')?.style.zIndex));
await p.screenshot({path:O+M+'_studio.png'});
// vest drawer
await p.evaluate(()=>openDrawer('vest'));await p.waitForTimeout(800);log('vest drawer n',await p.evaluate(()=>document.querySelectorAll('#dgrid [data-pick],#dgrid button').length));await p.evaluate(()=>closeDrawer());
// window
await p.evaluate(()=>document.getElementById('sbg93')?.click());await p.waitForTimeout(600);log('dlg open',await p.evaluate(()=>!!document.getElementById('bg93')?.open));
await p.screenshot({path:O+M+'_dlg.png'});
await p.evaluate(()=>{document.querySelector('#bg93 [data-b93bg="s_garden"]').click();document.querySelector('#bg93 [data-b93fc="gold"]').click()});await p.waitForTimeout(400);
await p.evaluate(()=>document.querySelector('#bg93 [data-b93x]').click());await p.waitForTimeout(500);
await p.screenshot({path:O+M+'_garden.png'});
await p.evaluate(()=>{openBg93();document.querySelector('#bg93 [data-b93fm="tight"]').click();document.querySelector('#bg93 [data-b93bg="s_jlm"]').click();document.querySelector('#bg93 [data-b93x]').click()});await p.waitForTimeout(500);
await p.screenshot({path:O+M+'_tight.png'});
await p.evaluate(()=>{openBg93();document.querySelector('#bg93 [data-b93fm="wide"]').click();document.querySelector('#bg93 [data-b93x]').click()});
await p.evaluate(()=>window.openMag91());await p.waitForTimeout(600);await p.screenshot({path:O+M+'_mag.png'});await p.evaluate(()=>document.getElementById('mg91').close());
// zoom + reset still fine
for(let i=0;i<3;i++){await p.evaluate(()=>document.getElementById('szin').click());await p.waitForTimeout(80)}await p.waitForTimeout(300);await p.screenshot({path:O+M+'_zoom.png'});
await p.evaluate(()=>document.getElementById('szreset').click());await p.waitForTimeout(500);log('after reset',await p.evaluate(()=>{const sm=document.querySelector('#studio .smain');return [stageZ(),sm.scrollTop,sm.scrollWidth<=sm.clientWidth+1,sm.scrollHeight<=sm.clientHeight+1]}));
log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[]).slice(0,800)),await p.evaluate(()=>{const s=document.getElementById('ssel');const r=s.getBoundingClientRect();return [r.left,r.right,r.top,r.bottom,s.scrollWidth,s.clientWidth,getComputedStyle(s).overflowX,getComputedStyle(s).flexWrap]}));await b.close()})();
