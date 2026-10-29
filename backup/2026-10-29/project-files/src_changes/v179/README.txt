v179 (25/10, closet thread), built on v178 (orders thread):
- NEW fix179.js (concat right after fix163.js in book3.py):
  * home tile "מה יש לי בארון · חולצות, חצאיות, הכל" (first, dark) → opens "הארון שלי" (openCloset163). The "פרטים נוספים" tile is hidden (still in the DOM so the search / admin panel / taps keep working); "📊 פרטים נוספים" is at the bottom of "הארון שלי".
  * #cl163 now scrolls (overflow-y:auto) – on the phone the lower categories were out of reach.
  * computer (≥701px): .h9cta wraps to a second row; #ord123b / #ret152b / .h9adm / .h9b2 are auto-width pills, no more squeezed circles over the avatar.
- fix172.js: admin "הארון" group gets "📊 פרטים נוספים (מספרים וסיכומים)".
- book3.py = v178's + fix179.js in the concat (<SCRATCH> placeholders).
