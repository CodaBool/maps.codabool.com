/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.0.16', 'localhost'],
  images: {
    qualities: [25, 40, 75],
  },
}

module.exports = nextConfig
