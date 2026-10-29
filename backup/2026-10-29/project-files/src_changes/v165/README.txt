v164–v165 (orders thread) on v163: AliExpress as a new store, src 'ae'.
- book3.py: loads ae/inv_ae.py (AE[key]=(full no, date, total, items), AENOTE) -> items id A<key>_<j>, src 'ae', images ae/app/<key>_<j>.jpg; SRC/SL add ae; receipt-only branches now `src in ('t1','t2')`; no return date for ae.
- book4_tpl.html: openItem treats ae like sh (order number row), .sb.ae red badge, src filter option.
- orders123.js/.css: ACC ae:'עלי', tab "עלי" (only shown when there are ae orders), order name = last 6 digits, shop link aliexpress order detail, .sb2.ae.
- 3 orders: 118575 (scarf), 838575 (skirt), 538575 (4 silk scarves). th/cut skirts+scarves published.
If you add a src check anywhere, remember 'ae' exists now.
