-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "kind" TEXT NOT NULL DEFAULT 'work',
ADD COLUMN     "related" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "stack" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "ExperienceTranslation" ADD COLUMN     "bullets" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT,
    "sourceUrl" TEXT,
    "liveUrl" TEXT,
    "stack" TEXT[],
    "language" TEXT,
    "libraries" TEXT,
    "platform" TEXT,
    "client" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTranslation" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT[],
    "role" TEXT,
    "thumbnailAlt" TEXT,

    CONSTRAINT "ProjectTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillGroup" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "titleEn" TEXT NOT NULL,
    "titleCs" TEXT NOT NULL,

    CONSTRAINT "SkillGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "nameEn" TEXT NOT NULL,
    "nameCs" TEXT NOT NULL,
    "usedIn" TEXT[],

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_projectId_lang_key" ON "ProjectTranslation"("projectId", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "SkillGroup_key_key" ON "SkillGroup"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_groupId_nameEn_key" ON "Skill"("groupId", "nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");

-- AddForeignKey
ALTER TABLE "ProjectTranslation" ADD CONSTRAINT "ProjectTranslation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "SkillGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

