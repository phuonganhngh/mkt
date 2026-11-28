import type { ReactNode } from "react";
import type { Category } from "../content/projects";
import type { Document } from "../content/documents";
import { projectMedia } from "../content/media";
import { ui, type Locale } from "../content/site";
import { AssetImage, Gallery } from "./media";

const benchmark = [
  { platform: "Instagram", selected: 101, reference: 156 },
  { platform: "YouTube", selected: 38, reference: 68.4 },
  { platform: "TikTok", selected: 454.9, reference: 512.7 },
  { platform: "Facebook", selected: 241, reference: 42 },
];

function BenchmarkChart({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  const title = ja ? "プラットフォーム別のフォロワー数比較" : "Followers by platform";
  const labels = ja ? ["私が招待したトラベルクリエイター", "JALが招待したトラベルクリエイター"] : ["Travel Creator Invited by Me", "Travel Creator Invited by JAL"];
  const format = (value: number) => ja
    ? `${new Intl.NumberFormat("ja", { maximumFractionDigits: 2 }).format(value / 10)}万人`
    : `${value}K`;
  const max = Math.max(...benchmark.flatMap(row => [row.selected, row.reference]));

  return <figure className="benchmark">
    <figcaption>{title}</figcaption>
    {/* The accessible table above the chart conveys the same data. */}
    <div aria-hidden="true">
      <div className="chart-legend">{labels.map((label, index) =>
        <span key={label}><i className={index === 0 ? "series-one" : "series-two"} />{label}</span>)}</div>
      {benchmark.map(row => <div className="chart-platform" key={row.platform}>
        <span>{row.platform}</span>
        <div>{[row.selected, row.reference].map((value, index) => <div className="chart-row" key={index}>
          <i className={index === 0 ? "series-one" : "series-two"} style={{ width: `${value / max * 100}%` }} />
          <span>{format(value)}</span>
        </div>)}</div>
      </div>)}
    </div>
  </figure>;
}

function inline(text: string): ReactNode {
  return text.split(/(\[[^\]]+\]\(https:\/\/[^\s)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|https:\/\/[^\s]+)/g).map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^\s)]+)\)$/);
    if (link) return <a href={link[2]} key={index}>{link[1]}</a>;
    if (part.startsWith("https://")) return <a href={part} key={index}>{part}</a>;
    return part;
  });
}

function ContentTable({ lines }: { lines: string[] }) {
  const [headers, alignment, ...rows] = lines.map(line => line.split("|").slice(1, -1).map(cell => cell.trim()));
  return <div className="table-wrap">
    <table>
      <thead><tr>{headers.map((header, index) =>
        <th key={header} scope="col" className={alignment[index].endsWith(":") ? "numeric" : undefined}>{inline(header)}</th>
      )}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) =>
        column === 0
          ? <th key={column} scope="row">{inline(cell)}</th>
          : <td key={column} className={alignment[column].endsWith(":") ? "numeric" : undefined}>{inline(cell)}</td>
      )}</tr>)}</tbody>
    </table>
  </div>;
}


function WebsiteChallengeVisual({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  const items = ja
    ? [{ title: "交通アクセス", detail: "行き方・乗り継ぎ", kind: "route" }, { title: "客室", detail: "種類・設備", kind: "room" }, { title: "温泉", detail: "利用方法・マナー", kind: "onsen" }]
    : [{ title: "Transport", detail: "Routes & Transfers", kind: "route" }, { title: "Accommodation", detail: "Room Types & Amenities", kind: "room" }, { title: "Onsen", detail: "Etiquette & Access", kind: "onsen" }];
  return <div className="website-challenge-visual" aria-label={ja ? "団体旅行から海外FITへの転換と情報ニーズ" : "From group tours to FIT and practical travel information"}>
    <div className="challenge-shift"><strong>{ja ? "団体・募集型ツアー" : "Group / Package Tours"}</strong><span aria-hidden="true">→</span><strong>{ja ? "海外FIT" : "International FIT"}</strong></div>
    <div className="challenge-details">{items.map(item => <div className="challenge-detail" key={item.kind}>
      <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {item.kind === "route" ? <><rect x="10" y="5" width="20" height="26" rx="5"/><path d="M10 22h20M15 35l3-4m7 4-3-4M14 12h12"/><circle cx="15" cy="26" r="1"/><circle cx="25" cy="26" r="1"/></> :
        item.kind === "room" ? <><path d="M6 30V10m0 14h28v6M10 21h24v9M12 20v-7h9v7M6 30v4m28-4v4"/></> :
        <><path d="M8 24c4-4 8 4 12 0s8 4 12 0M8 30c4-4 8 4 12 0s8 4 12 0M15 18c-4-5 4-6 0-11m10 11c-4-5 4-6 0-11"/></>}
      </svg><strong>{item.title}</strong><span>{item.detail}</span>
    </div>)}</div>
  </div>;
}

function WebsiteStrategyFramework({ lines }: { lines: string[] }) {
  return <ol className="website-strategy-framework">{lines.map((line, index) => {
    const raw = line.slice(2);
    const split = raw.match(/^\*\*(.+?)\*\*\s*(.*)$/);
    const heading = (split?.[1] ?? raw).replace(/[:：]\s*$/, "");
    const description = split?.[2] ?? "";
    return <li key={index}>
      <span className="strategy-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <details className="strategy-breakdown-item">
        <summary><span>{heading}</span><span className="strategy-expand-icon" aria-hidden="true" /></summary>
        {description && <p>{description}</p>}
      </details>
    </li>;
  })}</ol>;
}

function WebsiteBeforeAfter({ locale }: { locale: Locale }) {
  return <div className="website-before-after">
    {(["before-homepage", "after-homepage"] as const).map((group, index) => <figure key={group}>
      <div className="section-media"><Gallery items={projectMedia("website", group)} locale={locale} /></div>
      <figcaption>{index === 0 ? "BEFORE" : "AFTER"}</figcaption>
    </figure>)}
  </div>;
}


const toolGroups = [
  {
    title: { en: "Creative & Design", ja: "クリエイティブ・デザイン" },
    tools: [
      { name: "CapCut", icon: "capcut" },
      { name: "Adobe Photoshop", icon: "photoshop" },
      { name: "Adobe Illustrator", icon: "illustrator" },
      { name: "Adobe Lightroom", icon: "lightroom" },
    ],
  },
  {
    title: { en: "AI & Web Tools", ja: "AI・Webツール" },
    tools: [
      { name: "OpenAI Codex", icon: "codex" },
      { name: "GitHub", icon: "github" },
      { name: "Netlify", icon: "netlify" },
    ],
  },
  {
    title: { en: "Analytics & SEO", ja: "アナリティクス・SEO" },
    tools: [
      { name: "Google Analytics 4 (GA4)", icon: "googleanalytics" },
      { name: "Google Search Console (GSC)", icon: "googlesearchconsole" },
    ],
  },
] as const;

function ToolLogo({ icon, name }: { icon: string; name: string }) {
  if (icon === "lightroom") return <svg viewBox="0 0 40 40" role="img" aria-label={name}>
    <rect x="1" y="1" width="38" height="38" rx="4" fill="#001E36" />
    <text x="20" y="27" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="23" fill="#31A8FF">Lr</text>
  </svg>;
  return <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/media/tools/${icon}.svg`} alt={name} width="44" height="44" loading="lazy" />;
}

function ToolsPlatforms({ locale }: { locale: Locale }) {
  return <div className="tools-platforms">
    {toolGroups.map(group => <div className="tools-group" key={group.title.en}>
      <h3>{group.title[locale]}</h3>
      <div className="tools-list">{group.tools.map(tool => <div className="tool-entry" key={tool.icon}>
        <div className="tool-mark"><ToolLogo icon={tool.icon} name={tool.name} /></div>
        <span>{tool.name}</span>
      </div>)}</div>
    </div>)}
  </div>;
}

const nikkeiArticleLink = "https://www.nikkei.com/article/DGXZQOFC2594O0V20C26A2000000/";

function BenchmarkMetrics({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  return <div className="benchmark-metrics" aria-label={ja ? "フォロワー数の比較" : "Combined follower and subscriber comparison"}>
    <div><span>{ja ? "私が招待したトラベルクリエイター" : "Travel Creator Invited by Me"}</span><strong>{ja ? "83.49万人" : "834.9K"}</strong><small>{ja ? "SNSフォロワー・登録者数の合計" : "Combined followers & subscribers"}</small></div>
    <div><span>{ja ? "JALが招待したトラベルクリエイター" : "Travel Creator Invited by JAL"}</span><strong>{ja ? "77.91万人" : "779.1K"}</strong><small>{ja ? "SNSフォロワー・登録者数の合計" : "Combined followers & subscribers"}</small></div>
  </div>;
}

function BenchmarkHighlights({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  return <div className="benchmark-highlights" aria-label={ja ? "比較分析のポイント" : "Benchmark highlights"}>
    <div><strong>+7.2%</strong><span>{ja ? "フォロワー・登録者数の単純合計比較" : "Combined Audience Comparison"}</span></div>
    <div><strong>5.74×</strong><span>{ja ? "Facebookフォロワー数の比較" : "Facebook Follower Comparison"}</span></div>
  </div>;
}

function NikkeiThumbnail({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  return <aside className="nikkei-thumbnail-reference" aria-label={ja ? "日本経済新聞の関連記事" : "Nikkei media reference"}>
    <div className="nikkei-reference-heading">
      <span>{ja ? "関連記事・資料" : "MEDIA REFERENCE"}</span>
    </div>
    <div className="nikkei-reference-body">
      <a className="nikkei-reference-image" href={nikkeiArticleLink} target="_blank" rel="noopener noreferrer" aria-label={ja ? "日本経済新聞の元記事を開く" : "Open the original Nikkei article"}>
        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/media/nikkei-article-thumbnail.jpg`} alt={ja ? "日本経済新聞によるJALのベトナム人インフルエンサー招へい記事のサムネイル" : "Nikkei thumbnail about JAL inviting Vietnamese influencers to promote Obihiro and Asahikawa"} width="867" height="273" loading="lazy" />
      </a>
      <div className="nikkei-reference-copy">
        <h4>{ja ? "JAL、ベトナムのインフルエンサーを招き帯広・旭川をPR" : "JAL Invites Vietnamese Influencers to Promote Obihiro and Asahikawa"}</h4>
        <p>{ja ? "日本経済新聞（Nikkei）" : "日本経済新聞 (Nikkei)"}</p>
        <a className="nikkei-reference-link" href={nikkeiArticleLink} target="_blank" rel="noopener noreferrer">{ja ? "元記事を見る" : "View Original Article"} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </aside>;
}


function CreatorSpotlight({ locale, blocks }: { locale: Locale; blocks: string[] }) {
  const ja = locale === "ja";
  const title = blocks.find(block => block.startsWith("### "))?.slice(4).replace(/^Featured Case — |^注目事例 — /, "")
    ?? (ja ? "ベトナムのクリエイター比較分析" : "Vietnamese Travel & Lifestyle Creator");
  const narrative = blocks.filter(block => !block.startsWith("@") && !block.startsWith("### ") && !block.startsWith("*"));
  const note = blocks.find(block => block.startsWith("*") && !block.startsWith("**"))?.slice(1, -1);


  return <div className="creator-spotlight">
    <div className="creator-spotlight-top">
      <div className="creator-spotlight-intro">
        <p className="creator-spotlight-label">{ja ? "注目事例" : "FEATURED CASE"}</p>
        <h3>{title}</h3>
        {narrative.map((text, index) => <p key={index}>{inline(text)}</p>)}
      </div>
      <div className="creator-spotlight-data">
        <BenchmarkMetrics locale={locale} />
        <BenchmarkChart locale={locale} />
      </div>
    </div>
    <div className="creator-spotlight-bottom creator-spotlight-bottom--reference">
      <div className="creator-spotlight-source"><NikkeiThumbnail locale={locale} /></div>
    </div>
    {note && <p className="creator-spotlight-note">{note}</p>}
  </div>;
}

function CreatorCollaborationList({ blocks, locale }: { blocks: string[]; locale: Locale }) {
  const heading = blocks.find(block => block.startsWith("### "))?.slice(4) ?? (locale === "ja" ? "クリエイターとの連携" : "Creator Collaborations");
  const tableRows = blocks.filter(block => block.startsWith("|")).map(block =>
    block.split("|").slice(1, -1).map(value => value.trim())
  );
  const rows = tableRows.slice(2);
  const footnote = blocks.find(block => block.startsWith("*") && !block.startsWith("**"))?.slice(1, -1);
  const visuals = projectMedia("partnerships", "creator-showcase");
  const winter = visuals.find(item => item.kind === "image" && item.src.endsWith("/winter-onsen-creator.png"));
  const yukata = visuals.find(item => item.kind === "image" && item.src.endsWith("/yukata-creators.png"));
  const ja = locale === "ja";

  return <div className="creator-collaborations-layout">
    <div className="creator-collaborations">
      <div className="creator-collaborations-heading">
        <h3>{heading}</h3>
        <span>Instagram</span>
      </div>
      <div className="creator-collaborations-list">
        {rows.map(([nationality, focus, followers], index) => <div className="creator-collaboration-item" key={index}>
          <div className="creator-collaboration-primary">
            <strong>{nationality}</strong>
            <span>{followers}</span>
          </div>
          <p>{focus}</p>
        </div>)}
      </div>
      {footnote && <p className="creator-collaborations-note">{footnote}</p>}
    </div>
    <div className="creator-showcase" aria-label={ja ? "クリエイターの体験写真" : "Creator experience photos"}>
      <div className="creator-showcase-accent" aria-hidden="true" />
      <div className="creator-showcase-winter">
        <p className="creator-showcase-kicker">{ja ? "CREATOR EXPERIENCE" : "FEATURED CREATOR VISIT"}</p>
        <h4>{ja ? <>WINTER<br/>ONSEN STORY</> : <>WINTER<br/>ONSEN STORY</>}</h4>
        <div className="creator-showcase-image creator-showcase-winter-image">
          {winter?.kind === "image"
            ? <AssetImage image={winter} locale={locale} sizes="(max-width: 720px) 70vw, 390px" />
            : <span>{ja ? "温泉写真を追加予定" : "Winter Onsen photo pending"}</span>}
        </div>
        
      </div>
      <div className="creator-showcase-yukata">
        <p className="creator-showcase-kicker">CREATOR COLLABORATION</p>
        <div className="creator-showcase-image creator-showcase-yukata-image">
          {yukata?.kind === "image"
            ? <AssetImage image={yukata} locale={locale} sizes="(max-width: 720px) 50vw, 275px" />
            : <span>{ja ? "浴衣写真を追加予定" : "Yukata creators photo pending"}</span>}
        </div>
        <h4>YUKATA<br/>EXPERIENCE</h4>
      </div>
    </div>
  </div>;
}

function CreatorPartnershipSection({ section, locale }: {
  section: { title: string; blocks: string[] }; locale: Locale;
}) {
  const start = section.blocks.indexOf("@creator-feature-start");
  const end = section.blocks.indexOf("@creator-feature-end", start);
  const intro = section.blocks.slice(0, start);
  const featured = section.blocks.slice(start + 1, end);
  const collaborations = section.blocks.slice(end + 1);
  return <section className="case-section creator-partnerships-section">
    <h2>{section.title}</h2>
    {intro.length > 0 && <div className="section-copy"><SectionBlocks blocks={intro} id="partnerships" locale={locale} /></div>}
    <CreatorSpotlight locale={locale} blocks={featured} />
    <CreatorCollaborationList blocks={collaborations} locale={locale} />
  </section>;
}

function VisualDeliverables({ locale }: { locale: Locale }) {
  const items = projectMedia("visual", "examples");
  const banners = items.filter(item => item.src.includes("/visual/design-email-banner-"));
  const social = items.filter(item => item.src.endsWith("/visual/social-post-example.png"));
  const shogi = items.filter(item => item.src.endsWith("/visual/shogi-news.png"));
  const dinner = items.filter(item => item.src.endsWith("/visual/dinner-menu.png"));
  return <div className="visual-deliverables">
    <div className="visual-deliverables-banners"><Gallery items={banners} locale={locale} /></div>
    <div className="visual-deliverables-bottom">
      <div className="visual-deliverables-social"><Gallery items={social} locale={locale} /></div>
      <div className="visual-editorial-stack">
        <div className="visual-menu-showcase">
          <div className="visual-menu-showcase-copy">
            <span className="visual-menu-rule" aria-hidden="true" />
            <h3>Shogi<br />Event Design</h3>
            <span className="visual-menu-arrow" aria-hidden="true">→</span>
          </div>
          <div className="visual-menu-sheet">
            <Gallery items={dinner} locale={locale} />
          </div>
        </div>
        <div className="visual-shogi-news">
          <Gallery items={shogi} locale={locale} />
        </div>
      </div>
    </div>
  </div>;
}

/* Website case study: editorial hierarchy with original copy preserved.
   Mobile uses native details; desktop displays every complete responsibility. */
function WebsiteRoleBreakdown({ blocks, locale }: { blocks: string[]; locale: Locale }) {
  const ja = locale === "ja";
  const bullets = blocks.filter(line => line.startsWith("- ")).map(line => line.slice(2));
  return <div className="website-role-breakdown">
    <div className="website-role-intro">
      <h3>{blocks[0].slice(4)}</h3>
      <p>{blocks[1]}</p>
    </div>
    <div className="website-role-design">
      <p>{blocks[2]}</p>
    </div>
    <div className="website-role-duties">
      <h4>{ja ? "主な担当業務" : "Key Responsibilities"}</h4>
      <ol>{bullets.map((bullet, index) => <li key={index}>
        <span className="website-role-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <p className="website-role-duty-copy">{bullet}</p>
      </li>)}</ol>
    </div>
    <div className="website-role-agency">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8 4 16l8 8M20 8l8 8-8 8M18 5l-4 22"/></svg>
      <div><h4>{blocks[8].slice(4)}</h4><p>{blocks[9]}</p></div>
    </div>
  </div>;
}

function SectionBlocks({ blocks, id, locale }: { blocks: string[]; id?: Category; locale: Locale }) {
  const children: ReactNode[] = [];
  const showBenchmark = process.env.PORTFOLIO_BENCHMARK_REVIEW === "1" || process.env.PORTFOLIO_BENCHMARK_APPROVED === "1";

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (block === "@benchmark-start") {
      if (!showBenchmark) index = blocks.indexOf("@benchmark-end", index);
    } else if (block === "@benchmark") {
      children.push(<BenchmarkChart key={index} locale={locale} />);
    } else if (block === "@benchmark-end") {
      continue;
    } else if (block.startsWith("@benchmark-note ")) {
      if (showBenchmark) children.push(<p className="footnote" key={index}>{inline(block.slice(16))}</p>);
    } else if (block === "@benchmark-highlights" && id === "partnerships") {
      children.push(<BenchmarkHighlights key={index} locale={locale} />);
    } else if (block === "@benchmark-metrics" && id === "partnerships") {
      children.push(<BenchmarkMetrics key={index} locale={locale} />);
     } else if (block === "@learning-timeline") {
      const ja = locale === "ja";
      children.push(<div key={index} style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:12,marginBottom:16}}>{[[ja?"32歳":"32 yrs old",ja?"日本語学習開始":"Started learning Japanese"],["N3",ja?"JLPT合格":"JLPT Passed"],["N2",ja?"現在学習中":"Currently Studying"]].map(([value,label])=><div key={value} style={{paddingTop:0}}><strong style={{display:"block",fontSize:"1.5rem"}}>{value}</strong><small>{label}</small></div>)}</div>);
    } else if (block === "@tools-platforms") {
      children.push(<ToolsPlatforms key={index} locale={locale} />);
    } else if (block === "@nikkei-thumbnail" && id === "partnerships") {
      children.push(<NikkeiThumbnail key={index} locale={locale} />);
     } else if (block === "@beyond-translation" && id === "website") {
      children.push(<img key={index} src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/beyond-translation.png?v=2`} alt={locale === "ja" ? "翻訳だけでは伝わりにくい交通・客室・温泉の情報をイラストで伝える" : "Illustration of how visual information about transport, rooms and onsen helps international travelers beyond translation"} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />);
    } else if (block === "@challenge-illustration" && id === "website") {
      children.push(<WebsiteChallengeVisual key={index} locale={locale} />);
    } else if (block === "@strategy-framework" && id === "website") {
      const lines = blocks.slice(index + 1, index + 6);
      if (lines.length === 5 && lines.every(line => line.startsWith("- "))) {
        children.push(<WebsiteStrategyFramework key={index} lines={lines} />);
        index += 5;
      }
    } else if (block === "@before-after" && id === "website") {
      children.push(<WebsiteBeforeAfter key={index} locale={locale} />);
    } else if (block === "@examples" && id === "visual") {
      children.push(<div className="section-media section-media--visual" key={index}><VisualDeliverables locale={locale} /></div>);
    } else if (block.startsWith("@") && id) {
      const group = block.slice(1);
      children.push(<div className={id === "social" && group === "examples" ? "section-media section-media--social" : id === "visual" && group === "examples" ? "section-media section-media--visual" : "section-media"} key={index}>
        {(id !== "destination" || group !== "things-to-do" || projectMedia(id, group).length > 0) && <Gallery items={projectMedia(id, group)} locale={locale} />}
        {group === "things-to-do" && <p><a href="https://www.nobogura.co.jp/en/#things">{ui[locale].thingsLink}</a></p>}
      </div>);
    } else if (id === "website" && (block === "### Designing Around the Guest Journey" || block === "### ゲストジャーニーに沿った設計")) {
      const stages = blocks.slice(index + 1, index + 5);
      children.push(<div className="guest-journey" key={index}><h3>{block.slice(4)}</h3><ol>{stages.map((line, i) => {
        const match = line.match(/^- \*\*\d+ — (.+?)[：:]\*\* (.+?) — (.+)$/);
        return <li key={i}><span className="journey-number">{String(i + 1).padStart(2, "0")}</span><strong>{match?.[1]}</strong><p>{match?.[2]}</p><small>{match?.[3]}</small></li>;
      })}</ol></div>);
      index += 4;
    } else if (block.startsWith("### ")) {
      children.push(<h3 key={index}>{block.slice(4)}</h3>);
    } else if (block.startsWith("|")) {
      const start = index;
      while (blocks[index + 1]?.startsWith("|")) index++;
      children.push(<ContentTable key={start} lines={blocks.slice(start, index + 1)} />);
    } else if (block.startsWith("- ")) {
      const start = index;
      while (blocks[index + 1]?.startsWith("- ")) index++;
      children.push(<ul key={start}>{blocks.slice(start, index + 1).map((line, position) =>
        <li key={position}>{inline(line.slice(2))}</li>)}</ul>);
    } else {
      children.push(<p key={index} className={block.startsWith("*") && !block.startsWith("**") ? "footnote" : undefined}>
        {inline(block)}
      </p>);
    }
  }
  return children;
}

export function DocumentSections({ document, locale, id }: { document: Document; locale: Locale; id?: Category }) {
  return <div className="case-sections">
    {document.sections.map(section => id === "partnerships" && section.blocks.includes("@creator-feature-start")
      ? <CreatorPartnershipSection key={section.title} section={section} locale={locale} />
      : id === "destination" && (section.title === "Selected Projects" || section.title === "主なプロジェクト") && section.blocks.length >= 4
        ? <section key={section.title} className="case-section" style={{ paddingBottom: 24 }}>
          <h2>{section.title}</h2>
          <div className="section-copy">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[0, 2].map((start) => <div key={start} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <p style={{ margin: 0 }}>{inline(section.blocks[start])}</p>
                <p style={{ margin: "16px 0 0" }}>{inline(section.blocks[start + 1].replace(/\[([^\]]+)\]\(https:\/\/www\.nobogura\.co\.jp\/en\/etiquettes\/\)/g, "$1"))}</p>
                <p style={{ margin: "8px 0 0" }}><a href={start === 0 ? "https://www.nobogura.co.jp/en/etiquettes/" : "https://www.nobogura.co.jp/en/#things"}>{start === 0 ? (locale === "ja" ? "公式サイトの「初めて温泉を利用する方へ」" : "First-time Onsen Visitors on the hotel website") : ui[locale].thingsLink}</a></p>
              </div>)}
            </div>
          </div>
        </section>
      : id === "website" && section.blocks.length === 10 && section.blocks[0].startsWith("### ") && section.blocks[8].startsWith("### ") && section.blocks.slice(3, 8).every(line => line.startsWith("- "))
        ? <section key={section.title} className="case-section website-role-section">
          <h2>{section.title}</h2>
          <div className="section-copy"><WebsiteRoleBreakdown blocks={section.blocks} locale={locale} /></div>
        </section>
        : (section.title === "Strategic Approach" || section.title === "戦略的アプローチ")
          && section.blocks.length > 0
          && section.blocks.every(line => /^- \*\*.+?\*\*/.test(line))
          ? <section key={section.title} className="case-section">
            <h2>{section.title}</h2>
            <div className="section-copy">
              <WebsiteStrategyFramework lines={section.blocks} />
            </div>
          </section>
          : <section key={section.title} className="case-section">
            <h2>{section.title}</h2>
            <div className="section-copy"><SectionBlocks blocks={section.blocks} id={id} locale={locale} /></div>
          </section>)}
  </div>;
}
