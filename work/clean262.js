// ===== v262 (Sara 27/10 22:03 "File storage – Full … מה אני עושה?"): the site keeps every picture it ever stored (5,000 files at most), and pictures replaced
// by a new cut stay in the store. "🧹 לפנות מקום" finds the pictures no item, style, look, setting or backup points at any more and deletes them – only when she presses it.
// Safe side: every collection is read whole (a collection too big to read stops the cleaning), the page itself and this browser's saved state count as in use,
// and anything stored in the last 3 hours stays (an upload may not be saved to its item yet).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v262 '+w+': '+(e&&(e.code||e.message)||e));
const toast_=m=>(window.toast||(()=>{}))(m);
const COLS=['items','styles','stylehide','r360','looks360','feedback','bgs','stylegrid','days234','backup83','settings','plan','looks','credits','shop187'];
const LOGS=['uplog'];   // logs: no picture ids, may be long
const HEX=/[0-9a-f]{32}/g,KEEP_MS=3*3600e3;
const add=(S,t)=>{(String(t||'').match(HEX)||[]).forEach(x=>S.add(x))};
async function scan(){const a=await claude.use('assets'),db=await claude.use('db');if(!a||!db)throw Object.assign(new Error('no access'),{code:'not_granted'});
 const L=await a.list(),used=new Set();
 const BK=[];for(const c of [...COLS,...LOGS]){const sn=await db.collection(c).limit(1000).get();
  if(sn.docs.length>=1000&&!LOGS.includes(c))throw Object.assign(new Error('too big: '+c),{code:'big'});
  sn.docs.forEach(d=>{add(used,d.id);if(c=='backup83'){BK.push({id:d.id,data:d.data()});return}try{add(used,JSON.stringify(d.data()))}catch(_){}})}
 // v272: the daily backups kept the 8 old files of everything that was packed into one picture (or cut again) for a whole week, so packing freed
 // nothing. An old file in a backup that is the SAME picture under its new name (same item, same GPT sheet src+t, same angle) is renamed in the backup
 // before the delete – a restore then brings back the very same item; everything else a backup points at stays.
 let SL={};try{const sn=await db.collection('slim272').limit(1000).get();sn.docs.forEach(d=>{const v=d.data();if(v&&typeof v.n=='string'&&/^[0-9a-f]{32}$/.test(v.n))SL[d.id]=v.n})}catch(_){}   // v273: sheets stored again light
 const MAP=bkMap(BK,SL),cur=new Set(used);for(const b of BK){const d=b.data||{};for(const k in d){const s=typeof d[k]=='string'?d[k]:JSON.stringify(d[k]);if(k!='items'){add(used,s);continue}(String(s).match(HEX)||[]).forEach(x=>{if(!(MAP[x]&&!cur.has(x)))used.add(x)})}}
 add(used,document.documentElement.innerHTML);
 try{for(let i=0;i<localStorage.length;i++)add(used,localStorage.getItem(localStorage.key(i)))}catch(_){}
 for(const g of ['IT','SET','LOOKS','PLAN','D'])try{add(used,JSON.stringify(window[g]||(typeof eval(g)!='undefined'?eval(g):null)))}catch(_){}
 const now=Date.now(),free=L.assets.filter(x=>!used.has(x.id)&&now-Date.parse(x.createdAt)>KEEP_MS);
 const have=new Set(L.assets.map(x=>x.id)),rn=free.filter(x=>MAP[x.id]),bad=rn.filter(x=>!have.has(String(MAP[x.id]).split('~')[0]));
 const F=bad.length?free.filter(x=>!bad.includes(x)):free;
 return {a,db,usage:L.usage,all:L.assets.length,free:F,bytes:F.reduce((s,x)=>s+(x.sizeBytes||0),0),BK,MAP,rn:rn.length-bad.length}}
// old name -> new name, from the backups' items next to today's items
function bkMap(BK,SL){SL=SL||{};const M=Object.assign({},SL),cur=(typeof IT=='object'&&IT)||{};
 const walk=(o,f)=>{if(!o||typeof o!='object')return;if(Array.isArray(o))return o.forEach(x=>walk(x,f));if(typeof o.src=='string'&&o.src&&Array.isArray(o.L))f(o);for(const k in o)walk(o[k],f)};
 for(const b of BK){let items=null;try{items=JSON.parse(b.data&&b.data.items||'null')}catch(_){}if(!items)continue;
  for(const id in items){const now=cur[id];if(!now)continue;const C=[];walk(now,o=>C.push(o));if(!C.length)continue;
   walk(items[id],o=>{const c=C.find(x=>x.src==(SL[o.src]||o.src)&&(x.t||0)==(o.t||0)&&x.L.length==o.L.length);if(!c)return;
    for(const key of ['L','M']){const A=o[key],B=c[key];if(!Array.isArray(A)||!Array.isArray(B)||A.length!=B.length)continue;
     A.forEach((x,i)=>{const y=B[i];if(typeof x=='string'&&/^[0-9a-f]{32}$/.test(x)&&typeof y=='string'&&y&&y!=x&&/^[0-9a-f]{32}(~[0-7])?$/.test(y))M[x]=y})}})}}
 return M}
// before deleting: rename the old files in the backups (only the 'items' text changes; a backup that can't be renamed keeps its files)
async function bkFix(sc){const ids=new Set(sc.free.map(x=>x.id)),keep=new Set();
 for(const b of sc.BK){let s=b.data&&b.data.items;if(typeof s!='string')continue;const hits=(s.match(HEX)||[]).filter(x=>ids.has(x)&&sc.MAP[x]);if(!hits.length)continue;
  for(const x of new Set(hits))s=s.split(x).join(sc.MAP[x]);
  try{await sc.db.collection('backup83').doc(b.id).update({items:s})}catch(e){ERR('bkfix',e);hits.forEach(x=>keep.add(x))}}
 return keep}
const mb=b=>Math.round(b/1048576);
let DL=null,RUN=false;
function dlg(){if(DL)return DL;DL=document.createElement('dialog');DL.id='cl262';DL.dir='rtl';DL.setAttribute('aria-labelledby','cl262t');document.body.appendChild(DL);
 DL.addEventListener('cancel',e=>{e.preventDefault();if(!RUN)DL.close()});DL.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.x!=null&&!RUN)return DL.close();if(b.dataset.go!=null)go()});return DL}
function show(h){const d=dlg();d.innerHTML=`<div class="mk"><div class="mkh"><h3 id="cl262t">🧹 לפנות מקום לתמונות</h3><button type="button" class="mkx" data-x aria-label="סגירה">✕</button></div>${h}</div>`;if(!d.open)d.showModal()}
let SC=null;   // last scan
async function open(){if(RUN)return show('<p class="cl262p">מוחקת… <b data-n></b></p>');show('<p class="cl262p">בודקת אילו תמונות עדיין בשימוש… (כחצי דקה)</p>');
 try{SC=await scan()}catch(e){ERR('scan',e);SC=null;show(`<p class="cl262p">${e.code=='not_granted'?'רק בעלת האתר יכולה לפנות מקום. לפתוח את האתר מהחשבון שלך.':e.code=='big'?'יש כאן יותר מדי נתונים לבדיקה בטוחה. כתבי לי ואני אפנה מקום.':'לא הצלחתי לבדוק. לנסות שוב בעוד רגע.'}</p>`);return}
 const u=SC.usage||{};
 show(`<p class="cl262p">שמורות עכשיו <b>${u.files||SC.all}</b> תמונות מתוך <b>${u.maxFiles||'?'}</b> (${mb(u.bytes||0)} מתוך ${mb(u.maxBytes||0)} MB).</p>
  ${SC.free.length?`<p class="cl262p"><b>${SC.free.length}</b> מהן ישנות ואף אחד כבר לא משתמש בהן – גזירות קודמות שהוחלפו, העלאות שלא נשמרו (${mb(SC.bytes)} MB).<br>כל מה שמופיע באתר נשאר: בגדים, אווטאר, קשירות, תסרוקות, איפורים, רקעים ולוקים.</p>
  <span class="mkb"><button type="button" class="mkp" data-go>🧹 למחוק ${SC.free.length} תמונות ישנות</button><button type="button" data-x>לא עכשיו</button></span>`
  :'<p class="cl262p">אין תמונות ישנות למחוק – הכול בשימוש. אפשר לבקש עוד מקום ("Request a higher limit").</p>'}${autoRow()}`)}
async function go(){if(RUN||!SC||!SC.free.length)return;RUN=true;let L=SC.free;const a=SC.a;if(SC.rn){const keep=await bkFix(SC);if(keep.size)L=L.filter(x=>!keep.has(x.id))}let n=0,bad=0,wait=0;show(`<p class="cl262p">מוחקת… <b data-n>0</b> מתוך ${L.length}. לא לסגור את הדף.</p><progress max="${L.length}" value="0"></progress>`);
 for(const x of L){for(let t=0;t<4;t++){try{await a.delete(x.id);n++;break}catch(e){if(e&&e.code=='rate_limited'||e&&e.code=='store_unavailable'){wait=Math.min(8000,(wait||800)*2);await new Promise(r=>setTimeout(r,wait));continue}bad++;ERR('del',e);break}}
  wait=Math.max(0,wait-200);const c=DL.querySelector('[data-n]');if(c)c.textContent=n;const p=DL.querySelector('progress');if(p)p.value=n+bad}
 RUN=false;SC=null;show(`<p class="cl262p">✓ נמחקו <b>${n}</b> תמונות ישנות. עכשיו יש מקום להעלות שוב.${bad?` (${bad} לא נמחקו)`:''}</p><span class="mkb"><button type="button" class="mkp" data-x>סגירה</button></span>`);
 toast_(`✓ פיניתי ${n} תמונות`);try{const x=document.getElementById('cl262b');if(x)x.remove();banner()}catch(_){}}
// ===== v303 (Sara 28/10 15:38 "אני לא יכולה כל פעם להיות בלחץ שנגמר לי המקום"): a switch she turns on once – "🔁 לנקות לבד כל יום". While it is on,
// the daily check (and any moment the store is full or nearly full, at most once an hour) deletes by itself exactly what "🧹 למחוק" would delete:
// files no item, style, look, setting or backup points at, older than 3 hours, after the backups are renamed (bkFix). Turning it on is her own
// press; it is kept in db 'cl302' doc 'auto' so it holds on every device, and the last run is written to doc 'last'.
let AUTO=null;const lsA=()=>{try{return localStorage.getItem('cl302')=='1'}catch(_){return false}};
async function autoOn(){if(AUTO!=null)return AUTO;AUTO=lsA();try{const db=await claude.use('db');if(db){const d=await db.collection('cl302').doc('auto').get();AUTO=!!(d.exists&&d.data()&&d.data().on);try{localStorage.setItem('cl302',AUTO?'1':'0')}catch(_){}}}catch(_){}return AUTO}
async function setAuto(on){AUTO=!!on;try{localStorage.setItem('cl302',on?'1':'0')}catch(_){}try{const db=await claude.use('db');if(db)await db.collection('cl302').doc('auto').set({on:!!on,t:Date.now()})}catch(e){ERR('auto',e)}
 toast_(on?'✓ מעכשיו האתר מפנה מקום לבד כל יום':'הניקוי האוטומטי כבוי');if(on)setTimeout(()=>autoRun(true).catch(()=>{}),1500)}
const autoRow=()=>`<label class="cl302"><input type="checkbox" data-cl302 ${(AUTO==null?lsA():AUTO)?'checked':''}> <span><b>🔁 לנקות לבד כל יום</b><small>האתר ימחק בעצמו רק תמונות ישנות שאף אחד לא משתמש בהן – בלי שתצטרכי לזכור</small></span></label>`;
let LASTAUTO=0;
async function autoRun(force){if(RUN||!(await autoOn()))return false;if(!force&&Date.now()-LASTAUTO<60*60e3)return false;LASTAUTO=Date.now();
 let r=null;try{r=await scan()}catch(e){if(e&&e.code!='not_granted')ERR('auto-scan',e);return false}
 if(!r||!r.free.length)return false;RUN=true;let L=r.free,n=0,bad=0,wait=0;
 try{if(r.rn){const keep=await bkFix(r);if(keep.size)L=L.filter(x=>!keep.has(x.id))}
  for(const x of L){for(let t=0;t<4;t++){try{await r.a.delete(x.id);n++;break}catch(e){if(e&&(e.code=='rate_limited'||e.code=='store_unavailable')){wait=Math.min(8000,(wait||800)*2);await new Promise(q=>setTimeout(q,wait));continue}bad++;ERR('auto-del',e);break}}wait=Math.max(0,wait-200)}}
 finally{RUN=false;SC=null}
 try{const db=await claude.use('db');if(db)await db.collection('cl302').doc('last').set({t:Date.now(),n,bad,before:r.usage&&r.usage.files||0})}catch(_){}
 if(n){window.STOREFULL=0;toast_(`🧹 פיניתי לבד ${n} תמונות ישנות`)}try{const x=document.getElementById('cl262b');if(x)x.remove();banner()}catch(_){}return n>0}
document.addEventListener('change',e=>{const t=e.target;if(t&&t.matches&&t.matches('[data-cl302]'))setAuto(t.checked)});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-cl302on]');if(!b)return;e.preventDefault();setAuto(true)},true);
window.clean262=open;window.clean262b=()=>banner().catch(()=>{});
// a line at the top when the store is (nearly) full, and in the admin panel
async function banner(){let u=null;try{const a=await claude.use('assets');if(!a)return;u=(await a.list()).usage}catch(_){return}
 const full=u&&((u.maxFiles&&u.files>=u.maxFiles-300)||(u.maxBytes&&u.bytes>=u.maxBytes*.93));let b=document.getElementById('cl262b');
 if(!full){if(b&&!b.dataset.d)b.remove();return}
 if(!b){b=document.createElement('div');b.id='cl262b';b.setAttribute('role','status');document.body.appendChild(b)}
 if(await autoOn()&&!RUN){autoRun(false).catch(()=>{})}
 delete b.dataset.d;b.innerHTML=`<span>📦 המקום לתמונות ${u.files>=u.maxFiles?'מלא':'כמעט מלא'} (${u.files} מתוך ${u.maxFiles})${RUN?' – מפנה מקום לבד…':''}</span><span class="cl262bb"><button type="button" data-cl262>🧹 לפנות מקום</button>${AUTO?'':'<button type="button" data-cl302on>🔁 שינקה לבד כל יום</button>'}</span>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-cl262]');if(!b)return;e.preventDefault();open()},true);
// v263 (Sara 22:21 "מנגנון כל יום לבדוק האם יש קובץ מיותר ולהוריד אותם"): once a day, a minute after the site opens, it checks by itself (reading only).
// When it finds files nothing uses, a bar offers "🧹 לנקות" – the delete itself always waits for her press (deleting is final).
const today=()=>new Date().toISOString().slice(0,10);
const lsG=k=>{try{return localStorage.getItem(k)}catch(_){return null}},lsS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
async function daily(){if(RUN)return;if(await autoOn()){if(lsG('cl262d')!=today()){lsS('cl262d',today());await autoRun(true)}return}if(lsG('cl262d')==today())return;let r=null;try{r=await scan()}catch(e){if(e&&e.code!='not_granted')ERR('daily',e);return}lsS('cl262d',today());
 if(!r||r.free.length<10)return;if(!SC)SC=r;let b=document.getElementById('cl262b');if(b&&!b.dataset.d)return;
 if(!b){b=document.createElement('div');b.id='cl262b';b.dataset.d='1';b.setAttribute('role','status');document.body.appendChild(b)}
 b.innerHTML=`<span>🧹 הבדיקה היומית: ${r.free.length} קבצים ישנים שאף אחד לא משתמש בהם</span><span class="cl262bb"><button type="button" data-cl262>🧹 לנקות</button><button type="button" data-cl302on>🔁 שינקה לבד כל יום</button><button type="button" class="cl262no" data-cl262no>אחר כך</button></span>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-cl262no]');if(!b)return;const x=document.getElementById('cl262b');if(x)x.remove()});
setTimeout(()=>daily().catch(()=>{}),60000);setInterval(()=>daily().catch(()=>{}),60*60e3);
setTimeout(()=>banner().catch(()=>{}),8000);setInterval(()=>banner().catch(()=>{}),10*60e3);
// admin panel: a button with the tools
setInterval(()=>{const d=document.querySelector('#ad172 .ad172h');/* v279: only the admin panel's header (it went into the tasks window and pushed it sideways) */if(!d||d.querySelector('[data-cl262]'))return;d.insertAdjacentHTML('beforeend','<button type="button" class="cl262a" data-cl262>🧹 לפנות מקום לתמונות</button>')},1500);
})();
