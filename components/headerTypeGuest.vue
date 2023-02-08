<template>
    <div>
        <!-- 사이드바 -->
        <div class="m-sidebar type01" v-if="activeSidebar">
            <div class="m-sidebar-inner">
                <div class="top">
                    <button class="btn-close" @click="activeSidebar = false">
                        <img src="/images/x-bold.png" alt="" class="filter-white" style="width:14px;">
                    </button>

                    <nuxt-link to="/auth/login" class="btn-login" v-if="!$auth.user">
                        로그인 해주세요
                        <img src="/images/arrowRight.png" alt="" class="filter-white" style="width:10px;">
                    </nuxt-link>
                    <a href="#" class="btn-login" v-else>
                        안녕하세요, {{ $auth.user.name }}님!
                    </a>

                    <div class="links">
                        <nuxt-link to="/" class="link">
                            <div class="img-wrap">
                                <img src="/images/home-big.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">홈</h3>
                        </nuxt-link>

                        <nuxt-link to="/posts" class="link">
                            <div class="img-wrap">
                                <img src="/images/circleMen.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">내 마을</h3>
                        </nuxt-link>

                        <nuxt-link to="/notices" class="link">
                            <div class="img-wrap">
                                <img src="/images/notice.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">공지</h3>
                        </nuxt-link>
                    </div>
                </div>

                <div class="content">
                    <div class="menus-wrap">
                        <div class="menus">
                            <div class="menu-wrap">
                                <a href="/posts?board=notices" class="menu">
                                    <img src="/images/news01.png" alt="" class="">

                                    <h3 class="title">마을소식</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=clips" class="menu">
                                    <img src="/images/news02.png" alt="" class="">

                                    <h3 class="title">마을영상</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=photos" class="menu">
                                    <img src="/images/news03.png" alt="" class="">

                                    <h3 class="title">마을포토</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=asks" class="menu">
                                    <img src="/images/news04.png" alt="" class="">

                                    <h3 class="title">마을질문</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=meetings" class="menu">
                                    <img src="/images/news05.png" alt="" class="">

                                    <h3 class="title">마을모임</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom">
                    <div class="partners">
                        <h3 class="title">제휴사</h3>

                        <div class="links">
                            <a href="https://www.jayupress.com/" target="_blank" class="link">자유일보</a>
                            <a href="http://junacademy.org/" target="_blank" class="link">설교학교</a>
                            <a href="http://khmon.com/" target="_blank" class="link">광화문온</a>
                            <a href="https://wkoreaf.org/" target="_blank" class="link">교민청</a>
                        </div>
                    </div>

                    <div class="utils">
                        <nuxt-link to="/auth/login" class="util primary" v-if="!this.$auth.user">로그인</nuxt-link>
                        <nuxt-link to="/auth/logout" class="util primary" v-else>로그아웃</nuxt-link>
                        <a href="#" class="util">개인약관</a>
                    </div>

                </div>
            </div>
        </div>

        <!-- 헤더영역 -->
        <div class="m-header type01">
            <div class="wrap">
                <div class="selects">
                    <button class="btn-select point">
                        지역마을
                    </button>
                </div>

                <div class="utils">
                    <button class="btn-util" @click="activeSidebar = true">
                        <img src="/images/menu.png" alt="" style='width:17px;'>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            activeSidebar: false,
        }
    },
    computed: {
        district(){

        }
    },

    mounted() {
    }
}
</script>
