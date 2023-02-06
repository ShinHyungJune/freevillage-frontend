<template>
    <div class="area-wallets-index">
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util" @click="$router.back()">
                        <img src="/images/back.png" alt="" style="width:10px;">
                    </button>
                </div>

                <div class="center">
                    <h3 class="title">내 지갑</h3>
                </div>

                <div class="right"></div>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-32"></div>

            <div class="wrap">
                <div class="top">
                    <div class="m-thumbnail type02" :style="`background-image:url('${this.$auth.user.img.url}')`" v-if="this.$auth.user.img"></div>
                    <h3 class="title">{{ this.$auth.user.name }}</h3>
                </div>

                <div class="mt-20"></div>

                <div class="m-input-wrap">
                    <h3 class="m-input-title type02">전체 {{ items.data.length }}</h3>

                    <div class="m-input-select type01">
                        <select name="" id="" @change="changeMain" v-model="form.scrap_id">
                            <option value="" disabled>지갑을 선택해주세요.</option>
                            <option :value="item.id" v-for="item in items.data" :key="item.id">{{item.title}}</option>
                        </select>
                    </div>

                    <div class="mt-12"></div>

                    <div class="m-input-withBtn type01">
                        <div class="m-input m-input-text type03">
                            <input type="text" placeholder="새로운 지갑 만들기" v-model="form.title">
                        </div>

                        <button class="m-input-btn m-btn type03 bg-primary" @click="store">추가</button>
                    </div>
                </div>

                <div class="mt-12"></div>

                <div class="m-section type01">
                    <div class="m-section-top">
                        <h3 class="section-title">마을소식</h3>
                    </div>

                    <div class="m-boards type02">
                        <a href="#" class="m-board">
                            <div class="m-board-fragments">
                                <div class="m-board-fragment m-board-thumbnail">
                                    <div class="m-thumbnail type02" style="background-image:url('/images/example.png')"></div>
                                </div>
                                <div class="m-board-fragment">
                                    <div class="m-board-top">
                                        <div class="left">
                                            <p class="subtitle">자유일보</p>
                                            <h3 class="title">
                                                정치 내용입니다.
                                            </h3>
                                        </div>
                                    </div>

                                    <div class="m-board-bottom">
                                        <p class="date">2022-11-13 08:09:30</p>

                                        <div class="utils">
                                            <button class="btn-util filter-gray">
                                                <img src="/images/eye.png" alt="" style="width:20px;">
                                                10
                                            </button>

                                            <button class="btn-util filter-gray">
                                                <img src="/images/comment-black.png" alt="" style="width:15px;">
                                                10
                                            </button>

                                            <button class="btn-util filter-gray">
                                                <img src="/images/heart-empty.png" alt="" style="width:15px;">
                                                10
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="#" class="m-board">
                            <div class="m-board-fragments">
                                <div class="m-board-fragment">
                                    <div class="m-board-top">
                                        <div class="left">
                                            <p class="subtitle">자유일보</p>
                                            <h3 class="title">
                                                정치 내용입니다.
                                            </h3>
                                        </div>
                                    </div>

                                    <div class="m-board-bottom">
                                        <p class="date">2022-11-13 08:09:30</p>

                                        <div class="utils">
                                            <button class="btn-util filter-gray">
                                                <img src="/images/eye.png" alt="" style="width:20px;">
                                                10
                                            </button>

                                            <button class="btn-util filter-gray">
                                                <img src="/images/comment-black.png" alt="" style="width:15px;">
                                                10
                                            </button>

                                            <button class="btn-util filter-gray">
                                                <img src="/images/heart-empty.png" alt="" style="width:15px;">
                                                10
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="m-section type01">
                    <div class="m-section-top">
                        <h3 class="section-title">마을모임</h3>
                    </div>

                    <div class="m-boards type02">
                        <a href="#" class="m-board">
                            <div class="m-board-top">
                                <div class="left">
                                    <p class="subtitle">자유일보</p>
                                    <h3 class="title">
                                        정치 내용입니다.
                                    </h3>
                                </div>
                            </div>

                            <div class="m-board-bottom">
                                <p class="date">2022-11-13 08:09:30</p>

                                <div class="utils">
                                    <button class="btn-util filter-gray">
                                        <img src="/images/eye.png" alt="" style="width:20px;">
                                        10
                                    </button>

                                    <button class="btn-util filter-gray">
                                        <img src="/images/comment-black.png" alt="" style="width:15px;">
                                        10
                                    </button>

                                    <button class="btn-util filter-gray">
                                        <img src="/images/heart-empty.png" alt="" style="width:15px;">
                                        10
                                    </button>
                                </div>
                            </div>
                        </a>

                        <a href="#" class="m-board">
                            <div class="m-board-top">
                                <div class="left">
                                    <p class="subtitle">자유일보</p>
                                    <h3 class="title">
                                        정치 내용입니다.
                                    </h3>
                                </div>
                            </div>

                            <div class="m-board-bottom">
                                <p class="date">2022-11-13 08:09:30</p>

                                <div class="utils">
                                    <button class="btn-util filter-gray">
                                        <img src="/images/eye.png" alt="" style="width:20px;">
                                        10
                                    </button>

                                    <button class="btn-util filter-gray">
                                        <img src="/images/comment-black.png" alt="" style="width:15px;">
                                        10
                                    </button>

                                    <button class="btn-util filter-gray">
                                        <img src="/images/heart-empty.png" alt="" style="width:15px;">
                                        10
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </div>

        <!-- 하단 네비게이션바 -->
        <div class="m-navigation type01">
            <div class="wrap">
                <div class="m-btns type01">
                    <div class="m-btn-wrap">
                        <a href="#" class="m-btn type03 bg-revert-primary">공유하기</a>
                    </div>
                    <div class="m-btn-wrap">
                        <a href="#" class="m-btn type03">편집하기</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from '../../utils/Form';

export default {
    components: {},
    auth: true,
    data() {
        return {
            form: {
                page: 1,
                district_id: this.$store.state.district.id,
                scrap_id: this.$auth.user.scrap ? this.$auth.user.scrap.id : "",
                title: "",
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
        /*loadMore(state) {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/posts", {
                    params: this.form
                }).then(response => {
                    this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };

                    state.loaded();
                });
            }
        },*/

        getItems(){
            this.form.page = 1;

            this.$axios.get("/scraps", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        store(){
            this.$axios.post("/scraps", this.form)
                .then(response => {
                    this.items.data.push(response.data.data);

                    this.form.scrap_id = response.data.data.id;

                    this.changeMain(response.data.data);
                })
        },

        changeMain(){

            this.$axios.patch("/scraps/updateUserMainScrap/" + this.form.scrap_id)
                .then(response => {
                    this.$auth.setUser({
                        ...this.$auth.user,
                        scrap: response.data.data
                    });
                });
        }
    },

    mounted() {
        this.$axios.get("/scraps", {
            params: this.form
        }).then(response => {
            this.items = response.data;
        });
    }
}
</script>

<style scoped>

</style>
