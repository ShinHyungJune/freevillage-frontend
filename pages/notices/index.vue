<template>
    <div class="area-notices-index">

        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-20"></div>

            <div class="wrap">
                <div class="top">
                    <p class="text">전체 {{ items.data.length }}</p>
                    <div class="m-input-select type03">
                        <select name="" id="" v-model="form.orderBy" @change="getItems">
                            <option value="created_at">등록순</option>
                            <option value="updated_at">업데이트순</option>
                        </select>
                    </div>
                </div>

                <div class="mt-12"></div>

                <input-region type="type02" @change="(data) => {form.district_id = data.district_id; form.district_id ? getItems() : ''}"/>

                <p class="m-input-error" v-if="errors.district_id" v-text="errors.district_id[0]"></p>

                <div class="mt-12"></div>

                <div class="m-input-dates type01">
                    <div class="m-input-text type01">
                        <input type="date" v-model="form.started_at" @change="getItems">
                    </div>

                    <span class="deco">-</span>

                    <div class="m-input-text type01">
                        <input type="date" v-model="form.finished_at" @change="getItems">
                    </div>
                </div>

                <div class="m-boards type02">
                    <notice v-for="item in items.data" :key="item.id" :item="item" @removed="removed"/>
                </div>

                <div class="m-quicks type01" v-if="isManager">
                    <nuxt-link to="/notices/create" class="m-quick">글쓰기</nuxt-link>
                </div>

                <scroll-loading @load="loadMore" v-if="items.links.next" />
            </div>
        </div>


        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>
</template>

<script>

import InputRegion from "../../components/inputRegion";
import Navigation from "../../components/navigation";
import Notice from "../../components/notices/notice";
import Quicks from "../../components/quicks";
export default {
    components: {Quicks, Notice, Navigation, InputRegion},
    auth: false,
    data() {
        return {
            form: {
                page: 1,
                started_at: "",
                finished_at: "",
                orderBy: "created_at",
                district_id: this.$store.state.district ? this.$store.state.district.id : "",
            },

            items: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
                links: {}
            },

            errors: {}
        }
    },
    methods: {
        loadMore(state) {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/api/notices", {
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

            this.$axios.get("/api/notices", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        removed(item){
            this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
        },


    },

    computed: {
        isManager(){
            if(!this.$auth.user)
                return false;

            if(!this.$auth.hasScope("manager"))
                return false;

            return true;
        }
    },

    mounted() {
        this.getItems();

        if(this.$auth.user) {
            this.$axios.patch("/api/users/readNotice");
            this.$auth.setUser({
                ...this.$auth.user,
                has_new_notice: 0
            });
        }
    }
}
</script>

<style scoped>

</style>
