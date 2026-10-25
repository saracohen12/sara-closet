---
name: wardrobe-v110-arms-layer
description: v110 (2026-10-22): forearm/hand layer cut from Sara's own avatar picture is drawn above skirts so her hands aren't hidden inside the skirt
metadata:
  type: project
---

Sara: "למה היד בתוך החצאית" / "בכולם יש בעיה עם הידיים". A wide GPT skirt (z 10) covered her hanging hands in all 5 poses.

Fix (v110):
- The arm layer comes from her own avatar picture only ([[wardrobe-avatar-only-rule]]). S/arms/arms.py builds av/p6[cw]_arms_{view}.webp (399×1365) like this:
  - Start from the avatar alpha.
  - Remove the bodysuit mask, dilated by 3.
  - Keep only rows from suit top + 9% of height down to the suit bottom.
  - Run an opening, then keep components of at least 600 px and at least 120 rows tall (this drops a knee strip).
  - Blur the edges by 0.8.
- book3.py copies these files.
- In fix100.js the stageInner wrapper adds `<img class="sh arm110">` at z = SLOTZ.skirt+2 (12), through stageAdd. It only does this when a skirt is worn and there is no dress or set.
- It sits below tops (30) and dresses (20), so long sleeves still cover the arm.
- Not solved yet: a top's body still covers the arm in the side view, and dresses have no arm layer.
- Published with root=build/pub and the 10 arm files.
v116 (22:30): Sara said that in the side and half-side poses her bottom stuck out behind the skirt. Fix in fix114.js (clip116): a stageInner wrapper, used when a skirt is worn and there is no dress or set.
- It draws the skirt's alpha at its stage placement (parsed from the img style).
- In the avatar (sb, av/p6*), it erases pixels that the skirt doesn't cover, only in the band from 6% to 50% of the skirt's height. Lower down it leaves the legs alone, so legs seen through a lace or sheer hem still show.
- The result replaces the sb src with a webp dataURL, cached per avatar, skirt and placement.
- The hands come back from arm110.
- Tested with T147 (black skirt with discs) and T156.
v117: clip116 replaced the sb src with data:, so the v115 CSS selector img.sb[src*="av/p6"] stopped matching. The body fell back to object-fit:contain centred, and the face and arms were doubled again (Sara 22:38). The clipped sb now gets data-p6="1", and the CSS matches [data-p6]. Lesson: a check of element rects doesn't catch object-fit offsets. Check computed object-fit/height, or compare the pixels.
