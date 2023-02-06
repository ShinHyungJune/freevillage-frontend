<template>
    <div>
        <!-- 나의 마을 찾기 팝업 -->
        <div class="m-pop type01" id="pop1" v-if="active">
            <div class="m-pop-inner">
                <button class="btn-close m-script-pop" data-target="#pop1" @click="active = false">
                    <img src="/images/x.png" alt="" style="width:21px;">
                </button>

                <div class="m-pop-title">
                    <p class="subtitle">소속된 마을을 찾을 수 있어요.</p>
                    나의 <span class="point">마을 찾기</span>
                </div>

                <div class="m-input-select type01">
                    <select name="" id="">
                        <option value="">시/도 선택</option>
                    </select>
                </div>
                <div class="mt-8"></div>
                <div class="m-input-select type01">
                    <select name="" id="">
                        <option value="">시/군/구 선택</option>
                    </select>
                </div>
                <div class="mt-8"></div>
                <div class="m-input-select type01">
                    <select name="" id="">
                        <option value="">읍/면/동 선택</option>
                    </select>
                </div>

                <div class="mt-20"></div>

                <button type="button" class="m-btn type03 width-100">검색하기</button>
            </div>
        </div>

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

                        <nuxt-link to="/" class="link">
                            <div class="img-wrap">
                                <img src="/images/circleMen.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">내 마을</h3>
                        </nuxt-link>

                        <a href="#" class="link">
                            <div class="img-wrap">
                                <img src="/images/notice.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">공지</h3>
                        </a>
                    </div>
                </div>

                <div class="content">
                    <div class="menus-wrap">
                        <div class="menus">
                            <div class="menu-wrap">
                                <a href="" class="menu">
                                    <img src="/images/news01.png" alt="" class="">

                                    <h3 class="title">마을소식</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="" class="menu">
                                    <img src="/images/news02.png" alt="" class="">

                                    <h3 class="title">마을영상</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="" class="menu">
                                    <img src="/images/news03.png" alt="" class="">

                                    <h3 class="title">마을포토</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="" class="menu">
                                    <img src="/images/news04.png" alt="" class="">

                                    <h3 class="title">마을질문</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <nuxt-link to="/meetings" class="menu">
                                    <img src="/images/news05.png" alt="" class="">

                                    <h3 class="title">마을모임</h3>
                                </nuxt-link>
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
                    <button :class="`btn-select ${(district && district.id == 0) || !district ? 'point' : ''}`" @click="active = true;">
                        {{ district ? district.district : "지역마을" }}

                        <img src="/images/chevron-down.png" alt="" class="deco">
                    </button>
                </div>

                <div class="utils">
                    <button class="btn-util">
                        <img src="/images/search.png" alt="">
                    </button>
                    <button class="btn-util">
                        <img src="/images/bell.png" alt="">
                    </button>
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
            active: false,
            activeSidebar: false,
        }
    },
    computed: {
        district(){
            return this.$store.state.district;
        }
    },

    mounted() {
    }
}
</script>
