// ===== v172: "⚙️ פאנל ניהול" (Sara 25/10: "תבנה לי בבקשה פאנל ניהול")
// one screen: the numbers of the closet, what is waiting for her (each line opens the right place), and every tool of the site by topic
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v172 '+w+': '+(e&&e.message||e));
const st=document.createElement('style');st.textContent=`
#ad172{width:min(760px,100vw);max-width:100vw;height:100dvh;max-height:100dvh;margin:0 auto;padding:0;border:0;border-radius:0;background:var(--bg,#faf7f2)}
@media(min-width:701px){#ad172{height:auto;max-height:92dvh;margin:4dvh auto;border-radius:22px}}
#ad172::backdrop{background:rgba(30,20,10,.35)}
.ad172h{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:14px 16px 10px;background:var(--bg,#faf7f2);border-bottom:1px solid var(--line)}
.ad172h h3{margin:0;flex:1;font-size:1.25rem}.ad172h small{display:block;color:var(--muted);font-size:.8rem;font-weight:400}
.ad172h button{font:inherit;width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:#fff;cursor:pointer;font-size:1.1rem}
.ad172b{padding:12px 16px 28px}
.ad172s{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
@media(max-width:420px){.ad172s{grid-template-columns:repeat(2,minmax(0,1fr))}}
.ad172s button{display:flex;flex-direction:column;align-items:flex-start;font:inherit;text-align:start;padding:12px;border-radius:16px;border:0;background:#fff;box-shadow:var(--shadow);cursor:pointer;min-width:0}
.ad172s b{font-size:1.35rem;font-weight:800;line-height:1.1}.ad172s span{font-size:.76rem;color:var(--muted)}
.ad172g{margin:20px 2px 8px;font-size:.95rem;color:var(--muted);font-weight:700}
.ad172w{display:flex;flex-direction:column;gap:6px}
.ad172w button{display:flex;align-items:center;gap:10px;font:inherit;text-align:start;padding:11px 14px;border-radius:14px;border:1px solid var(--line);background:#fff;cursor:pointer}
.ad172w button i{font-style:normal;font-size:1.1rem;width:30px;text-align:center;flex:none}
.ad172w button span{flex:1;min-width:0}
.ad172w button b{flex:none;min-width:30px;text-align:center;font-size:.85rem;padding:3px 9px;border-radius:999px;background:#f6f1ea}
.ad172w button.hot b{background:#ffe1d6;color:#a3361b}
.ad172w p{margin:0;padding:12px 14px;border-radius:14px;background:#eef6ef;color:#2f6b3a}
.ad172t{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
@media(min-width:701px){.ad172t{grid-template-columns:repeat(4,minmax(0,1fr))}}
.ad172t button{display:flex;flex-direction:column;align-items:center;gap:4px;font:inherit;font-size:.8rem;line-height:1.25;text-align:center;padding:12px 6px;border-radius:16px;border:1px solid var(--line);background:#fff;cursor:pointer;min-width:0}
.ad172t button i{font-style:normal;font-size:1.35rem}
.ad172f{margin-top:22px;color:var(--muted);font-size:.78rem;text-align:center}
.h9adm{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;margin-top:10px;font:inherit;font-weight:700;padding:13px 16px;border-radius:18px;border:1px solid var(--line);background:var(--card,#fff);box-shadow:var(--shadow);cursor:pointer;color:var(--fg)}
.h9adm small{font-weight:600;font-size:.8rem;color:#a3361b;background:#ffe9e1;padding:3px 10px;border-radius:999px}.h9adm small:empty{display:none}
.h9cta .h9adm{margin-top:0;white-space:nowrap;padding:12px 16px}`;
document.head.appendChild(st);

const $1=s=>document.querySelector(s);
const shut=()=>{document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});document.body.style.overflow=''};
const fire=attr=>{const b=document.createElement('button');b.setAttribute(attr,'');b.hidden=true;document.body.appendChild(b);b.click();b.remove()};
const tap=sel=>{const b=$1(sel);if(b){b.click();return true}return false};
const hub=t=>()=>{shut();openHub(t)};
const gen=id=>typeof gen161=='function'&&gen161(id);
const live=id=>{const s=(IT[id]||{}).s;return s!='ret'&&s!='give'};
// show the closet with one filter of the site's "רק" filter
function only(v){shut();try{FLF=v;const s=$1('#flf');if(s)s.value=v;G='all';C='';document.querySelectorAll('.groups button').forEach(o=>o.setAttribute('aria-pressed',false));const q=$1('#q');if(q)q.value='';apply();try{chips()}catch(_){}}catch(e){ERR('only',e)}
 setTimeout(()=>{const el=$1('#cnt');if(el){const y=el.getBoundingClientRect().top+scrollY-140;try{LOCK=Date.now()+1200}catch(_){}window.scrollTo(0,Math.max(0,y))}},80)}

function counts(){const ids=Object.keys(D);const r={};
 r.items=ids.length;r.orders=new Set(ids.map(id=>D[id].order).filter(Boolean)).size;
 r.ok=0;r.avno=0;ids.forEach(id=>{let s='';try{s=avStat(id)}catch(_){}if(s=='ok')r.ok++;else if(s=='no'&&live(id))r.avno++});
 r.gen=Object.keys(IT||{}).filter(gen).length;
 r.transit=new Set(ids.filter(id=>D[id].transit&&!(ORD[D[id].order]||{}).arrived&&(IT[id]||{}).got!='y').map(id=>D[id].order)).size;
 r.soon=ids.filter(id=>{const n=daysLeft(D[id].rdl);return n!=null&&n>=0&&n<=14&&live(id)&&(IT[id]||{}).s!='kept'}).length;
 r.refund=ids.filter(id=>(IT[id]||{}).s=='ret'&&!(IT[id]||{}).refunded).length;
 r.fix=ids.filter(id=>(IT[id]||{}).fix).length;r.nofit=ids.filter(id=>(IT[id]||{}).nofit).length;
 r.unm=ids.filter(id=>!(IT[id]||{}).s).length;
 try{r.dups=+(($1('[data-dg89open] b')||{}).textContent||0)||0}catch(_){r.dups=0}
 try{r.alerts=getAlerts().filter(a=>a.lvl>=2).length}catch(_){r.alerts=0}
 return r}

// [icon, text, count key, hot?, action]
const WAIT=[
 ['🔔','התראות חשובות','alerts',1,()=>{shut();openAlerts()}],
 ['⏰','אפשר להחזיר עוד עד שבועיים','soon',1,()=>{shut();try{const so=$1('#sort');if(so&&so.value!='ret'){so.value='ret';so.dispatchEvent(new Event('change'))}}catch(_){}only(FLF||'');setTimeout(()=>toast('הארון מסודר לפי תאריך ההחזרה, הכי דחוף למעלה'),200)}],
 ['💸','החזרתי ועוד לא סימנתי שהכסף חזר','refund',1,hub('money')],
 ['🚚','הזמנות שעוד בדרך','transit',0,()=>{shut();openOrders123()}],
 ['🧍‍♀️','בגדים שעוד אין להם תמונות לאווטאר','avno',0,()=>{shut();openMiss77()}],
 ['✂','מחכים לתופרת','fix',0,()=>only('fix')],
 ['📏','לא במידה','nofit',0,()=>only('nofit')],
 ['👯','כפולים','dups',0,()=>{shut();openDups89()}],
];
const TOOLS=[
 ['הארון',[['👗','הארון שלי',()=>{shut();openCloset163()}],['🗃','רשימה כללית',()=>{shut();openGen161()}],['👯','גלריית כפולים',()=>{shut();openDups89()}],['☑','בחירה מרובה',()=>{shut();tap('[data-sel83]')}],['✂','פירוק סטים',()=>{shut();openSplit85()}],['🏠','סדר בבית',hub('home')],['🎚','סינון',()=>{shut();tap('#fb')}]]],
 ['הזמנות וכסף',[['📦','ההזמנות שלי',()=>{shut();openOrders123()}],['💰','החזרות וקרדיטים',hub('money')],['📊','תובנות והוצאות',hub('insights')],['🔎','לפני הזמנה',hub('check')]]],
 ['לוקים',[['👗','בניית לוק',()=>{shut();openStudio()}],['✨','הלוקים שלי',hub('looks')],['♥','האלבום',hub('album')],['📅','לוח שבועי',hub('week')]]],
 ['אווטאר ותמונות',[['🧍‍♀️','מה חסר לאווטאר',()=>{shut();openMiss77()}],['⬆','העלאת כמה גיליונות',()=>{shut();window.openBU83?openBU83():fire('data-bu83open')}],['🔍','בדיקת כל התנוחות',()=>{shut();openQA83()}],['📋','פרומטים ל-GPT',()=>{shut();openPrompts80()}]]],
 ['מערכת',[['💾','גיבוי לקובץ',()=>fire('data-bk83')],['🛠','משהו לא עובד',()=>{shut();openBug77()}],['❓','איך משתמשים',()=>{shut();tap('#helpb')}]]],
];
const ACT={};
function open172(){let d=$1('#ad172');if(!d){d=document.createElement('dialog');d.id='ad172';d.dir='rtl';document.body.appendChild(d)}
 let r={};try{r=counts()}catch(e){ERR('counts',e)}
 let k=0;const reg=f=>{const id='a'+(k++);ACT[id]=f;return id};
 const w=WAIT.filter(x=>r[x[2]]>0);const ver=(($1('#ver')||{}).textContent||'').trim();
 d.innerHTML=`<div class="ad172h"><h3>⚙️ פאנל ניהול<small>כל מה שקורה בארון, במקום אחד</small></h3><button data-ad172x aria-label="סגירה">✕</button></div><div class="ad172b">
  <div class="ad172s"><button data-ad172="${reg(()=>{shut();openCloset163()})}"><b>${r.items||0}</b><span>פריטים בארון</span></button><button data-ad172="${reg(()=>{shut();openOrders123()})}"><b>${r.orders||0}</b><span>הזמנות</span></button><button data-ad172="${reg(()=>only('avok'))}"><b>${r.ok||0}</b><span>מוכנים לאווטאר</span></button><button data-ad172="${reg(()=>{shut();openGen161()})}"><b>${r.gen||0}</b><span>ברשימה הכללית</span></button></div>
  <div class="ad172g">מה מחכה לך</div><div class="ad172w">${w.map(x=>`<button class="${x[3]?'hot':''}" data-ad172="${reg(x[4])}"><i>${x[0]}</i><span>${x[1]}</span><b>${r[x[2]]}</b></button>`).join('')||'<p>✓ אין כרגע שום דבר שמחכה לך</p>'}</div>
  ${TOOLS.map(([g,L])=>`<div class="ad172g">${g}</div><div class="ad172t">${L.map(t=>`<button data-ad172="${reg(t[2])}"><i>${t[0]}</i>${t[1]}</button>`).join('')}</div>`).join('')}
  <div class="ad172f">${ver}</div></div>`;
 if(!d.open)d.showModal();d.scrollTop=0}
window.openAdmin172=open172;

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-ad172],[data-ad172x],[data-ad172open]');if(!t)return;e.preventDefault();e.stopPropagation();const ds=t.dataset;
 try{if(ds.ad172open!==undefined){shut();return open172()}if(ds.ad172x!==undefined)return $1('#ad172').close();const f=ACT[ds.ad172];if(f)f()}catch(err){ERR('click',err);toast('לא הצלחתי לפתוח. נסי שוב')}},true);

// ways in: a wide button at the top of the home screen, under "ההזמנות שלי" / "מוצרים להחזרה" (with how many things wait), the "⋯" menu
function entry(){try{const cta=$1('.h9cta')||$1('.h9hero');if(cta){let b=$1('.h9adm');if(!b){b=document.createElement('button');b.type='button';b.className='h9adm';b.setAttribute('data-ad172open','');b.innerHTML='<span>⚙️ פאנל ניהול</span><small></small>'}
  const after=$1('#ret152b')||$1('#ord123b');if(after&&after.parentNode==cta){if(after.nextSibling!==b)after.after(b)}else if(b.parentNode!==cta)cta.appendChild(b)
  let n=0;try{n=getAlerts().filter(a=>a.lvl>=2).length}catch(_){}b.querySelector('small').textContent=n?`🔔 ${n}`:''}
 const e7=$1('#more9 .e77');if(e7&&!e7.querySelector('[data-ad172open]'))e7.insertAdjacentHTML('afterbegin','<button data-ad172open>⚙️ פאנל ניהול</button>')}catch(e){ERR('entry',e)}}
setTimeout(entry,800);setTimeout(entry,2500);setInterval(entry,5000);
})();
