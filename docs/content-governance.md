# Content governance

## Ownership and sources

- **Business facts:** `src/data/business.ts` is authoritative for location labels, launch status, date, address, hours, contacts and affiliation publication status. Current facts are Madurai, Tamil Nadu and prelaunch; unknown values are `null`. Presentation sentences belong in `src/lib/business-presentation.ts`, not factual fields.
- **Editorial:** collection introductions/details/descriptions live in `src/data/collections.ts`. Storytelling, section headings, cultural prose and composition-specific copy stay in page/components. They describe a vision, not inventory. Do not centralize every sentence or turn the pages into generic CMS blocks.
- **FAQ:** `src/data/faq.ts` derives operational answers from business facts and retains plain-string editorial answers. Components own native disclosure markup.
- **Structure:** navigation and public routes remain typed records in `src/data/navigation.ts` and `routes.ts`; collection slugs are stable editorial URLs.
- **Media:** `src/data/media.ts` owns intrinsic dimensions, kind, default alt and caption for managed artwork plus the social-card descriptor. See [media guidelines](media-guidelines.md).

Business owner approval is required for opening date, full address, phone/email, hours, legal identity, affiliation/partnerships, brand inventory, materials/product claims, pricing and promotions. Record the approved source, approver and verification date in the content PR or attached business document. Never publish guessed values or test fixtures. Type validation proves shape, not truth or permission.

`affiliation.status: "unconfirmed"` means an official relationship is unconfirmed **for publication**, not that companies are unrelated. Its statement must be null. Confirmed publication requires an approved statement; a boolean alone must never synthesize a relationship claim. Existing inspiration and clarification remain together across Home, Story, FAQ and metadata.

## Launch states

`prelaunch` → Coming soon; `announced` → Opening announced; `open` → Now open. The owner updates the single typed status and independently confirmed facts. Calendar dates use YYYY-MM-DD and render without guessed timezones/timestamps. Unknown date/address render “Not yet announced”; unknown contacts/hours are omitted. Known fields display through the same semantic definition list.

Do not assume an open business has every historical fact available. No unapproved rule requires a date/address/contact solely because status changes. Validation rejects invalid states, impossible date formats, empty confirmed text and contradictory affiliation publication. Tests use fictional future records; no environment flag imports them into the application. Future maps/directions, store locator and legal identity need their own approved requirements; confirmed plain address text does not automatically add map links or schema.

## Publishing workflow

Business owner confirms → copy prepared → factual/source verification → content branch and implementation → PR/CI → nonindexable preview and visual/content/accessibility review → explicit approval → merge and deployment. Keep SITE_INDEXABLE=false during preview. This repository provides build/test instructions; a hosting preview platform has not been selected and no second deployment service is introduced.

Review all affected launch surfaces (announcement, Home, Visit, closing sections, FAQs, metadata), cautious claims and social artwork. Run the existing quality/production tests and review Visit mobile/desktop captures. Record any intentionally unchanged or deferred editorial copy. After deployment verify routes, canonicals, robots/sitemap, contact details and asset/cache freshness against the approved source. Code-managed changes rebuild/redeploy; no ISR or runtime business-data fetch exists.

## Structured data and localization

LocalBusiness schema remains deferred. Before selecting the appropriate schema type, verify official business/legal name, public origin, complete publishable address, contact information and applicable hours; review affiliation, maps and current launch state. Never treat placeholders, nulls or editorial collection themes as real business/product data.

Full Tamil/English localization is unapproved. When justified, decide locale routes and redirects, translated titles/descriptions/canonical/hreflang behavior, editorial ownership and review, Tamil font coverage and pronunciation, and an accessible language switch. Preserve the existing Tamil language annotation/font; do not add an i18n framework for a greeting.
