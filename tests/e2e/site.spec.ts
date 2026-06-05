import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/donaid/", "/hyperprint/", "/wishful/"];

for (const route of routes) {
  test(`${route} loads without browser-level failures`, async ({
    page,
  }, testInfo) => {
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
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousViolations = accessibility.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    );

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(
      `page-${route === "/" ? "home" : route.replaceAll("/", "")}`,
      {
        body: screenshot,
        contentType: "image/png",
      },
    );

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
