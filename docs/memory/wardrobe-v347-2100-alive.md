---
name: wardrobe-v347-2100-alive
description: v347 (4/11 evening, Sara studying, "work hours without asking") – 2100 skin (html[data-z21] over z50), living home avatar (Stage opt.alive), bug round from a crawler
---
Sara 4/11: "the avatar moves every moment, you see pictures switching – make it much more natural"; "look of the year 2100"; "find upgrades and bugs, don't wait for approval".

**Living avatar (r360.js Stage, opt.alive):** canvases sit in an inner `.r3in` that breathes (CSS r3br). `show(i,dur)` slides + cross-fades in the turn direction (`--d`, `--r3t`); the leaving canvas stays solid underneath (`.was`) so there is no see-through double body. Home default = calm (`api.alive(true)`): faces front, glances to view 1 or 7 every 6–10 s and back, returns to front after a manual drag; a flick keeps turning with slowing steps. ▶ = full turn (localStorage `h347spin`, old `h181spin` ignored). `draw()` paints the visible angle first (`_done` flag, `.ready` class; shimmer while loading). Respects reduced motion and נגישות "בלי תנועה" (html[data-still]). Studio big stage also `alive:1` (smooth turns, no glances).

**2100 skin:** design key `z21` in d180.js DESIGNS – sets `data-d180=z50` + `data-z21=1`, so every z50 rule still applies. One-time migration (`z21seen`): z50/pearl/none → z21; z277's first-open migration now sets z21. Styles in `work/z21.css` (aurora body::before, glass header/nav/cards, holo halo + floor glow + sheen on home avatar, dialog pop-in, card lift, tab cross-fade via View Transitions in z277 `tab()`, image fade-in class `z21ld`, desktop mouse tilt). Old looks stay in 🎨.

**Green "on" rule (tell282.css) refinements:** no fill for empty/inline-background buttons (swatches get a green outline), svg buttons get outline, studio angle dots = green dot, `.z6all` tile = green frame.

**Bug round (crawler in scratchpad bug/, 600 clicks, 0 JS errors):** pinGo went through `.bnav [data-bn=home]` which fix163 hijacks → opened #cl163; search183 Hebrew forms (`forms()`: prefixes והבלמשכ, endings ה ת ות ים יות) + שבת/חול words in HAY; z313 paint counts only the visible category on a page; `.g250box .mkp` unstyled; look buttons wrap; 💬 in-dialog tab slim/low; studio header 40px targets; Esc closes #panel (fix347.js); desktop home stage fits the column (fix347.css).
New files: work/z21.css, work/fix347.js, work/fix347.css (all in book3.py).

909 catalog vs 907 admin: S0MNA_0 and S1A5K_0 are in "הרשימה הכללית" (IT.gen) – not missing.
