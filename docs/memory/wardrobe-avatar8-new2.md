---
name: wardrobe-avatar8-new2
description: 25/10 new 8-angle cover doll (now ARCHIVED: 23:50 Sara went back to the previous smooth-hair avatar); crop offsets, wig, migration
metadata:
  type: project
---
25/10/2026 17:35: Sara sent (via [[wardrobe-upload-inbox]]) a new cover sheet + a wig sheet and chose the cover sheet as the doll ("תשתמש בחדש"). F2YZ v18: n1–n8 = that doll, sheet_new.png = that sheet, head toggle 🧕 כיסוי / 💇 פאה (wig disabled "בדרך"), desktop grid fixed (rows repeat(6,min-content) 1fr).
Files: /mnt/project-files/closet/avatar8/new2/ (README.txt has crop offsets offs.json + SH shift; frames/c1–8 = live n1–8; old_n/ = previous doll).
Wig: her wig sheet was an edit of the PREVIOUS doll (new8_try1) → layer cut clean (new2/wig_on_old, wiglayer.py: head zone = all changed px, below = hair-coloured px joined to head) but carries the old face. Asked her for ONE GPT edit: new cover sheet + her wig sheet → wig on the new doll. Then cut with wiglayer.py vs new2/frames and enable the button (lw*.png).
Items: every item = GPT edit of sheet_cover.png, crop with offs+SH, diff vs new2/frames.
Still waiting: closet p6c_sheet1/2 with the new head (v180).
Migration: Sara wants a NEW project after the avatar is done (uploads blocked here, chat-upload limit). Plan agreed: artifacts stay in her account; pack work files (src/work, avatar8, scripts, tasks.md) + memory into one archive artifact + handoff summary; new project reads it.
17:42 F2YZ v19: wig button ON as a TEMP full-frame swap (lw1–8 = whole wig-sheet frames, old face). Replace lw*.png with real layers (wiglayer.py) once the wig-on-new-doll sheet arrives.
17:45: Sara's working GPT recipe for avatar variants = SAME GPT chat, step 1 face close-up with the change, step 2 '8 זוויות, אל תשני את הפנים' with the cover sheet as template (direct sheet edits lost the face). She asked for this 2-step format explicitly; prompts in new2/wig_prompts.md. Result will NOT be pixel-aligned: align per frame (lower body), head zone from the wig sheet.
17:55: Sara is moving to a NEW project now (packing thread 'להעביר את הארון לפרויקט חדש'). HANDOFF_new_avatar.md rewritten with full current state; previous copy new2/HANDOFF_before_1755.md; page sources in new2/pages/.
23:20: Sara dislikes the new-doll wig (hair looks cut/stiff; F2YZ v24 lw = small layers made in a later session). She asked to see the previous smooth avatar (original 8-angle f1–f8 / cap c + loose-hair lh, which already has all clothes). F2YZ v25: old base button renamed '✨ האווטאר הקודם (השיער החלק)'; comparison closet/avatar8/compare_old_vs_wig.png. Waiting for her choice old vs new. Nothing deleted.
23:50 DECISION: Sara stays with the PREVIOUS avatar ('נשאר עם הישן הוא יותר טוב'). F2YZ v26: default base = old (cap c + loose hair lh + all clothes layers), initial imgs f1–8; new doll kept as 'הבובה החדשה (בארכיון)'. New items go on the old cap pipeline (avatar8/cap). HANDOFF updated at top.

## Also in the "החדש" project copy (merged 4/11 from claude_code_cloud export)
25/10 19:30 (new project): wig DONE on the new doll, F2YZ v20. GPT 8-angle sheets from her 2-step recipe are NOT pixel-aligned and use their own grid (find white divider lines; don't crop with offs.json) and some angles come mirrored. Method in closet/avatar8/new2/wig_new/README.txt (body-IoU registration + head transplant + inpainted backdrop). Item sheets that arrived 19:10–19:18 (skirt, blouse, belt, black sneakers, navy satin scarf) are in new2/sheets/, waiting to be cut. Repo work goes to branch claude/project-thread-6oxwf5.
25/10 19:40: F2YZ v21 = new doll DRESSED with 7 items (x<key><view>.png: xn shoes, xs skirt, xb blouse, xg belt, xj necklace, xk scarf, xe earrings) + wig with hair-end darkness matte. Item sheets that are GPT edits of sheet_cover ARE pixel-aligned (crop with offs+SH). Pipeline + rules in closet/avatar8/new2/items/README.txt. Next: put this 360 doll into the closet studio; more items as she sends them.
- Lesson (belt v22): silver/pale jewelry on a blue backdrop is dropped by layer.py's notbg rule; cut belts with new2/items/belt2.py (band rows, any change vs doll, no skin).
- 19:50 F2YZ v23: views normalized for the turn (closet/avatar8/new2/turn/norm.py + turn.json). New layers: cut vs new2/frames, then pass through norm.py. Scarf/head covers: items/scarf2.py.
