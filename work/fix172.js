// ===== v172–v173: "⚙️ פאנל ניהול" (Sara 25/10: "תבנה לי בבקשה פאנל ניהול"; v173: "גם כל הפרומטים וכל התוכנית למשימות")
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
.ad172t a,.ad172t button{display:flex;flex-direction:column;align-items:center;gap:4px;font:inherit;font-size:.8rem;line-height:1.25;text-align:center;padding:12px 6px;border-radius:16px;border:1px solid var(--line);background:#fff;cursor:pointer;min-width:0}
.ad172t a{color:inherit;text-decoration:none}.ad172t a i,.ad172t button i{font-style:normal;font-size:1.35rem}
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
 // v186: the avatar is the 360 one now – count what is on it (the old doll's numbers were misleading)
 try{if(window.R360){const [a,b]=R360.readyCount();r.ok=a;r.avno=Math.max(0,b-a)}}catch(_){}
 r.gen=Object.keys(IT||{}).filter(gen).length;
 r.transit=new Set(ids.filter(id=>D[id].transit&&!(ORD[D[id].order]||{}).arrived&&(IT[id]||{}).got!='y').map(id=>D[id].order)).size;
 r.soon=ids.filter(id=>{const n=daysLeft(D[id].rdl);return n!=null&&n>=0&&n<=14&&live(id)&&(IT[id]||{}).s!='kept'}).length;
 r.refund=ids.filter(id=>(IT[id]||{}).s=='ret'&&!(IT[id]||{}).refunded).length;
 // v175: cancelled by the shop (out of stock, orders thread v174) and the money didn't come back yet
 r.oosw=ids.filter(id=>(IT[id]||{}).oos&&!(IT[id]||{}).refunded).length;
 r.fix=ids.filter(id=>(IT[id]||{}).fix).length;r.nofit=ids.filter(id=>(IT[id]||{}).nofit).length;
 r.unm=ids.filter(id=>!(IT[id]||{}).s).length;
 try{r.dups=+(($1('[data-dg89open] b')||{}).textContent||0)||0}catch(_){r.dups=0}
 try{r.alerts=getAlerts().filter(a=>a.lvl>=2).length}catch(_){r.alerts=0}
 r.tkwait=(window.TASKS172||[]).filter(t=>t.s=='wait').length;
 return r}

// [icon, text, count key, hot?, action]
const WAIT=[
 ['🔔','התראות חשובות','alerts',1,()=>{shut();openAlerts()}],
 ['⏰','אפשר להחזיר עוד עד שבועיים','soon',1,()=>{shut();try{const so=$1('#sort');if(so&&so.value!='ret'){so.value='ret';so.dispatchEvent(new Event('change'))}}catch(_){}only(FLF||'');setTimeout(()=>toast('הארון מסודר לפי תאריך ההחזרה, הכי דחוף למעלה'),200)}],
 ['💸','החזרתי ועוד לא סימנתי שהכסף חזר','refund',1,hub('money')],
 ['🚫','בוטלו (אזל מהמלאי) והכסף עוד לא חזר','oosw',1,()=>{shut();openOrders123();setTimeout(()=>{const c=document.querySelector('[data-o3f="oos"]');if(c&&c.getAttribute('aria-pressed')!='true')c.click()},120)}],
 ['🚚','הזמנות שעוד בדרך','transit',0,()=>{shut();openOrders123()}],
 ['🧍‍♀️','בגדים שעוד לא על האווטאר 360','avno',0,()=>{shut();window.R360?R360.prompts():openMiss77()}],
 ['✂','מחכים לתופרת','fix',0,()=>only('fix')],
 ['📏','לא במידה','nofit',0,()=>only('nofit')],
 ['👯','כפולים','dups',0,()=>{shut();openDups89()}],
 ['📝','משימות שמחכות לך (תמונות, קבצים, אישורים)','tkwait',0,()=>{TKF='wait';openTasks172()}],
];
const TOOLS=[
 ['הארון',[['👗','הארון שלי',()=>{shut();openCloset163()}],['🗃','רשימה כללית',()=>{shut();openGen161()}],['📊','פרטים נוספים (מספרים וסיכומים)',()=>{shut();tap('.h9tiles [data-h9="more"]')}],['👯','גלריית כפולים',()=>{shut();openDups89()}],['☑','בחירה מרובה',()=>{shut();tap('[data-sel83]')}],['✂','פירוק סטים',()=>{shut();openSplit85()}],['🏠','סדר בבית',hub('home')],['🎚','סינון',()=>{shut();tap('#fb')}]]],
 ['הזמנות וכסף',[['📦','ההזמנות שלי',()=>{shut();openOrders123()}],['💰','החזרות וקרדיטים',hub('money')],['📊','תובנות והוצאות',hub('insights')],['🔎','לפני הזמנה',hub('check')]]],
 ['לוקים',[['👗','בניית לוק',()=>{shut();openStudio()}],['✨','הלוקים שלי',hub('looks')],['♥','האלבום',hub('album')],['📅','לוח שבועי',hub('week')]]],
 ['אווטאר ותמונות',[['🧍‍♀️','מה חסר לאווטאר',()=>{shut();openMiss77()}],['⬆','העלאת כמה גיליונות',()=>{shut();window.openBU83?openBU83():fire('data-bu83open')}],['🔍','בדיקת כל התנוחות',()=>{shut();openQA83()}],['📋','פרומטים ל-GPT (אווטאר 360)',()=>{shut();R360.prompts()}]]],
 ['פיתוח',[['📋',()=>`כל המשימות (${(window.TASKS172||[]).filter(t=>t.s=='open'||t.s=='wait').length} פתוחות)`,()=>openTasks172()],['🗺','התוכנית לפיתוח',()=>openPlan172()],['📝','דף הפרומטים ל-GPT','https://claude.ai/artifact/N7e2QR7GghzC89Cc2F153a'],['🧾','פרומטים בתוך האתר',()=>{shut();R360.prompts()}],['📜','יומן גרסאות','https://claude.ai/artifact/VKEMzizpkT8jy5QvkpEBzJ']]],
 ['מערכת',[['💾','גיבוי לקובץ',()=>fire('data-bk83')],['🛠','משהו לא עובד',()=>{shut();openBug77()}],['❓','איך משתמשים',()=>{shut();tap('#helpb')}]]],
];
const ACT={};
function open172(){let d=$1('#ad172');if(!d){d=document.createElement('dialog');d.id='ad172';d.dir='rtl';document.body.appendChild(d)}
 let r={};try{r=counts()}catch(e){ERR('counts',e)}
 let k=0;const reg=f=>{const id='a'+(k++);ACT[id]=f;return id};
 const w=WAIT.filter(x=>r[x[2]]>0);const ver=(($1('#ver')||{}).textContent||'').trim();
 d.innerHTML=`<div class="ad172h"><h3>⚙️ פאנל ניהול<small>כל מה שקורה בארון, במקום אחד</small></h3><button data-ad172x aria-label="סגירה">✕</button></div><div class="ad172b">
  <div class="ad172s"><button data-ad172="${reg(()=>{shut();openCloset163()})}"><b>${r.items||0}</b><span>פריטים בארון</span></button><button data-ad172="${reg(()=>{shut();openOrders123()})}"><b>${r.orders||0}</b><span>הזמנות</span></button><button data-ad172="${reg(()=>{if(window.R360){shut();R360.open()}else only('avok')})}"><b>${r.ok||0}</b><span>על האווטאר 360</span></button><button data-ad172="${reg(()=>{shut();openGen161()})}"><b>${r.gen||0}</b><span>ברשימה הכללית</span></button></div>
  <div class="ad172g">מה מחכה לך</div><div class="ad172w">${w.map(x=>`<button class="${x[3]?'hot':''}" data-ad172="${reg(x[4])}"><i>${x[0]}</i><span>${x[1]}</span><b>${r[x[2]]}</b></button>`).join('')||'<p>✓ אין כרגע שום דבר שמחכה לך</p>'}</div>
  ${TOOLS.map(([g,L])=>`<div class="ad172g">${g}</div><div class="ad172t">${L.map(t=>{const lab=typeof t[1]=='function'?t[1]():t[1];return typeof t[2]=='string'?`<a href="${t[2]}" target="_blank" rel="noopener"><i>${t[0]}</i>${lab}</a>`:`<button data-ad172="${reg(t[2])}"><i>${t[0]}</i>${lab}</button>`}).join('')}</div>`).join('')}
  <div class="ad172f">${ver}</div></div>`;
 if(!d.open)d.showModal();d.scrollTop=0}
window.openAdmin172=open172;window.TOOLS172=TOOLS;window.WAIT172=WAIT;   // v183: the one search lists these too

// ---- v173 "פיתוח": the task table (tasks.md, built into the page) and the development plan
const st2=document.createElement('style');st2.textContent=`
.sh172{width:min(760px,100vw);max-width:100vw;height:100dvh;max-height:100dvh;margin:0 auto;padding:0;border:0;border-radius:0;background:var(--bg,#faf7f2)}
@media(min-width:701px){.sh172{height:auto;max-height:92dvh;margin:4dvh auto;border-radius:22px}}
.sh172::backdrop{background:rgba(30,20,10,.35)}
.tk172f{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.tk172f button{font:inherit;font-size:.85rem;padding:7px 13px;border-radius:999px;border:1px solid var(--line);background:#fff;cursor:pointer}
.tk172f button[aria-pressed=true]{background:#3a2a1e;color:#fff;border-color:#3a2a1e}
#tk172q{width:100%;box-sizing:border-box;font:inherit;padding:10px 14px;border-radius:999px;border:1px solid var(--line);background:#fff;margin-bottom:10px}
.tk172l{display:flex;flex-direction:column;gap:6px}
.tk172r{padding:10px 12px;border-radius:14px;border:1px solid var(--line);background:#fff}
.tk172r b{display:block;font-size:.92rem}.tk172r p{margin:4px 0 0;font-size:.82rem;color:#4b3f35}.tk172r small{display:block;margin-top:3px;font-size:.76rem;color:var(--muted)}
.tk172r .c{float:left;font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:999px;margin-inline-start:6px}
.tk172r .c.open{background:#fff1d6;color:#8a5a00}.tk172r .c.wait{background:#ffe1d6;color:#a3361b}.tk172r .c.done{background:#e3f3e6;color:#2f6b3a}.tk172r .c.no{background:#eee;color:#666}
.pl172 h4{margin:18px 0 6px;font-size:1.02rem}.pl172 p,.pl172 li{font-size:.88rem;line-height:1.55;color:#3b3029}.pl172 ul{margin:4px 0;padding-inline-start:20px}
.pl172 .st{display:inline-block;font-size:.76rem;font-weight:700;padding:3px 10px;border-radius:999px;background:#fff1d6;color:#8a5a00}
.pl172 a.big{display:block;text-align:center;margin-top:18px;padding:13px;border-radius:16px;background:#3a2a1e;color:#fff;text-decoration:none;font-weight:700}`;
document.head.appendChild(st2);
function sheet172(id,title,sub){let d=document.getElementById(id);if(!d){d=document.createElement('dialog');d.id=id;d.className='sh172';d.dir='rtl';document.body.appendChild(d)}
 d.innerHTML=`<div class="ad172h"><h3>${title}<small>${sub}</small></h3><button data-sh172x="${id}" aria-label="סגירה">✕</button></div><div class="ad172b"></div>`;if(!d.open)d.showModal();return d.querySelector('.ad172b')}
const LAB={open:'פתוח',wait:'מחכה לך',done:'בוצע',no:'אי אפשר'};let TKF='o';
const es172=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openTasks172(q){const T=window.TASKS172||[];const b=sheet172('tk172','📋 כל המשימות',`${T.length} בקשות · ${T.filter(t=>t.s=='done').length} בוצעו`);
 const cnt=k=>T.filter(t=>k=='o'?(t.s=='open'||t.s=='wait'):k=='a'||t.s==k).length;
 b.innerHTML=`<div class="tk172f">${[['o','פתוחות'],['wait','מחכות לך'],['done','בוצעו'],['a','הכל']].map(([k,l])=>`<button data-tk172f="${k}" aria-pressed="${TKF==k}">${l} (${cnt(k)})</button>`).join('')}</div>
  <input type="search" id="tk172q" placeholder="חיפוש במשימות" value="${es172(q||'')}"><div class="tk172l"></div>`;
 const draw=()=>{const w=(b.querySelector('#tk172q').value||'').trim().toLowerCase().split(/\s+/).filter(Boolean);
  const L=T.filter(t=>(TKF=='o'?(t.s=='open'||t.s=='wait'):TKF=='a'||t.s==TKF)&&w.every(x=>(t.a+' '+t.d+' '+t.o+' '+t.n).toLowerCase().includes(x)));
  b.querySelector('.tk172l').innerHTML=L.map(t=>`<div class="tk172r"><span class="c ${t.s}">${LAB[t.s]}</span><b>${t.n}. ${es172(t.a)}</b>${t.d?`<p>${es172(t.d)}</p>`:''}${t.o?`<small>${es172(t.o)}</small>`:''}</div>`).join('')||'<p>אין משימות כאן</p>'};
 draw();b.querySelector('#tk172q').addEventListener('input',draw)}
window.openTasks172=openTasks172;
function openPlan172(){const b=sheet172('pl172','🗺 התוכנית לפיתוח','שלושה פיתוחים גדולים שתכננו ב-24/10');
 b.className='ad172b pl172';
 b.innerHTML=`<p><span class="st">מחכה לאישור שלך</span> הסדר המומלץ: 1, אחר כך 2, ואז 3 בשלבים.</p>
 <h4>1. מיקום בבית וכביסה</h4><ul><li>לכל בגד יש מקום קבוע: חדר, ארון ומדף.</li><li>לכל בגד יש מצב: בארון, עליי, בכביסה, נקי, אצל התופרת, הושאל, במחסן, להחזרה.</li><li>"לבשתי" לוק שלם, והבגדים עוברים לסל הכביסה. הסל ממוין לפי צבע ותווית כביסה.</li><li>חיפוש "איפה X?", ובבניית לוק בגד מלוכלך מופיע אפור.</li></ul><p><b>צריך ממך:</b> שמות או תמונות של החדרים והארונות.</p>
 <h4>2. מיון בגדים ישנים</h4><ul><li>מצלמים כמה בגדים על המיטה, והאתר חותך כל אחד.</li><li>משחק החלקה: אוהבת? במידה? מה עושים?</li><li>אפשרויות: להשאיר, לתרום, למכור, לתופרת, או "לחכות" עם תאריך בדיקה.</li><li>תזכורת לבגד שלא נלבש חצי שנה, ושקית תרומה.</li></ul>
 <h4>3. יועצת קניות וארכיון</h4><ul><li>מצלמים או שולחים צילום מסך של בגד מהחנות.</li><li>האתר בודק אם יש כבר דומה, מחפש בארון בגדים שמתאימים אליו ומראה 3 לוקים על האווטאר.</li><li>תשובה ✅ / ⚠️ / ❌ ומה חסר, מידה לפי המידות שלך, מחיר ללבישה, והשוואה בין 2–3 בגדים.</li><li>ארכיון של מה קנית ומה ויתרת, עם מחיר, תאריך, חנות ודעה. כשקונים, זה מתחבר להזמנות.</li></ul>
 <a class="big" href="https://claude.ai/artifact/BaWyW7D1pks6ks8rezvnaD" target="_blank" rel="noopener">לדף התוכנית המלא ›</a>`}
window.openPlan172=openPlan172;
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sh172x],[data-tk172f]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.sh172x){const d=document.getElementById(t.dataset.sh172x);if(d)d.close();return}
 TKF=t.dataset.tk172f;const q=(document.getElementById('tk172q')||{}).value||'';openTasks172(q)},true);

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-ad172],[data-ad172x],[data-ad172open]');if(!t)return;e.preventDefault();e.stopPropagation();const ds=t.dataset;
 try{if(ds.ad172open!==undefined){shut();return open172()}if(ds.ad172x!==undefined)return $1('#ad172').close();const f=ACT[ds.ad172];if(f)f()}catch(err){ERR('click',err);toast('לא הצלחתי לפתוח. נסי שוב')}},true);

// ways in: a wide button at the top of the home screen, under "ההזמנות שלי" / "מוצרים להחזרה" (with how many things wait), the "⋯" menu
function entry(){try{const cta=$1('.h9cta')||$1('.h9hero');if(cta){let b=$1('.h9adm');if(!b){b=document.createElement('button');b.type='button';b.className='h9adm';b.setAttribute('data-ad172open','');b.innerHTML='<span>⚙️ פאנל ניהול</span><small></small>'}
  const after=$1('#ret152b')||$1('#ord123b');if(after&&after.parentNode==cta){if(after.nextSibling!==b)after.after(b)}else if(b.parentNode!==cta)cta.appendChild(b)
  let n=0;try{n=getAlerts().filter(a=>a.lvl>=2).length}catch(_){}b.querySelector('small').textContent=n?`🔔 ${n}`:''}
 const e7=$1('#more9 .e77');if(e7&&!e7.querySelector('[data-ad172open]'))e7.insertAdjacentHTML('afterbegin','<button data-ad172open>⚙️ פאנל ניהול</button>')}catch(e){ERR('entry',e)}}
setTimeout(entry,800);setTimeout(entry,2500);setInterval(entry,5000);
})();
