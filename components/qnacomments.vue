<template>
    <div>
        <!-- 하단 네비게이션바 -->
        <qnacomment-navigation :commentable_id="form.commentable_id" :commentable_type="form.commentable_type" @created="(obj) => this.updateComment(obj)" />
        <div class="m-comments type01">
            <div class="m-comments-top">
                <a href="#" :class="`btn-filter ${form.align === 'desc' ? 'active' : ''}`" @click.prevent="() => {form.align = 'desc'; getItems();}">최신순</a>
                <a href="#" :class="`btn-filter ${form.align === 'asc' ? 'active' : ''}`" @click.prevent="() => {form.align = 'asc'; getItems();}">오래된순</a>
            </div>

            <qnacomment v-for="item in items.data" :key="item.id" :item="item" :commentable_id="form.commentable_id" :commentable_type="form.commentable_type" @removed="removed"/>
        </div>

        <no-ssr>
            <infinite-loading @infinite="loadMore" v-if="items.links.next" />
        </no-ssr>

    </div>
</template>

<script>
export default {
    props: {
        commentable_id: {
            required: true
        },
        commentable_type: {
            default: "post"
        },
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
                commentable_id: this.commentable_id,
                commentable_type: this.commentable_type,
                align: "desc",
            },
        }
    },
    methods: {
        loadMore(state) {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/api/comments", {
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

            this.$axios.get("/api/comments", {
                params: this.form
            }).then(response => {
                this.items = response.data;
                this.items.data = this.items.data.filter(item => !item.deleted_at)
            });
        },
        updateComment(obj) {
            if(obj.type === 'add') {
                this.items.data = [obj.data, ...this.items.data];
                this.$emit('calculateCommentCount', 'add')
            }
            if(obj.type === 'remove') {
                this.items.data = [...this.items.data.filter(el => el !== obj.data)];
                this.$emit('calculateCommentCount', 'remove')
            }

        },

        removed(item){
            // this.items.data = this.items.data.map(itemData => {
            //     if(itemData.id == item.id)
            //         return item;

            //     return itemData;
            // });
            this.$emit("removed", item);

            this.items.data = this.items.data.filter(item => !item.deleted_at)
        }
    },

    mounted() {
        this.getItems();
    }
}
</script>

<style scoped>

</style>
