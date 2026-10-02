# MayMall Madurai

Phase 1 engineering foundation for the existing MayMall coming-soon website. The wine, antique-gold and cream visual identity, editorial typography, artwork and cautious brand copy are preserved. This phase adds no commerce, authentication, database or new brand claims.

## Stack and prerequisites

Next.js 16 App Router, React 19, strict TypeScript, CSS Modules, ESLint flat configuration, Prettier and Playwright. ESLint uses maintained `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks` and `@next/eslint-plugin-next` plugins directly to avoid ESLint 10 incompatibilities in the bundled Next.js preset. Node.js **22.13 or newer** (Node 24 LTS recommended), npm, and Chromium for browser tests. Dependency versions are recorded in `package-lock.json`.

## Local development

```sh
npm install
cp .env.example .env.local # optional; defaults are safe for previews
npm run dev
```

Work in the existing checkout. A new Git worktree is unnecessary unless explicitly requested. If the environment's home directory is read-only, add `--cache /tmp/maymall-npm-cache` to npm installation commands. Repeatable installs can use `npm ci`.

## Production

```sh
npm run build
npm start
```

Deploy to a Node-compatible Next.js host. This is no longer a Vite `dist/` site. Do not serve `.next/` as a plain static directory. The homepage is fully statically generated, with no route-level ISR. The copyright year is stamped at build time; rebuild/redeploy at the year boundary or on the next release. This keeps the route static and adds no client JavaScript just for the year. Processes must be restarted after restoring a cloud environment.

Set `SITE_URL` to the verified public HTTP(S) origin to enable `metadataBase` and the Open Graph URL. Leave it unset for local development; no public domain is assumed. Set `SITE_INDEXABLE=true` only for an approved production deployment. Preview deployments default to `noindex, follow`. These variables are server configuration, not credentials. Set them before building and redeploy when changing metadata. No social handles, contact details, opening date, canonical URL or social image is invented.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npm test
```

Install the test browser once with `npx playwright install chromium` (or `npx playwright install --with-deps chromium` on supported Linux hosts). When a system Chromium already exists, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` before `npm test` to use it. `npm test` delegates to `npm run test:e2e:prod`: build first, then Playwright starts and stops an isolated **production** server on port 3100. It refuses to reuse an existing server so a development server or stale build cannot pass as production. `npm run test:e2e:dev` separately runs the same suite against a managed development server for local iteration. Stop any development server in this checkout before running that command. Use `npm run format` to apply formatting.

## Structure

- `src/app`: route composition, root layout, metadata exports, shared tokens/reset/typography.
- `src/components/layout`: announcement, brand, header, desktop/mobile navigation, footer.
- `src/components/home`: semantic homepage sections and collection/FAQ components.
- `src/components/ui`: Container, navigation CTA, decorative SVG primitives.
- `src/data`: typed navigation, collection and FAQ content.
- `src/types`: shared content contracts.
- `src/lib`: small class-name helper and server metadata configuration.
- `public/images`: unchanged silk SVG; icons are reusable inline React SVGs.
- `tests`: keyboard, filtering, FAQ, progressive enhancement, metadata and responsive browser checks.
- `docs/phase-1-audit.md`: prototype audit and migration decisions.
- `docs/phase-1-completion.md`: migration inventory, dependency rationale and verification results.

Static sections and artwork are Server Components. Only MobileNavigation and CollectionFilters own client state. Collection cards and navigation links are supplied as server-rendered children, keeping their markup out of the client implementation. Native FAQ details require no JavaScript. The mobile menu is a non-modal disclosure, not a dialog; Tab follows ordinary document order, Escape restores focus, and link selection focuses its destination. A no-JavaScript navigation fallback remains available on mobile; all collections remain visible without JavaScript.

CSS Modules contain component styles and responsive overrides. `globals.css` owns shared foundations and a restrained token scale. Container provides normal, wide and full-width variants, shared gutters and optional section spacing. Decorative textile colours remain local to their artwork. No remote fonts, UI/icon packages, animation libraries or external scripts are required. SVG artwork is served directly rather than rasterized or sent through image optimization; use `next/image` for future raster content when useful.

## Remaining production inputs

A verified domain, production deployment target, approved social artwork and confirmed business details remain future inputs. Existing cautious Chennai Silks wording is unchanged. Contrast and editorial legibility should receive a dedicated brand accessibility review before any later visual phase; Phase 1 intentionally preserves the current palette and type sizes. No Phase 2 redesign is included.

## CI and production hardening

`.github/workflows/ci.yml` runs on pushes to `main` and pull requests targeting `main`. One Ubuntu 24.04 job uses Node 24 and official checkout/setup-node actions pinned to their maintained v7 majors. npm caching is keyed by the lockfile; installs use `npm ci`. Formatting, lint, typecheck and production build run before Chromium E2E tests. Playwright installs only Chromium, including its Linux dependencies. The CI test command uses the production config; the behavioral suite is shared with local development. No deployment credentials or privileged pull-request trigger are required.

All responses receive `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` and `X-Frame-Options: DENY`. Framing is intentionally disabled. Full CSP is deferred until deployment-specific Next.js inline-script nonce/hash handling and any future integrations can be tested; HSTS belongs to verified HTTPS deployment configuration.

Static JSX accessibility linting remains deferred: the current maintained `eslint-plugin-jsx-a11y` release (6.10.2) declares ESLint support only through version 9. We retain the functioning ESLint 10 Next/Core Web Vitals, TypeScript and React Hooks rules and browser accessibility checks; no incompatible package, downgrade or compatibility shim was introduced. Revisit this when a maintained release officially supports ESLint 10.

The semantic navigation CTA API is `CtaLink`, not `Button`. The private npm package is marked `UNLICENSED` to avoid implying an accidental open-source licensing grant. This package metadata is not a legal policy decision; any actual license belongs to the project owner.
