// v288: category buttons in the studio's top bar (Sara 28/10 15:12 "כפתורים קטנים… בלחיצת כפתור להגיע… קבוע על המסך… באותה שורה").
// The bar is already sticky. Small chips that scroll sideways sit between ✕ and the save buttons; a tap picks the category
// through the studio's own .r3cats buttons and jumps to the closet grid. On a phone the title and the long button words hide to make room.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v288 '+w+': '+(e&&e.message||e));
let dlg=null,row=null,KEY='';
function paint(){if(!dlg||!row)return;try{
 const bs=[...dlg.querySelectorAll('.r3cats button[data-cat]')];
 const html=bs.map(b=>{const k=b.dataset.cat,c=b.cloneNode(true);c.querySelectorAll('small').forEach(x=>x.remove());const n=c.textContent.replace(/\s+/g,' ').trim().replace(/^✓(?=\S)/,'✓ ');
   return `<button type="button" data-z8="${k}" aria-pressed="${b.getAttribute('aria-pressed')=='true'}">${n.replace(/[&<>"]/g,'')}</button>`}).join('');
 if(html!=KEY){KEY=html;row.innerHTML=html;const on=row.querySelector('[aria-pressed=true]');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest',inline:'nearest'})}}catch(e){ERR('paint',e)}}
function go(k){try{
 const tab=dlg.querySelector('.r3tabs [data-t="closet"]');if(tab&&tab.getAttribute('aria-selected')!='true')tab.click();
 const b=dlg.querySelector(`.r3cats [data-cat="${CSS.escape(k)}"]`);if(b)b.click();
 const pane=dlg.querySelector('.r3pane[data-p="closet"]');if(pane){pane.hidden=false;const t=pane.querySelector('.r3cats')||pane;setTimeout(()=>t.scrollIntoView({block:'start'}),80)}
 setTimeout(paint,60)}catch(e){ERR('go',e)}}
function setup(d){dlg=d;const h=d.querySelector('.r3h');if(!h||h.querySelector('.z8c'))return;
 row=document.createElement('nav');row.className='z8c';row.setAttribute('aria-label','לקפוץ לסוג בגד');
 const tt=h.querySelector('.r3tt');(tt||h.firstChild).after(row);h.classList.add('z8h');
 row.addEventListener('click',e=>{const b=e.target.closest('[data-z8]');if(b)go(b.dataset.z8)});
 const pin=h.querySelector('.r3pin'),sv=h.querySelector('.r3save');if(pin)pin.title='לשים את הלוק בדף הראשי';if(sv)sv.title='שמירת הלוק';
 const cats=d.querySelector('.r3cats');if(cats)new MutationObserver(()=>requestAnimationFrame(paint)).observe(cats,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-pressed']});
 paint()}
const t=setInterval(()=>{const d=document.getElementById('r360');if(d&&d.querySelector('.r3h')){clearInterval(t);setup(d)}},700);
window.Z288={paint};
})();
