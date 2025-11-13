import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const experiences = [
  {
    sortOrder: 1,
    company: "SHOWMORE s.r.o.",
    en: {
      time: "june 2024 - october 2024",
      position: "Frontend Web Apps Developer",
      skills: [
        { id: 0, title: "Developed web applications using NextJS, TypeScript, and Tailwindcss, collaborating with tools like Git, Storybook, Vercel, Sanity, and Figma to enhance user experience and streamline development processes." },
        { id: 1, title: "Contributed significantly to projects for SolidSun and Sype.to, improving user experience and performance." },
        { id: 3, title: "Collaborated effectively with the team, solving complex problems through research and analysis to achieve project goals." },
      ],
    },
    cs: {
      time: "červen 2024 - říjen 2024",
      position: "Vývojář webových stránek",
      skills: [
        { id: 0, title: "Vývoj webových aplikací pomocí NextJS, TypeScriptu a Tailwind CSS." },
        { id: 1, title: "Významný přínos k projektům pro SolidSun a Sype.to, vylepšení user experience a výkonu." },
        { id: 3, title: "Efektivní spolupráce v týmu, řešení složitých problémů prostřednictvím výzkumu a analýzy." },
      ],
    },
  },
  {
    sortOrder: 2,
    company: "Blackfish.co",
    en: {
      time: "2023 - 2024",
      position: "Frontend Web Apps Developer",
      skills: [
        { id: 0, title: "Built web applications using Next.js, TypeScript, and Tailwind CSS, leveraging Git, Storybook, Vercel, Sanity, and Figma for efficient development workflows." },
        { id: 1, title: "Developed major components of web applications for Czechoslovak Group and Skladon, delivering robust, scalable solutions tailored to client needs." },
        { id: 2, title: "Fostered team collaboration, applied problem-solving skills, and conducted research to improve project outcomes and efficiency." },
      ],
    },
    cs: {
      time: "2023 - 2024",
      position: "Vývojář webových stránek",
      skills: [
        { id: 0, title: "Vývoj webových aplikací pomocí Next.js, TypeScriptu a Tailwind CSS." },
        { id: 1, title: "Vývoj hlavních komponent pro Czechoslovak Group a Skladon." },
        { id: 2, title: "Týmová spolupráce, uplatňování schopnosti řešení problémů a provádění výzkumu ke zlepšení výsledků projektů a efektivity." },
      ],
    },
  },
  {
    sortOrder: 3,
    company: "NAM System a.s.",
    en: {
      time: "april 2023 - may 2023",
      position: "Internship",
      skills: [
        { id: 0, title: "Diagnosed and repaired computer hardware for stable performance." },
        { id: 1, title: "Conducted hardware testing and troubleshooting to verify the functionality of electronic components." },
      ]
    },
    cs: {
      time: "duben 2023 - květen 2023",
      position: "Praxe",
      skills: [
        { id: 0, title: "Diagnóza a následná oprava počítačů a testování jejich stability" },
        { id: 1, title: "Testování a troubleshooting pro ověření funkčnosti elektroniky." },
      ]
    }
  },
  {
    sortOrder: 4,
    company: "React - The Complete Guide 2024",
    en: {
      time: "70 hodin - 2023",
      position: "Udemy - Web development course",
      skills: [
        { id: 0, title: "Front-end" },
        { id: 1, title: "NextJS" },
        { id: 2, title: "ReactJS" },
        { id: 3, title: "TypeScript" },
      ],
    },
    cs: {
      time: "70 hodin - 2023",
      position: "Udemy - Web development kurz",
      skills: [
        { id: 0, title: "Front-end" },
        { id: 1, title: "NextJS" },
        { id: 2, title: "ReactJS" },
        { id: 3, title: "TypeScript" },
      ],
    },
  },
];

async function main() {
  await prisma.experienceTranslation.deleteMany();
  await prisma.experience.deleteMany();

  for (const e of experiences) {
    await prisma.experience.create({
      data: {
        company: e.company,
        sortOrder: e.sortOrder,
        translations: {
          create: [
            { lang: "en", time: e.en.time, position: e.en.position, skills: JSON.stringify(e.en.skills) },
            { lang: "cs", time: e.cs.time, position: e.cs.position, skills: JSON.stringify(e.cs.skills) },
          ],
        },
      },
    });
  }
  console.log("Experience seed completed.");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });