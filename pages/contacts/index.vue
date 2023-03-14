<template>
    <div class="area-region-activity">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title">{{this.$store.state.district.district}} 마을활동</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/infos" class="m-tab">
                        <span class="text">{{this.$store.state.district.district}} 소개</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/staffs" class="m-tab">
                        <span class="text">임원진</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contacts" class="m-tab active">
                        <span class="text">마을활동</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <section class="section-content">
                <div class="wrap">
                    <div class="m-empty type01" v-if="!item">준비중입니다.</div>

                    <section class="section-content" v-if="item">
                        <div class="wrap">
                            <div class="img-wrap">
                                <img src="/images/people.png" alt="">
                            </div>

                            <div class="box-name">
                                <p class="name">{{ item.korean_name }}</p>
<!--                                <p class="sub"><span class="point">KANG GIYUN</span> 1960-06-04</p>-->
                            </div>

                            <div class="fragment">
                                <h3 class="title">국회의원 소개</h3>

                                <div class="infos">
                                    <div class="info">
                                        <h3 class="info-title">· 홈페이지</h3>
                                        <p class="info-body">
                                            <a :href="homepage" target="_blank">{{item.congress_homepage}}</a>
                                        </p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 사무실 주소</h3>
                                        <p class="info-body">{{item.congress_office}}</p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 이메일</h3>
                                        <p class="info-body">{{ item.congress_email }}</p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 연락처</h3>
                                        <p class="info-body">{{ item.congress_phone }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="fragment" v-if="item.histories">
                                <h3 class="title">주요 약력</h3>

                                <div class="histories" v-text="item.histories"></div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">대표발의 의안 (퍼블만 잡혀있음)</h3>

                                <div class="boards">
                                    <a href="#" class="board">
                                        <h3 class="title">사회보장급여의 이용제공 및 수정사항 진행 및 수정사항 진행</h3>
                                        <p class="sub">2023-02-03</p>
                                    </a>

                                    <a href="#" class="board">
                                        <h3 class="title">사회보장급여의 이용제공 및 수정사항 진행</h3>
                                        <p class="sub">2023-02-03</p>
                                    </a>

                                    <a href="#" class="board">
                                        <h3 class="title">사회보장급여의 이용제공 및 수정사항 진행</h3>
                                        <p class="sub">2023-02-03</p>
                                    </a>
                                </div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">발언 영상 (퍼블만 잡혀있음)</h3>

                                <div class="boards">
                                    <a href="#" class="board">
                                        <h3 class="title">사회보장급여의 이용제공 및 수정사항 진행</h3>
                                        <p class="sub">2023-02-03</p>
                                    </a>

                                    <a href="#" class="board">
                                        <h3 class="title">사회보장급여의 이용제공 및 수정사항 진행</h3>
                                        <p class="sub">2023-02-03</p>
                                    </a>

                                    <a href="#" class="board">
                                        <h3 class="title">사회보장급여의 이용제공 및 수정사항 진행</h3>
                                        <p class="sub">2023-02-03</p>
                                    </a>
                                </div>
                            </div>

                            <div class="mt-40"></div>
                        </div>
                    </section>

                    <img src="/images/about-bg.png" alt="" class="deco-about">
                </div>
            </section>

            <quicks />
        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>

</template>

<script>
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import InputAddress from "../../components/form/inputAddress";
import Form from "@/utils/Form";

export default {
    components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera},
    auth: false,
    data() {
        return {
            item: null,

            errors: {},

        }
    },
    methods: {
        init(){
            this.$axios.get(`/districts/${this.$store.state.district.id}/contacts`)
                .then(response => {
                    this.item = response.data.data;
                })
        }
    },

    computed: {
        district(){
            return this.$store.state.district;
        },

        homepage(){
            if(this.item && this.item.congress_homepage)
                return this.item.congress_homepage.includes("http") ? this.item.congress_homepage : "http://" + this.item.congress_homepage;
        }
    },

    /*watch: {
        district (newData, oldData) {
            location.reload();
        }
    },*/

    mounted() {
        this.init();
    },
}
</script>

<style scoped>

</style>
