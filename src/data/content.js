/**
 * 全站内容与素材索引。
 * 想改文字、换照片顺序，只改这个文件就够了。
 *
 * ⚠️ 地名不是猜的：
 *   - 「屈子祠 / 湖南大学 岳麓书院 / 西园北里 / 古开福寺 / 张辽威震逍遥津 /
 *      南京城墙专题展 / 梵木艺术中心 / 西长街 / 三国故地 逍遥津」
 *     这些是放大照片看匾额、招牌、收据原文确认的（见 .shots/ 下的 z-*.png）。
 *   - 其余地名由拍摄日期聚类得到（同一趟行程的 EXIF 时间戳相邻），
 *     并与需求方口述的地点清单核对过。
 * ⚠️ orient 字段是实测宽高比（.shots/photo-sizes.json），改图后请重跑
 *    scripts/audit_photos.py 再回来核对。
 *
 * 分组按「真实地点」：长沙（江 / 岳麓书院 / 寺与街 / 书店与展）、合肥、重庆武隆。
 */

const BASE = import.meta.env.BASE_URL || "/";

/** 拼接带 base 前缀的资源路径，保证部署到 GitHub Pages 子路径也能取到图 */
export const asset = (p) =>
  `${BASE.replace(/\/$/, "")}/${String(p).replace(/^\//, "")}`;

export const PROFILE = {
  name: "扶摇直上",
  short: "扶摇",
  birthday: "2006.07.19", // 出生的那天
  sentOn: "2026.10", // 这份礼物送出的时间
  age: 20,
  motto: "抟扶摇而上者九万里",
  mottoFrom: "《庄子 · 逍遥游》",
};

/* ------------------------------------------------------------------ */
/* 照片                                                                */
/* ------------------------------------------------------------------ */

/** 分组元信息：数组顺序即画廊与预览的展示顺序 */
export const GROUPS = [
  {
    key: "river",
    label: "长沙 · 江与城",
    en: "Xiang River",
    note: "湘江、橘子洲，和江对岸的天际线。",
  },
  {
    key: "yuelu",
    label: "长沙 · 岳麓书院",
    en: "Yuelu Academy",
    note: "屈子祠的门楼、深色的格窗——你站在门口看了很久。",
  },
  {
    key: "oldstreet",
    label: "长沙 · 寺与街",
    en: "Temple & Streets",
    note: "开福寺的红墙、西长街的涂鸦，和一面写着「长沙」的粉墙。",
  },
  {
    key: "bookstore",
    label: "长沙 · 书店与展",
    en: "Bookstore & Shows",
    note: "热气球壁画、罗盘似的天窗，和一个仿了岩洞的展厅。",
  },
  {
    key: "hefei",
    label: "合肥 · 逍遥津与仗剑",
    en: "Hefei",
    note: "张辽的浮雕墙、一身汉服，和一晚没睡的电竞酒店。",
  },
  {
    key: "wulong",
    label: "重庆武隆",
    en: "Wulong",
    note: "草原上的羊驼，和溶洞里漏下来的一束光。",
  },
];

/**
 * orient: "p" 竖构图 / "l" 横构图 —— 画廊按不同比例排版（实测值，勿凭印象改）
 */
export const PHOTOS = [
  // ---------- 长沙 · 江与城 ----------
  { slug: "river-01-xiangjiang", group: "river", orient: "p", hero: true,
    caption: "长沙湘江风光带，白鹭雕塑前比了个耶。背后是那座斜拉桥，天灰灰的，风很软。" },
  { slug: "river-02-xiangjiang2", group: "river", orient: "p",
    caption: "同一个位置，你换了个手势——但我更喜欢这一张。" },
  { slug: "river-03-four", group: "river", orient: "l", hero: true,
    caption: "四个人在江边栏杆前站成一排，背后是整条湘江。" },
  { slug: "river-04-skyline", group: "river", orient: "l",
    caption: "江对岸是长沙的天际线。你说那座斜拉桥看着比照片里长。" },
  { slug: "river-05-mao", group: "river", orient: "p",
    caption: "橘子洲头，毛泽东青年艺术雕塑底下。你说这尊像比照片里大得多。" },
  { slug: "river-06-selfie", group: "river", orient: "p",
    caption: "和雕像的合影。它比我们加起来还高。" },
  { slug: "river-07-night", group: "river", orient: "l",
    caption: "十月四号的夜，一座牌坊被灯照得发白，你在台阶上站了很久。" },
  { slug: "river-08-nightwalk", group: "river", orient: "l",
    caption: "夜深了，江边只剩灯光、树影和我们。" },

  // ---------- 长沙 · 岳麓书院 ----------
  { slug: "arch-01-temple", group: "yuelu", orient: "l", hero: true,
    caption: "岳麓书院里的屈子祠门楼。匾额上三个字，你在门口站了一会儿才走进去。" },
  { slug: "arch-02-door", group: "yuelu", orient: "l",
    caption: "进了门是深色的格窗和木柱，门边挂着「湖南大学 岳麓书院」的小牌子。" },
  { slug: "arch-03-window", group: "yuelu", orient: "l",
    caption: "同一排格窗，换了个角度。你说这块木头的纹路有意思。" },
  { slug: "arch-04-court", group: "yuelu", orient: "l",
    caption: "还是这面墙——第三张了，你终于肯挪一步。" },

  // ---------- 长沙 · 寺与街 ----------
  { slug: "arch-08-stage", group: "oldstreet", orient: "l", hero: true,
    caption: "开福寺。红墙上写着「古开福寺」四个金字，你从放生池的石桥上走过去。" },
  { slug: "arch-09-stage2", group: "oldstreet", orient: "l",
    caption: "还是那座石桥，满壁的「福」字当背景。" },
  { slug: "arch-05-sign", group: "oldstreet", orient: "l",
    caption: "西园北里。你伸手比了比墙上那方木匾，说这四个字刻得讲究。" },
  { slug: "hall-13-corn", group: "oldstreet", orient: "l",
    caption: "西长街，一整面蔬菜主题的墙绘，你一本正经地和一根玉米合影。" },
  { slug: "hall-14-corn2", group: "oldstreet", orient: "l",
    caption: "画面左边有条幅写着「西长街」——这条街你一定记住了。" },
  { slug: "hall-15-graffiti", group: "oldstreet", orient: "l",
    caption: "街尾的涂鸦墙，你旁边那只卡通人物比你上镜。" },
  { slug: "hall-01-flower", group: "oldstreet", orient: "l",
    caption: "一面花墙，底下一把粉色的伞。你站在下面显得很严肃。" },
  { slug: "hall-02-flower2", group: "oldstreet", orient: "l",
    caption: "同款，再来一张。" },
  { slug: "us-01-pinkwall", group: "oldstreet", orient: "l",
    caption: "长沙的粉墙前，你和一只粉红色的熊站在一起。" },
  { slug: "us-02-changsha", group: "oldstreet", orient: "l",
    caption: "墙上两个大字：长沙。你在旁边显得很白。" },
  { slug: "us-03-shop", group: "oldstreet", orient: "l",
    caption: "店门口的招牌是「躺平鸭」，你在一只粉色雕像旁边站住了。" },
  { slug: "us-04-shop2", group: "oldstreet", orient: "l",
    caption: "店员说可以合影，你立刻在它旁边坐下。" },

  // ---------- 长沙 · 书店与展 ----------
  { slug: "hall-03-balloon", group: "bookstore", orient: "l", hero: true,
    caption: "书店的砖墙上画着一只旧热气球，你端着杯绿色的东西站在旁边。" },
  { slug: "hall-04-balloon2", group: "bookstore", orient: "l",
    caption: "还是那只热气球。这回你总算把杯子举起来了。" },
  { slug: "hall-05-dome", group: "bookstore", orient: "l",
    caption: "中庭顶上那圈罗盘似的金属格栅。你站在正中，像一根钉子。" },
  { slug: "hall-06-dome2", group: "bookstore", orient: "l",
    caption: "同一圈格栅，你终于抬头看了一眼。" },
  { slug: "hall-07-chandelier", group: "bookstore", orient: "l",
    caption: "展厅里垂着一帘水晶灯，墙上刻着「相见如故」。你举着手机和它合了张影。" },
  { slug: "hall-08-frame", group: "bookstore", orient: "l",
    caption: "一幅装框的书法，贴着「46 号拍品」的签。你说这个展签写得比字好看。" },
  { slug: "hall-09-arch", group: "bookstore", orient: "l",
    caption: "展厅里仿了一段岩洞，你张开手量了量洞口。" },
  { slug: "hall-10-buddha", group: "bookstore", orient: "l",
    caption: "岩壁上凿出一格，里头一尊金佛。你凑近看了很久。" },
  { slug: "hall-11-stairs", group: "bookstore", orient: "l",
    caption: "书店的书架台阶，你在等我们跟上来。" },
  { slug: "arch-10-exhibit", group: "bookstore", orient: "p",
    caption: "一面写着「南京城墙专题展」的展墙，你靠上去歇了会儿。" },
  { slug: "arch-11-exhibit2", group: "bookstore", orient: "p",
    caption: "换了个站法，还是靠着那堵墙。" },

  // ---------- 合肥 · 逍遥津与仗剑 ----------
  { slug: "arch-06-relief", group: "hefei", orient: "l",
    caption: "逍遥津的浮雕墙上刻着「张辽威震逍遥津」。你在墙前站得笔直。" },
  { slug: "arch-07-relief2", group: "hefei", orient: "l",
    caption: "换了个角度，把整面浮雕都收进去了。" },
  { slug: "arch-12-gate", group: "hefei", orient: "p",
    caption: "张辽墓前。两个人仰头自拍，红供桌上摆着两个苹果。" },
  { slug: "hall-16-mascot", group: "hefei", orient: "p",
    caption: "逍遥津公园里，你钻进「三国故地」那只大公仔，手里还举着牌子。" },
  { slug: "arch-13-pool", group: "hefei", orient: "l",
    caption: "1972 文创园。梵木艺术中心的水池倒映着红砖楼和那座白色雕塑，你说像一整块镜子。" },
  { slug: "sword-01-white", group: "hefei", orient: "p", hero: true,
    caption: "换上白袍的第一张，剑还没举稳。" },
  { slug: "sword-02-white2", group: "hefei", orient: "p",
    caption: "大屏幕前，你握着剑柄，表情很认真。" },
  { slug: "sword-03-duel", group: "hefei", orient: "p",
    caption: "两个人对站着，像要开场。" },
  { slug: "sword-04-duel2", group: "hefei", orient: "p",
    caption: "剑尖对上了。旁边的人在笑。" },
  { slug: "sword-05-black", group: "hefei", orient: "p",
    caption: "换了一身黑底绣花的，站姿立刻不一样了。" },
  { slug: "sword-06-light", group: "hefei", orient: "p",
    caption: "这一张的光刚好落在剑身上。" },
  { slug: "sword-07-gesture", group: "hefei", orient: "p",
    caption: "你比了个手势——不像武侠，像你自己。" },
  { slug: "sword-08-last", group: "hefei", orient: "p",
    caption: "收工前最后一张，剑还举着。" },
  { slug: "us-05-esports", group: "hefei", orient: "l",
    caption: "合肥的电竞酒店，床还没收拾你就先去开电脑。" },
  { slug: "us-06-esports2", group: "hefei", orient: "l",
    caption: "两张床，三台机器，和一夜没睡的我们。" },
  { slug: "us-07-tickets", group: "hefei", orient: "p",
    caption: "一顿合肥的饭，账单攥在手里——单号 64，两个人吃到扶墙。" },
  { slug: "us-08-milktea", group: "hefei", orient: "p",
    caption: "合肥的卡夫卡奶茶，两杯，你的是少糖。" },
  { slug: "us-09-bench", group: "hefei", orient: "p",
    caption: "陪你坐在这张长椅上——「如果不能一夜暴富」。" },
  { slug: "us-10-bench2", group: "hefei", orient: "l",
    caption: "然后我们都很认真地想了一下这件事。" },

  // ---------- 重庆武隆 ----------
  { slug: "us-11-grass", group: "wulong", orient: "l", hero: true,
    caption: "武隆的草地上，三个人加一只羊驼。它比我们都上镜。" },
  { slug: "us-12-grass2", group: "wulong", orient: "l",
    caption: "羊驼闭着眼，我们睁着眼。" },
  { slug: "us-13-grass3", group: "wulong", orient: "l",
    caption: "那天的天蓝得很不讲道理。" },
  { slug: "hall-12-cave", group: "wulong", orient: "l", hero: true,
    caption: "武隆的溶洞里，一束光从头顶打下来。你走在最前面。" },
];

export const fullSrc = (photo) => asset(`photos/full/${photo.slug}.jpg`);
export const thumbSrc = (photo) => asset(`photos/thumb/${photo.slug}.jpg`);

export const photosByGroup = (key) =>
  key === "all" ? PHOTOS : PHOTOS.filter((p) => p.group === key);

/** 最能代表本人的几张——拖尾、页脚圆图、预览卡的候选池 */
export const HERO_PHOTOS = PHOTOS.filter((p) => p.hero);

/* ------------------------------------------------------------------ */
/* 各屏文案                                                            */
/* ------------------------------------------------------------------ */

export const SCREENS = [
  { key: "cover", label: "封面", en: "Cover" },
  { key: "about", label: "关于", en: "About" },
  { key: "moments", label: "走过", en: "Places" },
  { key: "letter", label: "生辰", en: "Birthday" },
];

/** 第二屏：关于 */
export const ABOUT = {
  title: ["关于", "扶摇"],
  en: "About Him",
  index: "01",
  paragraphs: [
    "认识你很多年了，久到已经不用刻意找话题。",
    "翻照片才发现，这五十八张里几乎每一张都有你——你是我拍得最多的人。",
    "你出门永远背着那个双肩包，里面装着水、充电宝，和一台电量永远在告急的手机。",
    "你不算健谈，但每次站在一座老建筑前面，你会突然讲很多——这块匾是哪一年立的，这个斗拱为什么非得这么做。别人看风景，你看的是风景是怎么被造出来的。",
    "这五十八张，是几趟出门攒下来的：长沙的湘江、岳麓书院和开福寺；国庆去合肥的那一趟——逍遥津、一身汉服，和一晚没睡的电竞酒店；还有今年夏天重庆武隆的草原与溶洞。",
    "二十岁。愿你像名字里那只鹏——风起来的时候，就往上走。",
  ],
  facts: [
    { k: "出生", v: "2006.07.19" },
    { k: "今年", v: "二十岁" },
    { k: "标配", v: "双肩包" },
    { k: "看什么", v: "老房子与天光" },
  ],
};

/** 第三屏：走过的地方 */
export const MOMENTS = {
  title: ["走过", "的地方"],
  en: "Places 2025–2026",
  index: "02",
  lead: "五十八张，按地方分成六组：长沙（江、岳麓书院、寺与街、书店与展）、合肥、重庆武隆。",
};

/** 第四屏：生辰 */
export const LETTER = {
  title: ["给", "二十岁"],
  en: "Twenty",
  index: "03",
  salutation: "扶摇：",
  body: [
    "你的生日是七月十九，这份礼物晚到了两个多月。",
    "不是忘了——是想做得像样一点，结果一拖就拖到了现在。好在二十岁这一年还长。",
    "愿你少一点犹豫，多一点想走就走。你要看的那些老房子，中国还有很多；想去的地方，趁早去。",
    "缺钱了别一个人扛，缺人陪着也别硬撑。",
    "剩下的路还长。慢慢走，别急——风来了，你自然会往上走。",
  ],
  signature: "—— 老朋友",
  // 孔明灯三态提示
  hintIdle: "点一下，把灯点亮。",
  hintLit: "心里想一句，然后放手。",
  release: "放 灯",
  wishTitle: "扶摇直上",
  wishBody:
    "—— 灯会一直往上飘，飘到看不见为止。\n就像你名字里的那只鹏。\n剩下的，等你自己飞上去看。",
};
