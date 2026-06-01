import hyperprintImage from "@/images/hyperprint-hero.jpg";
import donaidImage from "@/images/donaid-hero.jpg";
import wishfulImage from "@/images/wishful-hero.jpg";
import hyperprintMark from "@/graphics/hyperprint.svg";
import donaidMark from "@/graphics/donaid.svg";
import wishfulMark from "@/graphics/wishful.svg";
import type { ShowcaseItem } from "@/types/showcase";

export const showcaseItems: ShowcaseItem[] = [
  {
    brand: "Hyperprint",
    title: "Branding printshop customer experience",
    service: "Service design",
    image: hyperprintImage,
    markImage: hyperprintMark,
    slug: "hyperprint",
  },
  {
    brand: "DonAid",
    title: "Donation tracking & audit conceptualised",
    service: "Product management",
    image: donaidImage,
    markImage: donaidMark,
    slug: "donaid",
  },
  {
    brand: "Wishful Menu",
    title: "Democracy in menu planning at a restaurant",
    service: "Product design",
    image: wishfulImage,
    markImage: wishfulMark,
    slug: "wishful",
  },
];
