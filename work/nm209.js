// v210 (Sara 26/10 14:19 "בשם מופיע לי קשקושים, אז תן לי אפשרות ... לתקן את השם, את הכביכול עיפרון ואני יכולה לתקן"):
// ✏️ next to the name in the item window. Her name is saved as IT[id].nm and shown everywhere the name shows (window, cards, search, studio).
(()=>{
const css=`#dlbody h3 .nm209b{display:inline-grid;place-items:center;width:40px;height:40px;margin-inline-start:6px;vertical-align:middle;border-radius:50%;border:1px solid var(--z-line,var(--line,#ddd));background:var(--z-solid,var(--card,#fff));color:inherit;font-size:1rem;line-height:1;cursor:pointer}
#dlbody .nm209f{display:grid;gap:8px;margin:0 0 10px}
#dlbody .nm209f label{font-size:.85rem;font-weight:600}
#dlbody .nm209f input{width:100%;box-sizing:border-box;font:inherit;font-size:16px!important;min-height:46px;padding:0 14px;border-radius:12px!important;border:1px solid var(--z-line,var(--line,#ddd))!important;background:var(--z-solid,#fff)!important;color:var(--z-ink,#2a1d17)!important}
#dlbody .nm209a{display:flex;gap:8px;flex-wrap:wrap}
#dlbody .nm209a button{font:inherit;font-size:.9rem;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--z-line,var(--line,#ddd));background:var(--z-solid,#fff);color:var(--z-ink,#2a1d17);cursor:pointer}
#dlbody .nm209a button.on{background:var(--z-acc,#b4532c);border-color:var(--z-acc,#b4532c);color:var(--z-acc-ink,#fff);font-weight:600}
#dlbody .nm209f small{color:var(--z-muted,#777);font-size:.8rem;overflow-wrap:anywhere}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const S0={};   // the names from the receipts
const orig=id=>id in S0?S0[id]:(D[id]||{}).short||'';
const mine=id=>(((IT[id]||{}).nm)||'').trim();
function setName(id){const x=D[id];if(!x)return;if(!(id in S0))S0[id]=x.short;const nm=mine(id),want=nm||S0[id];x.short=want;
 document.querySelectorAll(`.card[data-id="${id}"]`).forEach(c=>{const t=c.querySelector('.t');if(t&&t.textContent!=want)t.textContent=want;
  if(c.dataset.q0==null)c.dataset.q0=c.dataset.q||'';const q=c.dataset.q0+(nm?' '+nm:'');if(c.dataset.q!=q){c.dataset.q=q;delete c.dataset.qn}})}
const need=id=>!!D[id]&&(!!mine(id)||(id in S0&&D[id].short!=S0[id]));
function applyNames(){Object.keys(IT).concat(Object.keys(S0)).forEach(id=>{if(need(id))setName(id)})}
// every repaint of an item (her db snapshot, undo, another device) brings her name along
{const _p=paint;paint=function(id){try{if(need(id))setName(id)}catch(e){(window.ERRS=window.ERRS||[]).push('nm209 '+e.message)}return _p.apply(this,arguments)}}
// its own message (with undo) instead of the generic "נשמר: nm"
{const _bp=beforePut;beforePut=function(id,patch){const k=patch&&Object.keys(patch);if(k&&k.length==1&&k[0]=='nm')return;return _bp.apply(this,arguments)}}
try{applyNames()}catch(_){}
function pencil(id){const h3=document.querySelector('#dlbody h3');if(!h3||h3.querySelector('.nm209b'))return;
 const b=document.createElement('button');b.type='button';b.className='nm209b';b.dataset.nm209=id;b.setAttribute('aria-label','לתקן את השם');b.title='לתקן את השם';b.textContent='✏️';h3.appendChild(b);
 if(mine(id)){const f=document.querySelector('#dlbody p.full');if(f)f.remove()}}   // her name replaces the receipt text
function form(id){const h3=document.querySelector('#dlbody h3');if(!h3)return;const nm=mine(id)||D[id].short;
 const f=document.createElement('div');f.className='nm209f';f.dataset.id=id;
 f.innerHTML=`<label for="nm209i">השם של הפריט</label><input id="nm209i" maxlength="80" autocomplete="off" enterkeyhint="done" value="${esc(nm)}">
  <div class="nm209a"><button type="button" class="on" data-nm209s="save">✓ לשמור</button><button type="button" data-nm209s="cancel">ביטול</button>${mine(id)?'<button type="button" data-nm209s="orig">↩ השם מהקבלה</button>':''}</div>
  <small>השם מהקבלה: ${esc(orig(id))}</small>`;
 h3.hidden=true;const fu=document.querySelector('#dlbody p.full');if(fu)fu.hidden=true;h3.after(f);const i=f.querySelector('input');i.focus();try{i.select()}catch(_){}}
function close(id,refresh){const f=document.querySelector('#dlbody .nm209f');if(f)f.remove();const h3=document.querySelector('#dlbody h3');if(!h3)return;
 if(refresh){[...h3.childNodes].forEach(n=>{if(n.nodeType==3)n.remove()});h3.prepend(document.createTextNode(D[id].short));const h4=document.querySelector('#dlg .dhead h4');if(h4)h4.textContent=D[id].short;if(mine(id)){const fu=document.querySelector('#dlbody p.full');if(fu)fu.remove()}}
 h3.hidden=false;const fu=document.querySelector('#dlbody p.full');if(fu)fu.hidden=false;const b=h3.querySelector('.nm209b');if(b)b.focus()}
async function save(id,v,undo){v=(v||'').replace(/\s+/g,' ').trim();if(v==orig(id))v='';const prev=mine(id);
 await putItem(id,{nm:v});setName(id);
 if(document.querySelector('#dlbody .nm209f'))close(id,true);else if(document.querySelector('#dlg').open&&CUR==id)openItem(id);
 toast(v?'✓ השם נשמר':'✓ חזר השם מהקבלה',undo?null:()=>save(id,prev,true))}
{const _ao=window.afterOpen;window.afterOpen=function(id){try{if(_ao)_ao.apply(this,arguments)}catch(_){}try{pencil(id)}catch(e){(window.ERRS=window.ERRS||[]).push('nm209 '+e.message)}}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-nm209],[data-nm209s]');if(!b||!b.closest('#dlbody'))return;e.preventDefault();e.stopPropagation();
 if(b.dataset.nm209)return form(b.dataset.nm209);const f=b.closest('.nm209f'),id=f.dataset.id;
 if(b.dataset.nm209s=='save')return save(id,f.querySelector('input').value);if(b.dataset.nm209s=='orig')return save(id,'');close(id)},true);
document.addEventListener('keydown',e=>{if(e.target.id!='nm209i')return;const id=e.target.closest('.nm209f').dataset.id;
 if(e.key=='Enter'){e.preventDefault();save(id,e.target.value)}else if(e.key=='Escape'){e.preventDefault();e.stopPropagation();close(id)}else if(/^Arrow/.test(e.key))e.stopPropagation()},true);   // arrows move the cursor, not to the next item
window.NM209={applyNames,orig};
})();
