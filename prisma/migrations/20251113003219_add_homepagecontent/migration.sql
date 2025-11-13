-- CreateTable
CREATE TABLE "HomePageContent" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "HomePageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePageTranslation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "homePageContentId" INTEGER NOT NULL,
    "personDetailsId" INTEGER,

    CONSTRAINT "HomePageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "cvLink" TEXT NOT NULL,

    CONSTRAINT "PersonDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomePageTranslation_homePageContentId_lang_key" ON "HomePageTranslation"("homePageContentId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "PersonDetails_email_key" ON "PersonDetails"("email");

-- AddForeignKey
ALTER TABLE "HomePageTranslation" ADD CONSTRAINT "HomePageTranslation_personDetailsId_fkey" FOREIGN KEY ("personDetailsId") REFERENCES "PersonDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomePageTranslation" ADD CONSTRAINT "HomePageTranslation_homePageContentId_fkey" FOREIGN KEY ("homePageContentId") REFERENCES "HomePageContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
