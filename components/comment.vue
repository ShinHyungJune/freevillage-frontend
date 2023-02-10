<template>
    <div class="m-comment">
        <div class="m-comment-inner">
            <div class="thumbnail" :style="`background-image:url(${item.user.img.url})`" v-if="item.user.img"></div>

            <div class="content">
                <h3 class="title">{{ item.user.name }}</h3>
                <p class="sub">{{ item.user.district.district }} · {{ item.diff_at }}</p>
                <p class="body">{{ item.content }}</p>

                <div class="utils">
                    <button class="btn-like" @click="toggleLike">
                        <img src="/images/heart-active.png" alt="" style="width:14px;" v-if="item.is_like">
                        <img src="/images/heart-inactive.png" alt="" style="width:14px;" v-else>
                        {{item.like_count}}
                    </button>
                    <button class="btn-text" @click="active = !active" v-if="!item.is_reply">답글쓰기</button>
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

            <button class="btn-more">
                <img src="/images/dots.png" alt="" style="width:3px;">
            </button>
        </div>

        <div class="m-comments" v-if="item.comments.length > 0 && activeReplies">
            <comment v-for="reply in item.comments" :key="reply.id" :item="reply"></comment>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            required: true,
        },

        post_id: {

        },

    },
    components: {},
    data() {
        return {
            form: {
                commentable_type: "comment",
                commentable_id: this.item.id,
                content: "",
            },
            active: false,
            activeReplies: false,

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
            this.$axios.post("/comments", this.form)
                .then(response => {
                    this.active = false;

                    this.form.content = "";

                    this.item.comments.push(response.data.data);
                });
        },
    },

    mounted() {


    }
}
</script>

<style scoped>

</style>
