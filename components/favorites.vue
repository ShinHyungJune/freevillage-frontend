<template>
    <div class="rankings-wrap">
        <div class="m-empty type01" v-if="items.data.length === 0">데이터가 없습니다.</div>

        <div class="rankings">
            <nuxt-link :to="`/posts/${item.id}`" class="ranking" v-for="(item, index) in items.data" :key="item.id">
                <span class="rank">{{index + 1}}</span>
                <h3 class="title">{{ item.title }}</h3>
                <p :class="`count ${item.is_like ? 'active' : ''}`">
                    <span class="icon"></span>
                    <span class="text">{{ item.like_count }}</span>
                </p>
            </nuxt-link>
        </div>

        <a href="#" class="btn-more" @click.prevent="loadMore" v-if="items.links.next">
            인기상승 더보기 +
        </a>
    </div>
</template>
<script>
export default {
    props: {

    },
    data() {
        return {
            form: {
                board: "",
                page: 1,
                district_id: this.$store.state.district.id,
            },

            items: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
                links: {}
            }
        }
    },

    methods: {
        loadMore(state) {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/favorites", {
                    params: this.form
                }).then(response => {
                    this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };

                    state.loaded();
                });
            }
        },

        getItems(){
            this.$axios.get(`/favorites`, {
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
