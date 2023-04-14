// /**
//  * @type {import('next').NextConfig}
//  */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'picsum.photos', 'via.placeholder.com'],
  },
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

// export default nextConfig;

module.exports = nextConfig;
