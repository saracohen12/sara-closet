---
name: wardrobe-v323-scroll-tabs
description: v323–v325 (29/10) closet: page jumped back while mouse-scrolling (z283 scrollIntoView, r3on lock), sheer garments on black bodysuit (sbk), item window in 3 tabs (z324)
metadata:
  type: project
  modified: 2026-10-29T00:05:52.484Z
---
Continues [[wardrobe-v321-ask-bubble]]. Artifact HY6no4fCJwNunBtm6GVA8V, live version 328, commit d05bb6b.

- v323 (Sara 23:39 "כשאני מגלגלת למטה עם העכבר, לבד זה עולה לי למעלה"):
  - z283 paintStrip called scrollIntoView on the active category, which also scrolled the PAGE back to the strip on every repaint. Now it only moves the strip sideways (scrollLeft delta), once per category. Same fix for the hub tabs (layers68_74) and the z288 studio row.
  - html.r3on (studio scroll lock) stayed on when the studio closed another way. r360 now removes it on the dialog's close event and on a 700 ms check.
  - **Gotcha:** never use scrollIntoView for a sideways strip; it scrolls every ancestor, the page too.
  - Test: scratchpad t323/f.js (pick a category, then wheel; scrollY must keep growing).
- v324 (row 595): gpt250 asks a light garment "רואים דרכו?". The answer is IT.sbk, and a SHEER regex guesses it when unset.
  - If yes, the prompt asks GPT for a black matte bodysuit with the garment over it.
  - av188 adds the note "גוף-שחור", which sets cut8 flag bk. Then onBlack() checks GPT really dressed it in black, and keyBlackG() keys out the black: alpha = brightness against the fabric's 90th-percentile colour.
  - Not yet tried on a real GPT sheet.
- v325 (redesign screen 3): z324.js/css split the item window into tabs 👗 הבגד / 🧍 אווטאר / ⚙ ניהול.
  - Each tab shows only its own parts: .dmedia/.dinfo/.o3dl, .dtools, .drest.
  - scrollIntoView or focus on a part in a hidden tab opens that tab first; this is done by wrapping the Element prototype methods.
  - The tab is kept for prev/next and reset on close. `window.Z324.set(t)`.
- errlog 28/10 showed "This artifact can hold at most # uploaded files" (v202 recutx). Watch the asset cap, see [[wardrobe-v272-storage]].

- v326 (Sara 00:33 "תשדרג לי מאוד מאוד את האתר, תעשה לי את זה כבר" – she wants big VISIBLE upgrades now, not small fixes; her main screen is a 1920 desktop):
  - z326.css: at ≥1200px the home is a full-width 3-column dashboard (areas "av txt txt" / "av lk wait" / "av chips sty316", rows auto auto 1fr) and shows every z5w row (z277 rows=99).
  - Closet: 6 cards per row. Orders: a wide dialog.
  - Studio: .z8c is one sideways-scrolling line of pills (phone too). z326.js replaces the <br> in its labels with a space.
  - Gotchas: max-width on #top or .h9bar squeezes the header into the middle, so don't set it. A fixed .r3side width clips the studio list.
  - Test: scratchpad t323/all.js W H screenshots home/closet/studio/more/orders.

- v328 (Sara 29/10 00:51 "תבנה לי את זה כמו דף אינטרנט… סרגל למעלה… דף אחר, ולא לגלגל"): z328.js/css, the closet is a site.
  - nav#z328n is a sticky menu bar before .ctrl. Categories come from the z283 strip. Whatever doesn't fit goes under "עוד ▾", a picture grid.
  - body[data-z328]=land|page|all|res. land shows only the big category tiles (sections hidden). page = C set: header #z328p (breadcrumb, h1, count, prev/next) and footer #z328f ("הקטגוריה הבאה").
  - res = search or any filter (filt(): q, COL, G, F, panel selects). all = "כל הפריטים" (the old long list).
  - The apply() wrapper notices a C change, then pushState and scroll to the top. window.scrollTo is muted for 450ms so z313's smooth scroll doesn't fight it. popstate means the back button works. Z328.go(c,all).
  - Test: scratchpad t328/n.js W H and ft.js.

Next: keep upgrading visibly (studio side list, 'עוד' page, look cards); show her each screen.
