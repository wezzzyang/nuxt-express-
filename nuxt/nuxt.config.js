export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
   target: "server",
  head: {
    title: "高校教学资料管理系统",
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
  /**
    middleware
   */
  router: {
    middleware: 'edit'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css",
  "assets/main.css",
  'ant-design-vue/dist/antd.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/element-ui"},
     {src: '@/plugins/antd-ui'}
  ],
  /*
   ** Nuxt.js dev-modules
   */
  // buildModules: ["@nuxt/typescript-build"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: "/api",
    credentials: true
  },
  proxy: {
    // "/api": {
    //   target: "http://jutakuyatest.free.idcfengye.com/",
    //   changeOrigin: true,
    //   parhRewrite: {
    //     "^/api": "/"
    //   }
    // },
    // "/api": {
    //   target: "https://mock.yonyoucloud.com/mock/9868/",
    //   changeOrigin: true,
    //   parhRewrite: {
    //     "^/api": "/"
    //   },
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        parhRewrite: {
          "^/api": "/"
        }
      },
      // "/api": {
      //   target: "http://jutakuyatest.free.idcfengye.com/",
      //   changeOrigin: true,
      //   parhRewrite: {
      //     "^/api": "/"
      //   }
      // }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    vendor: ["axios"]
  }
};
