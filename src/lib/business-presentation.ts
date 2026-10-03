import type { BusinessFacts } from "../data/business";

export function launchLabel(facts: BusinessFacts): string {
  return {
    prelaunch: "Coming soon",
    announced: "Opening announced",
    open: "Now open",
  }[facts.launchStatus];
}
export function openingDateLabel(facts: BusinessFacts): string {
  return facts.openingDate === null
    ? "Not yet announced"
    : new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${facts.openingDate}T00:00:00Z`));
}
export function affiliationClarification(
  facts: BusinessFacts,
  named = false,
): string {
  return facts.affiliation.status === "confirmed"
    ? facts.affiliation.statement
    : `An official${named ? " Chennai Silks" : ""} affiliation has not been announced.`;
}
export function launchSummary(facts: BusinessFacts): string {
  const unknown = facts.openingDate === null && facts.address === null;
  return unknown
    ? "The opening date and exact address have not yet been announced. Find current launch information and answers to your questions."
    : "Find current launch information and confirmed visit details, with answers to your questions.";
}
export function visitDescription(facts: BusinessFacts): string {
  const status =
    facts.launchStatus === "open"
      ? "is open in"
      : facts.launchStatus === "announced"
        ? "has announced its opening in"
        : "is coming soon to";
  const unknown =
    facts.openingDate === null && facts.address === null
      ? " The opening date and exact address have not been announced."
      : "";
  return `MayMall ${status} ${facts.city}, ${facts.state}.${unknown} Find current launch information and answers to common questions.`;
}
export function businessFactRows(facts: BusinessFacts) {
  const rows = [
    {
      label: "Opening date",
      value: openingDateLabel(facts),
      dateTime: facts.openingDate,
    },
    {
      label: "Exact address",
      value: facts.address ?? "Not yet announced",
      dateTime: null,
    },
    {
      label: "Collection themes",
      value: "Editorial previews of our vision",
      dateTime: null,
    },
  ];
  const optional: readonly (readonly [string, string | null])[] = [
    ["Hours", facts.hours],
    ["Phone", facts.phone],
    ["Email", facts.email],
  ];
  for (const [label, value] of optional)
    if (value !== null) rows.push({ label, value, dateTime: null });
  return rows;
}
