# Kushal Sharma — portfolio

Single-page portfolio. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run preview    # serve out/ locally
npm run lint && npm run typecheck
```

## Editing content

All copy, links, stats, experience and stack live in [`src/content/site.ts`](src/content/site.ts).
Components only handle layout. The résumé is `public/Kushal_Sharma_Resume.pdf`; the portrait is `src/assets/kushal.jpg`.

## Deploying

The build is a static export (`output: "export"`), so `out/` can be hosted anywhere (Vercel, Netlify,
Cloudflare Pages, GitHub Pages…). Set `NEXT_PUBLIC_SITE_URL` to the final origin (e.g. `https://kushal.dev`)
at build time so canonical and Open Graph URLs are absolute and correct.

## Notes

- **Why `--webpack`:** Next 16 builds with Turbopack by default, but Turbopack's `next/font/google`
  resolver fails on this project ("queries have exactly one entry"). Webpack builds cleanly; drop the flag
  once that's fixed upstream.
- **JetBrains Mono is loaded as the variable font** because Google serves its static weights from
  `/l/font?kit=` URLs that `next/font` can't self-host.
- **Social image** is rendered at build time by the `/og.png` route (not the `opengraph-image` convention),
  so the export contains a real `.png` that static hosts serve with the right content type.
- **Motion:** Motion handles the hero entrance and section reveals; CSS handles the ambient loops and hover.
  With `prefers-reduced-motion`, everything is static and the session timer stays at `00:00:00`.

## Liquid metal and liquid glass

- **Liquid-metal KS mark:** Paper Shaders' liquid-metal shader (`@paper-design/shaders`, Apache-2.0)
  is fed a **precomputed** mask, `public/brand/ks-liquid-metal.png`, so visitors never run the costly
  shape processing. Regenerate the mask with `node brand-mask.mjs` in `brag-output/source`.
  `LiquidMetalMark` shows a solid KS until the metal has drawn, falls back to it without WebGL, and
  lazy-loads the shader code.
- **Where the metal appears:**
  - In the **intro sting**, only on capable devices (laptops/desktops, or phones with 8+ cores and
    6+ GB; never with Data Saver). Compiling the shader during page start-up costs about 0.5 s of main
    thread on a mid laptop and more on budget phones.
  - In the **footer**, mounted only while near the viewport.
- **Liquid glass** (`.glass` in `globals.css`) is native CSS: one frosted blur layer, a light tint and a
  bright rim. (An SVG edge-refraction layer was removed because it doubled the content behind the
  pill.) It's used on the floating nav pill and the intro's Skip button.

## Intro sting

- **What it does:** the ~5 s sting plays every time someone opens the site: the KS mark, then the name, then the role.
  At the end, the name flies onto the real hero heading. It's built with the Web Animations API in
  `src/components/IntroSting.tsx`, is silent, and can always be skipped (button or Esc). It doesn't
  replay on a reload, on back/forward, or when arriving from another page of this site (checked from
  the navigation type and the referrer; nothing is stored).
- **Three versions:** each is cut to an NCS track's beat grid: 1 Pop (Different Heaven, "Nekozilla"),
  2 Reveal (Electro-Light, "Symbolism") and 3 Slam (HXI, "Lock n' Load"). The shipped version is
  `DEFAULT_STING` in `src/components/intro.ts`.
- **Preview:** open `/?intro=1`, `/?intro=2` or `/?intro=3` to replay any version, with or without its
  music.
- **Music:** the preview clips live in `public/intro/audio/`, which is gitignored and local only. A host
  that builds from git never gets them. If you upload a locally built `out/` folder instead, delete
  `out/intro/audio/` first. Visitors always get the silent sting.
