/* v335 (Sara 29/10 14:21 "יש לי מלא דברים שנעלמו לי תמונות"): her photos were all still there – the store sometimes answers "unavailable" for a moment
   (errlog: store_unavailable on the phone), and a picture that failed once stayed broken. Now every picture from the store that fails is asked again
   (after 1.5, 4 and 10 seconds); if it still fails, the card shows the small built-in picture of the item instead of a broken one. */
;(function(){
const TRY=[1500,4000,10000];
document.addEventListener('error',e=>{const m=e.target;if(!m||m.tagName!='IMG')return;const s=m.getAttribute('src')||'';if(!/\/_blob\//.test(s))return;
 const n=+(m.dataset.r335||0);
 if(n<TRY.length){m.dataset.r335=n+1;setTimeout(()=>{if(!m.isConnected||(m.getAttribute('src')||'')!=s)return;m.removeAttribute('src');requestAnimationFrame(()=>{if(!m.getAttribute('src'))m.src=s})},TRY[n]);return}
 try{const c=m.closest('[data-id]'),id=c&&c.dataset.id,t=id&&typeof TH=='object'&&TH[id];if(t&&t!=s){m.dataset.r335='x';m.src=t}}catch(_){}
 try{(window.ERRS=window.ERRS||[]).push('v335 img: '+s.slice(-40))}catch(_){}},true);
document.addEventListener('load',e=>{const m=e.target;if(m&&m.tagName=='IMG'&&m.dataset&&m.dataset.r335&&m.dataset.r335!='x')delete m.dataset.r335},true);
})();
