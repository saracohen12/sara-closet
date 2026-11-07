// v362 (Sara 7/11: "במסך שאני מלבישה את הבובה… לראות אותה בגדול על מסך גדול… לוחצת על כפתור, ייפתח לי בגדול, עושה X, חוזרת למסך הקודם")
// a "⛶ בגדול" button on the studio's doll: the doll fills the screen (the same picture, 2–3× bigger on a phone), ‹ › turn her, ✕ or back closes.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v362b '+w+': '+(e&&e.message||e));
let dlg=null,cv=null,T=0,last=null;
const src=()=>{const f=document.querySelector('#r360 .r3fig');if(!f)return null;return f.querySelector('canvas.on')||[...f.querySelectorAll('canvas')].find(c=>+getComputedStyle(c).opacity>.5)||null};
function copy(){try{const s=src();if(!s||!s.width||!cv)return;if(cv.width!=s.width||cv.height!=s.height){cv.width=s.width;cv.height=s.height}
 const g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);g.drawImage(s,0,0);last=s;
 const a=document.querySelector('#r360 .r3ang'),t=dlg.querySelector('.b362a');if(a&&t&&t.textContent!=a.textContent)t.textContent=a.textContent}catch(e){ERR('copy',e)}}
function open(){try{if(!dlg){dlg=document.createElement('dialog');dlg.id='big362';dlg.dir='rtl';dlg.setAttribute('aria-label','הבובה בגדול');document.body.append(dlg);
  dlg.innerHTML=`<button type="button" class="b362x" aria-label="סגירה">✕</button><div class="b362s"><canvas aria-label="הבובה בגדול" role="img"></canvas></div>
  <div class="b362c"><button type="button" class="b362p" aria-label="זווית קודמת">→</button><span class="b362a" aria-live="polite">חזית</span><button type="button" class="b362n" aria-label="זווית הבאה">←</button></div>`;
  cv=dlg.querySelector('canvas');
  dlg.addEventListener('click',e=>{if(e.target.closest('.b362x'))return dlg.close();
   const k=e.target.closest('.b362p')?'.r3prev':e.target.closest('.b362n')?'.r3next':'';if(k){const b=document.querySelector('#r360 '+k);if(b)b.click();setTimeout(copy,60);setTimeout(copy,400)}});
  // a finger swipe on the big doll turns her too
  let sx=null;dlg.addEventListener('pointerdown',e=>{if(e.target.closest('.b362s'))sx=e.clientX});
  dlg.addEventListener('pointerup',e=>{if(sx==null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)<40)return;const b=document.querySelector('#r360 '+(dx<0?'.r3next':'.r3prev'));if(b)b.click();setTimeout(copy,60);setTimeout(copy,400)});
  dlg.addEventListener('close',()=>{clearInterval(T);T=0})}
 copy();if(!dlg.open)dlg.showModal();clearInterval(T);T=setInterval(()=>{if(!dlg.open){clearInterval(T);T=0;return}copy()},350)}catch(e){ERR('open',e)}}
setInterval(()=>{try{const st=document.querySelector('#r360[open] .r3fig');if(!st||st.querySelector('.b362o'))return;const b=document.createElement('button');b.type='button';b.className='b362o';b.setAttribute('aria-label','לראות את הבובה בגדול');b.innerHTML='<span aria-hidden="true">⛶</span> בגדול';b.onclick=open;st.append(b)}catch(_){}},800);
window.BIG362={open};
})();
