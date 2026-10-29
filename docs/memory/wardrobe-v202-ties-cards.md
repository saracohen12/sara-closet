---
name: wardrobe-v202-ties-cards
description: v202–v204 ties/hairstyles/makeup – one grey tie master per cover, exact prompt, cut8 shadow fix, picture cards that turn, studio scarf/tank/background pickers
metadata:
  type: project
---

Continues [[wardrobe-v199-styles]]. Related: [[wardrobe-v190-cut8]], [[wardrobe-check-8-angles]], [[wardrobe-ties]].

v202 (26/10 ~09:20 UTC, Sara 11:04 + 11:09): one grey master per tie, every cover wears it. Files work/tie202.js (+ r360/av188/cut8/sty199p). Home + "הארון שלי" get 🧕/💇/💄 category tiles (open the library). Cover window bar: "🧕 לבחור קשירה" → picker (ties painted in the cover colour, r360 itemRGB) → IT[id].tie; studio grid marks covers "🧕 עם קשירה" (r360 coverTie/wearCover, ST.tf = item id). "🎯 פרומפט מדויק": her real scarf photo + doll + chosen tie (STYP.exact) → upload via av188 kind 'tiex' (whole-head cut) = that cover's own picture, which beats the masters (coverTie is false once isReady).

v203 (26/10 ~09:35 UTC): her first real tie sheet ("שובל נשפך אחורי", long tail down the back) checked offline through cut8 in all 8 angles, on two covers: fits well. Fix: below the head line, cut8 maskWhole drops pixels that only changed brightness but kept the doll's colour (shade(), chroma diff <.045) – GPT's shadow on the doll's dress had made a beige rim along the tail. cut8.CV not bumped (it would re-cut every item). Preview: /mnt/project-files/closet/ties_check/tie1_pink_8angles.jpg.

v204 (26/10 ~10:10 UTC, Sara 11:38 + 11:46 "לא רוצה שמות, אני רוצה לראות"): library = picture cards (sty199.js card(); placeholder = grey doll "עוד אין תמונה"), touch turns the doll once / mouse hover loops (R360.styFrames), ⋯ = viewer #sty204v (8 angles, rename, replace, delete), "＋ להוסיף" card, makeup grid per category (db 'stylegrid'). Preset key on the style doc: p='t<i>'/'h<i>'/'m:<cat>:<i>' (names no longer reset to "קשירה 2"). Studio: heads only כיסוי+פאה (HEAD2), basic cover = default tie in GREY [150,150,154] (headOf), "🧕 המטפחת" row = grey or one of her scarves (ST.tf=item id), "🎯 במדויק" button; tanks from her closet (ST.cam='i:<id>', data-r3cam – NOT data-cam, imgup.js owns that); backgrounds: db 'bgs' + bgDlg (10 ideas with GPT prompt, upload); stage pad PT=50/PB=46 + white frame, bottom pad = floor sides faded in (photo's last rows are lighter).
