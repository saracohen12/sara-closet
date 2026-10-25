// ===== v184: a colour filter she can see (25/10 plan "מסך ארון וסינון צבע"). The colours used to be dots off the edge of the phone and a chip
// hidden behind the top bar, so a forgotten colour once emptied a drawer. Now: "🎨 צבע" first in the closet bar (shows the colour + ✕ when on),
// a sheet with every colour and how many there are here, a clear empty message, and items with no store colour get the colour measured from the photo.
(function(){
const ERR=(w,e)=>(window.ERRS=window.ERRS||[]).push('v184 '+w+': '+(e&&e.message||e));
const $1=s=>document.querySelector(s),$a=s=>[...document.querySelectorAll(s)];
const es=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const FAM=()=>$a('#cols button[data-c]').map(b=>b.dataset.c);
const sw=c=>(typeof SW=='object'&&SW[c])||'#ccc';
const ALL='conic-gradient(#111 0 9%,#fff 0 18%,#7a4a2a 0 27%,#d9c3a0 0 36%,#24407a 0 45%,#3f6b3a 0 54%,#9b1d2a 0 63%,#e8a2b8 0 72%,#6b3f8f 0 81%,#9a9a9a 0 90%,#e6b53c 0)';
const cur=()=>{try{return COL||''}catch(_){return ''}};

// 1. items whose store colour has no family (e.g. "multicolor", a code) take the family measured from the photo
function fill(){const fam=FAM();let n=0;
 $a('.card[data-id]').forEach(c=>{if(c.dataset.c)return;const d=D[c.dataset.id];const f=d&&d.col&&d.col.fc;if(f&&fam.includes(f)){c.dataset.c=f;c.dataset.ck=fam.indexOf(f);c.dataset.c184='1';n++}});return n}

// 2. the cards that would show right now if no colour were chosen (the same rules as apply())
function inView(){const v=(($1('#q')||{}).value||'').trim();const q=normQ(v).split(/\s+/).filter(Boolean);const exact=D[v.toUpperCase()]?v.toUpperCase():'';
 const m=MODE(),c0=COL,out=[];
 try{COL='';$a('section[id][data-g]').forEach(s=>{if(s.dataset.g=='ord')return;
  const inG=m?(s.dataset.g=='clo'&&(!C||s.id==C)):(G=='all'||s.dataset.g==G)&&(!C||s.id==C);if(!inG)return;
  s.querySelectorAll('.card').forEach(c=>{if((m!='day'||isDay(c))&&(m!='shab'||isShab(c))&&extra(c)&&(F=='all'||(F=='dup'?c.dataset.dup:c.dataset.src==F))&&(exact?c.dataset.id==exact:q.every(w=>(c.dataset.qn||(c.dataset.qn=normQ(c.dataset.q))).includes(w))))out.push(c)})})}
 finally{COL=c0}return out}
function where(){if(C){const h=$1('#'+CSS.escape(C)+' h2');if(h)return (h.firstChild&&h.firstChild.nodeType==3?h.firstChild.textContent:h.textContent).trim()}
 if(G=='all')return 'כל הארון';const b=$1(`.groups button[data-g="${G}"]`);return b?[...b.childNodes].filter(n=>n.nodeType==3).map(n=>n.textContent).join('').trim()||b.textContent.replace(/\d+/g,'').trim():'הארון'}

// 3. set the colour through the old colour buttons, so the saved filter, the chips and the dots all stay in step
function set(c){c=c||'';if(c==cur())return;const b=$a('#cols button[data-c]').find(x=>x.dataset.c==(c||cur()));
 if(b)b.click();else{COL=c;apply()}}
function toTop(){const s=$a('section[id][data-g]:not(.hide)')[0]||$1('#empty');const bar=$1('.ctrl');if(!s)return;
 const off=bar&&getComputedStyle(bar).position!='static'?bar.getBoundingClientRect().bottom:0;const y=s.getBoundingClientRect().top+scrollY-off-8;
 if(scrollY>y+4||s.getBoundingClientRect().top<off)window.scrollTo({top:Math.max(0,y),behavior:'auto'})}

// 4. "🎨 צבע" first in the closet bar
function pill(){const row=$1('#q77')||$1('.ctrl .groups');if(!row)return;let g=$1('#col184g');
 if(!g){g=document.createElement('span');g.id='col184g';// spans, not <button>: everything in .groups that is a button gets its text rewritten with a count and folds the bar on a phone
  g.innerHTML='<span role="button" tabindex="0" id="col184b" aria-haspopup="dialog"><i></i><span>צבע</span></span><span role="button" tabindex="0" id="col184x" aria-label="לבטל את הצבע">✕</span>';row.prepend(g)}
 else if(g.parentNode!=row||row.firstElementChild!=g)row.prepend(g);
 const c=cur();g.classList.toggle('on',!!c);const b=g.firstChild;b.querySelector('i').style.background=c?sw(c):ALL;b.querySelector('span').textContent=c||'צבע';
 b.setAttribute('aria-label',c?`צבע: ${c}. לשנות צבע`:'סינון לפי צבע')}

// 5. the sheet
let S=null;
function open(){try{if(!S){S=document.createElement('dialog');S.id='col184';S.dir='rtl';S.setAttribute('aria-labelledby','k184t');document.body.appendChild(S);
  S.addEventListener('click',e=>{if(e.target===S)return S.close();const t=e.target.closest('button');if(!t)return;if(t.classList.contains('k184c'))return S.close();
   if(t.dataset.col184!=null){set(t.dataset.col184);S.close();setTimeout(toTop,60);const c=cur();(window.toast||(()=>{}))(c?`🎨 רק ${c}`:'🎨 כל הצבעים')}})}
 const cs=inView(),n={};let none=0;cs.forEach(c=>{const f=c.dataset.c;if(f)n[f]=(n[f]||0)+1;else none++});const c0=cur();
 const tile=(f,lab,k,bg)=>`<button type="button" data-col184="${es(f)}" aria-pressed="${f==c0}"><i style="background:${bg}"></i><span>${es(lab)}</span><b>${k}</b></button>`;
 S.innerHTML=`<div class="k184h"><h3 id="k184t">🎨 לפי צבע<small>${es(where())} · ${cs.length} פריטים</small></h3><button type="button" class="k184c" aria-label="סגירה">✕</button></div>
  <div class="k184g" role="group" aria-label="צבעים">${tile('','כל הצבעים',cs.length,ALL)}${FAM().filter(f=>n[f]||f==c0).map(f=>tile(f,f,n[f]||0,sw(f))).join('')}</div>
  ${none?`<p class="k184n">${none==1?'פריט אחד בלי צבע ידוע מופיע':none+' פריטים בלי צבע ידוע מופיעים'} רק ב"כל הצבעים"</p>`:''}`;
 if(!S.open)S.showModal();S.scrollTop=0;const p=S.querySelector('[aria-pressed=true]');if(p)p.focus()}catch(e){ERR('open',e)}}

// 6. empty closet because of the colour → say so, with one button back
let E0=null;
function empty(){const e=$1('#empty');if(!e)return;if(E0==null)E0=e.innerHTML;const c=cur();
 if(c&&!e.classList.contains('hide')){const k=`<span class="e184">אין כאן פריטים בצבע ${es(c)}</span> <button type="button" data-col184="" class="e184b">🎨 לראות את כל הצבעים</button>`;if(e.innerHTML!=k)e.innerHTML=k}
 else if(e.innerHTML!=E0)e.innerHTML=E0}

function after(){try{pill();empty()}catch(e){ERR('after',e)}}
{const a0=apply;window.apply=apply=function(){const r=a0.apply(this,arguments);after();return r}}

function act(t){try{if(t.id=='col184b')return open();set('');setTimeout(toTop,60)}catch(err){ERR('click',err)}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#col184b,#col184x,#empty [data-col184]');if(!t)return;e.preventDefault();e.stopPropagation();act(t)},true);
document.addEventListener('keydown',e=>{if(e.key!='Enter'&&e.key!=' ')return;const t=e.target.closest&&e.target.closest('#col184b,#col184x');if(!t)return;e.preventDefault();act(t)});

try{const n=fill();if(n&&cur())apply();else after()}catch(e){ERR('init',e)}
setTimeout(after,1200);setTimeout(after,4000);
window.COL184={open,set,inView,fill};
})();
