<template>
    <div class="m-navigation type01">
        <form action="" @submit.prevent="store">
            <div class="wrap">
                <div class="m-input-withBtn type01">
                    <div class="m-input m-input-text type01">
                        <input type="text" placeholder="댓글을 입력해주세요." v-model="form.content">
                    </div>

                    <button class="m-input-btn m-btn type02" type="submit">저장</button>
                </div>
            </div>
        </form>
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
            this.$axios.post("/comments", this.form)
                .then(response => {
                    this.$emit("created", response.data.data);
                    this.form.content = "";
                });
        },

    },

    mounted() {

    }
}
</script>
