import { cookies } from "next/headers";

export async function getLang(): Promise<"en" | "cs"> {
  const cookieStore = await cookies();
  return (cookieStore.get("lang")?.value as "en" | "cs") ?? "en";
}
