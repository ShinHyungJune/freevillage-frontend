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
                
        <nuxt-link v-if="activeState" to="/fav" class="btn-more">
            인기상승 더보기 +
        </nuxt-link>
        <nuxt-link v-else to="/posts" class="btn-more">
            뒤로가기
        </nuxt-link>

    </div>
</template>
<script>
export default {
    props: {
        activeState: {
            type: Boolean,
            default: false,
        },
        activeCount: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            form: {
                board: "",
                take: this.activeCount,
                page:1,
                district_id: this.$store.state.district.id,
            },

            items: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
                links: {}
            },
        }
    },

    methods: {
        /* loadMore() {
            this.form.take = 100;

            this.getItems();
        }, */

        getItems(){
            this.$axios.get(`/favorites`, {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });

            console.log(this.activeCount)

           

        },
    },

    computed: {
        district(){
            return this.$store.state.district;
        }
    },

    watch: {
        district (newData, oldData) {
            this.form.district_id = newData.id;

            this.getItems();
        }
    },

    mounted() {
        let self = this;

        this.getItems();

        setInterval(function(){
            self.getItems();
        }, 10000);
    }
}
</script>
