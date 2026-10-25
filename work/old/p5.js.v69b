// ---- אווטאר חדש ב-5 תנוחות: חזית וגב מלבישים לבד, צד / חצי צד / יד על המותן מגיעים מתמונת GPT של הבגד
BASES.p5={name:'חדש',img:'av/p5_front.webp',head:'av/p5_front_head.webp',head2:'av/p5_front_headonly.webp',back:'av/p5_back.webp',backhead:'av/p5_back_head.webp',backhead2:'av/p5_back_headonly.webp',recolor:false,neck:.214,sh:[.228,.76],waist:[.395,.5],knee:.72,ankle:.93};
const POSES=[['front','חזית'],['side','צד'],['back','גב'],['half','חצי צד'],['hip','יד על המותן']];
const POSEIMG={side:'av/p5_side.webp',half:'av/p5_half.webp',hip:'av/p5_hip.webp'};
const MAINSL=['dress','set','top','outer','skirt'];
document.head.insertAdjacentHTML('beforeend',`<style>
#sposes{display:contents}#sposes:empty{display:none}
.p5note{position:absolute;inset-inline:8px;bottom:8px;z-index:9;background:#fffe;border-radius:12px;padding:8px 10px;font-size:.82rem;text-align:center;box-shadow:0 2px 8px #0002}
.imgrow .p5r{display:flex;gap:6px;overflow-x:auto}.imgrow .p5r figure{margin:0;flex:none;width:62px;text-align:center;font-size:.66rem}.imgrow .p5r img{width:62px;height:150px;object-fit:contain;background:repeating-conic-gradient(#f1ece6 0 25%,#fff 0 50%) 50%/12px 12px;border-radius:8px;display:block}
</style>`);
function p5Main(S){for(const sl of MAINSL){const id=S.items[sl];if(id&&((IT[id]||{}).p5||{}).front)return id}return null}
const _si=stageInner;stageInner=async function(S,opt={}){if((S.avbase||'long')!='p5')return _si(S,opt);
 const v=S.view||'front';const B=BASES.p5;const bgd=`<div class="sbg" style="background:${(BGS[S.bg]||BGS.studio)[1]}"></div>`;
 if(POSEIMG[v]){const mid=p5Main(S);const p=mid&&IT[mid].p5[v];
  if(p)return bgd+`<img class="sb" src="/_blob/${p}" alt="">`+(Object.values(S.items).filter(Boolean).length>1?`<p class="p5note">בתנוחה הזו רואים את ${esc(D[mid].short.slice(0,30))} כמו ש-GPT צייר. את שאר הפריטים רואים בחזית ובגב.</p>`:'');
  return bgd+`<img class="sb" src="${POSEIMG[v]}" alt="">`+(opt.edit?`<p class="p5note">${Object.values(S.items).some(Boolean)?'לבגד הזה עוד אין תמונה בתנוחה הזו. בחלון הבגד: "👗 הבגד על האווטר ב-5 תנוחות".':'בחרי בגד כדי לראות אותו בתנוחה הזו.'}</p>`:'')}
 const back=v=='back';const lays=[];
 for(const [slot,id] of Object.entries(S.items)){if(!id||!D[id])continue;const tf=S.tf[slot]||{};if(tf.hidden&&!opt.edit)continue;if(back&&slot=='jewelry')continue;
  const src=await srcOf(slot,id,tf);const z=(tf.z!=null?tf.z:SLOTZ[slot]);
  lays.push(`<img class="sl${opt.edit&&SSEL==slot?' sel':''}${tf.hidden?' ghost':''}" data-slot="${slot}" src="${src}" style="left:${tf.x}%;top:${tf.y}%;width:${tf.w}%;z-index:${z};transform:translate(-50%,-50%) rotate(${tf.r||0}deg)${(tf.flip?!(back&&!hasBack(id)):(back&&!hasBack(id)))?' scaleX(-1)':''}" alt="" draggable="false">`)}
 const sc=S.head!='wig';const hd=back?(sc?B.backhead2:B.backhead):(sc?B.head2:B.head);
 const base=`<img class="sb" src="${back?B.back:B.img}" alt="">`+`<img class="sh" src="${hd}" style="z-index:${SLOTZ.head}" alt="">`;// v51: head+hair always above the garments (the head sits inside the collar)
 return bgd+base+lays.join('')};
// כפתור בסיס: ארוך ← קצר ← חדש
window.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#sbase');if(!b||!ST)return;e.stopPropagation();e.preventDefault();if(window.openBaseDrawer)openBaseDrawer()},true);// v52: chooser instead of cycling
// כפתורי תנוחה במקום מקדימה/מאחור כשהאווטאר החדש
const _pt5=paintTop;paintTop=function(){_pt5();const top=$('#studio .stop');if(!top)return;let w=$('#sposes');if(!w){w=document.createElement('span');w.id='sposes';top.querySelector('[data-sview="back"]').after(w)}
 const p5=(ST.avbase||'long')=='p5';$$('#studio .stop > [data-sview]').forEach(b=>b.classList.toggle('hide',p5));
 w.innerHTML=p5?POSES.map(([k,n])=>`<button data-sview="${k}" aria-pressed="${(ST.view||'front')==k}">${n}</button>`).join(''):''};
const _sf5=saveFit;saveFit=function(slot){if(ST&&ST.view&&ST.view!='front')return;return _sf5(slot)};
// ---- העלאת גיליון GPT של 5 תנוחות לבגד: חותך לחמישה, מוריד רקע, מיישר לגודל האווטאר
function rowsMedian(d,W,H,x0,x1){const bg=new Float32Array(H*3);const t=[];for(let y=0;y<H;y++){const r=[],g=[],b=[];for(const xx of [[x0,x0+10],[x1-10,x1]])for(let x=xx[0];x<xx[1];x++){const k=(y*W+x)*4;r.push(d[k]);g.push(d[k+1]);b.push(d[k+2])}
 const md=a=>a.sort((p,q)=>p-q)[a.length>>1];bg[y*3]=md(r);bg[y*3+1]=md(g);bg[y*3+2]=md(b)}return bg}
function findCols(d,W,H){const sc=new Float32Array(W);for(let x=0;x<W;x++){let s=0,n=0;for(let y=Math.round(H*.05);y<H*.85;y+=3){const k=(y*W+x)*4;s+=d[k]+d[k+1]+d[k+2];n++}sc[x]=s/n/3}
 let mean=0;sc.forEach(v=>mean+=v);mean/=W;const cand=[];for(let x=Math.round(W*.08);x<W*.92;x++)if(sc[x]>mean+22&&sc[x]>235)cand.push(x);
 const grp=[];for(const x of cand){const g=grp[grp.length-1];if(g&&x-g[1]<=3)g[1]=x;else grp.push([x,x])}
 if(grp.length==4)return [[0,grp[0][0]],[grp[0][1]+1,grp[1][0]],[grp[1][1]+1,grp[2][0]],[grp[2][1]+1,grp[3][0]],[grp[3][1]+1,W]];
 const w=W/5;return [0,1,2,3,4].map(i=>[Math.round(i*w),Math.round((i+1)*w)])}
function cutPanel(d,W,H,x0,x1){x0+=2;x1-=2;const pw=x1-x0;const bg=rowsMedian(d,W,H,x0,x1);const N=pw*H;const isbg=new Uint8Array(N);
 const near=(i)=>{const y=(i/pw)|0,x=i%pw;const k=(y*W+x0+x)*4;return Math.abs(d[k]-bg[y*3])+Math.abs(d[k+1]-bg[y*3+1])+Math.abs(d[k+2]-bg[y*3+2])<34};
 const st=[];for(let x=0;x<pw;x++){st.push(x,(H-1)*pw+x)}for(let y=0;y<H;y++){st.push(y*pw,y*pw+pw-1)}
 while(st.length){const i=st.pop();if(isbg[i]||!near(i))continue;isbg[i]=1;const x=i%pw;if(x>0)st.push(i-1);if(x<pw-1)st.push(i+1);if(i>=pw)st.push(i-pw);if(i<N-pw)st.push(i+pw)}
 // הרכיב הגדול ביותר (הדמות) בלבד, בלי הכיתוב למטה
 const lab=new Int32Array(N);let best=0,bestN=0,cur=0;for(let i=0;i<N;i++){if(isbg[i]||lab[i])continue;cur++;let n=0;const q=[i];lab[i]=cur;while(q.length){const j=q.pop();n++;const x=j%pw;for(const k of [x>0?j-1:-1,x<pw-1?j+1:-1,j-pw,j+pw])if(k>=0&&k<N&&!isbg[k]&&!lab[k]){lab[k]=cur;q.push(k)}}if(n>bestN){bestN=n;best=cur}}
 let bx0=pw,by0=H,bx1=0,by1=0;for(let i=0;i<N;i++)if(lab[i]==best){const x=i%pw,y=(i/pw)|0;if(x<bx0)bx0=x;if(x>bx1)bx1=x;if(y<by0)by0=y;if(y>by1)by1=y}
 const fw=bx1-bx0+1,fh=by1-by0+1;const c=document.createElement('canvas');c.width=fw;c.height=fh;const cx=c.getContext('2d');const id=cx.createImageData(fw,fh);
 for(let y=0;y<fh;y++)for(let x=0;x<fw;x++){const i=(y+by0)*pw+x+bx0;const k=((y+by0)*W+x0+x+bx0)*4,o=(y*fw+x)*4;id.data[o]=d[k];id.data[o+1]=d[k+1];id.data[o+2]=d[k+2];id.data[o+3]=lab[i]==best?255:0}
 cx.putImageData(id,0,0);const CW=399,CH=1365,FEET=1330;const s=Math.min((FEET-30)/fh,CW*.98/fw);const o=document.createElement('canvas');o.width=CW;o.height=CH;const ox=o.getContext('2d');ox.imageSmoothingQuality='high';
 const dw=fw*s,dh=fh*s;ox.drawImage(c,(CW-dw)/2,FEET-dh,dw,dh);return o}
async function sliceSheet(file){const bm=await loadBitmap(file);let W=bm.width,H=bm.height;const k=Math.min(1,2600/W);W=Math.round(W*k);H=Math.round(H*k);
 const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d',{willReadFrequently:true});x.drawImage(bm,0,0,W,H);const d=x.getImageData(0,0,W,H).data;
 const cols=findCols(d,W,H);const out=[];for(const [a,b] of cols){const c=cutPanel(d,W,H,a,b);out.push(await new Promise(ok=>c.toBlob(ok,'image/webp',.9)))}return out}
async function upP5(id,file){if(UPST[id]=='busy'){toast('רגע, עוד שומרת');return}let a=null;try{a=await claude.use('assets')}catch(_){}if(!a){toast('העלאת תמונות לא זמינה כאן');return}
 UPST[id]='busy';setSt(id,'busy','חותכת ל-5 תנוחות…');let bl;try{bl=await sliceSheet(file)}catch(_){UPST[id]='';setSt(id,'err','לא הצלחתי לקרוא את התמונה');return}
 const p5={};try{for(let i=0;i<5;i++){setSt(id,'busy',`שומרת תנוחה ${i+1} מתוך 5…`);const r=await a.upload(bl[i]);p5[POSES[i][0]]=r.id}
  const prev=(IT[id]||{}).p5;const h=hist(id);await putItem(id,{p5,p5old:prev||null});UPST[id]='';setSt(id,'ok','✓ נשמרו 5 תנוחות. רואים אותן בבניית הלוק עם האווטאר החדש');toast('✓ נשמרו 5 תנוחות');renderImgRow(id)}
 catch(_){UPST[id]='';setSt(id,'err','לא הצלחתי לשמור. נסי שוב');toast('לא הצלחתי לשמור')}}
document.body.insertAdjacentHTML('beforeend','<input type="file" id="p5file" accept="image/*" hidden>');
document.addEventListener('change',e=>{if(e.target.id!='p5file'||!e.target.files.length)return;const f=e.target.files[0];const id=e.target.dataset.id;e.target.value='';upP5(id,f)});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-p5up],[data-p5copy]');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.dataset.p5up){const f=$('#p5file');f.dataset.id=t.dataset.p5up;f.click();return}
 const txt=P5PROMPT;(navigator.clipboard?.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast('✓ הפרומפט הועתק. הדביקי ב-GPT')).catch(()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast('✓ הפרומפט הועתק')}catch(_){toast('לא הצלחתי להעתיק')}ta.remove()})},true);
const P5PROMPT=`מצורפות שתי תמונות: (1) גיליון האווטאר שלי ב-5 תנוחות (חזית, צד, גב, חצי צד, יד על המותן). (2) בגד שקניתי.
צור תמונה אחת רחבה באותו סידור בדיוק כמו גיליון האווטאר: 5 חלקים זה לצד זה, מופרדים בקו לבן דק, על רקע אפור בהיר חלק ואחיד, באותו סדר: חזית, צד, גב, חצי צד, יד על המותן.
בכל חלק: אני (אותה אישה, אותו פנים, אותו שיער, אותו גוף ואותה תנוחה בדיוק כמו בגיליון) לובשת את הבגד מתמונה 2 במקום השמלה הבהירה.
כללים: לא לשנות את הבגד (צבע, דוגמה, בד, גזרה, אורך, שרוולים, צווארון, חגורה, קישוטים). בגב ובצד להראות איך הבגד נראה באמת מאחור ומהצד. גוף שלם מהראש עד כפות הרגליים בכל חלק, באותו גודל ובאותו גובה כמו בגיליון. בלי חפצים נוספים ובלי צללים חזקים. בתחתית כל חלק כותרת קטנה: חזית / צד / גב / חצי צד / יד על המותן.`;
const _rr5=renderImgRow;renderImgRow=function(id){_rr5(id);const el=document.querySelector(`[data-imgrow="${id}"] .p5slot`);if(!el)return;el.closest('details').remove();return;/* v69: old full-avatar GPT upload removed */const p=(IT[id]||{}).p5;
 el.innerHTML=`<div class="ib" style="margin-top:6px"><button data-zoom="av/p5_sheet.jpg">🖼 גיליון האווטאר</button><button data-p5copy="1">📋 העתיקי פרומפט</button><button class="go" data-upimg="${id}" data-upm="p5">📥 העלי מ-GPT</button></div>
 ${p?`<div class="p5r" style="margin-top:6px">${POSES.map(([k,n])=>p[k]?`<figure><img src="/_blob/${p[k]}" alt="" loading="lazy"><figcaption>${n}</figcaption></figure>`:'').join('')}</div>`:''}<small>1. שמרי את גיליון האווטאר (לחיצה ארוכה על התמונה). 2. שלחי ל-GPT את הגיליון ואת תמונת הבגד, והדביקי את הפרומפט. 3. העלי לכאן את מה שהוא מחזיר. האתר חותך לבד ל-5 תנוחות.</small>`};
// ---- p5b (2026-10-20): האווטאר החדש הוא ברירת המחדל, מסך "כל התנוחות" ושמירת תמונה של 5 התנוחות יחד
BASES.p5.name='חדש · 5 תנוחות';
{const _nst=newST;newST=function(){const s=_nst();if(!SET.avbase)s.avbase='p5';return s}}
{const _os=openStudio;openStudio=async function(look,items){if(!SET.avb2){SET.avb2=1;SET.avbase='p5';try{saveSet()}catch(_){}}return _os(look,items)}}
document.head.insertAdjacentHTML('beforeend',`<style>
#sposes button[aria-pressed="true"]{background:var(--accent);color:var(--accent-fg);border-color:var(--accent)}
dialog#p5all{width:min(100vw,1240px);max-width:100vw;padding:0}
#p5all .p5row{display:flex;gap:10px;overflow-x:auto;padding:12px 14px 6px;scroll-snap-type:x proximity}
#p5all .p5f{margin:0;flex:none;text-align:center;cursor:pointer;scroll-snap-align:center}
#p5all .p5f .mst{position:relative;aspect-ratio:399/1365;height:min(60dvh,560px);width:auto;margin:0;pointer-events:none;border-radius:12px;overflow:hidden;box-shadow:0 4px 14px #0002;background:#fff;border:2px solid transparent}
#p5all .p5f.on .mst{border-color:var(--accent)}
#p5all .p5f figcaption{font-weight:700;font-size:.9rem;margin-top:6px}
#p5all .p5bt{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 14px 14px}#p5all .p5bt small{color:var(--muted)}
#p5all .p5bt button{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:10px;padding:9px 14px;cursor:pointer}#p5all .p5bt button.go{background:var(--accent);color:var(--accent-fg);border-color:var(--accent)}
@media (max-width:700px){dialog#p5all{width:100vw;height:100dvh;max-height:100dvh;margin:0;border-radius:0}#p5all .p5f .mst{height:min(56dvh,520px)}}
</style>`);
document.body.insertAdjacentHTML('beforeend',`<dialog id="p5all" dir="rtl"><div class="hh"><button class="x" aria-label="סגירה" onclick="this.closest('dialog').close()" style="float:left">✕</button><h2>🧍 הלוק בכל התנוחות</h2></div><div class="p5row"></div><div class="p5bt"><button class="go" id="p5exp">📤 שמירת תמונה של כל התנוחות</button><small>לחיצה על תנוחה פותחת אותה בבניית הלוק. חזית וגב מתלבשים לבד; צד, חצי צד ויד על המותן מגיעים מהתמונה של GPT לכל בגד.</small></div></dialog>`);
async function p5ShowAll(){if(!ST)return;const row=$('#p5all .p5row');row.innerHTML='';for(const [k,n] of POSES){const S=Object.assign({},ST,{view:k});row.insertAdjacentHTML('beforeend',`<figure class="p5f${(ST.view||'front')==k?' on':''}" data-pose="${k}"><div class="mst">${await stageInner(S,{})}</div><figcaption>${n}</figcaption></figure>`)}
 $('#p5all').showModal();const on=row.querySelector('.p5f.on');if(on)on.scrollIntoView({inline:'center',block:'nearest'})}
{const _pt6=paintTop;paintTop=function(){_pt6();const w=$('#sposes');if(!w||!w.innerHTML)return;if(!w.querySelector('#sall'))w.insertAdjacentHTML('beforeend','<button id="sall">🖼 כל התנוחות</button>')}}
document.addEventListener('click',async e=>{const t=e.target;if(!t.closest)return;
 if(t.closest('#sall')){e.preventDefault();e.stopPropagation();p5ShowAll();return}
 const f=t.closest('#p5all .p5f');if(f){ST.view=f.dataset.pose;SSEL=null;paintTop();$('#p5all').close();await drawStudio();return}
 if(t.closest('#p5exp')){e.preventDefault();p5ExportAll()}},true);
async function p5DrawBox(x,box,ox,oy,pw,ph){const els=[...box.querySelectorAll('img.sb,img.sh,img.sl:not(.ghost)')].sort((a,b)=>(+a.style.zIndex||0)-(+b.style.zIndex||0));
 for(const el of els){const im=await ldImg(el.src);if(!im)continue;
  if(el.classList.contains('sb')){const s=Math.min(pw/im.width,ph/im.height);x.drawImage(im,ox+(pw-im.width*s)/2,oy+(ph-im.height*s)/2,im.width*s,im.height*s);continue}
  if(el.classList.contains('sh')){x.drawImage(im,ox,oy,pw,pw*im.height/im.width);continue}
  const L=parseFloat(el.style.left)||0,T=parseFloat(el.style.top)||0,Wp=parseFloat(el.style.width)||0;const w=Wp/100*pw,h=w*im.height/im.width;const r=parseFloat((el.style.transform.match(/rotate\(([-\d.]+)deg\)/)||[])[1]||0);const fl=/scaleX\(-1\)/.test(el.style.transform);
  x.save();x.translate(ox+L/100*pw,oy+T/100*ph);x.rotate(r*Math.PI/180);if(fl)x.scale(-1,1);x.drawImage(im,-w/2,-h/2,w,h);x.restore()}}
async function p5ExportAll(){const boxes=$$('#p5all .p5f');if(!boxes.length)return;const PW=400,PH=Math.round(PW*1365/399),G=24,W=boxes.length*PW+(boxes.length+1)*G,H=PH+G*2+70+120;
 const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');const [c1,c2]=(BGS[ST.bg]||BGS.studio)[2];const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(0,0,W,H);
 toast('מכינה תמונה…');x.textAlign='center';x.direction='rtl';x.fillStyle='#2d211b';
 for(let i=0;i<boxes.length;i++){const ox=W-G-(i+1)*PW-i*G;await p5DrawBox(x,boxes[i].querySelector('.mst'),ox,G,PW,PH);x.font='bold 30px Heebo, sans-serif';x.fillText(boxes[i].querySelector('figcaption').textContent,ox+PW/2,G+PH+46)}
 x.fillStyle='rgba(255,255,255,.85)';x.fillRect(0,H-120,W,120);x.fillStyle='#2d211b';x.font='bold 44px Heebo, sans-serif';x.fillText(ST.name||'הלוק שלי',W/2,H-66);x.font='28px Heebo, sans-serif';x.fillText((OCC[ST.occ]||'')+' · '+new Date(ST.date).toLocaleDateString('he-IL'),W/2,H-24);
 const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',.9));try{const dl=await claude.use('downloads');if(!dl){toast('שמירה לא זמינה כאן');return}await dl.save({filename:(ST.name||'לוק')+' - 5 תנוחות.jpg',data:blob});toast('התמונה נשמרה')}catch(e){toast(e.code=='declined'?'בוטל':'לא הצלחתי לשמור')}}
