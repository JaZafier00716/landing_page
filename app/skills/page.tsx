import { getSkillsCategories } from "./skills";
import SkillsClient from "./client";
import { getLang } from "../utils/getLang";

export default async function Page() {
  const lang = await getLang();
  const data = await getSkillsCategories(lang);

  return <SkillsClient data={data} />;
}