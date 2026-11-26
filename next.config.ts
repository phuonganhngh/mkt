import type { NextConfig } from "next";

const pagesPreview = process.env.GITHUB_PAGES === "true";

const config: NextConfig = {
  ...(pagesPreview ? { basePath: "/mkt" } : {}),
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default config;
