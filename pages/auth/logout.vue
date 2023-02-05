<template>

</template>

<script>
import {mapActions} from "vuex";
import Form from '../../utils/Form';

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
