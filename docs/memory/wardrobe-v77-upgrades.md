---
name: wardrobe-v77-upgrades
description: v77–v80 of Sara's closet (fix77/fix79/fix80.js, design78.css) – home extras, missing-avatar list, try-on bar, soft 2050 look, wear tracking, GPT prompt library; with layout pitfalls
metadata:
  type: project
  modified: 2026-10-22T07:38:05.339Z
---

2026-10-21, files appended last by book3.py in order fix77, design78, fix79, fix80 (css: fix77, design78, fix79).
- v77: home "לוק היום" #lotd77 + readiness strip #rdy77 → "מה חסר לאווטאר" #miss77 (openMiss77, sorted by IT.wear); item bar .it77 (לנסות עליי + 5-pose ✓/✗); grid #q77 colour circles; studio swipe, #hd77 scarf row, #tip77 tips; "משהו לא עובד" → db 'feedback' kind:'bug'.
- v78: design78 = html.d73.d78 soft look (rounded, glass, smaller hero title). Sara: A was "too square, dry", wants 2050.
- v79: Hebrew date greeting, strips #rv79 (recently viewed, localStorage rv79) and #old79, "לבשתי היום" .w79 / lotd [data-l79] (wear+1 with undo), shimmer .ld79, search ✕ + recent searches rs79, #pdone shows result count, hub auto runGen. 50-upgrades doc: https://claude.ai/artifact/6akg5GFJ3imJLPD4a2eEtJ
- v80: #pr80 prompt sheet (openPrompts80): per type top/sweater/skirt/dress/set/coat/jacket/vest/belt/shoes/bag (+JWPROMPT, jwPromptFor, TIEPROMPT/5). Belt/shoes/bag got the 5-pose upload in v86 (see [[wardrobe-v84-layout]]).
- v81 (2026-10-22): new Shein order 15Y6 (10 items) + 15R2 (heel pads). To add an order: append I[key]/TOT in shein/inv_all.py, '<order>':[] in shein/allurls.json, '<key>|j' crops in shein/app_imgs.json (crops from app screenshots in shein/app/); ids S<key>_<j>; republish changed th/<cat>.json+.js (read published ones first). v82: Sara sent product screenshots per item; cropped (shein/app/n81/<key>_<j>_<n>.jpg), main set in app_imgs, all uploaded as assets and written to db items/<id> as img+imgs+pics (labels from PICLABS) – this gives the sharp main + gallery.
- v83 (2026-10-22): fix83.js/css = the rest of the 50-upgrades list (doc 6akg5GFJ3imJLPD4a2eEtJ now marks each item's version; #32 partial, #49 deliberately not done). Changelog v50–v83 as a Claude Doc: https://claude.ai/artifact/VKEMzizpkT8jy5QvkpEBzJ (add a row per new version). fix77 lotdPick uses window.occToday83. Wear dates in IT[id].wl, voice notes IT[id].vn, shopping list SET.shop83, look event LOOKS[id].ev, daily backup db 'backup83'. Test: tests/v77/t83.js.
Pitfalls: header.top is a grid with explicit grid-row per child (since v83: rt83 4, lotd 5, hol83 6, rdy 7, wk83 8, rv79 9, old79 10, h9sec 11, urgent 12, recent 13). Buttons inside #hbody get forced pill/min-height styles by `#hbody button:not(.mini)` – add class "mini" to small custom buttons. BGS already had garden/event/room before v83. Never add a bare <section> (apply() needs `section h2 span`). D/IT/DB/P5G_SLOTS are const/let – use typeof. putItem shows its own "נשמר" toast via setTimeout – delay your own toast. Tests: tests/v77/t77.js, t79.js, t80.js (set localStorage tips77=1). Related: [[wardrobe-studio-log]].
