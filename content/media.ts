import { statSync } from "node:fs";
import { join } from "node:path";
import type { Translation } from "./site";
import type { Category } from "./projects";

export type AssetPath = `/media/${string}`;
export type ImageAsset = {
  src: AssetPath;
  alt: Translation;
  variants?: { src: AssetPath; width: number }[];
};
export type Media = {
  caption: Translation;
} & (
  | ({ kind: "image" } & ImageAsset)
  | { kind: "video"; src: AssetPath | `https://${string}`; poster?: ImageAsset; subtitles?: { src: AssetPath; lang: string; label: string }[] }
  | { kind: "pdf"; src: AssetPath; poster?: ImageAsset }
);

type ProjectMedia = { cover?: ImageAsset; groups: Record<string, Media[]> };

const media: Record<Category, ProjectMedia> = {
  website: {
    cover: {
      src: "/media/website/web-cover.png",
      alt: {
        en: "Redesigned English homepage of Noboribetsu Grand Hotel",
        ja: "登別グランドホテルの英語版公式サイト リニューアル後のホームページ",
      },
    },
    groups: {
      "design-screens": [],
      "improvement-screens": [],
      "before-homepage": [{
        kind: "image",
        src: "/media/website/homepage-before.png",
        alt: { en: "Original English homepage before redesign", ja: "リニューアル前の英語版ホームページ" },
        caption: { en: "BEFORE", ja: "BEFORE" },
      }],
      "after-homepage": [{
        kind: "image",
        src: "/media/website/homepage-after.png",
        alt: { en: "English homepage after redesign", ja: "リニューアル後の英語版ホームページ" },
        caption: { en: "AFTER", ja: "AFTER" },
      }],
    },
  },
  social: {
    groups: {
      examples: [
        {
          kind: "video",
          src: "/media/social/sns1.mp4",
          caption: { en: "Onsen & Room", ja: "温泉・客室" },
        },
        {
          kind: "video",
          src: "/media/social/sns2.mp4",
          caption: { en: "Sightseeing", ja: "観光スポット" },
        },
        {
          kind: "video",
          src: "/media/social/sns3.mp4",
          caption: { en: "Outlet", ja: "アウトレット" },
        },
      ],
    },
  },
  visual: {
    cover: {
      src: "/media/visual/visual-cover.webp",
      alt: {
        en: "Visual communication portfolio cover featuring printed hospitality designs and photographs",
        ja: "ホテルの印刷物や写真を組み合わせたビジュアルコミュニケーションの作品カバー",
      },
    },
    groups: {
      examples: [
        {
          kind: "image",
          src: "/media/visual/design-email-banner-01.png",
          alt: { en: "Email signature banner design 01", ja: "メール署名バナーのデザイン 01" },
          caption: { en: "Email Signature 1", ja: "メール署名 1" },
        },
        {
          kind: "image",
          src: "/media/visual/design-email-banner-02.png",
          alt: { en: "Email signature banner design 02", ja: "メール署名バナーのデザイン 02" },
          caption: { en: "Email Signature 2", ja: "メール署名 2" },
        },
        {
          kind: "image",
          src: "/media/visual/design-email-banner-03.png",
          alt: { en: "Email signature banner design 03", ja: "メール署名バナーのデザイン 03" },
          caption: { en: "Email Signature 3", ja: "メール署名 3" },
        },
        {
          kind: "image",
          src: "/media/visual/design-email-banner-04.png",
          alt: { en: "Email signature banner design 04", ja: "メール署名バナーのデザイン 04" },
          caption: { en: "Email Signature 4", ja: "メール署名 4" },
        },
        {
          kind: "image",
          src: "/media/visual/social-post-example.png",
          alt: { en: "Designed social media post", ja: "SNS投稿用に制作したデザイン" },
          caption: { en: "Social Media Post Design", ja: "SNS投稿デザイン" },
        },
        {
          kind: "image",
          src: "/media/visual/shogi-news.png",
          alt: { en: "Shogi event design artwork", ja: "将棋イベントのデザイン制作物" },
          caption: { en: "Shogi Event Design", ja: "将棋イベントのデザイン" },
        },
        {
          kind: "image",
          src: "/media/visual/dinner-menu.png",
          alt: { en: "Printed dinner menu design", ja: "夕食メニューの制作物" },
          caption: { en: "Dinner Menu Design", ja: "夕食メニューデザイン" },
        },
      ],
    },
  },
  partnerships: { groups: {
    activities: [
      {
        kind: "image",
        src: "/media/partnerships/jnto-b2b-website.png",
        alt: { en: "Noboribetsu Grand Hotel profile on the JNTO Bangkok B2B Travel Trade Platform", ja: "JNTOバンコクB2B旅行業界向けプラットフォームに掲載された登別グランドホテルの紹介ページ" },
        caption: { en: "JNTO Bangkok — B2B Travel Trade Platform", ja: "JNTOバンコク — B2B旅行業界向けプラットフォーム" },
      },
    ],
    "creator-showcase": [
      {
        kind: "image",
        src: "/media/partnerships/winter-onsen-creator.png",
        alt: { en: "Creator enjoying a snowy outdoor onsen", ja: "雪景色の露天風呂を楽しむクリエイター" },
        caption: { en: "Winter Onsen Experience", ja: "冬の温泉体験" },
      },
      {
        kind: "image",
        src: "/media/partnerships/yukata-creators.png",
        alt: { en: "Travel creators wearing yukata at the hotel", ja: "ホテルで浴衣を着た旅行クリエイター" },
        caption: { en: "Yukata Experience", ja: "浴衣体験" },
      },
    ],
  } },
  destination: { groups: { "winter-slides": [], "things-to-do": [] } },
  advertising: { groups: { examples: [] } },
};

function isAvailable(src: string) {
  return src.startsWith("/media/") &&
    !src.split("/").some(part => part === ".." || part === ".") &&
    !!statSync(join(process.cwd(), "public", src), { throwIfNoEntry: false })?.isFile();
}

function availableImage(asset?: ImageAsset): ImageAsset | undefined {
  if (!asset || !isAvailable(asset.src)) return undefined;
  return { ...asset, variants: asset.variants?.filter(variant => isAvailable(variant.src)) };
}

export function projectCover(id: Category) {
  return availableImage(media[id].cover);
}

export function projectMedia(id: Category, group: string): Media[] {
  return (media[id].groups[group] ?? []).flatMap<Media>(item => {
    if (item.kind === "image") {
      const image = availableImage(item);
      return image ? [{ ...item, ...image }] : [];
    }
    if (!isAvailable(item.src) && !(item.kind === "video" && URL.parse(item.src)?.protocol === "https:")) return [];
    const poster = availableImage(item.poster);
    return item.kind === "video"
      ? [{ ...item, poster, subtitles: item.subtitles?.filter(track => isAvailable(track.src)) }]
      : [{ ...item, poster }];
  });
}
