import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup, renderToReadableStream } from "react-dom/server";
import {
  businessFacts,
  defineBusinessFacts,
  type BusinessFacts,
} from "../src/data/business";
import {
  affiliationClarification,
  businessFactRows,
  launchLabel,
  openingDateLabel,
  visitDescription,
} from "../src/lib/business-presentation";
import { BusinessFactsList } from "../src/components/business/BusinessFactsList";
import { MediaImage } from "../src/components/ui/MediaImage/MediaImage";
import { createFAQItems } from "../src/data/faq";
import { editorialMedia } from "../src/data/media";
import { announcedBusiness, openBusiness } from "./fixtures-business";

test("published facts are prelaunch with explicit unknowns and no confirmed affiliation", () => {
  assert.equal(businessFacts.launchStatus, "prelaunch");
  assert.ok(Object.isFrozen(businessFacts));
  assert.ok(Object.isFrozen(businessFacts.affiliation));
  for (const key of [
    "openingDate",
    "address",
    "phone",
    "email",
    "hours",
  ] as const)
    assert.equal(businessFacts[key], null);
  assert.equal(businessFacts.affiliation.status, "unconfirmed");
  assert.equal(
    businessFactRows(businessFacts).filter(
      (row) => row.value === "Not yet announced",
    ).length,
    2,
  );
  const html = renderToStaticMarkup(
    createElement(BusinessFactsList, { facts: businessFacts }),
  );
  assert.doesNotMatch(
    html,
    /<time|tel:|mailto:|streetAddress|application\/ld\+json|example\.invalid/,
  );
  assert.equal(
    affiliationClarification(businessFacts),
    "An official affiliation has not been announced.",
  );
});
test("confirmed test fixtures flow through the actual server facts component", () => {
  assert.equal(launchLabel(announcedBusiness), "Opening announced");
  assert.equal(launchLabel(openBusiness), "Now open");
  assert.equal(openingDateLabel(announcedBusiness), "10 October 2030");
  for (const facts of [announcedBusiness, openBusiness]) {
    const html = renderToStaticMarkup(
      createElement(BusinessFactsList, { facts }),
    );
    assert.ok(html.includes(facts.address!));
    assert.match(html, /<time dateTime="2030-10-10">10 October 2030<\/time>/);
    assert.doesNotMatch(html, /Not yet announced/);
  }
  const openHtml = renderToStaticMarkup(
    createElement(BusinessFactsList, { facts: openBusiness }),
  );
  assert.ok(openHtml.includes(openBusiness.phone!));
  assert.ok(openHtml.includes(openBusiness.email!));
  assert.ok(openHtml.includes(openBusiness.hours!));
  assert.match(visitDescription(openBusiness), /is open in Madurai/);
  assert.doesNotMatch(
    visitDescription(openBusiness),
    /have not been announced/,
  );
});
test("FAQ answers derive from the same confirmed or unknown facts", () => {
  assert.match(createFAQItems(businessFacts)[0].answer, /once confirmed/);
  assert.match(createFAQItems(announcedBusiness)[0].answer, /10 October 2030/);
  assert.match(createFAQItems(openBusiness)[0].answer, /now open/);
  assert.equal(createFAQItems(openBusiness)[1].answer, openBusiness.address);
  assert.match(
    createFAQItems(businessFacts)[3].answer,
    /official affiliation has not been announced/,
  );
  const statement =
    "An owner-approved fictional relationship statement for tests only.";
  const confirmed = defineBusinessFacts({
    ...businessFacts,
    affiliation: { status: "confirmed", statement },
  });
  assert.equal(affiliationClarification(confirmed), statement);
});
test("invalid dates, empty facts and contradictory affiliation publication fail clearly", () => {
  for (const openingDate of [
    "Coming soon",
    "2030-02-30",
    "2030-01-01T12:00:00Z",
  ])
    assert.throws(
      () => defineBusinessFacts({ ...businessFacts, openingDate }),
      /calendar date/,
    );
  assert.throws(
    () => defineBusinessFacts({ ...businessFacts, address: " " }),
    /confirmed text or null/,
  );
  assert.throws(
    () =>
      defineBusinessFacts({
        ...businessFacts,
        launchStatus: "invalid",
      } as unknown as BusinessFacts),
    /launch status/,
  );
  assert.throws(
    () =>
      defineBusinessFacts({
        ...businessFacts,
        affiliation: { status: "confirmed", statement: "" },
      }),
    /approved statement/,
  );
  assert.throws(
    () =>
      defineBusinessFacts({
        ...businessFacts,
        affiliation: { status: "unconfirmed", statement: "Invented claim" },
      } as unknown as BusinessFacts),
    /Unconfirmed affiliation/,
  );
});
test("business text is escaped by React, never interpreted as HTML", () => {
  const facts = defineBusinessFacts({
    ...businessFacts,
    address: '<script>alert("test")</script>',
  });
  const html = renderToStaticMarkup(
    createElement(BusinessFactsList, { facts }),
  );
  assert.ok(html.includes("&lt;script&gt;"));
  assert.doesNotMatch(html, /<script/);
});
test("illustrative markup remains direct SVG; approved raster slot uses responsive Next image", async () => {
  const illustration = renderToStaticMarkup(
    createElement(MediaImage, { media: editorialMedia.silk, sizes: "50vw" }),
  );
  assert.match(illustration, /src="\/images\/silk.svg"/);
  assert.doesNotMatch(illustration, /srcSet|_next\/image/);
  const photoStream = await renderToReadableStream(
    createElement(MediaImage, {
      media: {
        kind: "photography",
        src: "/images/collections/test-only-photo.jpg",
        alt: "Fictional test-only approved image slot",
        width: 1200,
        height: 1500,
      },
      sizes: "(max-width: 600px) 100vw, 50vw",
    }),
  );
  await photoStream.allReady;
  const photo = await new Response(photoStream).text();
  assert.match(photo, /srcSet=/);
  assert.match(photo, /_next\/image/);
  assert.doesNotMatch(photo, /Illustrative textile study/);
});
