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
                    <div class="m-empty type01" v-if="items.data.length === 0">준비중입니다.</div>

                    <div class="img-wrap" v-for="item in items.data" :key="item.id">
                        <img :src="item.img.url" alt="" class="img" v-if="item.img">

                        <a :href="`tel:${item.phone}`" class="btn-call">
                            <img src="/images/call.png" alt="" style="width:17px;">
                        </a>
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
    auth: false,
    data() {
        return {
            items: {
                data: []
            },

            errors: {},

        }
    },
    methods: {
        init(){
            this.$axios.get(`/districts/${this.$store.state.district.id}/contacts`)
                .then(response => {
                    this.items = response.data;
                })
        }
    },

    computed: {
        district(){
            return this.$store.state.district;
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
