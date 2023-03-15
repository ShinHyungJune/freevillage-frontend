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
                        댓글을 달려면 로그인하세요. <nuxt-link class="btn-green" to="/auth/login">로그인하기</nuxt-link>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        commentable_id: {
            required: true,
            default() {
                return "";
            }
        },
        commentable_type: {
            required: false,
            default() {
                return "post";
            }
        }

    },
    components: {},
    watch: {
        'form.content'(newValue, oldValue) {
            if(newValue.length > 300) {
                alert('댓글은 300자 이상 작성할 수 없습니다.')
                this.form.content = oldValue;
            }

        }
    },
    data() {
        return {
            form: {
                commentable_type: this.commentable_type,
                commentable_id: this.commentable_id,
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
<style scoped>
    .btn-green {
        color: #0BAF00;
    }
</style>
