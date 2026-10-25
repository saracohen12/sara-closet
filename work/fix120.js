
// ===== v120 (2026-10-23): "🧕 קשירות" – Sara's 13 tying styles in their own place, each with its own GPT prompt
// (Sara 23:59: "organize them in a separate category with a name, and for each one its own prompt to paste in GPT with my avatar").
// One message to GPT: her 2 avatar files (cap) + the scarf photo + the style's prompt → one wide picture with 4 panels
// (front, side, back, half side), which the scarf window already cuts into a tie ("➕ הוסיפי קשירות"). The tie gets the style's name.
const TIES120=[
 ['שובל נשפך אחורי','Flowing Tail Wrap','חלק מלפנים, כל הבד נאסף בעורף ונופל לאורך הגב בשובל אחד ארוך ורך.',
  'The fabric is wrapped smoothly across the top and sides over a Bobo base. At the nape of the neck, all excess fabric is gathered together and left cascading down the back as a single, long, gracefully flowing, loose tail. The front remains flat and neat.'],
 ['בובו קוקס נמוך ומהודק','Neat Low Bun / Kuks','חלק מלפנים ובצדדים, בעורף הבד מלופף לקוקס עגול ומסודר, בלי זנבות.',
  'Perfectly smooth on the front and sides over a low Bobo. At the nape, the fabric is tightly twisted and coiled repeatedly around a round base to form a prominent, neat low bun. All fabric ends are cleanly tucked inside with zero loose or draping tails.'],
 ['טורבן גבוה','High Volume Turban','בובו גבוה עם הרבה גובה בכתר, קפלים אלכסוניים מלפנים, הגב שטוח וסגור.',
  'The fabric is wrapped upwards over a high Bobo base to create significant height and structure at the crown. The front features neat overlapping diagonal pleats along the upper hairline. The back is flat and tightly wrapped, with all ends securely hidden inside.'],
 ['פפיון צדדי אלגנטי','Elegant Side Bow','צמוד לכל הראש, פפיון גדול ומסודר בצד בגובה הלסת, בלי זנבות ארוכים.',
  'Snug fit around the entire head over a low Bobo. Positioned on one side at the lower jawline level, the fabric is tied into a large, structured bow with clearly defined loops. No long trailing ends.'],
 ['קשירה נמוכה משולבת בשכבות','Layered Low Wrap / Combined','חלק מלפנים, מאחור למטה פסים רחבים ושטוחים בשכבות, כל הקצוות מוסתרים.',
  'Smooth front over a low Bobo base. At the lower back, the fabric is wrapped in wide, flat, overlapping horizontal and diagonal bands repeatedly around the base. All ends are securely tucked beneath the layers, leaving a clean woven look with no loose tails.'],
 ['קשר עורף עם שובל אחורי ישר','Low Knot with Straight Back Tail','קשר רך בעורף, והשאר נופל ישר באמצע הגב כשובל רחב ושטוח.',
  'Tied over a low volumizing base (Bobo). Wrapped smoothly across the front. At the nape, it is gathered and twisted into a soft, textured knot, with remaining fabric falling straight down the center of the back as a wide, flat tail.'],
 ['כתר גבוה עם שובל צדדי','High Crown with Single Side Tail','בובו גבוה עם קפלים למעלה, כל הבד נאסף לצד אחד ונופל על כתף אחת.',
  'Tied over a high volumizing base (Bobo) creating prominent height at the crown. Overlapping textured folds across top, while all excess fabric is gathered to one side, falling over a single shoulder as a long flowing tail.'],
 ['קשר נמוך מסובב עם שובל קצר','Low Twisted Knot with Short Tail','צמוד מלפנים, קשר מסובב בולט למטה מאחור, ושובל קצר ומשולש.',
  'Tied over a low volumizing base (Bobo) with front and sides tightly wrapped. At the lower back, tied into a prominent twisted knot, leaving a short, wide, triangular tail cascading gently down.'],
 ['קוקס מלופף ועשיר בטקסטורה','Massive Textured Coiled Bun','בובו גדול, מאחור שכבות עבות מלופפות כמו שושנה גדולה, בלי זנבות.',
  'Tied over a large low-to-mid volumizing base (Bobo). Smooth front, while the back is wrapped repeatedly in thick, overlapping, coiled layers to create a massive, rosette-like bun with no long tails.'],
 ['שובל חזיתי יחיד','Single Front Cascading Tail','בובו גבוה, כל הבד נאסף לצד אחד ונופל קדימה על כתף אחת בשובל רחב.',
  'Tied over a high volumizing base (Bobo). Fabric wrapped asymmetrically, covering the head completely. All excess fabric gathered strictly to one side, falling forward over a single shoulder in a long wide tail. Opposite side and back are completely smooth.'],
 ['קוקו נמוך הדוק עם שובל','Low Tied Ponytail Wrap','צמוד, בעורף קשר קטן והדוק כמו גומייה, ושובל אחד ארוך ישר לאורך הגב.',
  'Tightly wrapped over a low volumizing base (Bobo). At the nape, gathered and tied tightly into a single compact knot resembling a hair tie, with a single long tail dropping straight down the back.'],
 ['כתר גבוה עם פפיון קדמי','High Crown with Front Bow and Side Tail','בובו גבוה, פפיון גדול לרוחב מעל המצח, ושובל דק יורד מהצד על הכתף.',
  'Tied over a high volumizing base (Bobo) for significant height. Culminates in a large, structured horizontal bow placed directly above the forehead. A long sheer tail cascades down from the side of the bow over the shoulder.'],
 ['קשירה צמודה עם שני שובלים אחוריים','Dual-Pattern Close Wrap with Two Tails','צמוד מאוד, דוגמה אחת מלפנים ואחרת מאחור, ושני שובלים ארוכים לאורך הגב.',
  'Tied tightly over a very low volumizing base (Bobo). Front displays one pattern section, back displays another. Tied securely at the nape, leaving two distinct long tails cascading straight down the back and shoulders.']];
window.TIES120=TIES120;
function what120(id){const d=(typeof D!='undefined'&&id&&D[id])||{};const n=(d.short||'').trim();return n?`My headscarf (this is exactly what I bought): ${n}${d.color?`, colour ${d.color}`:''}.`:'My headscarf: ___ (write exactly what you bought).'}
function tiePrompt120(i,id){const [he,en,,det]=TIES120[i];return `Attached in this one message: 2 files of my avatar (file 1: front, side, back; file 2: half side, hand on hip) and the photo of my headscarf.
${what120(id)}
Use my avatar files ONLY to match the size and shape of my head, the cap line on my forehead and the head angle in each view. Do NOT draw my face, hair, neck or body.

Create ONE horizontal image divided into 4 equal vertical panels side-by-side, separated by thin white lines:
Panel 1: Front view. Panel 2: Profile side view (the same direction as my avatar's side view). Panel 3: Back view. Panel 4: Three-quarter view (like my avatar's half side view).

Subject: the exact headscarf from the photo (same fabric, pattern, colour, texture and trims) as a 3D floating headscarf (mitpachat) shaped over an invisible head the size of my avatar's head, with a volumizing base (Bobo) underneath. HOLLOW inside, the face opening empty (background colour). NO face, NO neck wrap, NO fabric on the neck, NO torso, cut cleanly at the jawline (only the tails of the tying style may fall lower, down the back or over a shoulder).
Same head size and same height in all 4 panels, the head centered in the upper part of each panel, the whole scarf inside its panel with a small margin, never cut off.
Style: solid light grey studio background, photorealistic, 8k resolution, clean lighting, modular digital avatar asset. No text, no extra objects, no shadow on the background.
If the headscarf is grey or silver, use a solid light green background instead of grey. A white headscarf stays white.

Tying style ${i+1}: ${en} (${he})
Tying Style Details: ${det}`}
window.tiePrompt120=tiePrompt120;
// her 2 avatar files with the cap, for the one GPT message
let AV120=null;
function avFiles120(){return AV120||(AV120=Promise.all([['av/p6c_sheet1.jpg','האווטאר שלי - קובץ 1 (חזית, צד, גב).jpg'],['av/p6c_sheet2.jpg','האווטאר שלי - קובץ 2 (חצי צד, יד על המותן).jpg']].map(async([u,n])=>new File([await window.blob102(u+'?v='+(window.VER||''))],n,{type:'image/jpeg'}))).catch(e=>{AV120=null;throw e}))}
// the style she picked last for a scarf names the tie she uploads next
const PICK120={};try{Object.assign(PICK120,JSON.parse(localStorage.getItem('tie120')||'{}'))}catch(_){}
const pick120=(id,i)=>{PICK120[id]=i;try{localStorage.setItem('tie120',JSON.stringify(PICK120))}catch(_){}};
let TIEGO120=null;// {id,i} while the send window is for a tie
{const _p=pr102;pr102=function(id){if(TIEGO120&&TIEGO120.id==id)return tiePrompt120(TIEGO120.i,id);return _p.apply(this,arguments)};window.pr102=pr102}
{const _a=window.after106;window.after106=function(d){try{_a&&_a(d)}catch(_){}try{if(!TIEGO120||!window.G106||G106.id!=TIEGO120.id){return}
  const [he]=TIES120[TIEGO120.i];const h=d.querySelector('.sh9h h3');if(h)h.textContent='🧕 '+he+' – שליחה ל-GPT';
  d.querySelectorAll('.g106s p').forEach(p=>{p.innerHTML=p.innerHTML.replace(/של הבגד/g,'של המטפחת').replace(/הבגד/g,'המטפחת').replace(/בגד (\d)/g,'מטפחת $1')});
  d.querySelectorAll('.len114').forEach(x=>x.remove());
  const n=d.querySelector('.g106n');if(n)n.innerHTML=`GPT יחזיר <b>תמונה אחת עם 4 חלקים</b>. שומרים אותה, ובחלון המטפחת לוחצים "➕ הוסיפי קשירות" – היא תישמר בשם "${esc(he)}".`}catch(e){ERR114('v120 after',e)}}}
// the window is closed → back to garment prompts
document.addEventListener('close',e=>{if(e.target&&e.target.id=='g106')TIEGO120=null},true);
async function go120(id,i){pick120(id,i);TIEGO120={id,i};try{await navigator.clipboard.writeText(tiePrompt120(i,id))}catch(_){}
 let av;try{av=await avFiles120()}catch(e){ERR114('v120 av',e);toast('לא הצלחתי להכין את קבצי האווטאר');return}
 const t=document.getElementById('ties120');if(t&&t.open)t.close();open106(id,av)}
// ---- the "🧕 קשירות" window: 13 cards, each with its name, what it looks like, and its prompt
function dlg120(){let d=document.getElementById('ties120');if(!d){d=document.createElement('dialog');d.id='ties120';d.className='sheet9';d.dir='rtl';document.body.appendChild(d)}return d}
let ID120='';
function done120(id){const L=id&&typeof tieList=='function'?tieList(id):[];return TIES120.map(([he])=>L.some(t=>(t.n||'').replace(/\s+\d+$/,'').trim()==he))}
function open120(id){ID120=id||'';const d=dlg120();const nm=ID120&&typeof D!='undefined'&&D[ID120]?(D[ID120].short||''):'';const dn=done120(ID120);
 d.innerHTML=`<div class="sh9h"><h3>🧕 קשירות למטפחות</h3><button class="x" data-t120="x" aria-label="סגירה">✕</button></div><div class="t120b">
 <p class="t120h">${nm?`למטפחת: <b>${esc(nm.slice(0,60))}</b><br>בוחרים קשירה ← נפתח חלון עם קבצי האווטאר שלך והתמונה של המטפחת, והפרומפט מועתק.`:`בוחרים קשירה ומעתיקים את הפרומפט שלה. ל-GPT שולחים בהודעה אחת: שני קבצי האווטאר + תמונת המטפחת + הפרומפט.<br><small>הכי קל: לפתוח את המטפחת בארון ← "🧕 קשירות" – שם הכל מוכן בלחיצה.</small>`}</p>
 ${nm?'':'<div class="t120av"><button data-t120="av">⬇ קבצי האווטאר שלי (2)</button></div>'}
 <ol class="t120l">${TIES120.map(([he,en,hd],i)=>`<li${dn[i]?' class="ok"':''}><div class="t120n"><b>${i+1}. ${esc(he)}</b>${dn[i]?'<span class="t120v">✓ יש כבר</span>':''}<small dir="ltr">${esc(en)}</small></div><p>${esc(hd)}</p>
  <div class="t120a">${nm?`<button class="go" data-t120="g${i}">🚀 ל-GPT</button>`:''}<button data-t120="c${i}">📋 העתקת הפרומפט</button><button data-t120="s${i}" aria-expanded="false">👁</button></div><pre hidden dir="ltr">${esc(tiePrompt120(i,ID120))}</pre></li>`).join('')}</ol></div>`;
 if(!d.open)d.showModal()}
window.openTies120=open120;
async function copy120(txt){try{await navigator.clipboard.writeText(txt);return true}catch(_){const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}ta.remove();return ok}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-t120],[data-t120open]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.t120open!=null){const r=t.closest('[data-imgrow]');return open120(t.dataset.t120open||(r&&r.dataset.imgrow)||'')}
 const a=t.dataset.t120;if(a=='x')return dlg120().close();
 if(a=='av'){t.disabled=true;try{const fs=await avFiles120();const n=await window.save102(fs.map(f=>[f,f.name]));toast(n?'✓ שני קבצי האווטאר ירדו':'בוטל')}catch(err){ERR114('v120 avdl',err);toast('לא הצלחתי להוריד')}finally{t.disabled=false}return}
 const i=+a.slice(1);if(a[0]=='g')return go120(ID120,i);
 if(a[0]=='c'){if(ID120)pick120(ID120,i);toast(await copy120(tiePrompt120(i,ID120))?`✓ הפרומפט של "${TIES120[i][0]}" הועתק`:'לא הצלחתי להעתיק');return}
 if(a[0]=='s'){const p=t.closest('li').querySelector('pre');p.hidden=!p.hidden;t.setAttribute('aria-expanded',String(!p.hidden));return}},true);
// ---- in the scarf window: a clear button to the 13 styles, and the 13 names as name chips
{const _th=tiesHTML;tiesHTML=function(id){const n=done120(id).filter(Boolean).length;return `<button class="go t120open" data-t120open="${id}">🧕 13 קשירות – פרומפט לכל אחת${n?` · ✓ ${n}`:''}</button>`+_th.apply(this,arguments)}}
{const _kn=tieKnownNames;tieKnownNames=function(){const s=new Set(TIES120.map(x=>x[0]));return TIES120.map(x=>x[0]).concat(_kn.apply(this,arguments).filter(n=>!s.has(n)))}}
// an upload with no name typed gets the name of the style she sent to GPT for this scarf
{const _ut=upTies;upTies=async function(id,files,mode){try{const f=tieNameField(id);const i=PICK120[id];if(f&&!f.value.trim()&&i!=null&&TIES120[i]&&(files||[]).length==1)f.value=TIES120[i][0]}catch(_){}return _ut.apply(this,arguments)};window.upTies=upTies}
// the prompts window (📋 פרומטים ל-GPT) gets a "🧕 13 קשירות" button too
document.addEventListener('click',()=>setTimeout(()=>{const d=document.getElementById('pr80');if(d&&d.open){const b=d.querySelector('.p80t');if(b&&!b.querySelector('[data-t120open]'))b.insertAdjacentHTML('afterbegin','<button data-t120open=""><span>🧕</span>13 קשירות למטפחות</button>')}},60));
