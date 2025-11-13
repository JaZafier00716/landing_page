import "server-only";
import { prisma } from "./db";

export type HomePageData = {
  imageUrl: string;
  title: string;
  subtitle: string;
  content: string;
  lang: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  cvLink: string;
  cvLinkText: string; // Added field for CV link text
  personName: string;
};

export async function getHomePageData(
  lang: "en" | "cs" = "en"
): Promise<HomePageData> {
  const row = await prisma.homePageContent.findFirst({
    include: {
      translations: {
        include: {
          personDetails: true,
          homePageContent: true,
        },
      },
    },
    where: {
      translations: {
        some: { lang },
      },
    },
  });

  if (!row) {
    throw new Error("Home page data not found");
  }

  const translation = row.translations.find((t) => t.lang === lang) ?? null;

  return {
    imageUrl: row.imageUrl,
    title: translation?.title || "",
    subtitle: translation?.subtitle || "",
    name: translation?.personDetails?.name || "",
    content: translation?.content || "",
    lang: lang,
    personName: translation?.personDetails?.name || "",
    email: translation?.personDetails?.email || "",
    phone: translation?.personDetails?.phone || "",
    linkedin: translation?.personDetails?.linkedin || "",
    github: translation?.personDetails?.github || "",
    cvLink: translation?.personDetails?.cvLink || "",
    cvLinkText: translation?.personDetails?.cvLinkText || "", // Added field for CV link text
  };
}
