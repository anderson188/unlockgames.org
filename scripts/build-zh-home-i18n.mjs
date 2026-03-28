/**
 * Builds i18n/zh-home.json from index.html hrefs + manual zh strings.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

/** @type {Record<string, { title: string, excerpt?: string }>} */
const zh = {
  'blogs/topic-xcaret.html': { title: 'Hotel Xcaret 主题中心（2026）' },
  'blogs/blog-xcaret-1.html': {
    title: 'Hotel Xcaret 墨西哥：2026 年全乐趣一价全包值得吗？',
    excerpt: '面向家庭与情侣的实用指南：何时省钱、何时不划算。'
  },
  'blogs/blog-xcaret-2.html': { title: 'Hotel Xcaret Arte 对比 Hotel Xcaret Mexico：该订哪一家？' },
  'blogs/blog-xcaret-3.html': { title: '预订 Hotel Xcaret 前要避免的 5 个错误' },
  'blogs/blog-booking-1.html': { title: '如何比较酒店并完成预订' },
  'blogs/blog-flightcentre-2.html': { title: '套餐行程详解' },
  'blogs/blog-orbitz-3.html': { title: 'Orbitz 奖励计划与竞品对比' },
  'blogs/blog-flightcentre-1.html': { title: '旅行社预订 vs 自己订' },
  'blogs/blog-orbitz-2.html': { title: '打包预订（机+酒）说明' },
  'blogs/blog-alamo-3.html': { title: 'Alamo Insiders 会员计划' },
  'blogs/blog-orbitz-1.html': { title: 'Orbucks 奖励指南' },
  'blogs/blog-priceline-3.html': { title: 'Priceline VIP 奖励' },
  'blogs/blog-alamo-2.html': { title: '机场取车 vs 市区取车' },
  'blogs/blog-alamo-1.html': { title: '租车无限里程：要注意什么' },
  'blogs/blog-priceline-2.html': { title: 'Express Deals 详解' },
  'blogs/blog-acer-1.html': {
    title: '游戏本选购：真正重要的参数',
    excerpt: '买游戏本看什么？避免为噱头多付钱。'
  },
  'blogs/blog-samsung-1.html': {
    title: '2025 最佳智能手机',
    excerpt: '诚实选购指南：功能、续航与性价比。'
  },
  'blogs/blog-newegg-1.html': {
    title: '从零装机：新手完整配件指南',
    excerpt: '分步选件，控制预算并避免兼容性问题。'
  },
  'blogs/blog-woot-1.html': { title: '买翻新电子产品前必须知道的事' },
  'blogs/blog-govee-2.html': { title: '智能照明：灯带 vs 灯泡' },
  'blogs/blog-govee-1.html': { title: '2025 十大 LED 灯带推荐' },
  'blogs/blog-newegg-2.html': { title: '显示器选购：分辨率、刷新率与面板' },
  'blogs/blog-bestbuy-1.html': { title: '数码选购：如何避免买贵' },
  'blogs/blog-samsung-2.html': { title: '三星 Galaxy vs iPhone：哪个更贴合你的预算？' },
  'blogs/blog-amazon-1.html': { title: 'Amazon Prime：2025 年还值得吗？' },
  'blogs/blog-acer-2.html': { title: '800 美元以下能打的入门游戏本' },
  'blogs/blog-bestbuy-2.html': { title: '什么时候买数码最划算：全年节奏' },
  'blogs/blog-nike-1.html': {
    title: '2025 篮球鞋性能指南',
    excerpt: '好篮球鞋看什么？抓地、缓震与支撑。'
  },
  'blogs/blog-adidas-1.html': {
    title: '2025 十大跑步鞋推荐',
    excerpt: '缓震、合脚与性价比一次讲清。'
  },
  'blogs/blog-sephora-1.html': {
    title: '美妆会员计划：哪家更划算？',
    excerpt: '对比积分、权益与兑换，让每一笔美妆支出更值。'
  },
  'blogs/blog-farfetch-2.html': { title: '2025 值得关注的街头潮流品牌' },
  'blogs/blog-sephora-2.html': { title: '平价护肤流程：哪些步骤真的有用' },
  'blogs/blog-farfetch-1.html': { title: '奢侈品网购：真伪与折扣' },
  'blogs/blog-nike-2.html': { title: '训练鞋 vs 跑鞋：核心区别' },
  'blogs/blog-nordstrom-2.html': { title: '设计师手袋：买全新还是二手' },
  'blogs/blog-nordstrom-1.html': { title: 'Nordstrom 周年庆：什么值得抢' },
  'blogs/blog-adidas-2.html': { title: '健身房与 CrossFit 训练鞋推荐' },
  'blogs/blog-shein-1.html': { title: '平价时装：哪里买更聪明' },
  'blogs/blog-shein-2.html': { title: '快时尚尺码与质量：真实预期' },
  'blogs/blog-sport-fashion-running-shoes-2026.html': {
    title: '按步态与路面选跑鞋（2026 指南）',
    excerpt: '公路、田径场或越野——别只看鞋盒上的标签。'
  },
  'blogs/blog-sport-fashion-training-vs-running.html': {
    title: '训练鞋 vs 跑鞋：该买哪种',
    excerpt: '侧向支撑 vs 向前缓震——轮换里怎么配。'
  },
  'blogs/blog-sport-fashion-athleisure-basics.html': {
    title: '运动休闲基础款：8 件全球通用单品',
    excerpt: '旅行、训练与日常都能搭的中性胶囊衣橱。'
  },
  'blogs/blog-sport-fashion-read-product-pages.html': { title: '如何读懂运动服饰商品页' },
  'blogs/blog-sport-fashion-sneaker-sizing.html': { title: '跨国球鞋尺码：美英欧厘米对照' },
  'blogs/blog-sport-fashion-sales-cycles.html': { title: '运动装备何时打折：促销周期' },
  'blogs/blog-tripadvisor-1.html': {
    title: '如何读旅行评价：分辨真实反馈',
    excerpt: '不是所有评论都同等重要，学会区分信号与噪音。'
  },
  'blogs/blog-expedia-1.html': {
    title: '机酒打包：什么时候比分开订更省',
    excerpt: '机票、酒店、租车组合何时真省钱。'
  },
  'blogs/blog-hotels-1.html': {
    title: '酒店积分计划：哪家真的好用',
    excerpt: '主流集团对比，省心攒分与兑换。'
  },
  'blogs/blog-xcaret-4.html': { title: '带娃住 Hotel Xcaret：家庭行前清单' },
  'blogs/blog-xcaret-5.html': { title: '4 晚 Hotel Xcaret 新手行程' },
  'blogs/blog-xcaret-6.html': { title: 'Hotel Xcaret 预算拆解：总价由什么决定' },
  'blogs/blog-xcaret-7.html': { title: 'Hotel Xcaret 机场接送注意事项' },
  'blogs/blog-xcaret-8.html': { title: 'Hotel Xcaret 取消政策核对清单' },
  'blogs/blog-hotels-2.html': { title: '经济型 vs 中档酒店：差在哪里' },
  'blogs/blog-ihg-1.html': { title: 'IHG One Rewards 2025' },
  'blogs/blog-marriott-1.html': { title: '万豪旅享家精英会籍' },
  'blogs/blog-tripadvisor-2.html': { title: '用评价规划行程的方法' },
  'blogs/blog-avis-1.html': { title: '租车隐藏费用：如何避开' },
  'blogs/blog-expedia-2.html': { title: '临时出行：该立刻订还是再等等' },
  'blogs/blog-priceline-1.html': { title: 'Name Your Price：规则与适用场景' },
  'blogs/blog-target-1.html': {
    title: 'Target Circle：如何把奖励用满',
    excerpt: '叠加优惠与返现，让日常采购更省。'
  },
  'blogs/blog-walmart-1.html': {
    title: '超市省钱技巧：每次采购都能少花一点',
    excerpt: '不牺牲品质的前提下压缩账单。'
  },
  'blogs/blog-macys-1.html': {
    title: '百货促销节奏：什么时候下手最划算',
    excerpt: '选对时机，再叠会员与返利。'
  },
  'blogs/blog-macys-2.html': { title: "Macy's Star Rewards：积分与促销最大化" },
  'blogs/blog-walmart-2.html': { title: 'Walmart+ 对比 Amazon Prime：谁更省' },
  'blogs/blog-ebay-2.html': { title: 'eBay Best Offer：议价技巧' },
  'blogs/blog-ebay-1.html': { title: '买二手电子产品：红旗清单' },
  'blogs/blog-homedepot-1.html': { title: '家装 DIY：工具到底要买哪些' },
  'blogs/blog-homedepot-2.html': { title: '电动工具品牌：专业级 vs 家用级' },
  'blogs/blog-kohls-1.html': { title: "Kohl's Cash：怎么用最划算" },
  'blogs/blog-target-2.html': { title: 'Target 当日达：实用技巧' },
  'blogs/blog-kohls-2.html': { title: "Kohl's 黑五：真正打折的是什么" }
};

const re = /href="(blogs\/[^"]+\.html)"/g;
let m;
const seen = new Set();
while ((m = re.exec(html)) !== null) {
  seen.add(m[1]);
}

const homeCards = {};
for (const href of seen) {
  if (href.indexOf('category-') !== -1) continue;
  if (zh[href]) homeCards[href] = zh[href];
}

const i18nDir = path.join(root, 'i18n');
fs.mkdirSync(i18nDir, { recursive: true });
const out = { homeCards };
fs.writeFileSync(path.join(i18nDir, 'zh-home.json'), JSON.stringify(out, null, 0), 'utf8');
console.log('Wrote zh-home.json keys:', Object.keys(homeCards).length);
