// v313 (Sara 17:52 "יש דברים שאני לא רוצה להחזיר… כשאני לוחצת על ההתראות, אם החלטתי לא להחזיר – שזה פשוט לא יופיע לי. שיישארו רק התראות שבאמת רלוונטיות"):
// under every item picture in a return alert (🔔, the red line of doubles in the closet) two small buttons – "✓ משאירה" (s:'kept', the same as "שמרתי" in the item)
// and "↩ מחזירה" (s:'ret'). Either one takes the item out of every return alert at once; ↶ in the toast undoes it.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v313r '+w+': '+(e&&(e.code||e.message)||e));
const RET=/להחזיר|להחזרה|כפולים/;
const open_=id=>{const s=(IT[id]||{}).s;return s!='kept'&&s!='ret'&&s!='give'};
function deco(root){if(!root)return;root.querySelectorAll('.strip').forEach(st=>{
  const row=st.closest('.al'),txt=row?(row.querySelector('p')||{}).textContent||'':'urgent';if(row&&(!RET.test(txt)||/החזרת/.test(txt)))return;
  st.querySelectorAll(':scope>.mini[data-open]').forEach(m=>{const id=m.dataset.open;if(!open_(id))return;const w=document.createElement('div');w.className='r313';w.dataset.id=id;m.replaceWith(w);w.append(m);
   w.insertAdjacentHTML('beforeend',`<span class="r313b"><button type="button" data-r313="kept" aria-label="משאירה – לא להחזיר">✓ משאירה</button><button type="button" data-r313="ret" aria-label="מחזירה">↩ מחזירה</button></span>`)})})}
async function mark(id,s,w){const was=(IT[id]||{}).s||null;w.classList.add('gone');
 try{await putItem(id,{s});(window.toast||(()=>{}))(s=='kept'?'✓ נשאר אצלך – ההתראה ירדה':'↩ מסומן להחזרה – ההתראה ירדה',async()=>{try{await putItem(id,{s:was});refresh()}catch(e){ERR('undo',e)}})}
 catch(e){ERR('mark',e);w.classList.remove('gone');(window.toast||(()=>{}))('לא הצלחתי לשמור. לנסות שוב');return}
 setTimeout(()=>{w.remove();refresh()},250)}
function refresh(){try{window.afterApply&&afterApply()}catch(_){}try{const b=document.getElementById('albody');if(b&&b.closest('dialog[open]')&&window.openAlerts)openAlerts()}catch(_){}try{window.paintBell&&paintBell()}catch(_){}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-r313]');if(!b)return;e.stopPropagation();const w=b.closest('.r313');if(w)mark(w.dataset.id,b.dataset.r313,w)},true);
const run=()=>{deco(document.getElementById('urgent'));deco(document.getElementById('albody'))};
['urgent','albody'].forEach(i=>{const el=document.getElementById(i);if(el)new MutationObserver(()=>setTimeout(run,0)).observe(el,{childList:true,subtree:false})});
setTimeout(run,1500);
})();
