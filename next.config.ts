import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Đảm bảo các file content/*.json được đóng gói cùng serverless function khi deploy
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
};

export default nextConfig;
