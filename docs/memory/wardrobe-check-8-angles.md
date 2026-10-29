---
name: wardrobe-check-8-angles
description: Rule (Sara 26/10 05:33): before calling any uploaded item ready on the 360 avatar, check all 8 angles of THAT item – exact fit on arms, hands and body, no doll showing through
metadata:
  type: feedback
  modified: 2026-10-26T05:36:27.184Z
---

Sara 26/10 05:32–05:33 (screenshots of the navy lace dress T104, back view and left side view): "זה לא יושב טוב על היד אתה צריך להתאים בדיוק" / "תעבור על כל כיוון אתה חייב לבדוק על כל פריט שאני מעלה".

The rule: every item she uploads for the 8-angle avatar is checked in ALL 8 angles before it is called ready – the dress must sit exactly on the arms and hands, and no doll skin or old arm may show beside a sleeve or in front of the body.

**Why:** GPT redraws the figure a little differently in each angle (arms moved, narrower body in side views). A plain diff layer then leaves the doll's own arm/body visible next to the garment, which looks wrong on her phone.

**How to apply:** after any cut (site cut8.js or the Python pipeline), render all 8 views (cover head and wig head) and look at each one before telling her it's ready. Mention in the reply that all 8 angles were checked, and list any angle that still needs work. Related: [[wardrobe-v190-cut8]], [[wardrobe-avatar8-pipeline]].
