<template>
    <div class="area-mypage">
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

                <button class="btn-util">
                    <img src="/images/setting.png" alt="" style="width:20px;">
                </button>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-20"></div>

            <div class="wrap">
                <div class="box-info">
                    <div class="info">
                        <div class="m-thumbnail type02" style="background-image:url('/images/example.png')"></div>
                        <h3 class="title">{{ this.$auth.user.name }}</h3>
                    </div>

                    <div class="mt-12"></div>

                    <a href="#" class="m-btn type03 bg-lightGray black">프로필 수정</a>
                </div>

                <div class="mt-20"></div>

                <div class="m-temp type01">
                    <h3 class="title">마을 사랑 온도</h3>

                    <div class="gage-wrap">
                        <div class="gage">
                            <div class="active" style="width:35%;"></div>

                            <div class="comment">
                                자유마을 가입 시점 30
                                <img src="/images/polygon.png" alt="" class="deco">
                            </div>

                            <span class="count">90</span>
                        </div>
                    </div>

                    <p class="body">
                        ‘애국심’은 자유마을 홈페이지에서 글 작성, 댓글 작성, 받은 좋아요, 받은 싫어요,
                        공유활동과 자유마을 회원가입 수 및 집회 참여를 종합해서 만든 지표입니다.
                    </p>
                </div>
            </div>

            <div class="m-quicks type01">
                <a href="#" class="m-quick">글쓰기</a>
                <a href="#" class="m-quick m-btn-top">
                    <img src="/images/Icon.png" alt="">
                </a>
            </div>

            <div class="menus-wrap">
                <h3 class="title">나의 마을설정</h3>

                <div class="menus">
                    <div class="wrap">
                        <a href="#" class="menu">
                            <img src="/images/building.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내 마을 소개</p>
                        </a>
                        <a href="#" class="menu">
                            <img src="/images/users.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내 마을 임원진</p>
                        </a>
                        <a href="#" class="menu">
                            <img src="/images/chart.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내 마을 활동</p>
                        </a>
                        <a href="#" class="menu">
                            <img src="/images/board.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내 마을 공지</p>
                        </a>
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
                        <a href="#" class="menu">
                            <img src="/images/wallet.png" alt="" class="icon" style="width:14px;">
                            <p class="text">나의 지갑</p>
                        </a>
                    </div>
                </div>
            </div>

            <div class="menus-wrap">
                <h3 class="title">나의 마을소식</h3>

                <div class="menus">
                    <div class="wrap">
                        <a href="#" class="menu">
                            <img src="/images/edit_document.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내가 쓴 게시글</p>
                        </a>
                        <a href="#" class="menu">
                            <img src="/images/comment-black.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내가 쓴 댓글</p>
                        </a>
                        <a href="#" class="menu">
                            <img src="/images/comment-black.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내 행사 관리</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="navs">
                <div class="nav-wrap">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/home.png" alt="">
                        </div>

                        <h3 class="title">홈</h3>
                    </a>
                </div>

                <div class="nav-wrap">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/newspaper.png" alt="">
                        </div>

                        <h3 class="title">마을소식</h3>
                    </a>
                </div>

                <div class="nav-wrap">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/location-marker.png" alt="">
                        </div>

                        <h3 class="title">내 근처</h3>
                    </a>
                </div>

                <div class="nav-wrap">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/chat-alt-2.png" alt="">
                        </div>

                        <h3 class="title">채팅</h3>
                    </a>
                </div>

                <div class="nav-wrap active">
                    <a href="#" class="nav">
                        <div class="img-wrap">
                            <img src="/images/user.png" alt="">
                        </div>

                        <h3 class="title">내 정보</h3>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import Form from '../../utils/Form';
import InputRegion from "~/components/inputRegion";

export default {
    components: {InputRegion},
    auth: true,
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
