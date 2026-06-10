import bankingImageDark from "@/images/donaid/dark/banking.jpg";
import blueprintImageDark from "@/images/donaid/dark/blueprint.png";
import demoImageDark from "@/images/donaid/dark/demo.png";
import moneyFlowsImageDark from "@/images/donaid/dark/before-after-tracking.png";
import receiptImageDark from "@/images/donaid/dark/receipt.png";
import reportImageDark from "@/images/donaid/dark/report.png";
import sitemapImageDark from "@/images/donaid/dark/sitemap.jpg";
import statusImageDark from "@/images/donaid/dark/status.jpg";
import trackingImageDark from "@/images/donaid/dark/tracking.png";
import userJourneyImageDark from "@/images/donaid/dark/user-story-journey.png";
import whatsappImageDark from "@/images/donaid/dark/whatsapp.jpg";
import wireframeSketchImageDark from "@/images/donaid/dark/wireframe-sketch.png";
import bankingImageLight from "@/images/donaid/light/banking.jpg";
import blueprintImageLight from "@/images/donaid/light/blueprint.png";
import demoImageLight from "@/images/donaid/light/demo.png";
import moneyFlowsImageLight from "@/images/donaid/light/before-after-tracking.png";
import receiptImageLight from "@/images/donaid/light/receipt.png";
import reportImageLight from "@/images/donaid/light/report.png";
import sitemapImageLight from "@/images/donaid/light/sitemap.jpg";
import statusImageLight from "@/images/donaid/light/status.jpg";
import trackingImageLight from "@/images/donaid/light/tracking.png";
import userJourneyImageLight from "@/images/donaid/light/user-story-journey.png";
import whatsappImageLight from "@/images/donaid/light/whatsapp.jpg";
import wireframeSketchImageLight from "@/images/donaid/light/wireframe-sketch.png";
import ClariteamImage from "@/graphics/clariteam.svg";
import ThinkpencilImage from "@/graphics/thinkpencil.svg";
import VitruvianImage from "@/graphics/vitruvian.svg";
import type { DonaidData } from "@/types/donaid";
import { themeImage } from "@/types/media";

export const donaid: DonaidData = {
  backgroundMeta: [
    {
      label: "Role",
      body: "Product strategy, service design, user experience, interface design, product management",
    },
    {
      label: "Tech",
      body: "Confluence, Jira, Figma, Tailwind CSS, Next.js, Prisma, PostgreSQL, AWS",
    },
  ],
  problems: [
    {
      label: "One",
      title: "Incomprehensible brief:",
      body: "The dev brief consisted of 50+ interlinked documents with the data modelling in a 30-tabs spreadsheet. Critical business logic was buried in walls of text.",
    },
    {
      label: "Two",
      title: "Built from ground up:",
      body: "Spanning across accounting, banking, legal trust, logistics, e-commerce, and CSR, every domain had to be modelled from scratch with no room for heuristics.",
    },
    {
      label: "Three",
      title: "Product feasibility:",
      body: "Open banking access varies by country and bank. There was no guarantee the data flow we needed would even be available.",
    },
  ],
  workshopFigures: [
    {
      image: themeImage(moneyFlowsImageLight, moneyFlowsImageDark),
      title: "Money versus data flows",
      body: "To emphasise that DonAid doesn't collect money, I mapped out the money and reporting flows",
      className: "media-card--workshop-lead",
    },
    {
      image: themeImage(userJourneyImageLight, userJourneyImageDark),
      title: "Comparing donor journeys",
      body: "I compared a typical user journey with the proposed donation tracking from the donor's perspective to clarify how donation tracking works",
      className: "media-card--workshop-detail",
    },
  ],
  feasibilityFigures: [
    {
      image: themeImage(bankingImageLight, bankingImageDark),
      title: "Surveying available banking data",
      body: "CSV bank statements are easier to sanitise than PDFs, and cut dev effort if we build our own ingestion",
    },
    {
      image: themeImage(whatsappImageLight, whatsappImageDark),
      title: "Messaging services",
      body: "We decided to use WhatsApp API directly, no middleware markup, lower cost per transaction",
    },
  ],
  processFigures: [
    {
      image: themeImage(statusImageLight, statusImageDark),
      title: "Simplifying donation status: Demo vs MVP",
      body: "Edge cases were scoped out of Demo and MVP, pushed to later phases.",
    },
    {
      image: themeImage(sitemapImageLight, sitemapImageDark),
      title: "Information architecture",
      body: "Sitemap covering the product and marketing pages, prioritised by stakeholder's needs.",
    },
  ],
  interfaceFigure: {
    image: themeImage(wireframeSketchImageLight, wireframeSketchImageDark),
    title: "Sketching wireframes",
    body: "Throughout my product workshops with the founder, I sketched wireframes and flow diagrams ad-hoc to build shared understanding. The high-fidelity design was later reviewed and approved in Figma before I handed over code as React TypeScript components, styled with Tailwind CSS, to the dev team.",
  },
  blueprintFigure: {
    image: themeImage(blueprintImageLight, blueprintImageDark),
    title: "Service blueprint",
    body: "Aligning teams and stakeholders for what DonAid is",
  },
  features: [
    {
      label: "Feature one",
      title: "Donation tagging",
      body: "Upon a successful donation transaction with the campaign partner, the POS then requests a unique tag for the donation to be printed as a QR code in the receipt which allows the donor to track the progress of the donation",
      image: themeImage(receiptImageLight, receiptImageDark),
    },
    {
      label: "Feature two",
      title: "Public tracking",
      body: "Akin to parcel tracking, the donation progress is laid out in a timeline. A summary of the current status at the top provides a general overview of the donation. The tracker can get a notification on WhatsApp for the progress of the donation",
      image: themeImage(trackingImageLight, trackingImageDark),
    },
    {
      label: "Feature three",
      title: "Reporting",
      body: "Each step generates a unique report. Donation transactions are batched into an acknowledgement report, compiled into a remittance report for the campaign partner, then closed with a settlement advice once the trustee releases funds to the charity.",
      image: themeImage(reportImageLight, reportImageDark),
    },
  ],
  outcomeFigure: {
    image: themeImage(demoImageLight, demoImageDark),
    title: "Demo homepage",
    body: "Five demo sites for different types of donation collection by partnership",
  },
  insights: [
    {
      label: "Insight one",
      image: ClariteamImage,
      title: "Product clarity for team alignment",
      body: "The earlier teams failed because there was no shared understanding of the product, not for lack of effort.",
    },
    {
      label: "Insight two",
      image: ThinkpencilImage,
      title: "Design is thinking made visual",
      body: "Diagrams and designs turned abstract explanations into artefacts the team could see, challenge, improve, and execute.",
    },
    {
      label: "Insight three",
      image: VitruvianImage,
      title: "Cross-functional fluency mitigates risks",
      body: "Working across product, design, and engineering helped me spot gaps early before they became costly mistakes.",
    },
  ],
};
