---
name: wardrobe-dup-check
description: 27/10 Sara's wishlist page "מה אני רוצה לקנות" (store photos vs what she owns, קניתי/מתלבטת/לא קונה in db 'wish'); how to add rounds; tools in project-files
metadata:
  type: project
  modified: 2026-10-27T09:35:53.019Z
---
27/10/2026 Sara sends store screenshots and asks me to check them against the closet and every order so she doesn't buy duplicates.

**Her feedback (11:31):** text tables and combined comparison pictures "ממש לא עוזר". She wants ONE visual web page holding every product she sent, with what she owns shown next to it. She marks what she bought there. When she later sends the order, use those pictures for the new items.

**Page:** "מה אני רוצה לקנות" https://claude.ai/artifact/Tf6j8XspF1AmHr7kyqxQnL (capabilities db + user).
- Each product is a card: her store photo(s), swipeable for colours; a verdict badge (dup ⚠️ / sim 🟡 / have ✅ / none ⬜); a note; a strip of HER item photos (m/<id>.jpg); and the buttons 🛒 להוסיף לעגלה (big) / ✓ כבר קניתי / ✕ לא רוצה. Cart: a green chip "🛒 העגלה שלי · N" first in the top filter row, plus a fixed bottom button. Inside the cart the verdict filters (הכל/כבר יש/דומה/אין) still work (11:39 request).
- Marks are stored in db collection 'wish', doc = product id {st: cart|buy|no, at} (old 'may' is read as cart). Read them with ArtifactData list 'wish'.
- ONE CARD PER PHOTO (11:44: she thought products were missing when colours were hidden in a swipe). Cards are numbered 1..N. Ids: pNN, or pNNa/b/c for split colours. 43 cards come from 44 photos (one was a duplicate).
- Source: /mnt/project-files/closet/wishlist/ holds products.json (products + mine{id:{n,s,st}}), tpl.html, store/<pid>_0.jpg, and mine/<itemid>.jpg.
- Build: `python3 build.py <out>` writes index.html + s/ + m/. Publish with root=out, listing every s/ and m/ file in `files`. New products continue from p31 with r=5.
- Her 10:33 photo never arrived.

**Finding candidates** (tools in /mnt/project-files/closet/dup_check/tools):
- exD.js <build index.html> D.json gives the catalog D.
- ArtifactData list 'items' on the closet artifact gives the live IT state.
- prep.py writes cat.txt `id|cat|store|name|colour|size|date|status`.
- sh.py <th dir> out.jpg ids… makes a labelled contact sheet.
- Full pictures are in work/srcimg/<id>.jpg or temu/app/.
- Check belts and shoes by picture, not by name. I missed the woven belt T356 once.
- The thread holds max 24 attached outputs (it is full), so send links, not attachments.

The older page "לא קונה כפול" (1s6q3y3b5ASWnrZgV5qtyZ) is superseded.
Related: [[wardrobe-v187-shop-advisor]], [[wardrobe-v123-orders]].
