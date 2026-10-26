/* ===== v199: "🎨 תסרוקות, קשירות ואיפור" – one place for her styles on the 8-angle avatar.
   Sara 26/10 09:24: "איפה אני שמה את כל הפאות? עם התסרוקות של הפאות, ואיפה אני מעלה את הכיסויים? וגם את כל הסוגים של הקשירות ...
   יש לי כיסוי, אני רוצה לבחור איזה סוג של קשירה ... פאה אחת עם 30 סוגים שונים של תסרוקות" · 09:25 "איפה אני הולכת להעלות את האיפורים ...
   פרומט ... 50 סוגים של איפורים ... בתמונת תקריב, ואז אחרי שאני אוהבת את האיפור, נעשה את זה בכל הכיוונים".
   Each style = one GPT picture of the doll in 8 angles (the prompts are in sty199p.js). The site cuts it (cut8.js: hair / tie / makeup),
   keeps the 8 layers as assets and the style in db 'styles' {set:'hair'|'tie'|'mk', n, t, src, L:[8], M:[8] (tie fabric), lum, cv},
   and the studio (r360.js) wears it: wig → hairstyle, cover → tie (+ colour), makeup. */
(function(){
const ERR=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('v199 '+w+': '+(e&&(e.code||e.message)||e))}catch(_){}};
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=(m,u)=>(window.toast||(()=>{}))(m,u);
const log=(s,x)=>{try{window.step157&&step157(s,x)}catch(_){}};
const V='?v='+(window.VER||'');
const P=()=>window.STYP;
const SETS=[['hair','💇','תסרוקות','תסרוקת','התסרוקת'],['tie','🧕','קשירות','קשירה','הקשירה'],['mk','💄','איפור','איפור','האיפור']];
const SET=k=>SETS.find(s=>s[0]==k)||SETS[0];
const KIND={hair:'hair',tie:'tie',mk:'makeup'};
let DB=null,LIST=[],TAB='hair',PROC=null,ED='',NAME={hair:'',tie:'',mk:''},NUM='';
const R=()=>window.R360;
function push(){try{R()&&R().styles(LIST)}catch(e){ERR('reg',e)}}
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;DB=db;
 db.collection('styles').onSnapshot(sn=>{const L=[];sn.docs.forEach(d=>{const v=d.data();if(v&&v.set&&Array.isArray(v.L))L.push(Object.assign({},v,{id:d.id}))});
  L.sort((a,b)=>(a.t||0)-(b.t||0));LIST=L;push();paint()},e=>ERR('snap',e))}catch(e){ERR('db',e)}})();
const mine=set=>LIST.filter(x=>x.set==set);
const key=x=>{try{return R().styKey(x)}catch(_){return ''}};

// ---------- the library ----------
let DL=null;
function el(){if(DL)return DL;DL=document.createElement('dialog');DL.id='sty199';DL.dir='rtl';DL.setAttribute('aria-labelledby','sty199t');document.body.appendChild(DL);
 DL.addEventListener('click',click);DL.addEventListener('input',e=>{const t=e.target;
  if(t.classList.contains('syname')){NAME[TAB]=t.value;fill()}else if(t.classList.contains('synum')){NUM=t.value.replace(/\D/g,'').slice(0,2);fill()}});
 DL.addEventListener('cancel',e=>{e.preventDefault();DL.close()});return DL}
function open(tab){if(tab&&SETS.some(s=>s[0]==tab))TAB=tab;el();ED='';paint();if(!DL.open)DL.showModal()}
const prompt=set=>{const p=P();if(!p)return '';const n=NAME[set].trim();return set=='hair'?p.hair(n):set=='tie'?p.tie(n):p.face(NUM)};
function fill(){if(!DL)return;DL.querySelectorAll('textarea[data-syp]').forEach(t=>t.value=prompt(t.dataset.syp))}
function status(){if(!PROC)return '';if(PROC.err)return `<p class="syst no" role="alert">✗ ${es(PROC.err)}</p>`;
 return `<p class="syst" aria-live="polite">✂ ${PROC.v<9?`גוזרת ומתאימה לבובה… זווית ${PROC.v} מתוך 8`:'שומרת…'}${PROC.n>1?` · תמונה ${PROC.i} מתוך ${PROC.n}`:''}</p>`}
function tile(x){const k=key(x);return `<div class="syi${ED==x.id?' on':''}"><button type="button" class="sywear" data-sywear="${es(x.id)}" aria-label="ללבוש: ${es(x.n)}"><img alt="" data-sth="${es(k)}" src=""><span>${es(x.n)}</span></button>
 <button type="button" class="syed" data-syed="${es(x.id)}" aria-label="לשנות שם או למחוק: ${es(x.n)}" aria-expanded="${ED==x.id}">⋯</button></div>`}
function edit(x){return `<div class="syedit"><label>שם <input class="syren" value="${es(x.n)}" maxlength="40"></label>
 <span class="mkb"><button type="button" class="mkp" data-syren="${es(x.id)}">✓ לשמור</button><button type="button" data-syre="${es(x.id)}">🔄 להחליף תמונה</button><button type="button" class="sydel" data-sydel="${es(x.id)}">🗑 למחוק</button></span></div>`}
function steps(set){const [,,,one]=SET(set);const nm=`<label class="syl">שם (לא חובה) <input class="syname" value="${es(NAME[set])}" maxlength="40" placeholder="${set=='hair'?'למשל: גלים פתוחים':set=='tie'?'למשל: טורבן גבוה':'למשל: שבת אלגנטית'}"></label>`;
 const pr=`<details><summary>לראות את הפרומפט</summary><textarea readonly rows="9" data-syp="${set}">${es(prompt(set))}</textarea></details>`;
 const up=`<li><b>מעלים את מה שחזר</b> (תמונה אחת עם 8 הזוויות, אפשר כמה ביחד). האתר גוזר, מתאים לבובה ושם בסטודיו.<span class="mkb"><button type="button" class="mkp" data-syup="${set}"${PROC&&!PROC.err?' disabled':''}>📤 להעלות תמונה של 8 זוויות</button></span></li>`;
 if(set=='hair')return `<ol class="mks"><li>${nm}</li>
  <li><b>שומרים 2 תמונות:</b> הבובה ב-8 זוויות והפאה שלך (בשביל הצבע).<span class="mkb"><button type="button" data-sydl="sheet">⬇ הבובה ב-8 זוויות</button><button type="button" data-sydl="wig">⬇ הפאה שלי</button></span></li>
  <li><b>ב-GPT, בהודעה אחת:</b> התמונה של התסרוקת, הפאה, הבובה, ומדביקים את הפרומפט.<span class="mkb"><button type="button" class="mkp" data-sycopy="hair">📋 להעתיק את הפרומפט</button></span>${pr}</li>${up}</ol>
  <p class="sytip">טיפ: את התסרוקת הראשונה אפשר לעשות מהפאה עצמה, כמו שהיא. ככה גם האיפור יישב עליה.</p>`;
 if(set=='tie')return `<ol class="mks"><li>${nm}</li>
  <li><b>שומרים את הבובה</b><span class="mkb"><button type="button" data-sydl="sheet">⬇ הבובה ב-8 זוויות</button></span></li>
  <li><b>ב-GPT, בהודעה אחת:</b> התמונה של הקשירה, הבובה, ומדביקים את הפרומפט.<span class="mkb"><button type="button" class="mkp" data-sycopy="tie">📋 להעתיק את הפרומפט</button></span>${pr}</li>${up}</ol>
  <p class="sytip">המטפחת חוזרת אפורה. בסטודיו בוחרים כיסוי ואז קשירה, והיא נצבעת בצבע של הכיסוי. אפשר גם לבחור צבע אחר.</p>`;
 const p=P();const cats=p?p.MKC.map(([k,t,L])=>`<button type="button" data-sylook="${k}">📋 ${t} <small>${L.length}</small></button>`).join(''):'';
 return `<div class="sy1"><h4>שלב 1 · 50 איפורים בתקריב</h4><p>בכל הודעה ל-GPT: תמונה של הפנים שלך מקדימה, ופרומפט של סוג אחד. חוזרת רשת של איפורים עם מספרים.</p><div class="sycats">${cats}</div></div>
 <h4>שלב 2 · האיפור שאהבת, על האווטאר</h4>
 <ol class="mks"><li>${nm} <label class="syl">מספר המשבצת ברשת <input class="synum" inputmode="numeric" value="${es(NUM)}" maxlength="2" size="3"></label></li>
  <li><b>שומרים</b> את הרשת עם האיפור, ואת הבובה.<span class="mkb"><button type="button" data-sydl="sheet">⬇ הבובה ב-8 זוויות</button></span></li>
  <li><b>ב-GPT, בהודעה אחת:</b> הרשת, הבובה, ומדביקים את הפרומפט.<span class="mkb"><button type="button" class="mkp" data-sycopy="mk">📋 להעתיק את הפרומפט</button></span><details><summary>לראות את הפרומפט</summary><textarea readonly rows="9" data-syp="mk">${es(prompt('mk'))}</textarea></details></li>${up}</ol>`}
function paint(){if(!DL)return;const set=TAB,[,ic,t,one]=SET(set),L=mine(set);
 const x=L.find(y=>y.id==ED);
 DL.innerHTML=`<div class="mk sy"><div class="mkh"><h3 id="sty199t">🎨 תסרוקות, קשירות ואיפור</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="syt" role="tablist" aria-label="סוג">${SETS.map(([k,i,n])=>`<button type="button" role="tab" data-sytab="${k}" aria-selected="${k==set}">${i} ${n}${mine(k).length?` <small>${mine(k).length}</small>`:''}</button>`).join('')}</div>
  ${status()}
  ${L.length?`<p class="syh">${set=='mk'?'האיפורים שלי':set=='hair'?'התסרוקות שלי':'הקשירות שלי'} · לוחצים כדי ללבוש</p><div class="syg">${L.map(tile).join('')}</div>${x?edit(x):''}`:`<p class="syn">${set=='hair'?'עוד אין תסרוקות. כל תסרוקת היא תמונה אחת של 8 זוויות מ-GPT.':set=='tie'?'עוד אין קשירות. כל קשירה היא תמונה אחת של 8 זוויות מ-GPT.':'עוד אין איפורים על האווטאר.'}</p>`}
  <details class="syadd"${L.length?'':' open'}><summary>➕ ${set=='mk'?'להוסיף איפור':'להוסיף '+one}</summary>${steps(set)}</details></div>`;
 DL.querySelectorAll('img[data-sth]').forEach(i=>{const k=i.dataset.sth;if(!k)return;try{R().styThumb(k).then(u=>{if(u)i.src=u})}catch(_){}})}

// ---------- copy, save pictures ----------
async function copy(b,text){let ok=false;try{await navigator.clipboard.writeText(text);ok=true}catch(_){}
 if(!ok){const t=b.closest('li,.sy1')&&b.closest('li,.sy1').querySelector('textarea');try{if(t){const d=t.closest('details');if(d)d.open=true;t.focus();t.select();ok=document.execCommand('copy')}}catch(_){}}
 if(!ok){try{const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0';(DL||document.body).appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי, להעתיק מ"לראות את הפרומפט"';setTimeout(()=>{if(b.isConnected)b.textContent=o},2600)}
async function dl(what){try{const u=what=='wig'?'a8/wig_ref.jpg':'a8/sheet.jpg';const bl=await (await fetch(u+V)).blob();await R().saveFile(what=='wig'?'my-wig.jpg':'avatar-8-angles.jpg',bl)}catch(e){ERR('dl',e);toast_('לא הצלחתי לשמור')}}

// ---------- upload → cut → keep ----------
let FI=null,FSET='',FRE='';
function pick(set,re){FSET=set;FRE=re||'';if(!FI){FI=document.createElement('input');FI.type='file';FI.accept='image/*';FI.hidden=true;document.body.appendChild(FI);
 FI.addEventListener('change',()=>{const fs=[...FI.files];FI.value='';if(fs.length)run(FSET,fs,FRE).catch(e=>ERR('run',e))})}FI.multiple=!re;FI.click()}
const ERRT={shape:'התמונה לא בצורה של הגיליון (2 שורות של 4 משבצות). מעלים את התמונה המלאה שחזרה מ-GPT, בלי לחתוך',
 empty:'לא מצאתי שינוי על הבובה. זו התמונה ש-GPT החזיר?',assets:'שמירת תמונות לא זמינה כאן. לפתוח את האתר ב-Chrome ולנסות שוב',db:'השמירה לא זמינה כאן. לפתוח את האתר ב-Chrome',x:'משהו השתבש. לנסות שוב'};
const blobOf=c=>new Promise(r=>c.toBlob(b=>{if(b&&b.type=='image/webp')return r(b);c.toBlob(r,'image/png')},'image/webp',.92));
async function put1(a,b){let last;for(const w of [0,1500,4000]){if(w)await new Promise(r=>setTimeout(r,w));try{return await a.upload(b)}catch(e){last=e}}throw last}
async function run(set,fs,re){if(PROC&&!PROC.err){toast_('רגע, עוד גוזרת');return}if(!window.cut8)return;
 let a=null;try{a=await claude.use('assets')}catch(_){}
 if(!a||!DB){PROC={err:ERRT[a?'db':'assets']};paint();return}
 const [,,,one,the]=SET(set),base=NAME[set].trim(),done=[];
 for(let i=0;i<fs.length;i++){PROC={v:1,i:i+1,n:fs.length};paint();const t0=Date.now();
  try{const r=await cut8.run(fs[i],KIND[set],v=>{PROC={v:v+1,i:i+1,n:fs.length};const s=DL&&DL.querySelector('.syst');if(s)s.outerHTML=status()});
   if(r.px.filter(x=>x>(set=='mk'?30:150)).length<(set=='mk'?1:5))throw Object.assign(new Error('empty'),{code:'empty'});
   PROC={v:9,i:i+1,n:fs.length};paint();
   const src=(await put1(a,fs[i])).id,L=[];for(let v=0;v<8;v++)L.push(set!='mk'||r.px[v]>3?(await put1(a,await blobOf(r.views[v]))).id:'');
   let M=null;if(r.fab){M=[];for(let v=0;v<8;v++)M.push((await put1(a,await blobOf(r.fab[v]))).id)}
   const old=re&&LIST.find(x=>x.id==re);
   const n=old?old.n:(base?(fs.length>1?`${base} ${i+1}`:base):`${one} ${mine(set).length+done.length+1}`);
   const id=old?old.id:'s'+Date.now().toString(36)+i,doc={set,n,t:old?old.t:Date.now(),src,L,cv:cut8.CV||1};if(M){doc.M=M;doc.lum=r.lum||128}
   await DB.collection('styles').doc(id).set(doc);
   if(!LIST.some(x=>x.id==id))LIST.push(Object.assign({},doc,{id}));else LIST=LIST.map(x=>x.id==id?Object.assign({},doc,{id}):x);
   push();done.push(id);log('sty_ok',{set,id,ms:Date.now()-t0,px:r.px.join(',')})}
  catch(e){ERR('cut',e);log('sty_fail',{set,code:String(e&&(e.code||e.message)||e).slice(0,60)});PROC={err:ERRT[e&&e.code]||ERRT.x};paint();toast_('✗ '+PROC.err);return}}
 PROC=null;if(!re)NAME[set]='';ED='';paint();
 const last=LIST.find(x=>x.id==done[done.length-1]);
 toast_(done.length>1?`✓ ${done.length} ${SET(set)[2]} על האווטאר`:`✓ ${the} על האווטאר`,last?()=>wear(last.id):null)}
function wear(id){const x=LIST.find(y=>y.id==id);if(!x)return;const k=key(x);if(!k)return;try{if(DL&&DL.open)DL.close();R().wearStyle(k)}catch(e){ERR('wear',e)}}
async function rename(id,n){const x=LIST.find(y=>y.id==id);n=String(n||'').trim().slice(0,40);if(!x||!n||!DB)return;
 const doc=Object.assign({},x,{n});delete doc.id;try{await DB.collection('styles').doc(id).set(doc)}catch(e){ERR('ren',e);toast_(ERRT.x);return}
 x.n=n;push();ED='';paint()}
async function del(id){const x=LIST.find(y=>y.id==id);if(!x||!DB)return;const keep=Object.assign({},x);delete keep.id;
 try{await DB.collection('styles').doc(id).delete()}catch(e){ERR('del',e);toast_(ERRT.x);return}
 LIST=LIST.filter(y=>y.id!=id);push();ED='';paint();
 toast_('נמחק',async()=>{try{await DB.collection('styles').doc(id).set(keep);if(!LIST.some(y=>y.id==id))LIST.push(Object.assign({},keep,{id}));LIST.sort((a,b)=>(a.t||0)-(b.t||0));push();paint()}catch(e){ERR('undo',e)}})}

function click(e){if(e.target===DL)return DL.close();const b=e.target.closest('button');if(!b||!DL.contains(b))return;const d=b.dataset;
 if(b.classList.contains('mkx'))return DL.close();
 if(d.sytab){TAB=d.sytab;ED='';PROC=PROC&&PROC.err?null:PROC;paint();const t=DL.querySelector(`[data-sytab="${TAB}"]`);if(t)t.focus();return}
 if(d.sywear)return wear(d.sywear);
 if(d.syed){ED=ED==d.syed?'':d.syed;paint();const i=DL.querySelector('.syren');if(i)i.focus();return}
 if(d.syren){const i=DL.querySelector('.syren');return rename(d.syren,i&&i.value)}
 if(d.syre)return pick(TAB,d.syre);
 if(d.sydel){if(typeof sure=='function'&&!sure(b,'בטוח? לחצי שוב'))return;return del(d.sydel)}
 if(d.sydl)return dl(d.sydl);
 if(d.sycopy)return copy(b,prompt(d.sycopy));
 if(d.sylook){const p=P();if(p)copy(b,p.look(d.sylook));return}
 if(d.syup)return pick(d.syup)}
window.STY199={open,list:()=>LIST.slice()};
})();
