// v349 (Sara 4/11: "שיראה יותר דיגיטלי, שאני פחות כפתורים – אפתח כפתור, זה יראה לי כפתורים אחרים… יותר נגיש, יותר קל, יותר יפה")
// Progressive disclosure for the clean / 2100 look (html[data-d180=z50]):
//  • item window → ניהול: every row of small chips (מצב, סימון, אווטאר, סגנון, עונה, הגיע?) becomes ONE line "label · current value ›";
//    a tap opens that row's buttons (big, 40px), a second tap or choosing closes it. Nothing is removed – the same buttons, only folded.
// Works on whatever the item window re-renders (MutationObserver), never touches the data.
(function(){
const H=document.documentElement,ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v349 '+w+': '+(e&&e.message||e));
const on=()=>H.dataset.d180=='z50';
const val=r=>{const b=[...r.querySelectorAll(':scope>button[aria-pressed=true]:not(.x349s)')];const t=b.map(x=>[...x.childNodes].map(n=>n.textContent.trim()).filter(Boolean).join(' ')).filter(Boolean);return t.length?t.join(' · '):'לא נבחר'};
// v355: the site re-draws a row after every choice – which rows are open is kept by their label, so a re-drawn row stays as she left it
const OPEN=new Set();const labOf=r=>((r.querySelector(':scope>span')||{}).textContent||'').trim();
function fold(r){if(r.querySelector(':scope>.x349s')){paint(r);return}r.classList.add('x349');   // a row the site re-filled (innerHTML) gets its line again
 const lab=r.querySelector(':scope>span');const s=document.createElement('button');s.type='button';s.className='x349s';s.setAttribute('aria-expanded','false');
 s.innerHTML='<span class="x349v"></span><i aria-hidden="true">›</i>';
 if(lab){s.setAttribute('aria-label',lab.textContent.trim()+' – לפתוח');lab.after(s)}else r.prepend(s);
 s.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const o=!r.classList.contains('open');
  r.parentElement&&r.parentElement.querySelectorAll('.x349.open').forEach(x=>{if(x!==r){x.classList.remove('open');const q=x.querySelector('.x349s');q&&q.setAttribute('aria-expanded','false')}});
  r.classList.toggle('open',o);s.setAttribute('aria-expanded',String(o));const lb=labOf(r);OPEN.clear();if(o)OPEN.add(lb)});
 // after choosing: show the new value (the site may re-render the row – then fold() runs again on the new one)
 if(!r._x349)r.addEventListener('click',e=>{if(e.target.closest('.x349s'))return;if(e.target.closest('button')){const lb=labOf(r),multi=r.matches('.multi349');if(!multi)OPEN.delete(lb);
  setTimeout(()=>{document.querySelectorAll('#dlg .ed .erow.x349').forEach(x=>{if(labOf(x)==lb){paint(x);if(multi){x.classList.add('open');const q=x.querySelector('.x349s');q&&q.setAttribute('aria-expanded','true')}else close(x)}})},380)}});
 // rows where several can be on together (סימון, סגנון, עונה) stay open until she closes them
 r._x349=1;const lt=lab?lab.textContent.trim():'';if(/סימון|סגנון|עונה/.test(lt))r.classList.add('multi349');if(OPEN.has(lt)){r.classList.add('open');s.setAttribute('aria-expanded','true')}
 paint(r)}
function close(r){r.classList.remove('open');const s=r.querySelector('.x349s');s&&s.setAttribute('aria-expanded','false')}
function paint(r){const v=r.querySelector('.x349v');if(v){const t=val(r);if(v.textContent!=t)v.textContent=t;v.classList.toggle('none',t=='לא נבחר')}}
// the 4 small buttons of the details box (העתקה, כפולים, לכללית, יצא משימוש) wait behind one "⋯"
function minis(h){if(h.querySelector(':scope>.m349'))return;const bs=h.querySelectorAll(':scope>button.mini');if(bs.length<2)return;h.classList.add('f349');
 const b=document.createElement('button');b.type='button';b.className='m349';b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','עוד פעולות לפריט');b.textContent='⋯';
 h.append(b);b.addEventListener('click',e=>{e.stopPropagation();const o=!h.classList.contains('open');h.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o))})}
function scan(root){if(!on())return;try{(root||document).querySelectorAll('#dlg .ed .erow.fit1, #dlg .ed .erow:has(> button[data-k^="got:"])').forEach(fold);(root||document).querySelectorAll('#dlg .pd85h').forEach(minis)}catch(e){ERR('scan',e)}}
let q=0;const mo=new MutationObserver(()=>{if(!q)q=requestAnimationFrame(()=>{q=0;const d=document.getElementById('dlg');if(d&&d.open)scan(d)})});
const start=()=>{const d=document.getElementById('dlg');if(!d){setTimeout(start,800);return}mo.observe(d,{childList:true,subtree:true});scan(d)};start();
window.UX349={scan};
})();

// ---------- studio (v349) ----------
// 1) the top bar keeps only ✕, הארון/הלוקים, חיפוש and ♡ שמירה; "📌 לדף הבית" and "🔄 איפוס" move into one "⋯" menu (same buttons, same actions)
// 2) on a phone, once the big avatar scrolls away while she picks clothes, a small live copy of the avatar floats in the corner – she always sees
//    what she is wearing; a tap brings the big one back
(function(){
const H=document.documentElement,ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v349s '+w+': '+(e&&e.message||e));
function menu(){try{const d=document.getElementById('r360');if(!d||H.dataset.d180!='z50')return;const ha=d.querySelector('.r3h .r3ha');if(!ha||ha.querySelector('.s349m'))return;
 const pin=ha.querySelector('.r3pin'),rs=ha.querySelector('.z8r');if(!pin&&!rs)return;
 const w=document.createElement('div');w.className='s349w';w.innerHTML='<button type="button" class="s349b" aria-haspopup="true" aria-expanded="false" aria-label="עוד פעולות">⋯</button><div class="s349m" role="menu" hidden></div>';
 ha.prepend(w);const m=w.querySelector('.s349m'),b=w.querySelector('.s349b');[pin,rs].forEach(x=>{if(x){x.setAttribute('role','menuitem');m.append(x)}});
 const set=o=>{m.hidden=!o;b.setAttribute('aria-expanded',String(o))};
 b.addEventListener('click',e=>{e.stopPropagation();set(m.hidden)});m.addEventListener('click',()=>setTimeout(()=>set(false),60));
 document.addEventListener('click',e=>{if(!w.contains(e.target))set(false)});d.addEventListener('keydown',e=>{if(e.key=='Escape'&&!m.hidden){set(false);b.focus();e.stopPropagation()}},true)}catch(e){ERR('menu',e)}}
let mini=null,io=null,tm=null;
function float(){try{const d=document.getElementById('r360');if(!d||mini&&d.contains(mini))return;const fig=d.querySelector('.r3fig');if(!fig)return;
 mini=document.createElement('button');mini.type='button';mini.className='s349f';mini.setAttribute('aria-label','לחזור לאווטאר הגדול');mini.hidden=true;
 const c=document.createElement('canvas');c.width=180;c.height=320;mini.append(c);d.append(mini);
 mini.addEventListener('click',()=>{fig.scrollIntoView({behavior:'smooth',block:'start'})});
 const draw=()=>{const src=fig.querySelector('canvas.on');if(!src||mini.hidden)return;const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);
  const r=Math.min(c.width/src.width,c.height/src.height),w=src.width*r,h=src.height*r;try{g.drawImage(src,(c.width-w)/2,(c.height-h)/2,w,h)}catch(_){}};
 io=new IntersectionObserver(es=>{const vis=es[0].isIntersecting;const want=!vis&&matchMedia('(max-width:899px)').matches;mini.hidden=!want;if(want){draw();clearInterval(tm);tm=setInterval(()=>{if(!d.open){clearInterval(tm);return}draw()},600)}else clearInterval(tm)},{threshold:.15});
 io.observe(fig)}catch(e){ERR('float',e)}}
const tick=()=>{const d=document.getElementById('r360');if(d&&d.open){menu();float()}};
setInterval(tick,700);
})();

// ---------- closet shortcuts (v349): 3 shortcuts + "עוד ▾" instead of 8 tiles in two rows; an active shortcut always stays visible ----------
(function(){
const H=document.documentElement;
function fold(){try{if(H.dataset.d180!='z50')return;document.querySelectorAll('.z6q').forEach(g=>{if(g.querySelector(':scope>.q349'))return;const bs=[...g.querySelectorAll(':scope>button')];if(bs.length<5)return;
 g.classList.add('f349');const t=document.createElement('button');t.type='button';t.className='q349';t.setAttribute('aria-expanded','false');
 const lab=o=>`<i aria-hidden="true">${o?'▴':'▾'}</i><span>${o?'פחות':'עוד '+(bs.length-3)}</span>`;t.innerHTML=lab(false);
 bs[2].after(t);t.addEventListener('click',()=>{const o=!g.classList.contains('open');g.classList.toggle('open',o);t.setAttribute('aria-expanded',String(o));t.innerHTML=lab(o)})})}catch(_){}}
setInterval(fold,900);fold();
})();

// ---------- orders window (v349): status numbers in one swipe row; the 3 photo/receipt cards behind "📷 לצלם / הזמנה חדשה"; the photo/avatar filters behind "סינון נוסף" ----------
(function(){
const H=document.documentElement;let camOpen=false,pfOpen=false;
function apply(){try{const d=document.getElementById('ord123');if(!d||!d.open||H.dataset.d180!='z50')return;const b=d.querySelector('.o3b');if(!b)return;
 const cams=[...b.querySelectorAll(':scope>.o3cam')];
 if(cams.length&&!b.querySelector(':scope>.c349')){const t=document.createElement('button');t.type='button';t.className='c349';cams[0].before(t);
  t.addEventListener('click',()=>{camOpen=!camOpen;apply()})}
 const t=b.querySelector(':scope>.c349');if(t){t.setAttribute('aria-expanded',String(camOpen));t.innerHTML=`<i aria-hidden="true">📷</i><span><b>לצלם מוצר · חבילה · הזמנה חדשה</b><small>${camOpen?'לסגור':'3 דרכים להוסיף'}</small></span><em aria-hidden="true">${camOpen?'▴':'▾'}</em>`;cams.forEach(c=>c.classList.toggle('h349',!camOpen))}
 const pfs=[...b.querySelectorAll(':scope>.o3pf')];
 if(pfs.length&&!b.querySelector(':scope>.p349')){const f=document.createElement('button');f.type='button';f.className='p349';pfs[0].before(f);f.addEventListener('click',()=>{pfOpen=!pfOpen;apply()})}
 const f=b.querySelector(':scope>.p349');if(f){const act=pfs.some(x=>[...x.querySelectorAll('button[aria-pressed=true]')].some(y=>!/^\s*הכל/.test(y.textContent)));const o=pfOpen||act;
  f.setAttribute('aria-expanded',String(o));f.innerHTML=`<span>סינון נוסף: תמונות ואווטאר${act?' · פעיל':''}</span><em aria-hidden="true">${o?'▴':'▾'}</em>`;pfs.forEach(x=>x.classList.toggle('h349',!o))}
 const s=b.querySelector(':scope>.o3sum');if(s)s.classList.add('s349')}catch(_){}}
setInterval(apply,500);
})();
// v350: the dressing room needs the real height of the studio's top bar (it wraps to 2–3 lines on a phone)
setInterval(()=>{try{const d=document.getElementById('r360');if(!d||!d.open)return;const h=d.querySelector('.r3h');if(h){const v=Math.round(h.getBoundingClientRect().height)+'px';if(d.style.getPropertyValue('--r3hh')!=v)d.style.setProperty('--r3hh',v)}}catch(_){}},500);
