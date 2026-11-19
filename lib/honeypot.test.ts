import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { honeypotResponse, honeypotPaths } from "./honeypot.ts";

const req = (headers: Record<string, string> = {}) =>
  new Request("https://example.test/wp-login.php", { method: "POST", headers: { "x-forwarded-for": "203.0.113.7", "x-real-ip": "203.0.113.7", ...headers } });
const now = () => new Date("2026-11-19T10:00:00Z");

test("disabled: plain 404 and nothing logged", () => {
  const lines: string[] = [];
  const res = honeypotResponse(req(), ["wp-login.php"], { enabled: false, log: (l) => lines.push(l), now });
  assert.equal(res.status, 404);
  assert.deepEqual(lines, []);
});

test("enabled: plain 404 and one JSON line, truncated UA, country, no IP", async () => {
  const lines: string[] = [];
  const res = honeypotResponse(req({ "user-agent": "x".repeat(500), "x-vercel-ip-country": "CZ", cookie: "a=secret" }), ["wp-login.php"], { enabled: true, log: (l) => lines.push(l), now });
  assert.equal(res.status, 404);
  assert.equal(await res.text(), "Not Found");
  assert.equal(lines.length, 1);
  const entry = JSON.parse(lines[0]);
  assert.deepEqual(Object.keys(entry).sort(), ["country", "event", "method", "path", "time", "ua"]);
  assert.equal(entry.event, "honeypot");
  assert.equal(entry.path, "/wp-login.php");
  assert.equal(entry.method, "POST");
  assert.equal(entry.ua.length, 200);
  assert.equal(entry.country, "CZ");
  assert.equal(entry.time, "2026-11-19T10:00:00.000Z");
  assert.ok(!lines[0].includes("203.0.113.7"), "no IP address in the log line");
  assert.ok(!lines[0].includes("secret"), "no cookie in the log line");
});

test("enabled: paths that are not on the list are 404 and not logged", () => {
  const lines: string[] = [];
  const res = honeypotResponse(req(), ["anything", "else"], { enabled: true, log: (l) => lines.push(l), now });
  assert.equal(res.status, 404);
  assert.deepEqual(lines, []);
});

test("rewrite list in next.config.mjs matches honeypotPaths", () => {
  const src = readFileSync(new URL("../next.config.mjs", import.meta.url), "utf8");
  const m = src.match(/const honeypotPaths = (\[.*?\]);/);
  assert.ok(m);
  assert.deepEqual(JSON.parse(m[1]), honeypotPaths);
});
