/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    domains: [
      "*.googleusercontent.com",
      // TODO: remove testing urls
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
