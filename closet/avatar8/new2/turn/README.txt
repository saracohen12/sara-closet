25/10 19:50 (360 page v23) – smooth turn (Sara: "לא מסתובב טוב"). GPT drew the doll at slightly different heights/sizes per angle.
norm.py: per view, scale+shift so feet line = y528, height = 515px, body axis (hips+knees) = x180; white divider strips at frame edges cleaned.
The same transform (turn.json) is applied to every layer in layers_before_turn/ (premultiplied warp). New layers: cut against new2/frames (un-normalized), put them in layers_before_turn/, run norm.py.
Live files = live_v23/ (n1..8 = normalized doll, x*, lw*).
