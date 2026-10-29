קבצים מעודכנים מעל closet_source.zip (work/). להעתיק אותם לתיקיית work אחרי פתיחת ה-ZIP.
- imgup.js (חדש): חיתוך אוטומטי של צילום מסך, תמונות קודמות, הדבקה, הודעת שמירה, וכמה תמונות לבגד (גב, צד) בשדה pics.
- hub.js, book4_tpl.html, book3.py: חיבור המודול. ב-book3.py נתיב הפלט מוגדר לסשן קודם, לעדכן PUB ו-book.html.
- p5.js (חדש): אווטאר 5 תנוחות. קבצי me/p5_*.webp ו-p5_sheet.jpg נמצאים ב-closet/avatar_new/ וצריך להעתיק ל-work/me/.

## 2026-10-20 סבב שיפורים 1 (ui.js / ui.css חדשים)
- book3.py: כרטיסים עם `<img data-th=ID>` בלי src; התמונות הקטנות נכתבות ל-pub/th/<cat>.json (20 קבצים, ~9MB) ונטענות ברקע. D[id].hi=1 לפריט עם תמונה. ui.css מוזרק לפני </style>, ui.js מצורף אחרון.
- book4_tpl.html: img(id) חדש + TH/thLoad/thApply/imgA; meta charset+viewport בראש הקובץ.
- כל אתרי `img(id)` ב-JS קיבלו data-th + fallback TPH (gif שקוף).
- ui.js: סרגל תחתון בנייד (.bnav), סרגל עליון מתכווץ (.ctrl.min, עם body{overflow-anchor:none} ופיצוי גלילה ידני), מסך בגד: כותרת דביקה בנייד (.dhead), עמודות dleft/dright, כלי תמונות מקופלים (details.dmore).
- סבב 2: studio.js רמזים למתחילים ורשימה ריקה; ui.js סדר כפתורי הסטודיו (שמירה/ביטול ראשונים), fade לגלילה, המגירה נסגרת אחרי בחירה בנייד; ui.css: hub/alerts מסך מלא בנייד, לשוניות עטופות.
- סבב 3: חיפוש – normQ (אותיות סופיות, גרשיים) ב-apply, התאמה מדויקת למזהה (T11), שם הקטגוריה והמזהה ב-data-q (book3.py), debounce, כפתור ✕ בחיפוש (.qw/.qclr), שורת "סגרי / נקי הכל" בסוף פאנל הסינון, פאנל נגלל בנייד, retry לטעינת תמונות.

## Version 27 (2026-10-21 00:00)
- BUG FIX: imgup.js paintImg removed every bundled thumbnail ("אין תמונה") once db marks loaded, because the card img no longer carries a src (thumbs live in th/*.json since v24). Now "no image" is decided by D[id].hi; data-th restored on revert.
- Thumbnail loading now starts in the page itself (thStart, before the hub bundle) and falls back from fetch(th/x.json) to <script src=th/x.js> (JSONP thGot) — book3.py writes both.
- p5.js: new 5-pose avatar is the default base (one-time SET.avb2 migration), "🖼 כל התנוחות" dialog (#p5all) with all 5 poses + export of one wide image.
- window.ERRS collects page errors; first error shows a small toast.

## Version 28 (2026-10-21 00:15)
- Phone sticky bar is compact by default once the closet is scrolled (ui.js round-1 block rewritten): one row = search + סינון + "▾ <group/category>" button; category strip (horizontal) under it; groups grid only when tapped (OPEN) or at the very top; picking a group/category folds it again. "סינון" also reveals #src/#sort/.seg inside the compact bar (CSS :has(#panel:not(.hide)) with ID specificity).
- Round 4 (ui.js second IIFE + ui.css): sticky section h2 under --ctrlh, haptics (navigator.vibrate 8ms), position memory (localStorage 'pos' {y,G,C,t}, 6h), sort "ret" (להחזרה בקרוב) via key() wrapper, tips tab in hub + #helpb in header.

## Version 29 (2026-10-21 00:35)
- ui.js third IIFE + ui.css: 📝 note badge on cards (paint wrapper), long-press / right-click quick-action sheet (.qa / .qabd; status toggles via putItem, ♥, 👗 ללוק via slotOf+openStudio, 🔍 open), click suppression right after a long press (QASUP), recent searches dropdown (.qsug, localStorage 'qrecent'), image fade-in + card press feedback.

## Version 30 (2026-10-21 08:10)
- ui.css round 6: "כפול" badge moved to the top of the card under the store badge (.tr shifts below it via :has), note badge under the date, smaller ♡/toggle at size S on phones, 2 columns at size S under 360px. Verified no badge overlaps at s/m/l on Pixel 7, Galaxy S9+ and desktop (tests/t28.js).

## Version 31 (2026-10-21 09:10)
- Item dialog: .drest/.dinfo/.ed tracks are minmax(0,1fr) so rows wrap inside the phone (the .ed was 932px wide before); per-item "הגיע?" toggle (IT.got y/n) drives the card "בדרך" badge and the transit filter; search name = full stored name or IT.tname pasted from the shop app (srchRowHTML in imgup.js); toast labels for new fields.
- Temu receipts truncate titles at ~45 chars — the exact name only exists in the Temu app, hence the paste field.

## v32 (2026-10-21) — colour matching + look feedback
- looks2.js (new, LK_VER=1): cinfo/pairScore/lookScore/genBest, stars + whyHTML per look, 👍/👎 feedback (fbForm/sendFb) → SET.learn {pairs,items,notes,log} via saveSet(); db collection `feedback`; "🧠 מה למדתי" panel (#hlearn); autoFill override (studio "השלימי לי"), drawer sort 'match', live score in #sinfo.
- colors.py → colors.json: measured colours for 658 items (532 from cut/*.webp, 126 from thumbnails); book3.py injects D[id].col={fc,c,sp,metal,mixed}.
- book3.py HUB concat: hub.js, hub2.js, studio.js, studio2.js, imgup.js, p5.js, looks2.js, ui.js.
- ui.css: .lscore/.lfb/.fbform/.learnbox styles appended.
Tests: S/tests/t30.js (phone+desktop, no errors); regression t23/t24/t26/t28/t29 all pass.

## v33 (2026-10-21) — version badge
- src/work/version.txt holds the number shown in the header ("גרסה NN", #ver button, click → toast with build date). book3.py replaces %%VER%%/%%VDATE%% and sets window.VER/VDATE. **Bump version.txt to the next artifact version before every publish** so the badge matches the artifact's version counter (artifact Version 33 ↔ version.txt 33).

## v34 (2026-10-21) — studio drawer fix
- studio.js: drawerItems filters by hasPic(id) (D[id].hi || TH[id] || IT[id].img) instead of img(id) — the drawer no longer hides items whose thumbnails were not loaded yet; fillDrawer awaits thLoad for the slot's categories ("טוענת תמונות…"); 'wedding' removed from the dress slot. ui.js: openStudio preloads all slot categories. Template: window.ERRS also records unhandled rejections.

## v35 (2026-10-21) — studio round (studio3.js, new, after looks2.js)
- Zoom: real height change of #sstage (scrolls) instead of transform; ＋ － ↺ pill moved to inline-start so the drawer never covers it; wheel over stage zooms. Original zoom branch removed from studio.js.
- Size slider max 400 (was 160; wheel/pinch clamp 170→400).
- setItem no longer removes dress when a top/skirt is picked (only dress↔set exclusive); layerOrder() puts the top under the dress (z=15).
- tf.pic: per-layer picture choice (item pics גב/צד/פרט, GPT back); srcOf wrapper; back view auto-uses a pic labelled "גב"; user-uploaded main images get cutBg (unless "עם רקע").
- Turntable: SPINSEQ front→half→side→back→side(mirrored)→half(mirrored); #spin pill (⟲ ▶ ⟳ + dots), drag on stage background rotates; ST.mir mirrors via .mirw wrapper (notes kept outside); side/half poses without GPT render show squeezed "approximate" layers (.sl.ap, onerror remove).
- #ssel is a card; .sbtns wrap (no horizontal scroll); 🧹 הסירי הכל (#sclear); .lpics strip; closed #sdrawer uses clip-path (no scroll space under the stage).
- imgup.js srchRowHTML: both store search links (Temu + Shein) + hint to upload extra photos. Template: beforePut silent for 'fit' saves.
Tests: tests/t32.js (zoom/spin/pics/dress+top/clear), dbg_drawer*.js, dbg_sel.js.

## v36 (2026-10-21) — scarf ties (ties.js, new, after studio3.js)
- Item dialog (cat scarves): "🧕 קשירות על הדמות" box — copy prompt (TIEPROMPT, 4 views on gray), name field, upload sheet (data-upm="tie" → routeUp wrapper → upTie). tieSlice: divider detection (bright columns), per-panel bg median, alpha by lightness (L>bg+8) or darkness (d>60), un-premultiply, crop, dome bbox; front/half panels get the face opening cleared by a flood (seeds inside the dome, L<bg+36 & d>14, rows<40% + central column to 60%), hole top recorded. tieFit maps to the p5 avatar via TIEHEAD (measured head boxes, stage 399×1365): scale = headW*TIEK/domeW, front/half positioned so the opening top sits at head top+0.1hh.
- Data: IT[id].ties=[{id,n,t,front,side,back,half (asset ids),u{},fit{view:{x,y,w}}}]; look stores tf.tie ('' = product photo).
- Studio: srcOf/autoTf wrappers; stageInner wrapper swaps the scarf layer per view (back fit, side/half real cut with fit instead of squeeze); bottom strip "🧕 קשירה" (paintSel wrapper).
- First tie uploaded for S11QS_6 (צעיף צמר עם פנינים) from Sara's Gemini sheet (assets 69ba7f10…, 340c7af6…, 6a0c6415…, 00a7a156…); db doc items/S11QS_6 created with ties. Files in /mnt/project-files/closet/ties/S11QS_6/.
- Known limit: the p5 base images include loose hair; a no-hair (hair tucked) 5-pose sheet from Gemini is needed for a realistic covered look (asked from Sara).
Tests: tests/t33.js (upload → slice → studio in 4 views), contact sheets tests/audit/tie_contact*.png.

## v37 (2026-10-21) — covered base hook
- ties.js: P5COV probe loads av/p5c_front.webp once per studio open; when present, a p5 look with a scarf (and head != wig) swaps base srcs av/p5_<pose>.webp → av/p5c_<pose>.webp (regex in stageInner wrapper). To activate: slice Sara's hair-tucked 5-pose sheet (avatar_new/slice.py → bg removal → 399×1365 webp like av/p5_*.webp), publish with root=build/pub + files av/p5c_front|side|back|half|hip.webp. No code change needed.

## v38 (2026-10-21) — new avatar bases from Sara's GPT sheets
- Sheets: /mnt/project-files/closet/avatar_new/v2/sheet_wig.png (פאה: combed hair, makeup, nude flats) and sheet_covered.png (כיסוי: cap + ~2 cm hair). Both 1672×941, same panel x-ranges as the first sheet. make.py (v2/) slices, removes bg (scipy region labels, floor shadow filter), scales figure height to 1291 with top=38, centre x=199.5 (hip pose fitted to 392 px width, bottom aligned), builds head overlays: p5_front_head/p5_back_head (hair+face, L<112 hair mask), *_headonly (rows<290, feathered 16 px).
- Published av/p5_*.webp (replaced), av/p5_sheet.jpg (wig sheet), av/p5c_*.webp + p5c_*_headonly (covered base, auto-used with a scarf; ties.js swap regex now includes headonly overlays).
- ties.js: TIEHEAD re-measured on the covered base (cap = true head), TIEK recalibrated (front 1.14, side 1.0, back 1.26, half 1.14); db items/S11QS_6 tie fits updated (version 2).

## v39 (2026-10-21) — כמה קשירות לכיסוי בבת אחת
- ties.js: `upTies(id,files,mode)` — mode `tie` = כל תמונה (או כל חלק בתמונה רחבה עם קווים לבנים על רקע אפור) הופך לקשירה אחת, מבט חזית בלבד (`one:1`, fit.front בלבד); mode `tie4` = גיליון 4 מבטים לקשירה (הזרימה הישנה, גם כמה גיליונות יחד). `tieSliceN` (N חלקים, רקע לבן → חלק אחד), `tieRead/tieBgL/tieGroups` משותפים. הצפת פתח הפנים צרה יותר (|c-cx|<.45·dome) ומתבטלת אם אכלה יותר מחצי מהכיפה (בד כהה). פרומפט `TIEPROMPT5` (5 קשירות בתמונה אחת). כפתור "👗 על הדמות" לכל קשירה (`data-tietry`) פותח סטודיו עם הכיסוי והקשירה. סטטוס משלו בתוך התיבה (`tieSt` → `.tst`, נשמר ב-UPST[id+'_tm']).
- imgup.js: כפתורי `data-upm^="tie"` עם multiple; הקבצים עוברים ל-`window.upTies`.
- ui.js compactTools: `.tiesbox` לא נכנסת ל-"עוד אפשרויות" (זו הסיבה ששרה לא מצאה את הקשירות ב-v36–38) ומוצבת לפניה.
- ui.css: `.imgrow>.tiesbox,.imgrow>details.dmore{min-width:0;max-width:100%}` (פריטי grid עם min-width:auto הרחיבו את הדיאלוג ב-814px בטלפון כשיש רצועת קשירות ארוכה), עיצוב תיבה/כפתור/תת-פרטים.
- tests/t34.js (fixtures tests/fx): גיליון 5 סגנונות + תמונה בודדת + בד כהה + רקע לבן + גיליון 4 מבטים + כפתור על הדמות + רצועה בסטודיו; טלפון ומחשב, בלי שגיאות.

## v40 (2026-10-21) — שמות לקשירות, תיבה נקייה, הדבקה
- ties.js: זרימת העלאה אחת `upTies(id,files,mode)`: לכל תמונה — 4 חלקים (3 קווים דקים, או 4 עם מסגרת ימנית) = קשירה אחת מ-4 כיוונים (`tieIsSheet4`), אחרת קשירה לכל חלק/תמונה. שמות: שדה אחד, כמה שמות בפסיקים (`tieNames`), שם אחד + כמה קשירות → "שם 1, 2…"; בלי שם → "קשירה N". צ'יפים `tieKnownNames()` = ברירות מחדל + כל שם קשירה שכבר בשימוש (בלי מספר סופי). כרטיסים: לחיצה על התמונה = `data-tietry` (סטודיו עם הקשירה), שם = `data-tiern`, 🗑, תג ↻ לקשירה מ-4 כיוונים. הדבקה: `[data-tiepaste]` → clipboard.read, ואם חסום → תיבת `.tiepz` (contenteditable) + מאזין paste/input (capture) שמנתב ל-upTies. `upTie`/`upStyles` הוסרו.
- imgup.js: כפתור "📋 הדביקי" תמיד מוצג; כשהקריאה חסומה נפתחת תיבת `.pz.top` מתחת לכפתורים. סטטוס "פותחת את הגלריה…" מתנקה אם לא נבחר קובץ (poll מסתיים), ובמצבי tie הולך ל-tieSt.
- ui.css: `.dtools .stamp{display:none}` (גרסה 28 של imgup), עיצוב כרטיסי קשירות/צ'יפים/תיבת הדבקה.
- נתונים: T162 (מטפחת פרחונית חומה) — 20 הקשירות ש"נחתכו" ב-v39 מ-5 גיליונות 4 מבטים אוחדו ל-5 קשירות עם 4 כיוונים (merged.json, fits חושבו ב-Python באותן נוסחאות; חזית תואם ל-DB), שמות: שובל נשפך, קוקס נמוך, טורבן גבוה, פפיון צדי, קשירה נמוכה בשכבות. DB version 8.
- tests/t35.js (טלפון+מחשב): גיליון 4 מבטים + גיליון 5 סגנונות + תמונה בודדת בהעלאה אחת, צ'יפים→שמות, הדבקה דרך אירוע paste, לחיצה על כרטיס→סטודיו, כפתור הדבקה בשורת התמונות.

## v41 (2026-10-21) — חיפוש בשיין לפי מק"ט + קישור להזמנות
- shein/sku_map.json (76 פריטים): מק"ט (sz…/sk…) מתוך מיילי ההזמנה (shein/byorder.json, SKU↔תמונה) ממופה לפריט דרך allurls.json/ship/assign.json (אינדקס השורה בהזמנה = סיומת ה-id). book3.py מוסיף `sku` לפריט → `D[id].sku`.
- imgup.js srchRowHTML (שיין): "🛍 למצוא את המוצר בשיין" — מק"ט + "🔎 חיפוש לפי מק"ט" (il.shein.com/pdsearch/<sku>/), "📦 ההזמנות שלי בשיין" (il.shein.com/user/orders/list), כפתור העתקת מספר הזמנה, טיפ: ההזמנות שלי ← ההזמנה ← המוצר, או חיפוש במצלמה. חיפוש לפי שם עבר ל-details "פחות מדויק" (השם בעברית = תרגום מהחשבונית).
- book3.py: רשימת ההעתקה ל-av/ כוללת עכשיו גם p5c_*; src/work/me/ סונכרן עם קבצי הבסיס החיים (av2/out) — לפני כן כל build דרס את build/pub/av/p5_*.webp בבסיס הישן (הפרסומים היו page-only אז האתר לא נפגע).

## v42 (2026-10-21) — חלון פריט צפוף (בקשת שרה)
- ui.css "v42 compact item dialog": כל קבוצת כפתורים בשורה אחת (`flex-wrap:nowrap;overflow-x:auto`), כפתורים .76–.8rem, שורות מצב/קטגוריה/סימון/סגנון/עונה/הערה/הגיע קטנות (gap 5px, span 44px), הערה בגובה שורה אחת שנפתחת ב-focus, "מתי לובשים" קומפקטי בלי "אפשר גם וגם".
- imgup.js: כפתור "📸 צלמי" הוסר (גם .camb על התמונה וגם .camb2); תוויות קצרות: "➕ תמונה", "⭐ ראשית", "📋 שם".

## v43 (2026-10-21)
- p5g.js (NEW, after ties.js in the HUB concat): "👗 הבגד על האווטר ב-5 תנוחות" box in clothing item dialogs. One GPT sheet (garment only, 5 poses, grey bg, white dividers) → split (tieThinGroups, fallback 5 equal columns) → bg removal (tieCutPanel) → IT[id].p5g {front,side,back,half,hip,fit{view}} → real layer in every studio pose (replaces the squeezed `.sl.ap` approximation), per-view placement remembered in tf.pv. p5gFit clamps width (skirt 78% / top 70% of stage) and hem height.
- studio.js zoom fixes: the ✕ did not close (imgup's `.zx2` sat on top of the `.zb` ✕ and the dialog's pointerdown called setPointerCapture → Chrome retargets the click to the dialog). Pointerdown now ignores buttons; `.zx2` stops pointerdown; a plain tap on the dark area closes (ZCLOSED guard so the click under it doesn't reopen); 🔍 reads the main image src at click time and refuses the placeholder.
- ui.js layoutDlg: the item info table (מאיפה … סך החשבונית) is inside `details.dinfo-more` "ℹ️ פרטים נוספים · שילמת X", closed by default (Sara's request). CSS in ui.css.
- Tests: t36 (p5g), t37 (zoom close + info details).

## v44 (2026-10-21)
- ui.js tidyRest (after layoutDlg): one 'use' row = לבישות + מיקום + לוקים (inlooks folded in), `.sim` buttons in `.simb`; ui.css: bottom section as two cards, chips WRAP (v42's nowrap scroll hid style chips), smaller labels/chips.
- p5g.js p5gLong: skirt cuts are stretched vertically (≤1.4×) at upload so the hem reaches the floor line (GPT renders long skirts spread wide → waist-fit scale left the hem at the knee). Prompt P5GPROMPT: skirt hangs naturally, hem ≤1.5× waist, same scale in all 5 panels. SMEX3_7 data repaired by hand (stretched cuts in /closet/p5g/SMEX3_7, main image restored).

## v45 (2026-10-21)
- ui.css: `.p5gbox .ib` / `.tiesbox .ib` wrap (v42's nowrap+scroll cut the prompt button in the narrow desktop column); `.p5r` thumbnails wrap (54×92) so all 5 poses are visible without scrolling. Test: t38.js (upload in the box, every button/figure inside the box bounds, desktop+phone).

## v46 (2026-10-21)
- ui.js fitRows (end of tidyRest + on resize): chip-only rows (מצב/סימון/סגנון/עונה) get `.fit1` (nowrap) and the font shrinks in .02rem steps from .72 to .56rem, then padding 8→3px, until the row fits; falls back to wrapping if it still overflows. Sara: "סגנון הכל בשורה אחת, תקטין את הגופן אם לא נכנס".

## v47 (2026-10-21)
- One-liners Sara asked for: return note "החזרה עד D · עוד N ימים · לפי שיין/משוער" (book4_tpl.html), ".simb" buttons nowrap with flex:1 (label "✨ הרכיבי לוק"), the two `.sim` h4s merged into one `h4.simh` ("הולך טוב עם: … · כיסויי ראש שמתאימים:"), p5g hint one line, Shein tip two lines (line-clamp). tidyRest now finds the `.sim` that holds [data-lookfrom] (the "דומים מהארון" box is also `.sim`).

## v48 (2026-10-21)
- Avatar readiness dot on every clothing/scarf card (`.avd` in `.ph`, bottom-right): 🟢 ok = p5g with all 5 views, or GPT 5-pose render (IT.p5), or a scarf with ties; 🟠 fix = p5g partial or manual; 🔴 no = nothing yet. Manual override IT[id].av ('ok'|'fix'|'no') via the new "אווטר" row in the item dialog (data-k="av:*"); "רק" filter gets avok/avfix/avno; #prog shows 🟢/🟠/🔴 counts. avStat/avCounts live in ui.js, so ui.js calls paintAll() once after load (the template's first paintAll ran before the bundle). Test: t39.js.

## v49 (2026-10-21)
- ROOT CAUSE of "can't delete": `window.confirm()` is blocked inside the Claude app iframe (returns false at once), so every confirm-guarded delete (5 poses, a tie, "מה למדתי") silently did nothing. Replaced with ui.js `sure(btn,label)`: first tap arms the button (red, "בטוח? לחצי שוב", 4 s), second tap executes. Never use confirm()/alert()/prompt() in the site.
- p5g.js: "👀 עלי ב-5 תנוחות" (p5gPreview) draws base + garment per pose on a canvas and opens it in the zoom viewer; the base-sheet button is now "🖼 גיליון האווטר ל-GPT"; delete button reads "🗑 מחקי את 5 התנוחות". T47's wrong 5-pose upload (a black draped top) removed from the db by hand (p5g/T47_wrong_upload_15-01.jpg).

## v50 (2026-10-21)
- 5-pose VARIANTS per item (packs of 3 shirts etc.): IT[id].p5gv = [{n, front..hip, u, fit, t}], IT[id].p5g = the chosen variant (studio/preview/dot keep reading p5g only). Box: "🔄 החליפי" (replace active), "➕ עוד גרסה (צבע אחר)" (data-upm=p5gadd, multiple files → one variant each), name input + "✏️ שם", strip `.p5gv` with "✓ באווטר" pick (data-p5gpick), delete removes the active variant. imgup.js go(): /^p5g/ modes go to window.upP5gMany. Test: t40.js.
- Details summary now "ℹ️ פרטים נוספים · שילמת X · טמו/שיין" (first word of D[id].srcl).

## v51 (2026-10-21)
- p5g.js: p5gClean – כיתובי GPT ("קדמי" וכו') מוסרים אוטומטית מהחיתוך, ולכן הבגד כבר לא "עולה" על הפנים. רצועת "צבעים/גרסאות" תמיד גלויה, "➕ עוד גרסה (צבע אחר)".
- p5.js / p5g.js: שכבת ראש+שיער מעל הבגדים תמיד (חזית, גב, צד, חצי צד, יד על המותן). קבצים חדשים: av/p5_{side,half,hip}_head.webp, av/p5c_{side,half,hip}_head.webp (נוצרים ב-heads.py: ראש+צוואר(+שיער), בלי חולצת הבסיס, קצה רך).
- "עם כיסוי" (ST.head!='wig') = בסיס מכוסה (p5c) גם בלי כיסוי שנבחר; מעבר לפאה זוכר את הכיסוי (ST._sc) ומחזיר אותו; בלי כיסוי – נפתחת מגירת הכיסויים.
- studio3.js: גלולת "▶ סיבוב 360°" מוצגת בכל בסיס; לחיצה עוברת לאווטאר החדש.
- book4_tpl.html: שורת הכפתורים בסטודיו נשברת לשתי שורות במחשב (≥900px).

## v52 (2026-10-21) – סבב הסטודיו של שרה
- **באג ותיק**: הכלל של תג הכרטיס `.sb{padding:3px 9px}` חל גם על תמונת הבסיס בסטודיו, ולכן הגוף צויר ~8% צר יותר משכבות הראש והבגדים (עגילים כפולים, "ראש לא חתוך טוב"). ui.css: `img.sb{padding:0!important}` + `.sh{height:100%;object-fit:contain}`.
- heads.py: גם p5_front_head / p5_back_head / p5c_*_headonly נוצרים מחדש: ראש+צוואר(+שיער), בלי זרועות/כתפיים/חולצת הבסיס, קווי קצה דקים מוסרים.
- v52.js (חדש, אחרי ui.js): האווטאר החדש כברירת מחדל (SET.avb3); "🧍 בסיס" פותח מגירת בחירה (data-avb); "⋯ עוד" מרכז רקע/הפריטים/מה דעתך/תמונה/תמונות מ-GPT/הסירי הכל/לוק חדש עם הסבר (הכפתורים המקוריים מוסתרים ב-CSS ומופעלים ב-click()); במחשב המגירה יושבת בעמודת המשבצות מתחת להן (placeDrawer, position:fixed); נקודות מוכנות-לאווטאר במגירה, מיון "🟢 מוכן לאווטאר קודם" (ברירת מחדל, גם בארון: #sort value=av) ו"🟢 רק מוכנים"; p5gRecheck מנקה כיתובי GPT מבגדים שהועלו לפני v51 (ברקע, g.c=1 אחרי).
- studio3.js: זום עד ×5. studio.js: משבצת "חולצה / סוודר".

## v53 (2026-10-21) – תכשיטים על האווטאר
- jw.js (חדש, אחרי v52.js): בחלון פריט מקטגוריית תכשיטים קופסה "💎 התכשיט על האווטאר": פרומפט (JWPROMPT, גם ב-prompts/prompt_gpt_jewelry_3_parts.md) ← GPT מצייר 3 חלקים (שרשרת / עגיל אחד / צמיד) על אפור עם קווים לבנים ← jwSlice חותך (חלק ריק = null, הסדר נשמר), p5gClean מסיר כיתובים ← IT[id].jw={neck,ear,brac, u{}, a{יחס רוחב/גובה}}.
- בסטודיו (האווטאר החדש בלבד): התמונה השטוחה של התכשיט מוחלפת בחלקים לפי JWL (נקודות ציון ב-399×1365): שרשרת בצוואר (z 51, מתחת לשיער), עגיל בכל אוזן (השני במראה, z 55 מעל הראש), צמיד בפרק יד שמאל (חזית). צד: אוזן אחת; חצי צד: אוזן + שרשרת; יד על המותן: 2 אוזניים + שרשרת; גב: כלום. בלוח התחתון: "💎 מה ללבוש: שרשרת / עגיל / צמיד" (tf.jw) ו-➖/➕ (tf.jws).
- avStat לתכשיטים: ok אם יש חלקים. משבצת "תכשיטים" במקום "שרשרת". compactTools שומר .jwbox גלוי. imgup: data-upm="jw" ← upJw.
- אזהרה בסטודיו (rawnote) כשבגד עיקרי בלוק הוא תמונה מקורית בלי גזירה (isRawLayer). .mst: יישור שכבת הראש בחלון "כל התנוחות".
- ידוע: לאווטאר עצמו יש חישוקי זהב באוזניים; עגיל קטן לא מכסה אותם לגמרי.
- v53 תיקונים נוספים: (1) בסיסים ישנים – שכבת הראש היא חיתוך 399×450 מעוגן למעלה; הכלל `#sstage img.sh{height:100%;object-fit:contain}` מגרסה 52 הזיז אותה לאמצע הגוף ("שני ראשים") – הוסר. (2) תצוגות מראה (סיבוב 360): שכבות שמתווספות אחרי studio3 (ראש בתנוחות צד, קשירות צד/חצי, חלקי תכשיט) נכנסו מחוץ ל-`.mirw` ולכן לא התהפכו ("ראש רפאים"). עכשיו דרך `stageAdd(html,add)` (studio3.js) שמכניס לתוך העטיפה.

## v54 (2026-10-21)
- עמודת המשבצות/המגירה במחשב 380→440px (book4_tpl.html, #srail .slot 78px). הצבעים במגירה מקופלים לכפתור "🎨 צבע ▾" (v52.js: data-dcol; .dfam.pop/.open ב-ui.css) שמראה את הצבע שנבחר.

## v55–v56 (2026-10-21)
- v55 (לא פורסם בנפרד): משבצות הסטודיו הפכו לקוביות קטנות (58px) בשורה שנשברת, בכל הגדלים; במחשב המגירה מסתיימת מעל #sinfo (placeDrawer) כדי שסרגל הגודל/הזזה יישאר גלוי.
- v56: #ssel (סרגל הכלים של הבגד) מועבר ב-JS (s56Mount) ישר אחרי .stop ומקבל class thin: שורה דקה לרוחב כל המסך (גלילה אופקית). grid-template-rows עודכן (auto auto 1fr …) בטלפון ובמחשב. סינון המגירה (.df) בשורה אחת גלילה.

## v57 (2026-10-21)
- p5g.js: `p5gOfT(id,tf)` – גרסת צבע לפי הלוק (tf.gv) במקום תמיד הגרסה הפעילה; בסרגל הדק "🎨 צבע:" עם תמונות הגרסאות (v52.js). p5gClean: חלקים קטנים בקצה העליון (כיתוב שנוגע בצווארון) ואבק (<0.4%) נמחקים גם כשהם בתוך ה-bbox. חולצות עד 84% רוחב (כמו הזרועות). p5gRecheck: דגל c=2, מחשב מחדש fit לכל תנוחה.
- studio.js/studio2.js: משבצות חדשות גרביונים (hosiery) ואביזר שיער (hairacc, קטגוריה hair); שמלות ערב (wedding) במשבצת שמלה. SLOTZ hosiery 6, hairacc 61.
- v52.js: המסגרת המקווקוות של הבגד הנבחר נעלמת 1.4 שנ׳ אחרי שמפסיקים לגעת (.calm), חוזרת בנגיעה.
- ui.css: שורת הסינון במגירה קטנה יותר (נכנסת ב-440px), 🎲 ללא טקסט, "🟢 מוכנים", "🎨 ▾".
- heads.py: שכבות הראש נגמרות בסנטר (nk-10, דהייה nk-24..nk-10) – צווארון של כל בגד מכסה את הצוואר. כל 10 הקבצים פורסמו מחדש.

## v58 (2026-10-21)
- jw.js: בקופסת התכשיט צ'יפים "בסט יש: שרשרת / עגיל / צמיד" (IT[id].jwp, ברירת מחדל שרשרת בלבד). הפרומפט (jwPromptFor) מתאים את עצמו: חלק אחד = תמונה אחת מלפנים, 2–3 חלקים = גיליון עם N חלקים. jwSlice(im,N): חלק אחד – התמונה כולה, או החלק הראשון (החזית) אם GPT החזיר גיליון של כמה תצוגות; 2–3 – לפי קווים לבנים או חלוקה שווה. ui.css: .jwpk.
- tests/t55.js (גיליון 5 תצוגות של שרה, fx/neck5.png), t46.js מסמן 3 חלקים לפני ההעלאה.

## v59 (2026-10-21)
- jw.js: "🗑 מחקי" בקופסת התכשיט מוחק בלחיצה אחת (בלי "בטוח? לחצי שוב") ומציג "התכשיט נמחק מהאווטאר · ביטול". קודם נשמר `jw:{__delete__:true}` (putItem לא מוחק אובייקט) – עכשיו `jw:null`; jwOf מנקה שאריות כאלה. book4_tpl.html: שמות עבריים לשדות jw/jwp/p5g/p5gv/ties בהודעת "נשמר:". tests/t56.js.

## v60 (2026-10-21)
- jw.js: צ'יפ "שרשרת" לא ירד כשהיה היחיד המסומן (jwParts החזיר ['neck'] לרשימה ריקה, והקליק החזיר אותו). עכשיו אפשר להוריד הכל (jwp:[]); בלי חלקים כפתור ההעלאה מושבת ו"פרומפט ל-GPT" מבקש לסמן קודם. tests/t57.js.

## v61 (2026-10-21)
- jw.js: הפרדה מלאה – לכל חלק בסט (שרשרת / עגיל / צמיד) שורה משלה עם "📋 פרומפט", "📥 העלי / 🔄 החליפי" ו-🗑 (data-jwpart; imgup.js מעביר את החלק ל-upJw). העלאה מתמזגת לתוך jw הקיים ולא מוחקת חלקים אחרים. פרומפט לכל חלק (jwPromptFor(k)): שרשרת = גיליון 5 כיוונים בסדר של גיליון הבגד (חזית/צד/גב/חצי צד/חזית בזווית), עגיל = עגיל אחד מלפנים, צמיד = מלפנים.
- שרשרת ב-5 כיוונים: jwSlice(im,1) עם 4–5 חלקים מחזיר גם views; נשמרים ב-jw.v/uv/av[neck][view]. בסטודיו כל תנוחה מציגה את התמונה שלה (jwUrl(j,k,v)), רוחב לפי יחס הגובה-רוחב כדי שהגובה יישאר כמו בחזית; צד במראה (JWL.side.neck [180,288,96,mir]); גב ברוחב קבוע בעורף ([200,256,90]). בלי גיליון כיוונים – צד/גב בלי שרשרת כמו קודם.
- ui.css: .jwrow. tests/t58.js (5 כיוונים), t59.js (הפרדה).

## v62 (2026-10-21)
- studio.js: tfStr(tf,mir) – transform של שכבה כולל scale(sx,sy) ו-skewX(k); סליידרים חדשים בסרגל הבגד: רוחב (ssx), גובה (ssy), אלכסון (ssk) + הזנה חיה; ייצוא קנבס מכבד אותם; "↺ למקום" מאפס. ברירת מחדל: חצאית/שמלה/סט על האווטאר הישן (long/short) sx=1.25 כי המותן יצא צר. p5g.js/studio3.js משתמשים ב-tfStr.
- jw.js: חלקי תכשיט ניתנים לגרירה (ui.css pointer-events:auto) – ההיסט נשמר לכל תנוחה ב-tf.jo[view][part], העגילים זזים ביחד במראה, צביטה = גודל, "↺ למקום" מנקה. pointerdown capture מכוון את tf.x/y לחלק כדי שלא יקפוץ. JWLB – נקודות ציון לבסיסים הישנים (חזית בלבד). צד: [128,290,96] במראה. רק חלקים שסומנו ב"בסט יש" מוצגים. בלי העלאה: תמונה מקורית לא עולה על הגוף (הערה מסבירה), גזירה שטוחה כן. שורת השרשרת מציגה 5 תמונות כיוון (חסר = ?).
- v52.js: המגירה נפתחת תמיד מלמעלה ועם פופאפ הצבעים סגור.
- DB: T208 – נמחקו חלקי עגיל/צמיד ישנים (חיתוך שגוי של תמונת דוגמנית מ-v53). T213 לא נגעתי (שרה העלתה מחדש).

## v63 (2026-10-21)
- jw.js: גם עגיל מקבל 5 כיוונים מגיליון (שרה שלחה גיליון עגיל עם כיתובים חזית/צד/גב/חצי צד/יד על המותן); jwWipeLabels מוחק את שורת הכיתוב בראש כל חלק לפני החיתוך (ריצה כהה קצרה בראש החלק עם רווח רקע מתחתיה). עגיל בגודל ריאלי (h=34 במקום 64). צד: שרשרת [140,286,96] במראה. tests/t65.js עם הגיליונות של שרה (fx/ear5.png, neck5d.png).

## v64 (2026-10-21)
- jw.js: בסרגל התכשיט לכל חלק ➖/➕ משלו (tf.jps[part], 0.4–3, בכל התנוחות) במקום ➖/➕ כללי; "↺ למקום" מאפס גם אותו. ui.css .jwg. tests/t66.js.

## v65 (2026-10-21)
- jw.js: השרשרת "מסביב לצוואר" – מסכת CSS (radial-gradient) מעלימה את קצוות השרשרת בראש התמונה (אליפסה במרכז-עליון; בצד: מרכז-אחורי) כך שהם נראים נכנסים מאחורי הצוואר. נקודות הצוואר הועלו לבסיס הצוואר (front 276, half 278, hip 458, side 278, long 232, short 242).

## v66 (2026-10-21)
- jw.js: החלק שנוגעים בו על הדמות נבחר (tf.jsel, מסגרת רק עליו); סליידר "גודל" בסרגל מגדיל רק אותו (tf.jps[jsel], חי + ציור מחדש); סיבוב/רוחב/גובה/אלכסון מוסתרים לחלקי תכשיט. tests/t67.js.
- v52.js: המגירה הריקה של שרה – סינון צבע (🎨) נשאר מהמשבצת הקודמת ולכן "אין חולצות". עכשיו מעבר משבצת מאפס צבע וחיפוש, ורשימה ריקה מציגה אילו סינונים דלוקים + "🧹 נקי סינון". tests/t70.js (t69 = בדיקה עם נתוני ה-DB האמיתיים של שרה, dbq/items).

## v67 (2026-10-21)
- oldheads.py: שכבות הראש של הבסיסים הישנים (av/avatar_head.webp, av/avatar2_head.webp) נחתכו מחדש – ראש + שיער + צוואר בלבד, בלי כתפיים/זרועות (קודם הכתפיים והזרועות העליונות הופיעו מעל הבגד). גם av/p5_front_neck.webp + p5c_front_neck.webp – צוואר בלבד לאווטאר החדש.
- v52.js: כפתור "👤 צוואר מעל" בסרגל של חולצה/שמלה/סט/ז'קט (אווטאר חדש, חזית) – לחולצות פתוחות: הצוואר מצויר מעל הבגד (tf.nk, שכבה .nkov z49). בבסיסים הישנים הצוואר תמיד מעל (בשכבת הראש).
- studio.js: "👕 חולצה בפנים/בחוץ" (tuck) בולט יותר, זמין גם כשהחצאית נבחרת, פועל על החולצה.
- v52.js: בארון, מיון "🟢 מוכן לאווטאר קודם" ממיין רק בתוך כל קטגוריה, אז בחירה בו מדליקה גם את הסינון "רק 🟢 מסודר לאווטר" (ומכבה כשבוחרים מיון אחר). tests/t72.js.

## v68 (2026-10-21) – ביקורת מלאה של הסטודיו + מראה "2050" + מהירות
- v68.js (חדש, אחרון ב-HUB): מנוע ציור משותף drawStageTo (ייצוא לוק + 5 תנוחות, כולל שיקוף/מסכה/חלקי תכשיט/צוואר); שמירה על סגירה/לוק חדש (closeStudioGuard, נקודה אדומה על 💾); טיוטה ב-localStorage (studio_draft); 📐 התאימי לגוף (fitToBody, FIT_WAIST לכל בסיס/תנוחה); צביטה לזום; גבול גרירה; גרירת בגד משוער בצד/חצי צד/יד על המותן (tf.pv[view]); שם פריט במגירה ובסרגל; ❓ איך זה עובד; כפתור "👗 לבניית לוק" חזר ללוקים המוצעים; עותק מנותק בשמירת לוק.
- theme68.css (חדש, אחרי ui.css): טוקנים, Heebo, כפתורי גלולה, זכוכית, כרטיסים 18px, חלונות 24px, content-visibility לרשתות.
- studio.js: מיון "זול קודם" בלי NaN; #sclose/confirmNew דרך closeStudioGuard. jw.js: wrist גם בצד/חצי/מותן, שרשרת חסרה לא מסתירה עגילים, חלק מוסתר = ghost. studio3.js: סיבוב בגרירה רק על הרקע, שכבת ap לפי tf.pv. v52.js: p5gRecheck שקט. ui.css: ראש ישן באלבום height:auto.
- book3.py: מכווץ את הסקריפט עם terser (tools/node_modules; NOMIN=1 מדלג), JSON קומפקטי, תמונות ממוזערות WebP (q68, 300×400) → th/*.json+js (12MB במקום 19MB).
- בדיקות: t75 (ביקורת כוללת, גם בטלפון), t76–t80. ממצאים: /closet/audit_v68/findings.md (47), תוכנית: plan.md.

## v69 (2026-10-21) – מסך בית חדש לגמרי + ניקוי זרימות GPT ישנות
- new69.js (חדש, אחרון ב-HUB): סרגל אפליקציה (לוגו "הארון", 🔔, ?, גרסה), כרטיס פתיחה כהה "מה לובשים היום?" עם בניית לוק / הלוקים שלי, 4 אריחים (להחזרה בקרוב, מועדפים, תפתיעי אותי, פרטים נוספים), קטגוריות כקלפי תמונה (h9cat → לוחץ על .subs a), כפולים להחזרה + נצפו לאחרונה מתחת. כל הסטטיסטיקה/#prog/סיכומים/הערת "שילמת בפועל" עברו לדיאלוג #more9. #panel הועבר מה-.ctrl לשורש ה-RTL כגיליון תחתון (pn9) עם מיון/חנות/גודל תמונות בתוכו ורקע pn9bd. בחלון הבגד "שם לחיפוש בטמו" מקופל ל-details.srch9.
- new69.css (חדש, אחרי theme68): גופן Rubik (גם בתבנית), פלטת דיו+קורל (--grad), גיבור עם אורורה מסתובבת, אריחי bento, סרגל חיפוש זכוכית (חיפוש + סינון בלבד), קבוצות כגלולות נגללות, כרטיס חדש (חול/שבת למעלה מימין, ♡ למעלה משמאל, חנות וכפול למטה על התמונה, תאריך מוסתר), תפריט תחתון צף כהה, כותרות קטגוריה דביקות עם זכוכית.
- ניקוי: תיבת "🧍 5 תנוחות מ-GPT" (אווטאר מלא) הוסרה מחלון הבגד (p5.js), "📥 תמונות מ-GPT" הוסר מהסטודיו ומהתפריט (book4_tpl.html, v52.js), לשונית "📸 לצלם מטמו" הוסתרה (studio2.js), הערות "תצוגה משוערת" מפנות לתיבת הבגד ב-5 תנוחות. "🧍 גיליון האווטאר" עבר לתפריט ⋯ בסטודיו (v68.js) לשינוי האווטאר ב-GPT.
- בדיקות: t81 (ניקוי), t82 (מסך הבית, גיליון, סינון, חלון בגד – טלפון ומחשב).

## v70–v82
- ראו קבצי המקור (כותרת בראש כל קובץ: rule70, design71, fix72, design73, edit74, fix77, design78, fix79, fix80), tasks.md, ומסמך "כל השינויים מגרסה 50": https://claude.ai/artifact/VKEMzizpkT8jy5QvkpEBzJ

## v83 (2026-10-22) – 38 השדרוגים הנותרים מתוך 50
- fix83.js + fix83.css (חדשים, אחרונים ב-book3.py: JS אחרי fix80, CSS אחרי fix79). fix77.js: lotdPick משתמש ב-window.occToday83 (חול/שבת/חג לפי הלוח העברי, Intl he-IL-u-ca-hebrew).
- בית: #rt83 (יום אחרון להחזרה), #hol83 (חג הבא ≤45 יום), #wk83 (השבוע שלי, IT[id].wl = תאריכי לבישה). שורות grid: rt83 4, lotd77 5, hol83 6, rdy77 7, wk83 8, rv79 9, old79 10, h9sec 11, urgent 12, recent 13.
- ארון: מיון wm/wf, .new83 (≤14 יום, נעלם בפתיחה – localStorage seen83), .av83 n/5, ☑ בחירה (#sb83, bulk), ▦ קיר (body.wall83), #ix83, 🎤 .mic83.
- חלון בגד: נקודות + החלקה, "עם מה זה הולך" (PAIR+goes), תאריכי לבישה, שיתוף, הערה קולית (assets, IT[id].vn).
- סטודיו: hd83, הקודם/הבא (.nx83 + החלקה על #ssel), זום לפנים (#sstage.fz83), BGS.street, hipGuard דרך smartFit, openQA83, טעינה מוקדמת של התנוחות.
- אווטאר: openBU83 (כמה גיליונות → upP5g). לוקים: לוח שבועי בגרירה, אירוע + כוכבים באלבום (כפתורים class mini בגלל #hbody button), gaps() בתובנות, SET.shop83. גיבוי: db backup83 יומי (7 אחרונים) + downloads.
- בדיקה: t83.js (טלפון ומחשב), t77/t79/t80 עוברים.

## v84 (2026-10-22) – phone round, #32, #49
- Source layout changed (#49): v68–v74 layers are now layers68_74.js, v77–v84 are layers77_84.js; css look68_73.css + look77_84.css. Same order and content (verified: build identical except the header comment lines and the pre-existing random order of the size <option>s). The old single files + 135 .vNN backups moved to src/work/old/. New changes: add a new file (fix85.js/css) after layers77_84 in book3.py.
- fix84 (inside layers77_84): pinch on window capture = resize the selected garment when the fingers are near it (all poses, side too); ➖ גודל ➕ in #ssel .nx83; #ix83 rail auto-hides; armFit (#32) wraps smartFit for back/hip tops: row-by-row edge cost (robust, ±10% size, dx ±24, dy ±30 hip), applied only if ≥10% better.
- Tests: v84/pinch84.js, tap84.js (touch crawl per screen), ovf84.js, side84.js, qa84.js (render garments in poses, needs /_blob assets fetched with Artifact read path=<asset id> one at a time), dbgfit84.js.

## v85 (2026-10-22) – fix85.js/css (after layers77_84 in book3.py)
- Free search: typing in #q shows `.sx85` strip (order:1 inside .wrap, right under the bar) with screens/tools (list A), one entry per GPT prompt type, saved LOOKS by name. siteSearch85(q) for tests.
- Prompt sheet (#pr80) gets via MutationObserver: #av85 (her av/p5_*/p5c_* pose files on #e9e7e3, copy via ClipboardItem with long-press fallback, download via claude.use('downloads'); sheet = 5 panels + labels) and #pf85 "מה לשפר בפרומט" (claude.use('sample') rewrites; per-type SET.pr85[k]={txt,notes}; textarea now editable, 💾 manual save, ↺ original).
- Any [data-zoom^="av/p5_sheet.jpg"] opens #avs85 with both sheets (covering / wig). Note: something appends ?v=NN to data-zoom.
- toast() recreates #toast if a sheet re-render removed it (it gets moved into the top dialog).
- Item dialog: .pd85 "פרטי המוצר" card after the subtitle, built from the folded .dinfo-more table + D/IT, with 📋 copy.

## v86 (2026-10-22) – fix85.js section 7
- belt/shoes/bag added to P5G_SLOTS; renderImgRow wrapper adds the "על האווטר ב-5 תנוחות" box for them (p5g.js only shows it for group 'clo'); p5gFit wrapper: belt = FIT_WAIST.p5[v] width ×1.08 centred on P5BODY.y.wa+4; shoes = FEET85 span on sole y 1332; bag = 130px wide next to the hip. Test tests/v77/belt85.js (synthetic sheet + mock assets; argv[4] belt|shoes|bag).
- Side effect: usesPoses() now counts belts/shoes/bags in "מה חסר לאווטאר".

## v87 (22/10/2026)
- fix85.js §8: split a product into pieces (IT[id].parts=[{k,n,cat}] → D['id~k'] items with their own 5-pose upload, studio slot and drawer tile). Auto-suggest from the name ('+' parts, "3 חגורות", set keywords). Product window "✂ לפרק לפריטים נפרדים"; list openSplit85 ("פירוק סטים וחבילות" in search).
- belt/shoes/bag added to VARSL: each uploaded version (➕ עוד גרסה) is its own tile in the studio drawer.
- §9: avStat (card dot) covers belt/shoes/bag and split products (all pieces ready = green).
- Tests: v85/parts87.js, bvar87.js, dot87.js.

## v88 (22/10/2026)
- fix85.css: card avatar dot moved to the top corner of the photo (7px); the חול/שבת pill (.mode) shifts 24px inward when a dot is present.

## v89 (22/10/2026)
- fix85.js §8: split pieces are NON-enumerable on D (Object.defineProperty) so counts/insights/alerts/grid ignore them; drawerItems wrapper adds them to the studio drawer.
- §10 duplicates: union of D[id].dup into groups (minus SET.nd89 "not a duplicate"); one card per group shown (keeper SET.dk89 or avatar-ready/not-returned first), extra() wrapper hides the rest; gallery #dg89 (openDups89), tools-row button [data-dg89open], card badge .dup[data-dg89]. NEVER add a <section> in dialogs: apply() loops all sections.
- §11 item-window [data-p5gcopy] opens openPrompts80(type,id) + scrolls to #pf85; pf85 injected on open + interval.

## v90 (22/10/2026)
- cut89.js (new, appended after fix85.js in book3.py): replaces tieCutPanel + p5gSlice. Background = median of bottom rows/low side columns; T=clamp(p95(border dd)+2,4,8); solid=dd>T, 9x9 closing, flood from border = background; enclosed low-contrast pockets; 1px fringe. White fabric is NEVER keyed out (old rule `L>bgL+8` made white transparent). Divider columns = ≥90% near-white columns. Covering face hole: adaptive FLIM + centre-column fallback.
- Sara's rule: GPT sheets have a GREY background only – remove only the grey, every white stays.
- Already-uploaded items were stored after cutting (original sheet not kept) → white items must be re-uploaded.
- fix85.js §10: manual duplicate pairs SET.dp89; §12: item window "👯 להעביר לכפולים" → picker #dp89 (same category, scored, search); "↩ זה לא כפול" removes manual pairs; window-capture listener for [data-dg89open]; apply() wrapper repaints dup badges.
- Tests: v90/cut89.js, tie89.js, dp90.js.
