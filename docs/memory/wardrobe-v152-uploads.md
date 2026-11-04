---
name: wardrobe-v152-uploads
description: v152–v158 (24/10) closet: merged orders-thread data releases, phone upload diagnosis (Claude in-app view), autoCrop fix
metadata:
  type: project
---

v152 (24/10) by orders thread: orders123/ui/book4_tpl/book3.py merged into src/work. Next = 153. v153 (orders thread, Shein MU5B data) merged too. Next = 154. v154 (Shein 2QB0) merged. Next = 155. v155 (NB85 belt, NORET) merged. Next = 156. v156 (3 belt orders) merged. Next = 157.
v157 (24/10, mine): fix157.js logs upload steps to uplog k:'step' and shows 'פתחי ב-Chrome' when the picker never opens. Sara's 'stuck' uploads were the Claude in-app view. identify() has time limits and saves her photo on the picked item. The orders thread's book3.py uses '<SCRATCH>' paths, so sed them to S before building. v158: autoCrop grows the run through the photo bg between black gallery bars (two belts and a thin chain were cut to one part). Test: tests/sh/tcrop2.js (old vs new crop on uploads/hearth). Item docs: ArtifactData data = the doc fields, never wrap them in data:{}. Next = 159. v159: rect159 in autoCrop for the Shein dark gallery (framed photo over a dimmed page, the brown lace scarf SMU5B_15). Step-log cap 300. Tonight's 33 uploads were checked, and only SMU5B_15 needed a re-crop (set as main). Next = 160. v160 (orders thread: photo filter row) merged. Next = 162 (v161 = general list).

Related: [[wardrobe-v148-autofit]], [[wardrobe-v123-orders]], [[wardrobe-artifact-gotchas]].

## Also in the "החדש" project copy (merged 4/11 from claude_code_cloud export)
v280 (28/10, Sara: "חותך לי את התמונה באמצע… בכל האתר, לא רוצה שיחזור"): autoCrop's column bestRun cut a Temu photo in half (black dress = flat columns). Now sides are trimmed only from the edges where the column is flat AND phone-coloured (lum<40, >242 or the bars' colour); top/bottom grow back while a row is <80% phone colour. recrop279 (imgup.js) re-cuts old c:1 mains from their raw copy in the background (15 per run, rc279 flag, replaces only when shape differs >6% and the new cut is a crop). Test: scratchpad crop279/run.js + sheet.py over pub/cr screenshots.
