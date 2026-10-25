---
name: wardrobe-one-message-prompts
description: Sara's rule (2026-10-22 20:21): every GPT prompt is ONE message – both avatar files + photo in, both pictures out; it names exactly what she bought
metadata:
  type: feedback
---

Sara: "GPT יודע לעשות את זה לבד… אל תחלק לי… אני צריכה את זה הכל בהודעה אחת."

**Why:** splitting into "file 1 then file 2" (and hair 1–10 then 11–20) doubled her work. Also, product photos often show a whole outfit while she bought only one piece (skirt only, top only).

**How to apply:**
- Garment prompt = attach avatar file 1 + file 2 (cap) + the product photo. GPT returns two pictures.
- It must say "מה שקניתי: רק <type> (<name>)" and that other garments in the photo are not hers.
- Site (v103): pr102(id) in fix99.js fills the type from curCat plus D[id].short. The item window has "📋 פרומפט אחד ל-GPT"; the #two99 dialog has "📋 פרומפט אחד – הכל". The old prompts 1/2 are only a fallback.
- Prompts page N7e2QR7GghzC89Cc2F153a v5: garment, wig edit, favourite hairstyle and favourite makeup are one card each. Hairstyles 1–20 and makeup 0–15 are asked as two pictures in one answer.
- New prompts of any kind follow the same rule.
- v104: item window "🚀 הכל ל-GPT" (go104 in fix102.js) copies pr102 and shares [p6c_sheet1, p6c_sheet2, main photo] via navigator.share. Files are prepared when the window opens; on a NotAllowedError the button says "tap again". Desktop downloads all 3 and opens GPT. The prompts page v6 has an avatar-files box (#avf, files copied from the closet artifact, capability downloads).

Related: [[wardrobe-two-file-sheets]], [[wardrobe-v99-two-file-upload]].
- v106 (20:54): on a computer only file 1 came down and Sara didn't know what to do. Now go104 opens #g106 (open106 in fix102.js) when innerWidth>=820 or there is no share: 1) the prompt is copied, 2) three thumbnails each with ⬇ plus ⬇ for all three, 3) open GPT, with the steps written out (＋ → Downloads → Ctrl+V). The phone still shares.
- v108 (21:00): the #g106 window is used on the phone too. She ticks ✓ any number of garment photos (ph106 = all102 without the "על האווטאר" variants). pr102(id,np) counts them ("3–5) 3 תמונות של מה שקניתי"). The prompt text can be seen in the window. Phone: 📤 share; computer: ⬇ download, then open GPT.
- v109 (21:04): on her computer several downloads.save calls in a row brought down only ONE file. Now the main button builds one zip (zip109 in fix102.js: stored, UTF-8 names, CRC32) and saves it once. Per-picture ⬇ buttons are also there. Never rely on several downloads.save calls in a row.
