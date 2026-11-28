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
      "@editing-tools",
      "Confirmed outcomes are pending.",
    ],
    ja: [
      "限られた制作リソースで、旅行体験の魅力を伝えるSNSコンテンツを制作。",
      "マーケティング施策の一環として、コンテンツの企画、観光地の取材、撮影・編集を担当。",
      "プロの制作チームや高価な機材に頼らず、企画から撮影、編集まで自ら担い、リアルな旅の体験を伝える動画を制作すること。",
      "旅行者の視点から、調査・撮影・紹介する内容を選定。",
      "@editing-tools",
      "確認済みの成果は準備中です。",
    ],
  },
  visual: {
    en: [
      "Visual communication for brochures, posters, menus and event materials.",
      "Project-specific responsibilities are pending.",
      "Help international travelers find and understand practical information.",
      "Organize information by priority and use consistent layouts and typography across related materials.",
      "Approved examples of brochures, posters, menus and other collateral are pending.",
      "Confirmed outcomes are pending.",
    ],
    ja: [
      "パンフレット、ポスター、メニュー、イベント資料のビジュアルコミュニケーション。",
      "プロジェクトごとの担当範囲は準備中です。",
      "海外旅行者が必要な情報を見つけ、理解しやすくすること。",
      "情報に優先順位を付け、関連資料のレイアウトとタイポグラフィに一貫性を持たせる。",
      "掲載用のパンフレット、ポスター、メニューなどの制作物は準備中です。",
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

type DraftId = keyof typeof copy;

export function draftDocument(id: DraftId, locale: Locale, title: string): Document {
  const sections = headings[locale].map((heading, index) => ({
      title: heading,
      blocks: index === 4 ? [copy[id][locale][index], "@examples"] : [copy[id][locale][index]],
    }));
  if (id === "social") sections.splice(4, 0, { title: locale === "en" ? "Content Strategy & Planning" : "コンテンツ戦略・企画", blocks: locale === "en" ? ["*One Hotel. Multiple Content Objectives.*","| Content Pillar | Content Topic | Communication Objective | Target Audience |","| --- | --- | --- | --- |","| Product & Experience | Onsen, sauna, buffet, guestrooms | Product awareness & consideration | Wellness, leisure and food-oriented travelers |","| Destination Inspiration | Things to Do, local attractions, festivals | Destination awareness | International FIT |","| Travel Education | Onsen etiquette, transportation | Reduce travel uncertainty | First-time visitors |","| Brand Storytelling | Yukata, Japanese hospitality, stay experience | Brand differentiation | Culture-oriented travelers |","| Social Proof | Creator collaborations, guest experiences | Build trust | Potential hotel guests |"] : ["*一つのホテル、多様な情報発信の目的。*","| コンテンツの柱 | テーマ | コミュニケーション目的 | ターゲット |","| --- | --- | --- | --- |","| 商品・体験 | 温泉、サウナ、ビュッフェ、客室 | 認知・利用検討 | ウェルネス、レジャー、食に関心のある旅行者 |","| 旅先の魅力 | Things to Do、観光地、祭り | 観光地の認知向上 | 海外個人旅行者（FIT） |","| 旅行情報 | 温泉マナー、交通アクセス | 旅行前の不安解消 | 初訪問の旅行者 |","| ブランドストーリー | 浴衣、日本のおもてなし、滞在体験 | ブランドの差別化 | 文化に関心のある旅行者 |","| 第三者による信頼形成 | クリエイターとの連携、宿泊客の体験 | 信頼の醸成 | 宿泊を検討する旅行者 |"] });
  if (id === "advertising") sections[5] = { title: locale === "en" ? "Campaign Performance Analysis" : "広告キャンペーンの効果分析", blocks: [locale === "en" ? "Monitor and evaluate advertising performance across international markets using reach, impressions, CTR, CPC, CPM, frequency and video engagement metrics to inform future campaign planning and budget allocation." : "海外市場における広告効果をリーチ、インプレッション、CTR、CPC、CPM、フリークエンシー、動画エンゲージメントなどの指標で分析・評価し、今後のキャンペーン企画や予算配分に活用する。"] };
  return { title, sections };
}
