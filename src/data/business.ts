export type LaunchStatus = "prelaunch" | "announced" | "open";
export type BusinessFacts = Readonly<{
  city: string;
  state: string;
  launchStatus: LaunchStatus;
  /** Approved local calendar date, YYYY-MM-DD; never a guessed timestamp. */
  openingDate: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  affiliation:
    | Readonly<{ status: "unconfirmed"; statement: null }>
    | Readonly<{ status: "confirmed"; statement: string }>;
}>;

export function defineBusinessFacts(facts: BusinessFacts): BusinessFacts {
  if (!["prelaunch", "announced", "open"].includes(facts.launchStatus))
    throw new Error("Unknown launch status");
  for (const key of ["city", "state"] as const)
    if (!facts[key].trim()) throw new Error(`${key} must not be empty`);
  for (const key of ["address", "phone", "email", "hours"] as const)
    if (facts[key] !== null && !facts[key].trim())
      throw new Error(`${key} must be confirmed text or null`);
  if (facts.openingDate !== null) {
    const date = new Date(`${facts.openingDate}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(facts.openingDate) ||
      Number.isNaN(date.valueOf()) ||
      date.toISOString().slice(0, 10) !== facts.openingDate
    )
      throw new Error(
        "openingDate must be a real YYYY-MM-DD calendar date or null",
      );
  }
  if (!["unconfirmed", "confirmed"].includes(facts.affiliation.status))
    throw new Error("Unknown affiliation publication status");
  if (
    facts.affiliation.status === "unconfirmed" &&
    facts.affiliation.statement !== null
  )
    throw new Error(
      "Unconfirmed affiliation cannot publish a relationship statement",
    );
  if (
    facts.affiliation.status === "confirmed" &&
    !facts.affiliation.statement?.trim()
  )
    throw new Error(
      "Confirmed affiliation requires an owner-approved statement",
    );
  return Object.freeze({
    ...facts,
    affiliation: Object.freeze({ ...facts.affiliation }),
  });
}

// Publication authority: approved business facts only. Null means unknown, not unavailable.
// Affiliation is unconfirmed for publication; this does not assert that companies are unrelated.
export const businessFacts = defineBusinessFacts({
  city: "Madurai",
  state: "Tamil Nadu",
  launchStatus: "prelaunch",
  openingDate: null,
  address: null,
  phone: null,
  email: null,
  hours: null,
  affiliation: { status: "unconfirmed", statement: null },
});
