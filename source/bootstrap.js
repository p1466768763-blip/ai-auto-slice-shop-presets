const selected=new URLSearchParams(location.search).get('desktop_editor')==='1'?'editor':'main';
let content=new TextDecoder().decode(Uint8Array.from(atob(pages[selected]),c=>c.charCodeAt(0)));
content=content.replace('aria-label="店铺预设" title="店铺预设"','aria-label="设置" title="设置"').replace('class="workspace-settings-label">店铺预设','class="workspace-settings-label">设置');
const searchEnhancement=`<script>(function(){
const originalStudioGroups=window.studioGroups;
const originalRenderHighlight=window.renderHighlight;
const filter={productId:'',hostName:'',publishStatus:''};
let searchOpen=false;
window.studioGroups=function(){
  const groups=originalStudioGroups();
  const product=filter.productId.toLowerCase(),host=filter.hostName.toLowerCase(),status=filter.publishStatus;
  if(!product&&!host&&!status)return groups;
  return groups.map(group=>({...group,clips:group.clips.filter(item=>(!product||String(item.productId||'').toLowerCase()===product)&&(!host||String(item.hostName||group.task.hostName||'').toLowerCase().includes(host))&&(!status||(item.published?'published':'unpublished')===status))})).filter(group=>group.clips.length);
};
const style=document.createElement('style');style.textContent='.legacy-search-area{display:flex;align-items:center;gap:8px;margin-left:auto}.legacy-search-toggle{height:32px;padding:0 14px;border:1px solid #dfe3eb;border-radius:6px;background:#fff;color:#606b7d}.legacy-search-toggle:hover,.legacy-search-toggle[aria-expanded="true"]{border-color:#e94f95;background:#fff5f9;color:#d94188}.legacy-search-drawer{display:none;align-items:end;gap:10px;margin:0 0 12px;padding:12px;border:1px solid #ebeef5;border-radius:8px;background:#fafbfc}.legacy-search-drawer.is-open{display:flex}.legacy-search-field{display:flex;flex-direction:column;gap:5px;min-width:150px;color:#606266;font-size:12px}.legacy-search-field input,.legacy-search-field select{height:32px;border:1px solid #dcdfe6;border-radius:5px;background:#fff;padding:0 9px;color:#606266}.legacy-search-actions{display:flex;gap:8px}.legacy-search-actions button{height:32px;padding:0 14px;border-radius:5px}.legacy-search-apply{background:#e94f95;color:#fff}.legacy-search-reset{border:1px solid #dcdfe6;background:#fff;color:#606266}@media(max-width:760px){.legacy-search-area{width:100%;margin-left:0}.legacy-search-drawer{align-items:stretch;flex-direction:column}.legacy-search-field{width:100%}.legacy-search-actions{justify-content:flex-end}}';document.head.append(style);
function installSearch(){
  const top=document.querySelector('.sg-topbar');
  if(!top)return;
  document.querySelector('#legacySearchArea')?.remove();document.querySelector('#legacySearchDrawer')?.remove();
  const panel=top.closest('.sg-control-panel')||document.createElement('section');
  panel.className='sg-control-panel';panel.setAttribute('aria-label','自动切片与搜索');
  if(!panel.contains(top)){top.before(panel);panel.append(top)}
  const area=document.createElement('div');area.id='legacySearchArea';area.className='legacy-search-area';area.innerHTML='<button type="button" class="legacy-search-toggle" id="legacySearchToggle" aria-expanded="'+searchOpen+'" aria-controls="legacySearchDrawer">搜索</button>';
  top.append(area);
  const drawer=document.createElement('section');drawer.id='legacySearchDrawer';drawer.className='legacy-search-drawer';drawer.setAttribute('aria-label','搜索筛选');
  const products=[...new Set(allHighlightClips().map(item=>item.productId).filter(Boolean))].sort();
  drawer.innerHTML='<label class="legacy-search-field">商品 ID<select id="legacySearchProduct"><option value="">全部商品</option>'+products.map(id=>'<option value="'+escapeHtml(id)+'">'+escapeHtml(id)+'</option>').join('')+'</select></label><label class="legacy-search-field">主播名称<input id="legacySearchHost" type="search" placeholder="请输入主播名称"></label><label class="legacy-search-field">发布状态<select id="legacySearchStatus"><option value="">全部发布状态</option><option value="published">已发布</option><option value="unpublished">未发布</option></select></label><div class="legacy-search-actions"><button type="button" class="legacy-search-apply" id="legacySearchApply">搜索</button><button type="button" class="legacy-search-reset" id="legacySearchReset">重置</button></div>';
  if(searchOpen)drawer.classList.add('is-open');
  panel.append(drawer);
  const toggle=area.querySelector('#legacySearchToggle'),product=drawer.querySelector('#legacySearchProduct'),host=drawer.querySelector('#legacySearchHost'),status=drawer.querySelector('#legacySearchStatus');
  product.value=filter.productId;host.value=filter.hostName;status.value=filter.publishStatus;
  toggle.onclick=()=>{searchOpen=drawer.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(searchOpen))};
  drawer.querySelector('#legacySearchApply').onclick=()=>{filter.productId=product.value;filter.hostName=host.value.trim();filter.publishStatus=status.value;searchOpen=true;window.renderHighlight()};
  drawer.querySelector('#legacySearchReset').onclick=()=>{filter.productId='';filter.hostName='';filter.publishStatus='';searchOpen=true;window.renderHighlight()};
  host.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();drawer.querySelector('#legacySearchApply').click()}};
}
window.renderHighlight=function(){originalRenderHighlight();installSearch()};
installSearch();
})();<\/script>`;
content=content.replace('</body>',searchEnhancement+'</body>');
const clarityEnhancement=`<style id="clarity-redesign">
:root{--bg:#f5f7fa;--line:#e7ebf0;--text:#27313b;--muted:#7d8792;--pink:#df4d91;--pink2:#f269a8;--active:#fff3f8}
body{background:var(--bg);color:var(--text)}
.sidebar{width:156px;background:#fff;border-right-color:#edf0f3}
.logo{height:56px;padding:0 16px;font-size:22px}
.menu{padding:9px 16px;color:#6d7680;font-size:12px}
.sub button{padding:8px 16px 8px 40px;font-size:12px}
.top{height:56px;padding:0 24px;border-bottom-color:#edf0f3}
.content{padding:22px 26px 48px}
.crumb{margin-bottom:18px;color:#69737d;font-size:12px}
.ai-live-page{background:#fff;border:1px solid #e8edf1;border-radius:12px;box-shadow:0 2px 8px #27313b08;min-height:0}
.ai-live-nav{padding:0 20px;border-bottom-color:#edf0f3;gap:24px}
.ai-live-nav button{padding:15px 4px 13px;font-size:13px}
.ai-live-body{padding:18px 20px 24px}
.sg-topbar{min-height:44px;margin:0 0 14px;padding:7px 10px;border:1px solid #e8edf1;border-radius:9px;background:#fbfcfd;gap:12px}
.sg-control-panel{min-width:0;margin:0 0 14px;border:1px solid #e8edf1;border-radius:9px;background:#fbfcfd}
.sg-control-panel .sg-topbar{margin:0;border:0;border-radius:0;background:transparent}
.sg-control-panel .legacy-search-drawer{margin:0;padding:4px 10px 12px;border:0;border-radius:0;background:transparent}
.sg-topbar .highlight-auto-config{gap:10px}
.sg-topbar .highlight-auto-switch{font-size:12px;color:#59636d}
.sg-topbar .studio-default-preset{color:#69737d;font-size:11px}
.legacy-search-area{margin-left:auto}
.legacy-search-toggle{height:30px;padding:0 12px;border-color:#dfe5ea;border-radius:5px;color:#68737e;background:#fff}
.legacy-search-toggle:hover,.legacy-search-toggle[aria-expanded="true"]{border-color:#e4a7c3;background:#fff7fb;color:var(--pink)}
.legacy-search-drawer{margin:0 0 14px;padding:12px;border-color:#e8edf1;border-radius:8px;background:#fbfcfd}
.legacy-search-field{color:#69737d;font-size:11px}
.legacy-search-field input,.legacy-search-field select{height:31px;border-color:#dfe5ea;color:#394550}
.legacy-search-apply{background:var(--pink)}
.legacy-search-reset{color:#68737e}
.sg-list{gap:12px}
.sg-group{width:100%;min-width:0;max-width:100%;padding:12px 14px;border:1px solid #e5eaf0;border-radius:11px;background:#fff;box-shadow:0 1px 3px #27313b08}
.sg-body{min-width:0;max-width:100%;gap:16px}
.sg-source{width:218px}
.sg-source-top{gap:12px}
.sg-source-thumb{width:92px;height:164px;border-color:#e4e9ee;border-radius:9px}
.sg-source-code{background:#27313bb8;border-radius:4px;font-size:10px}
.sg-source-count{background:#27313bb8;border-radius:4px;font-size:10px}
.sg-source-side{gap:10px}
.sg-source-meta{gap:3px}
.sg-source-meta span{font-size:11px;line-height:17px;color:#4e5a65}
.sg-source-meta i{color:#98a1aa;margin-right:5px}
.sg-source-btn{height:30px;border-color:#e8a8c3;border-radius:5px;color:var(--pink);line-height:28px;background:#fff8fb}
.sg-source-btn:hover{background:#fff0f6}
.sg-clips{overflow-x:auto;overflow-y:hidden;padding-bottom:4px;scrollbar-color:#d9dfe5 transparent;scrollbar-width:thin}
.sg-clip-row{gap:11px;min-height:164px}
.sg-clip{width:104px}
.sg-clip-card{border-radius:9px;background:#f3f5f7;box-shadow:0 1px 2px #27313b10}
.sg-clip-play{width:28px;height:28px;background:#e44f94cc;font-size:11px}
.sg-clip-status{border-radius:4px;font-size:10px}
.sg-clip-duration{border-radius:4px;background:#27313bb8}
.sg-clip-dl,.sg-source-dl{box-shadow:0 1px 3px #27313b18}
.workspace-settings-trigger{color:#66717c}
.workspace-settings-trigger:hover{color:var(--pink)}
@media(max-width:1360px){.sg-source{width:206px}.sg-source-thumb{width:82px;height:146px}.sg-clip{width:96px}.sg-clip-row{min-height:146px}}
@media(max-width:760px){.sidebar{width:0}.content{padding:14px 12px 32px}.top{padding:0 14px}.ai-live-nav{padding:0 14px;gap:18px}.ai-live-body{padding:14px 12px 20px}.sg-list{width:100%;min-width:0}.sg-topbar{align-items:flex-start;flex-wrap:wrap;padding:9px}.sg-topbar .highlight-auto-config{width:100%;flex-wrap:wrap;gap:7px 10px}.legacy-search-area{width:auto;margin-left:auto}.legacy-search-drawer{padding:10px}.sg-group{width:100%;min-width:0;max-width:100%;padding:10px;border-radius:10px}.sg-body{width:100%;min-width:0;max-width:100%;gap:10px;overflow:hidden}.sg-source{width:174px;flex:0 0 174px}.sg-source-thumb{width:76px;height:135px}.sg-source-top{gap:8px}.sg-source-meta span{font-size:10px;line-height:15px}.sg-source-btn{height:28px;line-height:26px;font-size:11px}.sg-clips{width:calc(100% - 184px);flex:1 1 auto;min-width:0}.sg-clip{width:88px}.sg-clip-row{gap:8px;min-height:135px}.sg-clip-play{width:25px;height:25px;font-size:10px}.sg-clip-status,.sg-clip-duration{font-size:9px}.sg-clip-dl,.sg-source-dl{width:20px;height:20px;font-size:12px}}
</style>`;
content=content.replace('</head>',clarityEnhancement+'</head>');
window.addEventListener('DOMContentLoaded',()=>{document.open();document.write(content);document.close();},{once:true});
