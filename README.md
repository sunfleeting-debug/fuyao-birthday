# 扶摇直上 · 二十岁

一份写给多年老友 **扶摇直上** 的二十岁生日礼物。用五十八张照片和一盏孔明灯搭的小网站。

**线上地址 → https://sunfleeting-debug.github.io/fuyao-birthday/**

- 全屏纵向翻页，鼠标划过会有照片拖尾
- 四屏：封面 → 关于 → 走过 → 生辰
- 「走过」里可以进去看全部 58 张照片，按 *江与城 / 砖与瓦 / 馆与洞 / 仗剑 / 我们* 分组
- 「生辰」那屏有**一盏可以点亮的孔明灯**：点一下亮灯，放开手整盏灯扶摇升起、飘出画面，随后弹出祝词
- 名字出自《庄子 · 逍遥游》「抟扶摇而上者九万里」，所以整站的主色是**暮色天青 + 暮金**，
  点题的交互也用了「放灯」而不是「吹蜡烛」——升空比熄灭更贴这个名字

技术栈：Vite + React 18 + TailwindCSS + Framer Motion（纯静态站点，无后端）。

---

## 一、本地跑起来

```bash
npm install
npm run dev          # http://localhost:3000
```

打包 & 本地预览产物：

```bash
npm run build
npm run preview      # http://localhost:4173
```

---

## 二、想改内容？只改这几个地方

| 想改什么 | 改哪里 |
| --- | --- |
| 所有文案（信件、关于、分组说明） | `src/data/content.js` |
| 照片顺序、分组、每张的配文、朝向 | `src/data/content.js` 里的 `PHOTOS` |
| 替换照片 | 覆盖 `public/photos/full/*.jpg` 与 `public/photos/thumb/*.jpg` |
| 名字 / 生日 / 送出的日期 / 出处那句 | `src/data/content.js` 顶部的 `PROFILE` |
| 配色（天青 / 暮金 / 朱砂 / 纸底） | `tailwind.config.js` 里的 `colors` |
| 各屏排版结构 | `src/components/screens/*.jsx` |
| 孔明灯的形态与放灯动画 | `src/components/Lantern.jsx` |

照片想重新批量跑一遍（缩到 1600px + 按实测旋转矫正，需要 Pillow）：

```bash
python scripts/process_photos.py
```

### ⚠️ 改图之后请重跑一次朝向核对

`content.js` 里每张照片的 `orient`（横 `l` / 竖 `p`）决定画廊里用 4:3 还是 3:4 排版。
**这个字段是实测出来的，不是凭印象写的**——凭印象写会让竖图被塞进横框里裁掉一大块。
核对方式：

```bash
python scripts/audit_photos.py
```

它会把 58 张按分组拼成 `.shots/contact-*.png`（每张标了 slug），并打印真实宽高比。
对着拼图逐张看一遍，就知道 `orient` 和每张的配文写得对不对。

> 已知坑：这批原图（`狗民/`）的 EXIF 方向标记全是空或 1，`exif_transpose` 等于没做事；
> 其中两张是**横着竖拍的**，像素本身就是躺着的，只能手工在 `process_photos.py` 的
> `ROTATE` 里转正。换素材时只要看到「文字是躺着的」照片，就往那张表里加一条。

---

## 三、真实性与隐私：站点里哪些是查证过的

这个站是礼物，所以配文尽量写真的。写之前逐张看过照片，分三类：

| 类别 | 内容 |
| --- | --- |
| **照片里能直接读到的** | 「柳州」的江边、「长沙」的墙、「合肥」的公仔底座、「屈子祠」的匾额、店招「躺平鸭」、长椅上的「如果不能一夜暴富」 |
| **看画面能确定的** | 花墙下那把粉伞、溶洞里那束顶光、螺旋天窗、水晶灯、玉米和青椒壁画、草原上那只羊驼、四人对打的道具剑 |
| **刻意写虚的** | 具体年份之外的行程顺序、地名没在画面里出现的（比如「下山路上」），都只描述画面，不硬安地名 |

另外，**109 张原图里剔除了 3 张**没有上线，都记在 `scripts/process_photos.py` 的 `EXCLUDED`：

- `MVIMG_20260722_232644.jpg`、`MVIMG_20260722_232656.jpg` —— 卧室私照，不适合公网
- `IMG_20251006_113915.jpg` —— 手部特写，与站点主题无关

> 站点和仓库都是**公开**的（GitHub 免费版 Pages 要求仓库 public）。如果不想让照片公开可搜，
> 见第五节的两个替代做法。

---

## 四、发布 / 更新

### 改完内容，一条命令重新发布

```bash
npm run deploy
```

`scripts/deploy.sh` 会自动：从 git remote 读出仓库名 → 按 `/<仓库名>/` 作为
base 构建 → 把 `dist/` 推成 `gh-pages` 分支。约 1 分钟后生效。

### 当前线上是怎么部署的

| 项 | 值 |
| --- | --- |
| 仓库 | https://github.com/sunfleeting-debug/fuyao-birthday （public） |
| 线上地址 | https://sunfleeting-debug.github.io/fuyao-birthday/ |
| Pages 来源 | `gh-pages` 分支 / 根目录 |
| 发布方式 | 本地 `npm run deploy` 构建后推分支 |

> **为什么不用 GitHub Actions 自动部署？**
> 推送 `.github/workflows/` 里的文件需要 Personal Access Token 带 `workflow` 作用域，
> 当前令牌没有，会报 `refusing to allow a Personal Access Token to create or update workflow`。
> 工作流已经写好放在 `ci/deploy.yml.template`，想启用的话：
>
> ```bash
> gh auth refresh -s workflow
> mkdir -p .github/workflows && mv ci/deploy.yml.template .github/workflows/deploy.yml
> git add . && git commit -m "ci: 启用 GitHub Actions 自动部署" && git push
> ```
>
> 然后到仓库 **Settings → Pages → Source** 改成 **GitHub Actions**。
> 之后每次 `git push` 都会自动发布，就不用再跑 `npm run deploy` 了。

---

## 五、域名 / 不想公开的两个选项

### A. 换成自己的域名（推荐，最体面）

**1. 买域名**：阿里云 / 腾讯云 / Cloudflare / Namecheap 都行，`.com` 约 50–80 元/年。
想贴主题可以选 `fuyao.xxx` 这类前缀。

**2. 解析 + 告诉 GitHub**：在域名服务商处加 4 条 A 记录指向 GitHub Pages，

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   sunfleeting-debug.github.io
```

然后在仓库 **Settings → Pages → Custom domain** 填上域名，勾选 **Enforce HTTPS**。
证书自动签发，通常 10 分钟内生效。

> ⚠️ 用自定义域名后站点在根路径，`scripts/deploy.sh` 里的
> `BASE="/${REPO}/"` 要改成 `BASE="/"`。
> 同时建议把 `public/robots.txt` 写成 `User-agent: *` / `Disallow: /`，
> 顺手挡住搜索引擎（见下面的 B 方案）。

### B. 只想发给他一个人看

- **换个猜不到的仓库名**：GitHub Pages 的地址就是仓库名，改成 `f-20-0719` 这种，
  不想被搜到就够了；再放一份 `public/robots.txt` 屏蔽爬虫。
- **不要公网**：把 `dist/` 打包成 zip 直接发给他，本地 `npm run preview` 就能看。
- **仓库私有 + Pages**：私有仓库要发布 Pages 需要 GitHub Pro，免费版不支持。

---

## 六、目录结构

```
fuyao-birthday/
├─ ci/deploy.yml.template          GitHub Actions 工作流（待启用）
├─ public/
│  ├─ photos/full/                 网页用大图（长边 1600px，共 58 张）
│  ├─ photos/thumb/                缩略图（长边 640px）
│  └─ favicon.svg                  孔明灯图标
├─ scripts/
│  ├─ deploy.sh                    一键发布到 gh-pages
│  ├─ process_photos.py            精选 + 旋转矫正 + 压缩
│  ├─ audit_photos.py              核对朝向 / 生成分组拼图（改图后必跑）
│  └─ verify*.py                   Playwright 截图核验（本地 / 线上）
└─ src/
   ├─ App.jsx                      翻页主框架（桌面滚轮翻页 / 移动端正常滚动）
   ├─ data/content.js              全部文案与照片索引
   ├─ components/
   │  ├─ Lantern.jsx               可交互孔明灯（点亮 → 放灯 → 祝词）
   │  ├─ ImageTrail.jsx            鼠标照片拖尾
   │  ├─ LetterSwap.jsx            按钮字母翻转
   │  ├─ Navbar.jsx / Footer.jsx
   │  └─ screens/                  四屏内容
   └─ pages/GalleryPage.jsx        全部照片页
```

---

二十岁生日快乐。风起来的时候，就往上走。
