import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, '..', 'blogs');

const AFF = (cId) =>
  `https://www.chinesean.com/affiliate/clickBanner.do?wId=71434&pId=18927&cId=${cId}`;

const AGODA = (cId, label = 'Agoda') =>
  `<a href="${AFF(cId)}" target="_blank" rel="sponsored noopener noreferrer">${label}</a>`;

/** @param {'hk'|'tw'|'both'|'outbound'} region */
function extraZh(agoda, region) {
  const hkBit =
    region === 'hk' || region === 'both'
      ? `<p>香港讀者可留意週末 staycation、澳門即日來回，以及 PayMe、信用卡聯名立減等本地支付優惠。旺季（聖誕、農曆新年、長周末）建議提早兩週訂可退款房型，維港景房型記得在評論區搜尋「海景」實拍照。</p>`
      : '';
  const twBit =
    region === 'tw' || region === 'both'
      ? `<p>台灣讀者規劃國內高鐵假期或日韓自由行時，可先收藏 2–3 家飯店，登入 Agoda 後觀察會員價是否低於首日搜尋。連假（春節、連休、跨年）務必確認取消截止時間，東部與離島行程建議選可改期方案以因應颱風。</p>`
      : '';
  const outboundBit =
    region === 'outbound' || region === 'both'
      ? `<p>港澳台旅客出遊日本、韓國、泰國、新加坡時，Agoda 亞太庫存深，常見「含稅總價」標示。比價時以結帳頁應付總額為準，並比對免費取消截止日與是否含早餐。</p>`
      : '';
  return `
            <h2>為什麼建議透過 Agoda 訂房</h2>
            <p>直接致電酒店適合特殊要求，但 Agoda 一次呈現評價、取消時限與會員價，並常與區域推廣（日本額外 9 折、韓國隱藏慶尚道、澳門 MGTO 等）連動。請先經 ${agoda} 進入活動頁，再搜尋目的地，折扣較易正確套用。</p>
            <p>並列比較三家住宿、加入收藏、觀察降價，比只看搜尋列表首屏標價更穩。總價透明可避免「低價房」在結帳時加收度假村費或服務費。</p>
            ${hkBit}
            ${twBit}
            ${outboundBit}

            <h2>訂房前三項必查</h2>
            <p><strong>取消政策：</strong>免費取消是出發前幾天？機票、簽證未穩定前，寧可每晚多付一點訂可退款房型。<strong>含稅與早餐：</strong>以結帳「應付總額」為準。<strong>位置：</strong>用地圖看實際步行至地鐵、海灘或景點的距離，並閱讀近三個月評論。</p>

            <h2>收藏、降價提醒與彈性日期</h2>
            <p>登入後收藏酒店，部分日期會出現降價提示。入住日往前或後挪一天，商務區週日晚間、海島週五晚價格曲線往往不同。家庭出遊可篩選「連通房」「家庭房」；商務出差優先地鐵步行 8 分鐘內與評論提及 Wi-Fi 穩定的房型。</p>

            <h2>常見錯誤</h2>
            <p>機票未穩定就訂不可退款；忽略地圖導致高速公路噪音或陡坡搬行李；入住姓名與護照不一致；未看旅客實拍就訂「豪華海景」。修正方式：行程確定前堅持可退款、閱讀 20 則近期評價、比較整趟住宿總價而非單晚標價。</p>

            <h2>入住當日與離店</h2>
            <p>離線保存確認信 PDF；晚到請留言酒店；退房時核對迷你吧與按金。離店後留下簡短評價，有助日後挑選房型類別。</p>`;
}

const creatives = [
  {
    slug: 'blog-agoda-cps-tch',
    cId: 31271,
    region: 'both',
    featured: false,
    title: 'Agoda 訂房攻略：香港台灣繁中用戶省錢指南（2026）',
    meta: '香港、台灣繁體中文用戶在 Agoda 訂酒店實用指南：比價、取消政策、會員優惠與日韓東南亞熱門目的地。',
    hero: 'https://images.unsplash.com/photo-1536599018102-d9a14291ec09?w=800&h=400&fit=crop',
    heroAlt: '香港維港夜景',
    views: 22420,
    intro: '適合香港、台灣讀者：習慣繁體介面，想訂本地 staycation、澳門周末或日韓泰出遊。經合作連結進入 Agoda 不額外收費。',
    sections: [
      { h: '港澳台為何常用 Agoda', ps: ['Agoda 在亞太酒店庫存深，繁體中文介面清楚，常以含稅總價顯示。台北、高雄、曼谷、首爾同一酒店不同平台價差可達一成，建議先開 Agoda 再比價。', '「今日特價」「會員專享」標籤標示限時折扣；入住日前後各挪一天，常能碰到更低價位。'] },
      { h: '訂房前必查三項', ps: ['取消截止日、是否含早、地圖步行距離是否含天橋或坡道。旺季寧可訂可退款房型。'], img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=450&fit=crop', imgAlt: '精品酒店客房' },
      { h: '香港周末與台灣國旅', ps: ['港人周末澳門、深圳、廣州可篩選免費取消＋近地鐵；台人台中、花蓮、墾丁可組合連鎖與民宿。周二周三入住常比周五便宜。'] },
    ],
    cta: '前往 Agoda 繁體中文站搜尋並比價',
    faq: [['Agoda 安全嗎？', '屬 Booking Holdings 旗下，經授權合作連結下單即可。'], ['可到店付嗎？', '部分房型支援，產品頁會標示；預付通常更便宜。']],
  },
  {
    slug: 'blog-agoda-cps-eng',
    cId: 31272,
    region: 'both',
    title: 'Agoda 英文站訂房：港台旅客出國比價技巧（2026）',
    meta: '香港台灣讀者使用 Agoda 英文界面訂日韓歐美酒店：比價、會員價與取消政策實用說明。',
    hero: 'https://images.unsplash.com/photo-1493976040374-c3afdfe1ab28?w=800&h=400&fit=crop',
    heroAlt: '日本京都街景',
    views: 19150,
    intro: '部分港人、台人習慣英文界面或信用卡以美元結帳。本文說明英文站與繁中站如何交叉比價。',
    sections: [
      { h: '英文站適合什麼情況', ps: ['歐美長途、或英文評論較多的城市；總價顯示方式可能因幣別而異，結帳前切換 HKD/TWD 比較。'] },
      { h: '與繁中站比價', ps: ['同一酒店兩站價格偶爾不同；收藏後分別結帳頁比「應付總額」，選低者並確認取消條款一致。'], img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=450&fit=crop', imgAlt: '東京夜景' },
    ],
    cta: '開啟 Agoda 英文站比價',
    faq: [['英文站折扣會少嗎？', '活動因區域而異，以結帳頁為準。']],
  },
  {
    slug: 'blog-agoda-cps-indonesia',
    cId: 31669,
    region: 'outbound',
    title: 'Agoda 訂印尼巴厘岛酒店：港台自由行攻略（2026）',
    meta: '香港台灣旅客經 Agoda 訂峇里島、雅加達酒店：促銷、免費取消與親子房型建議。',
    hero: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=400&fit=crop',
    heroAlt: '峇里島熱帶風光',
    views: 17340,
    intro: '港台赴印尼度假人數持續增加。Agoda 本地合約價常有優勢，適合排烏布、水明漾、雅加達轉機行程。',
    sections: [
      { h: '峇里島選區', ps: ['烏布文化、水明漾海灘、努沙杜瓦度假村；確認是否含機場接送。'] },
      { h: '旺季與退款', ps: ['學校假期與年末旺季提早四至六週訂可退款房型。'], img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079abb?w=800&h=450&fit=crop', imgAlt: '度假村泳池' },
    ],
    cta: '在 Agoda 搜尋印尼酒店',
    faq: [['要印確認信嗎？', '多數酒店接受電子確認；護照姓名須一致。']],
  },
  {
    slug: 'blog-agoda-cps-thailand',
    cId: 31670,
    region: 'outbound',
    title: 'Agoda 泰國訂房：曼谷清邁海島港台旅客指南（2026）',
    meta: '香港台灣讀者用 Agoda 訂曼谷、清邁、普吉酒店：BTS 選址、雨季與促銷時機。',
    hero: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
    heroAlt: '曼谷天際線',
    views: 20880,
    intro: '泰國是港台短途熱門目的地。Agoda 泰國庫存極深，適合潑水節、寒假、暑假行程。',
    sections: [
      { h: '曼谷選址', ps: ['BTS/MRT 步行範圍省交通時間；河畔酒店景觀好但通勤較長。'] },
      { h: '海島雨季', ps: ['安達曼與泰國灣雨季不同，訂不可退款別墅前先查月份。'], img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=450&fit=crop', imgAlt: '泰國長尾船' },
    ],
    cta: '瀏覽 Agoda 泰國酒店',
    faq: [['度假村費？', '泰國多已含在總價，仍以結帳頁為準。']],
  },
  {
    slug: 'blog-agoda-indonesia-deals',
    cId: 31671,
    region: 'outbound',
    title: 'Agoda 印尼優惠頁：港台旅客折扣攻略（2026）',
    meta: '善用 Agoda 印尼 deal 頁：限時折扣、會員價與可退款房型取捨。',
    hero: 'https://images.unsplash.com/photo-1555404738-427f17fbb7f0?w=800&h=400&fit=crop',
    heroAlt: '雅加達城市',
    views: 15220,
    intro: '從港台飛印尼前，可先逛 Agoda 印尼促銷頁鎖定峇里島、泗水商務行程低價。',
    sections: [{ h: '促銷頁用法', ps: ['登入後按城市篩選，優先可退款再比折扣深度。'] }],
    cta: '開啟 Agoda 印尼優惠頁',
    faq: [['可疊加優惠碼？', '視活動條款，結帳頁會說明。']],
  },
  {
    slug: 'blog-agoda-thailand-deals',
    cId: 31672,
    region: 'outbound',
    title: 'Agoda 泰國優惠：曼谷與海島省錢訂房（2026）',
    meta: '港台讀者使用 Agoda 泰國 deal 頁：flash sale、會員價與預付注意事項。',
    hero: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&h=400&fit=crop',
    heroAlt: '泰國海灘',
    views: 16560,
    intro: '泰國促銷頁每週輪換。本文教港台旅客在折扣與彈性之間取得平衡。',
    sections: [{ h: '細則', ps: ['促銷房常需預付且不可退；首訪泰國建議至少一晚可退款。'] }],
    cta: '查看 Agoda 泰國優惠',
    faq: [['幣別？', '可切換 HKD/TWD 顯示，扣款依發卡行。']],
  },
  {
    slug: 'blog-agoda-hk-hotel-deals',
    cId: 31832,
    region: 'hk',
    featured: true,
    cardTitle: 'Agoda 香港酒店優惠：周末 staycation 精選',
    title: 'Agoda 香港酒店優惠：周末 Staycation 與海景房攻略（2026）',
    meta: '香港讀者在 Agoda 訂本地酒店：維港景、周末優惠、澳門順遊與最高慳到數百港元技巧。',
    hero: 'images/agoda/hk-hotel-cover.jpg',
    heroAlt: '香港維港',
    views: 32680,
    intro: '專為香港讀者：周末 staycation、節日短假、澳門即日來回前的中環、尖沙咀、灣仔酒店比價。',
    sections: [
      { h: '選區：海景 vs 交通', ps: ['尖沙咀、灣仔經典海景；鰂魚涌、黃竹坑文青區較靜。周日晚常較周五便宜。'] },
      { h: '香港優惠頁怎麼用', ps: ['經合作連結進入 Agoda 香港 deal 頁，登入後符合資格的酒店會在結帳顯示立減。搭配免費取消最穩。'], img: 'images/agoda/hk-hotel-cover.jpg', imgAlt: '香港夜景' },
      { h: '順遊澳門深圳', ps: ['航班或船期未穩定前訂可退款；澳門五星是否含船票以產品說明為準。'] },
    ],
    cta: '查看 Agoda 香港酒店優惠',
    faq: [['現有訂單可補折扣嗎？', '通常需新訂單且在活動期內。'], ['AgodaCash？', '若錢包有餘額，結帳依條款套用。']],
  },
  {
    slug: 'blog-agoda-tw-deals',
    cId: 31833,
    region: 'tw',
    featured: true,
    cardTitle: 'Agoda 台灣優惠飯店：台北台中高雄訂房',
    title: 'Agoda 台灣優惠飯店：台北、台中、高雄訂房攻略（2026）',
    meta: '台灣讀者用 Agoda 訂國內住宿：連假避坑、免費取消、親子飯店與離島行程。',
    hero: 'images/agoda/tw-hotel-cover.jpg',
    heroAlt: '台北夜景',
    views: 29840,
    intro: '專為台灣讀者：國內高鐵假期、離島、演唱會檔期訂房，以及日韓出境前的比價習慣。',
    sections: [
      { h: '連假與檔期', ps: ['春節、連假、跨年提早三至四週訂可退款。台北車站方便但較吵，親子可考慮大安信義。'] },
      { h: '離島花東', ps: ['澎湖、小琉球、花蓮民宿多；颱風季選可改期。'], img: 'images/agoda/tw-hotel-cover.jpg', imgAlt: '台灣東海岸' },
    ],
    cta: '開啟 Agoda 台灣優惠頁',
    faq: [['發票？', '依飯店與產品類型，下單頁有說明。']],
  },
  {
    slug: 'blog-agoda-cps-malaysia',
    cId: 31963,
    region: 'outbound',
    title: 'Agoda 馬來西亞訂房：港台旅客吉隆坡檳城攻略（2026）',
    meta: '香港台灣讀者訂吉隆坡、檳城、蘭卡威：城市選址、公眾假期與親子篩選。',
    hero: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=400&fit=crop',
    heroAlt: '吉隆坡雙子塔',
    views: 17110,
    intro: '吉隆坡轉機、檳城美食、蘭卡威海島是港台熱門組合。',
    sections: [{ h: '選址', ps: ['KLCC 首訪；喬治市文化.walk；蘭卡威確認接送時間。'] }],
    cta: '搜尋 Agoda 馬來西亞酒店',
    faq: [['旅遊稅？', '部分在櫃檯收取，Agoda 會註明。']],
  },
  {
    slug: 'blog-agoda-malaysia-deals',
    cId: 31964,
    region: 'outbound',
    title: 'Agoda 馬來西亞優惠頁：港台旅客慳錢訂房（2026）',
    meta: '馬來西亞 deal 頁用法：會員價、預付與可退款取捨。',
    hero: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=400&fit=crop',
    heroAlt: '吉隆坡',
    views: 14890,
    intro: '促銷頁輪換快，出發前先鎖可退款底價再追折扣。',
    sections: [{ h: '會員價', ps: ['先登入；「立即付款」與「延後付款」分開比總價。'] }],
    cta: '開啟 Agoda 馬來西亞優惠',
    faq: [['促銷可退嗎？', '多數預付不可退，看清標籤。']],
  },
  {
    slug: 'blog-agoda-eng-deals',
    cId: 31965,
    region: 'both',
    title: 'Agoda 全球優惠頁：港台旅客慳錢訂房指南（2026）',
    meta: '英文全球 deal 頁：季節促銷、Insider 價，港台讀者如何挑真折扣。',
    hero: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    heroAlt: '旅行規劃',
    views: 16920,
    intro: '全球優惠頁是雷達，不是盲目「立即訂」。港台出遊歐美亞洲皆可先收藏再下手。',
    sections: [{ h: '驗證真降價', ps: ['截圖價格，24 小時後無促銷再比；避免包裝過的會員價。'] }],
    cta: '瀏覽 Agoda 全球優惠',
    faq: [['全球適用？', '每檔活動列出目的地，請細讀。']],
  },
  {
    slug: 'blog-agoda-cps-tch-alt-32025',
    cId: 32025,
    region: 'both',
    title: 'Agoda 繁中訂房優惠整理：港台用戶 2026 最新活動',
    meta: 'Agoda 繁體站常見優惠、會員價與季節促銷，協助香港台灣讀者聰明訂房。',
    hero: 'images/agoda/korea-discover-hidden-korea.jpg',
    heroAlt: 'Agoda 旅遊推廣',
    views: 16200,
    intro: '手機比價族適用：App 獨享折扣、推播降價、周末短途技巧。',
    sections: [{ h: '手機訂房', ps: ['App 與網頁比價；周二周三商務酒店常較便宜。'] }],
    cta: '前往 Agoda 繁中站',
    faq: [['與其他 CPS 連結？', '創意編號不同，請選當前有效促銷入口。']],
  },
  {
    slug: 'blog-agoda-cps-tch-alt-32026',
    cId: 32026,
    region: 'both',
    title: '用 Agoda 規劃下一趟出境小旅行（港台繁中指南）',
    meta: '護照、取消規則、會員價：港日韓東南亞小旅行一步步訂房。',
    hero: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    heroAlt: '護照與行李',
    views: 15880,
    intro: '第一次用 Agoda 訂海外酒店的港台讀者入門。',
    sections: [{ h: '七天時間軸', ps: ['D-30 鎖可取消；D-14 比促銷；D-3 確認晚到與行李寄放。'] }],
    cta: '在 Agoda 開始搜尋',
    faq: [['要會員嗎？', '非必須，登入常見更低價。']],
  },
  {
    slug: 'blog-agoda-cps-th-alt-32027',
    cId: 32027,
    region: 'outbound',
    title: 'Agoda 泰國訂房進階：港台旅客專業技巧（2026）',
    meta: '曼谷 BTS 選址、普吉清邁雨季、Agoda 泰國 CPS 入口訂房要點。',
    hero: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
    heroAlt: '曼谷',
    views: 14670,
    intro: '給常赴泰國的港台旅客：深化選址與促銷頁搭配。',
    sections: [{ h: '深化選址', ps: ['週末海島漲價、平日曼谷回落；潑水節提早訂。'] }],
    cta: '搜尋 Agoda 泰國酒店',
    faq: [['合作連結安全？', '是，付款仍經 Agoda 加密通道。']],
  },
  {
    slug: 'blog-agoda-cps-my-alt-32028',
    cId: 32028,
    region: 'outbound',
    title: 'Agoda 馬來西亞訂房：港台旅客詳細攻略（2026）',
    meta: '吉隆坡、蘭卡威、學校假期訂房與 Agoda 馬來西亞 CPS 入口。',
    hero: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=400&fit=crop',
    heroAlt: '吉隆坡',
    views: 14920,
    intro: '排程云顶、蘭卡威渡輪前先訂可退款酒店。',
    sections: [{ h: '假期', ps: ['學校假期云顶、蘭卡威早訂；比對渡輪時間。'] }],
    cta: '瀏覽 Agoda 馬來西亞',
    faq: [['隱藏收費？', '以結帳總額為準。']],
  },
  {
    slug: 'blog-agoda-cps-id-alt-32029',
    cId: 32029,
    region: 'outbound',
    title: 'Agoda 印尼訂房：港台旅客少踩坑指南（2026）',
    meta: '峇里島濾鏡、手機離線確認信、Agoda 印尼 CPS 技巧。',
    hero: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=400&fit=crop',
    heroAlt: '峇里島',
    views: 15110,
    intro: '印尼島嶼訊號不穩，離線保存 voucher 很重要。',
    sections: [{ h: 'App vs 網頁', ps: ['離線 PDF；烏布山路酒店確認接送。'] }],
    cta: '開啟 Agoda 印尼站',
    faq: [['分期？', '視結帳顯示支付方式。']],
  },
  {
    slug: 'blog-agoda-cps-eng-alt-32030',
    cId: 32030,
    region: 'both',
    title: 'Agoda 英文站進階：港台常旅客訂房技巧（2026）',
    meta: '商務與自由行並用 Agoda：收藏分類、Wi-Fi 篩選、會員價習慣。',
    hero: 'https://images.unsplash.com/photo-1436491865332-7a61a4cc3f3c?w=800&h=400&fit=crop',
    heroAlt: '飛機机翼',
    views: 15740,
    intro: '已熟悉 Agoda 的港台常旅客進階整理。',
    sections: [{ h: '帳號策略', ps: ['商務與休閒分開收藏；篩選書桌與 Wi-Fi 評論。'] }],
    cta: '繼續在 Agoda 比價',
    faq: [['價格保證？', '偶爾有活動，以條款為準。']],
  },
  {
    slug: 'blog-agoda-cps-cn',
    cId: 33148,
    region: 'both',
    title: 'Agoda 簡體站訂房：港台讀者跨境比價須知（2026）',
    meta: '香港台灣讀者偶用簡體界面或人民幣顯示時，如何比價日韓東南亞酒店。',
    hero: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop',
    heroAlt: '東京',
    views: 18450,
    intro: '部分港台旅客因促銷或支付習慣使用簡體站；結帳前務必比對繁中站總價與取消條款。',
    sections: [
      { h: '跨境比價', ps: ['護照姓名一致；簡繁站同一酒店價格可能不同。'] },
      { h: '出境行程', ps: ['簽證未出前訂可取消；航班改期先試 App 改訂。'], img: 'https://images.unsplash.com/photo-1493976040374-c3afdfe1ab28?w=800&h=450&fit=crop', imgAlt: '京都' },
    ],
    cta: '開啟 Agoda 簡體中文站',
    faq: [['報銷？', '依公司與酒店政策。']],
  },
  {
    slug: 'blog-agoda-special-offers',
    cId: 35073,
    region: 'both',
    title: 'Agoda Special Offers：港台旅客搵真折扣攻略（2026）',
    meta: 'Special Offers 頁面用法：分辨真降價與包裝促銷，靈活改目的地慳錢。',
    hero: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop',
    heroAlt: '風景旅遊',
    views: 17290,
    intro: '促銷瓷片每週輪換；當雷達用，確認比昨日便宜再訂。',
    sections: [{ h: '真折扣', ps: ['收藏後隔日再比；日韓東南亞常輪播。'] }],
    cta: '探索 Agoda Special Offers',
    faq: [['可疊券？', '視活動條款。']],
  },
  {
    slug: 'blog-agoda-cps-tw',
    cId: 35384,
    region: 'tw',
    title: 'Agoda 台灣用戶訂房：國內外一站比價（2026）',
    meta: '台灣 Agoda CPS 主入口：國旅、日韓滑雪季、會員價技巧。',
    hero: 'https://images.unsplash.com/photo-1470006984083-c0d427607022?w=800&h=400&fit=crop',
    heroAlt: '台北',
    views: 21660,
    intro: '台灣讀者主入口：高鐵假期、日本滑雪、韓國美食行。',
    sections: [{ h: '日韓自由行', ps: ['東京車站步行 8 分鐘內；首爾明洞便利但吵，弘大適合年輕旅客。'] }],
    cta: '前往 Agoda 台灣站',
    faq: [['台幣顯示？', '可切換，扣款依发卡行。']],
  },
  {
    slug: 'blog-agoda-korea-weekend',
    cId: 36341,
    region: 'outbound',
    title: 'Agoda 韓國周末遊：港台旅客首爾釜山訂房（2026）',
    meta: '韓國酒店 Agoda 訂房：弘大明洞、釜山海雲台、濟州住宿與 K-pop 行程。',
    hero: 'images/agoda/korea-discover-hidden-korea.jpg',
    heroAlt: '韓國旅遊推廣',
    views: 24330,
    intro: '演唱會、美食、打卡行程帶動韓國熱度；港台周末飛首爾、釜山最常見。',
    sections: [
      { h: '首爾選區', ps: ['弘大夜生活、明洞購物、鍾路古宮；地鐵比打的省時。'] },
      { h: '釜山慶尚道', ps: ['海雲台夏天早訂；Agoda 韓國頁常推慶尚道文化路線。'], img: 'images/agoda/korea-discover-hidden-korea.jpg', imgAlt: '韓國旅遊插畫' },
    ],
    cta: '瀏覽 Agoda 韓國酒店',
    faq: [['KTX 套票？', '部分含火車，看清艙等。']],
  },
  {
    slug: 'blog-agoda-macao-mgto',
    cId: 42327,
    region: 'hk',
    featured: true,
    cardTitle: 'Agoda 澳門酒店：MGTO 旅遊局推廣優惠',
    title: 'Agoda 澳門酒店優惠：MGTO 旅遊局推廣攻略（2026）',
    meta: '澳門政府旅遊局 Agoda 合作推廣：路氹度假村、世遺半島、香港周末往返訂房。',
    hero: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=400&fit=crop',
    heroAlt: '澳門世遺街景',
    views: 25170,
    intro: '港人周末澳門行最常見：MGTO 背書的 Agoda 促銷不定期折扣指定酒店，路氹與半島怎麼選一文說清。',
    sections: [
      { h: '路氹 vs 半島', ps: ['路氹度假村與表演；半島議事亭前地與蛋撻晨_walk。'] },
      { h: '香港出發流程', ps: ['船期或金巴未穩定前訂可退款；確認穿梭巴士時段。'], img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=450&fit=crop', imgAlt: '澳門街道' },
    ],
    cta: '查看 Agoda 澳門 MGTO 優惠',
    faq: [['要優惠碼？', '部分活動經推廣連結自動套用。']],
  },
  {
    slug: 'blog-agoda-5-percent-greater-china',
    cId: 43689,
    region: 'both',
    title: 'Agoda 酒店 95 折：港澳台用戶優惠說明（2026）',
    meta: '指定港澳台用戶酒店 5% 折扣：適用目的地含日韓泰新馬等地，條款與訂房技巧。',
    hero: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop',
    heroAlt: '旅遊城市',
    views: 26840,
    intro: '限時 5% off 常限港澳台用戶身份；目的地或含日本、韓國、泰國、新加坡、英國等，以活動頁為準。',
    sections: [
      { h: '誰合資格', ps: ['登入帳號地區與付款資料須符合；折扣或在結帳才出現。'] },
      { h: '目的地', ps: ['港、台、澳、泰、韓、新、馬、日、英等曾列入，請以即時條款核對。'], img: 'https://images.unsplash.com/photo-1493976040374-c3afdfe1ab28?w=800&h=450&fit=crop', imgAlt: '日本街道' },
    ],
    cta: '領取 Agoda 5% 酒店優惠',
    faq: [['可疊 AgodaCash？', '通常擇一，看疊加規則。']],
  },
  {
    slug: 'blog-agoda-77-summer-sale',
    cId: 45246,
    region: 'both',
    title: 'Agoda 7.7 夏日大特賣：港台訂房折扣攻略（2026）',
    meta: 'Agoda 7.7 雙檔促銷最高 15% 折扣：訂房期、入住期與避坑指南。',
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
    heroAlt: '夏日海灘',
    views: 22560,
    intro: '7.7 是港台熟悉的電商檔期，Agoda 常推最高 15% off；先訂可退款再等加深折扣。',
    sections: [{ h: '怎麼訂', ps: ['注意 stay period；促銷開始先鎖可取消房型。'] }],
    cta: '進入 Agoda 7.7 夏日大特賣',
    faq: [['折扣顯示在哪？', '結帳頁或酒店卡片 7.7 標籤。']],
  },
  {
    slug: 'blog-agoda-japan-extra-10-off',
    cId: 45388,
    region: 'outbound',
    featured: true,
    cardTitle: '日本酒店額外 9 折：Agoda 築夢之旅',
    title: 'Agoda 日本酒店額外 9 折：築夢之旅訂房攻略（2026）',
    meta: 'Extra 10% off Japan 活動：東京京都大阪、櫻花滑雪季、港台旅客訂房技巧。',
    hero: 'images/agoda/japan-hotel-cover.jpg',
    heroAlt: '京都秋色',
    views: 30410,
    intro: '港日、台日航线密集；Agoda 日本額外 9 折活動覆蓋多間指定酒店，搭配免費取消最穩。',
    sections: [
      { h: '東京入門格線', ps: ['新宿交通樞紐、淺草傳統、澀谷年輕；先篩四星可取消再追 9 折標籤。'] },
      { h: '京都大阪北海道', ps: ['京都町家早訂；大阪美食性價比高；二世古看滑雪場距離。'], img: 'images/agoda/japan-hotel-cover.jpg', imgAlt: '東京' },
      { h: '溫泉禮儀', ps: ['箱根、別府套餐是否含接駁；刺青政策各店不同。'] },
    ],
    cta: '領取 Agoda 日本額外 9 折優惠',
    faq: [['全部酒店？', '指定名單，見活動頁。'], ['最佳月份？', '五月與十一月下旬常兼顧價格與天氣。']],
  },
  {
    slug: 'blog-agoda-sg60-singapore',
    cId: 45408,
    region: 'outbound',
    title: 'Agoda 新加坡住宿：港台旅客 Staycation 與國慶優惠（2026）',
    meta: '新加坡 SG60 氛圍下 Agoda 訂房：濱海灣、聖淘沙、親子泳池酒店。',
    hero: 'https://images.unsplash.com/photo-1525621483387-9ee245d09fa8?w=800&h=400&fit=crop',
    heroAlt: '新加坡濱海灣',
    views: 17920,
    intro: '港台飛新加坡短，周末排程常結合美食與親子景點。',
    sections: [{ h: '分級', ps: ['濱海灣景觀；烏節購物；加東美食區性價比。'] }],
    cta: '瀏覽 Agoda 新加坡酒店',
    faq: [['停車？', '篩選 parking 設施，市中心常另收。']],
  },
  {
    slug: 'blog-agoda-korea-discover-hidden-2026',
    cId: 45504,
    region: 'hk',
    featured: true,
    cardTitle: 'Discover Hidden Korea：Agoda 慶尚道最高減 HK$200',
    title: 'Agoda Discover Hidden Korea：慶尚道隱藏韓國最高減 HK$200（2026）',
    meta: 'KTO 香港推廣：Agoda 慶尚道、釜山指定酒店最高減 HK$200，預訂期與入住期說明。',
    hero: 'images/agoda/korea-discover-hidden-korea.jpg',
    heroAlt: 'Agoda Discover Hidden Korea 慶尚道卡通橫幅',
    views: 35750,
    intro: '香港讀者專屬感最強的一檔：Agoda「Discover Hidden Korea」推廣頁有慶尚道卡通視覺，指定酒店最高減 HK$200，適合釜山海鮮與東海岸慢遊。',
    sections: [
      { h: '為何值得去慶尚道', ps: ['首爾之外，慶尚道有漁港、山寺、纜車村落；釜山作門戶，海雲台早晨、甘川洞拍照、廣安里夜景。'] },
      { h: '香港用戶優惠怎麼領', ps: ['經合作連結進入 visitkorea 推廣頁，登入符合資格的香港帳號，結帳時指定酒店顯示減免；條款以 Agoda 即時頁面為準。'], img: 'images/agoda/korea-discover-hidden-korea.jpg', imgAlt: 'Agoda 韓國推廣插畫' },
      { h: '四天示例', ps: ['D1-2 釜山市區；D3 東海岸；D4 慢 morning 後 KTX 或航班。'] },
      { h: '美食與選房', ps: ['海鮮市場早午餐；選可寄放行李、遮光好的房型。'], img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=450&fit=crop', imgAlt: '韓國料理' },
    ],
    cta: '預訂 Discover Hidden Korea 指定酒店',
    faq: [['減 HK$200 自動？', '合資格酒店登入後結帳顯示，見即時條款。'], ['只得釜山？', '活動侧重慶尚道，可地圖搜鄰近城市。']],
  },
  {
    slug: 'blog-agoda-payme-hong-kong',
    cId: 45947,
    region: 'hk',
    title: 'Agoda 香港 PayMe 付款與優惠訂房攻略（2026）',
    meta: '香港用戶 Agoda 選 PayMe 結帳：錢包推廣、流程與 staycation 清單。',
    hero: 'https://images.unsplash.com/photo-1536599018102-d9a14291ec09?w=800&h=400&fit=crop',
    heroAlt: '香港海港',
    views: 19880,
    intro: '港人常用 PayMe；Agoda 偶爾有錢包專屬立減，本文說明結帳流程與退款時間。',
    sections: [
      { h: '結帳流程', ps: ['付款頁選 PayMe，確認 app 跳轉完成再關閉瀏覽器；即時截圖確認號。'] },
      { h: '與酒店活動疊加', ps: ['錢包優惠未必可疊其他券，兩種總價都試一次。'] },
    ],
    cta: '用 PayMe 在 Agoda 訂房',
    faq: [['退款回 PayMe？', '依 Agoda 退款時程，錢包入帳或有延遲。']],
  },
];

function buildArticle(c) {
  const link = AFF(c.cId);
  const agoda = AGODA(c.cId);
  const hero = c.hero;
  const region = c.region || 'both';

  const sectionsHtml = (c.sections || [])
    .map((s) => {
      const paras = s.ps.map((p) => `<p>${p}</p>`).join('\n            ');
      const fig = s.img
        ? `\n            <figure style="margin:1.25rem 0;border-radius:8px;overflow:hidden;"><img src="${s.img}" alt="${s.imgAlt || ''}" style="width:100%;height:auto;display:block;" width="800" height="450" loading="lazy"></figure>`
        : '';
      return `            <h2>${s.h}</h2>\n            ${paras}${fig}`;
    })
    .join('\n\n');

  const faqHtml = (c.faq || [])
    .map(([q, a]) => `<p><strong>${q}</strong> ${a}</p>`)
    .join('\n            ');

  const extra = extraZh(agoda, region);

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${c.title} - unLockGames</title>
    <meta name="description" content="${c.meta}">
    <link rel="stylesheet" href="../blog-traditional.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/${c.slug}.html">
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
                <li><a href="category-travel.html">Agoda 訂房</a></li>
            </ul></div></nav>
    <main class="article-content" style="max-width:800px;margin:2rem auto;padding:0 20px;">
        <a href="category-travel.html" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#0d9488;">&larr; 旅遊與訂房</a>
        <article>
            <h1>${c.title}</h1>
            <p style="color:#64748b;font-size:0.9rem;margin-bottom:1.5rem;">${c.date} · <a href="category-travel.html">旅遊</a> · <span class="category-mag-tag">${c.tag || 'Agoda'}</span><span class="view-count" aria-label="瀏覽" style="margin-left:0.75rem;">&#128065; ${c.views.toLocaleString('en-US')}</span></p>
            <div class="article-hero-img" style="margin-bottom:1.5rem;border-radius:8px;overflow:hidden;"><img src="${hero}" alt="${c.heroAlt || c.title}" style="width:100%;height:auto;display:block;" width="800" height="400" loading="eager"></div>

            <p><strong>適合誰：</strong>${c.intro}</p>

${sectionsHtml}
${extra}

            <h2>常見問題</h2>
            ${faqHtml}

            <h2>重點整理</h2>
            <ul>
                <li>請經 ${agoda} 進入，促銷與合作追蹤才易正確套用。</li>
                <li>機票、簽證未穩定前，優先<strong>免費取消</strong>房型。</li>
                <li>以<strong>結帳總價</strong>比較，唔好只睇單晚標價。</li>
                <li>多看旅客近照，核實房間大小與噪音。</li>
            </ul>

            <p>準備訂房？<a href="${link}" target="_blank" rel="sponsored noopener noreferrer"><strong>${c.cta}</strong></a>—結帳前請以 Agoda 即時優惠條款為準。</p>

            <section class="article-comments" id="comments">
                <h3>留言</h3>
                <div class="comment-list">
                    <div class="comment-item"><strong>旅客</strong><span class="comment-date">${c.date}</span><p>上月經 Agoda 訂房，總價與結帳一致，入住順利。</p></div>
                </div>
                <form class="comment-form" id="commentForm" onsubmit="event.preventDefault(); document.getElementById('commentNote').style.display='block'; this.reset();">
                    <input type="text" name="name" placeholder="你的名字" required>
                    <input type="email" name="email" placeholder="電郵" required>
                    <textarea name="comment" placeholder="留言內容…" rows="4" required></textarea>
                    <button type="submit">發佈留言</button>
                </form>
                <p class="comment-note" id="commentNote" style="display:none;">多謝留言！留言經審核後會顯示。</p>
            </section>
            <p style="font-size:0.85rem;color:#94a3b8;"><em>披露：透過本站 Agoda 合作連結訂房，我們可能獲得佣金，你不會被額外收費。Agoda 為獨立品牌，unLockGames 未獲 Agoda 背書。</em></p>
        </article>
    </main>
    <footer class="blog-footer"><div class="container">
            <div class="footer-links"><a href="../index.html">首頁</a><a href="../about.html">關於</a><a href="../privacy.html">私隱</a></div>
            <p class="footer-bottom"><strong>披露：</strong>透過合作連結訂房或購物，我們可能獲得佣金。</p>
            <p class="footer-bottom">&copy; 2025 unLockGames. All rights reserved.</p>
        </div></footer>
    <script src="../ai-assistant.js"></script>
    <script src="../i18n-embedded.js" defer></script>
    <script src="../site-i18n.js" defer></script>
</body>
</html>
`;
}

for (const c of creatives) {
  c.date = c.date || '2026-06-24';
  fs.writeFileSync(path.join(blogsDir, `${c.slug}.html`), buildArticle(c), 'utf8');
  console.log('Wrote', c.slug);
}

const featuredOrder = [
  'blog-agoda-hk-hotel-deals',
  'blog-agoda-tw-deals',
  'blog-agoda-korea-discover-hidden-2026',
  'blog-agoda-japan-extra-10-off',
];
const featuredSorted = featuredOrder
  .map((slug) => creatives.find((c) => c.slug === slug))
  .filter(Boolean);

const indexPath = path.join(__dirname, '..', 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');

const cardTitle = (c) => c.cardTitle || c.title.replace(/（2026）$/, '').replace(/ \(2026\)$/, '');

const agodaCards = featuredSorted
  .map(
    (c) => `                <a class="home-spotlight-card home-spotlight-card--featured" href="blogs/${c.slug}.html">
                    <span class="home-spotlight-card-title">${cardTitle(c)}</span>
                    <span class="home-spotlight-media"><img src="${c.hero.startsWith('http') ? c.hero : 'blogs/' + c.hero}" alt="" width="560" height="315" loading="lazy" decoding="async"></span>
                </a>`
  )
  .join('\n');

const agodaBlock = `            <p class="home-spotlight-subhead">Agoda · travel &amp; stays (HK &amp; TW) <span class="home-spotlight-badge">Featured</span></p>
            <p class="home-spotlight-intro">Planning a Hong Kong weekend staycation, a Taiwan short break, or a trip to Japan, Korea, or Thailand? Compare Agoda live rates, free-cancellation rooms, and regional promos before you commit. Four guides below cover Hong Kong hotel deals, Taiwan city picks, Korea&apos;s Gyeongsang-do campaign, and Japan extra savings—so you can shortlist a stay quickly.</p>
            <div class="home-spotlight-cards home-spotlight-cards--agoda">
${agodaCards}
            </div>
`;

if (index.includes('home-spotlight-cards--agoda')) {
  index = index.replace(
    /            <p class="home-spotlight-subhead">Agoda[^<]*<\/p>\s*(?:<p class="home-spotlight-intro">[\s\S]*?<\/p>\s*)?<div class="home-spotlight-cards home-spotlight-cards--agoda">[\s\S]*?<\/div>\s*/,
    agodaBlock
  );
}

// Index spotlight: do not patch combined intro — edit index.html directly per brand.

fs.writeFileSync(indexPath, index, 'utf8');
console.log('Updated index spotlight (HK/TW featured)');

// Update sidebar Agoda entries
const sidebarBlock = featuredSorted
  .map(
    (c) =>
      `                <li class="sidebar-featured"><a href="blogs/${c.slug}.html">${cardTitle(c)}</a><span class="sidebar-date"><span class="date-text">${c.date}</span><span class="view-count" aria-label="views">&#128065; ${c.views.toLocaleString('en-US')}</span></span></li>`
  )
  .join('\n');

index = fs.readFileSync(indexPath, 'utf8');
index = index.replace(
  /                <li class="sidebar-featured"><a href="blogs\/blog-agoda-korea-discover-hidden-2026\.html">[\s\S]*?<\/li>\s*                <li class="sidebar-featured"><a href="blogs\/blog-agoda-japan-extra-10-off\.html">[\s\S]*?<\/li>\s*                <li class="sidebar-featured"><a href="blogs\/blog-agoda-hk-hotel-deals\.html">[\s\S]*?<\/li>\s*                <li class="sidebar-featured"><a href="blogs\/blog-agoda-macao-mgto\.html">[\s\S]*?<\/li>\s*/,
  sidebarBlock + '\n'
);
fs.writeFileSync(indexPath, index, 'utf8');
console.log('Updated sidebar');

console.log('Done:', creatives.length, 'zh-Hant articles');
