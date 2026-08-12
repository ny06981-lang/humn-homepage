import path from "node:path";

const playwrightPath =
  "/Users/Yurich/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
const { chromium } = await import(playwrightPath);

const root = path.resolve(new URL("..", import.meta.url).pathname);
const pageUrl = `file://${path.join(root, "index.html")}`;
const viewports = [
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

    return {
      title: document.title,
      hasSamudroAnnouncement: document.body.innerText.includes("Чакра · Тантра · Дао"),
      hasHumanLogo: [...document.querySelectorAll(".site-logo")].some((el) => el.textContent.trim() === "Human"),
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      imagesMissing: [...document.images].filter((img) => img.naturalWidth === 0).map((img) => img.getAttribute("src")),
      overlaps: overlaps.slice(0, 12),
    };
  });

  results.push({ viewport: viewport.name, ...metrics, consoleIssues });
  await page.close();
}

await browser.close();

const failures = results.flatMap((result) => {
  const items = [];
  if (!result.hasSamudroAnnouncement) items.push(`${result.viewport}: Samudro announcement missing`);
  if (!result.hasHumanLogo) items.push(`${result.viewport}: Human logo missing`);
  if (result.horizontalOverflow > 2) items.push(`${result.viewport}: horizontal overflow ${result.horizontalOverflow}px`);
  if (result.imagesMissing.length) items.push(`${result.viewport}: missing images ${result.imagesMissing.join(", ")}`);
  if (result.consoleIssues.length) items.push(`${result.viewport}: console issues ${result.consoleIssues.join(" | ")}`);
  if (result.overlaps.length) items.push(`${result.viewport}: text overlaps ${JSON.stringify(result.overlaps)}`);
  return items;
});

console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exitCode = 1;
