export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Image Picker',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
    enterActiveClass: 'animate__animated animate__fadeInDown',
    leaveActiveClass: 'animate__animated animate__fadeOutUp'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.scss',
    'animate.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/pixabay.js', mode: 'client' },
    { src: '~/plugins/pexels.js', mode: 'client' },
    { src: '~/plugins/unsplash.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://google-fonts.nuxtjs.org/setup
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: '~/plugins/vuetify.js'
  },

  // Google Fonts module configuration: https://google-fonts.nuxtjs.org/options
  googleFonts: {
    families: {
      'Dancing Script': true
    }
  }
}
