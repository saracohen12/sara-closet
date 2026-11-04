---
name: wardrobe-v349-fold-bugs
description: v349 (4/11 night) – Sara rejected the v347 "calm" home avatar (wants the v338 continuous spin); progressive disclosure on inner screens (ux349.js/css); ~35 bugs from two deep crawlers
---
Sara 4/11 night: "האבטר נראה יותר גרוע… באתר השני הבובה הייתה מסתובבת בצורה טבעית"; "המסכים הפנימיים לא שינית"; "פחות כפתורים – אפתח כפתור ויראה לי כפתורים אחרים"; "מצאת רק 10 באגים, אין סיכוי".

**Rule: the home avatar spins like v338** (Stage speed per her slider, fade, `h181spin`, ⏸/▶ semantics as before). The v347 alive/glance mode is NOT used on home or studio (code stays in Stage `opt.alive`, unused). Kept from v347: visible angle painted first + `.ready` shimmer; v349: `draw()` pauses the spin until all 8 angles are repainted (after 📌 the home showed old outfits).

**ux349.js / ux349.css (clean & 2100 only, html[data-d180=z50]):**
- item window ניהול: `.ed .erow.fit1` + הגיע? rows fold to "label · value ›" (`.x349s`), tap opens; סימון/סגנון/עונה (`multi349`) stay open; re-filled rows re-fold. Details box minis behind ⋯ (`.m349`).
- studio: ⋯ menu (`.s349w`) holds `.r3pin` and `.z8r`; floating live mini avatar `.s349f` (phone, IntersectionObserver on `.r3fig`, copies `canvas.on` every 600ms).
- closet `.z6q` shortcuts: 3 + "עוד N" (`.q349`); "עוד" sheet (z277 openMore): search + `<details class="z5md">` groups (open state in localStorage `z5m349`).
- orders: `.o3sum` one swipe row; `.o3cam` cards behind `.c349`; `.o3pf` rows behind `.p349` (auto-open when a filter is active).

**Bug fixes (deep crawlers bugA/bugB in scratchpad):** z328 clearAll resets #sort; hub `usable()` skips transit/missing/oos/gen/out; months 1–12 (book4_tpl #monf/MONTHS); moneyTab line per account + to-do/sent/rnr split; nR counts to-do only; "חשבון נוסף"→"קבלה"; homeTab loc counts skip ret/give/gen/oos; refund/fixed not awaited (tab race); week circle shows first worn item without selfie; look names "לבשתי · יום X d/m" (+ in-memory rename of old "היום"); toasts "להיום"/"בגד אחד"; closet search qForms/qHit in template + col184; z328d max-height; #totop hidden while #panel open; .strip/.sim .go buttons; dialog summary font (z50); #htabs padding + selected tab scrolled into view; P0-→PO- in item details; return date hidden for kept/rnr/give; "מוצר אחד"; RLM after PDF/T123; photo-count rule = picDone everywhere; setAll 'n' overrides y and clears ORD.arrived; retired reason in the general-list banner; studio reset → bar with "↩ ביטול" (#r3undo349); ♡ save skips an identical look; z313 חול/שבת counts by C/G and hidden on accessory pages; "מזמן לא לבשתי"; האווטר→האווטאר; 15 OCR names in book3 NFIX; #kidf hidden when empty.
Not done (reported): "מספרים וסיכומים" numbers are baked at build time (summ2.py); 909 header vs 881 visible (28 hidden duplicate copies); photo count button vs carousel; studio chips for non-wearable shoe accessories.
