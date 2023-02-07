<template>
    <div class="area-about">
        <!-- 헤더영역 -->
        <header-type01/>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title">10대 강령</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/contents/about" class="m-tab">
                        <span class="text">자유마을이란?</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contents/declares" class="m-tab active">
                        <span class="text">10대 강령</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contents/greeting" class="m-tab">
                        <span class="text">총재 인사말</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <section class="section-content">
                <div class="wrap">
                    <div class="m-histories type01">
                        <div class="history">
                            <h3 class="title">첫 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 이승만 대통령이 제시한
                                    대한민국 4대 건국기둥(자유민주주의,
                                    자유시장경제, 한미동맹, 기독교입국론)에
                                    토대를 둔다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">두 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 '한강의 기적'을 낳은 박정희 대통령
                                    의 개발정신과 반공정신 등 국민정신혁명을
                                    계승하여 흐트러진 정신문화를 혁명적으로
                                    바꾼다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">세 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 전국 읍면동에 자발적으로 살아
                                    움직이고, 질서 있는 대한민국세력의 마을
                                    조직을 구축함으로써 마을과 대한민국의
                                    자유민주주의체제를 공고히 한다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">네 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 대한민국의 역사와 인물에 덧씌워진
                                    프레임을 당당히 걷어내며 자랑스런
                                    대한민국의 정체성과 역사를 재정립한다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">다섯 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 정교분리, 새의 양날개론 등 잘못된
                                    정치족쇄 프레임을 완전히 걷어내고,
                                    적극적인 정치참여로 새로운 대한민국을
                                    만드는 주역이 된다.
                                </p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">여섯 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 진보, 민주, 평화, 인권, 마을공동체,
                                    주민자치 등 거짓포장으로 국민을 속이는
                                    주사파세력의 양의 탈을 벗어내 그 실체를
                                    주민들에게 알리고, 주민자치회, 마을공동체
                                    등 좌파 서식지를 없앤다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">일곱 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 자유마을훈련소를 통해 마을리더들
                                    을 체계적으로 훈련시킨 후 모든 마을주민들
                                    을 깨우고 일으키는 마을활동을 하고,
                                    나아가 대한민국을 재건할 사회 및 정치
                                    리더로 성장시킨다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">여덟 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 진실, 정의에 입각한 신뢰, 공경,
                                    배려 정신으로 훈훈한 자유마을문화를
                                    만들어 누구나 참여하고 싶도록 하고,
                                    회원들이 동참하는 경제생태계를 만들어
                                    지속적인 마을운동이 가능하게 한다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">아홉 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 정치적 승리를 통해 주사파 척결,
                                    악법 폐지로 적화통일을 막고, 나아가
                                    자유통일을 이루어 북한주민을 해방하고
                                    폭발적 경제성장으로 중국을 뛰어넘어
                                    세계 G2국가로 우뚝 선다.</p>
                            </div>
                        </div>

                        <div class="history">
                            <h3 class="title">열 번째</h3>
                            <div class="bodies">
                                <p class="body">우리는 자유마을의 성공모델을 만들어 전
                                    세계에 전파함으로써 네오막시즘(동성애 등)
                                    등 변종공산주의로 죽어가는 나라들에
                                    전파하여 세계 자유민주주의 부활에
                                    기여한다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <img src="/images/about-bg.png" alt="" class="deco-about">
                </div>
            </section>
        </div>

        <quicks />

        <!-- 하단 네비게이션바 -->
        <navigation/>
    </div>
</template>

<script>

export default {
    components: {},
    auth: false,
    data() {
        return {}
    },
    methods: {},

    mounted() {

    }
}
</script>

<style scoped>

</style>
