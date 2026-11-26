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
