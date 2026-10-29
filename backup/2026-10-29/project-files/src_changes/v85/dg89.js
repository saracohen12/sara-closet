const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){}});await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3500);
const st=()=>p.evaluate(()=>({total:document.querySelectorAll('.grid .card:not(.hide)').length,dupVisible:document.querySelectorAll('.grid .card[data-dup]:not(.hide)').length,dupAll:document.querySelectorAll('.grid .card[data-dup]').length,dresses:(document.querySelector('#dresses h2 span')||{}).textContent,btn:(document.querySelector('[data-dg89open]')||{}).textContent}));
console.log('start',JSON.stringify(await st()));
console.log('T11 group',await p.evaluate(()=>[...document.querySelectorAll('.card[data-id="T11"],.card[data-id="T14"],.card[data-id="T301"]')].map(c=>c.dataset.id+':'+(c.classList.contains('hide')?'hidden':'shown')+':'+(c.querySelector('.dup')||{}).textContent).join(' ')));
await p.evaluate(()=>{const b=document.querySelector('.card:not(.hide) .dup[data-dg89]');b.scrollIntoView({block:'center'})});await p.waitForTimeout(500);
await p.screenshot({path:S+'/tests/v77/dg89_'+M+'_grid.png'});
await p.evaluate(()=>document.querySelector('.card:not(.hide) .dup[data-dg89]').click());await p.waitForTimeout(800);
console.log('dialog',await p.evaluate(()=>{const d=document.getElementById('dg89');return d&&d.open?d.querySelectorAll('.dg89g').length+' groups, hl='+!!d.querySelector('.dg89g.hl')+' item open='+[...document.querySelectorAll('dialog[open]')].map(x=>x.id):'closed'}));
await p.screenshot({path:S+'/tests/v77/dg89_'+M+'_dlg.png'});
// not a duplicate: T14 (skirt) out of the velvet dress group
await p.evaluate(()=>document.querySelector('[data-dg89n="T14"]').click());await p.waitForTimeout(900);
console.log('after T14 not-dup',await p.evaluate(()=>{const c=document.querySelector('.card[data-id="T14"]');return 'T14 dup='+c.dataset.dup+' hidden='+c.classList.contains('hide')+' nd='+JSON.stringify(SET.nd89)}));
await p.evaluate(()=>{const b=document.querySelector('[data-dg89k="T301"]');b&&b.click()});await p.waitForTimeout(800);
console.log('keeper T301',await p.evaluate(()=>['T11','T301'].map(i=>i+':'+(document.querySelector('.card[data-id="'+i+'"]').classList.contains('hide')?'hidden':'shown')).join(' ')));
await p.evaluate(()=>document.querySelector('[data-dg89u="T14"]').click());await p.waitForTimeout(800);
console.log('undo',await p.evaluate(()=>'nd='+JSON.stringify(SET.nd89)+' T14 dup='+document.querySelector('.card[data-id="T14"]').dataset.dup));
await p.evaluate(()=>document.getElementById('dg89').close());console.log('end',JSON.stringify(await st()));
// search exact id shows a hidden duplicate
await p.fill('#q','T15');await p.waitForTimeout(800);console.log('search T15',await p.evaluate(()=>!document.querySelector('.card[data-id="T15"]').classList.contains('hide')));
console.log('search',await p.evaluate(()=>siteSearch85('כפולים').map(x=>x.t).join(',')));
console.log('ERR',errs,await p.evaluate(()=>window.ERRS||[]));await b.close()})();
