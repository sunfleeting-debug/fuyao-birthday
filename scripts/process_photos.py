# -*- coding: utf-8 -*-
"""
处理 狗民/ 里的素材，输出 扶摇直上 生日站用图。

做四件事：
  1. 从 109 张里**精选** 58 张（剔除卧室私照、手部特写、以及同一分钟内
     二十多张的连拍重复）
  2. 缩到长边 1600px（大图）/ 640px（缩略图）+ 压缩
  3. 手写旋转覆盖（见 ROTATE）：有两张原图是横着竖拍的，EXIF 里没有方向标记，
     自动矫正救不了，只能按实测手工转正
  4. 按场景语义重命名，顺序即画廊顺序
输出：public/photos/full/*.jpg、public/photos/thumb/*.jpg

复核方式：scripts/audit_photos.py 会把 58 张拼成 contact-*.png 并打印真实尺寸，
用来核对 orient 与肉眼所见是否一致（content.js 里的 orient 就是按它的输出写的）。
"""
import os
from collections import Counter
from PIL import Image, ImageOps

SRC = r"F:\MyProject\个人网站\狗民"
ROOT = r"F:\MyProject\个人网站\fuyao-birthday"
FULL = os.path.join(ROOT, "public", "photos", "full")
THUMB = os.path.join(ROOT, "public", "photos", "thumb")
os.makedirs(FULL, exist_ok=True)
os.makedirs(THUMB, exist_ok=True)

# (原文件名, 语义名, 分组)
# 分组：river 江与城 / arch 砖与瓦 / hall 馆与洞 / sword 仗剑 / us 我们
SELECTION = [
    # ---------- 江与城 ----------
    ("IMG_20250405_164123.jpg",      "river-01-xiangjiang", "river"),
    ("IMG_20250405_164128.jpg",      "river-02-xiangjiang2","river"),
    ("Image_735025201207784.jpg",    "river-03-four",       "river"),
    ("MVIMG_20250729_173033.jpg",    "river-04-skyline",    "river"),
    ("MVIMG_20250729_174231.jpg",    "river-05-mao",        "river"),
    ("MVIMG_20250729_174346.jpg",    "river-06-selfie",     "river"),
    ("IMG_20251004_210020.jpg",      "river-07-night",      "river"),
    ("IMG_20251004_210636.jpg",      "river-08-nightwalk",  "river"),

    # ---------- 砖与瓦 ----------
    ("IMG_20250406_150012.jpg",      "arch-01-temple",      "arch"),
    ("IMG_20250406_150818.jpg",      "arch-02-door",        "arch"),
    ("IMG_20250406_150822.jpg",      "arch-03-window",      "arch"),
    ("IMG_20250406_150825.jpg",      "arch-04-court",       "arch"),
    ("IMG_20250729_090646.jpg",      "arch-05-sign",        "arch"),
    ("IMG_20251006_163733.jpg",      "arch-06-relief",      "arch"),
    ("IMG_20251006_163735.jpg",      "arch-07-relief2",     "arch"),
    ("MVIMG_20250729_153849.jpg",    "arch-08-stage",       "arch"),
    ("MVIMG_20250729_153855.jpg",    "arch-09-stage2",      "arch"),
    ("MVIMG_20251003_184032.jpg",    "arch-10-exhibit",     "arch"),
    ("MVIMG_20251003_184033.jpg",    "arch-11-exhibit2",    "arch"),
    ("MVIMG_20251006_171656.jpg",    "arch-12-gate",        "arch"),
    ("IMG_20251006_141416.jpg",      "arch-13-pool",        "arch"),

    # ---------- 馆与洞 ----------
    ("MVIMG_20250729_101151.jpg",    "hall-01-flower",      "hall"),
    ("MVIMG_20250729_101152.jpg",    "hall-02-flower2",     "hall"),
    ("MVIMG_20250729_140057.jpg",    "hall-03-balloon",     "hall"),
    ("MVIMG_20250729_140105.jpg",    "hall-04-balloon2",    "hall"),
    ("MVIMG_20250729_140823.jpg",    "hall-05-dome",        "hall"),
    ("MVIMG_20250729_140849.jpg",    "hall-06-dome2",       "hall"),
    ("MVIMG_20250729_153115.jpg",    "hall-07-chandelier",  "hall"),
    ("MVIMG_20250729_155014.jpg",    "hall-08-frame",       "hall"),
    ("MVIMG_20250729_155248.jpg",    "hall-09-arch",        "hall"),
    ("MVIMG_20250729_155312.jpg",    "hall-10-buddha",      "hall"),
    ("MVIMG_20251003_142918.jpg",    "hall-11-stairs",      "hall"),
    ("MVIMG_20260723_163642.jpg",    "hall-12-cave",        "hall"),
    ("IMG_20250729_100959.jpg",      "hall-13-corn",        "hall"),
    ("IMG_20250729_101002.jpg",      "hall-14-corn2",       "hall"),
    ("IMG_20250729_093254.jpg",      "hall-15-graffiti",    "hall"),
    ("IMG_20251006_165028.jpg",      "hall-16-mascot",      "hall"),

    # ---------- 仗剑 ----------
    ("IMG_20251006_131324.jpg",      "sword-01-white",      "sword"),
    ("IMG_20251006_131325.jpg",      "sword-02-white2",     "sword"),
    ("IMG_20251006_131756.jpg",      "sword-03-duel",       "sword"),
    ("IMG_20251006_131820.jpg",      "sword-04-duel2",      "sword"),
    ("IMG_20251006_134241.jpg",      "sword-05-black",      "sword"),
    ("IMG_20251006_134319.jpg",      "sword-06-light",      "sword"),
    ("IMG_20251006_134351.jpg",      "sword-07-gesture",    "sword"),
    ("IMG_20251006_134432.jpg",      "sword-08-last",       "sword"),

    # ---------- 我们 ----------
    ("IMG_20250729_091850.jpg",      "us-01-pinkwall",      "us"),
    ("IMG_20250729_091900.jpg",      "us-02-changsha",      "us"),
    ("IMG_20250729_093926.jpg",      "us-03-shop",          "us"),
    ("IMG_20250729_093933.jpg",      "us-04-shop2",         "us"),
    ("IMG_20251005_211026.jpg",      "us-05-esports",       "us"),
    ("IMG_20251005_211028.jpg",      "us-06-esports2",      "us"),
    ("IMG_20251006_182313.jpg",      "us-07-tickets",       "us"),
    ("IMG_20251006_182342.jpg",      "us-08-milktea",       "us"),
    ("IMG_20251006_204517.jpg",      "us-09-bench",         "us"),
    ("IMG_20251006_204522.jpg",      "us-10-bench2",        "us"),
    ("mmexport1784793503199.jpg",    "us-11-grass",         "us"),
    ("mmexport1784793504575.jpg",    "us-12-grass2",        "us"),
    ("mmexport1784793508341.jpg",    "us-13-grass3",        "us"),
]

# 手工旋转覆盖（单位：度，逆时针为正，等同 PIL Image.rotate 的语义）。
# 依据：这批原图的 EXIF 方向标记全是空/1，exif_transpose 等于没做事；
# 但 hall-03 / hall-04 这两张是「横着竖拍」的，像素本身就是躺着的，
# 实测逆时针转 90° 后画面才正（见 .shots/rot-check.png）。
ROTATE = {
    "hall-03-balloon": 90,
    "hall-04-balloon2": 90,
}

# 剔除掉、不输出到站点的原图（仅记录，便于复核）
EXCLUDED = [
    ("MVIMG_20260722_232644.jpg", "卧室私照，不适合公网"),
    ("MVIMG_20260722_232656.jpg", "卧室私照，不适合公网"),
    ("IMG_20251006_113915.jpg",   "手部特写，与站点主题无关"),
]

MAX_FULL, MAX_THUMB = 1600, 640

rows, missing = [], []
for fn, slug, group in SELECTION:
    src = os.path.join(SRC, fn)
    if not os.path.exists(src):
        missing.append(fn)
        continue
    im = ImageOps.exif_transpose(Image.open(src))
    if slug in ROTATE:
        im = im.rotate(ROTATE[slug], expand=True)
    if im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size

    big = im.copy()
    big.thumbnail((MAX_FULL, MAX_FULL), Image.LANCZOS)
    big.save(os.path.join(FULL, slug + ".jpg"), "JPEG",
             quality=80, optimize=True, progressive=True)

    sm = im.copy()
    sm.thumbnail((MAX_THUMB, MAX_THUMB), Image.LANCZOS)
    sm.save(os.path.join(THUMB, slug + ".jpg"), "JPEG",
            quality=76, optimize=True, progressive=True)

    # 真实朝向：以处理后的像素为准，content.js 的 orient 必须与这里一致
    rows.append((slug, group, "l" if w > h else "p",
                 os.path.getsize(os.path.join(FULL, slug + ".jpg")) / 1024,
                 os.path.getsize(os.path.join(THUMB, slug + ".jpg")) / 1024))

print(f"{'slug':<22}{'grp':<7}{'ori':<5}{'fullKB':>8}{'thumbKB':>9}")
for r in rows:
    print(f"{r[0]:<22}{r[1]:<7}{r[2]:<5}{r[3]:>8.0f}{r[4]:>9.0f}")

print()
print("分组统计:", dict(Counter(r[1] for r in rows)))
print(f"输出 {len(rows)} 张，大图共 {sum(r[3] for r in rows)/1024:.2f} MB")
if missing:
    print("!! 缺失文件:", missing)
print("\n已剔除（未输出到站点）：")
for fn, why in EXCLUDED:
    print(f"  - {fn}  ({why})")
