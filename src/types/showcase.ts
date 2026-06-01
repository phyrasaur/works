export type ShowcaseItem = {
  brand: string;
  title: string;
  service: string;
  image: ImageMetadata;
  markImage?: ImageMetadata;
  mark: "hyperprint" | "donaid" | "wishful";
  slug: string;
  countLabel: string;
};
