import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    // Static export can't resize on request, so lib/imageLoader.ts points each
    // srcset width at a variant pre-built by scripts/optimize-images.mjs.
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [128, 256, 384],
  },
  trailingSlash: true,
  // Frozen at build time so the season label, "menu updated" date, and the
  // upcoming-events filter render identically on the server and the client.
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
};

export default withBundleAnalyzer(nextConfig);
