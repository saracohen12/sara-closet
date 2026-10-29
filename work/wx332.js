// v332 (Sara 29/10 10:02 "תלביש לי כל יום 5 בובות … מה כדאי לי ללבוש היום … אני גרה במודיעין אלית … אם יורד גשם … אל תשכחי לקחת מטריה, ואם ממש קר, לקחת מעיל …
// שרה, אלו הלוקים שאני ממליץ לך להתלבש היום, מהכיסוי עד הנעליים"): a page "☀ מה ללבוש היום". Today's weather in Modiin Illit at the top, reminders
// (umbrella, coat, hot day), and 5 of her turning dolls, each in a whole look built only from items already on the avatar (R360.looks).
// The looks stay the same all day ("↻ לוקים אחרים" makes new ones). The weather: open-meteo from the page; if the page can't reach it, the doc wx/today that
// Claude writes; if neither, the usual weather for the month. She can always say it herself (☀ חם / 🌤 נעים / 🥶 קר / 🌧 גשם).
;(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v332 '+w+': '+(e&&e.message||e))
const esc=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))
const LS=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(_){return null}},LSS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}}
const toast=m=>(window.toast||(()=>{}))(m)
const N=5,LAT=31.93,LON=35.04
const day=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}

// ---------- the weather ----------
const WC=c=>c==null?['🌤','']:c==0?['☀','שמש']:c<=2?['🌤','מעונן חלקית']:c==3?['☁','מעונן']:c<=48?['🌫','ערפל']:c<=57?['🌦','טפטוף']:c<=67?['🌧','גשם']:c<=77?['🌨','שלג']:c<=82?['🌧','ממטרים']:['⛈','סופת רעמים']
// usual weather in Modiin Illit by month, when nothing else is known
const CLIM=[[15,7,40],[16,8,40],[19,9,25],[23,12,10],[27,15,0],[29,18,0],[31,20,0],[31,20,0],[29,19,0],[27,16,10],[22,12,25],[17,9,40]]
async function viaPage(){const u=`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,weather_code,wind_speed_10m_max&current=temperature_2m,weather_code&timezone=Asia%2FJerusalem&forecast_days=1`
 const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),6000)
 try{const r=await fetch(u,{signal:ctl.signal});if(!r.ok)throw new Error('http '+r.status);const j=await r.json(),d=j.daily||{}
  return {d:day(),hi:Math.round(d.temperature_2m_max[0]),lo:Math.round(d.temperature_2m_min[0]),rain:d.precipitation_probability_max[0]||0,mm:d.precipitation_sum[0]||0,
   code:d.weather_code[0],wind:Math.round(d.wind_speed_10m_max[0]||0),now:j.current?Math.round(j.current.temperature_2m):null,src:'live'}}finally{clearTimeout(t)}}
async function viaDb(){const db=await window.claude?.use?.('db');if(!db)return null;const g=await db.collection('wx').doc('today').get();const v=g&&g.exists&&g.data&&g.data()
 return v&&v.d==day()?Object.assign({},v,{src:'claude'}):null}
async function probe(ok,err){try{if(LS('wx332p')==day())return;LSS('wx332p',day());const db=await window.claude?.use?.('db');if(db)await db.collection('wx').doc('probe').set({t:new Date().toISOString(),ok:!!ok,err:String(err||'').slice(0,200)})}catch(_){}}
async function weather(){const c=LS('wx332w');if(c&&c.d==day()&&c.src&&(c.src!='clim'||Date.now()-(c.at||0)<36e5))return c
 let w=null,e0=''
 try{w=await viaPage()}catch(e){e0=e&&e.message||String(e)}
 probe(!!w,e0)
 if(!w)try{w=await viaDb()}catch(_){}
 if(!w){const m=CLIM[new Date().getMonth()];w={d:day(),hi:m[0],lo:m[1],rain:m[2],mm:0,code:null,src:'clim'}}
 w.at=Date.now();LSS('wx332w',w);return w}
// what she says herself wins for today
const SAY={hot:{hi:31,lo:21,rain:0,mm:0,code:0,t:'☀ חם'},nice:{hi:24,lo:15,rain:0,mm:0,code:1,t:'🌤 נעים'},cold:{hi:14,lo:7,rain:10,mm:0,code:3,t:'🥶 קר'},rain:{hi:17,lo:10,rain:90,mm:6,code:63,t:'🌧 גשם'}}
function cur(w){const s=LS('wx332s');return s&&s.d==day()&&SAY[s.k]?Object.assign({},w,SAY[s.k],{say:s.k}):w}

function tips(w){const L=[],rain=(+w.rain||0)>=40||(+w.mm||0)>=1
 if(rain)L.push(['☔','אל תשכחי לקחת מטריה!'+((+w.rain||0)>=40&&w.rain<100?` (${w.rain}% סיכוי לגשם)`:'')])
 if(w.hi<15||w.lo<8)L.push(['🧥','ממש קר היום – לקחת מעיל חם'])
 else if(w.hi<19)L.push(['🧥','קריר היום – כדאי מעיל או ז׳קט'])
 if(w.lo<=14&&w.hi>=19)L.push(['🧶','בערב מתקרר – קחי משהו חם'])
 if(w.hi>=30)L.push(['💧','חם מאוד – בגדים קלילים, ולשתות הרבה מים'])
 if((+w.wind||0)>=30)L.push(['🌬','רוח חזקה – כדאי סיכה טובה לכיסוי'])
 if(!L.length)L.push(['😊','מזג אוויר נעים – אפשר ללבוש מה שאת אוהבת'])
 return L}

// ---------- the page ----------
let dlg=null,ST=[],W=null,BUSY=false
function build(){dlg=document.createElement('dialog');dlg.id='wx332';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','wx332t')
 dlg.innerHTML=`<div class="wxw"><header class="wxh"><button type="button" class="wxx" aria-label="סגירה">✕</button><h2 id="wx332t">☀ מה ללבוש היום</h2></header>
  <section class="wxs" aria-live="polite"></section><div class="wxl"></div></div>`
 document.body.appendChild(dlg)
 dlg.addEventListener('close',clear)
 dlg.addEventListener('click',onClick)}
function clear(){ST.forEach(s=>{try{s.stop();R360.unstage&&R360.unstage(s)}catch(_){}});ST=[]}
function head(w){const [ic,tx]=WC(w.code),T=tips(w),dd=new Date().toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'long'})
 const src=w.say?'לפי מה שאמרת':w.src=='live'?'תחזית עכשווית':w.src=='claude'?'תחזית של היום':'מזג אוויר רגיל לחודש הזה – אפשר לתקן למטה'
 return `<div class="wxwx"><span class="wxi" aria-hidden="true">${ic}</span><div><b>מודיעין עילית · ${esc(dd)}</b>
  <p class="wxt"><bdi dir="ltr">${w.hi}°</bdi> / <bdi dir="ltr">${w.lo}°</bdi>${tx?' · '+tx:''}${(+w.rain||0)>=20?` · ☔ ${w.rain}%`:''}${w.now!=null?` · עכשיו <bdi dir="ltr">${w.now}°</bdi>`:''}</p><small>${src}</small></div></div>
  <ul class="wxtips">${T.map(([i,t])=>`<li><span aria-hidden="true">${i}</span>${esc(t)}</li>`).join('')}</ul>
  <div class="wxsay" role="group" aria-label="איך מזג האוויר אצלך?"><small>זה לא נכון?</small>${Object.entries(SAY).map(([k,v])=>`<button type="button" data-wxsay="${k}" aria-pressed="${w.say==k}">${v.t}</button>`).join('')}${w.say?'<button type="button" data-wxsay="">↺ תחזית</button>':''}</div>
  <h3 class="wxhi">שרה, אלו הלוקים שאני ממליץ לך היום 💕</h3><p class="wxsub">מהכיסוי ועד הנעליים, רק מבגדים שכבר על האווטאר שלך. לגעת בבובה כדי לסובב אותה.</p>`}
const CATN={dresses:'שמלה',sets:'סט',tops:'חולצה',base:'חולצת בסיס',sweaters:'סוודר',skirts:'חצאית',outer:'מעיל / ז׳קט',shoes:'נעליים',belts:'חגורה',jewelry:'תכשיט',bags:'תיק',scarves:'כיסוי'}
function lookCard(L,i,w){const nm=id=>R360.nm(id),c=id=>R360.catOf(id)
 const coat=L.ids.find(id=>c(id)=='outer'),why=coat&&((+w.rain||0)>=40||(+w.mm||0)>=1)?'☔ עם מעיל, כי יורד גשם':coat&&w.hi<19?'🧥 עם מעיל, כי קר':''
 return `<article class="wxc" data-wxi="${i}"><div class="wxst" data-wxst="${i}"></div><div class="wxcb"><b>לוק ${i+1}</b>${why?`<small class="wxwhy">${why}</small>`:''}
  <ul>${L.ids.map(id=>`<li><button type="button" class="wxit" data-open="${esc(id)}"><img alt="" data-th="${esc(id)}" src="${esc(R360.ph(id))}"><span><small>${CATN[c(id)]||''}</small>${esc(nm(id))}</span></button></li>`).join('')}</ul>
  <div class="wxa"><button type="button" class="pri" data-wxwear="${i}">👗 לבשתי / ללבוש בסטודיו</button><button type="button" data-wxpin="${i}">📌 לדף הבית</button></div></div></article>`}
async function looks(w,fresh){const k=day()+'|'+(w.say||'')+'|'+Math.round(w.hi/3)+'|'+((+w.rain||0)>=40||(+w.mm||0)>=1?1:0),c=LS('wx332l')
 if(!fresh&&c&&c.k==k&&Array.isArray(c.L)&&c.L.length&&c.L.every(L=>L.ids.every(id=>D[id])))return c
 const r=await R360.looks(w,N);const o={k,L:r.looks,ready:r.ready,bases:r.bases};LSS('wx332l',o);return o}
async function paint(fresh){if(BUSY)return;BUSY=true;const sec=dlg.querySelector('.wxs'),box=dlg.querySelector('.wxl')
 try{clear();box.innerHTML='<p class="wxwait">רגע, בונה לך את הלוקים…</p>'
  W=W||await weather();const w=cur(W);sec.innerHTML=head(w)
  const o=await looks(w,fresh)
  if(!o.L.length){box.innerHTML=`<p class="wxwait">עוד אין מספיק בגדים על האווטאר בשביל לוק שלם (צריך שמלה, או חולצה וחצאית). כל בגד שתעלי לאווטאר – יופיע כאן.</p>`;return}
  box.innerHTML=o.L.map((L,i)=>lookCard(L,i,w)).join('')+`<div class="wxmore">${o.L.length<N?`<p>יש כרגע ${o.L.length} ${o.L.length==1?'לוק':'לוקים'} – כל בגד שתעלי לאווטאר יוסיף עוד.</p>`:''}<button type="button" data-wxnew>↻ לוקים אחרים</button></div>`
  try{new Set(o.L.flatMap(L=>L.ids).map(id=>R360.catOf(id))).forEach(c=>thLoad(c).then(()=>thApply(TH)))}catch(_){}
  o.L.forEach((L,i)=>{const h=box.querySelector(`[data-wxst="${i}"]`);if(!h)return;try{const s=R360.Stage(h,{speed:260,state:()=>L.s});ST.push(s);s.el.addEventListener('click',()=>{s.playing()?s.stop():s.play()})}catch(e){ERR('stage',e)}})
  setTimeout(()=>{ST.forEach((s,i)=>setTimeout(()=>{try{if(dlg.open)s.play(true)}catch(_){}},i*500))},900)
  window.__wx332=o}catch(e){ERR('paint',e);box.innerHTML='<p class="wxwait">משהו לא עבד. נסי שוב בעוד רגע.</p>'}finally{BUSY=false}}
function onClick(e){const t=e.target
 if(t===dlg||t.closest('.wxx'))return dlg.close()
 const b=t.closest('button');if(!b)return
 if(b.dataset.wxsay!=null){LSS('wx332s',b.dataset.wxsay?{d:day(),k:b.dataset.wxsay}:null);paint(false);return}
 if(b.hasAttribute('data-wxnew')){paint(true);toast('↻ לוקים חדשים');return}
 const o=window.__wx332||{L:[]}
 if(b.dataset.wxwear!=null){const L=o.L[+b.dataset.wxwear];if(L){dlg.close();R360.wearState(L.s)}return}
 if(b.dataset.wxpin!=null){const L=o.L[+b.dataset.wxpin];if(L){dlg.close();R360.pinState(L.s,'לוק '+(+b.dataset.wxpin+1)+' של היום')}return}
 if(b.dataset.open){dlg.close();try{openItem(b.dataset.open)}catch(_){}}}
function open(){if(!window.R360||!R360.looks)return toast('האווטאר עוד נטען, נסי שוב בעוד רגע');if(!dlg)build();if(!dlg.open)dlg.showModal();dlg.scrollTop=0;paint(false)}

// ---------- on the home page: one big button with today's weather ----------
async function homeBtn(){try{let b=document.querySelector('.wx332b');const c=document.querySelector('#h180 .z-txt');if(!c)return
 if(!b){b=document.createElement('button');b.type='button';b.className='wx332b';b.addEventListener('click',open)}
 if(b.parentNode!=c)c.append(b)
 const w=cur(W||LS('wx332w')||{hi:'',lo:''}),[ic]=WC(w.code),rain=(+w.rain||0)>=40||(+w.mm||0)>=1
 const h=`<span class="wxbi" aria-hidden="true">${ic}</span><span><b>מה ללבוש היום?</b><small>${w.hi!==''&&w.hi!=null?`<bdi dir="ltr">${w.hi}°/${w.lo}°</bdi> · `:''}5 לוקים לפי מזג האוויר${rain?' · ☔ מטריה':''}</small></span><span class="wxbg" aria-hidden="true">›</span>`
 if(b.innerHTML!=h)b.innerHTML=h}catch(e){ERR('home',e)}}
;[800,2500,6000].forEach(t=>setTimeout(homeBtn,t))
setTimeout(async()=>{try{W=await weather();homeBtn()}catch(_){}},3000)
setInterval(()=>{if(!document.hidden)homeBtn()},5000)

window.WX332={open,weather:()=>W}
})()
