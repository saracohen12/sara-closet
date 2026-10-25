const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['Pixel 7'],hasTouch:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__mode='fail1';let n=0;const A={upload:async bl=>{n++;if(window.__mode=='fail'||(window.__mode=='fail1'&&n<=2))throw Object.assign(new Error('x'),{code:'store_unavailable'});return {id:'f'.repeat(31)+n,url:URL.createObjectURL(bl)}}};window.claude={use:async k=>k=='assets'?A:null}});
await p.goto('http://localhost:8765/book.html');await p.waitForTimeout(2500);
const f=require('fs').readFileSync('/mnt/project-files/closet/p5g/T47_wrong_upload_15-01.jpg').toString('base64');
const t0=Date.now();const r=await p.evaluate(async f=>{const bl=await (await fetch('data:image/jpeg;base64,'+f)).blob();const file=new File([bl],'a.jpg',{type:'image/jpeg'});
 openItem('S0VSY_0');await new Promise(r=>setTimeout(r,800));await addPics('S0VSY_0',[file]);const a=JSON.stringify(IT.S0VSY_0);
 window.__mode='fail';await addPics('S0VSY_0',[file]);const st=document.querySelector('[data-imgrow="S0VSY_0"] .st2')?.textContent;return [a,st,document.querySelector('#toast')?.textContent]},f);
console.log(r,errs,Date.now()-t0);await b.close()})();
