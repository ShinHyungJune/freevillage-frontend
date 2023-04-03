<template>

</template>

<script>

export default {
    name: "logout",
    auth: true,
    data() {
        return {

            errors: {},
        }
    },
    methods: {},

    mounted() {
        this.$auth.logout();

        this.$auth.setUser(null);

        this.$store.commit("changeDistrict", {
            id: 0,
            district: "자유마을"
        });
    }
}
</script>

<style scoped>

</style>
