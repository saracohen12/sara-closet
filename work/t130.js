const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['Pixel 7'],hasTouch:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__mode='hang';let n=0;const A={upload:async bl=>{n++;if(window.__mode=='hang'&&n==1)return new Promise(()=>{});return {id:'d'.repeat(30)+String(n).padStart(2,'0'),url:URL.createObjectURL(bl)}}};window.claude={use:async k=>k=='assets'?A:null}});
await p.goto('http://localhost:8765/book.html');await p.waitForTimeout(2500);
const f=require('fs').readFileSync('/mnt/project-files/closet/p5g/T47_wrong_upload_15-01.jpg').toString('base64');
const t0=Date.now();
const r=await p.evaluate(async f=>{const bl=await (await fetch('data:image/jpeg;base64,'+f)).blob();const file=new File([bl],'a.jpg',{type:'image/jpeg'});
 openItem('S0VSY_0');await new Promise(r=>setTimeout(r,800));const id='S0VSY_0';const had=!!(IT[id]||{}).img;await addPics(id,[file]);return [had,JSON.stringify(IT[id]),document.querySelector('[data-imgrow="S0VSY_0"] .st2')?.textContent]},f);
console.log(r,errs,Date.now()-t0);await b.close()})();
