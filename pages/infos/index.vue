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
                        <span class="text">{{this.$store.state.district.district}} 소개?</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/staffs" class="m-tab">
                        <span class="text">임원진</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contacts" class="m-tab">
                        <span class="text">마을활동</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <section class="section-content">
                <div class="wrap">
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

                        <div id="map" class="m-map type01" v-if="item.x"></div>

                        <div class="mt-8"></div>

                        <img :src="item.img.url" alt="" v-if="item && item.img">
                    </div>


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
    auth: true,
    data() {
        return {
            item: "",

            errors: {},

            activeLinkPop: false,
        }
    },
    methods: {
        initMap() {
            let self = this;

            setTimeout(function(){
                const container = document.getElementById("map");

                if(!self.map){
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

    mounted() {

        this.$axios.get(`/districts/${this.$store.state.district.id}/infos`)
            .then(response => {
                this.item = response.data.data;

                console.log(this.item);

                if(this.item.x && this.item.y)
                    kakao.maps.load(this.initMap);
            })
    },
}
</script>

<style scoped>

</style>
