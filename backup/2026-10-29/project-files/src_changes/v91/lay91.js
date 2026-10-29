// ===== v91 screen space: compact garment bar (tools behind "🛠 כלים"), only worn slots + "➕ עוד", drag to move a zoomed stage, 🔍 full-screen magnifier =====
{
let T91=false,ALL91=false;
const toolOn=()=>document.body.classList.contains('er74on')||!!(window.CB91&&window.CB91.mode);
// 1) garment bar: name, → ←, ➖ גודל ➕, then all the tools (always visible; on desktop the bar sits in the side panel)
function bar(){const c=document.getElementById('ssel');if(!c||typeof ST=='undefined'||!ST)return;
 const has=!!(SSEL&&ST.items[SSEL]);c.classList.toggle('c91',has);
 const open=has;/* Sara 22/10: every tool stays visible – the bar only moved out of the top */c.classList.toggle('t91o',open);
 const nx=c.querySelector('.nx83');
 if(nx){const p=nx.querySelector('[data-nx83="-1"]'),n=nx.querySelector('[data-nx83="1"]');if(p&&!p.dataset.s91){p.dataset.s91=1;p.textContent='→';p.title='הבגד הקודם'}if(n&&!n.dataset.s91){n.dataset.s91=1;n.textContent='←';n.title='הבגד הבא'}}
 if(false&&has&&!c.querySelector('.tg91'))(nx||c).insertAdjacentHTML('beforeend','<button class="tg91" data-tg91 title="מחק, מברשות, סיבוב, רוחב, גובה ועוד"></button>');
 const t=c.querySelector('.tg91');if(t){t.textContent=open?'▴ סגירת כלים':'🛠 כלים';t.setAttribute('aria-expanded',open)}}
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{bar()}catch(_){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-tg91]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(T91||toolOn()){T91=false;try{if(document.body.classList.contains('er74on'))document.querySelector('#ssel [data-er="t"]')?.click();const m=window.CB91&&CB91.mode;if(m)document.querySelector('#ssel [data-cb91="'+m+'"]')?.click()}catch(_){}}else T91=true;
 bar()},true);
// tools switched on/off from inside the bar keep it open/closed correctly
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#ssel [data-er],#ssel [data-cb91]'))setTimeout(bar,30)});
// 2) slots: only what she is wearing (and the open drawer) + one "➕ עוד בגד" tile
function rail(){const R=document.getElementById('srail');if(!R)return;R.classList.toggle('all91',ALL91);
 let m=R.querySelector('.more91');if(!m){R.insertAdjacentHTML('beforeend','<button class="slot more91" data-more91><span class="ic"></span><b></b></button>');m=R.querySelector('.more91')}
 const n=[...R.querySelectorAll('.slot:not(.more91)')].filter(s=>!s.classList.contains('has')&&!s.classList.contains('on')).length;
 m.querySelector('b').textContent=ALL91?'פחות':(R.querySelector('.slot.has')?'עוד בגד':'בגד')+(n?` (${n})`:'');m.title=ALL91?'להסתיר את הריקים':'לבחור עוד סוג בגד'}
if(typeof paintSlots=='function'){const _pl=paintSlots;paintSlots=function(){const r=_pl.apply(this,arguments);try{rail()}catch(_){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-more91]');if(!b)return;e.preventDefault();e.stopPropagation();ALL91=!ALL91;rail();try{placeDrawer()}catch(_){}},true);
// choosing a slot from the full list folds the list again (the chosen one stays)
window.addEventListener('click',e=>{if(ALL91&&e.target.closest&&e.target.closest('#srail [data-sslot]'))setTimeout(()=>{ALL91=false;rail();try{placeDrawer()}catch(_){}},60)},true);
// 3) zoomed stage: drag moves the view (the selected garment still drags), two fingers zoom, a tap selects a garment
const PP=new Map();let PN=null;
const smain=()=>document.querySelector('#studio .smain');
window.addEventListener('pointerdown',e=>{try{if(typeof ST=='undefined'||!ST||!document.getElementById('studio')?.open)return;const st=e.target.closest&&e.target.closest('#sstage');if(!st||stageZ()<=1.01)return;
 if(e.target.closest('.sel')||toolOn())return;
 e.stopImmediatePropagation();e.preventDefault();PP.set(e.pointerId,{x:e.clientX,y:e.clientY});const sm=smain();if(!sm)return;
 if(PP.size==1)PN={sm,x:e.clientX,y:e.clientY,sl:sm.scrollLeft,stp:sm.scrollTop,moved:false,t:e.target};
 else if(PP.size==2){const [a,b]=[...PP.values()];PN={pinch:1,d0:Math.max(10,Math.hypot(a.x-b.x,a.y-b.y)),z0:stageZ(),sm,moved:true}}}catch(_){}},true);
window.addEventListener('pointermove',e=>{if(!PN||!PP.has(e.pointerId))return;e.preventDefault();e.stopImmediatePropagation();PP.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(PN.pinch){if(PP.size<2)return;const [a,b]=[...PP.values()];const z=PN.z0*Math.hypot(a.x-b.x,a.y-b.y)/PN.d0;if(Math.abs(z-stageZ())>=.06)zoomTo(z);return}
 const dx=e.clientX-PN.x,dy=e.clientY-PN.y;if(!PN.moved&&Math.hypot(dx,dy)<6)return;PN.moved=true;PN.sm.scrollLeft=PN.sl-dx;PN.sm.scrollTop=PN.stp-dy},true);
const pEnd=e=>{if(!PP.has(e.pointerId))return;PP.delete(e.pointerId);e.stopImmediatePropagation();
 if(PN&&!PN.moved&&!PN.pinch&&e.type=='pointerup'){const l=PN.t.closest&&PN.t.closest('#sstage img.sl');if(l&&l.dataset.slot&&SSEL!=l.dataset.slot){SSEL=l.dataset.slot;document.querySelectorAll('#sstage img.sl').forEach(z=>z.classList.toggle('sel',z==l));paintSel()}else if(!l&&!(PN.t.closest&&PN.t.closest('.jwp')))setTimeout(()=>openMag(),30)}
 if(!PP.size)PN=null;else if(PN&&PN.pinch){const [p]=[...PP.values()];const sm=smain();PN={sm,x:p.x,y:p.y,sl:sm.scrollLeft,stp:sm.scrollTop,moved:true}}};
window.addEventListener('pointerup',pEnd,true);window.addEventListener('pointercancel',pEnd,true);
// the mouse wheel no longer zooms the stage (Sara got stuck zoomed in); it scrolls the page as usual. Zoom = ➕ ➖ ↺ or the 🔍 window
window.addEventListener('wheel',e=>{const st=e.target.closest&&e.target.closest('#sstage');if(!st||e.target.closest('img.sl.sel'))return;e.stopImmediatePropagation()},{capture:true});
// a tap on the avatar itself (face, hands, background – not a garment) opens the 🔍 window with just her and the look
let TP=null;
window.addEventListener('pointerdown',e=>{TP=null;try{if(typeof ST=='undefined'||!ST||!document.getElementById('studio')?.open)return;const st=e.target.closest&&e.target.closest('#sstage');if(!st||e.target.closest('img.sl,.jwp,button,.sel')||toolOn())return;TP={x:e.clientX,y:e.clientY,t:Date.now()}}catch(_){}},true);
window.addEventListener('pointerup',e=>{const p=TP;TP=null;if(!p||Date.now()-p.t>450||Math.hypot(e.clientX-p.x,e.clientY-p.y)>8)return;setTimeout(()=>{if(!document.getElementById('mg91')?.open)openMag()},30)},true);
// the zoom buttons and the 360° bar stay in view while the zoomed stage scrolls (they used to scroll away – Sara was stuck)
function pin91(){const sm=smain();if(!sm)return;const x=sm.scrollLeft,y=sm.scrollTop;sm.querySelectorAll(':scope>.sside,:scope>#spin').forEach(el=>{el.style.translate=(x||y)?`${x}px ${y}px`:''})}
document.addEventListener('scroll',e=>{if(e.target&&e.target.matches&&e.target.matches('#studio .smain'))pin91()},true);
if(typeof zoomTo=='function'){const _z=zoomTo;zoomTo=function(){const r=_z.apply(this,arguments);requestAnimationFrame(()=>requestAnimationFrame(()=>{if(stageZ()<=1){const sm=smain();if(sm){sm.scrollTop=0;sm.scrollLeft=0}}pin91()}));return r}}
// the old double-tap "face zoom" froze the screen on her face: a double tap now opens the 🔍 window
window.addEventListener('dblclick',e=>{if(!(e.target.closest&&e.target.closest('#sstage')))return;e.stopImmediatePropagation();e.preventDefault();document.getElementById('sstage')?.classList.remove('fz83');if(!document.getElementById('mg91')?.open)openMag()},true);
setInterval(()=>{const s=document.getElementById('sstage');if(s&&s.classList.contains('fz83'))s.classList.remove('fz83')},400);
// 4) 🔍 magnifier: the finished look full screen, zoom and move freely
function magBtn(){const s=document.querySelector('#studio .sside');if(s&&!s.querySelector('#smag91'))s.insertAdjacentHTML('afterbegin','<button id="smag91" title="זכוכית מגדלת – לראות את הלוק בגדול">🔍</button>')}
setInterval(()=>{if(document.getElementById('studio')?.open)magBtn()},700);
let MS={s:1,x:0,y:0},MP=new Map(),MG=null,MT=0;
function mgDlg(){let d=document.getElementById('mg91');if(d)return d;
 document.body.insertAdjacentHTML('beforeend','<dialog id="mg91" aria-label="זכוכית מגדלת"><div class="mg91w"><div class="mg91s"></div></div><div class="mg91b"><button data-mg="in" aria-label="להגדיל">＋</button><button data-mg="out" aria-label="להקטין">－</button><button data-mg="fit">↺ כל הגוף</button><button data-mg="x" class="go">✕ סגירה</button></div><p class="mg91h">גלגלת או שתי אצבעות להגדלה · גוררים כדי לזוז · לחיצה כפולה מגדילה</p></dialog>');
 d=document.getElementById('mg91');const W=d.querySelector('.mg91w'),S=d.querySelector('.mg91s');
 const ap=()=>{S.style.transform=`translate(${MS.x}px,${MS.y}px) scale(${MS.s})`};
 const at=(cx,cy,ns)=>{ns=Math.max(1,Math.min(8,ns));const R=S.getBoundingClientRect();const px=(cx-R.left)/MS.s,py=(cy-R.top)/MS.s;MS.x+=cx-R.left-px*ns;MS.y+=cy-R.top-py*ns;MS.s=ns;if(ns==1)MS={s:1,x:0,y:0};ap()};
 d._ap=ap;d._at=at;d.addEventListener('close',()=>S.replaceChildren());
 W.addEventListener('wheel',e=>{e.preventDefault();at(e.clientX,e.clientY,MS.s*(e.deltaY<0?1.2:1/1.2))},{passive:false});
 W.addEventListener('pointerdown',e=>{MP.set(e.pointerId,{x:e.clientX,y:e.clientY});W.setPointerCapture?.(e.pointerId);const now=Date.now();if(MP.size==1&&now-MT<300){at(e.clientX,e.clientY,MS.s>1.3?1:2.5);MT=0;return}MT=now;
  if(MP.size==1)MG={sx:e.clientX,sy:e.clientY,ox:MS.x,oy:MS.y};else if(MP.size==2){const [a,b]=[...MP.values()];MG={d0:Math.max(10,Math.hypot(a.x-b.x,a.y-b.y)),s0:MS.s,cx:(a.x+b.x)/2,cy:(a.y+b.y)/2}}});
 W.addEventListener('pointermove',e=>{if(!MP.has(e.pointerId)||!MG)return;MP.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(MP.size>=2&&MG.d0){const [a,b]=[...MP.values()];at(MG.cx,MG.cy,MG.s0*Math.hypot(a.x-b.x,a.y-b.y)/MG.d0)}else if(MP.size==1&&MG.sx!=null){MS.x=MG.ox+e.clientX-MG.sx;MS.y=MG.oy+e.clientY-MG.sy;ap()}});
 const end=e=>{MP.delete(e.pointerId);if(MP.size==1){const [p]=[...MP.values()];MG={sx:p.x,sy:p.y,ox:MS.x,oy:MS.y}}else if(!MP.size)MG=null};W.addEventListener('pointerup',end);W.addEventListener('pointercancel',end);
 d.addEventListener('click',e=>{const b=e.target.closest('[data-mg]');if(!b)return;const a=b.dataset.mg,R=W.getBoundingClientRect();if(a=='x')d.close();else if(a=='fit'){MS={s:1,x:0,y:0};ap()}else at(R.left+R.width/2,R.top+R.height/2,MS.s*(a=='in'?1.5:1/1.5))});
 return d}
function openMag(){const st=document.getElementById('sstage');if(!st)return;const d=mgDlg(),S=d.querySelector('.mg91s');
 const k=st.cloneNode(true);k.dataset.mg91=1;delete k.dataset.z;k.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));k.querySelectorAll('.calm').forEach(x=>x.classList.remove('calm'));
 const H=Math.max(300,innerHeight-(innerWidth<700?150:120)),W=H*399/1365;Object.assign(k.style,{width:W+'px',height:H+'px',maxHeight:'none',maxWidth:'none',flex:'none',transform:'',margin:'0',pointerEvents:'none'});
 S.replaceChildren(k);MS={s:1,x:0,y:0};d._ap();d.showModal()}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#smag91')){e.preventDefault();e.stopPropagation();openMag()}},true);
window.openMag91=openMag;
}
