import { getLang } from "../utils/getLang";
import { getSkillsCategories } from "./skills";
import SkillsClient from "./client";

export default async function Page() {
  const lang = getLang();
  const skillsCategories = await getSkillsCategories(lang); // server-side
  const categories = skillsCategories.map((category) => ({
    ...category,
    title: category.name.charAt(0).toUpperCase() + category.name.slice(1), // Example title generation
  }));

  return <SkillsClient data={categories} />;
}