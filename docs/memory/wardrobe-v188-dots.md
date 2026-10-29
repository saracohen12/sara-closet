---
name: wardrobe-v188-dots
description: Closet v188–189 (26/10): avatar uploads only to the new 360 avatar (IT.a8up); white dot = ANY photo she uploaded, white+green = ready
metadata:
  type: project
  modified: 2026-10-26T00:12:13.521Z
---

Sara 26/10 00:01: avatar photo uploads in the closet should go ONLY to the new (360) avatar. Card dot: white = she uploaded pictures for the avatar, white with green centre = also prepared/dressed on the avatar ("הרעיון שאדע שזה בוצע"). No dot = nothing yet.

Closet v188 (artifact HY6no4fCJwNunBtm6GVA8V, artifact version id 1792973511-d48c, commit bd59bfd on branch claude/project-thread-6oxwf5), files work/av188.js + av188.css:
- Item window: one bar ("✓ מוכן על האווטאר החדש" / "⏳ הועלו N תמונות…" / "✗ עוד לא…"), thumbnails with ✕, "📤 להעלות תמונה מ-GPT לאווטאר", "📋 הפרומפט ל-GPT". The old 5-pose upload is gone; old [data-m77up] buttons open R360.make.
- Uploads are stored on the item: db collection `items`, field `a8up` = [{a: asset id, t, n}]. Read the image with Artifact read path=<a>.
- 'ok' (green) = id is in READY in work/r360.js. After cutting her upload into 360 layers, add the id to READY → the dot turns green.

v189 (26/10 04:39, she said the white dot was missing on many items): white = ANY photo she ever uploaded for the item – img/imgs/pics, old 5-pose p5g/p5gv/p5g118, or a8up (190 items on 26/10). The point is she never reopens an item to check. Artifact version id 1792989812-86c1.

**How to apply:** when Sara says she uploaded avatar pictures, list `items` docs with `a8up`, process them per [[wardrobe-avatar8-pipeline]], then add to READY and republish.
Open question (asked 26/10): the closet's 360 studio still uses the new cover doll, while the 360 page went back to the old smooth avatar ([[wardrobe-avatar8-new2]]).
