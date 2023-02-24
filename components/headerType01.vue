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
                        <a href="#" class="link" @click.prevent="toMain">
                            <div class="img-wrap">
                                <img src="/images/home-big.png" alt="" class="filter-white" style="width:30px;">
                            </div>

                            <h3 class="title">홈</h3>
                        </a>

                        <a href="#" class="link" @click.prevent="toDistrict($auth.user.district)">
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


                <!-- TODO 230214 주석처리 -->
                <!-- <div class="content">
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
                </div> -->


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
                        <a href="https://www.ihappynanum.com/Nanum/api/CBX2XAPYAF" class="util primary" target="_blank">후원하기</a>
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
                    <!-- <button :class="`btn-select ${(district && district.id == 0) || !district ? 'point' : ''}`" @click="active = true;">
                        {{ district.id == 0 ? "자유마을" : district.district }}

                        <img src="/images/chevron-down.png" style="width:10px;" alt="" class="deco">
                    </button> -->
                    <button class="btn-select point" @click="active = !active">
                        {{ district.id == 0 ? "자유마을" : district.district }}

                        <img src="/images/chevron-down.png" style="width:10px;" alt="" class="deco">

                        <div class="box-links" v-if="active">
                            <a href="#" :class="`link ${district.id == 0 ? 'active' : ''}`" @click.prevent="toMain">자유마을 홈</a>
                            <a href="#" :class="`link ${$auth.user.district.id == district.id ? 'active' : ''}`" @click.prevent="toDistrict($auth.user.district)" v-if="$auth.user">{{$auth.user.district.district}}</a>
                            <template  v-if="$auth.user">
                                <a href="#" :class="`link ${district.id == myDistrict.district.id ? 'active' : ''}`" v-for="myDistrict in $auth.user.my_districts" :key="myDistrict.district.id" @click.prevent="toDistrict(myDistrict.district)">{{myDistrict.district.district}}</a>
                            </template>
                            <nuxt-link to="/myDistricts" class="link">동네 설정하기</nuxt-link>
                        </div>
                    </button>
                </div>

                <div class="utils">
                    <button class="btn-util">
                        <img src="/images/search.png" style="width:18px;" alt="">
                    </button>
                    <button class="btn-util" @click="$router.push('/notices')">
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

        toDistrict(district){
            if(!this.$auth.user)
                return this.$router.push("/auth/login");

            this.$store.commit("changeDistrict", district);

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
        },

    },

    computed: {
        district(){
            return this.$store.state.district;
        }
    },

    mounted() {
        console.log('mounted',this.$auth.user.district)
    }
}
</script>
<style scoped>

.bottom > .utils:nth-child(2) {
    background-color: #fff !important;
    padding-bottom: 5px;
}

.bottom > .utils:nth-child(3) {
    padding-bottom: 40px;
}
</style>
