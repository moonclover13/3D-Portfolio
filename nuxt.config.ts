// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Mufliha Rihadini | 3D Medical Illustrator & XR Developer",
      meta: [{ name: "description", content: "Mufliha Rihadini Portfolio Website" }],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  build: {
    transpile: ["troisjs"],
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  css: ["~/assets/css/main.css"],
});
