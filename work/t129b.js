const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();const c=await b.newContext({...devices['Pixel 7'],hasTouch:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__mode='fail';let n=0;const A={upload:async bl=>{n++;if(window.__mode=='fail')throw Object.assign(new Error('x'),{code:'store_unavailable'});return {id:'e'.repeat(30)+String(n).padStart(2,'0'),url:URL.createObjectURL(bl)}}};window.claude={use:async k=>k=='assets'?A:null}});
await p.goto('http://localhost:8765/book.html');await p.waitForTimeout(2500);
const f=require('fs').readFileSync('/mnt/project-files/closet/p5g/T47_wrong_upload_15-01.jpg').toString('base64');
const r1=await p.evaluate(async f=>{const bl=await (await fetch('data:image/jpeg;base64,'+f)).blob();const file=new File([bl],'a.jpg',{type:'image/jpeg'});
 openItem('S0VSY_0');await new Promise(r=>setTimeout(r,800));await addPics('S0VSY_0',[file]);
 return [JSON.stringify(IT.S0VSY_0||null),document.querySelector('[data-imgrow="S0VSY_0"] .st2')?.textContent,document.querySelector('#upq129')?.textContent]},f);
console.log('queued',r1);
// reload page: queue must survive
await p.reload();await p.waitForTimeout(3000);
console.log('after reload pill',await p.evaluate(()=>document.querySelector('#upq129')?.textContent));
await p.evaluate(()=>{window.__mode='ok'});await p.evaluate(()=>upqRun());await p.waitForTimeout(2500);
console.log('saved',await p.evaluate(()=>[JSON.stringify(IT.S0VSY_0||null),!!document.querySelector('#upq129'),document.querySelector('#toast')?.textContent]));
console.log(errs);await b.close()})();
