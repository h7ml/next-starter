let withBundleAnalyzer = (config) => config

if (process.env.ANALYZE === "true") {
  try {
    const { default: bundleAnalyzer } = await import("@next/bundle-analyzer")
    withBundleAnalyzer = bundleAnalyzer({ enabled: true })
  } catch (error) {
    console.warn(
      "Missing @next/bundle-analyzer. Install it to enable bundle analysis.",
      error,
    )
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error"],
          }
        : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
}

export default withBundleAnalyzer(nextConfig)
