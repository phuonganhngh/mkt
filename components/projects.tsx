"use client";

import { useSyncExternalStore } from "react";
import { categories, projects, stages, type Category, type Stage } from "../content/projects";
import { pageUrl, ui, type Locale } from "../content/site";
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

const filterChange = "portfolio:filter-change";

function subscribeToFilters(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(filterChange, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(filterChange, callback);
  };
}

export function WorkDirectory({ locale, covers }: { locale: Locale; covers: Covers }) {
  const query = useSyncExternalStore(subscribeToFilters, () => window.location.search, () => "");
  const search = new URLSearchParams(query);
  const category = search.get("category");
  const stage = search.get("stage");
  const skill = category && Object.hasOwn(categories, category) ? category as Category : "";
  const journey = stage && Object.hasOwn(stages, stage) ? stage as Stage : "";
  const selected = projects.filter(project =>
    (!skill || project.id === skill) && (!journey || project.stages.includes(journey)));
  const t = ui[locale];

  function update(filter: "category" | "stage", value: string) {
    const next = new URLSearchParams(search.toString());
    if (value) next.set(filter, value);
    else next.delete(filter);
    const url = next.toString();
    const nextQuery = url ? "?" + url : "";
    if (nextQuery === query) return;
    window.history.pushState(null, "", pageUrl(locale, "work") + nextQuery);
    window.dispatchEvent(new Event(filterChange));
  }

  return <>
    <div className="work-filters">
      <fieldset><legend>{t.category}</legend><div className="filter-options">
        <button type="button" aria-pressed={!skill} onClick={() => update("category", "")}>{t.all}</button>
        {Object.entries(categories).map(([key, labels]) =>
          <button type="button" key={key} aria-pressed={skill === key} onClick={() => update("category", key)}>{labels[locale]}</button>
        )}
      </div></fieldset>
      <fieldset><legend>{t.journey}</legend><div className="filter-options">
        <button type="button" aria-pressed={!journey} onClick={() => update("stage", "")}>{t.all}</button>
        {Object.entries(stages).map(([key, labels]) =>
          <button type="button" key={key} aria-pressed={journey === key} onClick={() => update("stage", key)}>{labels[locale]}</button>
        )}
      </div></fieldset>
    </div>
    <p className="sr-only" role="status">{t.results} {selected.length}</p>
    {selected.length ? <ProjectGrid entries={selected} locale={locale} covers={covers} heading="h2" /> : <p className="empty-results">{t.noResults}</p>}
  </>;
}
