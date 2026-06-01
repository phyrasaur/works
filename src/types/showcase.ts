export type ShowcaseItem = {
  brand: string;
  title: string;
  service: string;
  image: ImageMetadata;
  markImage: ImageMetadata;
  slug: string;
};

export type ShowcaseDetails = {
  item: ShowcaseItem;
  number: number;
  total: number;
};
