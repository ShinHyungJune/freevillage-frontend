<template>
    <div class="area-region-activity">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title">{{this.$store.state.district.district}} 임원진</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/infos" class="m-tab">
                        <span class="text">{{this.$store.state.district.district}} 소개</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/staffs" class="m-tab active">
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

            <section class="area-staff">
                <div class="m-empty type01" v-if="items.length === 0">준비중입니다.</div>

                <div class="wrap">
                    <ul class="rep" v-if="rep">
                        <h3 class="custom-title">{{rep.position}}</h3>
                        <li class="item">
                            <div class="img-wrap" >
                               <!-- 잠시 숨기기 
                                <img :src="rep.img.url" alt="임원이미지" v-if="rep.img">
                                <img src="/images/default_profile.jpeg" alt="대체이미지" v-else> -->
                                <div class="m-board-btns mt-20">
                                    <div class="m-btns type01" >
                                        <div class="m-btn-wrap">
                                            <button type="button" class="m-btn type01 bg-primary height-full">
                                                {{nameReplace(rep.name)}}<br/>
                                                {{phoneReplace(rep.phone)}}
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="items custom-ul">
                        <li class="item" v-for="item in restItems" :key="item.id">
                            <div class="item-top">
                                <h3 class="title">{{item.position}}</h3>
                            </div>
                            <div class="img-wrap" >
                                <!-- 잠시 숨기기 
                                <img :src="item.img.url" alt="임원이미지" v-if="item.img">
                                <img src="/images/default_profile.jpeg" alt="대체이미지" v-else>
                                -->
                                <div class="m-board-btns mt-20">
                                    <div class="m-btns type01" >
                                        <div class="m-btn-wrap">
                                            <button type="button" class="m-btn type01 bg-primary height-full">
                                                {{nameReplace(item.name)}}<br/>
                                                {{phoneReplace(item.phone)}}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <img src="/images/about-bg.png" alt="" class="deco-about">
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
            items: [],

            errors: {},

        }
    },

    computed: {
        rep() {
            return this.items.find(item => item.position === '대표');
        },
        restItems() {
            return this.items.filter(item => item.position !== '대표');
        }
    },

    // watch: {
    //     district (newData, oldData) {
    //         location.reload();
    //     }
    // },
    methods: {
        phoneReplace(phone) {
            if(phone) {
                let num =  phone.replaceAll("[\\s\\-()]", "");
                return num.slice(0,7).padEnd(11,"*");
             }else {
                return;
             }

        },
        nameReplace(name) {
            return name.slice(0,-1) + '*';
        }
    },

    mounted() {
            this.$axios.get(`/api/districts/${this.$store.state.district.id}/staff`)
                .then(response => {
                    this.items = [...response.data.data];
                })

    },
}
</script>

<style scoped>
    .custom-ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0;
        
    }
    .custom-ul li {
        /* list-style: none; */
        text-align: center;
        width: 48%;
        background: #fafafa;
    }
    .custom-title {
        font-weight: 700;
        margin: 0 auto;
        font-size: 25px;
    }

    .title {
        margin: 0 auto;
        font-size: 25px;
    }
    .height-full {
        height:100%;
    }
    .rep {
        text-align: center;
    }
    .rep li {
        display: inline-block;
        text-align: left;
        width: 48%;
        background: #fafafa;
        border-radius: 3%;
    }

    .m-btns .type01 {
        width: 100%;
        padding: 10px 0px;
        font-weight: normal;
        font-size: 18px;
    }

    .img-wrap > img {
        border-radius: 20px;
        width: 110px;
    }
</style>
