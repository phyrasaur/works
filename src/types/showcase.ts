import type { ThemeImage } from "@/types/media";

export type ShowcaseSlug = "hyperprint" | "donaid" | "wishful";

export type ShowcaseItem = {
  brand: string;
  title: string;
  service: string;
  image: ThemeImage;
  slug: ShowcaseSlug;
};

export type ShowcaseDetails = {
  item: ShowcaseItem;
  number: number;
  total: number;
};
