// ===== v79 (2026-10-21): "50 upgrades" round 1 – Hebrew date in the greeting, "ראיתי לאחרונה" + "מזמן לא לבשת" strips,
// "לבשתי היום" (item bar and look of the day), loading shimmer, search ✕ + recent searches, live result count on the filter
// sheet, haptic tap, hub opens with 3 ready looks.
(()=>{
const lsG=k=>{try{return localStorage.getItem(k)}catch(_){return null}},lsS=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
const lsJ=(k,d)=>{try{return JSON.parse(lsG(k)||'null')??d}catch(_){return d}};
const thumb=id=>{let u='';try{u=img(id)}catch(_){}return `<img data-th="${id}" src="${u||TPH}" alt="" loading="lazy">`};
const lz=root=>{try{thCats(root).forEach(c=>thLoad(c).then(()=>thApply(TH)))}catch(_){}};
const live=id=>D[id]&&(IT[id]||{}).s!='ret'&&(IT[id]||{}).s!='give';

// ---------- 1. greeting with weekday + Hebrew date
const GL=['','א','ב','ג','ד','ה','ו','ז','ח','ט'],GT=['','י','כ','ל'];
function gem(n){if(n==15)return 'ט״ו';if(n==16)return 'ט״ז';const s=GT[Math.floor(n/10)]+GL[n%10];return s.length>1?s.slice(0,-1)+'״'+s.slice(-1):s+'׳'}
function hebDate(){try{const p=new Intl.DateTimeFormat('he-IL-u-ca-hebrew',{day:'numeric',month:'long'}).formatToParts(new Date());const d=+(p.find(x=>x.type=='day')||{}).value;const m=(p.find(x=>x.type=='month')||{}).value||'';return d?gem(d)+' '+m.replace(/^ב?/,'ב'):''}catch(_){return ''}}
function greet(){const h=document.querySelector('.h9hi');if(!h||h.dataset.d79)return;let wd='';try{wd=new Intl.DateTimeFormat('he-IL',{weekday:'long'}).format(new Date())}catch(_){}
 const hd=hebDate();h.dataset.d79=1;if(wd||hd)h.insertAdjacentHTML('beforeend',`<span class="d79"> · ${[wd,hd].filter(Boolean).join(' · ')}</span>`)}

// ---------- 2. recently viewed + 3. not worn for a while
{const _oi=openItem;openItem=function(id){try{if(D[id]){const a=lsJ('rv79',[]).filter(x=>x!=id);a.unshift(id);lsS('rv79',JSON.stringify(a.slice(0,14)))}}catch(_){}return _oi.apply(this,arguments)}}
function strip(id,title,ids,more){const top=document.querySelector('header.top')||document.querySelector('#top');let s=document.getElementById(id);
 if(ids.length<3){if(s)s.remove();return}
 if(!s){s=document.createElement('div');s.id=id;s.className='s79';top.appendChild(s)}
 s.innerHTML=`<div class="s79h"><h3>${title}</h3>${more||''}</div><div class="s79r">${ids.map(i=>`<button data-open="${i}" aria-label="${esc((D[i].short||'').slice(0,40))}">${thumb(i)}${(IT[i]||{}).wear?`<small>${IT[i].wear}×</small>`:''}</button>`).join('')}</div>`;lz(s)}
function oldWorn(){const now=Date.now(),day=864e5;const L=Object.keys(D).filter(id=>{if(!live(id))return false;const it=IT[id]||{};const s=slotOf(id);if(s=='extra'||s=='kid')return false;
  if(it.lastWorn)return now-new Date(it.lastWorn).getTime()>45*day;return !!it.fav&&!it.wear});
 return L.sort((a,b)=>String((IT[a]||{}).lastWorn||'').localeCompare(String((IT[b]||{}).lastWorn||''))).slice(0,14)}
function paintStrips(){strip('rv79','ראיתי לאחרונה',lsJ('rv79',[]).filter(id=>D[id]).slice(0,12));strip('old79','מזמן לא לבשת',oldWorn(),'<small>מועדפים ובגדים שלא נלבשו 45 יום</small>')}

// ---------- 4/19. "לבשתי היום"
async function wore(ids){const before={};for(const id of ids){const it=IT[id]||{};before[id]={wear:it.wear||0,lastWorn:it.lastWorn||''};await putItem(id,{wear:(it.wear||0)+1})}
 if(navigator.vibrate)try{navigator.vibrate(15)}catch(_){}
 setTimeout(()=>toast(ids.length>1?`סומן: לבשת ${ids.length} בגדים היום`:'סומן: לבשת היום',async()=>{for(const id of ids)await putItem(id,before[id]);refresh()}),60);refresh()}
function refresh(){try{if($('#dlg')?.open&&CUR)wearBtn(CUR)}catch(_){}try{paintStrips()}catch(_){}}
function wearBtn(id){const bar=document.querySelector('#dlbody .it77');if(!bar)return;bar.querySelector('.w79')?.remove();const it=IT[id]||{};const today=(it.lastWorn||'')==new Date().toISOString().slice(0,10);
 bar.querySelector('.it77t')?.insertAdjacentHTML('afterend',`<button class="w79${today?' on':''}" data-w79="${id}">${today?'✓ לבשתי היום':'👗 לבשתי היום'}<small>${it.wear?` · ${it.wear==1?'פעם אחת':it.wear+' פעמים'}`:''}</small></button>`)}
{const _ao=window.afterOpen;window.afterOpen=function(id){try{if(_ao)_ao.apply(this,arguments)}catch(_){}try{wearBtn(id)}catch(_){}}}
function lotdWear(){const box=$('#lotd77');if(!box||box.querySelector('[data-l79]'))return;const a=box.querySelector('.l77a');if(a)a.insertAdjacentHTML('beforeend','<button data-l79="1">✓ לבשתי את זה</button>')}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-l77]'))setTimeout(lotdWear,80);const t=e.target.closest&&e.target.closest('[data-w79],[data-l79]');if(!t)return;e.preventDefault();
 if(t.dataset.w79)return wore([t.dataset.w79]);
 const c=lsJ('lotd77',null);if(c&&c.items)wore(Object.values(c.items).filter(id=>D[id]))});

// ---------- 9. loading shimmer on card photos
function shimmer(root){(root||document).querySelectorAll('.card .ph>img:not([data-s79])').forEach(im=>{im.dataset.s79=1;const ph=im.parentElement;const ok=()=>im.complete&&im.naturalWidth>2&&im.getAttribute('src')!=TPH;
 if(!ok())ph.classList.add('ld79');const done=()=>{if(ok())ph.classList.remove('ld79')};im.addEventListener('load',done);im.addEventListener('error',()=>ph.classList.remove('ld79'))})}

// ---------- 10. search ✕ + recent searches
function searchUi(){const q=$('#q');if(!q||q.dataset.s79)return;q.dataset.s79=1;const w=q.parentElement;w.classList.add('qw79');
 w.insertAdjacentHTML('beforeend','<button type="button" class="qx79" aria-label="ניקוי החיפוש" hidden>✕</button>');const x=w.querySelector('.qx79');
 const rec=document.createElement('div');rec.className='rs79';rec.hidden=true;(w.closest('.tools')||w).after(rec);
 const sync=()=>{x.hidden=!q.value};const show=()=>{const a=lsJ('rs79',[]);rec.hidden=!!q.value||!a.length;rec.innerHTML=a.length?`<span>חיפושים אחרונים:</span>${a.map(s=>`<button type="button" data-rs79="${esc(s)}">${esc(s)}</button>`).join('')}<button type="button" class="rsx" data-rs79x>ניקוי</button>`:''};
 const save=()=>{const v=q.value.trim();if(v.length<2)return;const a=lsJ('rs79',[]).filter(s=>s!=v);a.unshift(v);lsS('rs79',JSON.stringify(a.slice(0,6)))};
 q.addEventListener('input',()=>{sync();if(q.value)rec.hidden=true;else show()});q.addEventListener('focus',show);q.addEventListener('change',save);q.addEventListener('blur',()=>{save();setTimeout(()=>rec.hidden=true,200)});
 q.addEventListener('keydown',e=>{if(e.key=='Enter'){save();q.blur()}});
 x.addEventListener('click',()=>{q.value='';q.dispatchEvent(new Event('input',{bubbles:true}));sync();q.focus()});
 rec.addEventListener('mousedown',e=>e.preventDefault());
 rec.addEventListener('click',e=>{const b=e.target.closest('[data-rs79]');if(b){q.value=b.dataset.rs79;q.dispatchEvent(new Event('input',{bubbles:true}));sync();rec.hidden=true;return}if(e.target.closest('[data-rs79x]')){lsS('rs79','[]');rec.hidden=true}});sync()}

// ---------- 11. filter sheet: live result count on the close button
function countBtn(){const b=$('#pdone');if(!b)return;const n=(($('#cnt')||{}).textContent||'').match(/[\d,]+/);if(n)b.textContent=`הצגת ${n[0]} פריטים`}
{const _ap=apply;apply=function(){const r=_ap.apply(this,arguments);try{countBtn()}catch(_){}return r}}

// ---------- 25. small haptic tap on the main buttons (Android)
document.addEventListener('click',e=>{if(!navigator.vibrate)return;if(e.target.closest&&e.target.closest('button.go,.bnav button,.h9tiles button,[data-q77c],[data-hd77],#lotd77 button'))try{navigator.vibrate(8)}catch(_){}},true);

// ---------- 39. "לוקים" opens with 3 ready suggestions
{const _oh=openHub;openHub=function(tab,anchor){const r=_oh.apply(this,arguments);try{if(!anchor&&TAB=='looks'&&!GEN.length&&$('#hocc'))runGen()}catch(_){}return r}}

// ---------- boot + keep the home extras fresh
let _t=0;const go=()=>{clearTimeout(_t);_t=setTimeout(()=>{try{greet();paintStrips();lotdWear();shimmer();searchUi();countBtn()}catch(err){(window.ERRS=window.ERRS||[]).push('v79 '+err.message)}},500)};
setTimeout(go,1300);setTimeout(go,4200);
{const _pa=paintAll;paintAll=function(){const r=_pa.apply(this,arguments);go();return r}}
document.addEventListener('thumbs',()=>shimmer());
})();
