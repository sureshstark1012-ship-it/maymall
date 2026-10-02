# Production hardening before Phase 2

## Audit

Reviewed package.json, Next.js/TypeScript/ESLint/Playwright configuration, the App Router, all component source, tests, environment examples, ignored outputs and repository workflows before editing. No GitHub workflow previously existed. The working tree was clean. The existing Server Component architecture, two client islands, typed data, native FAQs, no-JavaScript navigation and CSS Modules remain intact. No brand copy, image content, layout or colour values changed.

## Changes and files

- `.github/workflows/ci.yml`: one production validation job for main pushes and PRs targeting main.
- `package.json`: explicit dev/production test scripts; private package license metadata set to UNLICENSED.
- `package-lock.json`: corresponding root license metadata only; dependency versions unchanged.
- `playwright.production.config.ts`: shares the existing suite/settings and starts next start instead of next dev; refuses existing servers.
- `next.config.ts`: four baseline HTTP headers on pages and public assets.
- `src/app/page.tsx`: removes the year-only daily ISR interval.
- `src/components/layout/Footer/Footer.tsx`: documents the build-time year strategy.
- `src/components/ui/Button/Button.tsx` and `.module.css`: renamed to `src/components/ui/CtaLink/CtaLink.tsx` and `.module.css`, with corresponding export, local class and consumer updates in Hero and WeddingEdit. CSS values are unchanged.
- `tests/home.spec.ts`: adds HTTP header checks for the homepage and silk asset, keeping the original behavioral tests.
- `README.md`: current CI, test, static-rendering, security, accessibility-lint and ownership decisions.
- `docs/phase-1-audit.md` and `docs/phase-1-completion.md`: historical-record notices pointing to this current follow-up.
- `docs/production-hardening.md`: this audit and completion record.

The existing `playwright.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `.env.example`, `.gitignore`, content data and stylesheet foundations were reviewed and retained. A fresh-source typecheck without generated Next files also passed; no unrelated configuration replacement was necessary.

## CI architecture

A single Ubuntu 24.04 job uses Node 24 (supported by the package), official actions/checkout@v7 and actions/setup-node@v7. Their maintained major tags and Node 24 action runtimes were checked against the official Git repositories. The workflow has read-only contents permission, disables checkout credential persistence, cancels superseded runs, and has a 20-minute timeout. It uses ordinary pull_request events, never pull_request_target.

setup-node caches npm using package-lock.json. Commands run in order:

```sh
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run build
npx --no-install playwright install --with-deps chromium
npm test
```

SITE_INDEXABLE=false keeps the CI-built preview out of search indexing. No secret, matrix, deployment or unrelated tooling is introduced. YAML was parsed locally and triggers, permissions, Node/cache settings and the command sequence were validated. GitHub-hosted runner execution was not observed here; API access is blocked. The managed Chromium installer is runner bootstrap rather than a locally verified command; local browser checks use the existing system Chromium. All project installation, quality, build and E2E commands were exercised locally.

## Production E2E strategy

`npm test` delegates to `test:e2e:prod`, which selects playwright.production.config.ts. It requires an existing production build, then starts and stops `npm start -- --hostname 127.0.0.1 --port 3100`. It refuses to reuse an existing listener so next dev or an outdated production server cannot silently substitute for the current build.

`npm run test:e2e:dev` retains the separately named development workflow. Both configurations share the same thirteen tests, Chromium settings and error/trace behavior; test files are not duplicated. Local verification sets PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium. CI uses Playwright's installed Chromium without that override.

## Security headers

All paths, including `/images/silk.svg`, receive:

| Header                 | Value                                    |
| ---------------------- | ---------------------------------------- |
| X-Content-Type-Options | nosniff                                  |
| Referrer-Policy        | strict-origin-when-cross-origin          |
| Permissions-Policy     | camera=(), microphone=(), geolocation=() |
| X-Frame-Options        | DENY                                     |

X-Powered-By remains disabled. Framing is deliberately prohibited; embedding would need an explicit future policy change. No strict CSP was pasted in: verified Next.js inline-script nonce/hash handling and future integration decisions remain deployment-specific work. HSTS is also deferred to a verified HTTPS deployment policy.

## Static rendering and copyright year

The homepage has no real content freshness requirement, so its route-level daily revalidation export is removed. Next.js statically prerenders the page using its normal defaults. The prerender manifest reports `compute: static` and `initialRevalidateSeconds: false`, and build output lists `○ /` without a revalidation interval.

The copyright year remains server-rendered and is stamped during the build. Rebuild/redeploy at a year boundary or with the next release. This is the simplest strategy: no dynamic route, ISR, extra client island or hydration-dependent year is introduced. It intentionally does not promise a live year rollover without rebuilding.

## ESLint and accessibility

The current maintained eslint-plugin-jsx-a11y version 6.10.2 still declares ESLint peer support only through version 9. It was not installed with ESLint 10, and no deprecated fork, downgrade or compatibility shim was added. The existing Next recommended, Core Web Vitals, TypeScript and React Hooks rules remain zero-warning. Keyboard, focus, disclosure/pressed state, language, landmarks, reduced motion and no-JavaScript checks continue through Playwright. Static JSX accessibility lint coverage remains a documented gap until a maintained solution explicitly supports ESLint 10.

## License and dependencies

`private: true` remains. `license: UNLICENSED` avoids an accidental ISC grant in npm metadata; this is not a legal policy or a new licensing document. An actual licensing decision belongs to the owner. No dependencies were added, removed or upgraded in this pass.

## Verification

- Clean `npm ci --cache /tmp/maymall-npm-cache` passed.
- Formatting check, zero-warning ESLint, strict typecheck and production build passed.
- Production `npm test` passed all 13 tests using system Chromium.
- The same suite was also exercised using the development E2E command.
- Homepage and SVG response headers match the policy; X-Powered-By is absent.
- No browser console/runtime/hydration errors or horizontal overflow were detected at 375, 768, 1024 and 1440px.
- Metadata, default noindex behavior, original affiliation copy, native FAQs, filters/status, mobile Escape/focus, anchors and no-JavaScript fallback passed.
- Homepage prerender metadata confirms static generation without ISR.
- Original CTA CSS compared equal after the class rename; other visual assets and styles were untouched.
- Workflow YAML and command ordering were checked locally; remote Actions execution is unconfirmed.

## Remaining technical work

Full CSP/HTTPS policy requires a verified deployment target and tested inline-script handling. Static JSX accessibility linting awaits supported tooling; a brand contrast/legibility review and non-Chromium/assistive-technology testing remain future work. Build-time copyright needs a rebuild at year rollover. Company licensing, a verified domain and other production business details require owner decisions. No Phase 2 redesign has begun.
