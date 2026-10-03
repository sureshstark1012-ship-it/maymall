# Accessibility review — Phase 4

This is an engineering review, not WCAG certification or screen-reader certification.

## Automated scope

The existing production Playwright behavior checks remain. Development-only `@axe-core/playwright`/`axe-core` 4.13.0 (MPL-2.0, maintained September 2026 release) adds semantic/contrast rule coverage unavailable in the targeted assertions, with no browser runtime dependency. Tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` (applicable WCAG 2 A/AA rules through 2.2).

Engine scans cover all seven routes plus the open phone menu, filtered family previews and expanded Visit FAQ. Each scan retains violations, incomplete/manual-review findings, passed rule IDs, tags and engine version in the `accessibility-review` CI artifact. Incomplete findings require human assessment; zero engine violations is not proof of full accessibility.

Browser tests also cover one h1 per route, skip links, route/current-link semantics, keyboard navigation, menu Escape/focus restoration, close-on-selection/history reset, native FAQ, meaningful image alt/dimensions, Tamil language annotation, reduced motion, 44px target heights, no-JavaScript navigation and horizontal overflow at nine widths. Additional reflow checks exercise Home, Silk and Visit at 640px and 320px effective widths. Forced-colors checks verify focus and a visible selected-filter outline.

## Manual/visual checks

Reviewed the existing homepage at 375, 768, 1024 and 1440px before edits. Phase 4 keeps the typography, palette, layouts and artwork. Review screenshots cover Home, Collections and Silk at phone/desktop sizes plus Visit desktop.

The keyboard checklist covers Tab/Shift+Tab navigation, visible focus, skip-to-main, logical heading levels/landmarks, link purpose, collection breadcrumbs, exactly one global current destination, the non-modal menu disclosure, Escape restoration, native details/summary and continued route selection. Existing tests and focused browser inspection exercise these actual states rather than decorative positioning.

At an effective 640px (a 1280px window reflowing at 200%) and 320px (400%), representative pages retain their mobile navigation, wrapped headings/breadcrumbs, facts, filters, FAQ and footer without horizontal scrolling. Headless viewport reflow is a layout approximation; native desktop-browser zoom and text-only scaling remain owner/device checks and are not claimed as tested OS-level zoom.

Reduced motion disables CSS transition/animation and smooth scrolling while preserving instant color, focus and disclosure state changes. No animation library or new motion was introduced.

## Contrast and forced colors

Axe's ordinary text-contrast checks cover the real rendered palette. Existing body/display contrast review remains in [Phase 2 design notes](phase-2-design.md). Focus uses the gold outline; controls have text/borders and are not dependent on subtle background shading alone.

Forced-colors inspection revealed the selected filter's plum fill flattened to the system palette, leaving no strong visual selection cue after focus moved away. A minimal forced-colors-only Highlight outline now preserves that selected state, without changing normal colors or geometry. Keyboard focus remains visible and the menu retains its bordered control/disclosure semantics. No blanket `forced-color-adjust: none` is used. This was Chromium forced-colors simulation, not testing on a Windows assistive-technology setup.

## Engine incomplete findings reviewed

The local reports retain contrast checks the engine could not resolve. The open mobile menu geometrically overlaps the underlying hero, so the engine cannot determine those background samples; keyboard inspection confirms the disclosure and Escape restoration, and the unchanged hero palette is reviewed with the menu closed. The wedding-panel label is flagged because of the decorative pseudo-element/gradient layers. Its pale gold text on deep plum has a conservative 7.94:1 contrast at the brightest crossing of both 9/255-opacity grid layers, above the normal-text threshold. These findings remain in the report rather than being suppressed. Real-device and future-content review is still required.

## Remaining human validation

Owner review should include NVDA/JAWS on Windows, VoiceOver on Apple devices, real touch targets and browser zoom/text scaling, Tamil pronunciation/language switching, future photography alt text/crops, and sharing/host accessibility. No screen reader was available for this review. New content, approved photography or integrations require re-audit; engine reports may contain incomplete findings even when violations are zero.
