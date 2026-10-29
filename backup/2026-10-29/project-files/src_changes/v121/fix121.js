
// ===== v121 (2026-10-23): "💇 20 תסרוקות לפאה" – Sara's 20 chosen hairstyles, each with its own GPT prompt (Sara 00:19: "the same for the wig hairstyles")
// One message to GPT: her 2 avatar files WITH THE WIG + the prompt → GPT EDITS the two pictures (face and body stay hers), only the hair changes.
const HAIR121=[
 ['שביל צד קלאסי',1,'Classic side-parted hairstyle with soft cascading waves. On one side, the hair flows gracefully over the shoulder and chest. On the other side, the hair is tucked neatly behind the ear (ear visible), and then drapes forward over the shoulder.'],
 ['מדורג נפחי',3,'Voluminous layered cut with natural movement. Soft, bouncy layers frame the face and cascade down over both shoulders and chest with full body and texture.'],
 ['צמה צדדית רכה',5,'Soft, loose side braid gathered over one shoulder. Clean hairline with a relaxed, elegant weave falling gently down the chest.'],
 ['גלים פתוחים מוקפדים',6,'Polished business-ready wide blowout waves. Perfectly styled, symmetrical soft waves falling over both shoulders and chest with a glossy, neat finish.'],
 ['פזור גלי נפחי',7,'Full-bodied, high-volume loose waves. Rich, luxurious hair texture flowing abundantly over both shoulders and chest.'],
 ['קארה גלי קצר','9 מתמונה 1','Chin-length short bob cut with soft, modern waves. A neat, voluminous short hairstyle framing the jawline cleanly.'],
 ['חלק מבריק וארוך',10,'Ultra-sleek, long, silky straight hair. Perfectly straight, polished, and shiny hair parted down the middle, falling straight over both shoulders and chest.'],
 ['קוקו גבוה אופנתי',22,'High, voluminous ponytail set on top of the head. Smooth, pulled-back front with a full ponytail cascading down, complemented by soft wispy tendrils delicately framing the face.'],
 ['קארה גלי בינוני',26,'Shoulder-length medium bob with soft, relaxed waves. Gentle curves around the shoulders framing the face neatly.'],
 ['חצי-אסוף גבוה / חצי קוקו',33,'Half-up high ponytail style. The top half of the hair is gathered into a neat small high ponytail on the crown, while the remaining long hair flows in soft waves over the shoulders.'],
 ['אסוף קליפס קז׳ואל',34,'Casual chic claw-clip updo. Hair is gathered at the back with a neutral claw clip in an effortless bun, leaving soft, delicate face-framing tendrils falling naturally around the face.'],
 ['חצי-אסוף יומיומי עם קליפס','9 מתמונה 4','Relaxed half-up style held at the back of the head with a simple claw clip, allowing smooth, long waves to drape down over the shoulders.'],
 ['שביל באמצע טבעי',37,'Natural center part with effortless, relaxed loose waves. Hair drapes evenly on both sides over the shoulders and chest in a soft, understated look.'],
 ['שביל צד עמוק גלי',11,'Deep side-part with dramatic, glamorous big waves swept entirely over one shoulder, while the opposite side is smooth and tucked neatly.'],
 ['תלתלים מובנים יוקרתיים',14,'Luxurious, defined, glossy curls with rich volume. Perfectly sculpted shiny spiral curls cascading elegantly over both shoulders.'],
 ['גלים הוליוודיים קלאסיים',16,'Classic Hollywood glam waves. Ultra-polished, vintage-inspired uniform luxury waves with a high-shine glossy finish flowing smoothly down.'],
 ['שיניון נמוך אצילי',17,'Noble, sleek low chignon bun tied neatly at the nape of the neck. Clean, polished hairline, fully pulled-back, elegant, and sophisticated updo.'],
 ['אסוף אירועים גבוה',18,'Intricate formal high updo for special events. Sculpted voluminous bun on top, with delicate, soft curled tendrils hanging gracefully around the sides of the face.'],
 ['גלים עשירים עם סיכת פנינה',19,'Rich, open glamour waves styled with a delicate pearl hairpin accent placed gracefully on one side above the ear, hair flowing over both shoulders.'],
 ['ערב אלגנטי אסוף','8 מתמונה 1','Structured, elegant high evening updo. Smoothly gathered hair built into a polished, regal crown bun with a clean, sophisticated silhouette.']];
window.HAIR121=HAIR121;
function hairPrompt121(i){const [he,,en]=HAIR121[i];return `Attached in this one message: my 2 avatar files with my wig (file 1: front, side, back; file 2: half side, hand on hip).
EDIT these two pictures – do not create new pictures and do not redraw me. Return two pictures, the same size and the same layout as the attached files.
Change ONE thing only: my hairstyle (my wig).
Everything else stays exactly the same: the same face, the same smile, the same skin, the same body, the same nude fitted outfit, the same shoes, the same pose and direction of each figure, the same light grey background and the same place in the picture. NO jewelry, NO heavy makeup, NO text, NO lines.
Hair Color: Dark brown hair with subtle light highlights – the same colour as my wig now.
Hairstyle ${i+1} (${he}): ${en}
Show how this hairstyle really looks from every side: in the side, back and half side views – the ponytail, braid, bun, clip or waves at the back.
Photorealistic, clean lighting, hyper-detailed hair texture, modular avatar asset style.`}
window.hairPrompt121=hairPrompt121;
// her 2 avatar files with the wig
let WAV121=null;
function wigFiles121(){return WAV121||(WAV121=Promise.all([['av/p6w_sheet1.jpg','האווטאר שלי עם פאה - קובץ 1 (חזית, צד, גב).jpg'],['av/p6w_sheet2.jpg','האווטאר שלי עם פאה - קובץ 2 (חצי צד, יד על המותן).jpg']].map(async([u,n])=>new File([await window.blob102(u+'?v='+(window.VER||''))],n,{type:'image/jpeg'}))).catch(e=>{WAV121=null;throw e}))}
const tel121=()=>innerWidth<820&&!!(navigator.canShare&&navigator.share);
async function copy121(t){try{await navigator.clipboard.writeText(t);return true}catch(_){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}ta.remove();return ok}}
// send: prompt copied + the 2 wig files (phone: share sheet → ChatGPT; computer: one zip, then GPT opens)
async function send121(i,btn){const ok=await copy121(hairPrompt121(i));let fs;try{fs=await wigFiles121()}catch(e){ERR('v121 files',e);toast('לא הצלחתי להכין את קבצי האווטאר');return}
 if(tel121()){try{await navigator.share({files:fs});toast('✓ ב-GPT: לחיצה ארוכה ← הדבק, ושולחים');return}catch(err){if(err&&err.name=='AbortError')return;if(btn)btn.textContent='📤 לחצי שוב';toast('הקבצים מוכנים – לחצי שוב');return}}
 try{const zb=await window.zip109(fs);const n=await window.save102([[zb,'פאה ל-GPT - '+HAIR121[i][0]+'.zip']]);
  if(n){paint121(`✓ הפרומפט של "${HAIR121[i][0]}" ${ok?'הועתק':'מוכן'} והזיפ עם 2 קבצי הפאה ירד. ב-GPT: ＋ ← מעלים את 2 הקבצים ← Ctrl+V ← שליחה.`);try{window.gptOpen93&&gptOpen93(hairPrompt121(i),false)}catch(_){}}}
 catch(err){ERR('v121 zip',err);toast('משהו לא עבד, נסי שוב')}}
function dlg121(){let d=document.getElementById('hair121');if(!d){d=document.createElement('dialog');d.id='hair121';d.className='sheet9 t120d';d.dir='rtl';document.body.appendChild(d)}return d}
let MSG121='';
function card121(i){const [he,no]=HAIR121[i];return `<li><div class="t120n"><b>${i+1}. ${esc(he)}</b><small>מספר ${esc(String(no))} בתמונות התסרוקות</small></div>
 <div class="t120a"><button class="go" data-h121="g${i}">${tel121()?'📤':'🚀'} ל-GPT</button><button data-h121="c${i}">📋 העתקת הפרומפט</button><button data-h121="s${i}" aria-expanded="false">👁</button></div><pre hidden dir="ltr">${esc(hairPrompt121(i))}</pre></li>`}
function paint121(msg){if(msg!=null)MSG121=msg;const d=dlg121();
 d.innerHTML=`<div class="sh9h"><h3>💇 20 תסרוקות לפאה</h3><button class="x" data-h121="x" aria-label="סגירה">✕</button></div><div class="t120b">
 <p class="t120h">בוחרים תסרוקת ← הפרומפט מועתק ושני קבצי האווטאר <b>עם הפאה</b> ${tel121()?'נשלחים (בוחרים ChatGPT)':'יורדים בזיפ אחד'}. צ'אט חדש לכל תסרוקת.<br><small>GPT עורך את שתי התמונות שלך ומשנה רק את השיער – הפנים והגוף נשארים שלך. את שתי התמונות שחוזרות שולחים לי כאן, ואני מעלה אותן לאווטאר.</small></p>
 ${MSG121?`<p class="t121m">${esc(MSG121)}</p>`:''}
 <h4 class="t121g">יום חול, קז׳ואל ועסקים</h4><ol class="t120l">${HAIR121.slice(0,13).map((_,i)=>card121(i)).join('')}</ol>
 <h4 class="t121g">ערב, שבת ואירועים</h4><ol class="t120l">${HAIR121.slice(13).map((_,i)=>card121(i+13)).join('')}</ol></div>`;
 const op=d.open;if(!op)d.showModal()}
function open121(){MSG121='';paint121()}
window.openHair121=open121;
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-h121],[data-h121open]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.h121open!=null)return open121();const a=t.dataset.h121;if(a=='x')return dlg121().close();const i=+a.slice(1);
 if(a[0]=='g'){t.disabled=true;try{await send121(i,t)}finally{t.disabled=false}return}
 if(a[0]=='c'){toast(await copy121(hairPrompt121(i))?`✓ הפרומפט של "${HAIR121[i][0]}" הועתק`:'לא הצלחתי להעתיק');return}
 if(a[0]=='s'){const p=t.closest('li').querySelector('pre');p.hidden=!p.hidden;t.setAttribute('aria-expanded',String(!p.hidden))}},true);
// entry points: the prompts window (📋 פרומטים ל-GPT) and the studio menu
document.addEventListener('click',()=>setTimeout(()=>{const d=document.getElementById('pr80');if(d&&d.open){const b=d.querySelector('.p80t');if(b&&!b.querySelector('[data-h121open]'))b.insertAdjacentHTML('afterbegin','<button data-h121open><span>💇</span>20 תסרוקות לפאה</button>')}
 const sm=document.querySelector('#studio .smenu');if(sm&&!sm.querySelector('[data-h121open]'))sm.insertAdjacentHTML('beforeend','<button data-h121open>💇 20 תסרוקות לפאה</button>')},60));
