/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  nextConfig,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};
