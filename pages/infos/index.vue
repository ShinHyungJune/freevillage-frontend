<template>
    <div class="area-region-about">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container" @keyup="errors = {}">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title">{{this.$store.state.district.district}} 소개</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/infos" class="m-tab active">
                        <span class="text">{{this.$store.state.district.district}} 소개</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/staffs" class="m-tab">
                        <span class="text">임원진</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contacts" class="m-tab">
                        <span class="text">내마을 국회의원</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <section class="section-content">
                <div class="wrap">
                    <div class="fragment-wrap" v-if="item">
                        <div class="fragment">
                            <div class="m-title type01 align-left">
                                {{this.$store.state.district.district}}은
                            </div>

                            <div class="m-editor-body type01" v-html="item.content" v-if="item"></div>
                        </div>

                        <div class="fragment mt-40">
                            <div class="m-title type01 align-left">
                                {{this.$store.state.district.district}} 소개
                            </div>

                            <div id="map" class="m-map type01" style="background-color:#e1e1e1;"></div>

                            <div class="mt-8"></div>

                            <img :src="item.img.url" alt="" v-if="item && item.img">
                        </div>

                        <div class="fragment mt-40">
                            <div class="m-title type01 align-left">
                                {{this.$store.state.district.district}} 소개
                            </div>

<!--                            <div class="map">지도</div>-->

                            <div class="mt-8"></div>

                            <div class="infos">
                                <div class="info">
                                    <h3 class="info-title">광역자치단체:</h3>
                                    <p class="info-body">{{ item.metropolitan_government  }}</p>
                                </div>

                                <div class="info">
                                    <h3 class="info-title">기초자치단체:</h3>
                                    <p class="info-body">{{ item.local_government  }}</p>
                                </div>
                            </div>

                            <div class="infos">
                                <div class="info">
                                    <h3 class="info-title">행정표준코드:</h3>
                                    <p class="info-body">3910076</p>
                                </div>

                                <div class="info">
                                    <h3 class="info-title">면적:</h3>
                                    <p class="info-body">2.84km</p>
                                </div>
                            </div>

                            <div class="infos no-flex">
                                <div class="info">
                                    <h3 class="info-title">관할 법정동:</h3>
                                    <p class="info-body">{{ item.jurisdiction }}</p>
                                </div>
                                <div class="info">
                                    <h3 class="info-title">행정복지센터:</h3>
                                    <p class="info-body">{{ item.administrative_welfare_center }}</p>
                                </div>
                                <div class="info">
                                    <h3 class="info-title">하위 행정구역:</h3>
                                    <p class="info-body">{{ item.subdivision_administrative_district }}</p>
                                </div>
                                <div class="info">
                                    <h3 class="info-title">인구:</h3>
                                    <p class="info-body">{{ item.population }}</p>
                                </div>
                                <div class="info">
                                    <h3 class="info-title">인구밀도:</h3>
                                    <p class="info-body">{{ item.population_density }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-empty type01" v-else>준비중입니다.</div>



                    <img src="/images/about-bg.png" alt="" class="deco-about">
                </div>
            </section>

                        <quicks 
                :createUrl="'/posts/create'"
                :btnName="'글쓰기'"
            />
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
            item: "",

            errors: {},

            activeLinkPop: false,
        }
    },
    async asyncData({ $axios, store}) {
        try {
            const response = await $axios.get(`/api/districts/${store.state.district.id}/infos`)
            if(response.data) {
                return {
                    item: response.data.data
                }
            }   
        } catch (error) {
            console.log(error);
            //에러처리
            //alert(에러가 발생했습니다.)
            //기본좌표로 등록
        }
    },
    methods: {
        initMap() {
            let self = this;

            setTimeout(function(){
                const container = document.getElementById("map");

                if(self.item && !self.map){
                    const coords =  new kakao.maps.LatLng(self.item.y, self.item.x);

                    const options = {
                        center:coords,
                        level: 5,
                    };

                    self.map = new kakao.maps.Map(container, options);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    new kakao.maps.Marker({
                        map: self.map,
                        position: coords
                    });
                }
            }, 300);


        },
    },


    computed: {
        district(){
            return this.$store.state.district;
        }
    },

   /* watch: {
        district (newData, oldData) {
            return this.$router.push("/");
        }
    },*/

    mounted() {
        if(this.item.x && this.item.y)
            kakao.maps.load(this.initMap);
    },
}
</script>

<style scoped>

</style>
