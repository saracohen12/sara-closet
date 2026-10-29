v175 (25/10, closet thread), built on v174 (orders thread):
- fix172.js only: the admin panel gets a "waiting" row "🚫 בוטלו (אזל מהמלאי) והכסף עוד לא חזר" = items with IT.oos && !IT.refunded.
  Tapping it opens the orders window and turns on the "oos" filter chip ([data-o3f="oos"]).
- No other source changed. book4_tpl.html / orders123.* are exactly as in v174.
