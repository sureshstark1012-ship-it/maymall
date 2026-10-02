# Phase 3 — Site architecture and editorial collections

## Audit and boundaries

Audited the App Router layout, homepage sections, typed data, CSS Modules/tokens, vendored fonts, SVG assets, metadata, security headers, native FAQ, client disclosures/filters, Playwright and production CI before changing source. Reviewed the Phase 2 homepage at 375, 768, 1024 and 1440px. The existing Container, BrandValues, FAQ, collection previews, typography and decorative primitives were reusable. Work starts from Phase 2 commit `8ae3400cd70103da2746ab9dca9bcc9239e6c8a4` on `feat/phase-3-site-architecture`.

The palette, font families, assets and homepage visual system remain. No products, prices, inventory, affiliations, company history, addresses, launch dates or contact details have been invented. No commerce, CMS, authentication or backend has been introduced.

## Routes and rendering

| Route                      | Role and composition                                                             |
| -------------------------- | -------------------------------------------------------------------------------- |
| `/`                        | Existing brand gateway; previews and CTAs now lead to real pages.                |
| `/collections`             | Alternating editorial artwork/copy spreads introduce the three edits.            |
| `/collections/silk`        | Asymmetric textile masthead, parchment statement and detailed textile themes.    |
| `/collections/celebration` | Dark ceremonial opening, invitation-inspired spread and occasion moments.        |
| `/collections/everyday`    | Lighter typographic opening, broad textile study and relaxed thematic columns.   |
| `/our-story`               | Long-form Madurai/family vision, illustrative sidebar and existing brand values. |
| `/visit`                   | Confirmed city/status, explicit unknown opening date/address and native FAQ.     |
| Unknown routes             | Branded HTTP 404 with Home and Collections continuations.                        |

Three explicit collection route folders are clearer than `[slug]` for three deliberately different compositions. There is no runtime template switch or artificial CMS layer. Unknown collection slugs use the root not-found handler. All seven pages and `/_not-found` are marked `○` (static) by `next build`; no cookies, runtime fetching, ISR, artificial loading states or error boundaries were needed. The copyright year remains build-time data.

## Content and reuse

`CollectionSlug` is the stable union `silk | celebration | everyday`. `collectionBySlug` is checked against `Record<CollectionSlug, Collection>` and supplies the ordered homepage/landing preview list. Shared fields cover numbering, category, title, description, introduction, statement, typed SVG artwork/dimensions/alt text, thematic details and metadata description. Each field is consumed by the UI. One-off story/visit copy remains in its page rather than a generic page-data engine.

New shared server primitives in `components/editorial` are PageMasthead, Breadcrumbs, EditorialArtwork, EditorialDetails, CollectionNavigation and PageClosing. Each serves multiple routes. Page-local CSS Modules own the differing compositions. Existing Container, CollectionCard, BrandValues, FAQ, CtaLink and decorative icons are reused. Related edits use two simple destination previews, not a carousel or recommendation interface.

Homepage filters stay: they are useful for browsing heritage/family previews, preserve working `aria-pressed`/live-status behavior, and now lead to genuine collection routes. Preview hover/focus effects belong to real links. SVGs remain lightweight original illustrations with reserved dimensions, meaningful alt text and visible illustrative captions. Only above-fold detail art receives high priority; other artwork loads lazily. No fonts, asset packages or dependencies were added.

## Navigation and accessibility

Global navigation is Our Story, Collections, Celebration Edit and Visit. Header/footer/brand/CTAs use Next Link for routes. Skip and back-to-top remain native page anchors. Collection detail breadcrumbs are semantic labelled navigation with Home, Collections and a current-page label.

ActiveNavigationLink is a small client boundary around server-rendered link contents. Exact destinations have `aria-current="page"`; Collections has `aria-current="location"` for Silk/Everyday. The exact Celebration link takes precedence so navigation does not claim two current destinations. The style is an understated rule, not tab chrome.

The root layout owns one main landmark/skip destination across all routes. Each page has one h1. Ordinary route focus uses App Router behavior. Mobile navigation remains a non-modal disclosure with keyboard operation, Escape-to-close and trigger focus restoration, accurate `aria-controls`/`aria-expanded`, desktop-breakpoint reset and close-on-selection. A pathname-keyed disclosure resets stale state on history/route changes. Native details/summary FAQ remains keyboard accessible on Visit. No-JavaScript navigation and all collection previews remain usable. Reduced-motion handling and Tamil language annotations are preserved. Visible interactive targets were checked at a minimum 44px height.

## SEO and security

Each route exports its own title, description, Open Graph and Twitter metadata through the existing server metadata helper. The root title template, application name, locale and default preview `noindex, follow` remain. A verified `SITE_URL` origin enables route-specific canonicals and Open Graph URLs; absent configuration emits neither. Invalid protocols, embedded credentials and path/query/fragment values are rejected. `SITE_INDEXABLE=true` is reserved for approved production builds. No invented domain, social account or social image is emitted.

Structured data is deferred until the verified public origin and business facts exist. No Product/Offer/Review/LocalBusiness schema was introduced. Existing nosniff, referrer, permissions and DENY framing headers and `poweredByHeader: false` are unchanged. Editorial content is ordinary typed JSX, with no unsafe HTML or external scripts.

## Verification and artifacts

Required commands were executed locally using Node 24 and the locked dependency graph:

```sh
npm ci --cache /tmp/maymall-npm-cache
npm run format:check
npm run lint
npm run typecheck
npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Formatting, lint, strict TypeScript and production build pass. All **43 production Chromium tests pass**. Coverage includes all route titles/metadata/headings/skip links, keyboard desktop/mobile navigation, Escape/focus, back/forward disclosure reset, preview/landing/related collection links, gateway CTAs, unknown-route 404s, cautious affiliation copy, filters, native FAQ, no-JavaScript operation, security headers, artwork loading and reduced motion. All seven routes are checked for console errors, overflow and target heights at 375, 390, 430, 768, 900, 1024, 1280, 1440 and 1600px.

Seven attached production review screenshots are retained by CI for seven days in `site-review`: `homepage-375.png`, `homepage-1440.png`, `review-collections-375.png`, `review-collections-1440.png`, `review-silk-375.png`, `review-silk-1440.png`, `review-visit-1440.png`. Screenshot outputs remain ignored; there are no fragile pixel snapshot assertions. Additional local review captures cover every route at all nine widths, including full-page views at 375/900/1440px.

CI still runs locked installs, formatting, lint, typecheck, production build and Chromium tests on pushes to main and PRs targeting main. Only screenshot artifact naming/paths were expanded. Local results do not assert an unobserved remote CI run.

## Content gaps and future phases

The verified public domain, launch date, exact address/directions, hours, legal entity/affiliation, contact information, approved brand photography and actual store/product data remain unconfirmed. Visit intentionally makes date/address uncertainty explicit. Chennai Silks inspiration wording carries the no-announced-affiliation disclaimer both on the homepage and Our Story, with the existing FAQ explanation on Visit.

Phase 4 should prioritize approved content/photography, verified launch information, real-device and assistive-technology review, and field performance after a confirmed deployment. Deployment-specific CSP/HSTS and the previously documented ESLint 10 accessibility-plugin compatibility gap remain separate hardening work.

Stable collection URLs can later introduce genuine product discovery without changing editorial identity. Products, pricing and stock must come from an approved business source before commerce is modeled. The typed editorial record can map to a future CMS without coupling content to one universal layout; no CMS adapters or commerce infrastructure were built now.
