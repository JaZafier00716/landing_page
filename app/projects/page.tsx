import ProjectsClient from "./client";
import { getProjects } from "./projects";
import { getLang } from "../utils/getLang";

export default async function Page() {
  const lang = await getLang();
  const data = await getProjects(lang);
  const emptyMessage = lang === "cs" ? "Zadne projekty zatim nejsou." : "No projects yet.";

  return <ProjectsClient data={data} emptyMessage={emptyMessage} />;
}

