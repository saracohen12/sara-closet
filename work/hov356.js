// v356 (Sara 26/10 12:21, again 5/11: "כשהעכבר מגיע – לבד זה יסתובב, וכשהעכבר ילך – זה יפסיק ותמיד יישאר על החזית… גם הכיסויים, הראש, הבגדים שעשינו על האבטר")
// With a mouse:
//  • studio clothes that are already on the avatar (360°): the card shows her wearing it and turning while the mouse is on it; leaving brings back the card's own picture
//  • cover / tie / hairstyle close-ups: they no longer all turn by themselves – only the one under the mouse turns, the others stay on the front
// On a touch screen nothing changes (no hover there).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v356h '+w+': '+(e&&e.message||e));
const mouse=()=>matchMedia('(hover:hover) and (pointer:fine)').matches;
const FR={};
function frames(id){if(FR[id])return FR[id];return FR[id]=(async()=>{const out=[];for(let v=0;v<8;v++){const c=await R360.still(id,v);if(!c||!c.width)return null;out.push(c.toDataURL('image/webp',.82))}return out})().catch(()=>null)}
let cur=null;
document.addEventListener('pointerover',async e=>{if(e.pointerType=='touch'||!window.R360||!R360.still)return;const ph=e.target.closest&&e.target.closest('#r360 .r3c.ok .r3ph');if(!ph||ph===cur)return;
 const card=ph.closest('.r3c'),id=card&&card.dataset.it,im=ph.querySelector('img');if(!id||!im)return;cur=ph;if(!im.dataset.o356)im.dataset.o356=im.getAttribute('src')||'';
 try{const F=await frames(id);if(!F||cur!==ph)return;let i=0;im.src=F[0];ph._t=setInterval(()=>{i=(i+1)%8;im.src=F[i]},180);ph.classList.add('h356on')}catch(err){ERR('on',err)}},true);
document.addEventListener('pointerout',e=>{if(e.pointerType=='touch')return;const ph=e.target.closest&&e.target.closest('#r360 .r3c.ok .r3ph');if(!ph||(e.relatedTarget&&ph.contains(e.relatedTarget)))return;
 if(ph._t){clearInterval(ph._t);ph._t=null}const im=ph.querySelector('img');if(im&&im.dataset.o356!=null){im.src=im.dataset.o356}ph.classList.remove('h356on');if(cur===ph)cur=null},true);
// get the turning pictures of the studio cards on screen ready in the background, so the mouse turns them at once
let pre=false;setInterval(async()=>{if(pre||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;const d=document.getElementById('r360');if(!d||!d.open||!window.R360||!R360.still)return;
 const vis=[...d.querySelectorAll('.r3c.ok')].filter(c=>{const r=c.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight}).map(c=>c.dataset.it).filter(id=>id&&!FR[id]).slice(0,4);if(!vis.length)return;
 pre=true;try{for(const id of vis){await frames(id);await new Promise(r=>setTimeout(r,120))}}catch(_){}pre=false},1500);
})();
