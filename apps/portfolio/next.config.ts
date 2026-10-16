import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/matovu-farid/Pearl-of-Africa-tour/main/assets/screenshot.png" },
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/matovu-farid/case-dashboard/develop/app_screenshot.png" },
    ],
  },
};

export default nextConfig;
