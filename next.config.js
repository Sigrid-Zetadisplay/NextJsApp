/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imghippo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bilder.vinmonopolet.no',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
