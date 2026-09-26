import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Section } from "@/components/Section";
import { Stack } from "@/components/Stack";
import { Timeline } from "@/components/Timeline";
import { Work } from "@/components/Work";
import { education, experience } from "@/content/site";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <span id="top" />
        <Hero />
        <About />
        <Capabilities />
        <Work />
        <Section
          id="experience"
          kicker={experience.kicker}
          heading={experience.heading}
        >
          <Timeline items={experience.entries} />
        </Section>
        <Section
          id="education"
          kicker={education.kicker}
          heading={education.heading}
        >
          <Timeline items={education.entries} />
        </Section>
        <Stack />
      </main>
      <Contact />
    </>
  );
}
