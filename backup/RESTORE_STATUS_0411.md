# Restore to the new account – status (4/11/2026)

New copy (this account): https://claude.ai/artifact/HRNDqDjgDUStZnjQVCCjpq
Old site, not touched: https://claude.ai/artifact/HY6no4fCJwNunBtm6GVA8V

## Verified
- Code: `work/` on branch `claude/project-thread-6oxwf5` is identical to commit 665069d (v338). `version.txt=338`.
  The 337 found in `closet_transfer_all.zip` came from 29/10 (v337 backup button). Only the v338 returns screen in `orders123.js/.css` changed after that.
- The live old site is v338 (`VER='338'`, 890 catalog items, 100 orders in the catalog).
- The page built from the repo matches the old live page character for character. The only difference is the order of two size options (`3-4Y`, `4Y`), which comes from Python set ordering.
- Static files: 298 of 300 hash-identical to the old live site (a8, av, bg, gpt, th).
  The 2 missing files were `av/p5_front_neck.webp` and `av/p5c_front_neck.webp`. They are in `work/me/`, but `book3.py` never copied them. **Fixed** in `book3.py`.
- Cut packs (`cut/*.json`): the live packs hold 639 entries. The page's cut list (CM) holds 600, and those 600 are pixel-identical to the repo build. The 39 extra live entries (T591091_*, S1100_*, some A* scarves) are not in CM, so the live site never shows them either.
- New copy published with 315 files (same as old), capabilities assets/db/downloads/sample{images}/user. Its database is empty (checked).

## Blocked – needs Sara
- The 6 backup ZIPs (`closet-backup-N-of-6.zip`, made by "💾 גיבוי") are not in the repo or Google Drive.
  Without them there is no `data.json`/`assets.json`, so the newest marks, looks, styles and the ~3,360 uploaded pictures can't be loaded.
- This account sees the old site only as a public page. Its asset store and db are not reachable here (`assets list` → not_found).
  So `from_url` + `asset_ids` can't be used unless the old site is shared with this account as an editor.

## Data available now (repo, not loaded yet)
- `backup/2026-11-04/db`: items 670 + orders 51 from 4/11; other collections from 29/10. No JSON errors, every item id is in the catalog, and no broken look references.
- These rows reference 1,514 asset ids. Those pictures exist only in the old asset store or the ZIPs.

## Update 4/11 evening – data and images restored
- 6 backup ZIPs from Drive: CRC OK, 1,587 images, no missing/, assets.json = files. All uploaded to the new site; 977 db docs loaded with old→new image ids replaced.
- Old-site db export (artifact_data-000.zip, 18:28) identical to data.json on all 977 docs.
- Local browser check with the restored data: admin 888 items / 98 orders (= old site), returns 50/5, looks + avatar images load, no errors.
- Still missing: claude_code_cloud-000/001.zip (main closet thread transcripts); a check by Sara on her phone in the new site.
