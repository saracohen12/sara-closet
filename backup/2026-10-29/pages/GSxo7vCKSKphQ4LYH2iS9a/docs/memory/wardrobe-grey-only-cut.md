---
name: wardrobe-grey-only-cut
description: Sara's rule (2026-10-22): when cutting GPT sheets, remove ONLY the grey background – every white in a garment/covering is a real colour and stays
metadata:
  type: feedback
  modified: 2026-10-22T13:38:41.865Z
---

Sara's words: "GPT שם רקע רק אפור. כל מה שלבן אתה לא מוריד... כשאתה גוזר מ-GPT רק את הרקעים האפורים. השאר זה הצבעים הנורמליים."

**Why:** until v89 the cutter (ties.js tieCutPanel, rule `L>bgL+8` → transparent) erased white fabric: her white floral dress, ivory dress and white coverings came out with holes. She called it a very serious bug.

**How to apply:**
- cut89.js (v90) is the cutter: flood-fill from the panel border over pixels close to the sampled grey background; anything brighter/whiter than the grey is fabric. Never reintroduce brightness-based alpha.
- Test any cutter change on her sheets (scratchpad build/pub/_wd.png, _wd2.png; tests/v77/cut89.js, tie89.js) – white must stay opaque.
- Old uploads were saved already cut; the fix only helps re-uploads.
- Complements [[wardrobe-avatar-only-rule]] (cutting her GPT sheet's grey is allowed; nothing else is processed).
