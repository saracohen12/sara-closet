25/10 17:35 – the new base doll (Sara chose it): sheet_cover.png (GPT, 1448x1086), sent via the upload-inbox page.
frames/c1..c8.png = live n1..n8 on the 360 page (F2YZ). Crop: panel origin offs.json[i] (x0,y0) + shift SH=[(-2,2),(-3,0),(-6,-2),(0,-1),(-5,1),(-4,0),(6,0),(2,2)] (dx,dy) -> 360x541. The shift lines the legs up with the previous doll (old_n/).
Every new item = GPT EDIT of sheet_cover.png -> crop with the same offs+SH -> diff against frames/ (cap/layer.py logic).
wig_on_old/: wig layer lw1..8 cut from sheet_wig_on_old.png (an edit of the previous doll new8_try1, aligned within 1px). Clean, but it carries the old face, so it can't sit on the new doll. Wig must be redone as an edit of sheet_cover.png.
