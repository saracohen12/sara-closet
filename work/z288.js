// v288b (15:18): smaller, all of them in view (wrap to rows, two-word names one above the other), smaller 📌 ♡, and ↺ איפוס.
// v288: category buttons in the studio's top bar (Sara 28/10 15:12 "כפתורים קטנים… בלחיצת כפתור להגיע… קבוע על המסך… באותה שורה").
// The bar is already sticky. Small chips that scroll sideways sit between ✕ and the save buttons; a tap picks the category
// through the studio's own .r3cats buttons and jumps to the closet grid. On a phone the title and the long button words hide to make room.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v288 '+w+': '+(e&&e.message||e));
let dlg=null,row=null,KEY='',ON=new Set();
// v292 (Sara 15:43 "כל כפתור שבחרתי ממנו בגד… יהיה דלוק… איפה איפור ותסרוקות… לבחור בין פאה לכיסוי… תשים לי כפתורים למעלה"):
// a button whose kind she has on is lit, and three more buttons open the ✏ window right at the head, the hairstyles or the makeup
const XB=[['head','פאה /<br>כיסוי','פאה או כיסוי'],['hair','תסרוקות','תסרוקות'],['mk','איפור','איפור']];
function lit(){const o=new Set();try{const R=window.R360;if(!R||!R.st)return o;const s=R.st();
 (R.worn()||[]).forEach(id=>{const c=R.catOf(id);if(c)o.add(c)});if(o.size)o.add('ready');
 if(s.head)o.add('@head');if(s.head=='w'||/^yh/.test(s.head||''))o.add('@hair');if(s.mk)o.add('@mk')}catch(e){ERR('lit',e)}return o}
function edit(k){try{if(!window.Z291)return;Z291.show();const pan=dlg.querySelector('#z9');if(!pan)return;
 const s=window.R360&&R360.st&&R360.st(),wig=s&&(s.head=='w'||/^yh/.test(s.head||''));
 if(k=='hair'&&!wig){const w=pan.querySelector('.r3hd [data-h="w"]');if(w)w.click()}
 setTimeout(()=>{let t=null;
  if(k=='head')t=pan.querySelector('.r3hd');
  else{const want=k=='hair'?'💇':'💄';t=[...pan.querySelectorAll('.r3styr .r3lbl')].find(l=>l.textContent.includes(want));
   if(!t){const o=pan.querySelector(`.r3styr [data-styopen]`);if(o){if(k=='hair')o.dataset.styopen='hair';o.click();return}}}
  if(t){t.scrollIntoView({block:'start',behavior:'smooth'});t.classList.remove('z8fl');void t.offsetWidth;t.classList.add('z8fl')}},k=='hair'&&!wig?350:120)}catch(e){ERR('edit',e)}}
function paint(){if(!dlg||!row)return;try{ON=lit();
 const bs=[...dlg.querySelectorAll('.r3cats button[data-cat]')];
 const html=bs.map(b=>{const k=b.dataset.cat,c=b.cloneNode(true);c.querySelectorAll('small').forEach(x=>x.remove());const n=c.textContent.replace(/\s+/g,' ').trim().replace(/^✓(?=\S)/,'✓ ');
   const w=n.replace(/[&<>"]/g,'').replace(/^✓?\s*כבר על /,'על ').split(' '),lb=w.length<2?w[0]:w.length==2?w.join('<br>'):w.slice(0,2).join(' ')+'<br>'+w.slice(2).join(' ');
   return `<button type="button" data-z8="${k}" aria-label="${w.join(' ')}" aria-pressed="${b.getAttribute('aria-pressed')=='true'}"${ON.has(k)?' data-on="1"':''}>${lb}</button>`}).join('')
  +XB.map(([k,t,a])=>`<button type="button" class="z8x" data-z8x="${k}" aria-label="${a}"${ON.has('@'+k)?' data-on="1"':''}>${t}</button>`).join('');
 if(html!=KEY){KEY=html;row.innerHTML=html;const on=row.querySelector('[aria-pressed=true]');if(on){const b=on;{const p=b.parentElement,ar=b.getBoundingClientRect(),sr=p.getBoundingClientRect();p.scrollLeft+=(ar.left+ar.width/2)-(sr.left+sr.width/2)}}}}catch(e){ERR('paint',e)}}
function go(k){try{
 const tab=dlg.querySelector('.r3tabs [data-t="closet"]');if(tab&&tab.getAttribute('aria-selected')!='true')tab.click();
 const b=dlg.querySelector(`.r3cats [data-cat="${CSS.escape(k)}"]`);if(b)b.click();
 const pane=dlg.querySelector('.r3pane[data-p="closet"]');if(pane){pane.hidden=false;const t=pane;setTimeout(()=>t.scrollIntoView({block:'start'}),80)}
 setTimeout(paint,60)}catch(e){ERR('go',e)}}
function setup(d){dlg=d;const h=d.querySelector('.r3h');if(!h||h.querySelector('.z8c'))return;
 row=document.createElement('nav');row.className='z8c';row.setAttribute('aria-label','לקפוץ לסוג בגד');
 const tt=h.querySelector('.r3tt');(tt||h.firstChild).after(row);h.classList.add('z8h');
 row.addEventListener('click',e=>{const x=e.target.closest('[data-z8x]');if(x)return edit(x.dataset.z8x);const b=e.target.closest('[data-z8]');if(b)go(b.dataset.z8)});
 // v290 (Sara 15:24 "את הארון שלי ואת הלוקים שלי תעלה אותם למעלה, גם חיפוש… קטן"): the tabs and the search move up into the bar (same elements, same handlers)
 const tabs=d.querySelector('.r3tabs'),q=d.querySelector('.r3q');
 if(tabs){tabs.querySelectorAll('button[data-t]').forEach(b=>{const t=b.dataset.t=='closet'?'הארון שלי':'הלוקים שלי';b.setAttribute('aria-label',t);b.innerHTML=t.replace(' ','<br>')});h.appendChild(tabs)}
 if(q){q.placeholder='🔍 חיפוש';h.appendChild(q);q.addEventListener('input',()=>{const tab=dlg.querySelector('.r3tabs [data-t="closet"]');if(tab&&tab.getAttribute('aria-selected')!='true')tab.click();const g=dlg.querySelector('.r3pane[data-p="closet"]');if(g)setTimeout(()=>g.scrollIntoView({block:'start'}),60)})}
 const ha=h.querySelector('.r3ha');if(ha&&!ha.querySelector('.z8r')){const r=document.createElement('button');r.type='button';r.className='z8r';r.setAttribute('aria-label','איפוס – להוריד הכול מהאווטאר');r.title='איפוס';r.innerHTML='<i aria-hidden="true">🔄</i><span>איפוס</span>';r.onclick=()=>{try{if(window.R360&&R360.reset)R360.reset()}catch(e){ERR('reset',e)}};ha.prepend(r)}   // v288b
 const pin=h.querySelector('.r3pin'),sv=h.querySelector('.r3save');if(pin)pin.title='לשים את הלוק בדף הראשי';if(sv)sv.title='שמירת הלוק';
 const cats=d.querySelector('.r3cats');if(cats)new MutationObserver(()=>requestAnimationFrame(paint)).observe(cats,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-pressed']});
 setInterval(()=>{if(dlg&&dlg.open)paint()},800);   // what she has on changes from many places: check it lightly while the studio is open
 paint()}
const t=setInterval(()=>{const d=document.getElementById('r360');if(d&&d.querySelector('.r3h')){clearInterval(t);setup(d)}},700);
window.Z288={paint};
})();
