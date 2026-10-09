import { execSync } from "node:child_process";
import type { NextConfig } from "next";

// "Last updated" in the ticker: the latest commit's date, fixed at build time (hourly
// revalidation must not move it). Falls back to the build time when git is unavailable.
function lastUpdated() {
  try {
    return execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
  } catch {
    return new Date().toISOString();
  }
}

const nextConfig: NextConfig = {
  env: { SITE_UPDATED: lastUpdated() },
};

export default nextConfig;
