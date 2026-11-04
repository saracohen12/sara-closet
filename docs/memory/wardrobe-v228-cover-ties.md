---
name: wardrobe-v228-cover-ties
description: v228 (26/10) real ties per cover – IT[id].tx list, prompt+upload per tie in the cover window, pick which tie is on the avatar/home; no more painted grey ties
metadata:
  type: project
---
Closet artifact HY6no4fCJwNunBtm6GVA8V, artifact version 229, files work/tie202.js (+ r360.js, sty199.css).

Sara 26/10 21:14: painting the grey library tie in the scarf's colour is "מזעזע". 21:30: she wants, in each cover's page, several real ties: pick a tie type → prompt (with the cover photo) → GPT → upload → choose which tie shows on the home avatar.

- Data: `IT[id].tx=[{n,p:'w<i>',L,src,t,cv,sh}]`. The active one = `IT[id].a8=[{s:'head',k:'tiex',…}]`, so r360 draws it unchanged. A tiex uploaded before v228 shows as a virtual entry (txs()).
- Upload: the row button carries `data-up188 data-w=1 data-tx228=i`. A WINDOW capture listener records TXN[id] before av188's document capture listener. tie202 wraps putItem: an a8 tiex patch + TXN adds/replaces the tx entry.
- Cover window (#tie202): "הקשירות שהכנת" tiles (tap = active, 👀, 🏠 = TODAY.setHead('u'+id), 🗑 with undo). Below it, her 20 TIES with 📋 p.exact(item, name, det) and 📤. Item page: a `.t228box` under the .it77 bar. Head thumbnails are cropped from L[0] by alpha (headThumb, img[data-t228th]).
- r360: isCover now accepts "כובע … כיסוי ראש" (her LOVOSME bonnet was hidden by "כובע"). Picking a scarf without its own tie opens tie202open(id) instead of painting. A scarf with more than one tx shows a `.r3tx` chip row.
- Test: scratchpad h/tx228.js (mocked upload via TXN + putItem).

Related: [[wardrobe-ties]], [[wardrobe-v221-makeup-precise]], [[wardrobe-parallel-sessions]].
