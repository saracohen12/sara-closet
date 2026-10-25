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
#c180p :focus-visible{outline:3px solid var(--z-acc,#b4532c);outline-offset:2px}`;
document.head.appendChild(st);

const cov=()=>(typeof SET=='object'&&SET&&SET.catCover)||{};
const url=id=>{try{return img(id)||TPH}catch(_){return ''}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nameOf=sid=>{const s=document.getElementById(sid);const h=s&&s.querySelector('h2');return h?(h.firstChild&&h.firstChild.nodeType==3?h.firstChild.textContent:h.textContent).trim():sid};
function loadTh(ids){const cs=new Set(ids.map(id=>D[id]&&D[id].cat).filter(Boolean));cs.forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}})}

// put her pictures on the tiles (home + closet window); runs again whenever something re-renders them
function paint(){const C=cov();const ids=[];
 document.querySelectorAll('.h9cat[data-h9cat]').forEach(b=>{const sid=b.dataset.h9cat.slice(1);const id=C[sid];b.classList.toggle('c180mine',!!id);if(!id||!D[id])return;
  let im=b.querySelector('.h9im img');if(!im){const sp=b.querySelector('.h9im');if(!sp)return;sp.classList.remove('h9e');sp.innerHTML='<img alt="" loading="lazy">';im=sp.firstChild}
  if(im.dataset.th!=id){im.dataset.th=id;im.src=url(id);ids.push(id)}});
 const k184=(document.getElementById('cl163')||{dataset:{}}).dataset.col||'';  // v184: a colour is chosen → her picture only if it is that colour
 document.querySelectorAll('#cl163 [data-cl163]').forEach(b=>{let id=C[b.dataset.cl163];if(id&&k184){const cd=document.querySelector(`.card[data-id="${id}"]`);if(!cd||cd.dataset.c!=k184)id=''}b.classList.toggle('c180mine',!!id);if(!id||!D[id])return;const ph=b.querySelector('.ph');const u=url(id);
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
let P=null,SID='';
function picker(sid){SID=sid;const sec=document.getElementById(sid);if(!sec)return;
 const cards=[...sec.querySelectorAll('.card')].filter(c=>{try{return !(typeof gen161=='function'&&gen161(c.dataset.id))}catch(_){return true}});
 const ids=cards.map(c=>c.dataset.id).filter(id=>D[id]);
 if(!P){P=document.createElement('dialog');P.id='c180p';P.dir='rtl';P.setAttribute('aria-labelledby','c180t');document.body.appendChild(P);
  P.addEventListener('click',e=>{if(e.target===P)return P.close();const t=e.target.closest('button');if(!t)return;
   if(t.classList.contains('x180'))return P.close();
   if(t.dataset.auto!==undefined)return choose(null);
   if(t.dataset.id)return choose(t.dataset.id)})}
 const cur=cov()[sid]||'';
 P.innerHTML=`<div class="ph180h"><h3 id="c180t">התמונה של ${esc(nameOf(sid))}<small>לוחצים על התמונה שאת אוהבת · ${ids.length} פריטים</small></h3><button type="button" class="x180" aria-label="סגירה">✕</button></div>
  <div class="a180"><button type="button" data-auto aria-pressed="${!cur}">↺ בלי בחירה (אוטומטי)</button></div>
  <div class="g180" role="radiogroup" aria-label="תמונות">${ids.map(id=>`<button type="button" role="radio" data-id="${id}" aria-pressed="${id==cur}" aria-checked="${id==cur}" aria-label="${esc((D[id].short||D[id].full||id).slice(0,60))}"><img data-th="${id}" src="${url(id)}" alt="" loading="lazy" onerror="this.outerHTML='<span class=n180>'+this.parentNode.getAttribute('aria-label')+'</span>'"></button>`).join('')}</div>`;
 loadTh(ids);if(!P.open)P.showModal();P.scrollTop=0;
 const sel=P.querySelector('[aria-pressed=true][data-id]');if(sel)setTimeout(()=>sel.scrollIntoView({block:'center'}),50)}
async function choose(id){if(typeof SET!='object'||!SET)return;SET.catCover=Object.assign({},SET.catCover||{});if(id)SET.catCover[SID]=id;else delete SET.catCover[SID];
 P.querySelectorAll('[data-id]').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.id==id);b.setAttribute('aria-checked',b.dataset.id==id)});P.querySelector('[data-auto]').setAttribute('aria-pressed',!id);
 // without her pick the tile goes back to the automatic picture on the next home render; reset it now
 if(!id){const sec=document.getElementById(SID);const c=sec&&[...sec.querySelectorAll('.card')].find(c=>(IT[c.dataset.id]||{}).img||(D[c.dataset.id]||{}).hi);
  if(c)document.querySelectorAll(`.h9cat[data-h9cat="#${SID}"] .h9im img`).forEach(im=>{im.dataset.th=c.dataset.id;im.src=url(c.dataset.id)})}
 try{if(DB)await saveDoc('settings','main',SET);else localStorage.setItem('hub_settings',JSON.stringify(SET))}catch(_){}
 paint();(window.toast||(()=>{}))(id?'✓ התמונה נשמרה':'✓ חזר לאוטומטי');setTimeout(()=>P.open&&P.close(),350)}

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.c180e,.h9cat[data-h9cat],#cl163 [data-cl163]');if(!t)return;
 if(t.classList.contains('c180e')){e.preventDefault();e.stopImmediatePropagation();return setEdit(!EDIT)}
 if(!EDIT)return;e.preventDefault();e.stopImmediatePropagation();
 picker(t.dataset.h9cat?t.dataset.h9cat.slice(1):t.dataset.cl163)},true);
window.CAT180={picker,paint};
})();
