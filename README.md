# Phuong Anh Nguyen · Marketing Portfolio

A bilingual marketing portfolio built with Next.js, TypeScript and Tailwind CSS. Nine pages in English and nine corresponding Japanese routes are exported as static HTML. Node.js runs only during development and builds. Fonts are served from the static export.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. English is at `/` and Japanese is at `/jp/`. The language switcher links to the matching page.

```sh
npm run build
```

The build includes type checking and writes the deployable website to `out/`. Serve that directory through a static web server to test the exported files.

## Deploy for free on Netlify

1. Create a repository on GitHub Free and push the source, including `package-lock.json` and `netlify.toml`. A private repository keeps draft material in the source off the public web. Exclude `node_modules/`, `.next/`, `out/` and local environment files. If you prefer uploading a build to Netlify, drop the contents of a standard production `out/` directory into Netlify's manual deploy flow.
2. In a Netlify Free team, import the GitHub repository. Select the Free plan and use the included `*.netlify.app` domain. Keep `npm run build` as the build command and `out` as the publish directory. The Netlify configuration skips Next.js runtime integration because the project exports static files.
3. Set `PORTFOLIO_SITE_URL` to the exact project URL, such as `https://your-project-name.netlify.app`, for canonical URLs and alternate language metadata.
4. Before the first public deploy, review approved assets, contact information, and any pending case study copy. The standard build excludes the JAL benchmark comparison. Keep `PORTFOLIO_BENCHMARK_REVIEW` unset in Netlify. Once the JAL reference has been verified and publication permission obtained, set `PORTFOLIO_BENCHMARK_APPROVED=1` for production. An internal review build can use `PORTFOLIO_BENCHMARK_REVIEW=1 npm run dev` or `PORTFOLIO_BENCHMARK_REVIEW=1 npm run build`. Keep review builds private.
5. Publish approved source updates by pushing to the production branch. Use a Deploy Preview to check changes before merging when possible.

### Netlify Free limits

Verified against Netlify's credit-based pricing documentation on November 25, 2026. Free has a monthly hard cap of 300 shared credits and one concurrent build. Each successful production deploy costs 15 credits. Bandwidth costs 20 credits per GB, and requests cost 2 credits per 10,000. Deploy Previews and branch deploys have no deploy charge, though their traffic counts toward usage. Netlify can pause projects when the team's credits are exhausted. The Free plan has no auto-recharge. This project uses no server runtime, paid services, or usage-based add-ons. [Netlify plan limits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) · [Credit rates](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/) · [Paused projects](https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/)

## Update content

- Update branding and contact fields in `content/site.ts`.
- Edit the English and Japanese case study and About copy in `content/en.json` and `content/ja.json`.
- Edit interim Social Media & Video, Visual Communication and Digital Advertising copy in `content/drafts.ts`.
- Update directory summaries and filtering in `content/projects.ts`. Use the existing project records for both filters.
- Follow [MEDIA_GUIDE.md](MEDIA_GUIDE.md) to add or replace files. Rebuild and check both languages before publishing.

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for pending inputs and release checks.

## Preview before production

The review branch is `develop`. Preview builds are triggered by pushes to `develop` using the GitHub Pages workflow in `.github/workflows/pages-preview.yml`. Preview URL (once Pages is enabled and the workflow succeeds): https://phuonganhngh.github.io/mkt/

One-time repository setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Do not select `Deploy from a branch`.

Continue editing `develop` only. Review the GitHub Pages version, including EN/JP, images, mobile and navigation. Merge `develop` into `main` only when approved; `main` is the Netlify production branch. To keep Netlify quiet during review, ensure Netlify watches only `main` and does not build branch deploys / deploy previews.

The GitHub Pages build uses `GITHUB_PAGES=true`, `NEXT_PUBLIC_BASE_PATH=/mkt`. Production builds omit them, so the usual root URLs are retained.
