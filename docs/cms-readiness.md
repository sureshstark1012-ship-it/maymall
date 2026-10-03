# CMS readiness

## Current recommendation

**Continue code-managed content for now.** Seven editorial routes, three collection themes and occasional business updates do not establish a nontechnical publishing team, scheduling requirement or catalog workload. No CMS vendor, integration, empty adapter or external content ingestion is justified today.

The future boundary is the existing typed data: business facts, collection records, FAQ strings and media descriptors. Page-local React owns intentional composition. A future source can supply validated plain structured values without replacing layouts with arbitrary HTML or generic block rendering. Source validation and business approval are separate requirements.

## Requirements to establish before adoption

| Requirement               | Decision/evidence needed                                                                |
| ------------------------- | --------------------------------------------------------------------------------------- |
| Editors and roles         | Named nondeveloper editors, approvers and least-privilege responsibilities              |
| Draft/publish and preview | Authenticated preview isolation, noindex/access protection, approval and rollback       |
| Scheduling                | Frequency, timezone, cancellation and launch-date ownership                             |
| Media                     | Rights/credits, crops/alt, derivatives, retention and approval history                  |
| Structured content        | Mapping to existing business/editorial types and null/validation rules                  |
| Localization              | Approved languages, translation ownership and locale metadata/routes                    |
| Webhooks/freshness        | Signed requests, retries, selective revalidation and CDN invalidation                   |
| Catalog scale             | Whether an approved ERP/PIM/commerce system owns stock/prices rather than a CMS         |
| Audit history             | Who changed/approved/published a fact and rollback requirements                         |
| API reliability           | Latency, availability, quotas, build failure behavior and verified stale-content policy |

Frequent campaigns, nondeveloper editing, multiple locations, scheduled publishing, full localization or a large approved catalog can trigger evaluation. Compare these requirements and operational cost before choosing a hosted headless, self-managed structured or commerce-oriented content system. No category or vendor is selected now.

Until then, builds are static and changes become public through reviewed rebuild/redeploy. If CMS publishing later requires webhooks/revalidation, specify authentication, preview separation, cache keys and invalidation first; do not retain outdated address/hours indefinitely. No runtime dependency or placeholder provider is needed for readiness.
