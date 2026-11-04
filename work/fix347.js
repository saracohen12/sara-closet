// v347 bug round (4/11, while Sara studies: "תחפש… באגים שאתה יכול לתקן"): small fixes that belong to no single screen
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v347 '+w+': '+(e&&e.message||e));
// 1) Esc closes the filter panel ("⚙ סינון") like every other window – it is a div, not a <dialog>, so Esc did nothing
document.addEventListener('keydown',e=>{try{if(e.key!='Escape'||document.querySelector('dialog[open]'))return;const pn=document.getElementById('panel');
 if(pn&&pn.offsetParent!==null&&getComputedStyle(pn).display!='none'){const x=pn.querySelector('.x9');if(x){x.click();e.preventDefault()}}}catch(err){ERR('esc',err)}});
})();
// 2) 2100: a picture that arrives after the page opened fades in (class z21ld → animation in z21.css). Pictures that were already there are untouched
(function(){document.addEventListener('load',e=>{const t=e.target;if(t&&t.tagName=='IMG'&&document.documentElement.dataset.z21&&!t.classList.contains('z21ld')&&performance.now()>3000)t.classList.add('z21ld')},true)})();
// 3) 2100 on a computer: the home avatar's arch leans very slightly toward the mouse, like a glass card (not with touch, not with "בלי תנועה")
(function(){let raf=0;document.addEventListener('pointermove',e=>{if(e.pointerType!='mouse'||raf)return;raf=requestAnimationFrame(()=>{raf=0;try{const H=document.documentElement;const s=document.querySelector('#h180 .r3s');if(!s||!H.dataset.z21||H.dataset.still)return;
 const r=s.getBoundingClientRect();const x=(e.clientX-(r.left+r.width/2))/(r.width*2.2),y=(e.clientY-(r.top+r.height/2))/(r.height*2.2);
 const cx=Math.max(-1,Math.min(1,x)),cy=Math.max(-1,Math.min(1,y));s.style.setProperty('--ry',(cx*4).toFixed(2)+'deg');s.style.setProperty('--rx',(-cy*3).toFixed(2)+'deg')}catch(_){}})},{passive:true})})();
// 4) v349: "לוקים וכלים" opened with the chosen tab cut off at the edge of the tab row – bring it into view every time the window opens or the tab changes
(function(){const fix=()=>{try{const h=document.getElementById('hub');if(!h||!h.open)return;const a=h.querySelector('#htabs [aria-selected=true],#htabs [aria-pressed=true],#htabs .on,#htabs .act');if(a&&!a._v349){a._v349=1;a.scrollIntoView({block:'nearest',inline:'center'})}}catch(_){}};
 const go=()=>{const ht=document.getElementById('htabs');if(!ht){setTimeout(go,1000);return}new MutationObserver(()=>setTimeout(fix,30)).observe(ht,{childList:true})};go()})();
