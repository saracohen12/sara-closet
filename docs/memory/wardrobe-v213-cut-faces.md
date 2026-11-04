---
name: wardrobe-v213-cut-faces
description: v213–v215 (26/10) hairstyle/tie cutter fix + background re-cut (cut8.CVW=4, hair first), makeup cards = two big faces (cover/wig) fitted onto each head, GPT close-up (doc.cu)
metadata:
  type: project
  modified: 2026-10-26T13:57:27.939Z
---
26/10/2026, closet artifact HY6no4fCJwNunBtm6GVA8V, v213 = artifact version 214, commit 224f356.

**Cut fix (Sara 15:36 "התמונה של השיער לא נגזרה טוב"):**
- cut8.js `maskWhole` (hair/tie/tiex) now drops light-blue backdrop blobs, thin body-edge strips (opening below the neck) and pixels too close to the doll, keeps only parts touching the head zone, and fills holes in the hair.
- `cut8.CVW=3` marks the whole-head cutter version. `CV:2` stays so av188 doesn't re-cut clothes.
- sty199.js `recut()` re-cuts any hair/tie doc with cv<CVW from its own `src` sheet, one at a time, in the background after the styles snapshot. It writes new L (and M for ties) with cv 3. Old assets stay.

**Makeup faces (Sara 15:44–15:45 "רק את הפנים שלי, בתקריב גדול", "שתיים בכל שורה ... פרצוף עם כיסוי ופרצוף עם פאה"):**
- Makeup tab: dialog class `w213` (900px), `.syg2.mk2` = 2 columns, each card `.sycim.fc2` holds two `.syfc` faces. On a phone (≤560px) the faces stack. The viewer (#sty204v) shows the two faces big (`data-big`), then the 8 angles.
- r360 `styFace(k,h,{big})`: h 'c' = her default tie (grey), h 'h' = the hairstyle she wears in the studio, else her first hairstyle, else the wig 'w'. Crop [130,8,96,112] of view 0, ×3 (×5 big).
- **Gotcha:** a tie/hairstyle/wig head is a GPT redraw; its face is moved, turned and smaller (her hairstyle was 0.925 scale, -5.5°). The makeup layer alone doubles eyes and mouth. `fitFace` (NCC search over dx, dy, scale, turn) lays the doll's face plus makeup in a soft oval (FC=[176,66,22,25]) onto the head's face. Cache: FIT[hk|layer url], exposed as window.FIT213.
- v216 fixed the studio too: layersFor sets L.fit on whole heads, and paint() calls mkFit (views 0,1,7 only, score≥.6; side/back views showed beige cover patches).

**Test:** scratchpad h/face213.js (`cut` phase cuts her real sheets in the page into pub/_blob/t213_*; `show` phase opens the makeup tab). FJ=face213b.json adds a fake red/purple makeup; face213c.json has no hairstyle, so the wig fallback is used.

**v214 (15:57 "עדיין יש חורים", 16:00 "מפוקסל ... תמונת תקריב אחת"), artifact version 215:**
- Her hairstyle hadn't been re-cut yet (recut started with the ties). The v213 cut also left a see-through line at the nape: the neck fade now applies only to light skin (lum>150), and every pixel 3 px inside the mask is fully opaque. CVW=4, and hairstyles are re-cut first. Her browser re-cut it at 14:06 (doc v3, cv 4), and I checked the back views: clean. 8 spare layers I uploaded (hair_v214_*, ids b29eee98…) are unused.
- **Gotcha:** a `//` comment pasted mid-line in recut() swallowed `if(!x)return;RC.add…` and caused an endless loop. Keep comments at the end of the line.
- Makeup "🔍 תקריב חד" on each uploaded makeup: sty199p `faceCU(n,det)` asks for one landscape picture with two portraits (right = cover, left = her wig, wig sheet attached), in the same GPT chat. 📤 saves `cu` (asset, ≤1600px JPEG) in the styles doc, and the card and viewer show it instead of the doll faces. Honest limit: GPT's picture size is fixed, so faces on the 8-angle sheet stay about 50 px.

Later (v215–v218, head fit and makeup on wigs): [[wardrobe-v216-head-makeup]].

Related: [[wardrobe-v209-base-rename]], [[wardrobe-v206-styles-hide]], [[wardrobe-parallel-sessions]].
