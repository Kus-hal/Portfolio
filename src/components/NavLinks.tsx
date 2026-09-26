"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/content/site";

/** In-page links; the one whose section sits mid-viewport is marked current. */
export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const linked = new Set<string>(navItems.map(({ id }) => id));
    // Watch every section, not just linked ones, so the hero or an unlinked section clears the highlight.
    const sections = document.querySelectorAll("#main > section");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const { id } = entry.target;
          setActive(linked.has(id) ? id : null);
        }
      },
      // A thin band across the middle of the viewport decides which section is "current".
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="hidden gap-[26px] text-[15px] text-muted min-[821px]:flex">
      {navItems.map(({ id, label }) => {
        const current = active === id;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={current ? "location" : undefined}
              className="relative transition-colors duration-200 hover:text-ink aria-[current]:text-ink aria-[current]:after:absolute aria-[current]:after:inset-x-0 aria-[current]:after:-bottom-1.5 aria-[current]:after:h-0.5 aria-[current]:after:rounded-sm aria-[current]:after:bg-accent"
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
