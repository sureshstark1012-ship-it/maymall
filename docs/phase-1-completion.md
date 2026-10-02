# Phase 1 completion report

> Historical Phase 1 record. See [production hardening](production-hardening.md) for current CI, static rendering, security headers and API naming decisions.

## 1. Architecture changes

Migrated Vite's HTML/CSS/DOM-script page to Next.js 16.3.8 App Router, React 19.3.0 and strict TypeScript. Next.js was selected from the registry's stable latest release during this migration; the production npm audit reports zero known vulnerabilities. Static sections use Server Components. MobileNavigation and CollectionFilters are the only client entrypoints. Navigation links and collection cards are composed on the server and passed to those interactive boundaries. The homepage is prerendered with daily revalidation.

## 2. Files created

The complete source/configuration/documentation inventory follows. next-env.d.ts is also generated locally by Next.js and intentionally ignored rather than maintained by hand.

- `.env.example`
- `.prettierignore`
- `.prettierrc.json`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/phase-1-audit.md`
- `docs/phase-1-completion.md`
- `eslint.config.mjs`
- `next.config.ts`
- `playwright.config.ts`
- `public/images/silk.svg`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/home/BrandValues/BrandValues.module.css`
- `src/components/home/BrandValues/BrandValues.tsx`
- `src/components/home/Collections/CollectionCard.module.css`
- `src/components/home/Collections/CollectionCard.tsx`
- `src/components/home/Collections/CollectionFilters.module.css`
- `src/components/home/Collections/CollectionFilters.tsx`
- `src/components/home/Collections/CollectionsSection.module.css`
- `src/components/home/Collections/CollectionsSection.tsx`
- `src/components/home/FAQ/FAQ.module.css`
- `src/components/home/FAQ/FAQ.tsx`
- `src/components/home/HeritageRibbon/HeritageRibbon.module.css`
- `src/components/home/HeritageRibbon/HeritageRibbon.tsx`
- `src/components/home/Hero/Hero.module.css`
- `src/components/home/Hero/Hero.tsx`
- `src/components/home/Story/BrandStory.module.css`
- `src/components/home/Story/BrandStory.tsx`
- `src/components/home/Visit/VisitSection.module.css`
- `src/components/home/Visit/VisitSection.tsx`
- `src/components/home/WeddingEdit/WeddingEdit.module.css`
- `src/components/home/WeddingEdit/WeddingEdit.tsx`
- `src/components/layout/AnnouncementBar/AnnouncementBar.module.css`
- `src/components/layout/AnnouncementBar/AnnouncementBar.tsx`
- `src/components/layout/Brand/Brand.module.css`
- `src/components/layout/Brand/Brand.tsx`
- `src/components/layout/DesktopNavigation/DesktopNavigation.module.css`
- `src/components/layout/DesktopNavigation/DesktopNavigation.tsx`
- `src/components/layout/Footer/Footer.module.css`
- `src/components/layout/Footer/Footer.tsx`
- `src/components/layout/Header/Header.module.css`
- `src/components/layout/Header/Header.tsx`
- `src/components/layout/MobileNavigation/MobileNavigation.module.css`
- `src/components/layout/MobileNavigation/MobileNavigation.tsx`
- `src/components/layout/NavigationLinks/NavigationLinks.module.css`
- `src/components/layout/NavigationLinks/NavigationLinks.tsx`
- `src/components/ui/ArrowIcon/ArrowIcon.module.css`
- `src/components/ui/ArrowIcon/ArrowIcon.tsx`
- `src/components/ui/Button/Button.module.css`
- `src/components/ui/Button/Button.tsx`
- `src/components/ui/Container/Container.module.css`
- `src/components/ui/Container/Container.tsx`
- `src/components/ui/Ornament/OrnamentIcon.module.css`
- `src/components/ui/Ornament/OrnamentIcon.tsx`
- `src/data/collections.ts`
- `src/data/faq.ts`
- `src/data/navigation.ts`
- `src/lib/site-metadata.ts`
- `src/lib/utils.ts`
- `src/types/content.ts`
- `tests/home.spec.ts`
- `tsconfig.json`

## 3. Files removed or moved

Removed `index.html`, `src/main.js`, and `src/style.css` after migrating their content and behavior. Moved `public/silk.svg` to `public/images/silk.svg`, with a byte-for-byte equality check against the original Git version. Removed the Vite dependency and replaced its scripts. No public imagery was rasterized or replaced.

## 4. Important refactors

- Meaningful semantic layout and home components replace the monolithic page.
- Typed navigation, collections and FAQs live in dedicated data files.
- React state owns menu disclosure and collection filtering; no querySelector-based React behavior remains.
- Container centralizes normal, wide and full-width layouts, gutters and optional section spacing.
- CSS Modules own local styling and breakpoints; globals own reset, typography and a restrained token foundation.
- Shared decorative SVG components replace repeated markup; existing CTA links stay semantic anchors.
- Server-rendered copyright year updates through daily route revalidation, without a third client island.
- Native FAQ details remain progressively enhanced browser behavior.

## 5. Dependencies and purpose

| Dependency                | Reason                                                                      |
| ------------------------- | --------------------------------------------------------------------------- |
| next                      | App Router, Server Components, metadata, production compilation and runtime |
| react                     | Component composition and state for the two interactive islands             |
| react-dom                 | React browser rendering and hydration                                       |
| typescript                | Strict compile-time checking                                                |
| @types/node               | Node/configuration/server environment types                                 |
| @types/react              | React component and JSX types                                               |
| @types/react-dom          | React DOM types                                                             |
| eslint                    | Current flat-config lint runner                                             |
| @eslint/js                | Maintained baseline JavaScript correctness rules                            |
| typescript-eslint         | TypeScript parsing and recommended lint rules                               |
| @next/eslint-plugin-next  | Framework and Core Web Vitals lint rules                                    |
| eslint-plugin-react-hooks | Hook correctness and React lifecycle checks                                 |
| prettier                  | Consistent formatting and format checks                                     |
| @playwright/test          | One real-browser testing framework for interactions and responsive behavior |

Direct maintained ESLint plugins replace eslint-config-next: its bundled legacy React/import/accessibility plugins were incompatible with ESLint 10. The final dependency tree has no such incompatible preset. No UI kit, icon library, animation runtime, Tailwind, database or authentication dependency was added.

## 6. Accessibility improvements

Preserved semantic header/main/footer, one h1, image alt text, Tamil language markup, visible focus, reduced motion, disclosure states and pressed filter states. Added a skip link; the brand-values eyebrow is now a visually unchanged h2 above its h3 items. Named content sections are keyboard focus destinations. Escape returns focus to the mobile trigger; selecting a mobile anchor closes the menu and focuses its destination. Resizing to desktop resets disclosure state. Filter results are announced through a polite status region. Decorative SVGs cannot receive focus and are hidden from screen readers. A no-JavaScript mobile navigation fallback is available; FAQs and all collection content remain usable without JavaScript.

## 7. SEO improvements

Next.js metadata defines the preserved title, title template, description, application name, robots, Open Graph and Twitter summary baseline. SITE_URL supplies a verified deployment origin and metadataBase only when configured. Preview defaults are noindex/follow; SITE_INDEXABLE=true enables indexing for an approved production deployment. No domain, social handle, address, opening date or social image was invented.

## 8. Testing added

Twelve Playwright browser tests cover mobile keyboard open/close, Escape and focus, destination selection, viewport changes, all collection filters and pressed states, native FAQ keyboard use, cautious affiliation copy, skip link/headings/languages/artwork/year, four viewport widths, browser error collection, reduced motion, no-JavaScript behavior and metadata. Tests scope accessibility checks to the site's landmarks so Next.js development tooling does not affect assertions. No snapshot-only tests were added.

## 9. Commands executed

- npm install --cache /tmp/maymall-npm-cache
- npm ci --cache /tmp/maymall-npm-cache (clean lockfile reproduction)
- npm run lint
- npm run typecheck
- npm run format
- npm run format:check
- PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
- npm run build
- npm start -- --hostname 127.0.0.1 --port 3100
- npm audit --omit=dev --json --cache /tmp/maymall-npm-cache
- git diff --check
- Readiness HTTP requests, production screenshot capture and original-versus-migrated section geometry/text checks.

System Chromium provides the browser in this environment; no browser download or relaxed verification was needed for the completed checks. Reusable cloud install_script and start_skill were updated and confirmed saved for the Next.js workflow. Saving configuration does not deploy or publish it.

## 10. Results

Installation, clean lockfile installation, ESLint, strict typecheck, formatting, production build and all 12 production-browser tests passed. The production dependency audit reports zero known vulnerabilities. Production-browser tests detected no console errors, runtime errors or overflow at 375, 768, 1024 and 1440px. Before/after section widths and heights match at all four widths; main section copy matches after excluding the new screen-reader-only filter status. Desktop and mobile screenshots were reviewed. The original silk SVG is unchanged in content.

The normal test command is also validated against its automatically managed development server. The production test run used a restarted production server to ensure its manifest matched the latest build.

## 11. Assumptions

Phase 1 preserves the current visual identity, native anchors and cautious business copy. A Node-compatible Next.js deployment is expected; this migration is not a static Vite dist upload. Node 24 is available here; the documented minimum is 22.13. Unknown domain, business details and launch information remain unset. No Phase 2 redesign or business feature expansion was performed. This report covers migration verification in the cloud environment. Git publication and hosting deployment are separate operations.

## 12. Remaining technical debt

Deployment/domain configuration and approved social artwork remain external inputs. Existing small text and antique-gold contrast need a dedicated brand accessibility review before claiming full WCAG conformance; this migration intentionally retains the existing palette and type sizes. Browser automation currently targets Chromium, so Safari/Firefox and real assistive-technology review remain future coverage. The daily revalidated year is request-driven and may serve its cached value to the first request after expiry before regeneration completes. No required build, lint, typing or interaction failure remains.
