// ===== v84 (2026-10-22): phone round – resizing a garment in every pose (side view: the garment is narrow, so two fingers
// landed on the background and zoomed the whole stage instead), big ➖ ➕ size buttons, and screens that did not open on the phone.
(()=>{
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v84 '+w+': '+(e&&e.message||e));
const layer=s=>document.querySelector(`#sstage img.sl[data-slot="${s}"]`);
const canSize=()=>typeof ST!='undefined'&&ST&&SSEL&&ST.items[SSEL]&&SSEL!='jewelry'&&ST.tf[SSEL]&&!ST.tf[SSEL].lock&&layer(SSEL)&&!document.body.classList.contains('er74on');
function sizeDone(slot){try{const tf=ST.tf[slot];tf.pvman=tf.pvman||{};tf.pvman[ST.view||'front']=1;const sw=$('#sw');if(sw)sw.value=Math.round(tf.w);if(typeof saveFit=='function')saveFit(slot)}catch(e){ERR('size',e)}}

// ---- 1. two fingers on the stage while a garment is selected = that garment's size (near the garment), not the stage zoom
const P=new Map();let PZ=null;
window.addEventListener('pointerdown',e=>{try{if(!(e.target.closest&&e.target.closest('#sstage,#studio .smain'))||e.pointerType=='mouse')return;P.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(P.size!=2||!canSize())return;const [a,b]=[...P.values()];const el=layer(SSEL);const r=el.getBoundingClientRect();const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;const pad=70;
 // midpoint of the fingers on (or close to) the selected garment → resize it; elsewhere the stage zoom keeps working
 if(mx<r.left-pad||mx>r.right+pad||my<r.top-pad||my>r.bottom+pad)return;
 try{pushH()}catch(_){}PZ={slot:SSEL,el,d0:Math.max(12,Math.hypot(a.x-b.x,a.y-b.y)),ow:ST.tf[SSEL].w};
 try{ZG2=null;ZP2.clear()}catch(_){}try{PTR.clear();PG=null}catch(_){}try{SDR=null}catch(_){}e.preventDefault();e.stopImmediatePropagation()}catch(err){ERR('pd',err)}},true);
window.addEventListener('pointermove',e=>{if(!P.has(e.pointerId))return;P.set(e.pointerId,{x:e.clientX,y:e.clientY});if(!PZ)return;e.preventDefault();e.stopImmediatePropagation();
 try{if(P.size<2)return;const [a,b]=[...P.values()];const tf=ST.tf[PZ.slot];tf.w=Math.max(5,Math.min(400,PZ.ow*Math.hypot(a.x-b.x,a.y-b.y)/PZ.d0));PZ.el.style.width=tf.w+'%'}catch(err){ERR('pm',err)}},{capture:true,passive:false});
const pend=e=>{P.delete(e.pointerId);if(PZ&&P.size<2){const s=PZ.slot;PZ=null;try{paintSel()}catch(_){}sizeDone(s);e.stopImmediatePropagation()}};
window.addEventListener('pointerup',pend,true);window.addEventListener('pointercancel',pend,true);
// a finger that went down before the pinch must not keep turning the avatar or dragging
window.addEventListener('touchmove',e=>{if(PZ)e.stopImmediatePropagation()},{capture:true,passive:true});
window.addEventListener('touchend',e=>{if(PZ||P.size>1)e.stopImmediatePropagation()},{capture:true,passive:true});

// ---- 2. big ➖ ➕ for the garment size next to "הקודם / הבא" (works the same in all 5 poses)
function sizeStep(d){if(!canSize())return;const tf=ST.tf[SSEL];try{pushH()}catch(_){}tf.w=Math.max(5,Math.min(400,Math.round(tf.w*(d>0?1.06:1/1.06)*10)/10));const el=layer(SSEL);if(el)el.style.width=tf.w+'%';sizeDone(SSEL)}
if(typeof paintSel=='function'){const _ps=paintSel;paintSel=function(){const r=_ps.apply(this,arguments);try{const n=document.querySelector('#ssel .nx83');if(n&&!n.querySelector('[data-sz84]')&&SSEL!='jewelry')n.insertAdjacentHTML('beforeend','<span class="sz84"><button data-sz84="-1" aria-label="להקטין את הבגד">➖</button><b>גודל</b><button data-sz84="1" aria-label="להגדיל את הבגד">➕</button></span>')}catch(_){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-sz84]');if(!b)return;e.preventDefault();sizeStep(+b.dataset.sz84)});

// ---- 3. the side index of v83 shows only while scrolling the closet and hides 1.6 s after the scroll stops
{let t=0;window.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(()=>{const r=$('#ix83');if(r&&!r.matches(':active'))r.classList.remove('on')},1600)},{passive:true});
 document.addEventListener('touchend',e=>{const r=$('#ix83');if(r&&r.contains(e.target)){clearTimeout(t);t=setTimeout(()=>r.classList.remove('on'),1600)}},{passive:true})}

// ---- 4. (#32) back and hand-on-waist: after the shoulder fit, check both outer edges (arms / sleeves, the bent elbow)
// row by row and nudge size and place so the sleeves cover her arms. Only rows where a sleeve is near the arm count
// (a short sleeve or a sleeveless top is left alone), at most ±10 % size, and only when it is clearly better.
async function armFit(slot,ctx){if(typeof AF_TOP=='undefined'||!AF_TOP.includes(slot))return false;let id,tf,v,g;
 if(ctx){({id,tf,v,g}=ctx)}else{if(!ST||(ST.avbase||'long')!='p5')return false;id=ST.items[slot];tf=ST.tf[slot];if(!id||!tf)return false;g=p5gOfT(id,tf);v=ST.view||'front'}
 if(v!='back'&&v!='hip')return false;if(!g||!g[v]||!tf||(tf.pvman&&tf.pvman[v]))return false;const B=P5BODY[v];if(!B)return false;
 const url=p5gUrl(g,v);let use=url;try{const cl=await cleanP5(url,false);use=cl&&cl.url||url}catch(_){}
 const ro=await rowsOf(use,tf.w/100*399);if(!ro)return false;const sx=tf.sx||1,sy=tf.sy||1;const cy=tf.y/100*1365,cx=tf.x/100*399,top=cy-ro.H*sy/2;
 const BR=[];for(let y=B.y.sh;y<=B.y.sh+340;y+=6){const q=bodyAt(v,y);if(q)BR.push([y,q[0],q[1]])}if(BR.length<12)return false;
 const T=45,cost=(s,dx,dy)=>{let c=0,n=0;for(const [y,bl,br] of BR){const r=Math.round((y-top-dy)/(sy*s));const q=r>=0&&r<ro.H?ro.R[r]:null;if(!q)continue;
   const gl=cx+dx+(q[0]-ro.W/2)*sx*s,gr=cx+dx+(q[1]-ro.W/2)*sx*s;for(const d of [gl-bl,br-gr]){if(Math.abs(d)>T){c+=T*T;continue}n++;c+=d>0?2*d*d:d*d}}return n<10?Infinity:c};
 const c0=cost(1,0,0);let best={c:c0,s:1,dx:0,dy:0};const DY=v=='hip'?[-30,-24,-18,-12,-6,0,6,12,18,24,30]:[-6,0,6];
 for(let s=.9;s<=1.1001;s+=.02)for(let dx=-24;dx<=24;dx+=3)for(const dy of DY){const c=cost(s,dx,dy);if(c<best.c)best={c,s,dx,dy}}
 if(!isFinite(c0)||best.c>c0*.9)return false;
 const nt=top+best.dy,ncy=nt+ro.H*sy*best.s/2;tf.w=Math.round(tf.w*best.s*10)/10;tf.y=Math.round(ncy/1365*1000)/10;tf.x=Math.round((cx+best.dx)/399*1000)/10;return true}
window.armFit84=armFit;
if(typeof smartFit=='function'){const _sf=smartFit;smartFit=async function(slot,force,ctx){const r=await _sf.apply(this,arguments);let a=false;try{if(r)a=await armFit(slot,ctx)}catch(e){ERR('arm',e)}return r||a};window.smartFit=smartFit}
})();
