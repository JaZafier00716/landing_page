import { getSkillsCategories } from "./skills";
import SkillsClient from "./client";
import { getLang } from "../utils/getLang";

export default async function Page() {
  try {
    const lang = getLang();
    const data = await getSkillsCategories(lang);
    return <SkillsClient data={data} />;
  } catch (e) {
    console.error("Skills page error:", e);
    return <div>Error loading skills. Please try again later.</div>;
  }
}