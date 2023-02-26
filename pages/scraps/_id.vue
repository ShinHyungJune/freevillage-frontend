<template>
    <div class="area-wallets-index">
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-32"></div>

            <div class="wrap">
                <div class="top">
                    <div class="m-thumbnail type02" :style="`background-image:url('${item.user.img.url}')`" v-if="item.user.img"></div>
                    <h3 class="title">{{ item.user.nickname }}</h3>
                </div>

                <div class="mt-20"></div>

                <scrap-items :scrap_id="$route.params.id" board="notices" :edit-mode="false" />

                <scrap-items :scrap_id="$route.params.id" board="clips" :edit-mode="false" />

                <scrap-items :scrap_id="$route.params.id" board="photos" :edit-mode="false" />

                <scrap-items :scrap_id="$route.params.id" board="asks" :edit-mode="false" />

                <scrap-items :scrap_id="$route.params.id" board="meetings" :edit-mode="false" />
            </div>

        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>
</template>

<script>
import KakaoHelper from "@/utils/KakaoHelper";

export default {
    components: {},
    auth: false,
    data() {
        return {
            item: {
                user: {},
            }
        }
    },
    methods: {

    },

    mounted() {
        this.$axios.get("/scraps/" + this.$route.params.id)
            .then(response => {
                this.item = response.data.data;
            });
    }
}
</script>

<style scoped>

</style>
