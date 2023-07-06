/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "*.googleusercontent.com",
      // TODO: remove testing urls
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
