// v68 audit: exercise the whole studio (bases × views × slots × tools), collect JS errors, broken layers, overflow
const {chromium,devices}=require('playwright');const S=process.argv[2];const PHONE=process.argv[3]=='phone';const fs=require('fs');
const DBI={};for(const f of fs.readdirSync(S+'/dbq/items')){if(!f.endsWith('.json')||f.includes('_new'))continue;const d=JSON.parse(fs.readFileSync(S+'/dbq/items/'+f,'utf8'));delete d.version;DBI[f.replace('.json','')]=d}
const OUT=S+'/tests/audit/t75'+(PHONE?'_m':'')+'/';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const c=await b.newContext(PHONE?{...devices['Pixel 7'],hasTouch:true}:{viewport:{width:1366,height:800}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGE:'+e.message));p.on('console',m=>{if(m.type()=='error'&&!/404|Failed to load resource|_blob/.test(m.text()))errs.push('C:'+m.text().slice(0,200))});
 await p.addInitScript(()=>{window.__dl=[];window.claude={use:async k=>k=='assets'?{upload:async bl=>({id:'a'+Math.random().toString(36).slice(2,10),url:URL.createObjectURL(bl)})}:k=='downloads'?{save:async o=>{window.__dl.push({n:o.filename,sz:o.data&&o.data.size})}}:null}});
 await p.goto('http://localhost:8765/index.html',{waitUntil:'load'});await p.waitForTimeout(2500);
 await p.evaluate(d=>{Object.assign(IT,d);try{paintAll()}catch(e){console.error('paintAll',e.message)}},DBI);await p.waitForTimeout(400);
 const log=(...a)=>console.log(...a.map(x=>typeof x=='string'?x:JSON.stringify(x)));
 const state=()=>p.evaluate(()=>{const st=document.querySelector('#sstage');const ims=[...st.querySelectorAll('img')];const R=st.getBoundingClientRect();
  const out=[];ims.forEach(i=>{const r=i.getBoundingClientRect();out.push({c:i.className,slot:i.dataset.slot||'',part:i.dataset.part||'',src:(i.getAttribute('src')||'').slice(0,40),ok:i.complete&&i.naturalWidth>0,off:r.width&&(r.right<R.left||r.left>R.right||r.bottom<R.top||r.top>R.bottom)})});
  return {n:out.length,bad:out.filter(x=>!x.ok&&!/_blob|blob:/.test(x.src)).map(x=>x.src+'|'+x.c),off:out.filter(x=>x.off).map(x=>x.slot+x.part),notes:[...st.querySelectorAll('.p5note')].map(e=>e.textContent.slice(0,40)),errs:(window.ERRS||[]).splice(0)}});
 const overflow=()=>p.evaluate(()=>{const W=innerWidth;const bad=[];document.querySelectorAll('#studio *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>W+2&&getComputedStyle(e).position!='fixed'&&!e.closest('.stop,#ssel.thin,#srail,.df,.dfam,.lpics,.jwt,.dgrid,.sbtns,.p5r,.jwv,.tiel'))bad.push(e.tagName+'.'+String(e.className).slice(0,30)+' '+Math.round(r.right-W))});return bad.slice(0,12)});
 // items to use
 const pick=await p.evaluate(()=>{const by=cat=>Object.keys(IT).filter(id=>D[id]&&D[id].cat==cat&&IT[id].p5g&&IT[id].p5g.front);const any=cat=>Object.keys(D).filter(id=>D[id].cat==cat&&(D[id].hi||TH[id]));return {dress:by('dresses')[0]||any('dresses')[0],top:by('tops')[0]||any('tops')[0],skirt:by('skirts')[0]||any('skirts')[0],outer:any('outer')[0],shoes:any('shoes')[0],bag:any('bags')[0],belt:any('belts')[0],scarf:'S11QS_6',jewelry:'T208',hosiery:any('hosiery')[0],hairacc:any('hair')[0],set:any('sets')[0]}});log('pick',pick);
 await p.evaluate(()=>openStudio());await p.waitForTimeout(800);
 // 1) every base × every view with a full look
 for(const base of ['p5','long','short']){
  await p.evaluate(async b=>{ST.avbase=b;ST.items={};ST.tf={};paintTop();await drawStudio()},base);
  for(const [slot,id] of Object.entries(pick)){if(!id)continue;if(slot=='dress'&&(pick.top||pick.skirt))continue;await p.evaluate(([s,i])=>setItem(s,i),[slot,id]);await p.waitForTimeout(250)}
  const views=base=='p5'?['front','side','back','half','hip']:['front','back'];
  for(const v of views){await p.evaluate(async v=>{ST.view=v;SSEL=null;paintTop();await drawStudio()},v);await p.waitForTimeout(700);const s=await state();log(base,v,s);await p.screenshot({path:OUT+`look_${base}_${v}.png`})}
  // tools on the top layer
  await p.evaluate(async()=>{ST.view='front';paintTop();await drawStudio()});await p.waitForTimeout(300);
  for(const slot of ['top','skirt','jewelry','scarf','shoes']){if(!pick[slot])continue;await p.evaluate(s=>{SSEL=s;paintSel()},slot);await p.waitForTimeout(150);
   const btns=await p.evaluate(()=>[...document.querySelectorAll('#ssel button')].map(b=>b.dataset.sa||b.dataset.nk!=null&&'nk'||b.dataset.jwt&&'jwt'||b.dataset.jwps&&'jwps'||b.dataset.tie!=null&&'tie'||b.dataset.cyc&&'cyc'||b.id||b.textContent.slice(0,10)));log(base,slot,'btns',btns);
   for(const a of ['up','down','flip','raw','hide','hide','lock','lock','tuck','tuck','reset']){const ok=await p.evaluate(a=>{const b=document.querySelector(`#ssel [data-sa="${a}"]`);if(!b)return false;b.click();return true},a);if(ok)await p.waitForTimeout(250);const s=await state();if(s.errs.length||s.bad.length)log(base,slot,'after',a,s)}
   for(const [id,val] of [['sw',60],['sr',20],['ssx',140],['ssy',120],['ssk',10]]){await p.evaluate(([id,val])=>{const i=document.querySelector('#'+id);if(!i)return;i.value=val;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))},[id,val])}
   await p.waitForTimeout(400);const s=await state();if(s.errs.length||s.bad.length)log(base,slot,'sliders',s);
   await p.evaluate(()=>{const b=document.querySelector('#ssel [data-sa="reset"]');if(b)b.click()});await p.waitForTimeout(300)}
  // nk toggle + export
  if(base=='p5'){await p.evaluate(()=>{SSEL='top';paintSel();const b=document.querySelector('#ssel [data-nk]');if(b)b.click()});await p.waitForTimeout(500);log(base,'nk',await state())}
  await p.evaluate(()=>exportStudio()).catch(e=>log('EXPORT THROW',e.message));await p.waitForTimeout(1500);log(base,'export',await p.evaluate(()=>window.__dl.splice(0)),await state());
  if(base=='p5'){await p.evaluate(()=>p5ShowAll());await p.waitForTimeout(1500);await p.screenshot({path:OUT+'p5all.png'});await p.evaluate(()=>p5ExportAll()).catch(e=>log('P5EXP THROW',e.message));await p.waitForTimeout(1500);log('p5exp',await p.evaluate(()=>window.__dl.splice(0)));await p.evaluate(()=>document.querySelector('#p5all').close())}
  log(base,'overflow',await overflow())}
 // 2) top bar + more menu buttons
 for(const id of ['sundo','sredo','sauto','shead','shead','sbase','dclose','smore','dclose','sbgbtn','sbgbtn','slist','dclose','sai','sall']){const ok=await p.evaluate(id=>{const b=document.querySelector('#'+id);if(!b)return 'missing';b.click();return 'ok'},id);await p.waitForTimeout(400);const s=await state();log('top',id,ok,s.errs.length?s:'');if(id=='sall'){await p.evaluate(()=>document.querySelector('#p5all')?.close())}}
 await p.evaluate(()=>{const b=document.querySelector('[data-sbg="sky"]');if(b)b.click()});
 // drawer
 for(const slot of ['top','skirt','jewelry','scarf','shoes']){await p.evaluate(s=>openDrawer(s),slot);await p.waitForTimeout(900);
  for(const sort of ['av','match','new','cheap','least']){await p.evaluate(s=>{const d=document.querySelector('#dsort');d.value=s;d.dispatchEvent(new Event('change',{bubbles:true}))},sort);await p.waitForTimeout(300)}
  await p.evaluate(()=>{document.querySelector('#dq').value='שחור';document.querySelector('#dq').dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(400);
  const r=await p.evaluate(()=>({tiles:document.querySelectorAll('#dgrid [data-dpick]').length,empty:(document.querySelector('#dgrid .dempty')||{}).textContent||''}));await p.evaluate(()=>{document.querySelector('#dq').value='';document.querySelector('#dq').dispatchEvent(new Event('input',{bubbles:true}))});
  await p.evaluate(()=>{const b=document.querySelector('#drnd');if(b)b.click()});await p.waitForTimeout(500);
  await p.evaluate(()=>{const b=document.querySelector('[data-cyc="1"]');if(b)b.click()});await p.waitForTimeout(500);
  const s=await state();log('drawer',slot,r,s.errs.length?s:'');await p.screenshot({path:OUT+`drawer_${slot}.png`});await p.evaluate(()=>closeDrawer())}
 // 3) save, album, compare, dup, item dialog from studio
 await p.evaluate(()=>saveStudio());await p.waitForTimeout(400);await p.evaluate(()=>{document.querySelector('#vn').value='בדיקה 68';document.querySelector('#vok').click()});await p.waitForTimeout(800);log('save',await state(),await p.evaluate(()=>Object.keys(LOOKS).length));
 await p.evaluate(()=>{document.querySelector('#slist').click()});await p.waitForTimeout(300);await p.evaluate(()=>{const b=document.querySelector('[data-open2]');if(b)b.click()});await p.waitForTimeout(800);
 const dlgOpen=await p.evaluate(()=>document.querySelector('#dlg').open);
 await p.evaluate(()=>{const b=document.querySelector('#dlbody [data-studio]');if(b)b.click()}).catch(e=>log('ITEM→STUDIO THROW',e.message));await p.waitForTimeout(800);log('item dialog over studio',dlgOpen,await state(),await p.evaluate(()=>({studio:document.querySelector('#studio').open,dlg:document.querySelector('#dlg').open})));
 await p.evaluate(()=>{document.querySelector('#dlg').close();document.querySelector('#studio').close()});await p.waitForTimeout(300);
 await p.evaluate(()=>openHub('album'));await p.waitForTimeout(2500);await p.screenshot({path:OUT+'album.png'});log('album',await p.evaluate(()=>({cards:document.querySelectorAll('#hbody .ac').length,errs:(window.ERRS||[]).splice(0)})));
 await p.evaluate(()=>{const b=document.querySelector('[data-av="cal"]');if(b)b.click()});await p.waitForTimeout(800);log('cal',await p.evaluate(()=>({cells:document.querySelectorAll('#hbody .cc').length,errs:(window.ERRS||[]).splice(0)})));
 await p.evaluate(()=>{const b=document.querySelector('[data-av="av"]');if(b)b.click()});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const b=document.querySelector('[data-sdup]');if(b)b.click()});await p.waitForTimeout(1200);log('dup',await p.evaluate(()=>({open:document.querySelector('#studio').open,name:ST&&ST.name,id:ST&&ST.id,errs:(window.ERRS||[]).splice(0)})));
 await p.evaluate(()=>{document.querySelector('#studio').close()});
 log('ERR',errs,await p.evaluate(()=>JSON.stringify(window.ERRS||[])));await b.close()})();
