-- Additive: optional per-skill note shown instead of "Where used" links.
ALTER TABLE "Skill" ADD COLUMN "detailCs" TEXT,
ADD COLUMN "detailEn" TEXT;
