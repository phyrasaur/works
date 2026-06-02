import moneyFlowsImage from "@/images/donaid/before-after-tracking.png";
import userJourneyImage from "@/images/donaid/user-story-journey.png";
import bankingImage from "@/images/donaid/banking.jpg";
import whatsappImage from "@/images/donaid/whatsapp.jpg";
import statusImage from "@/images/donaid/status.jpg";
import sitemapImage from "@/images/donaid/sitemap.jpg";
import wireframeSketchImage from "@/images/donaid/wireframe-sketch.png";
import blueprintImage from "@/images/donaid/blueprint.png";
import demoImage from "@/images/donaid/demo.png";
import receiptImage from "@/images/donaid/receipt.png";
import trackingImage from "@/images/donaid/tracking.png";
import reportImage from "@/images/donaid/report.png";
import clariteamImage from "@/images/donaid/clariteam.svg";
import thinkpencilImage from "@/images/donaid/thinkpencil.svg";
import vitruvianImage from "@/images/donaid/vitruvian.svg";
import type { DonaidData } from "@/types/donaid";

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
      image: moneyFlowsImage,
      title: "Money versus data flows",
      body: "To emphasise that DonAid doesn't collect money, I mapped out the money and reporting flows",
      className: "wide",
    },
    {
      image: userJourneyImage,
      title: "Comparing donor journeys",
      body: "I compared a typical user journey with the proposed donation tracking from the donor's perspective to clarify how donation tracking works",
      className: "span-two",
    },
  ],
  feasibilityFigures: [
    {
      image: bankingImage,
      title: "Surveying available banking data",
      body: "CSV bank statements are easier to sanitise than PDFs, and cut dev effort if we build our own ingestion",
    },
    {
      image: whatsappImage,
      title: "Messaging services",
      body: "We decided to use WhatsApp API directly, no middleware markup, lower cost per transaction",
    },
  ],
  processFigures: [
    {
      image: statusImage,
      title: "Simplifying donation status: Demo vs MVP",
      body: "Edge cases were scoped out of Demo and MVP, pushed to later phases.",
    },
    {
      image: sitemapImage,
      title: "Information architecture",
      body: "Sitemap covering the product and marketing pages, prioritised by stakeholder's needs.",
    },
  ],
  interfaceFigure: {
    image: wireframeSketchImage,
    title: "Sketching wireframes",
    body: "Throughout my product workshops with the founder, I sketched wireframes and flow diagrams ad-hoc to build shared understanding. The high-fidelity design was later reviewed and approved in Figma before I handed over code as React TypeScript components, styled with Tailwind CSS, to the dev team.",
  },
  blueprintFigure: {
    image: blueprintImage,
    title: "Service blueprint",
    body: "Aligning teams and stakeholders for what DonAid is",
  },
  features: [
    {
      label: "Feature one",
      title: "Donation tagging",
      body: "Upon a successful donation transaction with the campaign partner, the POS then requests a unique tag for the donation to be printed as a QR code in the receipt which allows the donor to track the progress of the donation",
      image: receiptImage,
    },
    {
      label: "Feature two",
      title: "Public tracking",
      body: "Akin to parcel tracking, the donation progress is laid out in a timeline. A summary of the current status at the top provides a general overview of the donation. The tracker can get a notification on WhatsApp for the progress of the donation",
      image: trackingImage,
    },
    {
      label: "Feature three",
      title: "Reporting",
      body: "Each step generates a unique report. Donation transactions are batched into an acknowledgement report, compiled into a remittance report for the campaign partner, then closed with a settlement advice once the trustee releases funds to the charity.",
      image: reportImage,
    },
  ],
  outcomeFigure: {
    image: demoImage,
    title: "Demo homepage",
    body: "Five demo sites for different types of donation collection by partnership",
  },
  insights: [
    {
      label: "Insight one",
      image: clariteamImage,
      title: "Product clarity for team alignment",
      body: "The earlier teams failed because there was no shared understanding of the product, not for lack of effort.",
    },
    {
      label: "Insight two",
      image: thinkpencilImage,
      title: "Design is thinking made visual",
      body: "Diagrams and designs turned abstract explanations into artefacts the team could see, challenge, improve, and execute.",
    },
    {
      label: "Insight three",
      image: vitruvianImage,
      title: "Cross-functional fluency mitigates risks",
      body: "Working across product, design, and engineering helped me spot gaps early before they became costly mistakes.",
    },
  ],
};
