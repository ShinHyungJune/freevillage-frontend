import colors from 'vuetify/es5/util/colors'

export default {
    target: process.env.NODE_ENV == 'production' ? 'static' : 'server',
    server: {
        port: process.env.PORT, host: process.env.HOST
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - ' + process.env.APP_NAME,
        title: process.env.APP_NAME,
        htmlAttrs: {
            lang: 'kr'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'},
            {property: 'og:image', content: 'https://dotmzh1fysixs.cloudfront.net/1007/KakaoTalk_Photo_2023-02-28-12-12-25.jpeg'},
            {property: 'og:title', content:'자유마을 - 3506개의 희망'},
            {property: 'og:description', content:'대한민국세력은 하나로 함께'},
        ],
        link: [
            {rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css'},
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'apple-touch-icon', type: 'image/x-icon', href: '/images/apple-touch-icon.png'},
            {rel: 'icon', type: 'image/x-icon', href: '/images/android-chrome-192x192.png'},
            {rel: 'icon', type: 'image/x-icon', href: '/images/android-chrome-512x512.png'},
            {rel: 'icon', type: 'image/x-icon', href: '/images/favicon-16x16.png'},
            {rel: 'icon', type: 'image/x-icon', href: '/images/favicon-32x32.png'},
        ],
        script: [
            {src:'//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'},
            {src:'//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=75aa32499180f4887b38e7607514e26f&libraries=services'},
            {src: '//developers.kakao.com/sdk/js/kakao.min.js'},
            {src: '//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'},
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {src: '~/plugins/persistedState.js'},
        {src: '~/plugins/vue-infinite-loading.js'},
        {src: '~/plugins/axios.js'},
        {src: '~/plugins/vue2-touch-events.js'},
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        //'@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],
    axios: {
        baseUrl: process.env.AXIOS_BASE_URL + "/api",
        credentials: true,
    },
    router: {
        middleware: ['auth']
    },
    auth: {
        redirect: {
            login: '/auth/login',
            logout: '/auth/login',
            callback: '/auth/login',
            home: '/'
        },
        strategies: {
            'laravelSanctum': {
                provider: 'laravel/sanctum',
                url: process.env.AXIOS_BASE_URL,
                endpoints: {
                    login: {url: '/api/auth/login'},
                    logout: {url: '/api/auth/logout'}
                }
            }
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
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
                }
            }
        }
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
