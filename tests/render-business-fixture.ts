// Isolated Node/tsx renderer: Playwright's JSX transformer produces selector objects, not React elements.
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BusinessFactsList } from "../src/components/business/BusinessFactsList";
import { openBusiness } from "./fixtures-business";
process.stdout.write(
  renderToStaticMarkup(
    createElement(BusinessFactsList, {
      facts: openBusiness,
      className: process.argv[2],
    }),
  ),
);
