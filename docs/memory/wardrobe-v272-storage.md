---
name: wardrobe-v272-storage
description: v272–v273 (27/10) storage fixes in Sara's closet – WebP sheets on upload (slim272), background shrink of stored PNG sheets (SLIM273, db slim272), 🧹 renames backups so packed/old files free now
metadata:
  type: project
---
Limits: 5,000 files AND 1 GB (27/10 23:15: 4,742 files, 856 MB). GPT sheets were PNG ~1.8 MB each – most of the bytes.

- v272 slim272.js (prepended to sp262 in book3.py): `slim272(blob)` → WebP q.95, same pixels, only if ≥40% smaller. Used where sheets are STORED: av188 up() (a.upload), sty199 put1 for style sheets + stylegrid, gpt250 'whole'. First cut still runs on her original file. Checked: cut identical-ish on 3 sheets (1.75MB→0.16MB).
- v272 clean262 (🧹): backups (backup83) used to pin the 8 old files of every packed item for a week, so packing freed nothing. scan() now builds bkMap: same item, same src+t, positional L/M → old id→new name; mapped ids not used elsewhere are freed, and go() first rewrites backup 'items' text (bkFix) – a backup that fails to update keeps its files. Test t272: 104 freed, 0 referenced deleted.
- v273 SLIM273 (in slim272.js): every 6 min (first after 90 s) up to 12 stored PNG/JPEG >600 KB referenced by items (a8, a8up, tx, whole) or styles.src: fetch → slim → upload → check same W×H → re-read doc → swap id in those fields (putItem / styles update) → db 'slim272'/<old> {n,t,from,to}. Skips (localStorage slim273s) if not smaller; stops when store is 2 files from full. clean262 reads slim272 (not counted as used) into MAP and normalises src for bkMap. Test t273: 4 sheets swapped, old PNGs freed by 🧹.
- Deletes still only on her 🧹 press; code deletes only its own just-uploaded file when a check fails.
Commits 43d1b93 (v272), ea65c6c (v273). Related: [[wardrobe-v267-analysis]], [[wardrobe-v271-top-tear]].
