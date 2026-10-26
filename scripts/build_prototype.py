from pathlib import Path
import base64
import json

root = Path(__file__).resolve().parents[1]
pages = {
    name: base64.b64encode((root / 'source' / (name + '.html')).read_bytes()).decode('ascii')
    for name in ('main', 'editor')
}
wrapper = (root / 'source' / 'wrapper.html').read_text(encoding='utf-8')
bootstrap = (root / 'source' / 'bootstrap.js').read_text(encoding='utf-8')
html = wrapper.replace('__PROTOTYPE_PAGES__', json.dumps(pages, ensure_ascii=False, separators=(',', ':')))
html = html.replace('__PROTOTYPE_BOOTSTRAP__', bootstrap)
for name in ('index.html', 'live-slice-prototype.html'):
    (root / name).write_text(html, encoding='utf-8')
print('Built index.html and live-slice-prototype.html')
