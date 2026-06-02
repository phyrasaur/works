import hyperprintImage from "@/images/hyperprint-hero.jpg";
import donaidImage from "@/images/donaid/hero.jpg";
import wishfulImage from "@/images/wishful-hero.jpg";
import hyperprintMark from "@/graphics/hyperprint.svg";
import donaidMark from "@/graphics/donaid.svg";
import wishfulMark from "@/graphics/wishful.svg";
import type { ArticleNextShowcase } from "@/types/article";
import type { ShowcaseDetails, ShowcaseItem } from "@/types/showcase";

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

export function getShowcase(slug: string): ShowcaseDetails {
  const index = showcaseItems.findIndex((item) => item.slug === slug);

  if (index === -1) {
    throw new Error(`Showcase item not found for slug: ${slug}`);
  }

  return {
    item: showcaseItems[index],
    number: index + 1,
    total: showcaseItems.length,
  };
}

export function getNextShowcase(currentSlug: string): ArticleNextShowcase {
  const currentIndex = showcaseItems.findIndex(
    (item) => item.slug === currentSlug,
  );
  const nextIndex =
    currentIndex === -1 ? 0 : (currentIndex + 1) % showcaseItems.length;
  const nextItem = showcaseItems[nextIndex];

  return {
    href: `/${nextItem.slug}`,
    showcaseNumber: nextIndex + 1,
    showcaseTotal: showcaseItems.length,
    brand: nextItem.brand,
    title: nextItem.title,
  };
}
