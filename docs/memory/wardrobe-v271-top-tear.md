---
name: wardrobe-v271-top-tear
description: v271 (27/10) torn/smeared tops on the 360 avatar – cause in cut8 slide(), the no-tear fix, and auto re-cut of tops via cut8.cvOf
metadata:
  type: project
---
Sara 27/10 22:51: "התמונות מרוחות ולא גזורות טוב" (velvet top T8151206_2 torn into sideways bands near the hand on hip).

Cause: cut8.js slide() fitted a top's left/right edges onto the doll's edges row by row, but rows failing its tests (k range, smoothing count) were left unmoved while neighbours moved → horizontal tears. Every top/base/sweater had some (hems, cuffs, elbow).

Fix v271 (commit 16e5949, artifact version 271): per-row left/right shift is measured, outlier rows (>6 px from 15-row median) dropped, gaps interpolated, ends fade to 0 over 12 rows, box-smoothed, then capped to 1 px change per row. Columns between doll edges lerp the two shifts; outside them the edge shift is constant.

Re-cut: cut8.cvOf(kind) = 3 for TOPK (top/base/sweater), 2 otherwise; av188 stale() and new parts use it, so all 32 top parts re-cut by themselves on site open (old L files become orphans for the daily cleanup).

QA tools in session scratchpad (lost after session): cut271.js, runall271.sh, cmp271.py (old/new side by side). Before/after pictures: project-files/closet/v271/.
Related: [[wardrobe-v267-analysis]], [[wardrobe-avatar8-pipeline]].
