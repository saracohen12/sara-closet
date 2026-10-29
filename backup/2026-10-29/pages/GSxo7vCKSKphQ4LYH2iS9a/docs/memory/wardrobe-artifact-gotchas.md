---
name: wardrobe-artifact-gotchas
description: Runtime pitfalls learned while editing Sara's wardrobe artifact (uploads on Android, thumbnails bundles, card painter, studio bases)
metadata:
  type: project
---
Pitfalls in [[wardrobe-artifact]] (all verified 2026-10-20/21):
- Android: hidden `<input type=file>.click()` is unreliable; use a transparent overlay input inside the button (`.ovf`), poll for files. The Claude in-app view blocks the file picker entirely; Sara opens the site in Chrome. `focus` fires when the picker opens, so it cannot mean "came back without a file".
- Thumbnails (since v24) are NOT in the card src: `<img data-th=ID>` + `th/<cat>.json` (fetch) with fallback `th/<cat>.js` (JSONP `thGot`). Any code that reads a card's src to decide "has image" must use `D[id].hi` instead. v24–26 regression: imgup.js `paintImg` showed "אין תמונה" on every card once db marks loaded (fixed v27).
- Keep thumbnail startup (`thStart`) in the page before the `%%HUB%%` bundle: a JS error in the hub bundle must not blank the closet. `window.ERRS` collects errors.
- `thApply` must never overwrite `/_blob/` or `blob:` srcs (user uploads). User image on a card removes `data-th`; revert restores it.
- Chrome scroll anchoring doubles manual scroll compensation → `body{overflow-anchor:none}`. `data-mode` attr collides with day/shab handler (use `data-upm`). `#studiobtn/#bell/#hubbtn` are display:none on phones (bottom nav triggers `.click()`), so Playwright must use evaluate(click).
- Studio bases: `BASES.long/short/p5`; `.mst` boxes must set `width:auto` when a height is given or the 399/1365 aspect breaks and head overlays misalign.
- Publishing: `python3 book3.py` in src/work → build/book.html; publish with root=build/pub + files for new th/*.json+js or av/*. Sara must fully close & reopen the site to get a new version.
- Dialog grids: an implicit `auto` track in `.drest`/`.dinfo`/`.ed` made rows 932px wide on phone; always `grid-template-columns:minmax(0,1fr)` + `min-width:0` on children. `:not(#fb)` adds ID specificity and silently wins.
- Playwright tests need `python3 -m http.server 8765` started inside the same Bash call (server dies between calls): `cd build/pub && (nohup python3 -m http.server 8765 >/dev/null 2>&1 &); sleep 1; node tests/tNN.js S`.
- Colour engine lives in looks2.js (after p5.js, before ui.js in the HUB concat); re-run colors.py when cut/*.webp or thumbnails change, then book3.py. Learning rules persist in SET.learn via saveSet(), feedback copies in db collection `feedback`.
- Version badge (v33+): header shows "גרסה NN" from src/work/version.txt (%%VER%% in book3.py). Bump it to the next artifact version number BEFORE each publish so it matches the artifact's Version counter; Sara uses it to tell which version she sees.
- Studio drawer/suggestions must never filter by img(id) (thumbnail loaded?) — use hasPic(id) and thLoad the slot's categories. Async failures are invisible to window 'error'; ERRS now also records unhandledrejection.
- Overriding a studio.js click branch from a later file does not work by stopPropagation (same document listener list); remove/patch the branch in studio.js instead (done for zoom in v35).
- Gemini tichel sheets: the face opening is DARKER than the gray bg (L≈140-160), not lighter — alpha by |L-bg| alone makes it opaque; ties.js clears it with a seeded flood (see [[wardrobe-ties]]).
- Item dialog: ui.js `compactTools` moves every imgrow child that is not `.ib/.st2/.stamp/.tiesbox` into the collapsed "עוד אפשרויות" details — a new section appended to `[data-imgrow]` must be added to that keep-list or it is invisible. `.imgrow` is a grid: new children need `min-width:0` or a horizontal strip inside them widens the whole phone dialog (v39).
- More: [[wardrobe-artifact-gotchas-2]].
