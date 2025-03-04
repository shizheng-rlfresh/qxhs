import { defineConfig } from "astro/config";
import { CONFIG } from "./src/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import playformCompress from "@playform/compress";

export default defineConfig({
  base: "/",
  site: CONFIG.site_url,
  integrations: [sitemap(), mdx(), playformCompress()],
  markdown: {
    shikiConfig: {
      theme: "material-theme-darker",
      langs: [],
    },
  },
  content: {
    collections: {
      posts: {
        schema: "src/content/config.ts#posts",
      },
      articles: {
        schema: "src/content/config.ts#articles",
      },
      shareables: {
        schema: "src/content/config.ts#shareables",
      },
      educations: {
        schema: "src/content/config.ts#educations",
      },
    },
  },
});
