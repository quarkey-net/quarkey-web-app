export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'quarkey-web-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    routes: [
      {
        path: '/authentication',
        components: 'pages/Authentication.vue',
        name: 'Authentication',
        children: [
          {
            path: '/mainPanel',
            components: 'pages/mainPanel.vue',
            name: 'mainPanel'
          }
        ]
      }
    ]
  },

  server: {
    host: '127.0.0.1',
    port: 3000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/toast',
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://quarkey.net/api',
    credentials: true,
    init (axios) {
      axios.defaults.withCredentials = true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_module/,
        type: 'javascript/auto'
      })
    }
  }
}
