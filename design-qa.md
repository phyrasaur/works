# Resume Design QA

## Comparison Target

- Source visual truth:
  - Figma mobile node `2174:3`
  - Figma desktop node `2176:263`
  - Cached captures: `/tmp/works-resume-qa/figma-mobile.png` and `/tmp/works-resume-qa/figma-desktop.png`
- Implementation: `http://127.0.0.1:4321/resume/`
- Implementation captures:
  - `/tmp/works-resume-qa/implementation-mobile-final.png`
  - `/tmp/works-resume-qa/implementation-desktop-final.png`
- Viewports:
  - Mobile: `360 x 1188`
  - Desktop: `1366 x 1228`
- State: initial page load, dark theme, local PP Neue Montreal loaded

## Full-View Comparison Evidence

- `/tmp/works-resume-qa/comparison-mobile-final.png`
- `/tmp/works-resume-qa/comparison-desktop-final.png`
- The implementation matches the source frame dimensions, outer padding,
  centered desktop column, section order, responsive type scale, text wrapping,
  vertical rhythm, footer placement, and black/white opacity hierarchy.

## Focused Region Comparison Evidence

- Focused list-marker crops were reviewed at enlarged scale:
  - `/tmp/works-resume-qa/figma-mobile-markers.png`
  - `/tmp/works-resume-qa/implementation-mobile-markers.png`
- This comparison found the browser's initial round markers differed from the
  small square Figma markers. The implementation now uses scaled square markers.
- No image or icon comparison was needed because neither Figma frame contains
  image assets or icons.

## Required Fidelity Surfaces

- Fonts and typography: PP Neue Montreal uses the existing local project font.
  Sizes, line heights, letter spacing, hierarchy, and wrapping match both frames.
- Spacing and layout rhythm: mobile uses `16px` padding and `28px` section gaps;
  desktop uses `28px` padding, `36px` section gaps, and a `640px` content column.
- Colors and visual tokens: black background and the source white opacity levels
  are preserved.
- Image quality and asset fidelity: not applicable; the source has no images,
  illustrations, logos, or icons.
- Copy and content: all visible Figma resume copy is present in source order.
- Responsiveness and accessibility: links are semantic and keyboard-focusable;
  desktop and mobile route checks report no overflow or serious Axe violations.

## Findings

- No actionable P0, P1, or P2 findings remain.

## Patches Made

- Added semantic Astro markup and responsive component-scoped CSS for `/resume`.
- Added real LinkedIn and email destinations while preserving the Figma labels.
- Replaced default round list markers with the source's small square markers.
- Added `/resume/` to the repository's desktop and mobile end-to-end route suite.

## Verification

- `pnpm verify:full`
- Result: 10 Playwright tests passed across 5 routes and 2 viewport projects.
- Browser console errors: none.
- Failed requests or bad responses: none.
- Broken images: none.
- Horizontal overflow: none.
- Serious or critical Axe violations: none.

final result: passed
