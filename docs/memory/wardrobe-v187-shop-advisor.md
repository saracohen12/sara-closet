---
name: wardrobe-v187-shop-advisor
description: v187 (25/10) "🛍 יועץ קניות" in Sara's closet – smart-closet stage C: photo/text check vs closet, looks, size, verdict, archive DB 'shop187'
metadata:
  type: project
  modified: 2026-10-25T23:53:31.659Z
---
v187 published 25/10/2026 (artifact version 188), commit 69df966. Smart-closet plan stage C ([[wardrobe-smart-closet-plan]], tasks rows 269 + 380).

Files: work/adv187.js + adv187.css (last in book3.py JS/CSS order). Dialog `#sh187` (added to the d180.css night exclusion). `window.ADV187={open,list}`.
- Entry points: home chip `#sh187b` after `#sc185b` in `.z-chips` (shows "🤔 N עוד בהתלבטות"), TOOLS172 group 'הזמנות וכסף' first entry, a button `.in187` at the top of the hub 'check' tab (wraps renderHub).
- Flow: photo (label + overlay file input, Android-safe) and/or text, price, store → `sample.json` prompt with her catalog (live items in KEEP cats, ~580 lines `id|cat|name|colour|♥|wN|🧺`, pipes in names replaced) + her measurements (SET.me91/ME0) → JSON {what,cat,colour,similar,looks[{name,ids,why}],size,sizeWhy,modest,missing,wears,verdict,why}. Then a 2nd call: numbered sheet of the candidate similar items (her photos) → {same:[n]} to confirm duplicates.
- No sample: words-only local similar (localSim), result marked `local:1`; photo alone without Claude is refused with a toast and nothing saved.
- Archive: DB collection 'shop187' (localStorage 'shop187' until DB is there, migrated up on first snapshot). Record: t, txt, price, store, st think/buy/skip, mine (her note), th (240px dataURL), plus result fields. Summary "חסכת ₪", filters, compare 2–3 (table), delete = tap twice.
- Looks: "לראות על האווטאר" → `R360.openWith(null,{...ids})`; the NEW item itself can't be on the avatar until a GPT sheet (said in UI).
- Tests: scratchpad h/flow187.js (mocked sample via defineProperty on window.claude) and flow187b.js (no sample). Global field style (look68_73.css `textarea,select{background:var(--card)!important}`) had to be overridden inside #sh187 for night.
Related: [[wardrobe-v185-wig-pin]], [[wardrobe-v123-orders]].

**28/10 cart check (her rule: "כל מה שב-V שוקלת לקנות תכניס ליועץ קניות ותבדוק כפילויות"):** when she sends store-cart screenshots, crop each ✓ product, compare by picture (contact sheets with dup_check/tools/sh.py on build th/), and write one 'shop187' record per product via ArtifactData batch (ids c28wnNN, st think, th = cropped dataURL, similar = her ids, verdict, why, size note). Then reply with one table. Watch sizes (shoes she owns are EU38; underwear M).
