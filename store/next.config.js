/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.creainc.us", "i.ibb.co"],
  },
  env: {
    API_HOST: "http://localhost:3001",
  },
};

module.exports = nextConfig;
