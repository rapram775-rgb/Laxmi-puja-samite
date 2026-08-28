import type { ProjectKind } from "./project";

export interface ShowcaseProject {
  number: string;
  title: string;
  category: string;
  description: string;
  href: string;
  kind: ProjectKind;
  image: string;
  imageAlt: string;
}

export interface Story {
  number: string;
  category: "Technology" | "Design" | "Business" | "Product" | "Behind the Work";
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
}
