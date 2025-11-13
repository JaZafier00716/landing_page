import { cookies } from "next/headers";

export function getLang(): "en" | "cs" {
  return (cookies().get("lang")?.value as "en" | "cs") ?? "en";
}
