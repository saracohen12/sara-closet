---
name: wardrobe-v148-autofit
description: v148 (23/10 Shabbat pass) – fix144.js auto-fit of old-avatar garments, head coverings in hip pose, sweater over blouse; build/merge notes
metadata:
  type: project
  modified: 2026-10-23T15:11:00.641Z
---

v148 was published 23/10 15:10 UTC. It is built on the orders thread's v144–v147 (src_changes v144: PO- search in book3.py, v145: cardEl in book4_tpl, v146: imgup, v147: orders123).

**fix144.js** (appended last in book3.py, after fix127.js):
- **Auto-fit.** 33 of 41 five-pose garments were drawn by GPT on the OLD avatar (p5g with no `two` and no av 'p6').
  - For tops, sweaters, outer, dresses, sets and skirts, each pose is placed by a coverage search on her p6c mask (133×455).
  - The search starts from the current fit and fitTop116. It scores coverage from her shoulder line (2.2× neck width), and penalises spill, face cover and out of frame.
  - It re-centres up to 4 rounds, bounded to w 0.75–1.6× and |dx|≤12, |dy|≤8. The coarse pass uses stride 2.
  - Results are cached in localStorage 'a144v4' (bump the key if the scoring changes). It runs 100–350 ms per pose on desktop.
  - Manual edits (tf.pvman) are never touched. Old values are kept in tf.b144.
- **head144.** A scarf or head item with no picture for the hip pose is moved and scaled from her front head to her hip-pose head. Before this, ties floated above her head.
- **Sweater over a blouse.** The SLOTS 'outer' entry is renamed "ז׳קט / סוודר מעל" and also lists sweaters, so a sweater can go over a blouse. There are also 'base' and 'vest' slots.

**fix114.js** changes:
- A dress or set is clipped like a top.
- Shoulder-cap erase above the sleeves (neck band kept).
- A sleeve drawn slightly beside her arm counts as a sleeve (cov ≥15%, gap ≤3 rows, capped at 86% of the arm).
- It sets S._av144 (p6c or p6w).

**Tried and reverted:** hiding the belt behind her arm in the side pose. The arm mask doesn't match GPT's sleeve, so the belt came out in broken pieces.

**Testing:** see S/tests/sh/tw.js. Env vars: BIG, DUMP=k, HIDE=sel, TF. Slot `_` means slotOf. dbg.js prints auto144 per pose. Asset ids must be fetched one `path` per call (`paths` refuses asset ids).

**Still visible:** the suit's pale neck shows above low round necklines, and her far hand or forearm shows in the half pose.

Related: [[wardrobe-shabbat-pass]], [[wardrobe-v119-tops-ties13]], [[wardrobe-v114-body-in-prompts]].

v149 (23/10 15:19): fix144 also wraps pr102 (goal line, name148 full name + colour, shoulders/sleeves on her arms, far sleeve in half side, bent sleeve on hip, "לפני ששולחים – לבדוק", per-category lines for scarves/jewelry/bags/shoes) and tiePrompt120 (full name + colour); ⛶ בגדול window (#big148) in the all-poses dialog. Prompts page v11 (same garment card + new card "אם השרוולים או הכתפיים לא על הגוף"). Next publish = 150.
v150 (15:25): 🎞 360 window (gifOpen150; LOOKS[id].gif360 {id,u,t}; doSave wrapper keeps it; shown last in ⛶). NOTE: ST/PE/LOOKS are top-level lets, NOT window props – use typeof ST!='undefined'. Next = 151.
v151 (15:41): dress/skirt hem matched to front in all poses (G.flare: spill only above hips; hem penalty 4; cache a144v6); edge150 strips GPT white edge strip. Handed to src_changes/v151. Next = 152.
Later versions (v152+): [[wardrobe-v152-uploads]].
