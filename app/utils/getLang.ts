import { cookies } from "next/headers";

export async function getLang(): Promise<"en" | "cs"> {
  return ((await cookies()).get("lang")?.value as "en" | "cs") ?? "en";
}
