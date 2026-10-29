// ---- v99 (2026-10-22): a garment from GPT in TWO files, drawn on the new avatar's own two files (file 1: front / side / back,
// file 2: half-side / hand on hip). The panels are equal parts of each file, only the background is removed (cut89, grey-only),
// and each piece is put exactly where it sits on the new avatar: the same panel → stage numbers that put her avatar on the stage.
// Such a garment is marked av:'p6' + two:1, so it is never moved by the automatic fitting (it is already on her body).
const T99={front:[157,20,14,38,1.32975,1.32956],side:[164,16,76,38,1.33152,1.33093],back:[79,16,20,38,1.32714,1.32819],half:[231,19,39,38,1.1069,1.10531],hip:[97,19,4,240,0.92874,0.92839]};
const CAPP99={1:[512,1024],2:[627,1254]};// panel size of her avatar files (file 1 is 1536×1024 in 3 parts, file 2 is 1254×1254 in 2 parts)
const F99={1:['front','side','back'],2:['half','hip']};
const PR99={1:`מצורפות שתי תמונות: 1) האווטאר שלי, 3 תנוחות: חזית, צד, גב. 2) תמונה של בגד שלי.
ערכי את תמונת האווטאר: צרי את הבגד מהתמונה כאילו אני לובשת אותו, ואז השאירי רק את הבגד – כאילו לובשת אותו דמות שקופה. הבגד בדיוק בגודל, בצורה ובמקום שהוא יושב על הגוף שלי בכל אחת משלוש התנוחות.
חשוב:
- אותו גודל תמונה, אותו סידור, אותן תנוחות ואותו מקום בדיוק כמו בתמונת האווטאר המצורפת.
- רק הבגד: בלי ראש, בלי פנים, בלי ידיים, בלי רגליים, בלי נעליים ובלי גוף. בתוך הצווארון רואים את הצד הפנימי של הבגד.
- הבגד נראה בדיוק כמו בתמונה שלו: אותו צבע, בד, דוגמה, כפתורים, קפלים ואורך. בגד לבן נשאר לבן.
- שרוולים: הולכים לפי הידיים של התנוחה. חצאית: מתחילה בקו המותן שלי.
- בצד ובגב: איך שהבגד נראה באמת מהצד ומאחור (רוכסן, קפלים, הגב של הבגד).
- כל הבגד בתוך החלק שלו, לא חתוך ולא נוגע בקצה.
- רקע אפור בהיר אחיד כמו בתמונת האווטאר. אם הבגד אפור – רקע ירוק בהיר.
- בלי טקסט, בלי מספרים, בלי קווים, בלי צל.`,
2:`עכשיו אותו בגד בדיוק על התמונה המצורפת (2 תנוחות: חצי צד, יד על המותן), באותה דרך: רק הבגד, כאילו לובשת אותו דמות שקופה, בדיוק בגודל ובמקום שהוא יושב על הגוף שלי בכל תנוחה.
אותו גודל תמונה, אותו סידור ואותו מקום כמו בתמונה המצורפת. אותו צבע, בד ודוגמה כמו קודם. ביד על המותן: השרוול הולך לפי היד המכופפת, והיד עצמה לא מופיעה.
כל הבגד בתוך החלק שלו, לא חתוך. רקע אפור בהיר אחיד (אם הבגד אפור – ירוק בהיר). בלי טקסט, בלי קווים, בלי צל.`};
// v103: ONE prompt for everything – both avatar files + the garment picture → two new pictures; says exactly what she bought
const TYPE102={skirts:['חצאית','החצאית','החצאית מתחילה בקו המותן שלי. רק החצאית – בלי חולצה, בלי חגורה (אלא אם החגורה חלק מהחצאית).'],
 tops:['חולצה','החולצה','השרוולים הולכים לפי הידיים של כל תנוחה. בתוך הצווארון רואים את הצד הפנימי של החולצה. רק החולצה – בלי חצאית ובלי מכנסיים.'],
 sweaters:['סוודר','הסוודר','השרוולים הולכים לפי הידיים של כל תנוחה. בתוך הצווארון רואים את הצד הפנימי. רק הסוודר – בלי חצאית ובלי מכנסיים.'],
 dresses:['שמלה','השמלה','השרוולים הולכים לפי הידיים של כל תנוחה. בתוך הצווארון רואים את הצד הפנימי של השמלה. השמלה באורך האמיתי שלה על הגוף שלי.'],
 outer:["ז'קט / מעיל","הז'קט / המעיל",'השרוולים הולכים לפי הידיים של כל תנוחה. פתוח או סגור כמו בתמונה. רק הז׳קט – בלי מה שמתחתיו.'],
 sets:['סט','כל חלקי הסט','כל החלקים שבסט שקניתי, כל אחד במקום שלו על הגוף. בלי בגדים שלא שייכים לסט.'],
 belts:['חגורה','החגורה','החגורה בגובה המותן שלי. בכל תנוחה רק החצי של החגורה שפונה למצלמה: בחזית – החצי הקדמי, ברוחב המותן המלא, מתעגל קצת לצדדים; בגב – החצי האחורי; בצד – החלק שבצד. החגורה לא צרה מהגוף.'],
 shoes:['נעליים','הנעליים','הנעליים על כפות הרגליים שלי, בדיוק בגודל ובמקום של הכפות בכל תנוחה (מידה 38). רק הנעליים – בלי רגליים.'],
 bags:['תיק','התיק','התיק נישא כמו שנושאים אותו באמת (על הכתף / ביד / באלכסון), בגודל האמיתי שלו ביחס לגוף שלי. רק התיק – בלי היד והגוף.'],
 scarves:['כיסוי ראש','כיסוי הראש','כיסוי הראש קשור על הראש שלי מעל הכובע, בדיוק בגודל הראש שלי. רק הכיסוי – בלי פנים, בלי ראש ובלי צוואר.'],
 hosiery:['גרביונים','הגרביונים','הגרביונים על הרגליים שלי. רק הגרביונים – בלי רגליים ובלי נעליים.']};
function typeWord102(id){let c='';try{c=curCat(id)}catch(_){}const t=TYPE102[c]||['בגד','הבגד','השרוולים (אם יש) הולכים לפי הידיים של כל תנוחה.'];return {a:t[0],the:t[1],extra:t[2]}}
function pr102(id,np){const t=typeWord102(id);np=Math.max(1,np|0||1);const P=np>1?'בתמונות 3–'+(np+2):'בתמונה 3';const nm=((D[id]||{}).short||'').trim();
 return `מצורפות ${np+2} תמונות:
1) האווטאר שלי – 3 תנוחות: חזית, צד, גב.
2) האווטאר שלי – 2 תנוחות: חצי צד, יד על המותן.
${np>1?`3–${np+2}) ${np} תמונות של מה שקניתי (מכמה צדדים – כדי לראות איך זה נראה מקדימה, מהצד ומאחור).`:'3) תמונה של מה שקניתי.'}

מה שקניתי: רק ${t.a}${nm?` (${nm})`:''}.
אם ${P} יש עוד בגדים או אביזרים (חולצה, חצאית, ז'קט, חגורה, תיק, נעליים…) – הם לא שלי. לא לצייר אותם. רק ${t.the}.

צרי שתי תמונות חדשות, אחת לכל תמונת אווטאר, ושלחי את שתיהן:
- תמונה א' לפי תמונה 1: אותו גודל תמונה, אותן 3 תנוחות, אותו סידור ואותו מקום.
- תמונה ב' לפי תמונה 2: אותו גודל תמונה, אותן 2 תנוחות, אותו סידור ואותו מקום.
בכל תנוחה: ${t.the} כאילו אני לובשת, ואז להשאיר רק את ${t.the} – כאילו לובשת דמות שקופה. בדיוק בגודל, בצורה ובמקום שזה יושב על הגוף שלי.

חשוב:
- ${t.extra}
- בלי ראש, בלי פנים, בלי ידיים, בלי רגליים ובלי גוף.
- נראה בדיוק כמו ${P}: אותו צבע, בד, דוגמה, כפתורים, קפלים ואורך. לבן נשאר לבן.
- בצד ובגב: איך שזה נראה באמת מהצד ומאחור (רוכסן, קפלים, הגב).
- ביד על המותן: ${/שרוול/.test(t.extra)?'השרוול הולך לפי היד המכופפת, ו':''}היד עצמה לא מופיעה.
- אותו גודל ואותו אורך בדיוק בכל 5 התנוחות, לפי הגוף שלי באווטאר.
- לא לשנות את גודל התמונות: תמונה א' רוחבית כמו תמונה 1, תמונה ב' כמו תמונה 2.
- הכל בתוך החלק שלו, לא חתוך ולא נוגע בקצה.
- רקע אפור בהיר אחיד כמו בתמונות האווטאר. אם הצבע אפור – רקע ירוק בהיר.
- בלי טקסט, בלי מספרים, בלי קווים, בלי צל.`}
window.pr102=pr102;
const TW99={id:null,f:{1:null,2:null},im:{1:null,2:null},cuts:null,busy:false};
// cut one file into its equal panels; every piece keeps where it sat in the panel
// a soft background (light spots, slight gradient) is flattened first: flood from the edges and from clearly-background pixels,
// step by step over smooth colour, never into colours far from the background (white garments stay)
function flat99(d,W,H,x0,x1){const pw=x1-x0;const sm=[[],[],[]];for(let c=x0;c<x1;c+=3)for(const r of [0,1,2,H-3,H-2,H-1]){const k=(r*W+c)*4;for(let j=0;j<3;j++)sm[j].push(d[k+j])}
 for(let r=0;r<H;r+=3)for(const c of [x0,x0+1,x0+2,x1-3,x1-2,x1-1]){const k=(r*W+c)*4;for(let j=0;j<3;j++)sm[j].push(d[k+j])}
 const bg=sm.map(a=>{a.sort((p,q)=>p-q);return a[a.length>>1]});const bL=(bg[0]+bg[1]+bg[2])/3;
 // same hue as the background and only a little lighter/darker (a white garment is much lighter and stays)
 const db=k=>{const L=(d[k]+d[k+1]+d[k+2])/3,dl=L-bL;if(dl>18||dl<-30)return 999;return Math.abs(d[k]-L-bg[0]+bL)+Math.abs(d[k+1]-L-bg[1]+bL)+Math.abs(d[k+2]-L-bg[2]+bL)};
 // closed gaps (arm on the hip) are seeded only on a tinted background – on neutral grey a white garment could look like it
 const tint=Math.max(...bg.map(x=>Math.abs(x-bL)))>=6;const m=new Uint8Array(pw*H),q=new Int32Array(pw*H);let n=0;const add=i=>{if(!m[i]){m[i]=1;q[n++]=i}};
 for(let r=0;r<H;r++)for(let c=0;c<pw;c++){const k=(r*W+x0+c)*4;const e=r==0||c==0||r==H-1||c==pw-1;const v=db(k);if((e&&v<24)||(tint&&v<10&&Math.abs((d[k]+d[k+1]+d[k+2])/3-bL)<12))add(r*pw+c)}
 for(let h=0;h<n;h++){const i=q[h],r=(i/pw)|0,c=i-r*pw,k=(r*W+x0+c)*4;for(const [dr,dc] of [[0,1],[0,-1],[1,0],[-1,0]]){const rr=r+dr,cc=c+dc;if(rr<0||cc<0||rr>=H||cc>=pw)continue;const j=rr*pw+cc;if(m[j])continue;const kk=(rr*W+x0+cc)*4;
  const st=Math.abs(d[kk]-d[k])+Math.abs(d[kk+1]-d[k+1])+Math.abs(d[kk+2]-d[k+2]);if(db(kk)<24&&st<((d[kk]+d[kk+1]+d[kk+2])/3>bL+8?7:14))add(j)}}
 if(n>pw*H*.97)return;// nothing left – keep the panel as it was
 for(let i=0;i<n;i++){const r=(q[i]/pw)|0,c=q[i]-r*pw,k=(r*W+x0+c)*4;d[k]=bg[0];d[k+1]=bg[1];d[k+2]=bg[2]}}
// v105: GPT does not always keep the avatar's layout – the panel borders go in the empty gap between the pieces (near the equal split),
// so a wide skirt that crosses the middle line is not cut in half
function split105(d,W,H,n){const e=[[],[],[]];for(let c=0;c<W;c+=4)for(const r of [0,1,H-2,H-1]){const k=(r*W+c)*4;for(let j=0;j<3;j++)e[j].push(d[k+j])}
 const bg=e.map(a=>{a.sort((p,q)=>p-q);return a[a.length>>1]});const occ=new Float32Array(W);
 for(let c=0;c<W;c++){let s=0;for(let r=0;r<H;r+=2){const k=(r*W+c)*4;if(Math.abs(d[k]-bg[0])+Math.abs(d[k+1]-bg[1])+Math.abs(d[k+2]-bg[2])>40)s++}occ[c]=s}
 const sm=c=>{let s=0,m=0;for(let j=c-3;j<=c+3;j++)if(j>=0&&j<W){s+=occ[j];m++}return s/m};const b=[0];
 for(let i=1;i<n;i++){const e0=i*W/n,rg=W/n*.22;let best=Math.round(e0),bv=1e9;for(let c=Math.round(e0-rg);c<=Math.round(e0+rg);c++){const v=sm(c)+Math.abs(c-e0)*.01;if(v<bv){bv=v;best=c}}b.push(best)}
 b.push(W);return b}
function cut99(im,n){const rd=tieRead(im);const {d,W,H}=rd;const b=split105(d,W,H,n);for(let i=0;i<n;i++)flat99(d,W,H,b[i],b[i+1]);const pw=W/n;const out=[];
 for(let i=0;i<n;i++){const x0=b[i],x1=b[i+1],n0=i*pw;const c=tieCutPanel(d,W,H,x0+4,x1-4,1);out.push(c?trim99(Object.assign(c,{px:x0-n0+4+(c.ox||0),py:c.oy||0,pw,ph:H})):null)}return out}
// a soft background leaves faint specks at the panel edges – keep only rows/columns with solid garment
function trim99(c){const cv=c.canvas,w=cv.width,h=cv.height;const d=cv.getContext('2d').getImageData(0,0,w,h).data;const cc=new Uint32Array(w),rc=new Uint32Array(h);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>128){cc[x]++;rc[y]++}
 const lo=(a,n)=>{for(let i=0;i<a.length;i++)if(a[i]>=n)return i;return 0},hi=(a,n)=>{for(let i=a.length-1;i>=0;i--)if(a[i]>=n)return i;return a.length-1};
 const x0=Math.max(0,lo(cc,3)-2),x1=Math.min(w-1,hi(cc,3)+2),y0=Math.max(0,lo(rc,3)-2),y1=Math.min(h-1,hi(rc,3)+2);if(x0==0&&y0==0&&x1==w-1&&y1==h-1)return c;
 const nw=x1-x0+1,nh=y1-y0+1,n=document.createElement('canvas');n.width=nw;n.height=nh;n.getContext('2d').drawImage(cv,x0,y0,nw,nh,0,0,nw,nh);const sc=c.sc||1;
 return Object.assign(c,{canvas:n,w:nw,h:nh,px:c.px+x0/sc,py:c.py+y0/sc})}
// panel position → stage position (399×1365) through her avatar's own numbers for that pose
function fit99(v,k,c){const t=T99[v],cp=CAPP99[k];const fx=cp[0]/c.pw,fy=cp[1]/c.ph;const sc=c.sc||1;const cw=c.w/sc,ch=c.h/sc;
 const X=px=>t[2]+(px*fx-t[0])*t[4],Y=py=>t[3]+(py*fy-t[1])*t[5];const r1=q=>Math.round(q*10)/10;
 return {x:r1(X(c.px+cw/2)/399*100),y:r1(Y(c.py+ch/2)/1365*100),w:r1(cw*fx*t[4]/399*100)}}
// v105: a skirt is placed by her body, not by where GPT drew it (GPT often changes the picture size and the skirt size):
// the waistband goes on her waist line, as wide as her waist in that pose, and the skirt is the same length in every pose.
// BODY105[v] = [waist row, waist left, waist right, top of head, soles] on the stage (399×1365), measured on her bodysuit mask.
const BODY105={front:[515,105,295,38,1328],side:[515,107,259,38,1328],back:[515,102,287,38,1328],half:[515,135,280,38,1328],hip:[643,82,241,240,1328]};
function band105(c){const cv=c.canvas,w=cv.width,h=cv.height;const d=cv.getContext('2d').getImageData(0,0,w,Math.max(1,Math.round(h*.08))).data;const xs=[];
 for(let y=Math.round(h*.02);y<Math.round(h*.07);y++){let a=-1,b=-1;for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>128){if(a<0)a=x;b=x}if(a>=0)xs.push([a,b])}
 if(!xs.length)return [0,w];const md=i=>xs.map(q=>q[i]).sort((p,q)=>p-q)[xs.length>>1];return [md(0),md(1)+1]}
function fitSkirt105(cuts){const vs=Object.keys(BODY105).filter(v=>cuts[v]);const m={};
 for(const v of vs){const c=cuts[v],sc=c.sc||1,b=band105(c),B=BODY105[v],H=B[4]-B[3];const bw=(b[1]-b[0])/sc;const s=(B[2]-B[1])*1.05/Math.max(8,bw);m[v]={c,sc,b,B,H,s,len:c.h/sc*s/H}}
 const ls=vs.map(v=>m[v].len).sort((p,q)=>p-q);// a skirt never goes below the floor she stands on
 const L=Math.min(ls[ls.length>>1],...vs.map(v=>(m[v].B[4]-m[v].B[0])/m[v].H+.015-.012));const out={};
 for(const v of vs){const q=m[v];const len=Math.min(L,Math.max(L*.94,q.len));const s=len*q.H/(q.c.h/q.sc);const cw=q.c.w/q.sc,ch=q.c.h/q.sc;
  const top=q.B[0]-q.H*.015,bc=(q.b[0]+q.b[1])/2/q.sc,cx=(q.B[1]+q.B[2])/2-(bc-cw/2)*s;const r1=x=>Math.round(x*10)/10;
  out[v]={x:r1(cx/399*100),y:r1((top+ch*s/2)/1365*100),w:r1(cw*s/399*100)}}
 return out}
let FIT105=null;
function fitAny105(id,v,k,p,cuts){let cat='';try{cat=curCat(id)}catch(_){}
 if(cat=='skirts'){if(!FIT105||FIT105.cuts!==cuts)FIT105={cuts,f:fitSkirt105(cuts)};if(FIT105.f[v])return FIT105.f[v]}
 return fit99(v,k,p)}
function dlg99(){let d=document.getElementById('two99');if(!d){d=document.createElement('dialog');d.id='two99';d.className='sheet9';d.dir='rtl';document.body.appendChild(d);
 document.body.insertAdjacentHTML('beforeend','<input type="file" id="two99f" accept="image/*" multiple hidden>')}return d}
function paint99(){const d=dlg99();const nm=TW99.id&&D[TW99.id]?esc((D[TW99.id].short||'').slice(0,40)):'';
 const slot=k=>{const f=TW99.im[k];return `<button class="t99s${f?' on':''}" data-t99pick="${k}"><span class="t99i">${f?`<img src="${f.th||''}" alt="">`:'＋'}</span><b>קובץ ${k}</b><small>${k==1?'חזית, צד, גב':'חצי צד, יד על המותן'}</small></button>`};
 const names={front:'חזית',side:'צד',back:'גב',half:'חצי צד',hip:'יד על המותן'};
 const prev=TW99.cuts?`<h4>כך האתר חתך:</h4><div class="t99c">${['front','side','back','half','hip'].map(v=>{const c=TW99.cuts[v];return `<figure>${c?`<img src="${c.canvas.toDataURL('image/webp',.8)}" alt="">`:'<i>לא נמצא בגד</i>'}<figcaption>${names[v]}</figcaption></figure>`}).join('')}</div>`:'';
 const ready=TW99.cuts&&Object.values(TW99.cuts).filter(Boolean).length==5;
 d.innerHTML=`<div class="sh9h"><h3>👗 בגד מ-GPT · 2 קבצים</h3><button class="x" data-t99x aria-label="סגירה">✕</button></div><div class="t99b">
 <p class="t99n">${nm}</p>
 <details class="t99h"><summary>איך מכינים ב-GPT?</summary><ol><li>צ'אט חדש. מצרפים <b>3 תמונות יחד</b>: קובץ 1 + קובץ 2 של האווטאר עם הכובע, ותמונה של הבגד.</li><li>מדביקים את <b>הפרומפט האחד</b> – כבר כתוב בו מה קנית (${esc(typeWord102(TW99.id).a)}). GPT מחזיר שתי תמונות.</li><li>שומרים את שתי התמונות ובוחרים אותן כאן.</li></ol>
 <div class="t99r"><button class="go" data-t99cp="all">📋 פרומפט אחד – הכל</button><button data-t99sheet>🧍 קבצי האווטאר</button></div>
 <p class="t99n">אם GPT מחזיר רק תמונה אחת: <button data-t99cp="1">📋 פרומפט 1</button> <button data-t99cp="2">📋 פרומפט 2</button></p></details>
 <div class="t99g">${slot(1)}${slot(2)}</div>
 <p class="t99m">${TW99.busy?'רגע, חותכת…':(!TW99.im[1]||!TW99.im[2])?'אפשר לבחור את שתי התמונות יחד.':''}</p>${prev}
 <div class="t99r">${TW99.im[1]&&TW99.im[2]?'<button data-t99sw>⇄ החליפי בין הקבצים</button>':''}<button class="go" data-t99save ${ready&&!TW99.busy?'':'disabled'}>✓ שמרי</button></div></div>`;if(!d.open)d.showModal()}
async function run99(){TW99.cuts=null;if(!TW99.im[1]||!TW99.im[2]){paint99();return}TW99.busy=true;paint99();await new Promise(r=>setTimeout(r,30));
 try{const c={};for(const k of [1,2]){const cs=cut99(TW99.im[k],F99[k].length);F99[k].forEach((v,i)=>{c[v]=cs[i]})}TW99.cuts=c}catch(e){ERR('v99 cut',e);toast('לא הצלחתי לחתוך')}TW99.busy=false;paint99()}
async function files99(fs){const ims=[];for(const f0 of fs){try{const buf=await f0.arrayBuffer();const f=new File([buf],f0.name||'gpt.png',{type:f0.type||'image/png'});const im=await tieLoadImg(f);try{const k=Math.min(1,360/im.naturalWidth),cv=document.createElement('canvas');cv.width=Math.round(im.naturalWidth*k);cv.height=Math.round(im.naturalHeight*k);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);im.th=cv.toDataURL('image/jpeg',.75)}catch(_){}ims.push(im)}catch(_){toast('לא הצלחתי לקרוא תמונה')}}
 const wide=im=>im.naturalWidth/im.naturalHeight>1.2;
 if(ims.length>=2){const [a,b]=ims;const r=im=>im.naturalWidth/im.naturalHeight;// file 1 (3 poses) is the wider one, in any order
  if(r(b)>r(a)*1.04){TW99.im[1]=b;TW99.im[2]=a}else{TW99.im[1]=a;TW99.im[2]=b}}
 else if(ims.length==1){const im=ims[0];const k=TW99.want||(wide(im)?1:2);TW99.im[k]=im}
 TW99.want=null;await run99()}
async function save99(){const id=TW99.id,c=TW99.cuts;if(!id||!c)return;let a=null;try{a=await claude.use('assets')}catch(_){}if(!a){toast('העלאת תמונות לא זמינה כאן');return}
 TW99.busy=true;const m=document.querySelector('#two99 .t99m');const g={u:{},fit:{},t:Date.now(),av:'p6',two:1};
 try{for(const [k,vs] of Object.entries(F99))for(const v of vs){const p=c[v];if(m)m.textContent=`שומרת ${v}…`;const r=await a.upload(await tieBlob(p.canvas));g[v]=r.id;if(r.url)g.u[v]=r.url;g.fit[v]=fitAny105(id,v,+k,p,c)}
  const vars=p5gVars(id).slice();const old=vars.length&&vars.every(x=>x.av!='p6');g.n=TW99.add?'גרסה '+(vars.length+1):old?'אווטאר חדש':((vars[p5gActive(id)]||{}).n||'');
  if(old||!vars.length||TW99.add)vars.push(g);else vars[p5gActive(id)]=g;
  await putItem(id,{p5g:g,p5gv:vars.length>1?vars:null});
  try{if(ST)for(const [sl,i2] of Object.entries(ST.items))if(i2==id&&ST.tf[sl]){const tf=ST.tf[sl];tf.af={};tf.pvman={};tf.pv={};delete tf.sp96;tf.gv=null;if(tf.pvv)tf.x=null}}catch(_){}
  TW99.busy=false;dlg99().close();toast('✓ הבגד נשמר ב-5 תנוחות, על האווטאר החדש');try{renderImgRow(id)}catch(_){}try{if(ST&&document.getElementById('studio')?.open)await drawStudio()}catch(_){}}
 catch(e){ERR('v99 save',e);TW99.busy=false;toast('לא הצלחתי לשמור. נסי שוב');paint99()}}
function open99(id,add){TW99.add=!!add;TW99.id=id;TW99.im={1:null,2:null};TW99.cuts=null;TW99.busy=false;paint99()}
window.open99=open99;
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-two99],[data-t99x],[data-t99pick],[data-t99sw],[data-t99save],[data-t99cp],[data-t99sheet]');if(!t)return;e.preventDefault();e.stopImmediatePropagation();
 if(t.dataset.two99){open99(t.dataset.two99);return}
 if(t.dataset.t99x!==undefined){dlg99().close();return}
 if(t.dataset.t99pick){TW99.want=+t.dataset.t99pick;const f=document.getElementById('two99f');f.click();return}
 if(t.dataset.t99sw!==undefined){const a=TW99.im[1];TW99.im[1]=TW99.im[2];TW99.im[2]=a;await run99();return}
 if(t.dataset.t99save!==undefined){if(!TW99.busy)await save99();return}
 if(t.dataset.t99cp){const txt=t.dataset.t99cp=='all'?pr102(TW99.id):PR99[t.dataset.t99cp];if(window.gptOpen93&&t.dataset.t99cp!='2'){await gptOpen93(txt,false);toast(t.dataset.t99cp=='all'?'✓ הפרומפט הועתק. מצרפים את 2 קבצי האווטאר + הבגד ומדביקים':'✓ הפרומפט הועתק. מצרפים את הקובץ ואת הבגד ומדביקים')}else{try{await navigator.clipboard.writeText(txt);toast('✓ הועתק')}catch(_){toast('לא הצלחתי להעתיק')}}return}
 if(t.dataset.t99sheet!==undefined){if(window.openSheets85)openSheets85()}},true);
document.addEventListener('change',e=>{if(e.target.id!='two99f'||!e.target.files.length)return;const fs=[...e.target.files].slice(0,2);e.target.value='';files99(fs)});
// the garment window: the two-file upload is the main button; the old 5-in-one upload stays next to it
{const _rr=renderImgRow;renderImgRow=function(id){const r=_rr.apply(this,arguments);try{const box=document.querySelector(`[data-imgrow="${id}"] .p5gbox`);if(box&&!box.querySelector('[data-two99]')){const ib=box.querySelector('.ib');if(ib){ib.querySelectorAll('.go').forEach(b=>{if(b.dataset.upm)b.classList.remove('go')});ib.insertAdjacentHTML('afterbegin',`<button class="go" data-two99="${id}">📥 בגד מ-GPT · 2 קבצים</button><button class="go" data-go104="${id}">🚀 הכל ל-GPT</button><button data-pr102="${id}">📋 פרומפט אחד ל-GPT</button>`)}}}catch(e){ERR('v99 row',e)}return r}}
// a garment that is already on her body is not moved by the automatic fitting (📐 by hand still works)
if(typeof smartFit=='function'){const _sf=smartFit;smartFit=async function(slot,force,ctx){try{{const g0=ctx&&ctx.g||(ST&&ST.items[slot]&&p5gOfT(ST.items[slot],ST.tf[slot]));if(g0&&g0.two)return false}/* v113: a two-file garment is already on her body – no automatic fit at all (studio pose change, all-poses window); only the 📐 button by hand *//* v113: also the per-pose automatic fit (all-poses window, first visit of a pose) – it pulled the skirt down to the hips */if(!force&&!ctx&&ST){const id=ST.items[slot];const g=id&&p5gOfT(id,ST.tf[slot]);if(g&&g.two)return false}}catch(_){}return _sf.apply(this,arguments)};window.smartFit=smartFit}
// v113: for such a garment 📐 / reset bring back its own place on her body in ALL 5 poses (the old automatic fit pulled skirts down to the hips)
window.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('#sfit,[data-fit],#sreset');if(!b||!ST)return;const slot=SSEL||Object.keys(ST.items).find(s=>ST.items[s]);const id=slot&&ST.items[slot];const tf=id&&ST.tf[slot];const g=tf&&p5gOfT(id,tf);if(!g||!g.two)return;
 e.preventDefault();e.stopImmediatePropagation();try{pushH()}catch(_){}tf.g112=0;await drawStudio();toast('✓ הבגד חזר למקום שלו על הגוף, בכל 5 התנוחות')},true);
document.head.insertAdjacentHTML('beforeend',`<style>
#two99{max-width:min(560px,100vw);width:100%;padding:0;border:0;border-radius:20px}
#two99 .t99b{padding:4px 16px 18px;display:flex;flex-direction:column;gap:10px;max-height:80dvh;overflow:auto}
#two99 .t99n{margin:0;color:var(--muted,#7a6e64);font-size:.85rem}
#two99 .t99g{display:grid;grid-template-columns:1fr 1fr;gap:10px}
#two99 .t99s{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px;border:1.5px dashed var(--line2,#d8cfc2);border-radius:14px;background:var(--card,#fff);font:inherit;color:inherit;cursor:pointer}
#two99 .t99s.on{border-style:solid}
#two99 .t99i{display:grid;place-items:center;width:100%;aspect-ratio:3/2;border-radius:10px;background:var(--chip,#f1ece4);font-size:1.6rem;overflow:hidden}
#two99 .t99i img{width:100%;height:100%;object-fit:contain}
#two99 .t99s small{color:var(--muted,#7a6e64);font-size:.75rem}
#two99 .t99c{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
#two99 .t99c figure{margin:0;text-align:center;font-size:.7rem}
#two99 .t99c img{width:100%;height:120px;object-fit:contain;background:repeating-conic-gradient(#f1ece6 0 25%,#fff 0 50%) 50%/12px 12px;border-radius:8px}
#two99 .t99c i{display:grid;place-items:center;height:120px;font-size:.7rem;color:#b3261e}
#two99 .t99r{display:flex;gap:8px;flex-wrap:wrap}
#two99 .t99r button{font:inherit;border:1px solid var(--line2,#d8cfc2);background:var(--card,#fff);border-radius:999px;padding:7px 14px;cursor:pointer;color:inherit}
#two99 .t99r button.go{background:var(--fg,#2a1f1a);color:var(--bg,#fff);border-color:transparent;font-weight:600}
#two99 .t99r button[disabled]{opacity:.45}
#two99 .t99m{margin:0;font-size:.82rem;color:var(--muted,#7a6e64);min-height:1em}
#two99 h4{margin:4px 0 0;font-size:.88rem}
#two99 .t99h{background:var(--chip,#f1ece4);border-radius:12px;padding:8px 12px;font-size:.85rem}
#two99 .t99h summary{cursor:pointer;font-weight:600}
#two99 .t99h ol{margin:6px 0;padding-inline-start:18px}
</style>`);

document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-pr102]');if(!t)return;e.preventDefault();e.stopPropagation();const txt=pr102(t.dataset.pr102);
 if(window.gptOpen93)await gptOpen93(txt,false);else{try{await navigator.clipboard.writeText(txt)}catch(_){}}toast('✓ הפרומפט הועתק. ב-GPT: מצרפים 2 קבצי האווטאר + תמונת הבגד, ומדביקים')},true);

/* v111: the old buttons of the garment window ("🔄 החליפי", "➕ עוד גרסה", paste) cut GPT's two files as old one-file sheets – each skirt came out
   cut in half. Every 5-pose upload now goes through the two-file window: same cut, same fit by her body, and she sees the 5 pieces before saving. */
{window.upP5gMany=async function(id,files,upm){const fs=[...files].filter(Boolean);if(!fs.length)return;open99(id,upm=='p5gadd');await files99(fs.slice(0,2))};
 const _ru=routeUp;routeUp=async function(id,f,mode){if(mode=='p5g'||mode=='p5gadd'){open99(id,mode=='p5gadd');return files99([f])}return _ru.apply(this,arguments)}}

/* v112: a look keeps its own sizes/places per pose (tf.pv, uk, sx…). When the garment's 5 poses are uploaded again, those old numbers belonged to the
   OLD pictures – the new skirt came out small and low. Each look now remembers which upload its numbers were made for, and starts fresh on a new one. */
{const _si=stageInner;stageInner=async function(S,opt){try{if(S&&S.items&&S.tf)for(const [slot,id] of Object.entries(S.items)){const tf=S.tf[slot];if(!id||!tf)continue;
  let g=p5gOfT(id,tf);
  // v113: a look that was made with the OLD-avatar version of the garment kept pointing at it (tf.gv) – the new upload never showed. Old-avatar
  // versions do not fit the new avatar, so the look moves to the garment's active new version.
  const act=(IT[id]||{}).p5g;if(g&&act&&act.av=='p6'&&g.av!='p6'&&act.front){tf.gv=act.t;g=act}
  if(!g||!g.two||tf.g112==g.t)continue;
  for(const k of ['pv','pvman','af','sp96','uk','sx','sy','bw100'])delete tf[k];const v=S.view||'front',f=g.fit&&(g.fit[v]||g.fit.front);if(f)Object.assign(tf,{x:f.x,y:f.y,w:f.w,r:0,q:1,pvv:v});tf.g112=g.t}}catch(e){ERR('v112 tf',e)}
 return _si.apply(this,arguments)}}
