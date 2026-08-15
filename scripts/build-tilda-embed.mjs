import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const inputPath = path.join(root, "index.html");
const distPath = path.join(root, "dist");
const outputPath = path.join(distPath, "tilda-homepage-t123.html");
const githubBase = "https://ny06981-lang.github.io/humn-homepage/";

const html = await readFile(inputPath, "utf8");
const style = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? "";

if (!style || !body) {
  throw new Error("Could not extract style/body from index.html");
}

const rewriteAssets = (value) =>
  value
    .replaceAll('url("assets/', `url("${githubBase}assets/`)
    .replaceAll("url('assets/", `url('${githubBase}assets/`)
    .replaceAll('src="assets/', `src="${githubBase}assets/`)
    .replaceAll("src='assets/", `src='${githubBase}assets/`);

const embeddedStyle = rewriteAssets(style);
const embeddedBody = rewriteAssets(body);

const tildaHtml = `<style>
/* Human homepage injected via Tilda T123. */
body .t-rec:not(:has(.human-homepage-root)),
body .r:not(:has(.human-homepage-root)) {
  display: none !important;
  visibility: hidden !important;
}
body .t-rec:has(.human-homepage-root),
body .r:has(.human-homepage-root) {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}
.human-homepage-root,
.human-homepage-root,
.human-homepage-root * {
  box-sizing: border-box;
  visibility: visible !important;
}
html { scroll-behavior: smooth; }
${embeddedStyle}
</style>
<div class="human-homepage-root">
${embeddedBody}
</div>
<script>
(function () {
  function activateHumanHomepage() {
    var root = document.querySelector('.human-homepage-root');
    if (!root) return;
    var hostRecord = root.closest('.t-rec, .r');
    if (hostRecord) hostRecord.classList.add('human-homepage-record');
    document.querySelectorAll('.t-rec, .r').forEach(function (record) {
      if (record !== hostRecord && !record.contains(root)) {
        record.style.setProperty('display', 'none', 'important');
        record.style.setProperty('visibility', 'hidden', 'important');
      } else {
        record.style.setProperty('display', 'block', 'important');
        record.style.setProperty('visibility', 'visible', 'important');
      }
    });
  }
  activateHumanHomepage();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activateHumanHomepage);
  }
  window.addEventListener('load', activateHumanHomepage);
})();
</script>
`;

await mkdir(distPath, { recursive: true });
await writeFile(outputPath, tildaHtml);
console.log(outputPath);
