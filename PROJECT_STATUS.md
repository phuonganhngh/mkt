# Project status

## Objective

Support Marketing Manager and Digital Marketing Manager applications with project evidence from hospitality, tourism and international marketing.

## Approved requirements and implementation decisions

- Nine bilingual pages with route-preserving language links and English as the default. The portfolio centers on project work and includes a brief foundation in HR and L&D on About Me.
- The flagship sits immediately below the slogan. Work uses a shared project dataset and two rows of plain-text filter controls. Filter selections combine and are stored in the Work URL.
- The site uses a white editorial layout, thin rules, navy accents and the specified Montserrat, Roboto Serif, Roboto and Noto Sans JP font roles. The supplied text attachments contained no visual reference file. Layout, image placement and mobile sizes were derived from the written requirements.
- Website, About Me, International Partnerships and Destination Marketing use the supplied bilingual copy and section order. The anonymous JAL comparison is included in private review mode. Standard exports omit the unverified comparison and retain the confirmed scheduled stay.
- Project media, copy and translations are kept apart from layout components. The portfolio includes image galleries, accessible image expansion, local and external video, PDF links and optional previews, and neutral missing-media placeholders.
- Next.js exports static HTML. Deployment settings target Netlify Free and source control on GitHub Free.

## Pending content and release checks

- Approved layout reference and supplied screenshots, social videos and posts, design collateral, trade activity images, destination slides and photographs, and advertising creative.
- Campaign details and verified results for Social Media & Video, Visual Communication and Digital Advertising. These pages use the six-section framework and show available brief-level information with explicit gaps.
- Contact email and professional profile URL.
- Publication permission for the benchmark and verification of the JAL reference. Keep the private review flag out of Netlify production settings. See the README for how to enable an approved comparison.
- The source is maintained in the private GitHub repository `phuonganhngh/mkt`. Netlify publication is pending.

## Verification

- Production and private review builds completed successfully. Static checks covered the 18 routes, localized links and section order, the review-only benchmark, and the absence of CV links.
- Temporary media fixtures checked bilingual image and PDF rendering, video references and missing-file handling in the export. The fixtures were removed after testing.
- The managed preview relay timed out. Desktop and mobile rendering, interactive filtering and media playback remain unverified in a browser.

## Content refinement — November 26, 2026

- Baseline commit for rollback: `7eb8df4b84ef31ccc0fce0b30942e3a1cf918ea2` on `main`.
- Approved About Me content updated in English and Japanese; Contact section unchanged.
- English Homepage Transformation consolidated from nine sections to five in both languages: Project Overview, The Challenge, Strategic Approach, Design & Transformation, My Role & Delivery.
- Before & After uses two separate pending media groups (`before-homepage` and `after-homepage`). Add only actual old/new English homepage screenshots or PDFs to `content/media.ts` and `public/media/` when available; do not fabricate imagery.
- Existing two-column layout, typography, navigation, footer and other project pages unchanged. Rollback with a new revert commit to the baseline if needed; do not force-push.

## Website case-study presentation refinement — November 26, 2026

- Removed Company, Position and Project metadata lines from Project Overview (EN/JP); retained Expertise, launch statement and live website link.
- Recast The Challenge as concise narrative plus original lightweight line illustrations about the group-to-FIT transition, transport, accommodation and onsen questions.
- Rendered five Strategic Approach elements as a numbered editorial list, not separate cards.
- Moved the personal website design paragraph into My Role & Delivery and removed the repeated design bullet.
- Design & Transformation now shows only two actual-media placeholders and the exact captions BEFORE and AFTER; no extra section headings or explanatory copy. Original and new homepage screenshots/PDFs are still pending.
- Shared styling, About Me and unrelated pages are unchanged.

## Nikkei benchmark evidence — November 26, 2026

- Featured Vietnamese creator case uses approved English copy and equivalent Japanese text; anonymous cross-platform comparison is visible in the standard page, with caveat that follower totals are non-unique sums.
- Nikkei article (March 2, 2026): https://www.nikkei.com/article/DGXZQOFC2594O0V20C26A2000000/ . The screenshot belongs to the user and is a linked thumbnail, not a source for follower counts.
- Removed former sentence about a creator's planned stay in EN/JP.
- Standardized the Problem heading to Challenge across remaining draft Work pages.

- Added the actual user-provided Nikkei thumbnail as a local image asset and linked it to the original article; source screenshot displayed without inventing an illustration. Added two audience totals above the platform-by-platform chart. Removed the redundant plain comparison table while preserving the chart and disclaimer.

## Preview workflow (GitHub Pages) — November 26, 2026

- Branch `develop` is the editable preview branch. GitHub Actions builds static Next.js HTML for `https://phuonganhngh.github.io/mkt/`.
- Branch `main` remains Netlify production. Its files and `netlify.toml` have not been changed.
- Preview-only build variables: `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/mkt`. The preview `basePath` is set in `next.config.ts`; internal links and local media URLs are adjusted only for this build.
- Once GitHub Pages is enabled with **Source: GitHub Actions** in repository Settings > Pages, `develop` pushes publish preview; a deliberate merge `develop -> main` triggers Netlify production.
- If `develop` is merged to `main`, Netlify builds without GitHub Pages environment variables, retaining the normal root-path URL.
- Keep media files in `public/media`; on GitHub Pages they will resolve under `/mkt/media/`.
