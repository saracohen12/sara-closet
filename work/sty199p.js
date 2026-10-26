// v199: the GPT prompts of the styles library (sty199.js) – hairstyles for her wig, ties for a head cover, makeup.
// Sara 26/10 09:24–09:25: "פאה אחת עם 30 סוגים שונים של תסרוקות ... 20-30 קשירות של כיסויים" · "פרומט טוב, שאני מעלה לו בעצם את הפנים שלי מקדימה,
// והוא צריך לתת לי 50 סוגים של איפורים ... בתמונת תקריב, ואז אחרי שאני אוהבת את האיפור, נעשה את זה בכל הכיוונים".
// Every prompt is one message (her rule). The 8-angle ones EDIT the doll sheet (a8/sheet.jpg), so the site can cut them like a garment.
(function(){
const KEEP=`הפנים לא משתנים בכלל: אותם פנים, אותה הבעה, אותו חיוך, אותו עור. הראש באותו גודל ובאותו מקום בדיוק בכל משבצת.

אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. השמלה בצבע עור נשארת.

החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`;
const q=n=>n?` "${n}"`:'';
// her own picture of the style first, then (hair) her wig for the colour, then the doll
function hair(n){return `מצורפות שלוש תמונות.
התמונה הראשונה: התסרוקת שאני רוצה.
התמונה השנייה: הפאה שלי. ממנה לוקחים את צבע השיער, הגוונים והמרקם.
התמונה השלישית: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השלישי, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ שימי שיער בתסרוקת${q(n)} מהתמונה הראשונה. בדיוק אותה תסרוקת: אותה חלוקה, אותו נפח, אותו אורך, אותם גלים, צמה או אסוף. צבע השיער כמו בפאה שלי. כיסוי הבז׳ נעלם לגמרי. השיער יושב על הראש בגודל טבעי, לא גבוה ולא רחב מדי. בצד ובגב צרי את התסרוקת כמו שהיא נראית באמת מהכיוון הזה, כולל מה שרואים רק מאחור (קוקו, שיניון, קליפס, צמה).

${KEEP}`}
function tie(n){return `מצורפות שתי תמונות.
התמונה הראשונה: הקשירה שאני רוצה למטפחת.
התמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השני, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ קשרי מטפחת בקשירה${q(n)} מהתמונה הראשונה. בדיוק אותה קשירה: אותו נפח ואותו גובה, אותו קשר, אותם קפלים ואותם שובלים. כיסוי הבז׳ נעלם לגמרי. בצד ובגב צרי את הקשירה כמו שהיא נראית באמת מהכיוון הזה, כולל הקשר והשובל מאחור.

המטפחת בצבע אחד: אפור בינוני, חלק ומט, בלי הדפס, בלי פסים ובלי ברק, גם אם בתמונה הראשונה היא צבעונית. את הצבע אני בוחרת אחר כך.

${KEEP}`}
// v200: a tie from her list (Sara 26/10 10:58, 20 styles with English "Tying Style Details") – no picture needed, only the doll
function tieW(n,det){return `מצורפת תמונה אחת: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ קשרי מטפחת בקשירה${q(n)}:
${det}

כיסוי הבז׳ נעלם לגמרי. אותה קשירה בדיוק בכל 8 הזוויות. בצד ובגב צרי את הקשר, הקפלים והשובלים כמו שהם נראים באמת מהכיוון הזה.

המטפחת בצבע אחד: אפור בינוני, חלק ומט, בלי הדפס, בלי פסים, בלי ברק ולא שקופה. את הצבע אני בוחרת אחר כך.

${KEEP}`}
// v202 (Sara 11:09 "פרומט מדוייק עם הקשירה שבחרתי + הכיסוי ... המטפחת המדוייקת שקניתי"): her real scarf (its shop photo) in the tie she picked
function exact(item,n,det){return `מצורפות ${det?'שתי':'שלוש'} תמונות.
התמונה הראשונה: המטפחת שקניתי – ${item}.
התמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.${det?'':`
התמונה השלישית: הקשירה שאני רוצה.`}

ערכי את הגיליון השני, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ קשרי את המטפחת מהתמונה הראשונה בקשירה${q(n)}${det?`:
${det}`:' מהתמונה השלישית: אותו נפח ואותו גובה, אותו קשר, אותם קפלים ואותם שובלים.'}

המטפחת בדיוק כמו בתמונה הראשונה: אותו בד, אותו הדפס, אותם צבעים, אותו ברק. ההדפס ממשיך גם בקפלים, בקשר ובשובל. אם בתמונה יש עוד דברים (בגדים, תכשיטים, דוגמנית), הם לא שלי.
כיסוי הבז׳ נעלם לגמרי. אותה קשירה בדיוק בכל 8 הזוויות. בצד ובגב צרי את הקשר, הקפלים והשובלים כמו שהם נראים באמת מהכיוון הזה.

${KEEP}`}
// her 20 tie styles (Sara 26/10 10:58, her own list; #12 'sheer' dropped and #13 'two patterns' → two greys, so the site can cut and paint them)
const TIES=[["שובל נשפך אחורי","Tying Style Details: Wrapped smoothly across the top and sides over a Bobo base. At the nape, all excess fabric is gathered and cascades down the back as a single, long, gracefully flowing tail. The front remains flat and neat."],["בובו קוקס נמוך ומהודק","Tying Style Details: Perfectly smooth on the front and sides over a low Bobo. At the nape, the fabric is tightly twisted and coiled repeatedly into a prominent, neat low round bun. All ends are tucked securely inside with zero loose tails."],["טורבן גבוה","Tying Style Details: Wrapped upwards over a high Bobo base to create significant height at the crown. The front features neat overlapping diagonal pleats along the upper hairline. The back is flat and tightly wrapped, with all ends hidden."],["פפיון צדדי אלגנטי","Tying Style Details: Snug fit around the entire head over a low Bobo. Positioned on one side at the lower jawline level, the fabric is tied into a large, structured bow with clearly defined loops. No long trailing ends."],["קשירה נמוכה משולבת בשכבות","Tying Style Details: Smooth front over a low Bobo base. At the lower back, the fabric is wrapped in wide, flat, overlapping horizontal and diagonal bands. All ends are securely tucked beneath the layers, leaving a clean woven look with no tails."],["קשר עורף עם שובל אחורי ישר","Tying Style Details: Tied over a low volumizing base (Bobo). Wrapped smoothly across the front. At the nape, it is gathered and twisted into a soft, textured knot, with remaining fabric falling straight down the center of the back as a wide, flat tail."],["כתר גבוה עם שובל צדדי","Tying Style Details: Tied over a high volumizing base (Bobo) creating prominent height at the crown. Overlapping textured folds across top, while all excess fabric is gathered to one side, falling over a single shoulder as a long flowing tail."],["קשר נמוך מסובב עם שובל קצר","Tying Style Details: Tied over a low volumizing base (Bobo) with front and sides tightly wrapped. At the lower back, tied into a prominent twisted knot, leaving a short, wide, triangular tail cascading gently down the back."],["קוקס מלופף ועשיר בטקסטורה","Tying Style Details: Tied over a large mid-to-low volumizing base (Bobo). Smooth front, while the back is wrapped repeatedly in thick, overlapping, coiled layers to create a massive, rosette-like structured bun with absolutely no long tails."],["שובל חזיתי יחיד","Tying Style Details: Tied over a high volumizing base (Bobo). Fabric wrapped asymmetrically, covering the head completely. All excess fabric gathered strictly to one side, falling forward over a single shoulder in a long wide tail. The opposite side and back are completely smooth."],["קוקו נמוך הדוק עם שובל","Tying Style Details: Tightly wrapped over a low volumizing base (Bobo). At the nape, gathered and tied tightly into a single compact knot resembling a hair tie, with a single long tail dropping straight down the back."],["כתר גבוה עם פפיון קדמי","Tying Style Details: Tied over a high volumizing base (Bobo) for significant height. Culminates in a large, structured horizontal bow placed directly above the forehead. A long tail cascades down from the side of the bow over the shoulder."],["קשירה צמודה עם שני שובלים אחוריים","Tying Style Details: Tied tightly over a very low volumizing base (Bobo). The front is one shade of grey and the back a darker shade of grey. Tied securely at the nape, leaving two distinct long tails cascading straight down the back and shoulders."],["שובלים קדמיים סימטריים","Tying Style Details: Smooth, sleek fabric wrapped tightly and neatly around the head. The ends are brought forward and drop down as two symmetrical, wide, pointed triangular tails resting flat over the front collarbones and shoulders. The top and sides are completely smooth."],["שושנת צד עם שובל","Tying Style Details: The fabric is wrapped to form a prominent, large 3D fabric rosette (flower shape) positioned elegantly on one side of the head. A single, gracefully draped tail falls directly from underneath the rosette over the shoulder."],["כתר צמה","Tying Style Details: Braided crown turban. The fabric is tightly twisted and woven into a thick, structured braid that wraps across the top and front of the head like a crown. All ends are completely tucked in securely with zero loose tails."],["טורבן מסובב אסימטרי עם שובל","Tying Style Details: Asymmetric turban style. The fabric is gathered into textured, overlapping diagonal folds, culminating in a prominent twisted knot detail near the top front-side. A single, elegant folded tail cascades down from the side over one shoulder."],["טורבן שכבות קפלים","Tying Style Details: Neat layered high turban. Wrapped tightly with multiple precise, smooth diagonal and horizontal overlapping pleated layers crossing the forehead and crown. Completely enclosed and tucked at the back with absolutely no hanging tails."],["קשירת צד הדוקה עם שובל קצר","Tying Style Details: Side-knotted close wrap. The fabric fits closely to the head with neat overlapping flat folds at the front, gathered to one lower side at the jawline and tied into a tidy knot. A single, short, pointed tail hangs crisply over the shoulder."],["קשירת כתר מוברשת חגיגית","Tying Style Details: Wrapped tightly with wide criss-cross overlaps at the front to create a high crown-like structure. At the nape, the fabric is gathered into a soft knot, with a long, wavy tail brought forward draping elegantly over one shoulder."]];
// makeup step 1: her front close-up → a numbered grid of looks, one category per message (50 in all)
const MKC=[
 ['day','יום-יום וחול',[
  'טבעי לגמרי: בלי איפור, עור נקי ורענן, גבות טבעיות',
  'יומיומי עדין: בסיס שקוף, קצת מסקרה, גבות מסודרות, שפתיים ניוד',
  'ניוד רך: צללית בז׳-ניוד מט, אייליינר חום דק, שפתיים ניוד-ורוד',
  'ורוד רענן: סומק ורוד, צללית ורודה בהירה, גלוס ורוד',
  'אפרסק: צללית, סומק ושפתיים בגוון אפרסק',
  'חום חם: צללית חומה חמה, אייליינר חום, שפתיים טרקוטה',
  'זוהר טבעי: עור זוהר, היילייטר עדין, שפתון בצבע השפתיים',
  'חמש דקות: קונסילר, מסקרה ובאלם שפתיים בגוון ורוד',
  'מוקה רך: צללית מוקה, שפתיים מוקה-ורוד']],
 ['work','עבודה',[
  'מקצועי ונקי: עור אחיד, צללית טאופ, מסקרה, שפתון ורוד עתיק מט',
  'אייליינר דק ומוקפד, ריסים מסודרים, שפתיים ניוד',
  'ברונזה רכה: ברונזר עדין, היילייטר קל, שפתיים אפרסק-ניוד',
  'גבות מודגשות, צללית חומה, שפתון רוז',
  'מט אלגנטי: בסיס מט, צללית בז׳, שפתון קרמל',
  'פגישה חשובה: אייליינר חום, ריסים מודגשים, שפתון ורוד-פטל עדין']],
 ['sport','ספורט',[
  'בלי כלום: עור רענן עם קרם לחות וזוהר טבעי',
  'עמיד: מסקרה עמידה למים ובאלם שפתיים',
  'טינט קל לעור וסומק קרם',
  'גבות בג׳ל שקוף ושמן שפתיים']],
 ['shab','שבת',[
  'שבת אלגנטית: גבות מוגדרות, צללית חומה רכה, מסקרה, שפתון ורוד עתיק',
  'שבת זוהרת: צללית שמפניה מנצנצת, ריסים, שפתון ורוד',
  'קלאסי: אייליינר שחור דק, ריסים, שפתון אדום-ורוד',
  'רך ושקט: בסיס זוהר, צללית ורודה-חומה, שפתיים ניוד-ורוד',
  'ארד: צללית ברונזה, היילייטר, שפתיים קרמל',
  'סגול עדין: צללית לילך ושזיף, שפתון מוב',
  'מוקה מט: עיניים ושפתיים בגוון מוקה',
  'שבת חורפית: צללית בורדו רכה, שפתון יין בהיר']],
 ['hag','חג',[
  'זהב מנצנץ: צללית זהב, מסקרה, שפתיים ניוד',
  'פטל חגיגי: שפתון פטל עמוק, עיניים רכות',
  'גלאם רך: עפעפיים מנצנצים, ריסים מלאים, קונטור עדין, שפתיים ורוד-ניוד',
  'אדום קלאסי: שפתון אדום, אייליינר דק, עור מט',
  'ירוק זית: אייליינר ירוק זית וצללית רכה, שפתיים ניוד חם',
  'כחול עשן: אייליינר וצללית בכחול כהה, שפתיים ניוד',
  'ורוד זוהר: צללית ורוד-זהב, סומק ורוד, גלוס']],
 ['event','אירועים',[
  'סמוקי ערב: עיניים מעושנות חום-שחור, שפתיים ניוד',
  'אייליינר חתולי: אייליינר שחור חד, ריסים, שפתיים ניוד',
  'אירוע ערב מלא: קונטור, ריסים דרמטיים, עיניים מודגשות, שפתון יין',
  'שפתון אדום קלאסי עם עור מט ועיניים נקיות',
  'זהב-ברונזה: עיניים זהב וברונזה, שפתון קרמל',
  'שמפניה: עיניים שמפניה מנצנצות, ריסים מלאים, שפתיים ורוד-ניוד',
  'סמוקי כחול כהה, שפתיים ניוד-ורוד',
  'בורדו: צללית בורדו, שפתון בורדו מט']],
 ['wed','חתונות',[
  'כלה רכה: עור זוהר, עיניים ורוד-שמפניה, ריסים, שפתיים ורודות',
  'כלה קלאסית: אייליינר עדין, ריסים מלאים, שפתון ורוד עתיק',
  'אורחת אלגנטית: צללית חומה מעושנת, שפתיים ניוד-ורוד',
  'גלאם מלא לחתונת ערב: קונטור, ריסים, שפתון ורוד-פטל',
  'חינה: עיניים זהב-חום עמוקות, אייליינר, שפתון אדום-חום',
  'שבע ברכות: רך וזוהר, שפתון אפרסק',
  'חתונת קיץ: ברונזה זוהרת, שפתיים אפרסק-קורל',
  'חתונת חורף: עיניים שזיף, שפתון יין']]];
const GRID={9:[3,3],8:[2,4],7:[2,4],6:[2,3],4:[2,2]};
function look(c){const [k,t,L]=MKC.find(x=>x[0]==c)||MKC[0];const [r,co]=GRID[L.length]||[3,3];const cells=r*co;
 return `מצורפת תמונה שלי: הפנים שלי מקדימה, בתקריב.

צרי תמונה אחת: רשת של ${r} שורות ו-${co} משבצות בכל שורה. בכל משבצת אותו תקריב בדיוק של הפנים שלי (מהראש עד הכתפיים, מבט ישר למצלמה, אור יום רך), ובכל משבצת איפור אחר מהרשימה למטה, לפי הסדר: בשורה הראשונה משמאל לימין 1, 2, 3, ואחר כך השורה הבאה. בפינה של כל משבצת מספר קטן, רק הספרה.${cells>L.length?` המשבצת האחרונה נשארת ריקה, בצבע בהיר.`:''}

הפנים לא משתנים בכלל: אותם תווי פנים, אותן עיניים, אותו אף, אותן שפתיים, אותו עור (בלי החלקה ובלי פילטר), אותה הבעה ואותו חיוך. כיסוי הראש או השיער ומה שאני לובשת נשארים בדיוק כמו בתמונה. משנים רק את האיפור.

האיפור נראה אמיתי, כמו של מאפרת מקצועית: מרקם עור אמיתי, צבעים מדויקים, מוקפד ולא מוגזם (חוץ ממה שכתוב שהוא דרמטי).

${t}, ${L.length} איפורים:
${L.map((x,i)=>`${i+1}. ${x}`).join('\n')}`}
// makeup step 2: the look she loved → on the doll in all 8 angles
function face(num){const n=+num>0?+num:0;return `מצורפות שתי תמונות.
התמונה הראשונה: האיפור שבחרתי${n?`, במשבצת מספר ${n}`:''}.
התמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השני, אל תציירי אותו מחדש. שני דבר אחד בלבד: שימי על הפנים של הדמות את האיפור מהתמונה הראשונה${n?` (משבצת ${n})`:''}, באותם צבעים ובאותה עוצמה: צללית, אייליינר, ריסים, גבות, סומק, קונטור ושפתון. בזוויות מהצד רואים רק את הצד של הפנים. בזוויות מהגב לא רואים פנים, ושם לא משנים כלום.

הפנים עצמם לא משתנים: אותו מבנה, אותה הבעה, אותו חיוך, אותו עור, אותו גודל ואותו מקום בדיוק בכל משבצת.

אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. כיסוי הראש הבז׳ והשמלה בצבע עור נשארים בדיוק אותו דבר.

החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`}
// v204 (Sara 11:38 "וככה תעשה לי גם באיפור וגם בתסרוקת"): hairstyles for her wig, like her 20 ties – a card each in the library.
// v205 (Sara 26/10 12:27 "תכניס את הפרומט לתסרוקות 30 סה״כ"): HER 30 – the 20 from her hairstyle pictures (in her order) + 10 new, English details as she gave them.
// Only the wig (for the colour) and the doll are attached, no picture of the hairstyle is needed.
const HAIRS=[
 ["שביל צד קלאסי", "Hairstyle Details: Classic side-parted hairstyle with soft cascading waves. On one side, the hair flows gracefully over the shoulder and chest. On the other side, the hair is tucked neatly behind the ear (ear visible), and then drapes forward over the shoulder."],
 ["מדורג נפחי", "Hairstyle Details: Voluminous layered cut with natural movement. Soft, bouncy layers frame the face and cascade down over both shoulders and chest with full body and texture."],
 ["צמה צדדית רכה", "Hairstyle Details: Soft, loose side braid gathered over one shoulder. Clean hairline with a relaxed, elegant weave falling gently down the chest."],
 ["גלים פתוחים מוקפדים", "Hairstyle Details: Polished business-ready wide blowout waves. Perfectly styled, symmetrical soft waves falling over both shoulders and chest with a glossy, neat finish."],
 ["פזור גלי נפחי", "Hairstyle Details: Full-bodied, high-volume loose waves. Rich, luxurious hair texture flowing abundantly over both shoulders and chest."],
 ["קארה גלי קצר", "Hairstyle Details: Chin-length short bob cut with soft, modern waves. A neat, voluminous short hairstyle framing the jawline cleanly."],
 ["חלק מבריק וארוך", "Hairstyle Details: Ultra-sleek, long, silky straight hair. Perfectly straight, polished, and shiny hair parted down the middle, falling straight over both shoulders and chest."],
 ["קוקו גבוה אופנתי", "Hairstyle Details: High, voluminous ponytail set on top of the head. Smooth, pulled-back front with a full ponytail cascading down, complemented by soft wispy tendrils delicately framing the face."],
 ["קארה גלי בינוני", "Hairstyle Details: Shoulder-length medium bob with soft, relaxed waves. Gentle curves around the shoulders framing the face neatly."],
 ["חצי אסוף גבוה / חצי קוקו", "Hairstyle Details: Half-up high ponytail style. The top half of the hair is gathered into a neat small high ponytail on the crown, while the remaining long hair flows in soft waves over the shoulders."],
 ["אסוף קליפס קז׳ואל", "Hairstyle Details: Hair gathered at the back with a neutral claw clip in an effortless bun, leaving soft, delicate face-framing tendrils falling naturally around the face."],
 ["חצי אסוף יומיומי עם קליפס", "Hairstyle Details: Relaxed half-up style held at the back of the head with a simple claw clip, allowing smooth, long waves to drape down over the shoulders and chest."],
 ["שביל באמצע טבעי", "Hairstyle Details: Natural center part with effortless, relaxed loose waves. Hair drapes evenly on both sides over the shoulders and chest in a soft, understated look."],
 ["שביל צד עמוק גלי", "Hairstyle Details: Deep side-part with dramatic, glamorous big waves swept entirely over one shoulder, while the opposite side is smooth and tucked neatly behind the ear."],
 ["תלתלים מובנים יוקרתיים", "Hairstyle Details: Luxurious, defined, glossy curls with rich volume. Perfectly sculpted shiny spiral curls cascading elegantly over both shoulders and chest."],
 ["גלים הוליוודיים קלאסיים", "Hairstyle Details: Classic Hollywood glam waves. Ultra-polished, vintage-inspired uniform luxury waves with a high-shine glossy finish flowing smoothly down."],
 ["שיניון נמוך אצילי", "Hairstyle Details: Noble, sleek low chignon bun tied neatly at the nape of the neck. Clean, polished hairline, fully pulled-back, elegant, and sophisticated updo."],
 ["אסוף אירועים גבוה", "Hairstyle Details: Intricate formal high updo for special events. Sculpted voluminous bun on top, with delicate, soft curled tendrils hanging gracefully around the sides of the face."],
 ["גלים עשירים עם סיכת פנינה", "Hairstyle Details: Rich, open glamour waves styled with a delicate pearl hairpin accent placed gracefully on one side above the ear, hair flowing over both shoulders."],
 ["ערב אלגנטי אסוף", "Hairstyle Details: Structured, elegant high evening updo. Smoothly gathered hair built into a polished, regal crown bun with a clean, sophisticated silhouette."],
 ["קוקס אלגנטי לאירוע", "Hairstyle Details: Structured high event bun on top of the head. Ultra-smooth, slicked-back hairline, perfectly coiled round bun with a sophisticated, polished finish."],
 ["קוקס נמוך עם קליפס", "Hairstyle Details: Neat low bun at the nape of the neck held securely by a simple elegant claw clip. Clean pulled-back sides with a smooth, refined profile."],
 ["חצי קוקו מוברש", "Hairstyle Details: Sleek half-up ponytail. The upper section is pulled tight into a neat high pony at the crown, while the lower section cascades straight and smooth over the shoulders."],
 ["קוקו גבוה מוברש", "Hairstyle Details: High, slicked-back ponytail. Fully brushed back with high shine, hair gathered tight at the top with a smooth ponytail hanging straight down."],
 ["צמה מסודרת ומהודקת", "Hairstyle Details: Neat, tightly woven classic braid starting from the nape and falling over one shoulder. Clean hairline, perfectly smooth and polished finish with no stray hairs."],
 ["שיער חלק סליק", "Hairstyle Details: Ultra-sleek, pin-straight hair parted neatly in the middle, falling smooth and flat over both shoulders and chest with zero volume."],
 ["שיער מעט גלי ועדין, לא נפוח", "Hairstyle Details: Gentle, subtle soft waves with very low volume. Hair lays close to the shoulders and chest in clean, faint waves without puffiness."],
 ["שיניון נמוך מסודר עם שביל באמצע", "Hairstyle Details: Crisp center part with hair slicked back into a tight low chignon bun at the nape of the neck. Elegant, symmetrical, and sharp business aesthetic."],
 ["חצי אסוף מתוח לאחור", "Hairstyle Details: Sleek half-up style with top layers pulled tautly back from the face, while smooth straight-to-subtle waves drape neatly over the back and shoulders."],
 ["קוקו נמוך עטוף בשיער", "Hairstyle Details: Low, smooth ponytail at the nape of the neck with a strand of hair wrapped seamlessly around the base to hide the hair tie. Extremely neat and professional."]];
function hairW(n,det){return `מצורפות שתי תמונות.
התמונה הראשונה: הפאה שלי. ממנה לוקחים את צבע השיער, הגוונים, האורך והמרקם.
התמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השני, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ שימי שיער מהפאה שלי בתסרוקת${q(n)}:
${det}

צבע השיער כמו בפאה שלי. כיסוי הבז׳ נעלם לגמרי. אותה תסרוקת בדיוק בכל 8 הזוויות. בצד ובגב צרי את השיער כמו שהוא נראה באמת מהכיוון הזה.

${KEEP}`}
// v205 (Sara 26/10 12:40 "רשמת לו שאני מעלה לו איפור של תמונה? אין לי, אני רוצה שיצור. אני יכולה רק להעלות את התמונה שלי"):
// a look from the list straight onto the doll – only the doll is attached, GPT creates the makeup from the words (like the ties)
function faceW(n,det){return `מצורפת תמונה אחת: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון, אל תציירי אותו מחדש. שני דבר אחד בלבד: צרי על הפנים של הדמות איפור${q(n)}${det?`: ${det}`:''}.
האיפור נראה אמיתי, כמו של מאפרת מקצועית: מרקם עור אמיתי, צבעים מדויקים, מוקפד ולא מוגזם (חוץ ממה שכתוב שהוא דרמטי). אותו איפור בדיוק בכל הזוויות. בזוויות מהצד רואים רק את הצד של הפנים. בזוויות מהגב לא רואים פנים, ושם לא משנים כלום.

הפנים עצמם לא משתנים: אותו מבנה, אותה הבעה, אותו חיוך, אותו עור, אותו גודל ואותו מקום בדיוק בכל משבצת.

אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. כיסוי הראש הבז׳ והשמלה בצבע עור נשארים בדיוק אותו דבר.

החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`}
const P={hair,hairW,HAIRS,tie,tieW,exact,TIES,look,face,faceW,MKC,GRID};
if(typeof window!='undefined')window.STYP=P;
if(typeof module!='undefined')module.exports=P;
})();
