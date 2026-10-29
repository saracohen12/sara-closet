---
name: wardrobe-v199-styles
description: v199 styles library on the 8-angle avatar – hairstyles for the wig, ties for a cover (tinted), makeup; db 'styles', cut8 modes hair/tie/makeup, studio rows, 50 makeup prompts
metadata:
  type: project
  modified: 2026-10-26T07:49:17.706Z
---

26/10 (Sara 09:24–09:25 local): "איפה אני מעלה" 20–30 hairstyles for one wig, 20–30 tie styles for covers, and makeup (50 looks in close-up first, then 8 angles).

**Built (v199, files work/sty199.js, sty199p.js = all prompts, sty199.css; cut8.js + r360.js changes):**
- Library dialog "🎨 תסרוקות, קשירות ואיפור" (window.STY199.open(tab)), opened from the studio (button under "על הראש", "＋ עוד" in each row) and from R360.prompts().
- Each style = one GPT EDIT of a8/sheet.jpg (the cover doll) → uploaded → cut8.run(kind): `hair`/`tie` = mode 'whole' (everything above the neck row NK=[81,88,94,82,64,87,83,77] on f1-8 + changed pixels below joined to the head; drawn on the head-less doll nh/ch like the wig); tie also returns the fabric alone (grey, diff>30 & low saturation) + its median luminance `lum`; `makeup` = mode 'face' (loose ovals FACE per view, alpha by how much the face changed; views 4–5 empty).
- db collection `styles`: {set:'hair'|'tie'|'mk', n, t, src, L:[8 asset ids], M:[8] (tie fabric), lum, cv}. r360 keys: yh<id>, yt<id> (+ fabric zt<id>), ym<id>; ST.head holds a hairstyle/tie key, ST.mk the makeup, ST.tf the cover the tie is made of, ST.tc its colour (tinted()).
- Studio: wig on → row of hairstyles; a cover on → row of ties, then 12 colours + "כמו הכיסוי" (median colour of the cover item's front layer). Makeup row always (not drawn on her first wig: its face is another drawing, misaligned 25–40 grey levels).
- Tie prompt asks for a plain medium-grey fabric so the site can paint any colour (patterns are not kept).
- Makeup step 1: 7 prompts (יום-יום 9, עבודה 6, ספורט 4, שבת 8, חג 7, אירועים 8, חתונות 8 = 50), numbered grids from her front close-up. Step 2 prompt takes the square number. Also sent as /mnt/project-files/closet/prompts/makeup_hair_ties.md (repo closet/prompts/).
- a8/wig_ref.jpg = her wig front/side/back, for the hairstyle prompt's colour.

Tested only with synthetic sheets (mechanics). **When she uploads real ones: check all 8 angles** ([[wardrobe-check-8-angles]]): neck seam (fade over 3 rows below the head line), beige cover peeking, hair over garments, makeup alignment. Related: [[wardrobe-v190-cut8]], [[wardrobe-ties]].

v201 (26/10 ~09:00 UTC): Sara's own list of 20 tie styles (English "Tying Style Details") → sty199p.js TIES + tieW(name,details) (only the doll is attached; #12 not sheer, #13 two greys). The 🧕 tab shows them as buttons: tap copies the prompt and names the upload. Same text as /mnt/project-files/closet/prompts/ties20.md (written in the orders thread). Another thread (orders) also builds and publishes the site: always `git pull` the branch before building, and expect the artifact version to have moved.

Later versions (v202 tie per cover, v203 shadow fix, v204 picture cards and studio): [[wardrobe-v202-ties-cards]].
