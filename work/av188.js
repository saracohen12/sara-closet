// ===== v188: avatar pictures go only to the NEW (360) avatar, and the card dot shows it (Sara 26/10 00:01):
// "כשאני מעלה עכשיו תמונות לאווטאר אני רוצה שזה רק יהיה לאווטאר החדש" · "כל מי שהעלאתי לו תמונות – נקודה לבנה,
// ומי שגם העלאתי תמונות וגם הכנתי לו אווטאר – בתוך הנקודה הלבנה נקודה ירוקה. הרעיון שאדע שזה בוצע".
// IT[id].a8up = [{a: asset id, t: time, n: file name}] – the 8-angle pictures she uploaded from GPT.
// avStat: 'ok' = on the 360 avatar (white dot, green centre), 'fix' = she uploaded pictures for this item (white dot), 'no' = nothing (no dot).
// v189 (Sara 26/10 04:39 "יש מלא שכבר העליתי להם… ואני לא רואה נקודה לבנה"): every picture she ever uploaded counts – her photos (img/imgs/pics),
// the old 5-pose GPT garments (p5g/p5gv/p5g118) and the new avatar uploads (a8up).
// v190 (Sara 26/10 06:58 "שכחת לעדכן בתוך כל מוצר שעכשיו האבטר הוא 8 צורות" · 06:59 "אני מעלה תמונה אחת של 8 ... לגזור אותה ... להתאים בדיוק לבובה ...
// לארון בגדים שאני אוכל לבחור"): the item window's avatar part is the 8-angle avatar only, and an uploaded picture is cut on the site (cut8.js)
// into IT[id].a8 = [{s: slot, k: kind, L: [8 layer asset ids], src: upload asset id, t}] → r360.js puts it in the studio.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v190 '+w+': '+(e&&(e.code||e.message)||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=(m,u)=>(window.toast||(()=>{}))(m,u);
const log=(s,x)=>{try{window.step157&&step157(s,x)}catch(_){}};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const ups=id=>(it(id).a8up||[]).filter(u=>u&&u.a);
const parts=id=>(it(id).a8||[]).filter(p=>p&&Array.isArray(p.L)&&p.L.length==8);
const ready=id=>{try{return !!(window.R360&&R360.isReady(id))}catch(_){return false}};
const has=v=>Array.isArray(v)?v.length>0:!!v;
const pics=id=>{const t=it(id);return ups(id).length>0||['img','imgs','pics','p5g','p5gv','p5g118'].some(k=>has(t[k]))};
const st=id=>ready(id)?'ok':pics(id)?'fix':'no';
window.st188=st;window.up188=id=>ups(id).length;

// ---------- the dot and every count / filter that reads it ----------
avStat=function(id){try{return D[id]?st(id):''}catch(_){return ''}};window.avStat=avStat;
const cnt=ids=>{const n={ok:0,fix:0};ids.forEach(id=>{const s=st(id);if(n[s]!=null)n[s]++});return n.ok+n.fix?` · העליתי תמונות ${n.ok+n.fix} · מוכן על האווטאר ${n.ok}`:''};
try{avCounts=cnt}catch(_){}window.avCounts=cnt;
const TT={ok:'מוכן על האווטאר',fix:'כבר העלית תמונות לבגד הזה',no:''};
function dots(){document.querySelectorAll('.avd').forEach(d=>{const m=/avd-(ok|fix|no)/.exec(d.className);if(m)d.title=TT[m[1]]})}
function labels(){const f=document.getElementById('flf');if(!f)return;const L={avok:'⚪🟢 מוכן על האווטאר',avfix:'⚪ העליתי תמונות',avno:'עוד לא העליתי תמונות'};
 [...f.options].forEach(o=>{if(L[o.value])o.textContent=L[o.value]})}
function repaint(id){try{paint(id)}catch(_){}dots()}
function repaintAll(){try{document.querySelectorAll('.grid .card').forEach(c=>{try{paint(c.dataset.id)}catch(_){}})}catch(e){ERR('paint',e)}dots()}
setTimeout(()=>{labels();repaintAll()},300);setTimeout(repaintAll,3000);
{const _p=window.paintAll;if(typeof _p=='function')paintAll=function(){const r=_p.apply(this,arguments);try{dots();soon()}catch(_){}return r}}

// ---------- what the item window says ----------
const PROC={};   // id → {v: 1-8 cutting, 9 saving} while the site prepares it, {err} when it could not
const KN={dress:'השמלה',top:'החולצה',base:'החולצה',sweater:'הסוודר',skirt:'החצאית',pants:'המכנסיים',vest:'האפודה',jacket:'הז׳קט',coat:'המעיל',cover:'הכיסוי',scarf:'המטפחת',tiex:'המטפחת בקשירה',
 necklace:'השרשרת',earrings:'העגילים',bracelet:'הצמיד',belt:'החגורה',shoes:'הנעליים',bag:'התיק'};
const ERRT={shape:'התמונה לא בצורה של הגיליון (2 שורות של 4 משבצות). צריך להעלות את התמונה המלאה שחזרה מ-GPT, בלי לחתוך אותה',
 empty:'לא מצאתי בגד חדש על הבובה. האם זו התמונה ש-GPT החזיר עם הבגד?',assets:'שמירת תמונות לא זמינה כאן. לפתוח את האתר ב-Chrome ולנסות שוב',
 x:'משהו השתבש בהכנה. לנסות שוב'};
function line(id,short){const p=PROC[id];   // short: the bar under "לנסות עליי" (v198, less words on the phone)
 if(p&&p.v)return `<span class="up">✂ ${p.v<9?`גוזרת ומתאימה לבובה… זווית ${p.v} מתוך 8`:'שומרת את הבגד על האווטאר…'}</span>`;
 if(p&&p.err)return `<span class="no">✗ ${es(ERRT[p.err]||ERRT.x)}</span>`;
 const s=st(id);if(short&&s!='ok'){try{if(R360.coverTie&&R360.coverTie(id))return '<span class="ok">🧕 על האווטאר עם קשירה</span>'}catch(_){}}   // v202: a cover is worn with one of her ties
 if(s=='ok')return short?'<span class="ok">✓ על האווטאר החדש</span>':'<span class="ok">✓ על האווטאר החדש. אפשר לבחור אותו בסטודיו ובלוקים</span>';
 if(ups(id).length)return short?'<span class="up">⏳ עוד רגע על האווטאר</span>':'<span class="up">⏳ הועלתה תמונה של 8 זוויות, עוד רגע היא על האווטאר</span>';
 return s=='fix'?'<span class="up">⚪ כבר העלית תמונות לבגד הזה · עוד לא על האווטאר החדש</span>':'<span class="no">✗ עוד לא על האווטאר החדש</span>'}
// the bar at the top of the item window: one line, a tap goes down to the avatar part
window.bar188=function(id){const go=`<button type="button" class="it77p b188" data-go190="${es(id)}">${line(id,1)}<b aria-hidden="true">⬇</b></button>`;
 return go+(mine(id)?acts(id):'')};
// v197 (Sara 08:29 "עלתה לאוויר של המוצר תמונה לא נכונה, אני לא מצליחה למחוק/לשנות... גם אם לחצתי מדוד עלי שיהיה לי אפשרות למחוק ולהחליף"):
// replace / delete right under "לנסות עליי", in the avatar box and in the studio
const mine=id=>ups(id).length>0||parts(id).length>0;
const acts=id=>`<span class="b188x"><button type="button" data-up188="${es(id)}" aria-label="להחליף את התמונה של האווטאר">🔄 להחליף</button><button type="button" data-off190="${es(id)}" aria-label="למחוק מהאווטאר">🗑 למחוק</button></span>`;
window.acts197=id=>mine(id)?acts(id):'';
function box(id){const p=PROC[id],u=ups(id),ok=ready(id),dyn=(()=>{try{return R360.dyn(id)}catch(_){return false}})();let kind='';try{kind=R360.kind(id)}catch(_){}
 const twin=kind=='set'||kind=='jwset',P=parts(id),half=twin&&P.length==1;
 const th=u.length?`<div class="u188">${u.map((x,i)=>`<span><a href="/_blob/${es(x.a)}" target="_blank" rel="noopener"><img alt="תמונה ${i+1} שהעלית לאווטאר" src="/_blob/${es(x.a)}" loading="lazy"></a><button type="button" data-del188="${es(id)}" data-i="${i}" aria-label="למחוק את התמונה">✕</button></span>`).join('')}</div>`:'';
 const busy=p&&p.v;
 let body,cuts='';
 // v196 (Sara 08:20 "אני רוצה להוריד את התמונות ... ולשים אותן ב-GPT ... דרך הטלפון אני לא רואה איפה התמונות"): all the item's photos (shop, hers, the old avatar) to save for GPT
 const pics=`<button type="button" data-pk102open="${es(id)}">🖼 התמונות של הבגד · להוריד ל-GPT</button>`;
 // v191 (Sara 07:31 "אני לא רואה שזה גזור... לגזור אותה לשמונה חתיכות, לשמונה הכיוונים"): the 8 pieces, each on the doll
 try{const T=ok&&R360.tiles(id),NM=R360.names;if(T)cuts=`<p class="a8h">✂ גזרתי ל-8 זוויות:</p><div class="a8g">${T.map((ls,v)=>`<button type="button" class="a8t" data-see190="${es(id)}" data-v="${v}" aria-label="${es(NM[v])}"><span>${ls.map(u=>`<img alt="" src="${es(u)}" loading="lazy">`).join('')}</span><small>${es(NM[v])}</small></button>`).join('')}</div>`}catch(e){ERR('tiles',e)}
 if(ok&&!half)body=`<div class="a8b"><button type="button" class="go" data-see190="${es(id)}">👀 לראות על האווטאר</button>${dyn?`<button type="button" data-up188="${es(id)}">🔄 להעלות תמונה חדשה</button><button type="button" data-off190="${es(id)}">🗑 למחוק מהאווטאר</button>`:''}${pics}</div>`;
 else body=`<ol class="a8s">
  <li><b>הפרומפט ל-GPT:</b> שומרים את תמונת הבגד ואת הבובה ב-8 זוויות, ושולחים ל-GPT עם הפרומפט, הכל בהודעה אחת.<button type="button" data-mk188="${es(id)}">📋 הפרומפט ל-GPT</button>${pics}</li>
  <li><b>מעלים את מה שחזר:</b> תמונה אחת עם 8 הזוויות${twin?(half?` – עכשיו של ${kind=='set'?'החלק התחתון':'העגילים'}`:` (${kind=='set'?'קודם החלק העליון, אחר כך התחתון':'קודם השרשרת, אחר כך העגילים'})`):''}. האתר גוזר אותה ל-8, מתאים בדיוק לבובה ומכניס את הבגד לסטודיו.<button type="button" class="go" data-up188="${es(id)}"${busy?' disabled':''}>📤 להעלות תמונה של 8 זוויות</button></li></ol>`;
 return `<summary>🧍 האווטאר החדש · 8 זוויות</summary><p class="a8st">${line(id)}</p>${cuts}${body}${u.length?'<p class="a8h">התמונה שהעלית מ-GPT:</p>':''}${th}`}
function paintSt(id){document.querySelectorAll(`[data-go190="${CSS.escape(id)}"]`).forEach(b=>b.innerHTML=line(id)+'<b aria-hidden="true">⬇</b>');
 document.querySelectorAll(`[data-a8box="${CSS.escape(id)}"] .a8st`).forEach(p=>p.innerHTML=line(id));
 document.querySelectorAll(`[data-mkst188="${CSS.escape(id)}"]`).forEach(m=>m.innerHTML=mkst(id))}
function rebox(id){document.querySelectorAll(`[data-a8box="${CSS.escape(id)}"]`).forEach(b=>{const o=b.open;b.innerHTML=box(id);b.open=o});
 try{const b=document.querySelector('#dlbody .it77');if(b&&typeof itemBar=='function')itemBar(id)}catch(e){ERR('rebar',e)}paintSt(id)}
// "תמונות ואווטאר": the old 5-pose box (p5g.js, fix85/99/102/114) gives its place to the 8-angle box
const AVC=new Set(['dresses','tops','base','sweaters','skirts','sets','outer','scarves','shoes','belts','jewelry','bags']);
{const _rr=window.renderImgRow;if(typeof _rr=='function')renderImgRow=function(id){const r=_rr.apply(this,arguments);try{
  document.querySelectorAll(`[data-imgrow="${CSS.escape(id)}"]`).forEach(el=>{let c='';try{c=curCat(id)}catch(_){c=(D[id]||{}).cat}
   const old=el.querySelector('.p5gbox');let bx=el.querySelector('.a8box');if(!old&&!AVC.has(c)){if(bx)bx.remove();return}
   if(!bx){bx=document.createElement('details');bx.className='a8box';bx.open=true;bx.dataset.a8box=id;const dm=el.querySelector('details.dmore');if(old)old.before(bx);else if(dm)dm.before(bx);else el.appendChild(bx)}
   bx.innerHTML=box(id);bx.open=true})}catch(e){ERR('box',e)}return r}}
const mkst=id=>{const p=PROC[id];if(p&&(p.v||p.err))return line(id).replace(/<[^>]+>/g,'');return ready(id)?'✓ כבר על האווטאר':ups(id).length?'⏳ הועלתה, עוד רגע על האווטאר':''};
window.mkst188=mkst;

// ---------- upload, then cut on the site ----------
let FI=null,FID='';const WH=new Set();
function picker(id){FID=id;if(!FI){FI=document.createElement('input');FI.type='file';FI.accept='image/*';FI.multiple=true;FI.hidden=true;document.body.appendChild(FI);FI.addEventListener('change',()=>{const fs=[...FI.files];FI.value='';if(fs.length)up(FID,fs)})}FI.click()}
let BUSY=false;
async function up(id,fs){if(BUSY){toast_('רגע, עוד שומרת');return}BUSY=true;let a=null;try{a=await claude.use('assets')}catch(_){}
 if(!a){BUSY=false;toast_(ERRT.assets);return}
 const add=[];try{for(let i=0;i<fs.length;i++){toast_(`שומרת ${i+1} מתוך ${fs.length}…`);const r=await a.upload(fs[i]);add.push({a:r.id,t:Date.now(),n:String(fs[i].name||'').slice(0,80)})}}
 catch(e){ERR('upload',e);toast_(add.length?`נשמרו ${add.length}, השאר לא עלו. לנסות שוב`:'התמונה לא עלתה. לנסות שוב')}
 if(add.length){try{await putItem(id,{a8up:[...ups(id),...add]})}catch(e){ERR('put',e)}rebox(id);repaint(id)}
 BUSY=false;
 for(let i=0;i<add.length;i++)await cut(id,fs[i],add[i].a,add[i].t)}
async function del(id,i){const old=ups(id);const x=old[i];if(!x)return;const nu=old.filter((_,k)=>k!=i);await putItem(id,{a8up:nu.length?nu:''});rebox(id);repaint(id);
 toast_('התמונה הוסרה',async()=>{await putItem(id,{a8up:[...ups(id).slice(0,i),x,...ups(id).slice(i)]});rebox(id);repaint(id)})}

const SLOT={tiex:'head',dress:'body',top:'top',base:'top',sweater:'outer',skirt:'bottom',pants:'bottom',vest:'outer',jacket:'outer',coat:'outer',cover:'head',scarf:'head',
 necklace:'neck',earrings:'ears',bracelet:'wrist',belt:'belt',shoes:'shoes',bag:'bag'};
const TWIN={set:['top','skirt'],jwset:['necklace','earrings']};
const blobOf=c=>new Promise(r=>c.toBlob(b=>{if(b&&b.type=='image/webp')return r(b);c.toBlob(r,'image/png')},'image/webp',.92));
async function put1(a,b){let last;for(const w of [0,1500,4000]){if(w)await new Promise(r=>setTimeout(r,w));try{return await a.upload(b)}catch(e){last=e}}throw last}
// src: the File she just picked, or the stored picture · ua: its asset id · t: its upload time
// at: the index of a part that is cut again (v192: older cuts did not follow the turned doll)
async function cut(id,src,ua,t,at){if(PROC[id]&&PROC[id].v)return;if(!window.cut8)return;
 let kind='dress';try{kind=R360.kind(id)}catch(_){}let P=parts(id);const re=at!=null&&!!P[at];
 if(!re&&WH.has(id)){kind='tiex';WH.delete(id)}   // v202: her exact scarf tied by the tie prompt – the whole head, like the ties
 if(re)kind=P[at].k;else if(TWIN[kind]){const w=TWIN[kind];if(P.length>=w.length)P=[];kind=w[P.length]}else P=[];
 PROC[id]={v:1};rebox(id);const t0=Date.now();log('cut8_start',{id,kind});
 try{const r=await cut8.run(src,kind,v=>{PROC[id]={v:v+1};paintSt(id)});
  if(r.px.filter(x=>x>150).length<5)throw Object.assign(new Error('empty'),{code:'empty'});
  PROC[id]={v:9};paintSt(id);
  let a=null;try{a=await claude.use('assets')}catch(_){}if(!a)throw Object.assign(new Error('assets'),{code:'assets'});
  const L=[];for(const c of r.views)L.push((await put1(a,await blobOf(c))).id);
  const np={s:SLOT[kind]||'top',k:kind,L,src:ua||'',t:t||Date.now(),cv:cut8.CV||1,sh:r.shifts.some(s=>s[0]||s[1])?r.shifts:null};if(re)P[at]=np;else P.push(np);
  await putItem(id,{a8:P});delete PROC[id];DONE.add(id);
  try{R360.sync()}catch(_){}rebox(id);repaint(id);avNow(id);log('cut8_ok',{id,kind,re,ms:Date.now()-t0,px:r.px.join(',')});
  if(re)return;const half=TWIN[(()=>{try{return R360.kind(id)}catch(_){return ''}})()]&&P.length==1;
  toast_(half?`✓ ${KN[kind]||'החלק הראשון'} על האווטאר. עכשיו מעלים את התמונה של החלק השני`:`✓ ${KN[kind]||'הבגד'} על האווטאר החדש`,half?null:()=>see(id))}
 catch(e){PROC[id]={err:e&&e.code||'x'};DONE.add(id);ERR('cut',e);log('cut8_fail',{id,kind,code:String(e&&(e.code||e.message)||e).slice(0,60)});rebox(id);toast_('✗ '+(ERRT[PROC[id].err]||ERRT.x))}}
function see(id,v){try{R360.openWith(null,{a:id});if(v>0)setTimeout(()=>{try{R360.show(v)}catch(_){}},700)}catch(e){ERR('see',e)}}
async function off(id){const o={a8:it(id).a8||'',a8up:it(id).a8up||''};if(!o.a8&&!o.a8up)return;DONE.add(id);delete PROC[id];
 await putItem(id,{a8:'',a8up:''});try{R360.sync()}catch(_){}rebox(id);repaint(id);avNow(id);log('a8_off',{id});
 toast_('✓ נמחק מהאווטאר. אפשר להעלות תמונה חדשה',async()=>{await putItem(id,o);try{R360.sync()}catch(_){}rebox(id);repaint(id);avNow(id)})}

// a picture that was uploaded but not cut yet (on another phone, before v190, or the page was closed in the middle) is cut when the site opens
const DONE=new Set();let SOON=null;
const RE=new Set(),stale=id=>RE.has(id)||!window.cut8?[]:parts(id).map((p,j)=>!(p.cv>=cut8.CV)&&p.src?j:-1).filter(j=>j>=0);
const pending=id=>{const u=ups(id);if(!u.length||DONE.has(id)||PROC[id])return null;const last=u[u.length-1],P=parts(id);
 if(P.some(p=>p.src==last.a))return null;if(ready(id)&&!(window.R360&&R360.dyn(id)))return null;return last};
function soon(){if(SOON)return;SOON=setTimeout(async()=>{SOON=null;if(BUSY)return;
 for(const id of Object.keys(typeof IT=='object'&&IT||{})){if(!D[id])continue;const p=pending(id);if(p)await cut(id,'/_blob/'+p.a,p.a,p.t);
  const s=stale(id);if(s.length){RE.add(id);for(const j of s){const q=parts(id)[j];if(q&&!PROC[id])await cut(id,'/_blob/'+q.src,q.src,q.t,j)}}}},2500)}
setTimeout(soon,4000);

// its own toasts say what was saved, so no generic "נשמר: a8up"
{const _bp=beforePut;beforePut=function(id,patch){const k=patch&&Object.keys(patch);if(k&&k.length&&k.every(x=>x=='a8up'||x=='a8'))return;return _bp.apply(this,arguments)}}

// every old "upload for the avatar" button (5 poses) now leads to the new avatar
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-up188],[data-mk188],[data-del188],[data-m77up],[data-go190],[data-see190],[data-off190]');if(!t)return;
 if(t.dataset.up188){e.preventDefault();e.stopPropagation();if(t.dataset.w)WH.add(t.dataset.up188);else WH.delete(t.dataset.up188);picker(t.dataset.up188);return}
 if(t.dataset.del188){e.preventDefault();e.stopPropagation();del(t.dataset.del188,+t.dataset.i).catch(er=>ERR('del',er));return}
 if(t.dataset.go190){e.preventDefault();e.stopPropagation();const b=document.querySelector(`#dlbody [data-a8box="${CSS.escape(t.dataset.go190)}"]`);if(b){b.open=true;b.scrollIntoView({behavior:'smooth',block:'center'})}return}
 if(t.dataset.see190){e.preventDefault();e.stopPropagation();see(t.dataset.see190,+(t.dataset.v||0));return}
 if(t.dataset.off190){e.preventDefault();e.stopPropagation();if(typeof sure=='function'&&!sure(t,'בטוח? לחצי שוב'))return;off(t.dataset.off190).catch(er=>ERR('off',er));return}
 const id=t.dataset.mk188||t.dataset.m77up;if(id){e.preventDefault();e.stopImmediatePropagation();try{if(window.R360)R360.make(id)}catch(er){ERR('make',er)}}},true);

// v195: once an item is on the new avatar, the first picture in its window is HER wearing it (Sara 26/10 08:10: "שבתמונה הראשית ... יופיע לי את
// האבטאר עם הבגד לבוש עליי, שאני אראה אותו במוצר, לא סתם את התמונה"). The shop photos stay as the next pictures.
const AVU={},MK={};
const avKey=id=>{try{const t=R360.tiles(id);return t?t[0].join('|')+(R360.wig()?'#w':'#c'):''}catch(_){return ''}};
function avMake(id,k){if(MK[id]==k)return;MK[id]=k;
 R360.still(id,0).then(c=>c?new Promise(r=>c.toBlob(r,'image/jpeg',.92)):null).then(b=>{if(MK[id]!=k)return;delete MK[id];if(!b){AVU[id]={k,u:''};return}   // a layer did not load: keep the shop photo first
  if(AVU[id]&&AVU[id].u)URL.revokeObjectURL(AVU[id].u);AVU[id]={k,u:URL.createObjectURL(b)};
  if(typeof CUR=='undefined'||CUR!=id)return;if(GI[id])GI[id]++;   // she already moved to another picture: stay on it
  const im=document.querySelector('#dlbody img.main');if(im&&!GI[id])im.src=AVU[id].u;try{paintGal(id)}catch(_){}})
 .catch(e=>{delete MK[id];ERR('still',e)})}
function avNow(id){try{if(typeof CUR!='undefined'&&CUR==id)paintGal(id)}catch(_){}}
if(typeof galList=='function'){const _gl=galList;galList=function(id){const L=_gl.apply(this,arguments);
 try{if(!window.R360||!R360.isReady(id))return L;const k=avKey(id),a=AVU[id];if(a&&a.k==k)return a.u?[{u:a.u,n:'עליי',av:1},...L]:L;if(k)avMake(id,k)}catch(e){ERR('gal',e)}return L}}
})();
