v174 (25/10, orders thread), built on v173:
- New item status IT.oos = time ("🚫 בוטל – אזל מהמלאי", shop cancelled + refund). st(id) returns "c"; not counted as missing/unmarked; order card shows "🚫 N בוטל"; filter "oos" + summary chip with how many still wait for the refund.
- Order row of a cancelled item is short: banner, 💰 הכסף חזר (IT.refunded), "מה עכשיו" IT.reord size/other/no + search link to the shop, "טעות, לא בוטל", note.
- Button "🚫 בוטל – אזל מהמלאי" in the marks row of every order item, and a strip under "📦 כל ההזמנה" in the item window (.o3oosw, data-o3oos).
- Cancelled items are hidden from the closet grid/search (extra) and studio lists (drawerItems), but stay in orders.
- book4_tpl.html: beforePut names oos/reord.
- DB: T37 marked oos (Sara, 25/10).
Admin panel idea: count oos && !refunded under "כסף שלא חזר".
