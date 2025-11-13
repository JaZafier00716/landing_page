import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    imageUrl: "/images/picture.png",
    en: {
      title: "Welcome to my personal page",
      subtitle: "My name is",
      content:
        "Motivated Software developer with a solid background in Web apps development and keen interest in C/C++ engineering.",
      personDetails: {
        name: "Jan Zámostný",
        email: "jan.zamostny04@gmail.com",
        phone: "+420 603 762 712",
        linkedin: "https://www.linkedin.com/in/zamostny-jan",
        github: "https://github.com/JaZafier00716",
        cvLink: "/cv_en.pdf",
        cvLinkText: "Download CV",
      },
    },
    cs: {
      title: "Vítejte na mé osobní stránce",
      subtitle: "Jmenuji se",
      content:
        "Jsem motivovaný Software Developer se silnými základy ve vývoji webových aplikací a programování v C/C++.",
      personDetails: {
        name: "Jan Zámostný",
        email: "jan.zamostny04@gmail.com",
        phone: "+420 603 762 712",
        linkedin: "https://www.linkedin.com/in/zamostny-jan",
        github: "https://github.com/JaZafier00716",
        cvLink: "/cv_cz.pdf",
        cvLinkText: "Stáhnout CV",
      },
    },
  },
];

async function seed() {
  for (const item of data) {
    const { imageUrl, en, cs } = item;

    const enPerson = await prisma.personDetails.findUnique({
      where: { id: 0 },
    });

    const enPersonDetails = await prisma.personDetails.upsert({
      where: { id: enPerson?.id || 0 },
      update: {}, // No updates for existing records
      create: {
        name: en.personDetails.name,
        email: en.personDetails.email,
        phone: en.personDetails.phone,
        linkedin: en.personDetails.linkedin,
        github: en.personDetails.github,
        cvLink: en.personDetails.cvLink,
        cvLinkText: en.personDetails.cvLinkText,
        lang: "en",
      },
    });

    const csPerson = await prisma.personDetails.findUnique({
      where: { id: 0 },
    });

    const csPersonDetails = await prisma.personDetails.upsert({
      where: { id: csPerson?.id || 0 },
      update: {}, // No updates for existing records
      create: {
        name: cs.personDetails.name,
        email: cs.personDetails.email,
        phone: cs.personDetails.phone,
        linkedin: cs.personDetails.linkedin,
        github: cs.personDetails.github,
        cvLink: cs.personDetails.cvLink,
        cvLinkText: cs.personDetails.cvLinkText,
        lang: "cs",
      },
    });

    const homePageContent = await prisma.homePageContent.create({
      data: {
        imageUrl,
        translations: {
          create: [
            {
              lang: "en",
              title: en.title,
              subtitle: en.subtitle,
              content: en.content,
              personDetailsId: enPersonDetails.id,
            },
            {
              lang: "cs",
              title: cs.title,
              subtitle: cs.subtitle,
              content: cs.content,
              personDetailsId: csPersonDetails.id,
            },
          ],
        },
      },
    });

    console.log(`Seeded home page content with ID: ${homePageContent.id}`);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
