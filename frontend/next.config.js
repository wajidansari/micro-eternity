/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Helps with 404 errors on Vercel
  images: {
    domains: ['your-image-source.com'], // Add external domains if needed
  },
};

module.exports = nextConfig;
