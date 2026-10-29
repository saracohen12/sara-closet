---
name: wardrobe-v233-cut-notes
description: v233 cut8 learns the garment's own colours (cream/beige on the beige doll), optional "הערות לגזירה" box + "✂ לגזור שוב עם הערות" in the item window
metadata:
  type: project
---
**27/10 07:07 Israel time.** Sara's cream blouse SNM5K_5 came out with beige doll patches and torn views. The v232 rule only catches neutral (white, grey) garments; cream is warm like the doll.

**Fix (cut8.js palette()):**
- Confident garment pixels (erode 2, diff>48) give 6 Lab colours by k-means. Lightness counts half, and the start is the L quantiles, so the result is deterministic.
- Near the garment (dilate 30), a pixel joins the garment when dB (distance to the doll under it) > 2.5 and dG (distance to the nearest garment colour) < .4·dB.
- Clothes only (not head or small modes). cv stays 2.
- The other dynamic items changed by about 0–3%.
- A Python port of mask() for fast prototyping is in the session scratch (proto/); it matched the JS pixel counts exactly.

**Notes:**
- IT[id].a8note is the notes text. Each cut part keeps it as a8[j].n.
- cut8.run(src,kind,onStep,{note}) reads keywords with cut8.flags():
  - light (לבן, שמנת, קרם, בז׳, בהיר…) sets minB 1.5 and ratio .5.
  - sheer (שקוף, תחרה, שיפון, רשת, טול) sets minB 1.2, ratio .6 and near 40.
- cut8.says() returns the Hebrew "✓ הבנתי" line.
- Text the site doesn't understand is still saved, so read a8note in the db when Sara says a cut is bad.
- The item field `note` is a separate thing (her general item note).

**UI (av188.js):**
- The notes box sits above "📤 להעלות תמונה של 8 זוויות".
- Ready items with src get a `<details class="a8re">` box: "✂ לגזור שוב עם הערות" → recut(id). It re-cuts every part from its src.

**Re-cut:** SNM5K_5 was re-cut by hand and its db a8[0].L was updated (doc version 16).

Related: [[wardrobe-v231-v232]], [[wardrobe-v190-cut8]], [[wardrobe-grey-only-cut]]
