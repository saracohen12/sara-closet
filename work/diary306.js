// v306 (Sara 28/10 16:10 "תפעיל את הכפתור הלוק של היום ואז יפתח לי חלונית מה לבשתי היום וגם יומן מה לבשתי כל יום במשך החודש,
// ורשימה של בגדים שהשתמשתי היום השבוע החודש"): "הלוק של היום" on the home card (its title and a new "📅 מה לבשתי" button) opens one window:
// today (what she marked, mark the look of the day in one tap, pick from the closet / photo), the month as a calendar (every day shows what she wore,
// a tap opens that day in the "השבוע שלי" window of wore234 and ✕ there comes back here), and lists of today / last 7 days / the month with how many
// times each piece was worn and on which days. Data is the same wear diary as everywhere: IT[id].wl (dates), day photos in db 'days234'.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v306 '+w+': '+(e&&(e.code||e.message)||e));
const $1=s=>document.querySelector(s),$a=(s,r)=>[...(r||document).querySelectorAll(s)];
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>(window.toast||(()=>{}))(m);
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>iso(new Date());
const DN=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'],DL='אבגדהוש';
const dOf=k=>new Date(k+'T12:00');
const dm=k=>{const d=dOf(k);return d.getDate()+'/'+(d.getMonth()+1)};
const dayName=k=>k==today()?'היום':'יום '+DN[dOf(k).getDay()];
const monName=m=>{try{return new Date(m+'-15T12:00').toLocaleDateString('he-IL',{month:'long',year:'numeric'})}catch(_){return m}};
const monOnly=m=>{try{return new Date(m+'-15T12:00').toLocaleDateString('he-IL',{month:'long'})}catch(_){return m}};
const curM=()=>today().slice(0,7);
const addM=(m,n)=>{const d=new Date(m+'-15T12:00');d.setMonth(d.getMonth()+n);return iso(d).slice(0,7)};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const nm=id=>{const x=(typeof D=='object'&&D[id])||{};return String(it(id).nm||it(id).tname||x.short||x.full||'').replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').trim()||id};
const ph=id=>{try{return img(id)||TH[id]||TPH}catch(_){return ''}};
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
let CN=null;const catName=c=>{if(!CN){CN={};$a('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t})}return CN[c]||''};
const thl=ids=>new Set(ids.map(cat)).forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}});

// the wear diary: date → ids (the same IT.wl that "לבשתי היום", the week circles and the day window write)
function byDay(){const by={};if(typeof D!='object')return by;for(const id of Object.keys(D)){const wl=it(id).wl;if(!wl||!wl.length)continue;
 for(const k of wl){const a=by[k]||(by[k]=[]);if(!a.includes(id))a.push(id)}}return by}
const last7=()=>{const n=new Date();return [...Array(7)].map((_,i)=>{const d=new Date(n);d.setDate(n.getDate()-6+i);return iso(d)})};

// day photos (📸 of herself, wore234 saves them in db 'days234')
let DAYS={},SUB=null;
function load(){if(SUB)return;try{if(typeof DB!='undefined'&&DB)SUB=DB.collection('days234').onSnapshot(sn=>{const n={};sn.docs.forEach(d=>{const v=d.data();if(v)n[d.id]=v});DAYS=n;if(W&&W.open)render()},e=>ERR('snap',e))}catch(e){ERR('load',e)}}

let W=null,S={m:'',tab:'d',v:'main',oid:'',q:'',c:'',n:60,r:'',note:'',fx:12},RET=false;
function open(v,id){load();RET=false;S.v=v||'main';if(id)S.oid=id;
 if(!W){W=document.createElement('dialog');W.id='dy306';W.dir='rtl';W.setAttribute('aria-labelledby','dy306t');document.body.appendChild(W);
  W.innerHTML=`<div class="w234h"><button type="button" class="bk234" data-dy306back aria-label="חזרה" hidden>→</button><h3 id="dy306t">📅 מה לבשתי<small></small></h3><button type="button" class="x234" data-dy306x aria-label="סגירה">✕</button></div><div class="w234b dyb306"></div>`;}
 if(!S.m)S.m=curM();
 try{$a('dialog[open]').forEach(x=>{if(x!=W)x.close()})}catch(_){}
 if(!W.open)W.showModal();render();W.querySelector('.dyb306').scrollTop=0}

const tile=(id,sub)=>`<button type="button" class="t234 dyt306" data-dy306open="${es(id)}"><img alt="" data-th="${es(id)}" src="${ph(id)}"><span>${es(nm(id))}</span>${sub?`<small>${sub}</small>`:''}</button>`;
const lookIds=()=>{try{return (window.R360&&R360.today&&R360.today.ids()||[]).filter(id=>D[id])}catch(_){return []}};

function todayHtml(by){const k=today(),L=by[k]||[],p=DAYS[k]&&DAYS[k].ph,lk=lookIds(),miss=lk.filter(id=>!L.includes(id));
 return `<section class="dys306" aria-labelledby="dyh306a"><h4 class="h234" id="dyh306a">היום · ${es(DN[dOf(k).getDay()])} ${dm(k)}${L.length?` <small>${L.length==1?'בגד אחד':L.length+' בגדים'}</small>`:''}</h4>
 ${p||L.length?`<div class="dyg306">${p?`<span class="dyme306"><img alt="התמונה שלך מהיום" src="/_blob/${es(p)}"></span>`:''}${L.map(id=>tile(id)).join('')}</div>`:'<p class="i234">עוד לא סימנת מה לבשת היום.</p>'}
 <div class="act234 dya306">
 ${lk.length&&miss.length?`<button type="button" class="pri" data-dy306look>✓ לבשתי את הלוק של היום <small>(${miss.length==lk.length?lk.length+' בגדים':'עוד '+miss.length})</small></button>`:''}
 <button type="button" ${lk.length&&miss.length?'':'class="pri"'} data-dy306pick>👗 ${L.length?'לשנות / להוסיף מהארון':'לבחור מהארון מה לבשתי'}</button>
 <button type="button" data-dy306day="${k}">📸 לצלם – אמצא את הבגדים לבד</button>
 ${L.length&&window.SC185?'<button type="button" data-dy306wash>🧺 בסוף היום: לכביסה או חזרה למקום</button>':''}</div></section>`}

// 📝 the days before: yesterday, the day before… (what she remembers) – each opens the closet picker for that day
function pastHtml(by){const ks=last7().slice(0,6).reverse();
 return `<section class="dys306" aria-labelledby="dyh306p"><h4 class="h234" id="dyh306p">📝 להשלים ימים קודמים <small>מה שאת זוכרת</small></h4>
 <div class="dyps306">${ks.map((k,i)=>{const n=(by[k]||[]).length;return `<button type="button" data-dy306day="${k}" data-v="${n?'':'pick'}" class="${n?'on':''}"><b>${i==0?'אתמול':i==1?'שלשום':DN[dOf(k).getDay()]}</b><small>${dm(k)}</small><i>${n?'✓ '+n:'+ להוסיף'}</i></button>`}).join('')}</div>
 <p class="i234">ימים מוקדמים יותר: לחיצה על היום ביומן למטה. בוחרים מהארון, או מצלמים והאתר מוצא לבד.</p></section>`}

// ⭐ the most useful: worn the most times (all the diary), with price per wear when the price is known; ♥ = what she loves
const wearN=id=>Math.max(it(id).wear||0,(it(id).wl||[]).length);
const price=id=>{const x=D[id]||{};return +(x.paid||x.price||0)};
const heart=id=>`<button type="button" class="dyh306${it(id).fav?' on':''}" data-dy306fav="${es(id)}" aria-pressed="${!!it(id).fav}" aria-label="${it(id).fav?'להוריד מהאהובים':'לסמן שאני אוהבת'}">${it(id).fav?'♥':'♡'}</button>`;
function usefulHtml(){const ids=Object.keys(D).filter(id=>wearN(id)>0).sort((a,b)=>wearN(b)-wearN(a)).slice(0,10);
 return `<section class="dys306" aria-labelledby="dyh306u"><h4 class="h234" id="dyh306u">⭐ הבגדים הכי שימושיים שלי</h4>
 ${ids.length?`<ol class="dyl306 dyu306">${ids.map((id,i)=>{const n=wearN(id),pr=price(id);return `<li><button type="button" data-dy306open="${es(id)}"><i class="dyr306">${i+1}</i><img alt="" data-th="${es(id)}" src="${ph(id)}"><span><b>${es(nm(id))}</b><small>${es(catName(cat(id)))}${pr?` · ₪${(pr/n).toFixed(pr/n<10?1:0)} ללבישה`:''}</small></span><em>${n}×</em></button>${heart(id)}</li>`}).join('')}</ol>`
 :'<p class="i234">כשתסמני מה לבשת, כאן יופיעו הבגדים שאת לובשת הכי הרבה, וכמה עלתה לך כל לבישה.</p>'}</section>`}
function favHtml(){const ids=Object.keys(D).filter(id=>it(id).fav).sort((a,b)=>wearN(b)-wearN(a));const m=today().slice(0,7);
 const notM=ids.filter(id=>!(it(id).wl||[]).some(k=>k.slice(0,7)==m));
 return `<section class="dys306" aria-labelledby="dyh306f"><h4 class="h234" id="dyh306f">♥ מה אני הכי אוהבת${ids.length?` <small>${ids.length}</small>`:''}</h4>
 ${ids.length?`<div class="dyg306">${ids.slice(0,S.fx).map(id=>tile(id,wearN(id)?`לבשת ${wearN(id)==1?'פעם אחת':wearN(id)+' פעמים'}`:'עוד לא סימנת')).join('')}</div>
 ${ids.length>S.fx?`<button type="button" class="more234" data-dy306favmore>עוד (${ids.length-S.fx})</button>`:''}
 ${notM.length&&notM.length<ids.length+1?`<p class="i234">💡 ${notM.length==1?'בגד אחד שאת אוהבת':notM.length+' בגדים שאת אוהבת'} עוד לא לבשת החודש.</p>`:''}`
 :'<p class="i234">עוד לא סימנת אהובים. לוחצים ♡ ליד בגד ברשימה למעלה, או ♥ בחלון של כל בגד.</p>'}</section>`}

// 💡 what the diary shows (only when there is data)
function tipsHtml(by){const m=S.m,ks=Object.keys(by).filter(k=>k.slice(0,7)==m),T=[];if(ks.length<3)return '';
 const cc={};ks.forEach(k=>by[k].forEach(id=>{const c=catName(cat(id));if(c)cc[c]=(cc[c]||0)+1}));const tc=Object.entries(cc).sort((a,b)=>b[1]-a[1]);
 if(tc.length)T.push(`הכי הרבה לבשת ${es(tc[0][0])} (${tc[0][1]} פעמים${tc[1]?`, ואחריהן ${es(tc[1][0])}`:''}).`);
 const all=Object.keys(D).filter(id=>wearN(id)>0&&price(id)>0).sort((a,b)=>price(a)/wearN(a)-price(b)/wearN(b));
 if(all.length)T.push(`הקנייה הכי משתלמת שלך: ${es(nm(all[0]))}, ₪${(price(all[0])/wearN(all[0])).toFixed(1)} לכל לבישה.`);
 const wk=new Set(ks.map(k=>DN[dOf(k).getDay()]));const miss=DN.filter(x=>!wk.has(x));if(miss.length&&miss.length<4)T.push(`ביום ${miss.join(' וביום ')} עוד לא סימנת אף פעם החודש.`);
 return T.length?`<section class="dys306 dytip306" aria-label="מה אני רואה"><h4 class="h234">💡 מה אני רואה ב${es(monOnly(m))}</h4><ul>${T.map(t=>`<li>${t}</li>`).join('')}</ul></section>`:''}

// 🧺 out of use: torn, a stain that won't come out, broken, too small, went to her daughter, gave away… (IT.out {r,d,note} + IT.gen so it leaves the closet everywhere)
const WHY=[['torn','🧵 נקרע'],['stain','🟤 כתם שלא יורד'],['broken','🔧 התקלקל / נהרס'],['small','📏 כבר לא מתאים לי'],['daughter','👧 עבר לבת שלי'],['gave','🎁 נתתי למישהו'],['other','✏ סיבה אחרת']];
const whyName=r=>(WHY.find(w=>w[0]==r)||WHY[6])[1];
const outIds=()=>Object.keys((typeof IT=='object'&&IT)||{}).filter(id=>IT[id]&&IT[id].out&&IT[id].gen&&Object.prototype.hasOwnProperty.call(D,id));
function outHtml(){const ids=outIds().sort((a,b)=>String(IT[b].out.d||'').localeCompare(String(IT[a].out.d||'')));const g={};ids.forEach(id=>(g[IT[id].out.r]=g[IT[id].out.r]||[]).push(id));
 return `<section class="dys306" aria-labelledby="dyh306o"><h4 class="h234" id="dyh306o">🧺 יצא משימוש${ids.length?` <small>${ids.length}</small>`:''}</h4>
 <p class="i234">בגד שנקרע, התקלקל, עם כתם שלא יורד, או שעבר לבת שלך. הוא יוצא מהארון, מהאווטאר ומהלוקים, ונשאר כאן עם הסיבה. אפשר תמיד להחזיר.</p>
 ${WHY.filter(w=>g[w[0]]).map(([r,n])=>`<h5 class="dyoh306">${n} <small>${g[r].length}</small></h5><ul class="dyl306">${g[r].map(id=>`<li><button type="button" data-dy306open="${es(id)}"><img alt="" data-th="${es(id)}" src="${ph(id)}"><span><b>${es(nm(id))}</b><small>${es([catName(cat(id)),IT[id].out.d?dm(IT[id].out.d):'',IT[id].out.note||''].filter(Boolean).join(' · '))}</small></span></button><button type="button" class="dyun306" data-dy306unout="${es(id)}">↩ לארון</button></li>`).join('')}</ul>`).join('')}
 <div class="act234 dya306"><button type="button" class="pri" data-dy306outpick>➕ להוסיף בגד שיצא משימוש</button><button type="button" data-dy306sort>🗂 למיין את הארון, בגד אחרי בגד</button></div></section>`}

// v309 🗂 sorting the closet (smart-closet stage B for what is already in the closet): one item at a time, oldest purchase first –
// ♥ love it / ✓ keep / 🧺 out of use (reason) / 👧 to my daughter / 🎁 to give away / 🪡 to the tailor / ⏳ not sure, ask again in 3 months / ⏭ skip.
// Each answer: IT.srt {v, d, until?}; answered items leave the queue (⏳ comes back after its date). ↩ undoes the last answer.
const SRT=[['love','♥ אוהבת, משאירה'],['keep','✓ משאירה'],['out','🧺 יצא משימוש'],['daughter','👧 לבת שלי'],['give','🎁 למסור'],['tailor','🪡 לתופרת'],['wait','⏳ לא בטוחה, לשאול שוב בעוד 3 חודשים']];
const sorted_=id=>{const r=it(id).srt;if(!r||!r.v)return false;return !(r.v=='wait'&&r.until&&r.until<=today())};
function sortQ(){let L=Object.keys(D).filter(id=>liveId(id)&&it(id).s!='give'&&!sorted_(id));if(S.sc)L=L.filter(id=>cat(id)==S.sc);
 const dt=id=>String((D[id]||{}).date||'9999');return L.sort((a,b)=>wearN(a)-wearN(b)||dt(a).localeCompare(dt(b)))}
let UNDO=[];
function sortHtml(){const L=sortQ(),all=Object.keys(D).filter(id=>liveId(id)&&(!S.sc||cat(id)==S.sc)),done=all.filter(sorted_).length,has=new Set(Object.keys(D).filter(liveId).map(cat));
 const chips=`<div class="cs234" role="group" aria-label="סוג">${OCATS.filter(([c])=>!c||has.has(c)||S.sc==c).map(([c,t])=>`<button type="button" data-dy306sc="${c}" aria-pressed="${(S.sc||'')==c}">${t}</button>`).join('')}</div>`;
 const bar=`<div class="dysb309" role="progressbar" aria-valuemin="0" aria-valuemax="${all.length}" aria-valuenow="${done}" aria-label="ממוינים"><i style="width:${all.length?Math.round(done/all.length*100):0}%"></i></div><p class="i234 dysn309">מיינת ${done} מתוך ${all.length}${UNDO.length?` · <button type="button" class="dyu309" data-dy306undo>↩ לבטל את האחרון</button>`:''}</p>`;
 const id=L[0];if(!id)return chips+bar+`<p class="dyok309">✓ סיימת למיין${S.sc?' את הסוג הזה':''}! 👏</p>`;
 const x=D[id]||{},n=wearN(id),wl=(it(id).wl||[]).slice().sort(),pr=price(id);
 return chips+bar+`<div class="dysc309"><img alt="" data-th="${es(id)}" src="${ph(id)}"><div><b>${es(nm(id))}</b>
  <small>${es([catName(cat(id)),x.color,x.size].filter(Boolean).join(' · '))}</small>
  <small>${x.date?'נקנה '+es(dm(String(x.date).slice(0,10))+'/'+String(x.date).slice(2,4)):''}${pr?` · ₪${pr.toFixed(0)}`:''}</small>
  <small>${n?`לבשת ${n==1?'פעם אחת':n+' פעמים'} · לאחרונה ${dm(wl[wl.length-1]||today())}`:'עוד לא סימנת שלבשת'}</small>
  <button type="button" class="dyop309" data-dy306open="${es(id)}">לפתוח את הבגד ›</button></div></div>
 <h4 class="h234">מה עושים איתו?</h4>
 <div class="dyso309">${SRT.map(([v,t])=>`<button type="button" data-dy306srt="${v}" data-id="${es(id)}"${v=='love'?' class="pri"':''}>${t}</button>`).join('')}<button type="button" data-dy306srt="skip" data-id="${es(id)}">⏭ לדלג, אחר כך</button></div>`}
async function sortSet(id,v){const prev={srt:it(id).srt||'',fav:!!it(id).fav,s:it(id).s||'',loc:it(id).loc||'',locT:it(id).locT||'',gen:it(id).gen||'',out:it(id).out||''};
 const d=today(),pt={srt:{v,d}};
 if(v=='love')pt.fav=true;if(v=='wait'){const u=new Date();u.setDate(u.getDate()+90);pt.srt.until=iso(u)}
 if(v=='give')pt.s='give';if(v=='tailor'){pt.loc='אצל התופרת';pt.locT=d}
 if(v=='daughter'){pt.gen=Date.now();pt.out={r:'daughter',d,note:''}}
 await putItem(id,pt);if(v=='daughter')try{window.sync161&&sync161(true)}catch(_){}
 UNDO.push([id,prev]);if(UNDO.length>20)UNDO.shift()}
const liveId=id=>{const i=it(id);return D[id]&&!i.gen&&!i.oos&&i.s!='ret'&&!(D[id]||{}).part};
const OCATS=[['','הכל'],['dresses','שמלות'],['skirts','חצאיות'],['tops','חולצות'],['sweaters','סוודרים'],['outer','ז׳קטים'],['scarves','כיסויים'],['shoes','נעליים'],['jewelry','תכשיטים'],['belts','חגורות'],['bags','תיקים'],['girls','לבת'],['boys','לבן']];
function outPickHtml(){const q=S.q.trim().toLowerCase();let L=Object.keys(D).filter(liveId);const has=new Set(L.map(cat));if(S.c)L=L.filter(id=>cat(id)==S.c);
 if(q)L=L.filter(id=>{const x=D[id]||{};return [nm(id),x.full,x.color,catName(cat(id))].join(' ').toLowerCase().includes(q)});
 L.sort((a,b)=>wearN(b)-wearN(a));
 return `<div class="ps234"><input type="search" id="q306" placeholder="🔍 לחפש: חצאית ג׳ינס, חולצה לבנה…" value="${es(S.q)}" autocomplete="off"></div>
 <div class="cs234" role="group" aria-label="סוג">${OCATS.filter(([c])=>!c||has.has(c)||S.c==c).map(([c,t])=>`<button type="button" data-dy306c="${c}" aria-pressed="${S.c==c}">${t}</button>`).join('')}</div>
 <p class="i234">לחצי על הבגד שיצא משימוש:</p>
 <div class="g234">${L.slice(0,S.n).map(id=>`<button type="button" class="t234" data-dy306why="${es(id)}"><img alt="" data-th="${es(id)}" src="${ph(id)}"><span>${es(nm(id))}</span></button>`).join('')||'<p class="i234">לא מצאתי. נסי מילה אחרת.</p>'}</div>
 ${L.length>S.n?`<button type="button" class="more234" data-dy306more>עוד (${L.length-S.n})</button>`:''}`}
function outWhyHtml(){const id=S.oid;if(!D[id])return '<p class="i234">הבגד לא נמצא.</p>';
 return `<div class="dyow306"><img alt="" data-th="${es(id)}" src="${ph(id)}"><div><b>${es(nm(id))}</b><small>${es(catName(cat(id)))}${wearN(id)?` · לבשת ${wearN(id)} פעמים`:''}</small></div></div>
 <h4 class="h234">למה הוא יוצא משימוש?</h4>
 <div class="dywy306" role="radiogroup" aria-label="הסיבה">${WHY.map(([r,n])=>`<button type="button" role="radio" data-dy306r="${r}" aria-checked="${S.r==r}">${n}</button>`).join('')}</div>
 <label class="dynt306"><span>הערה (לא חובה)</span><input type="text" id="nt306" maxlength="80" placeholder="למשל: נקרע בתפר, נתתי לשירה" value="${es(S.note)}"></label>
 <div class="ft234"><button type="button" class="pri" data-dy306outok ${S.r?'':'disabled'}>🧺 להוציא מהארון</button></div>`}

function statsHtml(by){const m=S.m,days=Object.keys(by).filter(k=>k.slice(0,7)==m&&by[k].length),cnt={};
 days.forEach(k=>by[k].forEach(id=>cnt[id]=(cnt[id]||0)+1));const ids=Object.keys(cnt),top=ids.sort((a,b)=>cnt[b]-cnt[a])[0];
 if(!days.length)return `<p class="i234 dyst306">ב${es(monOnly(m))} עוד לא סימנת בגדים. כל יום שתסמני יופיע כאן ביומן.</p>`;
 return `<div class="dyst306"><span><b>${days.length}</b>${days.length==1?'יום':'ימים'} סימנת</span><span><b>${ids.length}</b>בגדים שונים</span>${top&&cnt[top]>1?`<button type="button" data-dy306open="${es(top)}"><img alt="" data-th="${es(top)}" src="${ph(top)}"><span><b>${cnt[top]}×</b>הכי לבשת</span></button>`:''}</div>`}

function calHtml(by){const m=S.m,td=today(),first=new Date(m+'-01T12:00'),n=new Date(first.getFullYear(),first.getMonth()+1,0).getDate(),pad=first.getDay();
 const cells=[];for(let i=0;i<pad;i++)cells.push('<span class="dyc306 e" aria-hidden="true"></span>');
 for(let d=1;d<=n;d++){const k=m+'-'+String(d).padStart(2,'0'),L=by[k]||[],p=DAYS[k]&&DAYS[k].ph,fut=k>td;
  const pic=p?`<img alt="" src="/_blob/${es(p)}">`:L.length?`<img alt="" data-th="${es(L[0])}" src="${ph(L[0])}">`:'';
  cells.push(`<button type="button" class="dyc306${k==td?' td':''}${L.length||p?' on':''}" ${fut?'disabled':`data-dy306day="${k}" data-v="${L.length||p?'':'pick'}"`} aria-label="${es(dayName(k))} ${dm(k)}${L.length?': '+L.length+' בגדים':fut?'':': לא סימנת'}"><b>${d}</b>${pic?`<span class="dyp306">${pic}</span>`:''}${L.length>1?`<i>${L.length}</i>`:''}</button>`)}
 const canNext=m<curM();
 return `<section class="dys306" aria-labelledby="dyh306b"><div class="dym306"><button type="button" data-dy306m="-1" aria-label="החודש הקודם">›</button><h4 class="h234" id="dyh306b">📆 היומן · ${es(monName(m))}</h4><button type="button" data-dy306m="1" aria-label="החודש הבא" ${canNext?'':'disabled'}>‹</button></div>
 ${statsHtml(by)}
 <div class="dyw306" aria-hidden="true">${[...DL].map(c=>`<span>${c}׳</span>`).join('')}</div><div class="dycal306">${cells.join('')}</div>
 <p class="i234">יום ריק: בוחרים מהארון מה לבשת. יום מלא: רואים, משנים או מצלמים.</p></section>`}

function listHtml(by){const tabs=[['d','היום'],['w','השבוע'],['m',S.m==curM()?'החודש':monOnly(S.m)]];
 const ks=S.tab=='d'?[today()]:S.tab=='w'?last7():Object.keys(by).filter(k=>k.slice(0,7)==S.m).sort();
 const cnt={},dates={};ks.forEach(k=>(by[k]||[]).forEach(id=>{cnt[id]=(cnt[id]||0)+1;(dates[id]=dates[id]||[]).push(k)}));
 const ids=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]||(dates[b].slice(-1)[0]>dates[a].slice(-1)[0]?1:-1));
 const tot=ids.reduce((s,id)=>s+cnt[id],0),cats={};ids.forEach(id=>{const c=catName(cat(id));if(c)cats[c]=(cats[c]||0)+1});
 const empty=S.tab=='d'?'עוד לא סימנת מה לבשת היום.':S.tab=='w'?'ב-7 הימים האחרונים עוד לא סימנת בגדים.':'בחודש הזה עוד לא סימנת בגדים.';
 return `<section class="dys306" aria-labelledby="dyh306c"><h4 class="h234" id="dyh306c">👚 הבגדים שלבשתי</h4>
 <div class="cs234 dytb306" role="tablist">${tabs.map(([t,n])=>`<button type="button" role="tab" data-dy306tab="${t}" aria-selected="${S.tab==t}">${es(n)}</button>`).join('')}</div>
 ${ids.length?`<p class="i234 dysum306">${ids.length==1?'בגד אחד':ids.length+' בגדים'}${tot>ids.length?` · ${tot} לבישות`:''}${Object.keys(cats).length>1?' · '+Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`${n} ${es(c)}`).join(', '):''}</p>
 <ul class="dyl306">${ids.map(id=>`<li><button type="button" data-dy306open="${es(id)}"><img alt="" data-th="${es(id)}" src="${ph(id)}"><span><b>${es(nm(id))}</b><small>${es(catName(cat(id)))}${S.tab=='d'?'':' · '+dates[id].map(k=>`${DL[dOf(k).getDay()]}׳ ${dm(k)}`).join(', ')}</small></span>${S.tab=='d'?'':`<em>${cnt[id]}×</em>`}</button></li>`).join('')}</ul>`
 :`<p class="i234">${empty}</p>`}</section>`}

function render(keep){if(!W||!W.open)return;const b=W.querySelector('.dyb306'),y=b.scrollTop,by=byDay(),v=S.v;
 W.querySelector('.bk234').hidden=v=='main';
 const hd=(()=>{try{return new Date().toLocaleDateString('he-IL-u-ca-hebrew',{day:'numeric',month:'long'})}catch(_){return dm(today())}})();
 W.querySelector('#dy306t').innerHTML=(v=='main'?'📅 מה לבשתי':v=='sort'?'🗂 מיון הארון':v=='outpick'?'🧺 איזה בגד יצא משימוש?':'🧺 יצא משימוש')+`<small>${es(dayName(today())+' · '+hd)}</small>`;
 b.innerHTML=v=='sort'?sortHtml():v=='outpick'?outPickHtml():v=='outwhy'?outWhyHtml():todayHtml(by)+pastHtml(by)+calHtml(by)+listHtml(by)+tipsHtml(by)+usefulHtml()+favHtml()+outHtml();b.scrollTop=keep===false?0:y;
 thl($a('img[data-th]',b).map(x=>x.dataset.th).filter(id=>D[id]))}

// a day opens in the day window of wore234; its ✕ (or Esc) comes back to the diary
function day(k,v){if(!window.WR234)return;W.close();WR234.open(k,v);RET=true}
const back=()=>{if(!RET)return;RET=false;setTimeout(open,30)};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#wr234 [data-wr234x]');if(t)back();else if(RET&&e.target.closest&&e.target.closest('#wr234 [data-wr234open],#wr234 [data-wr234av]'))RET=false},true);
document.addEventListener('cancel',e=>{if(e.target&&e.target.id=='wr234')back()},true);

document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('button,[data-dy306]');if(!t)return;
 if(t.matches('[data-dy306]')){e.preventDefault();e.stopPropagation();return open()}
 if(!W||!t.closest('#dy306'))return;const d=t.dataset;
 try{
 if(d.dy306x!=null)return W.close();
 if(d.dy306open){W.close();return openItem(d.dy306open)}
 if(d.dy306day)return day(d.dy306day,d.v||undefined);
 if(d.dy306back!=null){S.v=S.v=='outwhy'&&S.from=='pick'?'outpick':S.v=='outwhy'&&S.from=='sort'?'sort':'main';return render(false)}
 if(d.dy306sort!=null){S.v='sort';return render(false)}
 if(d.dy306sc!=null){S.sc=d.dy306sc;return render(false)}
 if(d.dy306srt){const id=d.id,v=d.dy306srt;if(!D[id])return;
  if(v=='skip'){const r=it(id).srt;await putItem(id,{srt:{v:'wait',d:today(),until:iso(new Date(Date.now()+7*864e5))}});UNDO.push([id,{srt:r||''}]);return render(false)}
  if(v=='out'){S.oid=id;S.r='';S.note='';S.from='sort';S.v='outwhy';return render(false)}
  $a('#dy306 [data-dy306srt]').forEach(x=>x.disabled=true);await sortSet(id,v);
  toast_({love:'♥ אוהבת ומשאירה',keep:'✓ נשאר בארון',daughter:'👧 עבר לבת שלך',give:'🎁 סומן למסירה',tailor:'🪡 סומן: אצל התופרת',wait:'⏳ אשאל שוב בעוד 3 חודשים'}[v]||'✓');return render(false)}
 if(d.dy306undo!=null){const u=UNDO.pop();if(!u)return;const [id,prev]=u;await putItem(id,prev);if('gen' in prev)try{window.sync161&&sync161(true)}catch(_){}toast_('↩ בוטל');return render(false)}
 if(d.dy306fav){const id=d.dy306fav,on=!it(id).fav;await putItem(id,{fav:on});toast_(on?'♥ נוסף לאהובים':'הוסר מהאהובים');return render()}
 if(d.dy306favmore!=null){S.fx+=24;return render()}
 if(d.dy306outpick!=null){S.v='outpick';S.q='';S.c='';S.n=60;render(false);const q=W.querySelector('#q306');if(q&&matchMedia('(pointer:fine)').matches)q.focus();return}
 if(d.dy306c!=null){S.c=d.dy306c;S.n=60;return render()}
 if(d.dy306more!=null){S.n+=60;return render()}
 if(d.dy306why){S.oid=d.dy306why;S.r='';S.note='';S.from='pick';S.v='outwhy';return render(false)}
 if(d.dy306r){S.r=d.dy306r;const nt=W.querySelector('#nt306');if(nt)S.note=nt.value;return render()}
 if(d.dy306outok!=null){const id=S.oid,nt=W.querySelector('#nt306');if(nt)S.note=nt.value.trim();if(!S.r||!D[id])return;t.disabled=true;
  await putItem(id,{gen:Date.now(),out:{r:S.r,d:today(),note:S.note.slice(0,80)}});try{window.sync161&&sync161(true)}catch(_){}
  toast_(`🧺 "${nm(id).slice(0,30)}" יצא משימוש (${whyName(S.r).replace(/^\S+\s/,'')})`);if(S.from=='sort'){try{await putItem(id,{srt:{v:'out',d:today()}})}catch(_){}S.v='sort';return render(false)}S.v='main';render(false);const o=W.querySelector('#dyh306o');if(o)o.scrollIntoView({block:'start'});return}
 if(d.dy306unout){const id=d.dy306unout;await putItem(id,{gen:'',out:''});try{window.sync161&&sync161(true)}catch(_){}toast_(`↩ "${nm(id).slice(0,30)}" חזר לארון`);return render()}
 if(d.dy306pick!=null)return day(today(),'pick');
 if(d.dy306wash!=null){W.close();return SC185.open('now')}
 if(d.dy306m){const m=addM(S.m,+d.dy306m);if(m>curM())return;S.m=m;if(S.tab!='m'&&m!=curM())S.tab='m';return render()}
 if(d.dy306tab){S.tab=d.dy306tab;render();const x=W.querySelector(`[data-dy306tab="${S.tab}"]`);if(x)x.focus();return}
 if(d.dy306look!=null){const k=today(),L=byDay()[k]||[],ids=lookIds().filter(id=>!L.includes(id));if(!ids.length||!window.WR234)return;
  t.disabled=true;t.textContent='מסמנת…';let n=0;for(const id of ids){try{await WR234.setWorn(id,k,true);n++}catch(er){ERR('look',er)}}
  try{WR234.dayLook&&await WR234.dayLook(k)}catch(er){ERR('daylook',er)}
  toast_(`✓ סימנתי ${n==1?'בגד אחד':n+' בגדים'} שלבשת היום`);render();paintBtn();return}
 }catch(err){ERR('click',err);toast_('משהו השתבש, נסי שוב')}},true);
let qT;document.addEventListener('input',e=>{if(!e.target)return;if(e.target.id=='nt306'){S.note=e.target.value;return}if(e.target.id!='q306')return;clearTimeout(qT);const el=e.target;qT=setTimeout(()=>{S.q=el.value;S.n=60;render();const n=W.querySelector('#q306');if(n){n.focus();try{n.setSelectionRange(n.value.length,n.value.length)}catch(_){}}},250)});
// the item window: "🧺 יצא משימוש" next to "🗃 לרשימה הכללית"
function itemBtn(id){const d=document.getElementById('dlg');if(!d||!d.open||!D[id]||(D[id]||{}).part||it(id).gen)return;if(d.querySelector('[data-dy306item]'))return;
 const g=d.querySelector('[data-gen161]');if(g)g.insertAdjacentHTML('afterend',`<button type="button" class="mini gen161b" data-dy306item="${es(id)}">🧺 יצא משימוש</button>`)}
if(typeof openItem=='function'){const _oi=openItem;openItem=function(id){const r=_oi.apply(this,arguments);Promise.resolve(r).then(()=>setTimeout(()=>{try{itemBtn(id)}catch(e){ERR('item',e)}},450));return r};window.openItem=openItem}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-dy306item]');if(!t)return;e.preventDefault();e.stopPropagation();const id=t.dataset.dy306item;
 try{document.getElementById('dlg').close()}catch(_){}S.oid=id;S.r='';S.note='';S.from='item';open('outwhy',id)},true);
// keyboard: the title of the card is a button too
document.addEventListener('keydown',e=>{if((e.key=='Enter'||e.key==' ')&&e.target.matches&&e.target.matches('[data-dy306]')){e.preventDefault();open()}});

// ---------- the home card: "הלוק של היום" opens it, plus a "📅 מה לבשתי היום" button ----------
function paintBtn(){const h=$1('#h180 .z-lkh b');if(h&&!h.dataset.dy306){h.dataset.dy306=1;h.setAttribute('role','button');h.tabIndex=0;h.setAttribute('aria-haspopup','dialog');h.title='מה לבשתי היום והיומן'}
 const a=$1('#h180 .z-lka');if(!a)return false;let b=a.querySelector('.dyhb306');
 if(!b){b=document.createElement('button');b.type='button';b.className='z-lkn dyhb306';b.dataset.dy306=1;b.setAttribute('aria-haspopup','dialog');a.appendChild(b)}
 const n=(byDay()[today()]||[]).length,s=n?`✓ לבשתי היום · ${n}`:'📅 מה לבשתי היום';if(b.textContent!=s)b.textContent=s;a.classList.add('dy306');return true}
(function go(n=0){if(!paintBtn()&&n<60)setTimeout(()=>go(n+1),400)})();
setInterval(()=>{if(!document.hidden)try{paintBtn()}catch(e){ERR('btn',e)}},4000);
// v308: a reminder in 🔔 – in the evening when today is still empty, in the morning for yesterday (once she uses the diary); its button opens the diary
const ALRX=/לסמן ביומן/;
function wrapAl(){if(typeof getAlerts!='function'||getAlerts.__dy308)return typeof getAlerts=='function';const g=getAlerts;
 getAlerts=function(){const A=g.apply(this,arguments)||[];try{const by=byDay(),h=new Date().getHours(),k=today(),y=last7()[5];
  const used=last7().concat(Object.keys(by).filter(x=>x>=iso(new Date(Date.now()-14*864e5)))).some(x=>(by[x]||[]).length);
  if(h>=18&&!(by[k]||[]).length)A.push({lvl:1,txt:'👗 עוד לא סימנת מה לבשת היום. לסמן ביומן?',ids:[]});
  else if(h<14&&used&&!(by[y]||[]).length)A.push({lvl:1,txt:'👗 מה לבשת אתמול? לסמן ביומן?',ids:[]})}catch(e){ERR('alerts',e)}return A};getAlerts.__dy308=1;return true}
function paintAl(){const b=document.getElementById('albody');if(!b)return;b.querySelectorAll(':scope>.al').forEach(r=>{if(r.querySelector('[data-dy306]')||!ALRX.test(r.textContent))return;
 r.insertAdjacentHTML('beforeend','<div class="k300"><button type="button" data-dy306>📅 לפתוח את היומן</button></div>')})}
const wA=setInterval(()=>{if(!wrapAl())return;clearInterval(wA);const b=document.getElementById('albody');if(b)new MutationObserver(()=>{try{paintAl()}catch(e){ERR('paintAl',e)}}).observe(b,{childList:true})},800);
window.DY306={open};
})();
