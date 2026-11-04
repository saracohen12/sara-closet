---
name: wardrobe-v245-ties27
description: v245 (27/10) 27 tie sheets added as styles docs k27n01..27, cutter fix for long scarves, new cover tie window (3 big turning cards, image prompt, sheet download, close-up cu), cache fix A8V
metadata:
  type: project
  modified: 2026-10-27T13:02:03.779Z
---
27/10/2026, closet artifact HY6no4fCJwNunBtm6GVA8V version 245, commit 7d84894.

**27 ties:** Sara sent 27 GPT 8-angle tie sheets (no names on them). Cut locally with cut8.run in the built page (scratchpad cut27.js), assets uploaded by me (src as webp + 8 L + 8 M each). db 'styles' docs `k27n01..k27n27` {set:'tie', n:'N. <Hebrew name I gave>', sub:'מהחבילה של 27/10', src, L, M, lum, cv:8}. sty199 shows `x.sub` as the card subtitle.

**Cutter fix (cut8.js maskWhole, only when fab = ties):** a grey scarf hanging over the beige dress passed as a "shadow" and the side views had holes. Below the neck the mask now grows into neighbours of the scarf's own colour (local mean, distance < 34, 8 passes). CVW was NOT bumped (a re-cut of every hair/tie would slow her browser).

**Cover tie window (tie202.js open(), Sara 12:49 + 12:52):**
- Wide dialog (1100px), `.t245g` grid with 3 cards per row (2 under 700px).
- Big avatar frames (styFrames), lazy-loaded by an IntersectionObserver. They turn on mouse-over or on a tap.
- Her own cover ties (tx): the 8 layers are cropped to one shared box (cropFrames).
- Sections: "🆕 הקשירות שהבאת בתמונות" (library docs without a w/t preset), then "📝 הקשירות מהרשימה" (the 20 TIES).
- Buttons on each card: 📋 פרומפט במלל (presets), 🖼 פרומפט לתמונה (exact(item, n, '') = 3 images), ⬇ תמונת 8 הזוויות (doc.src saved as JPEG), 📤 להעלות.
- Every prompt appends CUASK, which asks GPT for a second close-up picture (front and back).
- Upload: her own file input. With two files, sheetScore (light divider lines at 1/4, 1/2 and 3/4 width) picks which one is the sheet. The close-up is uploaded as JPEG ≤1600 into TXN[id].cu. The sheet goes to `window.av188up(id, [sheet], true)`, newly exposed in av188.js.
- The putItem wrapper keeps cu in the tx entry, including the old cu on a replace. "🔍 להעלות תקריב" adds a close-up to an existing tx. The close-up shows big on the card, and 🔍 opens it full screen in dialog#t245v.
- STY199 now exposes gone(x) for hidden styles.

**Speed fix:** r360 KV key = 'rv1:'+A8V (a hash of the a8/ and bg/ files, made in book3.py). Bump rv1 when the drawing code changes.

**Orders scare (12:40):** she thought she had marked everything as arrived. The DB showed no change. The filter chip is now called "✅ להציג רק מה שהגיע".

Test: scratchpad t245w.js (mock db styles = sty245.json, blobs copied to pub/_blob).
Related: [[wardrobe-v228-cover-ties]], [[wardrobe-v213-cut-faces]], [[wardrobe-v238-order-temu3]], [[wardrobe-parallel-sessions]].
