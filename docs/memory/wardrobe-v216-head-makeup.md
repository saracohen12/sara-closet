---
name: wardrobe-v216-head-makeup
description: v215–v218 (one makeup prompt + upload), (26/10) wig/hairstyle head placement, makeup fitted onto wigs (colour delta, 1.7x), beige hair-rim fix, big studio makeup tiles with close-ups
metadata:
  type: project
---
Closet artifact HY6no4fCJwNunBtm6GVA8V. This continues [[wardrobe-v213-cut-faces]].

**v215 (16:20 "פרומפט אחד שיכין לי שתי תמונות ... תעשה לי סדר"), artifact version 216:** Sara's flow for makeup is now ONE prompt and ONE upload.
- sty199p `mkBoth(n,det)` (cards, viewer and add-panel use it) asks GPT for 2 pictures in one answer: 1) the doll sheet with the makeup (dresses the avatar), 2) the close-up (cover right, wig left). The attachments are the doll sheet and her wig.
- 📤 takes several files. `isSheet()` decides by ratio 1.25–1.42 plus a white line across the middle row; her sheets score ≥.97, the close-up 0.
- The sheet is cut; the close-up is saved as doc.cu (it is kept when the sheet is replaced). A close-up alone (`cuOnly`) is attached to the existing doc, or else becomes a doc with 8 empty L.
- The grid buttons show only where MKG exists. The cat180 tile picker lists her close-ups.
- Her first close-up ("טבעי לגמרי") I uploaded: doc smvpb47r10.cu.

**v216 (16:55 "איפור ... אני רוצה את זה עם פאה"):** the makeup tile (styFrames for mk) now turns with hairHead() plus fitted makeup. Her first wig 'w' now also gets makeup (fitted). Artifact version 217.

**v217 (17:14–17:17 "איפה האיפור / הראש לא יושב במקום"), artifact version 218:**
- Pasting the doll's face looked like another face on the wig. Now `mkDelta` adds only the colour difference (doll+mk − doll, oval, box-blurred twice) through the fit.
- `headT`: wig 'w' and hairstyles in views 0, 1, 7 are drawn upright and shifted by their raw fit (rawHead flag; scale kept at 1, because NCC scale ~0.9 made heads too big). Profile fits were wrong (floating head), so the side and back views stay raw.
- Her "יומיומי עדין" makeup is very faint already in GPT's sheet.

**v218 (17:28–17:31 "צל צהוב, לא גזור טוב / האיפור לא מתיישב / תגדילי את הקוביה, בתקריב"), artifact version 219, commit e54a669:**
- The "yellow shadow" was a beige rim from GPT's body/top along the hair edge below the neck. cut8 maskWhole now fades edge pixels (3 px) that are lighter than the hair core within 6 px (rows ≥ nk). CVW=5, so her browser re-cuts hairstyles and ties.
- mkDelta removes GPT's overall warm tint (the mean delta) and shows the makeup 1.7×.
- In the studio the makeup row (.r3mk) has big tiles, two per row. styThumb for mk uses `cuThumb` (left = wig half of the close-up, 320 px) when STY[k].cu exists (STY now keeps cu); without one it shows the cover doll 'c' with the native makeup, at 200 px, which is still blurry.
- Tests: scratchpad h/cut218.js, head218.js, studio218.js.

**v219 (17:43 "למה השיער באוויר ולא צמוד"), artifact version 220:** in the side views (2 and 6) GPT's back sits further back than the doll's, so the cut hair floated. cut8 `snug()` (hair only) moves the hair behind the doll's back (taken from the a8/c alpha) forward, row by row, until it touches. The shift is at most 24 px, smoothed over ±5 rows. CVW=6. The wig 'w' was already close to her back.

**v220 (17:52 "עדיין צל צהוב, לא טבעי"), artifact version 221:** the rim fix now also recolours: a hair edge pixel (4 px) nearer to the bare doll's pixel (GPT's beige top or backdrop) than to the local hair mean takes the hair colour and fades. Above the neck only where the doll had backdrop. snug() is one smooth bilinear shift (±10 rows, ramps 16 px into the body). The light line at the chin in side views was a strip in a8/ch3, ch7, nh3, nh7 (removed). **Gotcha:** a8 files are separate published files, so publish them with `files`. CVW=7.

Related: [[wardrobe-v213-cut-faces]], [[wardrobe-parallel-sessions]].
