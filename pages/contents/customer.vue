<template>
    <div class="area-customer">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util">
                        <img src="/images/back.png" alt="" style="width:10px;" @click="$router.back()">
                    </button>
                </div>

                <div class="center">
                    <h3 class="title">고객센터</h3>
                </div>

                <div class="right"></div>
            </div>
        </div>

        <div class="container">
            <div class="wrap">
                <p class="body">
                    문의는 아래 번호로 연락주시길 바랍니다.
                    문의 게시판은 곧 출시될 예정입니다.
                    감사합니다.
                </p>

                <h3 class="title">
                    고객센터 : 1544-7166
                </h3>

                <a href="tel:1544-7166" class="m-btn type03">
                    <i class="xi-call"></i>
                    전화하기
                </a>
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
