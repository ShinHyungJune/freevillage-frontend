<template>
    <div class="m-comment">
        <!-- 신고 팝업 -->
        <spam-pop :target_id="item.id" target_model="comments" v-if="activeSpamPop" @close="activeSpamPop = false" />

        <div class="m-comment-inner">
            <div class="thumbnail" :style="`background-image:url(${item.user.img.url})`" v-if="item.user.img"></div>

            <div class="content">
                <h3 class="title">{{ item.user.nickname }}</h3>
                <p class="sub">{{ item.diff_at }}</p>
                <p class="body removed" v-if="item.deleted_at">글이 삭제되었습니다.</p>
                <p class="body" v-else>{{ item.content }}</p>

                <form action="" @submit.prevent="store" v-if="active">
                    <div class="m-input-withBtn type01">
                        <div class="m-input m-input-text type01">
                            <input type="text" placeholder="질문을 입력해주세요." v-model="form.content">
                        </div>

                        <button class="m-input-btn m-btn type02">저장</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import SpamPop from "./spamPop";
export default {
    props: {
        item: {
            required: true,
        },

        commentable_id: {

        },

        commentable_type: {
            default : "post"
        }
    },
    components: {SpamPop},
    data() {
        return {
            form: {
                commentable_type: "comment",
                commentable_id: this.item.id,
                content: "",
            },
            active: false,
            activeReplies: false,
            activeSpamPop: false,
            activeBtns: false,
        }
    },
    methods: {
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

            this.$axios.put("/likes/comments/" + this.item.id);
        },

        store() {
            if(!this.$auth.user)
                return this.$router.push("/auth/login");

            this.$axios.post("/comments", this.form)
                .then(response => {
                    this.active = false;

                    this.form.content = "";

                    this.item.comments.push(response.data.data);
                });
        },

        remove(){
            this.$axios.delete("/comments/" + this.item.id)
                .then(response => {
                    this.item.deleted_at = true;

                    this.$emit("removed", this.item);

                    this.activeBtns = false;
                });
        },

        replyRemoved(reply){
            this.item.comments = this.item.comments.map(comment => {
                if(comment.id == reply.id)
                    return reply;

                return comment;
            })
        }
    },

    mounted() {


    }
}
</script>

<style scoped>

</style>
