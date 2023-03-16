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
                                <img :src="item.img.url" alt="">
                            </div>

                            <div class="box-name">
                                <p class="name">{{ item.korean_name }} ({{item.NAME_HAN}}) </p>
                               <!-- <p class="sub"><span class="point">KANG GIYUN</span> 1960-06-04</p> -->
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

                            <div class="fragment" v-if="item.HAK">
                                <h3 class="title">주요 약력</h3>

                                <div class="histories" v-text="item.HAK"></div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">대표발의 의안</h3>

                                <div class="boards" v-if="proposals.length > 0">
                                    <template v-for="item in proposals">
                                        <a :href="item.DETAIL_LINK" target="blank"  :key="item.BILL_ID" class="board" >
                                            <h3 class="title">{{item.BILL_NAME}}</h3>
                                            <p class="sub">{{item.PROPOSE_DT}}</p>
                                        </a>
                                    </template>
                                </div>
                                <div class="boards" v-if="proposals.length == 0">
                                    <div class="m-empty type01">
                                        데이터가 없습니다.
                                    </div>
                                </div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">발언 영상</h3>

                                <div class="boards" v-if="speeches.length > 0">
                                    <template v-for="item in speeches">
                                        <a :href="item.LINK_URL" target="blank" :key="item.CT2" class="board">
                                            <h3 class="title">{{item.TITLE}}</h3>
                                            <p class="sub">{{item.TAKING_DATE}}</p>
                                        </a>
                                    </template>    
                                </div>
                                <div class="boards" v-if="speeches.length == 0">
                                    <div class="m-empty type01">
                                        데이터가 없습니다.
                                    </div>
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
            temp: null,
            proposals:[],
            speeches:[],
            errors: {},

        }
    },
    methods: {
        async init(){
            try {
                const response = await this.$axios.get(`/districts/${this.$store.state.district.id}/contacts`)
                if(response) {
                    this.temp = response.data.data;
                    await this.nprlapfmaufmqytet(this.temp.korean_name); //의원 약력 등 정보
                    await this.nzmimeepazxkubdpn(this.temp.korean_name); //의원 대표발의 법안
                    await this.npeslxqbanwkimebr(this.temp.korean_name); //의원 발언 영상
                }
                    
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 약력 등 추가 정보
         */
        async nprlapfmaufmqytet(name) {
            try {
                const {data} = await this.$axios.get(`https://open.assembly.go.kr/portal/openapi/nprlapfmaufmqytet`, {
                    params: {
                        DAESU: '21',
                        NAME: name,
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a'
                    }
                })

                if(data) {
                    // console.log(data.nprlapfmaufmqytet[1].row[0])
                    this.item = {
                        ...this.temp,
                        ...data.nprlapfmaufmqytet[1].row[0],
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 대표발의 법안
         */
        async nzmimeepazxkubdpn(name) {
            try {
                const {data} = await this.$axios.get(`https://open.assembly.go.kr/portal/openapi/nzmimeepazxkubdpn`, {
                    params: {
                        age: '21',
                        proposer: name,
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a',
                        pSize: 3,
                    }
                })
                if(data) {
                    // console.log(data.nzmimeepazxkubdpn[1].row)
                    this.proposals = data.nzmimeepazxkubdpn[1].row;
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 발언 영상
         */
        async npeslxqbanwkimebr(name) {
            try {
                const {data} = await this.$axios.get(`https://open.assembly.go.kr/portal/openapi/npeslxqbanwkimebr`, {
                    params: {
                        CT1: '21',
                        ESSENTIAL_PERSON: name,
                        TAKING_DATE: '2023',
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a',
                        pSize: 3,
                    }
                })
                if(data) {
                    // console.log({data},3344);
                    this.speeches =  data.npeslxqbanwkimebr[1].row;

                }
            } catch (error) {
                console.error(error);
            }
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
