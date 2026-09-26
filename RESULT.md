# RESULT — Kushal Sharma portfolio

## What was built

A single-page portfolio rebuilt from the approved reference (`index.html` + `HANDOFF.md`) as a real
Next.js 16 App Router project: TypeScript, Tailwind CSS v4, Motion, `next/font`. It is a **static export**
(`npm run build` → `out/`), so it can be hosted anywhere.

- **Sections:** sticky nav (active-link highlight) → hero → About → What I build → Selected work →
  Experience → Education → Stack → Contact/footer.
- **Hero motif:** live session timer (`HH:MM:SS` from page load) + animated eq bars, in JetBrains Mono.
- **Architecture:** server components render everything from one typed content file
  (`src/content/site.ts`). Only four small client islands ship JS: nav highlight, hero entrance, section
  reveal, session timer.
- **Meta:** title, description, canonical, Open Graph + Twitter card with a build-time 1200×630 `/og.png`,
  KS-mark SVG favicon, `theme-color`.
- **SEO:** schema.org `Person` JSON-LD (job titles, location, education, skills, GitHub/LinkedIn),
  `robots.txt` and `sitemap.xml`. The title and description use "Android Developer" alongside
  "Engineer", plus location and remote/relocation. This deliberately changes the handoff's title
  (Kushal approved it).
- **Real content:** from the interview and Kushal's résumé. Nothing was invented.

## Verification (local, 2026-09-26)

| Check                                                                                         | Result                                                                        |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `npm run lint`, `npm run typecheck`, `npm run build`                                          | clean                                                                         |
| Widths 375 / 768 / 1024 / 1440                                                                | no horizontal overflow; phone layout reviewed from screenshots                |
| Console errors (headless Chrome, all widths, both motion modes; dev server and static export) | 0                                                                             |
| `prefers-reduced-motion: reduce`                                                              | no entrance, loops stopped, timer frozen at `00:00:00`, all content visible   |
| Keyboard                                                                                      | first Tab = "Skip to content"; visible focus ring on all interactive elements |
| Lighthouse desktop                                                                            | Performance 100 · Accessibility 100 · Best practices 100 · SEO 100            |
| Lighthouse mobile (simulated, localhost)                                                      | Performance 91–93 · Accessibility 100 · Best practices 100 · SEO 100          |
| Real first paint, mobile emulation                                                            | ~0.3 s (lede is the LCP element)                                              |

**About the mobile score:** under the same conditions, the original zero-JS `index.html` reference scores
**88**. This machine's headless Chrome delays first paint by about 1 s, and Lantern folds that into its
estimate. Measure the real number with PageSpeed Insights once the site is deployed.

## Deviations from the handoff/reference (all approved by Kushal)

- **SDLC Corp is past** (Jul 2025 – Jul 2026): copy in past tense. The facts panel reads
  _Now: Building Loudly_ and _Previously: Kotlin Dev, SDLC Corp_.
- **Durations instead of dates** in Experience: "1 year", "7 months".
- **Stats** use résumé metrics: 1.5+ yrs · 350 → 110 MB · ~50% fewer crashes · ~68 ms drift.
- **"no network" → "no internet"** for Loudly. It uses local Wi-Fi/Bluetooth discovery, per the résumé.
- **Flat work badges**. The warm orange appears only on the hero dot. No `→` in link text.
- **Education section** added (structure borrowed from a reference site; visuals unchanged), plus tech
  tags under every job.
- **Photo** as a round avatar in About. **Mobile nav** hides the links, as in the reference.
- **Stack** curated from the résumé into 9 groups.

## Engineering decisions worth knowing

- **Builds use `--webpack`.** Turbopack's `next/font/google` resolver fails on this project.
- **Monospace** is a 15 KB Basic Latin subset of JetBrains Mono 400 (`src/fonts/`). It's used only by the
  hero ticker. The Google-hosted static weights can't be self-hosted by `next/font`.
- **CSS is inlined** (`experimental.inlineCss`). It removes the render-blocking stylesheet on slow mobile
  connections.
- **Hero name and lede rise without fading.** They are the LCP candidates, so they must never start
  invisible.
- **Motion vs CSS:** Motion handles the orchestrated hero entrance and the section reveals. CSS handles the
  infinite loops (dot ping, eq bars) and hover/press states, which run on the compositor at zero JS cost.
- **Only the Ting card lifts on hover.** It's the only card with a link, so no other card suggests a click
  it can't deliver.

## Assumptions

- Codeup tags are "Android · Java · Mentoring". The résumé doesn't list Codeup tooling; they come from the
  role title and the mentoring bullet.
- The downloadable résumé is the PDF as provided, phone number included. Kushal confirmed this.
- The footer year is computed at build time, so it refreshes on each deploy.

## Still open

1. **Hosting + domain:** pending (GitHub Student Pack). Build with
   `NEXT_PUBLIC_SITE_URL=https://<domain>` so canonical and OG URLs are absolute. It currently falls back to
   `http://localhost:3000`.
2. **Loudly link:** add `href` in `src/content/site.ts` when the repo or demo goes public.
3. **Certificates:** to be added to the Education section when provided.
4. **Real-world Lighthouse:** run PageSpeed Insights on the deployed URL.
5. **Analytics:** to be chosen with the host. Options: Cloudflare Web Analytics (cookie-free, any host),
   Vercel Web Analytics (cookie-free, Vercel only), or GA4 (needs a consent banner for EU/UK visitors).
6. **Search Console:** after deploying, verify the domain in Google Search Console and submit
   `/sitemap.xml`.
