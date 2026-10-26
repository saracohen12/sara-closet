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
// v204 (Sara 26/10 11:38 "רשום לי פה את ה-20 קשירות ... לא מספיק לי את השם, אני רוצה לראות פיזית איך זה נראה ... להוסיף קשירה ... וככה גם באיפור
// וגם בתסרוקת. לא רוצה שמות, אני רוצה לראות את הכל"): every style is a card with its picture – the avatar wearing it once it is uploaded
// (front and back; makeup: the face), the doll waiting for it before; each card has its own prompt and upload; "➕" adds one from her own picture.
// Makeup: the grid GPT returns in step 1 is uploaded per category, and every look shows its own square from it.
let DL=null,VW=null,ADD=false,MKG={};
const LIBC=[176,124,138];   // the ties in the library: one soft colour for all (on a cover they take the cover's colour)
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;db.collection('stylegrid').onSnapshot(sn=>{const g={};sn.docs.forEach(d=>{const v=d.data();if(v&&v.src)g[d.id]=v.src});MKG=g;paint()},e=>ERR('gsnap',e))}catch(e){ERR('gdb',e)}})();
function presets(set){const p=P();if(!p)return [];
 if(set=='tie')return p.TIES.map(([n,d],i)=>({k:'t'+i,no:i+1,n,d}));
 if(set=='hair')return (p.HAIRS||[]).map(([n,d],i)=>({k:'h'+i,no:i+1,n,d}));
 return p.MKC.flatMap(([c,t,L])=>L.map((x,i)=>({k:'m:'+c+':'+i,no:i+1,n:x.split(':')[0].trim(),sub:x.split(':').slice(1).join(':').trim(),c})))}
const preOf=(set,k)=>presets(set).find(x=>x.k==k);
function doneOf(set,pr){const L=mine(set);return L.find(x=>x.p==pr.k)||L.find(x=>!x.p&&x.n==pr.n)||null}
const extras=set=>{const used=new Set(presets(set).map(pr=>(doneOf(set,pr)||{}).id).filter(Boolean));return mine(set).filter(x=>!used.has(x.id))};
function el(){if(DL)return DL;DL=document.createElement('dialog');DL.id='sty199';DL.dir='rtl';DL.setAttribute('aria-labelledby','sty199t');document.body.appendChild(DL);
 DL.addEventListener('click',click);DL.addEventListener('input',e=>{const t=e.target;
  if(t.classList.contains('syname')){NAME[TAB]=t.value;fill()}else if(t.classList.contains('synum')){NUM=t.value.replace(/\D/g,'').slice(0,2);fill()}});
 DL.addEventListener('pointerover',e=>{if(e.pointerType!='mouse'||still())return;const b=e.target.closest('.syrot');if(b&&!b._t&&!(e.relatedTarget&&b.contains(e.relatedTarget)))turn(b,true)});
 DL.addEventListener('pointerout',e=>{if(e.pointerType!='mouse')return;const b=e.target.closest('.syrot');if(b&&!(e.relatedTarget&&b.contains(e.relatedTarget)))stopRot(b,b._F)});
 DL.addEventListener('cancel',e=>{e.preventDefault();DL.close()});return DL}
function open(tab){if(tab&&SETS.some(s=>s[0]==tab))TAB=tab;el();ED='';ADD=false;paint();if(!DL.open)DL.showModal();DL.scrollTop=0}
const prompt=set=>{const p=P();if(!p)return '';const n=NAME[set].trim();return set=='hair'?p.hair(n):set=='tie'?p.tie(n):p.face(NUM)};
function prompt2(set,pr){const p=P();if(!p||!pr)return '';return set=='tie'?p.tieW(pr.n,pr.d):set=='hair'?p.hairW(pr.n,pr.d):p.face(pr.no)}
function fill(){if(!DL)return;DL.querySelectorAll('textarea[data-syp]').forEach(t=>t.value=prompt(t.dataset.syp))}
function status(){if(!PROC)return '';if(PROC.err)return `<p class="syst no" role="alert">✗ ${es(PROC.err)}</p>`;
 return `<p class="syst" aria-live="polite">✂ ${PROC.n0?es(PROC.n0)+': ':''}${PROC.v<9?`גוזרת ומתאימה לבובה… זווית ${PROC.v} מתוך 8`:'שומרת…'}${PROC.n>1?` · תמונה ${PROC.i} מתוך ${PROC.n}`:''}</p>`}
const busy=()=>!!(PROC&&!PROC.err);
function card(set,pr,x){const k=pr?pr.k:x.id,b=busy()&&PROC.k==k,title=x?x.n:pr.n;   // her own name once she renamed it
 // v204 (Sara 11:46 "אני אגע בתמונה ואז הבובה תסתובב ... אני צריכה לפחות את זה פי 3 בגודל"): one big picture that turns – touch it (or the mouse over it); ⋯ = all 8, name, replace
 const pic=x&&set!='mk'?`<span class="sycim tall"><button type="button" class="syrot" data-syrot aria-label="לסובב את הבובה: ${es(title)}"><img alt="" data-syf="${es(key(x))}" src=""></button><span class="sy8" aria-hidden="true">🔄 נגיעה מסובבת</span><button type="button" class="symore" data-syview="${es(x.id)}" aria-label="8 הזוויות, שם, החלפה: ${es(title)}">⋯</button></span>`
  :x?`<button type="button" class="sycim" data-syview="${es(x.id)}" aria-label="לראות ב-8 זוויות: ${es(title)}"><img alt="" data-syc="${es(key(x))}" src=""><span class="sy8">👀 8 זוויות</span></button>`
  :set=='mk'&&pr&&MKG[pr.c]?`<span class="sycim cell"><img alt="" data-sycell="${es(pr.k)}" src=""></span>`
  :`<span class="sycim none${set!='mk'?' tall':''}"><img alt="" data-sycb="${set}" src=""><i>עוד אין תמונה</i></span>`;
 const btn=b?'<span class="sycw">✂ גוזרת…</span>':x?`<button type="button" class="mkp" data-sywear="${es(x.id)}">👗 ללבוש</button>`
  :`<button type="button" data-syp2="${es(pr.k)}">📋 פרומפט</button><button type="button" class="mkp" data-syup2="${es(pr.k)}"${busy()?' disabled':''}>📤 להעלות</button>`;
 return `<div class="syc${x?' up':''}${b?' busy':''}">${pic}<b class="sycn">${pr?pr.no+'. ':''}${es(title)}</b>${pr&&pr.sub?`<small class="sycs">${es(pr.sub)}</small>`:''}<span class="sycb">${btn}</span></div>`}
const addCard=set=>{const one=SET(set)[3];return `<button type="button" class="syc sycadd" data-syadd aria-expanded="${ADD}"><span class="sycim"><b aria-hidden="true">＋</b></span><b class="sycn">להוסיף ${one}</b><small class="sycs">לפי תמונה שלך</small></button>`};
function how(set){const sheet='<button type="button" data-sydl="sheet">⬇ הבובה ב-8 זוויות</button>';
 if(set=='tie')return `<div class="syhow"><p><b>בכל קשירה:</b> 📋 מעתיקים, ב-GPT בשיחה חדשה מצרפים את הבובה ומדביקים, ואת מה שחזר 📤 מעלים באותה משבצת. מיד רואים אותה עלייך.</p><span class="mkb">${sheet}</span></div>`;
 if(set=='hair')return `<div class="syhow"><p><b>בכל תסרוקת:</b> 📋 מעתיקים, ב-GPT בשיחה חדשה מצרפים את הפאה שלך ואת הבובה ומדביקים, ואת מה שחזר 📤 מעלים באותה משבצת.</p><span class="mkb">${sheet}<button type="button" data-sydl="wig">⬇ הפאה שלי</button></span></div>`;
 return `<div class="syhow"><p><b>שלב 1:</b> בכל קבוצה 📋 פרומפט לרשת, ב-GPT עם תמונה של הפנים שלך מקדימה. את הרשת שחזרה 📷 מעלים, וכל איפור מקבל את התמונה שלו.</p>
  <p><b>שלב 2:</b> באיפור שאהבת 📋, ב-GPT מצרפים את הרשת ואת הבובה, ואת מה שחזר 📤 מעלים באותה משבצת.</p><span class="mkb">${sheet}</span></div>`}
function addPanel(set){const [,,,one]=SET(set);const nm=`<label class="syl">שם <input class="syname" value="${es(NAME[set])}" maxlength="40" placeholder="${set=='hair'?'למשל: גלים פתוחים':set=='tie'?'למשל: טורבן גבוה':'למשל: שבת אלגנטית'}"></label>`;
 const pr=`<details><summary>לראות את הפרומפט</summary><textarea readonly rows="9" data-syp="${set}">${es(prompt(set))}</textarea></details>`;
 const att=set=='hair'?'התמונה של התסרוקת, הפאה שלך והבובה':set=='tie'?'התמונה של הקשירה, ואחריה הבובה':'התמונה של האיפור, ואחריה הבובה';
 return `<div class="syaddp" id="syaddp"><h4>➕ ${set=='mk'?'איפור חדש':one+' חדשה'}, לפי תמונה שלך</h4><ol class="mks"><li>${nm}</li>
  <li><b>שומרים</b> את הבובה${set=='hair'?' ואת הפאה':''}.<span class="mkb"><button type="button" data-sydl="sheet">⬇ הבובה ב-8 זוויות</button>${set=='hair'?'<button type="button" data-sydl="wig">⬇ הפאה שלי</button>':''}</span></li>
  <li><b>ב-GPT, בהודעה אחת:</b> ${att}, ומדביקים את הפרומפט.<span class="mkb"><button type="button" class="mkp" data-sycopy="${set}">📋 להעתיק את הפרומפט</button></span>${pr}</li>
  <li><b>מעלים את מה שחזר</b> (תמונה אחת עם 8 הזוויות).<span class="mkb"><button type="button" class="mkp" data-syup="${set}"${busy()?' disabled':''}>📤 להעלות</button></span></li></ol></div>`}
// the turn: a touch = one full turn back to the front; the mouse over it = turning until it leaves
const still=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(_){return false}};
function stopRot(b,F){if(b&&b._t){clearInterval(b._t);b._t=null;const i=b.querySelector('img');if(i&&F&&F[0])i.src=F[0]}}
function turn(b,loop){const img=b&&b.querySelector('img[data-syf]');if(!img)return;const k=img.dataset.syf,x=LIST.find(y=>key(y)==k);if(!x||!R().styFrames)return;
 R().styFrames(k,{rgb:x.set=='tie'?LIBC:null}).then(F=>{if(F.length<8)return;if(b._t)clearInterval(b._t);b._F=F;let i=0,n=0;
  b._t=setInterval(()=>{if(!img.isConnected){clearInterval(b._t);b._t=null;return}i=(i+1)%8;n++;img.src=F[i];if(!loop&&n>=8)stopRot(b,F)},loop?190:150)})}
function grid(set,list){return `<div class="syg2">${list.join('')}</div>`}
function body(set){const ex=extras(set).map(x=>card(set,null,x));
 if(set!='mk')return grid(set,[...presets(set).map(pr=>card(set,pr,doneOf(set,pr))),...ex,addCard(set)])+(set=='tie'?'<p class="sytip">הקשירות כאן בצבע אחד לדוגמה. על כיסוי היא נצבעת בצבע של הכיסוי.</p>':'');
 const p=P();if(!p)return '';const all=presets('mk');
 return p.MKC.map(([c,t,L])=>`<section class="sycat"><h4>${es(t)} <small>${L.length}</small></h4>
  <span class="mkb"><button type="button" data-sylook="${c}">📋 פרומפט לרשת</button><button type="button" data-sygrid="${c}"${busy()?' disabled':''}>📷 ${MKG[c]?'להחליף את הרשת':'להעלות את הרשת'}</button></span>
  ${grid(set,all.filter(pr=>pr.c==c).map(pr=>card(set,pr,doneOf(set,pr))))}</section>`).join('')+(ex.length?`<section class="sycat"><h4>שלי</h4>${grid(set,ex)}</section>`:'')+grid(set,[addCard(set)])}
function paint(){if(!DL)return;const set=TAB,y=DL.scrollTop;
 DL.innerHTML=`<div class="mk sy"><div class="mkh"><h3 id="sty199t">🎨 תסרוקות, קשירות ואיפור</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="syt" role="tablist" aria-label="סוג">${SETS.map(([k,i,n])=>`<button type="button" role="tab" data-sytab="${k}" aria-selected="${k==set}">${i} ${n}${mine(k).length?` <small>${mine(k).length}</small>`:''}</button>`).join('')}</div>
  ${status()}${how(set)}${body(set)}${ADD?addPanel(set):''}</div>`;
 DL.scrollTop=y;pics(DL)}
function pics(root){const r=R();if(!r||!r.styCard)return;
 root.querySelectorAll('img[data-syc]').forEach(i=>{const k=i.dataset.syc;if(!k)return;const x=LIST.find(y=>key(y)==k);r.styCard(k,{rgb:x&&x.set=='tie'?LIBC:null}).then(u=>{if(u)i.src=u})});
 root.querySelectorAll('img[data-sycb]').forEach(i=>r.styCard('',{set:i.dataset.sycb,one:i.dataset.sycb!='mk'}).then(u=>{if(u)i.src=u}));
 root.querySelectorAll('img[data-syf]').forEach(i=>{const k=i.dataset.syf;if(!k||!r.styFrames)return;const x=LIST.find(y=>key(y)==k);r.styFrames(k,{rgb:x&&x.set=='tie'?LIBC:null}).then(F=>{if(F[0])i.src=F[0]})});
 root.querySelectorAll('img[data-sycell]').forEach(i=>cell(i.dataset.sycell).then(u=>{if(u)i.src=u}))}
// one look's square out of the category grid (rows × columns as the step-1 prompt asks), a little inside so the lines and numbers stay out
const GIMG={},CELL={};
function cell(k){if(CELL[k])return Promise.resolve(CELL[k]);const pr=preOf('mk',k),p=P();if(!pr||!p||!MKG[pr.c])return Promise.resolve('');const src=MKG[pr.c];
 const [,,L]=p.MKC.find(x=>x[0]==pr.c),[rows,cols]=(p.GRID&&p.GRID[L.length])||[3,3],i=pr.no-1,r=Math.floor(i/cols),c=i%cols;
 GIMG[src]=GIMG[src]||new Promise(res=>{const m=new Image();m.onload=()=>res(m);m.onerror=()=>res(null);m.src='/_blob/'+src});
 return GIMG[src].then(m=>{if(!m)return '';const cw=m.naturalWidth/cols,ch=m.naturalHeight/rows,ins=.06,o=document.createElement('canvas');o.width=240;o.height=Math.round(240*ch/cw);
  o.getContext('2d').drawImage(m,c*cw+cw*ins,r*ch+ch*ins,cw*(1-2*ins),ch*(1-2*ins),0,0,o.width,o.height);return CELL[k]=o.toDataURL('image/jpeg',.85)})}
// the 8 angles of one style, its name, wear / replace / delete
function view(id){const x=LIST.find(y=>y.id==id);if(!x)return;if(!VW){VW=document.createElement('dialog');VW.id='sty204v';VW.dir='rtl';VW.setAttribute('aria-labelledby','sty204vt');document.body.appendChild(VW);
  VW.addEventListener('cancel',e=>{e.preventDefault();VW.close()});VW.addEventListener('click',vclick)}
 VW.dataset.id=id;VW.innerHTML=`<div class="mk"><div class="mkh"><h3 id="sty204vt">${es(x.n)}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="sy8v"><img alt="${es(x.n)} ב-8 זוויות" src=""><span class="syld">רגע…</span></div>
  ${x.set=='tie'?'<p class="sytip">בצבע לדוגמה. על כיסוי היא בצבע של הכיסוי.</p>':''}
  <span class="mkb"><button type="button" class="mkp" data-sywear="${es(id)}">👗 ללבוש בסטודיו</button><button type="button" data-syre="${es(id)}">🔄 להחליף תמונה</button><button type="button" class="sydel" data-sydel="${es(id)}">🗑 למחוק</button></span>
  <label class="syl syrenl">שם <input class="syren" value="${es(x.n)}" maxlength="40"><button type="button" data-syren="${es(id)}">✓ לשמור</button></label></div>`;
 if(!VW.open)VW.showModal();const img=VW.querySelector('.sy8v img');
 try{R().styCard(key(x),{all:1,rgb:x.set=='tie'?LIBC:null}).then(u=>{if(u&&img.isConnected){img.src=u;const l=VW.querySelector('.syld');if(l)l.remove()}})}catch(e){ERR('view',e)}}
function vclick(e){if(e.target===VW)return VW.close();const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(b.classList.contains('mkx'))return VW.close();
 if(d.sywear){VW.close();return wear(d.sywear)}
 if(d.syre){VW.close();return pick(TAB,d.syre)}
 if(d.syren){const i=VW.querySelector('.syren');return rename(d.syren,i&&i.value).then(()=>{const h=VW.querySelector('h3');if(h&&i)h.textContent=i.value.trim()})}
 if(d.sydel){if(typeof sure=='function'&&!sure(b,'בטוח? לחצי שוב'))return;VW.close();return del(d.sydel)}}

// ---------- copy, save pictures ----------
async function copy(b,text){let ok=false;try{await navigator.clipboard.writeText(text);ok=true}catch(_){}
 if(!ok){const t=b.closest('li,.sy1')&&b.closest('li,.sy1').querySelector('textarea');try{if(t){const d=t.closest('details');if(d)d.open=true;t.focus();t.select();ok=document.execCommand('copy')}}catch(_){}}
 if(!ok){try{const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0';(DL||document.body).appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי, להעתיק מ"לראות את הפרומפט"';setTimeout(()=>{if(b.isConnected)b.textContent=o},2600)}
async function dl(what){try{const u=what=='wig'?'a8/wig_ref.jpg':'a8/sheet.jpg';const bl=await (await fetch(u+V)).blob();await R().saveFile(what=='wig'?'my-wig.jpg':'avatar-8-angles.jpg',bl)}catch(e){ERR('dl',e);toast_('לא הצלחתי לשמור')}}

// ---------- upload → cut → keep ----------
let FI=null,FSET='',FRE='',FPRE=null,FG='';
function pick(set,re,pre,g){FSET=set;FRE=re||'';FPRE=pre||null;FG=g||'';if(!FI){FI=document.createElement('input');FI.type='file';FI.accept='image/*';FI.hidden=true;document.body.appendChild(FI);
 FI.addEventListener('change',()=>{const fs=[...FI.files];FI.value='';if(!fs.length)return;if(FG)return grid1(FG,fs[0]).catch(e=>ERR('grid',e));run(FSET,fs,FRE,FPRE).catch(e=>ERR('run',e))})}FI.multiple=!re&&!pre&&!g;FI.click()}
// makeup step 1: the grid GPT returned for one category → every look of it shows its square (db 'stylegrid' {src}, one per category)
async function grid1(c,f){let a=null;try{a=await claude.use('assets')}catch(_){}if(!a||!DB){PROC={err:ERRT[a?'db':'assets']};paint();return}
 toast_('שומרת את הרשת…');try{const src=(await put1(a,f)).id;await DB.collection('stylegrid').doc(c).set({src,t:Date.now()});MKG[c]=src;Object.keys(CELL).forEach(k=>{if(k.startsWith('m:'+c+':'))delete CELL[k]});paint();
  const t=(P().MKC.find(x=>x[0]==c)||[])[1]||'';toast_(`✓ הרשת של ${t} באתר. עכשיו רואים כל איפור`);log('grid_ok',{c})}catch(e){ERR('grid',e);toast_('✗ '+ERRT.x)}}
const ERRT={shape:'התמונה לא בצורה של הגיליון (2 שורות של 4 משבצות). מעלים את התמונה המלאה שחזרה מ-GPT, בלי לחתוך',
 empty:'לא מצאתי שינוי על הבובה. זו התמונה ש-GPT החזיר?',assets:'שמירת תמונות לא זמינה כאן. לפתוח את האתר ב-Chrome ולנסות שוב',db:'השמירה לא זמינה כאן. לפתוח את האתר ב-Chrome',x:'משהו השתבש. לנסות שוב'};
const blobOf=c=>new Promise(r=>c.toBlob(b=>{if(b&&b.type=='image/webp')return r(b);c.toBlob(r,'image/png')},'image/webp',.92));
async function put1(a,b){let last;for(const w of [0,1500,4000]){if(w)await new Promise(r=>setTimeout(r,w));try{return await a.upload(b)}catch(e){last=e}}throw last}
async function run(set,fs,re,pre){if(PROC&&!PROC.err){toast_('רגע, עוד גוזרת');return}if(!window.cut8)return;
 let a=null;try{a=await claude.use('assets')}catch(_){}
 if(!a||!DB){PROC={err:ERRT[a?'db':'assets']};paint();return}
 const [,,,one,the]=SET(set),base=pre?pre.n:NAME[set].trim(),done=[],pk=pre?pre.k:(re||'add');
 for(let i=0;i<fs.length;i++){PROC={v:1,i:i+1,n:fs.length,k:pk,n0:base};paint();const t0=Date.now();
  try{const r=await cut8.run(fs[i],KIND[set],v=>{PROC={v:v+1,i:i+1,n:fs.length,k:pk,n0:base};const s=DL&&DL.querySelector('.syst');if(s)s.outerHTML=status()});
   if(r.px.filter(x=>x>(set=='mk'?30:150)).length<(set=='mk'?1:5))throw Object.assign(new Error('empty'),{code:'empty'});
   PROC={v:9,i:i+1,n:fs.length,k:pk,n0:base};paint();
   const src=(await put1(a,fs[i])).id,L=[];for(let v=0;v<8;v++)L.push(set!='mk'||r.px[v]>3?(await put1(a,await blobOf(r.views[v]))).id:'');
   let M=null;if(r.fab){M=[];for(let v=0;v<8;v++)M.push((await put1(a,await blobOf(r.fab[v]))).id)}
   const old=re&&LIST.find(x=>x.id==re);
   const n=old?old.n:(base?(fs.length>1?`${base} ${i+1}`:base):`${one} ${mine(set).length+done.length+1}`);
   const id=old?old.id:'s'+Date.now().toString(36)+i,doc={set,n,t:old?old.t:Date.now(),src,L,cv:cut8.CV||1};if(M){doc.M=M;doc.lum=r.lum||128}const pp=pre?pre.k:old&&old.p;if(pp)doc.p=pp;
   await DB.collection('styles').doc(id).set(doc);
   if(!LIST.some(x=>x.id==id))LIST.push(Object.assign({},doc,{id}));else LIST=LIST.map(x=>x.id==id?Object.assign({},doc,{id}):x);
   push();done.push(id);log('sty_ok',{set,id,ms:Date.now()-t0,px:r.px.join(',')})}
  catch(e){ERR('cut',e);log('sty_fail',{set,code:String(e&&(e.code||e.message)||e).slice(0,60)});PROC={err:ERRT[e&&e.code]||ERRT.x};paint();toast_('✗ '+PROC.err);return}}
 PROC=null;if(!re&&!pre&&NAME[set].trim()==base){NAME[set]='';ADD=false}ED='';paint();   // a name she typed meanwhile for the next one stays
 const last=LIST.find(x=>x.id==done[done.length-1]);
 toast_(done.length>1?`✓ ${done.length} ${SET(set)[2]} על האווטאר`:`✓ ${the} על האווטאר`)}   // v204: no action – the toast's button reads "ביטול"
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
 if(d.sytab){TAB=d.sytab;ED='';ADD=false;PROC=PROC&&PROC.err?null:PROC;paint();DL.scrollTop=0;const t=DL.querySelector(`[data-sytab="${TAB}"]`);if(t)t.focus();return}
 if(d.sywear)return wear(d.sywear);
 if(d.syview)return view(d.syview);
 if(d.syrot!=null){if(still()){const c=b.closest('.syc'),v=c&&c.querySelector('[data-syview]');if(v)view(v.dataset.syview);return}if(!b._t||e.pointerType!='mouse')turn(b,false);return}
 if(d.syadd!=null){ADD=!ADD;paint();if(ADD){const a=DL.querySelector('#syaddp');if(a){a.scrollIntoView({block:'start',behavior:'smooth'});const i=a.querySelector('.syname');if(i)setTimeout(()=>i.focus({preventScroll:true}),350)}}return}
 if(d.sydl)return dl(d.sydl);
 if(d.sycopy)return copy(b,prompt(d.sycopy));
 if(d.sylook){const p=P();if(p)copy(b,p.look(d.sylook));return}
 if(d.sygrid){if(busy())return toast_('רגע, עוד גוזרת');return pick('mk','',null,d.sygrid)}
 if(d.syp2){const pr=preOf(TAB,d.syp2);if(pr)copy(b,prompt2(TAB,pr));return}
 if(d.syup2){const pr=preOf(TAB,d.syup2);if(pr)pick(TAB,'',pr);return}
 if(d.syup)return pick(d.syup)}
window.STY199={open,list:()=>LIST.slice()};
})();
