/* ===== v198: a calm item window on the phone (Sara 26/10 09:18: "שלושה כפתורים ליד פרטי המוצר ... שכולם יהיו בשורה אחת ... בוטל אזל מהמלאי
   תופס שורה מלאה ... תשים את זה בכפתור קטן, אולי ליד שיתוף ... שהמסך יהיה מאוד נגיש, לא יותר מדי כפתורים ... אם צריך פרטים נוספים, שאחפש עוד אופציות").
   - the buttons beside "🏷 פרטי המוצר": one row, short words (the full words stay as the tooltip / screen-reader label)
   - "בוטל – אזל מהמלאי": a small "🚫 בוטל" next to "שיתוף" (two taps), the dashed row is gone (it stays only when the item IS cancelled, to say so)
   - "למצוא את המוצר בטמו" moves into "פרטים נוספים"
   Other parts of the site redraw these pieces at different times, so this runs on open and then every half second (cheap, does nothing when tidy). */
(function(){
const ERR=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('v198 '+w+': '+(e&&e.message||e))}catch(_){}};
const H=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SHORT=[['[data-pd85c]','📋 העתקה'],['[data-dp89]','👯 כפולים'],['[data-gen161][data-on="1"]','🗃 לכללית'],['[data-gen161][data-on="0"]','↩ לארון']];
function label(b,t){if(b.dataset.t198==t)return;const full=b.textContent.trim();if(!b.title)b.title=full;b.setAttribute('aria-label',b.title);b.textContent=t;b.dataset.t198=t}
function tidy(){const d=document.getElementById('dlg');if(!d||!d.open)return;const body=d.querySelector('#dlbody');if(!body)return;
 const h=body.querySelector('.pd85h');
 if(h){SHORT.forEach(([s,t])=>h.querySelectorAll(s).forEach(b=>label(b,t)));
  h.querySelectorAll('[data-dp89see]').forEach(b=>{const n=((b.dataset.t198?b.title:b.textContent).match(/\d+/)||[''])[0];label(b,'👯 '+n)});
  const t=h.querySelector(':scope>b');if(t&&!t.dataset.t198){t.dataset.t198=1;t.textContent='🏷 פרטים'}}
 const sr=body.querySelector('details.srch9'),more=body.querySelector('details.dinfo-more');
 if(sr&&more&&sr.parentElement!==more){const s=more.querySelector(':scope>summary');if(s)s.after(sr);else more.prepend(sr)}
 const ed=body.querySelector('.ed[data-id]'),id=(ed&&ed.dataset.id)||(typeof CUR!='undefined'?CUR:'');const bar=body.querySelector('.it77');
 if(!bar||!id||typeof D=='undefined'||!D[id])return;
 if(!bar.querySelector('[data-sh83]')&&typeof itemExtras=='function'&&!bar.dataset.x198){bar.dataset.x198=1;try{itemExtras(id)}catch(e){ERR('extras',e)}}   // the avatar bar was drawn again without share / voice note
 const on=!!((typeof IT=='object'&&IT[id])||{}).oos;let c=bar.querySelector('.oos198');
 if(on){if(c)c.remove();return}
 if(c&&c.dataset.id!=id){c.remove();c=null}
 if(!c){const after=bar.querySelector('[data-vn83]')||bar.querySelector('[data-sh83]');
  const html=`<button type="button" class="oos198" data-o3oos="${H(id)}" data-id="${H(id)}" title="בוטל – אזל מהמלאי" aria-label="בוטל – אזל מהמלאי">🚫 בוטל</button>`;
  if(after)after.insertAdjacentHTML('afterend',html);else bar.insertAdjacentHTML('beforeend',html)}}
// a small button is easy to touch by mistake, and "בוטל" takes the item out of the closet: first tap asks, second tap marks
window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.oos198');if(!t)return;
 if(typeof sure=='function'&&!sure(t,'בטוח? לחצי שוב')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()}},true);
if(typeof afterOpen=='function'){const _ao=afterOpen;afterOpen=function(){const r=_ao.apply(this,arguments);try{tidy();setTimeout(tidy,0);setTimeout(tidy,300)}catch(e){ERR('open',e)}return r}}
setInterval(()=>{try{tidy()}catch(e){ERR('tick',e)}},500);
})();
