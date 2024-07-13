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
  env: {
    API_URL: process.env.API_URL ? process.env.API_URL : "http://localhost:3000/api",
    BRAND:
      (process.env.BRAND ? process.env.BRAND : "{unbranded}") +
      (process.env.NODE_ENV !== "production" ? " [dev]" : ""),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  },
  redirects: async () => {
    return [
      {
        source: "/@[username]",
        destination: "/user/[username]",
        permanent: true,
      },
      {
        source: "/u/[username]",
        destination: "/user/[username]",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
