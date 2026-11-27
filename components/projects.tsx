"use client";

import { projects, type Category } from "../content/projects";
import { pageUrl, type Locale } from "../content/site";
import type { ImageAsset } from "../content/media";
import { AssetImage, Placeholder } from "./media";

type Project = (typeof projects)[number];
export type Covers = Partial<Record<Category, ImageAsset>>;

export function ProjectGrid({ entries, locale, covers, heading: Heading = "h3" }: {
  entries: Project[]; locale: Locale; covers: Covers; heading?: "h2" | "h3";
}) {
  return <div className="project-grid">
    {entries.map(project => {
      const cover = covers[project.id];
      return <article key={project.id} className="project">
        <a href={pageUrl(locale, project.slug)}>
          <div className="project-image">{cover
            ? <AssetImage image={cover} locale={locale} sizes="(max-width: 520px) 100vw, (max-width: 820px) 50vw, 340px" />
            : <Placeholder locale={locale} />}</div>
          <Heading>{project.title[locale]}</Heading>
        </a>
        <p>{project.summary[locale]}</p>
      </article>;
    })}
  </div>;
}

export function WorkDirectory({ locale, covers }: { locale: Locale; covers: Covers }) {
  return <ProjectGrid entries={projects} locale={locale} covers={covers} heading="h2" />;
}
