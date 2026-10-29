v161 (24/10, closet thread): "🗃 הרשימה הכללית" – items Sara doesn't want in the closet (IT[id].gen = timestamp).
- fix161.js NEW, appended last in book3.py (after fix157.js). Gen items are made non-enumerable on D (same trick as fix85 set pieces),
  so every Object.keys(D) list skips them – closet, studio drawer, avatar lists, looks, insights AND the orders screen (orders123). D[id] still works.
  extra() hides their cards; button in the item window (.pd85h) + banner; sheet #gen161 (openGen161) with "↩ לארון"; entry in ⋯ menu, free search, link under closet.
- layers77_84.js: bulk bar "🗃 לרשימה הכללית" (data-sb83="gen").
- fix85.js: free-search entry "רשימה כללית".
Orders thread: if orders123 should still show gen items, iterate Object.getOwnPropertyNames(D) or check gen161(id).
