---
name: wardrobe-v181-studio360
description: v181-185 (25/10) Sara's closet: the studio IS the 360 avatar now (r360.js), whole closet in it, home look of the day, lace dress pipeline, wig still pending
metadata:
  type: project
  modified: 2026-10-25T21:35:00.826Z
---

Published v181 to HY6no4fCJwNunBtm6GVA8V (publish file_path = scratchpad b/build/book.html, root b/build/pub, files = only changed a8/*). Repo commit 6bbe17e on claude/project-thread-6oxwf5.

- work/r360.js replaces the old studio: `openStudio` is reassigned to R360.openWith, so the old doll is unreachable. READY map = items that have 360 layers (7 on 25/10: dress S1100_0 'd', top T591091_2 'b', skirt S1100_5 's', shoes S2QB0_2 'n', belt S1100_2 'g', jewelry set T213 'j'+'e', head scarf S2QB0_4 'k'). To add an item: layers x<k>1-8.webp in work/a8 + a line in READY.
- Closet tab lists every item except IT.gen / IT.oos / s ret,give. Non-ready item → dialog with 3 buttons (item photo, doll sheet a8/sheet.jpg, copy one-message prompt).
- Lace garments: semi-transparent layer + under layer (xdu) tinted in the browser ("גופיית בסיס" swatches). Scripts closet/avatar8/new2/items/lace.py + hemgreen.py.
- Home (d180.js): avatar wears look of the day (localStorage lotd360), ⏸/▶ (h181spin), head chips, "📌 לבית" pin from the studio (r3home + db r360/home).
- Earring layer xe was trimmed to ear pieces only (it had slivers on sleeves); originals in items/earrings/before_v181.
- Wig (w1-8) is pasted from a non-aligned sheet and looks bad (Sara 21:13-21:27). Default head is the cover; wig marked "בתיקון". Fix = Sara sends a GPT edit of the new doll sheet with her wig, then cut like the scarf.

v182 (25/10 ~22:00): backgrounds = doll cutouts a8/c1-8.webp (closet/avatar8/new2/cutout/cut.py) drawn over a 420x700 bg canvas placed by feet centre FX[v]; ST.bg ('' = original blue photo; plain colours; 's_<scene>' = work/bg/*.svg; her own SET.bgx). Garment layers had backdrop-blue pixels (arm loops, scarf halo) → cleaned by cutout/nobg.py (originals in items/before_v182; jewellery only with d<14). Do NOT rerun nobg.py on already-cleaned files. New sheets: run nobg-style cleanup on new layers. Compare dialog #r3cmp, share picture #r3sh (navigator.share, fallback = downloads).

v183: a11y182.js/css (button #a11yb, localStorage 'a11y' {fs,hc,still}; html font-size %, html[data-hc], html[data-still]); search183.js/css (#gs183, bottom-bar 🔍 + header #gs183b + '/'; uses window.TOOLS172/WAIT172 from fix172). R360.prompts() = 360 prompts page (item + wig), admin panel links to it. New dialog ids must be added to the night rule in d180.css line ~176 (dialog:not(#r360)...) or they get dark text on dark.

v184 (25/10 22:40): WIG DONE from Sara's sheet 'Eight-View Hollywood Glamour Waves' (closet/avatar8/new2/wig_v3, README there). Not pixel-aligned → per-view body reg + hand-measured head transform (p3.json); layer = WHOLE wig head incl. face (no cutting on the face); doll's head removed in separate bases a8/nh* (photo) / ch* (cut-out), used by paint() when head=='w'. Colour filter: col184.js/css (pill #col184g in #q77 is role=button spans – real <button>s inside .groups get rewritten with counts and fold the phone bar), sheet #col184 (in the d180 night exclusion), #cl163 colour row in fix163.js, cat180 paint keeps covers in the chosen colour.

v185: see [[wardrobe-v185-wig-pin]].

Related: [[wardrobe-avatar8-pipeline]], [[wardrobe-avatar8-new2]], [[sara-task-table-rule]]
