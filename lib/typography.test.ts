import { test } from "node:test";
import assert from "node:assert/strict";
import { nbsp } from "./typography.ts";

const N = " ";

test("Czech one-letter prepositions get a non-breaking space", () => {
  assert.equal(nbsp("Práce v Praze", "cs"), `Práce v${N}Praze`);
  assert.equal(nbsp("s a k", "cs"), `s${N}a${N}k`);
});

test("consecutive one-letter words are all joined", () => {
  assert.equal(nbsp("a v Praze", "cs"), `a${N}v${N}Praze`);
});

test("one-letter words after punctuation and quotes are joined", () => {
  assert.equal(nbsp("„v Praze“", "cs"), `„v${N}Praze“`);
  assert.equal(nbsp("(k tomu)", "cs"), `(k${N}tomu)`);
});

test("case-insensitive for prepositions", () => {
  assert.equal(nbsp("V Praze", "cs"), `V${N}Praze`);
});

test("one-letter words inside a word or English text are untouched", () => {
  assert.equal(nbsp("Kotlin a Java", "cs"), `Kotlin a${N}Java`);
  assert.equal(nbsp("Kotlin a Java", "en"), "Kotlin a Java");
  assert.equal(nbsp("Java, kotlin", "cs"), "Java, kotlin");
});

test("number followed by a unit gets a non-breaking space in both languages", () => {
  assert.equal(nbsp("70 h", "en"), `70${N}h`);
  assert.equal(nbsp("131 KB", "cs"), `131${N}KB`);
  assert.equal(nbsp("4.6 GB", "en"), `4.6${N}GB`);
});

test("number followed by a dash or punctuation is untouched", () => {
  assert.equal(nbsp("2023 – present", "en"), "2023 – present");
});

test("the name is joined in both languages", () => {
  assert.equal(nbsp("Jan Zámostný, student", "en"), `Jan${N}Zámostný, student`);
  assert.equal(nbsp("Jan Zámostný", "cs"), `Jan${N}Zámostný`);
});

test("empty string and text without matches are returned unchanged", () => {
  assert.equal(nbsp("", "cs"), "");
  assert.equal(nbsp("Hello world", "en"), "Hello world");
});
