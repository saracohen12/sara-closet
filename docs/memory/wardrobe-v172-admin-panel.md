---
name: wardrobe-v172-admin-panel
description: v172 (25/10) "⚙️ פאנל ניהול" – Sara's admin panel: stats, what's waiting (with counts), all tools by topic; entry at top of home
metadata:
  type: project
---
2026-10-25 Sara: "תבנה לי בבקשה פאנל ניהול" (no details). Read as: one management screen. Built fix172.js (#ad172, openAdmin172()):
- 4 stats: פריטים בארון, הזמנות, מוכנים לאווטאר, ברשימה הכללית.
- "מה מחכה לך" rows with counts, only non-zero: התראות (getAlerts lvl>=2), להחזיר עד שבועיים (sorts closet by return date), כסף שלא חזר (hub money), הזמנות בדרך (orders), חסר לאווטאר (openMiss77), תופרת / לא במידה (FLF filter), כפולים.
- Tools grouped: הארון / הזמנות וכסף / לוקים / אווטאר ותמונות / מערכת.
- Entry: wide button "⚙️ פאנל ניהול 🔔N" in home .h9cta under "ההזמנות שלי", ⋯ menu, search.
v173: panel group "פיתוח" – tasks sheet built from tasks.md at build time (gentasks.py → tasks172.js, so keep tasks.md rows accurate BEFORE building; status from ✓ ✗ ○ and the note column), plan sheet (3 features), links to prompts page + changelog.
If she meant something else (e.g. multi-user/admin of others), ask. Next publish = 180. Related: [[wardrobe-v161-general-list]].

v175 (25/10): merged orders thread v174 (IT.oos cancelled/out of stock, IT.refunded, IT.reord); panel row 'oosw' (oos && !refunded) opens orders with the oos chip. Next publish = 180.
