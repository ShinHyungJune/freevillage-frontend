<template>
    <div class="area-register-success">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <img src="/images/arrowLeft-black.png" alt="" style="width:14px;" @click="$router.back()">
                </div>
                <div class="center">
                    <h3 class="title"></h3>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-center type01">
                <div class="wrap">
                    <h3 class="title">
                        {{ $auth.user.nickname }} 님,
                        <br/>회원가입해주셔서 감사합니다.
                    </h3>

                    <img src="/images/register-success.png" alt="" class="img">

                    <div class="mt-16"></div>

                    <a href="/" class="m-btn type02">시작하기</a>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import InputRegion from "~/components/inputRegion";

export default {
    components: {InputRegion},
    auth: true,
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
