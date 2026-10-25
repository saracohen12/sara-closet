25/10 19:30 – wig on the NEW cover doll (360 page v20). Source: wig_sheet.png (Sara, GPT, 2-step recipe).
The sheet is NOT pixel-aligned with sheet_cover: its own grid (dividers row 528-529, cols 361/723/1084), row 2 starts at y=530 (cropping it with new2/offs.json cut the hair crown).
Some angles are mirrored vs the cover doll (face direction): 6 and 7 flipped, 8 flipped.
reg.py: body-mask IoU (hair = don't care) -> scale+shift per angle; reg2.py: torso band only (used for 4 and 6). reg.json = final.
build.py: layer = wig head above the cover neck row (+10, feathered) + hair hanging below joined to it; the cover's head outside the new head is painted out with inpainted backdrop; soft matte on the hair edge. Output lw1..8 over new2/frames/c1..8 (= n1..8 on the page).
