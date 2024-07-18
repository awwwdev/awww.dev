/** @type {import('next').NextConfig} */
// const withMDX = require('@next/mdx')()
// const  {withContentlayer} = require('next-contentlayer');

const nextConfig = {
  // reactStrictMode: true,
  output: "export",
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // domains: ["vancxkbrtcdpbjavbdbx.supabase.co", "ybjwedhfhkfmzpnvheri.supabase.co"],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};


module.exports = nextConfig;
