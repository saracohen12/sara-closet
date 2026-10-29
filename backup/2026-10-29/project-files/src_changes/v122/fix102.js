
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
// ---- 4. (v104) "🚀 הכל ל-GPT": prompt copied + her 2 avatar files (cap) + the garment photo, sent together in one tap
const AVF104=[['av/p6c_sheet1.jpg','האווטאר שלי - קובץ 1 (חזית, צד, גב).jpg'],['av/p6c_sheet2.jpg','האווטאר שלי - קובץ 2 (חצי צד, יד על המותן).jpg']];
const RDY104={};
async function files104(id){const L=all102(id);const ph=L[0];const fs=[];
 for(const [u,n] of AVF104){const b=await blob102(u+'?v='+(window.VER||''));fs.push(new File([b],n,{type:'image/jpeg'}))}
 if(ph){const b=await blob102(ph.u,2400);fs.push(new File([b],nm102(id,'הבגד'),{type:'image/jpeg'}))}return fs}
function ready104(id){return RDY104[id]||(RDY104[id]=files104(id).catch(e=>{delete RDY104[id];throw e}))}
async function go104(id,btn){const txt=window.pr102?pr102(id,1):'';try{await navigator.clipboard.writeText(txt)}catch(_){}
 let fs;try{fs=await ready104(id)}catch(e){ERR('v104 files',e);toast('לא הצלחתי להכין את התמונות');return}
 // v106: on a computer the share sheet / one-by-one downloads were confusing (only file 1 came down) – a clear 3-step window instead
 open106(id,fs.slice(0,AVF104.length));return;
 if(navigator.canShare&&navigator.share&&navigator.canShare({files:fs})){try{await navigator.share({files:fs});toast('✓ ב-GPT: מדביקים את הפרומפט (לחיצה ארוכה ← הדבק) ושולחים');return}
  catch(err){if(err&&err.name=='AbortError')return;if(btn){btn.textContent='📤 לחצי שוב לשליחה';btn.dataset.again=1}toast('התמונות מוכנות – לחצי שוב לשליחה');return}}
 const n=await save102(fs.map(f=>[f,f.name]));try{if(window.gptOpen93)await gptOpen93(txt,false)}catch(_){}
 toast(n?`✓ הפרומפט הועתק ו-${n} תמונות ירדו. ב-GPT: מצרפים את 3 התמונות ומדביקים`:'בוטל')}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-go104]');if(!t)return;e.preventDefault();e.stopPropagation();go104(t.dataset.go104,t)},true);
// prepare the pictures as soon as the garment window opens, so the tap shares at once
{const _ao=afterOpen;afterOpen=function(id){_ao.apply(this,arguments);try{if(window.want96&&!want96())return;setTimeout(()=>{if(CUR==id)ready104(id).catch(()=>{})},800)}catch(_){}}}
window.go104=go104;
// ---- 5. (v106–v108) one window for the computer and the phone: 1) the prompt (copied, can be seen) 2) her 2 avatar files + the garment
// photos she ticks (front, side, back… – as many as she has) 3) ⬇ download / 📤 share 4) open GPT. The prompt counts the photos.
// v109: several downloads in a row came down as one file only – the pictures go in ONE zip (stored, UTF-8 names)
const CRC109=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc109=u=>{let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRC109[(c^u[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0};
async function zip109(files){const enc=new TextEncoder();const parts=[],cen=[];let off=0;
 for(const f of files){const d=new Uint8Array(await f.arrayBuffer()),nm=enc.encode(f.name),crc=crc109(d);
  const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint32(14,crc,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nm.length,true);
  parts.push(h,nm,d);const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint32(16,crc,true);c.setUint32(20,d.length,true);c.setUint32(24,d.length,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
  cen.push(c,nm);off+=30+nm.length+d.length}
 const cs=cen.reduce((a,x)=>a+x.byteLength,0);const e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
 return new Blob([...parts,...cen,e],{type:'application/zip'})}
const G106={id:null,av:[],ph:[],sel:new Set([0]),B:{},got:0};
const ph106=id=>all102(id).filter(p=>!/^על האווטאר/.test(p.n));
const txt106=()=>window.pr102?pr102(G106.id,G106.sel.size):'';
function dlg106(){let d=document.getElementById('g106');if(!d){d=document.createElement('dialog');d.id='g106';d.className='sheet9';d.dir='rtl';document.body.appendChild(d)}return d}
const phone106=()=>innerWidth<820&&!!(navigator.canShare&&navigator.share);
function blobPh106(i){const p=G106.ph[i];return G106.B[p.u]||(G106.B[p.u]=blob102(p.u,2400).catch(e=>{delete G106.B[p.u];throw e}))}
async function files106(){const fs=G106.av.slice();const idx=[...G106.sel].sort((a,b)=>a-b);for(const [k,i] of idx.entries()){try{const b=await blobPh106(i);fs.push(new File([b],nm102(G106.id,idx.length>1?'הבגד '+(k+1):'הבגד'),{type:'image/jpeg'}))}catch(_){}}return fs}
function paint106(){const d=dlg106();const op=!!d.querySelector('.g106p[open]');const {av,ph,sel}=G106;const n=av.length+sel.size;const tel=phone106();
 d.innerHTML=`<div class="sh9h"><h3>🚀 שליחה ל-GPT</h3><button class="x" data-g106="x" aria-label="סגירה">✕</button></div><div class="g106b">
 <div class="g106s"><b>1</b><div><p>בחרי תמונות של הבגד (✓) – אפשר כמה: חזית, צד, גב…</p><div class="g106g g106ph">${ph.map((p,i)=>`<button class="g106t${sel.has(i)?' on':''}" data-g106="t${i}"><img src="${esc(p.u)}" alt="" loading="lazy"><i>${sel.has(i)?'✓':''}</i><small>${esc(p.n)}</small></button>`).join('')}</div>
 <p class="g106av">+ שני קבצי האווטאר שלך: <img src="${av[0]&&(av[0].u106||(av[0].u106=URL.createObjectURL(av[0])))||''}" alt=""><img src="${av[1]&&(av[1].u106||(av[1].u106=URL.createObjectURL(av[1])))||''}" alt=""></p></div></div>
 <div class="g106s"><b>2</b><div><p>${tel?`שולחים את ${n} התמונות יחד, ובוחרים <b>ChatGPT</b>:`:`מורידים את ${n} התמונות למחשב. בזיפ: פותחים אותו (לחיצה כפולה) וגוררים את התמונות ל-GPT.`}</p>
 <button class="go" data-g106="${tel?'share':'zip'}">${tel?`📤 לשלוח ${n} תמונות`:`⬇ להוריד את ${n} התמונות (זיפ אחד)`}</button>${G106.got?`<small>✓ ${esc(G106.got)}</small>`:''}
 ${tel?'':`<p class="g106one">או אחת-אחת: ${[...Array(n).keys()].map(i=>`<button data-g106="o${i}">${G106.one&&G106.one.has(i)?'✓':'⬇'} ${i<2?'אווטאר '+(i+1):'בגד '+(i-1)}</button>`).join('')}</p>`}</div></div>
 <div class="g106s"><b>3</b><div><p>הפרומפט הועתק ✓ – ב-GPT מדביקים אותו (${tel?'לחיצה ארוכה ← הדבק':'Ctrl+V'}). כתוב בו ש${esc(typeWord102(G106.id).a)} זה מה שקנית ושיש ${sel.size} תמונות של הבגד.</p>
 <details class="g106p"${op?' open':''}><summary>👁 לראות את הפרומפט</summary><pre>${esc(txt106())}</pre></details><button data-g106="cp">📋 להעתיק שוב</button></div></div>
 ${tel?'':`<div class="g106s"><b>4</b><div><p>לפתוח את GPT. שם: לוחצים <b>＋</b> ← מעלים את ${n} התמונות מהתיקייה <b>הורדות</b> ← <b>Ctrl+V</b> ← שליחה.</p><button class="go" data-g106="gpt">פתחי את GPT ↗</button></div></div>`}
 <p class="g106n">GPT יחזיר 2 תמונות. שומרים אותן ומעלים כאן ב-"📥 בגד מ-GPT · 2 קבצים".</p></div>`;try{window.after106&&after106(d)}catch(_){}}
function open106(id,av){Object.assign(G106,{id,av,ph:ph106(id),sel:new Set([0]),got:0,one:new Set()});if(!G106.ph.length)G106.sel.clear();paint106();const d=dlg106();if(!d.open)d.showModal();if(G106.ph.length)blobPh106(0).catch(()=>{})}
const copy106=async()=>{try{await navigator.clipboard.writeText(txt106());return true}catch(_){return false}};
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('#g106 [data-g106]');if(!t)return;e.preventDefault();e.stopPropagation();const a=t.dataset.g106;
 if(a=='x'){dlg106().close();return}
 if(a[0]=='t'){const i=+a.slice(1);G106.sel.has(i)?G106.sel.delete(i):G106.sel.add(i);G106.one=new Set();if(G106.sel.has(i))blobPh106(i).catch(()=>{});copy106();paint106();return}
 if(a=='cp'){toast(await copy106()?'✓ הפרומפט הועתק':'לא הצלחתי להעתיק');return}
 if(a=='gpt'){try{await gptOpen93(txt106(),false)}catch(_){}return}
 copy106();t.disabled=true;const old=t.textContent;t.textContent='מכינה…';
 try{const fs=await files106();
  if(a=='share'){try{await navigator.share({files:fs});toast('✓ ב-GPT: לחיצה ארוכה ← הדבק, ושולחים');return}catch(err){if(err&&err.name=='AbortError')return;toast('לחצי שוב לשליחה');return}}
  if(a[0]=='o'){const i=+a.slice(1);const f=fs[i];if(!f)return;const n=await save102([[f,f.name]]);if(n){(G106.one||(G106.one=new Set())).add(i);toast('✓ ירדה')}return}
  const zb=await zip109(fs);const n=await save102([[zb,nm102(G106.id,'ל-GPT').replace(/\.jpg$/,'')+'.zip']]);if(n){G106.got=`ירד זיפ עם ${fs.length} תמונות`;toast('✓ הזיפ ירד – עכשיו שלב 4')}}
 catch(err){ERR('v108 g106',err);toast('משהו לא עבד, נסי שוב')}finally{t.disabled=false;t.textContent=old;paint106()}},true);
window.open106=open106;window.blob102=blob102;window.save102=save102;window.zip109=zip109;window.G106=G106;window.paint106=paint106;window.copy106=copy106;
}
