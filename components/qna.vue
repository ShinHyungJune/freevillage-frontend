<template>
    <nuxt-link :to="`/qnas/${item.id}`" class="m-board">
        <div class="m-board-fragments">
            <div class="m-board-fragment m-board-thumbnail" v-if="item.img">
                <div class="m-thumbnail type02" :style="`background-image:url('${item.img.url}')`"></div>
            </div>
            <div class="m-board-fragment">
                <div class="m-board-top" style="align-items: center">
                    <div class="left">
                        <h3 class="title">
                            {{ item.title }}
                        </h3>

                        <p class="date" style="color:#999;">{{ item.created_at }}</p>
                    </div>
                    <div class="right">
                        <p class="m-btn type01 bg-primary" v-if="item.finished" style="padding:0 16px;">완료</p>
                        <p class="m-btn type01 bg-lightGray" style="padding:0 16px; color:#ccc;" v-else>대기</p>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-link>
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
        /*remove(){
            this.$axios.delete("/qnas/" + this.item.id)
                .then(response => {
                    this.$emit("removed", this.item);

                    this.active = false;
                });
        },*/
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
