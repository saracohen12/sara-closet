---
name: wardrobe-v252-batch-cover-cu
description: v252–v253 (27/10) multi-product GPT ZIP per category, bag half-body close-up (half-8), cover cards/picker/home tile show the turning tie close-up, dialogs now scroll
metadata:
  type: project
  modified: 2026-10-27T16:26:47.109Z
---
Closet artifact HY6no4fCJwNunBtm6GVA8V. v252 = artifact version 252, commit 6ffd6dd. v253 = artifact version 253, commit 61e142b. Ledger rows 491–495.

**v252 (Sara 18:02):**
- Bags: outs(bag) = sheet + cu {half:1}. `half8()` in gpt250 builds half-8.jpg in the page from a8/sheet.jpg: crop 280×330 at x 175 per panel, ×2, white 6px lines. The ZIP adds half-8 when needed.
- Batch: "📦 כמה יחד" in the item box and the GPT window. `bOpen(id)` → picker of the same category (up to 8, not-on-avatar first). Then a list with ⚙ per-product questions (B.from → "↩ לרשימת המוצרים"). One ZIP holds pN-item-M.jpg + the shared files, and `bPrompt` states the general rules once.
- Upload uses `assign(ids, fs)` over targets(ids). Close-ups are picked by top cuKind score (> .3).
- Fix: dialog#g250 scrolls on phones.

**v253 (Sara 18:15):**
- Her bug "can't pick other things": the template has `dialog{overflow:visible}`, so the cat180 picker never scrolled. cat180 now runs a 500ms safety net that sets overflowY auto on any open dialog taller than its box.
- tie202 `cuFace253(id)` = the active tie's cu8 close-up.
  - Cover cards (.card .ph img → data-c253, data-th removed so thApply won't override) turn on hover.
  - The cat180 picker shows the close-up.
  - Category tile mode: default close-up, SET.catPic 'a' = whole doll, 'p' = photo.
  - Touch turns once.
- Tests in the scratchpad: t252.js, t253.js, t253d.js (hover via dispatched events, since local cards are collapsed).

Related: [[wardrobe-v250-gpt-zip]], [[wardrobe-v208-catcover]], [[wardrobe-v247-tie-zip-face8]].

**v254 (artifact version 254):** her plum scarf S17QJ_9 has a8 k 'scarf' (an av188 upload, not one of its tx), so no active tie → no close-up. tie202 cuOf now falls back to the first tx with cu8, then any cu (cards, picker, home tile, homeCu, item gallery). The batch picker shows 📷/360 lights (same rule as the card .ind247) in 3 groups: todo / no photo / already 360 (dimmed).

**v255 (artifact version 255, Sara 18:58):** long dresses (e.g. T155) were cut with GPT's beige flats under the hem, so they covered her chosen shoes (built-in xn). r360 layersFor now pushes the shoe layers again after everything when a body/bottom/coat is on. New studio toggle `.r3un` "החולצה מתחת לשמלה" (ST.under, saved in looks) moves the top slot before body. Fixed: the .r3tk checkbox sync had been swallowed by a mid-line comment. KVV cache key → 'rv2:'.
