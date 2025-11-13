import { getLang } from "../utils/getLang";
import { getSkillsCategories } from "./skills";
import SkillsClient from "./client";

export default async function Page() {
  const lang = await getLang();
  const skillsCategories = await getSkillsCategories(lang); // server-side

  return <SkillsClient data={skillsCategories} />;
}