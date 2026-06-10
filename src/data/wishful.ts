import bridgingWorldsImageDark from "@/images/wishful/dark/bridging-worlds.png";
import ecosystemMapImageDark from "@/images/wishful/dark/ecosystem-map.png";
import marketingLandingPosterDark from "@/images/wishful/dark/marketing-landing-poster.webp";
import menuCustomisationImageDark from "@/images/wishful/dark/menu-customisation.png";
import menuPlannerImageDark from "@/images/wishful/dark/menu-planner.png";
import restaurantInventoryImageDark from "@/images/wishful/dark/restaurant-inventory.png";
import bridgingWorldsImageLight from "@/images/wishful/light/bridging-worlds.png";
import ecosystemMapImageLight from "@/images/wishful/light/ecosystem-map.png";
import marketingLandingPosterLight from "@/images/wishful/light/marketing-landing-poster.webp";
import menuCustomisationImageLight from "@/images/wishful/light/menu-customisation.png";
import menuPlannerImageLight from "@/images/wishful/light/menu-planner.png";
import restaurantInventoryImageLight from "@/images/wishful/light/restaurant-inventory.png";
import marketingLandingMp4 from "@/images/wishful/marketing-landing.mp4";
import marketingLandingWebm from "@/images/wishful/marketing-landing.webm";
import { themeImage } from "@/types/media";

export const wishful = {
  backgroundMeta: [
    {
      label: "Role",
      body: "Product, service, interface design",
    },
  ],
  ecosystemImage: themeImage(ecosystemMapImageLight, ecosystemMapImageDark),
  bridgingWorldsImage: themeImage(
    bridgingWorldsImageLight,
    bridgingWorldsImageDark,
  ),
  problemSubsections: [
    {
      title: "Nutrition education gap",
      body: 'Typically, dietitians simplify meal planning with portion sizes, but clients often struggle to apply it in real contexts such as at restaurants, at groceries and at home. Serving-size labels are often vague and rarely show how they translate into day-to-day decisions, which makes "knowing" feel disconnected from "doing."',
    },
    {
      title: "Restaurant operation in silo",
      body: "Meanwhile, restaurants rarely provide accurate nutrition information. Customisation is common, but it is usually driven by operational or commercial incentives, not nutrition, so portions become inconsistent and nutrient intake becomes unpredictable. Operationally, they do depend on standard recipes, portion control, and modifications as they affect the cost.",
    },
  ],
  conceptFeatures: [
    {
      label: "Feature one",
      title: "Marketing landing page",
      figures: [
        {
          video: {
            poster: themeImage(
              marketingLandingPosterLight,
              marketingLandingPosterDark,
            ),
            width: 1668,
            height: 998,
            sources: [
              {
                src: marketingLandingWebm,
                type: "video/webm" as const,
              },
              {
                src: marketingLandingMp4,
                type: "video/mp4" as const,
              },
            ],
          },
          title: "Marketing the idea",
          body: "Conceptualising the novel idea with a concrete example first and foremost",
        },
      ],
    },
    {
      label: "Feature two",
      title: "Portion-aware ordering terminal",
      figures: [
        {
          image: themeImage(
            menuCustomisationImageLight,
            menuCustomisationImageDark,
          ),
          title: "Menu customisation",
          body: "Restaurant creates a menu item with customisable options linked to a standard recipe.",
        },
        {
          image: themeImage(
            restaurantInventoryImageLight,
            restaurantInventoryImageDark,
          ),
          title: "Portion customisation",
          body: "Customer adjusts ingredient portions while seeing the nutritional and price impact.",
        },
      ],
    },
    {
      label: "Feature three",
      title: "Menu planner",
      figures: [
        {
          image: themeImage(menuPlannerImageLight, menuPlannerImageDark),
          title: "Menu planning",
          body: "Dietitian turns consultation insights and nutrition requirements into a personalised menu plan with AI assistance.",
        },
      ],
    },
  ],
};
