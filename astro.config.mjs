// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "PP Neue Montreal",
      cssVariable: "--font-pp-neue-montreal",
      options: {
        variants: [
          {
            src: ["./src/fonts/PPNeueMontreal-Book.woff2"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
  ],

  adapter: cloudflare(),
});