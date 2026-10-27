// v180 "2050": a new home around the 360 avatar + three designs to choose from (html[data-d180]) – the palette button opens the chooser.
// Nothing here touches the data: the old buttons (orders, returns, admin, tiles) are moved into the new layout and keep working as before.
(function(){
const H=document.documentElement;
const DESIGNS=[
 {k:'pearl',n:'פנינה',d:'בהיר ואוורירי, כרטיסי זכוכית רכים וגוון אפרסק',sw:['#fbf7f3','#ffd9c4','#b4532c','#2a1d17']},
 {k:'night',n:'לילה',d:'במה כהה עם זרקור על האוותר ונגיעות זהב',sw:['#140f0c','#2a201b','#e9b886','#f7ede3']},
 {k:'terra',n:'טרה',d:'כמו מגזין: כותרות ענק, טרקוטה ורשימה ממוספרת',sw:['#f2e7da','#a8431f','#3a2216','#fffaf4']},
 {k:'',n:'העיצוב הקודם',d:'בלי שינוי, כמו עד היום',sw:['#faf6f1','#b08a5a','#151414','#ffffff']}];
function get(){try{const v=localStorage.getItem('d180');return v===null?'pearl':v}catch(_){return 'pearl'}}
function set(k){if(k)H.dataset.d180=k;else delete H.dataset.d180;try{localStorage.setItem('d180',k)}catch(_){}
 const m=document.querySelector('meta[name=theme-color]')||Object.assign(document.createElement('meta'),{name:'theme-color'});m.content=k=='night'?'#140f0c':k=='terra'?'#f2e7da':'#fbf7f3';document.head.appendChild(m)}
set(get());

// ---------- chooser ----------
let pick=null;
function chooser(first){
 if(!pick){pick=document.createElement('dialog');pick.id='zpick';pick.setAttribute('dir','rtl');pick.setAttribute('aria-labelledby','zpickh');
  pick.innerHTML=`<div class="zp"><div class="zph"><h2 id="zpickh">איזה עיצוב בא לך?</h2><button type="button" class="zpx" aria-label="סגירה">✕</button></div>
  <p class="zpsub">לוחצים ורואים מיד על כל האתר. אפשר להחליף מתי שרוצים בכפתור 🎨 למעלה.</p><div class="zpl" role="radiogroup" aria-label="עיצובים"></div>
  <button type="button" class="zpok">זה! ✓</button></div>`;
  const l=pick.querySelector('.zpl');
  DESIGNS.forEach(d=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','radio');b.dataset.k=d.k;
   b.innerHTML=`<span class="zsw" aria-hidden="true">${d.sw.map(c=>`<i style="background:${c}"></i>`).join('')}</span><span class="zpt"><b>${d.n}</b><small>${d.d}</small></span>`;
   b.onclick=()=>{set(d.k);mark()};l.appendChild(b)});
  const done=()=>{pick.close();try{localStorage.setItem('d180seen','1')}catch(_){}};
  pick.querySelector('.zpx').onclick=done;pick.querySelector('.zpok').onclick=()=>{done();(window.toast||(()=>{}))('✓ העיצוב נשמר')};
  pick.addEventListener('click',e=>{if(e.target===pick)done()});document.body.appendChild(pick)}
 mark();if(!pick.open)pick.showModal()}
function mark(){if(!pick)return;const k=H.dataset.d180||'';pick.querySelectorAll('.zpl button').forEach(b=>b.setAttribute('aria-checked',b.dataset.k==k))}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#d71t,[data-zpick]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();chooser()},true);

// ---------- new home ----------
function home(){
 const top=document.getElementById('top'),bar=top&&top.querySelector('.h9bar');if(!bar||document.getElementById('h180'))return!!bar;
 const s=document.createElement('div');s.id='h180';s.setAttribute('role','region');s.setAttribute('aria-label','פתיחה'); // not a <section>: the closet filter treats every <section> as a category
 s.innerHTML=`<div class="z-txt"><div class="z-hi"></div><h1 class="z-t">מה לובשים <em>היום?</em></h1><div class="z-sub"></div>
  </div>
  <div class="z-lkbox"><div class="z-lk" aria-live="polite"><div class="z-lkh"><b>הלוק של היום</b><small class="z-lko"></small></div><div class="z-lki"></div>
   <div class="z-lka"><button type="button" class="z-lkw" data-r3today>👗 ללבוש בסטודיו</button><button type="button" class="z-lkn" data-r3next>↻ הצעה אחרת</button></div></div>
  <div class="z-cta"><button type="button" class="z-go" data-r3><span aria-hidden="true">✦</span> לסטודיו · 360°</button><button type="button" class="z-2" data-h9="hub">הלוקים שלי</button></div>
  <button type="button" class="z-rdy" data-r3></button></div>
  <div class="z-av"><div class="z-stage"></div><div class="z-cap"><span class="z-360">360°</span><span class="z-wear">הלוק של היום</span></div></div>
  <div class="z-chips h9cta"></div>`; // also .h9cta: the orders/returns/admin scripts put their buttons into the first .h9cta
 bar.after(s);
 const hi=top.querySelector('.h9hi'),sub=top.querySelector('.h9sub');if(hi)s.querySelector('.z-hi').appendChild(hi);if(sub)s.querySelector('.z-sub').appendChild(sub);
 // orders / returns / admin buttons are created later by their own scripts (and sometimes re-created): keep pulling them in
 const chips=s.querySelector('.z-chips');const gather=()=>['#ord123b','#ret152b','.h9adm'].forEach((q,k)=>{const b=document.querySelector('#top '+q);if(b&&b.parentNode!==chips){b.classList.add('z-chip');b.style.order=k;chips.appendChild(b)}});
 gather();new MutationObserver(gather).observe(top,{childList:true,subtree:true});
 const tiles=top.querySelector('.h9tiles');if(tiles)s.after(tiles);
 // v181: the avatar here wears the look of the day, or the look she pinned in the studio (Sara 25/10 20:59, 21:17); it turns slowly, ⏸/▶ stops it on her face
 if(window.R360){const T=R360.today;const st=R360.Stage(s.querySelector('.z-stage'),{speed:1700,state:T.state,today:1,fade:1});
  const av=s.querySelector('.z-av');const ctl=document.createElement('div');ctl.className='z-avc';
  ctl.innerHTML=`<button type="button" class="z-pp" aria-label="עצירת הסיבוב">⏸</button><div class="z-hds" role="radiogroup" aria-label="על הראש בדף הראשי"></div>
   <label class="z-spd"><span aria-hidden="true">🐢</span><input type="range" min="1" max="7" step="1" aria-label="מהירות הסיבוב"><span aria-hidden="true">🐇</span></label>`;av.appendChild(ctl);
  const pp=ctl.querySelector('.z-pp'),hds=ctl.querySelector('.z-hds');
  // v185 (Sara 22:41 "הסיבוב מדי לאט, אני רוצה לשלוט במהירות"): 7 speeds, a full turn from 14 seconds down to 1.6; saved on this phone; moving it starts the spin
  const SPD=[1700,1150,800,560,390,270,200],rg=ctl.querySelector('.z-spd input');let sp=4;try{const v=+localStorage.getItem('h185spd');if(v>=1&&v<=7)sp=v}catch(_){}
  const spTxt=v=>['הכי לאט','לאט','קצת לאט','רגיל','מהר','מהר מאוד','הכי מהר'][v-1];
  rg.value=sp;rg.setAttribute('aria-valuetext',spTxt(sp));st.speed(SPD[sp-1]);
  rg.addEventListener('input',()=>{const v=+rg.value;rg.setAttribute('aria-valuetext',spTxt(v));st.speed(SPD[v-1]);try{localStorage.setItem('h185spd',v)}catch(_){}if(!st.playing())spin(true)});
  rg.addEventListener('change',()=>(window.toast||(()=>{}))('🔄 מהירות: '+spTxt(+rg.value)));
  st.onplay=on=>{pp.textContent=on?'⏸':'▶';pp.setAttribute('aria-label',on?'עצירת הסיבוב':'להפעיל סיבוב');pp.setAttribute('aria-pressed',!on)};
  const spin=on=>{try{localStorage.setItem('h181spin',on?'1':'0')}catch(_){}if(on)st.play();else{st.stop();st.show(0)}};
  pp.onclick=()=>spin(!st.playing());
  hds.innerHTML=T.heads().map(h=>`<button type="button" role="radio" data-zh="${h.k}" aria-label="${h.n}"><img alt="" src="${h.src}"><span>${h.n}</span></button>`).join('');
  hds.onclick=e=>{const b=e.target.closest('[data-zh]');if(b)T.setHead(b.dataset.zh)};
  if(T.coverThumb)T.coverThumb().then(u=>{const i=u&&hds.querySelector('[data-zh="c"] img');if(i)i.src=u}).catch(()=>{});   // v204: the cover = her tie in neutral grey
  const paintLk=()=>{const ids=T.ids();const n=ids.map(R360.nm);const pin=T.pinned();
   hds.querySelectorAll('[data-zh]').forEach(b=>b.setAttribute('aria-checked',b.dataset.zh==T.head()));
   s.querySelector('.z-lkh b').textContent=pin?'📌 הלוק שבחרת':'הלוק של היום';s.querySelector('.z-wear').textContent=pin?'הלוק שבחרת':'הלוק של היום';
   s.querySelector('.z-lki').innerHTML=ids.map((id,i)=>`<button type="button" class="z-lkc" data-open="${id}" aria-label="${n[i].replace(/"/g,'&quot;')}"><img alt="" data-th="${id}" src="${R360.ph(id)}"></button>`).join('');
   s.querySelector('.z-lko').textContent=n.join(' · ');
   s.querySelector('.z-lkw').textContent=pin?'👗 לשנות בסטודיו':'👗 ללבוש בסטודיו';s.querySelector('.z-lkn').textContent=pin?'↺ להצעה של היום':'↻ הצעה אחרת';
   try{new Set(ids.map(id=>curCat(id))).forEach(c=>thLoad(c).then(()=>thApply(TH)))}catch(_){}
   const [r,all]=R360.readyCount();s.querySelector('.z-rdy').innerHTML=`<b>${r}</b> מתוך ${all} בגדים כבר על האווטאר · <u>להוסיף עוד</u>`};
  paintLk();setTimeout(paintLk,2500);T.onchange(paintLk);
  setInterval(()=>{if(document.hidden)return;try{const [r,all]=R360.readyCount(),h=`<b>${r}</b> מתוך ${all} בגדים כבר על האווטאר · <u>להוסיף עוד</u>`,z=s.querySelector('.z-rdy');if(z&&z.innerHTML!=h)z.innerHTML=h}catch(_){}},4000); // v243: live count
  st.el.addEventListener('click',()=>T.wear());
  let on=true;try{on=localStorage.getItem('h181spin')!='0'}catch(_){}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)on=false;
  try{if(JSON.parse(localStorage.getItem('a11y')||'{}').still)on=false}catch(_){}   // נגישות: בלי תנועה
  if(on)setTimeout(()=>st.play(),1200);else st.onplay(false);
  s.addEventListener('click',e=>{if(e.target.closest('[data-r3today]'))T.wear();if(e.target.closest('[data-r3next]')){if(T.pinned())T.unpin();else T.next()}})}
 s.addEventListener('click',e=>{if(e.target.closest('[data-r3]'))R360&&R360.open()});
 return true}
function tryHome(n=0){if(!home()&&n<40)setTimeout(()=>tryHome(n+1),250)}
tryHome();
// the bottom bar's "בניית לוק" and every plain "בניית לוק" button already go through openStudio() → the room (r360.js)

// first time after the update: let her choose
setTimeout(()=>{try{if(!localStorage.getItem('d180seen'))chooser(true)}catch(_){}},1800);
window.D180={set,chooser};
})();
