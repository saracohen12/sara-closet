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