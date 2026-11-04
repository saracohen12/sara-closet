---
name: wardrobe-v312-rules-closet
description: v312–v317 (28/10) cut rules, GPT sendings history, closet redesign z313, Shabbat/weekday switch, 10 styles at once (sty199 batchS), GPT window back stack
metadata:
  type: project
---
- v312 cut8 finish(kind,c,b,qc,v) runs on CLOTH kinds: seeThru (lace holes → alpha 0, only small repeated holes; never on jacket/coat/vest – a light button got holed), check() (backdrop/specks → unBack again), cleanRim (alpha ≤24 → 0; rim 2 px deep takes the garment colour; blue halo out). cvOf TOPK/OPENK 8, dress/skirt/pants 5.
- Sara's 17:47 "dotted lines" = faint alpha-15 body/backdrop specks of the open jacket over a dark dress. T105 sleeve bands are a knit pattern, not sheer. No item has `hol` set.
- QA harness: scratchpad qa308 batch13.js → oN/ dirs; look.py / zz.py (O=env dir) compose doll c{v}.webp + layers.
- v312 gpt250.js: saveSend on ZIP/prompt → localStorage 'g312h' + db 'gpt312' (doc 'k'+sorted ids); openSends()=window.g312sends lists them + pre-v312 groups from item g250 (same minute). Cancel keeps selection with undo. Tile in "עוד".
- v313 z313.js/css: closet tab = title, z283 tools (#z6 moved into .ctrl .wrap), big search, all categories as picture grid (phone: 8 + "▾ כל N הקטגוריות"), groups wrap, #q77 behind "🎨 צבע ותצוגה" (body.z313f). .ctrl is NOT sticky in the closet tab (tall sticky bar collapsed while she scrolled to categories).
- v314 ret313.js/css: "✓ משאירה" (s:'kept') / "↩ מחזירה" (s:'ret') under each picture in 🔔 return alerts and #urgent (wraps .mini in .r313); #urgent now skips kept/give. Black-bodysuit for light sheer garments not built yet (waiting for an item to test).
- v315 cut8: printBeige(m,b,d,diff,dbg,fill) – beige printed garments by texture (lstd), and for every dress (o.fillBody) all figure∩doll-body pixels between .2H and the hem (last row ≥45% of max width) are kept → no notches by GPT's hanging hand. cvOf dress 7. Closet titles not sticky; #totop '↑ למעלה' from 300px.
- To give an item an avatar for Sara: upload the sheet as an asset (Artifact publish asset:true) and set items/<id>.a8up=[{a,t,n}] – her browser cuts it (av188 pending). Done for T299 19:2x.
- Thread attachments are at the 24 cap: put file paths in the message text.
Related: [[wardrobe-v308-neck-sort]] [[wardrobe-v277-redesign-home]]
- v316 (28/10 19:36–19:41): z313.js closet "הכל · ☀ חול · ✨ שבת" (.z316m, Z316) wraps extra() for clo+kid sections; category clicks (z6c + home h9cats) set G='all',C=id directly – layers68 used to reset G to 'day'. Not persisted on purpose. "🖼 לבחור תמונות" (.c180e) in .z313b; cat180 now also catches `.z6c [data-h9cat]`. Home row .z316h (💇/💄/🧕 → STY199.open). MORE got the 3 tiles (the styles window had vanished from menus in v277).
- v316 sty199.js: "＋ לסמן לשליחה יחד" (SEL in localStorage 'sty316', ≤10), selBar/selFab: ⬇ ZIP (wig-8 for hair, face-8, doll-8, prompt) + 📋 STYP.batchS(set,items) (2 pictures per style: 8-angle close-up then doll) + 📤 → review() pairs close/body by sheetKind247 in name order, she fixes names, goAll() runs run() per pair. run(): 8-grid close-up recognised for every set (cu8). r360 paintSty: 💇 row always (after ties when a cover is on), makeup row always.
- v317 gpt250.js: STK back stack – ✕/Esc go one step back (questions → list → pick; sendings).
