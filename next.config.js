/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    eslint: {
      // Ignoră erorile ESLint în producție
      ignoreDuringBuilds: true,
    }
  };
  
  module.exports = nextConfig;