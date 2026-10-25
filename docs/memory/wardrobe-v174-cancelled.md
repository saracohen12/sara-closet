---
name: wardrobe-v174-cancelled
description: v174 (25/10) item status "🚫 בוטל – אזל מהמלאי" (IT.oos) in Sara's closet orders: hidden from closet, refund + reorder tracking
metadata:
  type: project
  modified: 2026-10-25T09:03:38.855Z
---
2026-10-25: Temu cancelled T37 (black floral turtleneck, out of stock, refund). Sara asked for a status for this.
- IT.oos = timestamp. st(id) returns 'c'. A cancelled item isn't counted as missing or unmarked. The order card shows "🚫 N בוטל". There's an orders filter 'oos' plus a summary chip with the count still waiting for a refund.
- A cancelled item gets a short order row: 💰 הכסף חזר (IT.refunded), "מה עכשיו" IT.reord size/other/no with a shop search link, and "טעות, לא בוטל".
- The button is in the marks row of each order item, and in the item window as the .o3oosw strip under "📦 כל ההזמנה".
- Hidden from the closet grid via the extra() wrap and from the studio via drawerItems, but stays in orders. This differs from IT.gen (general list), which hides the item from orders too.
- A re-order in another size = a new item in the new order; the old one stays cancelled.
- Code: orders123.js/.css. Sources: src_changes/v174. T37 is marked in the DB.
- Asked the closet thread to count oos && !refunded under "כסף שלא חזר" in the admin panel.
- AliExpress orders entered 25/10: v166–171, 10 orders / 24 items (ae/inv_ae.py).
Related: [[wardrobe-v123-orders]], [[wardrobe-v172-admin-panel]].
v176 (25/10): Temu orders that arrive later as a PDF go in temu/inv_tn.py (TN loader in book3.py, ids T<last6>_<j>, file "קובץ 15" = next acc1 receipt). The PDF is image-only: extract the page images with pymupdf and crop the 77px thumbs at x 490–568. Account check: acc1 order numbers end in 1091, acc2 in 1005. The first such order is 591091 (17 items); it includes T37 re-ordered in M (dup group).
