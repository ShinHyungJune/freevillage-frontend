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

        console.log(this.$auth.user);
        this.$store.commit("changeDistrict", {
            id: 0,
            district: "자유마을"
        });

        console.log(123);

        this.$auth.logout();
    }
}
</script>

<style scoped>

</style>
