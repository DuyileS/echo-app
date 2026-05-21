/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  experimental: {
    turbo: {
      root: "../../",
    },
  },
}

export default nextConfig
