---
name: wardrobe-v209-base-rename
description: v209–v211 (26/10) Sara's 50 makeup prompts, category picker search + mouse-over spin, ✏️ item rename (IT.nm), new "חולצות בסיס" category worn under the dress, pictures + 360 hover spin for the 3 avatar tiles
metadata:
  type: project
  modified: 2026-10-26T12:44:18.047Z
---
26/10/2026, closet artifact HY6no4fCJwNunBtm6GVA8V (v209 = artifact version 210, v210 = 211).

**Makeup (v209, Sara 14:17 "כמעט אין הבדלים באיפור"):**
- sty199p.js `MKC` holds her 50 looks in 7 groups as `[name, EN, exact prompt, Hebrew short]`.
- Each preset's `d` is "Makeup Style: EN. prompt". faceW() and look() add her identity line (MKID) and MKDEEP ("deep, clear colours, don't soften").
- Honest limit: on the doll the face is small; the grid with her own close-up shows the differences best.

**Category picture (cat180.js):**
- v209 adds a search box `#c209q` in the picker, filtering with normQ over card data-q.
- With a mouse, hovering keeps the avatar turning and leaving returns it to the front (Sara 14:21). A mouse click opens the category; a touch still spins one turn.

**✏️ rename (nm209.js, Sara 14:19 "בשם מופיע לי קשקושים"):**
- Her name is saved as `IT[id].nm`. The wrapped `paint()` sets `D[id].short`, the card `.t` and `data-q`; the originals are kept in S0.
- The form has "↩ השם מהקבלה", and the toast has "ביטול".

**Base shirts (v210, Sara 14:24):**
- New built-in category `base` "חולצות בסיס" in book3.py SEC and GR. ALWAYS={'base'} keeps the section even when it is empty. base210.js shows an empty-state hint.
- Sara moves shirts herself. 5 tops have "בסיס" in their name: T335, T364, T44, T591091_2, T86.
- In r360.js, `SL(k)` turns a 'top' layer into the 'base' slot when the item's category is base. ORDER now starts 'shoes','base',…, so the base shirt doesn't clash with a dress.
- A base shirt replaces the plain lace underlay: it shows through the lace sleeves, and the cam picker is hidden.

**v211 (15:08 "אני רוצה גם לערוך את התמונות האלו"):** in "🖼 לבחור תמונות" edit mode the 3 avatar tiles (tie202 .sty202c) open styPicker in cat180: her styles of that set, a8/t_c.webp / t_w.webp, or 📷 upload (downscaled 700px webp → assets). Saved SET.styCover {set:{k}|{a}|{u}}; tie202 thumbOf/paintThumbs use it ('@'+url).
**v212 (15:21 "האווטאר יעלה לי כאן 360, יסתובב במעבר לעכבר"):** R360.headFrames(h) ('#c' cover / '#w' wig, shared frames8 cache with styFrames). tie202 thumbOf falls back to '#w' (hair) / '#c' (tie, mk); paintThumbs keeps el._F; pointerover spins, pointerout → frame 0; "🔄 360" badge .c212h. Gotcha: in #cl163 the d73 emoji tidy (layers68_74 fix → .e71 display:none) hid an empty <i class="ph"> – container needs class e71k. Head 'c' is drawn with her default tie (headOf → defTie), so in local tests with mock styles (blobs missing) the head looks empty – not a bug.

Related: [[wardrobe-v206-styles-hide]], [[wardrobe-v208-catcover]], [[wardrobe-parallel-sessions]].
