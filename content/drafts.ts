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

type DraftId = keyof typeof copy;

export function draftDocument(id: DraftId, locale: Locale, title: string): Document {
  return {
    title,
    sections: headings[locale].map((heading, index) => ({
      title: heading,
      blocks: index === 4 ? (id === "visual" ? ["@examples"] : [copy[id][locale][index], "@examples"]) : [copy[id][locale][index]],
    })),
  };
}
