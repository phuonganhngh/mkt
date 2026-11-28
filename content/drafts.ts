import type { Locale } from "./site";
import type { Document } from "./documents";

const headings = {
  en: ["Project Overview", "My Role", "Challenge", "Solution", "Execution & Deliverables", "Results"],
  ja: ["プロジェクト概要", "担当業務", "課題", "解決策", "施策と制作物", "成果"],
};

const copy = {
  social: {
    en: [
      "Creating authentic travel content for social media with limited production resources.",
      "Content planning, destination exploration, shooting and editing in support of marketing.",
      "Create authentic travel videos by handling the creative process myself, from concept and filming to editing, without a professional production team or expensive equipment.",
      "Use a traveler’s perspective to decide what to explore, capture and explain.",
      "",
      "Confirmed outcomes are pending.",
    ],
    ja: [
      "限られた制作リソースで、旅行体験の魅力を伝えるSNSコンテンツを制作。",
      "マーケティング施策の一環として、コンテンツの企画、観光地の取材、撮影・編集を担当。",
      "プロの制作チームや高価な機材に頼らず、企画から撮影、編集まで自ら担い、リアルな旅の体験を伝える動画を制作すること。",
      "旅行者の視点から、調査・撮影・紹介する内容を選定。",
      "",
      "確認済みの成果は準備中です。",
    ],
  },
  visual: {
    en: [
      "Visual communication for brochures, posters, menus and event materials.",
      "Project-specific responsibilities are pending.",
      "Help international travelers find and understand practical information.",
      "Organize information by priority and use consistent layouts and typography across related materials.",
      "",
      "Confirmed outcomes are pending.",
    ],
    ja: [
      "パンフレット、ポスター、メニュー、イベント資料のビジュアルコミュニケーション。",
      "プロジェクトごとの担当範囲は準備中です。",
      "海外旅行者が必要な情報を見つけ、理解しやすくすること。",
      "情報に優先順位を付け、関連資料のレイアウトとタイポグラフィに一貫性を持たせる。",
      "",
      "確認済みの成果は準備中です。",
    ],
  },
  advertising: {
    en: [
      "Campaign objectives and target audience are pending.",
      "Campaign responsibilities and advertising platforms are pending.",
      "The campaign’s specific marketing challenge is pending.",
      "Targeting and creative strategy details are pending.",
      "Approved creative and campaign execution details are pending.",
      "Performance analysis and any publishable results are pending.",
    ],
    ja: [
      "キャンペーンの目的とターゲットは準備中です。",
      "担当範囲と広告配信プラットフォームは準備中です。",
      "キャンペーンの具体的な課題は準備中です。",
      "ターゲティングとクリエイティブ戦略の詳細は準備中です。",
      "掲載用クリエイティブと配信施策の詳細は準備中です。",
      "効果分析と公開可能な成果は準備中です。",
    ],
  },
};

// This case documents awareness-focused hands-on advertising, not conversion optimization.
// Keep the original content in EN/JP and do not display an empty media placeholder.
const advertisingCase: Record<Locale, Document> = {
  en: {
    title: "Digital Advertising",
    sections: [
      {
        title: "Project Overview",
        blocks: [
          "The primary objective of the paid social advertising we use is to build brand awareness in selected overseas markets, rather than directly optimize booking conversions.",
          "I worked mainly with Google Ads, Meta Ads and TikTok Ads."
        ],
      },
      {
        title: "My Role",
        blocks: [
          "I gained hands-on experience running campaigns, including:",
          "- Selecting overseas markets and setting up audiences within the advertising platforms.",
          "- Preparing and selecting visual content for the ads.",
          "- Configuring campaigns, budgets and delivery settings.",
          "- Reviewing basic platform metrics such as reach, impressions, clicks and video engagement."
        ],
      },
      {
        title: "Challenge",
        blocks: [
          "The hotel wanted to reach more FIT beyond Japan. At the awareness stage, the challenge was to introduce the hotel and destination to people who might not yet be familiar with Noboribetsu."
        ],
      },
      {
        title: "Approach",
        blocks: [
          "- **Audience Targeting:** Set up ad targeting based on location, demographics, and audience interests.",
          "- **Experience-Led Creative:** Used content featuring the hotel, onsen and local travel experiences.",
          "- **Hands-on Execution:** Set up and ran paid social campaigns on Meta and TikTok with limited budgets.",
          "- **Campaign Review:** Looked at the advertising platforms' delivery and engagement metrics to understand what each campaign reached."
        ],
      },
      {
        title: "Key Takeaway",
        blocks: [
          "Running these campaigns gave me practical experience with digital advertising platforms and a better understanding of how paid media can support brand visibility. It also highlighted the importance of looking beyond campaign metrics and considering how advertising fits into the broader marketing strategy."
        ],
      },
    ],
  },
  ja: {
    title: "デジタル広告",
    sections: [
      {
        title: "プロジェクト概要",
        blocks: [
          "登別グランドホテルの海外マーケティング施策の一環として、海外市場におけるブランド認知向上を主な目的としたSNS広告を実施しました。宿泊予約のコンバージョン最適化を直接の目標とした施策ではありません。",
          "主にGoogle広告、Meta広告、TikTok広告を使用しました。"
        ],
      },
      {
        title: "担当業務",
        blocks: [
          "SNS広告の運用を実践し、以下の業務を担当しました。",
          "- 対象とする海外市場の選定と広告配信先の設定。",
          "- 広告に使用する画像・動画コンテンツの準備と選定。",
          "- キャンペーン、予算、配信設定の操作。",
          "- リーチ、インプレッション、クリック、動画エンゲージメントなどの基本指標の確認。"
        ],
      },
      {
        title: "課題",
        blocks: [
          "日本国外のFITへの認知拡大を目指す中、認知段階では、登別をまだよく知らない旅行者にホテルと観光地の魅力を伝えることが課題でした。"
        ],
      },
      {
        title: "アプローチ",
        blocks: [
          "- **海外市場への配信：** 地域、年齢などの属性、興味・関心に基づいて広告のターゲティングを設定。",
          "- **体験を伝える素材：** ホテル、温泉、周辺の観光体験を紹介するコンテンツを活用。",
          "- **実務での運用：** 限られた予算でMeta広告とTikTok広告の設定・配信を実施。",
          "- **配信結果の確認：** 広告管理画面で配信・エンゲージメント指標を確認し、各キャンペーンのリーチを把握。"
        ],
      },
      {
        title: "この経験から得たこと",
        blocks: [
          "これらの広告キャンペーンを通じて、デジタル広告プラットフォームを実際に運用する経験を積み、有料広告がブランドの認知向上にどのように役立つかをより深く理解しました。また、広告の指標だけでなく、広告施策がマーケティング戦略全体の中でどのような役割を果たすかを考えることの重要性も学びました。"
        ],
      },
    ],
  },
};

type DraftId = keyof typeof copy;

export function draftDocument(id: DraftId, locale: Locale, title: string): Document {
  if (id === "advertising") { const doc = advertisingCase[locale]; return { ...doc, sections: [...doc.sections.slice(0, 4), { title: locale === "en" ? "Campaign Performance Analysis" : "広告キャンペーンの効果分析", blocks: [locale === "en" ? "Monitor and evaluate advertising performance across international markets using reach, impressions, CTR, CPC, CPM, frequency and video engagement metrics to inform future campaign planning and budget allocation." : "海外市場における広告効果をリーチ、インプレッション、CTR、CPC、CPM、フリークエンシー、動画エンゲージメントなどの指標で分析・評価し、今後のキャンペーン企画や予算配分に活用する。"] }, ...doc.sections.slice(4)] }; }
  const sections = headings[locale].map((heading, index) => ({
      title: heading,
      blocks: index === 4 && (id === "visual" || id === "social") ? ["@examples"] : index === 4 ? [copy[id][locale][index], "@examples"] : [copy[id][locale][index]],
    })).filter((_, index) => (id !== "social" && id !== "visual") || index !== 5);
  if (id === "social") sections.splice(4, 0, { title: locale === "en" ? "Content Strategy & Planning" : "コンテンツ戦略・企画", blocks: locale === "en" ? ["*One Hotel. Multiple Content Objectives.*","| Content Pillar | Content Topic | Communication Objective | Target Audience |","| --- | --- | --- | --- |","| Product & Experience | Onsen, sauna, buffet, guestrooms | Product awareness & consideration | Wellness, leisure and food-oriented travelers |","| Destination Inspiration | Things to Do, local attractions, festivals | Destination awareness | International FIT |","| Travel Education | Onsen etiquette, transportation | Reduce travel uncertainty | First-time visitors |","| Brand Storytelling | Yukata, Japanese hospitality, stay experience | Brand differentiation | Culture-oriented travelers |","| Social Proof | Creator collaborations, guest experiences | Build trust | Potential hotel guests |"] : ["*一つのホテル、多様な情報発信の目的。*","| コンテンツの柱 | テーマ | コミュニケーション目的 | ターゲット |","| --- | --- | --- | --- |","| 商品・体験 | 温泉、サウナ、ビュッフェ、客室 | 認知・利用検討 | ウェルネス、レジャー、食に関心のある旅行者 |","| 旅先の魅力 | Things to Do、観光地、祭り | 観光地の認知向上 | 海外個人旅行者（FIT） |","| 旅行情報 | 温泉マナー、交通アクセス | 旅行前の不安解消 | 初訪問の旅行者 |","| ブランドストーリー | 浴衣、日本のおもてなし、滞在体験 | ブランドの差別化 | 文化に関心のある旅行者 |","| 第三者による信頼形成 | クリエイターとの連携、宿泊客の体験 | 信頼の醸成 | 宿泊を検討する旅行者 |"] });
  return { title, sections };
}
