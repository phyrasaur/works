export type DonaidFigure = {
  image: ImageMetadata;
  title: string;
  body: string;
  className?: string;
};

export type DonaidProblem = {
  label: string;
  title: string;
  body: string;
};

export type DonaidFeature = {
  label: string;
  title: string;
  body: string;
  image: ImageMetadata;
};

export type DonaidInsight = {
  label: string;
  image: ImageMetadata;
  title: string;
  body: string;
};
