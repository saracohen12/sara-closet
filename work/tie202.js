/* ===== v202: ties, hairstyles and makeup as closet categories, and a tie for every cover (Sara 26/10 11:04:
   "אני רוצה כתגוריה של קשירות, תסרוקות, איפור, כמו שיש שמלות חולצות חצאיות ... כשאני נכנסת לכיסויים זה יפתח לי את סוגי הקשירות ואז אני אבחר
   שעם הכיסוי הזה אני רוצה את הקשירה הזו ... אני לא רוצה לעשות מכל כיסוי 20 קישירות ... אני רוצה שיהיה לי 1 מסטאר ועליו נלביש את הכיסוי").
   - "🧕 קשירות · 💇 תסרוקות · 💄 איפור" next to the categories on the home screen and in "הארון שלי" (they open the styles library, sty199.js)
   - every cover's window: "🧕 קשירה" → her ties, painted in that cover's colour → IT[id].tie; "לנסות עליי" then wears the cover with it (r360 wearCover)
   - the covers section in the closet: one line that leads to the ties */
(function(){
const ERR=(w,e)=>{try{(window.ERRS=window.ERRS||[]).push('v202 '+w+': '+(e&&e.message||e))}catch(_){}};
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=(m,u)=>(window.toast||(()=>{}))(m,u);
const R=()=>window.R360,S=()=>window.STY199;
const list=set=>{try{return S().list().filter(x=>x.set==set)}catch(_){return []}};
const key=x=>{try{return R().styKey(x)}catch(_){return ''}};
const nm=id=>{try{return R().nm(id)}catch(_){return ''}};
const isCover=id=>{try{return R().isCover(id)}catch(_){return false}};
const tieOf=id=>{const t=((typeof IT=='object'&&IT[id])||{}).tie;return t?list('tie').find(x=>x.id==t):null};
const SETS=[['tie','🧕','קשירות למטפחת'],['hair','💇','תסרוקות לפאה'],['mk','💄','איפור על האווטאר']];

// ---------- 1. the categories ----------
// v211 (Sara 15:08 "אני רוצה גם לערוך את התמונות האלו"): the picture she picked for the tile (cat180.js, SET.styCover) – one of her styles, an avatar picture or a photo she uploaded
const mine=set=>{try{return ((typeof SET=='object'&&SET&&SET.styCover)||{})[set]||null}catch(_){return null}};
// v212 (Sara 15:21 "אני רוצה שהאווטאר יעלה לי כאן 360 מעלות, יסתובב במעבר לעכבר"): '#c' / '#w' = her avatar with the cover / her wig, in 8 angles
function thumbOf(set){const p=mine(set);if(p&&p.k&&list(set).some(x=>key(x)==p.k))return p.k;
 if(p&&p.a){const h=/t_w\./.test(p.a)?'w':/t_c\./.test(p.a)?'c':'';return h?'#'+h:'@'+p.a}if(p&&p.u)return '@'+p.u;
 const x=list(set)[0];return x?key(x):set=='hair'?'#w':'#c'}
const show=(el,u)=>{if(el.tagName=='IMG')el.src=u;else el.style.backgroundImage=`url("${u}")`};
function framesOf(k){try{const r=R();if(k[0]=='#')return r.headFrames?r.headFrames(k.slice(1)):Promise.resolve([]);return r.styFrames?r.styFrames(k):Promise.resolve([])}catch(_){return Promise.resolve([])}}
function paintThumbs(root){root.querySelectorAll('[data-sty202th]').forEach(el=>{const k=el.dataset.sty202th;if(!k||el.dataset.done==k)return;el.dataset.done=k;el._F=null;
 if(k[0]=='@')return show(el,k.slice(1));
 framesOf(k).then(F=>{if(el.dataset.done!=k)return;if(F&&F.length==8&&F[0]){el._F=F;if(!el._t)show(el,F[0]);
   const box=el.tagName=='IMG'?el.parentNode:el;if(box&&!box.querySelector('.c212h'))box.insertAdjacentHTML('beforeend','<i class="c212h" aria-hidden="true">🔄 360</i>');return}
  if(k[0]=='#')return show(el,`a8/t_${k.slice(1)}.webp?v=${window.A8V||window.VER||''}`);   // the frames did not load: her avatar head, still
  try{R().styThumb(k).then(u=>{if(u&&el.dataset.done==k)show(el,u)})}catch(_){}})})}
// with a mouse: turns while the mouse is over it, back to the front when it leaves (like the categories, cat180)
const still=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(_){return false}};
function spinOn(el){if(el._t||!el._F)return;let i=0;el._t=setInterval(()=>{i=(i+1)%8;show(el,el._F[i])},still()?450:170)}
function spinOff(el){if(el._t){clearInterval(el._t);el._t=null}if(el._F)show(el,el._F[0])}
const tileEl=e=>{if(e.pointerType=='touch')return null;const b=e.target.closest&&e.target.closest('.sty202c');if(!b||(e.relatedTarget&&b.contains(e.relatedTarget)))return null;return b.querySelector('[data-sty202th]')};
document.addEventListener('pointerover',e=>{const el=tileEl(e);if(el)spinOn(el)});
document.addEventListener('pointerout',e=>{const el=tileEl(e);if(el)spinOff(el)});
function home(){const row=document.querySelector('.h9cats');if(!row)return;let w=row.querySelector('.sty202h');
 const sig=SETS.map(([s])=>list(s).length+':'+thumbOf(s)).join('|');if(w&&w.dataset.sig==sig)return;
 const h=SETS.map(([s,i,n])=>{const k=thumbOf(s),c=list(s).length;return `<button type="button" class="h9cat sty202c" data-sty202="${s}">${k?`<span class="h9im"><img alt="" data-sty202th="${es(k)}" src=""></span>`:`<span class="h9im h9e">${i}</span>`}<b>${n}</b><small>${c||''}</small></button>`}).join('');
 if(!w){row.insertAdjacentHTML('beforeend',`<span class="sty202h" style="display:contents"></span>`);w=row.querySelector('.sty202h')}
 w.dataset.sig=sig;w.innerHTML=h;paintThumbs(w)}
function closet(){const d=document.getElementById('cl163');if(!d||!d.open)return;const b=d.querySelector('.cl163b');if(!b)return;let g=b.querySelector('.sty202g');
 const sig=SETS.map(([s])=>list(s).length+':'+thumbOf(s)).join('|');if(g&&g.dataset.sig==sig)return;
 const h=`<div class="cl163g">🎨 על האווטאר</div><div class="cl163t">${SETS.map(([s,i,n])=>{const k=thumbOf(s);return `<button class="cl163c sty202c" data-sty202="${s}"><i class="ph"${k?` data-sty202th="${es(k)}"`:''}>${k?'':`<span aria-hidden="true">${i}</span>`}</i><span class="n">${n} <b>${list(s).length}</b></span></button>`}).join('')}</div>`;
 if(!g){g=document.createElement('div');g.className='sty202g e71k';   // e71k: the d73 emoji tidy (layers68_74) must not hide the picture
 const x=b.querySelector('.cl163x');if(x)x.before(g);else b.appendChild(g)}
 g.dataset.sig=sig;g.innerHTML=h;paintThumbs(g)}
// the covers section: one line to the ties
function covers(){const sec=document.getElementById('scarves');if(!sec)return;const h2=sec.querySelector('h2');if(!h2)return;let l=sec.querySelector('.tie202s');const n=list('tie').length;
 const t='🧕 קשירות אמיתיות: בדף של כל כיסוי, "קשירות לכיסוי הזה". בוחרים קשירה, מעתיקים פרומפט ומעלים';   // v228
 if(l&&l.dataset.t==t)return;if(!l){l=document.createElement('div');l.className='tie202s';h2.after(l)}
 l.dataset.t=t;l.innerHTML=`<span>${es(t)}</span><button type="button" data-sty202="tie">${n?'הקשירות':'להוסיף'}</button>`}

// ---------- 2. a tie for this cover ----------
// v228 (Sara 26/10 21:14 "מזעזע לצבוע את המטפחת בצבע של המטפחת ... לשים על אותה מטפחת את הקשירות", 21:30 "בדף של הכיסוי ... כמה קשירות על אותו כיסוי,
// אני בוחרת סוג קשירה, אתה מכניס לי את הפרומט, אני מכניסה ל-GPT עם התמונה של הכיסוי, מעלה, ואז בוחרת איזו קשירה אני רואה בדף הראשי"):
// no more painting a grey tie in the cover's colour. Every cover keeps its OWN real ties: IT[id].tx=[{n,p,L,src,t,cv,sh}], the one on the avatar = IT[id].a8 (kind 'tiex').
const isCv=id=>!!D[id]&&cat0(id)=='scarves';
const cat0=id=>{try{return (D[id]||{}).cat||''}catch(_){return ''}};
const itx=id=>(typeof IT=='object'&&IT[id])||{};
const curTx=id=>{const a=itx(id).a8;return Array.isArray(a)&&a[0]&&a[0].k=='tiex'&&Array.isArray(a[0].L)?a[0]:null};
// her ties for this cover, the one she uploaded before v228 included
function txs(id){const L=(Array.isArray(itx(id).tx)?itx(id).tx:[]).filter(x=>x&&Array.isArray(x.L)&&x.L.length==8),c=curTx(id);
 if(c&&!L.some(x=>x.L[0]==c.L[0])){const t=tieOf(id);L.unshift(Object.assign({n:t?t.n:'הקשירה שהעלית'},c))}return L}
const isOn=(id,x)=>{const c=curTx(id);return !!c&&c.L[0]==x.L[0]};
const part=x=>({s:'head',k:'tiex',L:x.L,src:x.src||'',t:x.t||Date.now(),cv:x.cv||1,sh:x.sh||null});
const keyOf=id=>'u'+String(id).replace(/[^A-Za-z0-9]/g,'');
async function setTx(id,i,quiet){const L=txs(id),x=L[i];if(!x)return false;try{if(x.p&&window.STYORD)STYORD.rec('tie',x.p)}catch(_){}
 try{await putItem(id,{a8:[part(x)],tx:L})}catch(e){ERR('settx',e);toast_('לא הצלחתי לשמור. לנסות שוב');return false}
 try{R().sync()}catch(_){}if(!quiet)toast_(`✓ ${x.n} – על האווטאר`);return true}
async function delTx(id,i){const L=txs(id),x=L[i];if(!x)return;const on=isOn(id,x),nu=L.filter((_,j)=>j!=i);
 const p={tx:nu.length?nu:''};if(on)p.a8=nu.length?[part(nu[0])]:'';
 try{await putItem(id,p)}catch(e){ERR('deltx',e);return}try{R().sync()}catch(_){}paintPK();
 toast_(`הקשירה "${x.n}" הוסרה`,async()=>{await putItem(id,{tx:L,a8:on?[part(x)]:itx(id).a8||''});try{R().sync()}catch(_){}paintPK()})}
// the upload: av188 cuts it whole ('tiex') and saves a8; here it is also kept in tx under the tie she picked
const TXN={};
window.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-tx228]');if(!b)return;const p=P(),i=+b.dataset.tx228,t=p&&p.TIES[i];
 if(t)TXN[b.dataset.up188]={n:t[0],p:'w'+i}},true);   // window capture: before av188's document listener
if(typeof putItem=='function'){const _pi=putItem;putItem=function(id,patch,...r){try{const a=patch&&patch.a8,n=TXN[id];
 if(n&&Array.isArray(a)&&a[0]&&a[0].k=='tiex'&&!('tx' in patch)){delete TXN[id];const old=txs(id).find(x=>x.n==n.n||x.p==n.p),cu=n.cu||(old&&old.cu)||'';patch.tx=[...txs(id).filter(x=>x.n!=n.n&&x.p!=n.p),Object.assign({n:n.n,p:n.p},cu?{cu}:{},a[0])]}}catch(e){ERR('wrap',e)}
 return _pi.call(this,id,patch,...r)}}

function barBtn(){const d=document.getElementById('dlg');if(!d||!d.open)return;const bar=d.querySelector('#dlbody .it77');if(!bar)return;
 const ed=d.querySelector('#dlbody .ed[data-id]'),id=(ed&&ed.dataset.id)||(typeof CUR!='undefined'?CUR:'');let b=bar.querySelector('.tie202b');
 if(!id||!isCv(id)){if(b)b.remove();const o=d.querySelector('.t228box');if(o)o.remove();return}
 const L=txs(id),c=L.find(x=>isOn(id,x)),txt=L.length?`🧕 הקשירות שלו (${L.length})`:'🧕 קשירות לכיסוי הזה';
 if(!(b&&b.dataset.id==id&&b.dataset.t==txt)){if(!b){b=document.createElement('button');b.type='button';b.className='tie202b';const go=bar.querySelector('.it77t');if(go)go.after(b);else bar.prepend(b)}
  b.dataset.id=id;b.dataset.tie202=id;b.dataset.t=txt;b.textContent=txt;b.setAttribute('aria-label','הקשירות של הכיסוי הזה')}
 // and a box she sees in the page itself, under the buttons
 let x=d.querySelector('.t228box');const sig=id+'|'+L.map(y=>y.n+(isOn(id,y)?'*':'')).join(',');if(x&&x.dataset.sig==sig)return;
 if(!x){x=document.createElement('div');x.className='t228box';bar.after(x)}x.dataset.sig=sig;
 x.innerHTML=`<div class="t228bt"><b>🧕 קשירות לכיסוי הזה</b><small>${L.length?`${L.length} מוכנות${c?` · על האווטאר: ${es(c.n)}`:''}`:'בוחרים קשירה, מעתיקים פרומפט, ומעלים את מה ש-GPT מחזיר'}</small></div>
  ${L.length?`<div class="t228bs">${L.slice(0,6).map(y=>`<img alt="${es(y.n)}" data-t228th="${es(y.L[0])}" src="/_blob/${es(y.L[0])}"${isOn(id,y)?' class="on"':''}>`).join('')}</div>`:''}
  <button type="button" class="mkp" data-tie202="${es(id)}">${L.length?'לבחור / להוסיף קשירה':'➕ להכין קשירה'}</button>`}
let PK=null,PID='';
// v202 (Sara 11:09): her real scarf in the chosen tie → this cover's own 8-angle picture (cut whole, av188 'tiex')
const P=()=>window.STYP;
function itemTxt(id){const x=D[id]||{};return nm(id)+(x.color?`, צבע: ${x.color}`:'')}
async function save(what){try{let bl;if(what=='sheet')bl=await (await fetch('a8/sheet.jpg?v='+(window.VER||''))).blob();
  else{try{await thLoad(D[PID].cat)}catch(_){}bl=await (await fetch(R().ph(PID))).blob()}
  await R().saveFile(what=='sheet'?'avatar-8-angles.jpg':'scarf-'+PID+'.jpg',bl)}catch(e){ERR('save',e);toast_(what=='sheet'?'לא הצלחתי לשמור':'לא הצלחתי. אפשר צילום מסך של המטפחת')}}
async function copyP(b,i){const p=P(),t=p&&p.TIES[i];if(!t)return;return copyTxt(b,p.exact(itemTxt(PID),t[0],t[1])+CUASK)}
async function copyTxt(b,text){let ok=false;
 try{await navigator.clipboard.writeText(text);ok=true}catch(_){}
 if(!ok){try{const ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;opacity:0';PK.appendChild(ta);ta.select();ok=document.execCommand('copy');ta.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי להעתיק';setTimeout(()=>{if(b.isConnected)b.textContent=o},2600)}
async function saveSrc(c){try{const bl=await (await fetch('/_blob/'+c.doc.src)).blob(),u=URL.createObjectURL(bl),m=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=u});
  const cv=document.createElement('canvas');cv.width=m.naturalWidth;cv.height=m.naturalHeight;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);g.drawImage(m,0,0);URL.revokeObjectURL(u);
  const jb=await new Promise(r=>cv.toBlob(r,'image/jpeg',.92));await R().saveFile('tie-'+String(c.n).replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-+|-+$/g,'').slice(0,40)+'.jpg',jb||bl)}catch(e){ERR('src',e);toast_('לא הצלחתי לשמור את התמונה')}}
// the close-up, big
let BV=null;function big245(a){if(!BV){BV=document.createElement('dialog');BV.id='t245v';BV.dir='rtl';document.body.appendChild(BV);BV.addEventListener('click',e=>{if(e.target===BV||e.target.closest('.mkx'))BV.close()})}
 BV.innerHTML=`<button type="button" class="mkx" aria-label="סגירה">✕</button><img alt="תקריב של הקשירה" src="/_blob/${es(a)}">`;BV.showModal()}
function closeAll(){PK.close();try{const dl=document.getElementById('dlg');if(dl&&dl.open)dl.close()}catch(_){}}
function pk(){if(PK)return PK;PK=document.createElement('dialog');PK.id='tie202';PK.dir='rtl';PK.setAttribute('aria-labelledby','tie202t');document.body.appendChild(PK);
 PK.addEventListener('cancel',e=>{e.preventDefault();PK.close()});
 const sp=(e,on)=>{if(e.pointerType!='mouse')return;const b=e.target.closest&&e.target.closest('[data-t245spin]');if(!b||(e.relatedTarget&&b.contains(e.relatedTarget)))return;const im=b.querySelector('img');if(im){if(on)spin245(im);else stop245(im)}};
 PK.addEventListener('pointerover',e=>sp(e,1));PK.addEventListener('pointerout',e=>sp(e,0));
 PK.addEventListener('click',async e=>{if(e.target===PK)return PK.close();const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(b.classList.contains('mkx'))return PK.close();
  if(d.t228on!=null){if(await setTx(PID,+d.t228on))paintPK();return}
  if(d.t228see!=null){if(!isOn(PID,txs(PID)[+d.t228see])&&!await setTx(PID,+d.t228see,1))return;closeAll();setTimeout(()=>{try{R().openWith(null,{a:PID})}catch(er){ERR('see',er)}},120);return}
  if(d.t228home!=null){if(!isOn(PID,txs(PID)[+d.t228home])&&!await setTx(PID,+d.t228home,1))return;try{R360T().setHead(keyOf(PID))}catch(er){ERR('home',er)}
   paintPK();toast_('✓ בדף הראשי האווטאר עם הכיסוי הזה, בקשירה הזו');return}
  if(d.t228del!=null){if(typeof sure=='function'&&!sure(b,'בטוח? לחצי שוב'))return;delTx(PID,+d.t228del);return}
  if(d.t228cp!=null)return copyP(b,+d.t228cp);
  if(d.t245cpi!=null){const [k,i]=d.t245cpi.split(':'),c=chOf(k,i);if(c)copyTxt(b,P().exact(itemTxt(PID),c.n,'')+CUASK);return}
  if(d.t245dl!=null){const [k,i]=d.t245dl.split(':'),c=chOf(k,i);if(c&&c.doc&&c.doc.src)saveSrc(c);return}
  if(d.t245up!=null){const [k,i]=d.t245up.split(':');pick245({id:PID,kind:k,i});return}
  if(d.t245cuup!=null){pick245({id:PID,cuOnly:+d.t245cuup});return}
  if(d.t245cu!=null){big245(d.t245cu);return}
  if(d.t245spin!=null){const im=b.querySelector('img');if(im){if(im._t)stop245(im);else spin245(im,true)}return}
  if(d.tie202dl)return save(d.tie202dl);
  if(d.sty202){PK.close();try{S().open('tie')}catch(_){}}});return PK}
const R360T=()=>window.R360&&R360.today||null;
function paintPK(){if(!PK||!PK.open||!PID)return;const y=PK.scrollTop;open(PID).then(()=>{PK.scrollTop=y})}
// v245 (Sara 27/10 12:49 "שכל התמונה תהיה ממש גדולה ... שאני יכולה לגעת בה ולהסתובב ... 3 בשורה ... את הפרומט שבמלל ... אפשרות להוריד את התמונה שממנו גזרנו את הקשירה"):
// a wide window, 3 big pictures in a row that turn (mouse over / a tap), and for every tie two ways to GPT: the prompt in words, or its 8-angle picture + a short prompt.
// 12:52 "תמונה אחת שרואים את המטפחת מתקריב ... מקדימה ומאחורה": GPT also returns a close-up; she uploads both together, the close-up shows big on her tie's card.
const CUASK=`

בנוסף לגיליון, הפיקי תמונה שנייה נפרדת: תקריב חד ואיכותי של הראש והכתפיים עם המטפחת – בצד אחד מקדימה ובצד השני מאחור, על אותו רקע. הפנים שלי בדיוק כמו בגיליון. רואים היטב את הבד, ההדפס, הקשר והשובלים.`;
const libAll=()=>list('tie').filter(x=>{try{return !S().gone(x)}catch(_){return true}});
// the ties of the list: her 20 (w0..w19, with or without a picture) and the ties that came as pictures only (the 27 of 27/10)
function choices(){const p=P(),T=p?p.TIES:[],lib=libAll(),O=window.STYORD,rk=u=>O?O.rank('tie',u):0;
 const pre=T.map((t,i)=>{const d=lib.find(y=>y.p=='w'+i);return {kind:'w',i,no:i+1,n:t[0],he:t[2]||'',doc:d||null,p:'w'+i}}).sort((a,b)=>rk(a.p)-rk(b.p)||a.i-b.i);
 const pics=lib.filter(x=>!/^w\d+$/.test(x.p||'')&&!/^t\d+$/.test(x.p||'')&&x.src).map((d,j)=>({kind:'d',i:d.id,n:d.n,he:'',doc:d,p:'id:'+d.id,j,no:/^\d+\./.test(d.n||'')?parseInt(d.n):1e3})).sort((a,b)=>rk(a.p)-rk(b.p)||a.no-b.no||a.j-b.j);
 return {pre,pics}}
const chOf=(k,i)=>{const c=choices();return k=='w'?c.pre.find(x=>x.i==+i):c.pics.find(x=>x.i==i)};
function card(id,c,L){const m=L.find(x=>x.p==c.p||x.n==c.n),k=c.doc?key(c.doc):'',src=c.doc&&c.doc.src;
 const pic=k?`<button type="button" class="t245p" data-t245spin aria-label="לסובב: ${es(c.n)}"><img alt="" data-t245k="${es(k)}" src=""><i class="c212h" aria-hidden="true">🔄 360</i></button>`:`<span class="t245p none"><i aria-hidden="true">🧕</i><small>עוד אין תמונה</small></span>`;
 return `<div class="t245c${m?' done':''}">${pic}<b class="t245n">${c.kind=='w'?c.no+'. ':''}${es(c.n)}</b>${m?'<em>✓ כבר הכנת לכיסוי הזה</em>':''}${c.he?`<small class="t245h">${es(c.he)}</small>`:''}
  <span class="t245b">${c.kind=='w'?`<button type="button" data-t228cp="${c.i}">📋 פרומפט במלל</button>`:''}${src?`<button type="button" data-t245cpi="${c.kind}:${es(c.i)}">🖼 פרומפט לתמונה</button><button type="button" data-t245dl="${c.kind}:${es(c.i)}">⬇ תמונת 8 הזוויות</button>`:''}
  <button type="button" class="mkp" data-t245up="${c.kind}:${es(c.i)}">${m?'🔄 להחליף':'📤 להעלות'}</button></span></div>`}
async function open(id){PID=id;pk();const L=txs(id),O=window.STYORD,rk=u=>O?O.rank('tie',u):0,LI=L.map((x,i)=>i).sort((a,b)=>rk(L[a].p)-rk(L[b].p)||a-b);let home='';try{home=R360T().head()}catch(_){}
 const {pre,pics}=choices();
 PK.innerHTML=`<div class="mk"><div class="mkh"><h3 id="tie202t">🧕 הקשירות של ${es(nm(id).split(' ').slice(0,5).join(' '))}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  ${L.length?`<h4 class="t228h">הקשירות שהכנת לכיסוי הזה <small>${L.length}</small></h4><p class="tie202p">לוחצים על הכפתור "על האווטאר" והיא זו שעלייך. 🏠 שמה אותה בדף הראשי. 🔍 פותח את התקריב בגדול.</p>
  <div class="t245g">${LI.map(i=>[L[i],i]).map(([x,i])=>{const on=isOn(id,x);return `<div class="t245c mine${on?' on':''}">
   ${x.cu?`<button type="button" class="t245p cu" data-t245cu="${es(x.cu)}" aria-label="תקריב גדול: ${es(x.n)}"><img alt="תקריב: ${es(x.n)}" src="/_blob/${es(x.cu)}"><i class="c212h" aria-hidden="true">🔍 להגדיל</i></button>`:''}
   <button type="button" class="t245p${x.cu?' sm':''}" data-t245spin aria-label="לסובב: ${es(x.n)}"><img alt="" data-t245l="${es(x.L.join(','))}" src="/_blob/${es(x.L[0])}"><i class="c212h" aria-hidden="true">🔄 360</i></button>
   <b class="t245n">${es(x.n)}</b>${on?'<em>✓ על האווטאר</em>':''}${on&&home==keyOf(id)?'<em>🏠 בדף הראשי</em>':''}
   <span class="t245b">${on?'':`<button type="button" class="mkp" data-t228on="${i}">על האווטאר</button>`}<button type="button" data-t228see="${i}">👀 עליי</button><button type="button" data-t228home="${i}">🏠 לדף הראשי</button>
    <button type="button" data-t245cuup="${i}">${x.cu?'🔄 תקריב אחר':'🔍 להעלות תקריב'}</button><button type="button" data-t228del="${i}" aria-label="להסיר את ${es(x.n)}">🗑</button></span></div>`}).join('')}</div>`:''}
  <h4 class="t228h">➕ קשירה ${L.length?'נוספת':'ראשונה'} לכיסוי הזה</h4>
  <ol class="t228s"><li><b>⬇ שומרים</b> את התמונה של הכיסוי ואת הבובה (פעם אחת).<span class="mkb"><button type="button" data-tie202dl="photo">⬇ תמונת הכיסוי</button><button type="button" data-tie202dl="sheet">⬇ הבובה ב-8 זוויות</button></span></li>
   <li>בוחרים קשירה, ויש שתי דרכים: <b>📋 פרומפט במלל</b> (מצרפים ל-GPT את הכיסוי ואת הבובה), או <b>🖼 פרומפט לתמונה</b> + <b>⬇ תמונת 8 הזוויות</b> של הקשירה (מצרפים את הכיסוי, הבובה ותמונת הקשירה).</li>
   <li>GPT מחזיר שתי תמונות: הגיליון ב-8 זוויות ותקריב מקדימה ומאחור. <b>📤 מעלים את שתיהן יחד</b> באותה קשירה – אני מזהה לבד מה כל אחת.</li></ol>
  ${pics.length?`<h4 class="t228h">🆕 הקשירות שהבאת בתמונות <small>${pics.length}</small></h4><div class="t245g">${pics.map(c=>card(id,c,L)).join('')}</div>`:''}
  <h4 class="t228h">📝 הקשירות מהרשימה <small>${pre.length}</small></h4><div class="t245g">${pre.map(c=>card(id,c,L)).join('')}</div></div>`;
 if(!PK.open)PK.showModal();PKS=L.map(x=>x.n+(isOn(id,x)?'*':'')).join(',');
 // the whole avatar wearing it (head to hips), loaded when the card comes into view; the small head picture until then
 if(IO245)IO245.disconnect();IO245=('IntersectionObserver' in window)?new IntersectionObserver(es_=>es_.forEach(e=>{if(!e.isIntersecting)return;IO245.unobserve(e.target);framesFor(e.target).then(F=>{if(F&&!e.target._t)e.target.src=F[0]})}),{root:PK,rootMargin:'300px'}):null;
 PK.querySelectorAll('img[data-t245l]').forEach(i=>{if(IO245)IO245.observe(i);else framesFor(i).then(F=>{if(F)i.src=F[0]})});
 PK.querySelectorAll('img[data-t245k]').forEach(i=>{try{R().styThumb(i.dataset.t245k).then(u=>{if(u&&!i._F)i.src=u})}catch(_){}if(IO245)IO245.observe(i)})}
let IO245=null;
// turning: the frames load on the first touch / mouse-over only (47 ties × 8 pictures would be slow to open)
// her own tie of this cover is 8 cut-out layers with a small head at the top: crop all 8 to the same box around what was cut, so the tie fills the card
const CF={};function cropFrames(ids){const ck=ids.join(',');if(CF[ck])return CF[ck];return CF[ck]=(async()=>{
 const ims=await Promise.all(ids.map(a=>new Promise(r=>{const m=new Image();m.onload=()=>r(m);m.onerror=()=>r(null);m.src='/_blob/'+a})));if(ims.some(m=>!m))return null;
 const W=ims[0].naturalWidth,H=ims[0].naturalHeight,k=Math.min(1,160/W),w=Math.round(W*k),h=Math.round(H*k),c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d',{willReadFrequently:true});
 let x0=w,y0=h,x1=-1,y1=-1;for(const m of ims){g.clearRect(0,0,w,h);g.drawImage(m,0,0,w,h);const d=g.getImageData(0,0,w,h).data;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>40){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}
 if(x1<0)return null;let bx=x0/k,by=y0/k,bw=(x1-x0+1)/k,bh=(y1-y0+1)/k;const pd=Math.max(bw,bh)*.06;bx-=pd;by-=pd;bw+=2*pd;bh+=2*pd;
 let cw=Math.max(bw,bh*.75),ch=cw/.75;const cx=bx+bw/2;const o=document.createElement('canvas');o.width=360;o.height=480;const og=o.getContext('2d');
 return ims.map(m=>{og.clearRect(0,0,360,480);og.drawImage(m,cx-cw/2,by,cw,ch,0,0,360,480);return o.toDataURL('image/webp',.9)})})()}
async function framesFor(img){if(img._F)return img._F;if(img.dataset.t245l){const F=await cropFrames(img.dataset.t245l.split(','));img._F=F||img.dataset.t245l.split(',').map(a=>'/_blob/'+a);return img._F}
 const F=await framesOf(img.dataset.t245k);if(F&&F.length==8&&F[0])img._F=F;return img._F||null}
async function spin245(img,once){if(img._t)return;const F=await framesFor(img);if(!F||img._t)return;let i=0;
 img._t=setInterval(()=>{i=(i+1)%8;img.src=F[i];if(once&&i==0){clearInterval(img._t);img._t=null}},still()?450:170)}
function stop245(img){if(img._t){clearInterval(img._t);img._t=null}if(img._F)img.src=img._F[0]}
// a sheet with 8 angles has thin light lines between its 4 columns; a close-up doesn't
function sheetScore(f){return new Promise(res=>{const u=URL.createObjectURL(f),m=new Image();m.onload=()=>{try{const w=300,h=Math.max(1,Math.round(m.naturalHeight*w/m.naturalWidth)),c=document.createElement('canvas');c.width=w;c.height=h;
  const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(m,0,0,w,h);const d=g.getImageData(0,0,w,h).data;let sc=0;
  for(const fx of [.25,.5,.75]){let best=0;for(let x=Math.round(w*fx)-6;x<=Math.round(w*fx)+6;x++){let n=0;for(let y=0;y<h;y++){const k=(y*w+x)*4,mx=Math.max(d[k],d[k+1],d[k+2]),mn=Math.min(d[k],d[k+1],d[k+2]);if(mn>215&&mx-mn<22)n++}best=Math.max(best,n/h)}if(best>.8)sc++}
  res(sc+(w/h>1.2&&w/h<1.5?.5:0))}catch(_){res(0)}URL.revokeObjectURL(u)};m.onerror=()=>{URL.revokeObjectURL(u);res(0)};m.src=u})}
async function cuBlob(f){const u=URL.createObjectURL(f);try{const m=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=u});const k=Math.min(1,1600/Math.max(m.naturalWidth,m.naturalHeight));
  const c=document.createElement('canvas');c.width=Math.round(m.naturalWidth*k);c.height=Math.round(m.naturalHeight*k);c.getContext('2d').drawImage(m,0,0,c.width,c.height);
  return await new Promise(r=>c.toBlob(b=>r(b||f),'image/jpeg',.9))}catch(_){return f}finally{URL.revokeObjectURL(u)}}
async function upCu(f){let a=null;try{a=await claude.use('assets')}catch(_){}if(!a){toast_('לא הצלחתי לשמור את התקריב');return ''}
 try{toast_('שומרת את התקריב…');const r=await a.upload(await cuBlob(f));return r&&r.id||''}catch(e){ERR('cu',e);toast_('התקריב לא עלה. לנסות שוב');return ''}}
let FI245=null,UP245=null;
function pick245(what){UP245=what;if(!FI245){FI245=document.createElement('input');FI245.type='file';FI245.accept='image/*';FI245.multiple=true;FI245.hidden=true;document.body.appendChild(FI245);
  FI245.addEventListener('change',()=>{const fs=[...FI245.files];FI245.value='';if(fs.length&&UP245)got245(UP245,fs).catch(e=>ERR('up245',e))})}FI245.click()}
async function got245(w,fs){const id=w.id;
 if(w.cuOnly!=null){const L=txs(id),x=L[w.cuOnly];if(!x)return;const cu=await upCu(fs[0]);if(!cu)return;
  const nu=L.map((y,j)=>j==w.cuOnly?Object.assign({},y,{cu}):y);try{await putItem(id,{tx:nu})}catch(e){ERR('cuput',e);return}toast_('✓ התקריב נשמר');paintPK();return}
 let sheet=fs[0],close=null;if(fs.length>1){const sc=await Promise.all(fs.slice(0,2).map(sheetScore));const si=sc[1]>sc[0]?1:0;sheet=fs[si];close=fs[1-si]}
 const c=chOf(w.kind,w.i);if(!c)return;let cu='';if(close)cu=await upCu(close);
 TXN[id]={n:c.n,p:c.p,cu};if(typeof window.av188up!='function'){toast_('לא הצלחתי להעלות. לרענן את הדף');return}
 window.av188up(id,[sheet],true)}
// its own toast says what was saved
{const _bp=window.beforePut;if(typeof _bp=='function')beforePut=function(id,patch){const k=patch&&Object.keys(patch);if(k&&k.length&&k.every(x=>x=='tie'||x=='tc'||x=='tx'||x=='a8'||x=='a8up'))return;return _bp.apply(this,arguments)}}
window.tie202open=id=>{try{window.STYORD&&STYORD.freeze()}catch(_){}return open(id).catch(e=>ERR('open',e))};
window.tie228={txs,set:async(id,i)=>{const ok=await setTx(id,i);barBtn();return ok}};
// the tie's picture is a whole 8-angle frame with a small head: show the head itself, cropped to what was cut
const TH={};
function headThumb(a){if(TH[a])return TH[a];return TH[a]=new Promise(res=>{const m=new Image();m.onload=()=>{try{const W=m.naturalWidth,H=m.naturalHeight,k=Math.min(1,120/W),w=Math.round(W*k),h=Math.round(H*k);
 const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(m,0,0,w,h);const d=g.getImageData(0,0,w,h).data;
 let x0=w,y0=h,x1=-1,y1=-1;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>40){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
 if(x1<0)return res('');let bx=x0/k,by=y0/k,bw=(x1-x0+1)/k,bh=(y1-y0+1)/k;const pd=Math.max(bw,bh)*.08;bx-=pd;by-=pd;bw+=2*pd;bh+=2*pd;
 const S=Math.max(bw,bh*.8),cx=bx+bw/2,cw=S,ch=S*1.25,o=document.createElement('canvas');o.width=240;o.height=300;
 o.getContext('2d').drawImage(m,cx-cw/2,by,cw,ch,0,0,240,300);res(o.toDataURL('image/webp',.9))}catch(_){res('')}};m.onerror=()=>res('');m.src='/_blob/'+a})}
function thumbs(){document.querySelectorAll('img[data-t228th]').forEach(i=>{const a=i.dataset.t228th;if(i.dataset.t228d==a)return;i.dataset.t228d=a;headThumb(a).then(u=>{if(u&&i.dataset.t228th==a)i.src=u})})}
let PKS=null;function pkTick(){if(!PK||!PK.open||!PID||PKS===null)return;const s=txs(PID).map(x=>x.n+(isOn(PID,x)?'*':'')).join(',');if(s!=PKS){PKS=s;paintPK()}}   // a tie she just uploaded shows up

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sty202],[data-tie202]');if(!t||t.closest('#tie202'))return;e.preventDefault();e.stopPropagation();
 if(t.dataset.tie202){try{window.STYORD&&STYORD.freeze()}catch(_){}open(t.dataset.tie202).catch(er=>ERR('open',er));return}
 const c=document.getElementById('cl163');if(c&&c.open&&c.contains(t))c.close();try{S().open(t.dataset.sty202)}catch(er){ERR('lib',er)}},true);
function tick(){try{home();closet();covers();barBtn();pkTick();thumbs()}catch(e){ERR('tick',e)}}
if(typeof afterOpen=='function'){const _ao=afterOpen;afterOpen=function(){const r=_ao.apply(this,arguments);setTimeout(barBtn,0);setTimeout(barBtn,350);return r}}
setInterval(tick,700);setTimeout(tick,500);
})();
