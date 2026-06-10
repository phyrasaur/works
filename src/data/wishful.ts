import bridgingWorldsImage from "@/images/wishful/bridging-worlds.png";
import ecosystemMapImage from "@/images/wishful/ecosystem-map.png";
import marketingLandingMp4 from "@/images/wishful/marketing-landing.mp4";
import marketingLandingPoster from "@/images/wishful/marketing-landing-poster.webp";
import marketingLandingWebm from "@/images/wishful/marketing-landing.webm";
import menuCustomisationImage from "@/images/wishful/menu-customisation.png";
import menuPlannerImage from "@/images/wishful/menu-planner.png";
import restaurantInventoryImage from "@/images/wishful/restaurant-inventory.png";

export const wishful = {
  backgroundMeta: [
    {
      label: "Role",
      body: "Product, service, interface design",
    },
  ],
  ecosystemImage: ecosystemMapImage,
  bridgingWorldsImage,
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
            poster: marketingLandingPoster,
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
          image: menuCustomisationImage,
          title: "Menu customisation",
          body: "Restaurant creates a menu item with customisable options linked to a standard recipe.",
        },
        {
          image: restaurantInventoryImage,
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
          image: menuPlannerImage,
          title: "Menu planning",
          body: "Dietitian turns consultation insights and nutrition requirements into a personalised menu plan with AI assistance.",
        },
      ],
    },
  ],
};
