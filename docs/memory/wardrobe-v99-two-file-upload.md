---
name: wardrobe-v99-two-file-upload
description: v99 (2026-10-22) garment upload from Sara's two GPT files (fix99.js): cutting, background flattening, placement math, gotchas
metadata:
  type: project
  modified: 2026-10-22T19:22:47.529Z
---

v99 published 22/10: item window → "📥 בגד מ-GPT · 2 קבצים" (old upload buttons kept, just not highlighted). Dialog #two99: pick both files at once (wider = file 1: front/side/back; file 2: half/hip), preview of the 5 cuts, swap, save. Saved p5g gets av:'p6', two:1; smartFit auto-fit is skipped for two:1 (the placement already comes from the panel position).

Placement (fit99): the garment keeps where it sat in its GPT panel; T99 per pose maps panel px → stage 399×1365 through the cap-avatar sheet's own crop/scale numbers. Test with the avatar sheet itself as a "garment" lands within ~1–2% pixels of the avatar (tests/v92/t99.js).

Gotchas found:
- tieCutPanel's bbox uses alpha>0.08, so faint specks at the panel edges made the crop the whole panel (garment 1.7× too wide). trim99 keeps only rows/cols with ≥3 solid pixels.
- GPT backgrounds have soft light spots (file 2 light blue, spots up to L+20) that the cutter kept as garment. flat99 floods from the edges over pixels with the same hue as the background and smooth steps, and paints them flat background before cutting. Closed gaps (arm on hip) are seeded only on a tinted background. Brighter pixels need a smaller step, so white garments stay (grey-only rule, [[wardrobe-grey-only-cut]]). If the flood would take >97% of a panel it is skipped.
- A light-grey garment on a grey background still fails, which is why the prompt asks for light green behind grey garments.

Sources: /mnt/project-files/closet/src_changes/v99. Related: [[wardrobe-two-file-sheets]], [[wardrobe-v96-new-avatar]].
