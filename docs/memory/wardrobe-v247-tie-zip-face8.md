---
name: wardrobe-v247-tie-zip-face8
description: v246–v247 (27/10) cover tie collection (≤10, txw) → one ZIP for GPT with her face-8 close-up; batch upload sorts results; cu8 close-ups spin on card + home; 📷/360 lights on every card
metadata:
  type: project
---
Closet artifact HY6no4fCJwNunBtm6GVA8V, published as artifact version 246 = site v247, commit d353fc7.

- **Collection (tie202.js):** `IT[id].txw=[{p,n}]` (MAXW 10) = ties waiting for GPT. "➕ לבחור קשירות" picker shows only ties not yet picked/made. Section "⏳ מחכות ל-GPT": ⬇ ZIP, 📋 prompt, 📤 upload all.
- **ZIP:** scarf-1.jpg… (her it.img or store photo + it.pics + it.imgs, max 4), face-8.jpg, doll-8.jpg (a8/sheet.jpg), tie-NN.jpg (library sheets), prompt.txt. Prompt = sty199p `batch(item,L,ns)`: per tie TWO images, first the close-up (edit face-8), then the full body (edit doll-8).
- **face-8:** Sara's 8-angle head-and-shoulders photo with long wig (27/10 13:22), asset `f020f71d608d2da7304cdb0161c87206` (const FACE8), also repo closet/avatar8/face8_wig.jpg. Same 2×4 order as the doll.
- **Upload all:** sheetKind (full-res divider lines; close = panel bottoms covered) → body sheets vs close-ups; close-up pairs with the adjacent unpaired sheet (either order); sheets matched to waiting ties by mask IoU. Single-tie prompts append CUASK (also asks for face-8 close-up).
- **cu8:** tx entry `{cu, cu8:1}` = 8-angle close-up; cu8Frames cuts 2×4 panels. Card shows "🔄 מקרוב" spinning; home `.z-cu247` tile next to the avatar when R360.today.head()=='u'+id and that cover's active tie has cu.
- **📷/360 lights (Sara 13:18):** book4_tpl paint() adds `.ind247` (📷 lit = img/imgs/pics/p5g/a8up or avStat 'fix'; 360 green = avStat 'ok'); CSS in av188.css, bottom inline-end of .ph (the 👯 dup badge sits at inline-start). Old .avd dot and .av83 pose count are hidden.
- Tests: scratchpad t247w.js (collection/ZIP/upload/cu8/home), t247i.js (card lights).

Related: [[wardrobe-v245-ties27]], [[wardrobe-v228-cover-ties]], [[wardrobe-parallel-sessions]].

**v248 (27/10 16:20, artifact version 247):** her 7 plum ties (item S17QJ_9) cut badly – tiex kept every blue pixel, and GPT's deeper-blue gradient backdrop came along. cut8 maskWhole now keeps blue for tiex only if >30% of the doll's head area turned blue, and tiex also gets the long-tail grow step. I re-cut her 7 locally (scratchpad cut248.js, kind tiex) and replaced tx[].L + a8 in the DB (doc v30). Close-up cards: 3/4 box, object-position top (she wanted the whole face, not a tight crop).

**v249 (16:43, artifact version 248):** item window gallery: tie202 wraps galList → first slide 'מקרוב' {cu248} (front panel of cu8, turns every 650ms), then av188's 'עליי'. av188 spinOk/avMake now find the avatar slide by its url, not by index 0.
