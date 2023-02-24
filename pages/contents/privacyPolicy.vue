<template>
    <div class="area-policy">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util">
                        <img src="/images/back.png" alt="" style="width:10px;" @click="$router.back()">
                    </button>
                </div>

                <div class="center">
                    <h3 class="title">개인정보처리방침</h3>
                </div>

                <div class="right"></div>
            </div>
        </div>

        <div class="container">
            <div class="wrap">
                <div class="mt-20"></div>
                <div class="box-policy">
                    <p class="body">제 1 조 (목적)
                        * 수집목적: 개인식별, 서비스 이용을 위한 연락처
                        * 필수항목: 이름, 아이디, 비밀번호, 성별, 생년월일, 주소, 국가, 연락처
                        * 보유기간: 회원탈퇴시 즉시 파기</p>
                </div>
            </div>
        </div>


        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>
</template>

<script>

export default {
    components: {},
    auth: false,
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
