import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { documents } from "../content/documents";
import { draftDocument } from "../content/drafts";
import { projectCover } from "../content/media";
import { projectSkills, projects } from "../content/projects";
import { identity, pageUrl, ui, type Locale } from "../content/site";
import { DocumentSections } from "./case-content";
import { AssetImage, Placeholder } from "./media";
import { ProjectGrid, WorkDirectory, type Covers } from "./projects";

const slugs = ["", "work", "about", ...projects.map(project => project.slug)];
export const pageParams = () => slugs.map(slug => ({ slug: slug ? [slug] : [] }));

function projectFor(slug: string) {
  return projects.find(project => project.slug === slug);
}

export function portfolioMetadata(locale: Locale, segments: string[] = []): Metadata {
  const slug = segments.join("/");
  const t = ui[locale];
  const project = projectFor(slug);
  const title = project?.title[locale] ?? (slug === "work" ? t.work : slug === "about" ? t.about : null);
  const description = project?.summary[locale] ?? (slug === "work" ? t.workIntro : identity.intro[locale]);
  const siteUrl = process.env.PORTFOLIO_SITE_URL;
  const review = process.env.PORTFOLIO_BENCHMARK_REVIEW === "1";
  return {
    title: title ? `${title} | ${identity.name}` : `${identity.name} | ${locale === "en" ? "Marketing Portfolio" : "マーケティングポートフォリオ"}`,
    description,
    ...(siteUrl ? {
      metadataBase: new URL(siteUrl),
      alternates: {
        canonical: pageUrl(locale, slug),
        languages: { en: pageUrl("en", slug), ja: pageUrl("ja", slug), "x-default": pageUrl("en", slug) },
      },
    } : {}),
    robots: review ? { index: false, follow: false } : undefined,
    openGraph: { title: title ?? identity.name, description, type: "website", locale: locale === "ja" ? "ja_JP" : "en", siteName: identity.name },
  };
}

function Header({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui[locale];
  const items = [{ label: t.home, slug: "" }, { label: t.work, slug: "work" }, { label: t.about, slug: "about" }];
  return <header className="site-header">
    <div className="shell header-inner">
      <a className="brand" href={pageUrl(locale)}>{identity.name}</a>
      <div className="header-links">
        <nav aria-label={t.navigation}>{items.map(item => <a key={item.slug}
          className={item.slug === slug || (item.slug === "work" && projectFor(slug)) ? "current" : undefined}
          aria-current={item.slug === slug ? "page" : undefined}
          href={pageUrl(locale, item.slug)}>{item.label}</a>)}</nav>
        <nav className="languages" aria-label={t.language}>
          <a hrefLang="en" lang="en" aria-label="English" aria-current={locale === "en" ? "page" : undefined} href={pageUrl("en", slug)}>EN</a>
          <span aria-hidden="true">/</span>
          <a hrefLang="ja" lang="ja" aria-label="日本語" aria-current={locale === "ja" ? "page" : undefined} href={pageUrl("ja", slug)}>JP</a>
        </nav>
      </div>
    </div>
  </header>;
}

function Contact({ locale }: { locale: Locale }) {
  const { email, url, label } = identity.contact;
  return <div className="contact-details">
    {email && <a href={`mailto:${email}`}>{email}</a>}
    {url && <a href={url}>{label[locale]}</a>}
    {!email && !url && <p>{ui[locale].contactPending}</p>}
  </div>;
}

function Footer({ locale, showContact }: { locale: Locale; showContact: boolean }) {
  return <footer className="site-footer shell">
    <a href={pageUrl(locale)}>{identity.name}</a>
    {showContact && <div className="footer-contact"><span>{ui[locale].contact}</span><Contact locale={locale} /></div>}
  </footer>;
}

function coversFor(entries: typeof projects): Covers {
  return Object.fromEntries(entries.map(project => [project.id, projectCover(project.id)]));
}

function Home({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [flagship, ...selected] = projects;
  const cover = projectCover(flagship.id);
  const [firstLine, secondLine] = identity.slogan.en.split(/(?<=\.) /);

  return <>
    <section className="home-intro">
      <h1>{locale === "en" ? <>{firstLine} <br />{secondLine}</> : identity.slogan[locale]}</h1>
      <p className="home-intro-statement">{identity.homeStatement[locale]}</p>
    </section>
    <section className="featured" aria-labelledby="featured-heading">
      <div className="featured-image" aria-hidden={!cover ? true : undefined}>
        {cover
          ? <AssetImage image={cover} locale={locale} sizes="(max-width: 720px) 94vw, 570px" eager />
          : <Placeholder locale={locale} />}
      </div>
      <div className="featured-copy">
        <p className="eyebrow">{t.featured}</p>
        <h2 id="featured-heading">{flagship.title[locale]}</h2>
        <p>{flagship.summary[locale]}</p>
        <a className="text-link" href={pageUrl(locale, flagship.slug)}>{t.viewCase}</a>
      </div>
    </section>
    <section className="selected" aria-labelledby="selected-heading">
      <div className="section-line">
        <h2 id="selected-heading">{t.selected}</h2>
        <a className="text-link" href={pageUrl(locale, "work")}>{t.viewWork}</a>
      </div>
      <ProjectGrid entries={selected} locale={locale} covers={coversFor(selected)} />
    </section>
    <section className="home-about" aria-labelledby="home-about-heading">
      <h2 id="home-about-heading">{t.about}</h2>
      <div><p>{identity.intro[locale]}</p><a className="text-link" href={pageUrl(locale, "about")}>{t.aboutLink}</a></div>
    </section>
  </>;
}

export function PortfolioPage({ locale, segments = [] }: { locale: Locale; segments?: string[] }) {
  const slug = segments.join("/");
  if (!slugs.includes(slug)) notFound();
  const t = ui[locale];
  const project = projectFor(slug);
  const about = slug === "about";
  const document = about ? documents[locale].about
    : project && (project.id === "social" || project.id === "visual" || project.id === "advertising"
      ? draftDocument(project.id, locale, project.title[locale])
      : documents[locale][project.id]);

  return <>
    <a href="#main" className="skip-link">{t.skip}</a>
    <Header locale={locale} slug={slug} />
    <main id="main" className="shell main-content">
      {!slug && <Home locale={locale} />}
      {slug === "work" && <>
        <div className="page-intro"><h1>{t.work}</h1><p>{t.workIntro}</p></div>
        <WorkDirectory locale={locale} covers={coversFor(projects)} />
      </>}
      {document && <article>
        <div className="page-intro case-intro">
          <h1>{document.title}</h1>
          {project && <p className="project-skills"><span>{locale === "en" ? "Skills:" : "スキル："}</span> {projectSkills[project.id].map(skill => skill[locale]).join(" · ")}</p>}
        </div>
        <DocumentSections document={document} locale={locale} id={project?.id} />
        {about && <section className="case-section about-contact">
          <h2>{t.contact}</h2><div className="section-copy"><Contact locale={locale} /></div>
        </section>}
        {project && <div className="case-return"><a className="text-link" href={pageUrl(locale, "work")}>{t.backToWork}</a></div>}
      </article>}
    </main>
    <Footer locale={locale} showContact={!about} />
  </>;
}
