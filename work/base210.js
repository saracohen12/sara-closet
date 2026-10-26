// v210 (Sara 26/10 14:24 "תוסיף לי קטגוריה של חולצות בסיס ... אני אעביר אותם לקטגוריה שם"): while it is empty, say how to move a shirt into it
{const _ap=apply;apply=function(){const r=_ap.apply(this,arguments);try{const e=$('#empty'),s=document.getElementById('base');
 const none=C=='base'&&s&&!s.querySelector('.card');e.textContent=none?'עוד אין כאן חולצות. פותחים חולצה, ובשורה "קטגוריה" בוחרים "חולצות בסיס".':'לא נמצאו פריטים'}catch(_){}return r}}
