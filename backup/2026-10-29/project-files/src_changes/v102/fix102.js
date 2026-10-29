
/* ===== v102: all the pictures of a garment – flip through them in the big view, pick some (✓) and download / send / join into one ===== */
{
const PN102={front:'חזית',side:'צד',back:'גב',half:'חצי צד',hip:'יד על המותן'};
function all102(id){const it=IT[id]||{};const L=[],seen=new Set();const add=(u,n)=>{if(!u||u==TPH||seen.has(u))return;seen.add(u);L.push({u,n})};
 try{galList(id).forEach(g=>add(g.u,g.n))}catch(_){}
 try{const o=origSrc(id);if(o)add(o,'מהחנות')}catch(_){}
 (it.imgs||[]).forEach(p=>p&&p.id&&add('/_blob/'+p.id,p.raw?'תמונה מקורית':'תמונה'));
 try{p5gVars(id).forEach((g,i,a)=>{const vn=a.length>1?(g.n||('גרסה '+(i+1)))+' · ':'';Object.keys(PN102).forEach(v=>{if(g[v])add(p5gUrl(g,v),'על האווטאר: '+vn+PN102[v])})})}catch(_){}
 return L}
// ---- 1. the big view flips between the garment's pictures (‹ › buttons, swipe, arrow keys)
let ZL102=null,ZI102=0;
function zPaint102(){const zd=document.getElementById('zoomd');if(!zd)return;let n=zd.querySelector('.zn102');const on=ZL102&&ZL102.length>1;
 if(!n){zd.insertAdjacentHTML('beforeend','<button class="zp102 zl" data-z102="1" aria-label="הבאה">‹</button><button class="zp102 zr" data-z102="-1" aria-label="הקודמת">›</button><div class="zn102"></div>');n=zd.querySelector('.zn102')}
 zd.classList.toggle('m102',!!on);n.textContent=on?`${ZI102+1} / ${ZL102.length} · ${ZL102[ZI102].n}`:'';
 const zb=zd.querySelector('.zb');if(zb&&!zb.querySelector('[data-zall102]'))zb.insertAdjacentHTML('afterbegin','<button data-zall102="1" class="za102" title="כל התמונות של הבגד – לבחור ולהוריד">🖼 הכל</button>');const a=zb&&zb.querySelector('[data-zall102]');if(a)a.hidden=!on}
function zGo102(d){if(!ZL102||ZL102.length<2)return;ZI102=(ZI102+d+ZL102.length)%ZL102.length;ZI.src=ZL102[ZI102].u;zFit();zPaint102()}
{const _oz=openZoom;openZoom=async function(src,...a){ZL102=null;try{const dl=document.getElementById('dlg');if(dl&&dl.open&&CUR){const L=all102(CUR);if(L.length>1){const ab=u=>{try{return new URL(u,location.href).href}catch(_){return u}};let i=L.findIndex(x=>ab(x.u)==ab(src));if(i<0){L.unshift({u:src,n:'התמונה'});i=0}ZL102=L;ZI102=i}}}catch(e){ERR('v102 zoom',e)}
 const r=await _oz.call(this,src,...a);zPaint102();return r}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-z102],[data-zall102]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.z102)zGo102(+t.dataset.z102);else if(CUR)openPick102(CUR,ZL102)},true);
{let s=null;ZD.addEventListener('pointerdown',e=>{s=(ZS.s<=1.01&&!e.target.closest('button'))?{x:e.clientX,y:e.clientY,t:Date.now()}:null},true);
 ZD.addEventListener('pointerup',e=>{if(!s||!ZL102)return;const dx=e.clientX-s.x,dy=e.clientY-s.y;s=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4&&ZS.s<=1.01){zGo102(dx<0?1:-1)}},true)}
document.addEventListener('keydown',e=>{if(!ZD.open||!ZL102)return;if(e.key=='ArrowLeft'){e.preventDefault();zGo102(1)}else if(e.key=='ArrowRight'){e.preventDefault();zGo102(-1)}});
ZD.addEventListener('close',()=>{ZL102=null;zPaint102()});
// ---- 2. "🖼 כל התמונות": small pictures with ✓, then download / send / one picture of all
let PK102={id:null,L:[],sel:new Set()};
function dlgPick102(){let d=document.getElementById('pk102');if(!d){d=document.createElement('dialog');d.id='pk102';d.className='sheet9';d.dir='rtl';document.body.appendChild(d)}return d}
function openPick102(id,L){PK102={id,L:L||all102(id),sel:new Set()};const d=dlgPick102();paintPick102();if(!d.open)d.showModal()}
function paintPick102(){const d=dlgPick102();const {id,L,sel}=PK102;const k=sel.size,canSh=!!(navigator.canShare&&navigator.share);
 d.innerHTML=`<div class="sh9h"><h3>🖼 כל התמונות · ${L.length}</h3><button class="x" data-pk102x aria-label="סגירה">✕</button></div>
 <p class="pk102h">${esc(((D[id]||{}).short||'').slice(0,60))} · מסמנים ✓ את התמונות שרוצים, ואז מורידים או שולחים ל-GPT</p>
 <div class="pk102a"><button data-pk102all>${k==L.length?'נקי הכל':'✓ בחרי הכל'}</button><span>${k?`נבחרו ${k}`:'לא נבחרו תמונות'}</span></div>
 <div class="pk102g">${L.map((p,i)=>`<figure data-pk102i="${i}" class="${sel.has(i)?'on':''}"><img src="${p.u}" alt="" loading="lazy"><b>${sel.has(i)?'✓':''}</b><button class="z" data-pk102z="${i}" aria-label="הגדלה">🔍</button><figcaption>${esc(p.n)}</figcaption></figure>`).join('')}</div>
 <div class="pk102f">${canSh?`<button class="go" data-pk102do="share" ${k?'':'disabled'}>📤 שלחי${k?' ('+k+')':''}</button>`:''}<button class="${canSh?'':'go'}" data-pk102do="dl" ${k?'':'disabled'}>⬇ הורידי${k?' ('+k+')':''}</button><button data-pk102do="one" ${k>1?'':'disabled'}>🧩 תמונה אחת מכולן</button></div>
 <p class="pk102n">${canSh?'📤 שלחי – פותח את השיתוף של הטלפון: בוחרים ChatGPT וכל התמונות מצורפות. ':''}🧩 תמונה אחת – כל המסומנות בתמונה אחת עם מספרים, נוח לצרף ל-GPT.</p>`}
const ld102=u=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=u});
async function blob102(u,max){const im=await ld102(u);let W=im.naturalWidth,H=im.naturalHeight;const s=max?Math.min(1,max/Math.max(W,H)):1;W=Math.round(W*s);H=Math.round(H*s);
 const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W,H);x.drawImage(im,0,0,W,H);return await new Promise(ok=>c.toBlob(ok,'image/jpeg',.92))}
const nm102=(id,n)=>(((D[id]||{}).short||'בגד').slice(0,28)+' '+n).replace(/[\\/:*?"<>|]/g,'').replace(/\s+/g,' ').trim()+'.jpg';
async function one102(id,ps){const ims=[];for(const p of ps){try{ims.push([await ld102(p.u),p.n])}catch(_){}}if(!ims.length)throw 0;
 const n=ims.length,cols=n<=3?n:n<=4?2:n<=6?3:4,rows=Math.ceil(n/cols),cw=520,chh=760,lab=44,pad=16;const c=document.createElement('canvas');c.width=cols*cw+(cols+1)*pad;c.height=rows*(chh+lab)+(rows+1)*pad;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);
 x.font='600 26px system-ui,sans-serif';x.textAlign='center';x.direction='rtl';
 ims.forEach(([im,nn],i)=>{const r=Math.floor(i/cols),q=cols-1-(i%cols);const X=pad+q*(cw+pad),Y=pad+r*(chh+lab+pad);const s=Math.min(cw/im.naturalWidth,chh/im.naturalHeight);const w=im.naturalWidth*s,h=im.naturalHeight*s;
  x.drawImage(im,X+(cw-w)/2,Y+(chh-h)/2,w,h);x.fillStyle='#3b2a1e';x.fillText(`${i+1}. ${nn.replace('על האווטאר: ','')}`,X+cw/2,Y+chh+32)});
 return await new Promise(ok=>c.toBlob(ok,'image/jpeg',.9))}
async function save102(files){let dl=null;try{dl=await Promise.race([claude.use('downloads'),new Promise(r=>setTimeout(()=>r(null),1500))])}catch(_){}
 if(dl){let ok=0;for(const [b,name] of files){try{await dl.save({filename:name,data:b});ok++}catch(err){if(err&&err.code=='declined')break}}return ok}
 for(const [b,name] of files){const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(u)},4000);await new Promise(r=>setTimeout(r,350))}return files.length}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('#pk102 [data-pk102x],#pk102 [data-pk102all],#pk102 [data-pk102i],#pk102 [data-pk102do],#pk102 [data-pk102z]');if(!t)return;e.preventDefault();e.stopPropagation();const d=dlgPick102();const {id,L,sel}=PK102;
 if(t.dataset.pk102x!=null){d.close();return}
 if(t.dataset.pk102z!=null){const i=+t.dataset.pk102z;d.close();ZL102=L;ZI102=i;ZI.src=L[i].u;zFit();if(!ZD.open)ZD.showModal();zPaint102();return}
 if(t.dataset.pk102all!=null){if(sel.size==L.length)sel.clear();else L.forEach((_,i)=>sel.add(i));paintPick102();return}
 if(t.dataset.pk102i!=null){const i=+t.dataset.pk102i;sel.has(i)?sel.delete(i):sel.add(i);paintPick102();return}
 const act=t.dataset.pk102do;if(!act||!sel.size)return;const ps=[...sel].sort((a,b)=>a-b).map(i=>L[i]);t.disabled=true;const old=t.textContent;t.textContent='מכינה…';
 try{if(act=='one'){const b=await one102(id,ps);const name=nm102(id,'כל התמונות');if(navigator.canShare&&navigator.share&&innerWidth<820){const f=new File([b],name,{type:'image/jpeg'});if(navigator.canShare({files:[f]})){try{await navigator.share({files:[f]});toast('✓ נשלח');return}catch(err){if(err&&err.name=='AbortError')return}}}
   const n=await save102([[b,name]]);toast(n?'✓ התמונה המשולבת נשמרה':'בוטל');return}
  const fs=[];for(const [i,p] of ps.entries()){try{fs.push([await blob102(p.u,2400),nm102(id,(i+1)+' '+p.n.replace('על האווטאר: ','אווטאר '))])}catch(_){}}if(!fs.length){toast('לא הצלחתי להכין את התמונות');return}
  if(act=='share'){const files=fs.map(([b,n])=>new File([b],n,{type:'image/jpeg'}));try{if(navigator.canShare({files})){await navigator.share({files});toast('✓ נשלח');return}}catch(err){if(err&&err.name=='AbortError')return}toast('השיתוף לא עבד כאן – נסי ⬇ הורידי');return}
  const n=await save102(fs);toast(n?`✓ נשמרו ${n} תמונות`:'בוטל')}catch(err){ERR('v102 pick',err);toast('משהו לא עבד, נסי שוב')}finally{t.disabled=false;t.textContent=old}},true);
// ---- 3. a button under the photo in the garment window
{const _ao=afterOpen;afterOpen=function(id){_ao.apply(this,arguments);try{const m=document.querySelector('#dlbody .dmedia');if(!m)return;m.querySelector('.pk102b')?.remove();const n=all102(id).length;if(n<2)return;
 const w=m.querySelector('.mwrap');(w||m).insertAdjacentHTML('afterend',`<button class="pk102b" data-pk102open="${id}">🖼 כל התמונות (${n}) · לבחור ולהוריד</button>`)}catch(e){ERR('v102 btn',e)}}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-pk102open]');if(!t)return;e.preventDefault();e.stopPropagation();openPick102(t.dataset.pk102open)},true);
window.all102=all102;window.openPick102=openPick102;
}
