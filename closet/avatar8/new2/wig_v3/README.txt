Wig v3 (25/10 22:17) – Sara's GPT sheet "Eight-View Hollywood Glamour Waves" (sheet_wig3.png): the cover doll with long wavy brown hair, same 8 angles and order,
NOT pixel-aligned with sheet_cover (re-drawn; heads sit 5–14px higher/lower than the body says).
Method (no cutting on the face any more – v2's "hair around her own face" was what Sara called מזעזע):
 1. reg3.py   – crop the 8 panels (white dividers at x 359/360, 722-724, 1084/1085, y 539/540) → raw1-8; register each to frames/c<i> on the body below the hair (scale+shift, IoU rows ≥270) → reg3.json.
 2. p3.json   – per view head transform measured by hand on gridded zooms (eyes/mouth/chin front, ear/nose profile): wig anchor aw → doll anchor ad, scale k;
                rm = doll rows taken away (her head above the chin), cut = wig skin kept down to here (feathered 4px), below only hair.
 3. build3.py – layer = the WHOLE wig head (face+hair) above cut + hair below joined to it. Hair = dark core + caramel waves (skin is redder: a*≥19.5 or a*/b*≥0.8).
                Edge matte on R-B against the blue backdrop, every see-through pixel recoloured from the nearest solid pixel (no blue rim). The wig's own dress never comes along.
                BEH=1 → wb1/2/8 (hair behind neck and shoulders, front views). out/cmp<i>.png = doll | on photo | on cream.
 4. live3.py  – turn.json on the layers (premultiplied); head-less doll bases: nh<i> (photo, head inpainted with the backdrop) and ch<i> (cut-out, head alpha 0).
Site (v184): r360.js paint() uses nh/ch when head=='w' so no cap can peek out; a8/w*.webp, wb1/2/8, nh*, ch*, t_w.webp. Old v2 files in ../wig_v2/before_v184.
