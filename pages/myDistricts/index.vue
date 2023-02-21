<template>
    <div class="area-myDistricts">
        <!-- 헤더영역 -->
        <header-type01 />


        <!-- 내용 영역 -->
        <div class="container">
            <div class="mt-32"></div>

            <!-- 나의 마을 찾기 팝업 -->
            <div class="m-pop type01" id="pop1" v-if="active">
                <div class="m-pop-inner">
                    <button class="btn-close m-script-pop" data-target="#pop1" @click="active = false">
                        <img src="/images/x.png" alt="" style="width:21px;">
                    </button>

                    <div class="m-pop-title">
                        <p class="subtitle">소속된 마을을 찾을 수 있어요.</p>
                        나의 <span class="point">마을 찾기</span>
                    </div>

                    <input-region @change="(data) => {form.district_id = data.district ? data.district.id : ''}"  />

                    <div class="mt-20"></div>

                    <button type="button" class="m-btn type03 width-100" @click="store">검색하기</button>
                </div>
            </div>

            <div class="wrap">
                <h3 class="title">동네 추가</h3>
                <p class="body">다른 지역 1개 추가 가능합니다.</p>

                <div class="m-input-checkboxes type02">
                    <div class="m-input-checkbox-wrap" v-if="items.data.length === 0">
                        <div class="m-input-checkbox create" @click="active = true;">
                            <i class="xi-plus"></i>
                        </div>
                    </div>

                    <div class="m-input-checkbox-wrap" v-for="item in items.data" :key="item.id">
                        <div class="m-input-checkbox">
                            {{ item.district.district }}

                            <i class="xi-close" @click="remove(item)"></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <navigation />
    </div>
</template>

<script>

import InputRegion from "../../components/inputRegion";
export default {
    components: {InputRegion},
    auth: true,
    data() {
        return {
            form: {
                page: 1,
                district_id: "",
            },

            active: false,

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

                this.$axios.get("/myDistricts", {
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

            this.$axios.get("/myDistricts", {
                params: this.form
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            this.$axios.delete("/myDistricts/" + item.id)
                .then(response => {
                    this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                });
        },

        store(){
            this.$axios.post("/myDistricts", this.form)
                .then(response => {
                    this.items.data = [response.data.data, ...this.items.data];

                    this.$auth.fetchUser();

                    this.active = false;
                });
        }
    },
    computed: {
        district(){
            return this.$store.state.district;
        }
    },

    mounted() {
        this.getItems();
    }
}
</script>

<style scoped>

</style>
