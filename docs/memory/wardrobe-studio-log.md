---
name: wardrobe-studio-log
description: Summary log (v43–v77) of Sara's wardrobe studio – 5-pose garment renders, heads, jewelry, fit tools, and where each feature lives
metadata:
  type: project
  modified: 2026-10-21T22:41:40.085Z
---

Sources + README per version: /mnt/project-files/closet/src_changes/. Upgrade plan doc: https://claude.ai/artifact/DPYGWjWC7SDTAdEjzCU55V
- v43–v51: p5g.js garment-only 5-pose renders (GPT sheet → split → IT[id].p5g{front,side,back,half,hip}), per-pose placement tf.pv, p5gv colour variants, head+hair overlay above garments.
- v52–v57: avatar base chooser, '⋯ עוד' menu, readiness dots, jewelry jw.js (necklace/earring/bracelet by landmarks), hosiery/hairacc slots. Sara wants the request/done/open table ([[sara-task-table-rule]]).
- v58–v67: jewelry from 5-view sheets, draggable parts, garment width/height/slant sliders (tfStr), neck overlays for open necklines.
- v68–v70: shared canvas renderer, smart fit per pose (rule70 smartFit), collar back cut at display for front+half (neckCut), avatar-only rule ([[wardrobe-avatar-only-rule]]).
- v74–v75: edit74.js – editable "כל התנוחות", base-shirt slot with display-time tint, eraser tf.er[view], necklace rotate.
- v77: see [[wardrobe-v77-upgrades]].
Still open from the plan: batch GPT-sheet upload, back/hip + waist fit, auto QA page, swipe garment→next item, voice search, lazy-load studio, weekly board/event album.
