// ===== v272 (Sara 27/10 23:14 "יש גם מגבלה של שטח … תמונות ששוקלות פחות, איכותיות"): the store holds 1 GB and GPT's 8-angle pictures come as PNG of ~1.8 MB.
// Saved as WebP (quality .95, same size in pixels) they weigh ~0.2 MB – the cut and the avatar look the same (checked on 3 sheets). Only the copy that is
// STORED gets smaller; the first cut is made from her original file. Small files, and anything that doesn't come out at least 40% smaller, are kept as they are.
window.slim272=async function(f){try{if(!(f instanceof Blob)||f.size<350e3||!/^image\/(png|jpeg|webp|bmp)$/.test(f.type||''))return f;
 const bm=await createImageBitmap(f),k=Math.min(1,2400/Math.max(bm.width,bm.height)),c=document.createElement('canvas');c.width=Math.round(bm.width*k);c.height=Math.round(bm.height*k);
 c.getContext('2d').drawImage(bm,0,0,c.width,c.height);try{bm.close()}catch(_){}
 const b=await new Promise(r=>c.toBlob(r,'image/webp',.95));if(!b||b.type!='image/webp'||b.size>f.size*.6)return f;
 const n=String(f.name||'pic').replace(/\.[a-z0-9]+$/i,'')+'.webp';try{return new File([b],n,{type:'image/webp',lastModified:f.lastModified||Date.now()})}catch(_){return b}}catch(_){return f}};
