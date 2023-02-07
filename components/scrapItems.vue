<template>
    <div class="m-section type01" v-if="scrap_id && items.data.length > 0">
        <div class="m-section-top">
            <h3 class="section-title" v-if="board === 'notices'">마을소식</h3>
            <h3 class="section-title" v-if="board === 'clips'">마을영상</h3>
            <h3 class="section-title" v-if="board === 'photos'">마을포토</h3>
            <h3 class="section-title" v-if="board === 'asks'">마을질문</h3>
            <h3 class="section-title" v-if="board === 'meetings'">마을모임</h3>
        </div>

        <div class="m-boards type02">
            <draggable v-model="items.data" :group="items.data"  handle=".m-board-menu" @input="reorder" v-if="items.data.length > 0">
                <transition-group tag="div" type="transition" name="'list'">
                    <nuxt-link :to="`/posts/${item.post.id}`" class="m-board" v-for="item in items.data" :key="item.id">
                        <div class="m-board-fragments">
                            <div class="m-board-fragment m-board-menu" v-if="editMode">
                                <img src="/images/menus.png" alt="" style="width:24px;" class="filter-gray">
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
                                    <div class="right" v-if="editMode">
                                        <img src="/images/x.png" alt="" style="width: 14px;" @click="remove(item)">
                                    </div>
                                </div>

                                <div class="m-board-bottom">
                                    <p class="date">{{ item.created_at }}</p>
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
                </transition-group>
            </draggable>
            <div class="m-empty type01 mt-8" v-else>데이터가 없습니다.</div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';

export default {
    components: {draggable},

    props: {
        scrap_id: {
            required:true,
        },
        board: {
            required:true,
        },
        editMode: {
            default(){
                return true;
            }
        }
    },

    data() {
        return {
            form: {
                scrap_id: this.scrap_id,
                board: this.board,
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
            this.$axios.delete("/scrapItems/" + item.id)
                .then(response => {
                    this.items.data = this.items.data.filter(itemData => item.id != itemData.id)
                });
        },

        close(){
            this.$emit("close");
        },


        getItems(){
            this.$axios.get("/scrapItems", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },
    },

    mounted() {
        this.getItems();
    }
}
</script>
