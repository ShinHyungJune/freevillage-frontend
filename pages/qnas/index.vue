<template>
    <div class="area-my-boards">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util" @click="$router.back()">
                        <img src="/images/back.png" alt="" style="width:10px;">
                    </button>
                </div>

                <div class="center">
                    <h3 class="title">고객센터</h3>
                </div>

                <div class="right"></div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-32"></div>

            <div class="wrap">
<!--                <div class="m-tabs type03">
                    <a href="#" class="m-tab active" @click.prevent="">내가 쓴 게시글</a>
                    <nuxt-link to="/mypage/comments" class="m-tab">내가 쓴 댓글</nuxt-link>
                </div>-->

                <div class="mt-12">
                    우측 하단 질문하기 버튼을 클릭하여 문의글을 남기세요. 빠른시간내에 답변드립니다. 
                </div>

                <div class="m-boards type02">
                    <qna v-for="item in items.data" :key="item.id" :item="item" @removed="removed"/>
                </div>
            </div>

            <scroll-loading @load="loadMore" v-if="items.links.next" />
        </div>

        <div class="m-quicks type01">
            <nuxt-link to="/qnas/create" class="m-quick">질문하기</nuxt-link>
        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>
</template>

<script>
import Form from "@/utils/Form";
import Post from "@/components/mypage/post";
import ScrollLoading from "../../components/scrollLoading";
import Navigation from "../../components/navigation";
import Qna from "../../components/qna";

export default {
    components: {Qna, Navigation, ScrollLoading, Post},
    auth: true,
    data() {
        return {
            form: {
                page: 1,
            },

            items: {
                data: [],
                links: {

                }
            }

        }
    },
    methods: {
        loadMore() {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/qnas", {
                    params: this.form
                }).then(response => {
                    this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };
                });
            }
        },

        getItems(){
            this.form.page = 1;

            this.$axios.get("/qnas")
                .then(response => {
                    this.items = response.data;
                });
        },

        removed(){
            this.getItems();
            // this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
        }
    },

    mounted() {
        this.getItems();
    }
}
</script>

<style scoped>

</style>
