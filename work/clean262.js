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
 for(const c of [...COLS,...LOGS]){const sn=await db.collection(c).limit(1000).get();
  if(sn.docs.length>=1000&&!LOGS.includes(c))throw Object.assign(new Error('too big: '+c),{code:'big'});
  sn.docs.forEach(d=>{add(used,d.id);try{add(used,JSON.stringify(d.data()))}catch(_){}})}
 add(used,document.documentElement.innerHTML);
 try{for(let i=0;i<localStorage.length;i++)add(used,localStorage.getItem(localStorage.key(i)))}catch(_){}
 for(const g of ['IT','SET','LOOKS','PLAN','D'])try{add(used,JSON.stringify(window[g]||(typeof eval(g)!='undefined'?eval(g):null)))}catch(_){}
 const now=Date.now(),free=L.assets.filter(x=>!used.has(x.id)&&now-Date.parse(x.createdAt)>KEEP_MS);
 return {a,usage:L.usage,all:L.assets.length,free,bytes:free.reduce((s,x)=>s+(x.sizeBytes||0),0)}}
const mb=b=>Math.round(b/1048576);
let DL=null,RUN=false;
function dlg(){if(DL)return DL;DL=document.createElement('dialog');DL.id='cl262';DL.dir='rtl';DL.setAttribute('aria-labelledby','cl262t');document.body.appendChild(DL);
 DL.addEventListener('cancel',e=>{e.preventDefault();if(!RUN)DL.close()});DL.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.x!=null&&!RUN)return DL.close();if(b.dataset.go!=null)go()});return DL}
function show(h){const d=dlg();d.innerHTML=`<div class="mk"><div class="mkh"><h3 id="cl262t">🧹 לפנות מקום לתמונות</h3><button type="button" class="mkx" data-x aria-label="סגירה">✕</button></div>${h}</div>`;if(!d.open)d.showModal()}
let SC=null;
async function open(){if(RUN)return show('<p class="cl262p">מוחקת… <b data-n></b></p>');show('<p class="cl262p">בודקת אילו תמונות עדיין בשימוש… (כחצי דקה)</p>');
 try{SC=await scan()}catch(e){ERR('scan',e);SC=null;show(`<p class="cl262p">${e.code=='not_granted'?'רק בעלת האתר יכולה לפנות מקום. לפתוח את האתר מהחשבון שלך.':e.code=='big'?'יש כאן יותר מדי נתונים לבדיקה בטוחה. כתבי לי ואני אפנה מקום.':'לא הצלחתי לבדוק. לנסות שוב בעוד רגע.'}</p>`);return}
 const u=SC.usage||{};
 show(`<p class="cl262p">שמורות עכשיו <b>${u.files||SC.all}</b> תמונות מתוך <b>${u.maxFiles||'?'}</b> (${mb(u.bytes||0)} מתוך ${mb(u.maxBytes||0)} MB).</p>
  ${SC.free.length?`<p class="cl262p"><b>${SC.free.length}</b> מהן ישנות ואף אחד כבר לא משתמש בהן – גזירות קודמות שהוחלפו, העלאות שלא נשמרו (${mb(SC.bytes)} MB).<br>כל מה שמופיע באתר נשאר: בגדים, אווטאר, קשירות, תסרוקות, איפורים, רקעים ולוקים.</p>
  <span class="mkb"><button type="button" class="mkp" data-go>🧹 למחוק ${SC.free.length} תמונות ישנות</button><button type="button" data-x>לא עכשיו</button></span>`
  :'<p class="cl262p">אין תמונות ישנות למחוק – הכול בשימוש. אפשר לבקש עוד מקום ("Request a higher limit").</p>'}`)}
async function go(){if(RUN||!SC||!SC.free.length)return;RUN=true;const L=SC.free,a=SC.a;let n=0,bad=0,wait=0;show(`<p class="cl262p">מוחקת… <b data-n>0</b> מתוך ${L.length}. לא לסגור את הדף.</p><progress max="${L.length}" value="0"></progress>`);
 for(const x of L){for(let t=0;t<4;t++){try{await a.delete(x.id);n++;break}catch(e){if(e&&e.code=='rate_limited'||e&&e.code=='store_unavailable'){wait=Math.min(8000,(wait||800)*2);await new Promise(r=>setTimeout(r,wait));continue}bad++;ERR('del',e);break}}
  wait=Math.max(0,wait-200);const c=DL.querySelector('[data-n]');if(c)c.textContent=n;const p=DL.querySelector('progress');if(p)p.value=n+bad}
 RUN=false;SC=null;show(`<p class="cl262p">✓ נמחקו <b>${n}</b> תמונות ישנות. עכשיו יש מקום להעלות שוב.${bad?` (${bad} לא נמחקו)`:''}</p><span class="mkb"><button type="button" class="mkp" data-x>סגירה</button></span>`);
 toast_(`✓ פיניתי ${n} תמונות`);try{banner()}catch(_){}}
window.clean262=open;
// a line at the top when the store is (nearly) full, and in the admin panel
async function banner(){let u=null;try{const a=await claude.use('assets');if(!a)return;u=(await a.list()).usage}catch(_){return}
 const full=u&&((u.maxFiles&&u.files>=u.maxFiles-150)||(u.maxBytes&&u.bytes>=u.maxBytes*.93));let b=document.getElementById('cl262b');
 if(!full){if(b)b.remove();return}
 if(!b){b=document.createElement('div');b.id='cl262b';b.setAttribute('role','status');document.body.appendChild(b)}
 b.innerHTML=`<span>📦 המקום לתמונות ${u.files>=u.maxFiles?'מלא':'כמעט מלא'} (${u.files} מתוך ${u.maxFiles})</span><button type="button" data-cl262>🧹 לפנות מקום</button>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-cl262]');if(!b)return;e.preventDefault();open()},true);
setTimeout(()=>banner().catch(()=>{}),8000);setInterval(()=>banner().catch(()=>{}),10*60e3);
// admin panel: a button with the tools
setInterval(()=>{const d=document.querySelector('.ad172h');if(!d||d.querySelector('[data-cl262]'))return;d.insertAdjacentHTML('beforeend','<button type="button" class="cl262a" data-cl262>🧹 לפנות מקום לתמונות</button>')},1500);
})();
