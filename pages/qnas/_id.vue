<template>
    <div class="area-qnas-show">
        <!-- 헤더영역 -->
        <div class="m-header type01">
            <div class="wrap">
                <div class="utils">
                    <button class="btn-util" @click="back">
                        <img src="/images/back.png" alt="" style="width:10px;">
                    </button>

                    <button class="btn-util" @click="$router.push('/')">
                        <img src="/images/home2.png" alt="" style="width:21px;">
                    </button>
                </div>

                <div class="utils">
                    <nuxt-link to="/notices" class="btn-util">
                        <img src="/images/bell.png" alt="" style="width:18px;">
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-20"></div>

            <div class="m-board-show type01">
                <div class="wrap">
                    <div class="m-board-top">
                        <div class="fragment">
                            <div class="left">
                                <p class="category">{{ item.finished ? '완료' : '대기' }}</p>
                            </div>
                        </div>
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

                <div class="wrap">
                    <qnacomments :commentable_id="item.id" commentable_type="qna" @removed="commentRemoved" v-if="item.id"/>
                </div>
            </div>
        </div>

        <div class="m-navigation type01">
            <div class="wrap">
                <button type="button" class="m-input-btn m-btn type02 width-100 bg-lightGray" @click="finish" v-if="item.finished">종료된 질문</button>
                <button type="button" class="m-input-btn m-btn type02 width-100 bg-revert-primary" style="color:black;" @click="finish" v-else>질문 종료</button>
            </div>
        </div>

    </div>
</template>

<script>
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import KakaoHelper from '../../utils/KakaoHelper';
import { mapActions } from 'vuex';
import Comments from "../../components/comments";
export default {
    components: {Comments, InputThumbnail, InputImg, InputLink, InputCamera},
    auth: false,
    data() {
        return {
            item: {
                user: {}
            },

            form: {
                qna_id: this.$route.params.id
            },

            errors: {},
        }
    },
    methods: {
        commentRemoved(){
            this.item.comment_count -= 1;
        },

        back(){
            return this.$router.back();
        },

        finish(){
            this.$axios.patch(`/qnas/${this.item.id}/finish`)
                .then(response => {
                    this.$router.back();
                });
        }
    },

    mounted() {
        this.$axios.get("/qnas/" + this.$route.params.id)
            .then(response => {
                this.item = response.data.data;
            });
    },

}
</script>

<style scoped>
    .m-board-content {
        padding-bottom:30px;
    }

</style>
