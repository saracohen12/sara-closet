// v358 "📦 הגיע ולא מופיע בהזמנות" (Sara 6/11: "יש מוצרים שאני רואה שהם הגיעו ואני לא מוצאת אותם בהזמנות – תעשה לי סדר, תראה מה חסר")
//  • every product from a parcel photo that matches no order is saved here with the photo (rcv296.js), and she can add one by hand (photo + a few words)
//  • each one: "➕ להוסיף לארון" (a closet item of hers, with that photo) or "🗑 לא רלוונטי"
//  • and the orders the site does not have yet: the newest order date per shop, so she knows which receipts to send
// db collection 'stray358' {what, ph (asset id), d, t, st:'open'|'added'|'gone', id (closet item when added)}
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v358s '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=m=>(window.toast||(()=>{}))(m);
const ACC={t1:'טמו 1',t2:'טמו 2',t3:'טמו 3',sh:'שיין',ae:'עלי אקספרס'};
const CATS=[['dresses','שמלה'],['skirts','חצאית'],['tops','חולצה'],['sweaters','סוודר'],['outer','ז׳קט / מעיל'],['scarves','כיסוי ראש'],['shoes','נעליים'],['bags','תיק'],['belts','חגורה'],['jewelry','תכשיט'],['hosiery','גרביים'],['night','לילה / תחתון'],['hair','לשיער'],['girls','לבת'],['boys','לבן'],['other','אחר']];
const today=()=>{const d=new Date();return d.getDate()+'/'+(d.getMonth()+1)};
let L=null;
const GUESS=[['dresses',/שמל/],['skirts',/חצאי/],['sweaters',/סוודר|סריג|קרדיגן/],['outer',/ז.?קט|מעיל|בלייזר/],['tops',/חולצ|טי שירט|גופי/],['scarves',/מטפח|כיסוי|צעיף|כובע/],['shoes',/נעל|מגפ|סנדל/],['bags',/תיק/],['belts',/חגור/],['jewelry',/שרשר|עגיל|צמיד|טבעת|תכשיט/],['hosiery',/גרב/],['night',/פיג|לילה|חזי|תחתונ/],['hair',/גומי|סיכ|קשת לשיער/]];
const guess=w=>{const g=GUESS.find(([c,r])=>r.test(w||''));return g?g[0]:'other'};
const db=async()=>{try{return await window.claude?.use?.('db')}catch(_){return null}};
async function load(){if(L)return L;L={};try{const d=await db();if(d){const s=await d.collection('stray358').get();(s.docs||[]).forEach(x=>{L[x.id]=x.data()})}}catch(e){ERR('load',e)}return L}
async function save(k){try{const d=await db();if(d)await d.collection('stray358').doc(k).set(L[k])}catch(e){ERR('save',e)}}
const UPC=new WeakMap();   // one parcel photo is uploaded once even when several products of it are saved
async function up(blob){try{if(!blob)return '';if(UPC.has(blob))return UPC.get(blob);const a=await window.claude.use('assets');if(!a)return '';const r=await a.upload(blob);const id=r&&r.id||'';if(id)UPC.set(blob,id);return id}catch(e){ERR('up',e);return ''}}
async function add(what,blob){await load();const k='s'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
 L[k]={what:String(what||'מוצר').slice(0,80),ph:await up(blob),d:today(),t:Date.now(),st:'open'};await save(k);paintBtn();return k}
const open_=()=>Object.entries(L||{}).filter(([k,v])=>v&&v.st=='open').sort((a,b)=>b[1].t-a[1].t);
// the newest order the site knows, per shop
function newest(){const m={};Object.keys(D).forEach(id=>{const x=D[id];if(!x||!x.src||!ACC[x.src]||!x.date)return;const [dd,mm]=String(x.date).split('/').map(Number);if(!dd||!mm)return;const nowM=new Date().getMonth()+1;const v=(mm>nowM+1?-1200:0)+mm*100+dd;   /* a December date seen in January is last year */if(!m[x.src]||v>m[x.src].v)m[x.src]={v,d:dd+'/'+mm}});return m}
let dlg=null;
function paint(){if(!dlg)return;const O=open_(),N=newest();
 dlg.querySelector('.s358b').innerHTML=`
 <p class="s358s">מה שהגיע אלייך ולא מצאתי באף הזמנה באתר. כל מוצר כזה אפשר להוסיף לארון, או לשלוח לי את הקבלה של ההזמנה שלו ואכניס את כל ההזמנה.</p>
 <label class="s358add"><input type="file" accept="image/*" hidden><span>📷 להוסיף מוצר שהגיע ולא מופיע</span></label>
 ${O.length?`<ul class="s358l">${O.map(([k,v])=>`<li data-k="${k}"><img alt="" src="${v.ph?'/_blob/'+es(v.ph):''}"><div><b>${es(v.what)}</b><small>הגיע · ${es(v.d)}</small>
  <label class="s358c">מה זה? <select data-s358cat="${k}">${CATS.map(([c,n])=>`<option value="${c}"${guess(v.what)==c?' selected':''}>${n}</option>`).join('')}</select></label>
  <div class="s358a"><button type="button" data-s358add="${k}">➕ להוסיף לארון</button><button type="button" data-s358gone="${k}" aria-label="לא רלוונטי – למחוק">🗑</button></div></div></li>`).join('')}</ul>`:'<p class="s358e">✓ אין כרגע מוצרים כאלה</p>'}
 <h3>ההזמנות שיש באתר – העדכנית בכל חנות</h3><ul class="s358n">${Object.keys(ACC).map(s=>`<li><b>${ACC[s]}</b><span>${N[s]?'ההזמנה האחרונה באתר: '+N[s].d:'אין הזמנות'}</span></li>`).join('')}</ul>
 <p class="s358s">הזמנה שעשית אחרי התאריך הזה לא נמצאת באתר – שלחי לי את הקבלה (צילומי מסך מהאפליקציה כמו בשיין, או PDF) ואכניס אותה עם התמונות.</p>`}
async function open(){try{if(!dlg){dlg=document.createElement('dialog');dlg.id='s358';dlg.dir='rtl';dlg.setAttribute('aria-labelledby','s358t');document.body.append(dlg);
  dlg.innerHTML=`<div class="s358h"><h2 id="s358t">📦 הגיע ולא מופיע בהזמנות</h2><button type="button" class="s358x" aria-label="סגירה">✕</button></div><div class="s358b"></div>`;
  dlg.addEventListener('click',async e=>{const b=e.target.closest('button');if(e.target===dlg||e.target.closest('.s358x'))return dlg.close();if(!b)return;
   if(b.dataset.s358gone){const k=b.dataset.s358gone;L[k].st='gone';await save(k);paint();paintBtn();toast('🗑 הוסר מהרשימה');return}
   if(b.dataset.s358add){const k=b.dataset.s358add,v=L[k];if(!v||v.st!='open'||v._busy)return;v._busy=1;b.disabled=true;   /* v358: a double tap made two items */const c=(dlg.querySelector(`[data-s358cat="${k}"]`)||{}).value||'other';const id='M'+Date.now().toString(36);
    const m={cat:c,short:v.what,color:'',d:v.d};try{if(window.addMine299)addMine299(id,Object.assign({img:v.ph},m));await putItem(id,Object.assign({my:m},v.ph?{img:v.ph}:{}))}catch(er){ERR('add',er)}
    v.st='added';v.id=id;await save(k);paint();paintBtn();toast('➕ נוסף לארון');return}});
  dlg.addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;e.target.value='';const w0=prompt('מה זה? (כמה מילים, למשל: חצאית ג׳ינס כחולה)','');if(w0===null)return;const what=w0.trim()||'מוצר שהגיע';   /* cancel = nothing saved */
   toast('שומרת…');await add(what,f);paint();toast('📦 נשמר ברשימה')})}
 await load();paint();if(!dlg.open)dlg.showModal()}catch(e){ERR('open',e)}}
// the button in the orders window (under the 📷 one)
function paintBtn(){try{const d=document.getElementById('ord123');if(!d||!d.open)return;const b0=d.querySelector('.o3b');if(!b0)return;if(b0.querySelector('.o3oh')){const o=b0.querySelector(':scope>.s358o');if(o)o.remove();return}   /* inside one order – the list only */let b=b0.querySelector(':scope>.s358o');
 if(!b){b=document.createElement('button');b.type='button';b.className='s358o';b.onclick=open;const at=b0.querySelector(':scope>.c349')||b0.querySelector(':scope>.o3q');if(at)at.after(b);else b0.prepend(b)}
 const n=L?open_().length:0;const h=`<span>📦 הגיע ולא מופיע בהזמנות${n?` <em>${n}</em>`:''}</span><i aria-hidden="true">‹</i>`;if(b.innerHTML!=h)b.innerHTML=h}catch(e){ERR('btn',e)}}
setInterval(()=>{const d=document.getElementById('ord123');if(d&&d.open){if(!L)load().then(paintBtn);paintBtn()}},700);
window.STRAY358={add,open};window.STRAY357=window.STRAY358;
})();
