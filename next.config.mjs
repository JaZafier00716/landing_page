/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/cv_en.pdf", destination: "/cv/jan-zamostny-cv-en.pdf", permanent: true },
      { source: "/cv_cz.pdf", destination: "/cv/jan-zamostny-cv-cs.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
