import { existsSync } from "node:fs";
import path from "node:path";

const playwrightPath =
  "/Users/Yurich/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
const { chromium } = await import(playwrightPath);

const root = path.resolve(new URL("..", import.meta.url).pathname);
const pageUrl = `file://${path.join(root, "index.html")}`;
const viewports = [
  { name: "narrow-mobile", width: 360, height: 900 },
  { name: "mobile", width: 390, height: 1100 },
  { name: "desktop", width: 1440, height: 1200 },
];

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const consoleIssues = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleIssues.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => consoleIssues.push(`pageerror: ${error.message}`));

  await page.goto(pageUrl, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = Math.max(320, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 160));
  });

  const metrics = await page.evaluate(() => {
    const isVisible = (el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
    };
    const textNodes = [...document.querySelectorAll("h1,h2,h3,p,a,.pill,.micro,b,span")]
      .filter(isVisible)
      .map((el) => ({ el, rect: el.getBoundingClientRect(), text: el.textContent.trim() }))
      .filter((item) => item.text && item.rect.width > 1 && item.rect.height > 1);

    const overlaps = [];
    for (let i = 0; i < textNodes.length; i += 1) {
      for (let j = i + 1; j < textNodes.length; j += 1) {
        const a = textNodes[i];
        const b = textNodes[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        const x = Math.max(0, Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left));
        const y = Math.max(0, Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top));
        if (x > 4 && y > 4) {
          overlaps.push({ a: a.text.slice(0, 64), b: b.text.slice(0, 64), area: Math.round(x * y) });
        }
      }
    }

    const meta = (selector) => document.querySelector(selector)?.getAttribute("content")?.trim() || "";
    const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .flatMap((script) => {
        try {
          const parsed = JSON.parse(script.textContent || "{}");
          return Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed];
        } catch {
          return [];
        }
      });
    const eventNames = jsonLd.filter((item) => item["@type"] === "Event").map((item) => item.name);

    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
      ogTitle: meta('meta[property="og:title"]'),
      ogDescription: meta('meta[property="og:description"]'),
      ogImage: meta('meta[property="og:image"]'),
      twitterCard: meta('meta[name="twitter:card"]'),
      eventNames,
      hasSamudroAnnouncement: document.body.innerText.includes("Чакра · Тантра · Дао"),
      hasHomaAnnouncement: document.body.innerText.includes("Тантра с Хомой и Муктой"),
      hasBrandLogo: [...document.querySelectorAll(".site-logo")].some((el) => ["Human", "HUMN"].includes(el.textContent.trim())),
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      imageSources: [...document.images].map((img) => img.getAttribute("src")).filter(Boolean),
      linkIssues: [...document.querySelectorAll("a")].flatMap((link) => {
        const text = link.textContent.trim() || link.getAttribute("aria-label") || "link";
        const href = link.getAttribute("href");
        if (!href) return [`${text}: missing href`];
        if (href.startsWith("#") && href.length > 1 && !document.querySelector(href)) {
          return [`${text}: missing anchor target ${href}`];
        }
        return [];
      }),
      visibleButtonCount: [...document.querySelectorAll("a.btn, button")].filter(isVisible).length,
      overlaps: overlaps.slice(0, 12),
    };
  });

  const interactionIssues = await page.evaluate(async () => {
    const issues = [];
    const clickAndExpectCounter = async (selector, label, counterSelector) => {
      const button = document.querySelector(selector);
      const counter = document.querySelector(counterSelector);
      if (!button) {
        issues.push(`${label}: missing`);
        return;
      }
      if (!counter) {
        issues.push(`${label}: missing counter`);
        return;
      }
      const before = counter.textContent.trim();
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 320));
      const after = counter.textContent.trim();
      if (before === after) issues.push(`${label}: counter did not update`);
    };

    await clickAndExpectCounter(".upcoming-next", "upcoming next", ".upcoming-counter b");
    await clickAndExpectCounter(".upcoming-prev", "upcoming prev", ".upcoming-counter b");
    await clickAndExpectCounter(".archive-next", "archive next", ".archive-counter b");
    await clickAndExpectCounter(".archive-prev", "archive prev", ".archive-counter b");

    return issues;
  });

  metrics.interactionIssues = interactionIssues;

  metrics.imagesMissing = metrics.imageSources
    .filter((src) => src.startsWith("assets/"))
    .filter((src) => !existsSync(path.join(root, src)));

  results.push({ viewport: viewport.name, ...metrics, consoleIssues });
  await page.close();
}

await browser.close();

const failures = results.flatMap((result) => {
  const items = [];
  if (!result.title.includes("HUMN")) items.push(`${result.viewport}: title snippet missing HUMN`);
  if (result.title.length > 62) items.push(`${result.viewport}: title snippet too long (${result.title.length})`);
  if (!result.description.includes("СамудроПрем") || !result.description.includes("Бали")) {
    items.push(`${result.viewport}: meta description does not mention current retreats`);
  }
  if (result.description.length < 110 || result.description.length > 170) {
    items.push(`${result.viewport}: meta description length ${result.description.length}`);
  }
  if (result.canonical !== "https://humns.ru/") items.push(`${result.viewport}: canonical is ${result.canonical}`);
  if (result.ogTitle !== result.title) items.push(`${result.viewport}: og:title differs from title`);
  if (!result.ogDescription.includes("СамудроПрем") || !result.ogDescription.includes("Бали")) {
    items.push(`${result.viewport}: og:description does not mention current retreats`);
  }
  if (!result.ogImage.startsWith("https://")) items.push(`${result.viewport}: og:image is not absolute https`);
  if (result.twitterCard !== "summary_large_image") items.push(`${result.viewport}: twitter card is ${result.twitterCard}`);
  if (!result.eventNames.some((name) => name.includes("СамудроПрем"))) items.push(`${result.viewport}: Samudro Event JSON-LD missing`);
  if (!result.eventNames.some((name) => name.includes("Хомой"))) items.push(`${result.viewport}: Homa/Mukto Event JSON-LD missing`);
  if (!result.hasSamudroAnnouncement) items.push(`${result.viewport}: Samudro announcement missing`);
  if (!result.hasHomaAnnouncement) items.push(`${result.viewport}: Homa/Mukto announcement missing`);
  if (!result.hasBrandLogo) items.push(`${result.viewport}: brand logo missing`);
  if (result.horizontalOverflow > 2) items.push(`${result.viewport}: horizontal overflow ${result.horizontalOverflow}px`);
  if (result.imagesMissing.length) items.push(`${result.viewport}: missing images ${result.imagesMissing.join(", ")}`);
  if (result.linkIssues.length) items.push(`${result.viewport}: link issues ${result.linkIssues.join(" | ")}`);
  if (result.visibleButtonCount < 6) items.push(`${result.viewport}: too few visible controls/buttons (${result.visibleButtonCount})`);
  if (result.interactionIssues.length) items.push(`${result.viewport}: interaction issues ${result.interactionIssues.join(" | ")}`);
  if (result.consoleIssues.length) items.push(`${result.viewport}: console issues ${result.consoleIssues.join(" | ")}`);
  if (result.overlaps.length) items.push(`${result.viewport}: text overlaps ${JSON.stringify(result.overlaps)}`);
  return items;
});

console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exitCode = 1;
