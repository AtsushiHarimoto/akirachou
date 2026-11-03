export const LANGS = ['ja', 'en', 'zh-Hant', 'zh-Hans'] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = {
  ja: '日本語',
  en: 'EN',
  'zh-Hant': '繁中',
  'zh-Hans': '简中',
};

export interface Feature {
  name: string;
  desc: string;
}
export interface FeatureGroup {
  id: string;
  title: string;
  lead: string;
  shot: string;
  items: Feature[];
}
export interface Era {
  period: string;
  field: string;
  role: string;
  points: string[];
  current?: boolean;
}
export interface Copy {
  htmlLang: string;
  nav: { studio: string; career: string; work: string; stack: string; contact: string };
  hero: { kicker: string; title: string; lead: string };
  stats: { value: string; label: string }[];
  studio: { label: string; title: string; lead: string; flowTitle: string; flow: string[]; groups: FeatureGroup[]; shotPending: string };
  career: { label: string; title: string; lead: string; eras: Era[] };
  work: { label: string; title: string; lead: string; cta: string };
  stack: { label: string; title: string; groups: { name: string; items: string[] }[] };
  contact: { label: string; title: string; lead: string; cta: string };
  footer: string;
}

const STACK = [
  { name: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'React Native'] },
  { name: 'Mobile', items: ['iOS (Swift)', 'Android (Kotlin / Java)'] },
  { name: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Java', 'PostgreSQL', 'SQLite'] },
  { name: 'AI', items: ['LLM integration', 'Agents / MCP', 'RAG', 'Image & video generation', 'LoRA training'] },
  { name: 'Ops', items: ['Linux', 'Docker', 'systemd', 'GitHub Actions'] },
];

const SHOT = (id: string) => `/shots/${id}.webp`;

export const COPY: Record<Lang, Copy> = {
  ja: {
    htmlLang: 'ja',
    nav: { studio: 'スタジオ', career: '経歴', work: '作品', stack: '技術', contact: 'お問い合わせ' },
    hero: {
      kicker: 'AKIRA CHŌ — Product Engineer',
      title: '作って、出して、動かし続ける。',
      lead: '15年にわたるプロダクト開発経験。AIコンテンツ制作スタジオを自ら設計・運用しています。',
    },
    stats: [
      { value: '15+', label: '年のプロダクト開発' },
      { value: '17', label: 'スタジオの機能' },
      { value: '4', label: '分野（IoT・ドローン・金融・企業向けシステム）' },
      { value: 'N2', label: '日本語能力試験' },
    ],
    studio: {
      label: '01 — Studio',
      title: 'AIコンテンツ制作スタジオ「沫工場」',
      lead: '物語・映像・ゲームの企画から公開までを一元管理する自作のWebアプリ。毎日使っています。',
      flowTitle: '制作の流れ',
      flow: ['着想', '脚本・小説', 'キャラクターと素材', '画像・映像の生成', 'レビュー・修正', '公開'],
      shotPending: 'スクリーンショット準備中',
      groups: [
        { id: 'story', title: '物語', lead: '着想を集め、長編へ育てる。', shot: SHOT('story'), items: [
          { name: '小説', desc: '章ごとの執筆と進捗管理' },
          { name: 'インスピレーション', desc: '思いつきを一か所に集めるボード' },
        ] },
        { id: 'film', title: '映像', lead: '制作依頼から完成までをチケットで管理する。', shot: SHOT('film'), items: [
          { name: '作品', desc: '作品ごとのカット・素材の一覧' },
          { name: 'MV', desc: '楽曲に合わせたMV制作' },
          { name: '制作依頼', desc: '生成依頼をチケットで管理し、確認・承認・差し戻しを行う' },
          { name: '楽曲', desc: '曲の制作と管理' },
        ] },
        { id: 'game', title: 'ゲーム', lead: '企画書からリリースまで。', shot: SHOT('game'), items: [
          { name: 'ゲーム企画', desc: 'シナリオと仕様の整理' },
          { name: 'リリース管理', desc: 'ビルドと公開の管理' },
        ] },
        { id: 'assets', title: '素材', lead: '素材を管理し、キャラクターの見た目をそろえる。', shot: SHOT('assets'), items: [
          { name: '画像LoRA', desc: 'キャラクター画像モデルの管理' },
          { name: '動画LoRA', desc: '動画向けモデルの管理' },
          { name: '学習ウィザード', desc: '素材準備から学習までをステップ形式でガイド' },
          { name: 'キャラクターライブラリ', desc: 'キャラクターの見た目を一元管理' },
          { name: '音楽ライブラリ', desc: 'BGM・楽曲素材' },
          { name: '音声ライブラリ', desc: 'キャラクターボイス素材' },
        ] },
        { id: 'reference', title: 'リファレンス', lead: '名作を分析し、制作に活かす。', shot: SHOT('reference'), items: [
          { name: '映画鑑賞', desc: '観た作品の記録と評価' },
          { name: '絵コンテ資料集', desc: 'カット構成の参考資料' },
          { name: '映像分析', desc: '作品の演出を要素ごとに分析し、記録' },
        ] },
      ],
    },
    career: {
      label: '02 — Career',
      title: '15年の経歴',
      lead: 'モバイルアプリ、Web、業務システム、AI関連の開発に携わってきました。チームリーダーとブリッジSEを経験しています。',
      eras: [
        { period: '2025 —', field: 'エンタープライズIT（日本）', role: 'ブリッジSE', current: true, points: ['顧客との技術調整・障害対応', 'AI基盤の構築に参画'] },
        { period: '2024 — 2025', field: '金融（日本）', role: 'システムエンジニア', points: ['金融機関向けアプリの開発'] },
        { period: '2021 — 2023', field: 'ドローン', role: 'システム開発エンジニア', points: ['ドローン業界向けシステムの開発'] },
        { period: '2014 — 2021', field: 'エンタープライズ・モバイル／Web', role: 'フルスタックエンジニア → チームリーダー', points: ['iOS／Android／Vue.js のフルスタック開発', '設計・技術選定を担当し、開発工程の各段階に参加'] },
        { period: '2009 — 2014', field: 'スマートホーム・IoT', role: 'モバイルアプリエンジニア → チームリーダー', points: ['IoTデバイス連携モバイルアプリの開発'] },
      ],
    },
    work: { label: '03 — Work', title: '作品', lead: 'スタジオで制作したゲームとオリジナルIPを公式サイトで公開しています。', cta: 'moyinverse.com を見る' },
    stack: { label: '04 — Stack', title: '技術', groups: STACK },
    contact: { label: '05 — Contact', title: 'お問い合わせ', lead: 'お仕事のご相談は、GitHubのプロフィールからご連絡ください。', cta: 'GitHub' },
    footer: '© AKIRA CHŌ',
  },
  en: {
    htmlLang: 'en',
    nav: { studio: 'Studio', career: 'Career', work: 'Work', stack: 'Stack', contact: 'Contact' },
    hero: {
      kicker: 'AKIRA CHŌ — Product Engineer',
      title: 'Built, shipped, running.',
      lead: '15 years of product development, and an AI content studio I designed and run on my own.',
    },
    stats: [
      { value: '15+', label: 'years building products' },
      { value: '17', label: 'studio features' },
      { value: '4', label: 'areas: IoT, drones, finance, enterprise software' },
      { value: 'N2', label: 'Japanese (JLPT)' },
    ],
    studio: {
      label: '01 — Studio',
      title: 'An AI content studio I built and use every day',
      lead: 'A web app I built to manage stories, films and games from first idea to release.',
      flowTitle: 'Production workflow',
      flow: ['Idea', 'Script / novel', 'Characters & assets', 'Image & video generation', 'Review & revision', 'Release'],
      shotPending: 'Screenshot coming soon',
      groups: [
        { id: 'story', title: 'Story', lead: 'Collect ideas and develop them into long-form stories.', shot: SHOT('story'), items: [
          { name: 'Novels', desc: 'Chapter writing and progress tracking' },
          { name: 'Inspiration', desc: 'One board for collecting ideas' },
        ] },
        { id: 'film', title: 'Film', lead: 'Shot requests tracked as tickets, from request to completion.', shot: SHOT('film'), items: [
          { name: 'Productions', desc: 'Shots and assets per production' },
          { name: 'Music videos', desc: 'Music videos made for a track' },
          { name: 'Requests', desc: 'Generation requests tracked as tickets, then approved or returned for revision' },
          { name: 'Songs', desc: 'Song creation and management' },
        ] },
        { id: 'game', title: 'Game', lead: 'From design document to release.', shot: SHOT('game'), items: [
          { name: 'Game design', desc: 'Scenario and spec organization' },
          { name: 'Release management', desc: 'Builds and publishing' },
        ] },
        { id: 'assets', title: 'Assets', lead: 'Assets that keep character appearances consistent.', shot: SHOT('assets'), items: [
          { name: 'Image LoRA', desc: 'Character image models' },
          { name: 'Video LoRA', desc: 'Models for video' },
          { name: 'Training wizard', desc: 'Step-by-step from dataset to trained model' },
          { name: 'Character library', desc: 'Appearance references for every character' },
          { name: 'Music library', desc: 'Background music and song assets' },
          { name: 'Voice library', desc: 'Character voice assets' },
        ] },
        { id: 'reference', title: 'Reference', lead: 'Study great films and apply what I learn to my own work.', shot: SHOT('reference'), items: [
          { name: 'Film journal', desc: 'Notes and ratings on films watched' },
          { name: 'Storyboard references', desc: 'Shot composition library' },
          { name: 'Film analysis', desc: 'Directing choices broken into reusable parts' },
        ] },
      ],
    },
    career: {
      label: '02 — Career',
      title: '15 years of experience',
      lead: 'Mobile apps, web and enterprise systems, and now AI. I have worked as a team lead and as a bridge systems engineer.',
      eras: [
        { period: '2025 —', field: 'Enterprise IT (Japan)', role: 'Bridge Systems Engineer', current: true, points: ['Technical coordination and incident response with the client', 'Contributing to the development of an AI platform'] },
        { period: '2024 — 2025', field: 'Finance (Japan)', role: 'Systems Engineer', points: ['App development for a financial institution'] },
        { period: '2021 — 2023', field: 'Drones', role: 'Software Engineer', points: ['Developed systems for the drone industry'] },
        { period: '2014 — 2021', field: 'Enterprise mobile & web', role: 'Full-stack Engineer → Team Lead', points: ['Full-stack development across iOS, Android and Vue.js', 'Led system design and technology selection; worked across each stage of development'] },
        { period: '2009 — 2014', field: 'Smart home & IoT', role: 'Mobile Developer → Team Lead', points: ['Mobile apps for connected devices'] },
      ],
    },
    work: { label: '03 — Work', title: 'Work', lead: 'Games and original IP created with the studio are published on the official site.', cta: 'Visit moyinverse.com' },
    stack: { label: '04 — Stack', title: 'Stack', groups: STACK },
    contact: { label: '05 — Contact', title: 'Contact', lead: 'For work inquiries, contact me through my GitHub profile.', cta: 'GitHub' },
    footer: '© AKIRA CHŌ',
  },
  'zh-Hant': {
    htmlLang: 'zh-Hant',
    nav: { studio: '工作室', career: '經歷', work: '作品', stack: '技術', contact: '聯絡' },
    hero: {
      kicker: 'AKIRA CHŌ — Product Engineer',
      title: '做出來、發出去、一直在跑。',
      lead: '15 年產品開發經驗，加上一座我自己設計、自己營運的 AI 內容製作工作室。',
    },
    stats: [
      { value: '15+', label: '年產品開發' },
      { value: '17', label: '項工作室功能' },
      { value: '4', label: '個領域：IoT・無人機・金融・企業系統' },
      { value: 'N2', label: '日本語能力試驗' },
    ],
    studio: {
      label: '01 — Studio',
      title: 'AI 內容製作工作室「沫工場」',
      lead: '我自己做的 Web 應用，讓故事、影像、遊戲從靈感走到發佈都在同一個地方完成，每天實際在用。',
      flowTitle: '製作流程',
      flow: ['靈感', '劇本・小說', '角色與素材', '出圖・出片', '審核與修改', '發佈'],
      shotPending: '截圖準備中',
      groups: [
        { id: 'story', title: '故事', lead: '收集靈感，長成長篇。', shot: SHOT('story'), items: [
          { name: '小說', desc: '分章寫作與進度管理' },
          { name: '靈感', desc: '隨手想法集中在一塊板上' },
        ] },
        { id: 'film', title: '影視', lead: '從下單到交片，每一鏡都走工單。', shot: SHOT('film'), items: [
          { name: '作品', desc: '每部作品的鏡頭與素材一覽' },
          { name: 'MV', desc: '跟著歌曲做 MV' },
          { name: '下單', desc: '生成需求變成工單，收下或退回把關品質' },
          { name: '歌曲', desc: '歌曲製作與管理' },
        ] },
        { id: 'game', title: '遊戲', lead: '從企劃到發佈。', shot: SHOT('game'), items: [
          { name: '遊戲策劃', desc: '劇情與規格整理' },
          { name: '發佈管理', desc: '版本建置與發佈' },
        ] },
        { id: 'assets', title: '素材', lead: '用素材守住角色一致性。', shot: SHOT('assets'), items: [
          { name: '圖片 LoRA', desc: '角色圖片模型管理' },
          { name: '視頻 LoRA', desc: '影片用模型管理' },
          { name: '訓練精靈', desc: '從準備素材到訓練一步步帶著走' },
          { name: '演員庫', desc: '角色長相集中管理' },
          { name: '音樂庫', desc: '配樂與歌曲素材' },
          { name: '語音庫', desc: '角色配音素材' },
        ] },
        { id: 'reference', title: '參考', lead: '向好作品學，再用回製作。', shot: SHOT('reference'), items: [
          { name: '電影鑑賞', desc: '看過作品的紀錄與評分' },
          { name: '分鏡參考', desc: '鏡頭構成參考集' },
          { name: '影片蒸餾', desc: '把作品的演出拆成可重用的要素' },
        ] },
      ],
    },
    career: {
      label: '02 — Career',
      title: '15 年經歷',
      lead: '從行動端到 Web、企業系統，再到 AI。帶過團隊，也做過橋接 SE。',
      eras: [
        { period: '2025 —', field: '企業 IT（日本）', role: '橋接 SE', current: true, points: ['與委託方的技術協調與故障處理', '參與 AI 基盤建置'] },
        { period: '2024 — 2025', field: '金融（日本）', role: '系統工程師', points: ['金融機構 App 開發'] },
        { period: '2021 — 2023', field: '無人機', role: '系統開發工程師', points: ['無人機產業系統開發'] },
        { period: '2014 — 2021', field: '企業行動端／Web', role: '全端工程師 → 團隊負責人', points: ['iOS／Android／Vue.js 全端開發', '負責設計與技術選型，參與各開發階段'] },
        { period: '2009 — 2014', field: '智慧家居・IoT', role: '行動 App 工程師 → 團隊負責人', points: ['IoT 裝置連動的行動 App 開發'] },
      ],
    },
    work: { label: '03 — Work', title: '作品', lead: '工作室做的遊戲與原創 IP 放在官方網站。', cta: '前往 moyinverse.com' },
    stack: { label: '04 — Stack', title: '技術', groups: STACK },
    contact: { label: '05 — Contact', title: '聯絡', lead: '工作洽詢請透過 GitHub。', cta: 'GitHub' },
    footer: '© AKIRA CHŌ',
  },
  'zh-Hans': {
    htmlLang: 'zh-Hans',
    nav: { studio: '工作室', career: '经历', work: '作品', stack: '技术', contact: '联系' },
    hero: {
      kicker: 'AKIRA CHŌ — Product Engineer',
      title: '做出来、发出去、一直在跑。',
      lead: '15 年产品开发经验，加上一座我自己设计、自己运营的 AI 内容制作工作室。',
    },
    stats: [
      { value: '15+', label: '年产品开发' },
      { value: '17', label: '项工作室功能' },
      { value: '4', label: '个领域：IoT・无人机・金融・企业系统' },
      { value: 'N2', label: '日本语能力考试' },
    ],
    studio: {
      label: '01 — Studio',
      title: 'AI 内容制作工作室「沫工场」',
      lead: '我自己做的 Web 应用，让故事、影像、游戏从灵感走到发布都在同一个地方完成，每天实际在用。',
      flowTitle: '制作流程',
      flow: ['灵感', '剧本・小说', '角色与素材', '出图・出片', '审核与修改', '发布'],
      shotPending: '截图准备中',
      groups: [
        { id: 'story', title: '故事', lead: '收集灵感，长成长篇。', shot: SHOT('story'), items: [
          { name: '小说', desc: '分章写作与进度管理' },
          { name: '灵感', desc: '随手想法集中在一块板上' },
        ] },
        { id: 'film', title: '影视', lead: '从下单到交片，每一镜都走工单。', shot: SHOT('film'), items: [
          { name: '作品', desc: '每部作品的镜头与素材一览' },
          { name: 'MV', desc: '跟着歌曲做 MV' },
          { name: '下单', desc: '生成需求变成工单，收下或退回把关质量' },
          { name: '歌曲', desc: '歌曲制作与管理' },
        ] },
        { id: 'game', title: '游戏', lead: '从企划到发布。', shot: SHOT('game'), items: [
          { name: '游戏策划', desc: '剧情与规格整理' },
          { name: '发布管理', desc: '版本构建与发布' },
        ] },
        { id: 'assets', title: '素材', lead: '用素材守住角色一致性。', shot: SHOT('assets'), items: [
          { name: '图片 LoRA', desc: '角色图片模型管理' },
          { name: '视频 LoRA', desc: '视频用模型管理' },
          { name: '训练精灵', desc: '从准备素材到训练一步步带着走' },
          { name: '演员库', desc: '角色长相集中管理' },
          { name: '音乐库', desc: '配乐与歌曲素材' },
          { name: '语音库', desc: '角色配音素材' },
        ] },
        { id: 'reference', title: '参考', lead: '向好作品学，再用回制作。', shot: SHOT('reference'), items: [
          { name: '电影鉴赏', desc: '看过作品的记录与评分' },
          { name: '分镜参考', desc: '镜头构成参考集' },
          { name: '影片蒸馏', desc: '把作品的演出拆成可复用的要素' },
        ] },
      ],
    },
    career: {
      label: '02 — Career',
      title: '15 年经历',
      lead: '从移动端到 Web、企业系统，再到 AI。带过团队，也做过桥接 SE。',
      eras: [
        { period: '2025 —', field: '企业 IT（日本）', role: '桥接 SE', current: true, points: ['与委托方的技术协调与故障处理', '参与 AI 基盘建设'] },
        { period: '2024 — 2025', field: '金融（日本）', role: '系统工程师', points: ['金融机构 App 开发'] },
        { period: '2021 — 2023', field: '无人机', role: '系统开发工程师', points: ['无人机行业系统开发'] },
        { period: '2014 — 2021', field: '企业移动端／Web', role: '全栈工程师 → 团队负责人', points: ['iOS／Android／Vue.js 全栈开发', '负责设计与技术选型，参与各开发阶段'] },
        { period: '2009 — 2014', field: '智能家居・IoT', role: '移动 App 工程师 → 团队负责人', points: ['IoT 设备联动的移动 App 开发'] },
      ],
    },
    work: { label: '03 — Work', title: '作品', lead: '工作室做的游戏与原创 IP 放在官方网站。', cta: '前往 moyinverse.com' },
    stack: { label: '04 — Stack', title: '技术', groups: STACK },
    contact: { label: '05 — Contact', title: '联系', lead: '工作洽询请通过 GitHub。', cta: 'GitHub' },
    footer: '© AKIRA CHŌ',
  },
};

export const LINKS = {
  github: 'https://github.com/AtsushiHarimoto',
  portal: 'https://moyinverse.com/',
};
