// ===== v259 (Sara 27/10 20:14 "שתכתוב לו בסוף ... שבנוסף לזה הוא ייצר לי קובץ זיפ, שאני יכולה להוריד את כל התמונות בבת אחת ... בכל מקום תשנה את הפרומט"):
// every GPT prompt ends with ZIPASK – after all the pictures GPT also makes ONE zip of them, named 01.png, 02.png… in order.
// zipAsk(t) puts it at the very end (once). The prompt builders call it, and any copy of a prompt (button or a long press) goes through it too,
// so the old prompt lists get it as well. The GPT uploads take that zip as it is: its pictures are opened here, in order, as if she picked them.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v259 '+w+': '+(e&&(e.code||e.message)||e));
const toast_=m=>(window.toast||(()=>{}))(m);
const ZIPOLD=`ובסוף, אחרי שסיימת ליצור את כל התמונות: צרי לי בנוסף קובץ ZIP אחד להורדה, ובתוכו כל התמונות שיצרת (PNG באיכות מלאה, בלי לכווץ ובלי לשנות אותן), בשמות לפי הסדר: 01.png, 02.png, 03.png… כך אוכל להוריד את כל התמונות בבת אחת. אם התמונות יצאו בכמה תשובות (אחרי "המשך"), ה-ZIP בסוף כולל את כל התמונות מכל התשובות, באותו סדר.`;
// v296 (Sara 28/10 16:00 "GPT לא מחזיר לי את הזיפ, הוא מחזיר לי רגיל תמונות"): GPT's image tool can't pack its pictures in a zip, so the prompt no longer
// asks for one. It asks for the pictures in order, each with its number and name above it; she saves them all and uploads them together in one pick –
// the site sorts them by that order and checks each one against the product (v276). A zip that does come is still opened as before.
const ZIPASK=`בסוף: החזירי את כל התמונות לפי הסדר שכתבתי, אחת אחרי השנייה, ומעל כל תמונה כתבי שורה קצרה עם המספר והשם שלה (למשל "01 – תקריב"). אין צורך בקובץ ZIP – רק התמונות עצמן, באיכות מלאה. אם לא הספקת את כולן בתשובה אחת, עשי כמה שאפשר ואני אכתוב "המשך", ואז תמשיכי מהמספר הבא.`;
const MARK='ומעל כל תמונה כתבי שורה קצרה עם המספר והשם שלה';
const isPrompt=t=>typeof t=='string'&&t.length>120&&/מצורפ/.test(t.slice(0,400));
function zipAsk(t){if(!isPrompt(t))return t;return t.split(ZIPOLD).join('').split(ZIPASK).join('').replace(/\n{3,}/g,'\n\n').trimEnd()+'\n\n'+ZIPASK}
window.ZIPASK=ZIPASK;window.zipAsk=zipAsk;
// any copy of a prompt: the clipboard buttons and a manual copy of a shown prompt
try{const C=navigator.clipboard;if(C&&C.writeText){const w=C.writeText.bind(C);C.writeText=t=>w(zipAsk(t))}}catch(e){ERR('clip',e)}
document.addEventListener('copy',e=>{try{const a=document.activeElement;let t='';
 if(a&&(a.tagName=='TEXTAREA'||a.tagName=='INPUT')&&a.selectionEnd>a.selectionStart)t=a.value.slice(a.selectionStart,a.selectionEnd);else t=String(getSelection()||'');
 const z=zipAsk(t);if(z!==t&&e.clipboardData){e.clipboardData.setData('text/plain',z);e.preventDefault()}}catch(er){ERR('copy',er)}},true);
// shown prompts (text boxes and the full-prompt readers) get the line too, so what she reads is what she copies
function shown(){document.querySelectorAll('dialog[open] textarea, dialog[open] pre').forEach(x=>{const v=x.tagName=='TEXTAREA'?x.value:x.textContent;if(!isPrompt(v)||v.includes(MARK))return;
 const z=zipAsk(v);if(x.tagName=='TEXTAREA'){if(document.activeElement!==x)x.value=z}else x.textContent=z})}
setInterval(()=>{try{shown()}catch(e){ERR('shown',e)}},900);
// ---------- the zip GPT made → its pictures ----------
const IMG=/\.(png|jpe?g|webp)$/i,isZip=f=>/\.zip$/i.test(f.name||'')||/zip/i.test(f.type||'');
const u16=(b,o)=>b[o]|b[o+1]<<8,u32=(b,o)=>(b[o]|b[o+1]<<8|b[o+2]<<16|b[o+3]<<24)>>>0;
async function unzip(file){const b=new Uint8Array(await file.arrayBuffer());let e=-1;
 for(let i=b.length-22;i>=Math.max(0,b.length-65557);i--)if(u32(b,i)==0x06054b50){e=i;break}
 if(e<0)throw new Error('not a zip');const n=u16(b,e+10);let p=u32(b,e+16);const out=[];
 for(let k=0;k<n&&u32(b,p)==0x02014b50;k++){const m=u16(b,p+10),cs=u32(b,p+20),nl=u16(b,p+28),xl=u16(b,p+30),cl=u16(b,p+32),lo=u32(b,p+42);
  const name=new TextDecoder().decode(b.subarray(p+46,p+46+nl));p+=46+nl+xl+cl;
  const base=name.split('/').pop();if(/^(prompt\.txt|doll-8\.jpg)$/i.test(base))throw Object.assign(new Error('own zip'),{code:'own'});   // v268: the ZIP she SENT to GPT, not the one it returned
  if(!IMG.test(base)||/^(__MACOSX|\.)/.test(name)||base[0]=='.')continue;
  const d=lo+30+u16(b,lo+26)+u16(b,lo+28),raw=b.slice(d,d+cs);let blob;
  if(m==0)blob=new Blob([raw]);else if(m==8){if(typeof DecompressionStream!='function')throw new Error('no inflate');blob=await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).blob()}else continue;
  const ty=/png$/i.test(base)?'image/png':/webp$/i.test(base)?'image/webp':'image/jpeg';out.push({name,f:new File([blob],base,{type:ty,lastModified:file.lastModified||0})})}
 out.sort((x,y)=>x.name.localeCompare(y.name,undefined,{numeric:true}));return out.map(x=>x.f)}
window.unzip259=unzip;
// a file box that got a zip: open it and hand the box its pictures (01, 02… in order), as if she had picked them herself
document.addEventListener('change',e=>{const t=e.target;if(!t||t.type!='file'||t._z259||!t.files||![...t.files].some(isZip))return;
 e.stopImmediatePropagation();e.preventDefault();const fs=[...t.files];
 (async()=>{toast_('פותח את ה-ZIP…');const out=[];for(const f of fs){if(isZip(f))out.push(...await unzip(f));else out.push(f)}
  if(!out.length){t.value='';toast_('לא מצאתי תמונות בתוך ה-ZIP');return}
  const dt=new DataTransfer();out.forEach(f=>dt.items.add(f));t.files=dt.files;t._z259=1;try{t.dispatchEvent(new Event('change',{bubbles:true}))}finally{t._z259=0}
  toast_(`✓ ${out.length} תמונות מה-ZIP`)})().catch(er=>{ERR('unzip',er);t.value='';toast_(er&&er.code=='own'?'זה ה-ZIP ששלחת ל-GPT. צריך את ה-ZIP (או התמונות) שחזרו ממנו':/inflate/.test(er.message)?'הדפדפן הזה לא פותח ZIP – לחלץ את התמונות ולהעלות אותן':'לא הצלחתי לפתוח את ה-ZIP. לנסות שוב')})},true);
})();
