<template>
    <div class="area-mypage">
        <!-- 신고 팝업 -->
        <profile-pop v-if="isProfilePopActive" @close="isProfilePopActive = false" />

        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util">
                        <img src="/images/back.png" alt="" style="width:10px;" @click="$router.back()">
                    </button>
                </div>

                <div class="center">
                    <h3 class="title">내 정보</h3>
                </div>

                <nuxt-link to="/auth/edit" class="btn-util">
                    <img src="/images/setting.png" alt="" style="width:20px;">
                </nuxt-link>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-20"></div>

            <div class="wrap">
                <div class="box-info">
                    <div class="info">
                        <div class="m-thumbnail type02" :style="`background-image:url('${this.$auth.user.img.url}')`" v-if="this.$auth.user.img"></div>
                        <h3 class="title">{{ this.$auth.user.name }}</h3>
                    </div>

                    <div class="mt-12"></div>

                    <a href="#" class="m-btn type03 bg-lightGray black" @click.prevent="isProfilePopActive = true">프로필 수정</a>
                </div>

                <div class="mt-20"></div>

                <div class="m-temp type01">
                    <h3 class="title">마을 사랑 온도</h3>

                    <div class="gage-wrap">
                        <div class="gage">
                            <div class="active" :style="`width:${this.$auth.user.activity_index }%;`"></div>

                            <div class="comment">
                                자유마을 가입 시점 35
                                <img src="/images/polygon.png" alt="" class="deco">
                            </div>

                            <span class="count">
                                {{ this.$auth.user.activity_index }}
                                <img :src="activityImg" alt="">
                            </span>
                        </div>
                    </div>

                    <p class="body">
                        ‘애국심’은 자유마을 홈페이지에서 글 작성, 댓글 작성, 받은 좋아요, 받은 싫어요,
                        공유활동과 자유마을 회원가입 수 및 집회 참여를 종합해서 만든 지표입니다.
                    </p>
                </div>
            </div>

            <div v-if="$auth.hasScope('manager')">
                <div class="menus-wrap">
                    <h3 class="title">나의 마을설정</h3>

                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/infos/create" class="menu">
                                <img src="/images/building.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 소개</p>
                            </nuxt-link>
                            <nuxt-link to="/staffs/create" class="menu">
                                <img src="/images/users.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 임원진</p>
                            </nuxt-link>
                            <nuxt-link to="/contacts/create" class="menu">
                                <img src="/images/chart.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 활동</p>
                            </nuxt-link>
                            <nuxt-link to="/notices/create" class="menu">
                                <img src="/images/board.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 공지</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="menus-wrap">
                    <h3 class="title">나의 마을활동</h3>

                    <div class="menus">
                        <div class="wrap">
                            <a href="#" class="menu">
                                <img src="/images/heart-active.png" alt="" class="icon" style="width:14px;">
                                <p class="text">좋아요 게시물</p>
                            </a>
                            <a href="#" class="menu">
                                <img src="/images/shareLink.png" alt="" class="icon" style="width:14px;">
                                <p class="text">공유한 게시물</p>
                            </a>
                            <nuxt-link to="/scraps" class="menu">
                                <img src="/images/wallet.png" alt="" class="icon" style="width:14px;">
                                <p class="text">나의 지갑</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="menus-wrap">
                    <h3 class="title">나의 마을소식</h3>

                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/mypage/posts" class="menu">
                                <img src="/images/edit_document.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 게시글</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/comments" class="menu">
                                <img src="/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 댓글</p>
                            </nuxt-link>
                            <a href="#" class="menu">
                                <img src="/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 행사 관리</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <div class="menus-wrap">
                    <h3 class="title">나의 마을활동</h3>

                    <div class="menus">
                        <div class="wrap">
                            <a href="#" class="menu">
                                <img src="/images/heart-active.png" alt="" class="icon" style="width:14px;">
                                <p class="text">좋아요 게시물</p>
                            </a>
                            <a href="#" class="menu">
                                <img src="/images/shareLink.png" alt="" class="icon" style="width:14px;">
                                <p class="text">공유한 게시물</p>
                            </a>
                            <nuxt-link to="/scraps" class="menu">
                                <img src="/images/wallet.png" alt="" class="icon" style="width:14px;">
                                <p class="text">나의 지갑</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="menus-wrap">
                    <h3 class="title">나의 마을소식</h3>

                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/mypage/posts" class="menu">
                                <img src="/images/edit_document.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 게시글</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/comments" href="#" class="menu">
                                <img src="/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 댓글</p>
                            </nuxt-link>
                            <a href="#" class="menu">
                                <img src="/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 행사 관리</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="menus-wrap">
                    <h3 class="title">나의 마을설정</h3>

                    <div class="menus">
                        <div class="wrap">
                            <a href="#" class="menu">
                                <img src="/images/location-marker.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 동네 설정</p>
                            </a>
                            <a href="#" class="menu">
                                <img src="/images/circleCheck.png" alt="" class="icon" style="width:14px;">
                                <p class="text">동네 인증하기</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>
</template>

<script>
import Form from "@/utils/Form";
import ProfilePop from '../../components/profilePop.vue'
export default {
    components: {
        ProfilePop,
    },
    auth: true,
    data() {
        return {
            isProfilePopActive: false,
        }
    },
    methods: {
        store() {

        },
    },

    computed: {
        activityImg(){
            let activityIndex = this.$auth.user.activity_index;

            if(activityIndex <= 10)
                return "/images/f_01.png";

            if(activityIndex <= 20)
                return "/images/f_02.png";

            if(activityIndex <= 30)
                return "/images/f_03.png";

            if(activityIndex <= 40)
                return "/images/f_04.png";

            if(activityIndex <= 50)
                return "/images/f_05.png";

            if(activityIndex <= 60)
                return "/images/f_06.png";

            if(activityIndex <= 70)
                return "/images/f_07.png";

            if(activityIndex <= 80)
                return "/images/f_08.png";

            if(activityIndex <= 90)
                return "/images/f_09.png";

            return "/images/f_10.png";
        }
    },

    mounted() {
    },

}
</script>

<style scoped>

</style>
