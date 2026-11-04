---
name: wardrobe-v256-pack-folders
description: v256 (27/10) packs of base shirts split up front into folders – count/colours read from the name, one folder card per piece in the grid, piece window, count chips in batch list
metadata:
  type: project
  modified: 2026-10-27T17:18:09.864Z
---
Closet artifact HY6no4fCJwNunBtm6GVA8V, artifact version 256, commit c38d7db. Ledger rows 500–501.

Sara 27/10 19:05: a pack of 3 shirts should be asked "how many" first, then show 3 separate "folders" (shirt 1, 2, 3) as if bought separately, while still being done together in GPT.

- **gpt250.js:**
  - `guess(id)` reads N and the colours from the name, e.g. "3 חולצות בסיס גולף: לבן, חום, שחור" → "חולצה בצבע לבן"…
  - It applies only while IT.np is unset, and not for an item already on the avatar as one piece (`oneDone`).
  - `asked(id)` = IT.np != null. IT.pc holds the piece colours.
  - The MULTI question `packQ` comes first with a "❓ קודם כל" highlight and a "✓ נכון, N" button.
  - `save()` runs ensurePieces right after np/pn/pc/kd change.
  - ensurePieces now also shrinks the list, sets parts color, and gives a MULTI piece the pack's category (base stays base).
  - The batch list shows `.g256bn` count chips per pack (data-g256n).
  - `window.g256` exposes the helpers.
- **pack256.js** (book3.py, after gpt250):
  - Draws `.pk256` folder tiles (not .card, so apply/counts are untouched) right after the pack card. They hide together with it.
  - The pack card gets a `.pk256b` badge.
  - Hovering a folder whose piece is ready shows R360.still and turns it.
  - The folder window `dialog#g256` has name/colour fields (synced to parts + pn/pc), 📤 one sheet for this piece (av188up), 👀 studio, 🚀 the whole pack, and 📦 to the pack.
  - openItem('id~gN') opens the folder window.
- Test: scratchpad t256.js (args: width, prefix).

Related: [[wardrobe-v250-gpt-zip]], [[wardrobe-v252-batch-cover-cu]], [[wardrobe-v209-base-rename]].

**v257 (artifact version 257, Sara 19:28):** GPT painted a black backdrop on ALL pack sheets incl. the black shirt (black-on-black can't be cut, cut8 deBlack floods it). Now each piece has its own backdrop: `pbOf(id,i)` = IT.pb[i], else by colour (DARK regex → doll-8's light backdrop; light/beige → black). Per-sheet note in the prompt (bgNote) + mixed paragraph; ⬛/⬜ toggle per piece (data-g257bg). Product-level wbg question hidden for packs. Holes: IT.hol ''|'open'|'lined' (auto 'open' for lace/mesh words): open = GPT leaves holes showing the doll's beige dress → cut transparent → base shirt shows through in the studio.

**v258 (Sara 19:34):** her rule – black backdrop ONLY for white / cream / see-through (LIGHT, ניוד removed); black, brown, beige and any colour keep doll-8 light backdrop. wbgOf false when D.color is set and not light (unless multi-colour); pbOf = DARK→no, LIGHT→yes, else no.

**v259 (artifact versions 259–260, commit 2f9d1e4, ledger 505–508):**
- Packs: gpt250 `assign` matches sheets by garment colour (`garmentRGB` vs the piece colour). All 15 piece docs were re-cut and fixed in the DB.
- Her "still wrong" screenshot was stale folder pictures. pack256 now re-signs on the a8 src and calls R360.sync first.
- zip259.js:
  - `zipAsk()` / ZIPASK are appended to every prompt, through the builders, the clipboard.writeText wrap, the copy event, and open dialog textareas/pre.
  - Upload inputs accept .zip, and a capture 'change' handler unzips (DecompressionStream deflate-raw) into DataTransfer files sorted 01, 02…
- cut8:
  - unBlack and slide/lift fit for tops.
  - maskWhole tails, when grow is on: pixels within 7 px with diff>16 are added, then holes are filled. This keeps the light flowers on the dark plum scarf S17QJ_9.
  - CVW 9 and new CVX 3. tie202 `recutTx` re-cuts IT.tx / a8 'tiex' with cv<CVX in her browser.
- sty199p: OPQ "opaque cloth" line on tie/tieW/exact/batch.

**v260 (artifact version 261, Sara 20:52):** jewellery height in the studio. Rows `.r3jy` sit under "לובשת עכשיו" and are not folded (`.r3jyh`, not .r3lbl, because fold221 folds every .r3lbl). The offset is stored per item and slot in IT[id].jy {neck,ears,wrist,belt: px, + = down, ±45}. layersFor items carry k, and paint draws them with drawImage(im,0,JY(k)).

**v262 (27/10 22:03, artifact version 263) storage full:** assets store hit 5000/5000 files (735MB/1GB) – the limit is FILE COUNT. Background re-cuts (sty199 CVW, tie202 recutTx CVX) leave old layers behind (~2,100 orphans of 5000). work/clean262.js: banner #cl262b at top when ≥maxFiles-150 or ≥93% bytes + "🧹 לפנות מקום" (also in admin .ad172h) → scan all db collections (abort if any non-log collection ≥1000 docs), page HTML, localStorage, globals; deletes unreferenced assets older than 3h, only on her press. "Request a higher limit" link in the viewer did not respond for her (22:06). Test: scratchpad t262.js.
**v264 (27/10 22:40, artifact version 264, version.txt=264) 8 angles in ONE file:** work/sp262.js (FIRST in the HUB concat). L/M lists may now hold "<spriteId>~<v>" (sprite = 4×2 grid of 360×541 frames, webp q1). Shim cuts frames in-browser (IDB 'sp262' cache) for img.src / setAttribute / innerHTML (MutationObserver) / fetch – consumers unchanged. Sprite = webp .98 since v265 (v264 lossless made 600KB sprites; ~160 of those exist). 27/10 23:30 check after her cleanup: 0 of 2,115 live refs and 0 of 1,147 backup refs missing (full asset list via subagent paging 76 pages). Packer SP262.run(n) (25s after load, then 15 every 4 min; owner only) groups identical L across items a8+tx and styles L+M, verifies pixels (mean diff ≤3) before writing, skips lists due for re-cut (CVX/CVW/CVH). Old 8 files stay referenced by backup83 (7 days) then clean262 frees them. clean262 daily(): once a day read-only scan → bar "🧹 הבדיקה היומית" – delete only on her press. Test: scratchpad t263.js (route-served blobs). Same publish: jewellery-height strip .r3jyo under the studio avatar (r3now block is folded on the phone).
