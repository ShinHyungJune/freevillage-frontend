<template>
    <div class="m-board">
        <div class="m-board-fragments">
            <div class="m-board-fragment m-board-thumbnail" v-if="item.img">
                <div class="m-thumbnail type02" :style="`background-image:url('${item.img.url}')`"></div>
            </div>
            <div class="m-board-fragment">
                <div class="m-board-top">
                    <div class="left">
                        <h3 class="title">
                            {{ item.content }}
                        </h3>
                    </div>

                    <div class="right">
                        <img src="/images/dots.png" alt="" style="width:3px;" @click.prevent.stop="active = true" v-if="!active">
                        <img src="/images/x.png" alt="" style="width:12px;" @click.prevent.stop="active = false" v-else>
                    </div>
                </div>

                <div class="m-board-bottom">
                    <p class="date">{{ item.created_at }}</p>

                    <div class="utils">
                        <button class="btn-util filter-gray">
                            <img src="/images/heart-empty.png" alt="" style="width:15px;">
                            {{ item.like_count }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="m-board-btns" v-if="active">
            <div class="m-btns type01">
                <div class="m-btn-wrap">
                    <a href="#" class="m-btn type01 bg-revert-red" @click.prevent="remove">삭제하기</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        item: {
            required: true
        },

    },

    components: {},
    auth: true,
    data() {
        return {
            form: {
                page: 1,
            },
            active: false,
        }
    },
    methods: {
        remove(){
            this.$axios.delete("/comments/" + this.item.id)
                .then(response => {
                    this.$emit("removed", this.item);

                    this.active = false;
                });
        },
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
