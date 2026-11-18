// Regression check for the hero CV <-> header pill hand-off (DESIGN.md 5.4).
// Usage: npm run check:cv -- [baseUrl]   (needs Playwright's Chromium installed)
import { chromium } from "playwright";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const fails = [];
const browser = await chromium.launch();

const devices = [
  { name: "1366", opts: { viewport: { width: 1366, height: 900 } } },
  { name: "375", opts: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
];

for (const dev of devices) {
  for (const lang of ["en", "cs"]) {
    const ctx = await browser.newContext(dev.opts);
    const page = await ctx.newPage();
    await page.goto(`${base}/${lang}`, { waitUntil: "networkidle" });
    const tag = `${dev.name}/${lang}`;
    const scrollY = () => page.evaluate(() => scrollY);
    const step = async (dy, n) => {
      for (let i = 0; i < n; i++) {
        await page.evaluate((d) => scrollBy({ top: d, behavior: "instant" }), dy);
        await page.waitForTimeout(16);
      }
    };
    const to = (y) => page.evaluate((v) => scrollTo({ top: v, behavior: "instant" }), y);

    // Hand-off point: scrollY where the hero button's top reaches the header bottom.
    const threshold = await page.evaluate(() => {
      const h = document.querySelector(".site-header").getBoundingClientRect().height;
      return document.querySelector("[data-hero-cv] .btn").getBoundingClientRect().top + scrollY - h;
    });

    // Exactly one visible CV control, fully inside the header or the hero slot, with no transform left behind.
    const settle = async (label, wantPill) => {
      await page.waitForTimeout(1000);
      const r = await page.evaluate(() => {
        const header = document.querySelector(".site-header").getBoundingClientRect();
        const slot = document.querySelector("[data-hero-cv]").getBoundingClientRect();
        const vis = [...document.querySelectorAll("[data-hero-cv] .btn, .cv-pill")].filter((el) => {
          const cs = getComputedStyle(el);
          return cs.visibility !== "hidden" && +cs.opacity > 0.01;
        });
        return {
          vt: document.documentElement.matches(":active-view-transition"),
          items: vis.map((el) => {
            const b = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            const inside = (o) => b.top >= o.top - 1 && b.bottom <= o.bottom + 1 && b.left >= o.left - 1 && b.right <= o.right + 1;
            return {
              pill: el.classList.contains("cv-pill"),
              inHeader: inside(header),
              inSlot: inside(slot),
              opacity: +cs.opacity,
              moved: !["none", "0px", "0px 0px"].includes(cs.translate) || !["none", "1"].includes(cs.scale) || cs.transform !== "none" || !!el.style.cssText,
              box: [b.left, b.top, b.width, b.height].map(Math.round),
            };
          }),
        };
      });
      const y = await scrollY();
      const bad = (msg) => fails.push(`${tag} ${label} (scrollY ${Math.round(y)}, threshold ${Math.round(threshold)}): ${msg} ${JSON.stringify(r)}`);
      if (r.items.length !== 1) return bad(`${r.items.length} CV controls visible, want 1`);
      const [c] = r.items;
      if (wantPill !== undefined && c.pill !== wantPill) bad(`want the ${wantPill ? "pill" : "hero button"}`);
      if (r.vt) bad("view transition still running after 1s");
      if (c.opacity < 0.99 || c.moved) bad("control not at rest (opacity/transform)");
      if (c.pill ? !c.inHeader : !c.inSlot) bad(`${c.pill ? "pill" : "hero button"} not fully in its ${c.pill ? "header" : "slot"}`);
    };

    // Down in small steps to just past the threshold (and a few px short of it), then back up.
    for (const over of [4, 30, -4]) {
      await to(0);
      await page.waitForTimeout(300);
      await to(threshold - 80);
      await step(8, Math.ceil((80 + over) / 8));
      await settle(`down, ${over}px past`);
      await step(-8, Math.ceil(Math.max(40, 40 + over) / 8));
      await settle(`back up ${over}px`);
    }

    // Scrolling up: with the hero button only partly clear of the header the pill must stay docked; fully clear, it returns.
    const heroH = await page.evaluate(() => document.querySelector("[data-hero-cv] .btn").getBoundingClientRect().height);
    await to(threshold + 200);
    await page.waitForTimeout(500);
    await to(threshold + heroH / 2);
    await settle("up, hero button half under header", true);
    await to(threshold - 6);
    await settle("up, hero button fully visible", false);

    // Fling down and back up.
    await to(0);
    await step(120, 30);
    await settle("fling down");
    await step(-120, 40);
    await settle("fling up");

    // Five rapid reversals around the threshold, ending on each side.
    for (const end of ["down", "up"]) {
      await to(threshold - 20);
      await page.waitForTimeout(300);
      for (let i = 0; i < 5; i++) {
        await to(threshold + 30);
        await page.waitForTimeout(40 + i * 25);
        await to(threshold - 30);
        await page.waitForTimeout(40 + i * 25);
      }
      await to(threshold + (end === "down" ? 30 : -30));
      await settle(`5 reversals, ending ${end}`);
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
