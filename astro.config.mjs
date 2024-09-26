import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import simpleStackForm from "simple-stack-form";
import clerk from "@clerk/astro";

// Log Clerk keys (remove these lines in production)
console.log(
  "PUBLIC_CLERK_PUBLISHABLE_KEY:",
  import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY
);
console.log(
  "CLERK_SECRET_KEY:",
  import.meta.env.CLERK_SECRET_KEY ? "Set" : "Not set"
);
console.log(
  "Publishable Key Length:",
  import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY?.length
);
console.log(
  "Publishable Key Prefix:",
  import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 8)
);

// https://astro.build/config
export default defineConfig({
  site: "https://astro-nomy.vercel.app",
  studio: {
    enabled: false,
  },
  integrations: [
    react(),
    clerk({
      publishableKey: "pk_test_your_actual_key_here",
      secretKey: "sk_test_your_actual_secret_key_here",
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
      envPrefix: ["PUBLIC_", "CLERK_"],
    },
    ssr: {
      noExternal: ["@clerk/clerk-react"],
    },
    define: {
      "import.meta.env.PUBLIC_SUPABASE_URL": JSON.stringify(
        process.env.PUBLIC_SUPABASE_URL
      ),
      "import.meta.env.PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(
        process.env.PUBLIC_SUPABASE_ANON_KEY
      ),
    },
  },
});
