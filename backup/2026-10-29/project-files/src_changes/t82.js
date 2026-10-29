// v69 new home: screenshots + interactions (tiles, category tiles, sheet, filter panel, item dialog)
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]!='desktop';const fs=require('fs');
const OUT=S+'/tests/audit/t82'+(PHONE?'_m':'')+'/';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:860}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGE:'+e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(3500);
 const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
 await p.screenshot({path:OUT+'home.png'});
 log('home',await p.evaluate(()=>({bar:!!document.querySelector('.h9bar'),hero:!!document.querySelector('.h9hero'),cats:document.querySelectorAll('.h9cat').length,catImgs:[...document.querySelectorAll('.h9cat img')].filter(i=>i.src&&!i.src.startsWith('data:image/gif')).length,stats:!!document.querySelector('#top p.stats'),sheetStats:document.querySelectorAll('#more9 p.stats').length,overflowX:document.documentElement.scrollWidth>innerWidth})));
 // scroll so the sticky bar is at the top
 await p.evaluate(()=>window.scrollTo(0,document.querySelector('#top').offsetHeight-10));await p.waitForTimeout(900);await p.screenshot({path:OUT+'bar.png'});
 // category tile → dresses
 await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(500);
 await p.evaluate(()=>document.querySelector('.h9cat[data-h9cat="#skirts"]').click());await p.waitForTimeout(1500);
 log('cat tile',await p.evaluate(()=>({pressed:(document.querySelector('.subs a[aria-pressed="true"]')||{}).textContent,visibleSecs:[...document.querySelectorAll('section')].filter(s=>!s.classList.contains('hide')&&s.offsetHeight>0).map(s=>s.id).slice(0,4),y:Math.round(scrollY)})));
 await p.screenshot({path:OUT+'cat.png'});
 await p.evaluate(()=>document.querySelector('.h9all').click());await p.waitForTimeout(600);
 // fav tile + ret tile toggles
 await p.evaluate(()=>window.scrollTo(0,0));await p.evaluate(()=>document.querySelector('[data-h9="fav"]').click());await p.waitForTimeout(500);log('fav',await p.evaluate(()=>({flf:$('#flf').value,shown:document.querySelectorAll('.grid .card:not(.hide)').length})));
 await p.evaluate(()=>document.querySelector('[data-h9="fav"]').click());await p.waitForTimeout(400);
 await p.evaluate(()=>document.querySelector('[data-h9="ret"]').click());await p.waitForTimeout(500);log('ret',await p.evaluate(()=>$('#sort').value));await p.evaluate(()=>document.querySelector('[data-h9="ret"]').click());await p.waitForTimeout(300);
 // sheet
 await p.evaluate(()=>window.scrollTo(0,0));await p.evaluate(()=>document.querySelector('[data-h9="more"]').click());await p.waitForTimeout(700);await p.screenshot({path:OUT+'sheet.png'});
 log('sheet',await p.evaluate(()=>({open:document.querySelector('#more9').open,prog:(document.querySelector('#more9 #prog')||{}).textContent?.slice(0,40)})));await p.evaluate(()=>document.querySelector('#more9 .x9').click());
 // filter panel
 await p.evaluate(()=>window.scrollTo(0,document.querySelector('#top').offsetHeight+300));await p.waitForTimeout(700);await p.evaluate(()=>document.querySelector('#fb').click());await p.waitForTimeout(600);await p.screenshot({path:OUT+'filter.png'});
 log('panel',await p.evaluate(()=>({open:!document.querySelector('#panel').classList.contains('hide'),sortVis:!!document.querySelector('#sort').offsetParent,srcVis:!!document.querySelector('#src').offsetParent})));await p.evaluate(()=>document.querySelector('#fb').click());
 // studio + hub buttons
 await p.evaluate(()=>window.scrollTo(0,0));await p.evaluate(()=>document.querySelector('[data-h9="studio"]').click());await p.waitForTimeout(1500);log('studio',await p.evaluate(()=>document.querySelector('#studio').open));await p.screenshot({path:OUT+'studio.png'});await p.evaluate(()=>{HSAVE=HIST.length;document.querySelector('#studio').close()});
 await p.evaluate(()=>document.querySelector('[data-h9="hub"]').click());await p.waitForTimeout(1000);log('hub',await p.evaluate(()=>document.querySelector('#hub').open));await p.screenshot({path:OUT+'hub.png'});await p.evaluate(()=>document.querySelector('#hub').close());
 // item dialog
 await p.evaluate(()=>openItem('T104'));await p.waitForTimeout(1200);await p.screenshot({path:OUT+'item.png'});log('item',await p.evaluate(()=>({srch9:!!document.querySelector('#dlg details.srch9'),open:document.querySelector('#dlg details.srch9')?.open})));
 await p.evaluate(()=>{const d=document.querySelector('#dlg .dl');if(d)d.scrollTop=900;document.querySelector('#dlg').scrollTop=900});await p.waitForTimeout(400);await p.screenshot({path:OUT+'item2.png'});await p.evaluate(()=>document.querySelector('#dlg').close());
 log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
