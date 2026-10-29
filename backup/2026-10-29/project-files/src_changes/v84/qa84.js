// render chosen garments in back + hip on the p5 avatar, before/after smartFit; prints tf and saves a screenshot
const {chromium}=require('playwright');const fs=require('fs');const S=process.argv[2];const OUT=process.argv[3]||S+'/tests/v77/qa84.png';const MODE=process.argv[4]||'fit';
const ITEMS={};for(const f of fs.readdirSync(S+'/dbq3/items')){const d=JSON.parse(fs.readFileSync(S+'/dbq3/items/'+f,'utf8'));delete d.version;ITEMS[f.replace('.json','')]=d.data||d}
const IDS=(process.argv[5]||'T1,T364,T147,T201').split(',');const VS=(process.argv[6]||'back,hip').split(',');
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1400,height:1000},deviceScaleFactor:2.5});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('tips77','1')}catch(_){};window.claude={use:async k=>null}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
const r=await p.evaluate(async([I,IDS,VS,MODE])=>{for(const k in I){if(I[k].p5g)delete I[k].p5g.u}Object.assign(IT,I);
 const box=document.createElement('div');box.id='qa84';box.style.cssText='position:fixed;inset:0;z-index:99999;background:#fff;display:grid;grid-template-columns:repeat('+(IDS.length*VS.length)+',1fr);gap:4px;padding:4px';document.body.appendChild(box);const out=[];
 for(const id of IDS)for(const v of VS){const slot=slotOf(id);const Sx=Object.assign(newST(),{avbase:'p5',items:{[slot]:id},tf:{},view:v,head:'hair'});let tf=await autoTf(slot,id);const g=p5gOfT(id,tf);const f0=(g.fit||{})[v]||{};tf=Object.assign({r:0},f0,{pvv:v});const t0=JSON.stringify(tf);
  if(MODE=='fit'){try{await smartFit(slot,true,{id,tf,v,g})}catch(e){out.push('E '+e.message)}}Sx.tf[slot]=tf;
  const fig=document.createElement('div');fig.style.cssText='position:relative;height:960px;border:1px solid #ccc';fig.innerHTML='<div class="mst" style="position:absolute;inset:0"></div><b style="position:absolute;top:0;left:0;z-index:9;background:#fff">'+id+' '+v+'</b>';box.appendChild(fig);
  fig.querySelector('.mst').innerHTML=await stageInner(Sx,{});out.push(id+' '+v+' '+slot+' '+t0+' -> '+JSON.stringify({x:tf.x,y:tf.y,w:tf.w,sx:tf.sx}))}
 out.push(...(window.AFLOG84||[]));return out.join('\n')},[ITEMS,IDS,VS,MODE]).catch(e=>'ERR '+e.message);console.log(r);await p.waitForTimeout(2500);
console.log(await p.evaluate(()=>[...document.querySelectorAll("#qa84 img")].filter(i=>!i.naturalWidth).map(i=>i.src.slice(0,90)+" "+i.className).join("\n")));await p.screenshot({path:OUT,clip:{x:0,y:+(process.env.CY||340),width:1400,height:+(process.env.CH||290)}});console.log('ERR',errs);await b.close()})();
