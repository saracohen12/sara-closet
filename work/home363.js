// v363 (Sara 7/11 19:45: "במסך הראשי עדיין לוקח הרבה זמן לתמונה לעלות"): the home doll is drawn from many layers (body, every garment, the head, makeup) –
// each opening waited for all of them. The finished front picture is kept on this phone and shown at once while the live doll is drawn,
// only when the look is exactly the same one (another look would jump from one outfit to another).
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v363 '+w+': '+(e&&e.message||e));
const KEY='h363';
let C={};try{C=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(_){C={}}
const sig=()=>{try{return window.R360&&R360.today&&R360.today.state?JSON.stringify(R360.today.state()):''}catch(_){return ''}};
let shown=false,saved='';
function show(){try{if(shown)return true;const st=document.querySelector('#h180 .r3s');if(!st)return false;if(st.classList.contains('ready')||!C.u){window.H363D=(st.classList.contains('ready')?'ready':'noC')+' at '+Math.round(performance.now());shown=true;return true}const k=sig();if(!k||C.k!==k)return false;shown=true;   // the look may still be settling (stylist, her settings) – keep looking until it matches or the live doll is ready
 const im=document.createElement('img');im.className='h363';im.alt='';im.src=C.u;st.appendChild(im);
 const off=()=>{if(!im.isConnected)return;im.classList.add('h363off');setTimeout(()=>im.remove(),450)};
 const t=setInterval(()=>{if(st.classList.contains('ready')){clearInterval(t);setTimeout(off,120)}},150);setTimeout(()=>{clearInterval(t);off()},45000);return true}catch(e){ERR('show',e);return true}}
function save(){try{const st=document.querySelector('#h180 .r3s.ready');if(!st)return;const c=st.querySelector('canvas.on');if(c!==st.querySelector('canvas'))return;if(!c||!c.width||!c._done)return;
 const k=sig();if(!k||k===saved)return;const d=c.getContext('2d').getImageData(c.width>>1,c.height>>1,1,1).data;if(!d[3])return;
 saved=k;const u=c.toDataURL('image/webp',.82);if(u.length>900000)return;C={k,u};try{localStorage.setItem(KEY,JSON.stringify(C))}catch(_){}}catch(e){ERR('save',e)}}
const t0=setInterval(()=>{if(show())clearInterval(t0)},60);setTimeout(()=>clearInterval(t0),20000);
setInterval(()=>{if(document.body.dataset.z50=='home')save()},4000);
})();
