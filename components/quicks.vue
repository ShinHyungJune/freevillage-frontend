<template>
    <div class="m-quicks type01">
        <a href="#" class="m-quick blbs orange" @click.prevent="createPost">글쓰기</a>
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
                return this.$router.push("/auth/login");

            if(this.$store.state && this.$store.state.district.id == 0 && !this.$auth.hasScope("admin"))
                return alert("게시할 마을을 선택하세요.");

            return this.$router.push(this.createUrl);
        }
    },

    mounted() {

    }
}
</script>
<style scoped>

.blbs {
  background: black;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  height: 20px;
  width: 20px;
  transform: scale(1);
  animation: pulse-black 2s infinite;
}


.blbs.orange {
  background: #F88600;
  box-shadow: 0 0 0 0 rgba(255, 121, 63, 1);
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 121, 63, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0);
  }
}

</style>

