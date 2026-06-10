import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "public", "resume.pdf");
const suppliedUrl = process.env.RESUME_URL;

async function getAvailablePort() {
  const server = createServer();

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : null;

  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });

  if (!port) {
    throw new Error("Could not allocate a local port for the resume preview.");
  }

  return port;
}

async function waitForPage(url) {
  const deadline = Date.now() + 120_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // The local Astro server may still be starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

let server;
let browser;

try {
  let resumeUrl = suppliedUrl;

  if (!resumeUrl) {
    const port = await getAvailablePort();
    resumeUrl = `http://127.0.0.1:${port}/resume/`;
    server = spawn(
      "pnpm",
      ["dev", "--host", "127.0.0.1", "--port", String(port)],
      {
        cwd: root,
        stdio: "ignore",
      },
    );
    await waitForPage(resumeUrl);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const response = await page.goto(resumeUrl, { waitUntil: "networkidle" });

  if (!response?.ok()) {
    throw new Error(
      `Resume request failed: ${response?.status() ?? "unknown"}`,
    );
  }

  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outputPath,
    format: "A4",
    displayHeaderFooter: false,
    outline: true,
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  });

  console.log(`Generated ${path.relative(root, outputPath)}`);
} finally {
  await browser?.close();
  server?.kill("SIGTERM");
}
