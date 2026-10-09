/**
 * 全站内容与素材索引。
 * 想改文字、换照片顺序，只改这个文件就够了。
 *
 * ⚠️ orient 字段不是猜的：由 scripts/audit_photos.py 打印的真实宽高比逐一核对过
 *    （58 张的实测尺寸见 .shots/photo-sizes.json）。改图之后请重跑那个脚本再回来改这里。
 *    caption 同样是对着 .shots/contact-*.png 一张张看过后写的。
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
    label: "江与城",
    en: "Rivers",
    note: "桥、江，和对岸的天际线。",
  },
  {
    key: "arch",
    label: "砖与瓦",
    en: "Old Stones",
    note: "匾额、木门、戏台——你能在门口站十分钟。",
  },
  {
    key: "hall",
    label: "馆与洞",
    en: "Halls",
    note: "天窗、水晶灯，和洞里漏下来的一束光。",
  },
  {
    key: "sword",
    label: "仗剑",
    en: "Sword",
    note: "那天你换了两身衣服，剑举了一下午。",
  },
  {
    key: "us",
    label: "我们",
    en: "Us",
    note: "羊驼、奶茶，和没打完的那局游戏。",
  },
];

/**
 * orient: "p" 竖构图 / "l" 横构图 —— 画廊按不同比例排版（实测值，勿凭印象改）
 */
export const PHOTOS = [
  // ---------- 江与城 ----------
  { slug: "river-01-xiangjiang", group: "river", orient: "p", hero: true,
    caption: "湘江边，白鹭雕塑前比了个耶。那天天是灰的，风很软。" },
  { slug: "river-02-xiangjiang2", group: "river", orient: "p",
    caption: "同一个位置，你换了个手势——但我更喜欢这一张。" },
  { slug: "river-03-four", group: "river", orient: "l", hero: true,
    caption: "四个人在栏杆前站成一排，背后是整条江。" },
  { slug: "river-04-skyline", group: "river", orient: "l",
    caption: "江对岸是这座城市的天际线。你说那座斜拉桥看着比照片里长。" },
  { slug: "river-05-mao", group: "river", orient: "p",
    caption: "橘子洲头，雕像底下。你说这尊像比照片里大得多。" },
  { slug: "river-06-selfie", group: "river", orient: "p",
    caption: "和雕像的合影。它比我们加起来还高。" },
  { slug: "river-07-night", group: "river", orient: "l",
    caption: "十月四号的夜，这座石牌坊被灯照得发白，你在台阶上站了很久。" },
  { slug: "river-08-nightwalk", group: "river", orient: "l",
    caption: "夜深了，路上只剩灯光、树影和我们。" },

  // ---------- 砖与瓦 ----------
  { slug: "arch-01-temple", group: "arch", orient: "l", hero: true,
    caption: "屈子祠的门楼。匾额上三个字，你在门口站了一会儿才走进去。" },
  { slug: "arch-02-door", group: "arch", orient: "l",
    caption: "进了门是深色的格窗和木柱。你站得笔直，像来上课。" },
  { slug: "arch-03-window", group: "arch", orient: "l",
    caption: "同一扇窗，换了个角度。你说这块木头的纹路有意思。" },
  { slug: "arch-04-court", group: "arch", orient: "l",
    caption: "还是这面墙——第三张了，你终于肯挪一步。" },
  { slug: "arch-05-sign", group: "arch", orient: "l",
    caption: "木匾前，你伸手比了个「就是这儿」。" },
  { slug: "arch-06-relief", group: "arch", orient: "l",
    caption: "浮雕墙很长，你站在前面显得很小。" },
  { slug: "arch-07-relief2", group: "arch", orient: "l",
    caption: "换了个角度，把整面墙都收进去了。" },
  { slug: "arch-08-stage", group: "arch", orient: "l",
    caption: "老戏台，红漆栏杆还亮着。你上台先看了一圈墙上的画。" },
  { slug: "arch-09-stage2", group: "arch", orient: "l",
    caption: "你伸手比了比这台子有多宽——大概七步。" },
  { slug: "arch-10-exhibit", group: "arch", orient: "p",
    caption: "一堵写着城墙专题的展墙，你靠上去歇了会儿。" },
  { slug: "arch-11-exhibit2", group: "arch", orient: "p",
    caption: "换了个站法，还是靠着那堵墙。" },
  { slug: "arch-12-gate", group: "arch", orient: "p",
    caption: "祠堂门口摆了张红供桌。你从下往上拍了张仰角的自拍。" },
  { slug: "arch-13-pool", group: "arch", orient: "l",
    caption: "水池边，你说这栋楼像一整块镜子，把天也装了进去。" },

  // ---------- 馆与洞 ----------
  { slug: "hall-01-flower", group: "hall", orient: "l",
    caption: "花墙底下有把粉色的伞。你站在下面显得很严肃。" },
  { slug: "hall-02-flower2", group: "hall", orient: "l",
    caption: "同款，再来一张。" },
  { slug: "hall-03-balloon", group: "hall", orient: "l",
    caption: "一整面砖墙上画着只旧热气球，你端着杯绿色的东西站在旁边。" },
  { slug: "hall-04-balloon2", group: "hall", orient: "l",
    caption: "还是那只热气球。这回你总算把杯子举起来了。" },
  { slug: "hall-05-dome", group: "hall", orient: "l",
    caption: "螺旋形的天窗。你站在正中，像一根钉子。" },
  { slug: "hall-06-dome2", group: "hall", orient: "l",
    caption: "同一扇天窗，你终于抬头看了一眼。" },
  { slug: "hall-07-chandelier", group: "hall", orient: "l",
    caption: "那么长的水晶灯从顶上垂下来，你举着手机和它合了张影。" },
  { slug: "hall-08-frame", group: "hall", orient: "l",
    caption: "你说这个展签写得比画好看。" },
  { slug: "hall-09-arch", group: "hall", orient: "l",
    caption: "洞门的形状像一道拱，你张开手量了量。" },
  { slug: "hall-10-buddha", group: "hall", orient: "l",
    caption: "洞里有一尊小金佛，你凑近看了很久。" },
  { slug: "hall-11-stairs", group: "hall", orient: "l",
    caption: "扶梯口，你在等我们跟上来。" },
  { slug: "hall-12-cave", group: "hall", orient: "l", hero: true,
    caption: "溶洞的隧道，一束光从头顶打下来。你走在最前面。" },
  { slug: "hall-13-corn", group: "hall", orient: "l",
    caption: "壁画前，你一本正经地和一根玉米合影。" },
  { slug: "hall-14-corn2", group: "hall", orient: "l",
    caption: "旁边还有个青椒，你说两个都要拍。" },
  { slug: "hall-15-graffiti", group: "hall", orient: "l",
    caption: "涂鸦墙前，你旁边那只卡通人物比你上镜。" },
  { slug: "hall-16-mascot", group: "hall", orient: "p",
    caption: "广场上有只巨大的公仔，你从它背后探出个头——底座上写着「我爱合肥」。" },

  // ---------- 仗剑 ----------
  { slug: "sword-01-white", group: "sword", orient: "p", hero: true,
    caption: "换上白袍的第一张，剑还没举稳。" },
  { slug: "sword-02-white2", group: "sword", orient: "p",
    caption: "大屏幕前，你握着剑柄，表情很认真。" },
  { slug: "sword-03-duel", group: "sword", orient: "p",
    caption: "两个人对站着，像要开场。" },
  { slug: "sword-04-duel2", group: "sword", orient: "p",
    caption: "剑尖对上了。旁边的人在笑。" },
  { slug: "sword-05-black", group: "sword", orient: "p",
    caption: "换了一身黑底绣花的，站姿立刻不一样了。" },
  { slug: "sword-06-light", group: "sword", orient: "p",
    caption: "这一张的光刚好落在剑身上。" },
  { slug: "sword-07-gesture", group: "sword", orient: "p",
    caption: "你比了个手势——不像武侠，像你自己。" },
  { slug: "sword-08-last", group: "sword", orient: "p",
    caption: "收工前最后一张，剑还举着。" },

  // ---------- 我们 ----------
  { slug: "us-01-pinkwall", group: "us", orient: "l",
    caption: "粉墙前，你和一只粉红色的熊站在一起。" },
  { slug: "us-02-changsha", group: "us", orient: "l",
    caption: "粉墙上两个大字：长沙。你在旁边显得很白。" },
  { slug: "us-03-shop", group: "us", orient: "l",
    caption: "店门口的招牌是「躺平鸭」，你在一只粉色玩偶旁边站住了。" },
  { slug: "us-04-shop2", group: "us", orient: "l",
    caption: "店员说可以合影，你立刻在它旁边坐下。" },
  { slug: "us-05-esports", group: "us", orient: "l",
    caption: "电竞酒店，床还没收拾你就先去开电脑。" },
  { slug: "us-06-esports2", group: "us", orient: "l",
    caption: "两张床，三台机器，和一夜没睡的我们。" },
  { slug: "us-07-tickets", group: "us", orient: "p",
    caption: "几张票攥在手里。你说这次一定要看到最后。" },
  { slug: "us-08-milktea", group: "us", orient: "p",
    caption: "两杯奶茶，你的是少糖。" },
  { slug: "us-09-bench", group: "us", orient: "p",
    caption: "陪你坐在这张长椅上——「如果不能一夜暴富」。" },
  { slug: "us-10-bench2", group: "us", orient: "l",
    caption: "然后我们都很认真地想了一下这件事。" },
  { slug: "us-11-grass", group: "us", orient: "l", hero: true,
    caption: "草原上，三个人加一只羊驼。它比我们都上镜。" },
  { slug: "us-12-grass2", group: "us", orient: "l",
    caption: "羊驼闭着眼，我们睁着眼。" },
  { slug: "us-13-grass3", group: "us", orient: "l",
    caption: "那天的天蓝得很不讲道理。" },
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
    "这五十八张，是四趟出门攒下来的：湘江边的江与城，几座老院子和老戏台，去年国庆那一身汉服，还有今年夏天草原上那只羊驼。",
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
  lead: "四趟出门，五十八张。按地方分成五组，点进去可以一张张看。",
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
