import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    name: "web",
    colNum: 3,
    items: [
      { title: "NextJS", iconClass: "devicon-nextjs-original-wordmark" },
      { title: "ReactJS", iconClass: "devicon-react-original" },
      { title: "Tailwindcss", iconClass: "devicon-tailwindcss-original" },
      { title: "TypeScript", iconClass: "devicon-typescript-plain" },
      { title: "CSS3", iconClass: "devicon-css3-plain" },
      { title: "HTML5", iconClass: "devicon-html5-plain" },
      { title: "JavaScript", iconClass: "devicon-javascript-plain" },
      { title: "PHP", iconClass: "devicon-php-plain" },
      { title: "MySQL", iconClass: "devicon-mysql-plain-wordmark" },
      { title: "Prisma", iconClass: "devicon-prisma-original" },
    ],
    titles: { en: "Web Development", cs: "Webový Vývoj" },
  },
  {
    name: "programming",
    colNum: 2,
    titles: {
      cs: "Programovací Jazyky",
      en: "Programming Languages",
    },
    items: [
      { title: "C", iconClass: "devicon-c-plain" },
      { title: "C++", iconClass: "devicon-cplusplus-plain" },
      { title: "JAVA", iconClass: "devicon-java-plain" },
      { title: "Haskell", iconClass: "devicon-haskell-plain" },
      { title: "VHDL" },
      { title: "NASM" },
    ],
  },
  {
    name: "os",
    colNum: 2,
    titles: {
      cs: "Linux Distribuce",
      en: "Linux Distributions",
    },
    items: [
      { title: "Arch Linux", iconClass: "devicon-archlinux-plain" },
      { title: "Debian Linux", iconClass: "devicon-debian-plain" },
      { title: "Fedora Linux", iconClass: "devicon-fedora-plain" },
      { title: "Linux Mint", iconClass: "devicon-linuxmint-plain" },
      { title: "Ubuntu Linux", iconClass: "devicon-ubuntu-plain" },
      { title: "Kali Linux", iconClass: "devicon-kalilinux-plain" },
    ],
  },
  {
    name: "languages",
    colNum: 2,
    titles: {
      cs: "Jazyky",
      en: "Languages",
    },
    items: [{ title: "CZE" }, { title: "ENG", subTitle: "C2 (CAE)" }],
  },
];

async function main() {
  await prisma.skillCategoryTranslation.deleteMany();
  await prisma.skillsItems.deleteMany();
  await prisma.skillCategory.deleteMany();

  for (const cat of data) {
    await prisma.skillCategory.create({
      data: {
        name: cat.name,
        colNum: cat.colNum,
        items: {
          create: cat.items.map((i) => ({
            title: i.title,
            ...("iconClass" in i && i.iconClass ? { iconClass: i.iconClass } : {}),
            ...("subTitle" in i && i.subTitle ? { subTitle: i.subTitle } : {}),
          })),
        },
        translations: {
          create: [
            { lang: "en", title: cat.titles.en },
            { lang: "cs", title: cat.titles.cs },
          ],
        },
      },
    });
  }
  console.log("Skills seed done");
}

main().finally(() => prisma.$disconnect());
