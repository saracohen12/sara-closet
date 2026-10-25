---
name: wardrobe-lovable-avatar8
description: Sara's plan to move the closet into a public store app via Lovable (25/10), the handoff doc, and the 8-angle avatar files
metadata:
  type: project
---
25/10/2026: Sara wants to build a public clothing-store app later in Lovable (it connects servers; Lovable credits are expensive for her). She asked if she can build here and continue there "from the same point".

The answer given: not one-to-one (site relies on artifact db/storage/AI → Supabase + AI API later); design, logic, data and images carry over. Recommended: finish the closet here; later a React + Supabase repo that Lovable can open.

Handoff doc "הארון של שרה – סיכום להמשך ב-Lovable": https://claude.ai/artifact/HBXg1gssefG2GfAQ8Upo22 (Claude Doc id 830a8f16-3199-4ba2-9fda-b2392739785b).

8-angle avatar (long hair, beige dress, from another Claude chat): /mnt/project-files/closet/avatar8/ holds frames/1-חזית.png … 8-חזית-שמאל.png, the sheets and spin GIFs. The next step there is GPT dressing of 1-חזית.png with one item, front only, with her measurements 156/94/73/96.

25/10 08:45: Lovable on hold; avatar continues here. Spinner page https://claude.ai/artifact/F2YZkYe3XnrEbBm2HFRGo2 (scratchpad a8page/, base frames f1–f8.png).

Related: [[wardrobe-smart-closet-plan]], [[wardrobe-v172-admin-panel]]

25/10 12:35: Sara rejected the front-only test ('אמרנו 360'). Now: page https://claude.ai/artifact/T45B8XHpo1gawrzxv4vfGy (scratchpad front1/) = the 8-angle sheet + one prompt that dresses all 8 panels at once (same grid 2x4, same positions, hair over garment at the back). When she uploads the dressed sheet: cut into 8 like frames/, align each to the bare frame, build a dressed spin.

25/10 12:40: she pasted the whole other chat. Agreed plan ('שקפים'): every item (clothes, bags, head coverings, hair, makeup, jewelry) = ONE GPT message: item photo + the 8-angle sheet + prompt → the doll wearing it in 8 angles; I diff against the bare frames and keep only the item as a transparent layer per angle; layers stack (doll, hair, skirt, top, sweater, coat, head cover, jewelry, bag; makeup = face layer); the face always comes from the base doll. Start with 1 test item, then her 20 favourites; it goes into the studio as an extra avatar option, the existing one stays. Supabase: she has an account; my advice (and the other chat's) = leave the closet as is now, use Supabase only for the future public app.


25/10 13:05: belly fix in side views (keep all garment components), F2YZ v3. Stack order: base, shoes, shirt, skirt (swap if tucked), sweater/jacket, belt, jewelry. Order is internal only (what covers what). 13:05 Sara objected to any fixed order: she must swap ANY item alone, any time, any combo (skirt, jacket, shoes, cover/scarf/wig/none, makeup on/off/other). Promised that. Head + makeup must be independent choices (likely head layer + face layer; covers may need a hair-free base). Untested: two layers together.

Pipeline details + item list: [[wardrobe-avatar8-pipeline]].
