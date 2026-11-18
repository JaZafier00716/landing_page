"use server";

import { redirect } from "next/navigation";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Lab only: validates and redirects. It sends nothing (no mail provider yet) and stores nothing. */
export async function sendMessage(fd: FormData) {
  const from = fd.get("from") === "b" ? "b" : "a";
  const name = str(fd, "name");
  const email = str(fd, "email");
  const message = str(fd, "message");
  const bot = str(fd, "website") !== ""; // honeypot: bots get the success page and nothing else
  const ok =
    bot ||
    (name.length > 0 && name.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 && message.length > 0 && message.length <= 2000);
  redirect(`/lab/${from}?${ok ? "sent=1" : "error=1"}#contact`);
}
