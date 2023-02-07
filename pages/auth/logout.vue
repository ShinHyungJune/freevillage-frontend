<template>

</template>

<script>

export default {
  name: "login",
  auth: true,
  data() {
    return {

      errors: {},
    }
  },
  methods: {

  },

  mounted() {
    this.$auth.logout();
  }
}
</script>

<style scoped>

</style>
