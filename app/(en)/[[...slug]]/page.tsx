import { PortfolioPage, pageParams, portfolioMetadata } from "../../../components/page";

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export const generateStaticParams = pageParams;

export async function generateMetadata({ params }: Props) {
  return portfolioMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <PortfolioPage locale="en" segments={(await params).slug} />;
}
