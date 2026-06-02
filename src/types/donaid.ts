import type {
  Feature,
  Figure,
  Insight,
  MetaItem,
  NumberedItem,
} from "@/types/article";

export type DonaidData = {
  backgroundMeta: MetaItem[];
  problems: NumberedItem[];
  workshopFigures: Figure[];
  feasibilityFigures: Figure[];
  processFigures: Figure[];
  interfaceFigure: Figure;
  blueprintFigure: Figure;
  features: Feature[];
  outcomeFigure: Figure;
  insights: Insight[];
};
