/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["vancxkbrtcdpbjavbdbx.supabase.co", "ybjwedhfhkfmzpnvheri.supabase.co"],
  },
  i18n,

  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};

module.exports = nextConfig;
