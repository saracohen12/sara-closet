---
name: wardrobe-v190-cut8
description: Closet v190 (26/10): Sara uploads ONE 8-angle GPT sheet per item and the site cuts it, fits it to the cover doll and adds it to the 360 studio by itself (cut8.js)
metadata:
  type: project
  modified: 2026-10-26T05:14:11.445Z
---

Sara 26/10 06:58–06:59: inside every item the avatar part must be the 8-angle avatar only. She uploads one picture with the 8 angles. The site cuts it, fits it exactly to the doll and puts it in the studio so she can pick it in looks.

What v190 does (artifact version id 1792991624-800c, commit on branch claude/project-thread-6oxwf5):
- **cut8.js** is a JS port of new2/items/crop.py + layer_new.py. It gives the same pixel counts as the Python on T49.
  - Sheet scaled to 1448×1086, crop with offs + SH, then a ±5px shift search (head rows; feet for head items).
  - Diff against the lossless bare frames a8/f1–8.webp (= new2/frames/c1–8.png), then the layer_new rules.
  - Cut modes per kind: head for cover/scarf, small for jewelry, rows for belt/shoes.
  - No hemclean/rimclean.
- **Where results are stored:** IT[id].a8 = [{s: slot, k: kind, L: [8 layer asset ids], src: upload asset id, t}]. Sets and jewelry sets get 2 parts, one per sheet (top then bottom; necklace then earrings).
- **r360.js sync()** turns IT.a8 into dynamic READY entries:
  - key 'u'+id, layers from /_blob/<id>
  - SLOT is by slot, with clashOf(k) instead of CLASH
  - layersFor follows the slot ORDER shoes, body, bottom, top, outer, belt, wrist, bag, neck, then head and ears
  - static READY ids are never replaced
- **av188.js item window:**
  - the .a8box "🧍 האווטאר החדש · 8 זוויות" (prompt + one upload) replaces the 5-pose boxes; .p5gbox/.jwbox/.tiesbox are hidden
  - the top bar is one status line that scrolls down to the box
  - uploads are cut right away
  - pending uploads (a8up newer than a8) are cut automatically ~4s after the site opens, on her device
  - steps are logged to uplog as cut8_start / cut8_ok / cut8_fail
- T49 (velvet floral mermaid dress, her first sheet, 26/10 06:56) was cut by the site in tests and appears on the avatar.

**v194 (26/10 07:32–07:33, artifact version id 1792993751-1632, commit 116f235):** Sara saw the dress beside the doll (arm in the back view, beige body in front in the side view).
- Root cause: the site doll a8/n, nh, c was turned smooth on 25/10 (new2/turn/norm.py → turn.json: a scale and shift per view). GPT sheets and f1–8 are BEFORE that move, and v190 forgot to apply it.
- Fix: cut8.js TURN = turn.json, applied to every layer. Parts now carry cv:2.
- Parts without cv are cut again by themselves when the site opens (av188 stale()/RE). T49 and T104 will re-cut on her device.
- The item window shows the 8 cut pieces alone on white (tiles).
- Rule: [[wardrobe-check-8-angles]].

**v195 (26/10 08:10):** when an item is ready on the new avatar, the item window's first picture is the doll wearing it.
- It is labelled "עליי": the front view, with the cover or the wig as chosen in the studio.
- Code: R360.still(id,v), plus a galList wrapper in av188 (AVU blob cache, keyed by the layers and the head).
- Her first real upload on v194, S1CNR_1 (the LUMIGAL velvet dress), was checked in all 8 angles and is clean.
- The same velvet sheet also sits on T49, which is a different dress. We asked her whether to take it off there.

**v196 (26/10 08:20):**
- The "🖼 כל התמונות · לבחור ולהוריד" button (fix102) showed as an EMPTY pill on her phone. It had no color set, so the phone's dark mode made the button text white on white. Now it has color #2a1d17. Any new button on a white background needs an explicit color.
- The a8box now also has "🖼 התמונות של הבגד · להוריד ל-GPT".
- T104 is actually the BROWN velvet dress, but she uploaded the navy lace dress sheet to it. That is why "לנסות עליי" dressed her in navy. A new upload replaces it.

**v197 (26/10 08:29):** she asked to delete the wrong picture.
- Delete = take off a8 AND a8up together. off() alone used to leave a8up, so the picture was cut again on the next open.
- The 🔄 replace and 🗑 delete buttons sit under "לנסות עליי" (bar188 + acts197), in the avatar box, and in the studio (.r3fx, under the worn chips).
- I removed T104's a8 and a8up in the db. To restore if ever needed: src 24d48c5383cb2470c571ad2086636aa7 (the navy lace sheet), cut layers 666ecfc5…, 86ac77e4…, 96fea212…, d21ebbdd…, 90a6090b…, 17e372e5…, a29a12fc…, c7717a59….

**Why:** she wants to do the whole flow alone from the phone, without waiting for Claude.
**How to apply:** if a cut looks wrong, check uplog cut8_* entries and the a8 layers. For a bad item you can still cut it with the Python pipeline ([[wardrobe-avatar8-pipeline]]) and add it to the static READY. Related: [[wardrobe-v188-dots]].
