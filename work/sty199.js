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
const V='?v='+(window.A8V||window.VER||'');
const P=()=>window.STYP;
const SETS=[['hair','💇','תסרוקות','תסרוקת','התסרוקת'],['tie','🧕','קשירות','קשירה','הקשירה'],['mk','💄','איפור','איפור','האיפור']];
const SET=k=>SETS.find(s=>s[0]==k)||SETS[0];
const KIND={hair:'hair',tie:'tie',mk:'makeup'};
let DB=null,LIST=[],TAB='hair',PROC=null,ED='',NAME={hair:'',tie:'',mk:''},NUM='',DESC='';
// v206 (Sara 13:33 "אם יש דגם שאני לא אוהבת תן לי אפשרות להסיר אותו ... גם בתסרוקות ובאיפורים"): 🗑 on every card hides it – a preset by its key,
// her own upload by 'id:'+id – here and in the studio; db 'stylehide'/'all' {k:[…]}; "↩ מה שהסרתי" brings it back. Nothing is deleted.
let HID=new Set(),SHOWH=false;
const hidK=(pr,x)=>pr?pr.k:'id:'+x.id;
const gone=x=>HID.has('id:'+x.id)||!!(x.p&&HID.has(x.p))||(!x.p&&HID.size>0&&presets(x.set).some(pr=>pr.n==x.n&&HID.has(pr.k)));
const R=()=>window.R360;
// v267: nothing goes to the studio before her styles have loaded – an empty list used to reset her tie, hairstyle and makeup on the avatar
let SLOAD=false,HLOAD=false,OPEND=false;
function push(){if(!SLOAD)return;try{R()&&R().styles(LIST.filter(x=>!gone(x)))}catch(e){ERR('reg',e)}}
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;DB=db;
 db.collection('styles').onSnapshot(sn=>{const L=[];sn.docs.forEach(d=>{const v=d.data();if(v&&v.set&&Array.isArray(v.L))L.push(Object.assign({},v,{id:d.id}))});
  L.sort((a,b)=>(a.t||0)-(b.t||0));LIST=L;SLOAD=true;push();paint();setTimeout(recut,2500)},e=>ERR('snap',e))}catch(e){ERR('db',e)}})();
const mine=set=>LIST.filter(x=>x.set==set);
const seen=set=>mine(set).filter(x=>!gone(x));
(async()=>{try{const db=await window.claude?.use?.('db');if(!db)return;db.collection('stylehide').onSnapshot(sn=>{const d=sn.docs.find(y=>y.id=='all'),v=d&&d.data();
  HID=new Set(v&&Array.isArray(v.k)?v.k:[]);const od=sn.docs.find(y=>y.id=='ord'),ov=od&&od.data();const first=!HLOAD;HLOAD=true;
  // v267: a ⭐ or a pick made before her saved order arrived is added to it (it used to replace the whole order and wipe her stars)
  if(first&&OPEND){const loc=ORD;ORD={};ORDSETS.forEach(t=>{const a=ordOk(ov&&ov[t]),b=loc[t]||{f:[],r:[]};ORD[t]={f:[...a.f,...b.f.filter(u=>!a.f.includes(u))].slice(0,60),r:[...b.r,...a.r.filter(u=>!b.r.includes(u))].slice(0,8)}});OPEND=false;ordSave();if(!RS.tie.length&&!RS.hair.length)freeze()}
  else if(ov&&!ORDT){ORDSETS.forEach(t=>ORD[t]=ordOk(ov[t]));if(!RS.tie.length&&!RS.hair.length)freeze();try{R()&&R().restyle&&R().restyle()}catch(_){}}push();paint()},e=>ERR('hsnap',e))}catch(e){ERR('hdb',e)}})();
// v238 (Sara 27/10 10:00 "קשירות שאני יותר אוהבת, להעלות אותן קדימה" + 10:00 "הקשירות האחרונות שנבחרו – בהתחלה"): ties and hairstyles in her order –
// ⭐ favourites first (she moves them ⬆), then the last ones she picked, then the rest. db 'stylehide'/'ord' {tie:{f:[],r:[]},hair:{f:[],r:[]}}; units are hidK keys.
const ORDSETS=['tie','hair','mk'];let ORD={tie:{f:[],r:[]},hair:{f:[],r:[]},mk:{f:[],r:[]}},RS={tie:[],hair:[],mk:[]},ORDT=null;   // v261: makeup has ⭐ too
const ordOk=v=>v&&typeof v=='object'?{f:Array.isArray(v.f)?v.f.slice(0,60):[],r:Array.isArray(v.r)?v.r.slice(0,8):[]}:{f:[],r:[]};
function freeze(){ORDSETS.forEach(t=>RS[t]=ORD[t].r.slice())}   // the recent order is taken when a screen opens, so a pick doesn't jump under her finger
function rank(set,u){const o=ORD[set];if(!o||!u)return 1e4;const f=o.f.indexOf(u);if(f>=0)return f;const r=(RS[set]||[]).indexOf(u);return r>=0?100+r:1e4}
const unitOf=x=>x?(x.p&&presets(x.set).some(pr=>pr.k==x.p)?x.p:'id:'+x.id):'';
const ordSort=(set,arr,uf)=>arr.map((e,i)=>[e,i]).sort((a,b)=>(rank(set,uf(a[0]))-rank(set,uf(b[0])))||(a[1]-b[1])).map(z=>z[0]);
function ordSave(){if(!HLOAD){OPEND=true;return}clearTimeout(ORDT);ORDT=setTimeout(async()=>{try{if(DB)await DB.collection('stylehide').doc('ord').set(Object.assign({t:Date.now()},ORD))}catch(e){ERR('ord',e)}ORDT=null},600)}   // v267: ORDT cleared after the write, so changes from another device show again
function ordChanged(){ordSave();try{R()&&R().restyle&&R().restyle()}catch(_){}}
function fav(set,u){const o=ORD[set];if(!o||!u)return;const i=o.f.indexOf(u);if(i>=0)o.f.splice(i,1);else{if(!o.f.length)MORE[set]=true;o.f.push(u)}   // v267: the first ⭐ keeps the list open
 ordChanged();paint()}
function favUp(set,u){const o=ORD[set];const i=o?o.f.indexOf(u):-1;if(i<=0)return;o.f.splice(i,1);o.f.splice(i-1,0,u);ordChanged();paint()}
function rec(set,u){const o=ORD[set];if(!o||!u)return;o.r=[u,...o.r.filter(y=>y!=u)].slice(0,8);ordSave()}
// v261 (Sara 27/10 20:59 "בכל מקום שאני רואה את הכיסויים ... אפשרות לסמן כוכבית ... ורק מה שעם כוכבית, זה יוצא ... אם אני רוצה להוסיף, זה נפתח לי, ואז זה מוסיף לי כוכבית"):
// wherever ties, hairstyles or makeups are listed, a set with ⭐ shows only the ⭐ ones and "☆ עוד" opens the rest; picking one from the rest gives it a ⭐.
// MORE[set] = the rest is open (on this screen); a set with no ⭐ yet shows everything
const MORE={};
const isFav=(set,u)=>!!(ORD[set]&&u&&ORD[set].f.includes(u));
const hasFav=set=>!!(ORD[set]&&ORD[set].f.length);
function star(set,u,on){const o=ORD[set];if(!o||!u)return;const i=o.f.indexOf(u);if(on===undefined)on=i<0;if(on&&i<0){if(!o.f.length)MORE[set]=true;o.f.push(u)}else if(!on&&i>=0)o.f.splice(i,1);else return;ordChanged();paint()}
window.STYORD={rank,freeze,rec,unit:id=>unitOf(LIST.find(x=>x.id==id)),sort:ordSort,isFav,hasFav,star,reset:()=>Object.keys(MORE).forEach(k=>delete MORE[k]),more:(set,v)=>{if(v!==undefined)MORE[set]=v;return !!MORE[set]}};
async function hide(k,on){if(!k)return;if(!HLOAD){toast_('רגע, הרשימה עוד נטענת – נסי שוב');return false}   // v267: hiding before the list loaded replaced everything she had hidden
 const was=new Set(HID);if(on)HID.add(k);else HID.delete(k);push();paint();
 try{if(!DB)throw new Error('db');await DB.collection('stylehide').doc('all').set({k:[...HID],t:Date.now()})}catch(e){ERR('hide',e);HID=was;push();paint();toast_('✗ '+ERRT.x);return false}
 return true}
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
 if(set=='tie')return p.TIES.map(([n,d,he],i)=>({k:'w'+i,no:i+1,n,d,he}));   // v206: her new 20 – new keys, so the ties she already made from the old list stay her own
 if(set=='hair')return (p.HAIRS||[]).map(([n,d,he,sp],i)=>({k:'g'+i,no:i+1,n,d,he,sp}));   // v207: her new 30 for her wig – new keys
 // v209 (Sara 14:17 "כמעט אין הבדלים באיפור של היום יום / הנה פרומטים מדוייקים ומתוקנים"): her 50 – [name, EN, exact prompt, Hebrew short]
 return p.MKC.flatMap(([c,t,L])=>L.map((x,i)=>Array.isArray(x)?{k:'m:'+c+':'+i,no:i+1,n:x[0],en:x[1],d:`Makeup Style: ${x[1]}. ${x[2]}`,sub:x[3],c}
  :{k:'m:'+c+':'+i,no:i+1,n:x.split(':')[0].trim(),sub:x.split(':').slice(1).join(':').trim(),c}))}
const mkHid=()=>{try{return new Set(JSON.parse(localStorage.getItem('mkc227')||'[]'))}catch(_){return new Set()}};   // v227: hidden makeup groups (shared with the studio)
const preOf=(set,k)=>presets(set).find(x=>x.k==k);
function doneOf(set,pr){const L=mine(set);return L.find(x=>x.p==pr.k)||L.find(x=>!x.p&&x.n==pr.n)||null}
const extras=set=>{const used=new Set(presets(set).map(pr=>(doneOf(set,pr)||{}).id).filter(Boolean));return mine(set).filter(x=>!used.has(x.id)&&!gone(x))};
const shown=set=>presets(set).filter(pr=>!HID.has(pr.k));
const oldTie=x=>x&&x.set=='tie'&&/^t\d+$/.test(x.p||'');   // made from the first tie list (before 26/10 13:33)
function el(){if(DL)return DL;DL=document.createElement('dialog');DL.id='sty199';DL.dir='rtl';DL.setAttribute('aria-labelledby','sty199t');document.body.appendChild(DL);
 DL.addEventListener('click',click);DL.addEventListener('input',e=>{const t=e.target;
  if(t.classList.contains('syname')){NAME[TAB]=t.value;fill()}else if(t.classList.contains('sydesc')){DESC=t.value;fill()}else if(t.classList.contains('synum')){NUM=t.value.replace(/\D/g,'').slice(0,2);fill()}});
 DL.addEventListener('pointerover',e=>{if(e.pointerType!='mouse'||still())return;const b=e.target.closest('.syrot');if(b&&!b._t&&!(e.relatedTarget&&b.contains(e.relatedTarget)))turn(b,true)});
 DL.addEventListener('pointerout',e=>{if(e.pointerType!='mouse')return;const b=e.target.closest('.syrot');if(b&&!(e.relatedTarget&&b.contains(e.relatedTarget)))stopRot(b,b._F)});
 DL.addEventListener('cancel',e=>{e.preventDefault();DL.close()});return DL}
function open(tab){if(!(DL&&DL.open))Object.keys(MORE).forEach(k=>delete MORE[k]);   // v261: each time it opens, only her ⭐ ones first
 if(tab&&SETS.some(s=>s[0]==tab))TAB=tab;freeze();el();ED='';ADD=false;paint();if(!DL.open)DL.showModal();DL.scrollTop=0}
const prompt=set=>{const p=P();if(!p)return '';const n=NAME[set].trim();return set=='hair'?p.hair(n):set=='tie'?p.tie(n):p.mkBoth?p.mkBoth(n,DESC.trim()):p.faceW?p.faceW(n,DESC.trim()):p.face(NUM)};   // v205: a new makeup from her words, only the doll
function prompt2(set,pr){const p=P();if(!p||!pr)return '';return set=='tie'?p.tieW(pr.n,pr.d,pr.he):set=='hair'?(p.hairZ||p.hairW)(pr.n,pr.d,pr.he,pr.sp):p.mkBoth?p.mkBoth(pr.n,pr.d||pr.sub):p.faceW?p.faceW(pr.n,pr.d||pr.sub):p.face(pr.no)}   // v205: makeup from the words, only the doll attached
function fill(){if(!DL)return;DL.querySelectorAll('textarea[data-syp]').forEach(t=>t.value=prompt(t.dataset.syp))}
function status(){if(!PROC)return '';if(PROC.err)return `<p class="syst no" role="alert">✗ ${es(PROC.err)}</p>`;
 return `<p class="syst" aria-live="polite">✂ ${PROC.n0?es(PROC.n0)+': ':''}${PROC.v<9?`גוזרת ומתאימה לבובה… זווית ${PROC.v} מתוך 8`:'שומרת…'}${PROC.n>1?` · תמונה ${PROC.i} מתוך ${PROC.n}`:''}</p>`}
const busy=()=>!!(PROC&&!PROC.err);
// v213 (Sara 15:44–15:45): makeup = two faces of hers, close up – with a cover and with her wig (a hairstyle of hers)
const cuRow=x=>`<span class="sycu"><small>${x.cu?'🔄 לעשות שוב (שתי התמונות)':'🔍 עוד אין תקריב חד'}</small><button type="button" data-sycp="${es(x.id)}">📋 פרומפט</button><button type="button" data-sycu="${es(x.id)}"${busy()?' disabled':''}>📤 להעלות</button></span>`;
// v251 (Sara 16:53 "תסרוקות … וגם תקריב ב-8 זוויות"): a hairstyle gets its close-up of her face in 8 angles, which turns on the card
const cuRowH=x=>`<span class="sycu"><small>${x.cu?'🔄 לעשות שוב (שתי התמונות)':'🔍 עוד אין תקריב'}</small><button type="button" data-syzip="${es(x.id)}"${x.set=='hair'?'':' data-sy316z="1"'}>⬇ ZIP</button><button type="button" data-sycp="${es(x.id)}">📋 פרומפט</button><button type="button" data-sycu="${es(x.id)}"${busy()?' disabled':''}>📤 להעלות</button></span>`;
function cardH(pr,x,b,title,set){set=set||'hair';const hk=hidK(pr,x),sub=pr&&pr.sub?pr.sub:x.sub||'';
 const howT=pr?`<details class="sycd"><summary>איך זה נראה</summary>${pr.he?`<p>${es(pr.he)}</p>`:''}<button type="button" class="syread" data-syread="${es(pr.k)}">📄 לקרוא את כל הפרומפט</button></details>`:'';
 return `<div class="syc up${b?' busy':''}"><span class="sycim tall c8"><img alt="תקריב: ${es(title)}" data-sycu8="${es(x.cu)}" src=""><span class="sy8" aria-hidden="true">🔄 מקרוב</span><button type="button" class="symore" data-syview="${es(x.id)}" aria-label="הבובה ב-8 זוויות, שם, החלפה: ${es(title)}">⋯</button></span><button type="button" class="syrm" data-syrm="${es(hk)}" aria-label="להסיר מהרשימה: ${es(title)}" title="להסיר"${b?' disabled':''}>🗑</button>${ORD[set]?favBtns(set,hk,title):''}${selBtn(set,hk)}<b class="sycn">${pr?pr.no+'. ':''}${es(title)}</b>${sub?`<small class="sycs">${es(sub)}</small>`:''}${howT}${cuRowH(x)}<span class="sycb">${b?'<span class="sycw">✂ גוזרת…</span>':`<button type="button" class="mkp" data-sywear="${es(x.id)}">👗 ללבוש</button>`}</span></div>`}
const hairOf=k=>{const x=LIST.find(y=>y.id==k);const pr=x?(x.p?preOf('hair',x.p):null):preOf('hair',k);return {n:x?x.n:pr?pr.n:'',pr}};
const zipPrompt=k=>{const p=P();if(!p||!p.hairZ)return '';const {n,pr}=hairOf(k);return p.hairZ(n,pr?pr.d:'',pr?pr.he:'',pr?pr.sp:'')};
async function zipHair(k,b){const o=b.textContent;b.disabled=true;b.textContent='מכינה…';
 try{const f=[],get=async u=>(await fetch(u)).blob();
  f.push({name:'wig-8.jpg',blob:await get('a8/wig_ref.jpg'+V)});f.push({name:'face-8.jpg',blob:await get('/_blob/f020f71d608d2da7304cdb0161c87206')});f.push({name:'doll-8.jpg',blob:await get('a8/sheet.jpg'+V)});
  f.push({name:'prompt.txt',blob:new Blob(['\ufeff'+zipPrompt(k)],{type:'text/plain;charset=utf-8'})});
  const {n}=hairOf(k);await R().saveFile(`hair-${String(n||k).replace(/[^\u0590-\u05FFA-Za-z0-9]+/g,'-').slice(0,30)}.zip`,await window.zip246(f));log('hair_zip',{k});
  b.textContent='✓ ירד. עכשיו ל-GPT'}catch(e){ERR('hzip',e);b.textContent='לא הצלחתי'}setTimeout(()=>{if(b.isConnected){b.textContent=o;b.disabled=false}},2600)}
const C8S={};let C8I=0;
(window.rawSetInterval||setInterval)(()=>{const im=document.querySelectorAll('img[data-sycu8]');if(!im.length)return;C8I=(C8I+1)%8;im.forEach(i=>{const a=i.dataset.sycu8;if(!a)return;const F=C8S[a];
  if(!F){if(F===undefined&&window.cu8Frames){C8S[a]=null;cu8Frames(a).then(F=>{C8S[a]=F||false})}if(!i.src)i.src='/_blob/'+a;return}if(i.matches(':hover')&&i.dataset.st)return;i.src=F[C8I]})},650);
const cuPrompt=x=>{if(x.set=='hair')return zipPrompt(x.id);if(x.set=='tie'||x.cu8){const p=P(),pr=x.p?preOf(x.set,x.p):null;return p&&p.batchS?p.batchS(x.set,[itemOf(x.set,pr,x)]):''}const p=P();if(!p||!p.mkBoth)return '';const pr=x.p?preOf('mk',x.p):null;return p.mkBoth(x.n,pr?pr.d||pr.sub:'')};
const faces=k=>[['c','עם כיסוי'],['h','עם פאה']].map(([h,t])=>`<span class="syfc"><img alt="${t}" data-syface="${es(k)}" data-h="${h}" src=""><small>${t}</small></span>`).join('');
function card(set,pr,x){if(SKIP&&SKIP.has(hidK(pr,x)))return '';const k=pr?pr.k:x.id,b=busy()&&PROC.k==k,title=x?x.n:pr.n;   // her own name once she renamed it
 if(x&&x.cu&&x.cu8)return cardH(pr,x,b,title,set);   // v316: a makeup or tie with its 8-angle close-up too
 // v204 (Sara 11:46 "אני אגע בתמונה ואז הבובה תסתובב ... אני צריכה לפחות את זה פי 3 בגודל"): one big picture that turns – touch it (or the mouse over it); ⋯ = all 8, name, replace
 const pic=x&&set!='mk'?`<span class="sycim tall"><button type="button" class="syrot" data-syrot aria-label="לסובב את הבובה: ${es(title)}"><img alt="" data-syf="${es(key(x))}" src=""></button><span class="sy8" aria-hidden="true">🔄 נגיעה מסובבת</span><button type="button" class="symore" data-syview="${es(x.id)}" aria-label="8 הזוויות, שם, החלפה: ${es(title)}">⋯</button></span>`
  :x&&set=='mk'&&x.cu?`<button type="button" class="sycim cu" data-syview="${es(x.id)}" aria-label="לראות גדול: ${es(title)}"><img alt="תקריב: ${es(title)}" src="/_blob/${es(x.cu)}"><span class="sy8">🔍 להגדיל</span></button>`
  :x&&set=='mk'?`<button type="button" class="sycim fc2" data-syview="${es(x.id)}" aria-label="לראות גדול: ${es(title)}">${faces(key(x))}<span class="sy8">🔍 להגדיל</span></button>`
  :x?`<button type="button" class="sycim" data-syview="${es(x.id)}" aria-label="לראות ב-8 זוויות: ${es(title)}"><img alt="" data-syc="${es(key(x))}" src=""><span class="sy8">👀 8 זוויות</span></button>`
  :set=='mk'&&pr&&MKG[pr.c]?`<span class="sycim cell"><img alt="" data-sycell="${es(pr.k)}" src=""></span>`
  :set=='mk'?`<span class="sycim fc2 none">${faces('')}<i>עוד אין תמונה</i></span>`
  :`<span class="sycim none${set!='mk'?' tall':''}"><img alt="" data-sycb="${set}" src=""><i>עוד אין תמונה</i></span>`;
 const btn=b?'<span class="sycw">✂ גוזרת…</span>':x?`<button type="button" class="mkp" data-sywear="${es(x.id)}">👗 ללבוש</button>`
  :`${set=='hair'?`<button type="button" data-syzip="${es(pr.k)}">⬇ ZIP</button>`:''}<button type="button" data-syp2="${es(pr.k)}">📋 פרומפט</button><button type="button" class="mkp" data-syup2="${es(pr.k)}"${busy()?' disabled':''}>📤 להעלות</button>`;
 const sub=pr&&pr.sub?pr.sub:x&&x.sub?x.sub:!pr&&oldTie(x)?'מהרשימה הקודמת':'',hk=hidK(pr,x);
 // v207 (Sara 13:47 "אני רוצה גם לבדוק שהפרומט של התסרוקות ממש טובות וברורות"): every preset card can show its whole prompt
 const howT=pr?`<details class="sycd"><summary>${set=='tie'?'איך קושרים':set=='hair'?'איך זה נראה':'הפרומפט'}</summary>${pr.he?`<p>${es(pr.he)}</p>`:''}<button type="button" class="syread" data-syread="${es(pr.k)}">📄 לקרוא את כל הפרומפט</button></details>`:'';
 return `<div class="syc${x?' up':''}${b?' busy':''}">${pic}<button type="button" class="syrm" data-syrm="${es(hk)}" aria-label="להסיר מהרשימה: ${es(title)}" title="להסיר"${b?' disabled':''}>🗑</button>${ORD[set]?favBtns(set,hk,title):''}${selBtn(set,hk)}<b class="sycn">${pr?pr.no+'. ':''}${es(title)}</b>${sub?`<small class="sycs">${es(sub)}</small>`:''}${howT}${x&&set=='mk'?cuRow(x):x&&set=='hair'?cuRowH(x):''}<span class="sycb">${btn}</span></div>`}
function favBtns(set,u,title){const f=ORD[set].f,i=f.indexOf(u);return `<button type="button" class="syfav" data-syfav="${es(u)}" aria-pressed="${i>=0}" aria-label="${i>=0?'להוריד מהאהובות':'לאהובות, קדימה'}: ${es(title)}" title="${i>=0?'אהובה – להוריד':'לאהובות, קדימה'}">${i>=0?'⭐':'☆'}</button>${i>0?`<button type="button" class="syfu" data-syfu="${es(u)}" aria-label="להזיז קדימה: ${es(title)}" title="קדימה">⬆</button>`:''}`}
// v206: what she removed, to bring back
function hiddenList(set){const L=[];presets(set).forEach(pr=>{if(HID.has(pr.k))L.push({k:pr.k,n:(pr.no?pr.no+'. ':'')+pr.n,pic:!!doneOf(set,pr)})});
 mine(set).forEach(x=>{if(HID.has('id:'+x.id)&&!(x.p&&HID.has(x.p)))L.push({k:'id:'+x.id,n:x.n,pic:true})});return L}
function hiddenHTML(set){const L=hiddenList(set);if(!L.length)return '';
 return `<div class="syhid"><button type="button" class="syhidb" data-syhid aria-expanded="${SHOWH}">↩ מה שהסרתי <small>${L.length}</small></button>${SHOWH?`<ul>${L.map(h=>`<li><span>${es(h.n)}${h.pic?' <small>· יש תמונה</small>':''}</span><button type="button" data-syback="${es(h.k)}">↩ להחזיר</button></li>`).join('')}</ul>`:''}</div>`}
const addCard=set=>{const one=SET(set)[3];return `<button type="button" class="syc sycadd" data-syadd aria-expanded="${ADD}"><span class="sycim"><b aria-hidden="true">＋</b></span><b class="sycn">להוסיף ${one}</b><small class="sycs">${set=='mk'?'לפי מה שתכתבי':'לפי תמונה שלך'}</small></button>`};
function how(set){const sheet='<button type="button" data-sydl="sheet">⬇ הבובה ב-8 זוויות</button>';
 if(set=='tie')return `<div class="syhow"><p><b>בכל קשירה:</b> 📋 מעתיקים, ב-GPT בשיחה חדשה מצרפים את הבובה ומדביקים, ואת מה שחזר 📤 מעלים באותה משבצת. מיד רואים אותה עלייך.</p><p><small>☆ על קשירה שאת אוהבת – היא עוברת להתחלה (גם בסטודיו), ו-⬆ מזיז אותה עוד קדימה. אחרי האהובות באות הקשירות שבחרת לאחרונה. 🗑 מסיר דגם מהרשימה, ו"↩ מה שהסרתי" למטה מחזיר.</small></p><span class="mkb">${sheet}</span></div>`;
 if(set=='hair')return `<div class="syhow"><p><b>בכל תסרוקת:</b> ⬇ ZIP – קובץ אחד עם הפאה, הפנים שלך מקרוב, הבובה והפרומפט. ב-GPT בשיחה חדשה מצרפים את ה-ZIP ומדביקים את הפרומפט (📋). GPT מחזיר שתי תמונות: תקריב ב-8 זוויות והבובה ב-8 זוויות. 📤 מעלים את שתיהן יחד באותה משבצת, והתקריב מסתובב בכרטיס.</p><p><small>🗑 על דגם שלא אהבת – מסיר אותו מהרשימה. אפשר להחזיר ב"↩ מה שהסרתי" למטה.</small></p><span class="mkb">${sheet}<button type="button" data-sydl="wig">⬇ הפאה שלי</button></span></div>`;
 // v215 (Sara 16:20 "אני לא הבנתי מה אני אמורה לעלות פה ... תעשה לי סדר"): three steps, what she sees after
 return `<div class="syhow"><p><b>איך עושים איפור</b> (פעם אחת לכל איפור):</p>
  <ol class="systeps"><li><b>⬇ שומרים</b> את הבובה ב-8 זוויות ואת הפאה שלך (פעם אחת, לכל האיפורים).<span class="mkb">${sheet}<button type="button" data-sydl="wig">⬇ הפאה שלי</button></span></li>
   <li>בכרטיס של האיפור <b>📋 פרומפט</b>. ב-GPT, בשיחה חדשה: מצרפים את שתי התמונות ומדביקים. GPT מחזיר <b>שתי תמונות</b>: הבובה עם האיפור ב-8 זוויות, ותקריב חד של הפנים.</li>
   <li><b>📤 להעלות</b> באותו כרטיס, ובוחרים את <b>שתי התמונות יחד</b>. אני מזהה לבד מה כל אחת.</li></ol>
  <p class="sysee"><b>מה רואים אחר כך:</b> בכרטיס – התקריב החד (עם כיסוי ועם הפאה). <b>👗 ללבוש</b> – האיפור על האווטאר שלך בסטודיו, בכל הזוויות.</p>
  <p><small>🗑 על דגם שלא אהבת – מסיר אותו מהרשימה. אפשר להחזיר ב"↩ מה שהסרתי" למטה.</small></p></div>`}
function addPanel(set){const [,,,one]=SET(set);const nm=`<label class="syl">שם <input class="syname" value="${es(NAME[set])}" maxlength="40" placeholder="${set=='hair'?'למשל: גלים פתוחים':set=='tie'?'למשל: טורבן גבוה':'למשל: שבת אלגנטית'}"></label>`;
 const pr=`<details><summary>לראות את הפרומפט</summary><textarea readonly rows="9" data-syp="${set}">${es(prompt(set))}</textarea></details>`;
 const att=set=='hair'?'התמונה של התסרוקת, הפאה שלך והבובה':set=='tie'?'התמונה של הקשירה, ואחריה הבובה':'רק הבובה';
 return `<div class="syaddp" id="syaddp"><h4>➕ ${set=='mk'?'איפור חדש, לפי מה שתכתבי':one+' חדשה, לפי תמונה שלך'}</h4><ol class="mks"><li>${nm}${set=='mk'?`<label class="syl">איך הוא נראה <textarea class="sydesc" rows="2" maxlength="300" placeholder="למשל: צללית ורודה-חומה, אייליינר דק, שפתון פטל">${es(DESC)}</textarea></label>`:''}</li>
  <li><b>שומרים</b> את הבובה${set=='hair'?' ואת הפאה':''}.<span class="mkb"><button type="button" data-sydl="sheet">⬇ הבובה ב-8 זוויות</button>${set=='hair'?'<button type="button" data-sydl="wig">⬇ הפאה שלי</button>':''}</span></li>
  <li><b>ב-GPT, בהודעה אחת:</b> ${att}, ומדביקים את הפרומפט.<span class="mkb"><button type="button" class="mkp" data-sycopy="${set}">📋 להעתיק את הפרומפט</button></span>${pr}</li>
  <li><b>מעלים את מה שחזר</b> (תמונה אחת עם 8 הזוויות).<span class="mkb"><button type="button" class="mkp" data-syup="${set}"${busy()?' disabled':''}>📤 להעלות</button></span></li></ol></div>`}
// the turn: a touch = one full turn back to the front; the mouse over it = turning until it leaves
const still=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(_){return false}};
function stopRot(b,F){if(b&&b._t){clearInterval(b._t);b._t=null;const i=b.querySelector('img');if(i&&F&&F[0])i.src=F[0]}}
function turn(b,loop){const img=b&&b.querySelector('img[data-syf]');if(!img)return;const k=img.dataset.syf,x=LIST.find(y=>key(y)==k);if(!x||!R().styFrames)return;
 R().styFrames(k,{rgb:x.set=='tie'?LIBC:null}).then(F=>{if(F.length<8)return;if(b._t)clearInterval(b._t);b._F=F;let i=0,n=0;
  b._t=setInterval(()=>{if(!img.isConnected){clearInterval(b._t);b._t=null;return}i=(i+1)%8;n++;img.src=F[i];if(!loop&&n>=8)stopRot(b,F)},loop?190:150)})}
function grid(set,list){return `<div class="syg2${set=='mk'?' mk2':''}">${list.join('')}</div>`}
function body(set){const all=[...shown(set).map(pr=>({pr,x:doneOf(set,pr)})),...extras(set).map(x=>({pr:null,x}))],F=hasFav(set)?ORD[set].f.map(u=>all.find(e=>hidK(e.pr,e.x)==u)).filter(Boolean):[];
 if(!F.length)return body0(set);const rest=all.length-F.length,nm_={tie:'קשירות',hair:'תסרוקות',mk:'איפורים'}[set];
 const top=`<section class="sycat syfavs"><h4>⭐ ${set=='tie'?'הקשירות':set=='hair'?'התסרוקות':'האיפורים'} שבחרתי <small>${F.length}</small></h4>${grid(set,F.map(e=>card(set,e.pr,e.x)))}</section>`;
 if(!MORE[set])return top+`<button type="button" class="symore2" data-symore2="1">☆ עוד ${rest} ${nm_} – לבחור ולסמן ⭐</button>`+grid(set,[addCard(set)]);
 SKIP=new Set(F.map(e=>hidK(e.pr,e.x)));try{return top+`<button type="button" class="symore2" data-symore2="0">⭐ רק מה שבחרתי</button><h4 class="syrest">כל השאר – ☆ מסמנים מה שאוהבים</h4>`+body0(set)}finally{SKIP=null}}
let SKIP=null;
const shownS=set=>shown(set).filter(pr=>!SKIP||!SKIP.has(pr.k)),extrasS=set=>extras(set).filter(x=>!SKIP||!SKIP.has('id:'+x.id));
function body0(set){const ex=extrasS(set).map(x=>card(set,null,x));
 // v207: her hairstyles in her 3 groups
 const p0=P();if(set=='hair'&&p0&&p0.HAIRG){const G=p0.HAIRG,sh=shownS(set);
  return G.map(([from,t],gi)=>{const to=gi+1<G.length?G[gi+1][0]:1e9,L=ordSort(set,sh.filter(pr=>pr.no-1>=from&&pr.no-1<to),pr=>pr.k);
   return L.length?`<section class="sycat"><h4>${es(t)} <small>${L.length}</small></h4>${grid(set,L.map(pr=>card(set,pr,doneOf(set,pr))))}</section>`:''}).join('')
   +(ex.length?`<section class="sycat"><h4>שלי</h4>${grid(set,ex)}</section>`:'')+grid(set,[addCard(set)])+hiddenHTML(set)}
 if(set=='tie'){const E=ordSort(set,[...shownS(set).map(pr=>({pr,x:doneOf(set,pr)})),...extrasS(set).map(x=>({pr:null,x}))],e=>hidK(e.pr,e.x));   // v238: her order
  return grid(set,[...E.map(e=>card(set,e.pr,e.x)),addCard(set)])+'<p class="sytip">הקשירות כאן בצבע אחד לדוגמה. על כיסוי היא בצבע של הכיסוי.</p>'+hiddenHTML(set)}
 if(set!='mk')return grid(set,[...shownS(set).map(pr=>card(set,pr,doneOf(set,pr))),...ex,addCard(set)])+(set=='tie'?'<p class="sytip">הקשירות כאן בצבע אחד לדוגמה. על כיסוי היא נצבעת בצבע של הכיסוי.</p>':'')+hiddenHTML(set);
 const p=P();if(!p)return '';const all=shownS('mk');
 const H=mkHid(),mineN=c=>all.filter(pr=>pr.c==c&&doneOf('mk',pr)).length;
 return p.MKC.map(([c,t,L])=>H.has(c)?`<section class="sycat syoff"><h4><button type="button" class="sycatb" data-sycat="${c}" aria-expanded="false"><b>${es(t)}</b> <small>${all.filter(pr=>pr.c==c).length}${mineN(c)?' · '+mineN(c)+' שלך':''}</small><i aria-hidden="true">הצגה</i></button></h4></section>`:`<section class="sycat"><h4><button type="button" class="sycatb" data-sycat="${c}" aria-expanded="true"><b>${es(t)}</b> <small>${all.filter(pr=>pr.c==c).length}${mineN(c)?' · '+mineN(c)+' שלך':''}</small><i aria-hidden="true">הסתרה</i></button></h4>
  ${MKG[c]?`<span class="mkb"><button type="button" data-sylook="${c}">📋 פרומפט לרשת</button><button type="button" data-sygrid="${c}"${busy()?' disabled':''}>📷 להחליף את הרשת</button></span>`:''}
  ${grid(set,all.filter(pr=>pr.c==c).map(pr=>card(set,pr,doneOf(set,pr))))}</section>`).join('')+(ex.length?`<section class="sycat"><h4>שלי</h4>${grid(set,ex)}</section>`:'')+grid(set,[addCard(set)])+hiddenHTML(set)}
function paint(){if(!DL)return;const set=TAB,y=DL.scrollTop,tt=DL.querySelector('#toast');   // v206: the toast (moved into the open dialog) survives a repaint, with its "ביטול"
 DL.innerHTML=`<div class="mk sy"><div class="mkh"><h3 id="sty199t">🎨 תסרוקות, קשירות ואיפור</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <div class="syt" role="tablist" aria-label="סוג">${SETS.map(([k,i,n])=>`<button type="button" role="tab" data-sytab="${k}" aria-selected="${k==set}">${i} ${n}${seen(k).length?` <small>${seen(k).length}</small>`:''}</button>`).join('')}</div>
  ${status()}${how(set)}${selBar(set)}${body(set)}${ADD?addPanel(set):''}${selFab(set)}</div>`;
 DL.classList.toggle('w213',set=='mk');if(tt)DL.appendChild(tt);DL.scrollTop=y;pics(DL)}
function pics(root){const r=R();if(!r||!r.styCard)return;
 root.querySelectorAll('img[data-syc]').forEach(i=>{const k=i.dataset.syc;if(!k)return;const x=LIST.find(y=>key(y)==k);r.styCard(k,{rgb:x&&x.set=='tie'?LIBC:null}).then(u=>{if(u)i.src=u})});
 root.querySelectorAll('img[data-sycb]').forEach(i=>r.styCard('',{set:i.dataset.sycb,one:i.dataset.sycb!='mk'}).then(u=>{if(u)i.src=u}));
 root.querySelectorAll('img[data-syf]').forEach(i=>{const k=i.dataset.syf;if(!k||!r.styFrames)return;const x=LIST.find(y=>key(y)==k),o={rgb:x&&x.set=='tie'?LIBC:null};(r.styFrame0?r.styFrame0(k,o):r.styFrames(k,o).then(F=>F[0])).then(u=>{if(u&&!i.closest('.syrot')?._t)i.src=u})});   // v238: the front first, the other 7 when she turns it
 root.querySelectorAll('img[data-sycell]').forEach(i=>cell(i.dataset.sycell).then(u=>{if(u)i.src=u}));
 root.querySelectorAll('img[data-syface]').forEach(i=>{if(!r.styFace)return;r.styFace(i.dataset.syface,i.dataset.h,{big:i.dataset.big=='1'}).then(u=>{if(u)i.src=u;else{const f=i.closest('.syfc');if(f)f.hidden=true}})})}
// one look's square out of the category grid (rows × columns as the step-1 prompt asks), a little inside so the lines and numbers stay out
const GIMG={},CELL={};
function cell(k){if(CELL[k])return Promise.resolve(CELL[k]);const pr=preOf('mk',k),p=P();if(!pr||!p||!MKG[pr.c])return Promise.resolve('');const src=MKG[pr.c];
 const [,,L]=p.MKC.find(x=>x[0]==pr.c),[rows,cols]=(p.GRID&&p.GRID[L.length])||[3,3],i=pr.no-1,r=Math.floor(i/cols),c=i%cols;
 GIMG[src]=GIMG[src]||new Promise(res=>{const m=new Image();m.onload=()=>res(m);m.onerror=()=>res(null);m.src='/_blob/'+src});
 return GIMG[src].then(m=>{if(!m)return '';const cw=m.naturalWidth/cols,ch=m.naturalHeight/rows,ins=.06,o=document.createElement('canvas');o.width=240;o.height=Math.round(240*ch/cw);
  o.getContext('2d').drawImage(m,c*cw+cw*ins,r*ch+ch*ins,cw*(1-2*ins),ch*(1-2*ins),0,0,o.width,o.height);return CELL[k]=o.toDataURL('image/jpeg',.85)})}
// the 8 angles of one style, its name, wear / replace / delete
function vw(){if(!VW){VW=document.createElement('dialog');VW.id='sty204v';VW.dir='rtl';VW.setAttribute('aria-labelledby','sty204vt');document.body.appendChild(VW);
  VW.addEventListener('cancel',e=>{e.preventDefault();VW.close()});VW.addEventListener('click',vclick)}return VW}
// v207: the whole prompt of a preset, to read before copying
function readP(k){const pr=preOf(TAB,k);if(!pr)return;vw();VW.dataset.id='';VW.classList.remove('w213');const [,,,,the]=SET(TAB);
 const att=TAB=='hair'?'מצרפים את ה-ZIP (⬇ ZIP), ומדביקים. GPT מחזיר שתי תמונות – מעלים את שתיהן יחד':'מצרפים: רק את הבובה (⬇ הבובה ב-8 זוויות), ומדביקים';
 VW.innerHTML=`<div class="mk"><div class="mkh"><h3 id="sty204vt">${pr.no?pr.no+'. ':''}${es(pr.n)}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <p class="sytip">${att} – בשיחה חדשה ב-GPT. את מה שחזר 📤 מעלים כאן.</p><div class="syrd" tabindex="0" aria-label="הפרומפט של ${es(the)}">${es(prompt2(TAB,pr))}</div>
  <span class="mkb">${TAB=='hair'?`<button type="button" data-syzip="${es(k)}">⬇ ZIP</button>`:''}<button type="button" class="mkp" data-syp2="${es(k)}">📋 להעתיק</button><button type="button" data-syup2="${es(k)}"${busy()?' disabled':''}>📤 להעלות</button></span></div>`;
 if(!VW.open)VW.showModal();VW.scrollTop=0}
function view(id){const x=LIST.find(y=>y.id==id);if(!x)return;vw();
 VW.dataset.id=id;VW.innerHTML=`<div class="mk"><div class="mkh"><h3 id="sty204vt">${es(x.n)}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  ${x.set=='mk'&&x.cu?`<div class="sycuv"><img alt="תקריב: ${es(x.n)}" src="/_blob/${es(x.cu)}"></div><h4>ב-8 זוויות</h4>`:x.set=='mk'?`<div class="syfv">${faces(key(x)).replace(/data-h=/g,'data-big="1" data-h=')}</div><p class="sytip">על הבובה הפנים קטנים. לתמונה חדה: "📋 פרומפט (שתי תמונות)" למטה, ואת שתי התמונות שחזרו "📤 להעלות".</p><h4>ב-8 זוויות</h4>`:''}<div class="sy8v"><img alt="${es(x.n)} ב-8 זוויות" src=""><span class="syld">רגע…</span></div>
  ${x.set=='tie'?'<p class="sytip">בצבע לדוגמה. על כיסוי היא בצבע של הכיסוי.</p>':''}
  <span class="mkb"><button type="button" class="mkp" data-sywear="${es(id)}">👗 ללבוש בסטודיו</button><button type="button" data-syre="${es(id)}">🔄 להחליף תמונה</button>${x.set=='mk'?`<button type="button" data-sycp="${es(id)}">📋 פרומפט (שתי תמונות)</button><button type="button" data-sycu="${es(id)}">📤 להעלות את שתיהן</button><button type="button" data-sydl="wig">⬇ הפאה שלי</button>`:''}<button type="button" class="sydel" data-sydel="${es(id)}">🗑 למחוק</button></span>
  <label class="syl syrenl">שם <input class="syren" value="${es(x.n)}" maxlength="40"><button type="button" data-syren="${es(id)}">✓ לשמור</button></label></div>`;
 VW.classList.toggle('w213',x.set=='mk');if(x.set=='mk')pics(VW);if(!VW.open)VW.showModal();VW.scrollTop=0;const img=VW.querySelector('.sy8v img');
 try{R().styCard(key(x),{all:1,rgb:x.set=='tie'?LIBC:null}).then(u=>{if(u&&img.isConnected){img.src=u;const l=VW.querySelector('.syld');if(l)l.remove()}})}catch(e){ERR('view',e)}}
function vclick(e){if(e.target===VW)return VW.close();const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(b.classList.contains('mkx'))return VW.close();
 if(d.sywear){VW.close();return wear(d.sywear)}
 if(d.syp2){const pr=preOf(TAB,d.syp2);if(pr)copy(b,prompt2(TAB,pr));return}
 if(d.syup2){const pr=preOf(TAB,d.syup2);VW.close();if(pr)pick(TAB,'',pr);return}
 if(d.syre){VW.close();return pick(TAB,d.syre)}
 if(d.sycp){const x=LIST.find(y=>y.id==d.sycp);if(x)copy(b,cuPrompt(x));return}
 if(d.sy316z){const x=LIST.find(y=>y.id==d.syzip);if(x)return zipB(x.set,[itemOf(x.set,x.p?preOf(x.set,x.p):null,x)],b);return}
 if(d.syzip)return zipHair(d.syzip,b);
 if(d.sycu){VW.close();const x=LIST.find(y=>y.id==d.sycu);return pick(x?x.set:'mk',d.sycu)}
 if(d.sydl)return dl(d.sydl);
 if(d.syren){const i=VW.querySelector('.syren');return rename(d.syren,i&&i.value).then(()=>{const h=VW.querySelector('h3');if(h&&i)h.textContent=i.value.trim()})}
 if(d.sydel){if(typeof sure=='function'&&!sure(b,'בטוח? לחצי שוב'))return;VW.close();return del(d.sydel)}}

// ---------- copy, save pictures ----------
async function copy(b,text){let ok=false;try{await navigator.clipboard.writeText(text);ok=true}catch(_){}
 if(!ok){const t=b.closest('li,.sy1')&&b.closest('li,.sy1').querySelector('textarea');try{if(t){const d=t.closest('details');if(d)d.open=true;t.focus();t.select();ok=document.execCommand('copy')}}catch(_){}}
 if(!ok){try{const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0';(VW&&VW.open?VW:(DL||document.body)).appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי, להעתיק מ"לראות את הפרומפט"';setTimeout(()=>{if(b.isConnected)b.textContent=o},2600)}
async function dl(what){try{const u=what=='wig'?'a8/wig_ref.jpg':'a8/sheet.jpg';const bl=await (await fetch(u+V)).blob();await R().saveFile(what=='wig'?'my-wig.jpg':'avatar-8-angles.jpg',bl)}catch(e){ERR('dl',e);toast_('לא הצלחתי לשמור')}}

// ---------- upload → cut → keep ----------
let FI=null,FSET='',FRE='',FPRE=null,FG='';
function pick(set,re,pre,g){FSET=set;FRE=re||'';FPRE=pre||null;FG=g||'';if(!FI){FI=document.createElement('input');FI.type='file';FI.accept='image/*,.zip,application/zip,application/x-zip-compressed';FI.hidden=true;document.body.appendChild(FI);
 FI.addEventListener('change',()=>{const fs=[...FI.files];FI.value='';if(!fs.length)return;if(FG)return grid1(FG,fs[0]).catch(e=>ERR('grid',e));run(FSET,fs,FRE,FPRE).catch(e=>ERR('run',e))})}FI.multiple=!g&&(set=='mk'||set=='hair'||!re&&!pre);FI.click()}
// makeup step 1: the grid GPT returned for one category → every look of it shows its square (db 'stylegrid' {src}, one per category)
async function grid1(c,f){let a=null;try{a=await claude.use('assets')}catch(_){}if(!a||!DB){PROC={err:ERRT[a?'db':'assets']};paint();return}
 toast_('שומרת את הרשת…');try{const src=(await put1(a,await slim272(f))).id;await DB.collection('stylegrid').doc(c).set({src,t:Date.now()});MKG[c]=src;Object.keys(CELL).forEach(k=>{if(k.startsWith('m:'+c+':'))delete CELL[k]});paint();
  const t=(P().MKC.find(x=>x[0]==c)||[])[1]||'';toast_(`✓ הרשת של ${t} באתר. עכשיו רואים כל איפור`);log('grid_ok',{c})}catch(e){ERR('grid',e);toast_('✗ '+ERRT.x)}}
const ERRT={shape:'התמונה לא בצורה של הגיליון (2 שורות של 4 משבצות). מעלים את התמונה המלאה שחזרה מ-GPT, בלי לחתוך',
 empty:'לא מצאתי שינוי על הבובה. זו התמונה ש-GPT החזיר?',assets:'שמירת תמונות לא זמינה כאן. לפתוח את האתר ב-Chrome ולנסות שוב',db:'השמירה לא זמינה כאן. לפתוח את האתר ב-Chrome',x:'משהו השתבש. לנסות שוב'};
const blobOf=c=>new Promise(r=>c.toBlob(b=>{if(b&&b.type=='image/webp')return r(b);c.toBlob(r,'image/png')},'image/webp',.92));
const put8=async(a,V,keep)=>{const S=window.SP262;if(S&&S.put8){try{const L=await S.put8(a,V,keep);if(L)return L}catch(e){if(S.full&&S.full(e))throw e;ERR('put8',e)}}const L=[];for(let v=0;v<V.length;v++)L.push(V[v]&&(!keep||keep[v]!==false)?(await put1(a,await blobOf(V[v]))).id:'');return L};   // v302: one packed picture, not 8 files
async function put1(a,b){let last;for(const w of [0,1500,4000]){if(w)await new Promise(r=>setTimeout(r,w));try{return await a.upload(b)}catch(e){last=e}}throw last}
// v213 (Sara 26/10 15:36 "התמונה של השיער לא נגזרה טוב"): the whole-head cutter is better now (cut8.CVW) – a hairstyle or tie cut before
// is cut again from her own GPT picture, once, quietly in the background; the old pictures stay in the store
const RC=new Set();let RCB=false;
async function recut(){if(window.SP262&&SP262.isFull()){setTimeout(recut,5*60e3);return}if(RCB||!window.cut8||!cut8.CVW||!DB||(PROC&&!PROC.err))return;
 const due=y=>y.src&&!((y.cv||0)>=(y.set=='hair'&&cut8.CVH||cut8.CVW))&&!RC.has(y.id),x=LIST.find(y=>y.set=='hair'&&due(y))||LIST.find(y=>y.set=='tie'&&due(y));if(!x)return;RC.add(x.id);RCB=true;   // v214: hairstyles first
 try{let a=null;try{a=await claude.use('assets')}catch(_){}if(!a)return;
  const r=await cut8.run('/_blob/'+x.src,KIND[x.set]);if(r.px.filter(p=>p>150).length<5)throw new Error('empty');
  const L=await put8(a,r.views.slice(0,8));
  const doc={L,cv:cut8.CVW};
  if(r.fab){const M=await put8(a,r.fab.slice(0,8));doc.M=M;doc.lum=r.lum||x.lum||128}
  // v267: write only the new layers, and only if the style still has the same picture – a name, close-up or new picture she saved meanwhile stays.
  // If she replaced the picture while this ran, these new files are ours, a few seconds old and used nowhere – they are deleted.
  const ref=DB.collection('styles').doc(x.id),fr=await ref.get(),cur=fr.exists?fr.data():null;
  if(!cur||cur.src!==x.src){for(const f of new Set([...L,...(doc.M||[])].filter(Boolean).map(f=>String(f).split('~')[0])))try{await a.delete(f)}catch(_){}return}
  await ref.update(doc);log('sty_recut',{set:x.set,id:x.id,px:r.px.join(',')})}
 catch(e){ERR('recut',e);try{window.SP262&&SP262.full(e)}catch(_){}}finally{RCB=false;setTimeout(recut,1500)}}
async function run(set,fs,re,pre){if(PROC&&!PROC.err){toast_('רגע, עוד גוזרת');return}if(!window.cut8)return;
 let a=null;try{a=await claude.use('assets')}catch(_){}
 if(!a||!DB){PROC={err:ERRT[a?'db':'assets']};paint();return}
 let CU=null,CU8=false;
 if(fs.length&&window.sheetKind247){const K=await Promise.all(fs.map(f=>sheetKind247(f)));const S=[];fs.forEach((f,i)=>{if(!CU&&K[i].grid&&K[i].close){CU=f;CU8=true}else S.push(f)});fs=S}   // v316: the 8-angle close-up, for every kind
 if(set=='mk'&&!CU){const S=[];for(const f of fs){if(!CU&&!(await isSheet(f)))CU=f;else S.push(f)}fs=S}   // v215: the two pictures GPT returned, in any order
 if(CU&&!fs.length){await cuOnly(CU,re,pre,set,CU8);return}
 const [,,,one,the]=SET(set),base=pre?pre.n:NAME[set].trim(),done=[],pk=pre?pre.k:(re||'add');
 for(let i=0;i<fs.length;i++){PROC={v:1,i:i+1,n:fs.length,k:pk,n0:base};paint();const t0=Date.now();
  try{const r=await cut8.run(fs[i],KIND[set],v=>{PROC={v:v+1,i:i+1,n:fs.length,k:pk,n0:base};const s=DL&&DL.querySelector('.syst');if(s)s.outerHTML=status()});
   if(r.px.filter(x=>x>(set=='mk'?30:150)).length<(set=='mk'?1:5))throw Object.assign(new Error('empty'),{code:'empty'});
   PROC={v:9,i:i+1,n:fs.length,k:pk,n0:base};paint();
   const src=(await put1(a,await slim272(fs[i]))).id,L=await put8(a,r.views.slice(0,8),r.views.slice(0,8).map((_,v)=>set!='mk'||r.px[v]>3));
   let M=null;if(r.fab){M=[];for(let v=0;v<8;v++)M.push((await put1(a,await blobOf(r.fab[v]))).id)}
   const old=re&&LIST.find(x=>x.id==re);
   const n=old?old.n:(base?(fs.length>1?`${base} ${i+1}`:base):`${one} ${mine(set).length+done.length+1}`);
   const id=old?old.id:'s'+Date.now().toString(36)+i,doc={set,n,t:old?old.t:Date.now(),src,L,cv:set!='mk'&&cut8.CVW||cut8.CV||1};if(old&&old.cu)doc.cu=old.cu;if(M){doc.M=M;doc.lum=r.lum||128}const pp=pre?pre.k:old&&old.p;if(pp)doc.p=pp;
   await DB.collection('styles').doc(id).set(doc);
   if(!LIST.some(x=>x.id==id))LIST.push(Object.assign({},doc,{id}));else LIST=LIST.map(x=>x.id==id?Object.assign({},doc,{id}):x);
   push();done.push(id);log('sty_ok',{set,id,ms:Date.now()-t0,px:r.px.join(',')})}
  catch(e){ERR('cut',e);log('sty_fail',{set,code:String(e&&(e.code||e.message)||e).slice(0,60)});PROC={err:ERRT[e&&e.code]||ERRT.x};paint();toast_('✗ '+PROC.err);return}}
 PROC=null;if(!re&&!pre&&NAME[set].trim()==base){NAME[set]='';ADD=false}ED='';paint();   // a name she typed meanwhile for the next one stays
 const last=LIST.find(x=>x.id==done[done.length-1]);
 if(CU&&last){try{await cuUp(last.id,CU,true,CU8)}catch(e){ERR('cu',e)}}
 toast_(done.length>1?`✓ ${done.length} ${SET(set)[2]} על האווטאר`:`✓ ${the} על האווטאר${CU&&last&&last.cu?' והתקריב בכרטיס':''}`)}   // v204: no action – the toast's button reads "ביטול"
function wear(id){const x=LIST.find(y=>y.id==id);if(!x)return;const k=key(x);if(!k)return;if(ORD[x.set]){rec(x.set,unitOf(x));if(!isFav(x.set,unitOf(x)))star(x.set,unitOf(x),true)}try{if(DL&&DL.open)DL.close();R().wearStyle(k)}catch(e){ERR('wear',e)}}
// v215: the 8-angle sheet (its shape, and the white line between its two rows) vs. the close-up
async function isSheet(f){const u=URL.createObjectURL(f);try{const m=await new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=u});
  const q=m.naturalWidth/m.naturalHeight;if(q<1.25||q>1.42)return false;const w=240,h=Math.round(w/q),c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(m,0,0,w,h);
  const d=g.getImageData(0,0,w,h).data;let best=0;for(let y=Math.round(h*.46);y<=Math.round(h*.54);y++){let n=0;for(let x=Math.round(w*.03);x<w*.97;x++){const k=(y*w+x)*4;if(d[k]*.299+d[k+1]*.587+d[k+2]*.114>225)n++}best=Math.max(best,n/(w*.94))}
  return best>.7}catch(_){return true}finally{URL.revokeObjectURL(u)}}
// only a close-up: onto the makeup she already has; a new one waits for its sheet (no layers yet)
async function cuOnly(f,re,pre,set,c8){if(!f)return;set=set||'mk';let x=re?LIST.find(y=>y.id==re):pre?doneOf(set,pre):null;
 if(set!='mk'||(c8&&x)){if(!x){toast_('זה רק התקריב. מעלים אותו יחד עם הבובה ב-8 זוויות');return}await cuUp(x.id,f,true,set=='hair'||!!c8);toast_('✓ התקריב בכרטיס');return}
 if(!x){const id='s'+Date.now().toString(36)+'c',doc={set:'mk',n:pre?pre.n:(NAME.mk.trim()||'איפור'),t:Date.now(),L:['','','','','','','',''],cv:cut8.CV||1};if(pre)doc.p=pre.k;
  await DB.collection('styles').doc(id).set(doc);x=Object.assign({},doc,{id});LIST.push(x);push()}
 await cuUp(x.id,f,true,!!c8);toast_(x.L.some(Boolean)?'✓ התקריב בכרטיס':'✓ התקריב בכרטיס. כדי לראות את האיפור על האווטאר, מעלים גם את הבובה ב-8 זוויות')}
// v214: her close-up from GPT (one picture, two faces) → the makeup's doc gets cu (an asset id)
async function cuUp(id,f,quiet,c8){const x=LIST.find(y=>y.id==id);if(!x)return;let a=null;try{a=await claude.use('assets')}catch(_){}if(!a||!DB){toast_('✗ '+ERRT[a?'db':'assets']);return}
 if(!quiet)toast_('שומרת את התקריב…');const u=URL.createObjectURL(f);let bl=f;
 try{const m=await new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=u});const s=Math.min(1,1600/m.naturalWidth,1600/m.naturalHeight),c=document.createElement('canvas');
  c.width=Math.round(m.naturalWidth*s);c.height=Math.round(m.naturalHeight*s);c.getContext('2d').drawImage(m,0,0,c.width,c.height);bl=await new Promise(r=>c.toBlob(r,'image/jpeg',.9))||f}catch(_){}finally{URL.revokeObjectURL(u)}
 const cu=(await put1(a,bl)).id,doc=Object.assign({},x,{cu});if(c8)doc.cu8=1;else delete doc.cu8;delete doc.id;await DB.collection('styles').doc(id).set(doc);x.cu=cu;if(c8)x.cu8=1;else delete x.cu8;paint();log('sty_cu',{id});if(!quiet)toast_('✓ התקריב בכרטיס')}
async function rename(id,n){const x=LIST.find(y=>y.id==id);n=String(n||'').trim().slice(0,40);if(!x||!n||!DB)return;
 const doc=Object.assign({},x,{n});delete doc.id;try{await DB.collection('styles').doc(id).set(doc)}catch(e){ERR('ren',e);toast_(ERRT.x);return}
 x.n=n;push();ED='';paint()}
async function del(id){const x=LIST.find(y=>y.id==id);if(!x||!DB)return;const keep=Object.assign({},x);delete keep.id;
 try{await DB.collection('styles').doc(id).delete()}catch(e){ERR('del',e);toast_(ERRT.x);return}
 LIST=LIST.filter(y=>y.id!=id);push();ED='';paint();
 toast_('נמחק',async()=>{try{await DB.collection('styles').doc(id).set(keep);if(!LIST.some(y=>y.id==id))LIST.push(Object.assign({},keep,{id}));LIST.sort((a,b)=>(a.t||0)-(b.t||0));push();paint()}catch(e){ERR('undo',e)}})}

function click(e){if(e.target===DL)return DL.close();const b=e.target.closest('button');if(!b||!DL.contains(b))return;const d=b.dataset;
 if(d.sysel!=null){selT(TAB,d.sysel);return}
 if(d.sy316!=null)return selDo(d.sy316,b);
 if(d.syfav!=null){fav(TAB,d.syfav);return}
 if(d.symore2!=null){MORE[TAB]=d.symore2=='1';paint();return}
 if(d.syfu!=null){favUp(TAB,d.syfu);return}
 if(d.sycat!=null){const H=mkHid(),c=d.sycat;H.has(c)?H.delete(c):H.add(c);try{localStorage.setItem('mkc227',JSON.stringify([...H]))}catch(_){}paint();return}   // v227: a makeup group folds (the same groups fold in the studio)
 if(b.classList.contains('mkx'))return DL.close();
 if(d.sytab){TAB=d.sytab;ED='';ADD=false;SHOWH=false;PROC=PROC&&PROC.err?null:PROC;paint();DL.scrollTop=0;const t=DL.querySelector(`[data-sytab="${TAB}"]`);if(t)t.focus();return}
 if(d.sywear)return wear(d.sywear);
 if(d.syrm){const k=d.syrm;if(busy()&&PROC.k==k)return;return hide(k,true).then(ok=>{if(ok)toast_('✓ הוסר מהרשימה',()=>hide(k,false))})}
 if(d.syback){const k=d.syback;return hide(k,false).then(ok=>{if(ok){if(!hiddenList(TAB).length)SHOWH=false;paint();toast_('✓ חזר לרשימה')}})}
 if(d.syhid!=null){SHOWH=!SHOWH;paint();return}
 if(d.syview)return view(d.syview);
 if(d.syread)return readP(d.syread);
 if(d.syrot!=null){if(still()){const c=b.closest('.syc'),v=c&&c.querySelector('[data-syview]');if(v)view(v.dataset.syview);return}if(!b._t||e.pointerType!='mouse')turn(b,false);return}
 if(d.syadd!=null){ADD=!ADD;paint();if(ADD){const a=DL.querySelector('#syaddp');if(a){a.scrollIntoView({block:'start',behavior:'smooth'});const i=a.querySelector('.syname');if(i)setTimeout(()=>i.focus({preventScroll:true}),350)}}return}
 if(d.sydl)return dl(d.sydl);
 if(d.sycopy)return copy(b,prompt(d.sycopy));
 if(d.sylook){const p=P();if(p)copy(b,p.look(d.sylook));return}
 if(d.sygrid){if(busy())return toast_('רגע, עוד גוזרת');return pick('mk','',null,d.sygrid)}
 if(d.syp2){const pr=preOf(TAB,d.syp2);if(pr)copy(b,prompt2(TAB,pr));return}
 if(d.syup2){const pr=preOf(TAB,d.syup2);if(pr)pick(TAB,'',pr);return}
 if(d.sycp){const x=LIST.find(y=>y.id==d.sycp);if(x)copy(b,cuPrompt(x));return}
 if(d.syzip)return zipHair(d.syzip,b);
 if(d.sycu){if(busy())return toast_('רגע, עוד גוזרת');const x=LIST.find(y=>y.id==d.sycu);return pick(x&&x.set=='hair'?'hair':'mk',d.sycu)}
 if(d.syup)return pick(d.syup)}
// ---------- v316: up to 10 at once – one ZIP, one prompt, one upload of everything GPT returned ----------
// Sara 28/10 19:41: "לבחור 10 תסרוקות שונות בבת אחת… קובץ אחד… אותו דבר לאיפור… קשירות… אין לי כוח אחד-אחד". Her picks stay (localStorage) while she goes to GPT and back.
const MAXS=10,SK='sty316';let SEL=(()=>{try{return Object.assign({hair:[],mk:[],tie:[]},JSON.parse(localStorage.getItem(SK)||'{}'))}catch(_){return {hair:[],mk:[],tie:[]}}})();
const selSave=()=>{try{localStorage.setItem(SK,JSON.stringify(SEL))}catch(_){}};
const selBtn=(set,k)=>{const i=(SEL[set]||[]).indexOf(k);return `<button type="button" class="sysel" data-sysel="${es(k)}" aria-pressed="${i>=0}" aria-label="${i>=0?'מסומנת '+(i+1)+' – להוריד את הסימון':'לסמן לשליחה יחד'}">${i>=0?'✓ מסומנת '+(i+1):'＋ לסמן לשליחה יחד'}</button>`};
function itemOf(set,pr,x){const n=x?x.n:pr?pr.n:'';if(!pr)return {n,det:x&&x.sub||''};
 return set=='mk'?{n,det:pr.d||pr.sub||'',he:pr.d&&pr.sub&&pr.sub!=pr.d?pr.sub:''}:{n,det:pr.d||'',he:pr.he||'',sp:pr.sp||''}}
function selItems(set){return (SEL[set]||[]).map(k=>{const x=k.startsWith('id:')?LIST.find(y=>y.id==k.slice(3)):null,pr=x?(x.p?preOf(set,x.p):null):preOf(set,k);
  if(!x&&!pr)return null;const done=x||(pr?doneOf(set,pr):null);return {k,pr,x:done,it:itemOf(set,pr,done)}}).filter(Boolean)}
function selT(set,k){const L=SEL[set]=SEL[set]||[],i=L.indexOf(k);if(i>=0)L.splice(i,1);else{if(L.length>=MAXS){toast_(`אפשר עד ${MAXS} בבת אחת`);return}L.push(k)}selSave();paint()}
function selBar(set){const L=selItems(set),W=SET(set)[2];
 if(!L.length)return `<div class="sy316 none"><p>☑ <b>הרבה בבת אחת:</b> לוחצים "＋ לסמן" על עד ${MAXS} ${W}, ומקבלים <b>ZIP אחד ופרומפט אחד</b> לכולן. GPT מחזיר לכל אחת תקריב ב-8 זוויות ואת הבובה ב-8 זוויות, ואת כל התמונות מעלים כאן בבת אחת.</p></div>`;
 return `<div class="sy316" role="region" aria-label="מה שסימנתי"><p><b>סימנת ${L.length} מתוך ${MAXS}:</b> ${L.map((o,i)=>`<span class="sy316n">${i+1}. ${es(o.it.n)}</span>`).join(' ')}</p>
  <ol class="sy316s"><li><button type="button" class="mkp" data-sy316="zip">⬇ ZIP אחד לכולן</button></li><li><button type="button" data-sy316="copy">📋 להעתיק את הפרומפט</button> <small>ב-GPT, בשיחה חדשה: מצרפים את ה-ZIP ומדביקים</small></li>
  <li><button type="button" class="mkp" data-sy316="up"${busy()?' disabled':''}>📤 להעלות את כל מה שחזר</button> <small>${2*L.length} תמונות (או ZIP), בבת אחת</small></li></ol>
  <button type="button" class="sy316x" data-sy316="clear">✕ לנקות את הסימונים</button></div>`}
const selFab=set=>{const n=(SEL[set]||[]).length;return n?`<div class="sy316f" role="region" aria-label="שליחה יחד"><b>✓ סימנת ${n} ${SET(set)[2]} (עד ${MAXS})</b><button type="button" data-sy316="zip">⬇ ZIP</button><button type="button" data-sy316="copy">📋 פרומפט</button><button type="button" data-sy316="up"${busy()?' disabled':''}>📤 להעלות</button></div>`:''};
const bPrompt=(set,its)=>{const p=P(),t=p&&p.batchS?p.batchS(set,its):'';return t&&window.zipAsk?zipAsk(t):t};
async function zipB(set,its,b){const o=b.textContent;b.disabled=true;b.textContent='מכינה…';
 try{const f=[],get=async u=>(await fetch(u)).blob();
  if(set=='hair')f.push({name:'wig-8.jpg',blob:await get('a8/wig_ref.jpg'+V)});
  f.push({name:'face-8.jpg',blob:await get('/_blob/f020f71d608d2da7304cdb0161c87206')});f.push({name:'doll-8.jpg',blob:await get('a8/sheet.jpg'+V)});
  f.push({name:'prompt.txt',blob:new Blob(['﻿'+bPrompt(set,its)],{type:'text/plain;charset=utf-8'})});
  await R().saveFile(`${{hair:'hairstyles',mk:'makeup',tie:'ties'}[set]}-${its.length}.zip`,await window.zip246(f));log('sty316_zip',{set,n:its.length});
  b.textContent='✓ ירד. עכשיו ל-GPT'}catch(e){ERR('zip316',e);b.textContent='לא הצלחתי'}setTimeout(()=>{if(b.isConnected){b.textContent=o;b.disabled=false}},2600)}
let FB=null;
function selDo(w,b){const set=TAB,L=selItems(set);
 if(w=='clear'){const old=SEL[set].slice();SEL[set]=[];selSave();paint();toast_('הסימונים נוקו',()=>{SEL[set]=old;selSave();paint()});return}
 if(!L.length)return;
 if(w=='zip')return zipB(set,L.map(o=>o.it),b);
 if(w=='copy')return copy(b,bPrompt(set,L.map(o=>o.it)));
 if(w=='up'){if(busy())return toast_('רגע, עוד גוזרת');if(!FB){FB=document.createElement('input');FB.type='file';FB.multiple=true;FB.accept='image/*,.zip,application/zip,application/x-zip-compressed';FB.hidden=true;document.body.appendChild(FB);
   FB.addEventListener('change',()=>{const fs=[...FB.files];FB.value='';if(fs.length)review(FB._set,fs).catch(e=>ERR('rev316',e))})}FB._set=set;FB.click()}}
// what came back: sorted by name (GPT's 01, 02… or the time in its file names), every close-up paired with the doll next to it; she checks the pairs and names, then all are cut
const nat=(a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true,sensitivity:'base'})||a.lastModified-b.lastModified;
async function review(set,fs){const L=selItems(set);fs=fs.slice().sort(nat);toast_('בודקת את התמונות…');
 const K=window.sheetKind247?await Promise.all(fs.map(f=>sheetKind247(f))):fs.map(()=>({grid:true,close:false}));
 const P2=[];const used=new Set();
 for(let i=0;i<fs.length;i++){if(used.has(i))continue;used.add(i);const c=K[i].grid&&K[i].close;let j=-1;
  if(i+1<fs.length&&!used.has(i+1)&&(K[i+1].grid&&K[i+1].close)!=c)j=i+1;if(j>=0)used.add(j);
  const pair={cu:c?fs[i]:j>=0?fs[j]:null,body:c?(j>=0?fs[j]:null):fs[i]};P2.push(pair)}
 P2.forEach((p,i)=>p.to=i<L.length?i:-1);
 vw();VW.dataset.id='';VW.classList.add('w213');const url=f=>f?URL.createObjectURL(f):'';
 const opts=sel=>`<option value="-1"${sel<0?' selected':''}>לא להעלות</option>`+L.map((o,i)=>`<option value="${i}"${sel==i?' selected':''}>${i+1}. ${es(o.it.n)}</option>`).join('');
 VW.innerHTML=`<div class="mk"><div class="mkh"><h3 id="sty204vt">📤 ${fs.length} תמונות → ${P2.length} ${SET(set)[2]}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  <p class="sytip">כל שורה = תקריב + הבובה. בודקים שהשם נכון (אפשר לשנות), ולוחצים "✂ להעלות הכל".${P2.length!=L.length?` <b>סימנת ${L.length}, וחזרו ${P2.length} זוגות.</b>`:''}</p>
  <ul class="sy316r">${P2.map((p,i)=>`<li><span class="sy316i">${p.cu?`<img alt="תקריב" src="${url(p.cu)}">`:'<i>אין תקריב</i>'}${p.body?`<img alt="הבובה" src="${url(p.body)}">`:'<i>אין בובה</i>'}</span><label>${String(i+1).padStart(2,'0')} <select data-sy316p="${i}">${opts(p.to)}</select></label></li>`).join('')}</ul>
  <span class="mkb"><button type="button" class="mkp" data-sy316go>✂ להעלות הכל</button></span></div>`;
 VW._p316={set,P2,L};if(!VW.open)VW.showModal();VW.scrollTop=0;
 if(!VW._316){VW._316=1;VW.addEventListener('change',e=>{const s=e.target.closest('[data-sy316p]');if(s&&VW._p316)VW._p316.P2[+s.dataset.sy316p].to=+s.value},true);
  VW.addEventListener('click',e=>{const g=e.target.closest('[data-sy316go]');if(!g||!VW._p316)return;e.stopPropagation();const {set,P2,L}=VW._p316;VW._p316=null;VW.close();goAll(set,P2,L).catch(er=>ERR('go316',er))},true)}}
async function goAll(set,P2,L){const todo=P2.filter(p=>p.to>=0&&(p.body||p.cu)),seen=new Set(),ok=[];
 for(const p of todo){if(seen.has(p.to))continue;seen.add(p.to);const o=L[p.to];
  await run(set,[p.cu,p.body].filter(Boolean),o.x?o.x.id:'',o.x?null:(o.pr||null));if(PROC&&PROC.err){toast_(`✗ ${o.it.n}: ${PROC.err}`);break}ok.push(o.k)}
 if(ok.length){SEL[set]=(SEL[set]||[]).filter(k=>!ok.includes(k));selSave();paint();toast_(`✓ ${ok.length} ${SET(set)[2]} באתר, עם התקריב בכרטיס`);log('sty316_up',{set,n:ok.length})}}
window.STY199={open,list:()=>LIST.slice(),gone:x=>gone(x)};
})();
