---
name: wardrobe-v229-order-avatar
description: v229 (27/10): avatar mark per order in "📦 ההזמנות שלי" (ORD.ad), filter, and avatar upload from each order item; tasks.md mount can go stale
metadata:
  type: project
  modified: 2026-10-26T22:19:57.714Z
---
Sara 27/10 00:13 asked for an avatar mark per order, like the photos mark, plus a filter for orders without an avatar and an upload from the order screen.

**v229** (orders123.js/.css, commit 3cc7616):
- `avSum(o)`: need = items whose cat is in AVC (clothes/shoes/bags/jewelry/belts/scarves), not oos and not s=='ret'. has = `st188(id)=='ok'`.
- `ORD[k].ad` is her manual ✓. An order is done when it's marked or when has>=need.
- Order card strip `.o3adc` and order header `.o3ad`.
- Quick row `.o3af` (localStorage 'o3af'), FLT group 'אווטאר' (anl/and), and a summary chip.
- Item row `.o3av` reuses av188's document-level `data-mk188` (prompt) and `data-up188` (upload + cut8). Live progress shows through `data-mkst188`.

**Gotcha:**
- /mnt/project-files/closet/tasks.md was stuck at row 404 while repo closet/tasks.md had 443.
- gentasks.py reads the mount, so a build from it would roll the admin task list back.
- Before building, compare the two and use the newer one.

**Publishing:** the artifact service's version number ran 1 ahead of the badge (badge 229 = service version 230).

Related: [[wardrobe-v174-cancelled]], [[wardrobe-v190-cut8]], [[wardrobe-who-publishes]].
