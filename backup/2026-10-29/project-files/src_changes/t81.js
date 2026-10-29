// v69: declutter – no full-avatar GPT box in the item dialog, no "📥 תמונות מ-GPT" / no Temu shoot tab, avatar sheet reachable from ⋯ menu
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGE:'+e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
 await p.evaluate(()=>openItem('T1'));await p.waitForTimeout(1000);
 log('item',await p.evaluate(()=>({p5slot:!!document.querySelector('#dlg .p5slot'),p5gbox:!!document.querySelector('#dlg .p5gbox'),txt:/5 תנוחות מ-GPT|גיליון האווטאר/.test(document.querySelector('#dlg').textContent)})));
 await p.evaluate(()=>document.querySelector('#dlg').close());
 await p.evaluate(()=>openHub('looks'));await p.waitForTimeout(800);log('hub tabs',await p.evaluate(()=>[...document.querySelectorAll('#htabs button')].map(b=>b.textContent).join(' | ')));await p.evaluate(()=>document.querySelector('#hub').close());
 await p.evaluate(async()=>{await openStudio();ST.avbase='p5';ST.view='side';const t=Object.keys(D).find(id=>D[id].cat=='tops'&&(D[id].hi||TH[id]));await setItem('top',t);paintTop();await drawStudio()});await p.waitForTimeout(1200);
 log('side note',await p.evaluate(()=>[...document.querySelectorAll('#sstage .p5note')].map(n=>n.textContent.slice(0,80))));
 log('toolbar simport',await p.evaluate(()=>!!document.querySelector('#simport')));
 await p.evaluate(()=>document.querySelector('#smore').click());await p.waitForTimeout(500);
 log('menu',await p.evaluate(()=>[...document.querySelectorAll('#sdrawer .smenu button')].map(b=>b.textContent.trim().slice(0,22))));
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#sdrawer .smenu button')].find(b=>/גיליון האווטאר/.test(b.textContent));b&&b.click()});await p.waitForTimeout(900);
 log('sheet zoom',await p.evaluate(()=>{const z=document.querySelector('#zoomd');return {open:!!(z&&z.open),src:z&&(z.querySelector('img')||{}).src}}));
 if(PHONE){await p.screenshot({path:S+'/tests/audit/t81_sheet_m.png'})}
 log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
