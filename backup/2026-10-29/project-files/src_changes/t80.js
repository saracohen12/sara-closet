// screenshots of the main screens (closet, item, studio, hub) for the theme review
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]!='desktop';const fs=require('fs');
const OUT=S+'/tests/audit/t80'+(PHONE?'_m':'')+'/';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGE:'+e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(3500);
 await p.screenshot({path:OUT+'closet_top.png'});await p.evaluate(()=>window.scrollTo(0,900));await p.waitForTimeout(1200);await p.screenshot({path:OUT+'closet_scrolled.png'});
 await p.evaluate(()=>openItem('T1'));await p.waitForTimeout(1200);await p.screenshot({path:OUT+'item.png'});await p.evaluate(()=>document.querySelector('#dlg').close());
 await p.evaluate(async()=>{await openStudio();const t=Object.keys(D).find(id=>D[id].cat=='tops'&&(D[id].hi||TH[id]));const s=Object.keys(D).find(id=>D[id].cat=='skirts'&&(D[id].hi||TH[id]));await setItem('top',t);await setItem('skirt',s);SSEL='top';paintSel()});await p.waitForTimeout(1500);await p.screenshot({path:OUT+'studio.png'});
 await p.evaluate(()=>openDrawer('skirt'));await p.waitForTimeout(1200);await p.screenshot({path:OUT+'studio_drawer.png'});await p.evaluate(()=>{closeDrawer();HSAVE=HIST.length;document.querySelector('#studio').close()});
 await p.evaluate(()=>openHub('looks'));await p.waitForTimeout(1200);await p.screenshot({path:OUT+'hub.png'});
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
