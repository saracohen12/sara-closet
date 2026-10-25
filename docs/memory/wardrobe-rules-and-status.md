---
name: wardrobe-rules-and-status
description: Sara's standing rules for the wardrobe site, GPT image process, and open to-do list (from handoff doc 2026-10-21)
metadata:
  type: feedback
  modified: 2026-10-20T22:22:51.805Z
---

Site: [[wardrobe-artifact]]. Built in another Claude account; handoff doc pasted 2026-10-20. Source = closet_source.zip (work/book3.py builds site, `python3 book3.py`, update PUB/book.html paths); site = closet_site_ready.zip (site/index.html + av, cut, gpt folders; data_export/marks_from_site.json = her 52 marks, collections items + settings). Both zips stored at /mnt/project-files/closet/ (closet_site_ready.zip, closet_source.zip). On 2026-10-20 all 52 marks were imported into the artifact db (collection items; settings already matched). Live site already published in this account, same as the zip's index.html. 2026-10-20: added imgup.js (auto-crop phone screenshots on item photo upload, history strip "תמונות קודמות" with original + uncropped, paste support, clear saving status). Changed source files are in /mnt/project-files/closet/src_changes/ — overlay on work/ before rebuilding. Item db fields: img (current asset id), imgs [{id,t,c|raw}] history, pics [{id,k:label גב/צד/פרט,t}] extra photos (multi-upload, paste target toggle). Runtime gotchas: see [[wardrobe-artifact-gotchas]]. Links to Temu/Shein can't be fetched from the sandbox (proxy blocks) — use screenshots.

Rules:
1. Always Hebrew, simple language. Sara works mostly from phone.
2. Keep original photos; cut/clean images only for avatar dress-up. Closet shows originals.
3. Design is "חמים" (warm) only; sticky top bar.
4. Clothes split חול/שבת; item can be both; toggled by button on the item.
5. New categories allowed, items movable, counts update.
6. Head covering optional in looks (sometimes wig).
7. Image name = item id (T183.png); back = T183_back.png.
8. GPT collage (name on top, 3 parts מקור/חזית/גב): cut front+back, remove bg, save to gpt folder, publish.
9. Test before publishing (mobile: touch scroll, dialogs, errors); be honest about what is impossible.
10. Sara likes upgrades: do recommended improvements found along the way and report.

IDs: Temu T+number; Shein S + last 4 chars of order + line (S1BGU_4). Return windows: Temu 90 days; Shein 72 days except 17QJ→25/10, N4WS→26/10, 0MNA→20/10, 2MH3→3/11, 1A5K→25/10. Plan: return mainly duplicates.

GPT round 1 done (T11 missing). Round 2 sent, awaiting: T19,T104,T133,T158,T180,T198,T219,S1BGU_2,S1CNR_4,SMEX3_4.

Open: round 2 + T11 into site; screenshot 79 Temu dresses/skirts to replace small images; then tops/skirts/jackets via GPT; mark returns; remaining bug screenshots; 2 blue floral dresses from first GPT test not in closet; upgrade idea: try on not-yet-bought item on avatar; kids' names & sizes in ילדים tab. Not possible in-site: weather, auto email pull, price tracking. New orders via Claude (Gmail or receipts/screenshots).

Paste (2026-10-21): in the Claude app / artifact iframe `navigator.clipboard.read` is blocked, so a "paste" button must fall back to a contenteditable zone + the paste/input events (long-press → הדבק). Sara expects a paste button next to every upload button.
