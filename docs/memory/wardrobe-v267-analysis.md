---
name: wardrobe-v267-analysis
description: 27/10 full-site analysis doc of Sara's closet (159 bugs, 90 ideas, redesign plan, work order) and the v267 packer safety fix
metadata:
  type: project
---

Doc "ניתוח האתר – הארון של שרה": https://claude.ai/artifact/11Hjp9NFdrnH5AGroRpYKH (Claude Doc, Hebrew). 159 bugs by area (15 high), 90 suggestions (14 on GPT prompts), redesign chapter, work order stages א–ז (א = anything that loses her data first).
Raw review notes with file:line per bug were in the session scratchpad only; re-verify against code before fixing.

**Why:** Sara asked (27/10 23:34/23:39) for 80+ ideas, 150 bugs and a 2050 clean redesign; the redesign (ledger 519) is built only after her approval.
**How to apply:** fix bugs in the doc's stage order; ask before changing the look. Related: [[wardrobe-v256-pack-folders]], [[wardrobe-redesign-v69]].

v267: sp262 packer deletes its own sprite when the check fails, skips failed groups 3 days (localStorage sp262f), re-reads each item from db before putItem, stops its interval when nothing is left.
