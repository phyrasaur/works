import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/donaid/", "/hyperprint/", "/resume/", "/wishful/"];
const caseStudyRoutes = ["/donaid/", "/hyperprint/", "/wishful/"];

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
        expect(selectedThemeImage).not.toContain("/_image?");
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

for (const route of caseStudyRoutes) {
  test(`${route} opens content images in the native lightbox`, async ({
    page,
  }, testInfo) => {
    const colorScheme = testInfo.project.use.colorScheme;

    expect(colorScheme === "light" || colorScheme === "dark").toBeTruthy();

    await page.goto(route, { waitUntil: "networkidle" });

    const triggers = page.locator("[data-lightbox-trigger]");
    const trigger = triggers.first();
    const dialog = page.locator("#media-lightbox");
    const image = dialog.locator("[data-lightbox-image]");
    const viewport = dialog.locator("[data-lightbox-viewport]");

    expect(await triggers.count()).toBeGreaterThan(0);
    await expect(
      page.locator(".article-hero [data-lightbox-trigger]"),
    ).toHaveCount(0);

    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("open", "");
    await expect(image).not.toHaveAttribute("alt", "");
    await expect
      .poll(async () =>
        decodeURIComponent(
          await image.evaluate(
            (element) => (element as HTMLImageElement).currentSrc,
          ),
        ),
      )
      .toContain(`/${colorScheme}/`);

    const initialGeometry = await dialog.evaluate((element) => {
      const pictureElement = element.querySelector(".media-lightbox__picture");
      const imageElement = element.querySelector("[data-lightbox-image]");

      if (!pictureElement || !imageElement) return null;

      const pictureRect = pictureElement.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();

      return {
        x:
          imageRect.x +
          imageRect.width / 2 -
          (pictureRect.x + pictureRect.width / 2),
        y:
          imageRect.y +
          imageRect.height / 2 -
          (pictureRect.y + pictureRect.height / 2),
      };
    });

    expect(initialGeometry).not.toBeNull();
    expect(
      Math.abs(initialGeometry?.x ?? Number.POSITIVE_INFINITY),
    ).toBeLessThan(1);
    expect(
      Math.abs(initialGeometry?.y ?? Number.POSITIVE_INFINITY),
    ).toBeLessThan(1);

    await dialog.getByRole("button", { name: "Zoom in" }).click();
    await expect(dialog).toHaveAttribute("data-scale", "1.5");

    await page.keyboard.press("+");
    await expect(dialog).toHaveAttribute("data-scale", "2");

    await page.keyboard.press("0");
    await expect(dialog).toHaveAttribute("data-scale", "1");

    await viewport.dispatchEvent("wheel", { deltaY: -100 });
    await expect(dialog).toHaveAttribute("data-scale", "1.5");

    await dialog.getByRole("button", { name: "Reset zoom" }).click();
    await expect(dialog).toHaveAttribute("data-scale", "1");

    for (let index = 0; index < 6; index += 1) {
      await dialog.getByRole("button", { name: "Zoom in" }).click();
    }

    await expect(dialog).toHaveAttribute("data-scale", "4");

    const viewportBox = await viewport.boundingBox();
    expect(viewportBox).not.toBeNull();

    if (viewportBox) {
      const startX = viewportBox.x + viewportBox.width / 2;
      const startY = viewportBox.y + viewportBox.height / 2;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 60, startY + 40, { steps: 4 });
      await page.mouse.up();
    }

    const translation = await dialog.evaluate((element) => ({
      x: element.style.getPropertyValue("--lightbox-x"),
      y: element.style.getPropertyValue("--lightbox-y"),
    }));

    expect(translation.x === "0px" && translation.y === "0px").toBeFalsy();

    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousViolations = accessibility.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    );

    expect(seriousViolations).toEqual([]);

    await dialog.getByRole("button", { name: "Close image viewer" }).click();
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(dialog).toHaveAttribute("data-scale", "1");

    const picture = dialog.locator(".media-lightbox__picture");
    const pictureBox = await picture.boundingBox();
    expect(pictureBox).not.toBeNull();

    if (pictureBox) {
      await page.mouse.click(
        pictureBox.x + pictureBox.width / 2,
        pictureBox.y + pictureBox.height - 4,
      );
    }

    await expect(dialog).not.toBeVisible();
  });
}

test("/wishful/ expands its case-study video without replacing controls", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(HTMLVideoElement.prototype, "requestFullscreen", {
      configurable: true,
      value() {
        const state = window as typeof window & {
          fullscreenRequestCount?: number;
        };

        state.fullscreenRequestCount = (state.fullscreenRequestCount ?? 0) + 1;

        return Promise.resolve();
      },
    });
  });

  await page.goto("/wishful/", { waitUntil: "networkidle" });

  const video = page.locator("video[data-fullscreen-video]");

  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("aria-keyshortcuts", "F");

  await video.dblclick();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as typeof window & { fullscreenRequestCount?: number })
            .fullscreenRequestCount ?? 0,
      ),
    )
    .toBe(1);

  await video.focus();
  await page.keyboard.press("f");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as typeof window & { fullscreenRequestCount?: number })
            .fullscreenRequestCount ?? 0,
      ),
    )
    .toBe(2);

  await video.dispatchEvent("pointerup", {
    bubbles: true,
    clientX: 100,
    clientY: 100,
    pointerType: "touch",
  });
  await video.dispatchEvent("pointerup", {
    bubbles: true,
    clientX: 103,
    clientY: 102,
    pointerType: "touch",
  });
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as typeof window & { fullscreenRequestCount?: number })
            .fullscreenRequestCount ?? 0,
      ),
    )
    .toBe(3);
});
