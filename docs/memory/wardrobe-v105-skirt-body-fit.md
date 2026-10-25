---
name: wardrobe-v105-skirt-body-fit
description: v105 (2026-10-22): GPT ignores the avatar picture size, so skirts from GPT are placed by her body (waist line, waist width, same length), and cut at the gaps
metadata:
  type: project
  modified: 2026-10-22T20:49:08.851Z
---

Sara's first real GPT skirt (silver velvet) came back as 1136×1385 + 1045×1505 instead of the avatar sizes (1536×1024, 1254×1254). The v99 position fit (fit99, T99) made the skirt huge, up to her neck, and the equal split cut the file-2 skirts at the sides. She said: "זה לא נראה אותו גודל, תבדוק לפני שממשיכים".

v105 changes, all in fix99.js:
- split105: the panel borders go in the emptiest column near the equal split (±22%).
- File order: the wider image is file 1, in any order.
- For skirts, fitAny105 → fitSkirt105:
  - BODY105[v] = [waist row, waist left, waist right, head top, soles] in stage px, from the p6c suit masks at 37% of body height.
  - The waistband width (band105, rows 2–7% of the piece) is scaled to 1.05 × her waist width.
  - All poses get the median length, clamped so the hem stays above the soles.
  - The top goes at the waist minus 1.5% of body height.
- Other types still use fit99. Dresses and tops anchored by the shoulders are not done yet.
- pr102 got two lines: "same size and length in all 5 poses" and "don't change the picture sizes".
- Test: tests/v92/t105.js with her files s105_1.png and s105_2.png.

Related: [[wardrobe-v99-two-file-upload]], [[wardrobe-one-message-prompts]].
v111: Sara used the old "🔄 החליפי" upload (imgup → upP5gMany → upP5g, one-file 5-panel cut), and her 2 GPT files came out cut in half. Now window.upP5gMany and routeUp's p5g/p5gadd modes call open99(id,add) + files99, so every 5-pose upload uses the two-file window. ("p5gadd" pushes a new variant.) Her velvet skirt is T156: I cut her files with the site code in playwright (S/t156/exp.js), uploaded 5 assets, and wrote p5g plus p5gv with the old variants kept.
v112: a look keeps per-pose sizes in tf (pv, x/y/w with pvv, uk, sx…). After a re-upload the stale numbers made the new skirt small and low. A stageInner wrapper at the end of fix99.js resets them when tf.g112 differs from p5g.t (only for two:1 garments): it clears pv/pvman/af/sp96/uk/sx/sy/bw100 and sets x/y/w/pvv from g.fit of the current view. Note: front/back use tf.x directly, so never leave tf.x null.
v113: the real cause of "still small and low" was that her look pinned tf.gv to the OLD-avatar variant (ישנה, 15:00), so the new upload never showed. The fix99 stageInner wrapper now moves tf.gv to the active p6 p5g when the pinned variant is not av p6. smartFit returns false for any two:1 garment, including ctx/force calls from the all-poses window drawPose. 📐/#sreset/[data-fit] on a two:1 garment set tf.g112=0, which resets all poses. Test: tests/v92/t113b.js loads her real T156 record and routes the blobs to S/t156 pieces.
