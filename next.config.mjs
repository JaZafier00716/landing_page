/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/cv_en.pdf", destination: "/cv/jan-zamostny-cv-en.pdf", permanent: true },
      { source: "/cv_cz.pdf", destination: "/cv/jan-zamostny-cv-cs.pdf", permanent: true },
      // Old site slugs that only existed for Czech project names. Slugs shared with English
      // (tetris, csg-website, ...) still exist and go through proxy.ts language detection.
      { source: "/projects/modalni-textovy-editor", destination: "/cs/projects/modal-text-editor", permanent: true },
      { source: "/projects/csg-web", destination: "/cs/projects/csg-website", permanent: true },
      { source: "/projects/skladon-web", destination: "/cs/projects", permanent: true },
    ];
  },
};

export default nextConfig;
