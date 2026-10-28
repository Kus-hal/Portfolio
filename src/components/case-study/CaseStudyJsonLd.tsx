import type { CaseStudy } from "@/content/case-studies/types";
import { person, siteUrl } from "@/content/site";

/** schema.org data for a case study: the breadcrumb trail and the write-up itself, by Kushal. */
export function CaseStudyJsonLd({ study }: { study: CaseStudy }) {
  const url = `${siteUrl}/work/${study.slug}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        // "Work" is a section of the homepage, not a page of its own, so the trail is two steps.
        { "@type": "ListItem", position: 2, name: study.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: study.seo.title,
      description: study.seo.description,
      keywords: study.seo.keywords.join(", "),
      url,
      mainEntityOfPage: url,
      image: `${url}/og.png`,
      inLanguage: "en",
      author: { "@type": "Person", name: person.name, url: `${siteUrl}/` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Escaping `<` keeps any content string from closing the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
