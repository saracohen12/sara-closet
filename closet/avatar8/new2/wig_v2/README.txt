Wig v2 (25/10 20:40) – Sara: "יש בעיה מלאה עם הפאה בכל הזוויות".
Found: her wig sheet turns the OTHER way (views 2-4 and 6-8 are mirrored vs the cover doll), and v1 pasted the wig sheet's whole head
(another face, wrong place on the neck, blue backdrop patches over the collar).
v2 keeps the DOLL's own face; only the hair comes from the wig sheet:
 - build2.py: per-view flip/scale/shift measured on eyes, nose, chin (front) and head centre / ear (back) – table R.
 - hair = dark (L<50) & far from the wig backdrop, closed, joined to the head; wig's own face removed; no hair inside her face.
 - cap: grey-beige (a*<11.5, b*<15.5) above the neck -> inside the new head outline = nearest hair colour, outside = inpainted backdrop.
 - BEH=1 -> lwb*.png: front views 1,2,8 with the hair behind her neck and shoulders (necklines and necklaces visible).
 - norm_layers.py applies turn.json -> live/ (360 page F2YZ v24 uses live/lw*.png; closet v180 a8/w*.webp + wb1,2,8).
