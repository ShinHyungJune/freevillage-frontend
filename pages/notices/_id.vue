<template>
    <div class="area-news-show">
        <!-- 헤더영역 -->
        <div class="m-header type01">
            <div class="wrap">
                <div class="utils">
                    <button class="btn-util" @click="$router.back();">
                        <img src="/images/back.png" alt="" style="width:10px;">
                    </button>

                    <button class="btn-util" @click="$router.push('/')">
                        <img src="/images/home2.png" alt="" style="width:21px;">
                    </button>
                </div>

                <div class="utils">
                    <!--<button class="btn-util">
                        <img src="/images/search.png" alt="" style="width:18px;">
                    </button>-->
                    <nuxt-link to="/notices" class="btn-util">
                        <img src="/images/bell.png" alt="" style="width:18px;">
                    </nuxt-link>
                    <button class="btn-util">
                        <img src="/images/dots.png" alt="" style="width:3px;">
                    </button>
                </div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-20"></div>

            <div :class="`m-board-show type01 ${item.formatBoard}`">
                <div class="wrap">
                    <div class="m-board-top">
                        <div class="fragment">
                            <div class="left">
                                <div class="writer">
                                    <div class="thumbnail" :style="`background-image:url('${item.user.img.url}')`" v-if="item.user.img"></div>
                                    {{ item.user.nickname }}
                                </div>
                                <p class="date">{{ item.created_at }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="m-board-content">
                        <h3 class="title">{{ item.title }}</h3>
                        <div class="editor-body" v-html="item.content"></div>
                    </div>
                </div>

                <div class="m-board-bottom">
                    <div class="wrap">
                        <div class="utils" style="justify-content: flex-end">
                            <button class="btn-util" @click="share">
                                <img src="/images/share.png" alt="" style="width:11px;">
                                공유
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <!-- <comment-navigation @created="(data) => {comments.data.push(data)}" /> -->
    </div>
</template>

<script>
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import KakaoHelper from '../../utils/KakaoHelper';

export default {
    components: {InputThumbnail, InputImg, InputLink, InputCamera},
    auth: false,
    data() {
        return {
            item: {
                user: {}
            },

            form: {},

            errors: {},

            activeScrapPop: false,

            map: "",

            tabIndex: 0,

            activeSpamPop: false,
        }
    },
    methods: {
        store() {

        },

        share() {
            let kakaoHelper = new KakaoHelper(Kakao);

            kakaoHelper.sharePost(this.item);
        },
    },

    mounted() {

        this.$axios.get("/notices/" + this.$route.params.id)
            .then(response => {
                this.item = response.data.data;
            });
    }
}
</script>

<style scoped>

</style>
