// ===== v157: photo uploads from the phone (Sara 24/10: "אני לא מצליחה, זה תקוע")
// 1) every step of an upload is written to db "uplog" (k:'step'), so a stuck upload leaves a trail: gallery opened, file received, crop, upload start / ok / fail
// 2) steps that had no time limit (HEIC check, auto-crop) now give up after a few seconds and continue with the original photo
// 3) coming back from the gallery without a photo says so (and how to fix it) instead of staying on "פותחת את הגלריה…"
(function(){
const UA=navigator.userAgent||'';const ENV=(/\bwv\b|; wv\)/.test(UA)?'webview':/Chrome\//.test(UA)?'chrome':'other')+(/Android/.test(UA)?'/android':/iPhone|iPad/.test(UA)?'/ios':'');
let N157=0;
window.step157=function(s,x){try{if(N157++>=300||typeof uplog!='function')return;uplog(Object.assign({k:'step',s,env:ENV,uat:UA.slice(-60),ver:typeof VER!='undefined'?VER:''},x||{}))}catch(_){}};
const fi=f=>f?{size:f.size||0,type:(f.type||'').slice(0,30),name:String(f.name||'').slice(-24)}:{};
const TO=(p,ms,v)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(v),ms))]);

// time limits
if(typeof heicBad=='function'){const _h=heicBad;heicBad=function(f){return TO(_h.apply(this,arguments).catch(()=>false),8000,false)}}
if(typeof autoCrop=='function'){const _a=autoCrop;autoCrop=function(f){const p=_a.apply(this,arguments);return TO(p,20000,null).then(r=>{if(r)return r;step157('crop_timeout',fi(f));return {blob:f,cropped:false}})}}

// upload trail
if(typeof upl=='function'){const _u=upl;upl=async function(a,blob,onTry,lid){const t0=Date.now();step157('up_start',fi(blob));
 try{const r=await _u.apply(this,arguments);step157('up_ok',{ms:Date.now()-t0,size:blob&&blob.size||0});return r}
 catch(e){step157('up_fail',{ms:Date.now()-t0,code:String(e&&(e.code||e.message)||e).slice(0,80)});throw e}}}
for(const n of ['upItemImg','addPics']){const f=window[n];if(typeof f!='function')continue;
 const w=async function(id,files){const fs=Array.isArray(files)?files:[files];step157(n,Object.assign({id,n:fs.length},fi(fs[0])));
  try{return await f.apply(this,arguments)}catch(e){step157(n+'_err',{id,code:String(e&&(e.code||e.message)||e).slice(0,80)});throw e}};
 window[n]=w;try{if(n=='upItemImg')upItemImg=w;else addPics=w}catch(_){}}
{const _t=toast;toast=function(m){try{if(/לא זמינה כאן|לא נשמרה|לא הצלחתי/.test(String(m)))step157('toast',{m:String(m).slice(0,90)})}catch(_){}return _t.apply(this,arguments)}}

// gallery: opened / file received / came back empty
let PICK=null;
document.addEventListener('click',e=>{const i=e.target;if(!i||i.tagName!='INPUT'||i.type!='file')return;
 const b=i.closest('button[data-upimg],label');const P=PICK={t:Date.now(),inp:i,id:b&&(b.dataset.upimg||'')||'',btn:b?(b.textContent||'').trim().slice(0,24):'',hid:false};step157('pick_open',{id:P.id,btn:P.btn});
 // the gallery never opened (the page was never hidden): inside the Claude app the phone blocks the file picker
 if(/Android|iPhone|iPad/.test(UA))setTimeout(()=>{if(PICK!==P||P.hid||document.hidden||(i.files&&i.files.length))return;PICK=null;step157('pick_blocked',{id:P.id});
  const msg='הגלריה לא נפתחה. כנראה האתר פתוח בתוך האפליקציה של Claude, ושם הטלפון חוסם בחירת תמונות. פתחי את האתר ב-Chrome ונסי שוב';
  try{if(P.id&&typeof setSt=='function')setSt(P.id,'err',msg)}catch(_){}try{toast(msg)}catch(_){}},5000)},true);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState=='hidden'&&PICK)PICK.hid=true},true);
window.addEventListener('blur',()=>{if(PICK)PICK.hid=true});
document.addEventListener('change',e=>{const i=e.target;if(!i||i.tagName!='INPUT'||i.type!='file')return;const f=i.files&&i.files[0];
 step157(f?'pick_file':'pick_empty',Object.assign({id:PICK&&PICK.id||'',n:i.files?i.files.length:0,ms:PICK?Date.now()-PICK.t:0},fi(f)));if(f)PICK=null},true);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState!='visible'||!PICK)return;const p=PICK;
 setTimeout(()=>{if(PICK!==p)return;const has=p.inp&&p.inp.files&&p.inp.files.length;if(has){PICK=null;return}
  if(Date.now()-p.t<1500)return;PICK=null;step157('pick_back_empty',{id:p.id,ms:Date.now()-p.t});
  const msg=ENV.startsWith('webview')?'לא קיבלתי תמונה. בתוך האפליקציה של Claude הגלריה לא עובדת – פתחי את האתר ב-Chrome ונסי שוב':'לא קיבלתי תמונה מהגלריה. נסי שוב, ואם זה חוזר – בחרי מהגלריה (לא מ"קבצים")';
  try{if(p.id&&typeof setSt=='function')setSt(p.id,'err',msg)}catch(_){}try{toast(msg)}catch(_){}},2500)});
})();
