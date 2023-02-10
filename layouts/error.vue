<template>
  <v-app dark>
      <div class="error-wrap">
          <div class="error-inner">
              <h1 class="title" v-if="error.statusCode === 404">
                  {{ pageNotFound }}
              </h1>
              <h1 class="title" v-else>
                  {{ otherError }}
              </h1>
              <NuxtLink to="/" class="btn-link">
                  홈으로 이동
              </NuxtLink>
          </div>

      </div>

  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: '' +
          'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.error-wrap {
    display:flex; align-items: center; justify-content: center;
    width:100%; height:calc(100vh - 100px);
    text-align: center;
    background-color:#fff;
}
.error-inner {
    margin-top:0px;
}
.title {
    margin-bottom:24px;
    font-size: 24px; font-weight:bold;
    color:#0BAF00;
}
.btn-link {
    color:#fff; background-color:#0BAF00;
    padding:8px 20px; border-radius:5px;
}
</style>
