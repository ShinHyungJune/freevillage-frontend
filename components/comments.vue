<template>
    <div>
        <div class="m-comments type01">
            <div class="m-comments-top">
                <a href="#" :class="`btn-filter ${form.align === 'desc' ? 'active' : ''}`" @click.prevent="() => {form.align = 'desc'; getItems();}">최신순</a>
                <a href="#" :class="`btn-filter ${form.align === 'asc' ? 'active' : ''}`" @click.prevent="() => {form.align = 'asc'; getItems();}">오래된순</a>
            </div>

            <comment v-for="item in items.data" :key="item.id" :item="item" :post_id="form.post_id" />
        </div>

        <no-ssr>
            <infinite-loading @infinite="loadMore" v-if="items.links.next" />
        </no-ssr>

        <!-- 하단 네비게이션바 -->
        <comment-navigation :post_id="form.post_id" @created="(data) => {items.data = [data, ...items.data]}" />
    </div>
</template>

<script>
export default {
    props: {
        post_id: {
            required: true
        }
    },
    components: {},
    data() {
        return {
            items: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
                links: {}
            },

            form: {
                page: 1,
                post_id: this.post_id,
                align: "desc",
            },
        }
    },
    methods: {
        loadMore(state) {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/comments", {
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
            this.form.page = 1;

            this.$axios.get("/comments", {
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

<style scoped>

</style>
