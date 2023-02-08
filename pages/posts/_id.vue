<template>
    <div class="area-news-show">

        <!-- 지갑 팝업 -->
        <scrap-pop :post_id="item.id" v-if="activeScrapPop" @created="() => {this.item.scrap_item_count += 1;}" @close="activeScrapPop = false" />

        <!-- 신고 팝업 -->
        <spam-pop :target_id="item.id" target_model="posts" v-if="activeSpamPop" @close="activeSpamPop = false" />

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
                                <a href="#" class="btn-report" @click.prevent="activeSpamPop = true">
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

<!--                        <div class="m-thumbnail type01 mb-8" :style="`background-image:url(${item.img.url})`" v-if="item.img"></div>-->

                        <!-- 마을모임용 상세 -->
                        <div v-if="item.board === 'meetings'">
                            <div class="infos">
                                <div class="info">
                                    <div class="title">
                                        <img src="/images/chat-primary.png" alt="" style="width:16px;">
                                        참여
                                    </div>
                                    <p class="body">
                                        {{ item.participant_type }}
                                    </p>
                                </div>

                                <div class="info">
                                    <div class="title">
                                        <img src="/images/calendar-primary.png" alt="" style="width:16px;">
                                        행사시작
                                    </div>
                                    <p class="body">
                                        {{ item.start_date }}
                                    </p>
                                </div>

                                <div class="info">
                                    <div class="title">
                                        <img src="/images/calendar-clock-primary.png" alt="" style="width:16px;">
                                        행사종료
                                    </div>
                                    <p class="body">
                                        {{ item.end_date }}
                                    </p>
                                </div>

                                <div class="info">
                                    <div class="title">
                                        <img src="/images/users-primary.png" alt="" style="width:16px;">
                                        모집인원
                                    </div>
                                    <p class="body">
                                        {{ item.participant_count }} / {{item.participant_available_count}}
                                    </p>
                                </div>

                                <div class="info">
                                    <div class="title">
                                        <img src="/images/money-primary.png" alt="" style="width:16px;">
                                        참가비
                                    </div>
                                    <p class="body">
                                        {{ item.price }}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-16"></div>

                            <div class="m-tabs type02">
                                <button :class="`m-tab ${tabIndex === 0 ? 'active' : ''}`" @click="tabIndex = 0">상세내용</button>
                                <button :class="`m-tab ${tabIndex === 1 ? 'active' : ''}`" @click="() => {tabIndex = 1; initMap();}">장소</button>
                            </div>

                            <div class="mt-16"></div>

                            <div class="m-tabs-contents">
                                <div :class="`m-tabs-content ${tabIndex === 0 ? 'active' : ''}`">
                                    <div class="editor-body" v-html="item.content"></div>
                                </div>

                                <div :class="`m-tabs-content ${tabIndex === 1 ? 'active' : ''}`">
                                    <div id="map" style="height:300px;"></div>
                                </div>
                            </div>

                            <div class="mt-16"></div>

                            <a href="#" class="m-btn type03 state03" v-if="!item.can_participate">행사종료</a>
                            <a href="#" class="m-btn type03 state02" v-else-if="item.is_participate">참여중</a>
                            <a href="#" class="m-btn type03" v-else @click.prevent="participate">참여하기</a>
                        </div>

                        <!-- 마을소식, 포토, 영상, 질문 등 -->
                        <div v-else>
                            <div class="m-ratioBox-wrap m-video type01 mb-8" v-if="item.video_url">
                                <div class="m-ratioBox">
                                    <iframe :src="item.video_url"></iframe>
                                </div>
                            </div>

                            <div class="editor-body" v-html="item.content"></div>
                        </div>

                    </div>
                </div>

                <div class="m-board-bottom">
                    <div class="wrap">
                        <div class="utils">
                            <button class="btn-util" @click="toggleLike">
                                <img src="/images/heart-active.png" alt="" style="width:14px;" v-if="item.is_like">
                                <img src="/images/heart-inactive.png" alt="" style="width:14px;" v-else>
                                좋아요 {{ item.like_count }}
                            </button>

                            <button class="btn-util">
                                <img src="/images/comment-black.png" alt="" style="width:14px;">
                                댓글 {{ item.comment_count }}
                            </button>

                            <button class="btn-util" @click="activeScrapPop = true">
                                <img src="/images/wallet.png" alt="" style="width:13px;">
                                지갑 {{item.scrap_item_count}}
                            </button>

                            <button class="btn-util" @click="share">
                                <img src="/images/share.png" alt="" style="width:11px;">
                                공유
                            </button>
                        </div>
                    </div>
                </div>

                <div class="wrap">
                    <comments :post_id="item.id" v-if="item.id"/>
                </div>
            </div>

            <quicks :create-url="`/posts/create?board=${item.board}`"/>
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

        toggleLike(e){
            e.preventDefault();
            e.stopPropagation();

            if(this.item.is_like){
                this.item.is_like = 0;
                this.item.like_count -= 1;
            }else{
                this.item.is_like = 1;
                this.item.like_count += 1;
            }

            this.$axios.put("/likes/posts/" + this.item.id);
        },

        share() {
            let kakaoHelper = new KakaoHelper(Kakao);

            kakaoHelper.sharePost(this.item);
        },

        participate(){
            this.$axios.post("/participants", {
                post_id: this.item.id
            }).then(response => {
                alert(response.data.message);

                this.item = response.data.data;
            })
        },

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
        kakao.maps.load();

        this.$axios.get("/posts/" + this.$route.params.id)
            .then(response => {
                this.item = response.data.data;
            });
    }
}
</script>

<style scoped>

</style>
