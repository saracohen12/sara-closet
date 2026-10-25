---
name: wardrobe-redesign-v69
description: Sara's v69 total redesign of the closet home (new69.js/new69.css) – what moved where, and her feedback that v68's theme was "exactly the same"
metadata:
  type: feedback
  modified: 2026-10-21T22:51:39.593Z
---

2026-10-21 Sara on v68's "2050" theme (only colours/radii changed): "הכל נראה אותו דבר בדיוק… תעשה שינוי טוטלי – הסדר, איך הדברים עומדים, הכותרות, העיצוב". She also asked that the header stats (פריטים/טמו/שיין/שולם) be hidden under "פרטים נוספים", and said she can find 10 bugs in a minute – she expects deep, visible changes, not polish.

**Why:** she judges by what she sees on the phone at first glance; restyling without moving things reads as "nothing done".

**How to apply:** when asked for a new look, change structure (order, what is on screen, navigation), verify with before/after phone screenshots, and lead the reply with what she will see differently. v69 structure: app bar → dark hero ("מה לובשים היום?" + בניית לוק / הלוקים שלי) → 4 tiles → category photo tiles → returns strip → sticky search+filter bar → grid; stats in #more9 sheet; filter/sort is a bottom sheet (#panel moved out of .ctrl because backdrop-filter on .ctrl traps position:fixed children; must be appended inside the dir=rtl root). Files: src_changes/new69.js, new69.css. Related: [[wardrobe-artifact-gotchas]], [[sara-task-table-rule]].
2026-10-21 v72 "boutique" (design71: bordo/gold, serif headings, line icons, head-only avatar in hero) – Sara: not enough presence, avatar cut, disliked colours; chose black-white + camel ("mono"). She asked for a dedicated design agent; v73 = design73.css/js (palettes mono/olive/navy/rose via html[data-pal]).
2026-10-21 v73 published with a live A/B/C switch (round button in the top bar, localStorage dir73; A=editorial serif+arch, B=modern app black card, C=luxury minimal). Sara wanted to choose realistically before the full rollout; after her pick, remove the other two and finish hub/alerts/filter/preview/desktop item+studio in that style. Composites: /closet/v73/dir_A|B|C.jpg.
2026-10-21 Sara picked A (editorial magazine); v76 = A only site-wide (design73.css/js, backups *.v73abc). Before/after shots /closet/v76/.
2026-10-21 on A: hero title "מה לובשים היום" too big, everything "too square, dry" – wants a 2050 look. v78 = design78.css/js (html.d73.d78 overrides: rounded radii, pill buttons, glass tiles, soft multi-colour background, floating glass bottom bar, gradient primary). Keep shapes soft from now on.
