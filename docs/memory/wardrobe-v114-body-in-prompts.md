---
name: wardrobe-v114-body-in-prompts
description: v114 (2026-10-22): body lines measured on the avatar + the item's real length go into every garment prompt; length check on 2-file upload; dbg114 beacon; prompts page v7 pinned
metadata:
  type: project
  modified: 2026-10-22T21:55:29.029Z
---

Sara (21:46): "write the body measurements of the avatar into the prompt, it must match exactly, I want to succeed in one go." Then (21:49): "bring all the prompts here and keep them fixed".

v114, in src/work/fix114.js (after fix102 in book3.py):
- body114(id) adds a block before "חשוב:" in pr102. Body height (cap top to soles) is 100%. Shoulders 20%, waist 37% (the bodysuit seam), waist width 15% (front/back) or 12% (side/half), hips 50% and 21% wide, knee 74%, mid-calf 84%, ankle 95%. It also has her cm from ME().
- These come from p6c_sheet1/2 and the suit masks (BODY105).
- The old meText91 guesses (waist 40%) were wrong.
- Item length is IT[id].len114: knee 58, mid 74, ankle 88, floor 97 (cm from the waist), or a number.
- If not set, the length is guessed from the name (ארוכה→ankle).
- The length is chosen in the #g106 window and in #two99 (.len114 row).
- #two99 shows "📏 האורך שיצא" from fitSkirt105 for skirts, with a warning if it is off by more than 10 cm.
- fix102 is wrapped in a { } block, so its functions can't be wrapped from outside. Hooks are window.after106(d), window.G106, window.paint106 and window.copy106.
- Beacon: a stageInner wrapper writes feedback/d114… docs {kind:'dbg114', id, v, tf, fit, img style}, up to 12 per page load, for two:1 garments. Read the feedback collection to see what her browser actually places. It was added because her T156 skirt shows small and low but my tests show it at the waist.
- Prompts page N7e2QR7GghzC89Cc2F153a v7: the garment prompt has the BODY block and a length fill-in. Pinned to her sidebar.
- Source: S/prompts94/avatar_prompts.html.

Related: [[wardrobe-v105-skirt-body-fit]], [[wardrobe-one-message-prompts]].
v115 (22:10) – ROOT CAUSE of "skirt small and low" and "doubled face/arms":
- The published page skeleton adds img{max-width:100%}. Garments with fit w>100% (wide skirts, w≈158) were squeezed to 100%, so they came out 0.63× size around the same centre, which reads as small and low. My local tests served index.html without the skeleton, so they never showed it. Always inject the 'img{max-width:100%}' style in tests (tests/v92/t115.js).
- Fix: img.sl/.sb/.sh, #sstage img, .mst img {max-width:none!important}.
- Doubled face/arms: in #p5all, .mst had a 2px border with border-box, so the box was 1% taller than 399:1365. The body (sb, object-fit contain, centred) and the head/arm overlays (sh, top-aligned) were drawn 2–3px apart. Fix: content-box, plus p6 sb/sh at top:0 width:100% height:auto.
- Found through the dbg114 beacon: her tf and style matched mine exactly, so the problem had to be in CSS.
- Her T156 then had a new file 1 but the OLD file 2 (half/hip). I cut her new file 2 with the site code (t156b/exp.js), uploaded half/hip, and wrote all 5 fits. Item version 23, p5g.t 1792707400000.
v118 (22:41): Sara's dot rule: 🟢 means the item has a p5g or a p5gv variant with av:'p6' and all 5 poses (the new avatar). 🟠 means it has only an old 5-pose (p5g without p6, or p5). 🔴 means nothing.
- avStat is wrapped at the end of fix114.js. Parts follow the same rule. Scarves, jewelry and manual marks without garments keep the old status.
- avCounts in ui.js keeps a closure on the OLD avStat, so it was redefined (window.avCounts plus the global).
- The template titles were changed too.
