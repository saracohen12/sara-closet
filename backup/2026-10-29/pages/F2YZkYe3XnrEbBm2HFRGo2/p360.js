// One GPT prompt for the 360 avatar, built from the item type (Sara 25/10: "כשאני בוחרת סוג פריט, אוטומטית הפרומט מתאים את עצמו").
// Used by both the 360 page and the prompt page: P360(el) fills el with the type picker, the fields and the prompt.
(function(){
const ME='גובה 156 ס"מ, חזה 94, מותן 73, ירכיים 96';
const G={cloth:'👗 בגדים',head:'🧕 ראש',face:'💄 פנים',jw:'📿 תכשיטים',more:'👜 עוד'};
// set: she picks a style from pictures (STY360 in sty.js, thumbnails st/<set><n>.jpg); own: nothing bought – it is her own hair / face
// n: how many separate sheets GPT returns ('n' = she types the number); len: ask the length; body: the measurements matter
const K=[
 {k:'top',g:'cloth',t:'חולצה',ex:'חולצה כחולה בפרחים',body:1,how:'החולצה יושבת על הכתפיים שלה, השרוולים על הידיים שלה, באורך שבתמונה. החולצה בחוץ, לא בתוך השמלה.'},
 {k:'base',g:'cloth',t:'חולצת בסיס',ex:'חולצת בסיס שחורה עם שרוול ארוך',body:1,how:'זו חולצת בסיס דקה וצמודה שלובשים מתחת לבגדים אחרים: צמודה לגוף, בלי קפלים גדולים, הצווארון והשרוולים בדיוק כמו בתמונה.'},
 {k:'skirt',g:'cloth',t:'חצאית',ex:'חצאית ג\'ינס מקסי',body:1,len:1,how:'החצאית מתחילה בקו המותן שלה ונופלת עד האורך האמיתי.'},
 {k:'dress',g:'cloth',t:'שמלה',ex:'שמלה ארוכה בצבע בורדו',body:1,len:1,how:'השמלה מכסה את השמלה בצבע עור. הכתפיים, הצווארון והשרוולים בדיוק כמו בתמונה.'},
 {k:'sweater',g:'cloth',t:'סוודר',ex:'סוודר סרוג בצבע קרם',body:1,how:'הסוודר מעל השמלה, עם הנפח של הבד הסרוג, השרוולים על הידיים שלה.'},
 {k:'vest',g:'cloth',t:'אפודה / וסט',ex:'אפודה ארוכה בצבע חום',body:1,len:1,how:'אפודה בלי שרוולים, מעל השמלה. הידיים והשרוולים הקצרים של השמלה נשארים בדיוק כמו שהם.'},
 {k:'jacket',g:'cloth',t:'ז\'קט',ex:'ז\'קט קצר שחור',body:1,how:'הז\'קט מעל השמלה, פתוח או סגור בדיוק כמו בתמונה, השרוולים על הידיים שלה.'},
 {k:'coat',g:'cloth',t:'מעיל',ex:'מעיל צמר ארוך בצבע קאמל',body:1,len:1,how:'המעיל מעל הכל, פתוח או סגור בדיוק כמו בתמונה, באורך האמיתי שלו.'},
 {k:'suit',g:'cloth',t:'חליפה (2 חלקים)',ex:'חליפה: ז\'קט וחצאית בצבע אפור',body:1,len:1,n:2,how:'זו חליפה של שני חלקים, ואני צריכה כל חלק בנפרד:\nתמונה 1: הגיליון עם החלק העליון בלבד.\nתמונה 2: הגיליון עם החלק התחתון בלבד.'},
 {k:'pants',g:'cloth',t:'מכנסיים',ex:'מכנסיים רחבים',body:1,len:1,how:'המכנסיים מתחילים בקו המותן שלה ומגיעים עד האורך האמיתי.'},
 {k:'cover',g:'head',t:'כיסוי ראש / כובע',ex:'כובע סרוג אפור',how:'כיסוי הראש מחליף את כיסוי הבז׳ הפשוט שעל הדמות ומסתיר אותו לגמרי, כולל השוליים. בצד ובגב צרי אותו כמו שהוא נראה באמת מהכיוון הזה.'},
 {k:'scarf',g:'head',t:'מטפחת',set:'ties',ex:'מטפחת סאטן כחולה עם פפיון',how:'המטפחת קשורה בדיוק כמו בתמונה: אותה קשירה, אותו נפח, אותו קשר. היא מחליפה את כיסוי הבז׳ הפשוט שעל הדמות ומסתירה אותו לגמרי. בצד ובגב צרי את הקשר כמו שהוא נראה באמת מהכיוון הזה.'},
 {k:'wig',g:'head',t:'תסרוקת (מהפאה שלי)',set:'hair',own:1,ex:'',how:''},
 {k:'makeup',g:'face',t:'איפור',set:'makeup',own:1,ex:'',how:''},
 {k:'jwset',g:'jw',t:'סט תכשיטים (לפרק)',ex:'סט זהב: שרשרת עם תליון, עגילים וצמיד',n:'n',nDef:2,how:'בתמונת המוצר יש כמה תכשיטים. אני צריכה כל תכשיט בתמונה נפרדת (למשל: שרשרת לבד, עגילים לבד, צמיד לבד). בכל תמונה רק תכשיט אחד, בלי האחרים.'},
 {k:'necklace',g:'jw',t:'שרשרת',ex:'שרשרת זהב עם תליון לב',how:'רק השרשרת, גם אם בתמונה יש עוד תכשיטים. על הצוואר, באורך האמיתי שלה, נופלת על החזה כמו במציאות. מקדימה רואים את כל השרשרת והתליון, מהצד רואים אותה יורדת מהצוואר, ומהגב רק את השרשרת הדקה על העורף (אם רואים אותה).'},
 {k:'earrings',g:'jw',t:'עגילים',ex:'עגילי זהב תלויים',how:'רק העגילים, גם אם בתמונה יש עוד תכשיטים. על שתי האוזניים, באותו גודל ובאותו אורך כמו בתמונה. אם כיסוי הראש מכסה חלק מהאוזן, תנוך האוזן והעגיל יוצאים מתחתיו ונראים. מקדימה רואים את שני העגילים, מהצד רק את העגיל שבצד הזה.'},
 {k:'bracelet',g:'jw',t:'צמיד / שעון',ex:'צמיד כסף דק',how:'רק הצמיד, על פרק היד השמאלי, באותו גודל כמו בתמונה. בזוויות שהיד מוסתרת לא רואים אותו.'},
 {k:'belt',g:'more',t:'חגורה',ex:'חגורה עם אבנים',how:'החגורה על קו המותן שלה, מסביב לכל הגוף, בדיוק באותו רוחב ואותו אבזם כמו בתמונה. בצד היד עוברת מעל החגורה.'},
 {k:'shoes',g:'more',t:'נעליים',ex:'נעלי עקב שחורות',how:'הנעליים האלה במקום הנעליים הבז\'. אותו מיקום של הרגליים, אותה עמידה. מקדימה, מהצד ומאחור צרי את הנעל כמו שהיא נראית באמת מהכיוון הזה.'},
 {k:'bag',g:'more',t:'תיק',ex:'תיק צד קטן בצבע חום',how:'התיק תלוי על הכתף, בגודל האמיתי שלו ביחס לגוף, בלי לשנות את תנוחת הידיים. מהגב ומהצד רואים אותו כמו במציאות.'},
 {k:'multi',g:'more',t:'כמה מוצרים ביחד (לפרק)',ex:'חולצה לבנה, אפודה סרוגה וחצאית אפורה',n:'n',nDef:3,body:1,how:'בתמונת המוצר יש כמה פריטים שונים. אני צריכה כל פריט בתמונה נפרדת: בכל תמונה הדמות לובשת רק פריט אחד מתוכם, בלי האחרים.'}
];
const css=`.p3 {display:flex;flex-direction:column;gap:12px}
.p3 [hidden]{display:none!important}
.p3 .p3row{display:grid;grid-template-columns:2fr 1fr;gap:10px}
@media(max-width:420px){.p3 .p3row{grid-template-columns:1fr}}
.p3 .p3f{display:flex;flex-direction:column;gap:4px;min-width:0}
.p3 label{font-weight:600;font-size:.92rem}
.p3 select,.p3 input{font:inherit;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--fg);min-width:0}
.p3 select{font-weight:600}
.p3 .p3note{font-size:.92rem;color:var(--muted);background:var(--bg);border-radius:12px;padding:8px 12px}
.p3 .p3note:empty{display:none}
.p3 textarea{font:inherit;font-size:.92rem;line-height:1.5;width:100%;box-sizing:border-box;min-height:16em;padding:12px;border-radius:14px;border:1px solid var(--line);background:var(--bg);color:var(--fg);resize:vertical}
.p3 .p3copy{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.p3 .p3copy button{font:inherit;font-weight:700;border:0;border-radius:999px;padding:11px 20px;background:var(--accent);color:var(--card);cursor:pointer}
.p3 .p3sty{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 8px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}
.p3 .p3sty button{flex:0 0 108px;scroll-snap-align:start;display:flex;flex-direction:column;align-items:stretch;gap:4px;padding:5px;border-radius:14px;border:2px solid var(--line);background:var(--card);color:var(--fg);font:inherit;font-size:.8rem;line-height:1.25;cursor:pointer;text-align:center}
.p3 .p3sty button[aria-pressed="true"]{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent) inset}
.p3 .p3sty .th{aspect-ratio:3/4;border-radius:10px;background:var(--bg);display:grid;place-items:center;overflow:hidden;font-size:1.6rem;font-weight:700;color:var(--muted)}
.p3 .p3sty .th img{width:100%;height:100%;object-fit:cover;display:block}
.p3 .p3cat{font:inherit;font-size:.86rem;align-self:flex-start;border:1px dashed var(--line);background:none;color:var(--fg);border-radius:999px;padding:7px 14px;cursor:pointer}
.p3 .p3cat[aria-pressed="true"]{background:var(--fg);color:var(--card);border-style:solid}
.p3 .p3ok{color:var(--ok);font-weight:600;font-size:.9rem}
.p3 select:focus-visible,.p3 input:focus-visible,.p3 button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}`;
function opts(){return Object.keys(G).map(g=>`<optgroup label="${G[g]}">${K.filter(x=>x.g==g).map(x=>`<option value="${x.k}">${x.t}</option>`).join('')}</optgroup>`).join('')}
window.P360=function(el,pre){
 if(!document.getElementById('p3css')){const s=document.createElement('style');s.id='p3css';s.textContent=css;document.head.appendChild(s)}
 const id=pre||'p3';
 el.classList.add('p3');
 el.innerHTML=`<div class="p3row"><div class="p3f"><label for="${id}k">סוג הפריט</label><select id="${id}k">${opts()}</select></div>
 <div class="p3f" data-f="len"><label for="${id}l">אורך בס"מ</label><input id="${id}l" inputmode="numeric" placeholder="אם יודעת"></div>
 <div class="p3f" data-f="n"><label for="${id}n">כמה פריטים</label><input id="${id}n" inputmode="numeric"></div></div>
 <div class="p3f" data-f="sty"><label id="${id}sl">בוחרים לפי התמונה</label><div class="p3sty" id="${id}s" role="group" aria-labelledby="${id}sl"></div>
  <button type="button" class="p3cat" id="${id}g" aria-pressed="false">📸 אין עדיין תמונות? פרומפט שמכין תמונות לבחירה</button></div>
 <div class="p3f" data-f="what"><label for="${id}w">מה קנית בדיוק (לא חובה, כדי לדייק)</label><input id="${id}w"></div>
 <p class="p3note" id="${id}x"></p>
 <textarea id="${id}p" readonly aria-label="הפרומפט ל-GPT"></textarea>
 <div class="p3copy"><button type="button" id="${id}c">📋 להעתיק את הפרומפט</button><span class="p3ok" id="${id}o" hidden>הועתק ✓</span></div>`;
 const $=s=>el.querySelector('#'+id+s);let lastK=null,CAT=false;const PICK={hair:0,ties:0,makeup:0};
 const ST=window.STY360||{hair:[],ties:[],makeup:[]};
 function cards(set){$('s').innerHTML=ST[set].map((x,i)=>`<button type="button" data-i="${i}" aria-pressed="${i==PICK[set]}"><span class="th">${i<((ST.have||{})[set]||0)?`<img src="st/${set}${i+1}.jpg" alt="" onerror="this.replaceWith(document.createTextNode('${i+1}'))">`:i+1}</span><span>${i+1}. ${x.he}</span></button>`).join('');
  $('s').querySelectorAll('button').forEach(b=>b.onclick=()=>{PICK[set]=+b.dataset.i;CAT=false;$('s').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));build()})}
 const SAME=`אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותם פנים בדיוק, אותה תנוחה, אותו רקע אפור, אותם קווים לבנים בין המשבצות, ומה שהדמות לובשת נשאר בדיוק אותו דבר.`;
 const ONE='החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.';
 const ORDER='הסדר: מתחילים מהמשבצת השמאלית העליונה, ממשיכים ימינה עד סוף השורה, ואז השורה הבאה משמאל לימין.';
 // only the styles that have no picture yet (STY360.have = how many pictures exist, from 1), split into 2 grids
 function catalog(set){const h=(ST.have||{})[set]||0,R=ST[set].map((x,i)=>({x,i})).slice(h),N=R.length;
  const a=Math.ceil(N/2),P=[R.slice(0,a),R.slice(a)].filter(p=>p.length);
  const grid=p=>{const c=Math.ceil(p.length/2);return `רשת של 2 שורות ו-${c} עמודות, מספרים ${p[0].i+1}–${p[p.length-1].i+1}`+(p.length<2*c?', והמשבצת האחרונה ריקה':'')};
  const G=P.map((p,j)=>`תמונה ${j+1}: ${grid(p)}.`).join('\n');
  const L=R.map(({x,i})=>`${i+1}. ${x.he} – ${x.en}`).join('\n');
  const head=set=='ties'?'מצורפת תמונה שלי מקדימה, עם כיסוי ראש בז׳ פשוט.':set=='hair'?'מצורפת תמונה שלי מקדימה, עם הפאה שלי (זה השיער שלי, אין לי פאה אחרת).':'מצורפת תמונה שלי מקדימה.';
  const what=set=='hair'?`דיוקנאות של הראש והכתפיים שלי, בכל משבצת תסרוקת אחרת מהשיער שלי`:set=='ties'?`הראש והכתפיים שלי בזווית של חצי צד (כדי שרואים גם את הקשר מאחור), עם מטפחת חלקה בצבע כחול-אפור, בכל משבצת קשירה אחרת`:`תמונות קרובות של הפנים שלי, בכל משבצת איפור אחר`;
  const same=set=='hair'?'אותם פנים בדיוק, אותו צבע שיער (חום כהה עם גוונים בהירים, כמו עכשיו), מבט ישר למצלמה':set=='ties'?'אותם פנים בדיוק, אותה מטפחת':'אותם פנים בדיוק, אותם תווי פנים, אותה הבעה, רק האיפור משתנה, מבט ישר למצלמה';
  const nm=set=='hair'?'התסרוקות':set=='ties'?'הקשירות':'האיפורים';
  return `${head}

צרי ${P.length} תמונות: ${what}.
${G}
${ORDER}

בכל המשבצות: ${same}, רקע אפור בהיר, קווים לבנים דקים בין המשבצות, בלי טקסט ובלי מספרים.

${nm}:
${L}`}
 $('g').onclick=()=>{CAT=!CAT;build()};
 function build(){
  const k=K.find(x=>x.k==$('k').value)||K[0];
  const first=k.k!=lastK;if(first){$('w').placeholder='למשל: '+k.ex;if(k.n=='n')$('n').value=k.nDef}
  if(first){CAT=false;if(k.set)cards(k.set);lastK=k.k}
  el.querySelector('[data-f="sty"]').hidden=!k.set;el.querySelector('[data-f="what"]').hidden=!!k.own;$('g').setAttribute('aria-pressed',CAT);$('g').textContent=CAT?'↩ חזרה לפרומפט של הסגנון שבחרתי':'📸 אין עדיין תמונות? פרומפט שמכין תמונות לבחירה';
  el.querySelector('[data-f="len"]').hidden=!k.len;el.querySelector('[data-f="n"]').hidden=k.n!='n';
  const what=($('w').value||'').trim(), len=($('l').value||'').replace(/[^\d.]/g,'');
  const n=k.n=='n'?Math.max(2,Math.min(8,parseInt($('n').value)||k.nDef)):(k.n||1);
  const tt=k.k=='multi'?`${n} פריטים שונים`:k.t.replace(/ \(.*\)$/,'');const item=what?`${tt} – ${what}`:tt;
  if(k.set&&CAT){const h=(ST.have||{})[k.set]||0;$('p').value=catalog(k.set);$('x').textContent=`יש כבר ${h} תמונות, הפרומפט מבקש רק את ${ST[k.set].length-h} החסרות. עובד גם ב-GPT וגם בג'מיני. לצרף: ${k.set=='ties'?'תמונת החזית שלי':k.set=='hair'?'תמונת חזית עם השיער':'תמונת חזית'} (כפתורי ⬇ בדף). מה שחוזר תעלי לי, ואני אשים כל אחת כתמונה לבחירה כאן.`;return}
  const sty=k.set?ST[k.set][PICK[k.set]]:null;
  if(k.k=='wig'){$('p').value=`מצורף גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות, על רקע אפור, עם הפאה שלי. זה השיער שלי.

ערכי את הגיליון הזה, אל תציירי אותו מחדש. שני דבר אחד בלבד: התסרוקת. זה אותו שיער שלי, רק מסודר אחרת:
${sty.he} – ${sty.en}

אותו צבע שיער כמו עכשיו (חום כהה עם גוונים בהירים). התסרוקת זהה בכל 8 הזוויות, ובצד ובגב צרי אותה כמו שהיא נראית באמת מהכיוון הזה.

${SAME}

${ONE}`;$('x').textContent='לצרף את גיליון הבובה עם הפאה (לא את הבובה עם הכיסוי). התסרוקת נהיית שקף שמתחלף עם השיער והמטפחת.';return}
  if(k.k=='makeup'){$('p').value=`מצורף גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות, על רקע אפור.

ערכי את הגיליון הזה, אל תציירי אותו מחדש. הוסיפי איפור בלבד:
${sty.he} – ${sty.en}

הפנים עצמם לא משתנים בכלל: אותם תווי פנים, אותה הבעה, אותו עור, אותו גיל. אותו איפור בדיוק בכל הזוויות שרואים בהן את הפנים. בזוויות של הגב לא משנים כלום.

${SAME}

${ONE}`;$('x').textContent='אפשר לצרף כל גיליון (עם כיסוי, שיער או מטפחת). האיפור נהיה שקף של הפנים.';return}
  const L=[];
  L.push(`מצורפות שתי תמונות.\nהתמונה הראשונה: מה שקניתי – ${item}.\nהתמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות, על רקע אפור.`);
  const how=k.k=='scarf'?`המטפחת קשורה בקשירה הזאת: ${sty.he} – ${sty.hed}\n(${sty.en})\nהיא מחליפה את כיסוי הבז׳ הפשוט שעל הדמות ומסתירה אותו לגמרי. בצד ובגב צרי את הקשר כמו שהוא נראה באמת מהכיוון הזה.`:k.how;
  L.push((k.n?'':`הלבישי את הדמות ב${k.g=='jw'?'תכשיט':k.g=='head'?'פריט':'פריט'} הזה בכל 8 הזוויות. אותו פריט בדיוק בכל המשבצות: אותו צבע, אותו בד, אותה גזרה, אותו גודל. `)+how+(k.n?'\nבכל תמונה: אותו פריט בדיוק בכל 8 הזוויות, אותו צבע, אותו בד, אותו גודל, ובצד ובגב כמו שהוא נראה באמת מהכיוון הזה.':''));
  if(k.g=='cloth'||k.k=='multi')L.push(`אם בתמונת המוצר יש עוד בגדים או אביזרים שלא כתבתי, הם לא שלי: אל תוסיפי אותם.`+(k.k=='belt'?'':' בלי חגורה, גם אם בתמונה יש חגורה.'));
  L.push(`אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותם פנים בדיוק, אותה תנוחה, אותו רקע אפור, אותם קווים לבנים בין המשבצות. כל מה שהדמות כבר לובשת בגיליון (כיסוי ראש בז׳, שמלה בצבע עור, בגדים, כיסוי ראש) נשאר בדיוק אותו דבר${k.g=='head'?', חוץ מהראש':''}. השמלה בצבע עור נשארת בכל מקום שהפריט לא מכסה.`);
  if(k.body)L.push(`המידות שלי: ${ME}. הדמות כבר בנויה לפי המידות האלה, אל תשני את הגוף. המידות הן כדי שהפריט יישב נכון, צמוד או רחב כמו במציאות.`+(k.len?'\n'+(len?`האורך האמיתי: ${len} ס"מ. בגובה 156 ס"מ הוא צריך להגיע בדיוק לאותה נקודה בגוף בכל 8 הזוויות.`:'שמרי על אותו אורך ביחס לגוף כמו בתמונת המוצר, ואותו אורך בכל 8 הזוויות.'):''));
  if(k.g=='cloth'||k.k=='multi')L.push('הבגד צריך להיראות אמיתי על הגוף: קפלים, צללים, הבד נופל לפי התנוחה. לבן בבגד נשאר לבן.');
  L.push(n>1?`החזירי ${n} תמונות נפרדות, אחת לכל ${k.k=='suit'?'חלק':k.g=='jw'?'תכשיט':'פריט'}. כל תמונה היא אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`:'החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.');
  $('p').value=L.join('\n\n');
  $('x').textContent=n>1?`GPT יחזיר ${n} תמונות נפרדות. כל אחת נהיית שקף משלה, ואפשר לשלב אותן עם כל השאר.`:k.g=='head'?'מתחלף עם השיער הפזור: על הראש יש תמיד דבר אחד.':'';
 }
 ['k','w','l','n'].forEach(s=>$(s).addEventListener('input',build));build();
 $('c').onclick=async()=>{const t=$('p');let ok=false;try{await navigator.clipboard.writeText(t.value);ok=true}catch(_){try{t.removeAttribute('readonly');t.select();ok=document.execCommand('copy');t.setAttribute('readonly','')}catch(__){}}
  const m=$('o');m.textContent=ok?'הועתק ✓':'סימנתי את הטקסט, תעתיקי ידנית';m.hidden=false;setTimeout(()=>m.hidden=true,2500)};
};
})();
