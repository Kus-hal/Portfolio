import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { caseStudies, caseStudyBySlug } from "@/content/case-studies";
import { person } from "@/content/site";

// Static export: every case study is pre-rendered, and unknown slugs are a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = caseStudyBySlug((await params).slug);
  if (!study) return {};
  const title = `${study.name}: case study | ${person.name}`;
  const url = `/work/${study.slug}`;
  const images = [
    {
      url: `${url}/og.png`,
      width: 1200,
      height: 630,
      alt: `${study.name}, a case study by ${person.name}`,
    },
  ];
  // Metadata merges shallowly, so canonical, Open Graph and Twitter are set in full here.
  return {
    title,
    description: study.sub,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: study.sub,
      siteName: person.name,
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.sub,
      images,
    },
  };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const study = caseStudyBySlug((await params).slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
