// v351 home look card (Sara 4/11 "תמשיך לשדרג"):
//  • a short "why" line from the stylist – the colours of the look as dots + names, and 🧕 matching cover / 💇 wig, and which of the day's suggestions this is
//  • "✓ לבשתי היום" – one tap marks the whole look as worn today (the diary, the look album and the stylist's "not worn lately" all learn from it); tap again to undo
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v351h '+w+': '+(e&&e.message||e));
const es=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const COL={'שחור':'#1d1b20','לבן':'#f6f4ef','אפור':'#9a98a0','בז׳':'#d9c4a6','חום':'#7a5236','כחול':'#2f4f8f','ירוק':'#4f7a4a','אדום':'#b3262e','ורוד':'#e3a1b5','סגול':'#7b4f9e','צהוב':'#e3c04a','כתום':'#e08a3c','צבעוני':'conic-gradient(#e3a1b5,#e3c04a,#4f7a4a,#2f4f8f,#e3a1b5)'};
const fam=id=>{const c=document.querySelector('.card[data-id="'+CSS.escape(id)+'"]');return c&&c.dataset.c||''};
const tday=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const wornToday=ids=>ids.length&&ids.every(id=>((typeof IT=='object'&&IT[id]||{}).wl||[]).includes(tday()));
let busy=false;
function paint(){try{const T=window.R360&&R360.today,box=document.querySelector('#h180 .z-lk');if(!T||!box)return;const ids=T.ids();
 let w=box.querySelector('.h351');if(!w){w=document.createElement('div');w.className='h351';const at=box.querySelector('.z-lki');(at||box).after(w);
  w.addEventListener('click',e=>{if(e.target.closest('[data-h351w]'))mark()})}
 const fs=[...new Set(ids.map(fam).filter(Boolean))].slice(0,4),h=T.head(),sm=T.smart&&T.smart(),pin=T.pinned(),done=wornToday(ids);
 const html=`<span class="h351c">${fs.map(f=>`<i style="background:${COL[f]||'#ccc'}" aria-hidden="true"></i>`).join('')}<small>${es(fs.join(' · '))}${fs.length?' · ':''}${h=='w'?'💇 פאה':'🧕 כיסוי תואם'}${sm&&!pin?` · הצעה ${sm.i+1} מתוך ${sm.n}`:''}</small></span>
  <button type="button" data-h351w aria-pressed="${done}">${done?'✓ לבשתי היום':'לבשתי היום?'}</button>`;
 if(w.innerHTML!=html)w.innerHTML=html}catch(e){ERR('paint',e)}}
async function mark(){if(busy||!window.WR234)return;busy=true;try{const T=R360.today,ids=T.ids(),k=tday(),on=!wornToday(ids);
 for(const id of ids)await WR234.setWorn(id,k,on);try{await WR234.dayLook(k)}catch(_){}
 (window.toast||(()=>{}))(on?`✓ סימנתי ${ids.length==1?'בגד אחד':ids.length+' בגדים'} שלבשת היום – נכנס ליומן ולוקים`:'↩ ביטלתי את הסימון של היום')}catch(e){ERR('mark',e)}finally{busy=false;paint()}}
const go=()=>{if(!window.R360||!R360.today){setTimeout(go,800);return}try{R360.today.onchange(()=>setTimeout(paint,50))}catch(_){}paint();setInterval(()=>{if(!document.hidden)paint()},3000)};go();
})();
