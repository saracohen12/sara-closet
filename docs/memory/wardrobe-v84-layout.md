---
name: wardrobe-v84-layout
description: Sara's closet v84–v89 (2026-10-22) – merged source files (layers68_74.js / layers77_84.js), phone pinch-resize, back/hip arm fit, asset download trick for QA
metadata:
  type: project
  modified: 2026-10-22T09:03:27.536Z
---

v84 published 2026-10-22 (Version 84 = badge 84). Follows [[wardrobe-v77-upgrades]].
- Source layout (#49, Sara asked to finish it even though I had advised against): v68–v74 JS files merged into src/work/layers68_74.js, v77–v84 (fix77…fix84) into layers77_84.js; CSS into look68_73.css + look77_84.css. Old single files and 135 .vNN backups are in src/work/old/ (easy to revert). Put new work in a NEW file (fix85.js/css) after layers77_84 in book3.py. Build output was verified identical (only diff: header comments + size <option> order, which is random per run anyway).
- Phone: two fingers near the selected garment resize it in every pose (window-capture listeners, beat stage zoom/spin); ➖ גודל ➕ buttons in #ssel .nx83; "⋯ עוד" studio menu buttons no longer overlap; #ix83 rail auto-hides.
- #32 armFit wraps smartFit for tops in back/hip: edge-by-edge fit to BODYW, applied only if ≥10% better. Remaining: thin arm strip shows when the GPT sleeve is narrower than her arm.
- Verifying garment renders locally: Artifact read with `path`=<asset id> (ONE id per call; `paths` fails) saves the png; copy to build/pub/_blob/<id> and run tests/v77/qa84.js.
- v85 (fix85.js/css, new file after layers77_84): free site search strip under #q; avatar 5-pose pictures + both sheets (covering/wig) with copy/download in the prompt sheet; "מה לשפר בפרומט" rewrites the prompt with the sample capability and keeps her version in SET.pr85; item window "פרטי המוצר" card. Toast element can vanish when a dialog re-renders (fixed by recreating it).
- v86: belt/shoes/bag in P5G_SLOTS with their own p5gFit (belt on waist line verified in all 5 poses; shoes/bag only a starting position) and the upload box in the item window.
- v87: products with several pieces (set jacket+dress, '3 חגורות') split via IT[id].parts → D['id~k'] pieces, each with own 5-pose upload (fix85.js §8, list 'פירוק סטים וחבילות'). belt/shoes/bag in VARSL → each '➕ עוד גרסה' is its own drawer tile (what Sara means by 'like the shirts'). Card dot 🟢🟠🔴 (avStat) now also for belt/shoes/bag + split sets – Sara relies on the dot to see what's uploaded without opening items.
- v88: card dot in the photo's top corner (Sara found mid-card ugly). v89: split pieces non-enumerable on D (no double counting); duplicates show once per group, gallery '👯 כפולים' with 'זה לא כפול' (SET.nd89) / keeper (SET.dk89); item 'פרומפט ל-GPT' jumps to that type's prompt + 'מה לשפר' field. Don't put <section> in dialogs (apply() breaks).
- Sara asked which screens still don't open on her phone – waiting for her screenshot.
- v90: cut89.js keeps all white – only GPT's grey background is removed ([[wardrobe-grey-only-cut]]); white items uploaded before v90 must be re-uploaded. Item window '👯 להעביר לכפולים' (manual pairs SET.dp89, picker #dp89); header 'כפולים' button got a window-capture listener.
