# Performance baseline — Phase 4

These are reproducible laboratory observations, not field Core Web Vitals or a Lighthouse score. Run `npm test` to generate fresh JSON in `test-results/site`; CI publishes the `performance-review` artifact. The measurement code lives in `tests/support/performance.ts` and `tests/performance.spec.ts`, outside application bundles.

## Method and results

Production Next.js server on loopback, Chromium 153, Node 24, three cold browser contexts per route, 375×900 CSS pixels, cache disabled, 4× CPU slowdown, 150ms network latency, 1.6Mbps download / 750Kbps upload. The observation window includes network idle, font readiness and a short settling period. Trace recording is disabled for these measurements to avoid its I/O overhead; behavioral failure traces remain enabled.

Recorded local medians on 2026-10-02:

| Route       | LCP ms (range) | CLS   | Long-task blocking proxy ms | Total transfer bytes | Encoded JS bytes | Encoded font bytes | Encoded image bytes |
| ----------- | -------------- | ----- | --------------------------- | -------------------- | ---------------- | ------------------ | ------------------- |
| Home        | 892 (840–976)  | 0.005 | 162                         | 372875               | 138352           | 199904             | 1611                |
| Collections | 788 (744–852)  | 0.014 | 163                         | 321745               | 138352           | 149436             | 2261                |
| Silk        | 764 (740–856)  | 0     | 130                         | 320932               | 138352           | 149436             | 1611                |
| Visit       | 740 (728–792)  | 0.006 | 112                         | 320126               | 138352           | 149436             | 1611                |

Resource totals include automatic Next Link prefetch, headers and navigation transfer; the category columns report encoded response bodies. The long-task proxy sums the portions beyond 50ms of observed tasks. It is neither INP nor a formal Lighthouse TBT score. Shared host scheduling and browser versions affect results. CI timings are advisory and retain raw samples; no lab timing gates are used.

## LCP and loading audit

Before changes, all seven routes were sampled without throttling at 375px and 1440px. All recorded CLS values were zero in that baseline. Candidate elements differed with viewport:

| Route       | 375px candidate   | 1440px candidate        | Loading decision                                                       |
| ----------- | ----------------- | ----------------------- | ---------------------------------------------------------------------- |
| Home        | Silk illustration | Heading                 | Keep existing eager/high hero                                          |
| Collections | Intro paragraph   | Heading                 | Keep below-fold art lazy                                               |
| Silk        | Silk illustration | Intro paragraph         | Keep eager/high primary art                                            |
| Celebration | Intro paragraph   | Invitation illustration | Keep ordinary loading; no blanket priority                             |
| Everyday    | Intro paragraph   | Heading                 | Remove unnecessary high-priority image flag; use existing lazy default |
| Our story   | Section heading   | Heading                 | Keep editorial artwork lazy                                            |
| Visit       | Heading           | Heading                 | No image priority needed                                               |

These observations are viewport-dependent, not proof that an element is always LCP. The three existing lightweight SVG illustrations retain their source and intrinsic dimensions. No new raster photography or animation libraries were introduced. The social card is metadata-only and is not downloaded as a homepage image.

## Fonts and JavaScript

Four self-hosted variable WOFF2 files total 199904 bytes: Newsreader upright 58084, Newsreader italic 64520, Public Sans 26832 and Noto Sans Tamil 50468. The first three are preloaded through `next/font/local`; Tamil is not preloaded and loads when Tamil text is rendered. There are no external font services or additional weight files. Keep Tamil coverage and the current editorial identity; deleting those glyphs or replacing fonts would be a visual/content change.

The three existing client islands remain navigation state, active-link state and collection filtering. Static sections, native FAQ details and metadata stay server rendered. The measured encoded JavaScript is about 135KiB, including Next/React framework chunks; no new runtime dependencies were added.

## Restrained budgets

Enforced deterministic checks: all four font files together ≤220KiB, each original illustration ≤5KiB, social PNG ≤250KiB. These check committed source assets and fail `npm run test:config` on growth.

Advisory review thresholds for comparable mobile samples: encoded JavaScript ≤200KiB, initial observed transfer ≤600KiB, LCP ≤2.5s and CLS ≤0.1. Investigate regressions with repeated samples and raw resources before changing priorities. Future photography must be separately budgeted and measured on the actual deployment network. Current results do not establish real-user performance; CDN latency, devices, production origin and any future instrumentation require a new baseline.
