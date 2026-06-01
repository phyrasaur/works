export type ArticleImage = ImageMetadata | string;

export type ArticleFigure = {
  image: ImageMetadata;
  title: string;
  body: string;
  className?: string;
};

export type ArticleFeature = {
  label: string;
  title: string;
  body: string;
  image: ImageMetadata;
};

export type ArticleInsight = {
  label: string;
  image: ArticleImage;
  title: string;
  body: string;
};

export type ArticleMetaItem = {
  label: string;
  body: string;
};

export type ArticleNumberedItem = {
  label: string;
  title: string;
  body: string;
};

export type ArticleNextShowcase = {
  href: string;
  showcaseNumber: number;
  showcaseTotal: number;
  brand: string;
  title: string;
};
