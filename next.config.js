/** @type {import('next').NextConfig} */
// const withMDX = require('@next/mdx')()
// const  {withContentlayer} = require('next-contentlayer');

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   useLightningcss: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};


module.exports = nextConfig;
