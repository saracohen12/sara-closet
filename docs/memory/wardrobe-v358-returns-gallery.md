---
name: wardrobe-v358-returns-gallery
description: v358 (6/11, before Shabbat, Sara away 4–5 h) – big-picture order view + all-products gallery with quick marks, phone back closes the top window (nav358), "📦 הגיע ולא מופיע בהזמנות" (stray358), image audit result
---
Sara 6/11: "כשאני רוצה להחזיר… אני מעדיפה לראות את כל המוצרים בתמונה גדולה, ללחוץ ולהיכנס, וכפתור אחד לסמן להחזיר או להשאיר… ואחורה זה צריך לעבוד תמיד"; "מוצרים שהגיעו ולא מוצאת בהזמנות"; "להזמנות החדשות אין תמונה קטנה".

- orders123.js: `tile(id)` big picture + tag + quick marks (✅ הגיע / 🏠 משאירה / ↩ מחזירה; on ret tiles 📝/📦/📮 steps). Inside an order BIG (localStorage o3big358, default on) renders `.o3tiles`; "☰ רשימה מפורטת" = old itemRow; order header extras folded behind "⚙ פעולות על ההזמנה" (.o3oh.open358). rowRefresh keeps tile vs row. Orders list: "🖼 כל המוצרים בתמונות" (V.allp, localStorage o3allp358) → gal358(all,qq): shop chip + status chips filter ITEMS (rp/rs/y/n/m/u/oos), 40 at a time; open(ord='',hl) scrolls back to the tile.
- nav358.js: each open <dialog> gets one history step (slots counter); popstate closes the top open dialog; code never calls history.back() (it raced with the next window opening and left the site). z328 popstate ignores a step whose category is the current one.
- stray358.js: db 'stray358' {what, ph asset, d, t, st open|added|gone}; rcv296 saves unmatched parcel products automatically (and a 📌 button); sheet from the orders list: manual add (photo + prompt), ➕ to closet (M-id item via addMine299 + IT.my), 🗑, newest order per shop (what receipts are missing).
- Image audit (mock with her data): every item has a picture (data thumbs for new receipts, blobs for hers), all 1,587 referenced blobs exist – could not reproduce "no small picture"; ask her for a screenshot.
