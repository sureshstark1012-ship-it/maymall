// Test-only fictional values; application code must never import this file.
import { businessFacts, defineBusinessFacts } from "../src/data/business";
export const announcedBusiness = defineBusinessFacts({
  ...businessFacts,
  launchStatus: "announced",
  openingDate: "2030-10-10",
  address:
    "123 Example Road, Fictional Textile District, Example City — TEST ONLY",
});
export const openBusiness = defineBusinessFacts({
  ...announcedBusiness,
  launchStatus: "open",
  address:
    "123 Example Road, Fictional Textile District, Building Example, Floor Example, Example City, Reserved Test Region — THIS IS TEST DATA ONLY",
  phone: "+91 00000 00000",
  email: "visit@example.invalid",
  hours:
    "Example weekdays: 09:00–21:00; example weekends: 10:00–22:00. Fictional holiday hours may differ — test-only long opening-hours notice.",
});
