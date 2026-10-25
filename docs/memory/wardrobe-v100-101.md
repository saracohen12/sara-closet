---
name: wardrobe-v100-101
description: v100–v102 (2026-10-22): garments not clipped at avatar box, bodysuit colour picker (masks), belt auto-wrap, belt/necklace prompt rule, all-pictures picker
metadata:
  type: project
  modified: 2026-10-22T20:03:34.516Z
---

v100: #sstage had overflow:hidden at the avatar's own box (399×1365 width), so an enlarged skirt was cut at the sides. Now the stage is overflow:visible and frPlace93 (fix93.js) sets a clip-path inset with negative values = inside of the white frame (#fr93). The 🔍 window (.fr93w) clips at .in. Sara: "only the white square is the limit, for all garments".

v101 (fix100.js):
- Bodysuit colour: "🎨 בגד גוף" button after #shead, plus a row in the base chooser. Colours are BASEC plus "צבע אחר" (input type=color). Stored as ST.base.suit (per look) and SET.suit100 (default for looks without their own). The stageInner wrapper swaps av/p6[cw]_{view}(_neck).webp for a canvas-tinted dataURL (luminance shading keeps the folds).
- Masks av/p6c_suit_*.png and p6w_suit_*.png are grey L-mode PNGs. They came from saturation (the suit is less saturated than skin) plus a skimage watershed (S/suit/mask2.py). Wig masks are the cap mask minus the hair (wigmask.py). Sources are in src_changes/v101/suit.
- Belt wrap: once per view per look (tf.belt.bw100[v]={k,dx,sig}), unless tf.pvman[v] is set. It measures the full suit-mask width at the belt row plus the runs of top/dress/skirt/set/vest around the centre, then stretches the belt with scale(sx*k) and shifts left by dx (applied in stageInner). k is capped at 2.6. It recomputes when the under-garments change.
- Prompts: belt = in each pose only the half facing the camera, full waist width. Necklace = only the part seen from the front; the back part and clasp are not drawn (jw.js).
- Tests: tests/v92/t100.js needs a fake p5g whose URL contains 32 hex characters (srcAllowed/avIds), and clip100.js.

v102 (fix102.js): the big view (#zoomd) flips through all102(id) = galList + store photo + it.imgs + every p5g variant pose (‹ › RTL: left = next, swipe, arrow keys, counter at the bottom). "🖼 כל התמונות (N)" under the photo in the garment window and "🖼 הכל" in the zoom open #pk102: thumbnails with ✓, select all, ⬇ download (downloads.save one by one, else <a download>), 📤 share (navigator.share files → ChatGPT on the phone), 🧩 one collage JPEG with numbered labels.

Related: [[wardrobe-v99-two-file-upload]], [[wardrobe-v96-new-avatar]], [[wardrobe-v93]].
