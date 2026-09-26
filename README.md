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
