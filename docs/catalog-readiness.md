# Catalog readiness and commerce boundary

Current collection records are **editorial themes**, not categories containing real products, SKUs, stock or prices. No product types, mock inventory, PDP, cart, checkout, payments or accounts are introduced.

Future progression, only after approval: editorial collection → category discovery → verified product records → product detail → separately scoped cart/checkout. Each stage needs its own requirements; content readiness does not authorize commerce implementation.

## Required verified source data

Before catalog implementation, the business must identify its authoritative ERP, PIM, commerce, inventory or appropriately governed content system. Do not select a provider now or hand-write pretend production product data.

Agree on stable identifiers and category taxonomy; approved name/description/brand claims; licensed images and alt/crop data; currency and tax/price rules; availability source and freshness; variants, sizes/colours and identifier mapping. Distinguish unknown, unavailable, discontinued and unpublished records. Define which source owns each field, update frequency, review authority and conflict handling. Promotions require approved terms/dates and must not silently override authoritative prices.

## Operational boundary

Specify API credentials on the server, access control, data validation, retries/availability, reconciliation and cache invalidation before integration. No private keys belong in client bundles. Establish media rights, product/claim verification, privacy/legal requirements and accessibility before release. Only sufficiently verified records may support Product/Offer structured data.

Search is deferred: three editorial collection pages do not warrant a search package or search service. Evaluate search when approved catalog/content volume creates a real discovery problem, with agreed taxonomy, filters, language requirements and availability expectations. No empty catalog adapter or search infrastructure is created now.
