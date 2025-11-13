import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    name: "web",
    colNum: 3,
    titles: {
      cs: "Webový Vývoj",
      en: "Web Development",
    },
    items: [
      { id: 0, title: "NextJS", iconClass: "devicon-nextjs-original-wordmark" },
      { id: 1, title: "ReactJS", iconClass: "devicon-react-original" },
      {
        id: 2,
        title: "Tailwindcss",
        iconClass: "devicon-tailwindcss-original",
      },
      { id: 3, title: "TypeScript", iconClass: "devicon-typescript-plain" },
      { id: 4, title: "CSS3", iconClass: "devicon-css3-plain" },
      { id: 5, title: "HTML5", iconClass: "devicon-html5-plain" },
      { id: 6, title: "JavaScript", iconClass: "devicon-javascript-plain" },
      { id: 7, title: "PHP", iconClass: "devicon-php-plain" },
      { id: 8, title: "MySQL", iconClass: "devicon-mysql-plain-wordmark" },
    ],
  },
  {
    name: "programming",
    colNum: 2,
    titles: {
      cs: "Programovací Jazyky",
      en: "Programming Languages",
    },
    items: [
      { id: 0, title: "C", iconClass: "devicon-c-plain" },
      { id: 1, title: "C++", iconClass: "devicon-cplusplus-plain" },
      { id: 2, title: "JAVA", iconClass: "devicon-java-plain" },
      { id: 3, title: "Haskell", iconClass: "devicon-haskell-plain" },
      { id: 4, title: "VHDL" },
      { id: 5, title: "NASM" },
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
      { id: 0, title: "Arch Linux", iconClass: "devicon-archlinux-plain" },
      { id: 1, title: "Debian Linux", iconClass: "devicon-debian-plain" },
      { id: 2, title: "Fedora Linux", iconClass: "devicon-fedora-plain" },
      { id: 3, title: "Linux Mint", iconClass: "devicon-linuxmint-plain" },
      { id: 4, title: "Ubuntu Linux", iconClass: "devicon-ubuntu-plain" },
      { id: 5, title: "Kali Linux", iconClass: "devicon-kalilinux-plain" },
    ],
  },
  {
    name: "languages",
    colNum: 2,
    titles: {
      cs: "Jazyky",
      en: "Languages",
    },
    items: [
      { id: 0, title: "CZE" },
      { id: 1, title: "ENG", subTitle: "C2 (CAE)" },
    ],
  },
];


async function main() {
  await prisma.skillCategoryTranslation.deleteMany();
  await prisma.skillCategory.deleteMany();

  for (const cat of data) {
    await prisma.skillCategory.create({
      data: {
        name: cat.name,
        colNum: cat.colNum,
        items: JSON.stringify(cat.items),
        translations: {
          create: [
            { lang: "en", title: cat.titles.en },
            { lang: "cs", title: cat.titles.cs },
          ],
        },
      },
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


