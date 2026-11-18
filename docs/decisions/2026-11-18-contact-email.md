# Contact form email: Resend via Vercel Marketplace

- Status: Proposed
- Date: 2026-11-18
- Decided by: jan zamostny

## Decision
The home "Get in touch" form posts to a Server Action that sends one email with the `resend` SDK (`from` onboarding sender, `to` = `CONTACT_TO_EMAIL`, `replyTo` = the visitor's address). Spam protection: hidden honeypot field, Vercel WAF rate limiting through `@vercel/firewall` `checkRateLimit` (one rule, keyed by IP), and Vercel BotID basic mode (`checkBotId()` in the action). Nothing is stored.

## Why
- The site already deploys on Vercel and has no inbound API routes or job runner; Resend's Marketplace integration provisions `RESEND_API_KEY` into the project, so there is no new secret handling to build.
- Volume is tiny: Resend Free covers 3,000 emails/month, 100/day (resend.com/pricing, checked 2026-11-18).
- BotID basic is free on all plans; WAF rate limiting is on all plans, with 1 rate-limit rule per project on Hobby (vercel.com/docs, checked 2026-11-18). Neither needs a database.
- SDK health (2026-11-18): `resend`, `botid`, `@vercel/firewall` all active.

## Rejected
- **Nodemailer + Gmail SMTP**: no new vendor, but needs a Gmail app password stored as a secret with full send rights on Jan's mailbox, and Gmail rewrites or flags reply-to on form mail. Bigger blast radius if the key leaks.
- **Postmark / SendGrid**: fine SDKs, but no advantage at this volume and no Marketplace provisioning; SendGrid's free tier terms change often.
- **In-memory rate limiting**: serverless instances don't share memory, so it limits nothing reliably.
- **Upstash/KV rate limiting**: works, but adds a data store Jan asked to avoid; the WAF rule covers it.

## Update 2026-11-19: BotID removed
BotID's client (`initBotId` in `instrumentation-client.ts`) ran on every page view to protect one form. Spam protection is now the honeypot, the WAF rate-limit rule `contact-form` (active; 5 requests per 60 s window per key) and server-side validation. Re-add BotID (lazy-loaded with the form only) if spam gets through.

## Revisit when
- The site gets a custom domain (then verify it in Resend and send from it instead of the onboarding sender).
- The Hobby WAF rule is needed for something else, or Free-tier limits change.
