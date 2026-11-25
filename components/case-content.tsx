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
    } else if (block.startsWith("@") && id) {
      const group = block.slice(1);
      children.push(<div className="section-media" key={index}>
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
