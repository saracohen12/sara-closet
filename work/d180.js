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
  <div class="z-cta"><button type="button" class="z-go" data-r3><span aria-hidden="true">✦</span> להתלבש · 360°</button><button type="button" class="z-2" data-h9="hub">הלוקים שלי</button></div>
  </div>
  <div class="z-av"><div class="z-stage"></div><div class="z-cap"><span class="z-360">360°</span><span class="z-wear"></span></div></div>
  <div class="z-chips h9cta"></div>`; // also .h9cta: the orders/returns/admin scripts put their buttons into the first .h9cta
 bar.after(s);
 const hi=top.querySelector('.h9hi'),sub=top.querySelector('.h9sub');if(hi)s.querySelector('.z-hi').appendChild(hi);if(sub)s.querySelector('.z-sub').appendChild(sub);
 // orders / returns / admin buttons are created later by their own scripts (and sometimes re-created): keep pulling them in
 const chips=s.querySelector('.z-chips');const gather=()=>['#ord123b','#ret152b','.h9adm'].forEach((q,k)=>{const b=document.querySelector('#top '+q);if(b&&b.parentNode!==chips){b.classList.add('z-chip');b.style.order=k;chips.appendChild(b)}});
 gather();new MutationObserver(gather).observe(top,{childList:true,subtree:true});
 const tiles=top.querySelector('.h9tiles');if(tiles)s.after(tiles);
 if(window.R360){const st=R360.Stage(s.querySelector('.z-stage'),{speed:200});const cap=s.querySelector('.z-wear');
  const upd=()=>{const w=R360.wearing();cap.textContent=w;cap.title=w};upd();setInterval(upd,4000);
  st.el.addEventListener('click',()=>R360.open());
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setTimeout(()=>st.play(true),1200)}
 s.addEventListener('click',e=>{if(e.target.closest('[data-r3]'))R360&&R360.open()});
 return true}
function tryHome(n=0){if(!home()&&n<40)setTimeout(()=>tryHome(n+1),250)}
tryHome();
// the bottom bar's "בניית לוק" and every plain "בניית לוק" button already go through openStudio() → the room (r360.js)

// first time after the update: let her choose
setTimeout(()=>{try{if(!localStorage.getItem('d180seen'))chooser(true)}catch(_){}},1800);
window.D180={set,chooser};
})();
