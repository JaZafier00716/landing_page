import { getLang } from "./utils/getLang";
import PageClient from "./client";
import { getHomePageData } from "./home";

const Page = async () => {
  const lang = await getLang();
  const data = await getHomePageData(lang);

  return <PageClient data={data} />;
};

export default Page;
