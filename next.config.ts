import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['bcryptjs'],
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
        "*.githubpreview.dev"
      ]
    }
  }
};

export default nextConfig;
