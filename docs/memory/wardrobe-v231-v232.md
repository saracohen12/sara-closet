---
name: wardrobe-v231-v232
description: v231 avatar image retry + spinning "on me" picture with speed/pause; v232 cut8 rule for white/grey garments on the beige doll, SNM5K_4 re-cut
metadata:
  type: project
---
**v231 (27/10 00:19–00:25 Israel time)**
- Bug: on the phone some avatar layers failed to load the first time and r360.js cached the failure forever (head missing, only bodysuit, blank). Fix in r360.js: image queue (6 at a time), 3 tries with backoff, failed entry removed from cache, canvas repaints itself up to 5 times (again()). Tested with 40–50% forced failures: all 8 views whole on home + studio + all ready items.
- Sara asked: the "עליי" picture in every ready item's window spins by itself, slow by default, 🐢–🐇 slider (7 speeds, localStorage av230spd, default 2) and ⏸/▶. Code in av188.js (avMake builds front first, then 7 views; avBar/spinGo), styles in av188.css (.av230).
- Lesson: regenerate the build script from book3.py every time; a stale scratch copy dropped another thread's changes and the publish was refused.

**v232 (27/10 00:33)** white blouse SNM5K_4 had beige holes: white/grey garment vs the doll's lit beige differ < 40. cut8.js mask(): near the garment (dilate 30), a pixel that is neutral on the sheet where the doll is warm beige = garment. cv stays 2; other items changed only tens of pixels, so no global re-cut. SNM5K_4 re-cut by hand: 8 new assets in db items/SNM5K_4 a8[0].L.
- GPT changed the skirt too on that sheet; the site takes only the item's own kind.
- Open question to Sara: T49 has the exact same sheet as S1CNR_1 (same src sha) – probably uploaded on the wrong item.

Related: [[wardrobe-v190-cut8]], [[wardrobe-check-8-angles]], [[wardrobe-who-publishes]]
