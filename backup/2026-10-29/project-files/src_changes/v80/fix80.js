// ===== v80 (2026-10-21): "פרומטים ל-GPT" – one place with a ready prompt per garment type (5 poses like P5GPROMPT),
// jewelry and head-covering prompts, copy button, avatar sheet, and a 📋 per row in "מה חסר לאווטאר" that fills in the item.
(()=>{
const HEAD=`מצורפות שתי תמונות: (1) גיליון האווטר שלי ב-5 תנוחות (חזית, צד, גב, חצי צד, יד על המותן). (2) תמונה של בגד שקניתי.
צרי תמונה אחת רחבה באותו סידור בדיוק כמו גיליון האווטר: 5 חלקים שווים זה לצד זה, מופרדים בקו לבן דק, על רקע אפור בהיר חלק ואחיד, באותו סדר: חזית, צד, גב, חצי צד, יד על המותן.
בכל חלק מופיע רק הבגד מתמונה 2, לבוש על גוף בלתי נראה (ghost mannequin): בלי גוף, בלי ראש, בלי ידיים, בלי רגליים, בלי נעליים, בלי בגדים אחרים.
אם בתמונה 2 יש בגדים נוספים או אביזרים – להתעלם מהם לגמרי.`;
const TAIL=`בכל חלק הבגד בזווית ובתנוחה המדויקת של האווטר באותו חלק (כולל חצי צד ויד על המותן), באותו גודל ובאותו גובה בדיוק כמו שהיה יושב על גוף האווטר: כתפיים / מותן / מכפלת באותם גבהים, רוחב לפי הגוף באותה תנוחה.
לא לשנות את הבגד: צבע, דוגמה, בד, אורך, גזרה, שרוולים, צווארון, קפלים, קישוטים. בגב ובצד להראות איך הבגד נראה באמת מאחור ומהצד.
אותו קנה מידה בכל 5 החלקים: המותן (או הכתפיים) באותו גובה בדיוק בכל החלקים, והבגד ממלא את גובה החלק.
בלי טקסט, בלי כותרות, בלי קולבים, בלי צל על הרקע, בלי חפצים נוספים.`;
const NECK='בחזית ובחצי צד לא לראות את החלק הפנימי של הצווארון האחורי – רק את חזית הבגד, כמו שרואים כשהבגד על אישה.';
const T=[
 ['top','👚','חולצה',`רק החולצה. היא מתחילה בכתפיים ונגמרת באורך האמיתי שלה. שרוולים באורך האמיתי; בתנוחת יד על המותן השרוול מתכופף יחד עם היד. ${NECK}`],
 ['sweater','🧶','סוודר / קרדיגן',`רק הסוודר או הקרדיגן, עם מרקם הסריגה האמיתי. קרדיגן – פתוח או סגור בדיוק כמו בתמונה 2. שרוולים באורך האמיתי. ${NECK}`],
 ['skirt','🩱','חצאית',`רק החצאית. היא מתחילה במותן ותלויה טבעי כלפי מטה כמו על גוף עומד, לא פרושה לצדדים ולא מסתובבת. רוחב המכפלת לא יותר מפי 1.5 מרוחב המותן. האורך האמיתי (חצאית מקסי מגיעה עד הקרסול).`],
 ['dress','👗','שמלה',`רק השמלה, מהכתפיים ועד המכפלת. החצאית של השמלה תלויה טבעי כלפי מטה, לא פרושה לצדדים; רוחב המכפלת לא יותר מפי 1.5 מרוחב המותן; האורך האמיתי. שרוולים באורך האמיתי. ${NECK}`],
 ['set','🎽','סט (חולצה + חצאית)',`שני החלקים של הסט יחד, כמו שלובשים אותם: החולצה למעלה (בחוץ או בפנים כמו בתמונה 2) והחצאית מהמותן למטה, תלויה טבעי. ${NECK}`],
 ['coat','🧥','מעיל',`רק המעיל, סגור כמו בתמונה 2 (אם בתמונה הוא פתוח – פתוח, ובפנים רואים רקע אפור ולא בגדים). אורך המעיל האמיתי, שרוולים באורך האמיתי, כתפיים ברוחב הכתפיים של האווטר.`],
 ['jacket','🧥','ז׳קט / בלייזר',`רק הז׳קט, פתוח או סגור בדיוק כמו בתמונה 2 (אם פתוח – בפנים רק רקע אפור). אורך ושרוולים אמיתיים, כתפיים ברוחב הכתפיים של האווטר. ${NECK}`],
 ['vest','🦺','אפודה / וסט',`רק האפודה, בלי שרוולים: פתחי הזרועות ריקים (רקע אפור), בלי חולצה מתחת. פתוחה או סגורה כמו בתמונה 2, באורך האמיתי.`],
 ['belt','➰','חגורה',`רק החגורה, סגורה סביב המותן של הגוף הבלתי נראה, בגובה המותן של האווטר, עם האבזם במקום שלו (בחזית – באמצע). בצד ובגב רואים את החגורה מסביב. בלי מכנסיים, בלי שמלה.`,1],
 ['shoes','👠','נעליים',`רק זוג הנעליים, על כפות רגליים בלתי נראות, בגובה ובמקום של כפות הרגליים של האווטר בכל תנוחה (למטה בחלק). בלי רגליים, בלי גרביים.`,1],
 ['bag','👜','תיק',`רק התיק, תלוי מהכתף או מהיד כמו שמחזיקים אותו בתמונה 2, במקום שבו היד או הכתף של האווטר בכל תנוחה. בלי יד, בלי גוף.`,1],
];
const XTRA=[['jw','📿','תכשיטים – 3 חלקים',()=>typeof JWPROMPT!='undefined'?JWPROMPT:''],['jwn','📿','שרשרת – 5 זוויות',()=>typeof jwPromptFor=='function'?jwPromptFor('neck'):''],['jwe','💎','עגיל – 5 זוויות',()=>typeof jwPromptFor=='function'?jwPromptFor('ear'):''],['jwb','⌚','צמיד – 5 זוויות',()=>typeof jwPromptFor=='function'?jwPromptFor('brac'):''],
 ['tie5','🧕','כיסוי ראש – 5 קשירות',()=>typeof TIEPROMPT5!='undefined'?TIEPROMPT5:''],['tie4','🧕','כיסוי ראש – 4 זוויות',()=>typeof TIEPROMPT!='undefined'?TIEPROMPT:'']];
function promptOf(k,id){const g=T.find(x=>x[0]==k);let txt;
 if(g){const what=id&&D[id]?`הבגד: ${D[id].short||''}${D[id].color?` בצבע ${D[id].color}`:''}.\n`:'';txt=HEAD+'\n'+what+g[3]+'\n'+TAIL}else{const x=XTRA.find(x=>x[0]==k);txt=x?x[3]():''}
 return txt}
function typeOf(id){const c=curCat(id),s=slotOf(id),n=(D[id]&&D[id].short)||'';
 if(c=='sweaters')return 'sweater';if(c=='scarves')return 'tie5';if(c=='jewelry')return 'jw';if(c=='belts')return 'belt';if(c=='shoes')return 'shoes';if(c=='bags')return 'bag';
 if(s=='outer')return /אפוד|וסט|vest/i.test(n)?'vest':/מעיל|coat/i.test(n)?'coat':'jacket';return ['top','skirt','dress','set'].includes(s)?s:'top'}
const STEPS={g:'<ol><li>שמרי את <b>גיליון האווטאר</b> (כפתור למטה) ואת תמונת הבגד.</li><li>ב-GPT מצרפים את שתי התמונות ומדביקים את הפרומט.</li><li>את התמונה שיוצאת מעלים בחלון הבגד, ב"הבגד על האווטר ב-5 תנוחות".</li></ol>',
 x:'<ol><li>ב-GPT מצרפים רק את תמונת המוצר ומדביקים את הפרומט.</li><li>את התמונה שיוצאת מעלים בחלון של הפריט, במקום של תמונות האווטאר.</li></ol>'};
let CUR80='top',ID80='';
function openPr(k,id){CUR80=k||CUR80;ID80=id||'';let d=$('#pr80');if(!d){d=document.createElement('dialog');d.id='pr80';d.className='sheet9 pr80';d.dir='rtl';document.body.appendChild(d)}
 const g=T.find(x=>x[0]==CUR80);const all=[...T.map(x=>[x[0],x[1],x[2]]),...XTRA.map(x=>[x[0],x[1],x[2]])];
 d.innerHTML=`<div class="sh9h"><h3>📋 פרומטים ל-GPT</h3><button class="x" data-p80x aria-label="סגירה">✕</button></div><div class="p80b">
 <p class="p80h">בוחרים סוג בגד, מעתיקים, ומדביקים ב-GPT.</p>
 <div class="p80t">${all.map(([k,i,n])=>`<button data-p80="${k}" aria-pressed="${k==CUR80}"><span>${i}</span>${n}</button>`).join('')}</div>
 ${ID80&&D[ID80]?`<p class="p80i">לבגד: <b>${esc((D[ID80].short||'').slice(0,50))}</b></p>`:''}
 ${g&&g[4]?'<p class="p80w">שימי לב: לסוג הזה עוד אין באתר מקום להעלות 5 תנוחות. אפשר כבר להכין את התמונות, ואני מוסיפה את ההעלאה בשלב הבא.</p>':''}
 <textarea readonly rows="9" id="p80txt">${esc(promptOf(CUR80,ID80))}</textarea>
 <div class="p80a"><button class="go" data-p80c>📋 העתיקי את הפרומט</button>${g?'<button data-zoom="av/p5_sheet.jpg">🧍 גיליון האווטאר</button>':''}</div>
 ${g?STEPS.g:STEPS.x}</div>`;
 if(!d.open)d.showModal()}
window.openPrompts80=openPr;
function copy(txt){const ok=()=>toast('✓ הפרומט הועתק – הדביקי ב-GPT');(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(ok).catch(()=>{const ta=$('#p80txt');try{ta.removeAttribute('readonly');ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);const r=document.execCommand('copy');ta.setAttribute('readonly','');if(r)ok();else toast('סמני את הטקסט והעתיקי ידנית')}catch(_){toast('סמני את הטקסט והעתיקי ידנית')}})}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-p80],[data-p80c],[data-p80x],[data-pr80],[data-p80open]');if(!t)return;e.preventDefault();
 if(t.dataset.p80x!=null)return $('#pr80').close();
 if(t.dataset.p80c!=null)return copy($('#p80txt').value);
 if(t.dataset.pr80!=null){const id=t.dataset.pr80;return openPr(typeOf(id),id)}
 if(t.dataset.p80open!=null)return openPr();
 openPr(t.dataset.p80,ID80)});
// entry points: the "מה חסר" sheet (header button + a 📋 on every row), the "פרטים נוספים" sheet and the studio menu
function addBtns(){const m=$('#miss77');if(m&&m.open){const b=m.querySelector('.m77b');if(b&&!b.querySelector('.p80open'))b.insertAdjacentHTML('afterbegin','<button class="p80open go" data-p80open>📋 פרומטים ל-GPT לפי סוג בגד</button>');
  m.querySelectorAll('[data-m77up]').forEach(u=>{if(u.previousElementSibling&&u.previousElementSibling.dataset&&u.previousElementSibling.dataset.pr80)return;u.insertAdjacentHTML('beforebegin',`<button class="p80r" data-pr80="${u.dataset.m77up}" aria-label="פרומט לבגד הזה">📋</button>`)})}
 const e7=document.querySelector('#more9 .e77');if(e7&&!e7.querySelector('[data-p80open]'))e7.insertAdjacentHTML('beforeend','<button data-p80open>📋 פרומטים ל-GPT</button>');
 const sm=document.querySelector('#studio .smenu');if(sm&&!sm.querySelector('[data-p80open]'))sm.insertAdjacentHTML('beforeend','<button data-p80open>📋 פרומטים ל-GPT</button>')}
{const _om=window.openMiss77;if(_om)window.openMiss77=function(){const r=_om.apply(this,arguments);addBtns();return r}}
document.addEventListener('click',()=>setTimeout(addBtns,40));setTimeout(addBtns,1600);
})();
