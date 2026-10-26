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
function thumbOf(set){const p=mine(set);if(p&&p.k&&list(set).some(x=>key(x)==p.k))return p.k;if(p&&(p.u||p.a))return '@'+(p.u||p.a);const x=list(set)[0];return x?key(x):''}
function paintThumbs(root){root.querySelectorAll('[data-sty202th]').forEach(el=>{const k=el.dataset.sty202th;if(!k||el.dataset.done==k)return;el.dataset.done=k;
 if(k[0]=='@'){const u=k.slice(1);if(el.tagName=='IMG')el.src=u;else el.style.backgroundImage=`url("${u}")`;return}
 try{R().styThumb(k).then(u=>{if(!u)return;if(el.tagName=='IMG')el.src=u;else el.style.backgroundImage=`url("${u}")`})}catch(_){}})}
function home(){const row=document.querySelector('.h9cats');if(!row)return;let w=row.querySelector('.sty202h');
 const sig=SETS.map(([s])=>list(s).length+':'+thumbOf(s)).join('|');if(w&&w.dataset.sig==sig)return;
 const h=SETS.map(([s,i,n])=>{const k=thumbOf(s),c=list(s).length;return `<button type="button" class="h9cat sty202c" data-sty202="${s}">${k?`<span class="h9im"><img alt="" data-sty202th="${es(k)}" src=""></span>`:`<span class="h9im h9e">${i}</span>`}<b>${n}</b><small>${c||''}</small></button>`}).join('');
 if(!w){row.insertAdjacentHTML('beforeend',`<span class="sty202h" style="display:contents"></span>`);w=row.querySelector('.sty202h')}
 w.dataset.sig=sig;w.innerHTML=h;paintThumbs(w)}
function closet(){const d=document.getElementById('cl163');if(!d||!d.open)return;const b=d.querySelector('.cl163b');if(!b)return;let g=b.querySelector('.sty202g');
 const sig=SETS.map(([s])=>list(s).length+':'+thumbOf(s)).join('|');if(g&&g.dataset.sig==sig)return;
 const h=`<div class="cl163g">🎨 על האווטאר</div><div class="cl163t">${SETS.map(([s,i,n])=>{const k=thumbOf(s);return `<button class="cl163c sty202c" data-sty202="${s}"><i class="ph"${k?` data-sty202th="${es(k)}"`:''}>${k?'':`<span aria-hidden="true">${i}</span>`}</i><span class="n">${n} <b>${list(s).length}</b></span></button>`}).join('')}</div>`;
 if(!g){g=document.createElement('div');g.className='sty202g';const x=b.querySelector('.cl163x');if(x)x.before(g);else b.appendChild(g)}
 g.dataset.sig=sig;g.innerHTML=h;paintThumbs(g)}
// the covers section: one line to the ties
function covers(){const sec=document.getElementById('scarves');if(!sec)return;const h2=sec.querySelector('h2');if(!h2)return;let l=sec.querySelector('.tie202s');const n=list('tie').length;
 const t=n?`🧕 ${n} קשירות. בחלון של כל כיסוי בוחרים לו קשירה`:'🧕 קשירות למטפחת: מעלים פעם אחת, וכל כיסוי משתמש בהן';
 if(l&&l.dataset.t==t)return;if(!l){l=document.createElement('div');l.className='tie202s';h2.after(l)}
 l.dataset.t=t;l.innerHTML=`<span>${es(t)}</span><button type="button" data-sty202="tie">${n?'הקשירות':'להוסיף'}</button>`}

// ---------- 2. a tie for this cover ----------
function barBtn(){const d=document.getElementById('dlg');if(!d||!d.open)return;const bar=d.querySelector('#dlbody .it77');if(!bar)return;
 const ed=d.querySelector('#dlbody .ed[data-id]'),id=(ed&&ed.dataset.id)||(typeof CUR!='undefined'?CUR:'');let b=bar.querySelector('.tie202b');
 if(!id||!isCover(id)){if(b)b.remove();return}
 const t=tieOf(id),txt=t?'🧕 '+t.n:'🧕 לבחור קשירה';if(b&&b.dataset.id==id&&b.dataset.t==txt)return;
 if(!b){b=document.createElement('button');b.type='button';b.className='tie202b';const go=bar.querySelector('.it77t');if(go)go.after(b);else bar.prepend(b)}
 b.dataset.id=id;b.dataset.tie202=id;b.dataset.t=txt;b.textContent=txt;b.setAttribute('aria-label',t?`הקשירה של הכיסוי: ${t.n}. לשנות`:'לבחור קשירה לכיסוי')}
let PK=null,PID='';
// v202 (Sara 11:09 "אני רוצה כן אפשרות לפרומט מדוייק עם הקשירה שבחרתי + הכיסוי ... המטפחת המדוייקת שקניתי שהיא תהיה בפרונט"):
// her real scarf in the chosen tie → uploaded as this cover's own 8-angle picture (cut whole, av188 'tiex'), which then comes first
const P=()=>window.STYP;
const det=t=>{const p=P(),x=t&&p&&p.TIES.find(y=>y[0]==t.n);return x?x[1]:''};
const own=id=>{try{return R().isReady(id)}catch(_){return false}};
function itemTxt(id){const x=D[id]||{};return nm(id)+(x.color?`, צבע: ${x.color}`:'')}
function exactHTML(id){const cur=tieOf(id),d=det(cur);
 return `<details class="tie202x"${own(id)?'':''}><summary>🎯 פרומפט מדויק: המטפחת שלך עם ההדפס</summary>
  ${own(id)?'<p class="tie202ok">✓ לכיסוי הזה יש כבר תמונה מדויקת על האווטאר. היא הראשית, והקשירות האחרות נשארות לבחירה.</p>':''}
  <p class="tie202p">${cur?`עם הקשירה "${es(cur.n)}". `:'קודם בוחרים קשירה למעלה. '}ב-GPT, בהודעה אחת: תמונת המטפחת, הבובה${d?'':' ותמונה של הקשירה'}, ומדביקים את הפרומפט. את מה שחוזר מעלים כאן, והוא יהיה הראשי של הכיסוי.</p>
  <div class="mkb"><button type="button" data-tie202dl="photo">⬇ תמונת המטפחת</button><button type="button" data-tie202dl="sheet">⬇ הבובה ב-8 זוויות</button>
   <button type="button" class="mkp" data-tie202copy${cur?'':' disabled'}>📋 להעתיק את הפרומפט</button><button type="button" class="mkp" data-up188="${es(id)}" data-w="1">📤 להעלות את מה שחזר</button></div></details>`}
async function save(what){try{let bl;if(what=='sheet')bl=await (await fetch('a8/sheet.jpg?v='+(window.VER||''))).blob();
  else{try{await thLoad(D[PID].cat)}catch(_){}bl=await (await fetch(R().ph(PID))).blob()}
  await R().saveFile(what=='sheet'?'avatar-8-angles.jpg':'scarf-'+PID+'.jpg',bl)}catch(e){ERR('save',e);toast_(what=='sheet'?'לא הצלחתי לשמור':'לא הצלחתי. אפשר צילום מסך של המטפחת')}}
async function copyP(b){const cur=tieOf(PID),p=P();if(!cur||!p)return;const text=p.exact(itemTxt(PID),cur.n,det(cur));let ok=false;
 try{await navigator.clipboard.writeText(text);ok=true}catch(_){}
 if(!ok){try{const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0';PK.appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}catch(_){}}
 const o=b.textContent;b.textContent=ok?'✓ הועתק – עכשיו ל-GPT':'לא הצלחתי להעתיק';setTimeout(()=>{if(b.isConnected)b.textContent=o},2600)}
function pk(){if(PK)return PK;PK=document.createElement('dialog');PK.id='tie202';PK.dir='rtl';PK.setAttribute('aria-labelledby','tie202t');document.body.appendChild(PK);
 PK.addEventListener('cancel',e=>{e.preventDefault();PK.close()});
 PK.addEventListener('click',e=>{if(e.target===PK)return PK.close();const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(b.classList.contains('mkx'))return PK.close();
  if(d.tie202pick!=null)return pick(d.tie202pick);
  if(d.tie202dl)return save(d.tie202dl);
  if(d.tie202copy!=null)return copyP(b);
  if(d.tie202see!=null){PK.close();try{const dl=document.getElementById('dlg');if(dl&&dl.open)dl.close()}catch(_){}try{R().wearCover(PID)}catch(er){ERR('see',er)}return}
  if(d.sty202){PK.close();try{S().open('tie')}catch(_){}}});return PK}
async function open(id){PID=id;pk();const T=list('tie');let rgb=null;try{rgb=await R().itemRGB(id)}catch(_){}const cur=tieOf(id);
 PK.innerHTML=`<div class="mk"><div class="mkh"><h3 id="tie202t">🧕 קשירה ל${es(nm(id).split(' ').slice(0,4).join(' '))}</h3><button type="button" class="mkx" aria-label="סגירה">✕</button></div>
  ${T.length?`<p class="tie202p">בוחרים קשירה. היא נצבעת בצבע של הכיסוי${rgb?` <i class="tie202dot" style="background:rgb(${rgb.join(',')})"></i>`:''}.</p>
  <div class="tie202g" role="radiogroup" aria-label="קשירות">${T.map(x=>{const k=key(x);return `<button type="button" role="radio" aria-checked="${!!cur&&cur.id==x.id}" data-tie202pick="${es(x.id)}"><img alt="" data-k="${es(k)}" src=""><span>${es(x.n)}</span></button>`}).join('')}</div>
  <div class="mkb"><button type="button" class="mkp" data-tie202see>👀 לראות עליי</button><button type="button" data-sty202="tie">➕ עוד קשירות</button></div>${exactHTML(id)}`
  :`<p class="tie202p">עוד אין קשירות. מעלים כל קשירה פעם אחת (מטפחת אפורה על הבובה), ואז כל כיסוי בארון יכול ללבוש אותה, בצבע שלו.</p><div class="mkb"><button type="button" class="mkp" data-sty202="tie">🎨 להוסיף קשירות</button></div>`}</div>`;
 if(!PK.open)PK.showModal();
 PK.querySelectorAll('img[data-k]').forEach(i=>{try{R().styThumb(i.dataset.k,rgb).then(u=>{if(u)i.src=u})}catch(_){}})}
async function pick(sid){const x=list('tie').find(y=>y.id==sid);if(!x||!PID)return;
 PK.querySelectorAll('[data-tie202pick]').forEach(b=>b.setAttribute('aria-checked',b.dataset.tie202pick==sid));
 try{if(typeof putItem=='function')await putItem(PID,{tie:sid})}catch(e){ERR('put',e);toast_('לא הצלחתי לשמור. לנסות שוב');return}
 barBtn();const ex=PK.querySelector('.tie202x');if(ex){const o=ex.open;ex.outerHTML=exactHTML(PID);const n=PK.querySelector('.tie202x');if(n)n.open=o}
 toast_(`✓ ${x.n} – נשמרה לכיסוי`)}
// its own toast says what was saved
{const _bp=window.beforePut;if(typeof _bp=='function')beforePut=function(id,patch){const k=patch&&Object.keys(patch);if(k&&k.length&&k.every(x=>x=='tie'||x=='tc'))return;return _bp.apply(this,arguments)}}

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sty202],[data-tie202]');if(!t||t.closest('#tie202'))return;e.preventDefault();e.stopPropagation();
 if(t.dataset.tie202){open(t.dataset.tie202).catch(er=>ERR('open',er));return}
 const c=document.getElementById('cl163');if(c&&c.open&&c.contains(t))c.close();try{S().open(t.dataset.sty202)}catch(er){ERR('lib',er)}},true);
function tick(){try{home();closet();covers();barBtn()}catch(e){ERR('tick',e)}}
if(typeof afterOpen=='function'){const _ao=afterOpen;afterOpen=function(){const r=_ao.apply(this,arguments);setTimeout(barBtn,0);setTimeout(barBtn,350);return r}}
setInterval(tick,700);setTimeout(tick,500);
})();
