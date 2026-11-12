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
// v379 (Sara 12/11 "את כל המוצרים החדשים אני לא רואה בארון"): when a filter is on, a clear line says so and shows everything again in one tap
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v379 '+w+': '+(e&&e.message||e));
function act(){try{const L=[];if(typeof COL!='undefined'&&COL)L.push('צבע');if(typeof SZ!='undefined'&&SZ)L.push('מידה');if(typeof STF!='undefined'&&STF)L.push('מצב');if(typeof TGF!='undefined'&&TGF)L.push('סגנון');
 if(typeof SSF!='undefined'&&SSF)L.push('עונה');if(typeof FLF!='undefined'&&FLF)L.push('רק…');if(typeof KIDF!='undefined'&&KIDF)L.push('ילד/ה');if(typeof MONF!='undefined'&&MONF)L.push('חודש');if(typeof ORDF!='undefined'&&ORDF)L.push('הזמנה');
 if(typeof PMIN!='undefined'&&(PMIN!=null&&PMIN!==''))L.push('מחיר');if(typeof PMAX!='undefined'&&(PMAX!=null&&PMAX!==''))L.push('מחיר');if(typeof F!='undefined'&&F&&F!='all')L.push('חנות');
 const q=document.getElementById('q');if(q&&q.value.trim())L.push('חיפוש "'+q.value.trim().slice(0,14)+'"');return [...new Set(L)]}catch(_){return []}}
function paint(){try{let bar=document.getElementById('flt379');const on=document.body.dataset.z50=='closet',L=on?act():[];
 if(!L.length){if(bar)bar.hidden=true;return}
 if(!bar){bar=document.createElement('div');bar.id='flt379';bar.setAttribute('role','status');const at=document.getElementById('srt370')||document.querySelector('.ctrl');if(!at)return;at.after(bar);
  bar.addEventListener('click',e=>{if(!e.target.closest('button'))return;try{const c=document.getElementById('pclr');if(c)c.click();const q=document.getElementById('q');if(q&&q.value){q.value='';q.dispatchEvent(new Event('input',{bubbles:true}))}if(typeof F!='undefined'&&F!='all'){F='all';const s=document.getElementById('src');if(s){s.value='all';s.dispatchEvent(new Event('change',{bubbles:true}))}}if(typeof apply=='function')apply()}catch(er){ERR('clr',er)}setTimeout(paint,100)})}
 const h=`<span>🔎 יש סינון: ${L.join(', ')} – חלק מהמוצרים מוסתרים</span><button type="button">✕ להציג הכל</button>`;if(bar.innerHTML!=h)bar.innerHTML=h;bar.hidden=false}catch(e){ERR('paint',e)}}
setInterval(paint,800);
})();
