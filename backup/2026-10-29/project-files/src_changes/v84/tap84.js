// phone: open a screen, then really TAP each visible button (touch at its centre) and see whether anything happens
const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const ONLY=process.argv[3]||'';
const ITEMS={};for(const f of fs.readdirSync(S+'/dbq3/items')){const d=JSON.parse(fs.readFileSync(S+'/dbq3/items/'+f,'utf8'));delete d.version;ITEMS[f.replace('.json','')]=d.data||d}
const BAD=/מחק|מחקי|הסירי הכל|הסר|🗑|איפוס|לאפס|העלי|העלאה|📤|📷|הורד|שיתוף|הדפס|📋|העתק|הדביקי|ייבוא|קובץ|גיבוי|🎙|🎤|בחירת גיליונות|נקי הכל|סיימתי/;
const SCREENS={home:'scrollTo(0,0)',more:`document.querySelector('[data-h9=more]').click()`,item:`openItem('T147')`,alerts:`openAlerts()`,
 hub:`openHub('looks')`,studio:`openStudio(null,{top:'T147'})`,smenu:`(async()=>{await openStudio(null,{top:'T147'});const b=[...document.querySelectorAll('#studio button')].find(x=>/עוד/.test(x.textContent)&&x.offsetParent);b&&b.click()})()`,miss:`openMiss77()`,filter:`document.querySelector('#fb').click()`};
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['Pixel 7'],hasTouch:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(I=>{Object.assign(IT,I);paintAll()},ITEMS);await p.waitForTimeout(1500);
const reset=async js=>{await p.evaluate(()=>{document.querySelectorAll('dialog[open]').forEach(d=>d.close());const pn=document.querySelector('#panel');if(pn&&!pn.classList.contains('hide'))document.querySelector('#fb').click();scrollTo(0,0)});await p.waitForTimeout(250);await p.evaluate(js).catch(()=>{});await p.waitForTimeout(1300)};
const snap=()=>p.evaluate(()=>{const ds=[...document.querySelectorAll('dialog[open]')].map(d=>d.id);const t=ds.length?document.getElementById(ds[ds.length-1]):document.body;return JSON.stringify([ds,scrollY,document.body.className,location.hash,t.innerHTML.length,t.scrollTop,(document.querySelector('#toast')||{}).textContent,document.activeElement&&document.activeElement.tagName,[...document.querySelectorAll('[aria-pressed=true]')].length,[...document.querySelectorAll('details[open]')].length])});
for(const [n,js] of Object.entries(SCREENS)){if(ONLY&&n!=ONLY)continue;await reset(js);
 const mark=B=>{const ds=[...document.querySelectorAll('dialog[open]')];const top=ds.length?ds[ds.length-1]:document.body;const re=new RegExp(B);
  return [...top.querySelectorAll('button,a[href],summary,label.go,[role=button],select')].filter(e=>e.getClientRects().length&&(ds.length||!e.closest('dialog'))&&!re.test(e.textContent+(e.getAttribute('aria-label')||''))).map((e,i)=>{e.dataset.t84=i;return [i,(e.textContent||e.getAttribute('aria-label')||e.id||e.className).trim().replace(/\s+/g,' ').slice(0,26)]})};
 const list=await p.evaluate(B=>{const ds=[...document.querySelectorAll('dialog[open]')];const top=ds.length?ds[ds.length-1]:document.body;const re=new RegExp(B);
  return [...top.querySelectorAll('button,a[href],summary,label.go,[role=button],select')].filter(e=>e.getClientRects().length&&(ds.length||!e.closest('dialog'))&&!re.test(e.textContent+(e.getAttribute('aria-label')||''))).map((e,i)=>{e.dataset.t84=i;return [i,(e.textContent||e.getAttribute('aria-label')||e.id||e.className).trim().replace(/\s+/g,' ').slice(0,26)]})},BAD.source);
 let dead=[],cov=[],n2=0;
 for(const [i,lbl] of list.slice(0,70)){await reset(js);await p.evaluate(`(${mark.toString()})(${JSON.stringify(BAD.source)})`);const ok=await p.evaluate(i=>{const e=document.querySelector(`[data-t84="${i}"]`);if(!e)return null;e.scrollIntoView({block:'center',inline:'center',behavior:'instant'});return 1},i);if(!ok)continue;await p.waitForTimeout(150);
  const box=await p.evaluate(i=>{const e=document.querySelector(`[data-t84="${i}"]`);if(!e)return null;const r=e.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const h=document.elementFromPoint(x,y);return {x,y,hit:!!h&&(e==h||e.contains(h)),h:h?h.tagName+'.'+String(h.className).slice(0,24)+' '+(h.textContent||'').trim().slice(0,14):'none',tag:e.tagName}},i);
  if(!box)continue;if(box.x<0||box.y<0||box.x>412||box.y>915){cov.push([lbl,'off',Math.round(box.x),Math.round(box.y)]);continue}
  if(!box.hit)cov.push([lbl,box.h]);
  if(box.tag=='SELECT')continue;
  const s0=await snap();await p.touchscreen.tap(box.x,box.y);await p.waitForTimeout(900);const s1=await snap();n2++;if(s0==s1)dead.push(lbl)}
 console.log('==',n,'tapped',n2,'of',list.length);if(cov.length)console.log('  COVERED/OFF',JSON.stringify(cov));if(dead.length)console.log('  NO REACTION',JSON.stringify(dead))}
console.log('ERR',errs.slice(0,8));await b.close()})();
