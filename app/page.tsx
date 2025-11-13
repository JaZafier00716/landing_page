import { getLang } from "./utils/getLang";
import PageClient from "./client";

const Page = () => {
  const lang = getLang();

  return <PageClient lang={lang} />;
};

export default Page;
