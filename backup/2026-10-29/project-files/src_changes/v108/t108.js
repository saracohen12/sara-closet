const {chromium,devices}=require('playwright');const fs=require('fs');const S=process.argv[2];const M=process.argv[3]||'desk';
const DBI={};for(const f of fs.readdirSync(S+'/db91/items')){const d=JSON.parse(fs.readFileSync(S+'/db91/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const img=fs.readFileSync(S+'/build/pub/av/p6c_front.webp');
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1280,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/_blob/**',r=>r.fulfill({status:200,contentType:'image/webp',body:img}));
await p.addInitScript(M=>{try{localStorage.setItem('tips77','1')}catch(_){};window.CLIP=[];window.SAVED=[];window.SHARED=[];Object.defineProperty(navigator,'clipboard',{value:{writeText:async t=>{window.CLIP.push(t)}}});window.open=()=>({});
 if(M=='phone'){navigator.canShare=()=>true;navigator.share=async o=>{window.SHARED.push(o.files.map(f=>[f.name,f.size]))}}
 const DL={save:async o=>{window.SAVED.push([o.filename,o.data.size])}};window.claude={use:async k=>k=='downloads'?DL:null}},M);
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);await p.evaluate(d=>{Object.assign(IT,d)},DBI);
const id=await p.evaluate(()=>Object.keys(D).find(i=>curCat(i)=='skirts'&&all102(i).filter(p=>!/^על האווטאר/.test(p.n)).length>=3));
await p.evaluate(id=>openItem(id),id);await p.waitForTimeout(2500);
console.log('btn',await p.evaluate(()=>{const b=document.querySelector('[data-go104]');return b&&[!!b.offsetParent,b.textContent]}));
await p.evaluate(()=>{const b=document.querySelector('[data-go104]');b.scrollIntoView();});await p.click('[data-go104]');await p.waitForTimeout(2500);
console.log('clip',await p.evaluate(()=>window.CLIP.length&&window.CLIP.slice(-1)[0].slice(0,60)));
console.log('ph',await p.evaluate(()=>[...document.querySelectorAll('#g106 .g106t')].map(b=>b.className+':'+b.textContent.trim().slice(0,20))));
await p.click('#g106 [data-g106=t1]');await p.click('#g106 [data-g106=t2]');await p.waitForTimeout(800);
console.log('clip2',await p.evaluate(()=>window.CLIP.slice(-1)[0].split('\n').slice(0,5).join(' / ')));
await p.evaluate(()=>document.querySelector('#g106 details').open=true);await p.screenshot({path:S+'/tests/v92/t108_'+M+'_win.png'});
await p.click(M=='desk'?'#g106 [data-g106=all]':'#g106 [data-g106=share]');await p.waitForTimeout(2500);await p.screenshot({path:S+'/tests/v92/t108_'+M+'_win2.png'});
console.log('saved',await p.evaluate(()=>window.SAVED),'shared',await p.evaluate(()=>window.SHARED));
await p.screenshot({path:S+'/tests/v92/t108_'+M+'.png'});
console.log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[]).slice(0,400)));await b.close()})();
