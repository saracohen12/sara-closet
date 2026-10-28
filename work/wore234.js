// ===== v234: "השבוע שלי" – every day circle opens that day (27/10, rows 450–451).
// 👗 pick from the closet what she wore that day (also past days of the week), or 📸 a photo of herself: Claude finds each garment in her closet,
// checks it again on a numbered sheet of her own item photos and says why it matches. What it can't find: "שרה, את זה לא מצאתי… להוסיף אותו?"
// → a new item of her own (IT[id].my = {cat,short,color,d}, D/card made at load, picture cut from her photo). Day photos: db 'days234'.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v234 '+w+': '+(e&&e.message||e));
const $1=s=>document.querySelector(s),$a=(s,r)=>[...(r||document).querySelectorAll(s)];
const es=x=>String(x==null?'':x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast_=m=>(window.toast||(()=>{}))(m);
const TO=(p,ms,v)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(v),ms))]);
const iso_=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>iso_(new Date());
const weekDays=()=>{const n=new Date(),s=new Date(n);s.setDate(n.getDate()-6);/* v279: the last 7 days, like the circles */return [...Array(7)].map((_,i)=>{const d=new Date(s);d.setDate(s.getDate()+i);return iso_(d)})};
const DN=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
const dayName=k=>{const d=new Date(k+'T12:00');return k==today()?'היום':'יום '+DN[d.getDay()]};
const dm=k=>{const d=new Date(k+'T12:00');return d.getDate()+'/'+(d.getMonth()+1)};
const it=id=>(typeof IT=='object'&&IT&&IT[id])||{};
const cat=id=>{try{return curCat(id)}catch(_){return (D[id]||{}).cat||''}};
const nm=id=>{const x=D[id]||{};return String(it(id).tname||x.short||x.full||'').replace(/^[A-Za-z0-9&'.\-\s]+(?=[֐-׿])/,'').trim()||id};
const ph=id=>{try{return img(id)||TH[id]||TPH}catch(_){return ''}};
const live=id=>{const i=it(id);return D[id]&&!i.gen&&!i.oos&&i.s!='ret'&&i.s!='give'};
// what she can wear (and what Claude may match): her own clothes and accessories
const WEAR=['dresses','skirts','sets','tops','base','sweaters','outer','scarves','belts','jewelry','shoes','bags','hosiery','hair'];
const CATS=[['','הכל'],['dresses','שמלות'],['skirts','חצאיות'],['tops','חולצות'],['sweaters','סוודרים'],['outer','ז׳קטים'],['scarves','כיסויים'],['shoes','נעליים'],['jewelry','תכשיטים'],['belts','חגורות'],['bags','תיקים'],['base','בסיס'],['sets','סטים']];
let CN=null;const catName=c=>{if(!CN){CN={};$a('section[id] > h2').forEach(h=>{const t=h.firstChild&&h.firstChild.textContent.trim();if(t)CN[h.parentElement.id]=t})}return CN[c]||c};
const pool=()=>Object.keys(D).filter(id=>live(id)&&WEAR.includes(cat(id)));
const thl=ids=>new Set(ids.map(cat)).forEach(c=>{try{thLoad(c).then(()=>thApply(TH)).catch(()=>{})}catch(_){}});
const worn=k=>Object.keys(D).filter(id=>(it(id).wl||[]).includes(k));

// ---------- her own items (added from a photo): D + a card, made from IT[id].my ----------
function addMine(id,m){if(!m||D[id])return;try{
 const c=WEAR.includes(m.cat)||document.getElementById(m.cat)?m.cat:'other';
 const ro=!!(m.rcpt&&m.order);   // v299: an order she put in from a receipt (rcpt299.js) – it has its shop account, order number and prices, and is on the way
 D[id]={id,src:ro?m.src:'my',cat:c,short:m.short||'בגד שלי',full:m.full||m.short||'',color:m.color||'',size:ro?m.size||'':'',file:'',order:ro?m.order:'',date:m.d||'',price:ro?+m.price||0:0,qty:1,paid:ro?+m.paid||0:0,tags:[],season:[],retd:0,rdl:'',rex:false,transit:ro,origt:0,hi:0,col:{fc:'',c:[],sp:0,metal:'',mixed:false},srcl:ro?'מקבלה שהעליתי':'הוספתי בעצמי',refund:0,credit:0,my:1};
 const g=document.querySelector(`#${c} .grid`)||document.querySelector('.grid');const tpl=g&&(g.querySelector('.card')||document.querySelector('.grid .card'));if(!tpl)return;
 const k=tpl.cloneNode(true);k.className='card my234';
 Object.assign(k.dataset,{id,src:D[id].src,q:[id,m.short,m.color,catName(c),ro?m.order:'שלי הוספתי'].join(' '),d:'0',p:String(D[id].price||0),o:'0',c:'',ck:'99',sk:'',z:'',i:'99999',tg:'',ss:'',ord:D[id].order,rdl:''});delete k.dataset.dup;delete k.dataset.orig;
 const p=k.querySelector('.ph');if(p){$a('img',p).forEach((x,i)=>i?x.remove():0);let im=p.querySelector('img');if(!im){im=document.createElement('img');p.prepend(im)}
  im.removeAttribute('loading');im.dataset.th=id;delete im.dataset.s79;im.src=m.img?'/_blob/'+m.img:TPH;
  $a('.dups,.dupb,.avd,.ind247,.ms123,.new83,.av83,.dt',p).forEach(x=>x.remove());const sb=p.querySelector('.sb');if(sb){sb.className='sb my';sb.textContent='שלי'}}
 const set=(s,h)=>{const e=k.querySelector(s);if(e)e.innerHTML=h};
 set('.t',es(m.short||'בגד שלי'));set('.m',es(m.color||''));set('.pr',ro?`<b>₪${(+m.paid||0).toFixed(2)}</b>`:'<b>הוספתי בעצמי</b>');set('.ret','');set('.st','');
 g.prepend(k);try{CARDM.delete(id)}catch(_){}
 }catch(e){ERR('mine',e)}}
window.addMine299=(id,m)=>addMine(id,m);
const mineAll=()=>{try{Object.keys(IT||{}).forEach(id=>{const m=IT[id]&&IT[id].my;if(m&&!D[id])addMine(id,Object.assign({img:IT[id].img},m))})}catch(e){ERR('mineAll',e)}};
mineAll();
{const _pa=paintAll;paintAll=function(){mineAll();return _pa.apply(this,arguments)}}

// ---------- wearing on a day that is not today: the wear diary keeps that date ----------
// (her own toast instead of the generic "נשמר: …" with field names)
// layers77_84 adds today's date to IT.wl on every wear+1 and hub.js sets lastWorn=today; for another day the patch carries _wd, fixed here (last step before saving)
{const _bp=beforePut;beforePut=function(id,patch){try{if(patch&&patch._wd){const w=patch._wd;delete patch._wd;patch.wl=w.wl;patch.lastWorn=w.last||'';return}if(patch&&patch.my)return}catch(e){ERR('bp',e)}return _bp.apply(this,arguments)}}
async function setWorn(id,k,on){const i=it(id);let wl=(i.wl||[]).slice();const has=wl.includes(k);if(on==has)return;
 if(on)wl.push(k);else wl.splice(wl.lastIndexOf(k),1);wl=wl.sort().slice(-120);
 const wear=Math.max(0,(i.wear||0)+(on?1:-1));await putItem(id,{wear,_wd:{wl,last:wl[wl.length-1]||''}})}

// ---------- day photos: db 'days234' {photo asset id, t} ----------
let DAYS={},SUB=null;
function load(){if(SUB)return;try{if(typeof DB!='undefined'&&DB)SUB=DB.collection('days234').onSnapshot(sn=>{const n={};sn.docs.forEach(d=>{const v=d.data();if(v)n[d.id]=v});DAYS=n;week();if(W&&W.open&&V.v=='day')render()},e=>ERR('snap',e))}catch(e){ERR('load',e)}}
[1500,5000,10000].forEach(ms=>setTimeout(load,ms));

// ---------- the week circles: every day of the week until today opens ----------
function week(){const b=$1('#wk83');if(!b)return;const days=weekDays(),td=today();
 $a('.w83d',b).forEach((x,i)=>{const k=days[i];if(!k)return;const fut=k>td;x.dataset.wd234=k;
  if(fut){x.disabled=true;return}x.disabled=false;x.removeAttribute('data-open');
  const n=worn(k).length,p=DAYS[k]&&DAYS[k].ph;x.setAttribute('aria-label',dayName(k)+' '+dm(k)+(n?`: ${n} בגדים`:': לבחור מה לבשתי'));
  const c=x.querySelector('.w83c');if(c){if(p&&(c.querySelector('.me234')||{}).getAttribute?.('src')!='/_blob/'+p){   // v278: also when the day's photo was changed
  c.innerHTML=`<img class="me234" alt="" src="/_blob/${es(p)}">${n?`<i>${n}</i>`:''}`;x.classList.add('on')}
   if(!n&&!p&&!c.querySelector('.pl234'))c.innerHTML='<span class="pl234" aria-hidden="true">+</span>'}});
 const s=b.querySelector('.w83h small'),h='לחצי על יום: 👗 מה לבשתי · 📸 צלמי את עצמך';if(s&&!s.dataset.k234){s.dataset.k234=1;s.textContent=h}}
setInterval(week,1500);setTimeout(week,600);
document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('#wk83 .w83d[data-wd234]');if(!x||x.disabled)return;e.preventDefault();e.stopImmediatePropagation();open(x.dataset.wd234)},true);

// ---------- the window ----------
let W=null,V={v:'day',k:'',q:'',c:'',sel:new Set(),n:60,res:null,busy:''};
function open(k,v){load();if(!W){W=document.createElement('dialog');W.id='wr234';W.dir='rtl';W.setAttribute('aria-labelledby','wr234t');document.body.appendChild(W);
  W.innerHTML=`<div class="w234h"><button type="button" class="bk234" data-wr234back aria-label="חזרה">→</button><h3 id="wr234t"></h3><button type="button" class="x234" data-wr234x aria-label="סגירה">✕</button></div><div class="w234b"></div>`}
 V={v:v||'day',k:k||today(),q:'',c:'',sel:new Set(worn(k||today())),n:60,res:null,busy:''};
 try{$a('dialog[open]').forEach(x=>{if(x!=W)x.close()})}catch(_){}
 if(!W.open)W.showModal();render();W.querySelector('.w234b').scrollTop=0}
const tile=(id,o={})=>`<button type="button" class="t234${o.on?' on':''}" ${o.attr||`data-wr234open="${es(id)}"`} aria-pressed="${!!o.on}"><img alt="" data-th="${es(id)}" src="${ph(id)}">${o.on?'<b class="ck234" aria-hidden="true">✓</b>':''}<span>${es(nm(id))}</span></button>`;
function dayView(){const k=V.k,L=worn(k),p=DAYS[k]&&DAYS[k].ph;
 return `${p?`<div class="me234w"><img alt="התמונה שלך מהיום הזה" src="/_blob/${es(p)}"></div>`:''}
 <h4 class="h234">${L.length?`מה לבשתי <small>${L.length}</small>`:'עוד לא סימנת מה לבשת'}</h4>
 ${L.length?`<div class="g234">${L.map(id=>`<span class="tw234">${tile(id)}<small class="wc234">לבשת ${(it(id).wear||0)==1?'פעם אחת':(it(id).wear||0)+' פעמים'}</small><button type="button" class="rm234" data-wr234rm="${es(id)}" aria-label="להוריד: ${es(nm(id))}">✕</button></span>`).join('')}</div>`:''}
 ${L.length&&window.R360?`<button type="button" class="av234" data-wr234av>💃 הלוק של ${k==today()?'היום':'היום הזה'} על האווטאר<small>${(()=>{const rd=ready(),n=L.filter(x=>rd.has(x)).length;return n==L.length?'כל הבגדים כבר על האווטאר':`${n} מתוך ${L.length} כבר על האווטאר, השאר אחרי שתעלי להם תמונות`})()} · שמור ב"הלוקים שלי"</small></button>`:''}
 <div class="act234"><button type="button" class="pri" data-wr234pick>👗 ${L.length?'לשנות / להוסיף מהארון':'לבחור מהארון'}</button>
 ${camBtns(0)}</div>
 <p class="i234">בצילום אני מוצאת כל בגד שאת לובשת בארון שלך, ואומרת למה הוא מתאים. אפשר לצלם בחלקים (חולצה, חצאית, נעליים) – אני מחברת הכל ללוק אחד. מה שלא אמצא – אשאל אם להוסיף לארון.</p>`}
function pickList(){const q=V.q.trim().toLowerCase();let L=pool();if(V.c)L=L.filter(id=>cat(id)==V.c);
 if(q)L=L.filter(id=>{const x=D[id]||{};return [nm(id),x.full,x.color,catName(cat(id))].join(' ').toLowerCase().includes(q)});
 return L.sort((a,b)=>(V.sel.has(b)-V.sel.has(a))||((it(b).wear||0)-(it(a).wear||0))||((it(b).fav?1:0)-(it(a).fav?1:0)))}
function pickView(){const L=pickList();
 return `<div class="ps234"><input type="search" id="q234" placeholder="🔍 לחפש: חצאית ג׳ינס, חולצה לבנה…" value="${es(V.q)}" autocomplete="off"></div>
 <div class="cs234" role="group" aria-label="סוג">${(()=>{const has=new Set(pool().map(cat));return CATS.filter(([c])=>!c||has.has(c)||V.c==c)})().map(([c,t])=>`<button type="button" data-wr234c="${c}" aria-pressed="${V.c==c}">${t}</button>`).join('')}</div>
 <div class="g234 pk234">${L.slice(0,V.n).map(id=>tile(id,{on:V.sel.has(id),attr:`data-wr234tg="${es(id)}"`})).join('')||'<p class="i234">לא מצאתי. נסי מילה אחרת.</p>'}</div>
 ${L.length>V.n?`<button type="button" class="more234" data-wr234more>עוד (${L.length-V.n})</button>`:''}
 <div class="ft234"><button type="button" class="pri" data-wr234save>${saveLbl()}</button></div>`}
const saveLbl=()=>V.from=='resadd'?'➕ להוסיף'+(V.sel.size?` (${V.sel.size})`:''):'✓ שמירה'+(V.sel.size?` (${V.sel.size})`:'');
const camBtns=(more)=>`<label class="cam234"><input type="file" accept="image/*" capture="user" data-wr234cam="${more?'add':''}"><span>📸 ${more?'לצלם עוד (פריט או חלק)':'צלמי את עצמך'}</span></label>
 <label class="gal234"><input type="file" accept="image/*" multiple data-wr234cam="${more?'add':''}"><span>🖼 ${more?'עוד תמונות מהגלריה':'תמונות מהגלריה (אפשר כמה)'}</span></label>`;
function resView(){const r=V.res;if(!r)return '';
 const top=r.shots.length?`<div class="sh234">${r.shots.map(x=>`<img alt="התמונה שלך" src="${es(x.url)}">`).join('')}</div>`:'';
 if(r.err&&!r.pieces.length)return top+`<p class="err234">${es(r.err)}</p><div class="act234">${camBtns(0)}<button type="button" data-wr234addpick>👗 לבחור מהארון בעצמי</button></div>`;
 const found=r.pieces.filter(p=>p.id);
 const alts=(p,i)=>p.alt.length?`<div class="al234"><small>${p.id?'או אולי:':'אולי זה אחד מאלה?'}</small><div>${p.alt.map(a=>`<button type="button" data-wr234alt="${i}" data-id="${es(a)}"><img alt="" data-th="${es(a)}" src="${ph(a)}"><span>${es(nm(a))}</span></button>`).join('')}</div></div>`:'';
 return top+(r.err?`<p class="err234">${es(r.err)}</p>`:'')+`<h4 class="h234">${found.length?`מצאתי בארון שלך ${found.length==1?'בגד אחד':found.length+' בגדים'}`:'לא מצאתי בארון את מה שאת לובשת'}</h4>
 ${r.pieces.map((p,i)=>p.id?`<div class="pc234${p.on?'':' off'}"><div class="pt234">${tile(p.id,{on:p.on,attr:`data-wr234pc="${i}"`})}</div><div class="pw234"><small>${p.self?'בחרת בעצמך':'ראיתי: '+es(p.what)}</small><b>${es(nm(p.id))}</b>${p.why?`<p>למה זה מתאים: ${es(p.why)}</p>`:''}
   <div class="yn234"><button type="button" data-wr234swap="${i}">🔄 להחליף בבגד אחר</button>${p.self?`<button type="button" data-wr234del="${i}">✕ להוריד</button>`:`<button type="button" data-wr234pc="${i}">${p.on?'✕ לא לבשתי':'✓ כן לבשתי'}</button>`}</div>${alts(p,i)}</div></div>`
  :`<div class="pc234 nf"><div class="pt234">${p.crop?`<img alt="" src="${es(p.crop)}">`:'<span>👚</span>'}</div><div class="pw234"><small>ראיתי: ${es(p.what)}</small>
   ${p.added?`<p class="ok234">✓ הוספתי לארון</p>`:p.no?`<p class="i234">בסדר, לא הוספתי.</p>`:`<p class="ask234">שרה, את זה לא מצאתי, כנראה שאין לך אותו בארון. להוסיף אותו?</p>
   <div class="yn234"><button type="button" class="pri" data-wr234add="${i}">➕ כן, להוסיף לארון</button><button type="button" data-wr234swap="${i}">🔎 אחפש בעצמי</button><button type="button" data-wr234no="${i}">לא</button></div>`}${p.added?'':alts(p,i)}</div></div>`).join('')}
 ${!r.pieces.length?'<p class="i234">לא ראיתי בגדים בתמונה. נסי תמונה של כל הגוף, באור טוב.</p>':''}
 ${r.pieces.some(p=>p.id&&p.on&&cat(p.id)=='shoes'||!p.id&&p.cat=='shoes')||r.noShoes?'':`<div class="mis234 sho234"><b>👟 לא ראיתי נעליים. איזה נעליים נעלת?</b>
 <div class="act234"><button type="button" data-wr234addpick="shoes">👟 לבחור נעליים מהארון</button><label class="gal234"><input type="file" accept="image/*" capture="environment" data-wr234cam="add"><span>📸 לצלם את הנעליים</span></label><button type="button" data-wr234nosh>בלי נעליים / לא חשוב</button></div></div>`}
 <div class="mis234"><b>לבשת עוד משהו שלא מופיע כאן?</b><small>למשל שרשרת, עגילים, חולצת בסיס מתחת לג׳קט או גרביונים. אפשר לבחור מהארון, או לצלם רק את הפריט / רק חלק מהגוף</small>
 <div class="act234"><button type="button" data-wr234addpick>🔎 לבחור מהארון</button>${camBtns(1)}</div></div>
 <div class="ft234"><button type="button" class="pri" data-wr234ok>✓ לסמן שלבשתי ${es(dayName(V.k))} (${r.pieces.filter(p=>p.id&&p.on).length})</button></div>`}
function render(){if(!W||!W.open)return;const b=W.querySelector('.w234b'),y=b.scrollTop;
 W.querySelector('#wr234t').innerHTML=`${V.v=='pick'?'👗 מה לבשתי':V.v=='res'?'📸 מה את לובשת':'👗 '+es(dayName(V.k))}<small>${es((V.v=='day'?'':dayName(V.k)+' · ')+dm(V.k))}</small>`;
 W.querySelector('.bk234').hidden=V.v=='day';
 b.innerHTML=V.busy?`<div class="b234" role="status" aria-live="polite">${V.res&&V.res.shots&&V.res.shots.length?`<img alt="" src="${es(V.res.shots[V.res.shots.length-1].url)}">`:''}<i aria-hidden="true"></i><span>${es(V.busy)}</span><small>זה לוקח בערך חצי דקה</small></div>`:V.v=='pick'?pickView():V.v=='res'?resView():dayView();
 if(!V.busy)b.scrollTop=y;thl($a('img[data-th]',b).map(x=>x.dataset.th).filter(id=>D[id]))}
const status=t=>{V.busy=t;const s=W&&W.querySelector('.b234 span');if(s)s.textContent=t;else render()};

// ---------- 📸 photo → her clothes ----------
function toCanvas(file,max){return new Promise((res,rej)=>{const u=URL.createObjectURL(file),im=new Image();
 im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));
  const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);res(c)};
 im.onerror=()=>{URL.revokeObjectURL(u);rej(new Error('img'))};im.src=u})}
const blobOf=(c,q)=>new Promise((r,j)=>c.toBlob(b=>b?r(b):j(new Error('blob')),'image/jpeg',q||.85));
const loadImg=src=>new Promise(r=>{if(!src)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
async function sheet(ids){await Promise.all([...new Set(ids.map(cat))].map(c=>{try{return thLoad(c).catch(()=>{})}catch(_){}}));
 const cols=5,Wd=170,Hh=220,c=document.createElement('canvas');c.width=Wd*cols;c.height=Hh*Math.ceil(ids.length/cols);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);
 for(let i=0;i<ids.length;i++){const x=(i%cols)*Wd,y=Math.floor(i/cols)*Hh;const im=await loadImg(ph(ids[i]));
  if(im&&im.width){const s=Math.min((Wd-10)/im.width,(Hh-40)/im.height);g.drawImage(im,x+(Wd-im.width*s)/2,y+34,im.width*s,im.height*s)}
  g.fillStyle='#b5562f';g.fillRect(x+4,y+4,36,28);g.fillStyle='#fff';g.font='bold 20px sans-serif';g.fillText(String(i+1),x+(i<9?15:9),y+25);g.strokeStyle='#ddd';g.strokeRect(x+.5,y+.5,Wd-1,Hh-1)}
 return blobOf(c)}
function catalog(){return pool().map(id=>{const x=D[id]||{},i=it(id);
 return [id,catName(cat(id)),nm(id).slice(0,48),(x.color||'').slice(0,18),i.wear?'w'+i.wear:''].map(v=>String(v).replace(/[|\n]+/g,' / ').trim()).join('|').replace(/\|+$/,'')}).join('\n')}
const KINDS='dresses|skirts|sets|tops|base|sweaters|outer|scarves|belts|jewelry|shoes|bags|hosiery|hair';
function prompt1(){return `The attached photo shows my client, a religious woman who dresses modestly, wearing today's outfit (a selfie, a mirror photo or a photo someone took of her). It may show only part of her (only the top, only the skirt, only her feet and shoes) or a close-up of one item (a necklace, earrings) – she photographs herself in parts and the parts are put together later.
List EVERY garment and accessory she is wearing that can be seen: head covering / scarf / hat, top, blouse, sweater, jacket or coat, dress, skirt, set, belt, shoes, bag, jewellery (necklace, earrings, bracelet, watch), tights, hair accessories. Also list layers that are only partly visible, e.g. a basic top under a jacket or cardigan (seen at the neckline, between the lapels or at the hem), tights under a skirt, a belt under a sweater. Do NOT list her wig or hair, makeup, glasses, or the phone.
Then find each one in her closet. Her closet (only what she owns), one item per line: id|category|name (Hebrew, machine-translated from the shop, may be vague)|colour|wN = worn N times
${catalog()}

For each piece give up to 5 candidate ids from the list (same kind of item, similar colour, pattern and details; most likely first), or [] when nothing in the list could be it.
"box" = where the piece is in the photo, as [left, top, right, bottom] in 0-1000 of the photo's width and height.
Reply in Hebrew with ONLY this JSON:
{"pieces":[{"what":"what you see, at most 6 Hebrew words, with the colour","cat":"${KINDS}","colour":"main colour in Hebrew","box":[l,t,r,b],"ids":["candidate ids"],"why":"one short Hebrew sentence: why the first candidate matches (colour, cut, details)"}]}`}
function prompt2(pc,ids){return `Image 1 is a photo of a woman wearing an outfit. Image 2 is a numbered grid (1-${ids.length}) of photos of items from her closet (shop photos, so lighting, model and folding differ).
For each piece she is wearing below, which numbered item is the SAME item she is wearing (same kind of item, same colour, pattern and details)? Answer 0 if none of them is that piece.
${pc.map((p,i)=>`${i+1}. ${p.what} (${p.colour||''})`).join('\n')}
Reply in Hebrew with ONLY this JSON: {"pieces":[{"n":piece number,"match":item number or 0,"why":"one short Hebrew sentence, to her as 'את': why it is the same item, what details match (if match is 0: \\"\\")"}]}`}
const errMsg=e=>e&&e.code=='not_granted'?'צריך לאשר לאתר לשלוח את התמונה ל-Claude (בחלון שקפץ). נסי שוב.':e&&e.code=='rate_limited'?'יותר מדי בקשות ברגע, נסי שוב בעוד דקה.':'הזיהוי לא הצליח, נסי שוב.';
function crop(c,box){try{if(!Array.isArray(box)||box.length!=4)return '';let [l,t,r,b]=box.map(v=>Math.max(0,Math.min(1000,+v||0)));if(r-l<20||b-t<20)return '';
 const pw=(r-l)*.08,phh=(b-t)*.08;l=Math.max(0,l-pw);r=Math.min(1000,r+pw);t=Math.max(0,t-phh);b=Math.min(1000,b+phh);
 const X=c.width*l/1000,Y=c.height*t/1000,w=c.width*(r-l)/1000,h=c.height*(b-t)/1000,k=Math.min(1,600/Math.max(w,h)),o=document.createElement('canvas');o.width=Math.round(w*k);o.height=Math.round(h*k);
 o.getContext('2d').drawImage(c,X,Y,w,h,0,0,o.width,o.height);return o.toDataURL('image/jpeg',.88)}catch(e){ERR('crop',e);return ''}}
async function scan(files,more){files=[...files].slice(0,6);if(!files.length)return;
 if(!more||!V.res)V.res={shots:[],pieces:[],err:''};V.res.err='';V.v='res';status('מכינה את התמונה…');
 let sample=null;try{sample=await TO(claude.use('sample'),12000,null)}catch(_){}
 const lim=sample?await TO(sample.limits().catch(()=>null),8000,null):null;
 const fail=m=>{V.busy='';V.res.err=m;render()};
 if(!sample||!lim||!lim.images){files.forEach(f=>V.res.shots.push({url:URL.createObjectURL(f)}));return fail('כאן אין לי גישה לזיהוי תמונה. פתחי את האתר ב-Chrome ונסי שוב, או בחרי בעצמך מהארון.')}
 const bad=[];
 for(let f=0;f<files.length;f++){const file=files[f];const pre=files.length>1?`תמונה ${f+1} מתוך ${files.length}: `:'';
  let c=null;try{c=await TO(toCanvas(file,1280),15000,null)}catch(_){}if(!c){bad.push('לא הצלחתי לקרוא תמונה '+(f+1));continue}
  const s=V.res.shots.push({url:URL.createObjectURL(file),c})-1;
  try{const pic=await blobOf(c);status(pre+'מסתכלת על מה שאת לובשת ומחפשת בארון שלך…');
   const a=await TO(sample.json(prompt1(),{images:[pic],modelTier:'default'}),110000,null);
   if(a===null){bad.push(`תמונה ${f+1}: הזיהוי לקח יותר מדי זמן`);continue}
   const P=(Array.isArray(a&&a.pieces)?a.pieces:[]).slice(0,12).map(p=>({what:String(p&&p.what||'בגד').slice(0,50),cat:String(p&&p.cat||''),colour:String(p&&p.colour||'').slice(0,20),box:p&&p.box,
    cand:[...new Set((Array.isArray(p&&p.ids)?p.ids:[]).filter(id=>typeof id=='string'&&D[id]&&live(id)))].slice(0,5),why:String(p&&p.why||'').slice(0,160)}));
   // the candidates again, on a sheet of her own photos (names from the shops are vague)
   const all=[...new Set(P.flatMap(p=>p.cand))].slice(0,25);let r2=null;
   if(all.length&&lim.images.maxCount>=2){status(pre+'משווה לתמונות של הבגדים שלך…');try{const sh=await sheet(all);r2=await TO(sample.json(prompt2(P,all),{images:[pic,sh],modelTier:'default'}),70000,null)}catch(e){ERR('sheet',e)}}
   const R=r2&&Array.isArray(r2.pieces)?r2.pieces:null;
   P.forEach((p,i)=>{let id=p.cand[0]||'',why=p.why;
    if(R){const m=R.find(x=>+x.n==i+1);if(m){const n=+m.match||0;id=n&&all[n-1]?all[n-1]:'';if(m.why)why=String(m.why).slice(0,160)}}
    // the same garment in another photo of the same day: once
    if(id&&V.res.pieces.some(q=>q.id==id))return;if(!id&&V.res.pieces.some(q=>!q.id&&q.what==p.what))return;
    const alt=p.cand.filter(x=>x!=id).slice(0,4);
    V.res.pieces.push({what:p.what,cat:p.cat,colour:p.colour,box:p.box,s,id,why:id?why:'',alt,on:!!id,crop:id?'':crop(c,p.box)})});
   if(f==0&&!more)savePhoto(file,c);
  }catch(e){ERR('sample',e);bad.push(`תמונה ${f+1}: `+errMsg(e))}}
 V.busy='';V.res.err=bad.join(' · ');render();if(!more)W.querySelector('.w234b').scrollTop=0;else toast_('✓ סרקתי עוד '+(files.length>1?files.length+' תמונות':'תמונה'))}
const cropOf=p=>{const x=V.res&&V.res.shots[p.s];return x&&x.c?crop(x.c,p.box):''};
// her photo of the day, small, for the week circle (not on the avatar – only in the diary)
async function savePhoto(file,c){try{const k=V.k;let a=null;try{a=await TO(claude.use('assets'),8000,null)}catch(_){}if(!a||typeof DB=='undefined'||!DB)return;
 const s=Math.min(1,900/Math.max(c.width,c.height)),o=document.createElement('canvas');o.width=Math.round(c.width*s);o.height=Math.round(c.height*s);o.getContext('2d').drawImage(c,0,0,o.width,o.height);
 const r=await (typeof upl=='function'?upl(a,await blobOf(o,.82)):a.upload(await blobOf(o,.82)));if(r&&r.id){DAYS[k]={ph:r.id,t:new Date().toISOString()};await DB.collection('days234').doc(k).set(DAYS[k]);week()}}catch(e){ERR('photo',e)}}
// "➕ להוסיף לארון": a new item of hers, picture cut from her photo
async function addPiece(i){const p=V.res&&V.res.pieces[i];if(!p||p.added)return;
 const id='M'+Date.now().toString(36);const c=WEAR.includes(p.cat)?p.cat:'other';
 const m={cat:c,short:p.what,color:p.colour,d:dm(today())};
 let imgId='';try{if(p.crop){const a=await TO(claude.use('assets'),8000,null);if(a){const b=await (await fetch(p.crop)).blob();const r=await (typeof upl=='function'?upl(a,b):a.upload(b));imgId=r&&r.id||''}}}catch(e){ERR('addimg',e)}
 addMine(id,Object.assign({img:imgId},m));await putItem(id,Object.assign({my:m},imgId?{img:imgId}:{}));
 try{paintImg&&paintImg(id)}catch(_){}
 p.id=id;p.on=true;p.added=1;p.why='';p.alt=[];render();toast_('✓ הוספתי לארון, ב'+catName(c))}

// ---------- the day's look: in "הלוקים שלי" with the date (one look per day, id d<date>), and on the 360 avatar ----------
async function dayLook(k,go){try{const ids=worn(k);const id='d'+k;if(typeof LOOKS!='object')return;
 if(!ids.length){if(LOOKS[id]){delete LOOKS[id];if(typeof saveDoc=='function')await saveDoc('looks',id,null)}return}
 const items={};ids.forEach(x=>{let s=cat(x)||'extra',n=s,j=2;while(items[n])n=s+(j++);items[n]=x});
 const L=Object.assign({},LOOKS[id]||{},{id,name:'לבשתי · '+(k==today()?'היום ':dayName(k)+' ')+dm(k),occ:'day',items,created:k,worn:k,day234:1});delete L.r360;delete L.th360;LOOKS[id]=L;
 if(typeof saveDoc=='function'&&typeof DB!='undefined'&&DB)await saveDoc('looks',id,L);else{try{localStorage.setItem('hub_looks',JSON.stringify(LOOKS))}catch(_){}}
 if(go)avatar(k)}catch(e){ERR('look',e)}}
const ready=()=>new Set((window.R360&&R360.ready&&R360.ready())||[]);
function avatar(k){const L=typeof LOOKS=='object'&&LOOKS['d'+k];if(!L||!window.R360)return;const rd=ready(),ids=Object.values(L.items),n=ids.filter(x=>!rd.has(x)).length;
 try{W.close()}catch(_){}R360.openWith(L);if(n)setTimeout(()=>toast_(`${n==1?'בגד אחד עוד לא':n+' בגדים עוד לא'} על האווטאר – אפשר להעלות להם תמונות בהמשך`),900)}

// ---------- clicks ----------
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('button,summary');if(!t||!W||!t.closest('#wr234'))return;const d=t.dataset;
 try{
 if(d.wr234x!=null)return W.close();
 if(V.busy)return;
 if(d.wr234back!=null){if(V.v=='pick'&&V.from){V.v='res';V.from='';return render()}V.v='day';V.res=null;return render()}
 if(d.wr234open){W.close();return openItem(d.wr234open)}
 if(d.wr234pick!=null){V.v='pick';V.from='';V.sel=new Set(worn(V.k));V.c='';V.q='';V.n=60;render();W.querySelector('.w234b').scrollTop=0;return}
 if(d.wr234c!=null){V.c=d.wr234c;V.n=60;return render()}
 if(d.wr234more!=null){V.n+=60;return render()}
 if(d.wr234tg){const id=d.wr234tg;if(V.from=='res'){const p=V.res.pieces[V.fi];if(p){if(p.id&&p.id!=id)p.alt=[p.id,...p.alt.filter(x=>x!=id)].slice(0,4);p.id=id;p.on=true;p.why='בחרת בעצמך';p.crop='';p.no=0}V.v='res';V.from='';return render()}
  V.sel.has(id)?V.sel.delete(id):V.sel.add(id);const on=V.sel.has(id);t.classList.toggle('on',on);t.setAttribute('aria-pressed',on);
  const k=t.querySelector('.ck234');if(on&&!k)t.insertAdjacentHTML('beforeend','<b class="ck234" aria-hidden="true">✓</b>');if(!on&&k)k.remove();
  const s=W.querySelector('[data-wr234save]');if(s)s.textContent=saveLbl();return}
 if(d.wr234save!=null&&V.from=='resadd'){let n=0;for(const id of V.sel)if(!V.res.pieces.some(p=>p.id==id)){V.res.pieces.push({what:'',cat:cat(id),id,on:true,why:'',alt:[],self:1});n++}V.v='res';V.from='';render();if(n)toast_('✓ הוספתי '+(n==1?'בגד אחד':n+' בגדים'));return}
 if(d.wr234save!=null){const k=V.k,was=new Set(worn(k));t.disabled=true;
  for(const id of V.sel)if(!was.has(id))await setWorn(id,k,true);for(const id of was)if(!V.sel.has(id))await setWorn(id,k,false);
  V.v='day';render();toast_(V.sel.size?`✓ נשמר: ${V.sel.size} בגדים ב${dayName(k)=='היום'?'היום':dayName(k)}, ונכנס ללוקים שלך`:'נשמר');week();dayLook(k);return}
 if(d.wr234rm){await setWorn(d.wr234rm,V.k,false);render();week();dayLook(V.k);return}
 if(d.wr234av!=null){await dayLook(V.k,true);return}
 if(d.wr234pc!=null){const p=V.res.pieces[+d.wr234pc];if(p){p.on=!p.on;render()}return}
 if(d.wr234alt!=null){const p=V.res.pieces[+d.wr234alt];if(p){const o=p.id;p.id=d.id;p.alt=p.alt.filter(x=>x!=d.id);if(o)p.alt.unshift(o);p.on=true;p.why='בחרת בעצמך';p.crop='';render()}return}
 if(d.wr234del!=null){V.res.pieces.splice(+d.wr234del,1);return render()}
 if(d.wr234nosh!=null){V.res.noShoes=1;return render()}
 if(d.wr234addpick!=null){V.from='resadd';V.v='pick';V.sel=new Set();V.c=d.wr234addpick||'';V.q='';V.n=60;render();W.querySelector('.w234b').scrollTop=0;const q=W.querySelector('#q234');if(q)q.focus();return}
 if(d.wr234add!=null){t.disabled=true;t.textContent='מוסיפה…';return addPiece(+d.wr234add)}
 if(d.wr234no!=null){const p=V.res.pieces[+d.wr234no];if(p){p.no=1;render()}return}
 if(d.wr234swap!=null){const p=V.res.pieces[+d.wr234swap];V.fi=+d.wr234swap;V.sel=new Set(p.id?[p.id]:[]);V.from='res';V.v='pick';V.c=CATS.some(c=>c[0]==p.cat)?p.cat:'';V.q='';V.n=60;render();W.querySelector('.w234b').scrollTop=0;return}
 if(d.wr234ok!=null){const k=V.k,ids=V.res.pieces.filter(p=>p.id&&p.on).map(p=>p.id);t.disabled=true;
  for(const id of ids)await setWorn(id,k,true);V.v='day';V.res=null;render();week();toast_(ids.length?`✓ סימנתי ${ids.length} בגדים ב${dayName(k)} ונשמר בלוקים שלך`:'לא סימנתי בגדים');if(ids.length)await dayLook(k,true);return}
 }catch(err){ERR('click',err);toast_('משהו השתבש, נסי שוב')}});
document.addEventListener('change',e=>{const t=e.target;if(!t.matches||!t.matches('#wr234 [data-wr234cam]'))return;const f=[...(t.files||[])];const more=t.dataset.wr234cam=='add';t.value='';if(f.length)scan(f,more)});
let qT;document.addEventListener('input',e=>{if(!e.target||e.target.id!='q234')return;clearTimeout(qT);const el=e.target;qT=setTimeout(()=>{V.q=el.value;V.n=60;render();const n=W.querySelector('#q234');if(n){n.focus();try{n.setSelectionRange(n.value.length,n.value.length)}catch(_){}}},250)});
window.WR234={open,addMine,setWorn};
})();
