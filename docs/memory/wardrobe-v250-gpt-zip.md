---
name: wardrobe-v250-gpt-zip
description: v250–v251 (27/10) "🚀 הכול ל-GPT" box in every item window – one ZIP (photos+doll+prompt) and one upload back; packs/sets/jewelry split into pieces; black backdrop + belt rim cut
metadata:
  type: project
  modified: 2026-10-27T15:18:22.137Z
---
Closet artifact HY6no4fCJwNunBtm6GVA8V, artifact version 250 = site v250, commit 6090f5f. Ledger rows 479–491.

Sara 27/10 16:53: one button per product → ONE ZIP with the prompt, her doll and all product photos; one upload back; go category by category.

- **gpt250.js** (book3.py after tie202.js): dialog #g250 with questions: 1 type (IT.kd, also overrides r360 kindOf), set parts (IT.sp), jewelry list (IT.jw: necklace/earrings/bracelet/ring), how many items (IT.np → pieces), belt (IT.blt no/off/on), light garment (IT.wbg → prompt asks black backdrop). Box `.g250box` under .t228box in the item window.
- **outs(id)**: set → whole + A,B sheets (pieces g1,g2); jewelry → one sheet per jewel + cu close-ups (face-8) with necklace / earrings; multi → one sheet per item. Pieces = fix85 `IT.parts=[{k:'g1',n,cat}]` → virtual D['id~g1']; r360 pool includes pieces85().
- **ZIP:** item-N.jpg, doll-8.jpg, face-8.jpg (when close-ups), prompt.txt. Upload: cuKind sorts close-ups vs sheets, an assign dialog with a select per file, then av188kind+av188up per piece; close-ups into IT.cus [{k,n,cu,cu8}] and spin first in the gallery.
- **cut8:** deBlack() detects a black backdrop (6/8 panel corners dark) and swaps it for the doll; belt MODE has rim:1 → rim pixels closer to the bare doll than to the belt core colour are dropped (synthetic test: brown leftovers 1,400 → ~80 px per view).
- **r360:** coat slot drawn after belt (ORDER …outer,belt,coat…); jacket/coat prompt lines: sits over the clothes, the dress shows where it's open (Sara 15:11 "מעילים או ז׳קט שיושב על הבגדים"). Ring = KIND ring, slot wrist, cut like bracelet.
- Tests: scratchpad t250.js (box/outs, arg width), t250u.js (mock upload), mkbelt.py + cut248.js K=belt.
- **v251 (commit 7f591a7, artifact version 251) hairstyles:** sty199p `hairZ(n,det,he,sp)` = ZIP prompt (wig-8, face-8, doll-8 → close-up first, then doll). sty199: ⬇ ZIP on every hair card (`data-syzip`, zipHair), upload takes both files, `window.sheetKind247` (tie202) splits close vs sheet, `cuUp(...,c8)` saves doc.cu + cu8:1; card with cu8 = cardH, `img[data-sycu8]` turns every 650ms. Test scratchpad t251.js.
- Makeup check 27/10: all 10 makeup docs she made have cu.
- **Still open:** bags close-up (to discuss), category batch ZIP (several products in one ZIP).

Plan doc: https://claude.ai/artifact/NJo7miNDvHrpWNmhaofHBL
Related: [[wardrobe-v247-tie-zip-face8]], [[wardrobe-v99-two-file-upload]], [[wardrobe-parallel-sessions]].
