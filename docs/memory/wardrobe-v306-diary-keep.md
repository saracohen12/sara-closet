---
name: wardrobe-v306-diary-keep
description: v304–v307 (28/10) 🧹 progress + old-avatar button, "📅 מה לבשתי" diary window (diary306.js), items out of use (IT.out), keep-only-main-photo automation (keep307.js)
metadata:
  type: project
  modified: 2026-10-28T16:29:07.074Z
---
- v304: 🧹 dialog shows progress during deletes. v305: "🗂 האווטאר הישן" button deletes 318 old 5-pose pictures (Sara approved 16:07 but must still press; result → db cl302/old305).
- v306 diary306.js/.css: home card title "הלוק של היום" + button "📅 מה לבשתי היום" open #dy306: today, 📝 past 6 days, month calendar, today/week/month lists, ⭐ most worn (+₪ per wear), ♥ fav, 💡 tips, 🧺 out of use. Data = IT.wl (wear dates) + db days234; day taps open WR234 (wore234) and its ✕ returns. WR234 now exports dayLook.
- Out of use = IT.out {r: torn|stain|broken|small|daughter|gave|other, d, note} + IT.gen (hides everywhere via fix161); "↩ לארון" clears both. Also a button in each item window.
- Pitfall: an "e71" script wraps leading emoji of headings in a span — set heading innerHTML wholesale, never firstChild.textContent. Don't reuse a class name of the body container for buttons (dyb306 bug).
- v307 keep307.js (Sara 16:19 asked): daily, items with all 8 a8 angles ≥3 days, in R360.ready, with IT.img (her main photo), not sets → pics=[], imgs only main, delete extra files not referenced in IT/other collections. Log db cl302/keep307. At start: 78 items, 118 extra photos.
Related: [[wardrobe-v300-backup-errlog]] [[wardrobe-v272-storage]]
