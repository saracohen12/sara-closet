---
name: wardrobe-v206-styles-hide
description: v206–v207 (26/10) styles library: Sara's 20 detailed ties + her 30 hairstyles for her wig, 🗑 hide/↩ restore, full-prompt reader, new wig sheet
metadata:
  type: project
---
26/10/2026, Sara's closet artifact HY6no4fCJwNunBtm6GVA8V, files work/sty199.js + sty199p.js + sty199.css (commits 18a96fe v206, then v207).

**Ties (v206, Sara 13:33):** her old tie prompts gave near-identical results, so she sent 20 detailed ones. They are `TIES=[name, "Tying Style Details: <EN name>. <prompt>", her Hebrew "how to tie"]`.
- Preset keys are now `w0..w19`. Her 7 ties already uploaded (p `t0..t6`, plus "קשירה 3") show after the 20 new ones, marked "מהרשימה הקודמת".
- The tieW wrapper adds the how-to text plus "the shape is the point: height, knot, number of tails, where they fall".
- Removed from her text: transparent background / 8k / jawline cut; "sheer" (#12); gloss (#14).

**Hairstyles (v207, Sara 13:47 + 13:53):**
- Her wig is now an 8-angle sheet. It is `work/a8/wig_ref.jpg` (the "⬇ הפאה שלי" button), original at closet/avatar8/wig8_hairstyles_2610.png; the old wig is wig_ref_v199.jpg.
- She sent her OWN 30 hairstyles for that wig, in 3 groups (`HAIRG`). `HAIRS=[name, EN, her Hebrew, "מה חייב להיראות" spec I wrote per view]`, with keys `g0..g29`.
- hairW takes ONLY the hair from the wig sheet (not face/clothes/background). Length follows the wig unless the style says otherwise.
- Her "base prompt" (a close-up portrait of a 44-year-old woman) was NOT used: it makes a new photo, not the doll sheet the site cuts. Only its "Wig details" line went in.

**Hide (Sara: "אם יש דגם שאני לא אוהבת תן לי אפשרות להסיר אותו"):**
- 🗑 on every card hides it. Data: db `stylehide/all {k:[preset keys | 'id:'+docId]}`. Nothing is deleted.
- A hidden doc is also left out of R360 (push filters it).
- "↩ מה שהסרתי" at the bottom of each tab restores it, and the toast has "ביטול".

**Reader:** "📄 לקרוא את כל הפרומפט" in each card's details opens #sty204v with the whole prompt (unicode-bidi: plaintext).

**Gotchas:**
- imgup moves #toast into the open dialog, and paint() replaced innerHTML, which killed the toast. paint() now re-appends it.
- Test: scratchpad h/flow207.js mocks the db via defineProperty(window,'claude') with in-memory collections (styles from the live dump).

Related: [[wardrobe-parallel-sessions]], [[wardrobe-ties]].
