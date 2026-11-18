-- Additive: optional case-study fields per language.
ALTER TABLE "ProjectTranslation" ADD COLUMN     "decision" TEXT,
ADD COLUMN     "next" TEXT,
ADD COLUMN     "result" TEXT;
