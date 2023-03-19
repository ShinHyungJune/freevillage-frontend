<template>
    <div class="m-comment">
        <!-- 신고 팝업 -->
        <spam-pop :target_id="item.id" target_model="comments" v-if="activeSpamPop" @close="activeSpamPop = false" />

        <div class="m-comment-inner">
            <div class="thumbnail" :style="`background-image:url(${item.user.img.url})`" v-if="item.user.img"></div>

            <div class="content">
                <h3 class="title">{{ item.user.nickname }}</h3>
                <p class="sub">{{ item.user.district.district }} · {{ item.diff_at }}</p>
                <p class="body removed" v-if="item.deleted_at">글이 삭제되었습니다.</p>
                <p class="body" v-else>{{ item.content }}</p>

                <div class="utils">
                    <button class="btn-like" @click="toggleLike">
                        <img src="/images/heart-active.png" alt="" style="width:14px;" v-if="item.is_like">
                        <img src="/images/heart-inactive.png" alt="" style="width:14px;" v-else>
                        {{item.like_count}}
                    </button>
                    <button class="btn-text" @click="active = !active" v-if="!item.is_reply && !item.deleted_at">답글쓰기</button>
                    <button class="btn-text" style="margin-left:10px;" @click="activeReplies = !activeReplies" v-if="!item.is_reply && item.comments.length > 0">답글보기 {{item.comments.length}}</button>
                </div>

                <form action="" @submit.prevent="store" v-if="active">
                    <div class="m-input-withBtn type01">
                        <div class="m-input m-input-text type01">
                            <input type="text" placeholder="댓글을 입력해주세요." v-model="form.content">
                        </div>

                        <button class="m-input-btn m-btn type02">저장</button>
                    </div>
                </form>
            </div>

            <button class="btn-more" @click="activeBtns = !activeBtns">
                <img src="/images/dots.png" alt="" style="width:3px;" v-if="$auth.user && !item.deleted_at">
            </button>
        </div>

        <div class="m-btns type01" v-if="activeBtns">
            <div class="m-btn-wrap" v-if="$auth.user && $auth.user.id == item.user.id">
                <a href="#" class="m-btn type01 bg-revert-red" @click.prevent="remove">삭제하기</a>
            </div>
            <div class="m-btn-wrap">
                <a href="#" class="m-btn type01 bg-primary" @click.prevent="activeSpamPop = true">신고하기</a>
            </div>
        </div>

        <div class="m-comments" v-if="item.comments.length > 0 && activeReplies">
            <comment v-for="reply in item.comments" :key="reply.id" :item="reply" @removed="replyRemoved" :commentable_id="reply.id" commentable_type="comment" />
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

            this.$axios.put("/api/likes/comments/" + this.item.id);
        },

        store() {
            if(!this.$auth.user)
                return this.$router.push("/auth/login");

            this.$axios.post("/api/comments", this.form)
                .then(response => {
                    this.active = false;

                    this.form.content = "";

                    this.item.comments.push(response.data.data);
                });
        },

        remove(){
            this.$axios.delete("/api/comments/" + this.item.id)
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
