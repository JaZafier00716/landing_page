"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { checkRateLimit } from "@vercel/firewall";
import { initialContactState, type ContactState } from "@/lib/contact";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Validates (trust boundary), screens bots, then emails the message. Nothing is stored. Works without JS. */
export async function sendMessage(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const values = { name: str(fd, "name"), email: str(fd, "email"), message: str(fd, "message") };
  const errors: ContactState["errors"] = {};
  if (!values.name || values.name.length > 100) errors.name = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) errors.email = "email";
  if (!values.message) errors.message = "empty";
  else if (values.message.length > 2000) errors.message = "tooLong";
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  // Honeypot: bots get the success state and nothing is sent.
  if (str(fd, "website") !== "") return { status: "success", errors: {}, values: initialContactState.values };

  const failed: ContactState = { status: "failed", errors: {}, values };
  const h = await headers();
  try {
    if ((await checkBotId()).isBot) return failed;
  } catch (e) {
    console.error("contact: botid check failed", e);
  }
  try {
    // Missing rule (not-found) or a non-Vercel environment counts as not limited.
    const { rateLimited, error } = await checkRateLimit("contact-form", { headers: h, timeout: 2000 });
    if (error) console.warn("contact: rate limit check returned", error);
    if (rateLimited) return failed;
  } catch (e) {
    console.warn("contact: rate limit check unavailable", e);
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.error("contact: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return failed;
  }
  try {
    const { error } = await new Resend(key).emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: values.email,
      subject: `Portfolio message from ${values.name.replace(/[\r\n]+/g, " ")}`,
      text: `From: ${values.name} <${values.email}>\n\n${values.message}\n`,
    });
    if (error) {
      console.error("contact: resend error", error);
      return failed;
    }
  } catch (e) {
    console.error("contact: send failed", e);
    return failed;
  }
  return { status: "success", errors: {}, values: initialContactState.values };
}
