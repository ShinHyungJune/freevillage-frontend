<template>
    <nuxt-link :to="`/notices/${item.id}`" class="m-board">
        <div class="m-board-fragments">
            <!-- 썸네일 노출 안함
            <div class="m-board-fragment m-board-thumbnail" v-if="item.img">
                <div class="m-thumbnail type02" :style="`background-image:url('${item.img.url}')`"></div>
            </div> -->
            <div class="m-board-fragment">
                <div class="m-board-top">
                    <div class="left">
                        <p class="subtitle">{{ item.district.district }}</p>
                        <h3 class="title">
                            {{ item.title }}
                        </h3>
                    </div>

                
                    <div class="right" v-if="isManager">
                        <img src="/images/dots.png" alt="" style="width:3px;" @click.prevent.stop="active = true" v-if="!active">
                        <img src="/images/x.png" alt="" style="width:12px;" @click.prevent.stop="active = false" v-else>
                    </div> 
                </div>

                <div class="m-board-bottom">
                    <p class="date">{{ item.created_at }}</p>
                </div>
            </div>
        </div>

        <div class="m-board-btns" v-if="active">
            <div class="m-btns type01">
                <div class="m-btn-wrap">
                    <a href="#" class="m-btn type01 bg-revert-red" @click.prevent="remove">삭제하기</a>
                </div>
                <div class="m-btn-wrap">
                    <nuxt-link :to="`/notices/create?id=${item.id}`" href="#" class="m-btn type01 bg-primary">수정하기</nuxt-link>
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
        remove(){
            this.$axios.delete("/notices/" + this.item.id)
                .then(response => {
                    this.$emit("removed", this.item);

                    this.active = false;
                });
        },
    },

    computed: {
        isManager() {
            if(!this.$auth.user)
                return false;

            if(!this.$auth.hasScope("manager"))
                return false;

            if(this.$auth.user.district.id != this.item.district.id)
                return false;

            return true;
        }
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
