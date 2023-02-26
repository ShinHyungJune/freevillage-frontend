<template>
    <div class="m-navigation" style="margin-bottom: 17px;">
        <div v-if="this.$auth.user">
            <form action="" @submit.prevent="store">
            <div class="">
                <div class="m-input-withBtn type01">
                    <div class="m-input m-input-text type01">
                        <input type="text" placeholder="댓글을 입력해주세요." v-model="form.content">
                    </div>

                    <button class="m-input-btn m-btn type02" type="submit">저장</button>
                </div>
            </div>
        </form>
        </div>
        <div v-else>
            <div class="m-input-withBtn type01">
                    <div class="m-input m-input-text type01">
                        댓글을 달려면 로그인하세요. <nuxt-link style="color:#0BAF00" to="/auth/login">로그인하기</nuxt-link>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        post_id: {
            required: true,
            default() {
                return "";
            }
        },
        comment_id: {
            required: false,
            default() {
                return "";
            }
        }
    },
    components: {},
    data() {
        return {
            form: {
                commentable_type: "post",
                commentable_id: this.post_id,
                content: "",
            },
        }
    },
    methods: {
        store() {
            if(!this.$auth.user)
                return this.$router.push("/auth/login");

            this.$axios.post("/comments", this.form)
                .then(response => {
                    this.$emit("created", {
                        data:response.data.data,
                        type:'add'
                    });
                    this.form.content = "";
                });
        },

    },

    mounted() {

    }
}
</script>
