import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",
  target: "server",
  head: {
    titleTemplate: 'Școala Gimnazială "Balaskó Nándor" Sălacea',
    title: 'Școala Gimnazială "Balaskó Nándor" Sălacea',
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: [],
  plugins: ["~/plugins/firebase.js"],
  components: true,
  buildModules: ["@nuxtjs/vuetify"],
  modules: [],
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#708D81'
        }
      }
    }
  },
  build: {}
};
