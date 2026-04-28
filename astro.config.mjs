// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
});
