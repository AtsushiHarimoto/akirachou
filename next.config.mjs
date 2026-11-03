/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/akirachou' : '',
  images: { unoptimized: true },
  trailingSlash: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
