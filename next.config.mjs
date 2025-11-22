/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/default",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/trucks/list/:path*", // local path
        destination: "http://165.22.221.105/api/trucks/list/:path*", // external API
      },
    ];
  },
}

export default nextConfig
