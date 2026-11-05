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
// 5) v349: day looks saved before today were named "לבשתי · היום 28/10" forever – show the weekday instead (in memory; saved with the right name next time the look is saved)
(function(){const DN=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];let n=0;const t=setInterval(()=>{try{if(++n>40)clearInterval(t);if(typeof LOOKS!='object'||!LOOKS)return;
 Object.values(LOOKS).forEach(l=>{if(l&&typeof l.name=='string'&&l.name.startsWith('לבשתי · היום ')&&l.created){const d=new Date(String(l.created).slice(0,10)+'T12:00');if(!isNaN(d))l.name='לבשתי · יום '+DN[d.getDay()]+' '+l.name.slice('לבשתי · היום '.length)}})}catch(_){}},1500)})();
// 6) v349: the "ילד/ה" filter had only "כל הילדים" – a filter that does nothing; it hides until a child's name is given to some item
(function(){const f=()=>{try{const s=document.getElementById('kidf');if(!s)return;const row=s.closest('.row')||s.parentElement;const one=s.options.length<=1;s.hidden=one;const l=s.previousElementSibling;if(l&&l.tagName=='LABEL')l.hidden=one}catch(_){}};setTimeout(f,2500);setInterval(f,15000)})();
// 7) v352 bug fix: "⏰ להחזיר בקרוב" listed items whose return date had passed and items she kept / already sent – now only what can still go back, soonest first
(function(){const go=()=>{try{if(typeof extra!='function'||typeof SORT=='undefined'){setTimeout(go,800);return}if(extra._r352)return;const base=extra;
 extra=function(c){if(!base.apply(this,arguments))return false;if(SORT!='ret')return true;const n=typeof daysLeft=='function'?daysLeft(c.dataset.rdl):null;if(n==null||n<0)return false;
  const i=(typeof IT=='object'&&IT[c.dataset.id])||{};return !(i.s=='kept'||i.s=='give'||i.rsent||i.rnr||i.refunded||i.oos||i.gen)};extra._r352=1;
  const so=document.getElementById('sort');if(so)so.addEventListener('change',()=>setTimeout(()=>{try{apply()}catch(_){}},0));try{if(SORT=='ret')apply()}catch(_){}}catch(_){}};setTimeout(go,1500)})();
// 8) v353: "כל התמונות (N)" counted the avatar pictures too, and the number grew a moment after opening – it now says so and stays up to date
setInterval(()=>{try{const d=document.getElementById('dlg');if(!d||!d.open||typeof all102!='function')return;const b=d.querySelector('.pk102b');if(!b)return;const id=b.dataset.pk102open;
 const L=all102(id),n=L.length,av=L.filter(p=>/אווטאר/.test(p.n||'')).length;const t=`🖼 כל התמונות (${n}${av?` · ${av} של האווטאר`:''}) · לבחור ולהוריד`;if(b.textContent!=t)b.textContent=t}catch(_){}},1500);
