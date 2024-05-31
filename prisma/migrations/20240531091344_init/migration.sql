-- CreateTable
CREATE TABLE "Icon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);

INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("NextJS", "devicon-nextjs-plain", false);
INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("ReactJS", "devicon-react-original", false);
INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("Tailwindcss", "devicon-tailwindcss-original", false);
INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("TypeScript", "devicon-typescript-plain", false);
INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("CSS3", "devicon-css3-plain", false);
INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("HTML5", "devicon-html5-plain", false);
INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("JavaScript", "devicon-nextjs-plain", false);
INSERT INTO TABLE Icon ("title", "class", "active") VALUES ("PHP", "devicon-javascript-plain", false);
