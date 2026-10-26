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
// v206: + her Hebrew "how to tie it", and what makes this tie different from the others (Sara: the ties came out almost the same)
function tieW(n,det,how){return `מצורפת תמונה אחת: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ קשרי מטפחת בקשירה${q(n)}:
${det}${how?`
איך קושרים ואיך זה נראה: ${how}`:''}
(Bobo = כרית נפח מתחת למטפחת.)

הצורה של הקשירה הזאת היא העיקר, והיא שונה מכל קשירה אחרת: בדיוק הגובה והנפח שכתובים, הקשר בדיוק במקום שכתוב, בדיוק מספר השובלים שכתוב, באורך שכתוב, והם נופלים בדיוק לאן שכתוב (גב, כתף או חזה). אם כתוב שאין שובל – אין שום בד תלוי.
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
// v206 (Sara 26/10 13:33 "הפרומט ... נותן לי כמה כיסויים אותו דבר ... הנה פרומטים חדשים"): her 20 new detailed ties – [name, English details, how to tie it (her Hebrew)].
// Dropped from her text only what fights editing the doll sheet: "transparent background / isolated asset / jawline cut / 8k"; #12 "sheer" → light, soft;
// #13 "Dual-Pattern" → Dual-Tail (one colour); #14 "glossy … high silk sheen" (the library tie is matte so the site can paint it; a real satin scarf keeps its shine in exact()).
const TIES=[["שובל נשפך אחורי","Tying Style Details: Flowing Tail Wrap. A realistic headscarf (mitpachat) styled on a volumetric Bobo base. The fabric is smooth cotton-silk blend, wrapped tightly and flat across the forehead and temples. At the nape of the neck, the fabric is gathered into a sleek flat anchor, allowing one long, wide, single fabric tail to cascade vertically straight down the center of the back. Front and sides are perfectly smooth with zero bulk.","המטפחת עוטפת את הראש בצורה חלקה מעל בובו נמוך. כל עודף הבד נאסף במרכז העורף לקשר שטוח, וממנו יוצא שובל ארוך, רחב ונעים שנופל ישר במרכז הגב. החזית והצדדים מתוחים ונקיים לחלוטין."],["בובו קוקס נמוך ומהודק","Tying Style Details: Neat Low Bun. A structured headscarf tied over a low-profile round Bobo at the nape. The front band is completely smooth. At the back of the neck, the fabric is tightly twisted and wrapped into a compact, firm, perfectly spherical low bun. All fabric ends are fully tucked inside the bun structure. Zero loose tails or hanging fabric.","קשירה הדוקה וספורטיבית-אלגנטית. הבד מלופף מסביב לבובו נמוך, וכשמגיעים לעורף מסובבים את הבד שוב ושוב סביב עצמו לקוקס עגול, דחוס ומהודק. כל הקצוות מוכנסים פנימה – אין שום שובל משוחרר."],["טורבן גבוה","Tying Style Details: High Volume Turban. A dramatic high turban headscarf shape built over a tall crown Bobo base. The fabric creates overlapping diagonal criss-cross folds directly above the forehead, building up into a tall, volumetric top crown silhouette. The back is tightly tucked in, fully enclosing the head with no hanging fabric or tails whatsoever.","קשירת טורבן דרמטית על בובו גבוה בקודקוד. הבד נכרך בשכבות אלכסוניות החופפות זו את זו מעל המצח (מראה איקסים עדין), ועולה למעלה לנפח מרשים. כל הקצוות מלופפים סביב הבסיס ומוכנסים פנימה."],["פפיון צדדי אלגנטי","Tying Style Details: Elegant Side Bow. A fitted headscarf tied over a low Bobo with a side-focused feature. The fabric is smooth over the crown, gathering sharply to the lower left side at jaw level. It is tied into a large, crisp, double-loop fabric bow that holds its rigid shape. No long trailing ends.","המטפחת מתוחה על הראש, והבד נאסף הצידה אל מתחת לאוזן (בקו הלסת). שם נקשר פפיון בד גדול ומובנה עם לולאות פתוחות ויציבות. הקצוות קצרים מאוד ולא יורדים לכתפיים."],["קשירה נמוכה משולבת בשכבות","Tying Style Details: Layered Low Wrap. A woven-style low headscarf over a low Bobo base. The back section features multiple wide, flat, overlapping fabric bands running horizontally and diagonally, creating an intricate layered basket-weave pattern across the nape. Fully self-contained with all edges tucked underneath the bands. Zero hanging tails.","מראה ארוג ומתוחכם. בחלק האחורי של בובו נמוך, הבד מלופף ברצועות רוחביות ואלכסוניות שחופפות זו את זו כמו שתי וערב. אין שובל – כל הקצוות נבלעים מתחת לשכבות המצטלבות."],["קשר עורף עם שובל אחורי ישר","Tying Style Details: Low Knot with Straight Back Tail. A classic wrap over a low Bobo base. Smooth front fitting. At the nape of the neck, the fabric is tied into a relaxed, prominent central knot. Extending directly from the bottom of the knot is a single, broad, flat rectangular fabric tail hanging vertically down.","קשירה קלאסית ונינוחה. הבד מתוח מקדימה, ובעורף קושרים קשר מעט נפחי (כמו קשר עניבה רפוי). ממנו יוצא שובל יחיד, שטוח ורחב, שיורד ישר במרכז הגב."],["כתר גבוה עם שובל צדדי","Tying Style Details: High Crown with Single Side Tail. A high-volume asymmetric headscarf over a tall Bobo. The top of the head features layered, architectural fabric folds providing height. All excess fabric is swept to the right side, forming a long, wide, single flowing fabric drape that falls gracefully forward over one shoulder.","קשירה עם נפח עליון מרשים. הבד מלופף סביב בובו גבוה ויוצר קיפולים מדורגים בחלק העליון. כל יתרת הבד נמשכת הצידה ונופלת כשובל בודד וארוך מעל כתף אחת קדימה."],["קשר נמוך מסובב עם שובל קצר","Tying Style Details: Low Twisted Knot with Short Tail. A tightly wrapped headscarf on a low Bobo. The front and sides are smooth and flush. At the nape, the fabric ends are tightly twisted together into a thick rope-like spiral knot. Below the knot, a short, triangular fabric tail extends out just a few inches.","הבד מתוח היטב בצדדים. בעורף מסובבים יחד את שני קצוות הבד (כמו חבל) לקשר בולט ופתול, ובקצה שלו נשאר שובל קצרצר בצורת משולש קטן."],["קוקס מלופף ועשיר בטקסטורה","Tying Style Details: Massive Textured Coiled Bun. An ornate, heavy-volume headscarf tied on a mid-to-low Bobo. The back features a massive, sculptural, multi-layered coiled rosette bun with deep textured fabric folds. The bun dominates the back silhouette. Completely closed structure with no hanging tails.","קשירת אירועים מלאת נוכחות. על בובו נמוך-אמצעי מסובבים את הבד לשושנה ענקית או ספירלה עבה שתופסת את כל החלק האחורי. עשיר בקיפולים ובטקסטורה, בלי שום שובל."],["שובל חזיתי יחיד","Tying Style Details: Single Front Cascading Tail. An asymmetric wrap on a medium Bobo base. The head wrap is sleek and flat on three sides. A single wide, long fabric tail originates from the nape, drapes completely forward over the front shoulder, and cascades down the chest.","קשירה אסימטרית נקייה. הבד עוטף את הבובו בצורה חלקה, וקצה אחד ארוך במיוחד נלקח מהעורף, מובא קדימה מעל הכתף ונופל רחב וגלוי על החזה."],["קוקו נמוך הדוק עם שובל","Tying Style Details: Low Tied Ponytail Wrap. A streamlined ponytail-style headscarf over a flat Bobo base. The head section is pulled taut with high tension. At the nape, the fabric is gathered into a very tight, narrow band (like a ponytail holder), with one long, straight, narrow tail dropping vertically down.","המטפחת צמודה מאוד לראש. בעורף הבד נאסף ונקשר צפוף מאוד (כמו גומיית קוקו מתוחה), וממנו יוצא שובל בודד, ארוך וצר, שיורד ישר למטה."],["כתר גבוה עם פפיון קדמי","Tying Style Details: High Crown with Front Bow and Side Tail. A regal high turban style built on a tall crown Bobo. Positioned directly centered above the forehead is a large, wide, horizontal fabric bow. From the right edge of the bow, a light, soft fabric tail hangs down the side of the head. Rich architectural shape.","קשירת כתר חגיגית. הבד נבנה לגובה בחלק העליון, ובחזית (ממש מעל המצח) נקשר פפיון רחב ומובנה. מהצד של הפפיון יוצא שובל קל שנופל הצידה."],["קשירה צמודה עם שני שובלים אחוריים","Tying Style Details: Dual-Tail Close Wrap. A dual-tail close-fitting headscarf wrap over a low Bobo. The wrap sits snug against the scalp. At the nape, it is tied with a flat double-knot, producing two distinct parallel fabric tails hanging down the back, one slightly longer than the other.","קשירה צמודה על בובו קטן. הבד נקשר בעורף בקשר כפול, כך ששני קצוות הבד (השובלים) יורדים במקביל מאחור – אחד מעט ארוך מהשני."],["שובלים קדמיים סימטריים – סאטן","Tying Style Details: Symmetrical Front Tails. A smooth satin-style headscarf wrap tied tightly and smoothly around the head. Two wide, symmetrical, pointed triangular fabric tails are brought forward over both shoulders, laying completely flat against the chest. The crown is entirely smooth.","סגנון של מטפחת סאטן או משי. הבד עוטף את הראש חלק וצמוד, ושני הקצוות מובאים קדימה משני צידי הצוואר ונופלים סימטריים לגמרי, כשני משולשים רחבים על החזה."],["שושנת צד עם שובל","Tying Style Details: Rosette with Side Tail. A decorative headscarf with a prominent 3D sculpted fabric rosette (rose flower shape) positioned on the side above the ear. Directly underneath the rosette, a single elegant fabric tail drapes downwards over the shoulder. Smooth fitting across the top.","קשירה אמנותית. בצד הראש (מעל האוזן) מגלגלים שושנת בד בולטת בתלת-ממד. מתחת לשושנה יוצא שובל בודד ורך שנופל מעבר לכתף."],["כתר צמה","Tying Style Details: Braided Crown Turban. A braided turban style. The fabric is tightly twisted and woven into a thick, prominent 3D braided rope that wraps horizontally around the front and top of the head like a crown. Fully enclosed back with all ends tucked seamlessly into the braid. Zero loose tails.","הבד מסובב ונקלע לצמה עבה ומובנית שמלופפת סביב קו החזית של הראש כמו כתר. הקצוות משולבים בתוך הצמה, בלי שובלים בכלל."],["טורבן מסובב אסימטרי עם שובל","Tying Style Details: Asymmetric Twisted Turban with Tail. An asymmetric turban wrap featuring deep diagonal overlapping pleats across the front. A thick twisted knot feature is set near the top-front side. A single folded, structured fabric tail cascades down from the knot side over the shoulder.","טורבן מקפלים אלכסוניים שחופפים בחזית, עם קשר פתול ומסובב בצד העליון של המצח. מתוך הקשר יורד שובל מקופל ויוקרתי בצד אחד."],["טורבן שכבות קפלים","Tying Style Details: Layered Pleated Turban. A precision-pleated high turban. Wrapped tightly with multiple crisp, knife-edge horizontal and diagonal overlapping pleated layers crossing the forehead and building upward. Completely enclosed back, clean tailored finish, no hanging tails.","טורבן גבוה ומהודק משכבות של קפלים אופקיים ואלכסוניים, ישרים ומדויקים כמו מדרגות. סגור לגמרי מאחור, בלי קצוות."],["קשירת צד הדוקה עם שובל קצר","Tying Style Details: Side-Knotted Close Wrap. A close-fitting wrap with flat, diagonal front pleats gathering to a low side knot directly at the jawline. A single, short, crisp triangular tail hangs sharply down from the knot. Smooth top and back.","המטפחת צמודה מאוד לראש עם קפלים שטוחים. כל הבד נאסף לצד אחד נמוך (בקו הלסת) ונקשר שם בקשר קטן, וממנו יוצא שובל קצר וחד."],["קשירת כתר מוברשת חגיגית","Tying Style Details: Festive Crown-Wrap. A luxurious festive crown-wrap. The fabric is criss-crossed in wide overlapping bands across the front, creating a high, regal crown structure. Gathered softly at the nape into a relaxed knot, with a wide, wavy, fluid fabric tail brought forward over one shoulder.","קשירה מורכבת ויוקרתית. הבד מלופף בהצלבות רחבות בחזית למבנה של כתר גבוה, ומאחור נאסף לקשר רך שממנו נופל שובל גלי ועשיר קדימה, מעל כתף אחת."]];
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
