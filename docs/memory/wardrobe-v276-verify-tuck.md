---
name: wardrobe-v276-verify-tuck
description: v274–v276 (27–28/10) Sara's closet – batch-upload mix-ups found and fixed (ZIP order), Claude checks every GPT upload vs product photo, clear belt / waist chain cut, tuck into skirt
metadata:
  type: project
  modified: 2026-10-28T00:12:13.991Z
---
**Batch mix-ups (27/10 night):** belts, 4 sweaters (T315/T191/T231206_0/T199) and 5 skirts (T156/T240/T241/T511206_3/T245) each sat on the item before/after. Fixed by moving whole a8+a8up between items via ArtifactData batch.
Cause: the upload list (B.sel) was in another order than the list the ZIP/prompt was numbered from (she opened it from another item / after refresh).
T156 "GPT drew it black" was NOT a GPT error.

**v276 fixes (gpt250.js, av188.js):**
- localStorage 'g250ord' keeps the ZIP order; ordFor() reuses it on upload.
- Files are sorted by the number in their name.
- check(): sample.json gets 2 contact images (product photos numbered, sheet front panels lettered) and remaps. A wrong product or wrong colour is set to "לא להשתמש" with a red note.
- Single upload: g276one() → item field a8chk {ok,m}. av188 box shows a red .a8bad with "למחוק מהאווטאר" / "זה בסדר" (data-chk276).

**v274/v275 cut8.js:**
- Belts use name words via beltName(id).
- A clear belt (sheer flag) is cut as a band: maskClear, the row band where >30% of the body changed by more than 20, limited to the belt's columns. Clear parts are a white veil.
- A waist chain (chain flag: שרשרת) is cut small, low and warm, kept only if bright and G≥.7R.
- S1VHG_2/6 were re-cut automatically: a8 part cv:0 triggers stale(), a missing a8 triggers pending().

**v274 r360.js tuck:**
- With a skirt and no dress, the checkbox covers a top, a base shirt and a sweater (PK[k]=='sweater').
- Tucked layers are drawn before the skirt. tuckCut() removes what sticks out below the skirt's waist outside the doll silhouette or below a short skirt; sleeves stay.
- Untucked: base shirts are now OVER the skirt too.

**perf273.js:** idle timers run only when the DOM changed (published in v274).

**Open:**
- The sweater hem sticks out boxy in the side view when untucked.
- Doc stages ה (prompts: show before/after first), ו and ז.
- The redesign waits for her card.

Related: [[wardrobe-v272-storage]], [[wardrobe-verify-uploads-rule]], [[wardrobe-v271-top-tear]].
