const {chromium}=require('playwright');const fs=require('fs');const S=process.argv[2];
const ITEMS={};for(const f of fs.readdirSync(S+'/dbq3/items')){const d=JSON.parse(fs.readFileSync(S+'/dbq3/items/'+f,'utf8'));delete d.version;ITEMS[f.replace('.json','')]=d.data||d}
const IDS=(process.argv[3]||'T1,T364').split(',');const VS=(process.argv[4]||'front,back,hip').split(',');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('PE',e.message));
await p.addInitScript(()=>{window.claude={use:async k=>null}});await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
console.log(await p.evaluate(async([I,IDS,VS])=>{for(const k in I){if(I[k].p5g)delete I[k].p5g.u}Object.assign(IT,I);const o=[];
 for(const id of IDS)for(const v of VS){const slot=slotOf(id);let tf=await autoTf(slot,id);const g=p5gOfT(id,tf);tf=Object.assign({r:0},(g.fit||{})[v]||{},{pvv:v});
  await smartFit(slot,true,{id,tf,v,g});const url=p5gUrl(g,v);const cl=await cleanP5(url,false);const ro=await rowsOf(cl&&cl.url||url,tf.w/100*399);
  const cy=tf.y/100*1365,cx=tf.x/100*399,top=cy-ro.H/2;o.push(`== ${id} ${v} w${tf.w} x${tf.x} y${tf.y}  img ${ro.W}x${ro.H}`);
  for(let y=262;y<=760;y+=24){const q=bodyAt(v,y);const r=Math.round(y-top);const gq=r>=0&&r<ro.H?ro.R[r]:null;const g0=gq?Math.round(cx+(gq[0]-ro.W/2)):'-',g1=gq?Math.round(cx+(gq[1]-ro.W/2)):'-';o.push(`y${y} body ${q?q.join('-'):'-'}  garm ${g0}-${g1}`)}}
 return o.join('\n')},[ITEMS,IDS,VS]));await b.close()})();
