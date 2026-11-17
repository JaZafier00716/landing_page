import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: ["lib/generated/**"] },
  ...nextCoreWebVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;

