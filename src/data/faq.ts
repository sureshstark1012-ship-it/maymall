import { businessFacts, type BusinessFacts } from "@/data/business";
import {
  openingDateLabel,
  affiliationClarification,
} from "@/lib/business-presentation";
import type { FAQItem } from "@/types/content";
export function createFAQItems(facts: BusinessFacts) {
  return [
    {
      question:
        facts.launchStatus === "open"
          ? "Is MayMall open?"
          : "When will MayMall open?",
      answer:
        facts.launchStatus === "open"
          ? "MayMall is now open. See the confirmed visit information on this page."
          : facts.openingDate !== null
            ? `The announced opening date is ${openingDateLabel(facts)}.`
            : "The opening date will be announced here once confirmed. Watch this space for our next update.",
      initiallyOpen: true,
    },
    {
      question: `Where in ${facts.city} will it be?`,
      answer:
        facts.address ??
        (facts.launchStatus === "open"
          ? "The exact address and directions will be shared once confirmed."
          : "The exact address and directions will be shared ahead of the opening."),
    },
    {
      question: "What can I look forward to?",
      answer:
        facts.launchStatus === "open"
          ? "Our vision centres on silk sarees, wedding and festive wear, and fashion for the family. Confirmed store and collection details will be shared once approved."
          : "Our vision centres on silk sarees, wedding and festive wear, and fashion for the family. Confirmed stores and collections will be announced closer to launch.",
    },
    {
      question: "Is this an official Chennai Silks website?",
      answer: `This is the MayMall website. Its current content draws inspiration from Chennai Silks and Tamil textile traditions. ${affiliationClarification(facts)}`,
    },
  ] satisfies readonly FAQItem[];
}
export const faqItems = createFAQItems(businessFacts);
