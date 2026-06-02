export type ImageSource = ImageMetadata | string;

export type Figure = {
  image: ImageMetadata;
  title: string;
  body: string;
  className?: string;
};

export type Feature = {
  label: string;
  title: string;
  body: string;
  image: ImageMetadata;
};

export type Insight = {
  label: string;
  image: ImageSource;
  title: string;
  body: string;
};

export type MetaItem = {
  label: string;
  body: string;
};

export type NumberedItem = {
  label: string;
  title: string;
  body: string;
};

export type NextShowcase = {
  href: string;
  showcaseNumber: number;
  showcaseTotal: number;
  brand: string;
  title: string;
};
