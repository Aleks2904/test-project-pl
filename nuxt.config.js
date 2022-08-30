export default {
  target: 'server',

  head: {
    title: 'test-project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { httpEquiv: 'Content-Security-Policy',  content: 'upgrade-insecure-requests' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],
  styleResources: {
    scss: [
      '~assets/css/main.scss',
    ]
  },

  plugins: [
    {
      src: '~/plugins/deviceType.js',
      mode: 'client'
    },
  ],

  loading: false,

  components: true,

  buildModules: [
    '@nuxtjs/style-resources',
  ],

  modules: [
    '@nuxtjs/axios',
    'portal-vue/nuxt',
  ],

  // axios: {
  //   baseURL:  process.env.BROWSER_BASE_URL,
  //   proxyHeaders: false,
  // },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL
  //   },
  //   BROWSER_BASE_URL: process.env.BROWSER_BASE_URL
  // },

  privateRuntimeConfig: {
    // axios: {
    //   baseURL: process.env.BASE_URL
    // }
  },

  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },

  cache: false,
}
