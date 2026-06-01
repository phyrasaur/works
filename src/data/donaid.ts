import journeyImage from "@/images/donaid/journey.jpg";
import flowsImage from "@/images/donaid/flows.jpg";
import bankingImage from "@/images/donaid/banking.jpg";
import manualProcessImage from "@/images/donaid/manual-process.jpg";
import schemaImage from "@/images/donaid/schema.jpg";
import donorFlowImage from "@/images/donaid/donor-flow.jpg";
import wireframesImage from "@/images/donaid/wireframes.jpg";
import blueprintImage from "@/images/donaid/blueprint.jpg";
import outcomeImage from "@/images/donaid/outcome.jpg";
import taggingImage from "@/images/donaid/tagging.jpg";
import trackingImage from "@/images/donaid/tracking.jpg";
import reportingImage from "@/images/donaid/reporting.jpg";
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
      image: journeyImage,
      title: "Comparing donor journeys",
      body: "I compared a typical user journey with the proposed donation tracking from the donor's perspective to clarify how donation tracking works.",
      className: "wide",
    },
    {
      image: flowsImage,
      title: "Money versus data flows",
      body: "To emphasise that DonAid does not collect money, I mapped out the money and reporting flows.",
      className: "span-two",
    },
  ],
  feasibilityFigures: [
    {
      image: bankingImage,
      title: "Automated banking data",
      body: "CSR bank statements were explored for automatic transaction retrieval.",
    },
    {
      image: manualProcessImage,
      title: "Messaging providers",
      body: "I surveyed providers that could notify donors through WhatsApp after each donation status change.",
    },
  ],
  processFigures: [
    {
      image: schemaImage,
      title: "Data modelling",
      body: "Entity relationships were mapped to translate accounting, donation, trustee, and reporting logic.",
      className: "span-two",
    },
    {
      image: donorFlowImage,
      title: "Donor flow",
      body: "I mapped the steps from donation receipt to public tracking to test if the concept held together.",
    },
  ],
  interfaceFigure: {
    image: wireframesImage,
    title: "Sketching wireframes",
    body: "Wireframes helped translate the product logic into screens the team could estimate, build, and critique.",
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
      body: "Upon a successful donation transaction with the campaign partner, the POS requests a unique tag for the donation to be printed as a QR code in the receipt.",
      image: taggingImage,
    },
    {
      label: "Feature two",
      title: "Public tracking",
      body: "Akin to parcel tracking, donation progress is laid out in a timeline. The tracker can get a WhatsApp notification as the donation moves.",
      image: trackingImage,
    },
    {
      label: "Feature three",
      title: "Reporting",
      body: "Each step generates a unique report, from transaction acknowledgement to remittance report and final settlement advice.",
      image: reportingImage,
    },
  ],
  outcomeFigure: {
    image: outcomeImage,
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
