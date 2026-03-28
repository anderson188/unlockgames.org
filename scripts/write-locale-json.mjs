import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18n = path.join(__dirname, '..', 'i18n');

const soloBody =
  '<p class="article-lead">社交平台上的独行旅拍要么是精修大片，要么是警示故事。真实旅途常常在中间：你会错过一班车、在咖啡馆里翻书躲雨，也会偶尔想「要是有人一起分甜点就好了」。这种平常感不是失败，而是你真的「在场」。</p>' +
  '<h2>放下「给观众看」的压力</h2><p>最难的往往不是孤独，而是觉得自己必须<strong>证明</strong>这趟旅行值得。你不必向陌生人交 curated 版本。若你想用一下午洗衣、回邮件，只为明天能走长路，那也算旅行。</p>' +
  '<h2>一个人吃饭，不演剧本</h2><p>吧台位、集市小吃、面包店都是独行友好选择。第一次独自吃正餐可能别扭；午餐套餐或轻食小盘通常更轻松。带书或不带都可以，有时望着窗外发呆就是目的。</p>' +
  '<h2>安全：习惯比焦虑有用</h2><p>把大致行程告诉一位信任的人；住宿周边离线地图先下好；用车与公交 App 提前装好。相信直觉避开可疑场景，但别把「陌生」等同于「危险」——多数日子平淡而顺利。</p>' +
  '<h2>小仪式稳住节奏</h2><p>没人帮你切段节奏时，小事很管用：第一天同样的咖啡、放下行李后散步十分钟、只为自己拍一张照片。它们提醒你这趟旅程属于你，而不是镜头前的观众。</p>' +
  '<h2>想社交也可以</h2><p>一日游、烹饪课、青旅公区都是为了「可进可出」的陪伴。独行不等于隔绝。若住几天，可在 <a href="https://www.hotels.com" target="_blank" rel="nofollow noopener">Hotels.com</a> 用地图模式选步行友好区域，更容易在需要时遇见人群。</p>' +
  '<p>当你不再把独行当成表演，它就会像换了个邮编的日常生活：有好时光、有无聊时刻，也偶尔有多年后仍会讲的故事。这样就够了。</p>';

const budgetBody =
  '<p class="article-lead">预算旅行攻略常像在挑战极限：睡过道、只吃便利店、绝不打车。短期也许可行，对期待已久的旅程却容易心生怨气。目标不是账单最小，而是把钱花在在乎的地方、跳过无感消费——像计划而不是惩罚。</p>' +
  '<h2>时间比优惠券更值钱</h2><p>行程前后挪一两天，往往胜过海量折扣码。周中航班与 shoulder season 是老生常谈，因为它们真的有效。能弹性就早点设票价提醒，别在出发前两周才恐慌下单。</p>' +
  '<h2>「一项舍得花」规则</h2><p>每趟旅程指定一件不将就的事：更好的房间、一顿想吃的晚餐、一个真正想参加的导览。其余可以刻意省，但不会陷入全面剥夺感。知道快乐预算花在哪，别处说「不」更容易。</p>' +
  '<h2>步行日是免费内容</h2><p>整座城市靠步行或一日通票就能打开：公园、街区、建筑与人潮都是零票价，常常胜过为打卡而买的景点。在高消费日之间插一天低花费，脚力和钱包一起回血。</p>' +
  '<h2>城市通票要做算术</h2><p>把 72 小时内真的会去的馆与交通全价相加；通票若在 10% 以内，便利可能仍值得。若只为「可能去」而多付一倍，多半会后悔。表格不浪漫，但比闸机前的懊恼诚实。</p>' +
  '<h2>超市早餐不是降级</h2><p>市集早餐 + 外带咖啡，往往能换一张更好的午餐票或演出票。不是吃苦，而是把不在乎的餐次换成在乎的体验。很多旅行高光其实发生在长椅上的面包与奶酪。</p>' +
  '<p>需要订房时，把「可步行」与「弹性日期」叠在一起，往往比豪华大堂更重要。可在 <a href="https://www.hotels.com" target="_blank" rel="nofollow noopener">Hotels.com</a> 打开地图视图，别为了每晚省一点却全花在意外打车上。</p>' +
  '<p>让你仍觉得「像在旅行」的预算法，多半是诚实数学加上一两项坚决不后悔的选择；其余都可以谈判。</p>';

const roadBody =
  '<p class="article-lead">广告里的公路旅行永远阳光顺遂。现实会有施工、信号断续，以及「大家都饿但下一站还要四十分钟」的魔法时刻。为光鲜版本打包没问题；为狼狈中段准备，才保得住心情与关系。</p>' +
  '<h2>纸质备份仍然可靠</h2><p>手机离线地图必备；最后几十公里打印地图或手写方向，在没电或改道时救场。放在手套箱而不是后备箱。</p>' +
  '<h2>零食要有策略</h2><p>坚果、奶酪、肉干等缓释能量搭配偶尔的新鲜水果；只糖只咖啡会让下午情绪失控。小保温瓶装水，比每站买贵水更稳情绪——补水也是隐形的心情管理。</p>' +
  '<h2>舒适不是摆拍</h2><p>真的贴合座椅的颈枕、湿路防眩的墨镜、应对「半边晒半边空调」的薄外套。轮流开车的人每次重新调座椅，腰椎会在十年后感谢你。</p>' +
  '<h2>无聊安全三件套</h2><p>亮色背心或外套、基础急救包、手电与新电池。允许的话备跳线或小型启动电源；出发前检查备胎。都不好玩，但比需要时什么都没有好玩一点。</p>' +
  '<h2>别硬撑「快到了」</h2><p>眼皮发沉或语气变冲时，观景台可以等。路边小睡二十分钟或下高速吃饭，胜过为赶入住而冒险。多数酒店习惯晚到；若需推迟入住，可在 <a href="https://www.hotels.com" target="_blank" rel="nofollow noopener">Hotels.com</a> App 里查看联系方式。</p>' +
  '<p>奖励那些为摩擦做了准备的人：一点食物、一张纸图，以及在该停就停时的谦卑。风景才应该是主角。</p>';

const zh = {
  meta: {
    title: 'unLockGames - 品牌故事与购物指南',
    description:
      'unLockGames：品牌故事、选购指南、优惠与返现，150+ 篇文章，并内置 AI 助手在线答疑。省时省心，理性剁手。',
    ogTitle: 'unLockGames - 品牌故事与购物指南',
    ogDescription: '品牌故事、选购指南与优惠，加上 AI 助手与 150+ 篇指南。'
  },
  metaSearch: {
    title: '搜索 - unLockGames',
    description: '在 unLockGames 搜索文章：选购指南、优惠与返现技巧。'
  },
  ui: {
    langAria: '选择语言',
    searchPlaceholder: '搜索文章…',
    searchAria: '搜索',
    searchButton: '搜索',
    loginBtn: '登录',
    registerBtn: '注册',
    loginTitle: '登录',
    closeAria: '关闭',
    labelEmail: '邮箱',
    labelPassword: '密码',
    rememberMe: '记住我',
    loginSubmit: '登录',
    loginWelcome: '欢迎回来！',
    registerTitle: '注册',
    labelName: '姓名',
    labelRegEmail: '邮箱',
    labelRegPass: '密码',
    labelRegPass2: '确认密码',
    regTerms:
      '我同意 <a href="terms.html">服务条款</a> 与 <a href="privacy.html">隐私政策</a>',
    createAccount: '创建账户',
    regSuccess: '账户已创建！现在可以登录。',
    navHome: '首页',
    navElectronics: '电子与科技',
    navFashion: '时尚与美妆',
    navSportFashion: '运动时尚',
    navShopping: '购物与零售',
    navTravel: '旅行',
    weatherOptionsAria: '选项',
    weatherForecastBtn: '查看完整预报',
    clockHours: '时',
    clockMinutes: '分',
    clockSeconds: '秒',
    clockFullscreenTitle: '全屏',
    clockCloseFsAria: '关闭全屏',
    askAiQuickPh: '问 AI…',
    askAiSendAria: '发送',
    askAiFabAria: '打开完整对话',
    askAiExpand: '展开',
    askAiTitle: 'AI 助手',
    askAiMaxTitle: '展开',
    askAiCloseAria: '关闭',
    askAiTypePh: '输入你的问题…',
    sendBtn: '发送',
    sidebarLatest: '最新文章',
    sidebarMore: '更多 »',
    moduleElectronics: '电子与科技',
    moduleFashion: '时尚与美妆',
    moduleSportFashion: '运动时尚',
    moduleTravel: '旅行',
    moduleShopping: '购物与零售',
    moduleMore: '更多 »',
    categoriesTitle: '分类',
    categoriesIntro: '按主题浏览指南与优惠。',
    catElecName: '电子与科技',
    catElecDesc: '笔记本、手机与配件',
    catFashionName: '时尚与美妆',
    catFashionDesc: '穿搭与护肤指南',
    catSportName: '运动时尚',
    catSportDesc: '运动服饰与搭配',
    catShopName: '购物与零售',
    catShopDesc: '门店、会员与技巧',
    catTravelName: '旅行',
    catTravelDesc: '机票、酒店与行程',
    catHomeName: '家居与园艺',
    catHomeDesc: '家装与动手改造',
    catBeautyName: '美妆护肤',
    catBeautyDesc: '流程与好物推荐',
    catHotelsName: '酒店与航班',
    catHotelsDesc: '预订与积分',
    footerHome: '首页',
    footerElectronics: '电子',
    footerFashion: '时尚',
    footerSportFashion: '运动时尚',
    footerShopping: '购物',
    footerTravel: '旅行',
    footerAbout: '关于我们',
    footerPrivacy: '隐私',
    footerDisclosure:
      '<strong>披露：</strong>通过本站链接购物我们可能获得佣金，无需您额外付费。<a href="privacy.html">隐私</a> | <a href="terms.html">条款</a>',
    srMainHeading: 'unLockGames - 品牌故事与购物指南',
    articleBodyEnglishNote: '正文暂为英文；界面已切换为中文。完整译文将陆续上线。',
    navHomeBlog: '首页',
    footerDisclosureBottom: '© 2025 unLockGames. 保留所有权利。',
    searchPageH1: '搜索',
    searchResultsHeading: '搜索结果'
  },
  articles: {
    'blog-travel-solo-without-performance.html': {
      title: '独行旅行，不必演给别人看：在路上与自己和解',
      description: '不为精修朋友圈而旅行：独自用餐、安全习惯与小仪式，让路途更真实。',
      bodyHtml:
        '<h1>独行旅行，不必演给别人看：在路上与自己和解</h1><p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">2026-03-29</p><div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&amp;h=400&amp;fit=crop" alt="" style="width:100%;height:auto;display:block;" width="800" height="400" loading="eager"></div>' +
        soloBody
    },
    'blog-travel-budget-without-misery.html': {
      title: '拉长旅行预算，但别把自己逼成苦行僧',
      description: '错峰、一项舍得花、步行日与通票算术，让省钱仍然像度假。',
      bodyHtml:
        '<h1>拉长旅行预算，但别把自己逼成苦行僧</h1><p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">2026-03-29</p><div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&amp;h=400&amp;fit=crop" alt="" style="width:100%;height:auto;display:block;" width="800" height="400" loading="eager"></div>' +
        budgetBody
    },
    'blog-travel-road-trip-carry-list.html': {
      title: '长途自驾重置清单：当计划真的跑偏时',
      description: '纸质备份、零食策略、舒适与安全小物，以及何时该停车的诚实建议。',
      bodyHtml:
        '<h1>长途自驾重置清单：当计划真的跑偏时</h1><p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">2026-03-29</p><div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&amp;h=400&amp;fit=crop" alt="" style="width:100%;height:auto;display:block;" width="800" height="400" loading="eager"></div>' +
        roadBody
    }
  }
};

fs.mkdirSync(i18n, { recursive: true });
fs.writeFileSync(path.join(i18n, 'zh.json'), JSON.stringify(zh), 'utf8');
console.log('Wrote zh.json');
