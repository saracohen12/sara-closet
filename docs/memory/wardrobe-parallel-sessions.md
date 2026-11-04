---
name: wardrobe-parallel-sessions
description: 26/10 several Claude sessions build Sara's closet on the SAME branch and artifact – always fetch/fast-forward before building; ledger source = repo closet/tasks.md
metadata:
  type: project
---
26/10/2026: while this project's thread was idle, other sessions (e.g. session_01H3TBh4…, 01DDbHo…, not threads of this project) built v188–v204 on branch claude/project-thread-6oxwf5 and published the closet artifact HY6no4fCJwNunBtm6GVA8V. My publish was refused ("a newer version … is live").

**How to apply (every build):**
- `git fetch origin && git merge --ff-only origin/claude/project-thread-6oxwf5` BEFORE editing/building; check `git log HEAD..origin/...` again right before publishing.
- The live page is their NOMIN build; a NOMIN build from the fetched source matched it line-for-line (only a size-option order and TASKS172 differed), so rebuilding from source is safe.
- Ledger: the repo's closet/tasks.md is the source of truth (rows ≥383 were only there). gentasks.py reads /mnt/project-files/closet/tasks.md → copy repo → mount, append rows, copy back.
- Don't build a parallel feature: check the latest files first (e.g. hairstyles/ties/makeup live in sty199.js + sty199p.js, "🎨 תסרוקות, קשירות ואיפור", db 'styles').

v205 (mine, 26/10 12:50, commit 427be50): sty199p.js HAIRS = Sara's own 30 hairstyles (her order/names, "Hairstyle Details:" English); makeup cards and "➕ להוסיף איפור" use faceW(name,desc) – only the doll attached, GPT creates the look (Sara: "אין לי תמונת איפור, אני רוצה שיצור"); d180 night exclusion now also #sty199 #sty204v #tie202 #bg204.
Related: [[wardrobe-v187-shop-advisor]], [[sara-task-table-rule]].
