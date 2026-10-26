// v180 Sara picks the picture of every category herself (25/10: "אני לא רוצה שתבחר לי לבד"). Saved in settings/main.catCover {sectionId: itemId};
// a category she picked never changes by itself. "🖼 לבחור תמונות" next to "הכל" on the home screen, and in the closet-by-category window.
(function(){
const st=document.createElement('style');st.textContent=`
.c180e{font:inherit;font-size:.85rem;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid var(--z-line,var(--line,#ddd));background:var(--z-surface,var(--card,#fff));color:var(--z-ink,var(--fg,#222));cursor:pointer;white-space:nowrap}
.c180e[aria-pressed=true]{background:var(--z-acc,#b4532c);border-color:var(--z-acc,#b4532c);color:var(--z-acc-ink,#fff)}
.c180on .h9cat,.c180on [data-cl163]{position:relative}
.c180on .h9cat .h9im::after,.c180on [data-cl163] .ph::after{content:"🖼 לבחור";position:absolute;inset:auto 8px 8px 8px;display:grid;place-items:center;min-height:30px;border-radius:999px;background:rgba(20,12,8,.62);color:#fff;font-size:.78rem;font-weight:600}
.c180on .h9cat .h9im,.c180on [data-cl163] .ph{position:relative;outline:2px dashed var(--z-acc,#b4532c);outline-offset:2px}
.c180mine::before{content:"♥";position:absolute;top:6px;inset-inline-start:6px;z-index:1;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.9);color:var(--z-acc,#b4532c);font-size:.72rem}
#c180p{width:min(720px,100vw);max-width:100vw;height:100dvh;max-height:100dvh;margin:0 auto;padding:0;border:0;border-radius:0;background:var(--z-solid,var(--bg,#faf7f2));color:var(--z-ink,var(--fg,#222))}
@media(min-width:721px){#c180p{height:auto;max-height:90dvh;margin:5dvh auto;border-radius:24px}}
#c180p::backdrop{background:rgba(20,12,8,.45)}
#c180p .ph180h{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:14px 16px 10px;background:inherit;border-bottom:1px solid var(--z-line,var(--line,#ddd))}
#c180p h3{flex:1;margin:0;font-size:1.15rem;line-height:1.25}#c180p h3 small{display:block;font-size:.82rem;font-weight:400;color:var(--z-muted,var(--muted,#777))}
#c180p .x180{width:44px;height:44px;border-radius:50%;border:1px solid var(--z-line,var(--line,#ddd));background:none;color:inherit;font-size:1rem;cursor:pointer;flex:none}
#c180p .a180{display:flex;gap:8px;padding:10px 16px 0;flex-wrap:wrap}
#c180p .a180 button{font:inherit;font-size:.86rem;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid var(--z-line,var(--line,#ddd));background:none;color:inherit;cursor:pointer}
#c180p .a180 button[aria-pressed=true]{border-color:var(--z-acc,#b4532c);color:var(--z-acc,#b4532c);font-weight:600}
#c180p .g180{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px 16px 24px}
@media(min-width:560px){#c180p .g180{grid-template-columns:repeat(5,1fr)}}
#c180p .g180 button{position:relative;padding:0;border:2px solid transparent;border-radius:16px;overflow:hidden;background:var(--z-tile,#f1ece6);cursor:pointer;aspect-ratio:3/4}
#c180p .g180 .n180{display:grid;place-items:center;height:100%;padding:8px;font-size:.78rem;line-height:1.3;text-align:center;color:var(--z-muted,#777)}
#c180p .g180 img{width:100%;height:100%;object-fit:cover;display:block}
#c180p .g180 button[aria-pressed=true]{border-color:var(--z-acc,#b4532c);box-shadow:0 0 0 3px var(--z-acc-soft,rgba(180,83,44,.2))}
#c180p .g180 button[aria-pressed=true]::after{content:"✓";position:absolute;top:6px;inset-inline-end:6px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--z-acc,#b4532c);color:#fff;font-weight:700}
#c180p :focus-visible{outline:3px solid var(--z-acc,#b4532c);outline-offset:2px}
/* v208: her 360 avatar as the category picture, turning on touch; names and a 360 badge in the picker */
.h9im.c208av,.cl163c .ph.c208av{position:relative;background-color:#d9e2ee}
.cl163c .ph.c208av{background-position:50% 12%}
.h9im.c208av img{object-fit:cover;object-position:50% 12%}
.c208h{position:absolute;bottom:5px;inset-inline-start:5px;z-index:1;font-style:normal;font-size:.68rem;line-height:1;padding:4px 7px;border-radius:999px;background:rgba(255,255,255,.92);color:#2a1d17;pointer-events:none}
.c180on .c208h{display:none}
#c180p .m208{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:10px 16px 0;padding:10px 12px;border-radius:16px;background:var(--z-surface,var(--card,#f6f2ee));font-size:.88rem}
#c180p .m208 b{flex:1 1 100%;font-weight:600}
#c180p .m208 button,#c180p .f208 button{font:inherit;font-size:.86rem;min-height:44px;padding:0 14px;border-radius:999px;border:1px solid var(--z-line,var(--line,#ddd));background:var(--z-solid,#fff);color:var(--z-ink,#2a1d17);cursor:pointer}
#c180p .m208 button[aria-pressed=true],#c180p .f208 button[aria-pressed=true]{background:var(--z-acc,#b4532c);border-color:var(--z-acc,#b4532c);color:var(--z-acc-ink,#fff);font-weight:600}
#c180p .f208{display:flex;gap:8px;flex-wrap:wrap;padding:10px 16px 0}
#c180p .g180 .b208{position:absolute;top:6px;inset-inline-start:6px;z-index:1;font-style:normal;font-size:.7rem;font-weight:700;line-height:1;padding:4px 7px;border-radius:999px;background:var(--z-acc,#b4532c);color:#fff}
#c180p .g180 .t208{position:absolute;inset:auto 0 0 0;padding:16px 6px 5px;font-size:.7rem;line-height:1.25;color:#fff;background:linear-gradient(transparent,rgba(20,12,8,.78));text-align:start;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#c180p .g180 button.av208 img{object-position:50% 12%;background:#d9e2ee}
#c180p .s209{padding:10px 16px 0}
#c180p .s209 input{width:100%;box-sizing:border-box;font:inherit;font-size:16px!important;min-height:44px;padding:0 16px;border-radius:999px!important;border:1px solid var(--z-line,var(--line,#ddd))!important;background:var(--z-solid,#fff)!important;color:var(--z-ink,#2a1d17)!important}
#c180p .s209 input::placeholder{color:var(--z-muted,#888);opacity:1}
#c180p .s209 small{display:block;min-height:1.2em;padding:4px 6px 0;font-size:.8rem;color:var(--z-muted,#777)}
#c180p .e209{margin:0;padding:8px 16px 24px;text-align:center;color:var(--z-muted,#777)}`;
document.head.appendChild(st);

const cov=()=>(typeof SET=='object'&&SET&&SET.catCover)||{};
const url=id=>{try{return img(id)||TPH}catch(_){return ''}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// v208 (Sara 26/10 14:02 "תן לי לבחור מתוך הרשימה ... אפשרות לבחור אווטאר 360, בנגיעה זה מסתובב, ואם אין עדיין אווטאר אז תמונה שאבחר"):
// an item she picks that is already on the 360 avatar shows HER wearing it (R360.still, 8 angles) – a touch on the picture turns it once around;
// SET.catPic[sid]='p' = the item's own picture instead. Items not on the avatar yet show their picture, as before.
const R=()=>window.R360;
const ready=id=>{try{return !!(R()&&R().isReady&&R().isReady(id))}catch(_){return false}};
const avOf=(sid,id)=>!!id&&ready(id)&&((typeof SET=='object'&&SET&&SET.catPic)||{})[sid]!='p';
const FR={};
function frame(id,v){FR[id]=FR[id]||[];if(!FR[id][v])FR[id][v]=(async()=>{try{const c=R()&&R().still?await R().still(id,v):null;if(!c||!c.width)throw 0;
  const o=document.createElement('canvas');o.width=300;o.height=Math.round(c.height*300/c.width);o.getContext('2d').drawImage(c,0,0,o.width,o.height);return o.toDataURL('image/webp',.86)}
 catch(_){FR[id][v]=null;return ''}})();return FR[id][v]}   // a frame whose layers did not load yet is tried again next time
const still2=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(_){return false}};
// one turn around (reduced motion: the next angle on every touch)
async function spin(el,id,set){if(el._t){clearInterval(el._t);el._t=null;el._v=0;const u=await frame(id,0);if(u)set(u);return}
 if(still2()){el._v=((el._v||0)+1)%8;const u=await frame(id,el._v);if(u)set(u);return}
 const F=await Promise.all([0,1,2,3,4,5,6,7].map(v=>frame(id,v)));if(F.some(u=>!u))return;let i=0;
 el._t=setInterval(()=>{i++;set(F[i%8]);if(i>=8){clearInterval(el._t);el._t=null}},170)}
const nameOf=sid=>{const s=document.getElementById(sid);const h=s&&s.querySelector('h2');return h?(h.firstChild&&h.firstChild.nodeType==3?h.firstChild.textContent:h.textContent).trim():sid};
function loadTh(ids){const cs=new Set(ids.map(id=>D[id]&&D[id].cat).filter(Boolean));cs.forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}})}

// put her pictures on the tiles (home + closet window); runs again whenever something re-renders them
function paint(){const C=cov();const ids=[];
 document.querySelectorAll('.h9cat[data-h9cat]').forEach(b=>{const sid=b.dataset.h9cat.slice(1);const id=C[sid];b.classList.toggle('c180mine',!!id);if(!id||!D[id])return;
  let im=b.querySelector('.h9im img');if(!im){const sp=b.querySelector('.h9im');if(!sp)return;sp.classList.remove('h9e');sp.innerHTML='<img alt="" loading="lazy">';im=sp.firstChild}
  const sp=im.parentNode,av=avOf(sid,id);sp.classList.toggle('c208av',av);sp.dataset.c208=av?id:'';
  if(av){if(!sp.querySelector('.c208h'))sp.insertAdjacentHTML('beforeend','<i class="c208h" aria-hidden="true">🔄 360</i>');
   if(im.dataset.th!='av:'+id&&!sp._t){const k='av:'+id;frame(id,0).then(u=>{if(u&&im.dataset.th!=k){im.dataset.th=k;im.src=u}})}return}
  const h=sp.querySelector('.c208h');if(h)h.remove();
  if(im.dataset.th!=id){im.dataset.th=id;im.src=url(id);ids.push(id)}});
 const k184=(document.getElementById('cl163')||{dataset:{}}).dataset.col||'';  // v184: a colour is chosen → her picture only if it is that colour
 document.querySelectorAll('#cl163 [data-cl163]').forEach(b=>{let id=C[b.dataset.cl163];if(id&&k184){const cd=document.querySelector(`.card[data-id="${id}"]`);if(!cd||cd.dataset.c!=k184)id=''}b.classList.toggle('c180mine',!!id);if(!id||!D[id])return;const ph=b.querySelector('.ph');
  const av=!!ph&&avOf(b.dataset.cl163,id);if(ph){ph.classList.toggle('c208av',av);ph.dataset.c208=av?id:'';const h=ph.querySelector('.c208h');
   if(av&&!h)ph.insertAdjacentHTML('beforeend','<i class="c208h" aria-hidden="true">🔄 360</i>');else if(!av&&h)h.remove()}
  if(av){if(ph.dataset.c180!='av:'+id&&!ph._t)frame(id,0).then(u=>{if(u){ph.dataset.c180='av:'+id;ph.style.backgroundImage=`url('${u}')`}});return}
  const u=url(id);
  if(ph&&u&&ph.dataset.c180!=id+u){ph.dataset.c180=id+u;ph.style.backgroundImage=`url('${u}')`;if(u==TPH)ids.push(id)}});
 if(ids.length)loadTh(ids)}
setInterval(paint,1500);

// edit mode buttons
let EDIT=false;
function addButtons(){const hd=document.querySelector('.h9sec .h9head');if(hd&&!hd.querySelector('.c180e')){const b=document.createElement('button');b.type='button';b.className='c180e';b.setAttribute('aria-pressed','false');b.textContent='🖼 לבחור תמונות';const all=hd.querySelector('.h9all');all?all.before(b):hd.appendChild(b)}
 const x=document.querySelector('#cl163 .cl163x');if(x&&!x.querySelector('.c180e')){const b=document.createElement('button');b.type='button';b.className='c180e';b.textContent='🖼 לבחור תמונות לקטגוריות';x.prepend(b)}
 document.querySelectorAll('.c180e').forEach(b=>{b.setAttribute('aria-pressed',EDIT);b.textContent=EDIT?'✓ סיימתי':(b.closest('#cl163')?'🖼 לבחור תמונות לקטגוריות':'🖼 לבחור תמונות')});
 document.querySelectorAll('.h9sec,#cl163').forEach(s=>s.classList.toggle('c180on',EDIT))}
setInterval(addButtons,1000);addButtons();
function setEdit(on){EDIT=on;addButtons();if(on)(window.toast||(()=>{}))('לוחצים על קטגוריה ובוחרים לה תמונה')}

// the picker
let P=null,SID='',F208=false,Q209='';const QS={};
// v209 (Sara 14:19 "תן לי אפשרות לעשות חיפוש ... מתוך כל התמונות של השמלות ... איזה שמלה אני רוצה"): search + the avatar filter together
const nq=v=>typeof normQ=='function'?normQ(v):(v||'').toLowerCase();
function flt(){if(!P)return;const w=nq(Q209.trim()).split(/\s+/).filter(Boolean);let n=0;
 P.querySelectorAll('.g180 [data-id]').forEach(b=>{const ok=!(F208&&!b.classList.contains('av208'))&&w.every(x=>(QS[b.dataset.id]||'').includes(x));b.hidden=!ok;if(ok)n++});
 const c=P.querySelector('.s209 small');if(c)c.textContent=w.length?(n?`נמצאו ${n}`:''):'';const e=P.querySelector('.e209');if(e)e.hidden=!!n}
function modeHTML(){const id=cov()[SID]||'';if(!id||!ready(id))return '';const pic=((SET&&SET.catPic)||{})[SID]=='p';
 return `<div class="m208" role="group" aria-label="מה רואים בקטגוריה"><b>"${esc((D[id]&&(D[id].short||D[id].full))||'').slice(0,40)}" כבר על האווטאר שלך. מה רואים בקטגוריה?</b>
  <button type="button" data-m208="av" aria-pressed="${!pic}">🔄 אני לובשת אותו (מסתובב)</button><button type="button" data-m208="p" aria-pressed="${pic}">🖼 התמונה של הבגד</button></div>`}
function picker(sid){SID=sid;F208=false;Q209='';const sec=document.getElementById(sid);if(!sec)return;
 const cards=[...sec.querySelectorAll('.card')].filter(c=>{try{return !(typeof gen161=='function'&&gen161(c.dataset.id))}catch(_){return true}});
 const ids=cards.map(c=>c.dataset.id).filter(id=>D[id]),nav=ids.filter(ready).length;
 cards.forEach(c=>{const id=c.dataset.id;if(D[id])QS[id]=nq((c.dataset.q||'')+' '+(D[id].short||''))});
 if(!P){P=document.createElement('dialog');P.id='c180p';P.dir='rtl';P.setAttribute('aria-labelledby','c180t');document.body.appendChild(P);
  P.addEventListener('click',e=>{if(e.target===P)return P.close();const t=e.target.closest('button');if(!t)return;
   if(t.classList.contains('x180'))return P.close();
   if(t.dataset.auto!==undefined)return choose(null);
   if(t.dataset.m208)return mode(t.dataset.m208);
   if(t.dataset.f208!==undefined){F208=t.dataset.f208=='av';P.querySelectorAll('[data-f208]').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.f208=='av')==F208));return flt()}
   if(t.dataset.id)return choose(t.dataset.id)});
  P.addEventListener('input',e=>{if(e.target.id=='c209q'){Q209=e.target.value;flt()}})}
 const cur=cov()[sid]||'';
 P.innerHTML=`<div class="ph180h"><h3 id="c180t">התמונה של ${esc(nameOf(sid))}<small>לוחצים על הבגד שאת רוצה · ${ids.length} פריטים${nav?` · 🔄 = כבר על האווטאר (${nav})`:''}</small></h3><button type="button" class="x180" aria-label="סגירה">✕</button></div>
  <div class="a180"><button type="button" data-auto aria-pressed="${!cur}">↺ בלי בחירה (אוטומטי)</button></div>
  <div class="m208w">${modeHTML()}</div>
  <div class="s209"><input id="c209q" type="search" enterkeyhint="search" autocomplete="off" placeholder="🔍 לחפש: שם, צבע, מילה" aria-label="לחפש בגד ב${esc(nameOf(sid))}"><small aria-live="polite"></small></div>
  ${nav?`<div class="f208" role="group" aria-label="סינון"><button type="button" data-f208="all" aria-pressed="true">הכל ${ids.length}</button><button type="button" data-f208="av" aria-pressed="false">🔄 על האווטאר ${nav}</button></div>`:''}
  <div class="g180" role="radiogroup" aria-label="הבגדים">${ids.map(id=>{const nm=(D[id].short||D[id].full||id).slice(0,60),a=ready(id);
   return `<button type="button" role="radio" data-id="${id}"${a?' class="av208"':''} aria-pressed="${id==cur}" aria-checked="${id==cur}" aria-label="${esc(nm)}${a?' – על האווטאר':''}"><img data-th="${id}" src="${url(id)}" alt="" loading="lazy" onerror="this.outerHTML='<span class=n180>'+this.parentNode.getAttribute('aria-label')+'</span>'">${a?'<i class="b208" aria-hidden="true">🔄 360</i>':''}<span class="t208" aria-hidden="true">${esc(nm)}</span></button>`}).join('')}</div><p class="e209" hidden>לא נמצא. נסי מילה אחרת</p>`;
 loadTh(ids);if(!P.open)P.showModal();P.scrollTop=0;
 // the items already on the avatar show HER wearing them
 P.querySelectorAll('.g180 .av208').forEach(b=>{const im=b.querySelector('img');if(im)frame(b.dataset.id,0).then(u=>{if(u&&im.isConnected){im.dataset.th='av:'+b.dataset.id;im.src=u}})});
 const sel=P.querySelector('[aria-pressed=true][data-id]');if(sel)setTimeout(()=>sel.scrollIntoView({block:'center'}),50)}
async function save(){try{if(DB)await saveDoc('settings','main',SET);else localStorage.setItem('hub_settings',JSON.stringify(SET))}catch(_){}}
async function mode(m){if(typeof SET!='object'||!SET)return;SET.catPic=Object.assign({},SET.catPic||{});if(m=='p')SET.catPic[SID]='p';else delete SET.catPic[SID];
 P.querySelectorAll('[data-m208]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m208==m));await save();paint();
 (window.toast||(()=>{}))(m=='p'?'✓ בקטגוריה: התמונה של הבגד':'✓ בקטגוריה: את לובשת אותו – מסתובב כשהעכבר עליו, ובטלפון בנגיעה');setTimeout(()=>P.open&&P.close(),600)}
async function choose(id){if(typeof SET!='object'||!SET)return;SET.catCover=Object.assign({},SET.catCover||{});if(id)SET.catCover[SID]=id;else delete SET.catCover[SID];
 if(SET.catPic&&SET.catPic[SID]){SET.catPic=Object.assign({},SET.catPic);delete SET.catPic[SID]}   // a new pick starts on the avatar when it has one
 P.querySelectorAll('[data-id]').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.id==id);b.setAttribute('aria-checked',b.dataset.id==id)});P.querySelector('[data-auto]').setAttribute('aria-pressed',!id);
 // without her pick the tile goes back to the automatic picture on the next home render; reset it now
 if(!id){const sec=document.getElementById(SID);const c=sec&&[...sec.querySelectorAll('.card')].find(c=>(IT[c.dataset.id]||{}).img||(D[c.dataset.id]||{}).hi);
  if(c)document.querySelectorAll(`.h9cat[data-h9cat="#${SID}"] .h9im img`).forEach(im=>{im.dataset.th=c.dataset.id;im.src=url(c.dataset.id)})}
 await save();paint();
 if(id&&ready(id)){const w=P.querySelector('.m208w');if(w){w.innerHTML=modeHTML();w.scrollIntoView({block:'nearest'});const b=w.querySelector('[data-m208="av"]');if(b)b.focus({preventScroll:true})}
  (window.toast||(()=>{}))('✓ נשמר – את לובשת אותו. אפשר לבחור גם את התמונה של הבגד');return}
 const w=P.querySelector('.m208w');if(w)w.innerHTML='';
 (window.toast||(()=>{}))(id?'✓ התמונה נשמרה':'✓ חזר לאוטומטי');setTimeout(()=>P.open&&P.close(),350)}

// v209 (Sara 14:21 "כשהעכבר מגיע לשם, לבד זה יסתובב, וכשהעכבר ילך, זה יפסיק ... תמיד זה יישאר על החזית"):
// with a mouse the doll keeps turning while the mouse is over it and goes back to the front when it leaves; a click opens the category
let LASTPT='mouse';window.addEventListener('pointerdown',e=>{LASTPT=e.pointerType||'mouse'},true);
const setter=a=>{const im=a.querySelector('img'),id=a.dataset.c208;return u=>{if(im){im.dataset.th='av:'+id;im.src=u}else{a.dataset.c180='av:'+id;a.style.backgroundImage=`url('${u}')`}}};
async function hoverOn(a){if(a._h||EDIT)return;a._h=1;const id=a.dataset.c208;if(a._t){clearInterval(a._t);a._t=null}
 const F=await Promise.all([0,1,2,3,4,5,6,7].map(v=>frame(id,v)));if(!a._h||a._t||F.some(u=>!u))return;const set=setter(a);let i=0;
 a._t=setInterval(()=>{i=(i+1)%8;set(F[i])},still2()?450:170)}
async function hoverOff(a){if(!a._h)return;a._h=0;if(a._t){clearInterval(a._t);a._t=null}a._v=0;const id=a.dataset.c208;if(!id)return;const u=await frame(id,0);if(u&&!a._h)setter(a)(u)}
document.addEventListener('pointerover',e=>{if(e.pointerType=='touch')return;const a=e.target.closest&&e.target.closest('.c208av');if(a&&a.dataset.c208&&!(e.relatedTarget&&a.contains(e.relatedTarget)))hoverOn(a)});
document.addEventListener('pointerout',e=>{if(e.pointerType=='touch')return;const a=e.target.closest&&e.target.closest('.c208av');if(a&&!(e.relatedTarget&&a.contains(e.relatedTarget)))hoverOff(a)});
// v208: on window, so it runs before the closet window's own capture handler (fix163 would close it and jump to the category)
window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.c180e,.h9cat[data-h9cat],#cl163 [data-cl163]');if(!t)return;
 if(t.classList.contains('c180e')){e.preventDefault();e.stopImmediatePropagation();return setEdit(!EDIT)}
 if(!EDIT){const a=e.target.closest('.c208av');if(a&&a.dataset.c208&&e.detail!==0&&(e.pointerType||LASTPT)=='touch'){e.preventDefault();e.stopImmediatePropagation();   // v208: a touch on her avatar turns it; the name opens the category
   const id=a.dataset.c208,im=a.querySelector('img');spin(a,id,u=>{if(im){im.dataset.th='av:'+id;im.src=u}else a.style.backgroundImage=`url('${u}')`})}return}e.preventDefault();e.stopImmediatePropagation();
 picker(t.dataset.h9cat?t.dataset.h9cat.slice(1):t.dataset.cl163)},true);
window.CAT180={picker,paint};
})();
