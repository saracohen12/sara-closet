---
name: wardrobe-new-account-0411
description: Sara's closet moved to her new Claude account on 4/11/2026 – new site URL, how data/images were restored, the shared Drive folder rule, and what is still missing
---

## The site now lives here (new account)
- NEW closet site: https://claude.ai/artifact/HRNDqDjgDUStZnjQVCCjpq – private (Sara set it to private 4/11). Publish updates to THIS url.
- Old site https://claude.ai/artifact/HY6no4fCJwNunBtm6GVA8V stays untouched (old account; this account sees it only as a public page, no db/assets access).
- Built from repo branch claude/restore-new-account (= v338 + book3.py copies av/p5_front_neck + p5c_front_neck). The built page is identical to the live v338 page.
- Capabilities: assets, db, downloads, sample{images:true}, user.

## How it was restored (4/11 evening)
- 6 backup ZIPs (closet-backup-N-of-6.zip, from "💾 גיבוי") downloaded from Drive: all CRC-OK, 1,587 images, no missing/, assets.json matches files 1:1. Newest image 29/10.
- All 1,587 images uploaded to the new asset store; old id → new id map by upload result (backup images were named <oldid>.ext). Every 32-hex id in the data was replaced (also "<id>~0..7" 8-angle refs and "/_blob/<id>").
- 977 db docs written (items 670, orders 51, looks 14, styles 86, feedback 63, shop187 9, slim272 39, backup83 21, settings, cl302, r360, gpt312, tell282, days234, stylehide, wx).
- Cross-check: the claude.ai export artifact_data-000.zip (old site db, 18:28) is identical to data.json on all 977 docs; latest change in the old db was 16:21 4/11. errlog (49) and uplog (3,894) were not restored – write-only logs.
- Dangling refs (same as on the old site): backup83 snapshots 26–28/10 point to images deleted by auto-clean, and 7 "💬 לספר ל-Claude" screenshots (tell282) are gone.
- Verified with the real data in a local browser (390 + 1280): admin panel 888 items / 98 orders (= old site), closet 890, returns 50 to return / 5 returned with account folders, looks and avatar images all load, 0 console errors.

## Rule from Sara (4/11 19:5x)
- Shared Drive folder, synced with her computer: https://drive.google.com/drive/folders/1Z4JonbSlMPLeVgclHYOZEKN0ZWQ9gsoS – from now on she puts every file/photo there and I take files from there (Drive connector reads ≤10 MB; bigger files via drive.usercontent.google.com, allowed in the environment network settings, folder shared by link).
- Earlier backup folder: sara-closet-backup (1d7oGe5EjUwxCHAGFpFhrBlO2ceBWSG1P) – remind her to un-share it by link.

## From the claude.ai chat export (her other account smart20.mortgage, 4/11)
- Goal (25/10): a public wardrobe-management app for people who bought clothes anywhere – NOT a store. Lovable/Supabase considered for later; shelved until the closet is finished.
- Avatar is made only with GPT images (Sora closed).
- 27/10: separate "3D doll studio" artifact (YNQS2bmZMhawyGBp9iePaZ, three.js) – she then moved that one toward a town-walk game; it is not part of the closet.
- 4/11 11:26 asked if Temu makes problems with returns (general question).
- The main closet threads were Claude Code sessions – their transcripts are in claude_code_cloud-000/001.zip of the export, NOT yet uploaded.
