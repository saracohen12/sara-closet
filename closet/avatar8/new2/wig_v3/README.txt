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
v185 (25/10 23:20, Sara 22:41 "בעיה בעין" + 22:53 "הסיבובים לא שווים, לפעמים קטנה לפעמים גדולה"):
 - holes inside the head are solid in the colour of the hair around them; edge pixels take the mean colour of the solid pixels around them (one nearest pixel
   copied a 4px black bar beside her cheek in view 8); GPT's near-black line there lifted halfway; outer head edge softened; thin stray strands removed.
 - ONE head size for all 8 views: total scale k*s = 0.97 of the raw sheet in every view (it was 0.90–1.15 from hand-matching the doll's own head,
   which is removed anyway). Kept attached at the neck: anchor = neck centre at cut+3 (views 1,2,4,5,6,8), throat front for the profiles (3: left edge, 7: right edge).
   View 4 raised 7px (its head sat 10px lower than the rest). View 7 rm 78→84 (the doll's chin stuck out under the smaller wig chin).
 - doll head removal widened (dilation 6) so the cover's pale rim does not show past the wig. Old p3.json values: git history (v184).
