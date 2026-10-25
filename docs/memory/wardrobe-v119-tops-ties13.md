---
name: wardrobe-v119-tops-ties13
description: v119–v120 (22–23/10/2026): tops placed by her shoulders, tucked top keeps sleeves, collar over neck layers, the 13 named scarf tying styles with one prompt each
metadata:
  type: project
  modified: 2026-10-23T00:16:19.498Z
---

v119 (Sara 23:50: "the blouse doesn't sit well – fix the prompt or the avatar?"):
- The cause was the site, not the avatar or the prompt. fitTop116 in fix114.js places tops, sweaters, jackets, dresses and sets from 2 GPT files by her shoulders: shoulder line on shoulder line, width just under the shoulders matched.
- Only new uploads get it. Her blouse S17QJ_13 was re-cut and rewritten (item version 15; the old fit is kept in p5g118).
- "חולצה בפנים" (23:53): the tucked top used to sit at z 8 under the arm110 layer, so the arms hid the sleeves. Now it stays above the skirt (skirt+3). Below the waistband it shows only where there's no skirt, plus over her arms (except in the hip pose).
- Avatar arm sticking out of the sleeves is erased from both the body and the arm110 layer.

v120 (Sara 00:07: white strip under the blouse, collar "closed"/cut in half and front):
- Strip: the torso erase went down to the cuffs. Now it stops at the top's hem in each column.
- Collar: the head/neck overlays (sh) are erased where the top is, below her chin, so the collar stands around the neck (as in the product photo). The overlays get a data: src plus data-p6, with CSS for sh[data-p6].
- An attempt to cut the collar out of the garment looked like a round neck. Don't do it.

13 ties (Sara 23:59 gave her master prompt):
- TIES120 and tiePrompt120 live in fix120.js. Each style has he/en names, a short Hebrew description and English details. The prompt is: 2 cap avatar files + scarf photo, one image with 4 panels, floating hollow scarf, grey background.
- In the scarf window, "🧕 13 קשירות" opens #ties120. "🚀 ל-GPT" opens the g106 send window (pr102 is wrapped while TIEGO120 is set).
- The uploaded tie takes the picked style's name (PICK120 in localStorage).
- These are also in the prompts page v8 (N7e2QR7GghzC89Cc2F153a).
- fix102 now exports window.blob102 and window.save102.

Related: [[wardrobe-ties]], [[wardrobe-v114-body-in-prompts]], [[wardrobe-v110-arms-layer]].

v121 (00:19) – Sara's 20 chosen wig hairstyles:
- HAIR121 (he name, her original number, en description) and hairPrompt121 live in fix121.js. The prompt asks GPT to EDIT her 2 wig files (p6w_sheet1/2) and change only the hair.
- The #hair121 window opens from the pr80 prompts window and the studio menu. "ל-GPT" copies the prompt, then shares the 2 wig files on the phone or saves one zip on a computer (window.zip109 is now exported).
- Also on the prompts page v9.
- There is NO hairstyle upload in the site yet: Sara sends the GPT results in the thread and I install them, like the v97 wig.

v122 (00:22–00:28), tops sticking out ("I look outside the garment"):
- Side pose: the top is re-centred on her body (median row centres) and widened sideways when slimmer (k up to 1.45), all at display time in fix114 work(). Behind its back edge (down to the back hem) her back and neck are erased.
- The torso erase stops at the body's hem: the 60th percentile of non-arm bottoms across the span, so it isn't the cuffs.
- Flat light-grey gaps between sleeve and body are removed, but only on tops whose median isn't light.
- Sara was right that the clipped top was cut at the stage edge. It is now output on a canvas 0.6×W wider on each side (wide()), with style width OW/W.
- BUG found: ERR is not global (each IIFE has its own), so ERR() calls in fix114/120/121 threw ReferenceError inside catch blocks. They are renamed ERR114 and defined at the top of fix114. `med` is not in work's scope either.

Coordination (23/10 06:40): the "מעקב משלוחים לפי הזמנות" thread builds v123 (orders123.js/css, appended after fix121 in book3.py) from src_changes/v122/work_full_v122.zip (the full src/work at v122). Before the next publish here: take their v123 files and keep orders123 in the concat.
v123 (orders view) was published by the other thread. Its files (orders123.js/css, book3.py, book4_tpl.html, version.txt=123) are copied into src/work, and the build includes them. Its capabilities now include sample:{images:true}: omit capabilities on publish so the setting is kept.
v124 (orders screen round 2) was published by the orders thread. Its files (src_changes/v124: orders123.js/css, book4_tpl.html with beforePut names incl. mb/mbr, book3.py, version.txt=124) are copied into src/work and the build is checked. v125 (orders, refunds) also published by them and copied in. v126 (they fixed imgup.js addPics crash when all uploads fail: upl() retry+shrink, upWhy()) copied in too. v128 (orders thread: 🎀 chip in order rows) copied in. v129 (imgup upload retry queue closet_upq) copied in. v130 (imgup 45s timeout, uplog) copied in. 
v127 (Sara 07:39, belts): IT[id].blt = y/n/u ("הגיע עם חגורה?") for clothing (GROUPOF=='clo' or wedding, not belts). fix127.js (after orders123 in book3.py): row in item window + ask box on top of g106, and pr102 always adds "בלי חגורה – להוריד, פס המותן התפור נשאר". Prompts page v10 too. Orders thread adds the chip in its rows (v128).
v131 (Sara 08:25–08:27): in "🖼 כל התמונות" (fix102 pk102) each own photo has 🗑 (del131, undo toast) and a role select (lab131: ⭐ ראשית/קדימה/גב/צד/חצי צד/פרט/על הגוף/צילום שלי). Store photo is hidden via IT.hideo (all102 + galList wrapper skip it). On phone the old "✏️ סידור ומחיקה" is buried in "עוד אפשרויות". v132 (orders thread: new Shein order MU9J; book3.py from them has a PUB placeholder and their build path — replace with ours) copied in. v133 (orders thread) only added th/{belts,dresses,makeup,other,sets}.json+.js files (page = 132). v134 (cutouts for MU9J/15Y6: cut/meta.json, cut/*.webp, srcimg) copied in. v135 (imgup autoCrop fix) copied in. v136 (orders123 Temu account) copied in. v137 (orders123 shop button) copied in. v138 (orders123 order number copy) copied in. v139 (orders: putOrd merge, IT.pn) copied in. v140–v141 (orders123 only) copied in. v142–v143 (imgup queue bytes, orders cards) copied in. v144–v147 by orders thread; v148 mine (see wardrobe-v148-autofit). Next publish = 162 (v149 prompts+big look, v150 🎞360); publishing only index.html keeps those files.
