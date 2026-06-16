/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // Static export cannot use the Next.js image optimization server,
    // so images are served unoptimized. Source files should be pre-sized.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
