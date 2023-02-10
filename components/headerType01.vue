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

                <input-region @change="(data) => {form.district = data.district}"  />

                <div class="mt-20"></div>

                <button type="button" class="m-btn type03 width-100" @click="search">검색하기</button>
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
                        <a href="#" class="link" @click.prevent="toMain">
                            <div class="img-wrap">
                                <img src="/images/home-big.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">홈</h3>
                        </a>

                        <a href="#" class="link" @click.prevent="toDistrict">
                            <div class="img-wrap">
                                <img src="/images/circleMen.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">내 마을</h3>
                        </a>

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
                                    <img src="/images/news01.png" style="width:60px" alt="" class="">

                                    <h3 class="title">마을소식</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=clips" class="menu">
                                    <img src="/images/news02.png" style="width:60px" alt="" class="">

                                    <h3 class="title">마을영상</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=photos" class="menu">
                                    <img src="/images/news03.png" style="width:60px" alt="" class="">

                                    <h3 class="title">마을포토</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=asks" class="menu">
                                    <img src="/images/news04.png" style="width:60px" alt="" class="">

                                    <h3 class="title">마을질문</h3>
                                </a>
                            </div>

                            <div class="menu-wrap">
                                <a href="/posts?board=meetings" class="menu">
                                    <img src="/images/news05.png" style="width:60px" alt="" class="">

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
                    <button :class="`btn-select ${(district && district.id == 0) || !district ? 'point' : ''}`" @click="active = true;">
                        {{ district.id == 0 ? "자유마을" : district.district }}

                        <img src="/images/chevron-down.png" style="width:10px;" alt="" class="deco">
                    </button>
                </div>

                <div class="utils">
                    <button class="btn-util">
                        <img src="/images/search.png" style="width:18px;" alt="">
                    </button>
                    <button class="btn-util">
                        <img src="/images/bell.png" style="width:17px;" alt="">
                    </button>
                    <button class="btn-util" @click="activeSidebar = true">
                        <img src="/images/menu.png" alt="" style='width:18px;'>
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
            form: {
                district: ""
            }
        }
    },

    methods: {
        scrollTop() {
            window.scrollTo(0, 0);
        },

        search() {
            if(this.form.district === "" || this.form.district == undefined) {
                return;
            }
            this.$store.commit("changeDistrict", this.form.district);
            this.$emit("updatePosts", this.district.id);
            this.active = false;

            this.scrollTop();
        },

        toDistrict(){
            if(!this.$auth.user)
                return this.$router.push("/auth/login");

            this.$store.commit("changeDistrict", this.$auth.user.district);

            location.href="/";

            this.activeSidebar = false;
        },

        toMain(){
            this.$store.commit("changeDistrict", {
                id: 0,
                district: "자유마을"
            });

            location.href="/";

            this.activeSidebar = false;
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
