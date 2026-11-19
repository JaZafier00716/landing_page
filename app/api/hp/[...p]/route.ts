import { honeypotResponse } from "@/lib/honeypot";

type Ctx = { params: Promise<{ p: string[] }> };

async function handle(req: Request, ctx: Ctx) {
  const { p } = await ctx.params;
  return honeypotResponse(req, p, { enabled: process.env.HONEYPOT_ENABLED === "1", log: (line) => console.log(line) });
}

export { handle as GET, handle as POST, handle as PUT, handle as DELETE, handle as PATCH, handle as OPTIONS };
