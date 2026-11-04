---
name: wardrobe-v238-order-temu3
description: v237–v239 (27/10) ✨ fix in GPT, style pictures cached in IndexedDB + ⭐ favourite/recent order for ties & hairstyles (STYORD), Temu account 3 (src 't3')
metadata:
  type: project
---
Closet artifact HY6no4fCJwNunBtm6GVA8V (v239 = artifact version 239).

- **v237 ✨ לתקן** (fix237.js): a button in the av188 acts row. She marks red strokes on the item's a8 part `src` sheet. The marked JPEG is saved with R360.saveFile. The prompt fixes only the marks and keeps size and place. Upload goes through data-up188 (tiex keeps data-w and data-tx228). The new dialog id is in the d180 night exclusion.
- **v238 speed:** r360 KV = IndexedDB 'r360c', key = VER|type|ck|sig8 (the layer asset ids). It wraps frames8, styCard and styThumb. KV.tidy drops other versions after 9 s. `styFrame0` draws only the front for library cards; the other 7 views are drawn when she turns the card. Under CPU throttle 6× a cached thumb takes 2 ms instead of 90 ms. Gotcha: r360 already had `let PV`, so the cache prefix is KVV.
- **v238 order:** sty199 `ORD={tie:{f,r},hair:{f,r}}` lives in db stylehide/'ord'.
  - Units are hidK keys: the preset key, or 'id:'+doc.
  - Rank: favourites (☆/⭐ `.syfav` appends, ⬆ `.syfu`), then recent picks (RS frozen at screen open, so a pick doesn't jump), then the default order.
  - window.STYORD {rank,freeze,rec,unit,sort}.
  - r360 ordSty/recSty for the tie and hair rows, plus R360.restyle(). The tie202 cover dialog sorts its tx tiles and preset rows the same way.
- **v239 Temu 3:** src 't3' 'טמו 3 (החשבון החדש)'. Orders are in temu/inv_tn.py (TN['151206']), with pictures in temu/app/<k>_<j>.jpg.
  - Code touched: book3 TNF/SRC/SL/INTRANSIT/%%NT3%%, book4_tpl stats/select/openItem rows, orders123 ACC/ACCN/cnt/tabs, hub credits select.
  - Thumbnails live in th/<cat>.json and .js, so publish them with `files` when they change.
  - Temu 3 account name (her words 27/10): smart20.mortgage – shown in SRC, orders123 ACCN (v242).
- **v240 (27/10 13:06) 3 receipts** קבלה 1/2/3 (PDFs = scanned images; render with pdftoppm/pdfimages, item thumbs at the right edge). Keys '511206' (9 items), '8151206' (23 – last-6 '151206' collided with the first order, so 7 digits), '231206' (17); all in INTRANSIT.
  - Helper `_t3(L,osub,total)` in inv_tn.py spreads the coupon over items (rest on the last line). `TNFILE[key]` sets the receipt label ("חשבון 3 · קבלה N") so the orders page says קבלה 1–3 like her files; the first order shows "הזמנה 151206".
  - Pictures: her wishlist store photos (trimmed of screenshot chrome) where they match, else the receipt thumbnail. 28 wishlist cards set to st 'buy' with field o = which receipt.
  - The brown chain loafer CN39 (p08) was in receipt 2 AND 3; v241: she swapped receipt 2's to BLACK (T8151206_8, her screenshot), dup flag removed.
  - Cart items she did NOT order: p03, p13a, p15a, p27a.

Related: [[wardrobe-v228-cover-ties]], [[wardrobe-v123-orders]], [[wardrobe-summary-180-235]].
- **v243 live home counters:** #ord123b / #ret152b were painted only at 1.2s/4s and on apply(); ORD marks ('arrived') load later and don't call apply(), so the home showed stale numbers (620 vs 657). Now orders123 repaints every 3s + on visibilitychange (innerHTML only when changed); d180 .z-rdy avatar count every 4s.
- **v244:** #ord123b now reads 'ההזמנות שלי (N orders)' + 🆕 today's orders + ⏳ in transit + ❌ + ⚪ – Sara (14:12) thought it never updated because new orders are 'בדרך' and the ⚪ count didn't move.

**v261 (27/10 20:59, artifact version 262):** favourites only. Every list (sty199 library body(), r360 paintSty tie/hair/mk rows, tie202 PICK picker) shows only ⭐ units when the set has any, plus "☆ עוד N" (sty199 MORE[set], STYORD.more/reset; tie202 PMORE). A pick from the open rest gets a star (STYORD.star; r360 starSty on data-syh/syt/sym; wear(); t246ok). ORDSETS now includes 'mk'. MORE is reset when the library or studio opens. On 27/10 she had only 3 starred ties: id:k27n24, id:k27n06, w16. Test: scratchpad t261.js with mock261.json (live styles + items).
- **v287 (28/10):** receipts 5 and 6 → keys '871206' and '471206' (Temu 3, IDs end 1206 = account 3). Receipt 6 is mostly men's items. Receipt line price = unit price (×2 lines doubled). The publish was refused because th/makeup.* had not been read in this session: read it, diff it, then republish.
- **v297 (28/10 16:29):** Temu account 2 receipt "28.10.26 קבלה" → key '711005' (t2, PO …09081796910711005, 27 items, osub 769.92, paid 501.08). PDF = scanned pages; thumbs cropped at 300dpi x 1954–2229, rows y 434/809/1185/1561/1936/2312 (+274), page1 y 2519, last page 212/588. Order IDs ending 1005 = account 2, 1206 = account 3.
