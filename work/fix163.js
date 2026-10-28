// ===== v163: "הארון" in the bottom bar opens "הארון שלי" – every category as a tile (photo + count); one tap shows only that category
// (Sara 25/10: "היום לא הבנתי מה יש בארון שלי... אני רוצה לבחור קטגוריה")
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v163 '+w+': '+(e&&e.message||e));
const GN={clo:'בגדים',acc:'אביזרים',nig:'לילה',kid:'ילדים',more:'עוד'};
const st=document.createElement('style');st.textContent=`
#cl163{width:min(760px,100vw);max-width:100vw;max-height:100dvh;height:100dvh;margin:0 auto;padding:0;border:0;border-radius:0;background:var(--bg,#faf7f2)}
@media(min-width:701px){#cl163{height:auto;max-height:92dvh;margin:4dvh auto;border-radius:22px}}
#cl163::backdrop{background:rgba(30,20,10,.35)}
.cl163h{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:14px 16px 10px;background:var(--bg,#faf7f2);border-bottom:1px solid var(--line)}
.cl163h h3{margin:0;flex:1;font-size:1.25rem}.cl163h small{display:block;color:var(--muted);font-size:.8rem;font-weight:400}
.cl163h button{font:inherit;width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:#fff;cursor:pointer;font-size:1.1rem}
.cl163b{padding:12px 16px 28px}
.cl163all{display:flex;align-items:center;justify-content:space-between;width:100%;font:inherit;font-size:1.05rem;font-weight:700;padding:14px 18px;border-radius:18px;border:0;background:#3a2a1e;color:#fff;cursor:pointer;margin-bottom:6px}
.cl163all b{font-size:.95rem;background:rgba(255,255,255,.18);padding:3px 10px;border-radius:999px}
.cl163g{margin:16px 2px 8px;font-size:.95rem;color:var(--muted);font-weight:700}
.cl163t{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media(max-width:420px){.cl163t{grid-template-columns:repeat(2,1fr)}}
@media(min-width:701px){.cl163t{grid-template-columns:repeat(4,1fr)}}
.cl163c{display:flex;flex-direction:column;font:inherit;padding:0;border-radius:16px;border:1px solid var(--line);background:#fff;overflow:hidden;cursor:pointer;text-align:start}
.cl163c .ph{display:block;aspect-ratio:1/1;background:#f1ece6 center/cover no-repeat}
.cl163c span.n{display:flex;justify-content:space-between;align-items:center;gap:6px;padding:8px 10px;font-weight:700;font-size:.92rem}
.cl163c span.n b{font-size:.8rem;color:var(--muted);font-weight:600;background:#f6f1ea;padding:2px 8px;border-radius:999px}
.cl163x{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.cl163x button{font:inherit;font-size:.88rem;padding:9px 14px;border-radius:999px;border:1px solid var(--line);background:#fff;cursor:pointer}`;
document.head.appendChild(st);

const secs=()=>[...document.querySelectorAll('section[id][data-g]')].filter(s=>s.dataset.g!='ord');
const name=s=>{const h=s.querySelector('h2');return h?(h.firstChild&&h.firstChild.nodeType==3?h.firstChild.textContent:h.textContent).trim():s.id};
const shown=c=>{try{return !(typeof gen161=='function'&&gen161(c.dataset.id))&&extra(c)}catch(_){return true}};
function pic(cs){const pref=[c=>(IT[c.dataset.id]||{}).fav,c=>(IT[c.dataset.id]||{}).img,()=>true];
 for(const f of pref)for(const c of cs){if(!f(c))continue;let u='';try{u=img(c.dataset.id)}catch(_){}if(u&&u!=TPH&&!u.startsWith('data:image/gif'))return u}return ''}

function open163(){let d=document.getElementById('cl163');if(!d){d=document.createElement('dialog');d.id='cl163';d.dir='rtl';document.body.appendChild(d)}
 const by={};let tot=0;
 // v184: counted without the colour first, so the colour row can say how many of each; then the tiles show only the chosen colour
 let c0='';try{c0=COL||''}catch(_){}const cc={};const all=[];
 try{if(c0)COL='';secs().forEach(s=>{const cs=[...s.querySelectorAll('.card')].filter(shown);if(cs.length)all.push([s,cs])})}finally{if(c0)COL=c0}
 all.forEach(([s,cs0])=>{const mx={};cs0.forEach(c=>{const f=c.dataset.c;if(f){cc[f]=(cc[f]||0)+1;mx[f]=(mx[f]||0)+1}});
  const cs=c0?cs0.filter(c=>c.dataset.c==c0):cs0;if(!cs.length)return;tot+=cs.length;(by[s.dataset.g]=by[s.dataset.g]||[]).push({id:s.id,g:s.dataset.g,n:cs.length,name:name(s),u:pic(cs),mx:c0?null:mx})});
 const es=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const SWc=f=>(typeof SW=='object'&&SW[f])||'#ccc',fam=[...document.querySelectorAll('#cols button[data-c]')].map(b=>b.dataset.c);
 const strip=mx=>{const e=Object.entries(mx||{}).sort((a,b)=>b[1]-a[1]);return e.length?`<span class="mx" aria-hidden="true">${e.map(([f,k])=>`<i style="flex:${k};background:${f=='צבעוני'?'linear-gradient(90deg,#e33,#ec3,#3c5,#3be,#a4d)':SWc(f)}"></i>`).join('')}</span>`:''};
 const tile=t=>`<button class="cl163c" data-cl163="${t.id}" data-g="${t.g}"><i class="ph" style="${t.u?`background-image:url('${es(t.u)}')`:''}"></i><span class="n">${es(t.name)} <b>${t.n}</b></span>${strip(t.mx)}</button>`;
 const kRow=`<div class="cl163k" role="group" aria-label="לפי צבע"><span class="cl163kl">🎨 לפי צבע${c0?'':' <small>(לא חובה)</small>'}</span><div class="cl163kr">${c0?'<button data-cl163col="" class="all">✕ כל הצבעים</button>':''}${fam.filter(f=>cc[f]||f==c0).map(f=>`<button data-cl163col="${es(f)}" aria-pressed="${f==c0}"><i style="background:${SWc(f)}"></i>${es(f)} <b>${cc[f]||0}</b></button>`).join('')}</div></div>`;
 let gen=0;try{gen=Object.keys(IT).filter(id=>gen161(id)).length}catch(_){}
 d.dataset.col=c0;
 d.innerHTML=`<div class="cl163h"><h3>👗 הארון שלי<small>${c0?`${es(c0)} · ${tot} פריטים · בחרי קטגוריה`:`${tot} פריטים · בחרי מה לראות`}</small></h3><button data-cl163x aria-label="סגירה">✕</button></div><div class="cl163b">
  ${kRow}
  <button class="cl163all" data-cl163all>${c0?`<span><i class="cl163dot" style="background:${SWc(c0)}"></i>${c0=='צבעוני'?'כל הצבעוניים':'הכל בצבע '+es(c0)}</span>`:'הכל, כל הארון'} <b>${tot}</b></button>
  ${tot?'':`<p class="cl163none">אין פריטים בצבע הזה עם הסינונים שבחרת</p>`}
  ${Object.keys(GN).filter(g=>by[g]).map(g=>`<div class="cl163g">${GN[g]}</div><div class="cl163t">${by[g].map(tile).join('')}</div>`).join('')}
  <div class="cl163x"><button data-cl163home>🏠 למסך הבית</button>${gen?`<button data-gen161open>🗃 רשימה כללית (${gen})</button>`:''}</div></div>`;
 if(!d.open){d.showModal();d.scrollTop=0;d.querySelector('.cl163b').scrollTop=0}}
window.openCloset163=open163;

function toGrid(sec){window.zCloset&&zCloset();const hdr=document.querySelector('.h9bar,#h9')||null;const off=(()=>{let m=0;document.querySelectorAll('header,.qbar,.stickyq,#q77').forEach(e=>{const cs=getComputedStyle(e);if(cs.position=='sticky'||cs.position=='fixed'){const r=e.getBoundingClientRect();if(r.top<=1&&r.bottom>m)m=r.bottom}});return m})();
 const el=sec||document.querySelector('.wrap #cnt')||document.querySelector('.grid');if(!el)return;const y=el.getBoundingClientRect().top+scrollY-Math.max(off,70)-8;
 try{LOCK=Date.now()+1200}catch(_){}document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,Math.max(0,y));setTimeout(()=>{document.documentElement.style.scrollBehavior='';const y2=el.getBoundingClientRect().top+scrollY-Math.max(off,70)-8;if(Math.abs(y2-scrollY)>40)window.scrollTo(0,Math.max(0,y2))},350)}
function pick(id,g){const q=document.getElementById('q');if(q&&q.value){q.value=''}
 G=id?(g||'clo'):'all';C=id||'';try{SC=''}catch(_){}
 document.querySelectorAll('.groups button').forEach(o=>o.setAttribute('aria-pressed',o.dataset.g==G));
 apply();const d=document.getElementById('cl163');if(d)d.close();
 setTimeout(()=>toGrid(id?document.getElementById(id):null),60)}

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-cl163],[data-cl163all],[data-cl163x],[data-cl163home],[data-cl163open],[data-cl163col]');if(!t)return;e.preventDefault();e.stopPropagation();const ds=t.dataset;
 try{if(ds.cl163open!==undefined)return open163();
 if(ds.cl163col!==undefined){if(window.COL184)COL184.set(ds.cl163col);open163();const r2=document.querySelector('#cl163 .cl163kr'),on=r2&&r2.querySelector('[aria-pressed=true]');if(on){const a=on.getBoundingClientRect(),b=r2.getBoundingClientRect();r2.scrollLeft+=(a.left+a.width/2)-(b.left+b.width/2)}else if(r2)r2.scrollLeft=0;return}
 if(ds.cl163x!==undefined)return document.getElementById('cl163').close();
 if(ds.cl163home!==undefined){document.getElementById('cl163').close();try{goTop()}catch(_){window.scrollTo({top:0})}return}
 if(ds.cl163all!==undefined)return pick('');
 pick(ds.cl163,ds.g)}catch(err){ERR('click',err)}},true);
// the bottom bar "הארון" opens it (instead of only scrolling up)
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.bnav [data-bn="home"]');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();try{document.querySelectorAll('dialog[open]').forEach(x=>{if(x.id!='cl163')try{x.close()}catch(_){}});open163()}catch(err){ERR('open',err)}},true);
})();
