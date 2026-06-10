import type { SvgComponent } from "astro/types";
import type { ThemeImage } from "@/types/media";

type FigureContent = {
  title: string;
  body: string;
  className?: string;
};

type ImageFigure = FigureContent & {
  image: ThemeImage;
};

type VideoFigure = FigureContent & {
  video: {
    poster: ThemeImage;
    width: number;
    height: number;
    sources: {
      src: string;
      type: "video/mp4" | "video/webm";
    }[];
  };
};

export type Figure = ImageFigure | VideoFigure;

export type Feature = {
  label: string;
  title: string;
  body: string;
  image: ThemeImage;
};

export type Insight = {
  label: string;
  image: SvgComponent;
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

export type ShowcaseLink = {
  href: string;
  showcaseNumber: number;
  showcaseTotal: number;
  brand: string;
  title: string;
};

export type NextShowcase = ShowcaseLink;
export type PreviousShowcase = ShowcaseLink;
