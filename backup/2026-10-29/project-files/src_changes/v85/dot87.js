const {chromium,devices}=require('playwright');const S=process.argv[2];const M=process.argv[3]||'desk';
(async()=>{const b=await chromium.launch();const c=await b.newContext(M=='phone'?{...devices['Pixel 7']}:{viewport:{width:1366,height:850}});const p=await c.newPage();
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>{const cs=[...document.querySelectorAll('.grid .card')];const o={cards:cs.length,dots:0,vis:0,byCat:{}};cs.forEach(c=>{const d=c.querySelector('.avd');const cat=curCat(c.dataset.id);o.byCat[cat]=o.byCat[cat]||[0,0];o.byCat[cat][0]++;if(d){o.dots++;o.byCat[cat][1]++;const s=getComputedStyle(d);if(s.display!='none'&&s.visibility!='hidden'&&+s.opacity>0&&d.getBoundingClientRect().width>0)o.vis++}});return JSON.stringify(o)}));
console.log(await p.evaluate(()=>{const c=document.querySelector('.grid .card .avd');if(!c)return 'none';const s=getComputedStyle(c);return c.outerHTML.slice(0,200)+' '+s.display+' '+s.opacity+' '+JSON.stringify(c.getBoundingClientRect())}));
console.log(await p.evaluate(()=>{const g=window.GROUPOF;return ['belts','bags','shoes','scarves','tops'].map(k=>k+':'+(g?g(k):'?')).join(' ')}));
await p.screenshot({path:S+'/tests/v77/dot87_'+M+'.png'});await b.close()})();
