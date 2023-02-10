<template>
    <div class="m-quicks type01">
        <a href="#" class="m-quick" @click.prevent="createPost">글쓰기</a>

        <nuxt-link to="/auth/register" class="m-quick" v-if="!$auth.user">
            가입
            <br/>하기
        </nuxt-link>

        <a href="#" class="m-quick m-btn-top" @click.prevent="scrollTop">
            <img src="/images/Icon.png" alt="" style="width:18px;">
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
        },

        createPost(){
            if(!this.$auth.user)
                return this.$router.push("/login");

            if(this.$store.state && this.$store.state.district.id == 0)
                return alert("게시할 마을을 선택하세요.");

            return this.$router.push(this.createUrl);
        }
    },

    mounted() {

    }
}
</script>
