// v370 (Sara 9/11 "בכל מוצר בארון למיין: לפי ההזמנות, לפי תאריכי ההזמנות, מה לא הגיע למעלה, לפי צבע"):
// a row of sort chips at the top of every category page (the sort was hidden inside "⚙ סינון"); a chip drives the same #sort select.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v370 '+w+': '+(e&&e.message||e));
const CH=[['','רגיל'],['ord','📦 לפי הזמנות'],['dn','📅 חדש קודם'],['do','📅 ישן קודם'],['na','⏳ לא הגיע – למעלה'],['col','🎨 לפי צבע']];
function paint(){try{const sel=document.getElementById('sort');if(!sel)return;let row=document.getElementById('srt370');
 const host=document.querySelector('#z328h')||document.querySelector('.ctrl');if(!host)return;
 if(!row){row=document.createElement('div');row.id='srt370';row.setAttribute('role','group');row.setAttribute('aria-label','מיון');
  row.innerHTML='<span>מיון:</span>'+CH.map(([v,n])=>`<button type="button" data-srt370="${v}">${n}</button>`).join('');
  row.addEventListener('click',e=>{const b=e.target.closest('[data-srt370]');if(!b)return;const s=document.getElementById('sort');if(!s)return;s.value=b.dataset.srt370;s.dispatchEvent(new Event('change',{bubbles:true}));paint()});
  const at=document.querySelector('.ctrl');if(at)at.after(row);else return}
 const cur=sel.value||'';row.querySelectorAll('[data-srt370]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.srt370==cur));
 row.hidden=document.body.dataset.z50&&document.body.dataset.z50!='closet'}catch(e){ERR('paint',e)}}
setInterval(paint,700);document.addEventListener('change',e=>{if(e.target&&e.target.id=='sort')setTimeout(paint,30)});
})();
