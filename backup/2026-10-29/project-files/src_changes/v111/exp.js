const {chromium}=require('playwright');const fs=require('fs');const S=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
console.log('cat',await p.evaluate(()=>curCat('T156')));
await p.evaluate(()=>window.open99('T156'));await p.waitForTimeout(300);
await p.setInputFiles('#two99f',[S+'/tests/v92/s110_1.png',S+'/tests/v92/s110_2.png']);await p.waitForTimeout(7000);
const r=await p.evaluate(()=>{const c=TW99.cuts,o={};for(const [k,vs] of Object.entries(F99))for(const v of vs){o[v]={png:c[v].canvas.toDataURL('image/png'),fit:fitAny105('T156',v,+k,c[v],c),w:c[v].canvas.width,h:c[v].canvas.height}}return o});
for(const v in r){fs.writeFileSync(S+'/t156/'+v+'.png',Buffer.from(r[v].png.split(',')[1],'base64'));console.log(v,r[v].w,r[v].h,JSON.stringify(r[v].fit))}
fs.writeFileSync(S+'/t156/fit.json',JSON.stringify(Object.fromEntries(Object.entries(r).map(([v,x])=>[v,x.fit]))));
console.log('ERR',errs);await b.close()})();
