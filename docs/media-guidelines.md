# Media and photography handoff

Phase 4 keeps the original SVG textile studies. They are illustrations, not product photographs, inventory or a storefront. No stock photos were added. Existing files stay at `public/images/*.svg` to preserve URLs; the new generic sharing card belongs under `public/images/brand/`.

## Future asset conventions

- `images/brand/`: approved campaign/store identity and sharing artwork.
- `images/collections/`: approved silk, celebration and everyday editorial photography.
- `images/editorial/`: approved textile details and Madurai contextual imagery.

Create those future folders only when real assets arrive. Use lowercase descriptive hyphenated names and a revision suffix for cache-sensitive sharing images. Store original high-resolution masters outside the frontend repository; deliver optimized web derivatives with rights/credit and crop notes. Obtain permission for photography and identifiable people. A contextual Madurai picture must not imply an unconfirmed MayMall address.

## Composition handoff

| Use                         | Source minimum and composition                                                                                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero / Silk                 | Portrait master around 2400×3000px, supporting the existing approximately 4:5 textile frame. Keep essential details within the central 70%; allow edge cropping.                   |
| Collection previews / Story | Portrait 4:5 master, around 2400×3000px, with usable detail at smaller sizes and room for the existing caption treatment.                                                          |
| Celebration                 | Portrait invitation/textile or approved festive-family composition. Keep faces/details away from lower caption and outer frame. Do not imply an available wedding range.           |
| Everyday                    | Landscape master around 3000×2000px plus a deliberate portrait/square crop. Current art spans 2.4:1 desktop, 1.7:1 tablet and 1.1:1 phone; a single careless crop is insufficient. |
| Textile details             | Sharp close-ups of real approved textiles; only assert materials, weaving origin or craftsmanship when verified.                                                                   |
| Madurai / future store      | Licensed contextual imagery now; actual store imagery only when the location and building are confirmed. No fabricated storefront.                                                 |
| Social sharing              | 1200×630px RGB PNG/JPEG, with key text inside generous safe margins. No dates, addresses or partner marks until approved.                                                          |

Preserve warm ivory, deep plum, antique gold and natural textile colour; avoid heavy filters, oversaturation and generic western-fashion grading. These are delivery recommendations, not claims that photography exists.

## Raster implementation when approved assets exist

Use `next/image` for raster media, with real intrinsic width/height, an intentional aspect ratio and a `sizes` expression based on that actual Container/grid. Test the small, medium and wide crops; use explicit `object-position` only after reviewing the photograph. Set descriptive alt text for meaningful media and empty alt for purely decorative repeats. Do not add brand/product claims to alt text.

Prefer compressed WebP/AVIF where quality survives, or a suitable JPEG. Start with advisory delivery targets around 150 KiB for a mobile hero and 250 KiB for desktop; inspect actual quality and measured transfer before making thresholds binding. Export sRGB, strip unnecessary metadata and keep subjects legible at small sizes. Reserve dimensions before loading to prevent layout shift. Lazy-load ordinary media; elevate only a measured/likely above-fold critical image, never an entire collection of previews.

No raster component abstraction was added because no real raster editorial content exists yet. The current typed SVG contract and next/image availability do not require a fake media adapter.

## Current priority decisions

EditorialArtwork retains lazy/auto by default and eager/high only through `priority`. Homepage and primary Silk art remain high priority: phone lab observations identify them as LCP candidates. Everyday art now uses lazy/auto: both audited viewports selected text as LCP. Celebration remains lazy because its phone art follows introductory copy; its small SVG can be a desktop LCP candidate without prioritizing below-fold phone artwork. Landing, Story and related previews stay lazy. Every image reserves dimensions; SVGs are served directly.

## Generic social card

`public/images/brand/social-card-v1.png` is an intentional 1200×630 PNG derived from existing typography, icon, plum/ivory/gold palette and silk illustration. It introduces no new business facts. All routes may share it while retaining their own metadata titles/descriptions. The owner can review it in the Phase 4 PR before public deployment.

Source: `scripts/social-card.html`. Regenerate with `npm run social:generate` after installing Playwright Chromium, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an available system Chromium. The generator serves only a fixed whitelist of local assets on a temporary loopback port, waits for fonts and closes the server/browser. Pin the browser when reproducing identical pixels; the committed asset is stable between builds. Update its versioned filename when replacing artwork.

Next ImageResponse supports TTF/OTF/WOFF, while our approved font files are WOFF2. A static card avoids extra font conversion/assets and image-generation runtime dependencies. Nothing fetches fonts, artwork or photography from an external provider.
