// ===== v161: "🗃 הרשימה הכללית" (Sara 24/10: clothes she doesn't want in the closet, e.g. event dresses)
// an item moved there (IT[id].gen = time) disappears from the closet, search, the avatar lists, the studio, looks, insights and orders,
// and shows only in its own list, from which it can go back to the closet.
// how: like the set pieces (fix85), the item is made non-enumerable on D, so every Object.keys(D) list skips it while D[id] still works
function gen161(id){return !!(typeof IT=='object'&&IT&&(IT[id]||{}).gen)}
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v161 '+w+': '+(e&&e.message||e));
const st=document.createElement('style');st.textContent=`
.gen161b{background:#f1ece6!important;border-color:#d9cfc3!important}
.gen161ban{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;margin:10px 0;padding:10px 14px;border-radius:14px;background:#f1ece6;border:1px solid #d9cfc3;font-size:.92rem}
.gen161ban button{font:inherit;padding:7px 14px;border-radius:999px;border:1px solid var(--line);background:#fff;cursor:pointer}
.gen161body{padding:4px 16px 20px;display:flex;flex-direction:column;gap:10px}
.gen161body>p{margin:0;color:var(--muted);font-size:.85rem}
#gen161q{font:inherit;padding:10px 14px;border-radius:999px;border:1px solid var(--line);background:#fff}
.gen161l{display:flex;flex-direction:column;gap:6px}
.gen161r{display:flex;gap:10px;align-items:center;padding:6px;border-radius:14px;border:1px solid var(--line);background:#fff}
.gen161r>button.o{display:flex;gap:10px;align-items:center;flex:1;min-width:0;font:inherit;border:0;background:none;padding:0;cursor:pointer;text-align:start}
.gen161r img{width:46px;height:60px;object-fit:cover;border-radius:8px;flex:none}
.gen161r span{display:flex;flex-direction:column;min-width:0}.gen161r small{color:var(--muted);font-size:.76rem}
.gen161r>button.bk{flex:none;font:inherit;font-size:.82rem;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:#fbf3e8;cursor:pointer}
.gen161link{display:block;margin:18px auto 8px;font:inherit;font-size:.85rem;padding:8px 16px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--muted);cursor:pointer}`;
document.head.appendChild(st);

const ids=()=>Object.keys(IT||{}).filter(id=>gen161(id)&&Object.prototype.hasOwnProperty.call(D,id));
// hide / show on D
let SIG=null;
function sync(force){try{if(typeof IT!='object'||!IT)return;const g=ids();const sig=g.sort().join('|');if(sig===SIG&&!force)return;const was=new Set((SIG||'').split('|').filter(Boolean));SIG=sig;const now=new Set(g);
 for(const id of now)if(Object.getOwnPropertyDescriptor(D,id).enumerable)Object.defineProperty(D,id,{enumerable:false});
 for(const id of was)if(!now.has(id)&&D[id]&&!Object.getOwnPropertyDescriptor(D,id).enumerable){Object.defineProperty(D,id,{enumerable:true});try{paint(id)}catch(_){}}
 try{RECENT=RECENT.filter(id=>!gen161(id));recent()}catch(_){}
 try{apply()}catch(_){}try{if(typeof rebuildCats=='function')rebuildCats()}catch(_){}
 link();const d=document.getElementById('gen161');if(d&&d.open)openGen161(d.dataset.q||'')}catch(e){ERR('sync',e)}}
window.sync161=sync;
setInterval(()=>sync(),1500);setTimeout(()=>sync(),200);

// the closet grid and search skip them (their cards stay in the page, hidden)
{const _ex=extra;extra=function(c){if(gen161(c.dataset.id))return false;return _ex.apply(this,arguments)}}
// pieces of a set that was moved are not offered in the studio either
if(typeof drawerItems=='function'){const _di=drawerItems;drawerItems=function(){const r=_di.apply(this,arguments);try{return r.filter(s=>!gen161(s)&&!gen161((D[s]||{}).part))}catch(_){return r}};window.drawerItems=drawerItems}
// a change that moves an item hides / shows it right away
{const _p=putItem;putItem=function(id,patch){const r=_p.apply(this,arguments);if(patch&&'gen' in patch)Promise.resolve(r).then(()=>sync(true),()=>sync(true));return r}}

// its own message (with undo) instead of the generic "נשמר: gen"
{const _bp=beforePut;beforePut=function(id,patch){if(patch&&Object.keys(patch).length==1&&'gen' in patch)return;return _bp.apply(this,arguments)}}
async function move(id,on){await putItem(id,{gen:on?Date.now():''});sync(true)}
window.moveGen161=move;

// item window: button next to "פרטי המוצר", and a note at the top when the item is in the list
function btn(id){const d=document.getElementById('dlg');if(!d||!d.open||!D[id]||(D[id]||{}).part)return;
 d.querySelectorAll('[data-gen161],.gen161ban').forEach(x=>x.remove());const g=gen161(id);
 const h=d.querySelector('.pd85h');const host=h||d.querySelector('h3');
 if(host)host.insertAdjacentHTML(h?'beforeend':'afterend',`<button type="button" class="mini gen161b" data-gen161="${id}" data-on="${g?0:1}">${g?'↩ להחזיר לארון':'🗃 לרשימה הכללית'}</button>`);
 if(g){const t=d.querySelector('h2')||d.querySelector('h3');const ban=`<div class="gen161ban"><span>🗃 המוצר הזה ברשימה הכללית, ולא מופיע בארון</span><button type="button" data-gen161="${id}" data-on="0">↩ להחזיר לארון</button></div>`;
  const top=d.querySelector('.o3dl')||t;if(top)top.insertAdjacentHTML('afterend',ban)}}
{const _oi=openItem;openItem=function(id){const r=_oi.apply(this,arguments);Promise.resolve(r).then(()=>setTimeout(()=>{try{btn(id)}catch(e){ERR('btn',e)}},320));return r};window.openItem=openItem}

window.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-gen161],[data-gen161open],[data-gen161x],[data-gen161item]');if(!t)return;e.preventDefault();e.stopPropagation();const ds=t.dataset;
 try{
 if(ds.gen161open!==undefined){document.querySelectorAll('dialog[open]').forEach(x=>{if(x.id!='gen161')try{x.close()}catch(_){}});return openGen161()}
 if(ds.gen161x!==undefined){const d=document.getElementById('gen161');return d&&d.close()}
 if(ds.gen161item)return openItem(ds.gen161item);
 const id=ds.gen161,on=ds.on=='1';const nm=((D[id]||{}).short||'').slice(0,30);
 await move(id,on);
 const dl=document.getElementById('dlg');
 if(on){if(dl&&dl.open&&CUR==id)dl.close();toast(`🗃 "${nm}" עבר לרשימה הכללית`,()=>move(id,false))}
 else{if(dl&&dl.open&&CUR==id)btn(id);toast(`↩ "${nm}" חזר לארון`,()=>move(id,true))}
 }catch(err){ERR('click',err);toast('לא הצלחתי להעביר. נסי שוב')}},true);

// the list itself
const esc_=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openGen161(q){let d=document.getElementById('gen161');if(!d){d=document.createElement('dialog');d.id='gen161';d.className='sheet9';d.dir='rtl';document.body.appendChild(d)}
 q=(q||'').trim();d.dataset.q=q;const all=ids().sort((a,b)=>(IT[b].gen||0)-(IT[a].gen||0));const w=q.toLowerCase().split(/\s+/).filter(Boolean);
 const L=all.filter(id=>{const x=D[id];const s=[x.short,x.full,x.color,x.size,x.srcl,id].join(' ').toLowerCase();return w.every(k=>s.includes(k))});
 const row=id=>{const x=D[id];let im='';try{im=img(id)}catch(_){}return `<div class="gen161r"><button class="o" data-gen161item="${id}"><img src="${im||TPH}" alt="" loading="lazy"><span><b>${esc_((x.short||'').slice(0,46))}</b><small>${esc_([x.color,x.size,(x.srcl||'').split(' (')[0],x.date].filter(Boolean).join(' · '))}</small></span></button><button class="bk" data-gen161="${id}" data-on="0">↩ לארון</button></div>`};
 d.innerHTML=`<div class="sh9h"><h3>🗃 הרשימה הכללית (${all.length})</h3><button class="x" data-gen161x aria-label="סגירה">✕</button></div><div class="gen161body">
  <p>מוצרים שהוצאת מהארון. הם לא מופיעים בארון, באווטאר, בסטודיו, בלוקים ובהזמנות. לחיצה על מוצר פותחת אותו, ו"↩ לארון" מחזיר אותו.</p>
  ${all.length>6?`<input type="search" id="gen161q" placeholder="חיפוש ברשימה" value="${esc_(q)}">`:''}
  <div class="gen161l">${L.map(row).join('')||(all.length?'<p>לא נמצאו מוצרים</p>':'<p>עוד אין כאן מוצרים. כדי להעביר מוצר: פותחים אותו, ובכרטיס "פרטי המוצר" לוחצים "🗃 לרשימה הכללית". אפשר גם כמה ביחד: "☑ בחירה" מעל הארון.</p>')}</div></div>`;
 if(!d.open)d.showModal();const inp=d.querySelector('#gen161q');if(inp){let tm;inp.addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(()=>{openGen161(inp.value);const i2=document.getElementById('gen161q');if(i2){i2.focus();i2.setSelectionRange(i2.value.length,i2.value.length)}},350)})}}
window.openGen161=openGen161;

// ways in: the "⋯" menu, and a quiet link under the closet (only when the list has items)
function link(){try{const n=ids().length;
 const e7=document.querySelector('#more9 .e77');if(e7){let b=e7.querySelector('[data-gen161open]');if(!b){e7.insertAdjacentHTML('beforeend','<button data-gen161open></button>');b=e7.querySelector('[data-gen161open]')}b.textContent=`🗃 רשימה כללית (${n})`}
 // v162: a visible chip above the closet, next to "☑ בחירה" / "▦ קיר" / "👯 כפולים" (Sara couldn't find the list)
 const r=document.querySelector('#q77 .t83');if(r){let t=r.querySelector('.gen161t');if(!t){r.insertAdjacentHTML('beforeend','<button type="button" class="gen161t" data-gen161open>🗃 רשימה כללית <b></b></button>');t=r.querySelector('.gen161t')}t.querySelector('b').textContent=n;t.hidden=!n}
 let l=document.querySelector('.gen161link');const g=document.querySelector('#empty');
 if(!l&&g){g.insertAdjacentHTML('afterend','<button type="button" class="gen161link" data-gen161open></button>');l=document.querySelector('.gen161link')}
 if(l){l.textContent=`🗃 ${n} מוצרים ברשימה הכללית`;l.hidden=!n}}catch(e){ERR('link',e)}}
setInterval(link,2000);setTimeout(link,600);setTimeout(link,1500);
})();
