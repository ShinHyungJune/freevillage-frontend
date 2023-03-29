<template>
    <div class="area-about">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title"><span class="point">자유마을</span>이란?</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/contents/about" class="m-tab active">
                        <span class="text">자유마을이란?</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contents/declares" class="m-tab">
                        <span class="text">10대 강령</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <div class="wrap">
                <div class="m-comment type01">
                    <span class="point">자유통일, 주사파 척결</span>을 위해
                    <br/><span class="point">3500여개</span>의 <span class="point">읍면동에 설치</span>하는
                    <br/><span class="point">대한민국 우파 마을조직</span>입니다.
                </div>
            </div>

            <section class="section-content">
                <div class="wrap">
                    <div class="m-title type01">
                        자유마을 <span class="point">활동 내용</span>
                    </div>

                    <div class="m-histories type01">
                        <div class="history">
                            <h3 class="title">자유마을훈련소 리더 육성 훈련</h3>
                            <div class="bodies">
                                <p class="body">
                                    자유마을훈련소 통해 마을리더들에 대한
                                    집중적인 대한민국 역사 및 국가정체성 교육
                                </p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">좌파조직 마을 장악 저지</h3>
                            <div class="bodies">
                                <p class="body">전국 읍면동을 장악해 가는 좌파마을활동가,
                                    민노총 등 좌파조직의 마을 장악 저지</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">좌파 무력화 활동</h3>
                            <div class="bodies">
                                <p class="body">주민자치회 등 좌파 마을 공동체 입법화
                                    저지 및 무력화 활동</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">올바른 역사 교육 확산</h3>
                            <div class="bodies">
                                <p class="body">주민들에 대한 올바른 대한민국 체제와
                                    역사교육 확산</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">주민 깨우기 운동</h3>
                            <div class="bodies">
                                <p class="body">좌파 마을활동가들의 활동실태에 대한 자료,
                                    소책자 배포, 주민행사 등을 통한
                                    주민깨우기운동 지속</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">법적 대응 활동</h3>
                            <div class="bodies">
                                <p class="body">좌파 마을활동가들의 위법적 악행에 대한
                                    조직적, 법적 대응활동</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">경제 생태계 조성</h3>
                            <div class="bodies">
                                <p class="body">자유마을 참여자들의 경제생태계 조성으로
                                    경제적 이익을 창출, 지속적인 자유마을 활동</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">주민참여활동</h3>
                            <div class="bodies">
                                <p class="body">교회와 기업, 주민들과 함께 건강한
                                    자유마을을 만들기 위한 주민참여 활동
                                    및 이웃돌보기운동</p>
                            </div>
                        </div>
                    </div>

                    <img src="/images/about-bg.png" alt="" class="deco-about">
                </div>
            </section>

        </div>

                    <quicks 
                :createUrl="'/posts/create'"
                :btnName="'글쓰기'"
            />

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
