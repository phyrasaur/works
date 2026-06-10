import hyperprintImageLight from "@/images/hyperprint/light/hero.jpg";
import hyperprintImageDark from "@/images/hyperprint/dark/hero.jpg";
import donaidImageLight from "@/images/donaid/light/hero.jpg";
import donaidImageDark from "@/images/donaid/dark/hero.jpg";
import wishfulImageLight from "@/images/wishful/light/hero.jpg";
import wishfulImageDark from "@/images/wishful/dark/hero.jpg";
import type { ShowcaseLink } from "@/types/article";
import type { ShowcaseDetails, ShowcaseItem } from "@/types/showcase";

export const showcaseItems: ShowcaseItem[] = [
  {
    brand: "Hyperprint",
    title: "Branding printshop customer experience",
    service: "Service design",
    image: {
      light: hyperprintImageLight,
      dark: hyperprintImageDark,
    },
    slug: "hyperprint",
  },
  {
    brand: "DonAid",
    title: "Donation tracking & audit conceptualised",
    service: "Product management",
    image: {
      light: donaidImageLight,
      dark: donaidImageDark,
    },
    slug: "donaid",
  },
  {
    brand: "Wishful Menu",
    title: "Democracy in menu planning at a restaurant",
    service: "Product design",
    image: {
      light: wishfulImageLight,
      dark: wishfulImageDark,
    },
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

function getShowcaseLink(index: number): ShowcaseLink {
  const item = showcaseItems[index];

  return {
    href: `/${item.slug}`,
    showcaseNumber: index + 1,
    showcaseTotal: showcaseItems.length,
    brand: item.brand,
    title: item.title,
  };
}

export function getNextShowcase(currentSlug: string): ShowcaseLink {
  const currentIndex = showcaseItems.findIndex(
    (item) => item.slug === currentSlug,
  );
  const nextIndex =
    currentIndex === -1 ? 0 : (currentIndex + 1) % showcaseItems.length;

  return getShowcaseLink(nextIndex);
}

export function getPreviousShowcase(currentSlug: string): ShowcaseLink {
  const currentIndex = showcaseItems.findIndex(
    (item) => item.slug === currentSlug,
  );
  const previousIndex =
    currentIndex === -1
      ? showcaseItems.length - 1
      : (currentIndex - 1 + showcaseItems.length) % showcaseItems.length;

  return getShowcaseLink(previousIndex);
}
