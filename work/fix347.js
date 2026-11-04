// v347 bug round (4/11, while Sara studies: "תחפש… באגים שאתה יכול לתקן"): small fixes that belong to no single screen
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v347 '+w+': '+(e&&e.message||e));
// 1) Esc closes the filter panel ("⚙ סינון") like every other window – it is a div, not a <dialog>, so Esc did nothing
document.addEventListener('keydown',e=>{try{if(e.key!='Escape'||document.querySelector('dialog[open]'))return;const pn=document.getElementById('panel');
 if(pn&&pn.offsetParent!==null&&getComputedStyle(pn).display!='none'){const x=pn.querySelector('.x9');if(x){x.click();e.preventDefault()}}}catch(err){ERR('esc',err)}});
})();
