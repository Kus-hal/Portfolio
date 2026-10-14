import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Offers } from "@/components/Offers";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main
        id="main"
        tabIndex={-1}
        className="pb-[150px] outline-none max-sm:pb-[110px]"
      >
        <span id="top" />
        <Hero />
        <Marquee />
        <Offers />
        <Work />
        <Experience />
        <About />
        <Stack />
        {/* Education is hidden for now; the content stays in site.ts and <Timeline> can render it:
            <Section id="education" heading={education.heading}><Timeline items={education.entries} /></Section> */}
      </main>
      <Contact />
    </>
  );
}
