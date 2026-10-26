// ===== v188: avatar pictures go only to the NEW (360) avatar, and the card dot shows it (Sara 26/10 00:01):
// "כשאני מעלה עכשיו תמונות לאווטאר אני רוצה שזה רק יהיה לאווטאר החדש" · "כל מי שהעלאתי לו תמונות – נקודה לבנה,
// ומי שגם העלאתי תמונות וגם הכנתי לו אווטאר – בתוך הנקודה הלבנה נקודה ירוקה. הרעיון שאדע שזה בוצע".
// IT[id].a8up = [{a: asset id, t: time, n: file name}] – what she uploaded from GPT for the 360 avatar; Claude cuts it and adds the item to READY in r360.js.
// avStat now means the 360 avatar only: 'ok' = on the 360 avatar (white dot, green centre), 'fix' = pictures uploaded, waiting (white dot), 'no' = nothing (no dot).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v188 '+w+': '+(e&&e.message||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=(m,u)=>(window.toast||(()=>{}))(m,u);
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const ups=id=>(it(id).a8up||[]).filter(u=>u&&u.a);
let RD=null;const ready=id=>{if(!RD){try{RD=new Set(window.R360?R360.ready():[])}catch(_){RD=new Set()}}return RD.has(id)};
const st=id=>ready(id)?'ok':ups(id).length?'fix':'no';
window.st188=st;

// ---------- the dot and every count / filter that reads it ----------
avStat=function(id){try{return D[id]?st(id):''}catch(_){return ''}};window.avStat=avStat;
const cnt=ids=>{const n={ok:0,fix:0};ids.forEach(id=>{const s=st(id);if(n[s]!=null)n[s]++});return n.ok+n.fix?` · אווטאר: מוכן ${n.ok} · הועלו ${n.fix}`:''};
try{avCounts=cnt}catch(_){}window.avCounts=cnt;
const TT={ok:'מוכן על האווטאר',fix:'הועלו תמונות לאווטאר, מחכה שאכין',no:''};
function dots(){document.querySelectorAll('.avd').forEach(d=>{const m=/avd-(ok|fix|no)/.exec(d.className);if(m)d.title=TT[m[1]]})}
function labels(){const f=document.getElementById('flf');if(!f)return;const L={avok:'⚪🟢 מוכן על האווטאר',avfix:'⚪ הועלו תמונות, מחכה',avno:'בלי תמונות לאווטאר'};
 [...f.options].forEach(o=>{if(L[o.value])o.textContent=L[o.value]})}
function repaintAll(){try{document.querySelectorAll('.grid .card').forEach(c=>{try{paint(c.dataset.id)}catch(_){}})}catch(e){ERR('paint',e)}dots()}
setTimeout(()=>{labels();repaintAll()},300);setTimeout(repaintAll,3000);
{const _p=window.paintAll;if(typeof _p=='function')paintAll=function(){const r=_p.apply(this,arguments);try{dots()}catch(_){}return r}}

// ---------- the item window: one bar for the new avatar (the old 5-pose upload is gone) ----------
window.bar188=function(id){const s=st(id),u=ups(id);
 const line=s=='ok'?'<span class="ok">✓ מוכן על האווטאר החדש</span>':s=='fix'?`<span class="up">⏳ ${u.length==1?'הועלתה תמונה':'הועלו '+u.length+' תמונות'} לאווטאר, מחכה שאכין</span>`:'<span class="no">✗ עוד לא על האווטאר החדש</span>';
 const th=u.length?`<div class="u188">${u.map((x,i)=>`<span><a href="/_blob/${es(x.a)}" target="_blank" rel="noopener"><img alt="תמונה ${i+1} לאווטאר" src="/_blob/${es(x.a)}"></a><button type="button" data-del188="${es(id)}" data-i="${i}" aria-label="למחוק את התמונה">✕</button></span>`).join('')}</div>`:'';
 return `<div class="it77p b188">${line}</div>${th}${s=='ok'?'':`<button class="it77u" data-up188="${es(id)}">📤 להעלות תמונה מ-GPT לאווטאר</button><button class="it77u s188" data-mk188="${es(id)}">📋 הפרומפט ל-GPT</button>`}`};
function rebar(id){try{const b=document.querySelector('#dlbody .it77');if(b&&typeof itemBar=='function')itemBar(id);else if(b){const t=b.querySelector('.it77t');b.innerHTML='';if(t)b.appendChild(t);b.insertAdjacentHTML('beforeend',bar188(id))}}catch(e){ERR('rebar',e)}
 try{const m=document.querySelector('[data-mkst188]');if(m&&m.dataset.mkst188==id)m.innerHTML=mkst(id)}catch(_){}}
const mkst=id=>{const u=ups(id);return u.length?`✓ כבר ${u.length==1?'הועלתה תמונה אחת':'הועלו '+u.length+' תמונות'}. אני מכינה ומלבישה על האווטאר.`:''};
window.mkst188=mkst;

// ---------- upload: straight to the site's storage, kept on the item ----------
let FI=null,FID='';
function picker(id){FID=id;if(!FI){FI=document.createElement('input');FI.type='file';FI.accept='image/*';FI.multiple=true;FI.hidden=true;document.body.appendChild(FI);FI.addEventListener('change',()=>{const fs=[...FI.files];FI.value='';if(fs.length)up(FID,fs)})}FI.click()}
let BUSY=false;
async function up(id,fs){if(BUSY){toast_('רגע, עוד שומרת');return}BUSY=true;let a=null;try{a=await claude.use('assets')}catch(_){}
 if(!a){BUSY=false;toast_('העלאת תמונות לא זמינה כאן. לפתוח את האתר ב-Chrome ולנסות שוב');return}
 const add=[];try{for(let i=0;i<fs.length;i++){toast_(`שומרת ${i+1} מתוך ${fs.length}…`);const r=await a.upload(fs[i]);add.push({a:r.id,t:Date.now(),n:String(fs[i].name||'').slice(0,80)})}}
 catch(e){ERR('upload',e);toast_(add.length?`נשמרו ${add.length}, השאר לא עלו. לנסות שוב`:'התמונה לא עלתה. לנסות שוב')}
 if(add.length){try{await putItem(id,{a8up:[...ups(id),...add]})}catch(e){ERR('put',e)}toast_(add.length==1?'✓ התמונה הועלתה לאווטאר החדש':`✓ ${add.length} תמונות הועלו לאווטאר החדש`);rebar(id);dots()}
 BUSY=false}
async function del(id,i){const old=ups(id);const x=old[i];if(!x)return;const nu=old.filter((_,k)=>k!=i);await putItem(id,{a8up:nu.length?nu:''});rebar(id);dots();
 toast_('התמונה הוסרה',async()=>{await putItem(id,{a8up:[...ups(id).slice(0,i),x,...ups(id).slice(i)]});rebar(id);dots()})}

// its own toasts say what was saved, so no generic "נשמר: a8up"
{const _bp=beforePut;beforePut=function(id,patch){if(patch&&Object.keys(patch).length==1&&'a8up' in patch)return;return _bp.apply(this,arguments)}}

// every old "upload for the avatar" button (5 poses) now leads to the new avatar
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-up188],[data-mk188],[data-del188],[data-m77up]');if(!t)return;
 if(t.dataset.up188){e.preventDefault();e.stopPropagation();picker(t.dataset.up188);return}
 if(t.dataset.del188){e.preventDefault();e.stopPropagation();del(t.dataset.del188,+t.dataset.i).catch(er=>ERR('del',er));return}
 const id=t.dataset.mk188||t.dataset.m77up;if(id){e.preventDefault();e.stopImmediatePropagation();try{if(window.R360)R360.make(id)}catch(er){ERR('make',er)}}},true);
})();
