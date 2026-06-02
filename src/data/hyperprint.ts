import automatedDtpImage from "@/images/hyperprint/automated-dtp.png";
import checkoutModalImage from "@/images/hyperprint/checkout-modal.png";
import landingPageImage from "@/images/hyperprint/landing-page.png";
import orderDashboardImage from "@/images/hyperprint/order-dashboard.png";
import productCustomisationImage from "@/images/hyperprint/product-customisation.png";
import serviceBlueprintImage from "@/images/hyperprint/service-blueprint.png";
import standardisedFormsImage from "@/images/hyperprint/standardised-forms.png";
import vendorCostingImage from "@/images/hyperprint/vendor-costing.png";
import {
  clariteamImage,
  thinkpencilImage,
  vitruvianImage,
} from "@/data/insightImages";

export const hyperprint = {
  backgroundMeta: [
    {
      label: "Role",
      body: "Brand management, service design, operations",
    },
    {
      label: "Team",
      body: "3 Stakeholders, 3 Designers, 2 Operators, 1 Admin",
    },
  ],
  problemColumns: ["Brand promise", "Operational reality", "Gap"],
  problemRows: [
    {
      label: "Trustworthy",
      cells: [
        "Customers chasing updates through WhatsApp or phone calls, with little visibility into status, process, or accountability",
        "Inconsistent and vague communication erodes trust",
      ],
    },
    {
      label: "Quality",
      cells: [
        "Inconsistent colour, finishing, and material quality",
        "Varying quality due to lack of standardised processes",
      ],
    },
    {
      label: "Expert",
      cells: [
        "Different staff, different answers",
        "Service knowledge depends on whom customers speak to",
      ],
    },
    {
      label: "Efficient",
      cells: [
        "File issues, unclear briefs, and back-and-forth revisions create delays",
        "Manual coordination slows down turnaround",
      ],
    },
    {
      label: "Modern",
      cells: [
        "Orders are fragmented across walk-ins, WhatsApp, email, and calls",
        "Poor digital experience does not reflect forward thinking",
      ],
    },
  ],
  workshopFigures: [
    {
      image: standardisedFormsImage,
      title: "Standardised forms",
      body: "Frontline call flows, order checklists, and email templates made customer interactions more consistent",
      className: "media-card--workshop-lead",
    },
    {
      image: serviceBlueprintImage,
      title: "Service blueprint",
      body: "Mapped the business to identify friction points and standardise operations",
      className: "media-card--workshop-detail",
    },
  ],
  transformationFigures: [
    {
      image: vendorCostingImage,
      title: "Centralised vendor costing database",
      body: "with built-in calculations enabled quick comparisons, backup options, and stronger price negotiation",
    },
    {
      image: automatedDtpImage,
      title: "Automated DTP",
      body: "pre-press workflows, together with job barcode, improves the print production efficiency",
    },
  ],
  digitalServiceHero: {
    image: landingPageImage,
    title: "On-brand landing page",
    body: "The interface extends the experimental rebrand, using bright, playful colours derived from a shifted CMYK hue to keep the digital experience distinctly on-brand",
  },
  digitalServiceFigures: [
    {
      image: productCustomisationImage,
      title: "Product customisation",
      body: "breaks print customisation into common sections and then reveals advanced options progressively so the happy path stays simple. Current total is displayed all the time to aid customers for budgeting",
    },
    {
      image: checkoutModalImage,
      title: "Floating checkout modal",
      body: "sits on top of the customisation page, using a graphic backdrop to reduce noise and keep the user focused. It preserves the underlying scroll position and can be dismissed anytime to return to product customisation without losing context.",
    },
    {
      image: orderDashboardImage,
      title: "Order dashboard",
      body: "can be functional and fun to look at. Main information is laid out in a collapsible table with an option to drill down into the details",
    },
  ],
  insights: [
    {
      label: "Insight one",
      image: clariteamImage,
      title: "Brand strength in business operations",
      body: "Visual identity matters, but a brand promise is only materialised from a streamlined operation on the floor.",
    },
    {
      label: "Insight two",
      image: thinkpencilImage,
      title: "Service design goes beyond paper",
      body: "Journey maps and blueprints are useful exploratory artefacts, but practically, fixing day-to-day processes has a bigger impact than any diagram.",
    },
    {
      label: "Insight three",
      image: vitruvianImage,
      title: "Good design comes from life observation",
      body: "UI design is just the surface; the actual product was built directly from observing where customers got stuck and where staff had to repeat themselves.",
    },
  ],
};
