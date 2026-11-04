---
name: wardrobe-v300-backup-errlog
description: v300 (28/10) closet daily backup split into parts (256KB doc limit) and in-site errors auto-logged to db 'errlog'
metadata:
  type: project
---
- backup83 failed silently from 28/10 (one doc >256KB). Now backup83/<day> + <day>~1, ~2… each holding whole-JSON parts of items/looks; parts:n on the day doc. 7 days kept. 🧹 (clean262) reads parts as before.
- err300.js: every new window.ERRS line goes to db 'errlog' (id day_hash, msg, n, ver, tab, w, ua), max 30 rows/day/browser. errlog290() now defined.
- **How to apply:** at the start of a closet session, read 'errlog' (and tell282) on artifact HY6no4fCJwNunBtm6GVA8V to find her real bugs. Local-test noise "v263 frame: http 404" / "v230 img" also shows in her browser only if real.
Related: [[wardrobe-v282-tell]] [[wardrobe-parallel-sessions]]
- v301: 🔔 return alerts have "✓ משאירה את כל ה-N" (ret300.js). v302: asset store hit ~5,000 files (re-cuts stored 8 files each); SP262.put8 now stores every new cut (av188/tie202/sty199) as one packed sprite id~v, background re-cuts pause while SP262.isFull(). Old files go only when Sara presses 🧹.
- v303 (Sara 15:38 upset "לא יכולה כל פעם להיות בלחץ שנגמר המקום"): clean262 has a switch "🔁 לנקות לבד כל יום" (db cl302/auto {on}); when on, daily + when store nearly full (max-300) it deletes unused files itself (her one-time press = consent). Last run in cl302/last. Never again leave space management to her memory.
