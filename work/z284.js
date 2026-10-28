// v288: after "✕ להוריד" a "↩ להחזיר" button puts the item back (Sara 28/10 15:08 "בטעות הורדתי").
// v284 redesign, screen 3 – the studio's edit buttons (Sara 28/10 10:19 "לבדוק איך אתה מוסיף לי כפתורים בעריכה… של הבגד, של החולצה בתוך החצאית").
// The tuck / under-the-dress / hair-behind checkboxes were inside folded headings that start closed, so she could not find them.
// Now one always-open block "✏ לסדר את הלוק" sits right under the avatar: big on/off buttons for what can be changed now,
// and every item she is wearing with "✨ לתקן" (fix in GPT) and "✕ להוריד". The buttons drive the studio's own controls, nothing is done twice.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v284 '+w+': '+(e&&e.message||e));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const P=[['tk','.r3tk','👚','החולצה בתוך החצאית'],['un','.r3un','👗','החולצה מתחת לשמלה'],['wb','.r3wb','💇‍♀️','השיער מאחורי הכתפיים']];
const HEADS=new Set(['w','yh','yt','ym']);
const hasA8=id=>{const it=(typeof IT=='object'&&IT&&IT[id])||{};return (it.a8||[]).some(p=>p&&Array.isArray(p.L)&&p.L.length==8&&p.src)};
let dlg=null,box=null,KEY='';
function paint(){if(!dlg||!box)return;try{
 const pills=P.map(([k,sel,i,n])=>{const l=dlg.querySelector(sel);if(!l||l.hidden)return '';const on=!!(l.querySelector('input')||{}).checked;
   return `<button type="button" class="z7t" data-z7="${k}" aria-pressed="${on}"><i aria-hidden="true">${i}</i><span>${n}</span><b aria-hidden="true">${on?'כן':'לא'}</b></button>`});
 const jy=dlg.querySelector('.r3jyb');if(jy&&!jy.hidden)pills.push(`<button type="button" class="z7t z7a" data-z7="jy"><i aria-hidden="true">📿</i><span>גובה התכשיט</span></button>`);
 const chips=[...dlg.querySelectorAll('.r3worn .r3wc[data-off]')];
 const items=chips.map(c=>{const id=c.dataset.off,im=c.querySelector('img'),src=im&&im.getAttribute('src')||'',n=((c.querySelector('span')||{}).textContent||'').trim();
   return `<li><img alt="" src="${esc(src)}"><span>${esc(n)}</span><div>${!HEADS.has(id)&&hasA8(id)?`<button type="button" data-fix237="${esc(id)}" aria-label="לתקן ב-GPT: ${esc(n)}">✨ לתקן</button>`:''}<button type="button" data-z7off="${esc(id)}" aria-label="להוריד: ${esc(n)}">✕ להוריד</button></div></li>`});
 const ub=dlg.querySelector('.r3worn .r3undo'),un=ub?((ub.querySelector('span')||{}).textContent||'').replace(/^להחזיר:\s*/,''):'';   // v288: undo for an item taken off by mistake
 const html=`<div class="z7h"><h3>✏ לסדר את הלוק</h3><span class="z7hb"><button type="button" class="z7tell" data-z7="reset">🔄 לאפס הכול</button><button type="button" class="z7tell" data-z7="tell">💬 משהו לא יושב טוב?</button></span></div>
  ${pills.join('')?`<div class="z7p">${pills.join('')}</div>`:'<p class="z7n">כשלובשים חולצה עם חצאית, או חולצה עם שמלה, יופיעו כאן כפתורים להכניס אותה פנימה.</p>'}
  ${ub?`<button type="button" class="z7u" data-z7="undo"><i aria-hidden="true">↩</i><span>הורדת בטעות? להחזיר את <b>${esc(un)}</b></span></button>`:''}
  ${items.length?`<p class="z7s">מה שעלייך עכשיו (${items.length})</p><ul class="z7i">${items.join('')}</ul>`:''}`;
 if(html!=KEY){KEY=html;box.innerHTML=html}}catch(e){ERR('paint',e)}}
function setup(d){dlg=d;const side=d.querySelector('.r3side');if(!side)return;
 box=document.createElement('section');box.id='z7';box.setAttribute('aria-label','לסדר את הלוק');side.prepend(box);
 box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;try{
  const k=b.dataset.z7;
  if(k=='tell'){if(window.openTell282)openTell282();return}
  if(k=='reset'){if(window.R360&&R360.reset)R360.reset();setTimeout(paint,80);return}
  if(k=='undo'){const u=dlg.querySelector('.r3worn .r3undo');if(u)u.click();setTimeout(paint,60);return}
  if(k=='jy'){const j=dlg.querySelector('.r3jyb');if(j){j.click();j.scrollIntoView({block:'nearest'})}return}
  const p=P.find(x=>x[0]==k);if(p){const i=dlg.querySelector(p[1]+' input');if(i){i.checked=!i.checked;i.dispatchEvent(new Event('change',{bubbles:true}))}setTimeout(paint,60);return}
  if(b.dataset.z7off!=null){const c=dlg.querySelector(`.r3worn [data-off="${CSS.escape(b.dataset.z7off)}"]`);if(c)c.click();setTimeout(paint,60)}}catch(er){ERR('click',er)}});
 let q=0;const mo=new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;paint()})});
 mo.observe(side,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','src']});const jy=d.querySelector('.r3jyb');if(jy)mo.observe(jy,{attributes:true,attributeFilter:['hidden']});
 d.addEventListener('change',()=>setTimeout(paint,40));paint()}
const t=setInterval(()=>{const d=document.getElementById('r360');if(d&&d.querySelector('.r3side')){clearInterval(t);setup(d)}},700);
window.Z284={paint};
})();
