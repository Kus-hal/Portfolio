import type { ProjectId } from "@/content/site";
import { clothLab } from "./cloth-lab";
import type { CaseStudy } from "./types";

/** Published case studies, in the order "Next project" walks through them. */
export const caseStudies: CaseStudy[] = [clothLab];

export const caseStudyBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const hasCaseStudy = (id: ProjectId) =>
  caseStudies.some((c) => c.slug === id);

/** The study after this one, wrapping round; null when it's the only one. */
export const nextCaseStudy = (slug: string) => {
  if (caseStudies.length < 2) return null;
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
};
