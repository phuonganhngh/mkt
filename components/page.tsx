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
  const items = [{ label: t.work, slug: "work" }, { label: t.about, slug: "about" }];
  return <header className="site-header">
    <div className="shell header-inner">
      <a className="brand" href={pageUrl(locale)}>{identity.name}</a>
      <div className="header-links">
        <nav aria-label={t.navigation}>{items.map(item => <a key={item.slug}
          className={item.slug === slug ? "current" : undefined}
          aria-current={item.slug === slug ? "page" : undefined}
          href={item.slug === "work" ? `${pageUrl(locale)}#work` : pageUrl(locale, item.slug)}>{item.label}</a>)}</nav>
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
          ? <>A people-focused professional with a foundation in Human Resources &amp; L&amp;D, and hands-on experience in international marketing for the hospitality industry in Japan.</>
          : identity.intro.ja}</p>
        <div className="home-editorial-focus" aria-label={isEnglish ? "Core areas of experience" : "主な経験分野"}>
          <div className="home-editorial-focus-item">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="24" cy="10" r="4.5"/><circle cx="9" cy="16" r="3.5"/><circle cx="39" cy="16" r="3.5"/>
              <path d="M14 27c0-7 4-11 10-11s10 4 10 11M2 29c0-6 3-9 7-9 2 0 3.5.5 4.5 2M46 29c0-6-3-9-7-9-2 0-3.5.5-4.5 2"/>
              <path d="M4 33c10-3 16-1 20 5 4-6 10-8 20-5v11c-9-3-16-1-20 3-4-4-11-6-20-3zM24 38v9"/>
            </svg>
            <span>{isEnglish ? "People & Development" : "人事・人材育成"}</span>
          </div>
          <div className="home-editorial-focus-item">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 16c-3 0-4 2-4 5s2 5 5 5h7l16 5V9L12 16H4zM12 26l4 12h6l-5-10M29 11V29"/>
              <path d="M22 39c8-2 14-8 19-18M35 21l6-2 2 6"/>
              <path d="M27 45v-5h5v5M36 45v-9h5v9M45 45V32"/>
            </svg>
            <span>{isEnglish ? "Marketing & Growth" : "マーケティング"}</span>
          </div>
          <div className="home-editorial-focus-item">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="10" y="15" width="27" height="29" rx="5"/><path d="M18 15V9a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v6M18 25v12M24 25v12M30 25v12M16 44v3M31 44v3"/>
              <path d="M2 33c6-10 16-10 25-13 7-2 13-5 16-11"/><path d="m36 5 9 3-4 4-5 8-3-1 3-9-6-5 2-2 7 3 5-4 2 1-3 5"/>
            </svg>
            <span>{isEnglish ? "Hospitality & Travel" : "ホスピタリティ・旅行"}</span>
          </div>
        </div>
      </div>
      <div className="home-editorial-philosophy">
        <svg className="home-editorial-idea-icon" viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 2C8.2 2 3 7.7 3 15c0 5.2 2.6 8.3 5.6 11.2 1.5 1.4 2.4 3.4 2.5 5.5h9.8c.1-2.1 1-4.1 2.5-5.5C26.4 23.3 29 20.2 29 15 29 7.7 23.8 2 16 2Z"/>
          <path d="M11 32.5h10M11.5 36h9M13 39h6"/>
        </svg>
        <p className="home-intro-statement home-intro-philosophy">
          {isEnglish
            ? <>I enjoy turning ideas into tangible outcomes, actively learning <strong><em>new skills</em></strong> and finding <strong><em>creative solutions</em></strong> with <strong><em>limited resources</em></strong>.</>
            : identity.homeStatement.ja}
        </p>
      </div>
    </section>
    <section id="work" className="home-work" aria-labelledby="home-work-heading">
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
