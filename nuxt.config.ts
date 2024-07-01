// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  devtools: { enabled: true },
  css: ["@/assets/main.scss"],
  plugins: [{ src: "~/plugins/bootstrap.js", mode: "client" }],
});
