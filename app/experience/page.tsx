import ExperienceClient from "./client";
import { getExperience } from "./experiences";
import { getLang } from "../utils/getLang";

export default async function Page() {
  const lang = await getLang();
  const data = await getExperience(lang);
  return <ExperienceClient data={data} />;
}
