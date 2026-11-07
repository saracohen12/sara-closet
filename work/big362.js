// v362 (Sara 7/11: "במסך שאני מלבישה את הבובה… לראות אותה בגדול על מסך גדול… לוחצת על כפתור, ייפתח לי בגדול, עושה X, חוזרת למסך הקודם")
// a "⛶ בגדול" button on the studio's doll: the doll fills the screen (the same picture, 2–3× bigger on a phone), ‹ › turn her, ✕ or back closes.
// v364 (Sara 21:28 "היה כפתור שהאווטאר מסתובב לבד… להפסיק, מהר יותר, לאט יותר"): ▶/⏸ turns her by herself, speeds איטי / רגיל / מהיר (kept on this phone);
// the arrows are drawn (the → ← characters showed as empty circles on her phone)
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v362b '+w+': '+(e&&e.message||e));
let dlg=null,cv=null,T=0,P=0;
const SP=[['slow','איטי',1100],['mid','רגיל',600],['fast','מהיר',280]];let sp='mid';try{sp=localStorage.getItem('b362sp')||'mid'}catch(_){}
const ico={l:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 r:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
 pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>'};
const src=()=>{const f=document.querySelector('#r360 .r3fig');if(!f)return null;return f.querySelector('canvas.on')||[...f.querySelectorAll('canvas')].find(c=>+getComputedStyle(c).opacity>.5)||null};
function copy(){try{const s=src();if(!s||!s.width||!cv)return;if(cv.width!=s.width||cv.height!=s.height){cv.width=s.width;cv.height=s.height}
 const g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);g.drawImage(s,0,0);
 const a=document.querySelector('#r360 .r3ang'),t=dlg.querySelector('.b362a');if(a&&t&&t.textContent!=a.textContent)t.textContent=a.textContent}catch(e){ERR('copy',e)}}
function step(k){const b=document.querySelector('#r360 '+k);if(b)b.click();setTimeout(copy,40);setTimeout(copy,300)}
function paintPlay(){const b=dlg&&dlg.querySelector('.b362pl');if(!b)return;b.innerHTML=P?ico.pause:ico.play;b.setAttribute('aria-label',P?'עצירת הסיבוב':'סיבוב לבד');b.setAttribute('aria-pressed',!!P);
 dlg.querySelectorAll('[data-b362sp]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.b362sp==sp))}
function stop(){clearInterval(P);P=0;paintPlay()}
function play(){clearInterval(P);const ms=(SP.find(s=>s[0]==sp)||SP[1])[2];P=setInterval(()=>{if(!dlg||!dlg.open)return stop();step('.r3next')},ms);paintPlay()}
function open(){try{if(!dlg){dlg=document.createElement('dialog');dlg.id='big362';dlg.dir='rtl';dlg.setAttribute('aria-label','הבובה בגדול');document.body.append(dlg);
  dlg.innerHTML=`<button type="button" class="b362x" aria-label="סגירה">✕</button><div class="b362s"><canvas aria-label="הבובה בגדול" role="img"></canvas></div>
  <div class="b362sp" role="group" aria-label="מהירות הסיבוב">${SP.map(([k,n])=>`<button type="button" data-b362sp="${k}" aria-pressed="${k==sp}">${n}</button>`).join('')}</div>
  <div class="b362c"><button type="button" class="b362p" aria-label="זווית קודמת">${ico.r}</button><button type="button" class="b362pl"></button><button type="button" class="b362n" aria-label="זווית הבאה">${ico.l}</button></div>`;
  cv=dlg.querySelector('canvas');
  dlg.addEventListener('click',e=>{if(e.target.closest('.b362x'))return dlg.close();
   if(e.target.closest('.b362pl')){P?stop():play();return}
   const s=e.target.closest('[data-b362sp]');if(s){sp=s.dataset.b362sp;try{localStorage.setItem('b362sp',sp)}catch(_){}if(P)play();else paintPlay();return}
   const k=e.target.closest('.b362p')?'.r3prev':e.target.closest('.b362n')?'.r3next':'';if(k){stop();step(k)}});
  // a finger swipe on the big doll turns her too
  let sx=null;dlg.addEventListener('pointerdown',e=>{if(e.target.closest('.b362s'))sx=e.clientX});
  dlg.addEventListener('pointerup',e=>{if(sx==null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)<40)return;stop();step(dx<0?'.r3next':'.r3prev')});
  dlg.addEventListener('close',()=>{clearInterval(T);T=0;stop()})}
 paintPlay();copy();if(!dlg.open)dlg.showModal();clearInterval(T);T=setInterval(()=>{if(!dlg.open){clearInterval(T);T=0;return}copy()},350)}catch(e){ERR('open',e)}}
setInterval(()=>{try{const st=document.querySelector('#r360[open] .r3fig');if(!st||st.querySelector('.b362o'))return;const b=document.createElement('button');b.type='button';b.className='b362o';b.setAttribute('aria-label','לראות את הבובה בגדול');b.innerHTML='<span aria-hidden="true">⛶</span> בגדול';b.onclick=open;st.append(b)}catch(_){}},800);
// v365 (Sara 22:36 "כשאני בונה לוק אני לא רואה איך בקלות אני שמה את זה בדף הבית"): "📌 לדף הבית" right on the doll's frame (it was only in the ⋯ menu)
setInterval(()=>{try{const st=document.querySelector('#r360[open] .r3fig');if(!st||st.querySelector('.b365p'))return;const b=document.createElement('button');b.type='button';b.className='b365p';b.setAttribute('aria-label','לשים את הלוק הזה בדף הבית');b.innerHTML='📌 לדף הבית';
 b.onclick=()=>{const p=document.querySelector('#r360 .r3pin');if(p)p.click();else (window.toast||(()=>{}))('לא מצאתי – נסי מתפריט ⋯')};st.append(b)}catch(_){}},800);
window.BIG362={open};
})();
