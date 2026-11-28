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
          "主にMeta広告とTikTok広告を使用し、ホテルや登別の観光体験を紹介するコンテンツを海外旅行者に届けました。"
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
          "限られた広告予算の中で、日本国外のFITにホテルと登別という目的地を知ってもらうことが課題でした。",
          "一方、実際の宿泊予約は広告だけでなく、宿泊料金、空室状況、商品内容、予約時の使いやすさなど複数の要因に左右されます。"
        ],
      },
      {
        title: "アプローチ",
        blocks: [
          "- **海外市場への配信：** 広告プラットフォームのターゲティング機能を使い、対象市場へ配信。",
          "- **体験を伝える素材：** ホテル、温泉、周辺の観光体験を紹介するコンテンツを活用。",
          "- **実務での運用：** 限られた予算でMeta広告とTikTok広告の設定・配信を実施。",
          "- **配信結果の確認：** 広告管理画面で表示回数やエンゲージメントなどの基本指標を確認。"
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
  if (id === "advertising") return advertisingCase[locale];
  return {
    title,
    sections: headings[locale].map((heading, index) => ({
      title: heading,
      blocks: index === 4 && (id === "visual" || id === "social") ? ["@examples"] : index === 4 ? [copy[id][locale][index], "@examples"] : [copy[id][locale][index]],
    })).filter((_, index) => (id !== "social" && id !== "visual") || index !== 5),
  };
}
