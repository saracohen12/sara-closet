---
name: wardrobe-v161-general-list
description: v161 (24/10) "🗃 הרשימה הכללית" – archive for items Sara doesn't want in the closet (IT.gen); hidden from every list incl. orders
metadata:
  type: project
---
2026-10-24 Sara: clothes she doesn't want (e.g. event dresses) must leave the closet, avatar, studio and all lists and live only in a separate "רשימה כללית".
Built in v161 (fix161.js, appended last in book3.py):
- Field IT[id].gen = timestamp. Item becomes non-enumerable on D (same trick as fix85 set pieces), so every Object.keys(D) list skips it – including the orders screen (orders123, owned by the orders thread; told them). D[id] still works.
- Entry: button "🗃 לרשימה הכללית" in item window (.pd85h, next to "להעביר לכפולים"), bulk "☑ בחירה" bar, ⋯ menu "🗃 רשימה כללית (N)", free search "רשימה כללית", quiet link at bottom of closet.
- Sheet #gen161 (openGen161) lists them; tap opens item (banner + "↩ להחזיר לארון"); "↩ לארון" restores. Undo toast.
Related: [[wardrobe-v152-uploads]], [[sara-task-table-rule]].
v162: visible chip "🗃 רשימה כללית N" above the closet (Sara couldn't find the list via ⋯/search).
v163 (25/10): bottom-bar "הארון" opens "הארון שלי" (fix163.js, #cl163): category tiles with photo+count + "הכל"; tap = only that category. Sara: "היום לא הבנתי מה יש בארון שלי". Next publish = 180 (orders thread published v164–171: AliExpress src "ae", merged into closet src/work on 25/10).
