import type { Translation } from "./site";

export const categories = {
  website: { en: "Website Strategy & Design", ja: "ウェブサイト戦略・デザイン" },
  social: { en: "Social Media & Video", ja: "SNS・動画" },
  visual: { en: "Visual Communication", ja: "ビジュアルコミュニケーション" },
  partnerships: { en: "International Partnerships", ja: "海外パートナーシップ" },
  destination: { en: "Destination Marketing", ja: "デスティネーションマーケティング" },
  advertising: { en: "Digital Advertising", ja: "デジタル広告" },
};

export const stages = {
  awareness: { en: "Awareness", ja: "認知" },
  consideration: { en: "Consideration", ja: "検討" },
  booking: { en: "Booking", ja: "予約" },
};

export type Category = keyof typeof categories;
export type Stage = keyof typeof stages;

type Project = {
  id: Category;
  slug: string;
  title: Translation;
  summary: Translation;
  stages: Stage[];
};

export const projects: Project[] = [
  {
    id: "website", slug: "english-homepage-transformation",
    title: { en: "English Homepage Transformation", ja: "英語版公式サイトのリニューアル" },
    summary: {
      en: "Redesigning Noboribetsu Grand Hotel’s English website around how international travelers research, plan and book.",
      ja: "海外旅行者が情報を集め、旅を計画し、予約する流れに合わせ、登別グランドホテルの英語版公式サイトを刷新。",
    },
    stages: ["consideration", "booking"],
  },
  {
    id: "social", slug: "social-media-video",
    title: { en: "Authentic Travel Content with Limited Resources", ja: "限られたリソースで伝える、旅のリアルな魅力" },
    summary: { en: "Destination exploration, social content planning, shooting and editing.", ja: "観光地の取材、SNSコンテンツの企画、撮影・編集。" },
    stages: ["awareness"],
  },
  {
    id: "visual", slug: "visual-communication",
    title: { en: "Visual Communication", ja: "ビジュアルコミュニケーション" },
    summary: { en: "Brochures, posters, menus and event materials for hospitality audiences.", ja: "ホスピタリティ分野のパンフレット、ポスター、メニュー、イベント資料。" },
    stages: ["consideration"],
  },
  {
    id: "partnerships", slug: "international-partnerships",
    title: { en: "Building International Marketing Partnerships", ja: "海外マーケティングパートナーシップの構築" },
    summary: { en: "Creator outreach, tourism promotion and international travel trade development.", ja: "クリエイターへの働きかけ、観光プロモーション、海外旅行業界との関係構築。" },
    stages: ["awareness"],
  },
  {
    id: "destination", slug: "destination-marketing",
    title: { en: "Destination Marketing Beyond the Hotel", ja: "ホテルの枠を超えたデスティネーションマーケティング" },
    summary: { en: "Positioning Noboribetsu experiences for independent travelers and tour operators.", ja: "登別ならではの体験を海外個人旅行者とツアーオペレーターへ提案。" },
    stages: ["awareness", "consideration"],
  },
  {
    id: "advertising", slug: "digital-advertising",
    title: { en: "Digital Advertising", ja: "デジタル広告" },
    summary: { en: "Campaign objectives, creative and performance analysis.", ja: "広告キャンペーンの目的、クリエイティブ、効果分析。" },
    stages: ["booking"],
  },
];
