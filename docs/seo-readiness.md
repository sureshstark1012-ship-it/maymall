# SEO and indexing readiness

The public route set remains exactly seven editorial destinations. Nothing models products, offers, reviews or inventory.

## Titles and descriptions

| Route                      | Title                                        | Description                                                                                                                                                                 |
| -------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                        | MayMall Madurai — A new chapter in tradition | MayMall is coming to Madurai. Discover a vision of silk sarees, wedding wardrobes and family fashion rooted in Tamil tradition.                                             |
| `/collections`             | Collections \| MayMall Madurai               | Explore MayMall’s three editorial collection themes: silk heritage, celebration dressing and everyday family fashion. These are previews of the MayMall vision.             |
| `/collections/silk`        | The silk edit \| MayMall Madurai             | Explore MayMall’s Silk Edit: an editorial direction inspired by colour, drape and Tamil textile heritage. Collection themes are previews, not confirmed products.           |
| `/collections/celebration` | The celebration edit \| MayMall Madurai      | The Celebration Edit explores MayMall’s future-looking vision for wedding wardrobes, festive colour and family gatherings. No product range has been announced.             |
| `/collections/everyday`    | The everyday edit \| MayMall Madurai         | MayMall’s Everyday Edit is a vision of expressive, comfortable family fashion across generations. Explore the editorial inspiration ahead of confirmed store details.       |
| `/our-story`               | Our Story \| MayMall Madurai                 | The MayMall vision draws inspiration from Madurai, Tamil textile traditions and family celebrations. An official Chennai Silks affiliation has not been announced.          |
| `/visit`                   | Visit \| MayMall Madurai                     | MayMall is coming soon to Madurai, Tamil Nadu. The opening date and exact address have not been announced. Find current launch information and answers to common questions. |

Existing copy is retained. Titles have one brand suffix; Open Graph and Twitter titles/descriptions match each route. 404 has a unique title/description, restrictive robots, no canonical and useful Home/Collections continuations. Next may add its automatic noindex tag alongside the explicit noindex/nofollow metadata; tests verify every robots tag remains restrictive.

## Origin and indexing configuration

`src/lib/site-config.ts` validates two server/build variables with no validation dependency. `SITE_URL` must be an HTTP(S) origin without credentials, path, query or fragment. `SITE_INDEXABLE` is unset/empty/false by default; only the exact `true` enables indexing. Other spellings fail clearly. Indexing requires an HTTPS origin. Syntax checks cannot verify domain ownership: the owner must provide and approve the real public origin.

| Build configuration                        | Canonical / sharing URLs                        | Robots                                                                 | Sitemap                          |
| ------------------------------------------ | ----------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| Origin absent, indexing false              | Omitted; no invented or localhost social URL    | Disallow `/`; meta noindex/follow                                      | Valid empty XML, no destinations |
| Approved origin configured, indexing false | Derived from that origin                        | Disallow `/`; no sitemap advertisement                                 | Valid empty XML                  |
| Approved HTTPS origin, indexing true       | Exact origin + each public path, including home | Allow `/` including framework assets; advertise the configured sitemap | Exactly seven public URLs        |
| Indexing true without HTTPS origin         | Build/startup validation failure                | No unsafe output                                                       | No unsafe output                 |

`robots.ts` and `sitemap.ts` follow App Router metadata conventions and are statically generated. Sitemap has no arbitrary priorities, frequencies or fake modification dates. It excludes 404, internals, API paths, queries, imaginary products and legal pages. The explicit public-route list lives in `data/routes.ts`.

Robots disallow controls crawling; meta noindex expresses indexing intent. Neither is access control for private previews. Keep deployment previews on separate hosts and use hosting access controls when privacy is needed.

## Social sharing

One generic 1200×630 PNG is generated from the existing approved visual language, with MayMall/Madurai and illustrative textiles. It introduces no dates, contacts, partners or product claims. See [media guidelines](media-guidelines.md) for source and regeneration. Metadata emits absolute image URLs, PNG MIME/dimensions/alt and `summary_large_image` only when SITE_URL exists. Unconfigured previews emit neither image URLs nor canonicals. This deliberately avoids Next's localhost fallback for origin-dependent image metadata. Route titles/descriptions still distinguish the shared card's destinations.

The favicon remains the current plum/gold scalable ornament. Its small-size silhouette/contrast were reviewed; no unnecessary manifest/PWA or additional icon family was added.

## Indexing launch checklist

Before setting `SITE_INDEXABLE=true`, verify the owner-approved domain resolves and serves HTTPS, HTTP/alternate-host redirects are correct, all seven destinations return 200, unknown pages return 404/noindex, canonicals and sharing URLs reference the approved origin, robots allows public/framework assets, sitemap contains exactly seven URLs, and the social PNG renders in sharing previews. Complete accessibility/device review and confirm cautious launch/address/affiliation copy. Rebuild/redeploy after changing configuration; this is build-time metadata.

No domain is guessed. `https://deployment.example` appears only in isolated test scenarios and is a reserved fixture, never a deployment recommendation. Tests restore an unconfigured noindex build afterward; create the final deployment build with real approved settings.

## Structured data and deferred facts

Product/Offer/Review/LocalBusiness schema is inappropriate without real business data. BreadcrumbList remains deferred until the verified public origin and owner-approved structured-data decision exist. No JSON-LD, hidden SEO copy, social handles, policies or invented company facts were added.
