import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { introDecisionScript } from "@/components/intro";
import { IntroSting } from "@/components/IntroSting";
import { MotionProvider } from "@/components/MotionProvider";
import { metaDescription, ogImage, person, seo, siteUrl } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Mono is only used by the hero ticker, so it ships as a 15 KB Basic Latin subset of
// JetBrains Mono 400 (OFL) instead of the full 40 KB variable font. See src/fonts/README.md.
const jetBrainsMono = localFont({
  src: "../fonts/jetbrains-mono-400-basic-latin.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "Cascadia Mono", "Menlo", "monospace"],
});

const { title } = seo;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: metaDescription,
  authors: [{ name: person.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: metaDescription,
    siteName: person.name,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: metaDescription,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f5f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      // The intro script below may add `data-intro` before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the intro covers the page without a flash of the site. */}
        <script dangerouslySetInnerHTML={{ __html: introDecisionScript }} />
      </head>
      <body>
        <noscript>
          <style>
            {"[data-animate]{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
        <MotionProvider>
          <IntroSting />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
