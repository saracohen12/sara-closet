const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const PH=process.argv[3]=='phone';
const ITEMS={};for(const f of fs.readdirSync(S+'/dbq3/items')){const d=JSON.parse(fs.readFileSync(S+'/dbq3/items/'+f,'utf8'));delete d.version;ITEMS[f.replace('.json','')]=d.data||d}
const O=S+'/tests/v77/';const sf=PH?'_m':'_d';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PH?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:850}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(I=>{Object.assign(IT,I);const t=new Date();const iso=d=>{const x=new Date(d);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)};IT.T1.wl=[iso(t)];IT.T1.wear=4;IT.T93.wl=[iso(new Date(t-864e5))];paintAll()},ITEMS);await p.waitForTimeout(2200);
const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
log('occ',await p.evaluate(()=>[occToday83(),nextHol83()&&[nextHol83().name,nextHol83().days]]));
log('home',await p.evaluate(()=>['#rt83','#hol83','#wk83','#lotd77','#rdy77'].map(s=>{const e=document.querySelector(s);return s+':'+(e?getComputedStyle(e).gridRowStart+'/'+Math.round(e.getBoundingClientRect().top):'-')})));
log('week',await p.evaluate(()=>[document.querySelector('#wk83 small')?.textContent,document.querySelectorAll('#wk83 .w83d.on').length]));
await p.evaluate(()=>document.querySelector('#hol83')?.scrollIntoView({block:'start'}));await p.waitForTimeout(500);await p.screenshot({path:O+'h83'+sf+'.png'});
// wear diary via putItem
await p.evaluate(async()=>{await putItem('T195',{wear:((IT.T195||{}).wear||0)+1})});log('wl',await p.evaluate(()=>IT.T195.wl));
// closet
log('sorts',await p.evaluate(()=>[...document.querySelectorAll('#sort option')].slice(-2).map(o=>o.value)));
log('badges',await p.evaluate(()=>[document.querySelectorAll('.new83').length,document.querySelectorAll('.av83').length,document.querySelectorAll('.av83.ok').length]));
log('tools',await p.evaluate(()=>!!document.querySelector('#q77 .t83')));
await p.evaluate(()=>document.querySelector('#q77').scrollIntoView({block:'center'}));await p.click('[data-sel83]');await p.waitForTimeout(300);
const ids=await p.evaluate(()=>[...document.querySelectorAll('section:not(.hide) .grid .card')].slice(0,2).map(c=>c.dataset.id));
for(const id of ids){await p.click(`.grid .card[data-id="${id}"]`);await p.waitForTimeout(150)}
log('sel',await p.evaluate(()=>[document.querySelector('#sb83 b')?.textContent,!!document.querySelector('dialog#dlg[open]')]));
await p.screenshot({path:O+'sel83'+sf+'.png'});
await p.click('[data-sb83="fav"]');await p.waitForTimeout(700);log('bulk fav',await p.evaluate(ids=>ids.map(i=>!!IT[i].fav),ids),await p.evaluate(()=>[document.body.classList.contains('sel83'),document.querySelector('#toast').textContent]));
await p.click('[data-wall83]');await p.waitForTimeout(300);await p.evaluate(()=>window.scrollBy(0,600));await p.waitForTimeout(400);await p.screenshot({path:O+'wall83'+sf+'.png'});
log('wall/ix',await p.evaluate(()=>[document.body.classList.contains('wall83'),document.querySelectorAll('#ix83 button').length,document.querySelector('#ix83')?.classList.contains('on')]));
await p.click('[data-wall83]');
log('mic',await p.evaluate(()=>!!document.querySelector('.mic83')));
// item window
const iid=await p.evaluate(()=>(Object.keys(D).find(id=>['dress','skirt','top'].includes(slotOf(id))&&window.avReady&&avReady(id))||'T93'));log('iid',iid);await p.evaluate(i=>openItem(i),iid);await p.waitForTimeout(900);
log('item',await p.evaluate(()=>[document.querySelectorAll('#dlbody .gd83 i').length,document.querySelectorAll('#dlbody .g83r button').length,document.querySelector('#dlbody .wh83')?.textContent,!!document.querySelector('[data-sh83]'),!!document.querySelector('[data-vn83]')]));
await p.evaluate(()=>document.querySelector('#dlbody .gw83')?.scrollIntoView({block:'center'}));await p.waitForTimeout(500);await p.screenshot({path:O+'it83'+sf+'.png'});
await p.click('[data-gw83]');await p.waitForTimeout(2500);log('look w/ item',await p.evaluate(()=>[!!document.querySelector('#studio[open]'),ST&&Object.values(ST.items)]));
// studio
await p.evaluate(()=>{const s=Object.keys(ST.items)[0];SSEL=s;paintSel()});await p.waitForTimeout(300);
const before=await p.evaluate(()=>ST.items[SSEL]);if(await p.$('[data-nx83="1"]'))await p.click('[data-nx83="1"]');await p.waitForTimeout(1200);log('next',before,await p.evaluate(()=>ST.items[SSEL]));
await p.dblclick('#sstage');await p.waitForTimeout(500);log('zoom',await p.evaluate(()=>[document.querySelector('#sstage').classList.contains('fz83'),[...document.querySelector('#sstage').children].map(c=>c.tagName+'.'+c.className+':'+getComputedStyle(c).transform.slice(0,30))]));
await p.screenshot({path:O+'fz83'+sf+'.png'});await p.dblclick('#sstage');
log('bgs',await p.evaluate(()=>Object.keys(BGS)));
await p.evaluate(()=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());openQA83()});await p.waitForTimeout(3500);
log('qa',await p.evaluate(()=>[document.querySelectorAll('#qa83 .qa83r').length,document.querySelectorAll('#qa83 .mst').length,[...document.querySelectorAll('#qa83 .mst')].filter(m=>m.innerHTML.length>50).length]));
await p.screenshot({path:O+'qa83'+sf+'.png'});
await p.evaluate(()=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());openBU83()});await p.waitForTimeout(500);await p.screenshot({path:O+'bu83'+sf+'.png'});log('bu',await p.evaluate(()=>!!document.querySelector('#bu83[open] [data-bu83in]')));
await p.evaluate(()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close()));
// hub
await p.evaluate(()=>{LOOKS.L83a={id:'L83a',name:'שבת חורף',occ:'shab',items:{dress:'T147'},rating:4,created:new Date(Date.now()-5e8).toISOString()};LOOKS.L83b={id:'L83b',name:'יום רגיל',occ:'day',items:{top:'T1',skirt:'T93'},created:new Date().toISOString(),ev:'חתונה'}});
for(const t of ['week','album','insights','check']){await p.evaluate(t=>{openHub(t)},t);await p.waitForTimeout(1200);
 log('hub '+t,await p.evaluate(()=>[TAB,!!document.querySelector('#hbody .wl83'),document.querySelectorAll('#hbody .wl83c').length,!!document.querySelector('#hbody .af83'),document.querySelectorAll('#hbody .st83').length,!!document.querySelector('#hbody .gp83'),!!document.querySelector('#hbody .sp83')]));
 await p.screenshot({path:O+'hub_'+t+sf+'.png'})}
await p.fill('#sp83in','חצאית שחורה');await p.click('[data-sp83add]');await p.waitForTimeout(700);log('shop',await p.evaluate(()=>[SET.shop83,document.querySelector('.sp83l li')?.textContent]));
await p.evaluate(()=>openHub('week'));await p.waitForTimeout(1000);const box=await p.$('[data-wl83="L83a"]');const day=await p.$('[data-wd83="2"]');if(box&&day){const a=await box.boundingBox(),d=await day.boundingBox();await p.mouse.move(a.x+20,a.y+20);await p.mouse.down();await p.mouse.move(a.x+60,a.y+60,{steps:5});await p.mouse.move(d.x+d.width/2,d.y+d.height/2,{steps:10});await p.mouse.up();await p.waitForTimeout(800)}log('drag',await p.evaluate(()=>PLAN.days));
await p.evaluate(()=>openHub('album'));await p.waitForTimeout(1000);const st=await p.$('.st83 [data-st83="2"]');if(st)await st.click();await p.waitForTimeout(300);log('stars',await p.evaluate(()=>Object.values(LOOKS).map(l=>l.name+':'+(l.rating||0))));await p.screenshot({path:O+'album83'+sf+'.png'});
log('alerts',await p.evaluate(()=>getAlerts().map(a=>a.txt).slice(0,3)));
log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
