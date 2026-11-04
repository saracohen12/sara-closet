---
name: wardrobe-v284-studio-quality
description: v284–v285 (28/10) studio "✏ לסדר את הלוק" block (z284.js) + belt matte / clear-belt / chain fixes in cut8 and the wig chin fix in r360; QA harness notes
metadata:
  type: project
  modified: 2026-10-28T09:04:45.398Z
---
Continues [[wardrobe-v282-tell]] and [[wardrobe-v277-redesign-home]] (redesign stages for Sara's 28/10 10:19 ask).

**v284 z284.js/css:** an always-open `#z7` block at the top of `#r360 .r3side`, which on a phone sits right under the avatar.
- Big pills mirror `.r3tk` (tuck), `.r3un` (top under dress) and `.r3wb` (hair behind). Each pill flips the checkbox and dispatches `change`.
- Also has 📿 (clicks `.r3jyb`) and 💬 (`openTell282`).
- Lists the worn chips, each with ✨ `data-fix237` (only when IT.a8 exists) and ✕, which clicks the `.r3worn` chip.
- Why: those controls were inside fold221 headings, which are all closed by default, so she never found them.

**v285 cut8.js (belts):**
- `matte(d,b,m)` un-mixes the edge pixels between the known doll pixel b and the local belt colour. This removed the light outline that showed over dark dresses.
- Holes in a cut-out belt become transparent, but only on belts far from beige (fb>100²).
- Thin enclosed lines, such as a buckle pin, are kept.
- `dollSkin(b)` drops her hand from the clear belt and the chain. `dollBody` eroded by 5 plus "nothing above the waist row" cleans the chain.
- `cvOf('belt')`=3, so all belts re-cut by themselves.
- Known leftover: the straw belt T511206_1 pin is still slightly dark.

**v285 r360.js (wig chin):**
- `chinFade()` runs on the w/yh*/yt* layers. It softens the straight cut under the chin and paints a soft chin shadow on the neck.
- Under a wig without a background, the 'ch' real neck is drawn over the 'nh' blurred stump.
- `R360.dbgPaint(h,mk,v)` gives a full-size render.
- Her custom hairstyle yhsmvpaoncs0 still shows a faint box in the front view.

**Makeup:** I tried weakening the cheek delta and reverted it. The pink cheeks are her "ורוד עמוק" style. Waiting for her example via 💬.

**QA harness** (scratchpad, lost after session):
- cut284.js + comp284.py: re-cut sheets from pub/_sh.
- h284.js: renders heads with db styles. Blobs come from hair284/.
- Before/after pictures are in project-files/closet/v285/.

**v288 (28/10):**
- Undo: r360 `UNDO={a:clone(ST),n,bj}` is set on every data-off click. A `.r3undo` chip shows while ST is unchanged, and z284 mirrors it as `.z7u`.
- Hair behind: `wbx<n>` is built at runtime (hairBack: the wig with the ch body alpha cut out, blurred 1.2px). The old wb*.webp layers are not used.
- z288.js/css: category chips (`.z8c`) in the sticky `.r3h`. Each chip clicks the matching `.r3cats` button and scrolls to the grid. On a phone the title is hidden and pin/save show as icons only.

**v292 (28/10, commit 0df02d5):**
- ⭐ on studio cards (`.r3st`, IT.fav). Sort order: fav, then isReady, then lastWorn.
- z288: top chips get `data-on` (lit) for every category she wears (via R360.worn/catOf/st).
- Extra chips `data-z8x` (head/hair/mk) open Z291 at .r3hd or at the 💇/💄 label of .r3styr.
- Bug: the template's apply() ran `$$('section')` and crashed on #z9/#z7 (no h2 span). It now skips sections inside dialog/#r360. This was the likely cause of the tie "לא הצלחתי לשמור".
**v293–v294 (28/10):**
- z291 `.z9q` pills under the avatar mirror .r3tk/.r3un/.r3wb.
- Tuck works over a dress too. In layersFor the marks are tk/wl/dl; with no belt, `waistBand()` builds a band at the waist row.
- hairBack also works for hairstyles (`hb_<key><n>`).
- Pack pieces: `pimTag/pimLoad` show R360.still cropped 3:4. When `part.img` is set, that asset is used instead.
- pc293.js ✂ cropper sets part.img. fix85/gpt250 now keep part.img and part.color when they rewrite parts.
- 28/10 16:00: Sara is away studying for hours and asked for a big bug/upgrade pass with a summary at the end. Ledger row 567.
**v296–v297 (28/10, big pass):** cut8 `defringe(c,b)` on tops/cover/scarf/tiex (light rim → garment colour; backdrop-blue gaps removed unless garment is light blue); cvOf TOPK 4, cover/scarf 3, CVX 4 → auto re-cut. rcv296.js "🧺 צילמתי את כל החבילה" in orders (one photo → sample matches → mark got). gpt250 `.g296go` one-button walk (ZIP+copy → open GPT → upload). 💬 side tab 26px.
v298: matte un-mix (≤7px) of doll beige at jacket/coat/vest/scarf edges; cvOf TOPK 5, FRK 4, CVX 5. 28/10 summary + 2080 proposal doc: https://claude.ai/artifact/U8geFwcr8sKMY7xJQ3HqDo (waiting for her pick of screens; open: wig front hair looks cut at shoulders, clear belt S1VHG_6 needs a black-bodysuit sheet).
