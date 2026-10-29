v176 (25/10, orders thread), built on v175:
- NEW temu/inv_tn.py: Temu orders added later (from a PDF). TN[last6]=(acc, full PO, d/m, {osub,credit,total}, [(short,full,color,size,list price,paid,cat)]), images temu/app/<key>_<j>.jpg (+ srcimg/T<key>_<j>.jpg), ids T<key>_<j>, item.tn=1.
- book3.py: TN loader (file "קובץ 15" for acc1, next acc2 = "חשבון נוסף 24"), t1/t2 receipt meta skipped for tn items (they carry osub/credit/refund themselves), new PO in INTRANSIT, dup groups T37+T591091_3 (same turtleneck re-ordered in M) and T591091_14+_15 (velvet skirt twice).
- First order: PO-097-18076072617591091, 25/10, account 1 (order no ends 1091 like all acc1; billing "אבי עזרי 22, 2"), 17 items, ₪373.72 (subtotal ₪469.12, credit ₪95.40). Images = the small receipt thumbnails for now.
- fix172.js = v175 (unchanged). book3.py has <SCRATCH> placeholders.
