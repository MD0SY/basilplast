import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { legacyDestination, legacyPaths } from "./src/content/legacy-paths";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return legacyPaths.flatMap((path) => {
      const destination = legacyDestination(path);
      return [
        { source: path, destination, permanent: true },
        { source: `${path}/`, destination, permanent: true },
      ];
    });
  },
};

export default withNextIntl(nextConfig);
