# Plan — Kushal Sharma portfolio (Next.js + Motion rebuild)

## Context

Kushal (Android engineer, Jaipur) is job-hunting internationally. `Downloads/HANDOFF.md` specifies a single-page
portfolio and `Downloads/index.html` is the approved visual reference. Goal: rebuild that reference as a real
Next.js App Router + TypeScript + Tailwind + Motion project in `E:\New Portfolio` (currently empty), with real
content taken from his résumé and confirmed in a 29-question interview. **Not a redesign** — match the reference
layout/palette/hero motif, apply only the deviations listed below. Deploy is **deferred** (he's evaluating GitHub
Student Pack domain/hosting), so the build is a **static export** that runs anywhere; done = runs locally, verified.

Guiding rule from Kushal: use relevant skills/plugins/libraries to make it professional — **don't overuse them**.
So: one runtime dependency (`motion`), a few dev-only helpers, skills applied where they add judgment.

## Decisions locked in the interview

**Links/data:** email `kushals0209@gmail.com` · GitHub `https://github.com/Kus-hal` · LinkedIn
`https://www.linkedin.com/in/kushal-0602-sharma` · Ting `https://play.google.com/store/apps/details?id=com.binarycoders.ting`
· résumé `C:\Users\Kushal Sharma\Desktop\Kushal_Resume.pdf` → `public/Kushal_Sharma_Resume.pdf` shipped as-is (phone
number included — Kushal confirmed) · Loudly: no link, "Public release soon" · OMNIA: no link, "Internal work · SDLC Corp".
Phone number never appears on the page itself.

**Deviations from reference/handoff (all approved):**
- SDLC is past: past tense copy; facts panel rows = Status: Open to new roles · Now: Building Loudly · Previously:
  Kotlin Dev, SDLC Corp · Focus: Android & mobile · Based in: Jaipur, India · Open to: Remote · Relocation ·
  Education: B.Tech CSE, RIET.
- Experience "when" column shows **duration only**: SDLC "1 year", Codeup "7 months".
- "no network" → "**no internet**" everywhere for Loudly (résumé: local Wi-Fi/Bluetooth discovery).
- Stats: `1.5+ yrs` production Kotlin · `350 → 110 MB` release build at OMNIA · `~50%` fewer crashes at OMNIA ·
  `~68 ms` audio drift across devices (Loudly).
- Work badges flat (Ting cobalt, Loudly ink, OMNIA neutral surface + ink letter); warm `#FF9F1C` only on hero dot.
- Remove `→` from link text. No `placeholder` styling needed — no bracket gaps remain except site URL.
- Avatar (`images/1.jpg`, 327×345) round ~128px at top of About facts column, alt "Kushal Sharma".
- Mobile (<820px): nav links hidden as in reference (no menu).
- Certificates section: later, not now.

**Approved copy** (verbatim, from interview Q10/11/16/17/18) goes into `src/content/site.ts`:
hero lede, About heading + 3 paragraphs, 4 "What I build" cells, 3 work cards (+tags), SDLC (context line + 4
bullets), Codeup (context line + 2 bullets), 9 stack groups (Languages · UI · Architecture · Async & data ·
Network & real-time · Media & device · Firebase & quality · Build & tooling · Currently exploring: KMP).

**Tech:** static export (`output: 'export'`, `images.unoptimized: true`); site URL from
`NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`); favicon = KS mark (SVG); OG/Twitter 1200×630 generated
at build via `opengraph-image.tsx`; local git only, no remote/push.

**Motion split (Q29 → judicious interpretation):** Motion (`motion/react`, via `LazyMotion` + `m` +
`domAnimation` to keep bundle small) for the orchestrated hero entrance and section reveals. CSS for the two
infinite ambient loops (dot ping, eq bars) and hover/press micro-transitions (card lift, button, socials) —
compositor-only, zero JS. All of it off under `prefers-reduced-motion`.

## Architecture — server-first, 4 client islands

```
E:\New Portfolio\
  docs/superpowers/specs/2026-09-25-portfolio-design.md   # this plan's decisions, committed first
  public/Kushal_Sharma_Resume.pdf
  src/assets/kushal.jpg                                   # static import for next/image
  src/content/site.ts        # typed single source of truth: links, copy, stats, experience, stack
  src/app/layout.tsx         # fonts, metadata, viewport(themeColor), <LazyMotion>, skip link
  src/app/page.tsx           # composes sections
  src/app/globals.css        # Tailwind v4 @import + @theme tokens + keyframes + reduced-motion rules
  src/app/icon.svg           # KS mark
  src/app/opengraph-image.tsx  (+ twitter-image.tsx re-export)
  src/components/
    Nav.tsx (server) + NavSpy.tsx (client: IntersectionObserver → aria-current + underline)
    Hero.tsx (server) + HeroEntrance.tsx (client: staggered m.div children) + SessionTimer.tsx (client)
    Reveal.tsx (client: whileInView once, used on section header + body blocks only)
    Section.tsx (shared: id, kicker, h2, optional sub)
    About.tsx · Build.tsx · Work.tsx · Experience.tsx · Stack.tsx · Contact.tsx
    icons.tsx (GitHub/LinkedIn/Mail inline SVGs from reference, aria-hidden)
```

Key behaviours:
- **Tokens** (`@theme`): paper `#F4F5F7`, surface `#FCFCFD`, ink `#17181C`, muted `#666A73`, line `#E4E5EA`,
  accent `#2743FF`, accent-ink `#1B31C9`, tick `#FF9F1C`, body `#33353C`; radius 14px; max-w 1080px, 28px gutter.
  Type sizes/letter-spacing lifted exactly from reference CSS (clamp values etc.).
- **Fonts** via `next/font/google`: Space Grotesk 500/600/700, Inter 400/500/600, JetBrains Mono 400/500
  (`preload:false`), all `display:'swap'`, exposed as CSS vars; `adjustFontFallback` for zero CLS.
- **SessionTimer**: SSR renders `00:00:00`; on mount, if not reduced-motion, start `setInterval(1000)` computing
  from `performance.now()` start (drift-free); `<time role="timer">` (implicit aria-live off). Reduced → stays `00:00:00`.
- **Entrance without hurting LCP/no-JS**: server HTML carries the `initial` state; `<noscript>` style + a
  `@media (prefers-reduced-motion: reduce)` rule force entrance/reveal targets visible; client `useReducedMotion()`
  passes `initial={false}`. Short durations (~0.5s, 60–80ms stagger, ease-out).
- **NavSpy**: rootMargin `-45% 0px -50% 0px` like reference; sets `aria-current="true"` on active link.
- **A11y**: skip-to-content link, `<header>/<nav aria-label>/<main>/<footer>`, visible `:focus-visible` ring
  (accent, 2px offset), icon links with `aria-label`, `html{scroll-behavior:smooth}` disabled under reduced motion.
- **Meta**: title "Kushal Sharma — Android Engineer", description = lede trimmed ≤155 chars, OG + Twitter
  `summary_large_image`, `themeColor #F4F5F7`, `metadataBase` from env.
- **OG image**: paper bg, name in Space Grotesk (font loaded from `@fontsource/space-grotesk` .woff via fs at build),
  role line, cobalt eq bars + warm dot.
- Footer year computed at build (noted in RESULT.md: refreshes on each deploy).

## Dependencies (lean)
- runtime: `next`, `react`, `react-dom`, `motion`
- dev: create-next-app defaults (TypeScript, Tailwind v4, ESLint), `prettier` + `prettier-plugin-tailwindcss`,
  `@fontsource/space-grotesk` (OG image font only)

## Skills used (only where they add judgment)
- `emil-design-eng` — while building hero entrance / reveals / hover (timings, easing, what not to animate).
- `impeccable` (audit mode) — final polish & anti-pattern check against the handoff's "generated-page tells".
- `superpowers:verification-before-completion` — before claiming done.
- Not using: frontend-design / taste-skill theme generators (direction is fixed), shadergradient (default off).

## Milestones (each = one local commit, then background Sonnet review)
0. `git init`, `.gitignore`, write spec doc → commit.
1. Scaffold (`create-next-app` w/ src dir, TS, Tailwind, ESLint, npm), `next.config` static export, tokens, fonts,
   `site.ts` content, Prettier → commit.
2. Layout shell: skip link, Nav + NavSpy, Section, Contact/footer → commit.
3. Hero: chip + dot, name, role, lede, CTAs, socials, ticker (eq bars, SessionTimer, Jaipur) + HeroEntrance → commit.
4. About (avatar, facts, stats), Build, Work, Experience, Stack + Reveal → commit.
5. Meta, icon.svg, OG/Twitter images, résumé copy → commit.
6. Final full review + verification + `RESULT.md` → commit.

**Sonnet reviewer** (Agent, `model: sonnet`, background) after each commit: reviews that commit's diff using
`code-review`, `simplify` (report-only), `emil-design-eng`/`impeccable` lens, plus the handoff quality floor and
tells list; returns ranked findings. I fix confirmed issues before the next milestone; disagreements logged with
reasoning in RESULT.md. Final milestone: one whole-codebase review.

## Verification
- `npm run lint`, `npx tsc --noEmit`, `npm run build` (produces `out/`, no errors/warnings).
- `npm run dev` via `.claude/launch.json` + built-in browser: every section renders; `read_console_messages`
  shows no errors; `resize_window` at 375 / 768 / 1024 / 1440 — screenshots, no horizontal scroll.
- Keyboard tab-through: skip link, nav, CTAs, socials, cards all show focus ring.
- Reduced motion: Playwright script in scratchpad (`emulateMedia({ reducedMotion: 'reduce' })`) asserts timer
  still `00:00:00` after 3s and entrance targets have opacity 1 (needs a one-time Chromium download — will ask first).
- Lighthouse CLI against `npx serve out` (mobile + desktop): target ≥95 performance & accessibility.
- Contrast check of muted/body/accent-ink on paper & surface (≥4.5:1).
- Links: GitHub/LinkedIn/Play URLs resolve; mailto correct; résumé downloads.

## RESULT.md will list
What was built; deviations above; assumptions; remaining open items: site URL/domain + hosting
(`NEXT_PUBLIC_SITE_URL`), Loudly link when public, certificates section, footer year refresh on deploy.

## Amendment (2026-09-25, after reviewing sahilkarwasra.vercel.app)

Kushal chose "just the structure" from that reference: visuals stay exactly per the handoff. Structural additions:
- **Education section** between Experience and Stack (RIET, B.Tech Computer Science, 2020 – 2024), laid out like an
  Experience entry; certificates join it later. The facts-panel Education row stays.
- **Tech tags under every job** (SDLC from résumé tools; Codeup: Android · Java · Mentoring).
- Now/Previously facts panel was already in the plan.
