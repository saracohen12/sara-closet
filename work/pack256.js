// ===== v256 (Sara 27/10 19:05 "אתה עושה לי שלוש תיקיות על המסך … חולצה אחת, שתיים, שלוש. וככה אני יכולה לבחור אותם בנפרד, כאילו שקניתי שלוש חולצות בנפרד"):
// a pack that is split (gpt250 pieces g1..gN) shows one folder card per piece right after the pack's card, in the same category.
// A folder opens its own small window: her picture of it (on the avatar when ready), name + colour, upload a sheet for only this one, wear it in the studio.
// Folders are not .card elements, so apply()/counts/totals stay as they were; each folder hides together with its pack's card.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v256 '+w+': '+(e&&(e.code||e.message)||e));
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>(window.toast||(()=>{}))(m);
const R=()=>window.R360;
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const gps=id=>(it(id).parts||[]).filter(p=>p&&/^g\d+$/.test(p.k));
const sub=(id,k)=>id+'~'+k;
const ready=s=>{try{return !!(R()&&R().isReady(s))}catch(_){return false}};
const photo=id=>{try{return img(id)||TPH}catch(_){return ''}};
const FR={};   // the piece on her, front angle (and the 8 angles for a turn on hover)
function still(s,v){const k=s+'|'+v;if(!FR[k])FR[k]=(async()=>{try{const c=R()&&R().still?await R().still(s,v):null;if(!c||!c.width)throw 0;
  const o=document.createElement('canvas');o.width=300;o.height=Math.round(c.height*300/c.width);o.getContext('2d').drawImage(c,0,0,o.width,o.height);return o.toDataURL('image/webp',.86)}catch(_){delete FR[k];return ''}})();return FR[k]}
function folderH(id,p,i,n){const s=sub(id,p.k),ok=ready(s),own=!!(it(s).a8||it(s).p5g||it(s).a8up);
 return `<div class="pk256" role="button" tabindex="0" data-pk256="${es(s)}" data-of="${es(id)}" aria-label="${es(p.n)} – תיקייה ${i+1} מתוך ${n}">
  <span class="ph"><img alt="" loading="lazy" src="${es(photo(id))}"${ok?` data-pk256v="${es(s)}"`:''}><span class="pk256f">📁 ${i+1} מתוך ${n}</span>
  <span class="ind247" aria-hidden="true"><i class="p${own||ok?' on':''}">📷</i><i class="r${ok?' on':''}">360</i></span></span>
  <span class="t">${es(p.n)}</span><span class="m">${p.color?es(p.color)+' · ':''}מתוך החבילה</span></div>`}
function sig(id){return JSON.stringify(gps(id))+gps(id).map(p=>ready(sub(id,p.k))?1:0).join('')}
function tick(){if(typeof IT!='object'||typeof D!='object')return;
 const packs=Object.keys(IT).filter(id=>D[id]&&!String(id).includes('~')&&gps(id).length);
 document.querySelectorAll('.pk256[data-of]').forEach(f=>{if(!packs.includes(f.dataset.of))f.remove()});
 document.querySelectorAll('.card[data-pk256s]').forEach(c=>{if(!packs.includes(c.dataset.id)){delete c.dataset.pk256s;const b=c.querySelector('.pk256b');if(b)b.remove()}});
 for(const id of packs){const c=document.querySelector(`.grid .card[data-id="${CSS.escape(id)}"]`);if(!c)continue;const ps=gps(id),g=sig(id);
  let F=[...document.querySelectorAll(`.pk256[data-of="${CSS.escape(id)}"]`)];
  if(c.dataset.pk256s!=g||F.length!=ps.length){F.forEach(f=>f.remove());c.insertAdjacentHTML('afterend',ps.map((p,i)=>folderH(id,p,i,ps.length)).join(''));c.dataset.pk256s=g;
   F=[...document.querySelectorAll(`.pk256[data-of="${CSS.escape(id)}"]`)];F.forEach(f=>{const im=f.querySelector('img[data-pk256v]');if(im)still(im.dataset.pk256v,0).then(u=>{if(u)im.src=u})})}
  // stay right after the pack's card (sorting or a category move takes the card elsewhere)
  let at=c;F.forEach(f=>{if(at.nextElementSibling!==f)at.after(f);at=f;f.classList.toggle('hide',c.classList.contains('hide'))});
  let b=c.querySelector('.pk256b');if(!b){b=document.createElement('span');b.className='pk256b';(c.querySelector('.ph')||c).appendChild(b)}
  const done=ps.filter(p=>ready(sub(id,p.k))).length;b.textContent=`📦 חבילה · ${ps.length} תיקיות${done?` · ${done} על האווטאר`:''}`}}
setInterval(()=>{try{tick()}catch(e){ERR('tick',e)}},1500);setTimeout(()=>{try{tick()}catch(_){}},600);
// a turn on hover for a folder whose piece is on the avatar
document.addEventListener('pointerover',async e=>{const im=e.target.closest&&e.target.closest('.pk256 img[data-pk256v]');if(!im||im._t)return;const s=im.dataset.pk256v;
 const L=await Promise.all([0,1,2,3,4,5,6,7].map(v=>still(s,v)));if(L.some(u=>!u))return;let i=0;im._t=setInterval(()=>{i++;im.src=L[i%8];if(i>=8){clearInterval(im._t);im._t=null}},170)});
// ---------- the folder's own window ----------
let DL=null,SID='';
function dlg(){if(DL)return DL;DL=document.createElement('dialog');DL.id='g256';DL.dir='rtl';DL.setAttribute('aria-labelledby','g256t');document.body.appendChild(DL);
 DL.addEventListener('cancel',e=>{e.preventDefault();DL.close()});
 DL.addEventListener('change',async e=>{const t=e.target.closest('[data-g256f]');if(!t)return;const [id,k]=SID.split('~'),ps=(it(id).parts||[]).map(p=>Object.assign({},p)),p=ps.find(q=>q.k==k);if(!p)return;
  const v=t.value.trim(),i=gps(id).findIndex(q=>q.k==k);if(t.dataset.g256f=='n'){if(!v)return;p.n=v.slice(0,40)}else{if(v)p.color=v.slice(0,30);else delete p.color}
  // the GPT window's names / colours follow (gpt250 IT.pn / IT.pc)
  const G=window.g256,pa={parts:ps};try{if(G&&i>=0){const n=G.npOf(id);if(t.dataset.g256f=='n'){const L=G.namesOf(id);L[i]=p.n;pa.pn=L}else{const C=Array.from({length:n},(_,j)=>G.colsOf(id)[j]||'');C[i]=v;pa.pc=C}}}catch(_){}
  try{await putItem(id,pa);window.syncParts85&&syncParts85()}catch(er){ERR('rename',er)}toast_('✓ נשמר')});
 DL.addEventListener('click',e=>{if(e.target===DL)return DL.close();const b=e.target.closest('button');if(!b)return;const q=b.dataset,id=SID.split('~')[0];
  if(b.classList.contains('mkx'))return DL.close();
  if(q.g256up!=null)return upOne(SID);
  if(q.g256see!=null){DL.close();try{R().openWith(null,{a:SID})}catch(er){ERR('see',er)}return}
  if(q.g256gpt!=null){DL.close();try{window.g250open(id)}catch(er){ERR('gpt',er)}return}
  if(q.g256pack!=null){DL.close();try{openItem(id)}catch(er){ERR('pack',er)}return}
  if(q.g256go){openF(q.g256go)}});
 return DL}
function openF(s){SID=s;const d=dlg(),[id,k]=s.split('~'),ps=gps(id),i=ps.findIndex(p=>p.k==k),p=ps[i];if(!p){toast_('התיקייה הזו כבר לא קיימת');return}
 const ok=ready(s);
 d.innerHTML=`<div class="mk"><div class="mkh"><h3 id="g256t">📁 ${es(p.n)} <small>(${i+1} מתוך ${ps.length})</small></h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="g256top"><img alt="" src="${es(photo(id))}"${ok?' data-g256v':''}><div>
   <label>שם<input data-g256f="n" value="${es(p.n)}"></label><label>צבע<input data-g256f="c" value="${es(p.color||'')}" placeholder="למשל: לבן"></label>
   <p class="g256st ${ok?'ok':''}">${ok?'✓ על האווטאר – אפשר ללבוש אותה לבד בסטודיו':'עוד לא על האווטאר'}</p>
   <small>מתוך: ${es((D[id]||{}).short||'')}</small></div></div>
  <div class="g256nav">${ps.map((q,j)=>`<button type="button" class="g250c${j==i?' on':''}" data-g256go="${es(sub(id,q.k))}" aria-pressed="${j==i}">📁 ${j+1} ${es(q.n)}</button>`).join('')}</div>
  <div class="mkb g250bar">${ok?'<button type="button" class="mkp" data-g256see>👀 עליי בסטודיו</button>':''}<button type="button" data-g256up>📤 גיליון רק לזו</button><button type="button" class="${ok?'':'mkp'}" data-g256gpt>🚀 כל החבילה ל-GPT</button><button type="button" data-g256pack>📦 לחבילה</button></div></div>`;
 if(ok){const im=d.querySelector('img[data-g256v]');still(s,0).then(u=>{if(u&&im.isConnected)im.src=u})}
 if(!d.open)d.showModal()}
window.g256folder=openF;
// one sheet GPT returned for only this piece (e.g. redoing one shirt)
function upOne(s){const f=document.createElement('input');f.type='file';f.accept='image/*';f.hidden=true;document.body.appendChild(f);
 f.addEventListener('change',async()=>{const fs=[...f.files];f.remove();if(!fs.length)return;
  try{if(typeof window.av188up!='function')throw new Error('av188');const id=s.split('~')[0],G=window.g256;window.av188kind(s,G?G.kd(id):'top');toast_('מעלה…');await window.av188up(s,fs);toast_('✓ עלה');if(DL&&DL.open)openF(s)}
  catch(e){ERR('up',e);toast_('לא הצלחתי להעלות. לנסות שוב')}});f.click()}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.pk256[data-pk256]');if(!t)return;e.preventDefault();e.stopPropagation();openF(t.dataset.pk256)},true);
document.addEventListener('keydown',e=>{if(e.key!='Enter'&&e.key!=' ')return;const t=e.target.closest&&e.target.closest('.pk256[data-pk256]');if(!t)return;e.preventDefault();openF(t.dataset.pk256)});
// a piece opened from anywhere else (search, studio) → its folder window
if(typeof openItem=='function'){const _oi=openItem;openItem=function(id){if(typeof id=='string'&&/~g\d+$/.test(id)&&D[id]){openF(id);return}return _oi.apply(this,arguments)};window.openItem=openItem}
})();
