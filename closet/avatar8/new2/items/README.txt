25/10 19:40 – items dressed on the NEW cover doll (360 page v21, files x<key><view>.png):
xn shoes (black knit sneakers), xs denim maxi skirt, xb navy printed blouse, xg jeweled belt, xj blue statement necklace, xk navy satin scarf (head), xe navy pearl earrings.
Sheets in ../sheets/. They ARE edits of sheet_cover.png: same grid, pixel-aligned (crop.py = offs.json + SH, same as frames/).
Steps: python3 crop.py <name>  ->  cd <name>; python3 ../layer_new.py [--head | --small --rows=a:b --one]  (layer_new.py = cap/layer.py on new2/frames + edge-margin + head-piece rules)
skirt: + cap/hemclean.py; all: cap/rimclean.py (NOT on jewelry: it fades thin pieces); belt: + beltband.py; necklace view 7: regone.py was tried (already aligned).
Page order: shoes, skirt/blouse (tucked swaps), belt, necklace, head (cover = doll / wig lw / scarf xk), earrings (under the head from the back and under the wig).
