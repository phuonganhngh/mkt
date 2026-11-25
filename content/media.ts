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
  website: { groups: { "design-screens": [], "improvement-screens": [] } },
  social: { groups: { examples: [] } },
  visual: { groups: { examples: [] } },
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
