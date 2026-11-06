// v358 (Sara 6/11: "אחורה זה צריך לעבוד לי תמיד"): the phone's back gesture / the browser's back closes the window on top (item, orders, studio, any sheet)
// instead of leaving the site. Every window that opens makes sure there is one back step for it; back closes the top window. Closing with ✕ leaves the
// step for the next window (never history.back() from code – that raced with the next window opening and left the site).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v358n '+w+': '+(e&&e.message||e));
let slots=0;   // back steps we added that were not used yet
const SKIP=new Set(['zpick']);
const openD=()=>[...document.querySelectorAll('dialog[open]')].filter(d=>d.id&&!SKIP.has(d.id));
function need(){const n=openD().length;while(slots<n){try{history.pushState(Object.assign({},history.state||{},{d358:1}),'');slots++}catch(e){ERR('push',e);break}}}
let q=0;new MutationObserver(ms=>{if(ms.some(m=>m.target.tagName=='DIALOG'&&m.target.open)&&!q)q=setTimeout(()=>{q=0;need()},30)}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['open']});
addEventListener('popstate',()=>{if(slots>0)slots--;const L=openD();const d=L[L.length-1];if(d){try{d.close()}catch(_){}}});
window.NAV358={slots:()=>slots};
})();
