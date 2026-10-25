---
name: wardrobe-v93
description: Sara's closet v93 (published 2026-10-22) – frame + 24 illustrated backgrounds + backgrounds she writes/uploads, vest slot, jewelry size row fix, measured body numbers
metadata:
  type: project
---

v93 published 2026-10-22 (Version 93 = badge 93). Sources: scratchpad src/work fix93.js/css (after lay91 in book3.py); copies in /mnt/project-files/closet/src_changes/v93 (incl. bg/*.svg + gen.py that draws them).
- Frame (#fr93) behind the stage in .smain: SET.fr93={c colour (14), m tight=6cm sides/wide/full}; the 🔍 window gets the same frame (window.fr93wrap). Stage loses its own bg when framed.
- Backgrounds: BGS 's_<k>' = bg/<k>.svg (24 scenes, published as artifact files – republish must keep them); her own in SET.bgx [{k,n,u}] – "✨ צרי רקע" asks Claude (sample) for an SVG (sanitized, uploaded to assets), or a photo upload, or a copied GPT prompt. Window "🖼 רקע ומסגרת" (🖼 next to 🔍, and ⋯ עוד). First open switches grey 'studio' to 's_parch' once (SET.bg93seen) – she said grey is boring.
- Vest: own slot 'vest' (z 35, between top 30 and jacket 40), drawer = outer/tops/sweaters named וסט/אפוד; geometry borrowed from 'outer'.
- Jewelry part row (➖➕ per שרשרת/עגיל) was cut off on desktop – now wraps; on phone it comes right after the name.
- Prompts: "whole garment inside the panel, margin, nothing cut" (old line "fills the panel height" caused GPT cropping); grey garments → light green background; coverings sit on a bobo per tie (low back / high / none).
- Measurements now in fix91 ME0 (old SET.me91 ignored until she edits, SET.me93). Head 52/32/30 is her real head (wig-maker measured, smaller than XS); she has no bobo to measure.
- Global error toast ignores "ResizeObserver loop" (it fired from the frame observer).
Related: [[wardrobe-v91]], [[wardrobe-two-file-sheets]].
- v94 (same day): BIG fix – db onSnapshot objects are read-only, so SET (settings/main) and PLAN never changed: every saveSet wrote back the old {avbase:'short'} (backup83 of 10:14 already showed it). hub.js now JSON-clones SET/PLAN/CREDITS from snapshots. Lesson: never keep d.data() as a mutable global – clone it. Also 💬 open-GPT buttons: background prompt via chatgpt.com/?q= (auto-filled), garment prompt sheet copies + opens chatgpt.com (images must be attached).
