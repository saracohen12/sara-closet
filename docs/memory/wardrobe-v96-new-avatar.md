---
name: wardrobe-v96-new-avatar
description: v96 (2026-10-22): new cap avatar p6c_* from Sara's 2 GPT files is live; how it is wired, swap of body tables, old-garment rule, wig pending
metadata:
  type: project
  modified: 2026-10-22T17:53:47.373Z
---

v96 published 22/10: the new avatar with the skin-tone cap (from her GPT files f1a = 3 poses, f2b = 2 poses) is the default "האווטאר החדש · מהמידות שלך" in the base chooser; the previous one is renamed "האווטאר הקודם" and stays.

How it works (fix96.js): pictures av/p6c_{front,side,back,half,hip}.webp + head/neck overlays, same 399×1365 frame (head top 38, feet 1328; hip pose scaled to fit width, top 240). Body tables measured on them (P5BODY, WAIST91, FIT_WAIST.p5, FEET85, TIEHEAD, JWL, BODYW, BASES.p5 fractions) are swapped in place by use96() at each stageInner/drawStudio; html rewrite av/p5c_ → av/p6c_. SET.av96='old' = previous avatar. WAIST91 / FEET85 were block-scoped → exposed via window. Source scripts + tables.json + landmarks.jpg in /mnt/project-files/closet/src_changes/v96.

Rule: a look containing a garment whose GPT 5-pose picture (p5g) has no av:'p6' is shown on the previous avatar (old renders don't fit the new body, esp. half/hip). New p5g uploads made while the new avatar is chosen are marked av:'p6'.

GPT avatar sheet ("🧍 גיליון האווטאר") now offers her two files p6c_sheet1/2.jpg (copy/download), link to the old sheet.

Wig: her file 1 with wig (22/10 17:48) has the SAME body geometry as the cap version (pixel-close) but the face lost the smile/looked tired – sent her a GPT fix sentence; waiting for fixed file 1 + file 2 with wig. Hair falls behind the shoulders on purpose (necklines visible); back view hair will need a head+hair overlay above garments. Until then wig looks use the previous avatar.
22/10 18:26: wig try 2 (file1 1467×1072 + file2) – body matches cap within 1–3%, but face differs/older; Sara doesn't like it. Recommended an EDIT of the cap image in a new GPT chat (prompt cards "פאה בעריכה" on the prompts page) so the face stays identical. Tries saved in avatar_new/v95 (wig_file1_try1/2, wig_file2_try1).

v97 (22/10 18:50): wig avatar live – av/p6w_*.webp from her EDITED cap images (edit in GPT kept face identical; file 1 pixel-aligned to cap, file 2 half pose was turned the other way → mirrored + shifted 78px to match the cap body, IoU .955). p6w_*_head = head + hair (hair mask = wig vs cap pixel difference; half by darkness), drawn above garments (back/side hair over the garment). Same body tables as cap. Lesson: for avatar variants (hair, makeup) ask GPT to EDIT the cap image, not redraw.

Related: [[wardrobe-two-file-sheets]], [[wardrobe-avatar-only-rule]], [[wardrobe-v93]].
