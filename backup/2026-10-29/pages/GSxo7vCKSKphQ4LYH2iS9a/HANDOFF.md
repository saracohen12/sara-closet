# הארון של שרה – מסירה לפרויקט החדש (25/10/2026, 18:00)

This file is for Claude in Sara's NEW project. Read it fully before answering her.
The old project ("ארון הבגדים של שרה") hit the chat-upload limit (~338 uploads), so photo uploads there stopped. Knowledge is on this archive page; files are in GitHub (section 3).

## 0. First thing to do in the new project
1. Attach GitHub repo saracohen12/sara-closet and restore the files (section 3), same layout as before.
2. Copy `docs/memory/*.md` into the new project memory (one file per subject; rewrite MEMORY.md index). Read them: they hold all rules and history.
3. Reply to Sara in Hebrew, short and warm, with the table "מה ביקשת / מה עשיתי / מה עוד לא".

## 1. Standing rules (never break)
- Always Hebrew, simple, warm, short. She works mostly from an Android phone (Chrome). She hates clutter on screen.
- She gives many instructions in a row. EVERY update ends with a table **מה ביקשת / מה עשיתי / מה עוד לא** that includes older open requests too. Never forget earlier instructions. Keep `tasks.md` rows accurate (it feeds the admin panel).
- **Avatar-only rule:** on the avatar use ONLY avatar pictures Sara made/uploaded for the avatar. Never pictures from the book/closet, never the site's automatic background removal on avatar images.
- **Grey-only cut:** when cutting GPT sheets remove only the grey background. White is a garment colour and is never removed.
- **GPT prompts:** one message per item (avatar file(s) + item photo → result), write exactly what she bought. When she asks for a specific format ("אותו פרומפט, רק עם פאה") give exactly that text with only the change, do not invent a new structure.
- Her working GPT recipe for avatar variants: SAME GPT chat, step 1 a single front/face close-up with the change, step 2 "8 זוויות, אל תשני את הפנים" with the cover sheet as template. Direct edits of a whole sheet lose her face.
- Keep original photos; cuts are only for the avatar. Design = warm ("חמים").
- Test before every publish: phone 390px and desktop 1280px, no console errors. Published artifact pages inject `img{max-width:100%}` – inject that rule in local tests too (it caused the "small skirt" bug in v115). Canvas tests via `python3 -m http.server`, not file://.
- Be honest about what is impossible, and say how it CAN be done instead.
- She likes upgrades: do recommended improvements found along the way and report them.
- Her measurements: height 156, bust 94, waist 73, hips 96.

## 2. Her artifacts (all in her account, links do NOT change)
| What | Link |
|---|---|
| **The closet site** (main app, v179, db + assets live here) | https://claude.ai/artifact/HY6no4fCJwNunBtm6GVA8V |
| 360 avatar page (v19) | https://claude.ai/artifact/F2YZkYe3XnrEbBm2HFRGo2 |
| 360 prompts page for GPT | https://claude.ai/artifact/T45B8XHpo1gawrzxv4vfGy |
| Upload inbox (send photos from computer) | https://claude.ai/artifact/6QchawxHTNjJ14ZQxeok6F |
| Prompts for avatar (old 5-pose, v7) | https://claude.ai/artifact/N7e2QR7GghzC89Cc2F153a |
| Design system | https://claude.ai/artifact/J8xXwYNTqfBmR2wKadpPaA |
| Smart closet plan (3 features, waiting) | https://claude.ai/artifact/BaWyW7D1pks6ks8rezvnaD |
| Lovable handoff doc | https://claude.ai/artifact/HBXg1gssefG2GfAQ8Upo22 |
| Older: changes since v50 / 50 upgrades / upgrade plan / two-file plan / 360 old | VKEMzizpkT8jy5QvkpEBzJ, 6akg5GFJ3imJLPD4a2eEtJ, DPYGWjWC7SDTAdEjzCU55V, Shk5b8FGHguDv1BgKYpM3a, 2BUbqQvEoVwerpqtwcjXk2 |

IMPORTANT: always UPDATE these by url (Artifact read first, then publish with `url`). Never publish the closet as a new artifact: her marks, orders, looks and uploaded images live in the db/assets of HY6no4fCJwNunBtm6GVA8V and would be lost on a new url.

## 3. Where the files are and how to restore
Artifacts can't hold zip archives, so the FILES live in Sara's private GitHub repo **saracohen12/sara-closet** (she creates it, then the old project pushes everything). Attach it in the new project (add_repo, save_to_project) and clone it.
Repo layout:
- `work/` = the FULL closet source at **v179** (work_full_v122.zip + every overlay v123–v179 applied in order; version.txt=179). Verified on 25/10: it builds (793 items, 600 cuts, badge "גרסה 179"). Use it as `src/work`.
- `closet/avatar8/` (360 avatar: cap/, dressed/ 7 items, hip/, new2/ = new cover doll + offs.json + wiglayer.py + wig_prompts.md + pages/, live_v15/, p360.js, sty.js, st/).
- `closet/` audit_v68, avatar_360, avatar_new (5-pose sheets), p5g, plan_smart_closet, previews, prompts, shabbat, ties, v69–v83, tasks.md.
- `docs/` = same as the docs/ files on this archive page.
Copy `closet/` back to `/mnt/project-files/closet/` in the new project (tasks.md must be at /mnt/project-files/closet/tasks.md).
Plain files on this archive page (`docs/`): tasks.md (349 rows, the full request ledger), memory/ (36 memory files), avatar8/HANDOFF_new_avatar.md, site_changelog_README.md (per-version notes v24–v122), audit_v68_*, plan_smart_closet.html. Read them with Artifact read + path.
NOT copied (superseded): closet_source.zip / closet_site_ready.zip (the Oct-20 import) and the intermediate src_changes/vNNN folders – all already inside work/.
If the repo does not exist yet: the old project "ארון הבגדים של שרה" still has everything in its project files; ask Sara to create the repo and tell the OLD project thread "להעביר את הארון לפרויקט חדש" to push.

### Building the closet
- `book3.py` contains `<SCRATCH>` placeholders for PUB and book.html: replace with your build folder (`<SCRATCH>/build/pub`, `<SCRATCH>/build/book.html`). Run it from inside `work/` (it imports gentasks.py from there).
- `gentasks.py` reads `/mnt/project-files/closet/tasks.md` → tasks172.js. Put tasks.md back at that path (or pass the path) before building.
- Bump `version.txt` to the next artifact version before every publish (badge must match). Next = 180.
- Publish: Artifact publish book.html to url HY6no4fCJwNunBtm6GVA8V, root=build/pub, plus files (th/*.json, cut/*.webp, av/*, me/* …) only when they change. Per-version details: docs/site_changelog_README.md and memory files.
- Item ids: Temu T+n, Shein S+last4+line, AliExpress A<key>_<j>, Temu-from-PDF T<last6>_<j> (temu/inv_tn.py). src values: t1, t2, sh, ae.

## 4. Open work (where to continue)
### A. 360 avatar (most active, see docs/avatar8/HANDOFF_new_avatar.md)
1. **Wig sheet** – Sara is running the 2-part wig prompt in GPT (prompt in the old thread at 17:49, also new2/wig_prompts.md). When it arrives: crop with new2/offs.json + SH shift, align each angle by the legs to new2/frames, run new2/wiglayer.py, replace lw1–lw8 in F2YZ (currently a TEMP full-frame swap with the old face).
2. **Closet avatar = only the new one**: waiting for her 2 closet files p6c_sheet1/2 with the new head → me/p6c_* + head layers, drop old avatars from the choice (fix96.js), v180. She said "first only the wig".
3. **Re-dress the new cover doll**, one item at a time: denim maxi skirt, navy blouse, jeweled belt, black shoes, necklace, earrings, blue bow scarf (GPT edit of sheet_cover, crop offs+SH, diff vs new2/frames; layer.py/hemclean/rimclean/crownfix).
4. Later: put the 360 avatar into the closet studio as an extra option; any item swaps alone in any combo (promised); head (cover/scarf/wig/none) and makeup are independent choices.
### B. Orders tracking (old thread "מעקב משלוחים לפי הזמנות")
- Temu PO …591091 (25/10, 17 items): waiting for the big product photos (now small receipt thumbs).
- Older Shein orders: waiting for real photos from her.
- Cancelled shirt: mark "💰 הכסף חזר" when the refund arrives.
- Shirt with a different-coloured stripe: needs to be re-uploaded.
- Gmail connection for automatic orders: offered, waiting for her decision.
- From 24/10 (moved to orders thread): stay at the same scroll position when opening "ניהול הפריט"; returns list on the home screen grouped by order with deadlines (mostly built in v178 – verify with her).
### C. Smart closet plan (waiting for her approval)
3 features: (1) location + laundry – needs room/closet names or photos; (2) sorting old clothes; (3) shopping advisor + archive. Recommended order 1→2→3. Public app / Lovable: shelved until the closet is finished.
### D. Small open items from tasks.md
- Head circumference (for scarf length) – waiting for her number (#138).
- ~20 wig hairstyles (#142), hairstyles 6–20 / 13 ties / 20 makeup thumbnails missing.
- Arms layer for dresses/tops (#211), half-side collar (#53), "✨ לתקן ב-GPT" button idea (#125).

## 5. Known traps
- Opening the site inside the Claude app blocks the gallery/file picker → she must open it in Chrome (the site says so).
- Clipboard read is blocked in the artifact iframe → paste uses a contenteditable zone.
- Temu/Shein links can't be fetched from the sandbox → use her screenshots.
- Upload inbox: ArtifactData list collection "uploads" on 6QchawxHTNjJ14ZQxeok6F, then Artifact read path=<asset id>.
- In the new project, chat uploads work again (fresh limit) – prefer them on the phone; the inbox is a backup.
