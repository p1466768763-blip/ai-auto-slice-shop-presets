# AI 直播切片：成片编辑原型

发布日期：2026-10-26。发布来源为 `Auto Live broadcast slice - copy 2026-10-23/live-slice-prototype.html` 的当前版本。

## 入口

- `index.html`：在线入口，默认进入成片编辑。
- `live-slice-prototype.html`：同内容的完整单文件原型，可直接下载并离线打开。
- `document.md` / `prd.html`：当前功能说明。
- `源码说明.md`：源码结构、导航与本地存储说明。
- `source/` 与 `scripts/build_prototype.py`：可编辑的内嵌页面、页面增强代码和重打包工具。

主页面、在线剪辑页、样式、封面和图标均内嵌在单文件中，无需安装依赖或启动服务。`assets/` 和 `online-edit/` 保留为项目配套源码；主入口使用文件内的打包资源。

## 当前行为

成片编辑展示 10 组演示素材、31 条成片。顶部将自动录屏开关、默认预设、搜索入口和展开的筛选条件整合为一个面板。搜索支持商品 ID、主播名称和发布状态，重置恢复全部成片。

点击成片打开视频封面与字幕编辑弹窗，可逐条编辑、添加、删除字幕并保存，也可进入发布页。发布明细和「设置」菜单继续可用。在线剪辑页与发布页通过同一 HTML 的查询参数往返。移动端素材分组适配屏幕，成片卡片在组内横向滚动。

这是静态前端原型。平台发布、下载、剪映草稿导出、素材重新生成等涉及服务端的操作为演示行为。演示数据和浏览器存储不构成真实后台服务。

## 发布位置

- GitHub：https://github.com/p1466768763-blip/ai-auto-slice-shop-presets
- GitHub Pages：https://p1466768763-blip.github.io/ai-auto-slice-shop-presets/
- Codeup：https://codeup.aliyun.com/5f6d648d93de782518721633/prd/tree/master/ai-auto-slice-shop-presets-20261020
- 内部预览：https://prd.kmeila.com/ai-auto-slice-shop-presets-20261020/index.html

内部预览需要公司登录。浏览器本地状态按访问地址隔离，桌面文件与线上预览不会自动同步。
