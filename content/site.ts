export type Locale = "en" | "ja";
export type Translation = Record<Locale, string>;

export const identity = {
  name: "Phuong Anh Nguyen",
  slogan: {
    en: "Think Like a Traveler. Act Like a Marketer.",
    ja: "旅人の視点で考え、マーケターとして行動する。",
  },
  intro: {
    en: "Combining an international traveler's perspective with creative execution and management experience, I develop marketing solutions that connect hospitality brands with global audiences.",
    ja: "海外旅行者の視点とクリエイティブな実行力、マネジメント経験を活かし、ホスピタリティブランドと世界の旅行者をつなぐマーケティングに取り組んでいます。",
  },
  contact: { email: "", url: "", label: { en: "Professional profile", ja: "職務プロフィール" } },
};

export const ui = {
  en: {
    home: "Home", work: "Work", about: "About Me", contact: "Contact",
    contactPending: "Contact details pending.", skip: "Skip to content", navigation: "Main navigation",
    language: "Language", featured: "Featured project", selected: "Selected work",
    viewCase: "View case study", viewWork: "View all work", aboutLink: "More about me",
    workIntro: "Selected projects in hospitality, tourism and international marketing.",
    category: "Skill category", journey: "Customer journey", all: "All", noResults: "No projects match these filters.",
    placeholder: "Media pending", expand: "View image", play: "Play video", openPdf: "Open PDF",
    close: "Close", backToWork: "Back to work", thingsLink: "Things to Do on the hotel website",
    results: "Projects shown",
  },
  ja: {
    home: "ホーム", work: "実績", about: "プロフィール", contact: "お問い合わせ",
    contactPending: "連絡先は準備中です。", skip: "本文へ移動", navigation: "メインナビゲーション",
    language: "言語", featured: "注目のプロジェクト", selected: "主な実績",
    viewCase: "事例を見る", viewWork: "実績一覧を見る", aboutLink: "プロフィールを見る",
    workIntro: "ホスピタリティ・観光・海外マーケティングの主なプロジェクト。",
    category: "スキル分野", journey: "カスタマージャーニー", all: "すべて", noResults: "条件に一致するプロジェクトはありません。",
    placeholder: "資料準備中", expand: "画像を表示", play: "動画を再生", openPdf: "PDFを開く",
    close: "閉じる", backToWork: "実績一覧に戻る", thingsLink: "公式サイトの Things to Do",
    results: "表示件数",
  },
};

export function pageUrl(locale: Locale, slug = "") {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return base + (locale === "ja" ? "/jp/" : "/") + (slug ? slug + "/" : "");
}
