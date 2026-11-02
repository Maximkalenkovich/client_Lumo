import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();

const apiUrl = process.env.API_URL ?? "http://localhost:3009";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${apiUrl}/api/:path*` },
      { source: "/uploads/:path*", destination: `${apiUrl}/uploads/:path*` },
    ];
  },
};

export default nextIntlConfig(config);
