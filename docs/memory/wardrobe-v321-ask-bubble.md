---
name: wardrobe-v321-ask-bubble
description: v318–v321 (28/10) closet: wavy wig_ref, home layout per screen, ask-Claude bubble with auto screenshot (doc.scr) + 🎤 voice, wider hair close-ups
metadata:
  type: project
  modified: 2026-10-28T21:46:21.708Z
---
Continues [[wardrobe-v312-rules-closet]]. Artifact HY6no4fCJwNunBtm6GVA8V, live version 321, commit 4900134.

- v318: home row of 💇/💄/🧕 has separate grid areas for phone (<860) and desktop. One shared rule broke the desktop ("הכל זז").
- v319: "⬇ בנפרד" saves wig-8/face-8/doll-8 as separate files, because GPT couldn't open the ZIP. Prompts say "ZIP או תמונות נפרדות באותם שמות".
- v320: a8/wig_ref.jpg is now the WAVY wig (new2/wig_v3/sheet_wig3.png); old one is a8/wig_ref_2610.jpg. Sara picked "הפאה עם הגלים". face-8 still shows the straight wig, so the prompt says to take the hair from wig-8.
- v321 tell282: on the page the 💬 is a pill "לשאול את Claude" at the bottom corner, not in the header. Tapping it captures the screen with html2canvas (cdnjs 1.4.1, lazy) and saves it in **doc.scr** (asset id), next to shot/pic. The window has a 🎤 button (SpeechRecognition he-IL). Inside dialogs it stays the small side tab.
  - Local tests can't reach cdnjs: route the URL to the npm tarball (scratchpad t321/t.js).
- v321 hair: CUFAR in sty199p asks GPT for a wider close-up (above the head to the waist, all the hair). Cards for `.sycim.c8` are 27/50 with `object-fit: contain`, so the whole frame shows.
- v322 (22:25, commit 2bd31e1): the "black collar" WAS a cut bug (I first told her it wasn't – wrong). GPT skin in the dress V hid the base tank, leaving only its mock-neck as a choker. cut8 neckSkin: print check only on upper body outside the neckline, deep-V skin allowed if skin(), dark garment lit-skin rule, up to 3 passes; dress cvOf 8 → her browser re-cuts dresses. Regression harness: scratchpad qa308/cmp322.js (_o322.html old vs _t240.html new).
- v322 hair cards: hair docs with L show HER doll turning (like the first hairstyle), close-up only in ⋯. Sara wants the far doll view for every hairstyle.
- Lesson: when Sara says something looks wrong on the avatar, check the actual composite pixels before calling it intended.

Related: [[wardrobe-v282-tell]], [[wardrobe-v206-styles-hide]].
