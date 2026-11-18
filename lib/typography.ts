import type { Lang } from "@/lib/i18n";

const NBSP = " ";

/** Joins short words to the next word with a non-breaking space so lines do not end on them. */
export function nbsp(text: string, lang: Lang): string {
  let out = text.replaceAll("Jan Zámostný", `Jan${NBSP}Zámostný`);
  // One-letter Czech prepositions and conjunctions, at a word start (after punctuation, quotes or the start of the string).
  if (lang === "cs") out = out.replace(/(?<![\p{L}\p{N}])([vkszouai]) /giu, `$1${NBSP}`);
  // Number followed by a unit or word: "70 h", "131 KB".
  return out.replace(/(\d) (?=\p{L})/gu, `$1${NBSP}`);
}
