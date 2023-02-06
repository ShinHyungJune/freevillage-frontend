<template>
    <div class="m-quicks type01">
        <nuxt-link :to="createUrl" class="m-quick">글쓰기</nuxt-link>

        <nuxt-link to="/auth/register" class="m-quick" v-if="!$auth.user">
            가입
            <br/>하기
        </nuxt-link>

        <a href="#" class="m-quick m-btn-top" @click.prevent="scrollTop">
            <img src="/images/Icon.png" alt="">
        </a>
    </div>

</template>
<script>
export default {
    props: {
        createUrl: {
            default(){
                return "/posts/create";
            }
        }
    },
    data() {
        return {

        }
    },

    methods: {
        scrollTop() {
            window.scrollTo(0, 0);
        }
    },

    mounted() {

    }
}
</script>
