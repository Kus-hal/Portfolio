import { links, person, siteUrl } from "@/content/site";

/** schema.org Person data so search engines can connect the name, role and profiles. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og.png`,
    email: `mailto:${person.email}`,
    jobTitle: person.title,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Rajasthan Institute of Engineering & Technology",
    },
    knowsAbout: [
      "Android development",
      "Kotlin",
      "Jetpack Compose",
      "Clean Architecture",
      "Kotlin Coroutines",
      "Kotlin Flow",
      "Room",
      "Retrofit",
      "Ktor",
      "Firebase",
      "CameraX",
      "ML Kit",
      "ExoPlayer",
    ],
    sameAs: [links.github, links.linkedin],
  };

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
