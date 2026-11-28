import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { documents } from "../content/documents";
import { draftDocument } from "../content/drafts";
import { projectCover } from "../content/media";
import { projectSkills, projects } from "../content/projects";
import { identity, pageUrl, ui, type Locale } from "../content/site";
import { DocumentSections } from "./case-content";
import { WorkDirectory, type Covers } from "./projects";

const slugs = ["", "about", ...projects.map(project => project.slug)];
export const pageParams = () => slugs.map(slug => ({ slug: slug ? [slug] : [] }));

function projectFor(slug: string) {
  return projects.find(project => project.slug === slug);
}

export function portfolioMetadata(locale: Locale, segments: string[] = []): Metadata {
  const slug = segments.join("/");
  const t = ui[locale];
  const project = projectFor(slug);
  const title = project?.title[locale] ?? (slug === "about" ? t.about : null);
  const description = project?.summary[locale] ?? identity.intro[locale];
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
  const items = [{ label: t.home, slug: "" }, { label: t.about, slug: "about" }];
  return <header className="site-header">
    <div className="shell header-inner">
      <a className="brand" href={pageUrl(locale)}>{identity.name}</a>
      <div className="header-links">
        <nav aria-label={t.navigation}>{items.map(item => <a key={item.slug}
          className={item.slug === slug || (item.slug === "" && !!projectFor(slug)) ? "current" : undefined}
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
  const isEnglish = locale === "en";
  return <>
    <section className="home-intro home-intro-editorial">
      {isEnglish ? <h1 className="home-editorial-title">
        <span>Think Like a Traveler.</span>
        <span><em>Act Like a Marketer.</em></span>
      </h1> : <h1>{identity.slogan.ja}</h1>}
      <div className="home-editorial-body">
        <p className="home-intro-statement">{isEnglish
          ? <>A people-focused professional with a foundation in <strong>Human Resources &amp; L&amp;D</strong>, and hands-on experience in <strong>international marketing</strong> for the hospitality industry in Japan.</>
          : identity.intro.ja}</p>
        <div className="home-editorial-focus" aria-label={isEnglish ? "Core areas of experience" : "主な経験分野"}>
          <div className="home-editorial-focus-item">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="16" cy="9" r="4"/><path d="M7.5 25v-2a8.5 8.5 0 0 1 17 0v2M4 13a3 3 0 1 0 0-6M4 25v-2a8 8 0 0 1 3-6M28 13a3 3 0 1 1 0-6M28 25v-2a8 8 0 0 0-3-6"/></svg>
            <span>{isEnglish ? "People & Development" : "人事・人材育成"}</span>
          </div>
          <div className="home-editorial-focus-item">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 18h5l15-7v12l-15-7H5zM10 18l2 8h5l-3-9M25 14l3-2M25 20l3 2"/></svg>
            <span>{isEnglish ? "Marketing & Growth" : "マーケティング"}</span>
          </div>
          <div className="home-editorial-focus-item">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="14" width="24" height="12" rx="2"/><path d="M4 19h24M8 14v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3M19 14v-3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3M7 26v2M25 26v2"/></svg>
            <span>{isEnglish ? "Hospitality & Travel" : "ホスピタリティ・旅行"}</span>
          </div>
        </div>
      </div>
      <p className="home-intro-statement home-intro-philosophy home-editorial-philosophy">
        {isEnglish
          ? <>I enjoy turning ideas into tangible outcomes, actively learning <strong><em>new skills</em></strong> and finding <strong><em>creative solutions</em></strong> with <strong><em>limited resources</em></strong>.</>
          : identity.homeStatement.ja}
      </p>
    </section>
    <section className="home-work" aria-labelledby="home-work-heading">
      <div className="home-work-intro">
        <h2 id="home-work-heading">{ui[locale].work}</h2>
        <p>{ui[locale].workIntro}</p>
      </div>
      <WorkDirectory locale={locale} covers={coversFor(projects)} />
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
      {document && <article>
        <div className="page-intro case-intro">
          <h1>{document.title}</h1>
          {project && <p className="project-skills"><span>{locale === "en" ? "Skills:" : "スキル："}</span> {projectSkills[project.id].map(skill => skill[locale]).join(" · ")}</p>}
        </div>
        <DocumentSections document={document} locale={locale} id={project?.id} />
        {about && <section className="case-section about-contact">
          <h2>{t.contact}</h2><div className="section-copy"><Contact locale={locale} /></div>
        </section>}
        {project && <div className="case-return"><a className="text-link" href={pageUrl(locale)}>{t.backToWork}</a></div>}
      </article>}
    </main>
    <Footer locale={locale} showContact={!about} />
  </>;
}
