// ===== v85–v87 (2026-10-22): free search over the whole site – typing in the search bar also finds screens, tools,
// GPT prompts and saved looks (not only clothes). Results show in a strip right under the bar; one tap opens it.
(()=>{
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v85 '+w+': '+(e&&e.message||e));
const nf=s=>String(s||'').toLowerCase().replace(/[\u0591-\u05C7]/g,'').replace(/[׳'"״`]/g,'').replace(/ך/g,'כ').replace(/ם/g,'מ').replace(/ן/g,'נ').replace(/ף/g,'פ').replace(/ץ/g,'צ').replace(/[-–_/·,.()]/g,' ').replace(/\s+/g,' ').trim();
const shut=()=>{document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});document.body.style.overflow=''};
// click a button the site already handles (by its data- attribute), even when its menu is closed
const fire=attr=>{const b=document.createElement('button');b.setAttribute(attr,'');b.hidden=true;document.body.appendChild(b);b.click();b.remove()};
const tap=sel=>{const b=document.querySelector(sel);if(b){b.click();return true}return false};
const hub=t=>()=>{shut();openHub(t)};
// [icon, title, more words people may type, what happens]
const A=[
 ['👗','בניית לוק','סטודיו אווטאר דמות להלביש לנסות עליי',()=>{shut();openStudio()}],
 ['🧰','לוקים וכלים','כלים',hub('looks')],
 ['👗','הצעות ללוקים','לוקים מוכנים הצעה מה ללבוש',hub('looks')],
 ['♥','האלבום','לוקים ששמרתי אלבום אירועים כוכבים דירוג השוואה',hub('album')],
 ['📅','לוח שבועי','השבוע תכנון ימים גרירה',hub('week')],
 ['📊','תובנות','סטטיסטיקה מה חסר בארון צבעים הוצאות כמה שילמתי',hub('insights')],
 ['💰','החזרות וקרדיטים','החזרה זיכוי קרדיט ארנק כסף',hub('money')],
 ['🔎','לפני הזמנה','רשימת קניות קניה כפולים דומים',hub('check')],
 ['🏠','סדר בבית','מיקום ארגון ארון מגירה',hub('home')],
 ['👧','ילדים','בנות בנים מידות ילדים',hub('kids')],
 ['❓','טיפים','עזרה הסבר איך',hub('tips')],
 ['🔔','דברים חשובים','התראות פעמון החזרה אחרונה תזכורת',()=>{shut();openAlerts()}],
 ['🧍‍♀️','מה חסר לאווטאר','בגדים בלי תמונות 5 תנוחות מוכנים',()=>{shut();openMiss77()}],
 ['⬆','העלאת כמה גיליונות','גיליון GPT העלאה הרבה בבת אחת',()=>{shut();window.openBU83?openBU83():fire('data-bu83open')}],
 ['🔍','בדיקת כל התנוחות','בדיקה תנוחות QA גב צד מותן',()=>{shut();openQA83()}],
 ['📋','פרומטים ל-GPT','פרומט prompt gpt צאט העתקה',()=>{shut();openPrompts80()}],
 ['💾','גיבוי לקובץ','גיבוי שמירה הורדה קובץ backup',()=>fire('data-bk83')],
 ['🛠','משהו לא עובד','באג תקלה דיווח בעיה',()=>{shut();openBug77()}],
 ['⋯','פרטים נוספים','עוד תפריט',()=>{shut();tap('[data-h9="more"]')}],
 ['🎚','סינון','מסננים פילטר מידה צבע חנות',()=>{shut();tap('#fb')}],
 ['♥','מועדפים','אהבתי לב',()=>{shut();tap('[data-h9="fav"]')}],
 ['⏰','להחזרה בקרוב','זמן החזרה מיון',()=>{shut();tap('[data-h9="ret"]')}],
 ['🎲','תפתיעי אותי','הפתעה אקראי',()=>{shut();tap('[data-h9="rnd"]')}],
 ['☑','בחירה מרובה','לבחור כמה בגדים ביחד',()=>{shut();tap('[data-sel83]')||toast('הכפתור "☑ בחירה" נמצא מעל הארון')}],
 ['▦','תצוגת קיר','תמונות בלבד',()=>{shut();tap('[data-wall83]')||toast('הכפתור "▦ קיר" נמצא מעל הארון')}],
 ['🎤','חיפוש קולי','מיקרופון לדבר',()=>{shut();tap('.mic83')}],
];
// GPT prompts, one line per type (opens the prompt sheet on that type)
const PR=[['top','חולצה'],['sweater','סוודר'],['skirt','חצאית'],['dress','שמלה'],['set','סט'],['coat','מעיל'],['jacket','ז׳קט'],['vest','וסט אפוד'],['belt','חגורה'],['shoes','נעליים'],['bag','תיק'],
 ['jw','תכשיטים'],['jwn','שרשרת'],['jwe','עגיל'],['jwb','צמיד'],['tie5','כיסוי ראש 5 קשירות מטפחת'],['tie4','כיסוי ראש 4 זוויות מטפחת']];
PR.forEach(([k,n])=>A.push(['📋','פרומט ל'+n.split(' ')[0],'פרומט prompt gpt '+n,()=>{shut();openPrompts80(k)}]));
function found(q){const w=nf(q).split(' ').filter(Boolean);if(!w.length)return[];const out=[];
 const add=(ic,t,more,go,sub)=>{const T=nf(t),M=nf(more);if(!w.every(x=>T.includes(x)||M.includes(x)))return;let s=0;if(T.startsWith(w[0]))s+=6;else if((' '+T).includes(' '+w[0]))s+=4;else if(T.includes(w[0]))s+=2;out.push({ic,t,go,sub,s})};
 A.forEach(a=>add(a[0],a[1],a[2],a[3]));
 try{if(typeof LOOKS=='object')Object.values(LOOKS).forEach(L=>{if(L&&L.name)add('👗',L.name,'לוק '+(L.ev||''),()=>{shut();openStudio(L)},'לוק שמור')})}catch(_){}
 return out.sort((a,b)=>b.s-a.s).slice(0,7)}
let box=null,cur=[];
function paint(){const q=$('#q');if(!q)return;if(!box){box=document.createElement('div');box.className='sx85';box.hidden=true;const anchor=document.querySelector('.rs79')||q.closest('.tools')||q;anchor.after(box);
  box.addEventListener('pointerdown',e=>e.preventDefault());
  box.addEventListener('click',e=>{const b=e.target.closest('[data-sx85]');if(!b)return;const r=cur[+b.dataset.sx85];if(!r)return;q.value='';q.dispatchEvent(new Event('input',{bubbles:true}));box.hidden=true;q.blur();try{r.go()}catch(err){ERR('go',err);toast('לא הצלחתי לפתוח')}})}
 const v=q.value.trim();cur=v.length>=2?found(v):[];box.hidden=!cur.length;
 box.innerHTML=cur.length?`<span class="sx85h">באתר:</span>${cur.map((r,i)=>`<button type="button" data-sx85="${i}"><i>${r.ic}</i><b>${esc(r.t)}</b>${r.sub?`<small>${esc(r.sub)}</small>`:''}</button>`).join('')}`:''}
function init(){const q=$('#q');if(!q||q.dataset.sx85)return;q.dataset.sx85=1;q.placeholder='חיפוש: בגדים, מסכים, פרומטים, לוקים…';
 q.addEventListener('input',()=>{try{paint()}catch(e){ERR('paint',e)}});q.addEventListener('focus',()=>{try{paint()}catch(_){}});
 q.addEventListener('keydown',e=>{if(e.key=='Enter'&&cur.length&&!document.querySelector('.card:not([hidden])')){e.preventDefault();box.querySelector('[data-sx85="0"]').click()}if(e.key=='Escape'&&box)box.hidden=true})}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',init);else init();setTimeout(init,1500);

// ---- 5. the toast can be moved into an open sheet; when that sheet redraws itself the toast disappears with it – recreate it
{const _t=toast;toast=function(){if(!document.getElementById('toast')){const t=document.createElement('div');t.id='toast';t.className='toast hide';t.setAttribute('role','status');document.body.appendChild(t)}return _t.apply(this,arguments)};window.toast=toast}

// ---- 6. item window: a clear "פרטי המוצר" card under the title (colour, size, price, store, order, dates…)
// built from the details table that was folded at the bottom, plus a 📋 that copies all of it as text
function card85(id){const d=document.getElementById('dlg');if(!d||!d.open||d.querySelector('.pd85'))return;const X=D[id]||{},I=(typeof IT=='object'&&IT[id])||{};
 const R={};const tb=d.querySelector('.dinfo-more table')||d.querySelector('table');if(tb)[...tb.rows].forEach(r=>{const h=r.querySelector('th'),v=r.querySelector('td');if(h&&v)R[h.textContent.trim()]=v.textContent.trim()});
 let cat='';try{const b=document.querySelector(`[data-h9cat="${X.cat}"]`);cat=b?b.textContent.replace(/\d+/g,'').trim():''}catch(_){}
 const dd=s=>{const m=String(s||'').match(/^(\d{4})-(\d\d)-(\d\d)/);return m?`${+m[3]}/${+m[2]}/${m[1]}`:''};
 const ord=R['מספר הזמנה']||((R['קובץ קבלה']||'').split('·').pop()||'').trim();
 const F=[['צבע',R['צבע']||X.color],['מידה',R['מידה']||X.size],['שילמת',R['שילמת בפועל']],['מחיר',R['מחיר בקבלה']||R['מחיר בחשבונית']],['כמות',X.qty>1?X.qty:''],
  ['חנות',R['מאיפה']],['תאריך הזמנה',R['תאריך הזמנה']],['מספר הזמנה',ord],['קטגוריה',cat],['להחזרה עד',X.rdl&&!I.kept?dd(X.rdl):''],
  ['עונה',(X.season||[]).join(', ')],['תגיות',(X.tags||[]).join(', ')],['לבשתי',I.wear?I.wear+(I.wear==1?' פעם':' פעמים'):'']].filter(f=>f[1]!=null&&String(f[1]).trim()!=='');
 if(!F.length)return;const name=X.full||X.short||'';
 const html=`<div class="pd85"><div class="pd85h"><b>🏷 פרטי המוצר</b><button type="button" class="mini" data-pd85c>📋 העתקת הפרטים</button></div><dl>${F.map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(String(v))}</dd></div>`).join('')}</dl></div>`;
 const h3=d.querySelector('h3');const sub=h3&&h3.nextElementSibling&&!h3.nextElementSibling.matches('details,div')?h3.nextElementSibling:h3;if(!sub)return;sub.insertAdjacentHTML('afterend',html);
 d.querySelector('.pd85').dataset.txt=[name,...F.map(([k,v])=>k+': '+v)].join('\n')}
if(typeof openItem=='function'){const _oi=openItem;openItem=function(id){const r=_oi.apply(this,arguments);Promise.resolve(r).then(()=>setTimeout(()=>{try{card85(id)}catch(e){ERR('card',e)}},40));return r};window.openItem=openItem}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-pd85c]');if(!t)return;e.preventDefault();const txt=t.closest('.pd85').dataset.txt||'';
 (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast('✓ הפרטים הועתקו')).catch(()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}ta.remove();toast(ok?'✓ הפרטים הועתקו':'לא הצלחתי להעתיק')})});

// ---- 7. belts, shoes and bags also get "👗 הבגד על האווטר ב-5 תנוחות" (upload a GPT 5-pose sheet) and sit on the avatar:
// belt on the waist line, shoes on the feet, bag next to the hip – she can still move / resize each pose by hand
const ACC85=['belt','shoes','bag'];
try{ACC85.forEach(k=>{if(!P5G_SLOTS.includes(k))P5G_SLOTS.push(k)})}catch(e){ERR('slots',e)}
const FEET85={front:[119,265],side:[69,286],back:[122,283],half:[87,311],hip:[91,192]},SOLE85=1332;window.FEET85=FEET85;
if(typeof p5gFit=='function'){const _pf=p5gFit;p5gFit=function(view,slot,c){if(!ACC85.includes(slot)||!c||!c.w)return _pf.apply(this,arguments);
 const B=P5BODY[view]||P5BODY.front,r1=v=>Math.round(v*10)/10;let s,cx,cy;
 if(slot=='belt'){const wa=(typeof FIT_WAIST=='object'&&FIT_WAIST.p5&&FIT_WAIST.p5[view])||{w:165,cx:200};s=wa.w*1.08/c.w;cx=wa.cx;cy=B.y.wa+4}
 else if(slot=='shoes'){const f=FEET85[view]||FEET85.front;s=(f[1]-f[0])*1.06/c.w;cx=(f[0]+f[1])/2;cy=SOLE85-c.h*s/2}
 else{s=Math.min(130/c.w,260/c.h);const hp=B.hp||[200,240];cx=Math.min(399-c.w*s/2,hp[0]+hp[1]/2+c.w*s*.25);cy=B.y.hp+40}
 return {x:r1(cx/399*100),y:r1(cy/1365*100),w:r1(c.w*s/399*100)}};window.p5gFit=p5gFit}
if(typeof renderImgRow=='function'){const _rr=renderImgRow;renderImgRow=function(id){const r=_rr.apply(this,arguments);try{if(!ACC85.includes(slotOf(id)))return r;const el=document.querySelector(`[data-imgrow="${id}"]`);if(!el)return r;let box=el.querySelector('.p5gbox');
 const what={belt:'החגורה',shoes:'הנעליים',bag:'התיק'}[slotOf(id)];
 if(!box){const dm=el.querySelector('details.dmore');const h=`<details class="p5gbox" open><summary>👗 ${what} על האווטר ב-5 תנוחות</summary><div class="gslot"></div></details>`;if(dm)dm.insertAdjacentHTML('beforebegin',h);else el.insertAdjacentHTML('beforeend',h);box=el.querySelector('.p5gbox')}
 box.querySelector('.gslot').innerHTML=p5gHTML(id)}catch(e){ERR('accbox',e)}return r};window.renderImgRow=renderImgRow}

// ---- 8. (v87) one product with several pieces – a set (jacket + dress), a pack (3 belts, 3 shirts) – can be split into
// separate pieces. Each piece is its own avatar item (own 5-pose sheet, own slot in the studio, own tile in the drawer).
// IT[id].parts=[{k,n,cat}] is saved on the product; a piece lives as D['<id>~<k>'] (no price, no return date).
try{['belt','shoes','bag'].forEach(k=>{if(typeof VARSL!='undefined'&&!VARSL.includes(k))VARSL.push(k)})}catch(_){}
const PT=[['tops','חולצה'],['sweaters','סוודר'],['dresses','שמלה'],['skirts','חצאית'],['outer',"ז'קט / מעיל"],['sets','סט'],['belts','חגורה'],['scarves','כיסוי ראש'],['bags','תיק'],['shoes','נעליים']];
const KW=[[/ז['׳]?קט|ג['׳]קט|בלייזר|מעיל|קרדיגן|וסט|אפוד/,'outer'],[/שמל/,'dresses'],[/חצאית/,'skirts'],[/סוודר|סריג/,'sweaters'],[/חולצ|טי.?שירט|טריקו|טופ|גופי/,'tops'],[/חגור|רצוע/,'belts'],[/תיק/,'bags'],[/צעיף|מטפחת|כיסוי ראש|חיג/,'scarves'],[/נעל/,'shoes']];
const SPLITCATS=['sets','dresses','tops','sweaters','skirts','outer','belts','bags','scarves','shoes'];
const ONE={tops:'חולצה',sweaters:'סוודר',dresses:'שמלה',skirts:'חצאית',outer:"ז'קט",sets:'סט',belts:'חגורה',bags:'תיק',scarves:'כיסוי ראש',shoes:'נעליים'};
const catOfWord=t=>{for(const [r,c] of KW)if(r.test(t))return c;return ''};
const isPart=id=>!!(D[id]&&D[id].part);const partsOf=id=>((typeof IT=='object'&&IT[id])||{}).parts||[];const subId=(id,k)=>id+'~'+k;
function suggest(id){const X=D[id]||{};const n=((X.full||'')+' ').replace(/^(SHEIN|Cozy Pixies|GlowEve)\s+\S*\s*/,'');const c0=(IT[id]||{}).cat||X.cat;if(!SPLITCATS.includes(c0))return [];
 const seg=n.split('+').map(x=>x.trim()).filter(Boolean);
 if(seg.length>=2){const r=seg.map(t=>{const c=catOfWord(t);const m=t.match(/(ז['׳]?קט|ג['׳]קט|בלייזר|מעיל|קרדיגן|וסט|אפוד|שמל\S*|חצאית|סוודר|חולצ\S*|חגור\S*|תיק)[^,.:;]*/);return c?{n:(m?m[0]:t).trim().slice(0,28),cat:c}:null}).filter(Boolean);if(r.length>=2)return r}
 const m=n.match(/(^|\s)([2-6])\s*(?:יח\S*\s*)?(חולצות|טי.?שירטים|חגורות|רצועות|תיקים|סוודרים|צעיפים|גופיות|מטפחות)/);
 if(m){const N=+m[2],c=catOfWord(m[3])||c0;return Array.from({length:N},(_,i)=>({n:`${ONE[c]||'פריט'} ${i+1}`,cat:c}))}
 const seen=[];for(const [r,c] of KW){const mm=n.match(r);if(mm&&!seen.some(x=>x.cat==c))seen.push({at:mm.index,cat:c,n:ONE[c]})}seen.sort((a,b)=>a.at-b.at);
 if(seen.length>=2&&(c0=='sets'||/(^|\s)(סט|חליפה)/.test(n)))return seen.slice(0,3).map(x=>({n:x.n,cat:x.cat}));
 if(/(^|\s)[2-6]\s*חלקים/.test(n)&&c0=='sets')return [{n:'חלק עליון',cat:'tops'},{n:'חלק תחתון',cat:'skirts'}];
 return []}
window.suggestParts85=suggest;
// pieces as items (rebuilt whenever the saved parts change)
// pieces are hidden from Object.keys(D), so counts, totals, alerts and the closet grid stay as they were; only the studio
// drawer lists them (drawerItems wrapper below)
const PIECES=new Set();let SIG='';function materialize(){if(typeof IT!='object')return;const want={};
 for(const id of Object.keys(IT)){const ps=(IT[id]||{}).parts;if(!Array.isArray(ps)||!D[id]||isPart(id))continue;const X=D[id];
  ps.forEach(p=>{const s=subId(id,p.k);want[s]=1;PIECES.add(s);const v=Object.assign({},{id:s,src:X.src,srcl:X.srcl,order:X.order,date:X.date,file:X.file,size:X.size,color:p.color||X.color,col:X.col,tags:X.tags||[],season:X.season||[],hi:1},
   {cat:p.cat,short:p.n,full:(X.short||'')+' – '+p.n,paid:0,price:0,qty:0,origt:0,dup:[],dupnote:'',retd:0,rdl:'',rex:!1,transit:!1,part:id});Object.defineProperty(D,s,{value:v,enumerable:false,configurable:true,writable:true})})}
 for(const s of [...PIECES])if(!want[s]){delete D[s];PIECES.delete(s)}}
if(typeof drawerItems=='function'){const _di=drawerItems;drawerItems=function(slot){const r=_di.apply(this,arguments);try{const sl=SLOTS.find(x=>x[0]==slot);const cats=sl?sl[3]:[];const F=typeof DRF=='object'?DRF:{};const q=String(F.q||'').trim().toLowerCase();
 const add=[...PIECES].filter(s=>D[s]&&cats.includes(curCat(s))&&(IT[D[s].part]||{}).s!='ret'&&!r.includes(s)&&(!F.fav||(IT[D[s].part]||{}).fav)&&(!q||(D[s].full||'').toLowerCase().includes(q)));
 add.sort((a,b)=>(avReady(b)?1:0)-(avReady(a)?1:0));return r.concat(add)}catch(e){ERR('ptdrawer',e);return r}};window.drawerItems=drawerItems}
function syncParts(){try{if(typeof IT!='object')return;const sig=Object.keys(IT).filter(k=>IT[k]&&IT[k].parts).map(k=>k+':'+JSON.stringify(IT[k].parts)).join('|');if(sig!==SIG){SIG=sig;materialize()}}catch(e){ERR('parts',e)}}
setInterval(syncParts,1500);setTimeout(syncParts,300);
// a piece shows its own avatar picture, or the product photo until it has one
if(typeof img=='function'){const _img=img;img=function(t){if(isPart(t)){const g=typeof p5gOf=='function'&&p5gOf(t);if(g&&g.front)return p5gUrl(g,'front');return _img(D[t].part)}return _img(t)};window.img=img}
// opening a piece opens its product, at the pieces box
{const _oi=openItem;openItem=function(id){if(isPart(id)){const pid=D[id].part;const r=_oi.call(this,pid);setTimeout(()=>{const b=document.querySelector(`#dlg [data-pt85row="${id}"]`);if(b){b.open=true;b.scrollIntoView({block:'center'})}},700);return r}return _oi.apply(this,arguments)};window.openItem=openItem}
// the pieces box in the product window
function ptHTML(id){const ps=partsOf(id);const sg=ps.length?[]:suggest(id);const rows=ps.length?ps:sg;const cat=(IT[id]||{}).cat||(D[id]||{}).cat;
 const sel=(c,i)=>`<select data-pt85c="${i}">${PT.map(([k,n])=>`<option value="${k}"${k==c?' selected':''}>${n}</option>`).join('')}</select>`;
 const editor=(list)=>`<div class="pt85e">${list.map((p,i)=>`<div class="pt85r"><input data-pt85n="${i}" value="${esc(p.n||'')}" placeholder="שם, למשל: ז'קט משמש">${sel(p.cat,i)}<button type="button" class="mini" data-pt85del="${i}" aria-label="להסיר">✕</button></div>`).join('')}
  <div class="pt85a"><button type="button" class="mini" data-pt85add>＋ עוד פריט</button><button type="button" class="go" data-pt85save="${id}">✂ ${ps.length?'שמירת השינויים':'לפרק לפריטים נפרדים'}</button></div></div>`;
 if(!ps.length)return `<details class="pt85"${sg.length?' open':''}><summary>✂ ${sg.length?`יש כאן ${sg.length} פריטים – לפרק?`:'יש כמה פריטים במוצר? לפרק'}</summary>
  <p class="pt85h">כל פריט יקבל אווטאר משלו (גיליון 5 תנוחות נפרד), ובבניית לוק אפשר ללבוש כל אחד לבד או ביחד.${sg.length?' הצעתי לפי שם המוצר – אפשר לשנות שמות וסוגים:':''}</p>${editor(rows.length?rows:[{n:'',cat:cat=='sets'?'tops':cat},{n:'',cat:cat=='sets'?'skirts':cat}])}</details>`;
 return `<details class="pt85" open><summary>✂ הפריטים במוצר (${ps.length})</summary><p class="pt85h">לכל פריט מעלים גיליון 5 תנוחות משלו. בבניית לוק כל פריט נמצא בסוג שלו.</p>
  ${ps.map(p=>{const s=subId(id,p.k);const ok=typeof avReady=='function'&&avReady(s);return `<details class="pt85p" data-pt85row="${s}"${ok?'':' open'}><summary><b>${esc(p.n)}</b> <small>${(PT.find(x=>x[0]==p.cat)||[])[1]||''}</small> <i class="${ok?'ok':'no'}">${ok?'✓ יש אווטאר':'✗ עוד אין אווטאר'}</i></summary>
   <div data-imgrow="${s}"><details class="p5gbox" open><summary>👗 ${esc(p.n)} על האווטר ב-5 תנוחות</summary><div class="gslot">${typeof p5gHTML=='function'&&D[s]?p5gHTML(s):''}</div></details></div></details>`}).join('')}
  <details class="pt85x"><summary>✏️ לשנות את הפירוק</summary>${editor(ps)}</details></details>`}
function ptMount(id){const d=document.getElementById('dlg');if(!d||!d.open||isPart(id))return;const cat=(IT[id]||{}).cat||(D[id]||{}).cat;if(!SPLITCATS.includes(cat))return;
 syncParts();const old=d.querySelector('.pt85');const html=ptHTML(id);if(old){old.outerHTML=html;return}
 const row=d.querySelector(`[data-imgrow="${id}"]`);const anchor=row&&(row.querySelector('.p5gbox')||row);if(anchor){anchor.insertAdjacentHTML(anchor===row?'beforeend':'afterend',html)}}
{const _oi=openItem;openItem=function(id){const r=_oi.apply(this,arguments);if(!isPart(id))Promise.resolve(r).then(()=>setTimeout(()=>{try{ptMount(id)}catch(e){ERR('ptmount',e)}},120));return r};window.openItem=openItem}
// after a piece's upload, refresh the pieces box instead of the product's picture row
if(typeof renderImgRow=='function'){const _rr=renderImgRow;renderImgRow=function(id){if(isPart(id)){try{const pid=D[id].part;ptMount(pid);const b=document.querySelector(`#dlg [data-pt85row="${id}"]`);if(b)b.open=true}catch(e){ERR('ptrow',e)}return}const r=_rr.apply(this,arguments);try{const d=document.getElementById('dlg');if(d&&d.open&&!d.querySelector('.pt85'))ptMount(id)}catch(_){}return r};window.renderImgRow=renderImgRow}
function readEditor(box){return [...box.querySelectorAll('.pt85r')].map(r=>({n:r.querySelector('input').value.trim(),cat:r.querySelector('select').value}))}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-pt85add],[data-pt85del],[data-pt85save]');if(!t)return;e.preventDefault();e.stopPropagation();const box=t.closest('.pt85e');
 if(t.dataset.pt85add!==undefined){const r=box.querySelector('.pt85r');const c=r.cloneNode(true);c.querySelector('input').value='';box.querySelector('.pt85a').before(c);c.querySelector('input').focus();return}
 if(t.dataset.pt85del!==undefined){if(box.querySelectorAll('.pt85r').length>1)t.closest('.pt85r').remove();else t.closest('.pt85r').querySelector('input').value='';return}
 const id=t.dataset.pt85save;const list=readEditor(box).filter(p=>p.n);if(list.length==1){toast('צריך לפחות 2 פריטים כדי לפרק');return}
 const old=partsOf(id);const used=new Set();const parts=list.map((p,i)=>{let o=old.find(x=>!used.has(x.k)&&x.n==p.n)||old.find(x=>!used.has(x.k)&&x.cat==p.cat);const k=o?o.k:('p'+Date.now().toString(36)+i);used.add(k);return {k,n:p.n.slice(0,40),cat:p.cat}});
 const gone=old.filter(o=>!used.has(o.k)&&avReady(subId(id,o.k)));if(gone.length&&!confirm(`להסיר את ${gone.map(g=>g.n).join(', ')}? התמונות שלהם לאווטאר יישארו שמורות אם תוסיפי אותם שוב.`))return;
 try{await putItem(id,{parts:parts.length?parts:null})}catch(err){ERR('ptsave',err)}syncParts();ptMount(id);setTimeout(()=>toast(parts.length?`✂ פירקתי ל-${parts.length} פריטים. עכשיו מעלים לכל אחד גיליון 5 תנוחות`:'הפירוק בוטל'),700)},true);
// a list of every product that looks like several pieces (search: "פירוק")
function openSplit(){let d=document.getElementById('sp85');if(!d){d=document.createElement('dialog');d.id='sp85';d.className='sheet9 sp85';d.dir='rtl';document.body.appendChild(d)}syncParts();
 const ids=Object.keys(D).filter(id=>!isPart(id)&&(typeof live!='function'||live(id))&&(partsOf(id).length||suggest(id).length));const done=ids.filter(id=>partsOf(id).length);
 d.innerHTML=`<div class="sh9h"><h3>✂ מוצרים עם כמה פריטים</h3><button class="x" data-sp85x aria-label="סגירה">✕</button></div><div class="sp85b"><p class="m77h">סטים וחבילות שאפשר לפרק, כך שכל פריט יקבל אווטאר משלו. ${done.length} כבר מפורקים מתוך ${ids.length}.</p>
 ${ids.map(id=>{const ps=partsOf(id),sg=ps.length?ps:suggest(id);return `<button class="sp85r" data-sp85o="${id}"><img src="${img(id)||TPH}" alt=""><span><b>${esc((D[id].short||'').slice(0,40))}</b><small>${ps.length?'✓ מפורק: ':'הצעה: '}${esc(sg.map(p=>p.n).join(' · '))}</small></span></button>`}).join('')}</div>`;
 if(!d.open)d.showModal()}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sp85o],[data-sp85x]');if(!t)return;e.preventDefault();const d=document.getElementById('sp85');if(d)d.close();if(t.dataset.sp85o){openItem(t.dataset.sp85o);setTimeout(()=>{const b=document.querySelector('#dlg .pt85');if(b){b.open=true;b.scrollIntoView({block:'center'})}},900)}});
window.openSplit85=openSplit;
A.push(['✂','פירוק סטים וחבילות','פירוק לפרק סט חבילה כמה פריטים ז\'קט ושמלה חגורות',()=>{shut();openSplit()}]);
// ---- 9. (v87) the green/orange/red avatar dot on cards also for belts, shoes and bags (they joined the avatar in v86),
// and for split products: green when every piece has its 5 poses, orange when only some do
{const full=g=>!!(g&&['front','side','back','half','hip'].every(v=>g[v]));
 const accSt=id=>{const it=IT[id]||{};if(it.av)return it.av;if(full(it.p5g)||(it.p5gv||[]).some(full))return 'ok';if((it.p5g&&it.p5g.front)||(it.p5gv||[]).length)return 'fix';return 'no'};
 const _av=avStat;avStat=function(id){try{if(isPart(id))return accSt(id);const ps=partsOf(id);if(ps.length&&!(IT[id]||{}).av){const st=ps.map(p=>accSt(subId(id,p.k)));return st.every(x=>x=='ok')?'ok':st.some(x=>x!='no')?'fix':'no'}
  const sl=typeof slotOf=='function'&&slotOf(id);if(ACC85.includes(sl))return accSt(id)}catch(_){}return _av(id)};window.avStat=avStat;
 setTimeout(()=>{try{paintAll()}catch(_){}},400)}
window.siteSearch85=found;

// ---- 2. her own avatar pictures (the 5 poses she uploaded) inside the GPT prompt sheet: copy / download each pose,
// or all 5 in one picture. Only her uploaded avatar files are used, put on a plain light background for GPT.
const POS=[['front','חזית'],['side','צד'],['back','גב'],['half','חצי צד'],['hip','יד על המותן']];let HD=(()=>{try{return localStorage.getItem('av85')||'c'}catch(_){return 'c'}})();const MEM={};
const ld=src=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=src});
const avSrc=(v,h)=>`av/${h=='c'?(window.AVC96?AVC96():'p5c'):(window.AVW96?AVW96():'p5')}_${v}.webp?v=${window.VER||''}`;// v96: the new avatar with the cap
async function poseCv(v,h){const im=await ld(avSrc(v,h));const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.fillStyle='#e9e7e3';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0);return c}
// the 5-pose sheet, built from her own pose pictures: equal panels, thin white lines, grey background, pose names below
async function allCv(h){const cs=[];for(const [v] of POS)cs.push(await poseCv(v,h));const g=6,lab=110,pw=cs[0].width,ph=cs[0].height,W=pw*5+g*4,H=ph+lab;
 const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W,H);
 cs.forEach((k,i)=>{const ox=i*(pw+g);x.fillStyle='#e9e7e3';x.fillRect(ox,0,pw,H);x.drawImage(k,ox,0);x.fillStyle='#2b2622';x.font='600 46px Heebo, Rubik, Arial, sans-serif';x.textAlign='center';x.direction='rtl';x.fillText(POS[i][1],ox+pw/2,ph+lab/2+16)});return c}
const blobOf=c=>new Promise(r=>c.toBlob(r,'image/png'));
async function pic(k,h){h=h||HD;const key=h+':'+k;if(!MEM[key])MEM[key]=(k=='all'?allCv(h):poseCv(k,h)).then(blobOf);return MEM[key]}
const nameOf=(k,h)=>'האווטאר שלי - '+(k=='all'?'גיליון 5 תנוחות':(POS.find(p=>p[0]==k)||[])[1])+(h=='c'?' (כיסוי)':' (פאה)')+'.png';
async function copyPic(k,h){try{if(!navigator.clipboard||typeof ClipboardItem=='undefined')throw 0;await navigator.clipboard.write([new ClipboardItem({'image/png':pic(k,h)})]);toast('✓ התמונה הועתקה – מדביקים ב-GPT')}
 catch(_){toast('ההעתקה חסומה כאן. לחיצה ארוכה על התמונה ← "העתקת תמונה", או ⬇ הורדה')}}
async function savePic(k,h){h=h||HD;try{const b=await pic(k,h);const dl=await claude.use('downloads');if(!dl){toast('הורדה לא זמינה כאן. לחיצה ארוכה על התמונה ← "הורדת תמונה"');return}await dl.save({filename:nameOf(k,h),data:b});toast('התמונה נשמרה')}catch(e){toast(e&&e.code=='declined'?'בוטל':'לא הצלחתי לשמור')}}
const URLS={};async function urlOf(k,h){h=h||HD;const key=h+':'+k;if(!URLS[key])URLS[key]=URL.createObjectURL(await pic(k,h));return URLS[key]}
function avBlock(){return `<div class="av85" id="av85"><h4>🧍 האווטאר שלי ל-GPT</h4><p>את התמונות האלה מצרפים ב-GPT יחד עם הפרומט. 📋 מעתיק, ⬇ מוריד לטלפון.</p>
 <div class="av85s"><button data-av85h="c" aria-pressed="${HD=='c'}">עם כיסוי</button><button data-av85h="w" aria-pressed="${HD!='c'}">עם פאה</button></div>
 <div class="av85all"><figure><img data-av85i="all" alt="גיליון 5 התנוחות"><figcaption>גיליון האווטאר: כל 5 התנוחות בתמונה אחת</figcaption></figure><div><button class="go" data-av85c="all">📋 העתקה</button><button data-av85d="all">⬇ הורדה</button></div></div>
 <div class="av85g">${POS.map(([v,n])=>`<figure><img data-av85i="${v}" alt="${n}"><figcaption>${n}</figcaption><div><button data-av85c="${v}" aria-label="העתקת ${n}">📋</button><button data-av85d="${v}" aria-label="הורדת ${n}">⬇</button></div></figure>`).join('')}</div></div>`}
async function fillImgs(root){for(const im of root.querySelectorAll('img[data-av85i]')){try{im.src=await urlOf(im.dataset.av85i,im.dataset.av85h2||HD)}catch(e){ERR('av img',e)}}}
function inject(){const d=document.getElementById('pr80');if(!d||!d.open||d.querySelector('#av85'))return;const a=d.querySelector('.p80a');if(!a)return;a.insertAdjacentHTML('afterend',avBlock());fillImgs(d.querySelector('#av85'))}
new MutationObserver(()=>{try{inject()}catch(e){ERR('inject',e)}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-av85c],[data-av85d],[data-av85h]');if(!t)return;e.preventDefault();
 if(t.dataset.av85h){HD=t.dataset.av85h;try{localStorage.setItem('av85',HD)}catch(_){}const b=document.getElementById('av85');if(b){b.outerHTML=avBlock();fillImgs(document.getElementById('av85'))}return}
 const h=t.dataset.av85h2||HD;if(t.dataset.av85c)return copyPic(t.dataset.av85c,h);savePic(t.dataset.av85d,h)});
A.splice(16,0,['🧍','גיליון האווטאר','עם כיסוי עם פאה 5 תנוחות',()=>{shut();(window.openSheets85||openSheets)()}],['🧍','האווטאר שלי ל-GPT','תמונות אווטאר 5 תנוחות להעתיק להוריד גיליון',()=>{shut();openPrompts80();setTimeout(()=>{const b=document.getElementById('av85');if(b)b.scrollIntoView({block:'start'})},300)}]);
window.avPic85=pic;

// ---- 4. "🧍 גיליון האווטאר" everywhere (prompt sheet, item window, studio menu) shows both sheets: with covering and with wig
function openSheets(){let d=document.getElementById('avs85');if(!d){d=document.createElement('dialog');d.id='avs85';d.className='sheet9 avs85';d.dir='rtl';document.body.appendChild(d)}
 d.innerHTML=`<div class="sh9h"><h3>🧍 גיליון האווטאר</h3><button class="x" data-avs85x aria-label="סגירה">✕</button></div><div class="avs85b"><p class="m77h">מצרפים ב-GPT את הגיליון שמתאים ללוק: עם כיסוי או עם פאה. 📋 מעתיק, ⬇ מוריד לטלפון.</p>
 ${[['c','עם כיסוי ראש'],['w','עם פאה']].map(([h,n])=>`<figure><figcaption><b>${n}</b></figcaption><img data-av85i="all" data-av85h2="${h}" alt="גיליון האווטאר ${n}"><div><button class="go" data-av85c="all" data-av85h2="${h}">📋 העתקה</button><button data-av85d="all" data-av85h2="${h}">⬇ הורדה</button></div></figure>`).join('')}</div>`;
 if(!d.open)d.showModal();fillImgs(d)}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-zoom^="av/p5_sheet.jpg"],[data-avs85x]');if(!t)return;e.preventDefault();e.stopImmediatePropagation();if(t.dataset.avs85x!==undefined)return document.getElementById('avs85').close();(window.openSheets85||openSheets)()},true);
window.openSheets85=openSheets;

// ---- 3. "מה לשפר בפרומט": she writes what to change, Claude rewrites the prompt in place, and her version is kept
// per type (SET.pr85). The prompt box can also be edited by hand. "↺ הפרומט המקורי" brings the original back.
const P85=()=>{if(typeof SET!='object')return {};SET.pr85=SET.pr85||{};return SET.pr85};
const kOf=d=>{const b=d.querySelector('[data-p80][aria-pressed="true"]');return b&&b.dataset.p80};
const ITEM=/^הבגד: .*$/m;
const withItem=(txt,orig)=>{const m=orig.match(ITEM);if(!m)return txt;const L=txt.split('\n');L.splice(1,0,m[0]);return L.join('\n')};
const generic=t=>t.replace(ITEM,'').replace(/\n{3,}/g,'\n\n');
function fixBlock(k,has){const n=(P85()[k]||{}).notes||[];return `<div class="pf85" id="pf85">${has?'<p class="pf85m">✏️ זו הגרסה שלך לפרומט הזה <button data-pf85r>↺ הפרומט המקורי</button></p>':''}
 <label for="pf85n"><b>💬 מה לשפר בפרומט?</b> כתבי לי כאן במילים פשוטות, ואני מתקנת את הפרומט למעלה ושומרת אותו.</label>
 <textarea id="pf85n" rows="3" placeholder="למשל: החצאית יוצאת קצרה מדי, צריך עד הקרסול. בלי צל על הרקע."></textarea>
 <div class="pf85a"><button class="go" data-pf85go>✨ תקני את הפרומט</button><button data-pf85sv hidden>💾 לשמור את השינוי שלי</button></div>
 ${n.length?`<details><summary>מה ביקשת לשפר עד עכשיו (${n.length})</summary><ul>${n.slice(-8).reverse().map(x=>`<li>${esc(x.n)}</li>`).join('')}</ul></details>`:''}</div>`}
function injectFix(){const d=document.getElementById('pr80');if(!d||!d.open||d.querySelector('#pf85'))return;const ta=d.querySelector('#p80txt'),a=d.querySelector('.p80a');const k=kOf(d);if(!ta||!a||!k)return;
 const orig=ta.value;ta.dataset.orig=orig;const my=P85()[k];if(my&&my.txt)ta.value=withItem(my.txt,orig);
 ta.removeAttribute('readonly');ta.dataset.saved=ta.value;ta.addEventListener('input',()=>{const b=d.querySelector('[data-pf85sv]');if(b)b.hidden=ta.value==ta.dataset.saved});
 a.insertAdjacentHTML('beforebegin',fixBlock(k,!!(my&&my.txt)))}
function saveMine(k,txt,note){const P=P85();const o=P[k]=P[k]||{};o.txt=generic(txt);o.t=Date.now();if(note){o.notes=(o.notes||[]).concat([{n:note,t:Date.now()}]).slice(-30)}try{saveSet()}catch(_){}}
function redraw(){const d=document.getElementById('pr80');const k=kOf(d);const ta=d.querySelector('#p80txt');const orig=ta.dataset.orig||ta.value;const old=d.querySelector('#pf85');if(old)old.remove();
 const my=P85()[k];ta.value=my&&my.txt?withItem(my.txt,orig):orig;ta.dataset.saved=ta.value;d.querySelector('.p80a').insertAdjacentHTML('beforebegin',fixBlock(k,!!(my&&my.txt)))}
async function improve(btn){const d=document.getElementById('pr80');const k=kOf(d);const ta=d.querySelector('#p80txt'),nt=d.querySelector('#pf85n');const note=(nt.value||'').trim();if(!note){toast('כתבי קודם מה לשפר');nt.focus();return}
 let sm=null;try{sm=await claude.use('sample')}catch(_){}if(!sm){saveMine(k,ta.value,note);toast('שמרתי את הבקשה. התיקון האוטומטי לא זמין כאן, אפשר לערוך את הפרומט ידנית');redraw();return}
 const base=generic(ta.value);btn.disabled=true;const was=btn.textContent;btn.textContent='✨ מתקנת…';
 try{const r=await sm(`את/ה עורך/ת פרומט בעברית שמשמש ליצירת תמונה ב-ChatGPT (תמונת בגד בלבד על בובת רפאים, ב-5 תנוחות של אווטאר, לפי ההוראות בפרומט).
המשתמשת כתבה מה לשפר. כתוב/כתבי מחדש את כל הפרומט עם התיקון שלה. שמור/שמרי את כל ההוראות הקיימות, חוץ ממה שהיא ביקשה לשנות. אל תוסיף/י הסברים, כותרות או מרכאות. החזר/י רק את טקסט הפרומט החדש, בעברית, באותו מבנה.

הפרומט הנוכחי:
<<<
${base}
>>>

מה לשפר (מהמשתמשת):
<<<
${note}
>>>`,{modelTier:'default',cache:false});
  let txt=(r&&r.text||'').trim().replace(/^<<<\s*|\s*>>>$/g,'').trim();if(txt.length<40)throw new Error('short');
  saveMine(k,txt,note);redraw();const ta2=document.querySelector('#p80txt');ta2.classList.add('pf85new');setTimeout(()=>ta2.classList.remove('pf85new'),1600);toast('✓ הפרומט תוקן ונשמר. אפשר להעתיק')}
 catch(e){toast(e&&e.code=='not_granted'?'צריך לאשר לאתר להשתמש ב-Claude':e&&e.code=='rate_limited'?'יותר מדי בקשות, נסי שוב עוד דקה':'לא הצלחתי לתקן עכשיו, נסי שוב')}
 finally{const b=document.querySelector('[data-pf85go]');if(b){b.disabled=false;b.textContent=was}}}
new MutationObserver(()=>{try{injectFix()}catch(e){ERR('fix',e)}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-pf85go],[data-pf85sv],[data-pf85r]');if(!t)return;e.preventDefault();const d=document.getElementById('pr80');const k=kOf(d);
 if(t.dataset.pf85go!==undefined)return improve(t);
 if(t.dataset.pf85sv!==undefined){saveMine(k,d.querySelector('#p80txt').value,'(שינוי ידני)');redraw();toast('✓ נשמר כגרסה שלך');return}
 if(t.dataset.pf85r!==undefined){if(!confirm('לחזור לפרומט המקורי? הגרסה שלך תימחק'))return;const P=P85();if(P[k])delete P[k].txt;try{saveSet()}catch(_){}redraw();toast('חזרנו לפרומט המקורי')}});

// ---- 10. (v89) duplicates: every group of duplicates shows ONCE in the closet; "👯 כפולים" opens a gallery of all of them.
// "↩ זה לא כפול" takes an item out of its group for good (SET.nd89), "⭐ זה יוצג בארון" picks which one shows (SET.dk89).
const ND=()=>{if(typeof SET!='object')return [];if(!Array.isArray(SET.nd89))SET.nd89=[];return SET.nd89};
const DK=()=>{if(typeof SET!='object')return {};SET.dk89=SET.dk89||{};return SET.dk89};
const gKey=g=>g.slice().sort().join('+');
let GRP=[],HID=new Set(),GOF={};
function dupGroups(){const nd=new Set(ND());const par={};const f=x=>{while(par[x]&&par[x]!=x)x=par[x];return x};
 const DP=(typeof SET=='object'&&Array.isArray(SET.dp89))?SET.dp89:[];const man={};for(const [a,b] of DP){(man[a]=man[a]||[]).push(b);(man[b]=man[b]||[]).push(a)}
 for(const id of Object.keys(D)){if(nd.has(id)||!card(id))continue;for(const o of (D[id].dup||[]).concat(man[id]||[])){if(nd.has(o)||!D[o]||!card(o))continue;par[id]=par[id]||id;par[o]=par[o]||o;const a=f(id),b=f(o);if(a!=b)par[b]=a}}
 const by={};for(const id of Object.keys(par)){const r=f(id);(by[r]=by[r]||[]).push(id)}
 const order=id=>{const c=card(id);return c?[...c.parentElement.children].indexOf(c):0};
 GRP=Object.values(by).filter(g=>g.length>1).map(g=>g.sort((a,b)=>order(a)-order(b)));HID=new Set();GOF={};
 for(const g of GRP){const k=gKey(g);const ret=id=>(IT[id]||{}).s=='ret';let keep=DK()[k];if(!g.includes(keep))keep=g.find(id=>!ret(id)&&avReady(id))||g.find(id=>!ret(id))||g[0];
  g.forEach(id=>{GOF[id]=g;if(id!=keep)HID.add(id)});g.keep=keep}}
function paintDups(){for(const c of document.querySelectorAll('.grid .card')){const id=c.dataset.id;const g=GOF[id];const ph=c.querySelector('.ph');
  if(!g){if(c.dataset.dup){delete c.dataset.dup;const b=c.querySelector('.dup');if(b)b.remove()}continue}
  c.dataset.dup='1';let b=c.querySelector('.dup');if(!b&&ph){ph.insertAdjacentHTML('beforeend','<span class="dup"></span>');b=c.querySelector('.dup')}
  if(b){b.textContent=`👯 ${g.length} כפולים`;b.dataset.dg89=id;b.setAttribute('role','button')}}
 const t=document.querySelector('[data-dg89open] b');if(t)t.textContent=GRP.length}
function dupRefresh(){try{dupGroups();paintDups();if(typeof apply=='function')apply()}catch(e){ERR('dups',e)}}
if(typeof extra=='function'){const _ex=extra;extra=function(c){if(!_ex(c))return false;try{const id=c.dataset.id;if(HID.has(id)){if(typeof F!='undefined'&&F=='dup')return true;if(typeof FLF!='undefined'&&FLF=='dup')return true;
 const q=(document.getElementById('q')||{}).value||'';if(q.trim().toUpperCase()==id)return true;return false}}catch(_){}return true};window.extra=extra}
function dupsBtn(){const r=document.querySelector('#q77 .t83');if(!r||r.querySelector('[data-dg89open]'))return;r.insertAdjacentHTML('beforeend',`<button data-dg89open>👯 כפולים <b>${GRP.length}</b></button>`)}
function openDups(focus){dupGroups();let d=document.getElementById('dg89');if(!d){d=document.createElement('dialog');d.id='dg89';d.className='sheet9 dg89';d.dir='rtl';document.body.appendChild(d)}
 const nd=ND().filter(id=>D[id]);const it=id=>{const X=D[id]||{},I=IT[id]||{};const g=GOF[id];const keep=g&&g.keep==id;
  const meta=[X.color,X.size,X.paid?m(X.paid):'',X.rdl&&I.s!='ret'?'להחזרה עד '+X.rdl.split('-').reverse().slice(0,2).join('/'):'',I.s=='ret'?'הוחזר':I.s=='keep'?'נשאר':''].filter(Boolean).join(' · ');
  return `<div class="dg89i${keep?' keep':''}"><button class="dg89p" data-dg89o="${id}"><img src="${img(id)||TPH}" alt="">${keep?'<i>⭐ מוצג בארון</i>':''}</button><b>${esc((X.short||'').slice(0,44))}</b><small>${esc(meta)}</small>
   <div class="dg89a">${keep?'':`<button data-dg89k="${id}">⭐ שזה יוצג בארון</button>`}<button data-dg89n="${id}">↩ זה לא כפול</button></div></div>`};
 d.innerHTML=`<div class="sh9h"><h3>👯 כפולים</h3><button class="x" data-dg89x aria-label="סגירה">✕</button></div><div class="dg89b">
  <p class="m77h">בארון כל כפול מופיע פעם אחת. כאן רואים את כולם, ${GRP.length} קבוצות. אם משהו לא באמת כפול, "↩ זה לא כפול" מחזיר אותו לארון הרגיל.</p>
  ${GRP.map(g=>`<div class="dg89g" data-dg89g="${esc(gKey(g))}"><h4>${esc((D[g.keep].short||'').slice(0,40))} <span>×${g.length}</span></h4><div class="dg89r">${g.map(it).join('')}</div></div>`).join('')||'<p>אין כפולים 🎉</p>'}
  ${nd.length?`<details class="dg89nd"><summary>סימנת "לא כפול" (${nd.length})</summary>${nd.map(id=>`<div class="dg89ndr"><img src="${img(id)||TPH}" alt=""><span>${esc((D[id].short||'').slice(0,40))}</span><button data-dg89u="${id}">↺ להחזיר לכפולים</button></div>`).join('')}</details>`:''}</div>`;
 if(!d.open)d.showModal();if(focus){const g=GOF[focus];const sec=g&&d.querySelector(`[data-dg89g="${CSS.escape(gKey(g))}"]`);if(sec){sec.classList.add('hl');sec.scrollIntoView({block:'start'})}}}
function saveS(){try{saveSet()}catch(e){ERR('dupsave',e)}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-dg89],[data-dg89open],[data-dg89x],[data-dg89o],[data-dg89k],[data-dg89n],[data-dg89u]');if(!t)return;e.preventDefault();e.stopPropagation();const ds=t.dataset;
 if(ds.dg89)return openDups(ds.dg89);if(ds.dg89open!==undefined)return openDups();const d=document.getElementById('dg89');if(ds.dg89x!==undefined)return d&&d.close();
 if(ds.dg89o){d.close();return openItem(ds.dg89o)}
 if(ds.dg89k){const g=GOF[ds.dg89k];if(g){DK()[gKey(g)]=ds.dg89k;saveS();dupRefresh();openDups(ds.dg89k);toast('⭐ זה הפריט שיוצג בארון')}return}
 if(ds.dg89n){const id=ds.dg89n;if(Array.isArray(SET.dp89))SET.dp89=SET.dp89.filter(pr=>!pr.includes(id));dupGroups();if(GOF[id])ND().push(id);saveS();dupRefresh();openDups();toast('↩ חזר לארון הרגיל, בלי סימן כפול');return}
 if(ds.dg89u){SET.nd89=ND().filter(x=>x!=ds.dg89u);saveS();dupRefresh();openDups(ds.dg89u);toast('חזר לכפולים')}},true);
setTimeout(()=>{dupRefresh();dupsBtn()},500);setInterval(()=>{try{dupsBtn()}catch(_){}},2000);
// settings arrive from the database a bit after load
{let last='';setInterval(()=>{try{const k=JSON.stringify([SET.nd89||[],SET.dk89||{}]);if(k!=last){last=k;dupRefresh()}}catch(_){}},1500)}
window.openDups89=openDups;
A.push(['👯','גלריית כפולים','כפולים כפול פעמיים זהה אותו דבר',()=>{shut();openDups()}]);

// ---- 11. (v89) "📋 פרומפט ל-GPT" in the item window opens the prompt sheet at THIS item's type, with the "מה לשפר" field
const typeOf89=id=>{const c=curCat(id),sl=slotOf(id),n=(D[id]&&D[id].short)||'';
 if(c=='sweaters')return 'sweater';if(c=='scarves')return 'tie5';if(c=='jewelry')return 'jw';if(c=='belts')return 'belt';if(c=='shoes')return 'shoes';if(c=='bags')return 'bag';
 if(sl=='outer')return /אפוד|וסט|vest/i.test(n)?'vest':/מעיל|coat/i.test(n)?'coat':'jacket';return ['top','skirt','dress','set'].includes(sl)?sl:'top'};
window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-p5gcopy]');if(!t)return;const row=t.closest('[data-imgrow]');const id=row&&row.dataset.imgrow;if(!id||!D[id])return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openPrompts80(typeOf89(id),id);
 setTimeout(()=>{try{injectFix();const f=document.getElementById('pf85');if(f)f.scrollIntoView({block:'center'})}catch(err){ERR('p5gpr',err)}},250)},true);
// the "מה לשפר" field is added right when the sheet opens (not only by the page watcher), and checked again while it is open
{const _op=window.openPrompts80;window.openPrompts80=function(){const r=_op.apply(this,arguments);try{inject();injectFix()}catch(e){ERR('pr80open',e)}return r};openPrompts80=window.openPrompts80}
setInterval(()=>{try{const d=document.getElementById('pr80');if(d&&d.open&&!d.querySelector('#pf85'))injectFix()}catch(_){}},800);

// ---- 12. (v90) "👯 להעביר לכפולים" in the item window: she picks which item it is a duplicate of (e.g. the same dress in S and M)
function dupBtn89(id){const d=document.getElementById('dlg');if(!d||!d.open||!D[id]||isPart(id))return;const h=d.querySelector('.pd85h');const host=h||d.querySelector('h3');if(!host)return;const old=d.querySelector('[data-dp89],[data-dp89see]');if(old)old.remove();
 dupGroups();const g=GOF[id];host.insertAdjacentHTML(h?'beforeend':'afterend',g?`<button type="button" class="mini dp89b" data-dp89see="${id}">👯 בכפולים (${g.length})</button>`:`<button type="button" class="mini dp89b" data-dp89="${id}">👯 להעביר לכפולים</button>`)}
{const _oi=openItem;openItem=function(id){const r=_oi.apply(this,arguments);Promise.resolve(r).then(()=>setTimeout(()=>{try{dupBtn89(id)}catch(e){ERR('dp89',e)}},250));return r};window.openItem=openItem}
const words=t=>new Set(String(t||'').replace(/[^֐-׿a-zA-Z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>1));
function pickDup(id,q){let d=document.getElementById('dp89');if(!d){d=document.createElement('dialog');d.id='dp89';d.className='sheet9 dp89';d.dir='rtl';document.body.appendChild(d)}
 const X=D[id];const cat=curCat(id);const W=words(X.full||X.short);q=(q||'').trim();
 const list=Object.keys(D).filter(o=>o!=id&&card(o)&&(q?((D[o].full||D[o].short||'')+' '+o+' '+(D[o].color||'')).includes(q):curCat(o)==cat)).map(o=>{const Y=D[o];let sc=0;for(const w of words(Y.full||Y.short))if(W.has(w))sc++;if(Y.color&&Y.color==X.color)sc+=2;if((Y.src||'')==(X.src||''))sc+=1;return [o,sc]}).sort((a,b)=>b[1]-a[1]).slice(0,40);
 d.innerHTML=`<div class="sh9h"><h3>👯 עם איזה פריט זה כפול?</h3><button class="x" data-dp89x aria-label="סגירה">✕</button></div><div class="dp89body"><div class="dp89me"><img src="${img(id)||TPH}" alt=""><span><b>${esc((X.short||'').slice(0,50))}</b><small>${esc([X.color,X.size].filter(Boolean).join(' · '))}</small></span></div>
  <input type="search" id="dp89q" placeholder="חיפוש לפי שם, צבע או מספר" value="${esc(q)}"><p class="m77h">${q?'תוצאות חיפוש':'הדומים ביותר מאותו סוג, הכי דומים למעלה'}. לחיצה על פריט מעבירה את שניהם לכפולים.</p>
  <div class="dp89l">${list.map(([o])=>{const Y=D[o];return `<button class="dp89r" data-dp89pick="${o}" data-dp89of="${id}"><img src="${img(o)||TPH}" alt="" loading="lazy"><span><b>${esc((Y.short||'').slice(0,46))}</b><small>${esc([Y.color,Y.size,o].filter(Boolean).join(' · '))}${GOF[o]?' · 👯 כבר בכפולים':''}</small></span></button>`}).join('')||'<p>לא נמצאו פריטים</p>'}</div></div>`;
 if(!d.open)d.showModal();const inp=d.querySelector('#dp89q');let tm;inp.addEventListener('input',()=>{clearTimeout(tm);tm=setTimeout(()=>{pickDup(id,inp.value);const i2=document.getElementById('dp89q');i2.focus();i2.setSelectionRange(i2.value.length,i2.value.length)},350)})}
window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-dp89],[data-dp89see],[data-dp89pick],[data-dp89x]');if(!t)return;e.preventDefault();e.stopPropagation();const ds=t.dataset;
 if(ds.dp89)return pickDup(ds.dp89);if(ds.dp89see)return openDups(ds.dp89see);const d=document.getElementById('dp89');if(ds.dp89x!==undefined)return d&&d.close();
 if(ds.dp89pick){const a=ds.dp89of,b=ds.dp89pick;SET.dp89=(Array.isArray(SET.dp89)?SET.dp89:[]).concat([[a,b]]);SET.nd89=ND().filter(x=>x!=a&&x!=b);saveS();dupRefresh();d.close();try{dupBtn89(a)}catch(_){}toast('👯 עבר לכפולים. בארון יופיע רק אחד מהם')}},true);
// the closet keeps its duplicates hidden even when the grid is filtered or redrawn, and the 👯 button opens the gallery from anywhere
if(typeof apply=='function'){const _ap=apply;apply=function(){try{if(!GRP.length||document.querySelector('.grid .card[data-dup] .dup:not([data-dg89])'))dupGroups()}catch(_){}const r=_ap.apply(this,arguments);try{paintDups()}catch(_){}return r};window.apply=apply}
window.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-dg89open],.card .dup[data-dg89]');if(!t)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();try{openDups(t.dataset.dg89||undefined)}catch(err){ERR('dg89open',err);toast('לא הצלחתי לפתוח את הכפולים')}},true);
A.push(['🗃','רשימה כללית','רשימה כללית ארכיון מוסתרים לא רלוונטי לא רוצה שמלות אירוע להעביר להוציא מהארון',()=>{shut();window.openGen161&&openGen161()}]);
A.push(['👯','להעביר לכפולים','כפול להעביר לכפולים מידה אחרת',()=>{shut();toast('פותחים את הבגד, ובכרטיס "פרטי המוצר" לוחצים "👯 להעביר לכפולים"')}]);
})();
