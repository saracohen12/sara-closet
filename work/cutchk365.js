// v365 (Sara 7/11 22:33 "תעשה לי כפתור… שתסרוק שוב את מה שהעליתי ותבדוק… או שתגיד לי, שרה, צריך לשלוח פרומט חדש ל-GPT"):
// "🔍 לבדוק את הגזירה" in the item's avatar panel looks at all 8 angles of what was cut from her GPT picture and says, in plain words:
//  ✓ the cut is good · or what is wrong (an empty / very different angle, cloth on the face, a belt far from the waist, many loose bits)
//  and what to do: "✂ לגזור שוב מהקובץ" (the same picture, cut again – often enough) or "📋 פרומט חדש ל-GPT" (when the picture itself is wrong).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v365c '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const FCV=[[176,64,25,28],[163,63,25,27],[158,65,21,28],null,null,[205,58,10,18],[197,60,17,28],[181,58,24,28]];
const NM=['חזית','חצי ימין','צד ימין','גב ימין','גב','גב שמאל','צד שמאל','חצי שמאל'];
const load=u=>new Promise((ok,no)=>{const m=new Image();m.onload=()=>ok(m);m.onerror=no;m.src=u});
async function check(id){const it=(typeof IT=='object'&&IT[id])||{},P=Array.isArray(it.a8)?it.a8.filter(p=>p&&Array.isArray(p.L)):[];if(!P.length)return null;const out=[];
 for(const p of P){const sp=String(p.L[0]).split('~')[0];const m=await load('/_blob/'+sp);const fw=Math.round(m.naturalWidth/4),fh=Math.round(m.naturalHeight/2),sc=fw/360;
  const c=document.createElement('canvas');c.width=fw;c.height=fh;const g=c.getContext('2d',{willReadFrequently:true});const A=[],issues=[];
  for(let v=0;v<8;v++){g.clearRect(0,0,fw,fh);g.drawImage(m,(v%4)*fw,(v>>2)*fh,fw,fh,0,0,fw,fh);const d=g.getImageData(0,0,fw,fh).data;let area=0,face=0,top=fh;
   const e=FCV[v];for(let y=0;y<fh;y++)for(let x=0;x<fw;x++){if(d[(y*fw+x)*4+3]<60)continue;area++;if(y<top)top=y;if(e&&p.s!='head'){const u=(x/sc-e[0])/e[2],w=(y/sc-e[1])/e[3];if(u*u+w*w<=1)face++}}
   A.push(area);if(face>150)issues.push(['face',v,face]);if(p.s=='belt'&&area&&top/sc<150)issues.push(['belt',v])}
  const s=[...A].sort((a,b)=>a-b),med=s[4]||1;A.forEach((a,v)=>{if(a<med*(p.s=='belt'||p.s=='shoes'?.12:.4))issues.push(['small',v]);else if(a>med*2.3)issues.push(['big',v])});if(!med||med<200)issues.push(['empty',-1]);
  out.push({p,issues})}
 return out}
function words(r){const L=[];for(const {issues} of r)for(const [k,v] of issues){
  if(k=='face')L.push(`ב${NM[v]} – חתיכה מהבגד עולה על הפנים`);else if(k=='belt')L.push(`ב${NM[v]} – החגורה גבוהה מדי (לא על המותן)`);
  else if(k=='small')L.push(`ב${NM[v]} – כמעט לא נגזר כלום (הזווית ריקה)`);else if(k=='big')L.push(`ב${NM[v]} – נגזר הרבה יותר מבשאר הזוויות (כנראה גם רקע או גוף)`);else if(k=='empty')L.push('הגזירה כמעט ריקה')}
 return [...new Set(L)]}
document.addEventListener('click',async e=>{const b=e.target.closest&&e.target.closest('[data-cc365]');if(!b)return;e.preventDefault();e.stopPropagation();const id=b.dataset.cc365;
 let box=b.parentElement.querySelector(':scope>.cc365r');if(!box){box=document.createElement('div');box.className='cc365r';box.setAttribute('role','status');b.after(box)}
 box.innerHTML='<p>בודקת את 8 הזוויות…</p>';b.disabled=true;
 try{const r=await check(id);if(!r){box.innerHTML='<p>הבגד הזה עוד לא על האווטאר.</p>';return}
  const L=words(r);
  if(!L.length)box.innerHTML=`<p class="cc365ok"><b>✓ הגזירה טובה בכל 8 הזוויות</b> – הבגד יושב במקום בכל הכיוונים. את הקצוות האתר מחליק לבד.</p><p class="cc365s">אם עדיין משהו נראה לך לא טוב – אפשר לגזור שוב מאותו קובץ, ואם גם זה לא עוזר – לבקש מ-GPT תמונה חדשה:</p>
   <div class="cc365a"><button type="button" data-re233="${es(id)}">✂ לגזור שוב מהקובץ</button><button type="button" data-mk188="${es(id)}">📋 פרומט חדש ל-GPT</button></div>`;
  else{const bad=r.some(x=>x.issues.some(i=>i[0]=='empty'||i[0]=='small'));
   box.innerHTML=`<p class="cc365bad"><b>מצאתי ${L.length==1?'בעיה אחת':L.length+' בעיות'}:</b></p><ul>${L.map(x=>`<li>${es(x)}</li>`).join('')}</ul>
   <p class="cc365s">${bad?'<b>מה לעשות:</b> נראה שהתמונה מ-GPT עצמה לא טובה בזווית הזו – הכי טוב לשלוח ל-GPT פרומט חדש ולהעלות את מה שיחזור. אפשר לנסות קודם לגזור שוב.':'<b>מה לעשות:</b> קודם לנסות "לגזור שוב מהקובץ" (לפעמים זה מספיק). אם אחרי זה עדיין רואים את הבעיה – לשלוח ל-GPT פרומט חדש.'}</p>
   <div class="cc365a"><button type="button" class="go" data-re233="${es(id)}">✂ לגזור שוב מהקובץ</button><button type="button" data-mk188="${es(id)}">📋 פרומט חדש ל-GPT</button></div>`}}
 catch(er){ERR('check',er);box.innerHTML='<p>לא הצלחתי לבדוק עכשיו – נסי שוב עוד רגע.</p>'}finally{b.disabled=false}},true);
window.CUTCHK365={check};
})();
