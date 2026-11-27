import type { ReactNode } from "react";
import type { Category } from "../content/projects";
import type { Document } from "../content/documents";
import { projectMedia } from "../content/media";
import { ui, type Locale } from "../content/site";
import { Gallery } from "./media";

const benchmark = [
  { platform: "Instagram", selected: 101, reference: 156 },
  { platform: "YouTube", selected: 38, reference: 68.4 },
  { platform: "TikTok", selected: 454.9, reference: 512.7 },
  { platform: "Facebook", selected: 241, reference: 42 },
];

function BenchmarkChart({ locale }: { locale: Locale }) {
  const ja = locale === "ja";
  const title = ja ? "プラットフォーム別のフォロワー数比較" : "Followers by platform";
  const labels = ja ? ["選定クリエイター", "JAL招待クリエイター"] : ["Selected creator", "JAL creator benchmark"];
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
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https:\/\/[^\s]+)/g).map((part, index) => {
    if (part.startsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
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
  return <div className="website-challenge-visual" aria-label={ja ? "団体旅行から海外個人旅行への転換と情報ニーズ" : "From group tours to FIT and practical travel information"}>
    <div className="challenge-shift"><strong>{ja ? "団体・募集型ツアー" : "Group / Package Tours"}</strong><span aria-hidden="true">→</span><strong>{ja ? "海外個人旅行者（FIT）" : "International FIT Travelers"}</strong></div>
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
    return <li key={index}><span className="strategy-index">{String(index + 1).padStart(2, "0")}</span><div><strong>{(split?.[1] ?? raw).replace(/[:：]\s*$/, "")}</strong><p>{split?.[2] ?? ""}</p></div></li>;
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
    <div><span>{ja ? "選定クリエイター" : "Selected Creator"}</span><strong>834.9K</strong><small>{ja ? "SNSフォロワー・登録者数の合計" : "Combined followers & subscribers"}</small></div>
    <div><span>{ja ? "JALクリエイター比較対象" : "JAL Creator Benchmark"}</span><strong>779.1K</strong><small>{ja ? "SNSフォロワー・登録者数の合計" : "Combined followers & subscribers"}</small></div>
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
      <time dateTime="2026-03-02">{ja ? "2026年3月2日" : "March 2, 2026"}</time>
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
    } else if (block === "@tools-platforms") {
      children.push(<ToolsPlatforms key={index} locale={locale} />);
    } else if (block === "@nikkei-thumbnail" && id === "partnerships") {
      children.push(<NikkeiThumbnail key={index} locale={locale} />);
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
    } else if (block.startsWith("@") && id) {
      const group = block.slice(1);
      children.push(<div className={id === "social" && group === "examples" ? "section-media section-media--social" : id === "visual" && group === "examples" ? "section-media section-media--visual" : "section-media"} key={index}>
        <Gallery items={projectMedia(id, group)} locale={locale} />
        {group === "things-to-do" && <p><a href="https://www.nobogura.co.jp/en/#things">{ui[locale].thingsLink}</a></p>}
      </div>);
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
    {document.sections.map(section => <section key={section.title} className="case-section">
      <h2>{section.title}</h2>
      <div className="section-copy"><SectionBlocks blocks={section.blocks} id={id} locale={locale} /></div>
    </section>)}
  </div>;
}
