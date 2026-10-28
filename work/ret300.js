// v301 (28/10 pass "יותר אוטומציה, קל יותר בהזמנות"): 51 Shein items reached their last return day with none of them marked, and marking means
// opening each one. Every return alert in 🔔 (last day, doubles, under a week, 8–14 days) now ends with "✓ משאירה את כל ה-N" – first tap asks
// "בטוחה?", second tap marks them all kept (s:'kept', the same mark as "שמרתי" in the item). Any one she wants to send back she opens and marks ↩.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v300 '+w+': '+(e&&(e.code||e.message)||e));
let LAST=[];
const RET=/להחזרה|להחזיר/;   // "החזרת … לא סימנת שהכסף חזר" is about refunds – not this
function wrap(){if(typeof getAlerts!='function'||getAlerts.__r300)return typeof getAlerts=='function';const g=getAlerts;getAlerts=function(){const A=g.apply(this,arguments)||[];LAST=A;return A};getAlerts.__r300=1;return true}
const open_=id=>{const s=(IT[id]||{}).s;return s!='kept'&&s!='ret'&&s!='give'};
function paint(){const b=document.getElementById('albody');if(!b)return;const rows=b.querySelectorAll(':scope>.al');
 rows.forEach((r,i)=>{const a=LAST[i];if(!a||!RET.test(a.txt)||/^החזרת/.test(a.txt))return;const ids=(a.ids||[]).filter(open_);if(!ids.length||r.querySelector('.k300'))return;
  r.insertAdjacentHTML('beforeend',`<div class="k300"><button type="button" data-k300="${i}">✓ משאירה את כל ה-${ids.length}</button><small>את מה שתרצי להחזיר – פותחים ומסמנים ↩</small></div>`)})}
let ARM=-1,ARMT=0;
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-k300]');if(!t)return;e.preventDefault();e.stopPropagation();
 const i=+t.dataset.k300,a=LAST[i];if(!a)return;const ids=(a.ids||[]).filter(open_);if(!ids.length)return;
 if(ARM!=i||Date.now()-ARMT>8000){ARM=i;ARMT=Date.now();t.textContent=`בטוחה? לחצי שוב לסמן ${ids.length} כ"משאירה"`;t.classList.add('arm');return}
 ARM=-1;t.disabled=true;let n=0,bad=0;
 for(const id of ids){try{await putItem(id,{s:'kept'});n++}catch(er){bad++;ERR('kept',er)}if(n%5==0)t.textContent=`מסמנת… ${n}/${ids.length}`}
 try{window.toast&&toast(bad?`סומנו ${n}, ${bad} לא נשמרו – לנסות שוב`:`✓ ${n} פריטים סומנו "משאירה"`)}catch(_){}
 try{if(typeof apply=='function')apply();if(typeof paintBell=='function')paintBell();openAlerts()}catch(er){ERR('reopen',er)}},true);
const w=setInterval(()=>{if(!wrap())return;clearInterval(w);const b=document.getElementById('albody');if(!b)return;
 new MutationObserver(()=>{try{paint()}catch(er){ERR('paint',er)}}).observe(b,{childList:true})},700);
window.RET300={paint,last:()=>LAST};
})();
