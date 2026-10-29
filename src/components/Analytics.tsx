"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Visitor analytics, production deployment only (local runs and Vercel previews stay out of the numbers):
 * - Vercel Web Analytics: visitors, pages, referrers, countries, devices. No cookies.
 * - Microsoft Clarity: heatmaps, scroll depth, session recordings, time on page. Runs cookieless
 *   (consent denied for storage), so no banner is needed; each page view is its own session.
 * Clicks on the actions that matter are sent to Clarity as named events you can filter by.
 */
const PRODUCTION = process.env.DEPLOY_ENV === "production";
// The project id is public (it ships in every visitor's page); the env var can override it.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "z54xym44u5";
// Clarity project ids are short alphanumerics; anything else never reaches the inline script.
const clarityOn = PRODUCTION && /^[a-z0-9]{6,20}$/i.test(CLARITY_ID);
// Note: no element may have id="clarity"; browsers expose ids as globals and it would shadow window.clarity.

type ClarityFn = (...args: unknown[]) => void;

/** Names a click, or returns null for clicks that aren't worth an event. */
function eventFor(target: Element): string | null {
  const link = target.closest("a");
  if (link) {
    const href = link.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) return "email";
    if (href.endsWith(".pdf")) return "resume_download";
    const play = href.match(/play\.google\.com\/.*[?&]id=([\w.]+)/);
    if (play) return `play_${play[1].replace(/\./g, "_")}`;
    const work = href.match(/^\/work\/([\w-]+)/);
    if (work) return `open_case_${work[1].replace(/-/g, "_")}`;
    if (href.includes("github.com")) return "github";
    if (href.includes("linkedin.com")) return "linkedin";
    return null;
  }
  const button = target.closest("button");
  if (button?.textContent?.trim() === "Skim") return "skim_mode";
  return null;
}

export function Analytics() {
  useEffect(() => {
    if (!clarityOn) return;
    const onClick = (e: MouseEvent) => {
      const name = e.target instanceof Element ? eventFor(e.target) : null;
      const clarity = (window as Window & { clarity?: ClarityFn }).clarity;
      if (name && clarity) clarity("event", name);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!PRODUCTION) return null;
  return (
    <>
      <Script id="vercel-analytics">
        {`window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};`}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      {clarityOn && (
        <Script id="ms-clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");
window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"denied"});`}
        </Script>
      )}
    </>
  );
}
