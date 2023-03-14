<template>
    <div class="area-news">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-20"></div>

            <div class="menus-wrap">
                <div class="wrap">
                    <div class="menus">
                        <div class="menu-wrap">
                            <a href="" class="menu" @click.prevent="() => {form.board = 'notices'; getItems();}">
                                <img src="https://dotmzh1fysixs.cloudfront.net/1038/news01.png" style="width:60px" alt="" class="">

                                <h3 class="title">마을소식</h3>
                            </a>
                        </div>

                        <div class="menu-wrap">
                            <a href="" class="menu" @click.prevent="() => {form.board = 'clips'; getItems();}">
                                <img src="https://dotmzh1fysixs.cloudfront.net/1037/news02.png" style="width:60px" alt="" class="">

                                <h3 class="title">마을영상</h3>
                            </a>
                        </div>

                        <div class="menu-wrap">
                            <a href="" class="menu" @click.prevent="() => {form.board = 'photos'; getItems();}">
                                <img src="https://dotmzh1fysixs.cloudfront.net/1036/news03.png" style="width:60px" alt="" class="">

                                <h3 class="title">마을포토</h3>
                            </a>
                        </div>

                        <div class="menu-wrap">
                            <a href="" class="menu" @click.prevent="() => {form.board = 'asks'; getItems();}">
                                <img src="https://dotmzh1fysixs.cloudfront.net/1035/news04.png" style="width:60px" alt="" class="">

                                <h3 class="title">마을질문</h3>
                            </a>
                        </div>

                        <div class="menu-wrap">
                            <a href="" class="menu" @click.prevent="() => {form.board = 'meetings'; getItems();}">
                                <img src="https://dotmzh1fysixs.cloudfront.net/1034/news05.png" style="width:60px" alt="" class="">

                                <h3 class="title">마을모임</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <section class="section-ranking">
                <div class="wrap">
                    <h3 class="section-title">실시간 인기상승</h3>

                    <favorites
                        :activeState="activeState"
                        :activeCount="activeCount"
                    />

                    <div class="mt-12"></div>

                    <div class="m-boards type01">
                        <div :class="`m-board ${item.formatBoard}`" v-for="item in postItems" :key="item.id" @click="move(item)">
                            <div class="m-board-top">
                                <div class="left">
                                    <span class="category">{{ item.formatBoard }}</span><span> {{  item.district.district }}</span>
                                </div>
                                <div class="right">
                                    <div class="thumbnail" :style="`background-image:url('${item.user.img.url}')`" v-if="item.user.img"></div>
                                    <p class="writer">{{ item.user.nickname }}</p>
                                    <p class="date">{{ item.diff_at }}</p>
                                </div>
                            </div>

                            <div class="m-board-content">
                                <h3 class="title"><span :class="`point ${item.can_participate ? 'active' : ''}`" v-if="item.board === 'meetings'">[{{item.can_participate ? '모집중' : '모집마감'}}]</span> {{ item.title }}</h3>
                                <p class="body" v-if="item.content">{{item.content.replace(/<\/?[^>]+>/ig, " ").replace(/&\s?nbsp;/ig, " ")}}</p>
                                <div class="m-thumbnail type01 mt-8" :style="`background-image:url(${item.img.preview_url})`" v-if="item.img">
                                    <div class="m-thumbnail-base" v-if="item.board === 'clips'">
                                        <img src="/images/circlePlay-white.png" alt="" class="deco" style="width:40px;">
                                    </div>
                                </div>

                                <div class="infos" v-if="item.board === 'meetings'">
                                    <div class="info">
                                        <div class="icon-wrap">
                                            <img src="/images/talk.png" alt="" class="icon" style="width:14px;">
                                        </div>

                                        {{ item.participant_type }}
                                    </div>
                                    <div class="info">
                                        <div class="icon-wrap">
                                            <img src="/images/calendar.png" alt="" class="icon" style="width:12px;">
                                        </div>

                                        {{ item.start_date }} ~ {{ item.end_date }}
                                    </div>
                                    <div class="info">
                                        <div class="icon-wrap">
                                            <img src="/images/users.png" alt="" class="icon" style="width:12px;">
                                        </div>

                                        {{item.participant_count}} / {{item.participant_available_count}}명 참여
                                    </div>
                                </div>

                            </div>

                            <div class="m-board-bottom">
                                <div class="utils">
                                    <a href="#" class="btn-util" @click="(e) => toggleLike(e, item)">
                                        <!--<span class="icon m-icon-heart-active"></span>-->
                                        <span :class="`icon ${item.is_like ? 'm-icon-heart-active' : 'm-icon-heart'}`"></span>
                                        <span class="text">좋아요 {{item.like_count}}</span>
                                    </a>
                                    <a href="#" class="btn-util">
                                        <span class="icon m-icon-comment"></span>
                                        <span class="text">댓글 {{item.comment_count}}</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <scroll-loading @load="loadMore" v-if="postLinks.next" />

                    <div class="mt-40"></div>
                </div>
            </section>

            <quicks />
        </div>

        <navigation />
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
    components: {},
    auth: false,

    computed: {
        district(){
            return this.$store.state.district;
        },
        postItems() {
            return this.$store.getters.getPostItems;
        },
        postLinks() {
            return this.$store.getters.getPostLinks;
        },
        postMeta() {
            return this.$store.getters.getPostMeta;
        },
        y() {
            return this.$store.getters.getPostCurrentY;
        }
    },
    data() {
        return {
            activeState : true,
            activeCount : 3,
            form: {
                board: this.$route.query.board ? this.$route.query.board : "",
                page: 0,
                district_id: this.$store.state.district.id,
                word: this.$route.query.word ? this.$route.query.word: "",
            },

            windowTop: 0,

            // items: {
            //     data: [],
            //     meta: {
            //         current_page: 1,
            //         last_page: 1,
            //     },
            //     links: {}
            // }
        }
    },
    methods: {
        ...mapActions(['FETCH_POST_ITEMS','FETCH_POST_LINKS','FETCH_POST_META','FETCH_POST_Y','CLEAR_POST_STATE']),
        loadMore(state) {
            if(this.postMeta.current_page <= this.postMeta.last_page){
                this.form.page = this.postMeta.current_page + 1;

                this.$axios.get("/posts", {
                    params: this.form
                }).then(response => {
                    const data = response.data;
                    // let newData =
                    this.FETCH_POST_ITEMS([
                        ...this.postItems,
                        ...data.data
                    ]);
                    this.FETCH_POST_LINKS(data.links);
                    this.FETCH_POST_META(data.meta);
                    // this.items = {
                    //     ...response.data,
                    //     data: [...this.items.data, ...response.data.data]
                    // };

                    state.loaded();
                });
            }
        },

        getItems(){
            this.form.page = 1;

            this.$axios.get("/posts", {
                params: this.form
            }).then(response => {
                // this.items = response.data;
                const data = response.data;
                this.FETCH_POST_ITEMS(data.data);
                this.FETCH_POST_LINKS(data.links);
                this.FETCH_POST_META(data.meta);
            });
        },

        move(item){
            this.$router.push("/posts/" + item.id);
        },

        toggleLike(e, item){
            e.preventDefault();
            e.stopPropagation();

            if(item.is_like){
                item.is_like = 0;
                item.like_count -= 1;
            }else{
                item.is_like = 1;
                item.like_count += 1;
            }

            this.FETCH_POST_ITEMS(this.postItems.map(itemData => {
                if(itemData.id == item.id)
                    return item;
                return itemData;
            }));
            // this.items.data = this.items.data.map(itemData => {
            //     if(itemData.id == item.id)
            //         return item;

            //     return itemData;
            // });

            this.$axios.put("/likes/posts/" + item.id);
        },

        onScroll(e) {
            this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
        }

    },


    watch: {
        district (newData, oldData) {
            this.form.district_id = newData.id;

            this.getItems();
        }
    },

    async mounted() {
        if(this.postItems.length === 0) {
            await this.getItems();
        }else {
            window.scrollTo(0,this.y)
        }
        window.addEventListener('scroll', this.onScroll)

    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
        this.FETCH_POST_Y(this.windowTop);
        if(this.$route.name !== 'posts-id') {
            this.CLEAR_POST_STATE();
        }
    }
}
</script>

<style scoped>
    .left > span:nth-child(2) {
        margin-left: 5px;
    }
</style>
