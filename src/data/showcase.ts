import hyperprintImage from "@/images/hyperprint-hero.jpg";
import donaidImage from "@/images/donaid-hero.jpg";
import wishfulMenuImage from "@/images/wishful-menu-hero.jpg";
import hyperprintMark from "@/graphics/hyperprint-mark.png";
import donaidMark from "@/graphics/donaid-mark.png";
import type { ShowcaseItem } from "@/types/showcase";

export const showcaseItems: ShowcaseItem[] = [
  {
    brand: "Hyperprint",
    title: "Branding printshop customer experience",
    service: "Service design",
    kind: "Brand",
    image: hyperprintImage,
    markImage: hyperprintMark,
    mark: "hyperprint",
    slug: "hyperprint",
    countLabel: "1 / 3",
  },
  {
    brand: "DonAid",
    title: "Donation tracking & audit conceptualised",
    service: "Product management",
    kind: "Brand",
    image: donaidImage,
    markImage: donaidMark,
    mark: "donaid",
    slug: "donaid",
    countLabel: "2 / 3",
  },
  {
    brand: "Wishful Menu",
    title: "Democracy in menu planning at a restaurant",
    service: "Product design",
    kind: "Brand",
    image: wishfulMenuImage,
    mark: "wishful",
    slug: "wishful-menu",
    countLabel: "3 / 3",
  },
];
