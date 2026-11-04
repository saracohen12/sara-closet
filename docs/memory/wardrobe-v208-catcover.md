---
name: wardrobe-v208-catcover
description: v208 (26/10) category pictures in Sara's closet: pick from the list; an item already on the 360 avatar shows her wearing it and turns on touch (cat180.js)
metadata:
  type: project
---
26/10/2026 14:02 Sara: "תן לי לבחור מתוך הרשימה ... אפשרות לבחור אווטאר 360, בנגיעה זה מסתובב, ואם אין עדיין אווטאר אז תמונה שאבחר". It built on v180's "🖼 לבחור תמונות" (SET.catCover {sectionId: itemId}).

What v208 added (only in work/cat180.js):
- **Picker:** item names on the thumbnails; a "🔄 360" badge on items where R360.isReady(id); a filter chip "על האווטאר". Those thumbnails show her wearing the item.
- **Display choice:** picking a ready item keeps the dialog open with a choice row – "🔄 אני לובשת אותו" (default) or "🖼 התמונה של הבגד". The picture option is stored as SET.catPic[sid]='p'.
- **Tiles** (home .h9cat .h9im img, and the #cl163 window .ph background): use R360.still(id,v) frames, downscaled to 300px webp dataURLs and cached in FR. A tap on the picture does one turn (8 frames × 170 ms); with reduced motion, each tap shows the next angle. Tapping the name, or a keyboard press (e.detail==0), opens the category.
- **Click handler:** cat180's click handler now listens on WINDOW in the capture phase, because fix163's document-capture handler closed the #cl163 window (edit-mode picks there were broken too).

Tests: scratchpad h/cat208.js, cl208.js, cl208e.js. Published as artifact versions 208–209, commit after 427be50…v207.
Related: [[wardrobe-v206-styles-hide]], [[wardrobe-v181-studio360]].
