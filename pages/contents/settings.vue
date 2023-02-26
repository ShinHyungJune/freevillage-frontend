<template>
    <div class="area-mypage">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util">
                        <img src="/images/back.png" alt="" style="width:10px;" @click="$router.back()">
                    </button>
                </div>

                <div class="center">
                    <h3 class="title">내 정보</h3>
                </div>

                <nuxt-link to="/contents/settings" class="btn-util">
                    <img src="/images/setting.png" alt="" style="width:20px;">
                </nuxt-link>
            </div>
        </div>

        <reminder v-if="activeAsk" title="정말로 탈퇴하시겠습니까?" excecute="탈퇴하기" cancel="취소" @excecute="remove" @cancel="activeAsk = false" />

        <div class="container">
            <div class="menus">
                <div class="wrap">
                    <nuxt-link to="/contents/customer" class="menu">
                        <i class="xi-call"></i>
                        <p class="text">고객센터</p>
                    </nuxt-link>

                    <nuxt-link to="/contents/privacyPolicy" class="menu">
                        <i class="xi-bookmark-o"></i>
                        <p class="text">이용약관/개인정보취급방침</p>
                    </nuxt-link>

                    <div class="menu" @click="activeAsk = true" style="cursor:pointer;">
                        <i class="xi-ban"></i>
                        <p class="text">탈퇴하기</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>
</template>

<script>

export default {

    auth: true,
    data() {
        return {
            activeAsk: false,
        }
    },
    methods: {
        store() {

        },

        remove(){
            this.$axios.delete("/users")
                .then(response => {
                    this.$emit("close");
                    this.$auth.setUser(null);
                    this.$store.commit("changeDistrict", {
                        id: 0,
                        district: "자유마을"
                    });
                    this.$auth.logout();
                })
        },
    },

    computed: {

    },

    mounted() {
    },

}
</script>

<style scoped>

</style>
