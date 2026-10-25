// ===== v72/73 fixes found by the screen-by-screen audit =====
// 1. item dialog: the colour/pose thumbnails of the avatar pictures show the cleaned picture (no "קדמי" label), and unnamed colours get a colour name
{const _ao72=afterOpen;afterOpen=function(id){_ao72(id);setTimeout(async()=>{try{const box=document.querySelector('#dlbody .p5gbox')||document.querySelector('#dlbody');if(!box)return;
  for(const im of box.querySelectorAll('.p5gv img,.p5r img')){const u=im.getAttribute('src')||'';if(!/\/_blob\/|blob:/.test(u)||im.dataset.cl)continue;im.dataset.cl=1;try{const c=await cleanP5(u);if(c&&c.url&&c.url!=u)im.src=c.url}catch(_){}}
  for(const sp of box.querySelectorAll('.p5gv .pv>span')){if(!/^גרסה \d+$/.test(sp.textContent.trim()))continue;const im=sp.parentElement.querySelector('img');try{const n=await colorName(im.dataset.cl?(im.src):im.getAttribute('src'));if(n)sp.textContent=n}catch(_){}}
 }catch(_){}},60)}}
// 2. prices are not shown in picture strips (only inside the item: "פרטים נוספים")
{const tidy=root=>{try{root.querySelectorAll&&root.querySelectorAll('.mini>span').forEach(s=>{if(/^\s*₪\s?[\d.,]+\s*$/.test(s.textContent)||/^\s*[\d.,]+\s?₪\s*$/.test(s.textContent))s.classList.add('pr72')})}catch(_){}};
 new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType==1)tidy(n)}).observe(document.body,{childList:true,subtree:true});tidy(document.body)}
// 3. hub: the chosen tab is always visible in the tab bar
{const _rh=renderHub;renderHub=function(...a){const r=_rh.apply(this,a);try{const b=document.querySelector('#htabs [aria-pressed="true"]');if(b)b.scrollIntoView({inline:'center',block:'nearest'})}catch(_){}return r}}
// 4. drawer: pieces that are ready for the avatar come first
{const _fd=fillDrawer;fillDrawer=function(...a){const r=_fd.apply(this,a);const go=()=>{try{const g=document.querySelector('#dgrid');if(!g)return;const tiles=[...g.children].filter(t=>t.classList.contains('di'));const late=tiles.filter(t=>t.classList.contains('noav'));if(late.length&&late.length<tiles.length)late.forEach(t=>g.appendChild(t))}catch(_){}};if(r&&r.then)r.then(go);else setTimeout(go,0);return r}}
