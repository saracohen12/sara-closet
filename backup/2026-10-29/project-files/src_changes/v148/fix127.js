
// ===== v127 (2026-10-23): "🎀 הגיע עם חגורה?" – Sara 07:39: belts in product photos are often only for the photo.
// Per clothing item: blt = 'y' came with a belt / 'n' no belt / 'u' not sure. Every garment prompt tells GPT to REMOVE any belt,
// so she adds one of her own belts on the avatar.
const BLT127=[['y','🎀 הגיע עם חגורה'],['n','בלי חגורה'],['u','לא יודעת']];
function beltCat127(id){let c='';try{c=curCat(id)}catch(_){}if(!c||c=='belts')return false;return GROUPOF(c)=='clo'||c=='wedding'}
window.beltCat127=beltCat127;
const BELTLINE127=`- בלי חגורה. אם בתמונה של הבגד יש חגורה, אבנט, קשירה במותן או שרשרת מותן – להוריד אותה לגמרי ולא לצייר אותה, גם אם היא נראית חלק מהבגד. במקום שלה ממשיכים את הבד של הבגד, באותו צבע ובאותה דוגמה. פס המותן התפור של הבגד עצמו (גומי, כיווץ או פס בד תפור) נשאר כמו שהוא – מורידים רק חגורה. לולאות חגורה, אם יש, נשארות ריקות. את החגורה אני מתאימה אחר כך מהחגורות שלי.`;
function beltNote127(id){const v=(IT[id]||{}).blt;return v=='y'?' (הבגד הגיע עם חגורה – אבל אותה אני שמה בנפרד, אז לא לצייר אותה)':v=='n'?' (הבגד הגיע בלי חגורה – החגורה בתמונה היא רק לצילום)':''}
{const _p=pr102;pr102=function(id){const t=_p.apply(this,arguments);try{if(!beltCat127(id))return t;
 return t.replace(' (אלא אם החגורה חלק מהחצאית)','').replace('\nחשוב:\n','\nחשוב:\n'+BELTLINE127+beltNote127(id)+'\n')}catch(e){ERR114('v127 pr',e);return t}};window.pr102=pr102}
try{PR99[1]=PR99[1].replace('\nחשוב:\n','\nחשוב:\n'+BELTLINE127+'\n');PR99[2]=PR99[2].replace(/\n?$/,'\nבלי חגורה: אם בבגד יש חגורה או אבנט – להוריד אותם, כמו קודם.')}catch(e){ERR114('v127 pr99',e)}
const chips127=(id,attr)=>{const v=(IT[id]||{}).blt;return BLT127.map(([k,l])=>`<button ${attr}="${k}" aria-pressed="${v==k}">${l}</button>`).join('')};
// item window: a row right after "הגיע?"
function row127(id){if(!beltCat127(id))return;const ed=document.querySelector('#dlbody .ed:not(.edtop)');if(!ed)return;ed.querySelector('.blt127')?.remove();
 const got=ed.querySelector('[data-k^="got:"]')?.closest('.erow');const v=(IT[id]||{}).blt;
 const h=`<div class="erow blt127${v?'':' ask'}"><span>חגורה</span>${chips127(id,'data-b127')}<small>${v?'בפרומפט ל-GPT החגורה תמיד יורדת':'הגיע עם חגורה? בפרומפט ל-GPT החגורה תמיד יורדת'}</small></div>`;
 got?got.insertAdjacentHTML('afterend',h):ed.insertAdjacentHTML('beforeend',h)}
{const _ao=window.afterOpen;window.afterOpen=function(id){try{_ao&&_ao.apply(this,arguments)}catch(_){}try{row127(id)}catch(e){ERR114('v127 row',e)}}}
// GPT send window: ask before sending if not marked yet
{const _a=window.after106;window.after106=function(d){try{_a&&_a(d)}catch(_){}try{const id=window.G106&&G106.id;if(!id||!beltCat127(id))return;const b=d.querySelector('.g106b');if(!b||b.querySelector('.g127'))return;
 const v=(IT[id]||{}).blt;b.insertAdjacentHTML('afterbegin',`<div class="g127${v?'':' ask'}"><p>${v?'🎀 חגורה:':'🎀 <b>הבגד הגיע עם חגורה?</b>'} <small>בכל מקרה GPT מוריד את החגורה, ואת מתאימה חגורה משלך.</small></p><div>${chips127(id,'data-g127')}</div></div>`)}catch(e){ERR114('v127 g106',e)}}}
async function set127(id,v){const cur=(IT[id]||{}).blt;await putItem(id,{blt:cur==v?'':v})}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-b127],[data-g127]');if(!t)return;e.preventDefault();e.stopPropagation();
 try{if(t.dataset.b127){const id=t.closest('.ed').dataset.id;await set127(id,t.dataset.b127);row127(id);return}
  const id=G106.id;await set127(id,t.dataset.g127);window.paint106();try{await navigator.clipboard.writeText(pr102(id,G106.sel.size))}catch(_){}}catch(err){ERR114('v127 click',err)}},true);
