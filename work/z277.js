// v277 redesign, screen 1 (Sara 28/10 04:57 "התוכנית מאושרת"): the clean look html[data-d180=z50] – a home that fits one phone screen
// and 4 tabs at the bottom: בית · הארון · סטודיו · עוד. Nothing moves out of its own script: the home is #h180 laid out again by z277.css,
// plus "מה מחכה לך" from the admin panel's counts. The old designs stay in 🎨 (the way back).
(function(){
const H=document.documentElement,B=document.body;
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v277 '+w+': '+(e&&e.message||e));
const on=()=>H.dataset.d180=='z50';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// once: the new look becomes hers; 🎨 still has פנינה / לילה / טרה / הקודם
try{if(!localStorage.getItem('z277mig')){localStorage.setItem('z277mig','1');localStorage.setItem('d180seen','1');if(window.D180)D180.set('z50')}}catch(_){}

// ---------- one set of line icons (24×24, stroke) ----------
const P={
 home:'<path d="M3.5 10.2 12 3.5l8.5 6.7V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-6h-5.6v6H5A1.5 1.5 0 0 1 3.5 19z"/>',
 closet:'<path d="M12 7.2a2.1 2.1 0 1 1 2.1-2.1c0 1.1-.9 1.5-2.1 2.3V9l8.4 6.6c.9.7.4 2.1-.7 2.1H4.3c-1.1 0-1.6-1.4-.7-2.1L12 9"/>',
 studio:'<path d="M9.4 3.5h5.2l-.9 3.6 3.6 4.4 1.4 9H5.3l1.4-9 3.6-4.4z"/><path d="M9.6 11.5h4.8"/>',
 more:'<circle cx="5.5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18.5" cy="12" r="1.3"/>',
 orders:'<path d="M3.5 7.6 12 3.5l8.5 4.1v8.8L12 20.5l-8.5-4.1z"/><path d="M3.5 7.6 12 11.8l8.5-4.2M12 11.8v8.7"/>',
 smart:'<rect x="4.5" y="3.5" width="15" height="17" rx="2"/><path d="M12 3.5v17M10 11v2M14 11v2"/>',
 shop:'<path d="M5.5 8.5h13l-1 12h-11z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
 alerts:'<path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2h-14z"/><path d="M10 20.5h4"/>',
 soon:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
 refund:'<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.1 0-2-.4-2.5-1.2M12 6.5V8m0 8v1.5"/>',
 oosw:'<circle cx="12" cy="12" r="8.5"/><path d="m9 9 6 6m0-6-6 6"/>',
 transit:'<path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.2v3.3h-7"/><circle cx="6.5" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/>',
 avno:'<circle cx="12" cy="6.5" r="3"/><path d="M6 20.5c.4-4.6 2.6-7 6-7s5.6 2.4 6 7"/>',
 fix:'<circle cx="6.5" cy="7" r="2.5"/><circle cx="6.5" cy="17" r="2.5"/><path d="M8.6 8.4 20 17M8.6 15.6 20 7"/>',
 nofit:'<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10 8v4.5M13.5 8v3M17 8v4.5"/>',
 dups:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
 tkwait:'<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3.5h6v1M8.5 10h7M8.5 13.5h7M8.5 17h4"/>',
 pause:'<path d="M9 6v12M15 6v12"/>',play:'<path d="M8 5.5v13l10-6.5z"/>',
 speed:'<path d="M4 15a8 8 0 1 1 16 0"/><path d="m12 15 4-5"/>',chev:'<path d="m14.5 6-6 6 6 6"/>'};
const svg=(k,a='')=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${a}>${P[k]}</svg>`;
// the same icons as CSS masks, for buttons other scripts paint (orders, smart closet, shopping)
{const u=k=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P[k]}</svg>`)}")`;
 const st=document.createElement('style');st.id='z277ic';
 st.textContent=[['#ord123b','orders'],['#sc185b','smart'],['#sh187b','shop']].map(([q,k])=>`html[data-d180=z50] #h180 ${q}::before{-webkit-mask-image:${u(k)};mask-image:${u(k)}}`).join('\n')+
  `\nhtml[data-d180=z50] #h180 .z-pp::before{-webkit-mask-image:${u('pause')};mask-image:${u('pause')}}\nhtml[data-d180=z50] #h180 .z-pp[aria-pressed=true]::before{-webkit-mask-image:${u('play')};mask-image:${u('play')}}`;
 document.head.appendChild(st)}

// ---------- the 4 tabs ----------
const TABS=[['home','בית'],['closet','הארון'],['studio','סטודיו'],['more','עוד']];
const nav=document.createElement('nav');nav.className='z5nav';nav.setAttribute('aria-label','ניווט ראשי');
nav.innerHTML=TABS.map(([k,n])=>`<button type="button" data-zt="${k}">${svg(k)}<span>${n}</span>${k=='more'?'<b class="z5bd" hidden></b>':''}</button>`).join('');
B.appendChild(nav);
let TAB='home';
function paintNav(){nav.querySelectorAll('[data-zt]').forEach(b=>{const k=b.dataset.zt;if(k=='home'||k=='closet')b.setAttribute('aria-current',k==TAB?'page':'false')})}
function tab(t,keep){TAB=t;B.dataset.z50=t;paintNav();if(!keep)window.scrollTo(0,0);if(t=='home')paintWait()}
tab('home',1);
// other scripts that show the closet's list call zCloset() first (filters, categories, search "see them all"); the pin-a-look jump calls zHome()
window.zCloset=()=>{if(on()&&TAB!='closet')tab('closet',1)};
window.zHome=()=>{if(on())tab('home')};
nav.addEventListener('click',e=>{const b=e.target.closest('[data-zt]');if(!b)return;const k=b.dataset.zt;
 try{if(k=='home'||k=='closet'){document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});B.style.overflow='';tab(k)}
  else if(k=='studio'){if(window.R360)R360.open();else (window.openStudio||(()=>{}))()}
  else if(k=='more')openMore()}catch(err){ERR('tab',err)}});

// ---------- v281 (Sara 28/10 "איפה נמצאת עגלת קניות, איפה כל דבר נמצא"): "עוד" = one clear page with everything by name ----------
const TL=n=>{try{for(const [,L] of (window.TOOLS172||[]))for(const t of L){const nm=typeof t[1]=='function'?t[1]():t[1];if(String(nm).includes(n)&&typeof t[2]=='function')return t[2]}}catch(_){}return null};
const closeD=()=>document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});
const MORE=[
 ['קניות',[
  ['🛒','העגלה שלי','מה שאת עוד חושבת לקנות',()=>window.ADV187&&(ADV187.cart?ADV187.cart():ADV187.open('arc'))],
  ['🔎','לבדוק לפני שקונים','יש לי כבר? מתאים? כדאי?',()=>window.ADV187&&ADV187.open('new')],
  ['📦','ההזמנות שלי','מה הגיע, מה בדרך, מה להחזיר',()=>window.openOrders123&&openOrders123()],
  ['💸','החזרות וכסף','מה החזרתי ומה עוד לא חזר',()=>{const f=TL('החזרות וקרדיטים');f&&f()}]]],
 ['הבגדים שלי',[
  ['👗','הארון','כל הבגדים, חיפוש וסינון',()=>tab('closet')],
  ['🧠','הארון החכם','איפה כל בגד, כביסה, מיון',()=>window.SC185&&SC185.open()],
  ['👯','כפולים','בגדים שיש לי פעמיים',()=>window.openDups89&&openDups89()],
  ['🗂','מיון הארון','בגד אחרי בגד: משאירה, יצא משימוש, לבת',()=>window.DY306&&DY306.open('sort')],
  ['🗃','הרשימה הכללית','מה שהוצאתי מהארון',()=>window.openGen161&&openGen161()]]],
 ['לוקים ואווטאר',[
  ['✨','הלוקים שלי','לוקים ששמרתי',()=>{const f=TL('הלוקים שלי');f&&f()}],
  ['🧍‍♀️','סטודיו 360','להלביש את האווטאר',()=>window.R360&&R360.open()],
  ['📦','מה ששלחתי ל-GPT','הבחירות האחרונות: ZIP שוב, להעלות מה שחזר',()=>window.g312sends&&g312sends()],
  ['📅','מה לבשתי','היומן: היום, השבוע, החודש',()=>window.DY306?DY306.open():window.WR234&&WR234.open()]]],
 ['עוד',[
  ['⚙','כל הכלים והמספרים','פאנל הניהול',()=>window.openAdmin172&&openAdmin172()],
  ['🧹','מקום לתמונות','כמה תפוס, לנקות, האווטאר הישן',()=>window.clean262&&clean262()],
  ['❓','איך משתמשים','הסבר קצר',()=>{const b=document.getElementById('helpb');b&&b.click()}],
  ['💬','לספר ל-Claude','מה לא תקין, עם תמונה של המסך',()=>window.openTell282&&openTell282()]]]];
function openMore(){let d=document.getElementById('z5m');
 if(!d){d=document.createElement('dialog');d.id='z5m';d.dir='rtl';d.setAttribute('aria-labelledby','z5mt');document.body.appendChild(d);
  d.addEventListener('click',e=>{if(e.target===d)return d.close();if(e.target.closest('.z5mx'))return d.close();const b=e.target.closest('[data-z5m]');if(!b)return;const [g,i]=b.dataset.z5m.split('.').map(Number),f=MORE[g][1][i][3];
   closeD();try{f()}catch(err){ERR('more',err)}})}
 d.innerHTML=`<div class="z5mh"><h2 id="z5mt">כל מה שיש באתר</h2><button type="button" class="z5mx" aria-label="סגירה">✕</button></div>
  <p class="z5mi"><b>בית</b> מה לובשים היום · <b>הארון</b> כל הבגדים · <b>סטודיו</b> להלביש את האווטאר · <b>עוד</b> כל השאר, כאן</p>`+
  MORE.map(([h,L],g)=>`<h3>${h}</h3><div class="z5mg">${L.map(([ic,n,sub],i)=>`<button type="button" data-z5m="${g}.${i}"><i aria-hidden="true">${ic}</i><span><b>${n}</b><small>${sub}</small></span></button>`).join('')}</div>`).join('');
 // the cart shows how many things are in it
 try{const n=window.ADV187?ADV187.list().filter(r=>r.st=='think').length:0;if(n){const b=d.querySelector('[data-z5m="0.0"] b');if(b)b.textContent='העגלה שלי ('+n+')'}}catch(_){}
 if(!d.open)d.showModal()}
window.openMore281=openMore;

// ---------- "מה מחכה לך" on the home ----------
const QUICK=new Set(['soon','fix','nofit']);   // these show the closet's list
function paintWait(){try{
 const s=document.getElementById('h180');if(!s||!on())return;let w=s.querySelector('.z5w');
 if(!w){w=document.createElement('div');w.className='z5w';w.setAttribute('role','region');w.setAttribute('aria-labelledby','z5wh');s.appendChild(w);
  w.addEventListener('click',e=>{const a=e.target.closest('[data-z5all]');if(a)return window.openAdmin172&&openAdmin172();
   const b=e.target.closest('[data-z5w]');if(!b)return;const x=(window.WAIT172||[])[+b.dataset.z5w];if(!x)return;
   try{if(QUICK.has(x[2]))zCloset();x[4]()}catch(err){ERR('wait',err)}})}
 let r={};try{r=window.COUNTS172?COUNTS172():{}}catch(e){ERR('counts',e)}
 const W=window.WAIT172||[];const L=W.map((x,i)=>[x,i]).filter(([x])=>r[x[2]]>0).sort((a,b)=>b[0][3]-a[0][3]);
 const rows=innerHeight<800?2:innerHeight<900?3:4,n=L.length,show=L.slice(0,rows);s.style.setProperty('--z5fix',(416+44*rows)+'px');   // the avatar gets what is left of the screen
 const h=`<div class="z5wh"><h2 id="z5wh">מה מחכה לך</h2><button type="button" data-z5all>${n>show.length?`הכול (${n})`:'כל הכלים'}${svg('chev')}</button></div>`+
  (show.length?`<ul>${show.map(([x,i])=>`<li><button type="button" data-z5w="${i}"${x[3]?' class="hot"':''}><i>${svg(P[x[2]]?x[2]:'alerts')}</i><span>${esc(x[1])}</span><b>${r[x[2]]}</b></button></li>`).join('')}</ul>`
   :'<p class="z5ok">הכול מסודר. אין משהו שמחכה לך ✓</p>');
 if(w.innerHTML!=h)w.innerHTML=h;
 const bd=nav.querySelector('.z5bd'),hot=r.alerts||0;   /* v281: only the important alerts (the 99+ of returns looked like an error) */bd.hidden=!hot;bd.textContent=hot>99?'99+':hot;
}catch(e){ERR('wait',e)}}
setInterval(()=>{if(!document.hidden&&TAB=='home'&&!document.querySelector('dialog[open]'))paintWait()},15000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&TAB=='home')paintWait()});
// the counts need the closet's data from the database: paint a few times while it arrives
[600,2500,6000].forEach(t=>setTimeout(paintWait,t));
addEventListener('close',()=>{if(TAB=='home')setTimeout(paintWait,50)},true);   // after a window closes the numbers may have changed

// ---------- avatar controls: pause and head stay on the picture; the speed opens from a small button ----------
function avCtl(n=0){const c=document.querySelector('#h180 .z-avc');if(!c){if(n<40)setTimeout(()=>avCtl(n+1),300);return}
 if(c.querySelector('.z5sp'))return;const b=document.createElement('button');b.type='button';b.className='z5sp';b.setAttribute('aria-label','מהירות הסיבוב');b.setAttribute('aria-expanded','false');b.innerHTML=svg('speed');
 b.onclick=()=>{const o=c.classList.toggle('z5spo');b.setAttribute('aria-expanded',o)};c.insertBefore(b,c.querySelector('.z-spd'))}
avCtl();
// v281: "הלוקים שלי" goes up next to the card's title (at the bottom of the card it covered the second button when the look was pinned)
(function mvLk(n=0){const l=document.querySelector('#h180 .z-cta .z-2'),h=document.querySelector('#h180 .z-lkh');if(!l||!h){if(n<40)setTimeout(()=>mvLk(n+1),300);return}if(on()){l.textContent='הלוקים שלי ›';h.appendChild(l)}})();
// v279: the small item pictures (דומים, recent, urgent, strips in the tools) are buttons with only a picture – give each its item's name for the screen reader
{let q=0;const lab=()=>{q=0;try{document.querySelectorAll('button.mini[data-open]:not([aria-label])').forEach(b=>{const id=b.dataset.open,n=(typeof IT=='object'&&IT&&IT[id]&&IT[id].nm)||(typeof D=='object'&&D[id]&&D[id].short)||'';if(n)b.setAttribute('aria-label',n)})}catch(e){ERR('lab',e)}};
 new MutationObserver(()=>{if(!q)q=setTimeout(lab,400)}).observe(B,{childList:true,subtree:true});lab()}
// the head on the home avatar is one round button showing the head she has now; a tap moves to the next one (cover → wig → …)
document.addEventListener('click',e=>{if(!on())return;const b=e.target.closest&&e.target.closest('#h180 .z-hds [data-zh]');if(!b||b.getAttribute('aria-checked')!='true')return;
 const all=[...b.parentNode.querySelectorAll('[data-zh]')];if(all.length<2)return;e.stopPropagation();all[(all.indexOf(b)+1)%all.length].click()},true);
})();
