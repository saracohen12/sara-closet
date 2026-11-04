# הסקיל של הארון (sara-closet)
---
name: "sara-closet"
description: "Use for any work on Sara's closet site (הארון של שרה): building, fixing, publishing, orders, looks, or answering her about it."
---

# הארון של שרה – how to work

## Talking to Sara
- Hebrew only, simple, warm, short. She is on an Android phone most of the time and hates clutter on screen.
- She sends many instructions in a row. End EVERY update with a table: **מה ביקשת / מה עשיתי / מה עוד לא**, including older open requests. Never drop an earlier instruction.
- Keep the request ledger `closet/tasks.md` accurate (one row per request; ✓ / ○ / ✗ + note). It feeds the admin panel.
- Be honest about what is impossible and say how it CAN be done. She likes upgrades: do the improvements you find and report them.

## Where things are
- Site (db + assets live here, never publish a new url): https://claude.ai/artifact/HY6no4fCJwNunBtm6GVA8V
- Files: GitHub `saracohen12/sara-closet` (work/ = site source, closet/ = avatar and work files, docs/ = memory, HANDOFF.md). Read HANDOFF.md first.
- Upload inbox (photos from her computer): https://claude.ai/artifact/6QchawxHTNjJ14ZQxeok6F – ArtifactData list collection `uploads`, then Artifact read path=<asset id>.

## Build and publish
1. In `work/book3.py` replace `<SCRATCH>` with your build folder; run it from inside `work/` (it imports gentasks.py, which reads `/mnt/project-files/closet/tasks.md`).
2. Bump `work/version.txt` to the next artifact version before every publish (the header badge must match).
3. Artifact read the live site first, then publish book.html to the SAME url with root=build/pub; send th/*.json, cut/*.webp, av/*, me/* only when they changed.
4. Test on phone 390px and desktop 1280px with no console errors. Published pages add `img{max-width:100%}` – inject it in local tests. Canvas tests via `python3 -m http.server`.
5. Commit the changed source to the repo after each published version.

## Data notes
- Item ids: Temu T+n, Shein S+last4+line, AliExpress A<key>_<j>, Temu from PDF T<last6>_<j>. src: t1, t2, sh, ae.
- Temu/Shein links can't be fetched from the sandbox – use her screenshots.
- On the phone the site must be opened in Chrome (inside the Claude app the file picker is blocked). Clipboard read is blocked; paste uses a contenteditable zone.
- Keep original photos; cuts are only for the avatar. Design is warm ("חמים").

# הסקיל של האווטאר (sara-avatar)
---
name: "sara-avatar"
description: "Use when Sara's avatar is involved: writing GPT prompts for her avatar or clothes, cutting GPT sheets, building 360 layers, or dressing the avatar."
---

# Sara's avatar – rules and pipeline

## Rules that never break
- On the avatar use ONLY pictures Sara made/uploaded for the avatar. Never pictures from the closet/book, never the site's automatic background removal.
- When cutting GPT sheets remove ONLY the grey background. White is a garment colour and stays.
- One GPT prompt = one message (the avatar sheet + the item photo → result), and it says exactly what she bought.
- When she asks for a format ("אותו פרומפט, רק עם פאה") give exactly that text with only the change. Do not invent a new structure.
- Her measurements: height 156, bust 94, waist 73, hips 96. Pose: right hand on the waist, left arm straight down.

## GPT recipe that keeps her face
Same GPT chat. Step 1: one image (front or face close-up) with the change. Step 2: "8 זוויות, אל תשני את הפנים" with the 8-angle cover sheet as template (2 rows of 4: front, half-right, right, back-half-right / back, back-half-left, left, half-left). Editing a whole sheet directly loses her face.

## 360 layers (files in closet/avatar8, details in docs/avatar8/HANDOFF_new_avatar.md)
- Base doll = the new cover doll: new2/sheet_cover.png → frames c1–c8, crop with new2/offs.json + SH shift (360×541 per angle).
- Every item = GPT edit of the base sheet → crop → align each angle (legs/lower body) → diff against the bare frames → transparent layer per angle. A sheet edited from another sheet is diffed against THAT sheet.
- Clean-up: cap/layer.py (--head for head covers, --small for jewelry), hemclean.py on skirts/dresses/coats, rimclean.py on every layer, crownfix.py for hair, nowarm.py / defringe.py for orange rims.
- Wig: new2/wiglayer.py (head zone = all changed pixels, below = hair-coloured pixels joined to the head).
- Any item must swap alone in any combination; head (cover/scarf/wig/none) and makeup are independent. Stack order is internal only.
- 360 page: https://claude.ai/artifact/F2YZkYe3XnrEbBm2HFRGo2 · prompts page: https://claude.ai/artifact/T45B8XHpo1gawrzxv4vfGy (shared prompt builder avatar8/p360.js, copy into both pages).