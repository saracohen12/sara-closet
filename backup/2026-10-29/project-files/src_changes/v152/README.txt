v152 (orders thread), built on v151. Returns:
- orders123.js: item window "מצב" = שמרתי / להחזיר / החזרתי / למסור (להחזיר = s:'ret' without rsent; החזרתי = s:'ret'+rsent) + reason row (IT.rwhy) + link to the list; home button #ret152b "מוצרים להחזרה" under "ההזמנות שלי"; window.O3RET(); openItem wrapper keeps scroll + open <details> on re-render of the same item.
- orders123.css: #ret152b, .r152why.
- ui.js: quick-action label ↩ להחזיר / 📮 החזרתי. book4_tpl.html: card badge להחזיר/החזרתי, beforePut names rsent/rwhy.
