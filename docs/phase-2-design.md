# Phase 2 — Woven editorial

## Visual audit before implementation

Viewed the current production homepage at 375, 768, 1024 and 1440px and captured screenshots before changing source. The identity has a good plum/cream foundation but relies on equally sized generic cards, repeated floral ornaments, tiny 8–10px captions and a static two-column hero. The four-width audit found 19 small labels in the main content. Tablet navigation is crowded, mobile follows desktop order without its own composition, and section backgrounds/spacing feel like independent blocks. Georgia/Arial and low-contrast gold labels reduce perceived quality.

## Design direction

A contemporary Tamil textile editorial: expressive Newsreader, restrained Public Sans and Noto Sans Tamil; deep plum, warm ivory, parchment, antique gold and muted rose; asymmetric silk framing and collection studies; a quiet invitation-like wedding canvas; typographic manifesto; and a Madurai conclusion with integrated FAQs. Fine double rules and woven lines replace repeated decoration. Illustrative assets remain clearly illustrative, never branded store or product photographs. Preserve all factual copy, framework/architecture, static rendering and production safeguards.

## Typography and palette

Newsreader’s expressive serif and true italic carry the editorial headlines; Public Sans keeps navigation and body copy quiet and readable. Noto Sans Tamil gives the annotated Tamil greeting an appropriate script face. All are unmodified SIL OFL 1.1 WOFF2 subsets from verified Fontsource npm packages; original licenses, versions and tarball integrity records are in `src/app/fonts/`. `next/font/local` self-hosts these files, uses swap, and supplies metric-adjusted Latin fallbacks. The Tamil face is not preloaded. No application dependency was added. Future expanded scripts/Latin characters need matching subsets.

The semantic palette evolves the existing identity: plum `#4a172a`, antique gold `#85612f`, ivory `#faf6ed`, parchment `#efe7d9`, deep plum `#321420`, brown-black `#2d2421`, muted body text `#69594f`, pale zari `#d9bb82` and rose `#dfc1b3`. Existing token aliases remain to avoid an unrelated API rewrite. Strong borders use `#9b7d56`. Fine double rules are the shared textile-frame grammar; woven grids and the brand ornament are used sparingly. Labels are at least 12px, body copy 14–16px, with fluid serif headlines.

## Composition and components

- **Header:** a clearer brand mark, 44px+ desktop links, restrained underline/CTA states and a numbered editorial mobile disclosure. The mobile layout now extends through 900px to avoid cramped tablet navigation. Announcement message/status spans keep coming-soon wording together at narrow widths. No mega-menu or modal focus trap was added.
- **Hero:** asymmetric serif copy and a double-rule framed silk study with a semantic figure/caption. The tilted seal and repeated floral note are removed. Phone composition uses a compact, intentional heading scale and offset 390px textile crop rather than simply shrinking desktop.
- **Ribbon/story:** typographic phrases and border stripes replace repeated ornaments; Tamil text has its dedicated font and language annotation. Story copy has generous reading widths and a contrasting headline scale.
- **Collections:** a larger silk preview, staggered invitation study, and folded everyday textiles replace equal generic cards. Three previews become two columns plus a wider third study at tablet sizes, then offset, independently cropped studies on phones. Filtered results reset offsets and remain comfortably sized. Cards are editorial articles, not pretend product links; their nonfunctional arrows are removed.
- **Wedding:** deep plum, woven line work, one framed brand ornament, dramatic ivory/soft-gold type and restrained rose body text. Mobile puts the story and CTA before a compact decorative panel.
- **Values:** numbered manifesto rows with strong serif statements replace three feature-like columns.
- **Visit/FAQ:** a Madurai closing statement, bordered coming-soon line and integrated FAQ rules. Native details/summary behavior remains intact, including the initially open first question.
- **Footer:** deep plum, the shared Brand component’s light treatment, italic editorial tagline and a clear back-to-top link. No invented contacts, policies, social handles or legal identity.

The existing component boundaries, typed data, Container primitive and CSS Module approach remain. Static sections remain Server Components; only MobileNavigation and CollectionFilters use client state. No empty wrapper primitives or visual libraries were introduced. Files removed: none.

## Illustrations and future photography

`public/images/silk.svg` is unchanged. `celebration.svg` and `everyday.svg` are new original abstract vector studies, not downloaded photography or claims of stocked merchandise. Their alt text explicitly identifies illustrations, the hero caption calls its image an illustrative textile study, and the existing collection-preview disclaimer remains visible. `src/app/icon.svg` adapts the existing ornament for the browser tab.

Aspect-ratio/height-controlled image containers and object-fit crops support approved future photographs without rebuilding section layouts. Use `next/image` with correct sizes and image-specific alt text when introducing raster photography; keep simple SVG studies served directly. Hero art has explicit dimensions and high fetch priority; collection artwork is lazy-loaded.

## Interaction and accessibility review

Navigation underline, arrow translation, small image scale and color/border changes use CSS. There are no scroll reveals, parallax, animation packages, hover-dependent copy or hidden editorial content. All motion is disabled with `prefers-reduced-motion`. Every visible interactive target is at least 44px high. Focus rings remain visible and use pale gold/ivory on deep backgrounds. Native keyboard behavior, one h1, semantic landmarks, skip link, Tamil lang annotation, aria-expanded/controls/pressed, live filter count, Escape restoration and link destination focus are preserved. The no-JavaScript mobile fallback is readable and hides its inactive menu trigger.

Contrast was calculated using WCAG relative sRGB luminance and manually reviewed in the rendered layouts. New text combinations pass the 4.5:1 normal-text threshold:

| Foreground / background    | Ratio   |
| -------------------------- | ------- |
| Primary text / ivory       | 14.05:1 |
| Secondary text / ivory     | 6.20:1  |
| Secondary text / parchment | 5.44:1  |
| Antique gold / ivory       | 5.19:1  |
| Antique gold / parchment   | 4.56:1  |
| Ivory / wine               | 13.04:1 |
| Pale gold / wine           | 7.86:1  |
| Rose / wine                | 8.58:1  |
| Rose / deep plum           | 9.88:1  |
| Ivory / CTA hover wine     | 9.03:1  |

Strong interactive borders contrast above 3:1 on ivory and parchment. Decorative art and fine, noninteractive separator rules are excluded from text contrast claims. This is a focused manual review, not full WCAG certification or a screen-reader audit.

## Performance and production safeguards

Four subset font files total **199,904 bytes (195.2 KiB)**; three Latin normal/italic/body files total 149,436 bytes and are preloaded. The 50,468-byte Tamil subset is loaded on demand when its greeting is rendered. The two new textile SVGs total 3,076 bytes and the tab icon is 803 bytes. There are no new runtime/dev dependencies, client libraries, remote font requests or external scripts. Font swap/fallback metrics and reserved art dimensions limit shifts; no quantitative Core Web Vitals claim is made without field measurements.

Homepage and icon remain statically prerendered. Metadata, verified-origin TODO strategy, preview noindex defaults, security headers, strict TypeScript and existing production test workflow remain. Tests now load and validate every lazy image, assert minimum target height at the four main widths and verify reduced-motion image transitions. Two full-page screenshots are attached after fonts/artwork load, using reduced motion. CI retains these PNGs seven days with the official Node 24 upload-artifact action pinned to verified v7 commit `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a`; job permissions remain contents-read. These are manual review artifacts, not pixel regression assertions. Baselines are deferred until CI Chromium/font-rendering conditions are pinned and reviewed.

## Remaining inputs

Approved photography and final identity assets, a verified public domain/deployment host, approved social artwork, and confirmed opening/location/contact details remain owner inputs. No date, address, phone, price, affiliation, testimonial or ownership claim was added. Existing cautious Chennai Silks language is unchanged. Screen-reader/device coverage and field performance measurements remain later validation work. No CMS or ecommerce work is included.

## File inventory

Modified:

- `.github/workflows/ci.yml`
- `README.md`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/home/BrandValues/BrandValues.module.css`
- `src/components/home/Collections/CollectionCard.module.css`
- `src/components/home/Collections/CollectionCard.tsx`
- `src/components/home/Collections/CollectionFilters.module.css`
- `src/components/home/Collections/CollectionFilters.tsx`
- `src/components/home/Collections/CollectionsSection.module.css`
- `src/components/home/FAQ/FAQ.module.css`
- `src/components/home/HeritageRibbon/HeritageRibbon.module.css`
- `src/components/home/HeritageRibbon/HeritageRibbon.tsx`
- `src/components/home/Hero/Hero.module.css`
- `src/components/home/Hero/Hero.tsx`
- `src/components/home/Story/BrandStory.module.css`
- `src/components/home/Visit/VisitSection.module.css`
- `src/components/home/WeddingEdit/WeddingEdit.module.css`
- `src/components/layout/AnnouncementBar/AnnouncementBar.module.css`
- `src/components/layout/AnnouncementBar/AnnouncementBar.tsx`
- `src/components/layout/Brand/Brand.module.css`
- `src/components/layout/Brand/Brand.tsx`
- `src/components/layout/DesktopNavigation/DesktopNavigation.module.css`
- `src/components/layout/Footer/Footer.module.css`
- `src/components/layout/Footer/Footer.tsx`
- `src/components/layout/Header/Header.module.css`
- `src/components/layout/MobileNavigation/MobileNavigation.module.css`
- `src/components/layout/MobileNavigation/MobileNavigation.tsx`
- `src/components/layout/NavigationLinks/NavigationLinks.module.css`
- `src/components/layout/NavigationLinks/NavigationLinks.tsx`
- `src/components/ui/CtaLink/CtaLink.module.css`
- `tests/home.spec.ts`

Created:

- `docs/phase-2-design.md`
- `public/images/celebration.svg`
- `public/images/everyday.svg`
- `src/app/fonts.ts`
- `src/app/fonts/README.md`
- `src/app/fonts/newsreader-LICENSE.txt`
- `src/app/fonts/newsreader-latin-wght-italic.woff2`
- `src/app/fonts/newsreader-latin-wght-normal.woff2`
- `src/app/fonts/noto-sans-tamil-LICENSE.txt`
- `src/app/fonts/noto-sans-tamil-tamil-wght-normal.woff2`
- `src/app/fonts/public-sans-LICENSE.txt`
- `src/app/fonts/public-sans-latin-wght-normal.woff2`
- `src/app/icon.svg`

## Verification

Executed `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build`, and `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`. Formatting, lint and strict typecheck pass; the production build statically prerenders the homepage and icon; all 13 production Chromium tests pass. The system Chromium override avoids a blocked browser-download CDN in this cloud environment; CI installs the lockfile-matched Playwright Chromium as before.

Production screenshots and browser checks were reviewed at 375, 390, 430, 768, 1024, 1280, 1440, 1600 and 1800px. No horizontal overflow, failed artwork, console errors, hydration warnings or sub-12px visible text were found. The required 375/768/1024/1440 layouts, mobile navigation open state, collections, wedding spread and visit/FAQ were inspected visually. Screenshot region capture was aligned to section starts to avoid Chromium painting an offscreen fixed skip link into tall clipped captures; the actual skip link remains offscreen until focused.

GitHub workflow execution and production hosting are external checks; local production results are verified, but this report makes no claim that a remote workflow or live deployment has completed.
