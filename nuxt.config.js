export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
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
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    { src: "./static/fonts/iconfont.css" }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~plugins/vue-resource",
    "@/plugins/element-ui",
    '@/plugins/axios-plugin',
    { src: "~/plugins/localStorage", ssr: false },
    // ssr=false只在客户端引入
    // https://www.jianshu.com/p/eb83b8d189bb
    { src: "~/plugins/routeguard", ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/proxy", //添加proxy模块

    // Simple usage
    "cookie-universal-nuxt",

    // With options
    ["cookie-universal-nuxt", { alias: "cookiz" }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    //是否允许跨域
    proxy: true,
    // browserBaseURL: "http://localhost:8080",
    browserBaseURL: "http://47.115.117.97:8080",
    withCredentials: true,
  },
  proxy: {
    "/api": {
      // target: "http://localhost:8080/",
      target: "http://47.115.117.97:8080/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/"
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
