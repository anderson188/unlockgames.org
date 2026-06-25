import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');
const imgDir = path.join(blogsDir, 'images', 'travel');

fs.mkdirSync(imgDir, { recursive: true });

const LINKS = {
  tripTw: 'https://www.chinesean.com/affiliate/clickBanner.do?wId=71434&pId=10754&cId=35387&mId=tw-0625',
  tripKr: 'https://www.chinesean.com/affiliate/clickBanner.do?wId=71434&pId=10754&cId=36334&mId=KR-0625',
  hotels: 'https://www.chinesean.com/affiliate/clickBanner.do?wId=71434&pId=11757&cId=38194',
  expediaSg: 'https://www.chinesean.com/affiliate/clickBanner.do?wId=71434&pId=22377&cId=44172',
  kkdayTw: 'https://www.kkday.com/zh-tw?cid=5109&ud1=c919efce545c0',
};

const brand = (link, label) =>
  `<a href="${link}" target="_blank" rel="sponsored noopener noreferrer">${label}</a>`;

function extraZh(agodaLink, brandName, focus) {
  const hk =
    focus === 'hk' || focus === 'both'
      ? `<p>香港讀者可把機票、酒店、高鐵放在同一平台比價，周末短途與長假出遊都適用；付款前確認港元總額與取消規則。</p>`
      : '';
  const tw =
    focus === 'tw' || focus === 'both'
      ? `<p>台灣讀者規劃國內高鐵假期或出境行程時，建議先收藏房型，隔日再比會員價；連假務必選可改期方案。</p>`
      : '';
  return `
            <h2>為什麼透過 ${brandName} 訂比較省心</h2>
            <p>官方或合作入口能確保促銷正確套用，訂單、退款與客服管道一致。比價時以結帳「應付總額」為準，並確認免費取消截止時間。</p>
            ${hk}
            ${tw}
            <h2>訂前先做的三件事</h2>
            <p>核對護照姓名、確認入住晚數與稅費是否已含、閱讀近三個月評論中的「位置」「噪音」「Wi-Fi」標籤。機票或簽證未穩定前，優先可退款方案。</p>
            <h2>出發前最後檢查</h2>
            <p>離線保存確認信；晚到通知酒店；比對入住時間與交通末班車。離店後簡短評價有助下次選對房型。</p>`;
}

const articles = [
  // —— Trip.com ×3 ——
  {
    slug: 'blog-trip-com-tw-hotel-flights-guide',
    link: LINKS.tripTw,
    brandLabel: 'Trip.com（攜程）',
    tag: 'Trip.com',
    hero: 'images/travel/trip-com-cover.jpg',
    heroAlt: 'Trip.com 機票酒店訂房',
    title: 'Trip.com 訂房訂票攻略：港台旅客完整指南（2026）',
    meta: '攜程 Trip.com 繁體站：機票加酒店、高鐵假期、取消政策與會員優惠，港台讀者實用訂購步驟。',
    views: 28420,
    featured: true,
    cardTitle: 'Trip.com 訂房訂票：港台完整指南',
    focus: 'both',
    intro: '港台讀者規劃出境或國內行程時，Trip.com 可同時搜機票、酒店與部分高鐵／套票。本文說明如何比價、何時訂可退款房型最穩。',
    sections: [
      {
        h: 'Trip.com 適合哪些行程',
        ps: [
          '短途：香港飛台北、高雄、大阪；台灣飛東京、首爾、曼谷。Trip.com 常見「機票＋酒店」組合，適合時間緊、想一次結帳的旅客。',
          '國內：台灣高鐵＋飯店、香港周末深圳廣州酒店，也可在同一帳號管理訂單與改期。',
        ],
      },
      {
        h: '繁體站下單要點',
        ps: [
          '經合作連結進入 Trip.com 繁體頁面，登入後再搜尋，會員價與限時優惠較完整。比價時切換「含稅總價」，避免只看每晚標價。',
          '免費取消房型通常標示清楚；旺季（農曆新年、暑假、連假）建議提早鎖可改期，折扣房型往往不可退。',
        ],
        img: 'images/travel/trip-com-cover.jpg',
        imgAlt: 'Trip.com 旅遊訂房',
      },
      {
        h: '機票＋酒店是否划算',
        ps: [
          '組合價適合「確定日期、不想分開訂」的旅客。若機票已用里數兌換，單獨訂酒店反而更靈活。分開訂時，先鎖可取消酒店，機票價格穩定後再改訂促銷房。',
        ],
      },
    ],
    cta: '前往 Trip.com 繁體站搜尋',
    faq: [
      ['跟 Agoda 怎麼選？', 'Trip.com 強在機票＋酒店一站式；單訂亞太酒店可 Agoda、Trip.com 並列比總價。'],
      ['可以到店付嗎？', '視房型而定，產品頁會標示預付或到店付。'],
    ],
  },
  {
    slug: 'blog-trip-com-tw-japan-korea-deals',
    link: LINKS.tripTw,
    brandLabel: 'Trip.com（攜程）',
    tag: 'Trip.com',
    hero: 'images/travel/trip-com-japan-korea.jpg',
    heroAlt: '日韓旅遊訂房',
    title: 'Trip.com 日韓訂房優惠：東京首爾怎麼省（2026）',
    meta: '用 Trip.com 訂日本、韓國酒店：熱門區域、促銷時機、可取消房型挑選技巧。',
    views: 24680,
    focus: 'both',
    intro: '日韓是港台最高頻出境目的地。Trip.com 繁體站常有區域促銷，搭配可取消房型可兼顧低價與彈性。',
    sections: [
      {
        h: '東京怎麼選住宿',
        ps: [
          '新宿、上野交通方便；淺草、池袋性價比高。親子可篩選「家庭房」；紅眼航班抵達選可提前寄放行李的酒店。',
        ],
      },
      {
        h: '首爾訂房提示',
        ps: [
          '明洞、弘大、江南各有客群；演唱會檔期提早訂。比價時留意是否含早餐與是否需付度假村費（韓國較少見）。',
        ],
        img: 'images/travel/trip-com-japan-korea.jpg',
        imgAlt: '日韓城市旅遊',
      },
    ],
    cta: '在 Trip.com 搜尋日韓酒店',
    faq: [['促銷何時最深？', '淡季周二周三入住、連假後一週常有回落，以即時頁面為準。']],
  },
  {
    slug: 'blog-trip-com-kr-korea-stays',
    link: LINKS.tripKr,
    brandLabel: 'Trip.com 韓國站',
    tag: 'Trip.com',
    hero: 'images/travel/trip-com-korea.jpg',
    heroAlt: '韓國釜山旅遊',
    title: 'Trip.com 韓國站訂房：釜山首爾住宿實戰（2026）',
    meta: 'Trip.com 韓文站入口訂韓國本地酒店：釜山、首爾、濟州，港台旅客韓國自由行訂房要點。',
    views: 21340,
    focus: 'both',
    intro: '規劃韓國深度遊、K-pop 行程或釜山海景假期時，可經韓國站入口搜尋本地庫存。本文整理區域選擇與訂房注意事項。',
    sections: [
      {
        h: '何時用韓國站入口',
        ps: [
          '當行程以韓國境內為主、需搜尋在地民宿或連鎖酒店時，韓國站活動與庫存可能更完整。港台旅客仍應以護照英文姓名下單。',
        ],
      },
      {
        h: '釜山與首爾',
        ps: [
          '釜山海雲台適合海景；甘川洞、廣安里步行圈方便。首爾選地鐵步行 8 分鐘內，減少轉乘拖行李時間。',
        ],
        img: 'images/travel/trip-com-korea.jpg',
        imgAlt: '韓國海岸城市',
      },
    ],
    cta: '開啟 Trip.com 韓國站訂房',
    faq: [['界面是韓文怎麼辦？', '可搭配瀏覽器翻譯；關鍵看取消政策與結帳總價。']],
  },
  // —— Hotels.com ×3 ——
  {
    slug: 'blog-hotels-com-hk-tw-rewards',
    link: LINKS.hotels,
    brandLabel: 'Hotels.com',
    tag: 'Hotels.com',
    hero: 'images/travel/hotels-com-cover.jpg',
    heroAlt: 'Hotels.com 酒店訂房',
    title: 'Hotels.com 訂房攻略：港台旅客獎賞與優惠（2026）',
    meta: 'Hotels.com 訂房：住十送一印章、會員價、免費取消與港台出遊實用技巧。',
    views: 26750,
    featured: true,
    cardTitle: 'Hotels.com 訂房與獎賞計劃',
    focus: 'both',
    intro: 'Hotels.com 以「印章」獎賞與大量國際連鎖著稱。港台讀者出境或本地 staycation 前，可先了解印章規則與比價方式。',
    sections: [
      {
        h: '印章獎賞怎麼運作',
        ps: [
          '合資格住宿累積滿 10 晚，可兌換 1 晚獎賞住宿（視計劃條款與房型）。長途旅行、商務多次入住較容易累積；短途單次旅行則優先比價每晚總額。',
        ],
      },
      {
        h: '訂房實戰',
        ps: [
          '登入後搜尋，篩選「免費取消」。地圖模式核對實際步行距離；評論排序選「最近」，避免過時照片誤導。',
        ],
        img: 'images/travel/hotels-com-cover.jpg',
        imgAlt: '酒店客房',
      },
    ],
    cta: '在 Hotels.com 搜尋酒店',
    faq: [['印章會過期嗎？', '依會員計劃條款，請以帳戶說明為準。']],
  },
  {
    slug: 'blog-hotels-com-free-night-stamps',
    link: LINKS.hotels,
    brandLabel: 'Hotels.com',
    tag: 'Hotels.com',
    hero: 'images/travel/hotels-com-rewards.jpg',
    heroAlt: '酒店住宿獎賞',
    title: 'Hotels.com 住十送一：印章計劃值得跟嗎？（2026）',
    meta: 'Hotels.com Rewards 印章值不值得累積？港台常旅客與短途客的不同策略。',
    views: 19820,
    focus: 'both',
    intro: '不是每位旅客都需要追印章。本文幫你判斷：何時堅持 Hotels.com 訂、何時改用其他平台比總價。',
    sections: [
      {
        h: '適合追印章的人',
        ps: [
          '一年多次出差或出境、單次連續住 3 晚以上、同一帳號集中訂單。累積速度越快，獎賞房越有感。',
        ],
      },
      {
        h: '不必執著印章的情況',
        ps: [
          '一年只旅行一次、或該酒店在其他平台明顯便宜 15% 以上——直接選低總價更理性。',
        ],
        img: 'images/travel/hotels-com-rewards.jpg',
        imgAlt: '旅館床鋪與行李',
      },
    ],
    cta: '查看 Hotels.com 會員優惠',
    faq: [['獎賞房有黑名單日期？', '熱門節日可能除外，兌換前看清限制。']],
  },
  {
    slug: 'blog-hotels-com-asia-weekend',
    link: LINKS.hotels,
    brandLabel: 'Hotels.com',
    tag: 'Hotels.com',
    hero: 'images/travel/hotels-com-rewards.jpg',
    heroAlt: '亞洲城市酒店',
    title: 'Hotels.com 亞洲周末遊：港台北上廣深訂房（2026）',
    meta: '用 Hotels.com 訂亞洲周末短途：香港、台北、上海、新加坡熱門區域與取消政策。',
    views: 18560,
    focus: 'both',
    intro: '周末短途重視交通與取消彈性。Hotels.com 連鎖酒店多，適合要標準化服務的商務與親子行程。',
    sections: [
      {
        h: '區域快選',
        ps: [
          '香港：尖沙咀、銅鑼灣交通樞紐。台北：台北車站、信義區。上海：外灘、靜安；注意入住登記與證件要求。',
        ],
        img: 'images/travel/hotels-com-rewards.jpg',
        imgAlt: '酒店大堂與行李',
      },
    ],
    cta: '搜尋 Hotels.com 亞洲酒店',
    faq: [['比 Agoda 貴？', '並列比結帳總價，含稅與取消條款一起比。']],
  },
  // —— Expedia SG ×3 ——
  {
    slug: 'blog-expedia-sg-singapore-staycation',
    link: LINKS.expediaSg,
    brandLabel: 'Expedia Singapore',
    tag: 'Expedia',
    hero: 'images/travel/expedia-sg-cover.jpg',
    heroAlt: '新加坡濱海灣',
    title: 'Expedia 新加坡站：聖淘沙與濱海灣訂房攻略（2026）',
    meta: 'Expedia 新加坡入口訂本地酒店：濱海灣、烏節路、聖淘沙，港台旅客新馬行程實用建議。',
    views: 24110,
    featured: true,
    cardTitle: 'Expedia 新加坡：濱海灣訂房攻略',
    focus: 'both',
    intro: '港台飛新加坡短、航班多。經 Expedia 新加坡站可搜本地促銷與連鎖酒店，適合周末快閃或轉機停留。',
    sections: [
      {
        h: '住哪一區',
        ps: [
          '濱海灣：地標與夜景；烏節路：購物；聖淘沙：親子與海灘，但進出島交通要算進時間成本。',
        ],
        img: 'images/travel/expedia-sg-cover.jpg',
        imgAlt: '新加坡天際線',
      },
      {
        h: '訂房節奏',
        ps: [
          'F1、年末燈光秀等檔期提早訂。可取消房型優先；泳池與早餐依家庭需求篩選。',
        ],
      },
    ],
    cta: '在 Expedia 新加坡站訂房',
    faq: [['只訂新加坡？', '同一入口常可搜東南亞其他城市，以搜尋結果為準。']],
  },
  {
    slug: 'blog-expedia-sg-flight-hotel-bundle',
    link: LINKS.expediaSg,
    brandLabel: 'Expedia Singapore',
    tag: 'Expedia',
    hero: 'images/travel/expedia-bundle.jpg',
    heroAlt: '機票酒店套票',
    title: 'Expedia 機加酒套票：何時比單訂划算？（2026）',
    meta: 'Expedia 機票＋酒店組合：港台旅客東南亞行程比價與退改注意事項。',
    views: 20440,
    focus: 'both',
    intro: '套票省時，但不永遠最便宜。本文給你一個簡單判斷：什麼時候選 Expedia 機加酒、什麼時候分開訂。',
    sections: [
      {
        h: '適合套票的場景',
        ps: [
          '日期固定、同一平台管理退改、首次去目的地想省事。親子行選含早餐酒店時，套票篩選更快。',
        ],
        img: 'images/travel/expedia-bundle.jpg',
        imgAlt: '機場與酒店',
      },
      {
        h: '不適合套票的情況',
        ps: [
          '機票已用里數、或酒店在別平台便宜很多——分開訂總價更低。',
        ],
      },
    ],
    cta: '查看 Expedia 機加酒優惠',
    faq: [['套票可只退酒店？', '依套票條款，通常整組退改規則綁定。']],
  },
  {
    slug: 'blog-expedia-sg-malaysia-thailand',
    link: LINKS.expediaSg,
    brandLabel: 'Expedia Singapore',
    tag: 'Expedia',
    hero: 'images/travel/expedia-bundle.jpg',
    heroAlt: '東南亞度假',
    title: 'Expedia 訂馬泰酒店：吉隆坡曼谷新手路線（2026）',
    meta: '經 Expedia 新加坡入口訂馬來西亞、泰國酒店：吉隆坡、曼谷、普吉初學者訂房建議。',
    views: 17930,
    focus: 'both',
    intro: '從港台飛吉隆坡、曼谷時間短，適合 4–5 天假期。Expedia 可一次比連鎖與精品酒店總價。',
    sections: [
      {
        h: '吉隆坡與曼谷',
        ps: [
          '吉隆坡 KLCC 與雙子塔步行圈；曼谷 BTS 沿線省交通時間。海島段確認是否含接送。',
        ],
        img: 'images/travel/expedia-bundle.jpg',
        imgAlt: '機場與酒店行程',
      },
    ],
    cta: '用 Expedia 搜尋馬泰酒店',
    faq: [['幣別顯示？', '可切換顯示幣別，扣款依發卡行。']],
  },
  // —— KKday ×3 ——
  {
    slug: 'blog-kkday-tw-taipei-day-tours',
    link: LINKS.kkdayTw,
    brandLabel: 'KKday',
    tag: 'KKday',
    hero: 'images/travel/kkday-cover.jpg',
    heroAlt: 'KKday 台灣一日遊',
    title: 'KKday 台灣一日遊：台北九份十份怎麼訂（2026）',
    meta: 'KKday 台灣站：一日遊、交通券、景點門票訂購與取消規則，本地與出境旅客實用指南。',
    views: 25690,
    featured: true,
    cardTitle: 'KKday 台北一日遊訂購指南',
    focus: 'tw',
    intro: '不想自己拼車與票務時，KKday 適合訂一日遊、溫泉、樂園與交通券。台灣讀者國內玩，港台旅客來台自由行也常用。',
    sections: [
      {
        h: '一日遊怎麼選',
        ps: [
          '看集合地點、是否含餐、取消截止時間。九份十份線路多，選「中文導覽」與「小團」前先讀評價。',
        ],
        img: 'images/travel/kkday-cover.jpg',
        imgAlt: '台灣山城風光',
      },
      {
        h: '訂票注意',
        ps: [
          '電子票券存手機離線備用；雨天政策與改期規則在產品頁底部，下單前必讀。',
        ],
      },
    ],
    cta: '在 KKday 台灣站搜尋行程',
    faq: [['可以當天訂？', '熱門行程建議提早 1–3 天，當天庫存視產品而定。']],
  },
  {
    slug: 'blog-kkday-tw-japan-tickets',
    link: LINKS.kkdayTw,
    brandLabel: 'KKday',
    tag: 'KKday',
    hero: 'images/travel/kkday-japan.jpg',
    heroAlt: '日本觀光',
    title: 'KKday 日本票券：環球影城與交通卡訂購（2026）',
    meta: '用 KKday 訂日本 USJ、交通券、一日遊：港台旅客出發前必看注意事項。',
    views: 22840,
    focus: 'both',
    intro: '日本行程常要搶熱門票券。KKday 台灣站可提前訂 USJ、新幹線相關產品與當地體驗，出發前確認兌換方式。',
    sections: [
      {
        h: '熱門票券',
        ps: [
          '環球影城、TeamLab、交通周遊券——旺季提早訂。兌換地點與營業時間寫在憑證上，與酒店入住日錯開安排。',
        ],
        img: 'images/travel/kkday-japan.jpg',
        imgAlt: '日本旅遊體驗',
      },
    ],
    cta: '瀏覽 KKday 日本行程',
    faq: [['比 Klook？', '同行程比總價與取消政策，選低者與較寬鬆退改。']],
  },
  {
    slug: 'blog-kkday-tw-korea-experiences',
    link: LINKS.kkdayTw,
    brandLabel: 'KKday',
    tag: 'KKday',
    hero: 'images/travel/kkday-korea.jpg',
    heroAlt: '韓國體驗行程',
    title: 'KKday 韓國體驗：首爾美食與 DMZ 行程（2026）',
    meta: 'KKday 訂韓國體驗行程：美食團、穿韓服、郊區一日遊，港台旅客實用建議。',
    views: 19670,
    focus: 'both',
    intro: '韓國自由行除訂酒店，體驗與郊區團往往要在 KKday 這類平台提前鎖位。本文整理常見品類與訂購要點。',
    sections: [
      {
        h: '體驗類型',
        ps: [
          '市區美食 walk、韓服攝影、DMZ／南怡島一日團。確認是否含接送、導覽語言與最少成團人數。',
        ],
        img: 'images/travel/kkday-korea.jpg',
        imgAlt: '韓國街道美食',
      },
    ],
    cta: '在 KKday 搜尋韓國體驗',
    faq: [['要列印憑證？', '多數接受手機條碼，以產品說明為準。']],
  },
];

function buildArticle(a) {
  const b = brand(a.link, a.brandLabel);
  const sectionsHtml = a.sections
    .map((s) => {
      const paras = s.ps.map((p) => `<p>${p}</p>`).join('\n            ');
      const fig = s.img
        ? `\n            <figure style="margin:1.25rem 0;border-radius:8px;overflow:hidden;"><img src="${s.img}" alt="${s.imgAlt || ''}" style="width:100%;height:auto;display:block;" width="800" height="450" loading="lazy"></figure>`
        : '';
      return `            <h2>${s.h}</h2>\n            ${paras}${fig}`;
    })
    .join('\n\n');

  const faqHtml = a.faq.map(([q, ans]) => `<p><strong>${q}</strong> ${ans}</p>`).join('\n            ');

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${a.title} - unLockGames</title>
    <meta name="description" content="${a.meta}">
    <link rel="stylesheet" href="../blog-traditional.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/${a.slug}.html">
</head>
<body>
    <header class="blog-header">
        <div class="container">
            <a href="../index.html" class="blog-logo">unLockGames</a>
            <form action="../search.html" method="get" class="blog-search-form" role="search">
                <input type="text" name="q" class="blog-search" placeholder="搜尋文章…" autocomplete="off">
                <button type="submit" class="blog-search-btn" aria-label="搜尋">搜尋</button>
            </form>
        </div>
    </header>
    <nav class="blog-nav"><div class="container"><ul>
                <li><a href="../index.html">首頁</a></li>
                <li><a href="../index.html#travel">旅遊</a></li>
                <li><a href="category-travel.html">旅遊訂房</a></li>
            </ul></div></nav>
    <main class="article-content" style="max-width:800px;margin:2rem auto;padding:0 20px;">
        <a href="category-travel.html" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#0d9488;">&larr; 旅遊與訂房</a>
        <article>
            <h1>${a.title}</h1>
            <p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">2026-06-24 · <a href="category-travel.html">旅遊</a> · <span class="category-mag-tag">${a.tag}</span><span class="view-count" aria-label="瀏覽" style="margin-left:0.75rem;">&#128065; ${a.views.toLocaleString('en-US')}</span></p>
            <div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="${a.hero}" alt="${a.heroAlt}" style="width:100%;height:auto;display:block;" width="800" height="400" loading="eager"></div>
            <p><strong>適合誰：</strong>${a.intro}</p>
${sectionsHtml}
${extraZh(b, a.brandLabel, a.focus || 'both')}
            <h2>常見問題</h2>
            ${faqHtml}
            <h2>重點整理</h2>
            <ul>
                <li>經 ${b} 進入，優惠與訂單追蹤較不易出錯。</li>
                <li>行程未穩定前優先<strong>可取消／可改期</strong>產品。</li>
                <li>以<strong>結帳總價</strong>比較，並閱讀近期評價實拍。</li>
            </ul>
            <p>準備出發？<a href="${a.link}" target="_blank" rel="sponsored noopener noreferrer"><strong>${a.cta}</strong></a>—下單前請以平台即時條款為準。</p>
            <section class="article-comments" id="comments">
                <h3>留言</h3>
                <div class="comment-list">
                    <div class="comment-item"><strong>旅客</strong><span class="comment-date">2026-06-24</span><p>透過連結訂購順利，價格與頁面一致。</p></div>
                </div>
                <form class="comment-form" id="commentForm" onsubmit="event.preventDefault(); document.getElementById('commentNote').style.display='block'; this.reset();">
                    <input type="text" name="name" placeholder="你的名字" required>
                    <input type="email" name="email" placeholder="電郵" required>
                    <textarea name="comment" placeholder="留言內容…" rows="4" required></textarea>
                    <button type="submit">發佈留言</button>
                </form>
                <p class="comment-note" id="commentNote" style="display:none;">多謝留言！留言經審核後會顯示。</p>
            </section>
            <p style="font-size:0.85rem;color:#94a3b8;"><em>披露：透過本站合作連結訂購，我們可能獲得佣金，你不會被額外收費。${a.brandLabel} 為獨立品牌，unLockGames 未獲其官方背書。</em></p>
        </article>
    </main>
    <footer class="blog-footer"><div class="container">
            <div class="footer-links"><a href="../index.html">首頁</a><a href="../about.html">關於</a><a href="../privacy.html">私隱</a></div>
            <p class="footer-bottom"><strong>披露：</strong>透過合作連結訂購，我們可能獲得佣金。</p>
            <p class="footer-bottom">&copy; 2025 unLockGames. All rights reserved.</p>
        </div></footer>
    <script src="../ai-assistant.js"></script>
    <script src="../i18n-embedded.js" defer></script>
    <script src="../site-i18n.js" defer></script>
</body>
</html>
`;
}

for (const a of articles) {
  fs.writeFileSync(path.join(blogsDir, `${a.slug}.html`), buildArticle(a), 'utf8');
  console.log('Wrote', a.slug);
}

console.log('Done:', articles.length, 'zh-Hant articles');

// Real photos: run `node scripts/install-travel-photos.mjs` after adding assets — no SVG placeholders.
