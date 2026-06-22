import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["pdf-parse"],
  allowedDevOrigins: ["192.168.1.2"],
};

export default nextConfig;
