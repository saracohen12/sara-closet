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
התמונה הראשונה: התסרוקת שאני רוצה. ממנה לוקחים רק את התסרוקת (הצורה), לא את הפנים ולא את צבע השיער.
${WIG.replace('התמונה הראשונה','התמונה השנייה')}
התמונה השלישית: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השלישי, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ שימי את השיער מהפאה שלי, מסורק בתסרוקת${q(n)} מהתמונה הראשונה. בדיוק אותה תסרוקת: אותו שביל, אותו נפח, אותו אורך, אותם גלים, צמה או אסוף.

${HAIRKEEP.replace('חוץ מתסרוקת שכתוב בה אורך אחר – אז בדיוק האורך שכתוב','חוץ מתסרוקת שבתמונה הראשונה קצרה יותר – אז באותו אורך כמו שם')}
אותה תסרוקת בדיוק בכל 8 הזוויות, כולל מה שרואים רק מאחור.

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
// v207 (Sara 26/10 13:53 "הנה הפרומט לתסרוקות, תסדר את זה במקום מה שעשית, אלו תסרוקות שיותר יתאימו לי"): HER new 30, made for her own wig,
// in her 3 groups (HAIRG). [name, English (her Full Prompt minus the photo words: 8k / studio light / isolated asset / front view), her Hebrew, what must show in every view]
const HAIRG=[[0,'יום-יום, עסקים ופגישות'],[10,'שבתות, חגים ואירועים'],[20,'ספורטיבי, קליל ואסוף נקי']];
const HAIRS=[["שביל צד קלאסי מוברש","Hairstyle Details: Classic Brushed Side Part. A polished side-parted hairstyle on a long dark-brown wig with subtle highlights. One side is neatly tucked behind the ear, while the other side flows gracefully over the shoulder in soft, elegant waves. Mature, sophisticated business look, natural volume.","שביל צד ימין או שמאל. צד אחד מסורק בצורה נקייה מאחורי האוזן, והצד השני גולש בגלים רכים וטבעיים על הכתף. מראה עסקי, נקי וסמכותי.","שביל בצד. ארוך כמו הפאה, פזור, נפח טבעי. צד אחד תחוב מאחורי האוזן (האוזן גלויה); הצד השני גולש קדימה על הכתף בגלים רכים. מאחור: שיער פזור על הגב."],
["פזור מדורג נפחי","Hairstyle Details: Voluminous Layered Blowout. Long layered brunette wig styled with a professional blowout. Soft outward movement at the ends framing the chest, full natural volume at the crown, center-side part. Regal and neat appearance for a professional woman.","הפאה פזורה לגמרי. פן מוברש כלפי חוץ שמבליט את המדרגים בקצוות מעל החזה והכתפיים. נפח טבעי בקודקוד.","שביל קרוב לאמצע. ארוך, פזור, פן מוברש, נפח בקודקוד. הקצוות המדורגים מתעגלים החוצה מעל החזה והכתפיים. מאחור: שכבות מדורגות שמתעגלות החוצה."],
["חלק סליק מוקפד","Hairstyle Details: Sleek Straight & Polished. Ultra-sleek, long straight dark hair with golden-brown highlights. Smooth finish laying flat over both shoulders with clean middle-side parting. Elegant, polished, mature aesthetic.","השיער מוחלק בעדינות, בלי נפח מוגזם, וגולש ישר משני צידי הפנים אל מעבר לכתפיים. מראה נקי, אלגנטי ומכובד.","שביל קרוב לאמצע. ארוך, חלק לגמרי ושטוח, נפח נמוך. מקדימה: יורד ישר משני הצדדים על הכתפיים והחזה. מאחור: חלק וישר על הגב."],
["קוקו נמוך עטוף בשיער","Hairstyle Details: Hair-Wrapped Low Ponytail. A sleek low ponytail gathered tightly at the nape of the neck. A strand of hair is wrapped around the hair tie base for a clean, seamless finish. Smooth sides, professional and practical for daily business.","השיער נאסף הדוק ונמוך בקו העורף. קווצת שיער מהפאה עוטפת את הגומייה, כך שלא רואים אותה. מראה נקי, נוח ויומיומי-יוקרתי.","כל השיער מתוח חלק לאחור לקוקו נמוך בעורף, וקווצת שיער עוטפת את הגומייה. מקדימה: אין שיער על הכתפיים. מהצד ומאחור: הקוקו יורד חלק על הגב."],
["חצי-אסוף קלאסי עם קליפס יוקרתי","Hairstyle Details: Classic Half-Up Claw Clip. A half-up hairstyle where the upper front sections are pulled neatly back and secured at the back of the head with an elegant clip. The remaining long layers drape naturally over the shoulders in soft waves. Professional, refined.","קבוצות השיער הקדמיות נלקחות לאחור ונאספות בחצי הגובה עם קליפס ניטרלי או מתכתי. שאר השיער גולש בגלים רכים מאחור ועל הכתפיים.","החלק העליון-קדמי נמשך לאחור ונאסף באמצע אחורי הראש בקליפס אלגנטי. השאר פזור, ארוך וגלי, על הכתפיים ועל הגב. מאחור: רואים את הקליפס ומתחתיו שיער פזור."],
["צמה צדדית רכה ומסודרת","Hairstyle Details: Neat Side Braid. Long brunette hair styled into a neat, loosely woven side braid resting over one shoulder. Clean hairline with no stray hairs, effortless yet polished look for daily wear.","כל השיער מוטה לצד אחד ונקלע לצמה קלאסית רפויה אבל מסודרת, שמסתיימת בגומייה סמויה. מראה נוח ויומיומי.","כל השיער נאסף לצמה אחת רפויה ומסודרת בצד אחד, והצמה מונחת קדימה על כתף אחת ויורדת על החזה. מאחור: אין שיער פזור – השיער נמשך לצד אחד."],
["גלים רכים וטבעיים בלבד","Hairstyle Details: Subtle Soft Waves - Low Volume. Long dark brown hair with very subtle, soft wave texture at the ends. Low volume, laying close to the shoulders and chest for a modest, natural, everyday look.","גלים קלילים מאוד, בלי נפח מוגזם בצדדים. השיער יורד ישר יחסית ומתעגל רק בקצוות.","ארוך, פזור, כמעט חלק – רק הקצוות מתעגלים בגל עדין. נפח נמוך, צמוד לכתפיים ולחזה. מאחור: ישר עם קצוות מעוגלים."],
["אסוף קליפס נמוך ומהודק","Hairstyle Details: Low Clip Updo. All hair gathered smoothly to the nape of the neck and twisted into a low, neat updo held by a plain dark claw clip. Fully pulled-back hairline, tidy and refined.","השיער מגולגל בעורף ונאסף כולו בקליפס נמוך ומסודר. שום קווצה לא משוחררת מקדימה.","כל השיער מתוח חלק לאחור, מגולגל בעורף ומוחזק בקליפס כהה פשוט. בלי שום קווצה ליד הפנים, אין שיער על הכתפיים. מאחור: רואים את הגלגול והקליפס נמוך בעורף."],
["חצי-אסוף מתוח ללא גומייה","Hairstyle Details: Sleek Pulled-Back Half Up. Sleek half-up style with top layers pulled tautly back from the face, while smooth straight-to-subtle waves drape neatly over the back and shoulders, clean professional look.","החלק העליון מתוח לאחור חלק ומשתלב בשיער החלק מאחור, בלי סיכה בולטת.","השכבות העליונות מתוחות חלק לאחור מהפנים ומוצמדות מאחור בלי גומייה או סיכה שרואים. השאר חלק עד מעט גלי, על הגב והכתפיים. הפנים פתוחות."],
["שביל באמצע טבעי ומוברש","Hairstyle Details: Natural Center Part. Natural center part with long glossy brown hair draping evenly on both sides over the shoulders. Soft natural curve framing the face, understated elegance.","שביל באמצע מדויק. השיער מסורק, מתעגל בעדינות סביב הפנים וגולש שווה משני הצדדים.","שביל באמצע, ישר. ארוך, פזור, מבריק, נפח בינוני. מקדימה: קימור רך סביב הפנים, והשיער יורד שווה משני הצדדים על הכתפיים. מאחור: חלק על הגב."],
["שיניון נמוך אצילי","Hairstyle Details: Sleek Low Chignon. Elegant low chignon bun tied neatly at the nape of the neck. Clean, polished hairline, fully pulled-back, sophisticated formal updo for special occasions.","תסרוקת אסופה נמוכה מאוד בעורף, בצורת קשר מעוצב ומהודק. קווים חלקים ומתוחים, מראה מלכותי לשבת ולאירוע.","כל השיער מתוח חלק לאחור לשיניון נמוך מאוד ומהודק בעורף. אין שום שיער פזור. מהצד ומאחור: השיניון יושב נמוך בעורף."],
["גלים הוליוודיים מוקפדים","Hairstyle Details: Hollywood Glam Waves. Vintage Hollywood glam waves on long brunette hair. Highly polished, uniform glossy wave pattern swept gracefully over one shoulder. High-end festive look.","גלים אחידים, עמוקים ומבריקים במיוחד בסגנון וינטג׳. כל השיער מופנה לצד אחד, מעל הכתף.","שביל צד. גלים הוליוודיים גדולים ואחידים, מבריקים ומסודרים. כל השיער מופנה לצד אחד ונופל קדימה על כתף אחת; הצד השני חלק. מאחור: השיער נמשך לצד אחד."],
["תלתלים מובנים ועשירים","Hairstyle Details: Sculpted Defined Curls. Luxurious, defined, glossy curls with rich volume on the lower half of long dark hair. Perfectly sculpted spiral curls cascading over shoulders, high evening style.","תלתלים רחבים ומלאים בחלק התחתון של הפאה. נפח עשיר ויוקרתי לאירוע חגיגי.","ארוך, פזור. החלק העליון חלק, ובחצי התחתון תלתלים ספירליים גדולים ומוגדרים (תלתלים, לא גלים), נפח גבוה למטה. על שתי הכתפיים ועל הגב."],
["שביל צד עמוק חגיגי","Hairstyle Details: Deep Side-Part Glamour. Deep side-part hairstyle with high roots volume at the top. Soft luxurious waves swept heavily to one side, tucked neatly on the shallow side.","שביל צד נמוך ועמוק. השיער מורם קלות בשורש לנפח חגיגי, ונופל בגלים רחבים בצד הנגדי.","שביל צד עמוק מאוד, נפח בשורשים למעלה. רוב השיער נופל בגלים רחבים לצד אחד, קדימה על הכתף; הצד השני תחוב מסודר מאחורי האוזן. אסימטרי."],
["גלים פתוחים עם סיכה דיסקרטית","Hairstyle Details: Open Waves with Subtle Hairpin. Rich glamour waves with one side secured neatly behind the ear using a small, subtle pearl hairpin. The rest of the hair flows freely over the shoulders.","פזור גלי עשיר. בצד אחד השיער מוצמד מעט מאחורי האוזן בסיכת פנינה או מתכת עדינה.","ארוך, פזור, גלים עשירים. בצד אחד השיער מוצמד מאחורי האוזן בסיכת פנינה קטנה (רואים אותה). השאר נופל על שתי הכתפיים. מאחור: גלים על הגב."],
["קוקס גבוה מעוצב לאירוע","Hairstyle Details: Structured High Event Bun. Structured high event bun positioned on the crown of the head. Slicked-back smooth hairline, perfectly coiled round bun, formal and commanding silhouette.","כל השיער אסוף לקוקס מובנה וגבוה בקודקוד. גימור חלק ומהודק מסביב, בלי קווצות.","כל השיער מתוח חלק לקוקס עגול, מלופף ומובנה בדיוק על קודקוד הראש. בלי קווצות. מהצד ומאחור: הקוקס גבוה למעלה."],
["קוקס נמוך מפותל","Hairstyle Details: Twisted Low Rosette Bun. Intricately twisted low rosette bun situated flat at the nape of the neck. Polished finish, structured weaving, regal festive updo.","השיער מחולק לשתי קבוצות בעורף, כל אחת מפותלת סביב עצמה, ומוצמד בצורת שושנה נמוכה ושטוחה.","כל השיער מתוח לאחור. בעורף: שתי קבוצות שיער מפותלות שיוצרות שושנה שטוחה ונמוכה (לא כדור). אין שיער פזור. מאחור: רואים את הפיתולים בצורת שושנה."],
["חצי-אסוף נפחי חגיגי","Hairstyle Details: Volumetric Festive Half-Up. Half-up hairstyle featuring a slight bump of volume at the crown. Top layers secured smoothly at the back, bottom layers flowing in deep, glossy waves.","החלק העליון מורם מעט (סירוק אחורי קל לנפח) ונאסף מאחור, והחלק התחתון מעוצב בגלים עמוקים.","בקודקוד: נפח מורם קטן. השכבות העליונות נאספות חלק מאחור. החלק התחתון פזור, ארוך, בגלים עמוקים ומבריקים על הכתפיים והגב."],
["קוקו נמוך מעוצב עם גלים","Hairstyle Details: Wavy Low Ponytail with Wrap. Low ponytail at the nape where the cascading tail features rich, glamorous waves. Hair-wrapped base hiding the elastic, slicked-back top.","קוקו נמוך בעורף, אבל השיער שיוצא ממנו מעוצב בגלי ערב עשירים, וקווצת שיער עוטפת את הגומייה.","החלק העליון מתוח חלק לאחור. קוקו נמוך בעורף, וקווצת שיער עוטפת את הגומייה. הקוקו עצמו בגלים גדולים ועשירים (לא חלק) ויורד על הגב. אין שיער על הכתפיים."],
["שיניון צדדי נמוך","Hairstyle Details: Asymmetric Low Side Bun. Asymmetric low chignon bun set beneath one ear. Smooth, slicked-back front, structured gathered bun, highly sophisticated evening look.","קוקס אסוף ונמוך, קצת בצד, מתחת לאחת האוזניים. מראה מתוחכם ולא שגרתי לאירוע.","כל השיער מתוח חלק לאחור ולצד אחד, לשיניון נמוך מתחת לאוזן אחת (לא באמצע). מקדימה: רואים את השיניון בצד. מאחור: השיניון בצד, לא במרכז."],
["קוקו גבוה מוברש ומהודק","Hairstyle Details: Sleek High Ponytail. High ponytail with ultra-smooth, slicked-back hairline. Hair gathered tightly at the crown with the ponytail falling straight down the back, clean dynamic style.","מתוח לאחור חלק לקוקו גבוה. השיער גולש ישר מאחור. מראה דינמי, ספורטיבי ונקי.","כל השיער מתוח חלק לקוקו גבוה על הקודקוד. הקוקו חלק וישר ויורד ישר על הגב. בלי קווצות ליד הפנים, אין שיער על הכתפיים."],
["קוקו גבוה גלי","Hairstyle Details: Wavy High Ponytail. High ponytail with smooth front and bouncy, wavy texture in the ponytail section. Sporty yet feminine and neat.","קוקו גבוה, מתוח מקדימה, והשיער בקוקו עם תנועה גלית טבעית וקלילה.","כל השיער מתוח חלק לקוקו גבוה על הקודקוד. הקוקו עצמו בגלים קופצניים (לא חלק) ויורד על הגב. אין שיער על הכתפיים."],
["קוקס נמוך עם קליפס ספורטיבי","Hairstyle Details: Low Bun with Sporty Clip. Casual low bun at the nape held securely by a simple matte clip. Neat sides, clean nape, practical for active days.","השיער נאסף מהר וסגור לגמרי בעורף בקליפס שטוח.","הצדדים מתוחים לאחור. קוקס נמוך וקטן בעורף, מוחזק בקליפס שטוח ומט. אין שיער פזור. מאחור: הקוקס והקליפס בעורף."],
["חצי קוקו גבוה מתוח","Hairstyle Details: High Half-Up Ponytail. Sporty half-up style with the upper section pulled tight into a small high ponytail at the crown, lower hair hanging straight.","החלק העליון אסוף לקוקו קטן וגבוה בקודקוד, והחלק התחתון יורד חלק ומשוחרר.","החלק העליון מתוח חזק לקוקו קטן וגבוה על הקודקוד. החלק התחתון פזור, חלק וישר, על הכתפיים והגב. מאחור: הקוקו הקטן למעלה ומתחתיו שיער ישר."],
["צמה אחורית קלאסית צפופה","Hairstyle Details: Tightly Woven Back Braid. Classic tight braid starting at the nape of the neck and cascading straight down the center of the back. Clean hairline, neat strand weaving.","צמה קלאסית אחת שמתחילה בעורף ויורדת ישר במרכז הגב, הדוקה ונקייה.","כל השיער מתוח לאחור לצמה אחת הדוקה שמתחילה בעורף ויורדת ישר באמצע הגב. מקדימה: אין שיער על הכתפיים. מאחור: הצמה במרכז הגב."],
["קוקו נמוך ספורטיבי חלק","Hairstyle Details: Sporty Low Flat Ponytail. Simple low ponytail tied tightly at the nape with a plain dark band. Straight hair falling flat against the back, clean and modest.","קוקו נמוך, שטוח וצמוד לגב, מוחזק בגומייה פשוטה.","כל השיער מתוח לקוקו נמוך בעורף עם גומייה כהה פשוטה (רואים אותה). הקוקו חלק, שטוח וצמוד לגב. אין שיער על הכתפיים."],
["קוקס גבוה ספורטיבי","Hairstyle Details: High Sporty Topknot. Compact high topknot bun positioned on the crown. Pulled-back neat hair, clean nape, practical activewear style.","קוקס עגול וקטן למעלה בראש, אסוף היטב בלי קווצות.","כל השיער אסוף לקוקס קטן וקומפקטי על הקודקוד (קטן ופשוט יותר מקוקס של אירוע). העורף נקי. אין שיער פזור."],
["קארה מדומה מקופלת","Hairstyle Details: Folded Faux Bob. Faux bob hairstyle created by tucking and pinning the ends of long hair under at shoulder level. Volumetric, medium-length illusion, smooth finish.","הקצוות הארוכים של הפאה מקופלים פנימה בעורף ומוצמדים בסיכות, למראה קארה נפחי וקצר עד הכתפיים.","האורך שרואים: עד הכתפיים בלבד – הקצוות מקופלים פנימה ולא רואים אותם. חלק, נפח בינוני. השיער נגמר בקו הכתפיים מכל הכיוונים, וגם מאחור אין שיער על הגב."],
["תסרוקת מעטפת אחורית","Hairstyle Details: French Twist Updo. Elegant French twist updo. Hair seamlessly gathered and folded vertically along the back of the head. Clean, timeless, highly respected style.","השיער מסורק לאחור ומגולגל לאורך אחורי הראש (בננה), בצורה נקייה.","כל השיער מסורק חלק לאחור ומקופל לגליל אנכי לאורך אחורי הראש (קיפול צרפתי / בננה). אין שיער פזור. מאחור: רואים את הגליל האנכי. מהצד: הראש חלק והגליל מאחור."],
["אסוף נמוך עם שביל באמצע","Hairstyle Details: Center-Part Low Bun. Sharp center part with hair slicked smoothly back over the ears into a tight low bun at the nape. Modern, symmetrical, extremely clean aesthetic.","שביל באמצע מדויק, השיער מתוח חלק לשני הצדדים ונאסף לקוקס נמוך בעורף.","שביל באמצע, ישר וחד. השיער מתוח חלק לשני הצדדים מעל האוזניים לקוקס נמוך והדוק בעורף. אין שיער פזור. מאחור: הקוקס בעורף."]];
// v207 (Sara 26/10 13:47 "הנה זו הפאה שלי לתסרוקת, תכין לי טוב את הפרומטים ... שיהיו ממש טובים וברורים"): her wig is now an 8-angle sheet
// (a8/wig_ref.jpg). Only the hair is taken from it (not the face, clothes or background); the length follows the style; every view is spelled out.
const WIG=`התמונה הראשונה: הפאה שלי, מצולמת מ-8 כיוונים. ממנה לוקחים רק את השיער: ארוך, מדורג בעדינות בקצוות, חום-שוקולד עמוק עם גוונים עדינים בצבע זהב-דבש (יותר בחזית) – אותו צבע, אותם גוונים, אותו מרקם ואותו ברק.
Wig details: Long dark-brown wig with subtle warm golden-brown highlights, identical to the source image.
היעזרי בה כדי לראות איך השיער שלי נראה מהצד ומאחור. לא לוקחים ממנה שום דבר אחר – לא פנים, לא בגדים ולא רקע.`;
const HAIRKEEP=`האורך: כמו בפאה שלי (ארוך, עד אמצע הגב), חוץ מתסרוקת שכתוב בה אורך אחר – אז בדיוק האורך שכתוב. המרקם (חלק, גלים או תלתלים) לפי התסרוקת, הצבע והגוונים תמיד מהפאה.
כל זווית מראה את אותה תסרוקת מהכיוון שלה: מקדימה – השביל, הפנים והשיער שמסביב להן; מהצדדים – הנפח, איפה השיער נאסף ולאן הוא נופל; מאחור – מה שיש מאחור (קוקו, שיניון, קוקס, קליפס, צמה או שיער פזור), בגובה ובגודל שכתוב.
השיער בגודל טבעי על הראש, לא גבוה ולא רחב מדי, וקו שיער טבעי על המצח. כיסוי הבז׳ נעלם לגמרי, לא נשאר ממנו כלום.`;
function hairW(n,det,he,sp){return `מצורפות שתי תמונות.
${WIG}
התמונה השנייה: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון השני, אל תציירי אותו מחדש. שני דבר אחד בלבד: במקום כיסוי הראש הבז׳ שימי את השיער מהפאה שלי, מסורק בתסרוקת${q(n)}.
${det}${he?`
בעברית: ${he}`:''}${sp?`

מה חייב להיראות: ${sp}`:''}

${HAIRKEEP}
אותה תסרוקת בדיוק בכל 8 הזוויות.

${KEEP}`}
// v205 (Sara 26/10 12:40 "רשמת לו שאני מעלה לו איפור של תמונה? אין לי, אני רוצה שיצור. אני יכולה רק להעלות את התמונה שלי"):
// a look from the list straight onto the doll – only the doll is attached, GPT creates the makeup from the words (like the ties)
function faceW(n,det){return `מצורפת תמונה אחת: גיליון של הדמות שלי ב-8 זוויות מסביב, שתי שורות של 4 משבצות.

ערכי את הגיליון, אל תציירי אותו מחדש. שני דבר אחד בלבד: צרי על הפנים של הדמות איפור${q(n)}${det?`: ${det}`:''}.
האיפור נראה אמיתי, כמו של מאפרת מקצועית: מרקם עור אמיתי, צבעים מדויקים, מוקפד ולא מוגזם (חוץ ממה שכתוב שהוא דרמטי). אותו איפור בדיוק בכל הזוויות. בזוויות מהצד רואים רק את הצד של הפנים. בזוויות מהגב לא רואים פנים, ושם לא משנים כלום.

הפנים עצמם לא משתנים: אותו מבנה, אותה הבעה, אותו חיוך, אותו עור, אותו גודל ואותו מקום בדיוק בכל משבצת.

אל תשני שום דבר אחר: אותו גיליון, אותו סדר זוויות, אותו מיקום ואותו גודל של הדמות בכל משבצת, אותה תנוחה, אותו רקע, אותם קווים לבנים בין המשבצות. כיסוי הראש הבז׳ והשמלה בצבע עור נשארים בדיוק אותו דבר.

החזירי תמונה אחת: אותו גיליון של 8 משבצות (2 שורות של 4), באותו יחס גובה-רוחב, בלי טקסט ובלי מספרים.`}
const P={hair,hairW,HAIRS,HAIRG,tie,tieW,exact,TIES,look,face,faceW,MKC,GRID};
if(typeof window!='undefined')window.STYP=P;
if(typeof module!='undefined')module.exports=P;
})();
