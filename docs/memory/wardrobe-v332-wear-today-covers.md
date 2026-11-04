---
name: wardrobe-v332-wear-today-covers
description: v332–v333 (29/10) "☀ מה ללבוש היום" weather page (wx332), "🧕 כמה כיסויים יחד" 8 covers × 4 ties batch (tie202 MC333), Temu refund-without-return field rnr
metadata:
  type: project
  modified: 2026-10-29T09:58:54.880Z
---
Closet artifact HY6no4fCJwNunBtm6GVA8V. v332 = artifact version 332 (commit 5570df9), v333 = version 333 (commit 91ee7cc). Ledger rows 628–632.

**v332 מה ללבוש היום (work/wx332.js/.css, r360 looksFor/wearState/pinState):**
- The home button `.wx332b` is appended inside `#h180 .z-txt`. As a grid child it landed under the avatar at ≥1200px.
- Weather order: open-meteo from the page, then db `wx/today` {d,hi,lo,rain,mm,code,wind}, then monthly climatology.
- The container proxy blocks open-meteo, but WebFetch of yr.no works. I seeded `wx/today` for 29/10 by hand.
- It is unknown whether the live page reaches open-meteo. Check db `wx/probe`. If it doesn't, seed `wx/today` daily (or set up a routine).
- Looks only use READY avatar items, each base once. With few avatar items she gets fewer than 5 looks.

**v333 כמה כיסויים יחד (inside tie202.js, `window.MC333`):**
- Entry points: `[data-m333go]` (document capture listener), in the cover window `.t246add`, the closet covers line `.tie202s`, and the z277 MORE list.
- She picks up to 8 covers and 4 ties (⭐ first). The state is kept in localStorage `mc333`.
- The batch is written onto each cover's `txw` as {p,n,b:stamp,k:index}. `mcWait()` = covers carrying the latest b, sorted by k.
- ZIP contents: face-8, doll-8, cover-N-1..2.jpg, tie-1..4.jpg, prompt.txt (`mcPrompt`).
- Upload: sheets are split in ZIP order, 4 per cover plus their close-ups (close-up comes before its sheet). Each cover's group goes to the existing `upAll(id, subset)`. Partial uploads continue from the next waiting cover.
- No colour check between covers; it relies on order.
- Waiting on Sara's first test (suggested 2 scarves).

**Refunds:** Temu "החזר בלי החזרה" = item fields `rnr:1` plus `rsent:1` (stops the send nag); `refunded:1` when issued; `rfa` = amount, `rfd` = date. orders123 and hub show "🎁 החזר בלי החזרה – לא שולחים". Done for T243 (₪53.71), T348 and T349 (₪43.07 together).

**Diary 29/10:** Sara logged it herself in the site: photo `days234/2026-10-29` + T157, T223, T236, T231206_13. Before logging her look, query items `lastWorn==today` first.

Related: [[wardrobe-v247-tie-zip-face8]], [[wardrobe-v306-diary-keep]], [[wardrobe-v123-orders]], [[wardrobe-v323-scroll-tabs]].

**v334 (commit 9dabe9a, artifact version 334) "📥 מחכה ל-GPT" (work/inbox334.js/.css, `window.IB334`):**
- A home bar `.ib334b` sits after `.wx332b` in `#h180 .z-txt`, hidden when nothing waits. The dialog `#ib334` has one row per waiting thing:
  - the MC333 batch;
  - each cover's txw ties;
  - each gpt312 multi-ZIP history entry with items not yet ready (last 21 days);
  - each single item with IT.g250 that isn't ready and isn't in a history entry.
- Row buttons: 📤 = direct pick (`MC333.up` / `TIE202up` / `g334.up` → gpt250 `pick(ordFor)`); "פתיחה" = the original screen (`g334.open` sets B and calls paintB); ✕ = hidden via localStorage `inbox334x`.
- Exports added: `window.g334` in gpt250, `TIE202up` and `MC333.up` in tie202.

**v335 (commit d822e97):** Sara saw "lost pictures" on the phone, but her assets were intact. The real cause was the store briefly answering unavailable (errlog store_unavailable / oldauto unavailable). fix335.js adds a document capture 'error' listener on IMG `/_blob/` that retries at 1.5s, 4s and 10s (remove src, then set it again), then falls back to TH[id] of the closest [data-id]. To check whether an asset exists, use Artifact read with `path`=<asset id> (not `paths`).
