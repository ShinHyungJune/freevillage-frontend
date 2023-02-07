import colors from 'vuetify/es5/util/colors'

let baseUrl = process.env.NODE_ENV === "production" ? "http://api.jayuvillages.com" : "http://localhost";

export default {
    dev: process.env.NODE_ENV !== 'production',
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - jayuvillage',
        title: 'jayuvillage',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            {src:'//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'},
            {src:'//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=75aa32499180f4887b38e7607514e26f&libraries=services'},
            {src: '//developers.kakao.com/sdk/js/kakao.min.js'},
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {src: '~/plugins/persistedState.js'},
        {src: '~/plugins/vue-infinite-loading.js'},
        {src: '~/plugins/axios.js'},
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
        baseUrl: baseUrl + "/api",
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
                url: baseUrl,
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
