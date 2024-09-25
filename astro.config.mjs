import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import simpleStackForm from "simple-stack-form";
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-nomy.vercel.app",
  studio: {
    enabled: true,
  },
  integrations: [
    react({
      include: ["**/react/*"],
    }),
    clerk({
      publishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark-dimmed",
      },
      gfm: true,
    }),
    icon(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    db(),
    simpleStackForm(),
  ],
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    ssr: {
      noExternal: ["@clerk/clerk-react"],
    },
  },
  // experimental: {
  //   contentCollections: true,
  // },
});
