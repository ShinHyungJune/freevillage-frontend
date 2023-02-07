<template>
  <div id="app">
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [

        ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      // title: 'Vuetify.js'
    }
  },
  head: {
      link: [
        {rel: 'stylesheet', type: 'text/css', href: '/css/common.css'},
        {rel: 'stylesheet', type: 'text/css', href: '/css/style.css'},
        {rel: 'stylesheet', type: 'text/css', href: '/css/style.css'},
      ],
      script: [
      ]
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  },
  mounted() {
      Kakao.init('75aa32499180f4887b38e7607514e26f');

  }
}
</script>
