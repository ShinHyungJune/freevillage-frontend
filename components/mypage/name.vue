<template>
    <div class="m-board">
        <div class="m-board-fragments">
            <div class="m-board-fragment">
                <div class="m-board-top">
                    <div class="left">
                        <h3 class="title">
                            {{ item.name }}
                        </h3>
                    </div>

                    <div class="right">
                        <h3 class="title" style="color:green">{{item.phone}}</h3>
                    </div>
                </div>

                <div class="m-board-bottom">
                    <p class="date">{{ computeDate }}</p>
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
    computed: {
        computeDate() {
            let date = new Date(this.item.created_at)
            return date.toISOString().replace('T',' ').replace(/\.\d{3}Z/, '');

        }
    },
    methods: {
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
