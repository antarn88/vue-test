import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  devtools: { enabled: true },
  css: ["@/assets/main.scss"],
  plugins: [
    { src: "~/plugins/bootstrap.js", mode: "client" },
    { src: "~/plugins/toast.js", mode: "client" },
  ],
  hooks: {
    "pages:extend"(pages) {
      function setMiddleware(pages: NuxtPage[]) {
        if (process.server) return;
        for (const page of pages) {
          page.meta ||= {};

          if (page.path !== "/login") {
            page.meta.middleware = ["auth"];
          }

          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }
      setMiddleware(pages);
    },
  },
});
