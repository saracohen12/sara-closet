const {chromium}=require('playwright');const S=process.argv[2];const fs=require('fs');const path=require('path');
const DBI={};for(const f of fs.readdirSync(S+'/dbq/items')){if(!f.endsWith('.json')||f.includes('_new'))continue;const d=JSON.parse(fs.readFileSync(S+'/dbq/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1220,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push('C:'+m.text().slice(0,200))});
 await p.addInitScript(()=>{window.claude={use:async k=>null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(d=>{Object.assign(IT,d);try{paintAll()}catch(e){console.error('paintAll',e.message)}},DBI);await p.waitForTimeout(500);
 for(const slot of ['top','skirt','dress','jewelry']){for(const sort of ['av','match']){const r=await p.evaluate(async([slot,sort,base])=>{try{await openStudio(null,{});ST.avbase=base;ST.items.jewelry='T208';ST.tf.jewelry={x:50,y:20,w:24};await drawStudio();DRF.sort=sort;DRF.ready=false;openDrawer(slot);await new Promise(r=>setTimeout(r,1200));const g=document.querySelector('#dgrid');return {slot,sort,tiles:g?g.querySelectorAll('[data-dpick]').length:-1}}catch(e){return {slot,sort,err:e.message}}},[slot,sort,'short']);console.log(JSON.stringify(r))}}
 console.log('ERR',JSON.stringify(errs),await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
