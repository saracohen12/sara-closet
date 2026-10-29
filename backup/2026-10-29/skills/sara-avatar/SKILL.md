---
name: "sara-avatar"
description: "Use when Sara's avatar is involved: writing GPT prompts for her avatar or clothes, cutting GPT sheets, building 360 layers, or dressing the avatar."
---

# Sara's avatar – rules and pipeline

## Rules that never break
- On the avatar use ONLY pictures Sara made/uploaded for the avatar. Never pictures from the closet/book, never the site's automatic background removal.
- When cutting GPT sheets remove ONLY the grey background. White is a garment colour and stays.
- One GPT prompt = one message (the avatar sheet + the item photo → result), and it says exactly what she bought.
- When she asks for a format ("אותו פרומפט, רק עם פאה") give exactly that text with only the change. Do not invent a new structure.
- Her measurements: height 156, bust 94, waist 73, hips 96. Pose: right hand on the waist, left arm straight down.

## GPT recipe that keeps her face
Same GPT chat. Step 1: one image (front or face close-up) with the change. Step 2: "8 זוויות, אל תשני את הפנים" with the 8-angle cover sheet as template (2 rows of 4: front, half-right, right, back-half-right / back, back-half-left, left, half-left). Editing a whole sheet directly loses her face.

## 360 layers (files in closet/avatar8, details in docs/avatar8/HANDOFF_new_avatar.md)
- Base doll = the new cover doll: new2/sheet_cover.png → frames c1–c8, crop with new2/offs.json + SH shift (360×541 per angle).
- Every item = GPT edit of the base sheet → crop → align each angle (legs/lower body) → diff against the bare frames → transparent layer per angle. A sheet edited from another sheet is diffed against THAT sheet.
- Clean-up: cap/layer.py (--head for head covers, --small for jewelry), hemclean.py on skirts/dresses/coats, rimclean.py on every layer, crownfix.py for hair, nowarm.py / defringe.py for orange rims.
- Wig: new2/wiglayer.py (head zone = all changed pixels, below = hair-coloured pixels joined to the head).
- Any item must swap alone in any combination; head (cover/scarf/wig/none) and makeup are independent. Stack order is internal only.
- 360 page: https://claude.ai/artifact/F2YZkYe3XnrEbBm2HFRGo2 · prompts page: https://claude.ai/artifact/T45B8XHpo1gawrzxv4vfGy (shared prompt builder avatar8/p360.js, copy into both pages).