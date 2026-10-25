---
name: wardrobe-avatar-only-rule
description: Hard rule from Sara (2026-10-21): the avatar shows ONLY avatar pictures she uploaded – never closet/product photos, never images the site processed
metadata:
  type: feedback
  modified: 2026-10-21T19:52:59.545Z
---

The studio avatar may show only avatar pictures Sara uploaded herself (p5g/p5gv GPT sheets, ties, jw). Never product/closet ("book") photos, never cut-outs or background removal done by the site. She removes backgrounds herself in GPT. Part of [[wardrobe-artifact]].

**Why:** v69 showed a product photo on the avatar's back; she called it a very big mistake ("חוק בל יעבור") and said everything I removed backgrounds from looks bad.

**How to apply:**
- rule70.js (last in HUB) filters every `<img class="sl…">` by `srcAllowed(id,src)`; items without avatar pictures show an "📤 עוד אין תמונת אווטאר" note instead. Don't weaken it to make tests pass.
- Display-time only cleanups are OK (hiding GPT labels, cutting the collar back via cleanP5 → blob URL); never upload processed copies over her images. v52 `p5gRecheck` (background re-upload) was disabled in v70.
- autoFill/suggestions use only avatar-ready items. On 2026-10-21 only 23 garments, 3 scarves (T162, S11QS_6, SMLFE_4), 5 jewelry had avatar pictures.
