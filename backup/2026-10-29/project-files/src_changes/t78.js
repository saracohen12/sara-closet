// v68 audit: item dialog (clothing with 5 poses / jewelry / scarf), looks tab, compare – phone screenshots + errors
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]!='desktop';const fs=require('fs');
const DBI={};for(const f of fs.readdirSync(S+'/dbq/items')){if(!f.endsWith('.json')||f.includes('_new'))continue;const d=JSON.parse(fs.readFileSync(S+'/dbq/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const OUT=S+'/tests/audit/t78'+(PHONE?'_m':'')+'/';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGE:'+e.message));
 await p.addInitScript(()=>{window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(d=>{Object.assign(IT,d);try{paintAll()}catch(e){}},DBI);await p.waitForTimeout(300);
 const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
 const overflow=()=>p.evaluate(()=>{const W=innerWidth;const bad=[];document.querySelectorAll('#dlg *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>W+2&&getComputedStyle(e).position!='fixed')bad.push(e.tagName+'.'+String(e.className).slice(0,24)+' +'+Math.round(r.right-W))});return {n:bad.length,first:bad.slice(0,5),scrollW:document.querySelector('#dlg .dlwrap')?.scrollWidth,W}});
 for(const [id,tag] of [['T1','p5g'],['T208','jw'],['S11QS_6','ties'],['T0','plain']]){await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(900);
  const info=await p.evaluate(()=>{const b=document.querySelector('#dlbody');const q=s=>!!b.querySelector(s);return {p5gbox:q('.p5gbox'),jwbox:q('.jwbox'),tiesbox:q('.tiesbox'),dmore:q('details.dmore'),dmoreOpen:b.querySelector('details.dmore')?.open,btns:[...b.querySelectorAll('.p5gbox .ib button,.jwbox .ib button,.tiesbox .ib button')].map(x=>x.textContent.trim().slice(0,18)),h:document.querySelector('#dlg .dlwrap')?.scrollHeight}});
  log(id,tag,info,await overflow());await p.screenshot({path:OUT+`item_${tag}.png`,fullPage:false});
  // scroll the dialog to the tools and shoot again
  await p.evaluate(()=>{const el=document.querySelector('#dlbody .p5gbox,#dlbody .jwbox,#dlbody .tiesbox,#dlbody [data-imgrow]');if(el)el.scrollIntoView({block:'start'})});await p.waitForTimeout(300);await p.screenshot({path:OUT+`item_${tag}_tools.png`});
  await p.evaluate(()=>document.querySelector('#dlg').close())}
 await p.evaluate(()=>openHub('looks'));await p.waitForTimeout(1500);await p.screenshot({path:OUT+'hub_looks.png'});log('looks',await p.evaluate(()=>({gen:document.querySelectorAll('#hlooks .look').length,big:!!document.querySelector('#bigstudio'),errs:(window.ERRS||[]).splice(0)})));
 await p.evaluate(()=>{const b=document.querySelector('#hgen');if(b)b.click()});await p.waitForTimeout(1500);await p.screenshot({path:OUT+'hub_gen.png'});log('gen',await p.evaluate(()=>({gen:document.querySelectorAll('#hlooks .look').length,try:document.querySelectorAll('#hlooks [data-studio]').length,errs:(window.ERRS||[]).splice(0)})));
 await p.evaluate(()=>{const b=document.querySelector('#hlooks [data-studio]');if(b)b.click()});await p.waitForTimeout(1500);log('gen→studio',await p.evaluate(()=>({open:document.querySelector('#studio').open,items:ST&&Object.keys(ST.items),errs:(window.ERRS||[]).splice(0)})));await p.screenshot({path:OUT+'gen_studio.png'});
 await p.evaluate(()=>{HSAVE=HIST.length;document.querySelector('#studio').close()});
 log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
