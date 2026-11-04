---
name: wardrobe-v277-redesign-home
description: v277 (28/10) redesign screen 1 of Sara's closet – clean look html[data-d180=z50], one-screen home, 4 tabs; how tabs hide parts; hooks; next screens
metadata:
  type: project
---
Sara approved the analysis-doc redesign 28/10 04:57 ("התוכנית מאושרת"). Rule: build screen by screen and show her each one before the next (card sent 28/10 for screen 1 → next is הארון).

**v277 (commit 6b82401, artifact version 277):**
- work/z277.js + z277.css (last in book3.py). Design 'z50' "נקי (החדש)" added first in d180.js DESIGNS; one-time localStorage 'z277mig' makes it hers. Old designs stay in 🎨 (way back).
- Tokens: bg #f6f5f3, cards #fff, ink #17161a, accent #b4532a, radius 20, Rubik. Maps the site vars (--card, --accent…) under html.d73.d78[data-d180=z50].
- Tabs: nav.z5nav (בית/הארון/סטודיו/עוד), .bnav hidden. body[data-z50=home|closet] hides parts with CSS: home shows only .h9bar + #h180; closet hides #h180 (shows the OLD closet page for now). סטודיו → R360.open(), עוד → openAdmin172().
- Home = #h180 re-laid by CSS grid (av | lk, chips, .z5w "מה מחכה לך" from WAIT172 + window.COUNTS172 now exported in fix172). Rows 2/3/4 by innerHeight; --z5fix sets the avatar height so nothing scrolls. .z-lkbox has contain:size (the avatar sets the row height). Heads = one round button that cycles; speed in a popover (.z5sp).
- Code that shows the closet list calls window.zCloset() first (fix172 only, fix163 toGrid, search183 filterCloset, layers68_74 toCloset); r360 pinGo calls zHome().
- Test: scratchpad shot277b.js / nav277.js (`node shot277b.js x 390 850`); the home avatar is blank in tests only (item sprites 404).

**Next screens:** הארון (search top, categories one strip, filters bottom sheet; move hol83/wk83/old79/urgent/tiles somewhere), item window (4 tabs), studio, orders. Known: admin panel has a stray white button top-left on phone.
**v281 (28/10):** Sara APPROVED the home (09:10). "הלוקים שלי" link moved into .z-lkh; 'עוד' tab now opens #z5m "כל מה שיש באתר" (openMore281, MORE list in z277.js; ⚙ כל הכלים → admin panel). Her "cart" = advisor items st 'think' (ADV187.cart(), home button "העגלה שלי (N)"). Next screen = הארון.
**Bug rounds:** round 2 (28/10) = bugs 160–185 in the analysis doc; v278 fixed 17, v279 (f21c302) the other 9 – all done. Gotchas: a `//` comment inserted mid-line in a one-line script kills the rest (use /* */); `node --check a b` checks only a; top-level `const D/IT` are NOT window.D (use typeof D). Temu OCR names fixed at build via NFIX in book3.py.
Related: [[wardrobe-v267-analysis]], [[wardrobe-redesign-v69]], [[wardrobe-v172-admin-panel]].
