<template>
    <div class="m-pop type01" id="pop2">
        <div class="m-pop-inner">
            <button class="btn-close m-script-pop" data-target="#pop2">
                <img src="/images/x.png" alt="" style="width:21px;">
            </button>

            <div class="m-pop-title">게시물 신고</div>

            <div class="m-input-checkbox type01 mt-4" v-for="(item, index) in items.data" :key="item.value">
                <input type="radio" name="report" :id="item.value" :value="item.value" v-model="form.reason_id">
                <label :for="item.value">{{ item.text }}</label>
            </div>

            <!-- 스팸 정보 클릭시에만 노출 -->
            <div class="m-input-textarea type01 mt-8" v-if="form.reason_id == 5">
                <textarea name="" id="" v-model="form.reason_desc"></textarea>
            </div>

            <div class="mt-20"></div>

            <button type="button" class="m-btn type03 width-100" @click="store">신고</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        target_id: {
            required: true
        },
        target_model: {
            default(){
                return "posts";
            }
        }
    },
    data() {
        return {
            form: {
                target_id: this.target_id,
                reason_id: "",
                reason_desc: "",
            },

            items: {
                data: [],
            }
        }
    },

    methods: {
        store(){
            if(!this.form.reason_id)
                return alert("사유를 선택해주세요.");

            this.$axios.post(`/spam/${this.target_model}/${this.target_id}`, this.form)
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
            this.$axios.get("/spam/init")
                .then(response => {
                    this.items.data = response.data.reasonItems;
            });
        },
    },

    mounted() {
        this.getItems();
    }
}
</script>
