// v90: "להעביר לכפולים" from the item window, then back via the gallery; header "כפולים" button opens
const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){}});await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3500);
// header button
await p.evaluate(()=>{const b=document.querySelector('[data-dg89open]');b.scrollIntoView()});await p.click('[data-dg89open]');await p.waitForTimeout(700);
console.log('header btn opens',await p.evaluate(()=>{const d=document.getElementById('dg89');return !!(d&&d.open)+' groups='+(d?d.querySelectorAll('.dg89g').length:0)}));
await p.screenshot({path:S+'/tests/v77/dp90_'+M+'_gal.png'});
await p.evaluate(()=>document.getElementById('dg89').close());
const [a,c]=await p.evaluate(()=>{const ids=[...document.querySelectorAll('#dresses .card:not(.hide):not([data-dup])')].map(x=>x.dataset.id).filter(i=>!/_p\d/.test(i));return [ids[0],ids[1]]});console.log('pair',a,c);
await p.evaluate(a=>openItem(a),a);await p.waitForTimeout(900);
console.log('btn',await p.evaluate(()=>(document.querySelector('#dlg [data-dp89]')||{}).textContent));
await p.screenshot({path:S+'/tests/v77/dp90_'+M+'_item.png'});
await p.click('#dlg [data-dp89]');await p.waitForTimeout(700);
console.log('picker',await p.evaluate(()=>{const d=document.getElementById('dp89');return d&&d.open?d.querySelectorAll('[data-dp89pick]').length+' cands':'closed'}));
await p.screenshot({path:S+'/tests/v77/dp90_'+M+'_pick.png'});
await p.fill('#dp89q',c);await p.waitForTimeout(900);
console.log('search',await p.evaluate(c=>[...document.querySelectorAll('[data-dp89pick]')].map(x=>x.dataset.dp89pick).slice(0,3).join(','),c));
await p.evaluate(c=>document.querySelector('[data-dp89pick="'+c+'"]').click(),c);await p.waitForTimeout(900);
console.log('after pick',await p.evaluate(([a,c])=>'grouped='+[a,c].map(i=>(document.querySelector('.card[data-id="'+i+'"] .dup[data-dg89]')||{}).textContent).join('/')+' hidden='+[a,c].map(i=>document.querySelector('.card[data-id="'+i+'"]').classList.contains('hide')).join('/')+' btn='+(document.querySelector('#dlg [data-dp89see]')||{}).textContent+' dp='+JSON.stringify(SET.dp89),[a,c]));
await p.evaluate(()=>document.getElementById('dlg').close());
await p.evaluate(()=>{const b=document.querySelector('[data-dg89open]');b.click()});await p.waitForTimeout(700);
await p.evaluate(c=>document.querySelector('[data-dg89n="'+c+'"]').click(),c);await p.waitForTimeout(900);
console.log('after undo',await p.evaluate(([a,c])=>'grouped='+[a,c].map(i=>!!document.querySelector('.card[data-id="'+i+'"] .dup[data-dg89]')).join('/')+' hidden='+[a,c].map(i=>document.querySelector('.card[data-id="'+i+'"]').classList.contains('hide')).join('/')+' dp='+JSON.stringify(SET.dp89)+' nd='+JSON.stringify(SET.nd89),[a,c]));
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
