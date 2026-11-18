// Regression check for the CV buttons (DESIGN.md 5.4): the hero CV is static content, the header CV shows
// only once the hero one is out of view. At every scroll stop exactly one CV button is visible and usable.
// Usage: npm run check:cv -- [baseUrl]   (needs Playwright's Chromium installed)
import { chromium } from "playwright";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const fails = [];
const browser = await chromium.launch();

const devices = [
  { name: "1366", opts: { viewport: { width: 1366, height: 900 } } },
  { name: "375", opts: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
];

// Visible and usable: painted, not inert/aria-hidden, and the topmost element in the middle of its uncovered part.
const probe = () => {
  const headerH = document.querySelector(".site-header").getBoundingClientRect().height;
  const usable = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (!r.width || cs.visibility === "hidden" || +cs.opacity < 0.5 || el.closest("[inert],[aria-hidden=true]")) return false;
    const inHeader = !!el.closest(".site-header");
    const top = inHeader ? r.top : Math.max(r.top, headerH), bottom = Math.min(r.bottom, innerHeight);
    if (bottom - top <= 0) return false; // any uncovered strip counts, as for the IntersectionObserver
    const x = r.left + r.width / 2, y = (top + bottom) / 2;
    const hit = document.elementFromPoint(x, y);
    return !!hit && el.contains(hit);
  };
  const hero = document.querySelector("[data-hero-cv] .btn");
  const header = document.querySelector(".site-header .cv-pill");
  const hb = hero?.getBoundingClientRect();
  return {
    hero: hero ? usable(hero) : null,
    header: usable(header),
    heroFullyVisible: hero ? hb.top >= headerH && hb.bottom <= innerHeight : false,
    heroDocTop: hero ? Math.round(hb.top + scrollY) : null,
    heroTransform: hero ? [getComputedStyle(hero).transform, getComputedStyle(hero).translate, getComputedStyle(hero).scale].join("|") : null,
    y: Math.round(scrollY),
  };
};

for (const dev of devices) {
  for (const lang of ["en", "cs"]) {
    const ctx = await browser.newContext(dev.opts);
    const page = await ctx.newPage();
    await page.goto(`${base}/${lang}`, { waitUntil: "networkidle" });
    const tag = `${dev.name}/${lang}`;
    const start = await page.evaluate(probe);
    const still = (r) => r.heroDocTop === start.heroDocTop && r.heroTransform === start.heroTransform;

    const settle = async (label, wait = 400) => {
      await page.waitForTimeout(wait);
      const r = await page.evaluate(probe);
      const bad = (msg) => fails.push(`${tag} ${label} (scrollY ${r.y}): ${msg} ${JSON.stringify(r)}`);
      if (+r.hero + +r.header !== 1) bad(`${+r.hero + +r.header} usable CV buttons, want 1`);
      if (r.heroFullyVisible && r.header) bad("header CV shown while the hero CV is fully visible");
      if (!still(r)) bad("hero CV moved or was transformed");
    };

    // Hand-off point: the hero button's bottom reaches the header bottom.
    const handoff = await page.evaluate(() => {
      const h = document.querySelector(".site-header").getBoundingClientRect().height;
      return document.querySelector("[data-hero-cv] .btn").getBoundingClientRect().bottom + scrollY - h;
    });
    const to = (y) => page.evaluate((v) => scrollTo({ top: v, behavior: "instant" }), y);

    await settle("top of page");
    // Slow stops around the hand-off, down then up.
    for (const d of [-60, -20, -4, -1, 0, 1, 4, 20, 60]) {
      await to(Math.max(0, handoff + d));
      await settle(`stop at hand-off ${d >= 0 ? "+" : ""}${d}px`);
    }
    for (const d of [60, 4, 0, -4, -60]) {
      await to(Math.max(0, handoff + d));
      await settle(`back up to hand-off ${d >= 0 ? "+" : ""}${d}px`);
    }
    // Fast scroll: a fling down and back up with no pauses, then a stop.
    for (let i = 0; i < 30; i++) await page.evaluate(() => scrollBy({ top: 120, behavior: "instant" }));
    await settle("after fast scroll down", 250);
    for (let i = 0; i < 30; i++) await page.evaluate(() => scrollBy({ top: -120, behavior: "instant" }));
    await settle("after fast scroll up", 250);
    // Rapid reversals across the hand-off, stopping on each side.
    for (const end of [-30, 30]) {
      for (let i = 0; i < 8; i++) await to(Math.max(0, handoff + (i % 2 ? 40 : -40)));
      await to(Math.max(0, handoff + end));
      await settle(`reversals ending ${end > 0 ? "below" : "above"} the hand-off`);
    }
    // Pages without a hero CV: the header CV is always there.
    for (const path of ["/projects", "/skills"]) {
      await page.goto(`${base}/${lang}${path}`, { waitUntil: "networkidle" });
      const r = await page.evaluate(probe);
      if (!r.header) fails.push(`${tag} ${path}: header CV not usable on a page without a hero CV`);
    }
    await ctx.close();
  }
}

await browser.close();
if (fails.length) {
  console.error(`check:cv FAILED (${fails.length})\n` + fails.join("\n"));
  process.exit(1);
}
console.log("check:cv OK");
