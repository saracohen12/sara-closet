---
name: wardrobe-avatar-5poses
description: Sara's new 5-pose avatar (front, side, back, half-side, hand on hip) for the wardrobe studio, files and plan
metadata:
  type: project
  modified: 2026-10-20T22:12:10.865Z
---

2026-10-20 Sara sent a new avatar sheet (1672x941, 5 panels on gray, Hebrew labels חזית/צד/גב/חצי צד/יד על המותן) and wants clothes shown on the avatar in all 5 poses. Part of [[wardrobe-artifact]].
Files: /mnt/project-files/closet/avatar_new/ — sheet_5poses.png, front/side/back/half/hip.png (bg removed, ~330x852 each), slice.py (panel x-ranges 0-332, 335-658, 661-1004, 1007-1306, 1309-1672; crop y<852).
Built 2026-10-20 (Sara chose GPT option): p5.js adds BASES.p5 ("חדש", cycle via 🧍 בסיס button), pose buttons in studio, item field p5 {front,side,back,half,hip} asset ids from an uploaded GPT 5-panel sheet sliced in-browser; av/p5_*.webp published. Gallery arrows/swipe on item photo, ✏️ manage with delete. Plan was: front/back = automatic overlay of existing clothing cutouts; side/half/hip need GPT to generate the avatar wearing the garment in the 5-pose layout, uploaded per item and auto-sliced in the site. Resolution is low (~830px figure); higher-res per-pose images from GPT would look better.
