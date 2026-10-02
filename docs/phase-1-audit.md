# Phase 1 audit and decisions

## Audited prototype

The repository initially contained `index.html`, `src/main.js`, one compressed `src/style.css`, `public/silk.svg`, Vite package files, README and `.gitignore`. No existing tests, agent instructions, routes, backend, external scripts, fonts or raster assets were present. The Git working directory was clean.

The page contains an announcement, header/navigation, hero, heritage ribbon, brand story, collections, wedding edit, brand values, visit/launch section, four FAQs and footer. Copy includes cautious Chennai Silks inspiration/affiliation wording and unknown opening/address information. All copy is retained.

Interactions were anchor navigation, mobile menu toggling, Escape dismissal with trigger focus restoration, three collection filters using pressed states, native details toggling, smooth scrolling and a client-inserted current year. The mobile menu originally closed after link selection but did not transfer focus to the destination. Filtering originally hid unmatched cards via DOM queries.

Accessibility foundations included semantic header/main/footer, one h1, h2/h3 section headings, image alternatives, English document and Tamil phrase languages, visible keyboard focus, aria-expanded/controls/pressed and reduced-motion support. The brand-values section originally skipped from an eyebrow paragraph to h3; its visually unchanged eyebrow is now an h2. Decorative icons are hidden from assistive technology.

Responsive rules used 700px for one-column layouts/mobile navigation, 1000px for intermediate sizing, and 1600px for collection width. Screenshots and section geometry were captured before migration at 375, 768, 1024 and 1440px outside the repository for comparison. Original serif/system fonts, artwork, layout proportions and CSS breakpoints are retained.

The silk SVG is local, scalable artwork composed of gradients, patterns and a grain filter, with no external references or active content. It is moved intact to `public/images/silk.svg`. Repeated inline floral and arrow markup becomes reusable decorative icon components.

## Migration decisions

Next.js App Router uses static Server Components by default. The mobile disclosure and collection filters are the only client islands; cards and navigation links are composed server-side. FAQs remain native details elements. A skip link, named sections, keyboard focus destinations, filter result announcements and no-JavaScript mobile navigation improve access without changing the normal visual design.

CSS Modules preserve component styling, while globals contain tokens/reset/shared typography. The Container primitive replaces duplicated widths and horizontal padding. No Tailwind, generic UI kit, icon package, database, authentication or commerce is added. Static copy appearing once stays with its semantic section; navigation, collection records and FAQs have shared types and data files.

Metadata defaults to noindex for previews. A verified domain must be configured using SITE_URL; no fabricated production URL, social account or company details are introduced. The homepage regenerates daily, keeping the server-rendered year current without a new client island.

Playwright is the only testing framework: actual browser interactions cover disclosure/focus, filters, native FAQs, responsive widths, reduced motion, metadata and no-JavaScript behavior. Screenshot and section-geometry comparisons are migration evidence, not brittle permanent snapshot tests.
