// ===== v83 (2026-10-22): the rest of the "50 upgrades" list – holidays and a wear diary on the home screen, closet tools
// (worn-most sort, "חדש", wall view, multi-select, side index, voice search), item window (swipe photos, "עם מה זה הולך",
// wear dates, share, voice notes), studio (next garment, double-tap zoom, street background, hip check, QA page),
// batch upload of GPT sheets, pose count on cards, weekly upload reminder, return-tomorrow alert, look board by drag,
// album by event + stars, closet gaps, shopping list, daily backup.
(()=>{
const lsG=k=>{try{return localStorage.getItem(k)}catch(_){return null}},lsS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
const thumb=id=>{let u='';try{u=img(id)}catch(_){}return `<img data-th="${id}" src="${u||TPH}" alt="" loading="lazy">`};
const lz=root=>{try{thCats(root).forEach(c=>thLoad(c).then(()=>thApply(TH)))}catch(_){}};
const live=id=>D[id]&&(IT[id]||{}).s!='ret'&&(IT[id]||{}).s!='give';
const iso=d=>{const x=new Date(d);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)};
const tIso=()=>iso(new Date());
const fmt=s=>{const [y,m,d]=s.split('-');return `${+d}/${+m}`};
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v83 '+w+': '+(e&&e.message||e));
const sheet=(id,cls)=>{let d=$('#'+id);if(!d){d=document.createElement('dialog');d.id=id;d.className='sheet9 '+(cls||'');d.dir='rtl';document.body.appendChild(d)}return d};
const sname=s=>((typeof SLOTS!='undefined'&&SLOTS.find(x=>x[0]==s))||[])[1]||s;
const poses=id=>{const it=IT[id]||{};return ['front','side','back','half','hip'].filter(k=>(it.p5g&&it.p5g[k])||(it.p5gv||[]).some(g=>g&&g[k])).length};
const usesPoses=id=>(typeof P5G_SLOTS!='undefined'?P5G_SLOTS:[]).includes(slotOf(id));

// ================= HOME =================
// ---- 5/6. Jewish holidays from the Hebrew calendar (no fixed dates), look of the day by weekday / holiday
const HOL=[['תשרי',1,'ראש השנה',1,'🍎'],['תשרי',10,'יום כיפור',1,'🤍'],['תשרי',15,'סוכות',1,'🌿'],['תשרי',22,'שמחת תורה',1,'📜'],['כסלו',25,'חנוכה',0,'🕎'],
 ['שבט',15,'ט״ו בשבט',0,'🌳'],['אדר',14,'פורים',0,'🎭'],['אדר ב׳',14,'פורים',0,'🎭'],['ניסן',15,'פסח',1,'🍷'],['סיוון',6,'שבועות',1,'🌾']];
let HF=null;try{HF=new Intl.DateTimeFormat('he-IL-u-ca-hebrew',{day:'numeric',month:'long'})}catch(_){}
function holOn(d){if(!HF)return null;try{const p=HF.formatToParts(d);const dd=+(p.find(x=>x.type=='day')||{}).value;const mm=(p.find(x=>x.type=='month')||{}).value;return HOL.find(h=>h[0]==mm&&h[1]==dd)||null}catch(_){return null}}
function nextHol(){const t=new Date();t.setHours(12,0,0,0);for(let i=0;i<400;i++){const d=new Date(t.getTime()+i*864e5);const h=holOn(d);if(h)return {name:h[2],chag:h[3],ic:h[4],days:i,date:d}}return null}
window.nextHol83=nextHol;
// used by the look of the day (fix77): which occasion today is, and its title
window.occToday83=()=>{const t=new Date();const wd=t.getDay();const h=holOn(t),h2=holOn(new Date(t.getTime()+864e5));
 if(h&&h[3])return ['shab','לוק ל'+h[2]];if(h2&&h2[3]&&t.getHours()>=12)return ['shab','לוק ל'+h2[2]];
 if(wd==6||wd==5)return ['shab','לוק לשבת'];if(h)return ['day','לוק ל'+h[2]];return ['day','']};
function paintHol(){const top=document.querySelector('header.top');if(!top)return;let b=$('#hol83');const n=nextHol();
 if(!n||n.days>45){if(b)b.remove();return}
 if(!b){b=document.createElement('div');b.id='hol83';top.appendChild(b)}
 const when=n.days==0?'היום':n.days==1?'מחר':`עוד ${n.days} ימים`;
 b.innerHTML=`<span class="h83i">${n.ic}</span><span class="h83t"><b>${when} ${n.days>1?'ל':''}${n.name}</b><small>${n.date.toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'numeric'})}</small></span><button data-hol83="${n.chag?'shab':'day'}">הצעת לוק ל${n.name}</button>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-hol83]');if(!b)return;
 let L=null;try{L=genLook({occ:b.dataset.hol83,sea:curSeason(),fav:false,kids:false})}catch(_){}
 if(L&&Object.keys(L).length)openStudio(null,L);else toast('לא מצאתי מספיק בגדים ללוק')});

// ---- 7/22. wear diary: every "לבשתי היום" also keeps the date (IT[id].wl), undo removes it
{const _p=putItem;putItem=function(id,patch){try{if(patch&&'wear' in patch){const it=IT[id]||{};const old=it.wear||0;const wl=(it.wl||[]).slice();
  if(patch.wear>old)wl.push(tIso());else if(patch.wear<old){const i=wl.lastIndexOf(tIso());if(i>=0)wl.splice(i,1);else wl.pop()}
  patch=Object.assign({},patch,{wl:wl.slice(-120)})}}catch(e){ERR('wl',e)}return _p.call(this,id,patch)}}
function weekDays(){const now=new Date();const s=new Date(now);s.setDate(now.getDate()-now.getDay());const a=[];for(let i=0;i<7;i++){const d=new Date(s);d.setDate(s.getDate()+i);a.push(iso(d))}return a}
function paintWeek(){const top=document.querySelector('header.top');if(!top||typeof D=='undefined')return;let b=$('#wk83');
 const days=weekDays(),td=tIso();const by={};Object.keys(D).forEach(id=>{((IT[id]||{}).wl||[]).forEach(x=>{if(days.includes(x))(by[x]=by[x]||[]).includes(id)||(by[x]=by[x]||[]).push(id)})});
 if(!b){b=document.createElement('div');b.id='wk83';top.appendChild(b)}
 const n=Object.values(by).reduce((s,a)=>s+a.length,0);const L='אבגדהוש';
 b.innerHTML=`<div class="w83h"><h3>השבוע שלי</h3><small>${n?`${n} בגדים סומנו השבוע`:'לוחצים "לבשתי היום" ומתמלא כאן'}</small></div><div class="w83r">${days.map((d,i)=>{const ids=by[d]||[];
  return `<button class="w83d${d==td?' td':''}${ids.length?' on':''}" ${ids.length?`data-open="${ids[0]}"`:'disabled'} aria-label="יום ${L[i]}${ids.length?': '+ids.length+' בגדים':''}"><span class="w83c">${ids.length?thumb(ids[0]):''}${ids.length>1?`<i>+${ids.length-1}</i>`:''}</span><span class="w83l">${L[i]}׳</span></button>`}).join('')}</div>`;
 lz(b)}

// ---- 45. return deadline tomorrow / today – banner on the home screen (and in the bell, below)
const lastDay=()=>Object.keys(D).filter(id=>{const it=IT[id]||{};if(it.s=='ret'||it.s=='kept'||it.s=='give')return false;const n=daysLeft(D[id].rdl);return n===0||n===1});
function paintRet(){const top=document.querySelector('header.top');if(!top)return;let b=$('#rt83');const L=lastDay();
 if(!L.length){if(b)b.remove();return}
 if(!b){b=document.createElement('button');b.id='rt83';b.dataset.rt83=1;top.appendChild(b)}
 const t0=L.filter(id=>daysLeft(D[id].rdl)===0).length;
 b.innerHTML=`<span>⏰</span><span><b>${t0?`היום אחרון להחזרה של ${t0} פריטים`:`מחר אחרון להחזרה של ${L.length} פריטים`}</b><small>לא סימנת אם להשאיר או להחזיר. לחצי לראות אותם</small></span><span class="r83th">${L.slice(0,3).map(thumb).join('')}</span>`;lz(b)}
document.addEventListener('click',e=>{if(!(e.target.closest&&e.target.closest('[data-rt83]')))return;try{$('#sort').value='ret';SORT='ret';sortAll();apply();const g=document.querySelector('section:not(.hide)');if(g)g.scrollIntoView({behavior:'smooth'})}catch(err){ERR('rt',err)}});

// ---- 38 + 45 in the bell: the weekly "5 to upload", and return-tomorrow
function upWeek(){return Object.keys(D).filter(id=>live(id)&&usesPoses(id)&&!(window.avReady&&avReady(id))).sort((a,b)=>((IT[b]||{}).wear||0)-((IT[a]||{}).wear||0)||((IT[b]||{}).fav?1:0)-((IT[a]||{}).fav?1:0)).slice(0,5)}
if(typeof getAlerts=='function'){const _ga=getAlerts;getAlerts=function(){const A=_ga.apply(this,arguments)||[];try{
 const L=lastDay();if(L.length){const t0=L.filter(id=>daysLeft(D[id].rdl)===0);A.unshift({lvl:3,txt:t0.length?`היום היום האחרון להחזרה של ${t0.length} פריטים!`:`מחר היום האחרון להחזרה של ${L.length} פריטים.`,ids:L})}
 const u=upWeek();if(u.length)A.push({lvl:1,txt:`השבוע כדאי להעלות לאווטאר ${u.length} בגדים שאת לובשת הרבה. ב"מה חסר לאווטאר" יש פרומט לכל אחד.`,ids:u})}catch(e){ERR('alerts',e)}return A}}

// ================= CLOSET =================
// ---- 13. sort by wear
function addSorts(){const s=$('#sort');if(!s||s.querySelector('[value=wm]'))return;s.insertAdjacentHTML('beforeend','<option value="wm">👗 הכי לבשתי</option><option value="wf">💤 הכי פחות לבשתי</option>')}
if(typeof key=='function'){const _k=key;key=function(c){const it=IT[c.dataset.id]||{};if(SORT=='wm')return -(it.wear||0)*1e4-(it.lastWorn?+it.lastWorn.replace(/-/g,'')%1e4:0);
 if(SORT=='wf')return (it.wear||0)*1e9+(it.lastWorn?+it.lastWorn.replace(/-/g,''):0);return _k(c)}}

// ---- 18. "חדש" on items ordered in the last 14 days
function ageDays(c){const d=+c.dataset.d;if(!d)return 999;const m=Math.floor(d/100),dd=d%100;const now=new Date();let t=new Date(now.getFullYear(),m-1,dd);if(t>now)t=new Date(now.getFullYear()-1,m-1,dd);return Math.floor((now-t)/864e5)}
// ---- 37. pose count on clothing cards
// "חדש" goes away once the item was opened
const SEEN=new Set((()=>{try{return JSON.parse(lsG('seen83')||'[]')}catch(_){return []}})());
const seen=id=>{if(SEEN.has(id))return;SEEN.add(id);lsS('seen83',JSON.stringify([...SEEN].slice(-1500)));document.querySelectorAll(`.card[data-id="${id}"] .new83`).forEach(e=>e.remove())};
function paintCards(){document.querySelectorAll('.grid .card').forEach(c=>{const ph=c.querySelector('.ph');if(!ph)return;const id=c.dataset.id;
 const it=IT[id]||{};const nw=ageDays(c)<=14&&it.s!='ret'&&!it.wear&&!SEEN.has(id);let e=ph.querySelector('.new83');if(nw&&!e)ph.insertAdjacentHTML('beforeend','<span class="new83">חדש</span>');else if(!nw&&e)e.remove();
 let a=ph.querySelector('.av83');const n=D[id]&&usesPoses(id)?poses(id):0;
 if(!n){if(a)a.remove();return}const t=n==5?'✓ 5/5':`${n}/5`;if(!a){ph.insertAdjacentHTML('beforeend',`<span class="av83${n==5?' ok':''}" title="תנוחות מוכנות על הדמות">${t}</span>`)}else if(a.textContent!=t){a.textContent=t;a.classList.toggle('ok',n==5)}})}

// ---- 14/17. tools row: multi-select and wall view
function toolsRow(){const r=$('#q77');if(!r||r.querySelector('.t83'))return;r.insertAdjacentHTML('afterbegin',`<span class="t83"><button data-sel83 aria-pressed="false">☑ בחירה</button><button data-wall83 aria-pressed="${document.body.classList.contains('wall83')}">▦ קיר</button></span>`)}
if(lsG('wall83')=='1')document.body.classList.add('wall83');
const SEL=new Set();
function selBar(){let b=$('#sb83');if(!document.body.classList.contains('sel83')){if(b)b.remove();return}
 if(!b){b=document.createElement('div');b.id='sb83';b.dir='rtl';document.body.appendChild(b)}
 const LOC=['ארון','מגירה','מחסן','כביסה','אצל התופרת'];
 b.innerHTML=`<b>${SEL.size?`נבחרו ${SEL.size}`:'לחצי על בגדים לבחירה'}</b><div class="sb83a"><button data-sb83="day" ${SEL.size?'':'disabled'}>חול</button><button data-sb83="shab" ${SEL.size?'':'disabled'}>שבת</button><button data-sb83="both" ${SEL.size?'':'disabled'}>חול + שבת</button>
 <select data-sb83loc ${SEL.size?'':'disabled'} aria-label="מיקום"><option value="">📍 מיקום…</option>${LOC.map(l=>`<option>${l}</option>`).join('')}</select><button data-sb83="fav" ${SEL.size?'':'disabled'}>♥ מועדף</button><button data-sb83="x" class="x83">סיום</button></div>`}
function selMode(on){document.body.classList.toggle('sel83',on);if(!on){SEL.clear();document.querySelectorAll('.card.s83').forEach(c=>c.classList.remove('s83'))}
 document.querySelectorAll('[data-sel83]').forEach(b=>b.setAttribute('aria-pressed',on));selBar()}
document.addEventListener('click',e=>{if(!document.body.classList.contains('sel83'))return;const c=e.target.closest&&e.target.closest('.grid .card');if(!c)return;e.preventDefault();e.stopPropagation();
 const id=c.dataset.id;if(SEL.has(id)){SEL.delete(id);c.classList.remove('s83')}else{SEL.add(id);c.classList.add('s83')}selBar()},true);
async function bulk(fn,msg){const ids=[...SEL];for(const id of ids){try{await putItem(id,fn(id))}catch(e){ERR('bulk',e)}}try{paintAll();apply()}catch(_){}setTimeout(()=>toast(`${msg} · ${ids.length} בגדים`),80);selMode(false)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sel83],[data-wall83],[data-sb83]');if(!t)return;
 if(t.dataset.sel83!==undefined){selMode(!document.body.classList.contains('sel83'));if(document.body.classList.contains('sel83'))toast('לחצי על הבגדים שרוצים לשנות');return}
 if(t.dataset.wall83!==undefined){const on=!document.body.classList.contains('wall83');document.body.classList.toggle('wall83',on);lsS('wall83',on?'1':'0');t.setAttribute('aria-pressed',on);return}
 const k=t.dataset.sb83;if(k=='x'){selMode(false);return}
 const D_=['יומיומי','עבודה'],S_=['שבת וחג','אירוע'];const tg=id=>{const c=card(id);return (IT[id]||{}).tg||(c?tgs(c).filter(Boolean):[])};
 if(k=='day')bulk(id=>({tg:[...tg(id).filter(x=>!S_.includes(x)&&!D_.includes(x)),'יומיומי']}),'סומנו חול');
 if(k=='shab')bulk(id=>({tg:[...tg(id).filter(x=>!S_.includes(x)&&!D_.includes(x)),'שבת וחג']}),'סומנו שבת');
 if(k=='both')bulk(id=>({tg:[...tg(id).filter(x=>!S_.includes(x)&&!D_.includes(x)),'יומיומי','שבת וחג']}),'סומנו חול + שבת');
 if(k=='fav')bulk(()=>({fav:true}),'נוספו למועדפים')});
document.addEventListener('change',e=>{const s=e.target.closest&&e.target.closest('[data-sb83loc]');if(!s||!s.value)return;const v=s.value;bulk(()=>({loc:v}),'המיקום עודכן: '+v)});

// ---- 16. side index: jump between categories
function paintIdx(){let r=$('#ix83');const secs=[...document.querySelectorAll('main section[id], section[id]')].filter(s=>!s.classList.contains('hide')&&s.querySelector('.grid'));
 if(secs.length<3){if(r)r.remove();return}
 if(!r){r=document.createElement('nav');r.id='ix83';r.setAttribute('aria-label','קפיצה לקטגוריה');document.body.appendChild(r)}
 const nm=s=>{const h=s.querySelector('h2');return ((h&&h.firstChild&&h.firstChild.textContent)||s.id).trim().split(/\s+/)[0].slice(0,6)};
 const html=secs.map(s=>`<button data-ix83="${s.id}">${esc(nm(s))}</button>`).join('');if(r.dataset.h!=html){r.innerHTML=html;r.dataset.h=html}}
function ixShow(){const r=$('#ix83');if(!r)return;const g=document.querySelector('section:not(.hide) .grid');const y=g?g.getBoundingClientRect().top:9999;r.classList.toggle('on',y<window.innerHeight*.5&&!document.querySelector('dialog[open]'))}
window.addEventListener('scroll',()=>{ixShow()},{passive:true});
const ixGo=id=>{const s=document.getElementById(id);if(s){const bar=document.querySelector('.ctrl');const off=(bar?bar.getBoundingClientRect().height:0)+8;window.scrollTo({top:s.getBoundingClientRect().top+window.scrollY-off})}};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-ix83]');if(b)ixGo(b.dataset.ix83)});
document.addEventListener('touchmove',e=>{const r=$('#ix83');if(!r||!r.contains(e.target))return;e.preventDefault();const t=e.touches[0];const el=document.elementFromPoint(t.clientX,t.clientY);const b=el&&el.closest&&el.closest('[data-ix83]');if(b&&b.dataset.ix83!=r.dataset.cur){r.dataset.cur=b.dataset.ix83;ixGo(b.dataset.ix83);r.querySelectorAll('button').forEach(x=>x.classList.toggle('cur',x==b))}},{passive:false});

// ---- 12. voice search (works where the browser allows the microphone)
function voiceBtn(){const q=$('#q');const w=q&&q.parentElement;if(!w||w.querySelector('.mic83'))return;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;
 w.insertAdjacentHTML('beforeend','<button type="button" class="mic83" aria-label="חיפוש קולי">🎤</button>');
 w.querySelector('.mic83').addEventListener('click',ev=>{ev.preventDefault();const b=ev.currentTarget;let r;try{r=new SR()}catch(_){toast('חיפוש קולי לא זמין כאן');return}r.lang='he-IL';r.interimResults=false;r.maxAlternatives=1;
  b.classList.add('on');toast('מקשיבה… תגידי למשל "חצאית שחורה"');
  r.onresult=e=>{const t=(e.results[0][0].transcript||'').trim();q.value=t;q.dispatchEvent(new Event('input',{bubbles:true}));q.dispatchEvent(new Event('change',{bubbles:true}))};
  r.onerror=e=>{b.classList.remove('on');toast(e.error=='not-allowed'||e.error=='service-not-allowed'?'המיקרופון חסום בתוך האתר. אפשר ללחוץ על המיקרופון שבמקלדת של הטלפון':'לא שמעתי, נסי שוב')};
  r.onend=()=>b.classList.remove('on');try{r.start()}catch(_){b.classList.remove('on')}})}

// ================= ITEM WINDOW =================
// ---- 20. swipe between photos + dots
if(typeof paintGal=='function'){const _pg=paintGal;paintGal=function(id){const r=_pg.apply(this,arguments);try{const w=$('#dlbody .mwrap');if(!w)return r;w.querySelector('.gd83')?.remove();const L=galList(id);if(L.length<2)return r;const i=GI[id]||0;
 w.insertAdjacentHTML('beforeend',`<span class="gd83">${L.map((_,k)=>`<i class="${k==i?'on':''}"></i>`).join('')}</span>`);
 if(!w.dataset.sw83){w.dataset.sw83=1;let x0=null,y0=null;w.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  w.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(galList(CUR).length<2)return;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3){e.stopPropagation();galStep(CUR,dx<0?1:-1)}})}}catch(e){ERR('gal',e)}return r}}

// ---- 21. "עם מה זה הולך?"
const PAIR={dress:['scarf','shoes','belt','outer','bag','jewelry'],skirt:['top','scarf','shoes','belt','outer','bag'],top:['skirt','scarf','shoes','belt','outer','jewelry'],
 set:['scarf','shoes','belt','outer','bag','jewelry'],outer:['dress','skirt','top','scarf','shoes','bag'],scarf:['dress','skirt','top','outer','shoes','jewelry'],
 shoes:['dress','skirt','top','scarf','bag','outer'],belt:['dress','skirt','top','scarf','shoes','bag'],bag:['dress','skirt','top','scarf','shoes','outer'],jewelry:['dress','skirt','top','scarf','set','outer']};
function goesWith(id){const s=slotOf(id);const want=PAIR[s];if(!want)return [];const f=famOf(id);const by={};
 Object.keys(D).forEach(o=>{if(o==id||!live(o))return;const so=slotOf(o);if(!want.includes(so))return;const fo=famOf(o);if(f&&fo&&!goes(f,fo))return;(by[so]=by[so]||[]).push(o)});
 const sc=o=>{const it=IT[o]||{};return (window.avReady&&avReady(o)?100:0)+(it.fav?30:0)+Math.min(30,(it.wear||0)*3)+(famOf(o)==f?5:0)};
 Object.values(by).forEach(a=>a.sort((p,q)=>sc(q)-sc(p)));const out=[];for(let r=0;out.length<6&&r<6;r++)for(const s2 of want){const a=by[s2]||[];if(a[r]&&out.length<6)out.push(a[r])}return out}
// ---- 22. wear dates, 23. share, 24. voice notes – all in the item window
function itemExtras(id){const body=$('#dlbody');if(!body||!D[id])return;body.querySelectorAll('.x83').forEach(x=>x.remove());const it=IT[id]||{};
 seen(id);let bar=body.querySelector('.it77');if(!bar){bar=document.createElement('div');bar.className='it77 x83';const h3=body.querySelector('h3');if(h3)h3.after(bar);else body.prepend(bar)}
 if(!bar.querySelector('[data-sh83]'))bar.insertAdjacentHTML('beforeend','<button data-sh83="1">📤 שיתוף</button><button data-vn83="rec">🎙 הערה קולית</button>');
 const g=goesWith(id);const wl=(it.wl||[]).slice().reverse();const extra=Math.max(0,(it.wear||0)-wl.length);
 const vn=it.vn||[];
 const html=`<div class="x83 gw83">${g.length?`<div class="g83h"><h4>עם מה זה הולך?</h4><button class="go" data-gw83="${id}">👗 לוק עם הבגד הזה</button></div><div class="g83r">${g.map(o=>`<button data-open="${o}" aria-label="${esc((D[o].short||'').slice(0,40))}">${thumb(o)}<small>${esc(sname(slotOf(o)))}</small></button>`).join('')}</div>`:''}
 <div class="wh83"><b>נלבש:</b> ${wl.length?wl.slice(0,12).map(fmt).join(' · ')+(wl.length>12?` ועוד ${wl.length-12}`:''):'עוד אין תאריכים'}${extra?` <small>(ועוד ${extra} ${extra==1?'פעם':'פעמים'} מלפני שהתחלנו לשמור תאריכים)</small>`:''}</div>
 ${vn.length?`<div class="vn83"><b>הערות קוליות</b>${vn.map((v,i)=>`<div class="vn83i"><audio controls preload="none" src="/_blob/${v.id}"></audio><small>${new Date(v.t).toLocaleDateString('he-IL')}</small><button data-vn83="del" data-i="${i}" aria-label="מחיקה">🗑</button></div>`).join('')}</div>`:''}</div>`;
 (bar||body.querySelector('.mwrap')||body.firstElementChild).insertAdjacentHTML('afterend',html);lz(body.querySelector('.gw83'))}
{const _ao=window.afterOpen;window.afterOpen=function(id){try{if(_ao)_ao.apply(this,arguments)}catch(_){}try{itemExtras(id)}catch(e){ERR('item',e)}}}
async function share(id){const x=D[id];const txt=(x.short||x.full||'')+(x.color?' · '+x.color:'');try{let u='';try{const L=galList(id);u=L[GI[id]||0]&&L[GI[id]||0].u}catch(_){}u=u||img(id);
  if(u&&navigator.canShare){const bl=await (await fetch(u)).blob();const f=new File([bl],(x.short||'בגד').slice(0,30)+'.jpg',{type:bl.type||'image/jpeg'});if(navigator.canShare({files:[f]})){await navigator.share({files:[f],text:txt});return}}
  if(navigator.share){await navigator.share({text:txt});return}}catch(e){if(e&&e.name=='AbortError')return}
 try{window.open('https://wa.me/?text='+encodeURIComponent(txt),'_blank')}catch(_){toast('השיתוף לא זמין כאן')}}
let REC=null;
async function voice(id,btn){if(REC){try{REC.r.stop()}catch(_){}return}
 let st;try{st=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){toast('המיקרופון חסום בתוך האתר. אפשר לכתוב הערה בשדה ההערות');return}
 const ch=[];let r;try{r=new MediaRecorder(st)}catch(_){st.getTracks().forEach(t=>t.stop());toast('הקלטה לא נתמכת בדפדפן הזה');return}
 REC={r,id};const t0=Date.now();btn.textContent='⏹ עצירה';btn.classList.add('on');const lim=setTimeout(()=>{try{r.stop()}catch(_){}},60000);
 r.ondataavailable=e=>{if(e.data&&e.data.size)ch.push(e.data)};
 r.onstop=async()=>{clearTimeout(lim);st.getTracks().forEach(t=>t.stop());REC=null;btn.textContent='🎙 הערה קולית';btn.classList.remove('on');
  const bl=new Blob(ch,{type:'video/webm'});if(bl.size<500){toast('ההקלטה קצרה מדי');return}
  let a=null;try{a=await claude.use('assets')}catch(_){}if(!a){toast('שמירת הקלטות לא זמינה כאן');return}
  try{toast('שומרת את ההקלטה…');const res=await a.upload(bl);const vn=((IT[id]||{}).vn||[]).concat([{id:res.id,t:Date.now(),s:Math.round((Date.now()-t0)/1000)}]);await putItem(id,{vn});if(CUR==id)itemExtras(id);setTimeout(()=>toast('✓ ההערה הקולית נשמרה'),80)}catch(e){toast('לא הצלחתי לשמור את ההקלטה')}};
 r.start();toast('מקליטה… לחצי שוב לעצירה (עד דקה)')}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sh83],[data-vn83],[data-gw83]');if(!t)return;e.preventDefault();
 if(t.dataset.sh83)return share(CUR);
 if(t.dataset.gw83){const id=t.dataset.gw83;let L=null;try{L=genLook({occ:isShab(card(id))&&!isDay(card(id))?'shab':'day',sea:curSeason(),fav:false,kids:false},new Set(),id)}catch(_){}if(!L||!Object.keys(L).length){L={};L[slotOf(id)]=id}try{$('#dlg').close()}catch(_){}openStudio(null,L);return}
 if(t.dataset.vn83=='rec')return voice(CUR,t);
 if(t.dataset.vn83=='del'){const vn=((IT[CUR]||{}).vn||[]).slice();vn.splice(+t.dataset.i,1);putItem(CUR,{vn}).then(()=>itemExtras(CUR))}});

// ================= STUDIO =================
// ---- 8. soft fade when the head covering / hair changes
{const _ds=drawStudio;let prev=null;drawStudio=async function(...a){const r=await _ds.apply(this,a);try{if(ST){const k=[ST.items.scarf||'',ST.head||'',ST.items.hairacc||''].join('|');const st=$('#sstage');
 if(prev!=null&&k!=prev&&st){st.classList.remove('hd83');void st.offsetWidth;st.classList.add('hd83');setTimeout(()=>st.classList.remove('hd83'),600)}prev=k}}catch(_){}return r}}
// ---- 27. next / previous garment of the same kind (buttons + swipe on the selection bar)
function nextItem(d){if(!ST||!SSEL||!ST.items[SSEL])return;let ids=[];try{ids=drawerItems(SSEL)}catch(_){}const R=ids.filter(id=>window.avReady&&avReady(id));const L=R.length>1?R:ids;if(L.length<2){toast('אין עוד בגדים מהסוג הזה');return}
 const i=L.indexOf(ST.items[SSEL]);const n=L[((i<0?0:i+d)+L.length)%L.length];const s=SSEL;setItem(s,n);try{SSEL=s;paintSel()}catch(_){}}
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{const c=$('#ssel');if(c&&ST&&SSEL&&ST.items[SSEL]&&!c.querySelector('.nx83'))c.insertAdjacentHTML('afterbegin',`<span class="nx83"><button data-nx83="-1" aria-label="הבגד הקודם">‹ הקודם</button><button data-nx83="1" aria-label="הבגד הבא">הבא ›</button></span>`)}catch(_){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-nx83]');if(b){e.preventDefault();nextItem(+b.dataset.nx83)}});
{let x0=null,y0=null;const scrollsX=el=>{for(let n=el;n&&n.id!='ssel';n=n.parentElement)if(n.scrollWidth>n.clientWidth+4&&/auto|scroll/.test(getComputedStyle(n).overflowX))return true;return false};
 document.addEventListener('touchstart',e=>{const s=e.target.closest&&e.target.closest('#ssel');const ok=s&&!scrollsX(e.target)&&!(e.target.closest('input,select'));x0=ok?e.touches[0].clientX:null;y0=ok?e.touches[0].clientY:null},{passive:true});
 document.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5&&!(e.target.closest&&e.target.closest('input[type=range]')))nextItem(dx<0?1:-1)},{passive:true})}
// ---- 28. double tap on the avatar = zoom on the face, again = back
{let last=0,lx=0,ly=0;const tog=()=>{const st=$('#sstage');if(!st)return;st.classList.toggle('fz83')};
 document.addEventListener('dblclick',e=>{if(e.target.closest&&e.target.closest('#sstage'))tog()});
 document.addEventListener('touchend',e=>{if(!(e.target.closest&&e.target.closest('#sstage'))||e.changedTouches.length!=1)return;const t=e.changedTouches[0],now=Date.now();
  if(now-last<320&&Math.hypot(t.clientX-lx,t.clientY-ly)<30){last=0;e.preventDefault();tog();return}last=now;lx=t.clientX;ly=t.clientY},{passive:false})}
// ---- 31. one more background: street (event hall and garden were already there)
try{if(typeof BGS=='object'){
 BGS.street=['רחוב','linear-gradient(180deg,#dfeaf2 0 30%,transparent 30%),repeating-linear-gradient(90deg,#e8ddd0 0 34px,#d9cbb9 34px 36px,#efe5d8 36px 70px,#d9cbb9 70px 72px),linear-gradient(180deg,transparent 0 76%,#bfb4a8 76% 77%,#cfc6bb 77% 100%)',['#dfeaf2','#cfc6bb']];
}}catch(e){ERR('bgs',e)}

// ---- 33. dresses / skirts: also check the hips, not only the waist / shoulders
async function hipGuard(slot,ctx){if(!['skirt','dress','set'].includes(slot))return false;let id,tf,v,g;
 if(ctx){({id,tf,v,g}=ctx)}else{if(!ST||(ST.avbase||'long')!='p5')return false;id=ST.items[slot];tf=ST.tf[slot];if(!id||!tf)return false;g=p5gOfT(id,tf);v=ST.view||'front'}
 if(!g||!g[v]||!tf||(tf.pvman&&tf.pvman[v]))return false;const B=(typeof P5BODY!='undefined'&&(P5BODY[v]||P5BODY.front));if(!B||!B.hp)return false;
 const url=p5gUrl(g,v);let use=url;try{const cl=await cleanP5(url,false);use=cl&&cl.url||url}catch(_){}
 const ro=await rowsOf(use,tf.w/100*399);if(!ro)return false;const sx=tf.sx||1,sy=tf.sy||1;const cy=tf.y/100*1365,cx=tf.x/100*399,top=cy-ro.H*sy/2;
 const ws=[];for(let dy=-16;dy<=16;dy+=8){const r=Math.round((B.y.hp+dy-top)/sy);const q=r>=0&&r<ro.H?ro.R[r]:null;if(q)ws.push((q[1]-q[0])*sx)}if(ws.length<3)return false;ws.sort((a,b)=>a-b);
 const gw=ws[ws.length>>1],need=B.hp[1]*1.03;if(gw>=need)return false;const cap=slot=='skirt'?1.45:1.15;const nsx=Math.min(cap,sx*need/gw);if(nsx-sx<.02)return false;tf.sx=Math.round(nsx*100)/100;return true}
if(typeof smartFit=='function'){const _sf=smartFit;smartFit=async function(slot,force,ctx){const r=await _sf.apply(this,arguments);let h=false;try{h=await hipGuard(slot,ctx)}catch(e){ERR('hip',e)}return r||h};window.smartFit=smartFit}

// ---- 34. check page: every garment with avatar pictures, in all 5 poses
const PZ=[['front','חזית'],['side','צד'],['back','גב'],['half','חצי'],['hip','מותן']];let QF='';
async function qaRender(fig){const id=fig.dataset.qa,v=fig.dataset.v;const slot=slotOf(id);try{const S=Object.assign(newST(),{avbase:'p5',items:{[slot]:id},tf:{},view:v,head:'hair'});
 let tf={x:50,y:50,w:60,r:0};try{tf=await autoTf(slot,id)}catch(_){}try{await smartFit(slot,true,{id,tf,v,g:p5gOfT(id,tf)})}catch(_){}S.tf[slot]=tf;
 fig.querySelector('.mst').innerHTML=await stageInner(S,{})}catch(e){fig.querySelector('.mst').innerHTML='<small>לא הצלחתי לצייר</small>'}}
function openQA(){const d=sheet('qa83','qa83');const all=Object.keys(D).filter(id=>live(id)&&usesPoses(id)&&poses(id)>0);const cats=[...new Set(all.map(slotOf))];const L=QF?all.filter(id=>slotOf(id)==QF):all;
 d.innerHTML=`<div class="sh9h"><h3>בדיקה: כל בגד בכל תנוחה</h3><button class="x" data-qa83x aria-label="סגירה">✕</button></div><div class="qa83b"><p class="m77h">${all.length} בגדים עם תמונות אווטאר. גוללים ובודקים שכל תנוחה יושבת טוב. "לסטודיו" פותח את הבגד לתיקון.</p>
 <div class="m77f"><button data-qa83f="" aria-pressed="${!QF}">הכל ${all.length}</button>${cats.map(s=>`<button data-qa83f="${s}" aria-pressed="${QF==s}">${esc(sname(s))} ${all.filter(id=>slotOf(id)==s).length}</button>`).join('')}</div>
 ${L.map(id=>`<div class="qa83r"><div class="qa83t">${thumb(id)}<b>${esc((D[id].short||'').slice(0,40))}</b><small>${poses(id)}/5 תנוחות</small><button data-qa83s="${id}">לסטודיו</button></div><div class="qa83p">${PZ.map(([k,n])=>`<figure data-qa="${id}" data-v="${k}"><div class="mst"></div><figcaption>${n}</figcaption></figure>`).join('')}</div></div>`).join('')}</div>`;
 if(!d.open)d.showModal();lz(d);
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);qaRender(e.target)}}),{root:d,rootMargin:'300px 0px'});d.querySelectorAll('figure[data-qa]').forEach(f=>io.observe(f))}
window.openQA83=openQA;
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-qa83],[data-qa83x],[data-qa83f],[data-qa83s]');if(!t)return;
 if(t.dataset.qa83x!==undefined){$('#qa83').close();return}if(t.dataset.qa83f!==undefined){QF=t.dataset.qa83f;openQA();return}
 if(t.dataset.qa83s){const id=t.dataset.qa83s;$('#qa83').close();openStudio(null,{[slotOf(id)]:id});return}openQA()});

// ---- 48. studio: once it is open, quietly fetch the other poses so turning the avatar is instant
{const _os=openStudio;let done=false;openStudio=async function(){const r=await _os.apply(this,arguments);if(!done){done=true;setTimeout(()=>{['side','back','half','hip'].forEach(v=>['p5_','p5c_'].forEach(p=>{const i=new Image();i.src=`av/${p}${v}.webp?v=${window.VER||''}`;const j=new Image();j.src=`av/${p}${v}_head.webp?v=${window.VER||''}`}))},1500)}return r}}

// ================= AVATAR =================
// ---- 35. upload several GPT sheets at once
let BU=[];let BUPICK=-1;let BUF='';
function missP(){return Object.keys(D).filter(id=>live(id)&&usesPoses(id)&&!(window.avReady&&avReady(id))).sort((a,b)=>((IT[b]||{}).wear||0)-((IT[a]||{}).wear||0))}
function openBU(){const d=sheet('bu83','bu83');const M=missP();
 const pick=BUPICK>=0?`<div class="bu83pk"><p><b>לאיזה בגד הגיליון הזה?</b></p><div class="m77f">${['',...new Set(M.map(slotOf))].map(s=>`<button data-bu83f="${s}" aria-pressed="${BUF==s}">${s?esc(sname(s)):'הכל'}</button>`).join('')}</div><div class="bu83g">${M.filter(id=>!BUF||slotOf(id)==BUF).slice(0,120).map(id=>`<button data-bu83id="${id}" aria-label="${esc((D[id].short||'').slice(0,40))}">${thumb(id)}<small>${esc((D[id].short||'').slice(0,22))}</small></button>`).join('')}</div><button data-bu83pk="x">ביטול</button></div>`:'';
 d.innerHTML=`<div class="sh9h"><h3>העלאת כמה גיליונות GPT</h3><button class="x" data-bu83x aria-label="סגירה">✕</button></div><div class="bu83b">
 <p class="m77h">1. בוחרים כמה גיליונות מהגלריה. 2. ליד כל גיליון בוחרים לאיזה בגד הוא. 3. "להעלות הכל".</p>
 <label class="go bu83in">🖼 בחירת גיליונות<input type="file" accept="image/*" multiple hidden data-bu83in></label>
 ${BU.map((b,i)=>`<div class="bu83r"><img src="${b.u}" alt=""><div><b>${b.id?esc((D[b.id].short||'').slice(0,40)):'עוד לא נבחר בגד'}</b><small>${b.st||''}</small><div class="bu83a"><button data-bu83p="${i}">${b.id?'להחליף בגד':'לבחור בגד'}</button><button data-bu83del="${i}" aria-label="הסרה">🗑</button></div></div>${b.id?thumb(b.id):''}</div>`).join('')}
 ${BU.length?`<button class="go" data-bu83go ${BU.some(b=>b.id&&!b.ok)?'':'disabled'}>⬆ להעלות הכל (${BU.filter(b=>b.id&&!b.ok).length})</button>`:''}${pick}</div>`;
 if(!d.open)d.showModal();lz(d);if(BUPICK>=0)d.querySelector('.bu83pk')?.scrollIntoView({block:'start'})}
window.openBU83=openBU;
document.addEventListener('change',e=>{const i=e.target.closest&&e.target.closest('[data-bu83in]');if(!i)return;[...i.files].forEach(f=>BU.push({f,u:URL.createObjectURL(f),id:''}));openBU()});
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-bu83],[data-bu83x],[data-bu83p],[data-bu83del],[data-bu83id],[data-bu83f],[data-bu83pk],[data-bu83go]');if(!t)return;
 if(t.dataset.bu83x!==undefined){$('#bu83').close();return}
 if(t.dataset.bu83p){BUPICK=+t.dataset.bu83p;openBU();return}
 if(t.dataset.bu83pk){BUPICK=-1;openBU();return}
 if(t.dataset.bu83f!==undefined){BUF=t.dataset.bu83f;openBU();return}
 if(t.dataset.bu83id){if(BU[BUPICK])BU[BUPICK].id=t.dataset.bu83id;BUPICK=-1;openBU();return}
 if(t.dataset.bu83del){BU.splice(+t.dataset.bu83del,1);openBU();return}
 if(t.dataset.bu83go!==undefined){t.disabled=true;for(const b of BU){if(!b.id||b.ok)continue;b.st='מעלה…';openBU();try{await upP5g(b.id,b.f,'replace');b.ok=true;b.st='✓ הועלה'}catch(err){b.st='✗ לא הצליח'}openBU()}
  const n=BU.filter(b=>b.ok).length;setTimeout(()=>toast(`✓ הועלו ${n} גיליונות`),80);BU=BU.filter(b=>!b.ok);openBU();return}
 openBU()});

// ================= LOOKS =================
// ---- 41. weekly board: drag a look onto a day (or tap a look, then a day)
let WPICK='';
function weekBoard(){const b=$('#hbody');if(!b||!b.querySelector('.week')||b.querySelector('.wl83'))return;const ls=Object.values(LOOKS||{}).filter(l=>l&&l.items);
 b.querySelector('.week').insertAdjacentHTML('beforebegin',`<div class="wl83"><p class="m" style="padding:0">${ls.length?'גוררים לוק ליום (או לוחצים על לוק ואז על יום):':'שומרים לוקים באלבום, והם יופיעו כאן לגרירה.'}</p><div class="wl83r">${ls.map(l=>`<button class="wl83c${WPICK==l.id?' on':''}" data-wl83="${l.id}">${Object.values(l.items).filter(id=>D[id]).slice(0,3).map(thumb).join('')}<small>${esc((l.name||'לוק').slice(0,18))}</small></button>`).join('')}</div></div>`);
 [...b.querySelectorAll('.week .wd')].forEach((w,i)=>w.dataset.wd83=i);lz(b)}
async function setDay(i,lid){PLAN.days=PLAN.days||{};PLAN.days[i]=lid;WPICK='';try{await savePlan()}catch(_){}renderHub();setTimeout(()=>toast(`✓ ${(LOOKS[lid]||{}).name||'הלוק'} ל${DAYS[i]}`),60)}
{let drag=null;document.addEventListener('pointerdown',e=>{const c=e.target.closest&&e.target.closest('[data-wl83]');if(!c)return;drag={id:c.dataset.wl83,x:e.clientX,y:e.clientY,g:null,c}});
 document.addEventListener('pointermove',e=>{if(!drag)return;if(!drag.g){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<12)return;drag.g=drag.c.cloneNode(true);drag.g.className='wl83g';document.body.appendChild(drag.g)}
  drag.g.style.left=e.clientX+'px';drag.g.style.top=e.clientY+'px';document.querySelectorAll('.wd.ov83').forEach(x=>x.classList.remove('ov83'));const el=document.elementFromPoint(e.clientX,e.clientY);const w=el&&el.closest&&el.closest('[data-wd83]');if(w)w.classList.add('ov83')});
 document.addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;if(!d.g)return;d.g.remove();document.querySelectorAll('.wd.ov83').forEach(x=>x.classList.remove('ov83'));const el=document.elementFromPoint(e.clientX,e.clientY);const w=el&&el.closest&&el.closest('[data-wd83]');if(w)setDay(+w.dataset.wd83,d.id);d.c.dataset.nc83=1;setTimeout(()=>delete d.c.dataset.nc83,50)});
 document.addEventListener('pointercancel',()=>{if(drag&&drag.g)drag.g.remove();drag=null})}
document.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('[data-wl83]');if(c){if(c.dataset.nc83)return;WPICK=WPICK==c.dataset.wl83?'':c.dataset.wl83;document.querySelectorAll('[data-wl83]').forEach(x=>x.classList.toggle('on',x.dataset.wl83==WPICK));if(WPICK)toast('עכשיו לחצי על יום');return}
 const w=WPICK&&e.target.closest&&e.target.closest('[data-wd83]');if(w&&!e.target.closest('button[data-wdel],[data-open]')){setDay(+w.dataset.wd83,WPICK)}});

// ---- 42/43. album (occasion filter was already there): filter by event name, sort by stars, rate with a tap, give a look an event name
let AF='',AS=lsG('as83')||'new';const OCCN={day:'חול',shab:'שבת',event:'אירוע',work:'עבודה'};
function albumTools(){const b=$('#hbody');if(!b||TAB!='album')return;const cards=[...b.querySelectorAll('.ac')];if(!cards.length)return;const lid=c=>(c.querySelector('[data-sedit]')||{}).dataset?.sedit;
 const evs=[...new Set(Object.values(LOOKS).map(l=>l.ev).filter(Boolean))];const occs=[...new Set(Object.values(LOOKS).map(l=>l.occ).filter(Boolean))];
 let bar=b.querySelector('.af83');if(!bar){bar=document.createElement('div');bar.className='af83';cards[0].parentElement.insertBefore(bar,cards[0].parentElement.firstChild==cards[0]?cards[0]:cards[0].parentElement.firstChild);if(!bar.isConnected)b.prepend(bar)}
 bar.innerHTML=`${evs.length?`<div class="m77f"><button data-af83="" aria-pressed="${!AF}">כל האירועים שלי</button>`:''}${evs.map(v=>`<button data-af83="e:${esc(v)}" aria-pressed="${AF=='e:'+v}">🏷 ${esc(v)}</button>`).join('')}${evs.length?'</div>':''}
 <label class="as83">מיון <select data-as83><option value="new" ${AS=='new'?'selected':''}>חדש קודם</option><option value="star" ${AS=='star'?'selected':''}>★ הכי אהבתי</option><option value="name" ${AS=='name'?'selected':''}>לפי שם</option></select></label>`;
 cards.forEach(c=>{const id=lid(c);const l=LOOKS[id];if(!l)return;let ok=true;if(AF.startsWith('o:'))ok=l.occ==AF.slice(2);if(AF.startsWith('e:'))ok=l.ev==AF.slice(2);c.classList.toggle('hide',!ok);
  if(!c.querySelector('.st83'))c.insertAdjacentHTML('beforeend',`<div class="st83" data-lid="${id}">${[1,2,3,4,5].map(n=>`<button data-st83="${n}" aria-label="${n} כוכבים" class="mini ${(l.rating||0)>=n?'on':''}">★</button>`).join('')}<button data-ev83="${id}" class="mini ev83">🏷 ${esc(l.ev||'אירוע')}</button></div>`)});
 const k=c=>{const l=LOOKS[lid(c)]||{};return AS=='star'?-(l.rating||0):AS=='name'?0:-(+new Date(l.created||l.date||0))};
 const par=cards[0].parentElement;cards.slice().sort((a,b)=>AS=='name'?String((LOOKS[lid(a)]||{}).name||'').localeCompare(String((LOOKS[lid(b)]||{}).name||''),'he'):k(a)-k(b)).forEach(c=>par.appendChild(c))}
async function saveL(id){try{await saveDoc('looks',id,LOOKS[id])}catch(e){ERR('look',e)}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-af83],[data-st83],[data-ev83]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.af83!==undefined){AF=t.dataset.af83;albumTools();return}
 const box=t.closest('.st83');const id=box&&box.dataset.lid;if(!id||!LOOKS[id])return;
 if(t.dataset.st83){const n=+t.dataset.st83;LOOKS[id].rating=LOOKS[id].rating==n?0:n;box.querySelectorAll('[data-st83]').forEach(s=>s.classList.toggle('on',+s.dataset.st83<=LOOKS[id].rating));await saveL(id);return}
 if(t.dataset.ev83){if(box.querySelector('input'))return;t.insertAdjacentHTML('afterend',`<span class="ev83e"><input placeholder="חתונה, בר מצווה, שבת חתן…" value="${esc(LOOKS[id].ev||'')}" list="ev83l"><datalist id="ev83l">${[...new Set(Object.values(LOOKS).map(l=>l.ev).filter(Boolean))].map(v=>`<option value="${esc(v)}">`).join('')}</datalist><button class="mini" data-ev83ok>שמירה</button></span>`);box.querySelector('input').focus()}},true);
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-ev83ok]');if(!t)return;e.preventDefault();e.stopPropagation();const box=t.closest('.st83');const id=box.dataset.lid;const v=box.querySelector('input').value.trim().slice(0,30);
 LOOKS[id].ev=v||undefined;if(!v)delete LOOKS[id].ev;await saveL(id);box.querySelector('.ev83').textContent='🏷 '+(v||'אירוע');box.querySelector('.ev83e').remove();albumTools()},true);
document.addEventListener('change',e=>{const s=e.target.closest&&e.target.closest('[data-as83]');if(!s)return;AS=s.value;lsS('as83',AS);albumTools()});

// ---- 44. closet gaps: colours you love that are missing in a type
function gaps(){const ids=Object.keys(D).filter(live);const fams=['שחור','לבן','חום','בז׳','כחול','ירוק','אדום','ורוד','סגול','אפור'];
 const T=[['skirts','חצאית'],['tops','חולצה'],['sweaters','סוודר'],['dresses','שמלה'],['scarves','כיסוי ראש'],['shoes','נעליים'],['outer','ז׳קט']];
 const cnt={};ids.forEach(id=>{const c=curCat(id),f=famOf(id);if(!f)return;cnt[c]=cnt[c]||{};cnt[c][f]=(cnt[c][f]||0)+1});const tot=f=>T.reduce((s,[c])=>s+((cnt[c]||{})[f]||0),0);
 const tips=[];fams.forEach(f=>{const n=tot(f);if(n<5)return;T.forEach(([c,nm])=>{if(!((cnt[c]||{})[f])&&['skirts','tops','scarves','shoes'].includes(c))tips.push([n,`יש לך ${n} בגדים ב${f}, אבל אין ${nm} ב${f}.`])})});tips.sort((a,b)=>b[0]-a[0]);
 return `<h3>צבעים וסוגים שחסרים</h3>${tips.length?'<ul>'+tips.slice(0,8).map(t=>`<li>${esc(t[1])}</li>`).join('')+'</ul>':'<p>אין חורים בולטים.</p>'}
 <div class="gp83"><table class="storet"><tr><th></th>${T.map(t=>`<th>${t[1]}</th>`).join('')}</tr>${fams.map(f=>`<tr><th>${f}</th>${T.map(([c])=>{const n=(cnt[c]||{})[f]||0;return `<td class="${n?'':'z'}">${n||'–'}</td>`}).join('')}</tr>`).join('')}</table></div>`}
if(typeof insights=='function'){const _in=insights;insights=function(){let h=_in.apply(this,arguments);try{const g=gaps();const i=h.indexOf('<h3>תקציב חודשי');h=i>0?h.slice(0,i)+g+h.slice(i):g+h}catch(e){ERR('gaps',e)}return h}}

// ---- 46. shopping list that checks "already have something similar"
const shop=()=>((typeof SET!='undefined'&&SET.shop83)||[]);
function shopHTML(){const L=shop();const sim=t=>{try{return (checkSimilar(t).match(/data-open=/g)||[]).length}catch(_){return 0}};
 return `<div class="sp83"><h3>🛒 רשימת קניות</h3><p class="m" style="padding:0">כותבים מה רוצים לקנות, ואני בודקת אם כבר יש משהו דומה בארון.</p><div class="hrow"><input id="sp83in" placeholder="למשל: חצאית קפלים שחורה"><button class="go" data-sp83add>הוספה</button></div>
 ${L.length?`<ul class="sp83l">${L.map((x,i)=>{const n=sim(x.t);return `<li class="${x.ok?'ok':''}"><button class="mini" data-sp83ok="${i}" aria-label="קניתי">${x.ok?'✓':'○'}</button><span>${esc(x.t)}</span>${n?`<button class="mini sim" data-sp83sim="${i}">יש לך ${n} דומים</button>`:'<small>אין דומה בארון</small>'}<button class="mini" data-sp83del="${i}" aria-label="מחיקה">🗑</button></li>`}).join('')}</ul><div id="sp83res"></div>`:''}</div>`}
async function saveShop(L){SET.shop83=L;try{await saveSet()}catch(_){}const b=$('#hbody .sp83');if(b)b.outerHTML=shopHTML()}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sp83add],[data-sp83ok],[data-sp83del],[data-sp83sim]');if(!t)return;e.preventDefault();const L=shop().slice();
 if(t.dataset.sp83add!==undefined){const v=($('#sp83in').value||'').trim();if(v){L.push({t:v.slice(0,80),d:tIso()});saveShop(L)}return}
 if(t.dataset.sp83ok){L[+t.dataset.sp83ok]=Object.assign({},L[+t.dataset.sp83ok],{ok:!L[+t.dataset.sp83ok].ok});saveShop(L);return}
 if(t.dataset.sp83del){L.splice(+t.dataset.sp83del,1);saveShop(L);return}
 if(t.dataset.sp83sim){const r=$('#sp83res');if(r){r.innerHTML=checkSimilar(L[+t.dataset.sp83sim].t);lz(r);r.scrollIntoView({behavior:'smooth',block:'nearest'})}}});
document.addEventListener('keydown',e=>{if(e.key=='Enter'&&e.target.id=='sp83in'){e.preventDefault();$('[data-sp83add]')?.click()}});

{const _rh=renderHub;renderHub=function(){const r=_rh.apply(this,arguments);const after=()=>{try{if(TAB=='week')weekBoard();if(TAB=='check'&&!$('#hbody .sp83'))$('#hbody').insertAdjacentHTML('beforeend',shopHTML());if(TAB=='album')albumTools()}catch(e){ERR('hub',e)}};
 if(r&&typeof r.then=='function')r.then(after);else after();setTimeout(after,350);return r}}

// ================= SAFETY =================
// ---- 50. backup: an automatic daily copy inside the site (last 7 days) + "גיבוי לקובץ" in the menu
function snap(){return {v:window.VER||'',t:new Date().toISOString(),items:IT,looks:LOOKS,plan:PLAN,settings:SET}}
async function autoBackup(){try{if(!DB||lsG('bk83')==tIso())return;const s=snap();const data={t:s.t,v:s.v,items:JSON.stringify(s.items),looks:JSON.stringify(s.looks),plan:JSON.stringify(s.plan),settings:JSON.stringify(s.settings)};
 await DB.collection('backup83').doc(tIso()).set(data);lsS('bk83',tIso());const old=JSON.parse(lsG('bk83l')||'[]').filter(d=>d!=tIso());old.push(tIso());while(old.length>7){const d=old.shift();try{await DB.collection('backup83').doc(d).delete()}catch(_){}}lsS('bk83l',JSON.stringify(old))}catch(e){ERR('backup',e)}}
async function fileBackup(){try{const bl=new Blob([JSON.stringify(snap(),null,1)],{type:'application/json'});const dl=await claude.use('downloads');if(!dl){toast('שמירה לקובץ לא זמינה כאן');return}
 await dl.save({filename:`גיבוי-הארון-${tIso()}.json`,data:bl});toast('✓ הגיבוי נשמר')}catch(e){toast(e&&e.code=='declined'?'בוטל':'לא הצלחתי לשמור')}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-bk83],[data-qa83open],[data-bu83open]');if(!t)return;e.preventDefault();
 if(t.dataset.bk83!==undefined)return fileBackup();if(t.dataset.qa83open!==undefined){try{$('#more9').close()}catch(_){}return openQA()}if(t.dataset.bu83open!==undefined){try{$('#more9').close()}catch(_){}try{$('#miss77').close()}catch(_){}return openBU()}});
function entries(){const e7=document.querySelector('#more9 .e77');if(e7&&!e7.querySelector('[data-bk83]'))e7.insertAdjacentHTML('beforeend','<button data-bu83open>⬆ העלאת כמה גיליונות</button><button data-qa83open>🔍 בדיקת כל התנוחות</button><button data-bk83>💾 גיבוי לקובץ</button>');
 const m=$('#miss77');if(m&&m.open&&!m.querySelector('[data-bu83open]')){const p=m.querySelector('.p80open')||m.querySelector('.m77s');if(p)p.insertAdjacentHTML('afterend','<button class="bu83open" data-bu83open>⬆ העלאת כמה גיליונות בבת אחת</button>')}
 const sm=document.querySelector('#studio .smenu');if(sm&&!sm.querySelector('[data-qa83open]'))sm.insertAdjacentHTML('beforeend','<button data-qa83open>🔍 בדיקת כל התנוחות</button>')}
new MutationObserver(()=>{if($('#miss77')?.open&&!$('#miss77').querySelector('[data-bu83open]'))entries()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['open']});

// ---------- boot + keep fresh
let _t=0;const go=()=>{clearTimeout(_t);_t=setTimeout(()=>{for(const [n,f] of [['hol',paintHol],['week',paintWeek],['ret',paintRet],['sort',addSorts],['cards',paintCards],['tools',toolsRow],['idx',paintIdx],['mic',voiceBtn],['entries',entries]]){try{f()}catch(e){ERR(n,e)}}ixShow()},450)};
setTimeout(go,1400);setTimeout(go,4400);setTimeout(autoBackup,9000);
{const _pa=paintAll;paintAll=function(){const r=_pa.apply(this,arguments);go();return r}}
{const _ap=apply;apply=function(){const r=_ap.apply(this,arguments);clearTimeout(apply._t83);apply._t83=setTimeout(()=>{try{paintIdx();ixShow()}catch(_){}},200);return r}}
})();
