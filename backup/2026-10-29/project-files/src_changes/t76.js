// v68 checks: export with neck overlay, shared renderer, earrings in side view, add-to-look from item dialog, dirty dot, fit-to-body, help, drawer names, album head
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';const fs=require('fs');
const DBI={};for(const f of fs.readdirSync(S+'/dbq/items')){if(!f.endsWith('.json')||f.includes('_new'))continue;const d=JSON.parse(fs.readFileSync(S+'/dbq/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGE:'+e.message));
 await p.addInitScript(()=>{window.__dl=[];window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:k=='downloads'?{save:async o=>{window.__dl.push({n:o.filename,sz:o.data&&o.data.size})}}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(d=>{Object.assign(IT,d);try{paintAll()}catch(e){}},DBI);await p.waitForTimeout(300);
 const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
 // jewelry with a front-only necklace + earring from fixtures (no side view)
 const jid=await p.evaluate(()=>Object.keys(D).find(i=>D[i].cat=='jewelry'));await p.evaluate(id=>openItem(id),jid);await p.waitForTimeout(600);
 await p.evaluate(()=>{const b=document.querySelector('.jwbox [data-jwpk="ear"]');if(b&&b.getAttribute('aria-pressed')!='true')b.click()});await p.waitForTimeout(300);
 await (await p.$('.jwrow[data-jwrow="neck"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/jw3.jpg']);await p.waitForTimeout(5000);
 await (await p.$('.jwrow[data-jwrow="ear"] button[data-upm="jw"] input.ovf')).setInputFiles([S+'/tests/fx/jw3.jpg']);await p.waitForTimeout(5000);
 await p.evaluate(()=>document.querySelector('#dlg').close());
 const top=await p.evaluate(()=>Object.keys(D).find(id=>D[id].cat=='tops'&&(D[id].hi||TH[id])));const sk=await p.evaluate(()=>Object.keys(D).find(id=>D[id].cat=='skirts'&&(D[id].hi||TH[id])));
 await p.evaluate(async([jid,top,sk])=>{await openStudio();ST.avbase='p5';await setItem('top',top);await setItem('skirt',sk);await setItem('jewelry',jid)},[jid,top,sk]);await p.waitForTimeout(1200);
 // 1) side view: earrings present even without a side necklace
 await p.evaluate(async()=>{ST.view='side';paintTop();await drawStudio()});await p.waitForTimeout(600);log('side parts',await p.evaluate(()=>[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part)));
 await p.evaluate(async()=>{ST.view='hip';paintTop();await drawStudio()});await p.waitForTimeout(600);log('hip parts',await p.evaluate(()=>[...document.querySelectorAll('#sstage img.jwp')].map(i=>i.dataset.part+'@'+i.style.left+','+i.style.top)));
 await p.evaluate(async()=>{ST.view='front';paintTop();await drawStudio()});await p.waitForTimeout(600);
 // 2) neck overlay + export
 await p.evaluate(()=>{SSEL='top';paintSel();document.querySelector('#ssel [data-nk]').click()});await p.waitForTimeout(600);
 let thrown='';await p.evaluate(()=>exportStudio()).catch(e=>thrown=e.message);await p.waitForTimeout(2000);log('export',thrown||'ok',await p.evaluate(()=>window.__dl.splice(0)));
 await p.evaluate(()=>p5ShowAll());await p.waitForTimeout(1500);await p.evaluate(()=>p5ExportAll()).catch(e=>thrown=e.message);await p.waitForTimeout(2500);log('p5exp',thrown||'ok',await p.evaluate(()=>window.__dl.splice(0)));await p.evaluate(()=>document.querySelector('#p5all').close());
 // 2b) the back figure in "כל התנוחות" must use the back view (not the studio's current view)
 await p.evaluate(async()=>{ST.view='front';paintTop();await drawStudio()});await p.evaluate(()=>p5ShowAll());await p.waitForTimeout(1200);log('p5all bases',await p.evaluate(()=>[...document.querySelectorAll('#p5all .p5f')].map(f=>f.dataset.pose+':'+(f.querySelector('img.sb')||{}).getAttribute('src'))));await p.evaluate(()=>document.querySelector('#p5all').close());
 // 3) dirty dot
 log('dirty after edits',await p.evaluate(()=>document.querySelector('#ssv').classList.contains('dirty')));
 await p.evaluate(()=>saveStudio());await p.waitForTimeout(300);await p.evaluate(()=>{document.querySelector('#vn').value='לוק 68';document.querySelector('#vok').click()});await p.waitForTimeout(800);log('dirty after save',await p.evaluate(()=>document.querySelector('#ssv').classList.contains('dirty')));
 await p.evaluate(()=>{document.querySelector('#ssel [data-sa="flip"]').click()});await p.waitForTimeout(400);log('dirty after flip',await p.evaluate(()=>document.querySelector('#ssv').classList.contains('dirty')));
 await p.evaluate(()=>document.querySelector('#sclose').click());await p.waitForTimeout(300);log('close blocked once',await p.evaluate(()=>document.querySelector('#studio').open),await p.evaluate(()=>document.querySelector('#toast').textContent.slice(0,40)));
 // 4) add to look from item dialog opened inside the studio
 const bag=await p.evaluate(()=>Object.keys(D).find(id=>D[id].cat=='tops'&&(D[id].hi||TH[id])&&id!=ST.items.top));await p.evaluate(id=>openItem(id),bag);await p.waitForTimeout(500);log('dlg btn',await p.evaluate(()=>!!document.querySelector('#dlbody [data-studio]')));await p.evaluate(()=>{const b=document.querySelector('#dlbody [data-studio]');b&&b.click()});await p.waitForTimeout(900);
 log('add from dialog',await p.evaluate(()=>({items:Object.keys(ST.items),dlg:document.querySelector('#dlg').open})));
 // 5) fit to body on the skirt
 await p.evaluate(()=>{SSEL='skirt';paintSel()});await p.waitForTimeout(200);const before=await p.evaluate(()=>({sx:ST.tf.skirt.sx,x:ST.tf.skirt.x,btn:!!document.querySelector('#ssel [data-fitb]')}));await p.evaluate(()=>document.querySelector('#ssel [data-fitb]').click());await p.waitForTimeout(900);log('fitb skirt',before,await p.evaluate(()=>({sx:ST.tf.skirt.sx,x:ST.tf.skirt.x})));
 await p.evaluate(()=>{SSEL='top';paintSel()});log('fitb top ret',await p.evaluate(()=>fitToBody('top')));await p.waitForTimeout(600);log('fitb top',await p.evaluate(()=>({sx:ST.tf.top.sx,x:ST.tf.top.x})));
 await p.screenshot({path:S+'/tests/audit/t76_fit'+(PHONE?'_m':'')+'.png'});
 // 6) help drawer + drawer names
 await p.evaluate(()=>{document.querySelector('#smore').click()});await p.waitForTimeout(300);log('menu has help',await p.evaluate(()=>!!document.querySelector('[data-smenu="shelp"]')));await p.evaluate(()=>{document.querySelector('[data-smenu="shelp"]').click()});await p.waitForTimeout(500);log('help',await p.evaluate(()=>({open:document.querySelector('#sdrawer').classList.contains('open'),n:document.querySelectorAll('#sdrawer .shelp p').length})));await p.screenshot({path:S+'/tests/audit/t76_help'+(PHONE?'_m':'')+'.png'});
 await p.evaluate(()=>openDrawer('top'));await p.waitForTimeout(1000);log('drawer names',await p.evaluate(()=>[...document.querySelectorAll('#dgrid .di .dn')].slice(0,3).map(e=>e.textContent)));await p.screenshot({path:S+'/tests/audit/t76_drawer'+(PHONE?'_m':'')+'.png'});
 // 7) jewelry hidden buttons
 await p.evaluate(()=>{closeDrawer();SSEL='jewelry';paintSel()});log('jw hidden btns',await p.evaluate(()=>['flip','raw','up','down'].map(a=>{const b=document.querySelector(`#ssel [data-sa="${a}"]`);return a+':'+(b?b.classList.contains('hide'):'none')})));
 // 8) album: old base head not stretched
 await p.evaluate(async()=>{ST.avbase='long';for(const s of Object.keys(ST.items))ST.tf[s]=await autoTf(s,ST.items[s]);await drawStudio();saveStudio()});await p.waitForTimeout(300);await p.evaluate(()=>{document.querySelector('#vn').value='לוק ישן';document.querySelector('#vcopy')?document.querySelector('#vcopy').click():document.querySelector('#vok').click()});await p.waitForTimeout(800);
 await p.evaluate(()=>{HSAVE=HIST.length;document.querySelector('#studio').close()});await p.evaluate(()=>openHub('album'));await p.waitForTimeout(2500);
 log('album heads',await p.evaluate(()=>[...document.querySelectorAll('#hbody .mst img.sh')].map(i=>{const r=i.getBoundingClientRect();const box=i.closest('.mst').getBoundingClientRect();return i.getAttribute('src').slice(3,20)+' h%='+Math.round(r.height/box.height*100)+' top='+Math.round(r.top-box.top)})));
 await p.screenshot({path:S+'/tests/audit/t76_album'+(PHONE?'_m':'')+'.png'});
 log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
