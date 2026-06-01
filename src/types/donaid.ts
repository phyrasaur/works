import type {
  ArticleFeature,
  ArticleFigure,
  ArticleInsight,
  ArticleMetaItem,
  ArticleNumberedItem,
} from "@/types/article";

export type DonaidData = {
  backgroundMeta: ArticleMetaItem[];
  problems: ArticleNumberedItem[];
  workshopFigures: ArticleFigure[];
  feasibilityFigures: ArticleFigure[];
  processFigures: ArticleFigure[];
  interfaceFigure: ArticleFigure;
  blueprintFigure: ArticleFigure;
  features: ArticleFeature[];
  outcomeFigure: ArticleFigure;
  insights: ArticleInsight[];
};
