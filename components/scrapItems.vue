<template>
    <div class="m-section type01">
<!--        <div class="m-section-top">
            <h3 class="section-title" v-if="board === 'notices'">마을소식</h3>
            <h3 class="section-title" v-if="board === 'clips'">마을영상</h3>
            <h3 class="section-title" v-if="board === 'photos'">마을포토</h3>
            <h3 class="section-title" v-if="board === 'asks'">마을질문</h3>
            <h3 class="section-title" v-if="board === 'meetings'">마을모임</h3>
        </div>-->

        <div class="m-boards type02">
            <div :to="`/posts/${item.post.id}`" class="m-board" v-for="item in items.data" :key="item.id">
                <div class="m-board-fragments">
                    <div class="m-board-fragment m-board-menu">
                        <div class="m-input-checkbox type02">
                            <input type="checkbox" :value="item.id" :id="item.id" v-model="form.selected_ids">
                            <label :for="item.id"></label>
                        </div>
                    </div>

                    <div class="m-board-fragment m-board-thumbnail" v-if="item.post && item.post.img">
                        <div class="m-thumbnail type02" :style="`background-image:url(${item.post.img.url})`"></div>
                    </div>

                    <div class="m-board-fragment">
                        <div class="m-board-top">
                            <div class="left">
                                <p class="subtitle">{{ item.post.district.district }}</p>
                                <h3 class="title">{{item.post.title}}</h3>
                            </div>
                        </div>

                        <div class="m-board-bottom">
                            <p class="date">{{ item.created_at }}</p>
                        </div>
                    </div>

                    <div class="m-board-fragment m-board-fragment-remove">
                        <button class="btn-remove" @click="remove(item)">
                            <img src="/images/garbage.png" alt="" style="width:37px;">
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="wrap">
                <div class="m-btns type01" v-if="!editMode">
                    <div class="m-btn-wrap">
                        <a href="#" class="m-btn type03 bg-revert-primary" @click.prevent="share" id="kakaoShare">공유하기</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import KakaoHelper from "@/utils/KakaoHelper";

export default {
    components: {draggable},

    props: {
        editMode: {
            default(){
                return true;
            }
        }
    },

    data() {
        return {
            form: {
                user_id: this.$auth.user.id,
                selected_ids: [],
            },

            items: {
                data: [],
            }
        }
    },

    methods: {
        reorder(items){
            this.$emit("reorder", items.map((item, index) => {
                item.order = index;

                return item;
            }));
        },

        remove(item){
            this.$axios.delete("/api/scrapItems/" + item.id)
                .then(response => {
                    this.items.data = this.items.data.filter(itemData => item.id != itemData.id)
                });
        },

        close(){
            this.$emit("close");
        },


        getItems(){
            this.$axios.get("/api/scrapItems", {
                params: this.form
            }).then(response => {
                this.items = response.data;
                this.extractImages(this.items.data);
            });
        },

        extractImages(data) {
            const images = data.map(el => el.post.img.url);
            this.$emit('extracedImages', images);
        },

        share() {
            let kakaoHelper = new KakaoHelper(Kakao);

            let items = this.items.data.filter(item => this.form.selected_ids.includes(item.id));

            kakaoHelper.shareScrapItems(items, this.$auth.user.nickname);
        },
    },

    mounted() {
        this.getItems();
    }
}
</script>
