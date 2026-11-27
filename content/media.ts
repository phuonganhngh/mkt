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
  website: { groups: { "design-screens": [], "improvement-screens": [], "before-homepage": [], "after-homepage": [] } },
  social: { groups: { examples: [] } },
  visual: {
    groups: {
      examples: [
        {
          kind: "image",
          src: "/media/visual/design-email-banner-01.png",
          alt: { en: "Email signature banner design 01", ja: "メール署名バナーのデザイン 01" },
          caption: { en: "Email Signature Banner 01", ja: "メール署名バナー 01" },
        },
        {
          kind: "image",
          src: "/media/visual/design-email-banner-02.png",
          alt: { en: "Email signature banner design 02", ja: "メール署名バナーのデザイン 02" },
          caption: { en: "Email Signature Banner 02", ja: "メール署名バナー 02" },
        },
        {
          kind: "image",
          src: "/media/visual/design-email-banner-03.png",
          alt: { en: "Email signature banner design 03", ja: "メール署名バナーのデザイン 03" },
          caption: { en: "Email Signature Banner 03", ja: "メール署名バナー 03" },
        },
        {
          kind: "image",
          src: "/media/visual/design-email-banner-04.png",
          alt: { en: "Email signature banner design 04", ja: "メール署名バナーのデザイン 04" },
          caption: { en: "Email Signature Banner 04", ja: "メール署名バナー 04" },
        },
        {
          kind: "image",
          src: "/media/visual/shogi-news.png",
          alt: { en: "Shogi event design artwork", ja: "将棋イベントのデザイン制作物" },
          caption: { en: "Shogi Event Design", ja: "将棋イベントのデザイン" },
        },
      ],
    },
  },
  partnerships: { groups: { activities: [] } },
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
