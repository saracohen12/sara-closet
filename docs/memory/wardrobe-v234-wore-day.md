---
name: wardrobe-v234-wore-day
description: v234 (27/10) "השבוע שלי" day circles open a day sheet: pick what I wore, 📸 photo of myself → Claude matches garments to the closet, not found → add as her own item (IT.my)
metadata:
  type: project
  modified: 2026-10-27T05:51:21.600Z
---
v234 (2026-10-27, thread "לסמן מה לבשתי היום"): work/wore234.js + wore234.css, appended last in book3.py (after base210.js / sty199.css).
- #wk83 circles (layers77_84 paintWeek) are post-processed every 1.5s: days up to today enabled (data-wd234=date), future disabled; capture click opens dialog #wr234 (window.WR234.open(date)).
- Day sheet: worn items (✕ removes), "👗 לבחור מהארון" (search + category chips, pool = live items in WEAR cats), "📸 צלמי את עצמך" (capture=user) / "🖼 מהגלריה".
- Wear on another day: putItem(id,{wear,_wd:{wl,last}}); a beforePut wrapper (outermost) puts wl/lastWorn from _wd and skips the generic "נשמר: …" undo toast (it listed raw field names like locT, wl).
- Photo: sample.json stage 1 (photo + closet catalog → pieces {what,cat,colour,box 0-1000,ids,why}), stage 2 (photo + numbered sheet of candidates → match/0 + Hebrew why). Not found → Sara's exact question + ➕ add / 🔎 pick myself / לא.
- Added items: id 'M'+base36 time, IT[id].my={cat,short,color,d}, img = asset of the crop from her photo. D[id] (src 'my', srcl 'הוספתי בעצמי') and a cloned card (.card.my234) are created at load and on every paintAll.
- Day photo (900px) in db collection 'days234' doc=date {ph,t}; shown in the circle and the day sheet. Diary only, never avatar.
- v235: scan(files,more) takes several photos (also parts of the body / one item), merges pieces without duplicates (V.res.shots[], piece.s); per item 🔄 swap (picker V.from='res'), ✕ not worn, 'או אולי' alts; box 'לבשת עוד משהו?' (picker V.from='resadd', more photos); shoes question when no shoes. Marking saves look LOOKS['d'+date] (name 'לבשתי · …', day234:1, items by cat) and opens R360.openWith(look); day sheet shows wear counts + '💃 הלוק של היום על האווטאר'.
- Tested only with a mocked Claude; real-photo quality still to check with her.
Related: [[wardrobe-v77-upgrades]], [[wardrobe-who-publishes]].
