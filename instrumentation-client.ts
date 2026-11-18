import { initBotId } from "botid/client/core";

// Server Actions POST to the page they are rendered on; the contact form lives on the two home pages.
initBotId({
  protect: [
    { path: "/en", method: "POST" },
    { path: "/cs", method: "POST" },
  ],
});
