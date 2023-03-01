<template>
    <!-- 하단 네비게이션바 -->
    <div class="m-navigation type01">
        <div class="navs">
            <div :class="`nav-wrap ${$route.path === '/' ? 'active' : ''}`">
                <nuxt-link to="/" class="nav">
                    <div class="img-wrap">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1029/home.png" alt="" style="width:21px;">
                    </div>

                    <h3 class="title">홈</h3>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path === '/posts' ? 'active' : ''}`">
                <a href="/posts" class="nav">
                    <div class="img-wrap">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1028/newspaper.png" alt="" style="width:19px;">
                    </div>

                    <h3 class="title">마을소식</h3>
                </a>
            </div>
            <div class="nav-wrap">
                <nuxt-link to="/scraps" class="nav">
                    <div class="img-wrap">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1027/cart.png" alt="" style="width:30px">
                    </div>

                    <h3 class="title">내 공유함</h3>
                </nuxt-link>
            </div>
<!--

            <div class="nav-wrap">
                <a href="#" class="nav">
                    <div class="img-wrap">
                        <img src="/images/chat-alt-2.png" alt="" style="width:19px;">
                    </div>

                    <h3 class="title">채팅</h3>
                </a>
            </div>-->

            <div :class="`nav-wrap ${$route.path.includes('/mypage') ? 'active' : ''}`">
                <nuxt-link to="/mypage" class="nav">
                    <div class="img-wrap">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1026/user.png" alt="" style="width:16px;">
                    </div>

                    <h3 class="title">내 정보</h3>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {

    },
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
