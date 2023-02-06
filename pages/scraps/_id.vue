<template>
    <div class="area-news-show">

        <!-- 지갑 팝업 -->
        <scrap-pop v-if="activeScrapPop" @close="activeScrapPop = false" />

        <!-- 신고 팝업 -->
        <div class="m-pop type01" style="display:none;" id="pop2">
            <div class="m-pop-inner">
                <button class="btn-close m-script-pop" data-target="#pop2">
                    <img src="/images/x.png" alt="" style="width:21px;">
                </button>

                <div class="m-pop-title">게시물 신고</div>

                <div class="m-input-checkbox type01">
                    <input type="checkbox">
                    <label for="">음란 콘텐츠를 유포</label>
                </div>
                <div class="mt-4"></div>
                <div class="m-input-checkbox type01">
                    <input type="checkbox">
                    <label for="">상품을 팔거나 광고 및 홍보활동</label>
                </div>
                <div class="mt-4"></div>
                <div class="m-input-checkbox type01">
                    <input type="checkbox">
                    <label for="">비방이나 욕설, 타인의 명예를 훼손</label>
                </div>
                <div class="mt-4"></div>
                <div class="m-input-checkbox type01">
                    <input type="checkbox">
                    <label for="">잠재적 위반 가능성</label>
                </div>
                <div class="mt-4"></div>
                <div class="m-input-checkbox type01">
                    <input type="checkbox" checked>
                    <label for="">스팸 정보</label>
                </div>
                <!-- 스팸 정보 클릭시에만 노출 -->
                <div class="m-input-textarea type01 mt-8">
                    <textarea name="" id=""></textarea>
                </div>

                <div class="mt-20"></div>

                <button type="button" class="m-btn type03 width-100">신고</button>
            </div>
        </div>

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
                    <button class="btn-util">
                        <img src="/images/bell.png" alt="" style="width:18px;">
                    </button>
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
                                <p class="category">{{ item.formatBoard }}</p>
                            </div>
                            <div class="right">
                                <a href="#" class="btn-report" @click.prevent="activeReportPop = true">
                                    <img src="/images/report.png" alt="" style="width:18px;">
                                </a>
                            </div>
                        </div>
                        <div class="fragment">
                            <div class="left">
                                <div class="writer">
                                    <div class="thumbnail" :style="`background-image:url('${item.user.img.url}')`" v-if="item.user.img"></div>
                                    {{ item.user.name }}
                                </div>
                                <p class="date">{{ item.created_at }}</p>
                            </div>

                            <div class="right">
                                <div class="info">
                                    <img src="/images/eye-gray.png" alt="" style="width:16px;">
                                    {{ item.view_count }}
                                </div>

                                <div class="info">
                                    <img src="/images/comment-gray.png" alt="" style="width:12px;">
                                    {{item.comment_count}}
                                </div>

                                <div class="info">
                                    <img src="/images/heart-gray.png" alt="" style="width:12px;">
                                    {{item.like_count}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="m-board-content">
                        <h3 class="title">{{ item.title }}</h3>
                        <p class="body" v-if="item.content">
                            {{item.content.replace(/<\/?[^>]+>/ig, " ")}}
                        </p>
                        <div class="m-thumbnail type01 mt-8" :style="`background-image:url(${item.img.url})`" v-if="item.img"></div>
                    </div>
                </div>

                <div class="m-board-bottom">
                    <div class="wrap">
                        <div class="utils">
                            <button class="btn-util">
                                <!--<img src="/images/heart-inactive.png" alt="" style="width:14px;">-->
                                <img src="/images/heart-active.png" alt="" style="width:14px;">
                                좋아요 {{ item.like_count }}
                            </button>

                            <button class="btn-util">
                                <img src="/images/comment-black.png" alt="" style="width:14px;">
                                댓글 {{ item.comment_count }}
                            </button>

                            <button class="btn-util" @click="activeScrapPop = true">
                                <img src="/images/wallet.png" alt="" style="width:13px;">
                                지갑 {{item.scrap_count}}
                            </button>

                            <button class="btn-util">
                                <img src="/images/share.png" alt="" style="width:11px;">
                                공유
                            </button>
                        </div>
                    </div>
                </div>

                <div class="wrap">
                    <div class="m-comments type01">
                        <div class="m-comments-top">
                            <a href="#" class="btn-filter active">최신순</a>
                            <a href="#" class="btn-filter">오래된순</a>
                        </div>

                        <div class="m-comment">
                            <div class="thumbnail" style="background-image:url('/images/example.png');"></div>

                            <div class="content">
                                <h3 class="title">서정동네일샵</h3>
                                <p class="sub">서정동 · 2시간 전</p>
                                <p class="body">동참할게요 동참할게요</p>

                                <div class="utils">
                                    <button class="btn-like">
                                        <img src="/images/heart-active.png" alt="" style="width:14px;">
                                        <!--<img src="/images/heart-inactive.png" alt="" style="width:14px;">-->
                                        1
                                    </button>
                                    <button class="btn-text">답글쓰기</button>
                                </div>

                                <div class="m-input-withBtn type01">
                                    <div class="m-input m-input-text type01">
                                        <input type="text" placeholder="댓글을 입력해주세요.">
                                    </div>

                                    <button class="m-input-btn m-btn type02">저장</button>
                                </div>

                            </div>

                            <button class="btn-more">
                                <img src="/images/dots.png" alt="" style="width:3px;">
                            </button>
                        </div>

                        <div class="m-comment">
                            <div class="thumbnail" style="background-image:url('/images/example.png');"></div>

                            <div class="content">
                                <h3 class="title">서정동네일샵</h3>
                                <p class="sub">서정동 · 2시간 전</p>
                                <p class="body">동참할게요 동참할게요</p>

                                <div class="utils">
                                    <button class="btn-like">
                                        <img src="/images/heart-active.png" alt="" style="width:14px;">
                                        <!--<img src="/images/heart-inactive.png" alt="" style="width:14px;">-->
                                        1
                                    </button>
                                    <button class="btn-text">답글쓰기</button>
                                </div>

                                <div class="m-input-withBtn type01">
                                    <div class="m-input m-input-text type01">
                                        <input type="text" placeholder="댓글을 입력해주세요.">
                                    </div>

                                    <button class="m-input-btn m-btn type02">저장</button>
                                </div>

                            </div>

                            <button class="btn-more">
                                <img src="/images/dots.png" alt="" style="width:3px;">
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="m-quicks type01">
                <a href="#" class="m-quick">글쓰기</a>
                <a href="#" class="m-quick m-btn-top">
                    <img src="/images/Icon.png" alt="">
                </a>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="wrap">
                <div class="m-input-withBtn type01">
                    <div class="m-input m-input-text type01">
                        <input type="text" placeholder="댓글을 입력해주세요.">
                    </div>

                    <button class="m-input-btn m-btn type02">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import Form from '../../utils/Form';
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";

export default {
    components: {InputThumbnail, InputImg, InputLink, InputCamera},
    auth: true,
    data() {
        return {
            item: {
                user: {}
            },

            form: {},

            errors: {},

            activeScrapPop: false,
        }
    },
    methods: {
        store() {

        },
    },

    mounted() {
        this.$axios.get("/posts/" + this.$route.params.id)
            .then(response => {
                this.item = response.data.data;
            })
    }
}
</script>

<style scoped>

</style>
