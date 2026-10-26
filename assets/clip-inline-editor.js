/* Compact library cards keep the preview visible and open subtitle editing in its own dialog. */
const inlineClipSubtitleDrafts = new Map();
const inlineSubtitleKey = item => 'live-slice-prototype-copy:subtitles:' + item.task.id + ':' + item.index;
const inlineSubtitleExamples = ['这款商品的细节给大家看一下','近距离看看面料和做工','日常搭配也很合适','这里是我们今天介绍的重点','可以根据自己的需要来选择','再给大家展示一下整体效果','商品信息可以在页面中查看','感兴趣的朋友可以了解一下'];

function inlineClipSubtitleState(item) {
  const key = inlineSubtitleKey(item);
  if (inlineClipSubtitleDrafts.has(key)) return inlineClipSubtitleDrafts.get(key);
  const clip = item.task.clips[item.index];
  let draft = {version:1,enabled:true,example:true,lines:[...inlineSubtitleExamples]};
  if (Array.isArray(clip.subtitles)) draft = {version:1,enabled:true,example:false,lines:clip.subtitles.map(line => typeof line === 'string' ? line : String(line.text ?? ''))};
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && saved.version === 1 && typeof saved.enabled === 'boolean' && Array.isArray(saved.lines) && saved.lines.every(line => typeof line === 'string')) draft = {version:1,enabled:saved.enabled,example:saved.example === true,lines:[...saved.lines]};
  } catch {}
  const state = {draft,savedSnapshot:JSON.stringify(draft),selected:0,message:'',error:false};
  inlineClipSubtitleDrafts.set(key,state);
  return state;
}

function renderInlineClipLiveHeading(item) {
  const task = item.task;
  const identified = !!task.liveSession && task.liveSession !== '待识别直播场次';
  const date = identified ? String(task.liveStart || '').slice(0,10) : '';
  const hostName = item.hostName || '待识别';
  return `<div class="clip-live-heading clip-live-summary" aria-label="直播信息"><div class="clip-live-title"><time${date ? ` datetime="${escapeHtml(date)}"` : ''}>${escapeHtml(date || '日期待识别')}</time><span class="clip-live-host" title="主播：${escapeHtml(hostName)}">${escapeHtml(hostName)}</span></div><button type="button" class="clip-live-preview" data-preview-live="${escapeHtml(task.id)}" aria-label="查看原始录屏">原始录屏</button></div>`;
}

function renderInlineClipCard(item) {
  const clipKey = item.task.id + '-' + item.index;
  const selected = highlightSelectedClips.has(clipKey);
  const product = item.productId ? getManagedProducts(item.task.preset || currentDefaultPreset).find(product => product.id === item.productId) : null;
  const state = inlineClipSubtitleState(item);
  return `<article class="clip-card clip-editor-card${selected ? ' is-selected' : ''}" data-card-key="${escapeHtml(clipKey)}" data-inline-task="${escapeHtml(item.task.id)}" data-inline-clip="${item.index}" aria-label="视频">
    <div class="subtitle-editor-body clip-inline-body">
      <div class="subtitle-preview-pane"><div class="subtitle-preview-frame"><video class="clip-inline-video" poster="${escapeHtml(clipCover(item))}" preload="metadata" playsinline controls aria-label="视频预览"><source src="${escapeHtml(item.videoUrl || item.task.videoUrl || '')}" type="video/mp4"></video><img class="clip-inline-poster" src="${escapeHtml(clipCover(item))}" alt="当前视频的演示封面" loading="lazy" width="900" height="1600"><span class="subtitle-preview-label">视频预览</span><div class="subtitle-preview-copy"${state.draft.enabled && state.draft.lines[0] ? '' : ' hidden'}>${escapeHtml(state.draft.lines[0] || '')}</div></div></div>
    </div>
    <header class="clip-editor-heading">${renderInlineClipLiveHeading(item)}<div class="clip-editor-details"><div class="clip-editor-product"><strong>${escapeHtml(product?.name || item.productId || '')}</strong><span class="clip-editor-duration">${escapeHtml(item.duration)}</span><span class="clip-editor-status${item.published ? ' published' : ''}">${item.published ? '已发布' : '未发布'}</span><button type="button" class="inline-subtitle-toggle" data-inline-subtitle-toggle="${escapeHtml(clipKey)}" aria-haspopup="dialog" aria-label="编辑字幕">字幕编辑</button></div>${highlightBatchMode ? `<label class="clip-editor-select"><input type="checkbox" class="highlight-select" data-clip-key="${escapeHtml(clipKey)}" aria-label="选择视频 ${escapeHtml(item.clipNumber)}"${selected ? ' checked' : ''}>选择此视频</label>` : ''}</div></header>
  </article>`;
}

function mountInlineClipEditors() {
  const items = new Map(allHighlightClips().map(item => [item.task.id + '-' + item.index,item]));
  document.querySelectorAll('.clip-editor-card[data-inline-task]').forEach(root => {
    const item = items.get(root.dataset.cardKey);
    if (!item) return;
    const video = root.querySelector('.clip-inline-video'), poster = root.querySelector('.clip-inline-poster');
    if (video && !video.currentSrc) { video.hidden = true; if (poster) poster.hidden = false; }
    root.querySelector('[data-inline-subtitle-toggle]').onclick = () => openSubtitleEditor(item.index,item.task.id);
  });
}

// Card previews and the subtitle dialog share one saved draft per clip.
document.addEventListener('clip-subtitles-saved',event => {
  const {taskId,index,enabled,lines} = event.detail;
  if (!Array.isArray(lines)) return;
  const key = 'live-slice-prototype-copy:subtitles:' + taskId + ':' + index;
  let saved;
  try { saved = JSON.parse(localStorage.getItem(key)); } catch {}
  const draft = {version:1,enabled,example:saved?.example === true,lines:[...lines]};
  const state = inlineClipSubtitleDrafts.get(key);
  if (state) {
    state.draft = draft; state.savedSnapshot = JSON.stringify(draft); state.selected = 0; state.message = '已保存当前视频的字幕'; state.error = false;
  }
  const card = [...document.querySelectorAll('.clip-editor-card[data-inline-task]')].find(node => node.dataset.cardKey === taskId + '-' + index);
  const preview = card?.querySelector('.subtitle-preview-copy');
  if (preview) { preview.textContent = lines[0] || ''; preview.hidden = !enabled || !preview.textContent; }
});
