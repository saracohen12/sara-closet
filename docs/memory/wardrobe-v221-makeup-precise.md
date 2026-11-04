---
name: wardrobe-v221-makeup-precise
description: v221–v227 (26/10) makeup per feature, foldable studio, makeup groups that fold; v221: how makeup is laid on wigs/hairstyles in r360 mkDelta/mkFit
metadata:
  type: project
---
Artifact version 222, commit after 2c8a4b6. This continues [[wardrobe-v216-head-makeup]].

- mkDelta: the mean tint is removed, then one light 3×3 pass (centre weight 4) instead of two box blurs. Adaptive boost 1+.7·40/(40+|d|).
- Features are blobs where |d| > 18 (lips, each eye). Each blob is ≥ 6 px and its bbox (+3) is under 20% of the oval. mkFit then searches ±4 px for each one: NCC of the doll's luminance (M.g) against the canvas, with a small penalty per px of shift. A shift is used only when the score is > .5 and beats no-shift by .02. Debug: window.MKS221.
- Weight: where the head's luminance (after the global offset) differs from the doll's under the makeup (teeth vs lips), the delta is scaled down, to no less than .3.
- Test: scratchpad h/head222.js + strip222.py with real222.json. 'ymspink' = her "ורוד עמוק ורענן" (smvpfz4ja0; L0, L1, L7 in pub/_blob).
- By 18:39 she had 10 makeups, all with close-ups (cu).

**v222 (18:54–18:55 "לא מצליחה לבחור איפור, תקוע" / "שהכל יהיה כותרות שנפתחות ונסגרות"), artifact version 223:**
- The pick worked, but the avatar had scrolled away. On desktop, `.r3w` had overflow-x:hidden, so it became a scroll box that never scrolled and the sticky stage never stuck. It now uses overflow-x:clip (≥900px).
- r360 `fold221()` (called once in open after build) turns every `.r3lbl` in `.r3side`, and `.r3now>h3` (which folds `.r3worn`), into a ▸ heading (`.r3fh`, aria-expanded). It hides the siblings up to the next label (not `[data-styopen]`) with `.r3fz`. A closed heading shows the pick through data-pick. Open state is saved in localStorage r222open, and everything is closed by default. A MutationObserver re-applies after repaints.
- On a phone, after a style pick, a `.r3see` button "👀 לראות על הבובה" appears for 6 s.

**v223 (19:04 "הדמות יורדת מטושטשת"), artifact version 224:** since v216, paint() awaits (headT, mkFit) between `c.save();c.translate(0,pt)` and `restore()`. Two paints at once stacked translations (doll slid down). paint now draws into an offscreen canvas and copies it in at the end, only if it is still the newest (cv._pg). **Gotcha:** never await while drawing on a shared canvas. Repro: scratchpad h/race223.js (Stage + draw() ×3).

**v224 (19:09 "הכיסוי לא חתוך טוב", 19:11 "לא מגיעה לכל הכפתורים"), artifact version 225:** in cut8 maskWhole, the grey tie tail over the arm had been cut into pieces, by shade() (warm grey ≈ a shadow of beige) and by far() (a dark arm crease within 5 px). Now shade also needs sat(d) > .6·sat(b), and grey pixels (sat < .1) skip far(). CVW=8. Debug helper: window.cut8dbg(url,v) returns d, b, raw, morph and fin images. Studio .r3cats wraps.

**v225–v226 (19:22 "איפה מכניסים את החולצה", 19:23 "רושם איפור 5 דקות, בבובה לא רואים"), artifact version 227:** the tuck box `.r3tk` now shows for any top-slot and bottom-slot item (it was only b+s). Makeup: whole heads (incl. WHK tiex covers) use L.fit. Her own face (cover 'c', scarf items) in views 0, 1 and 7 uses L.fitId, which runs mkFit with the identity fit and so gets the boost. Other views use the native layer. **Gotcha:** mkDelta paints doll+mk with `mkraw:1`, or it would wait on its own promise (that hung the page in a test).

**v227 (19:33 "תמיין את האיפורים לפי הנושאים ... אפשר להסתיר סיווג"), artifact version 228:** studio makeup = `.r3mkg` with groups from STYP.MKC (doc.p 'm:c:i', or the same name, else "שלי"), each `.r3mkh[data-mkc]` folds; sty199 mk sections fold via `.sycatb[data-sycat]`. Shared localStorage 'mkc227'. Note window.STYP is the object, not a function.
