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
    methods: {},

    mounted() {
        this.$auth.setUser(null);

        this.$store.commit("changeDistrict", {
            id: 0,
            district: "자유마을"
        });

        this.$auth.logout();
    }
}
</script>

<style scoped>

</style>
