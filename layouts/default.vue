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
    watch: {
        $route(to, from) {
            window.scrollTo(0,0);

            if(this.$auth.user && this.$auth.user.id)
                this.$axios.get("/users/hasNewNotice")
                    .then(response => {
                       this.$auth.setUser({
                           ...this.$auth.user,
                           has_new_notice: response.data.data
                       });
                    });

            if(this.$auth.user && !this.$auth.user.id)
                this.$auth.setUser(null);
        },
    },
  methods: {
    async logout() {
        this.$store.commit("changeDistrict", {
            id: 0,
            district: "자유마을"
        });
        await this.$auth.logout();
    },
  },
  mounted() {
      Kakao.init('75aa32499180f4887b38e7607514e26f');
  }
}
</script>
