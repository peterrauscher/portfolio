import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.gr-assets.com" },
      { protocol: "https", hostname: "images.gr-assets.com" },
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    const longCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        // Images + fonts under public/
        source:
          "/:path*.:ext(png|jpg|jpeg|webp|avif|gif|svg|ico|woff|woff2|ttf|otf)",
        headers: longCache,
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
