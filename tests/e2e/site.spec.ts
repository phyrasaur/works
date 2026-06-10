import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/donaid/", "/hyperprint/", "/resume/", "/wishful/"];

for (const route of routes) {
  test(`${route} loads without browser-level failures`, async ({
    page,
  }, testInfo) => {
    const colorScheme = testInfo.project.use.colorScheme;

    expect(colorScheme === "light" || colorScheme === "dark").toBeTruthy();

    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const requestFailures: string[] = [];
    const badResponses: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      requestFailures.push(
        `${request.method()} ${request.url()}: ${request.failure()?.errorText ?? "unknown error"}`,
      );
    });
    page.on("response", (response) => {
      if (response.status() >= 400) {
        badResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response, `No document response for ${route}`).not.toBeNull();
    expect(response?.ok(), `Document request failed for ${route}`).toBeTruthy();

    await page.evaluate(async () => {
      await document.fonts.ready;

      for (
        let scrollTop = 0;
        scrollTop < document.documentElement.scrollHeight;
        scrollTop += window.innerHeight / 2
      ) {
        window.scrollTo(0, scrollTop);
        await new Promise((resolve) => window.setTimeout(resolve, 50));
      }

      await Promise.all(
        Array.from(document.images).map(
          (image) =>
            new Promise<void>((resolve) => {
              if (image.complete) {
                resolve();
                return;
              }

              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
              window.setTimeout(resolve, 2_000);
            }),
        ),
      );

      window.scrollTo(0, 0);
    });

    const brokenImages = await page.locator("img").evaluateAll((images) =>
      images
        .map((image) => image as HTMLImageElement)
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map(
          (image) =>
            image.currentSrc || image.getAttribute("src") || "<missing src>",
        ),
    );
    const horizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    const theme = await page.evaluate(() => {
      const rootStyle = getComputedStyle(document.documentElement);
      const bodyStyle = getComputedStyle(document.body);

      return {
        colorScheme: rootStyle.colorScheme,
        prefersDark: matchMedia("(prefers-color-scheme: dark)").matches,
        surface: bodyStyle.backgroundColor,
        readingColor: bodyStyle.color,
      };
    });
    const themePictures = page.locator("picture.theme-picture");
    const themePictureCount = await themePictures.count();
    const showcaseMarks = page.locator(".showcase-mark svg");
    const showcaseMarkCount = await showcaseMarks.count();
    const themedVideos = page.locator("video[style*='--poster-light']");
    const themedVideoCount = await themedVideos.count();

    expect(theme.colorScheme).toBe(colorScheme);
    expect(theme.prefersDark).toBe(colorScheme === "dark");
    expect(theme.surface).toBe(
      colorScheme === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
    );
    expect(theme.readingColor).toBe(
      colorScheme === "dark"
        ? "rgba(255, 255, 255, 0.7)"
        : "rgba(0, 0, 0, 0.7)",
    );

    if (route === "/resume/") {
      expect(themePictureCount).toBe(0);
      expect(showcaseMarkCount).toBe(0);
    } else {
      expect(themePictureCount).toBeGreaterThan(0);
      expect(showcaseMarkCount).toBeGreaterThan(0);
      await expect(
        themePictures.locator('source[media="(prefers-color-scheme: light)"]'),
      ).toHaveCount(themePictureCount);
      await expect(
        themePictures.locator('source[media="(prefers-color-scheme: dark)"]'),
      ).toHaveCount(themePictureCount);

      const selectedThemeImages = await themePictures
        .locator("img")
        .evaluateAll((images) =>
          images.map((image) =>
            decodeURIComponent((image as HTMLImageElement).currentSrc),
          ),
        );

      for (const selectedThemeImage of selectedThemeImages) {
        expect(selectedThemeImage).toContain(`/${colorScheme}/`);
      }

      const showcaseMarkFills = await showcaseMarks.evaluateAll((marks) =>
        marks.map((mark) => {
          const path = mark.querySelector("path");
          return path ? getComputedStyle(path).fill : null;
        }),
      );

      expect(showcaseMarkFills).not.toContain(null);
      expect(new Set(showcaseMarkFills)).toEqual(
        new Set(["rgb(255, 255, 255)"]),
      );

      const showcaseMarkOffsets = await showcaseMarks.evaluateAll((marks) =>
        marks.map((mark) => {
          const container = mark.closest(
            ".article-hero__figure, .showcase__figure",
          );

          if (!container) {
            return null;
          }

          const containerBox = container.getBoundingClientRect();
          const markBox = mark.getBoundingClientRect();

          return {
            x:
              markBox.x +
              markBox.width / 2 -
              (containerBox.x + containerBox.width / 2),
            y:
              markBox.y +
              markBox.height / 2 -
              (containerBox.y + containerBox.height / 2),
          };
        }),
      );

      expect(showcaseMarkOffsets).not.toContain(null);

      for (const offset of showcaseMarkOffsets) {
        expect(Math.abs(offset?.x ?? Number.POSITIVE_INFINITY)).toBeLessThan(1);
        expect(Math.abs(offset?.y ?? Number.POSITIVE_INFINITY)).toBeLessThan(1);
      }
    }

    if (themedVideoCount > 0) {
      const selectedVideoPosters = await themedVideos.evaluateAll((videos) =>
        videos.map((video) =>
          decodeURIComponent(getComputedStyle(video).backgroundImage),
        ),
      );

      for (const selectedVideoPoster of selectedVideoPosters) {
        expect(selectedVideoPoster).toContain(`/${colorScheme}/`);
      }
    }

    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousViolations = accessibility.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    );

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(
      `page-${route === "/" ? "home" : route.replaceAll("/", "")}-${colorScheme}`,
      {
        body: screenshot,
        contentType: "image/png",
      },
    );

    await page.keyboard.press("Tab");
    const focusIndicator = await page.evaluate(() => {
      const focused = document.activeElement;

      if (!(focused instanceof HTMLElement)) {
        return null;
      }

      const style = getComputedStyle(focused);

      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: Number.parseFloat(style.outlineWidth),
      };
    });

    expect(focusIndicator, "No keyboard focus target").not.toBeNull();
    expect(focusIndicator?.outlineStyle).not.toBe("none");
    expect(focusIndicator?.outlineWidth).toBeGreaterThanOrEqual(2);

    expect(consoleErrors, "Browser console errors").toEqual([]);
    expect(pageErrors, "Unhandled page errors").toEqual([]);
    expect(requestFailures, "Failed browser requests").toEqual([]);
    expect(badResponses, "HTTP responses with status >= 400").toEqual([]);
    expect(brokenImages, "Broken images").toEqual([]);
    expect(
      horizontalOverflow,
      "Unexpected horizontal page overflow",
    ).toBeLessThanOrEqual(1);
    expect(
      seriousViolations,
      "Serious or critical accessibility violations",
    ).toEqual([]);
  });
}
