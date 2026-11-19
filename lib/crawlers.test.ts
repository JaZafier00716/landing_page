import { test } from "node:test";
import assert from "node:assert/strict";
import { aiCrawlers, buildRobots } from "./crawlers.ts";

const robots = buildRobots("https://example.test");
const rules = robots.rules;
const agents = (r: (typeof rules)[number]) => (Array.isArray(r.userAgent) ? r.userAgent : [r.userAgent]);

test("everyone else is allowed", () => {
  const star = rules.find((r) => agents(r).includes("*"));
  assert.ok(star);
  assert.equal(star.allow, "/");
  assert.equal("disallow" in star, false);
});

test("AI and LLM crawlers are disallowed", () => {
  for (const bot of ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "CCBot", "Google-Extended", "Applebot-Extended", "PerplexityBot", "Bytespider", "Meta-ExternalAgent", "Amazonbot", "cohere-ai", "Diffbot", "omgili"]) {
    const r = rules.find((x) => agents(x).includes(bot));
    assert.ok(r, bot);
    assert.equal(r.disallow, "/", bot);
  }
});

test("search engines are not listed and the sitemap is kept", () => {
  for (const bot of ["Googlebot", "Bingbot", "*"]) assert.ok(!aiCrawlers.includes(bot));
  assert.equal(robots.sitemap, "https://example.test/sitemap.xml");
});
