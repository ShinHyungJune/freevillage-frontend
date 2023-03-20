<template>
    <div class="m-pop type01">
        <div class="m-pop-inner">
            <button class="btn-close" @click="close">
                <img src="/images/x.png" alt="" style="width:21px;">
            </button>

            <div class="m-pop-title">내 지갑에 추가</div>

            <div v-if="items.data.length > 0">
                <div class="m-input-select type01">
                    <select name="" id="" v-model="form.scrap_id">
                        <option :value="item.id" v-for="item in items.data" :key="item.id">{{item.title}}</option>
                    </select>
                </div>

                <div class="mt-8"></div>

                <button type="button" class="m-btn type03 width-100" @click="store">추가하기</button>
            </div>

            <div v-else>
                <nuxt-link to="/scraps" class="m-btn type03 width-100">내 지갑 만들기</nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        post_id: {
            required: true
        }
    },
    data() {
        return {
            form: {
                post_id: this.post_id,
                scrap_id: ""
            },

            items: {
                data: [],
            }
        }
    },

    methods: {
        store(){
            if(!this.form.scrap_id)
                return alert("지갑을 선택해주세요.");

            this.$axios.post(`/api/scrapItems`, this.form)
                .then(response => {
                    alert(response.data.message);

                    if(response.data.message.includes("성공"))
                        this.$emit("created");

                    this.close();
            });
        },

        close(){
            this.$emit("close");
        },


        getItems(){
            this.$axios.get("/api/scraps")
                .then(response => {
                    this.items = response.data;

                    if(this.items.data.length > 0)
                        this.form.scrap_id = this.items.data[0].id;
            });
        },
    },

    mounted() {
        this.getItems();
    }
}
</script>
