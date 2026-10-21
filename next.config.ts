import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse (pdfjs) loads a worker file at runtime; bundling it breaks that,
  // so load it straight from node_modules on the server.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist"],
};

export default nextConfig;
